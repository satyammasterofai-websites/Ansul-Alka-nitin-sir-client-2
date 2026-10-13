const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

// Replace handleEventChange signature and body
content = content.replace(
  "const handleEventChange = (id: string, field: 'heading' | 'imageUrl' | 'directionUrl', value: string) => {",
  "const handleEventChange = (id: string, field: 'heading' | 'description' | 'date' | 'time' | 'venue' | 'imageUrl' | 'directionUrl', value: string) => {"
);

// We need to find the Event Details section mapping in AdminPanel.tsx to add the new fields.
fs.writeFileSync('src/components/AdminPanel.tsx', content);
