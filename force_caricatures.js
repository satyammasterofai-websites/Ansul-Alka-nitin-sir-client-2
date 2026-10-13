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
  const remixDoc = await getDoc(doc(db, "ecard", "remix-v1"));
  const remixData = remixDoc.data();

  remixData.eventDetails.forEach(e => {
     if (e.heading.includes('Haldi')) {
        e.caricatureUrl = 'ecard-file://main-settings-event-event-1-caricature';
     }
     if (e.heading.includes('Mehndi')) {
        e.caricatureUrl = 'ecard-file://main-settings-event-event-1785691647794-caricature';
     }
     if (e.heading.includes('Wedding')) {
        e.caricatureUrl = 'ecard-file://main-settings-event-event-1785691714818-caricature';
     }
  });

  await setDoc(doc(db, "ecard", "remix-v1"), remixData);
  console.log("Successfully re-linked the orphaned caricature chunks to your events!");
  process.exit(0);
}
run();
