import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAcF4-qa-yr6CO0kNqx-tlLLhARV1Yxzhw",
  authDomain: "om-online-works.firebaseapp.com",
  projectId: "om-online-works",
  storageBucket: "om-online-works.firebasestorage.app",
  messagingSenderId: "110051953109",
  appId: "1:110051953109:web:3041db0feea780ea00d55c"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const querySnapshot = await getDocs(collection(db, "ecard"));
  querySnapshot.forEach((doc) => {
    const jsonStr = JSON.stringify(doc.data());
    if (jsonStr.toLowerCase().includes("ganesh")) {
       console.log("Found ganesh in:", doc.id);
       if (doc.data().ganeshaIconUrl) {
         console.log("  URL:", doc.data().ganeshaIconUrl);
       }
    }
  });
  process.exit(0);
}
run();
