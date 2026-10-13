import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

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
  const doc1 = await getDoc(doc(db, "ecard", "remix-mspz34lk-2xmyo"));
  const doc2 = await getDoc(doc(db, "ecard", "remix-msq37981-164o1"));
  
  const d1 = doc1.data();
  const d2 = doc2.data();
  
  console.log("length 1:", JSON.stringify(d1).length);
  console.log("length 2:", JSON.stringify(d2).length);
  
  process.exit(0);
}
run();
