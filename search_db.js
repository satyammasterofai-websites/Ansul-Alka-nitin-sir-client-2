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
    const dataStr = JSON.stringify(doc.data());
    if (dataStr.toLowerCase().includes("digiinvitations") || dataStr.toLowerCase().includes("wankhede")) {
      console.log("MATCH:", doc.id);
    }
  });
  process.exit(0);
}
run();
