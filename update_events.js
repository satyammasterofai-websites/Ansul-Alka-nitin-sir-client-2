import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection, doc, updateDoc, getDoc } from 'firebase/firestore';

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

const eventsData = {
  "haldi": {
    heading: "Haldi Ceremony",
    date: "18 February 2027, Thursday",
    time: "11:00 AM – 1:00 PM",
    venue: "The Royal Garden, Jaipur",
    description: "A vibrant morning filled with haldi, laughter, music, and beautiful family moments as we begin the wedding celebrations."
  },
  "mehndi": {
    heading: "Mehndi Ceremony",
    date: "18 February 2027, Thursday",
    time: "5:00 PM – 8:00 PM",
    venue: "The Royal Garden, Jaipur",
    description: "An evening of intricate mehndi designs, music, dance, and joyful celebrations with family and friends."
  },
  "sangeet": {
    heading: "Sangeet Ceremony",
    date: "19 February 2027, Friday",
    time: "7:00 PM onwards",
    venue: "Grand Palace Banquet, Jaipur",
    description: "Get ready for a magical evening of music, dance, performances, and unforgettable memories as both families come together."
  },
  "wedding": {
    heading: "Wedding Ceremony",
    date: "20 February 2027, Saturday",
    time: "7:00 PM onwards",
    venue: "Grand Palace Banquet, Jaipur",
    description: "With the blessings of our loved ones, we invite you to witness the beautiful beginning of our forever as we exchange vows and embark on a new journey together."
  }
};

async function run() {
  const querySnapshot = await getDocs(collection(db, "wedding_invitations"));
  for (const docSnap of querySnapshot.docs) {
    if (docSnap.id.startsWith("file-")) continue;
    const data = docSnap.data();
    if (data.eventDetails && Array.isArray(data.eventDetails)) {
      let updated = false;
      const newEvents = data.eventDetails.map(e => {
        let key = "";
        const h = e.heading.toLowerCase();
        if (h.includes("haldi")) key = "haldi";
        else if (h.includes("mehndi") || h.includes("mehendi")) key = "mehndi";
        else if (h.includes("sangeet")) key = "sangeet";
        else if (h.includes("wedding")) key = "wedding";
        
        if (key && eventsData[key]) {
          updated = true;
          return {
            ...e,
            heading: eventsData[key].heading, // Update heading to remove emojis if any, or keep existing? Let's use the provided heading.
            date: eventsData[key].date,
            time: eventsData[key].time,
            venue: eventsData[key].venue,
            description: eventsData[key].description
          };
        }
        return e;
      });
      if (updated) {
        await updateDoc(docSnap.ref, { eventDetails: newEvents });
        console.log(`Updated doc ${docSnap.id}`);
      }
    }
  }
  process.exit(0);
}
run();
