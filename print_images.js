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
  const msq = (await getDoc(doc(db, "ecard", "remix-msq37981-164o1"))).data();
  console.log("msq Hero:", msq.heroImageUrl);
  console.log("msq Embed:", msq.embeddedImageUrl);

  const mspx = (await getDoc(doc(db, "ecard", "remix-mspxyyth-sxgjp"))).data();
  console.log("mspx Hero:", mspx.heroImageUrl);
  console.log("mspx Embed:", mspx.embeddedImageUrl);

  const main = (await getDoc(doc(db, "ecard", "main-settings"))).data();
  console.log("main Hero:", main.heroImageUrl);
  console.log("main Embed:", main.embeddedImageUrl);

  process.exit(0);
}
run();
