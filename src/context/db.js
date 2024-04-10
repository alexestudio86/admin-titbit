import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import firebaseConfig from '../config/firebase.js'
import {async} from '@firebase/util'

// Initialize Firebase
const app   =   initializeApp(firebaseConfig);
const auth  =   getAuth();
const db    =   getFirestore(app);

export async function getLoginData () {
    try {
        const userCredential   = await signInWithEmailAndPassword(auth, 'alexestudio86@gmail.com', '123456');
        return userCredential;
    } catch (error) {
        console.log(`Code: ${error.code}, message: ${error.message}`);
    }
}