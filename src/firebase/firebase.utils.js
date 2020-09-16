import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAEQ8bmqxWPkU7W-q88LzH-6OxOrr7x6FI",
    authDomain: "reactztmproj.firebaseapp.com",
    databaseURL: "https://reactztmproj.firebaseio.com",
    projectId: "reactztmproj",
    storageBucket: "reactztmproj.appspot.com",
    messagingSenderId: "343202384475",
    appId: "1:343202384475:web:cfc136a0aadd5ed1aa0d7e",
    measurementId: "G-ENP7H0N80G"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();


    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createDate = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createDate,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user ', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;