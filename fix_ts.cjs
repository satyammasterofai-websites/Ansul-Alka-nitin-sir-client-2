const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  'const importedSettings = JSON.parse(event.target?.result);',
  'const importedSettings = JSON.parse(event.target?.result as string);'
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
