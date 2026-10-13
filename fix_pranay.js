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
  const d3 = (await getDoc(doc(db, "ecard", "remix-msq37981-164o1"))).data();
  // We will restore remix-v1 to exactly d3
  await setDoc(doc(db, "ecard", "remix-v1"), d3);
  console.log("Restored remix-v1 to Pranay's last database save (msq37981-164o1)");
  process.exit(0);
}
run();
