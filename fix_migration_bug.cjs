const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  "dataToUse.eventDetails && dataToUse.eventDetails[0] && dataToUse.eventDetails[0].date === 'SAT · February 13, 2027' || dataToUse.eventDetails[0].date === '12 February 2027, Friday'",
  "dataToUse.eventDetails && dataToUse.eventDetails[0] && (dataToUse.eventDetails[0].date === 'SAT · February 13, 2027' || dataToUse.eventDetails[0].heading === 'Haldi' || dataToUse.eventDetails[0].heading === 'Haldi Ceremony')"
);

fs.writeFileSync('src/App.tsx', content);
