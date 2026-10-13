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
  const d = await getDoc(doc(db, "wedding_invitations", "remix-v1"));
  if (d.exists()) {
    const data = d.data();
    for (const e of data.eventDetails) {
       console.log(e.heading, "on", e.date, "at", e.venue);
    }
  }
  process.exit(0);
}
run();
