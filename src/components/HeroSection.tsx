import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ECardSettings } from '../types';
import { ScratchCardSection } from './ScratchCardSection';
import { MoveDown, MapPin, Settings, Instagram, MessageCircle } from 'lucide-react';

interface Props {
  onOpenAdmin?: () => void;
  onPauseMusic?: () => void;
  settings: ECardSettings;
  key?: string;
}

function WhatsAppIcon({ className = "w-5 h-5", useRealColor = false }: { className?: string; useRealColor?: boolean }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={useRealColor ? "#25D366" : "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-5 h-5", useRealColor = false }: { className?: string; useRealColor?: boolean }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill={useRealColor ? "url(#ig-real-gradient)" : "currentColor"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ig-real-gradient" r="150%" cx="30%" cy="107%">
          <stop stopColor="#fdf497" offset="0%" />
          <stop stopColor="#fdf497" offset="5%" />
          <stop stopColor="#fd5949" offset="45%" />
          <stop stopColor="#d6249f" offset="60%" />
          <stop stopColor="#285AEB" offset="90%" />
        </radialGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export function HeroSection({ settings, onOpenAdmin, onPauseMusic }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="relative w-full h-full min-h-full overflow-y-auto"
      style={{ backgroundColor: settings.sectionsBgColor || '#fdf2f8' }}
    >
      <div className="w-full flex flex-col items-center">
        {/* Hero Text Section (9:16 aspect ratio for mobile e-card) */}
        <div 
          className="relative w-full aspect-[9/16] md:aspect-auto md:min-h-screen flex flex-col items-center justify-center px-6 py-12 md:py-20 text-center overflow-hidden shrink-0 bg-cover bg-center"
          style={{
            backgroundImage: settings.heroImageUrl ? `url(${settings.heroImageUrl})` : 'none',
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
            )}
            <p className="font-serif text-sm md:text-xl tracking-widest text-[#8a1c47] mb-6 md:mb-10">
              || Shree Ganeshaya Namah ||
            </p>

            <p className="font-serif text-sm md:text-lg lg:text-xl leading-relaxed max-w-[280px] md:max-w-xl mx-auto mb-8 md:mb-12">
              {settings.heroTopText || 'We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of'}
            </p>

            {/* Systematic Centered Groom & Bride Section with small cohesive gap */}
            <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto text-center">
              {/* Groom Block */}
              <div className="flex flex-col items-center justify-center w-full">
                <h1 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight py-0.5 sm:py-1 whitespace-pre-wrap transition-all tracking-wide text-center"
                  style={{
                    fontFamily: `"${settings.heroGroomBrideFont || 'Playfair Display'}", serif`,
                    color: settings.heroGroomBrideColor || '#7a103c',
                    opacity: settings.heroGroomBrideOpacity !== undefined ? settings.heroGroomBrideOpacity / 100 : 0.9,
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.75), 0 2px 10px rgba(122, 16, 60, 0.15)'
                  }}
                >
                  {settings.heroGroomName || 'Anshul Kestwal'}
                </h1>
                <p className="font-serif text-xs sm:text-sm md:text-base lg:text-lg tracking-wider uppercase mt-1 md:mt-1.5 whitespace-pre-wrap text-center max-w-md mx-auto leading-relaxed">
                  {settings.heroGroomParents || 'S/o Mr. Rishi Ballabh Kestwal & Mrs. Shashi Kestwal'}
                </p>
              </div>

              {/* Connector - with very small gap */}
              <div className="flex items-center justify-center my-1.5 md:my-2.5">
                <p className="font-serif text-sm sm:text-base md:text-xl italic text-[#8a1c47] text-center font-medium">
                  {settings.heroMiddleText || 'with'}
                </p>
              </div>

              {/* Bride Block */}
              <div className="flex flex-col items-center justify-center w-full">
                <h1 
                  className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-tight py-0.5 sm:py-1 whitespace-pre-wrap transition-all tracking-wide text-center"
                  style={{
                    fontFamily: `"${settings.heroGroomBrideFont || 'Playfair Display'}", serif`,
                    color: settings.heroGroomBrideColor || '#7a103c',
                    opacity: settings.heroGroomBrideOpacity !== undefined ? settings.heroGroomBrideOpacity / 100 : 0.9,
                    textShadow: '0 1px 3px rgba(255, 255, 255, 0.75), 0 2px 10px rgba(122, 16, 60, 0.15)'
                  }}
                >
                  {settings.heroBrideName || 'Alka Joshi'}
                </h1>
                <p className="font-serif text-xs sm:text-sm md:text-base lg:text-lg tracking-wider uppercase mt-1 md:mt-1.5 pb-2 md:pb-4 whitespace-pre-wrap text-center max-w-md mx-auto leading-relaxed">
                  {settings.heroBrideParents || 'D/o Mr. Girish Joshi & Mrs. Bhawna Joshi'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="w-full flex flex-col items-center justify-center py-6  gap-2">
          <span className="text-xs tracking-widest text-stone-400 uppercase font-serif">Scroll Down</span>
          <MoveDown className="w-5 h-5 text-stone-400" strokeWidth={1} />
        </div>

        {/* Scratch Card Section */}
        <ScratchCardSection targetDate={settings.targetDate} settings={settings} />

        
        {/* Events Schedule Section */}
        {settings.eventDetails && settings.eventDetails.length > 0 && (
          <div id="events-section" className="w-full py-20 px-6 flex flex-col items-center relative bg-[#FAF5EA]">
            <div className="mb-16 text-center flex flex-col items-center">
              <div className="text-[#C9A15A] mb-4 opacity-70">
                <span className="font-serif text-lg flex items-center opacity-70">--- <span className="mx-2 text-xl">✿</span> ---</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-['Great_Vibes',cursive] text-[#8D2342] drop-shadow-sm">
                Events Schedule
              </h2>
              <div className="text-[#C9A15A] mt-4 opacity-70 rotate-180">
                <span className="font-serif text-lg flex items-center opacity-70">--- <span className="mx-2 text-xl">✿</span> ---</span>
              </div>
            </div>

            <div className="w-full max-w-4xl flex flex-col gap-8">
              {settings.eventDetails.map((event, index) => (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full relative aspect-[9/16] min-h-[520px] sm:aspect-auto sm:min-h-[460px] md:min-h-[480px] lg:min-h-[500px] lg:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border-[3px] border-[#FAF5EA] ring-1 ring-[#C9A15A]/30 bg-stone-900 group"
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
                  <div className="absolute inset-0 bg-black/40 sm:bg-gradient-to-r sm:from-black/75 sm:via-black/50 sm:to-black/20 pointer-events-none"></div>
                  
                  {/* Text Content */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex flex-col items-center text-center px-5 pt-6 pb-2 sm:pt-0 sm:pb-0 sm:px-0 sm:bottom-0 sm:right-auto sm:w-[54%] md:w-1/2 sm:items-start sm:text-left sm:pl-10 md:pl-14 lg:pl-16 sm:pr-4 sm:justify-center">
                    <h3 className="text-3xl xs:text-[34px] sm:text-4xl md:text-5xl font-['Great_Vibes',cursive] text-[#FAF5EA] mb-1.5 sm:mb-2.5 drop-shadow-md leading-tight pt-1">
                      {event.heading}
                    </h3>
                    {event.showDescription !== false && event.description && (
                      <p className="font-serif italic text-[#FAF5EA]/90 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm md:text-base leading-relaxed drop-shadow max-w-xs sm:max-w-sm md:max-w-md line-clamp-2 sm:line-clamp-4">
                        "{event.description}"
                      </p>
                    )}
                    {(event.showDate !== false || event.showTime !== false || event.showVenue !== false) && (
                       <div className="w-10 sm:w-12 h-px bg-[#FAF5EA]/50 my-1.5 sm:my-2.5" />
                    )}
                    
                    {event.showDate !== false && event.date && (
                      <div className="mb-1.5 sm:mb-2 w-full">
                         <div className="inline-block mb-0.5">
                           <p className="font-serif tracking-[0.2em] uppercase text-[9px] sm:text-[10px] md:text-xs font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>DATE</p>
                         </div>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-xs sm:text-sm md:text-base drop-shadow font-medium">{event.date}</p>
                      </div>
                    )}
                    {event.showTime !== false && event.time && (
                      <div className="mb-1.5 sm:mb-2 w-full">
                         <div className="inline-block mb-0.5">
                           <p className="font-serif tracking-[0.2em] uppercase text-[9px] sm:text-[10px] md:text-xs font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>TIME</p>
                         </div>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-xs sm:text-sm md:text-base drop-shadow font-medium">{event.time}</p>
                      </div>
                    )}
                    {event.showVenue !== false && event.venue && (
                      <div className="mb-1.5 sm:mb-2 w-full">
                         <div className="inline-block mb-0.5">
                           <p className="font-serif tracking-[0.2em] uppercase text-[9px] sm:text-[10px] md:text-xs font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>VENUE</p>
                         </div>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-xs sm:text-sm md:text-base drop-shadow font-medium">{event.venue}</p>
                      </div>
                    )}
                  </div>

                  {/* Caricature */}
                  {event.showCaricature && event.caricatureUrl && (
                    <>
                      {/* Mobile Caricature (Controlled by Admin Sliders) */}
                      <motion.div
                        initial={{ x: "-50%" }}
                        animate={{ y: [-3, 3, -3], x: "-50%" }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-20 pointer-events-none origin-bottom sm:hidden"
                        style={{
                          width: `${event.caricatureSize ?? 50}%`,
                          bottom: `${event.caricatureBottom ?? 0}%`,
                          left: `${event.caricatureLeft ?? 50}%`,
                        }}
                      >
                        <img src={event.caricatureUrl} alt="Caricature overlay" className="w-full h-auto drop-shadow-2xl" />
                      </motion.div>

                      {/* Desktop Caricature (Auto-fitted on the right) */}
                      <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-20 pointer-events-none origin-bottom hidden sm:flex items-end justify-center right-4 md:right-8 bottom-0 w-1/2 h-[95%]"
                      >
                        <img src={event.caricatureUrl} alt="Caricature overlay" className="w-auto h-full max-h-full object-contain drop-shadow-2xl object-bottom" />
                      </motion.div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Invitation Message Section */}
        <div className="w-full py-32 px-6 flex flex-col items-center justify-center text-center bg-[#DCE8D3]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-2xl flex flex-col items-center"
          >
            <div className="text-[#C9A15A]/60 mb-8">
              <span className="font-serif text-lg flex items-center opacity-70">--- <span className="mx-2 text-xl">✿</span> ---</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-['Great_Vibes',cursive] text-[#8D2342] mb-6 leading-relaxed">
              {settings.invitationMessageHeading || 'Awaiting Your Noble Presence'}
            </h3>
            <p className="font-serif italic text-lg md:text-xl text-[#6B5A51] leading-relaxed max-w-sm">
              {settings.invitationMessageBody || 'Because meeting two souls requires twice the joy — and you! Please join us to celebrate the wedding of Anshul & Alka.'}
            </p>
            <div className="text-[#C9A15A]/60 mt-8 rotate-180">
              <span className="font-serif text-lg flex items-center opacity-70">--- <span className="mx-2 text-xl">✿</span> ---</span>
            </div>
          </motion.div>
        </div>

        {/* Family Invitation Section */}
        <div id="family-section" className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#FAF5EA]">
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
              {settings.familyInviteSubHeading1 || 'The Kestwal & Joshi Families'}
            </h3>
            
            <div className="w-full border-[1px] border-[#C9A15A]/80 rounded-[2rem] p-12 flex flex-col items-center bg-[#FAF5EA]/40 backdrop-blur-sm shadow-sm relative">
              <div className="absolute -top-3 bg-[#DCE8D3] px-4 text-[#C9A15A]">
                <span className="font-serif text-2xl opacity-70">✿</span>
              </div>
              <p className="font-serif tracking-[0.2em] text-[#8D2342] text-[10px] md:text-xs uppercase font-bold mb-10 text-center w-full max-w-[200px] leading-relaxed">
                {settings.familyInviteSubHeading2 || 'AWAITING YOUR GRACIOUS PRESENCE'}
              </p>
              <div className="flex flex-col gap-4 font-serif text-lg md:text-xl text-[#6B5A51] leading-relaxed whitespace-pre-wrap">
                {(() => {
                  const raw = settings.familyNames || 'Mr. Rishi Ballabh Kestwal & Mrs. Shashi Kestwal\n(Parents of the Groom)\n\nMr. Girish Joshi & Mrs. Bhawna Joshi\n(Parents of the Bride)';
                  return raw
                    .replace(/Parents of Groom/g, 'Parents of the Groom')
                    .replace(/Parents of Bride/g, 'Parents of the Bride')
                    .replace(/Parents of the the Groom/g, 'Parents of the Groom')
                    .replace(/Parents of the the Bride/g, 'Parents of the Bride');
                })()}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Venue Section */}
        <div id="venue-section" className="w-full py-28 px-6 flex flex-col items-center text-center bg-[#DCE8D3]">
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
              {(!settings.mapHeading || settings.mapHeading === 'Where We Celebrate') ? 'This is Where We Celebrate' : settings.mapHeading}
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
              onClick={() => {
                if (onPauseMusic) {
                  onPauseMusic();
                }
              }}
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
            <h2 className="text-2xl md:text-3xl font-serif text-[#FAF5EA] mb-10 leading-tight max-w-lg tracking-[0.15em] uppercase font-medium">
              {settings.footerInviteNames || 'Anshul Kestwal & Alka Joshi'}
            </h2>
            
            <div className="text-[#C9A15A]/60 mb-10">
              <span className="font-serif text-lg flex items-center opacity-70">--- <span className="mx-2 text-xl">✿</span> ---</span>
            </div>
            
            <p className="font-serif text-[#FAF5EA]/90 text-sm md:text-base tracking-[0.2em] uppercase mb-4">
              {settings.footerInviteDate || '20th February 2027'}
            </p>
            <p className="font-serif tracking-[0.15em] text-[#C9A15A] text-[11px] md:text-xs uppercase font-semibold">
              {settings.footerHashtag || '#ANSHULWEDSALKA'}
            </p>
          </motion.div>
        </div>

        {/* Small Advertisement Section at End of Website */}
        {settings.showAdvertisement !== false && (
          <div className="w-full py-6 sm:py-8 px-4 sm:px-6 flex flex-col items-center justify-center bg-[#24160E] relative z-10 border-t border-[#C9A15A]/25 text-center">
            {/* Small line message for advertising */}
            <p className="text-xs sm:text-sm font-serif text-[#FAF5EA]/90 tracking-wide mb-3 max-w-md mx-auto">
              {settings.adTagline || 'Want a digital wedding invitation website like this? Connect with us:'}
            </p>

            {/* Real colour WhatsApp and Instagram icons */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-1 flex-wrap">
              {/* WhatsApp Link with Real Color Icon */}
              <a
                href={settings.adWhatsappUrl || "https://wa.me/919456411569?text=Hi!%20I%20loved%20your%20digital%20wedding%20invitation%20website%20and%20would%20like%20to%20create%20one%20for%20my%20wedding."}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-[#25D366]/40 hover:border-[#25D366] transition-all duration-200 group shadow-sm hover:scale-105 active:scale-95"
                title="Chat on WhatsApp"
              >
                <div className="w-6 h-6 rounded-full bg-[#25D366] flex items-center justify-center shadow shrink-0">
                  <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-sans font-medium text-[#FAF5EA] group-hover:text-[#25D366] transition-colors">
                  {settings.adWhatsappNumber || '+91 94564 11569'}
                </span>
              </a>

              {/* Instagram Link with Real Color Icon */}
              <a
                href={settings.adInstagramUrl || "https://www.instagram.com/digiinvitations_?igsi=MWh1ZnZhMm1xNnNkdw=="}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-[#E4405F]/40 hover:border-[#E4405F] transition-all duration-200 group shadow-sm hover:scale-105 active:scale-95"
                title="Follow on Instagram"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center shadow shrink-0 overflow-hidden bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
                  <InstagramIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-sans font-medium text-[#FAF5EA] group-hover:text-[#E4405F] transition-colors">
                  {settings.adInstagramHandle || '@digiinvitations_'}
                </span>
              </a>
            </div>

            {/* Subtle footer credit */}
            <p className="text-[11px] font-sans tracking-widest text-[#FAF5EA]/60 uppercase mt-3">
              {settings.adFooterText || 'Crafted with 🤍 by digiinvitations_'}
            </p>
          </div>
        )}

        {/* Admin Gear Button always rendered at bottom */}
        {onOpenAdmin && (
          <div className="w-full py-2.5 flex items-center justify-center bg-[#1c110b] relative z-10 border-t border-white/5">
            <button
              onClick={() => onOpenAdmin()}
              className="p-1.5 bg-white/5 hover:bg-white/10 text-[#FAF5EA]/40 hover:text-[#FAF5EA] rounded-full transition-all flex items-center justify-center"
              aria-label="Open Admin Panel"
              title="Admin Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
