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
           if (ev.heading.includes('Haldi')) {
               ev.headingColor = '#ef4444'; // Red
           } else if (ev.heading.includes('Mehndi')) {
               // Didn't specify Mehndi color, keep default or maybe light green? 
               // User said: "For Haldi.. Red. For sangeet.. light yellow. For wedding.. dark Pink."
           } else if (ev.heading.includes('Sangeet')) {
               ev.headingColor = '#fef08a'; // Light yellow
           } else if (ev.heading.includes('Wedding')) {
               ev.headingColor = '#db2777'; // Dark Pink
           }
       }
    }
    
    await updateDoc(docRef, data);
    console.log("Updated event heading colors in DB!");
  } else {
    console.log("Doc not found");
  }
  process.exit(0);
}

run();
