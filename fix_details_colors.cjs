const fs = require('fs');

// 1. Update types.ts
let typesContent = fs.readFileSync('src/types.ts', 'utf8');
typesContent = typesContent.replace('headingColor?: string;', 'detailsColor?: string;');
fs.writeFileSync('src/types.ts', typesContent);

// 2. Update HeroSection.tsx
let heroContent = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// Revert heading color
heroContent = heroContent.replace(
  /<h3 className="text-4xl md:text-5xl font-\['Great_Vibes',cursive\] mb-2 drop-shadow-md" style={{ color: event\.headingColor \|\| '#FAF5EA' }}>/g,
  `<h3 className="text-4xl md:text-5xl font-['Great_Vibes',cursive] text-[#FAF5EA] mb-2 drop-shadow-md">`
);

// Add detailsColor to description
heroContent = heroContent.replace(
  /<p className="font-serif italic text-\[#FAF5EA\]\/90 mb-4 text-xs md:text-base leading-relaxed drop-shadow md:max-w-md">/g,
  `<p className="font-serif italic mb-4 text-xs md:text-base leading-relaxed drop-shadow md:max-w-md" style={{ color: event.detailsColor || '#FAF5EA' }}>`
);

// Add detailsColor to DATE, TIME, VENUE
heroContent = heroContent.replace(
  /<p className="font-serif tracking-\[0.2em\] text-\[#C9A15A\] uppercase text-\[10px\] md:text-xs font-bold drop-shadow-md">DATE<\/p>/g,
  `<p className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>DATE</p>`
);

heroContent = heroContent.replace(
  /<p className="font-serif tracking-\[0.2em\] text-\[#C9A15A\] uppercase text-\[10px\] md:text-xs font-bold drop-shadow-md">TIME<\/p>/g,
  `<p className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>TIME</p>`
);

heroContent = heroContent.replace(
  /<p className="font-serif tracking-\[0.2em\] text-\[#C9A15A\] uppercase text-\[10px\] md:text-xs font-bold drop-shadow-md">VENUE<\/p>/g,
  `<p className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>VENUE</p>`
);

fs.writeFileSync('src/components/HeroSection.tsx', heroContent);

// 3. Update AdminPanel.tsx
let adminContent = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');
adminContent = adminContent.replace(/Heading Color/g, 'Details Color');
adminContent = adminContent.replace(/headingColor/g, 'detailsColor');
fs.writeFileSync('src/components/AdminPanel.tsx', adminContent);

