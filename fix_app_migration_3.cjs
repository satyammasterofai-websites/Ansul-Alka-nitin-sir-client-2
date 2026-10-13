const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const defaultEvents = require\('\.\/types'\)\.defaultSettings\.eventDetails;/;
if (content.match(regex)) {
  content = content.replace(regex, 'const defaultEvents = defaultSettings.eventDetails;');
  fs.writeFileSync('src/App.tsx', content);
  console.log("Fixed require statement.");
} else {
  console.log("Could not find require statement.");
}

// Ensure the condition matches what the user might have saved
// The user might have saved "Haldi" for the first event, so we migrate if it is the old Haldi date or just generic
content = content.replace(
  /dataToUse\.eventDetails\[0\]\.date === 'SAT · February 13, 2027'/g,
  `dataToUse.eventDetails[0].date === 'SAT · February 13, 2027' || dataToUse.eventDetails[0].date === '12 February 2027, Friday'`
);
fs.writeFileSync('src/App.tsx', content);

