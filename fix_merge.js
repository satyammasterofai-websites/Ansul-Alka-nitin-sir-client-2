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
  // Get Pranay's latest details
  const pranayDoc = await getDoc(doc(db, "ecard", "remix-msq37981-164o1"));
  let data = pranayDoc.data();

  // Override with the original files and 4 events
  data.heroImageUrl = "ecard-file://main-settings-hero";
  
  data.eventDetails = [
    {
      "directionUrl": "https://share.google/cHJfHLG2bxOcpgDq1",
      "heading": "Haldi Ceremony ",
      "id": "event-1",
      "imageUrl": "https://i.ibb.co/nN116wxD/d561ca1e-9d94-4a37-8942-f958f680eec2.png",
      "caricatureUrl": "ecard-file://main-settings-event-event-1-caricature",
      "showCaricature": true
    },
    {
      "id": "event-1785691647794",
      "imageUrl": "https://i.ibb.co/PvQBhz16/59d389f1-1b42-46bc-8149-0ec7c0c4582d.png",
      "heading": "Mehndi Ceremony ",
      "directionUrl": "https://share.google/cHJfHLG2bxOcpgDq1",
      "caricatureUrl": "ecard-file://main-settings-event-event-1785691647794-caricature",
      "showCaricature": true
    },
    {
      "directionUrl": "https://share.google/cHJfHLG2bxOcpgDq1",
      "heading": "Sangeet Ceremony ",
      "id": "event-1785691683471",
      "imageUrl": "ecard-file://main-settings-event-event-1785691683471"
    },
    {
      "caricatureUrl": "ecard-file://main-settings-event-event-1785691714818-caricature",
      "directionUrl": "https://share.google/cHJfHLG2bxOcpgDq1",
      "heading": "The Wedding Ceremony ",
      "imageUrl": "https://i.ibb.co/mVXJ2VKJ/643280c5-780c-4515-aa4f-d85146ba1e8c.png",
      "id": "event-1785691714818",
      "showCaricature": true
    }
  ];

  await setDoc(doc(db, "ecard", "remix-v1"), data);
  console.log("Merged Pranay's text with the original 4 events and files!");
  process.exit(0);
}
run();
