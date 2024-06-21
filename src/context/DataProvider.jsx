import { createContext, useContext, useEffect, useState } from 'react';
import {db} from '../config/firebase.js';
import { query, collection, where, orderBy, onSnapshot, addDoc, getDoc, doc } from 'firebase/firestore';



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
            const queryOrders   =   await query(collection(db, 'orders'), where('created', '>=', dayFiltered), orderBy('created', 'desc'));
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

    const [order, setOrder] = useState();
    const addOrder = async( item ) => {
        setOrdersLoader(true);
        try {
            const addItem = await addDoc(collection(db, 'orders'), item);
            setOrdersLoader(false);
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
            const queryDishes = await query(collection(db, 'dishes'), orderBy('title'));
            onSnapshot( queryDishes, (querySnapshot) => {
                const theDishes = [];
                querySnapshot.forEach( (doc) => {
                    theDishes.push({id: doc.id, ...doc.data() });
                });
                setDishes(theDishes);
                setDishesLoader(false);
            });
        } catch (error) {
            return error;

        }
    }

    useEffect( () => {
        getDishes();
    },[])

    return (
        <dishesContext.Provider value={{dishes, dishesLoader}}>
            {children}
        </dishesContext.Provider>
    )

}