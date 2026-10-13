const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const migrationCode = `if (dataToUse) {
          if (dataToUse.openingBgColor === '#fce7f3') {
            dataToUse.openingBgColor = '#DCE8D3';
          }
          if (dataToUse.eventDetails && dataToUse.eventDetails[0] && dataToUse.eventDetails[0].date === 'SAT · February 13, 2027') {
             // Force migration of events to new default format
             const defaultEvents = require('./types').defaultSettings.eventDetails;
             dataToUse.eventDetails = defaultEvents;
          }`;

const dataToUseCheck = /if \(dataToUse\) \{\s*if \(dataToUse\.openingBgColor === '#fce7f3'\) \{\s*dataToUse\.openingBgColor = '#DCE8D3';\s*\}/s;

if (content.match(dataToUseCheck)) {
  content = content.replace(dataToUseCheck, migrationCode);
  fs.writeFileSync('src/App.tsx', content);
  console.log("Migration code updated in App.tsx");
} else {
  console.log("Could not find the specific migration block in App.tsx.");
}
