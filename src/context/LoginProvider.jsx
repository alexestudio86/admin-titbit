import { useState, useEffect, useContext, createContext } from "react";
import firebaseConfig from '../config/firebase.js'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Initialize Firebase
const app   =   initializeApp(firebaseConfig);
const auth  =   getAuth(app);


//-- CREATE CUSTOM HOOKS --

//Use Login Context
const loginContext = createContext();
export function useLoginContext () {
    return useContext(loginContext)
}


export function LoginProvider ( {children} ) {

    const [user, setUser] = useState({
        email:          '',
        password:       '',
        authenticated:  false,
        loader:         false
    });
    const handleChange = ({ target: { value, name } }) => {
        setUser({ ...user, [name]: value });
    }

    const login = async() => {
        setUser({...user, loader:true })
        try {
            const userCredetntials = await signInWithEmailAndPassword(auth, user.email, user.password);
            setUser({...user, authenticated:true, loader:false })
        } catch (error) {
            console.log(`Code: ${error.code}, message: ${error.message}`);
        }
    };

    const logout = async() => {
        try {
            await signOut(auth);
            setUser({...user, authenticated:false});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            currentUser && setUser({...user, email: currentUser.email, authenticated: true});
        });
        return () => unsubscribe();
    }, []);
    
    return (
        <loginContext.Provider value={{user, handleChange, login, logout}}>
            {children}
        </loginContext.Provider>
    )
}