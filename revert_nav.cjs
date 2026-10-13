const fs = require('fs');

let code = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// 1. Remove Smooth Scrolling Navigation
const navTarget = `      {/* Smooth Scrolling Navigation */}
      <div className="sticky top-0 z-[100] w-full flex justify-center pt-4 pb-2 px-4 pointer-events-none mix-blend-normal">
        <div className="flex items-center gap-4 sm:gap-8 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg pointer-events-auto border border-stone-200/50">
          <a href="#events-section" onClick={(e) => { e.preventDefault(); document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium hover:text-[#8D2342] transition-colors font-sans">Events</a>
          <span className="text-stone-300">|</span>
          <a href="#family-section" onClick={(e) => { e.preventDefault(); document.getElementById('family-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium hover:text-[#8D2342] transition-colors font-sans">Families</a>
          <span className="text-stone-300">|</span>
          <a href="#venue-section" onClick={(e) => { e.preventDefault(); document.getElementById('venue-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium hover:text-[#8D2342] transition-colors font-sans">Venue</a>
        </div>
      </div>

      <div className="w-full flex flex-col items-center -mt-[64px]">`;

const navReplace = `      <div className="w-full flex flex-col items-center">`;

code = code.replace(navTarget, navReplace);

// 2. Revert description color
const descTarget = /<p className="font-serif italic mb-3 sm:mb-6 text-\[13px\] md:text-lg leading-relaxed drop-shadow md:max-w-md" style=\{\{ color: event\.textColor \? `\$\{event\.textColor\}E6` : 'rgba\(250, 245, 234, 0\.9\)' \}\}>/g;
const descReplace = `<p className="font-serif italic text-[#FAF5EA]/90 mb-3 sm:mb-6 text-[13px] md:text-lg leading-relaxed drop-shadow md:max-w-md">`;

code = code.replace(descTarget, descReplace);

fs.writeFileSync('src/components/HeroSection.tsx', code);
