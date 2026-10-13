const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

content = content.replace(
  `imageUrl: await resolveUrl(e.imageUrl)`,
  `imageUrl: await resolveUrl(e.imageUrl),
              caricatureUrl: e.caricatureUrl ? await resolveUrl(e.caricatureUrl) : undefined`
);

content = content.replace(
  `imageUrl: await prepareUrl(e.imageUrl, \`event-\${e.id || i}\`)`,
  `imageUrl: await prepareUrl(e.imageUrl, \`event-\${e.id || i}\`),
                caricatureUrl: e.caricatureUrl ? await prepareUrl(e.caricatureUrl, \`event-\${e.id || i}-caricature\`) : undefined`
);

fs.writeFileSync('src/App.tsx', content);
