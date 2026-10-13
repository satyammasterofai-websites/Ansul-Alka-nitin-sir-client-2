const fs = require('fs');
let heroContent = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

heroContent = heroContent.replace(
  /<p className="font-serif italic mb-4 text-xs md:text-base leading-relaxed drop-shadow md:max-w-md" style={{ color: event.detailsColor \|\| '#FAF5EA' }}>/g,
  '<p className="font-serif italic text-[#FAF5EA]/90 mb-4 text-xs md:text-base leading-relaxed drop-shadow md:max-w-md">'
);

fs.writeFileSync('src/components/HeroSection.tsx', heroContent);
