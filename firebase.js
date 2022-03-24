import firebase from 'firebase'; 
// import firestore from 'firebase/firestore'; 
 
const settings = {timestampsInSnapshots : true}; 
 
const config = { 
    apiKey: process.env.REACT_APP_FIREBASEUI_AUTH_API_KEY, 
    authDomain: process.env.REACT_APP_FIREBASEUI_AUTH_DOMAIN, 
    projectId: process.env.REACT_APP_FIREBASEUI_PROJECT_ID, 
    storageBucket: process.env.REACT_APP_FIREBASEUI_STORAGE_BUCKET, 
    messagingSenderId: process.env.REACT_APP_FIREBASEUI_MESSAGING_SENDER_ID, 
    appId: process.env.REACT_APP_FIREBASEUI_APP_ID 
  }; 
  firebase.initializeApp(config); 
 
  firebase.firestore().settings(settings); 
 
  export default firebase;