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
  const d1 = (await getDoc(doc(db, "ecard", "remix-mspz34lk-2xmyo"))).data();
  const d2 = (await getDoc(doc(db, "ecard", "remix-msq115e2-06eoh"))).data();
  const d3 = (await getDoc(doc(db, "ecard", "remix-msq37981-164o1"))).data();

  console.log("remix-mspz34lk-2xmyo timestamp:", d1.targetDate);
  console.log("remix-msq115e2-06eoh timestamp:", d2.targetDate);
  console.log("remix-msq37981-164o1 timestamp:", d3.targetDate);

  console.log("\nd1 hero:", d1.heroImageUrl);
  console.log("d2 hero:", d2.heroImageUrl);
  console.log("d3 hero:", d3.heroImageUrl);
}
run();
