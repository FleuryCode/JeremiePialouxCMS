import { KEYS } from "../Keys";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: KEYS.Firebase_API,
    authDomain: "jeremiepialoux-dda69.firebaseapp.com",
    projectId: "jeremiepialoux-dda69",
    storageBucket: "jeremiepialoux-dda69.appspot.com",
    messagingSenderId: "80139826129",
    appId: "1:80139826129:web:6fc2620fad2639449ba6f0",
    measurementId: "G-NX63Y2M8G2"
};


const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();

export default firebaseApp;