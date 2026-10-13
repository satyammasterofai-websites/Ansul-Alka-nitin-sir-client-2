const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// 1. Fix the Hero text section container for desktop
content = content.replace(
  `className="relative w-full aspect-[9/16] md:max-h-screen flex flex-col items-center justify-between px-6 py-12 text-center overflow-hidden shrink-0 bg-cover bg-center"`,
  `className="relative w-full aspect-[9/16] md:aspect-auto md:min-h-screen flex flex-col items-center justify-between px-6 py-12 md:py-20 text-center overflow-hidden shrink-0 bg-cover bg-center"`
);

// 2. Increase text size and Ganesha icon size for desktop
content = content.replace(
  `<div className="h-16 md:h-20 w-full flex-shrink-0 flex items-center justify-center z-10">`,
  `<div className="h-16 md:h-28 lg:h-32 w-full flex-shrink-0 flex items-center justify-center z-10">`
);

content = content.replace(
  `<p className="font-serif text-sm md:text-base tracking-widest text-[#8a1c47] mb-6">`,
  `<p className="font-serif text-sm md:text-xl tracking-widest text-[#8a1c47] mb-6 md:mb-10">`
);

content = content.replace(
  `<p className="font-serif text-sm md:text-base leading-relaxed max-w-[280px] mx-auto mb-8">`,
  `<p className="font-serif text-sm md:text-lg lg:text-xl leading-relaxed max-w-[280px] md:max-w-xl mx-auto mb-8 md:mb-12">`
);

content = content.replace(
  /<h1 className="font-\['Great_Vibes',cursive\] text-6xl md:text-7xl leading-tight py-2 text-\[#7a103c\] drop-shadow-sm whitespace-pre-wrap">/g,
  `<h1 className="font-['Great_Vibes',cursive] text-6xl md:text-8xl lg:text-9xl leading-tight py-2 md:py-4 text-[#7a103c] drop-shadow-sm whitespace-pre-wrap">`
);

content = content.replace(
  /<p className="font-serif text-xs md:text-sm tracking-wider uppercase mt-2 whitespace-pre-wrap">/g,
  `<p className="font-serif text-xs md:text-base lg:text-lg tracking-wider uppercase mt-2 md:mt-4 whitespace-pre-wrap">`
);

content = content.replace(
  /<p className="font-serif text-xs md:text-sm tracking-wider uppercase mt-2 pb-6 whitespace-pre-wrap">/g,
  `<p className="font-serif text-xs md:text-base lg:text-lg tracking-wider uppercase mt-2 md:mt-4 pb-6 md:pb-10 whitespace-pre-wrap">`
);

content = content.replace(
  `<p className="font-serif text-base italic my-6 text-[#8a1c47]">`,
  `<p className="font-serif text-base md:text-2xl italic my-6 md:my-10 text-[#8a1c47]">`
);

// 3. Fix Event Caricature for Desktop

const oldCaricature = `                  {/* Caricature */}
                  {event.showCaricature && event.caricatureUrl && (
                    <motion.div
                      initial={{ x: "-50%" }}
                      animate={{ y: [-3, 3, -3], x: "-50%" }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute z-20 pointer-events-none origin-bottom"
                      style={{
                        width: \`\${event.caricatureSize ?? 50}%\`,
                        bottom: \`\${event.caricatureBottom ?? 0}%\`,
                        left: \`\${event.caricatureLeft ?? 50}%\`,
                      }}
                    >
                      <img src={event.caricatureUrl} alt="Caricature overlay" className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>
                  )}`;

const newCaricature = `                  {/* Caricature */}
                  {event.showCaricature && event.caricatureUrl && (
                    <>
                      {/* Mobile Caricature (Controlled by Admin Sliders) */}
                      <motion.div
                        initial={{ x: "-50%" }}
                        animate={{ y: [-3, 3, -3], x: "-50%" }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-20 pointer-events-none origin-bottom md:hidden"
                        style={{
                          width: \`\${event.caricatureSize ?? 50}%\`,
                          bottom: \`\${event.caricatureBottom ?? 0}%\`,
                          left: \`\${event.caricatureLeft ?? 50}%\`,
                        }}
                      >
                        <img src={event.caricatureUrl} alt="Caricature overlay" className="w-full h-auto drop-shadow-2xl" />
                      </motion.div>

                      {/* Desktop Caricature (Auto-fitted to 16:9 on the right) */}
                      <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-20 pointer-events-none origin-bottom hidden md:flex items-end justify-center right-8 bottom-0 w-1/2 h-[95%]"
                      >
                        <img src={event.caricatureUrl} alt="Caricature overlay" className="w-auto h-full object-contain drop-shadow-2xl object-bottom" />
                      </motion.div>
                    </>
                  )}`;

content = content.replace(oldCaricature, newCaricature);

// Make the description font size slightly larger on desktop inside events too
content = content.replace(
  /<p className="font-serif italic text-\[#FAF5EA\]\/90 mb-4 text-xs md:text-sm leading-relaxed drop-shadow max-w-sm">/g,
  `<p className="font-serif italic text-[#FAF5EA]/90 mb-4 text-xs md:text-base leading-relaxed drop-shadow md:max-w-md">`
);

fs.writeFileSync('src/components/HeroSection.tsx', content);
