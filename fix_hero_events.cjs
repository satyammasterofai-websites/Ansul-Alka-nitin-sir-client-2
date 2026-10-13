const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// Replace the event mapping part
const eventsRegex = /\{settings\.eventDetails\.map\(\(event, index\) => \([\s\S]*?<\/motion\.div>\s*\)\)\}/;

const newEventsCode = `{settings.eventDetails.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full relative aspect-[9/16] md:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border-[3px] border-[#FAF5EA] ring-1 ring-[#C9A15A]/30 bg-stone-900 group"
                >
                  {/* Background Image */}
                  <img
                    src={event.imageUrl}
                    alt={event.heading}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/1920x1080/064e3b/d1fae5?text=Invalid+Image+URL';
                    }}
                  />
                  {/* Dark Overlay for readability */}
                  <div className="absolute inset-0 bg-black/30 md:bg-gradient-to-r md:from-black/60 md:via-black/40 md:to-transparent pointer-events-none"></div>
                  
                  {/* Text Content */}
                  <div className="absolute top-10 left-0 right-0 flex flex-col items-center text-center px-6 z-10 md:top-0 md:bottom-0 md:w-1/2 md:justify-center md:items-start md:text-left md:pl-16">
                    <h3 className="text-5xl md:text-6xl font-['Great_Vibes',cursive] text-[#FAF5EA] mb-3 drop-shadow-md">
                      {event.heading}
                    </h3>
                    {event.showDescription !== false && event.description && (
                      <p className="font-serif italic text-[#FAF5EA]/90 mb-5 text-sm md:text-base leading-relaxed drop-shadow max-w-sm">
                        "{event.description}"
                      </p>
                    )}
                    {(event.showDate !== false || event.showTime !== false || event.showVenue !== false) && (
                       <div className="w-12 h-px bg-[#FAF5EA]/50 mb-5 md:ml-0" />
                    )}
                    
                    {event.showDate !== false && event.date && (
                      <div className="mb-4 w-full">
                         <p className="font-serif tracking-[0.2em] text-[#C9A15A] uppercase text-[10px] md:text-xs font-bold mb-1 drop-shadow">DATE</p>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-sm md:text-base drop-shadow">{event.date}</p>
                      </div>
                    )}
                    {event.showTime !== false && event.time && (
                      <div className="mb-4 w-full">
                         <p className="font-serif tracking-[0.2em] text-[#C9A15A] uppercase text-[10px] md:text-xs font-bold mb-1 drop-shadow">TIME</p>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-sm md:text-base drop-shadow">{event.time}</p>
                      </div>
                    )}
                    {event.showVenue !== false && event.venue && (
                      <div className="mb-4 w-full">
                         <p className="font-serif tracking-[0.2em] text-[#C9A15A] uppercase text-[10px] md:text-xs font-bold mb-1 drop-shadow">VENUE</p>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-sm md:text-base drop-shadow">{event.venue}</p>
                      </div>
                    )}
                  </div>

                  {/* Caricature */}
                  {event.showCaricature && event.caricatureUrl && (
                    <motion.div
                      animate={{ y: [-3, 3, -3] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute z-20 pointer-events-none origin-bottom"
                      style={{
                        width: \`\${event.caricatureSize ?? 50}%\`,
                        bottom: \`\${event.caricatureBottom ?? 0}%\`,
                        left: \`\${event.caricatureLeft ?? 50}%\`,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <img src={event.caricatureUrl} alt="Caricature overlay" className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>
                  )}
                </motion.div>
              ))}`;

if (content.match(eventsRegex)) {
  content = content.replace(eventsRegex, newEventsCode);
} else {
  console.log("Could not match events layout.");
}

// Replace flower SVGs with $
const svg1 = `<svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C20 11.0457 11.0457 20 0 20H40C28.9543 20 20 11.0457 20 0Z" fill="currentColor"/>
                </svg>`;
const svg1Replacement = `<span className="font-serif text-lg">--- $ ---</span>`;
content = content.split(svg1).join(svg1Replacement);

const svg2 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`;
const svg2Replacement = `<span className="font-serif text-lg">--- $ ---</span>`;
content = content.split(svg2).join(svg2Replacement);

const svg3 = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
const svg3Replacement = `<span className="font-serif text-lg">$</span>`;
content = content.split(svg3).join(svg3Replacement);

const svg4 = `<svg width="40" height="15" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C16 6.62742 10.6274 12 4 12H28C21.3726 12 16 6.62742 16 0Z" fill="currentColor"/>
              </svg>`;
const svg4Replacement = `<span className="font-serif text-lg">--- $ ---</span>`;
content = content.split(svg4).join(svg4Replacement);


// Update colors to alternate
// Invitation Message -> bg-[#DCE8D3]
content = content.replace(
  /<div className="w-full py-32 px-6 flex flex-col items-center justify-center text-center bg-\[#FAF5EA\]">/,
  `<div className="w-full py-32 px-6 flex flex-col items-center justify-center text-center bg-[#DCE8D3]">`
);
// Family Invite -> bg-[#FAF5EA]
content = content.replace(
  /<div className="w-full py-28 px-6 flex flex-col items-center text-center bg-\[#DCE8D3\]">/,
  `<div className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#FAF5EA]">`
);
// Venue Section -> bg-[#DCE8D3]
content = content.replace(
  /<div className="w-full py-28 px-6 flex flex-col items-center text-center bg-\[#FAF5EA\]">/,
  `<div className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#DCE8D3]">`
);

fs.writeFileSync('src/components/HeroSection.tsx', content);
