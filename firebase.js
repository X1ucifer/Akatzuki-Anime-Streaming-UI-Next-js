import { initializeApp, getApps } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBlUBBqnKgjELKNNTQL-oAmXtnu7exQT08",
  authDomain: "movieapp-7ea50.firebaseapp.com",
  projectId: "movieapp-7ea50",
  storageBucket: "movieapp-7ea50.appspot.com",
  messagingSenderId: "141134331713",
  appId: "1:141134331713:web:343591ac64697ec993abc0"
};


// if (!getApps().apps.length) {
 
// }

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db;