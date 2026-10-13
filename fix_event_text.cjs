const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// 1. Container layout
content = content.replace(
  'className="absolute top-4 left-0 right-0 flex flex-col items-center text-center px-6 z-10 sm:top-0 sm:bottom-0 sm:w-1/2 sm:justify-center sm:items-start sm:text-left sm:pl-12 md:pl-16"',
  'className="absolute top-0 h-[60%] sm:h-auto left-0 right-0 flex flex-col justify-center items-center text-center px-6 z-10 sm:bottom-0 sm:w-1/2 sm:items-start sm:text-left sm:pl-12 md:pl-16 pt-4 sm:pt-0"'
);

// 2. Heading
content = content.replace(
  'className="text-4xl md:text-5xl font-[\'Great_Vibes\',cursive] text-[#FAF5EA] mb-2 drop-shadow-md"',
  'className="text-5xl md:text-6xl font-[\'Great_Vibes\',cursive] text-[#FAF5EA] mb-2 drop-shadow-md"'
);

// 3. Description
content = content.replace(
  'className="font-serif italic text-[#FAF5EA]/90 mb-4 text-xs md:text-base leading-relaxed drop-shadow md:max-w-md"',
  'className="font-serif italic text-[#FAF5EA]/90 mb-4 sm:mb-6 text-sm md:text-lg leading-relaxed drop-shadow md:max-w-md"'
);

// 4. Labels
content = content.replace(
  /className="font-serif tracking-\[0.2em\] uppercase text-\[10px\] md:text-xs font-bold drop-shadow-md"/g,
  'className="font-serif tracking-[0.2em] uppercase text-[11px] md:text-sm font-bold drop-shadow-md"'
);

// 5. Details
content = content.replace(
  /className="font-serif tracking-wide text-\[#FAF5EA\] text-xs md:text-sm drop-shadow font-medium"/g,
  'className="font-serif tracking-wide text-[#FAF5EA] text-sm md:text-base drop-shadow font-medium"'
);

fs.writeFileSync('src/components/HeroSection.tsx', content);
