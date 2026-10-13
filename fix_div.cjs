const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Remove the extra opening div
content = content.replace(
  ") : activeTab === 'advanced' ? (\n            <div className=\"space-y-6\">\n              <div className=\"space-y-6\">",
  ") : activeTab === 'advanced' ? (\n            <div className=\"space-y-6\">"
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
