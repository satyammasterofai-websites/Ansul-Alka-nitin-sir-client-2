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
  const msqDoc = await getDoc(doc(db, "ecard", "remix-msq37981-164o1"));
  const msqData = msqDoc.data();
  
  // Add ganesha icon
  msqData.ganeshaIconUrl = "https://cdn-icons-png.flaticon.com/512/10777/10777472.png";
  
  // Save as remix-v1
  await setDoc(doc(db, "ecard", "remix-v1"), msqData);
  console.log("remix-v1 restored perfectly to msq data (which has the user's actual ibb.co images) + Ganesha");
  
  process.exit(0);
}
run();
