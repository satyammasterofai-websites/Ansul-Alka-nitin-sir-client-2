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
  const remixDoc = await getDoc(doc(db, "ecard", "remix-v1"));
  console.log("=== REMIX-V1 EVENTS ===");
  remixDoc.data().eventDetails.forEach(e => console.log(`ID: ${e.id}, Heading: '${e.heading}', Caric: ${e.caricatureUrl}`));
  
  const mainDoc = await getDoc(doc(db, "ecard", "main-settings"));
  console.log("\n=== MAIN-SETTINGS EVENTS ===");
  mainDoc.data().eventDetails.forEach(e => console.log(`ID: ${e.id}, Heading: '${e.heading}', Caric: ${e.caricatureUrl}`));

  process.exit(0);
}
run();
