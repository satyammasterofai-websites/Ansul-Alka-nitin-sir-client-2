const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

const oldHero = `<div 
          className="relative w-full aspect-[9/16] md:aspect-auto md:min-h-screen flex flex-col items-center justify-between px-6 py-12 md:py-20 text-center overflow-hidden shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: settings.heroImageUrl ? \`url(\${settings.heroImageUrl})\` : 'none',
          }}
        >
          
          {/* Area reserved for Ganesha Icon */}
          <div className="h-16 md:h-28 lg:h-32 w-full flex-shrink-0 flex items-center justify-center z-10">
            {settings.ganeshaIconUrl && (
              <img 
                src={settings.ganeshaIconUrl} 
                alt="Ganesha Icon" 
                className="h-full w-auto object-contain drop-shadow-sm"
                referrerPolicy="no-referrer"
              />
            )}
          </div>
          
          {/* Text Elements */}
          <div className="flex flex-col items-center justify-center flex-1 w-full z-10 text-[#7a103c]">`;

const newHero = `<div 
          className="relative w-full aspect-[9/16] md:aspect-auto md:min-h-screen flex flex-col items-center justify-center px-6 py-12 md:py-20 text-center overflow-hidden shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: settings.heroImageUrl ? \`url(\${settings.heroImageUrl})\` : 'none',
          }}
        >
          {/* Text Elements */}
          <div className="flex flex-col items-center justify-center w-full z-10 text-[#7a103c]">
            {settings.ganeshaIconUrl && (
              <img 
                src={settings.ganeshaIconUrl} 
                alt="Ganesha Icon" 
                className="h-16 md:h-24 lg:h-28 w-auto object-contain drop-shadow-sm mb-4 md:mb-6"
                referrerPolicy="no-referrer"
              />
            )}`;

content = content.replace(oldHero, newHero);
fs.writeFileSync('src/components/HeroSection.tsx', content);
