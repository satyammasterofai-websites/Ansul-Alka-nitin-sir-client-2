import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, setDoc } from 'firebase/firestore';

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
  const msqDoc = await getDoc(doc(db, "ecard", "remix-v1"));
  const d = msqDoc.data();
  console.log("Before: ", d.heroImageUrl);
  // Ensure we didn't accidentally overwrite the hero URL in earlier fixes
  
  process.exit(0);
}
run();
