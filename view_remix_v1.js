import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc } from 'firebase/firestore';

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
  const d = (await getDoc(doc(db, "ecard", "remix-v1"))).data();
  console.log("Contact:", d.contactName);
  console.log("Footer Names:", d.footerInviteNames);
  console.log("Embed Image:", d.embeddedImageUrl);
  console.log("Hero Image:", d.heroImageUrl);
  console.log("Ganesha:", d.ganeshaIconUrl);
  d.eventDetails.forEach(e => console.log(e.heading, "Img:", e.imageUrl, "Caric:", e.caricatureUrl));
  process.exit(0);
}
run();
