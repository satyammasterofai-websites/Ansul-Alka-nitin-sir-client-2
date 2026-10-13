const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  /activeTab === 'advanced' \? \(\s*<div className="space-y-6">\s*<div className="space-y-6">/,
  "activeTab === 'advanced' ? (\n            <div className=\"space-y-6\">"
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
