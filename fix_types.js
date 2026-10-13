const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

// Add properties to interface
content = content.replace(
  `  adminPassword?: string;`,
  `  adminPassword?: string;
  heroTopText?: string;
  heroGroomName?: string;
  heroGroomParents?: string;
  heroMiddleText?: string;
  heroBrideName?: string;
  heroBrideParents?: string;`
);

// Add default values to defaultSettings
content = content.replace(
  `export const defaultSettings: ECardSettings = {`,
  `export const defaultSettings: ECardSettings = {
  heroTopText: 'We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of',
  heroGroomName: 'Riyansh',
  heroGroomParents: 'S/o Mr. Rajesh & Mrs. Sunita',
  heroMiddleText: 'with',
  heroBrideName: 'Prinyanshi',
  heroBrideParents: 'D/o Mr. Vikram & Mrs. Neelam',`
);

fs.writeFileSync('src/types.ts', content);
