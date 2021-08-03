import firebase from 'firebase/app'
import "firebase/firestore";
import 'firebase/auth'

const app = firebase.initializeApp({
    apiKey: "AIzaSyA8bSccgZELRq92o7YtrQBDCCTOkqE9KYE",
    authDomain: "epshop-87682.firebaseapp.com",
    databaseURL:"https://epshop-87682.firebaseio.com",
    projectId: "epshop-87682",
    storageBucket: "epshop-87682.appspot.com",
    messagingSenderId: "487489643763",
    appId: "1:487489643763:web:a408d0d72de343e88a4386"
})
const auth = app.auth();
const db = app.firestore()
export {auth , db}
export default app