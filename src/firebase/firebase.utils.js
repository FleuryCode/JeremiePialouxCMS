import { KEYS } from "../Keys";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';


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
initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider('6LdX1_kgAAAAAMOOwX0Q0AaiJMdJPcXHWhn-0YgY'),
    isTokenAutoRefreshEnabled: true
});



export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;