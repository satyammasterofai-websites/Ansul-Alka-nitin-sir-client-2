const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Pass props to AdminPanel
content = content.replace(
  '<AdminPanel \n          settings={settings}\n          setSettings={setSettings} \n          onExit={handleSaveAndExit} \n          isExiting={isExiting}\n        />',
  '<AdminPanel \n          settings={settings}\n          setSettings={setSettings} \n          onExit={handleSaveAndExit} \n          isExiting={isExiting}\n          cardId={cardId}\n          setCardId={setCardId}\n        />'
);

// 2. Change the default cardId from 'main-settings' to 'remix-v1' if not provided
content = content.replace(
  "return new URLSearchParams(window.location.search).get('id') || 'main-settings';",
  "return new URLSearchParams(window.location.search).get('id') || 'remix-v1';"
);

fs.writeFileSync('src/App.tsx', content);
