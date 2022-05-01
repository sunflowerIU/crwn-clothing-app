// Import the functions
import { initializeApp } from "firebase/app";
import {
  signInWithRedirect,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth"; //these are imports required for authentication

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; //these are imports required for firestore

//Firebase configuration, all the configuration can be get from firebase browser after creating app there
const firebaseConfig = {
  apiKey: "AIzaSyDOhX1dWY7ltUD65em3BNu9IeyNG13AKuk",
  authDomain: "crwn-clothing-7e165.firebaseapp.com",
  projectId: "crwn-clothing-7e165",
  storageBucket: "crwn-clothing-7e165.appspot.com",
  messagingSenderId: "1099344942697",
  appId: "1:1099344942697:web:9ee85a1fd3a581943db4f8",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// specify provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();  //auth will keep track of authentication process
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)


//for firestore(database)
const db = getFirestore()
export const createUserDocumentFromAuth = async(user)=>{
    //this is for getting reference of that data from our database so that we can use it to create docs.
    //it contains 3 params first is database, 2nd is collection name and 3rd one is that unique id
    const userDocRef = doc(db,'users',user.uid)  
    // console.log(userDocRef)

    //this will get that document
    const userSnapShot = await getDoc(userDocRef) 
    // console.log(userSnapShot.exists())  //to check if our data really exists or not

    //now create the doc if the doc doesnot exists 
    if(!userSnapShot.exists()){
        const {displayName, email} = user;

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt: new Date()
            })
        } catch (error) {
            console.log(error)
        }
    }

    // but if that doc exists then simply return the user reference
    return userDocRef;

}