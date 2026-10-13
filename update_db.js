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
      data.eventDetails[0] = { ...data.eventDetails[0], heading: 'Haldi Ceremony', date: '12 February 2027, Friday', time: '11:00 AM – 1:00 PM', venue: 'The Garden Courtyard, Jaipur', description: 'Let the laughter, love, and haldi glow begin as we celebrate this beautiful new beginning!' };
      data.eventDetails[1] = { ...data.eventDetails[1], heading: '🌿 Mehndi Ceremony', date: '13 February 2027, Saturday', time: '5:00 PM – 8:00 PM', venue: 'Royal Orchid Lawn, Jaipur', description: 'An evening filled with beautiful mehndi, music, laughter, and cherished memories.' };
      data.eventDetails[2] = { ...data.eventDetails[2], heading: '🎶 Sangeet Ceremony', date: '14 February 2027, Sunday', time: '7:00 PM – 10:30 PM', venue: 'The Grand Palace Ballroom, Jaipur', description: 'Get ready to dance, sing, and celebrate the rhythm of love with our families and friends!' };
      data.eventDetails[3] = { ...data.eventDetails[3], heading: '💍 Wedding Ceremony', date: '15 February 2027, Monday', time: '7:00 PM onwards', venue: 'Rajputana Heritage Resort, Jaipur', description: 'With blessings in our hearts and love in our souls, we begin our forever together.' };
      
      await updateDoc(docRef, { eventDetails: data.eventDetails });
      console.log("Updated events!");
    }
  } else {
    console.log("Doc not found");
  }
  process.exit(0);
}

run();
