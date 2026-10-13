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
  const remixDoc = await getDoc(doc(db, "ecard", "remix-v1"));
  const remixData = remixDoc.data();
  
  const mainDoc = await getDoc(doc(db, "ecard", "main-settings"));
  const mainData = mainDoc.data();

  let recoveredCount = 0;

  if (mainData && mainData.eventDetails) {
    remixData.eventDetails.forEach((remixEvent) => {
      // Try to find a matching event by heading
      const match = mainData.eventDetails.find(m => 
         m.heading && remixEvent.heading && m.heading.toLowerCase().trim() === remixEvent.heading.toLowerCase().trim()
      );
      
      if (match && match.caricatureUrl) {
         console.log(`Recovering caricature for ${remixEvent.heading}: ${match.caricatureUrl}`);
         remixEvent.caricatureUrl = match.caricatureUrl;
         recoveredCount++;
      }
    });
  }
  
  if (recoveredCount > 0) {
    await setDoc(doc(db, "ecard", "remix-v1"), remixData);
    console.log(`Successfully recovered ${recoveredCount} caricatures to remix-v1!`);
  } else {
    console.log("No caricatures found to recover, or they are already there.");
  }
  
  process.exit(0);
}
run();
