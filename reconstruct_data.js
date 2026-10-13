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
  const docSnap = await getDoc(doc(db, "ecard", "main-settings"));
  let data = {};
  if (docSnap.exists()) {
     data = docSnap.data();
  } else {
     console.error("No main-settings!");
     process.exit(1);
  }

  // Restore Pranay's text overrides (gleaned from remix-msq37981-164o1)
  data.contactName = "Pranay Wankhede";
  data.footerInviteNames = "PRANAY & ALISHA";
  data.contactAddress = "Address: Khairi Gaon, Vinayak Nagar Colony, near Garden, Kamptee Road, Nagpur";
  data.footerInviteFamilies = "WANKHEDE & LANJEWAR FAMILIES";
  data.familyInviteSubHeading3 = "Ms. Manali Wankhede & Anaaya's";
  data.familyInviteSubHeading2 = "Under the divine blessings of Lord buddha Mrs. Chanda Champatrao wankhede invites you to celebrate the auspicious wedding ceremony of her beloved Son.";
  data.musicUrl = "https://www.image2url.com/r2/default/audio/1786534818968-0882e558-d57a-44c4-8e18-b1c46f906c11.mp3";
  
  // Restore files uploaded by Pranay to main-settings on Sep 4
  data.heroImageUrl = "ecard-file://main-settings-hero";
  
  if (data.eventDetails) {
     data.eventDetails.forEach(e => {
        if (e.id === "event-1") {
           e.caricatureUrl = "ecard-file://main-settings-event-event-1-caricature";
           e.imageUrl = "https://i.ibb.co/nN116wxD/d561ca1e-9d94-4a37-8942-f958f680eec2.png"; // keep template
        } else if (e.id === "event-1785691647794") {
           e.caricatureUrl = "ecard-file://main-settings-event-event-1785691647794-caricature";
           e.imageUrl = "https://i.ibb.co/PvQBhz16/59d389f1-1b42-46bc-8149-0ec7c0c4582d.png"; // keep template
        } else if (e.id === "event-1785691683471") {
           e.imageUrl = "ecard-file://main-settings-event-event-1785691683471";
           delete e.caricatureUrl; // no caricature for this one
        } else if (e.id === "event-1785691714818") {
           e.caricatureUrl = "ecard-file://main-settings-event-event-1785691714818-caricature";
           e.imageUrl = "https://i.ibb.co/mVXJ2VKJ/643280c5-780c-4515-aa4f-d85146ba1e8c.png"; // keep template
        }
     });
  }

  // Ensure these are saved to remix-v1
  await setDoc(doc(db, "ecard", "remix-v1"), data);
  console.log("Successfully reconstructed Pranay's Sep 4 data and saved to remix-v1.");
  
  process.exit(0);
}
run();
