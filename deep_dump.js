import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
  const querySnapshot = await getDocs(collection(db, "ecard"));
  querySnapshot.forEach((doc) => {
    if (doc.id.startsWith("file-") || doc.id.startsWith("image-")) return;
    const data = doc.data();
    const str = JSON.stringify(data).toLowerCase();
    if (str.includes("pranay")) {
       console.log("-----", doc.id, "-----");
       console.log("Hero:", data.heroImageUrl);
       console.log("Embed:", data.embeddedImageUrl);
       console.log("Groom:", data.heroGroomName);
       console.log("Bride:", data.heroBrideName);
       console.log("Ganesha:", data.ganeshaIconUrl);
       if (data.eventDetails) {
          data.eventDetails.forEach(e => console.log(e.id, "img:", e.imageUrl, "caricature:", e.caricatureUrl));
       }
    }
  });
  process.exit(0);
}
run();
