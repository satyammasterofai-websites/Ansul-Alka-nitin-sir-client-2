const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

// Add ogImageUrl to interface
if (!content.includes('ogImageUrl?: string;')) {
  content = content.replace(
    '  heroImageUrl: string;',
    '  heroImageUrl: string;\n  ogImageUrl?: string;'
  );
}

// Add to defaultSettings
if (!content.includes("ogImageUrl: '")) {
  content = content.replace(
    /heroImageUrl: '(.*?)',/,
    "heroImageUrl: '$1',\n  ogImageUrl: '$1',"
  );
}

fs.writeFileSync('src/types.ts', content);
