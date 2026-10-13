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
    
    // Update footer names
    data.footerInviteNames = "RIYANSH & PRINYANSHI";
    data.footerHashtag = "#RIYANSHWEDSPRINYANSHI";
    
    // Update hero names
    data.heroGroomName = "Riyansh";
    data.heroBrideName = "Prinyanshi";
    data.heroGroomParents = "S/o Mr. Rajesh \\n& Mrs. Sunita";
    data.heroBrideParents = "D/o Mr. Vikram \\n& Mrs. Neelam";
    data.heroTopText = "We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of";
    data.heroMiddleText = "with";
    
    // Check textElements for opening page
    if (data.textElements) {
       for (let el of data.textElements) {
          if (el.text.includes('Arjun Weds Ananya') || el.text.includes('Arjun') || el.text.includes('Ananya')) {
             el.text = el.text.replace(/Arjun Weds Ananya/g, 'Riyansh Weds Prinyanshi');
             el.text = el.text.replace(/Arjun/g, 'Riyansh');
             el.text = el.text.replace(/Ananya/g, 'Prinyanshi');
          }
       }
    }
    
    await updateDoc(docRef, data);
    console.log("Updated names in DB!");
  } else {
    console.log("Doc not found");
  }
  process.exit(0);
}

run();
