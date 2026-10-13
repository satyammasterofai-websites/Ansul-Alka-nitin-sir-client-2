const fs = require('fs');
let code = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// 1. Revert main heading color
code = code.replace(
  /<h3 className="text-\[42px\] leading-tight md:text-6xl font-\['Great_Vibes',cursive\] mb-2 drop-shadow-md" style=\{\{ color: event\.headingColor \|\| '#FAF5EA' \}\}>/g,
  '<h3 className="text-[42px] leading-tight md:text-6xl font-[\'Great_Vibes\',cursive] text-[#FAF5EA] mb-2 drop-shadow-md">'
);

// 2. Revert values color (date, time, venue)
code = code.replace(
  /<p className="font-serif tracking-wide text-\[13px\] md:text-base drop-shadow font-medium" style=\{\{ color: event\.textColor \|\| '#FAF5EA' \}\}>\{event\.date\}<\/p>/g,
  '<p className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium">{event.date}</p>'
);
code = code.replace(
  /<p className="font-serif tracking-wide text-\[13px\] md:text-base drop-shadow font-medium" style=\{\{ color: event\.textColor \|\| '#FAF5EA' \}\}>\{event\.time\}<\/p>/g,
  '<p className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium">{event.time}</p>'
);
code = code.replace(
  /<p className="font-serif tracking-wide text-\[13px\] md:text-base drop-shadow font-medium" style=\{\{ color: event\.textColor \|\| '#FAF5EA' \}\}>\{event\.venue\}<\/p>/g,
  '<p className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium">{event.venue}</p>'
);

fs.writeFileSync('src/components/HeroSection.tsx', code);
