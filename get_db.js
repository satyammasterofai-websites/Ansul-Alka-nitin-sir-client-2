import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import fs from "fs";

const firebaseConfigFile = fs.readFileSync("src/firebase.ts", "utf8");
const configMatch = firebaseConfigFile.match(/const firebaseConfig = ({[\s\S]*?});/);
const firebaseConfig = eval("(" + configMatch[1] + ")");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const docRef = doc(db, 'ecard', 'main-settings');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    console.log(JSON.stringify(snap.data(), null, 2));
  } else {
    console.log("Doc not found");
  }
  process.exit(0);
}

run();
