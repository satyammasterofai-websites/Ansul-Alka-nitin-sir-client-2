const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Insert a migration step around line 60
const dataToUseCheck = /if \(dataToUse\) \{/;
const migrationCode = `if (dataToUse) {
          if (dataToUse.openingBgColor === '#fce7f3') {
            dataToUse.openingBgColor = '#DCE8D3';
          }`;

if (content.match(dataToUseCheck)) {
  content = content.replace(dataToUseCheck, migrationCode);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Migration code added to App.tsx");
} else {
  console.log("Could not find dataToUse check in App.tsx");
}
