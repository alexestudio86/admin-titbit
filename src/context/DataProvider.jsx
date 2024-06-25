import { createContext, useContext, useEffect, useState } from 'react';
import {db} from '../config/firebase.js';
import { query, collection, where, orderBy, onSnapshot, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';



const ordersContext = createContext();
export function useOrdersContext () {
    return useContext(ordersContext);
}
export const OrdersProvider = ( {children} ) => {

    const [orders, setOrders] = useState([]);
    const [ordersLoader, setOrdersLoader] = useState(false);

    const getOrders = async() => {
        const dayFiltered = new Date();
        dayFiltered.setHours(0,0,0,0);
        setOrdersLoader(true);
        try {
            //For make a request inside object, you need create index (this can be created pushing in link console), is not necesary short by, 
            const queryOrders   =   await query(collection(db, 'orders'), where('timestamp.created', '>=', dayFiltered));
            //const queryOrders   =   await query(collection(db, 'orders'), where('created', '>=', dayFiltered), orderBy('created', 'desc'));
            onSnapshot(queryOrders, (querySnapshot) => {
                setOrders(
                    querySnapshot.docs.map( doc => (
                        {id: doc.id, ...doc.data()}
                    ))
                );    
                setOrdersLoader(false);
            });
        } catch (error) {
            return error
        }
    }

    //Para evitar un error de undefined, es necesario declarar un objeto
    const [order, setOrder] = useState({});
    const addOrder = async( item ) => {
        try {
            const addItem = await addDoc(collection(db, 'orders'), item);
            console.log('addItem: ', addItem)
        } catch (error) {
            return error
        }
    }
    const getOrder = async( itemID ) => {
        try {
            const getItem = await getDoc(doc(db, "orders", itemID));
            setOrder({id: getItem.id, ...getItem.data()});
        } catch (error) {
            return error
        }
    }

    useEffect( () => {
        getOrders();
    }, []);


    return (
        <ordersContext.Provider value={ {orders, ordersLoader, order, setOrder, addOrder, getOrder} }>
            {children}
        </ordersContext.Provider>
    )
}

const dishesContext = createContext();
export function useDishesContext () {
    return useContext(dishesContext);
}
export const DishesProvider = ( {children} ) => {
    
    const [dishes, setDishes] = useState([]);
    const [dishesLoader, setDishesLoader] = useState(false);
    const getDishes = async() => {
        try {            
            const dayFiltered = new Date();
            dayFiltered.setHours(0,0,0,0);
            setDishesLoader(true);
            const queryDishes = await query(collection(db, 'dishes'), orderBy('productName'));
            onSnapshot( queryDishes, (querySnapshot) => {
                setDishes(
                    querySnapshot.docs.map( doc => (
                        {id: doc.id, ...doc.data()}
                    ))
                );
                setDishesLoader(false);
            });
        } catch (error) {
            return error;

        }
    };

    const [dish, setDish] = useState({});
    const [dishLoader, setDishLoader] = useState(false);
    const getDish = async( itemID ) => {
        setDishLoader(true);
        try {
            const getItem = await getDoc(doc(db, "dishes", itemID));
            setDish({id: getItem.id, ...getItem.data()});
            setDishLoader(false);
        } catch (error) {
            return error
        }
    };
    const addDish = async() => {
        try {
            const docRef = await addDoc(collection(db, "dishes"), dish);
            await updateDoc( doc(db, "dishes", docRef.id), {id: docRef.id} );
            //For make a reference
            //await addDoc(collection(db, "dishes"), {...dish, variants:[], basePrice:0, id: doc(await collection(db, "dishes"))});
        } catch (error) {
            return error
        }
    };
    const updateDish = async() => {
        try{
            await updateDoc(doc(db, "dishes", dish.id), dish);
        }catch(error){
            return error;
        }
    }

    useEffect( () => {
        getDishes();
    },[])

    return (
        <dishesContext.Provider value={{dishes, dishesLoader, getDish, dish, setDish, dishLoader, setDishLoader, addDish, updateDish}}>
            {children}
        </dishesContext.Provider>
    )

}