const fs = require('fs');
const content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

const splitToken = '{/* Event Details Section */}';
const parts = content.split(splitToken);

if (parts.length !== 2) {
  console.error('Could not find split token exactly once.');
  process.exit(1);
}

const before = parts[0];

const closing = `      </div>
    </motion.div>
  );
}
`;

const replacement = `
        {/* Events Schedule Section */}
        {settings.eventDetails && settings.eventDetails.length > 0 && (
          <div className="w-full py-20 px-6 flex flex-col items-center relative bg-[#FAF5EA]">
            <div className="mb-16 text-center flex flex-col items-center">
              <div className="text-[#C9A15A] mb-4 opacity-70">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C20 11.0457 11.0457 20 0 20H40C28.9543 20 20 11.0457 20 0Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="text-5xl md:text-6xl font-['Great_Vibes',cursive] text-[#8D2342] drop-shadow-sm">
                Events Schedule
              </h2>
              <div className="text-[#C9A15A] mt-4 opacity-70 rotate-180">
                <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 0C20 11.0457 11.0457 20 0 20H40C28.9543 20 20 11.0457 20 0Z" fill="currentColor"/>
                </svg>
              </div>
            </div>

            <div className="w-full max-w-4xl flex flex-col gap-24">
              {settings.eventDetails.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full flex flex-col items-center"
                >
                  <div className="w-full aspect-[9/16] md:aspect-auto md:w-3/4 rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-15px_rgba(141,35,66,0.15)] border-[3px] border-[#FAF5EA] ring-1 ring-[#C9A15A]/30 bg-white">
                    <img
                      src={event.imageUrl}
                      alt={event.heading}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* Event Text Content below image */}
                  <div className="mt-8 flex flex-col items-center text-center max-w-md px-4">
                    <h3 className="text-4xl md:text-5xl font-['Great_Vibes',cursive] text-[#8D2342] mb-3">
                      {event.heading}
                    </h3>
                    {event.description && (
                      <p className="font-serif italic text-[#6B5A51] mb-5 text-sm md:text-base leading-relaxed">
                        "{event.description}"
                      </p>
                    )}
                    <div className="w-12 h-px bg-[#C9A15A]/50 mb-5" />
                    {event.date && (
                      <p className="font-serif tracking-[0.2em] text-[#8D2342] uppercase text-[11px] md:text-xs font-bold mb-2">
                        {event.date}
                      </p>
                    )}
                    {event.time && (
                      <p className="font-serif tracking-widest text-[#6B5A51] uppercase text-[11px] md:text-xs mb-2">
                        {event.time}
                      </p>
                    )}
                    {event.venue && (
                      <p className="font-serif text-[#6B5A51] text-[13px] md:text-sm mt-3 opacity-90">
                        {event.venue}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Invitation Message Section */}
        <div className="w-full py-32 px-6 flex flex-col items-center justify-center text-center bg-[#FAF5EA]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl flex flex-col items-center"
          >
            <div className="text-[#C9A15A]/60 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <h3 className="text-4xl md:text-5xl font-['Great_Vibes',cursive] text-[#8D2342] mb-6 leading-relaxed">
              {settings.invitationMessageHeading || 'Awaiting Your Noble Presence'}
            </h3>
            <p className="font-serif italic text-lg md:text-xl text-[#6B5A51] leading-relaxed max-w-sm">
              {settings.invitationMessageBody || 'Because meeting two souls requires twice the joy — and you!'}
            </p>
            <div className="text-[#C9A15A]/60 mt-8 rotate-180">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </motion.div>
        </div>

        {/* Family Invitation Section */}
        <div className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#DCE8D3]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            <p className="font-serif tracking-[0.25em] text-[#8D2342] text-[10px] md:text-xs uppercase font-bold mb-5">
              {settings.familyInviteHeading || 'WITH LOVE'}
            </p>
            <h3 className="text-5xl md:text-6xl font-['Great_Vibes',cursive] text-[#8D2342] mb-12">
              {settings.familyInviteSubHeading1 || 'The Families'}
            </h3>
            
            <div className="w-full border-[1px] border-[#C9A15A]/80 rounded-[2rem] p-12 flex flex-col items-center bg-[#FAF5EA]/40 backdrop-blur-sm shadow-sm relative">
              <div className="absolute -top-3 bg-[#DCE8D3] px-4 text-[#C9A15A]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
              </div>
              <p className="font-serif tracking-[0.2em] text-[#8D2342] text-[10px] md:text-xs uppercase font-bold mb-10 text-center w-full max-w-[200px] leading-relaxed">
                {settings.familyInviteSubHeading2 || 'AWAITING YOUR GRACIOUS PRESENCE'}
              </p>
              <div className="flex flex-col gap-4 font-serif text-lg md:text-xl text-[#6B5A51] leading-relaxed whitespace-pre-wrap">
                {settings.familyNames || 'Mr. Rajesh Mehra\\nMrs. Sunita Mehra'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Venue Section */}
        <div className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#FAF5EA]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl flex flex-col items-center"
          >
            <p className="font-serif tracking-[0.25em] text-[#8D2342] text-[10px] md:text-xs uppercase font-bold mb-5">
              {settings.mapSubHeading || 'VENUE'}
            </p>
            <h3 className="text-5xl md:text-6xl font-['Great_Vibes',cursive] text-[#8D2342] mb-8">
              {settings.mapHeading || 'Where We Celebrate'}
            </h3>
            <p className="font-serif text-lg md:text-xl text-[#6B5A51] mb-12 max-w-sm leading-relaxed">
              {settings.mapAddress || 'Royal Garden, Jaipur, Rajasthan'}
            </p>
            
            {settings.showMap !== false && (
              <div className="w-full rounded-[2rem] overflow-hidden shadow-[0_15px_40px_-15px_rgba(141,35,66,0.15)] border border-[#C9A15A]/30 aspect-square md:aspect-video relative mb-12 bg-[#F3EBE1]">
                <iframe 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src={"https://maps.google.com/maps?q=" + encodeURIComponent(settings.mapAddress || 'Royal Garden, Jaipur, Rajasthan') + "&t=&z=14&ie=UTF8&iwloc=&output=embed"}
                  title="Event Location Map"
                  className="absolute top-0 left-0 w-full h-full grayscale-[20%] sepia-[10%]"
                ></iframe>
              </div>
            )}
            
            <a
              href={"https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(settings.mapAddress || 'Royal Garden, Jaipur, Rajasthan')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-[#8D2342] text-[#FAF5EA] rounded-full font-serif tracking-[0.15em] shadow-[0_8px_25px_-8px_rgba(141,35,66,0.6)] hover:shadow-[0_8px_30px_-5px_rgba(141,35,66,0.5)] hover:scale-[1.02] transition-all text-[11px] sm:text-xs uppercase font-bold flex items-center gap-3 border border-[#C9A15A]/20"
            >
              <MapPin className="w-4 h-4" />
              Get Directions
            </a>
          </motion.div>
        </div>

        {/* Footer Section */}
        <div className="w-full py-28 px-6 flex flex-col items-center justify-center text-center bg-[#3B291F]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center"
          >
            <p className="font-serif tracking-[0.25em] text-[#C9A15A] text-[10px] md:text-xs uppercase font-bold mb-8">
              {settings.footerInviteHeading || 'WITH LOVE'}
            </p>
            <h2 className="text-5xl md:text-6xl font-['Great_Vibes',cursive] text-[#FAF5EA] mb-10 leading-tight max-w-lg">
              {settings.footerInviteNames || 'Arjun Mehra & Ananya Sharma'}
            </h2>
            
            <div className="text-[#C9A15A]/60 mb-10">
              <svg width="40" height="15" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C16 6.62742 10.6274 12 4 12H28C21.3726 12 16 6.62742 16 0Z" fill="currentColor"/>
              </svg>
            </div>
            
            <p className="font-serif text-[#FAF5EA]/90 text-sm md:text-base tracking-[0.2em] uppercase mb-4">
              {settings.footerInviteDate || '22nd November 2026'}
            </p>
            <p className="font-serif tracking-[0.15em] text-[#C9A15A] text-[11px] md:text-xs uppercase font-semibold">
              {settings.footerHashtag || '#ARJUNWEDSANANYA'}
            </p>
          </motion.div>
        </div>

        {/* Bottom Line & Credit */}
        <div className="w-full flex flex-col items-center justify-center pb-8 pt-4 bg-[#3B291F] relative z-10 border-t border-[#C9A15A]/20">
          <p className="text-[9px] md:text-[10px] font-sans tracking-widest text-[#FAF5EA]/40 uppercase mt-4">
            Crafted with 🤍 by digiinvitations_
          </p>
          {onOpenAdmin && (
            <button
              onClick={() => onOpenAdmin()}
              className="fixed bottom-6 right-6 z-[60] p-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-[#FAF5EA] rounded-full shadow-lg border border-white/20 transition-all"
              aria-label="Open Admin Panel"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
`;

fs.writeFileSync('src/components/HeroSection.tsx', before + replacement + closing);
