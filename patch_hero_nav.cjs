const fs = require('fs');

let code = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// 1. Add Navigation Bar at the top of HeroSection return
const heroReturnTarget = `      <div className="w-full flex flex-col items-center">
        {/* Hero Text Section (9:16 aspect ratio for mobile e-card) */}`;

const heroReturnReplace = `      {/* Smooth Scrolling Navigation */}
      <div className="sticky top-0 z-[100] w-full flex justify-center pt-4 pb-2 px-4 pointer-events-none mix-blend-normal">
        <div className="flex items-center gap-4 sm:gap-8 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg pointer-events-auto border border-stone-200/50">
          <a href="#events-section" onClick={(e) => { e.preventDefault(); document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium hover:text-[#8D2342] transition-colors font-sans">Events</a>
          <span className="text-stone-300">|</span>
          <a href="#family-section" onClick={(e) => { e.preventDefault(); document.getElementById('family-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium hover:text-[#8D2342] transition-colors font-sans">Families</a>
          <span className="text-stone-300">|</span>
          <a href="#venue-section" onClick={(e) => { e.preventDefault(); document.getElementById('venue-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-stone-600 text-[10px] sm:text-xs uppercase tracking-widest font-medium hover:text-[#8D2342] transition-colors font-sans">Venue</a>
        </div>
      </div>

      <div className="w-full flex flex-col items-center -mt-[64px]">
        {/* Hero Text Section (9:16 aspect ratio for mobile e-card) */}`;

code = code.replace(heroReturnTarget, heroReturnReplace);

// 2. Add IDs to the sections
const eventsTarget = `        {/* Events Schedule Section */}
        {settings.eventDetails && settings.eventDetails.length > 0 && (
          <div className="w-full py-20 px-6 flex flex-col items-center relative bg-[#FAF5EA]">`;
const eventsReplace = `        {/* Events Schedule Section */}
        {settings.eventDetails && settings.eventDetails.length > 0 && (
          <div id="events-section" className="w-full py-20 px-6 flex flex-col items-center relative bg-[#FAF5EA]">`;
code = code.replace(eventsTarget, eventsReplace);

const familyTarget = `        {/* Family Invitation Section */}
        <div className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#FAF5EA]">`;
const familyReplace = `        {/* Family Invitation Section */}
        <div id="family-section" className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#FAF5EA]">`;
code = code.replace(familyTarget, familyReplace);

const venueTarget = `        {/* Venue Section */}
        <div className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#DCE8D3]">`;
const venueReplace = `        {/* Venue Section */}
        <div id="venue-section" className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#DCE8D3]">`;
code = code.replace(venueTarget, venueReplace);

fs.writeFileSync('src/components/HeroSection.tsx', code);
