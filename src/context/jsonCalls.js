import firebaseConfig from '../config/firebase.js';
import { initializeApp } from "firebase/app";
import { getFirestore, query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';


// Initialize firebase
const app   =   initializeApp(firebaseConfig);
const db    =   getFirestore(app);

export async function getComandasData ( ) {
    const dayFiltered = new Date();
    dayFiltered.setHours(0,0,0,0)
    const comandas     =   [];
    try {
        const queryOrders   =   await query(collection(db, 'orders'), where('created', '>=', dayFiltered), orderBy('created', 'desc'));
        await onSnapshot(queryOrders, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
                comandas.push( {id: doc.id, ...doc.data()} )
            });
        });
        return {comandas}
    } catch (error) {
        console.log(error)
    }
}

export async function getPlatillosData ( ) {
    try {
        const queryDishes = query(collection(db, 'dishes'), orderBy('title'));
        const platillos =   [];
        await onSnapshot(queryDishes, (querySnapshot) => {
            querySnapshot.forEach( (doc) => {
            platillos.push( {id: doc.id, ...doc.data()} )
            });
        });
        return {platillos}
    } catch (error) {
        console.log(error)
    }
}