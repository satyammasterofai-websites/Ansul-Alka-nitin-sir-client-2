const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const oldDescriptionBlockRegex = /<div className="space-y-3 bg-white p-4 rounded-xl border border-stone-100 shadow-sm">\s*<label className="block text-sm font-medium text-stone-800">Description<\/label>[\s\S]*?<label className="block text-sm font-medium text-stone-800">Venue<\/label>\s*<input[^>]+>\s*<\/div>/s;

if (content.match(oldDescriptionBlockRegex)) {
  content = content.replace(oldDescriptionBlockRegex, '');
} else {
  console.log("Could not find the old description block to remove.");
}

fs.writeFileSync('src/components/AdminPanel.tsx', content);
