const fs = require('fs');
let heroContent = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// Event card container
heroContent = heroContent.replace(
  /className="w-full relative aspect-\[9\/16\] md:aspect-\[16\/9\]/g,
  'className="w-full relative aspect-[9/16] sm:aspect-[16/9]'
);

// Event dark overlay
heroContent = heroContent.replace(
  /className="absolute inset-0 bg-black\/30 md:bg-gradient-to-r md:from-black\/60 md:via-black\/40 md:to-transparent pointer-events-none"/g,
  'className="absolute inset-0 bg-black/30 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/40 sm:to-transparent pointer-events-none"'
);

// Event text container
heroContent = heroContent.replace(
  /className="absolute top-4 left-0 right-0 flex flex-col items-center text-center px-6 z-10 md:top-0 md:bottom-0 md:w-1\/2 md:justify-center md:items-start md:text-left md:pl-16"/g,
  'className="absolute top-4 left-0 right-0 flex flex-col items-center text-center px-6 z-10 sm:top-0 sm:bottom-0 sm:w-1/2 sm:justify-center sm:items-start sm:text-left sm:pl-12 md:pl-16"'
);

// Mobile caricature
heroContent = heroContent.replace(
  /className="absolute z-20 pointer-events-none origin-bottom md:hidden"/g,
  'className="absolute z-20 pointer-events-none origin-bottom sm:hidden"'
);

// Desktop caricature
heroContent = heroContent.replace(
  /className="absolute z-20 pointer-events-none origin-bottom hidden md:flex items-end justify-center right-8 bottom-0 w-1\/2 h-\[95%\]"/g,
  'className="absolute z-20 pointer-events-none origin-bottom hidden sm:flex items-end justify-center right-4 md:right-8 bottom-0 w-1/2 h-[95%]"'
);

fs.writeFileSync('src/components/HeroSection.tsx', heroContent);
