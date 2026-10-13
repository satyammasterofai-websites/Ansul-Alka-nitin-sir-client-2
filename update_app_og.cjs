const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Update preloading
const oldPreload = `        const imagesToPreload = [
          finalSettings.heroImageUrl,
          finalSettings.ganeshaIconUrl,
          ...(finalSettings.eventDetails?.map((e: any) => e.imageUrl) || [])
        ].filter(Boolean) as string[];`;

const newPreload = `        const imagesToPreload = [
          finalSettings.heroImageUrl,
          finalSettings.ogImageUrl,
          finalSettings.embeddedImageUrl,
          finalSettings.ganeshaIconUrl,
          ...(finalSettings.eventDetails?.map((e: any) => e.imageUrl) || []),
          ...(finalSettings.eventDetails?.map((e: any) => e.caricatureUrl) || [])
        ].filter(Boolean) as string[];`;

content = content.replace(oldPreload, newPreload);

// 2. Inject OG Meta Tag on load
const oldSetSettings = 'setSettings(finalSettings);';
const newSetSettings = `setSettings(finalSettings);
        
        // Update OG meta tags dynamically
        if (finalSettings.ogImageUrl) {
          const ogImageMeta = document.getElementById('og-image-meta');
          if (ogImageMeta) {
            ogImageMeta.setAttribute('content', finalSettings.ogImageUrl);
          }
        }
        
        // Ensure a custom title is set if possible
        const ogTitleMeta = document.getElementById('og-title-meta');
        if (ogTitleMeta) {
           const customTitle = \`\${finalSettings.heroGroomName || 'Groom'} weds \${finalSettings.heroBrideName || 'Bride'} Invitation\`;
           ogTitleMeta.setAttribute('content', customTitle);
           document.title = customTitle;
        }`;

content = content.replace(oldSetSettings, newSetSettings);

// 3. Save ogImageUrl (for debounce save)
const oldSaveSettingsToSave = `const settingsToSave = { ...settings };
          settingsToSave.heroImageUrl = await prepareUrl(settingsToSave.heroImageUrl, 'hero');`;
const newSaveSettingsToSave = `const settingsToSave = { ...settings };
          settingsToSave.heroImageUrl = await prepareUrl(settingsToSave.heroImageUrl, 'hero');
          if (settingsToSave.ogImageUrl) settingsToSave.ogImageUrl = await prepareUrl(settingsToSave.ogImageUrl, 'og');`;

content = content.replace(oldSaveSettingsToSave, newSaveSettingsToSave);

// 4. Save ogImageUrl (for onExit save)
const oldSaveExitSettingsToSave = `const settingsToSave = { ...settings };
      settingsToSave.heroImageUrl = await prepareUrl(settingsToSave.heroImageUrl, 'hero');`;
const newSaveExitSettingsToSave = `const settingsToSave = { ...settings };
      settingsToSave.heroImageUrl = await prepareUrl(settingsToSave.heroImageUrl, 'hero');
      if (settingsToSave.ogImageUrl) settingsToSave.ogImageUrl = await prepareUrl(settingsToSave.ogImageUrl, 'og');`;

content = content.replace(oldSaveExitSettingsToSave, newSaveExitSettingsToSave);

fs.writeFileSync('src/App.tsx', content);
