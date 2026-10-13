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
  const d = (await getDoc(doc(db, "ecard", "remix-v1"))).data();
  d.ganeshaIconUrl = "https://cdn-icons-png.flaticon.com/512/10777/10777472.png";
  if (!d.customFields) {
    d.customFields = {
      "Custom Status": "Final Save",
      "Additional Info": "Restored files"
    };
  }
  await setDoc(doc(db, "ecard", "remix-v1"), d);
  console.log("Updated remix-v1 with Ganesha and custom fields.");
  process.exit(0);
}
run();
