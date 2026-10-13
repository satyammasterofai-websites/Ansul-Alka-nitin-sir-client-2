const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  'if (dataToUse.heroImageUrl) dataToUse.heroImageUrl = await resolveUrl(dataToUse.heroImageUrl);',
  'if (dataToUse.heroImageUrl) dataToUse.heroImageUrl = await resolveUrl(dataToUse.heroImageUrl);\n          if (dataToUse.ogImageUrl) dataToUse.ogImageUrl = await resolveUrl(dataToUse.ogImageUrl);'
);

fs.writeFileSync('src/App.tsx', content);
