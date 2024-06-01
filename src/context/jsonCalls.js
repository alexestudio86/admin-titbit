import firebaseConfig from '../config/firebase.js';
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';


// Initialize firebase
const app   =   initializeApp(firebaseConfig);
const db    =   getFirestore(app);

export async function getOrdersData ( ) {
    const dayFiltered = new Date();
    dayFiltered.setHours(0,0,0,0)
    const orders     =   [];
    try {
        const queryOrders   =   query(collection(db, 'orders'), where('created', '>=', dayFiltered), orderBy('created', 'desc'));
        await onSnapshot(queryOrders, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                orders.push( {id: doc.id, ...doc.data()} )
            });
        });
        return {orders}
    } catch (error) {
        console.log(error)
    }
}

export async function getDishesData ( ) {
    const dishes =   [];
    try {
        const queryDishes = query(collection(db, 'dishes'), orderBy('title'));
        await onSnapshot(queryDishes, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                dishes.push( {id: doc.id, ...doc.data()} )
            });
        });
        return {dishes}
    } catch (error) {
        console.log(error)
    }
}

export async function getAllData ( ) {
    const dayFiltered = new Date();
    dayFiltered.setHours(0,0,0,0)
    const orders     =   [];
    //
    const dishes =   [];
    try {
        const queryOrders   =   await query(collection(db, 'orders'), where('created', '>=', dayFiltered), orderBy('created', 'desc'));
        await onSnapshot(queryOrders, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                orders.push( {id: doc.id, ...doc.data()} )
            });
        });
        const queryDishes   =   await query(collection(db, 'dishes'), orderBy('title'));
        await onSnapshot(queryDishes, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                dishes.push( {id: doc.id, ...doc.data()} )
            });
        });
        return {orders, dishes}
    } catch (error) {
        console.log(error)
    }
}