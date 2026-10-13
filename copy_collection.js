import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore';

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
  const sourceRef = collection(db, "ecard");
  const targetRef = collection(db, "wedding_invitations");
  const querySnapshot = await getDocs(sourceRef);
  let count = 0;
  for (const docSnap of querySnapshot.docs) {
    await setDoc(doc(targetRef, docSnap.id), docSnap.data());
    count++;
  }
  console.log(`Copied ${count} documents from ecard to wedding_invitations`);
  process.exit(0);
}
run();
