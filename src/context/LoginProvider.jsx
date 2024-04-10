import { useState, useContext, createContext } from "react";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../config/firebase.js'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Initialize Firebase
const app   =   initializeApp(firebaseConfig);
const db    =   getFirestore(app);
const auth  =   getAuth();


//-- CREATE CUSTOM HOOKS --

//Use Login Context
const loginContext = createContext();
export function useLoginContext ( ) {
    return useContext(loginContext)
}


export function LoginProvider ( {children} ) {

    const [userData, setUserData] = useState({email: '', password: ''});
    const updateUserData = (evt) => {
        setUserData({
            ...userData,
            [evt.target.name]: evt.target.value
        })
    }

    const [login, setLogin] = useState({loader: false, loginStatus: false});
    const getIn = async() => {
        setLogin({...login, loader : true})
        try {
            //Make login
            await signInWithEmailAndPassword(auth, userData.email, userData.password);
            //Check login
            const user = auth.currentUser
            onAuthStateChanged(auth, (user) => {
                if( user ){
                    setLogin({...login, loader: false, loginStatus : true})
                }else{
                    setLogin({...login, loader: false, loginStatus : false})
                }
            });
        } catch (error) {
            console.log(`Code: ${error.code}, message: ${error.message}`);
        }
        console.log('xyz',login.loginStatus);
    }
    const getOut = async() => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
        console.log('salido')
    }

    
    return (
        <loginContext.Provider value={{userData, updateUserData, login, getIn, getOut}}>
            {children}
        </loginContext.Provider>
    )
}