const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  'if (newId && newId.trim() !== "" && newId !== cardId) {\n      setCardId(newId.trim());',
  'if (newId && newId.trim() !== "" && newId !== cardId) {\n      localStorage.setItem(\'wedding-ecard-settings\', JSON.stringify(settings));\n      setCardId(newId.trim());'
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
