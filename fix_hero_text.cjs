const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// Replace hero text with settings
content = content.replace(
  `We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of`,
  `{settings.heroTopText || 'We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of'}`
);

content = content.replace(
  `              <h1 className="font-['Great_Vibes',cursive] text-6xl md:text-7xl leading-tight py-2 text-[#7a103c] drop-shadow-sm">
                Arjun Mehra
              </h1>`,
  `              <h1 className="font-['Great_Vibes',cursive] text-6xl md:text-7xl leading-tight py-2 text-[#7a103c] drop-shadow-sm whitespace-pre-wrap">
                {settings.heroGroomName || 'Riyansh'}
              </h1>`
);

content = content.replace(
  `              <p className="font-serif text-xs md:text-sm tracking-wider uppercase mt-2">
                S/o Mr. Rajesh Mehra<br/>& Mrs. Sunita Mehra
              </p>`,
  `              <p className="font-serif text-xs md:text-sm tracking-wider uppercase mt-2 whitespace-pre-wrap">
                {settings.heroGroomParents || 'S/o Mr. Rajesh\\n& Mrs. Sunita'}
              </p>`
);

content = content.replace(
  `            <p className="font-serif text-base italic my-6 text-[#8a1c47]">
              with
            </p>`,
  `            <p className="font-serif text-base italic my-6 text-[#8a1c47]">
              {settings.heroMiddleText || 'with'}
            </p>`
);

content = content.replace(
  `              <h1 className="font-['Great_Vibes',cursive] text-6xl md:text-7xl leading-tight py-2 text-[#7a103c] drop-shadow-sm">
                Ananya Sharma
              </h1>`,
  `              <h1 className="font-['Great_Vibes',cursive] text-6xl md:text-7xl leading-tight py-2 text-[#7a103c] drop-shadow-sm whitespace-pre-wrap">
                {settings.heroBrideName || 'Prinyanshi'}
              </h1>`
);

content = content.replace(
  `              <p className="font-serif text-xs md:text-sm tracking-wider uppercase mt-2 pb-6">
                D/o Mr. Vikram Sharma<br/>& Mrs. Neelam Sharma
              </p>`,
  `              <p className="font-serif text-xs md:text-sm tracking-wider uppercase mt-2 pb-6 whitespace-pre-wrap">
                {settings.heroBrideParents || 'D/o Mr. Vikram\\n& Mrs. Neelam'}
              </p>`
);

// Fix event text box background
content = content.replace(
  /<div className="inline-block bg-stone-900\/90 px-3 py-1 rounded shadow-md border border-\[#FAF5EA\]\/10 mb-1\.5 backdrop-blur-sm">/g,
  `<div className="inline-block mb-1">`
);

content = content.replace(
  /<p className="font-serif tracking-\[0\.2em\] text-\[#C9A15A\] uppercase text-\[9px\] md:text-\[10px\] font-bold">/g,
  `<p className="font-serif tracking-[0.2em] text-[#C9A15A] uppercase text-[10px] md:text-xs font-bold drop-shadow-md">`
);

fs.writeFileSync('src/components/HeroSection.tsx', content);
