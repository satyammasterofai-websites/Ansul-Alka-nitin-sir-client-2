const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Add state
content = content.replace(
  `const [isLoading, setIsLoading] = useState(true);`,
  `const [isLoading, setIsLoading] = useState(true);\n  const [isExiting, setIsExiting] = useState(false);`
);

// Add to handleSaveAndExit
content = content.replace(
  `  const handleSaveAndExit = async () => {`,
  `  const handleSaveAndExit = async () => {\n    setIsExiting(true);`
);

content = content.replace(
  `    setCurrentView('opening');\n  };`,
  `    setCurrentView('opening');\n    setIsExiting(false);\n  };`
);

// Pass to AdminPanel
content = content.replace(
  `<AdminPanel \n          settings={settings}\n          setSettings={setSettings} \n          onExit={handleSaveAndExit} \n        />`,
  `<AdminPanel \n          settings={settings}\n          setSettings={setSettings} \n          onExit={handleSaveAndExit} \n          isExiting={isExiting}\n        />`
);

fs.writeFileSync('src/App.tsx', content);
