import React from 'react';
import { createContext, useState, useEffect } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

import { GoogleAuthProvider } from 'firebase/auth';
import app from '../Firebase/firebase.config';

const googleProvider = new GoogleAuthProvider();

export const AuthContext = createContext();
const auth = getAuth(app)

const UserContext = ({children}) => {

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   const createUser = (email, password) =>{
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password)
   }

   const loginWithGoogle = () =>{
      setLoading(true)
      return signInWithPopup(auth, googleProvider)
   }

  

   const signIn =(email,password) =>{
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password)
   }

   const logOut = () =>{
      setLoading(true);
      return signOut(auth);
   }

   useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
         // console.log('currentUser',currentUser)
         
         if(currentUser !== null){
            setUser(currentUser);
            // console.log('ekhane set hocche user', currentUser)
         }
         setLoading(false);
      })
      return () =>{
         unsubscribe()
      } ;
   }, [])

   const authInfo = {user, setUser, loading, createUser, loginWithGoogle, signIn, logOut};
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default UserContext;