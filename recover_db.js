import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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
  try {
    const docSnap = await getDoc(doc(db, "ecard", "remix-mspz34lk-2xmyo"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      // Restore to main-settings
      await setDoc(doc(db, "ecard", "main-settings"), data);
      console.log("Restored successfully!");
    } else {
      console.log("Doc not found");
    }
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
run();
