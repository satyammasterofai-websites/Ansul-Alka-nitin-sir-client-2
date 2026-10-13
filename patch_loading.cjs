const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add loadingProgress state
code = code.replace(
  "const [isLoading, setIsLoading] = useState(true);",
  "const [isLoading, setIsLoading] = useState(true);\n  const [loadingProgress, setLoadingProgress] = useState(0);"
);

// 2. Add progress updates to loadSettings
code = code.replace(
  "const loadSettings = async () => {\n      let finalSettings = defaultSettings;",
  "const loadSettings = async () => {\n      setLoadingProgress(10);\n      let finalSettings = defaultSettings;"
);

code = code.replace(
  "const docSnap = await getDoc(docRef);\n        \n        if (docSnap.exists()) {\n          dataToUse = docSnap.data();\n          console.log('Loaded data from Firestore');\n        }",
  "const docSnap = await getDoc(docRef);\n        setLoadingProgress(30);\n        \n        if (docSnap.exists()) {\n          dataToUse = docSnap.data();\n          console.log('Loaded data from Firestore');\n        }"
);

// Replace the preloading block
const oldPreloadTarget = `      // Preload critical images to prevent lag
      try {
        const imagesToPreload = [
          finalSettings.embeddedImageUrl,
          finalSettings.heroImageUrl,
          finalSettings.ganeshaIconUrl,
          ...(finalSettings.eventDetails?.map((e: any) => e.imageUrl) || [])
        ].filter(Boolean) as string[];

        const preloadPromises = imagesToPreload.map((url) => {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // Resolve even on error so we don't block
            img.src = url;
          });
        });

        await Promise.all(preloadPromises);
      } catch (e) {
        console.warn('Error during image preloading', e);
      }

      setIsLoading(false);`;

const newPreloadTarget = `      // Preload critical images to prevent lag
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

      setTimeout(() => { setIsLoading(false); }, 400); // slight delay so user sees 100%`;

code = code.replace(oldPreloadTarget, newPreloadTarget);

// Update UI
const oldUITarget = `        <div className="relative z-10 flex flex-col items-center gap-2">
          <p className="font-['Playfair_Display',serif] tracking-[0.2em] uppercase text-xs md:text-sm font-medium animate-pulse">
            Loading Your Invitation
          </p>
          <div className="w-12 h-[1px] bg-current opacity-30 mt-2" />
        </div>`;

const newUITarget = `        <div className="relative z-10 flex flex-col items-center gap-4 mt-6 w-64">
          <p className="font-['Playfair_Display',serif] tracking-[0.2em] uppercase text-xs md:text-sm font-medium animate-pulse">
            Loading Your Invitation
          </p>
          
          <div className="w-full flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-current/20 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-current transition-all duration-300 ease-out" 
                 style={{ width: \`\${loadingProgress}%\` }}
               />
            </div>
            <span className="text-[10px] tracking-widest font-sans opacity-70">{loadingProgress}%</span>
          </div>
        </div>`;

code = code.replace(oldUITarget, newUITarget);

fs.writeFileSync('src/App.tsx', code);
