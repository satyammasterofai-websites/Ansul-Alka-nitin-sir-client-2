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
  const docSnap = await getDoc(doc(db, "ecard", "main-settings"));
  if (docSnap.exists()) {
     console.log(JSON.stringify(docSnap.data(), null, 2).substring(0, 500));
     const data = docSnap.data();
     console.log("Contact Name:", data.contactName);
     console.log("footer names:", data.footerInviteNames);
  }
  process.exit(0);
}
run();
