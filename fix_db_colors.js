import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import fs from "fs";

// Read firebase config from src/firebase.ts
const firebaseConfigFile = fs.readFileSync("src/firebase.ts", "utf8");
const configMatch = firebaseConfigFile.match(/const firebaseConfig = ({[\s\S]*?});/);
const firebaseConfig = eval("(" + configMatch[1] + ")");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const docRef = doc(db, 'ecard', 'main-settings');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    let data = snap.data();
    
    if (data.eventDetails) {
       for (let ev of data.eventDetails) {
           if (ev.headingColor) {
               delete ev.headingColor;
           }
           if (ev.heading.includes('Haldi')) {
               ev.detailsColor = '#ef4444'; // Red
           } else if (ev.heading.includes('Mehndi')) {
               // Mehndi defaults
           } else if (ev.heading.includes('Sangeet')) {
               ev.detailsColor = '#fef08a'; // Light yellow
           } else if (ev.heading.includes('Wedding')) {
               ev.detailsColor = '#db2777'; // Dark Pink
           }
       }
    }
    
    await updateDoc(docRef, data);
    console.log("Updated db colors!");
  } else {
    console.log("Doc not found");
  }
  process.exit(0);
}

run();
