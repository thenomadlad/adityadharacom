import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCR6gf0bRO5Jixgm1p3WEOnksaKyG59LkY",
    authDomain: "mysite-286621.firebaseapp.com",
    projectId: "mysite-286621",
    storageBucket: "mysite-286621.appspot.com",
    messagingSenderId: "226312838239",
    appId: "1:226312838239:web:1e62cb253a393af1898fea",
    measurementId: "G-HBWC3LCTFN"
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore();