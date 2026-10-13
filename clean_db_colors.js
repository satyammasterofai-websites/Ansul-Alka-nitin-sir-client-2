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
        if (e.headingColor || e.textColor) {
          updated = true;
          const newE = { ...e };
          delete newE.headingColor;
          delete newE.textColor;
          return newE;
        }
        return e;
      });
      if (updated) {
        await updateDoc(docSnap.ref, { eventDetails: newEvents });
        console.log(`Cleaned colors for ${docSnap.id}`);
      }
    }
  }
  process.exit(0);
}
run();
