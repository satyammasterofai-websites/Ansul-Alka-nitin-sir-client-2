const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// 1. Container layout (add a little top padding to prevent clipping at the very top)
content = content.replace(
  'className="absolute top-0 h-[60%] sm:h-auto left-0 right-0 flex flex-col justify-center items-center text-center px-6 z-10 sm:bottom-0 sm:w-1/2 sm:items-start sm:text-left sm:pl-12 md:pl-16 pt-4 sm:pt-0"',
  'className="absolute top-0 h-[60%] sm:h-auto left-0 right-0 flex flex-col justify-center items-center text-center px-6 z-10 sm:bottom-0 sm:w-1/2 sm:items-start sm:text-left sm:pl-12 md:pl-16 pt-6 sm:pt-0"'
);

// 2. Heading
content = content.replace(
  'className="text-5xl md:text-6xl font-[\'Great_Vibes\',cursive] text-[#FAF5EA] mb-2 drop-shadow-md"',
  'className="text-[42px] leading-tight md:text-6xl font-[\'Great_Vibes\',cursive] text-[#FAF5EA] mb-2 drop-shadow-md"'
);

// 3. Description
content = content.replace(
  'className="font-serif italic text-[#FAF5EA]/90 mb-4 sm:mb-6 text-sm md:text-lg leading-relaxed drop-shadow md:max-w-md"',
  'className="font-serif italic text-[#FAF5EA]/90 mb-3 sm:mb-6 text-[13px] md:text-lg leading-relaxed drop-shadow md:max-w-md"'
);

// 4. Labels
content = content.replace(
  /className="font-serif tracking-\[0.2em\] uppercase text-\[11px\] md:text-sm font-bold drop-shadow-md"/g,
  'className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-sm font-bold drop-shadow-md"'
);

// 5. Details
content = content.replace(
  /className="font-serif tracking-wide text-\[#FAF5EA\] text-sm md:text-base drop-shadow font-medium"/g,
  'className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium"'
);

fs.writeFileSync('src/components/HeroSection.tsx', content);
