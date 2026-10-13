const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

// Add properties to interface
content = content.replace(
  `  adminPassword?: string;`,
  `  adminPassword?: string;\n  heroTopText?: string;\n  heroGroomName?: string;\n  heroGroomParents?: string;\n  heroMiddleText?: string;\n  heroBrideName?: string;\n  heroBrideParents?: string;`
);

// Add default values to defaultSettings
content = content.replace(
  `export const defaultSettings: ECardSettings = {`,
  `export const defaultSettings: ECardSettings = {\n  heroTopText: 'We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of',\n  heroGroomName: 'Riyansh',\n  heroGroomParents: 'S/o Mr. Rajesh & Mrs. Sunita',\n  heroMiddleText: 'with',\n  heroBrideName: 'Prinyanshi',\n  heroBrideParents: 'D/o Mr. Vikram & Mrs. Neelam',`
);

fs.writeFileSync('src/types.ts', content);
