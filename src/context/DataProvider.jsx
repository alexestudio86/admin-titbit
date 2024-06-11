import { createContext, useContext, useEffect, useState } from 'react';
import {db} from '../config/firebase.js';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';


//Initialize
//const db    = getFirestore(app);

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
            const queryOrders   =   query(collection(db, 'orders'), where('created', '>=', dayFiltered), orderBy('created', 'desc'));
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

    useEffect( () => {
        getOrders();
    }, []);

    return (
        <ordersContext.Provider value={ {orders, ordersLoader} }>
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

    const getDishes = async() => {
        try {            
            const dayFiltered = new Date();
            dayFiltered.setHours(0,0,0,0);
            const queryDishes = query(collection(db, 'dishes'), orderBy('title'));
            onSnapshot( queryDishes, (querySnapshot) => {
                const theDishes = [];
                querySnapshot.forEach( (doc) => {
                    theDishes.push({id: doc.id, ...doc.data() });
                });
                console.log('theDishes: ', theDishes);
                setDishes(theDishes);

            });
        } catch (error) {
            return error;

        }
    }

    useEffect( () => {
        getDishes();
    },[])

    return (
        <dishesContext.Provider value={{dishes}}>
            {children}
        </dishesContext.Provider>
    )

}