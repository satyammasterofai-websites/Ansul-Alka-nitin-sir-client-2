const fs = require('fs');
let content = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');

content = content.replace(
  `onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('bg-stone-200');
            }}`,
  `onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://placehold.co/800x800/cccccc/666666?text=Invalid+Link';
            }}`
);

content = content.replace(
  `onLoad={(e) => {
              e.currentTarget.style.display = 'block';
              e.currentTarget.parentElement?.classList.remove('bg-stone-200');
            }}`,
  ``
);

fs.writeFileSync('src/components/AdminPanel.tsx', content);
