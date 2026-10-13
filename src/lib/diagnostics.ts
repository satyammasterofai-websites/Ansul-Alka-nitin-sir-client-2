import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { loadLargeFile } from './storage';

export async function runDiagnostics(cardId: string) {
  console.log(`--- Running Diagnostics for cardId: ${cardId} ---`);
  const report: string[] = [];

  try {
    const docSnap = await getDoc(doc(db, 'wedding_invitations', cardId));
    if (!docSnap.exists()) {
      const msg = `ERROR: Card document '${cardId}' does not exist in Firestore.`;
      console.error(msg);
      report.push(msg);
      return report;
    }

    const data = docSnap.data();
    report.push(`SUCCESS: Found document '${cardId}'`);

    const checkUrl = async (field: string, url: string | undefined) => {
      if (!url) {
        report.push(`INFO: ${field} is not set.`);
        return;
      }
      if (url.startsWith('ecard-file://')) {
        report.push(`CHECKING: ${field} is chunked file -> ${url}`);
        const dataUrl = await loadLargeFile(url);
        if (dataUrl && dataUrl.startsWith('data:')) {
           report.push(`  SUCCESS: Successfully fetched and deserialized ${field} (${Math.round(dataUrl.length / 1024)} KB)`);
        } else {
           report.push(`  ERROR: Failed to load or deserialize chunked file for ${field} -> ${url}`);
        }
      } else {
        report.push(`INFO: ${field} is standard URL -> ${url.substring(0, 50)}...`);
      }
    };

    await checkUrl('Hero Image', data.heroImageUrl);
    await checkUrl('Embed Image', data.embeddedImageUrl);
    await checkUrl('Ganesha Icon', data.ganeshaIconUrl);

    if (data.eventDetails && Array.isArray(data.eventDetails)) {
       for (let i = 0; i < data.eventDetails.length; i++) {
          const e = data.eventDetails[i];
          await checkUrl(`Event [${e.heading || i}] Image`, e.imageUrl);
          await checkUrl(`Event [${e.heading || i}] Caricature`, e.caricatureUrl);
       }
    }

    console.log(report.join('\n'));
    return report;
  } catch (error: any) {
    console.error("Diagnostic error:", error);
    report.push(`CRITICAL ERROR: ${error.message}`);
    return report;
  }
}
