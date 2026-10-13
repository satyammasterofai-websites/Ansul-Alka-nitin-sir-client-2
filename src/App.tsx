import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Settings, Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ECardSettings, defaultSettings } from './types';
import { saveLargeFile, loadLargeFile } from './lib/storage';
import { determineInitialCardId, getFromLocalStorage, saveToLocalStorage, sanitizeCardIdForSave, MASTER_CARD_ID, REMIX_DEFAULT_CARD_ID, isOfficialWebsite, getWebsiteName } from './lib/cardInstance';
import { OpeningPage } from './components/OpeningPage';
import { HeroSection } from './components/HeroSection';
import { AdminPanel } from './components/AdminPanel';
import { FallingEmojis } from './components/FallingEmojis';

import { Butterflies } from './components/Butterflies';

type ViewState = 'opening' | 'hero' | 'admin';

const uploadCache = new Map<string, string>();
const uploadPromiseCache = new Map<string, Promise<string>>();

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('opening');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [settings, setSettings] = useState<ECardSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  
  const [cardId, setCardId] = useState<string>(() => {
    return determineInitialCardId();
  });

  // Dynamically set title and meta tags based on official template vs remix
  useEffect(() => {
    const siteName = getWebsiteName();
    document.title = siteName;
    const ogTitle = document.getElementById('og-title-meta');
    if (ogTitle) ogTitle.setAttribute('content', siteName);
    const ogImg = document.getElementById('og-image-meta');
    if (ogImg && settings.ogImageUrl) ogImg.setAttribute('content', settings.ogImageUrl);
  }, [settings.ogImageUrl]);

  // Clear file caches whenever database/card ID changes to prevent cross-contamination
  useEffect(() => {
    uploadCache.clear();
    uploadPromiseCache.clear();
  }, [cardId]);

  // Load settings from Firestore or LocalStorage fallback
  useEffect(() => {
    const loadSettings = async () => {
      // Auto-migrate any legacy 'remix-v1' cardId
      if (cardId === 'remix-v1') {
        const target = isOfficialWebsite() ? MASTER_CARD_ID : REMIX_DEFAULT_CARD_ID;
        localStorage.setItem('wedding_custom_card_id', target);
        setCardId(target);
        return;
      }

      setLoadingProgress(10);
      let finalSettings = defaultSettings;
      let isNewRemixDoc = false;
      
      try {
        const docRef = doc(db, 'wedding_invitations', cardId);
        let dataToUse: any = null;

        // Fetch from Firestore first for this specific cardId
        let docSnap = await getDoc(docRef);
        setLoadingProgress(30);
        
        if (!docSnap.exists() && (cardId === 'nitin-sir-client-2' || cardId === 'nitin sir client -2')) {
          const aliasSnap = await getDoc(doc(db, 'wedding_invitations', 'nitin sir client -2'));
          if (aliasSnap.exists()) {
            docSnap = aliasSnap;
          }
        }

        if (docSnap.exists()) {
          dataToUse = docSnap.data();
          console.log(`Loaded data from Firestore for card: ${cardId}`);
        } else {
          // If no document exists for this cardId:
          console.log(`Card document '${cardId}' not found. Loading template from master '${MASTER_CARD_ID}'...`);
          isNewRemixDoc = true;

          if (cardId !== MASTER_CARD_ID) {
            try {
              const masterSnap = await getDoc(doc(db, 'wedding_invitations', MASTER_CARD_ID));
              if (masterSnap.exists()) {
                dataToUse = masterSnap.data();
                console.log(`Successfully cloned template data from ${MASTER_CARD_ID} into remix ${cardId}`);
              }
            } catch (err) {
              console.warn(`Could not load master template ${MASTER_CARD_ID}:`, err);
            }
          }

          // If still no Firestore data, check local storage
          if (!dataToUse) {
            const saved = getFromLocalStorage(cardId);
            if (saved) {
              dataToUse = saved;
              console.log(`Recovered data from local storage for ${cardId}`);
            }
          }
        }

        // Resolve chunked files regardless of whether it's local or firestore
        if (dataToUse) {
          if (dataToUse.openingBgColor === '#fce7f3') {
            dataToUse.openingBgColor = '#DCE8D3';
          }

          const resolveUrl = async (url: string) => {
            if (url && typeof url === 'string' && url.startsWith('ecard-file://')) {
              const dataUrl = await loadLargeFile(url);
              if (dataUrl) {
                const actualFileId = url.replace('ecard-file://', '');
                // Populate cache ONLY if this file already belongs to the current cardId.
                if (actualFileId.startsWith('nitin-sir-client-2-') || actualFileId.startsWith(`${cardId}-`)) {
                  uploadCache.set(dataUrl, url);
                }
                return dataUrl;
              }
              return ''; // Return empty string so broken ecard-file:// doesn't show up in image src
            }
            return url;
          };
          
          if (dataToUse.heroImageUrl) dataToUse.heroImageUrl = await resolveUrl(dataToUse.heroImageUrl);
          if (dataToUse.ogImageUrl) dataToUse.ogImageUrl = await resolveUrl(dataToUse.ogImageUrl);
          if (dataToUse.embeddedImageUrl) dataToUse.embeddedImageUrl = await resolveUrl(dataToUse.embeddedImageUrl);
          if (dataToUse.musicUrl) dataToUse.musicUrl = await resolveUrl(dataToUse.musicUrl);
          if (dataToUse.ganeshaIconUrl) dataToUse.ganeshaIconUrl = await resolveUrl(dataToUse.ganeshaIconUrl);
          
          if (dataToUse.eventDetails && Array.isArray(dataToUse.eventDetails)) {
            dataToUse.eventDetails = await Promise.all(dataToUse.eventDetails.map(async (e: any) => ({
              ...e,
              imageUrl: await resolveUrl(e.imageUrl),
              caricatureUrl: e.caricatureUrl ? await resolveUrl(e.caricatureUrl) : undefined
            })));
          }

          const merged = { 
            ...defaultSettings, 
            ...dataToUse,
            clientName: 'nitin sir client -2',
            clientId: 'nitin-sir-client-2',
            savedAs: 'nitin sir client -2',
            isOfficial: false,
            isRemix: true,
            remixName: 'nitin sir client -2'
          };
          // Migration from old openingText properties
          if (!dataToUse.textElements && dataToUse.openingText) {
            merged.textElements = [{
              id: 'migrated-1',
              text: dataToUse.openingText,
              top: dataToUse.openingTextTop ?? 20,
              left: dataToUse.openingTextLeft ?? 50,
              color: dataToUse.openingTextColor ?? '#831843',
              fontFamily: dataToUse.openingTextFontFamily ?? 'Playfair Display',
              fontSize: dataToUse.openingTextFontSize ?? 3,
              textAlign: dataToUse.openingTextAlign ?? 'center',
            }];
          }
          finalSettings = merged;
          setSettings(merged);

          // If this is a newly opened remix, initialize its own Firestore doc immediately
          if (isNewRemixDoc) {
            try {
              const targetDocId = sanitizeCardIdForSave(cardId);
              const cleanInitial = JSON.parse(JSON.stringify(merged));
              await setDoc(doc(db, 'wedding_invitations', targetDocId), cleanInitial);
              if (targetDocId === 'nitin-sir-client-2') {
                await setDoc(doc(db, 'wedding_invitations', 'nitin sir client -2'), cleanInitial);
              }
              console.log(`Initialized separate Firestore document for remix '${targetDocId}' and 'nitin sir client -2'`);
            } catch (err) {
              console.warn(`Could not initialize Firestore doc for ${cardId}:`, err);
            }
          }
          saveToLocalStorage(cardId, merged);
        } else {
          const initSettings = {
            ...defaultSettings,
            clientName: 'nitin sir client -2',
            clientId: 'nitin-sir-client-2',
            savedAs: 'nitin sir client -2',
            isOfficial: false,
            isRemix: true,
            remixName: 'nitin sir client -2'
          };
          await setDoc(docRef, initSettings);
          await setDoc(doc(db, 'wedding_invitations', 'nitin sir client -2'), initSettings);
          saveToLocalStorage(cardId, initSettings);
        }
      } catch (error: any) {
        console.warn('Error in loadSettings:', error.message);
        // Fallback to local storage if EVERYTHING failed
        try {
          const savedData = getFromLocalStorage(cardId);
          if (savedData) {
            const merged = { ...defaultSettings, ...savedData };
            if (!savedData.textElements && savedData.openingText) {
              merged.textElements = [{
                id: 'migrated-1',
                text: savedData.openingText,
                top: savedData.openingTextTop ?? 20,
                left: savedData.openingTextLeft ?? 50,
                color: savedData.openingTextColor ?? '#831843',
                fontFamily: savedData.openingTextFontFamily ?? 'Playfair Display',
                fontSize: savedData.openingTextFontSize ?? 3,
                textAlign: savedData.openingTextAlign ?? 'center',
              }];
            }
            finalSettings = merged;
            setSettings(merged);
          }
        } catch (e) {
          console.warn('Error reading local storage during fallback:', e);
        }
      }

      // Preload critical images to prevent lag
      try {
        const imagesToPreload = [
          finalSettings.embeddedImageUrl,
          finalSettings.heroImageUrl,
          finalSettings.ganeshaIconUrl,
          ...(finalSettings.eventDetails?.map((e: any) => e.imageUrl) || [])
        ].filter(Boolean) as string[];

        const totalImages = imagesToPreload.length;
        if (totalImages === 0) {
          setLoadingProgress(100);
        } else {
          let loadedImages = 0;
          const preloadPromises = imagesToPreload.map((url) => {
            return new Promise((resolve) => {
              const img = new Image();
              const handleLoad = () => {
                 loadedImages++;
                 setLoadingProgress(30 + Math.round((loadedImages / totalImages) * 70));
                 resolve(null);
              };
              img.onload = handleLoad;
              img.onerror = handleLoad;
              img.src = url;
            });
          });

          await Promise.all(preloadPromises);
        }
      } catch (e) {
        console.warn('Error during image preloading', e);
      }

      setTimeout(() => { setIsLoading(false); }, 400); // slight delay so user sees 100%
    };
    
    loadSettings();
  }, [cardId]);

  // Prevent accidental refresh while uploading
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isExiting || uploadPromiseCache.size > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isExiting]);

  // Save settings whenever they change, with a slight debounce
  useEffect(() => {
    if (isLoading) return;
    
    const timeoutId = setTimeout(() => {
      const saveSettings = async () => {
        try {
          // Check for large files and chunk them
          const prepareUrl = async (url: string, id: string) => {
            if (url && typeof url === 'string' && url.startsWith('data:') && url.length > 20000) {
               if (uploadCache.has(url)) {
                 return uploadCache.get(url)!;
               }
               if (uploadPromiseCache.has(url)) {
                 return await uploadPromiseCache.get(url)!;
               }
               const promise = saveLargeFile(`${cardId}-${id}`, url).then(ecardUrl => {
                 uploadCache.set(url, ecardUrl);
                 return ecardUrl;
               }).finally(() => {
                 uploadPromiseCache.delete(url);
               });
               uploadPromiseCache.set(url, promise);
               return await promise;
            }
            return url;
          };
          
          const settingsToSave = { ...settings };
          settingsToSave.heroImageUrl = await prepareUrl(settingsToSave.heroImageUrl, 'hero');
          if (settingsToSave.ogImageUrl) settingsToSave.ogImageUrl = await prepareUrl(settingsToSave.ogImageUrl, 'og');
          settingsToSave.embeddedImageUrl = await prepareUrl(settingsToSave.embeddedImageUrl, 'embedded');
          settingsToSave.musicUrl = await prepareUrl(settingsToSave.musicUrl, 'music');
          if (settingsToSave.ganeshaIconUrl) settingsToSave.ganeshaIconUrl = await prepareUrl(settingsToSave.ganeshaIconUrl, 'ganesha');
          
          if (settingsToSave.eventDetails && Array.isArray(settingsToSave.eventDetails)) {
             settingsToSave.eventDetails = await Promise.all(settingsToSave.eventDetails.map(async (e, i) => ({
                ...e,
                imageUrl: await prepareUrl(e.imageUrl, `event-${e.id || i}`),
                caricatureUrl: e.caricatureUrl ? await prepareUrl(e.caricatureUrl, `event-${e.id || i}-caricature`) : undefined
             })));
          }

          // Firestore does not accept undefined values, so we strip them
          const cleanSettings = JSON.parse(JSON.stringify(settingsToSave));
          cleanSettings.clientName = 'nitin sir client -2';
          cleanSettings.clientId = 'nitin-sir-client-2';
          cleanSettings.savedAs = 'nitin sir client -2';
          cleanSettings.isOfficial = false;
          cleanSettings.isRemix = true;
          cleanSettings.remixName = 'nitin sir client -2';
          cleanSettings.lastSaved = new Date().toISOString();

          const targetCardId = sanitizeCardIdForSave(cardId);
          await setDoc(doc(db, 'wedding_invitations', targetCardId), cleanSettings);
          if (targetCardId === 'nitin-sir-client-2') {
            await setDoc(doc(db, 'wedding_invitations', 'nitin sir client -2'), cleanSettings);
          }
          saveToLocalStorage(targetCardId, cleanSettings);
          saveToLocalStorage('nitin sir client -2', cleanSettings);
        } catch (error: any) {
          console.warn('Error saving settings to Firestore, falling back to local storage:', error.message);
          const targetCardId = sanitizeCardIdForSave(cardId);
          saveToLocalStorage(targetCardId, settings);
        }
      };
      saveSettings();
    }, 1000); // 1s debounce
    
    return () => clearTimeout(timeoutId);
  }, [settings, isLoading, cardId]);

  const handleSaveAndExit = async () => {
    setIsExiting(true);
    const targetCardId = sanitizeCardIdForSave(cardId);
    // Force a save to local storage immediately when exiting admin panel
    saveToLocalStorage(targetCardId, settings);
    saveToLocalStorage('nitin sir client -2', settings);
    
    try {
          const prepareUrl = async (url: string, id: string) => {
            if (url && typeof url === 'string' && url.startsWith('data:') && url.length > 20000) {
               if (uploadCache.has(url)) {
                 return uploadCache.get(url)!;
               }
               if (uploadPromiseCache.has(url)) {
                 return await uploadPromiseCache.get(url)!;
               }
               const promise = saveLargeFile(`${targetCardId}-${id}`, url).then(ecardUrl => {
                 uploadCache.set(url, ecardUrl);
                 return ecardUrl;
               }).finally(() => {
                 uploadPromiseCache.delete(url);
               });
               uploadPromiseCache.set(url, promise);
               return await promise;
            }
            return url;
          };
      
      const settingsToSave = { ...settings };
      settingsToSave.heroImageUrl = await prepareUrl(settingsToSave.heroImageUrl, 'hero');
      if (settingsToSave.ogImageUrl) settingsToSave.ogImageUrl = await prepareUrl(settingsToSave.ogImageUrl, 'og');
      settingsToSave.embeddedImageUrl = await prepareUrl(settingsToSave.embeddedImageUrl, 'embedded');
      settingsToSave.musicUrl = await prepareUrl(settingsToSave.musicUrl, 'music');
      if (settingsToSave.ganeshaIconUrl) settingsToSave.ganeshaIconUrl = await prepareUrl(settingsToSave.ganeshaIconUrl, 'ganesha');
      
      if (settingsToSave.eventDetails && Array.isArray(settingsToSave.eventDetails)) {
         settingsToSave.eventDetails = await Promise.all(settingsToSave.eventDetails.map(async (e, i) => ({
            ...e,
            imageUrl: await prepareUrl(e.imageUrl, `event-${e.id || i}`),
            caricatureUrl: e.caricatureUrl ? await prepareUrl(e.caricatureUrl, `event-${e.id || i}-caricature`) : undefined
         })));
      }

      // Firestore does not accept undefined values, so we strip them by serializing to JSON
      const cleanSettings = JSON.parse(JSON.stringify(settingsToSave));
      cleanSettings.clientName = 'nitin sir client -2';
      cleanSettings.clientId = 'nitin-sir-client-2';
      cleanSettings.savedAs = 'nitin sir client -2';
      cleanSettings.isOfficial = false;
      cleanSettings.isRemix = true;
      cleanSettings.remixName = 'nitin sir client -2';
      cleanSettings.lastSaved = new Date().toISOString();

      const savePromise = setDoc(doc(db, 'wedding_invitations', targetCardId), cleanSettings);
      const aliasPromise = targetCardId === 'nitin-sir-client-2'
        ? setDoc(doc(db, 'wedding_invitations', 'nitin sir client -2'), cleanSettings)
        : Promise.resolve();

      await Promise.race([
        Promise.all([savePromise, aliasPromise]),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Database save timed out. Please check your internet connection.")), 15000))
      ]);
      saveToLocalStorage(targetCardId, cleanSettings);
      saveToLocalStorage('nitin sir client -2', cleanSettings);
    } catch (error: any) {
      console.error('Error saving settings to Firestore on exit:', error);
      alert("Error saving to database: " + error.message + "\n\nFiles may have been too large or network disconnected.");
      setIsExiting(false);
      return; // Do not close the panel if there's an error
    }
    setCurrentView('opening');
    setIsExiting(false);
  };

  if (isLoading) {
    return (
      <div 
        className="w-screen h-screen flex flex-col items-center justify-center gap-8 relative overflow-hidden"
        style={{ backgroundColor: settings.openingBgColor || '#fce7f3', color: '#831843' }}
      >
        {/* Subtle expanding rings for premium feel */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-[1px] border-current opacity-10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border-[1px] border-current opacity-5 rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        
        {/* Elegant minimal spinner */}
        <div className="relative z-10 w-10 h-10 border-[2px] border-current/20 border-t-current rounded-full animate-spin" />
        
        <div className="relative z-10 flex flex-col items-center gap-4 mt-6 w-64">
          <p className="font-['Playfair_Display',serif] tracking-[0.2em] uppercase text-xs md:text-sm font-medium animate-pulse">
            Loading Your Invitation
          </p>
          
          <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-current/20 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-current transition-all duration-300 ease-out" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
            <span className="text-[10px] tracking-widest font-sans opacity-70">{loadingProgress}%</span>
          </div>
        </div>
      </div>
    );
  }

  const handleStartTransition = () => {
    setIsTransitioning(true);
  };

  const handleEnterCard = () => {
    setIsTransitioning(false);
    setCurrentView('hero');
    if (audioRef.current && settings.musicUrl) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay prevented:", err);
      });
    }
  };

  const handleOpenAdmin = () => {
    setShowPasswordModal(true);
    setPasswordInput('');
    setPasswordError(false);
  };

  if (settings.paymentPending && currentView !== 'admin') {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-white text-stone-900 p-8 text-center relative overflow-hidden selection:bg-stone-200">
        <h1 className="text-2xl md:text-4xl font-serif max-w-4xl leading-relaxed tracking-wide z-10">
          {settings.paymentPendingText || "'Pranay weds Alisha' wedding Invitation website didn't purchase yet"}
        </h1>
        <button
          onClick={handleOpenAdmin}
          className="fixed top-4 right-4 z-[60] p-3 bg-black/5 backdrop-blur-sm hover:bg-black/10 text-stone-600 hover:text-stone-900 rounded-full shadow-sm transition-all"
        >
          <Settings size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-stone-900 selection:bg-stone-200">
      {settings.musicUrl && (
        <audio ref={audioRef} src={settings.musicUrl} loop className="hidden" />
      )}
      <FallingEmojis />
      <Butterflies isOpening={currentView === 'opening' && !isTransitioning} settings={settings} />
      {currentView === 'admin' ? (
        <AdminPanel 
          settings={settings}
          setSettings={setSettings} 
          onExit={handleSaveAndExit} 
          isExiting={isExiting}
          cardId={cardId}
          setCardId={setCardId}
        />
      ) : (
        <>
          <AnimatePresence mode="wait">
            {currentView === 'opening' && (
              <OpeningPage 
                key="opening" 
                settings={settings}
                onClickEmbedded={handleEnterCard} 
                onStartTransition={handleStartTransition}
              />
            )}
            
            {currentView === 'hero' && (
              <HeroSection 
                key="hero" 
                settings={settings}
                onOpenAdmin={handleOpenAdmin}
              />
            )}
          </AnimatePresence>
        </>
      )}

      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl space-y-4">
            <h3 className="text-xl font-serif text-stone-900">Admin Access</h3>
            <p className="text-stone-500 text-sm">Please enter the admin password to continue.</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                   if (passwordInput === '6396') {
                     setShowPasswordModal(false);
                     setCurrentView('admin');
                   } else {
                     setPasswordError(true);
                   }
                }
              }}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900 focus:outline-none text-stone-900"
              placeholder="Enter password..."
              autoFocus
            />
            {passwordError && (
              <p className="text-red-500 text-sm m-0">Incorrect password.</p>
            )}
            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-stone-500 hover:text-stone-700 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (passwordInput === '6396') {
                     setShowPasswordModal(false);
                     setCurrentView('admin');
                   } else {
                     setPasswordError(true);
                   }
                }}
                className="px-6 py-2 bg-stone-900 text-white rounded-xl font-medium hover:bg-stone-800"
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
