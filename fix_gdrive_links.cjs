const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

const regex = /onChange=\{\(e\) => onChange\(e\.target\.value\)\}/g;
content = content.replace(regex, `onChange={(e) => {
            let val = e.target.value;
            const gdriveMatch = val.match(/drive\\.google\\.com\\/file\\/d\\/([^\\/]+)/);
            if (gdriveMatch) {
              val = \`https://drive.google.com/uc?export=view&id=\${gdriveMatch[1]}\`;
            }
            const dropboxMatch = val.match(/dropbox\\.com\\/s\\/([^\\/]+\\/[^?]+)/);
            if (dropboxMatch) {
              val = \`https://dl.dropboxusercontent.com/s/\${dropboxMatch[1]}\`;
            }
            onChange(val);
          }}`);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
