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
  const docSnap = await getDoc(doc(db, "ecard", "remix-msq37981-164o1"));
  const data = docSnap.data();
  console.log("Hero:", data.heroImageUrl);
  console.log("Embed:", data.embeddedImageUrl);
  console.log("Contact:", data.contactName);
  console.log("Footer Names:", data.footerInviteNames);
  console.log("Text Elems:");
  console.log(data.textElements);
  process.exit(0);
}
run();
