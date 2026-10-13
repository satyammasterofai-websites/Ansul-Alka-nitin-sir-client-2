const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

if (!html.includes('og-image-meta')) {
  html = html.replace('<head>', `<head>
    <meta property="og:image" content="" id="og-image-meta" />
    <meta property="og:title" content="Pranay wedding invite" id="og-title-meta" />`);
  fs.writeFileSync('index.html', html);
}
