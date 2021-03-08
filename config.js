
import firebase from 'firebase';
require('@firebase/firestore')

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyA_GkrT2RkFSVpGs8K5Jid99kcwmUdqJA8",
  authDomain: "barterapp-d0210.firebaseapp.com",
  projectId: "barterapp-d0210",
  storageBucket: "barterapp-d0210.appspot.com",
  messagingSenderId: "378042412180",
  appId: "1:378042412180:web:1abc9b3735439678ea5881"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();