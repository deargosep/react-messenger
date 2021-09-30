import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// firebase init - add your own config here
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgjopzYf2UTw3DJlYv8kczSUlYMKTZsg4",
  authDomain: "messenger-1729f.firebaseapp.com",
  projectId: "messenger-1729f",
  storageBucket: "messenger-1729f.appspot.com",
  messagingSenderId: "550401417451",
  appId: "1:550401417451:web:aed9b7a3a6c4843d8d1eae",
  measurementId: "G-ZQMNF5DF81"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const chatsCollection = db.collection('Chats')

// export utils/refs
export {
  db,
  auth,
  chatsCollection
}
export const Timestamp = firebase.firestore.Timestamp