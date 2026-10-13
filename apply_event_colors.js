import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, updateDoc } from 'firebase/firestore';

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
  const querySnapshot = await getDocs(collection(db, "wedding_invitations"));
  for (const docSnap of querySnapshot.docs) {
    if (docSnap.id.startsWith("file-")) continue;
    const data = docSnap.data();
    if (data.eventDetails && Array.isArray(data.eventDetails)) {
      let updated = false;
      const newEvents = data.eventDetails.map(e => {
        const h = e.heading.toLowerCase();
        if (h.includes("haldi")) {
          updated = true;
          return { ...e, headingColor: '#ff0000', detailsColor: '#ff0000', textColor: '#ff0000' };
        }
        if (h.includes("wedding")) {
          updated = true;
          // Usually 'pink' is better as a light pink or specific hex so it stands out. We will use '#FFC0CB' or '#FF69B4'
          return { ...e, headingColor: '#FF69B4', detailsColor: '#FF69B4', textColor: '#FF69B4' };
        }
        return e;
      });
      if (updated) {
        await updateDoc(docSnap.ref, { eventDetails: newEvents });
        console.log(`Updated colors for ${docSnap.id}`);
      }
    }
  }
  process.exit(0);
}
run();
