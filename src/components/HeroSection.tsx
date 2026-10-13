import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ECardSettings } from '../types';
import { ScratchCardSection } from './ScratchCardSection';
import { MoveDown, MapPin, Settings, Instagram, MessageCircle } from 'lucide-react';

interface Props {
  onOpenAdmin?: () => void;
  settings: ECardSettings;
  key?: string;
}

export function HeroSection({ settings, onOpenAdmin }: Props) {
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

            <div className="flex flex-col items-center w-full">
              <h1 
                className="text-5xl md:text-7xl lg:text-8xl leading-tight py-2 md:py-4 whitespace-pre-wrap transition-all tracking-wide text-center"
                style={{
                  fontFamily: `"${settings.heroGroomBrideFont || 'Playfair Display'}", serif`,
                  color: settings.heroGroomBrideColor || '#7a103c',
                  opacity: settings.heroGroomBrideOpacity !== undefined ? settings.heroGroomBrideOpacity / 100 : 0.9,
                  textShadow: '0 1px 3px rgba(255, 255, 255, 0.75), 0 2px 10px rgba(122, 16, 60, 0.15)'
                }}
              >
                {settings.heroGroomName || 'Anshul Kestwal'}
              </h1>
              <p className="font-serif text-xs md:text-base lg:text-lg tracking-wider uppercase mt-2 md:mt-4 whitespace-pre-wrap">
                {settings.heroGroomParents || 'S/o Mr. Rishi Ballabh\n& Mrs. Shashi Kestwal'}
              </p>
            </div>

            <p className="font-serif text-base md:text-2xl italic my-6 md:my-10 text-[#8a1c47]">
              {settings.heroMiddleText || 'with'}
            </p>

            <div className="flex flex-col items-center w-full">
              <h1 
                className="text-5xl md:text-7xl lg:text-8xl leading-tight py-2 md:py-4 whitespace-pre-wrap transition-all tracking-wide text-center"
                style={{
                  fontFamily: `"${settings.heroGroomBrideFont || 'Playfair Display'}", serif`,
                  color: settings.heroGroomBrideColor || '#7a103c',
                  opacity: settings.heroGroomBrideOpacity !== undefined ? settings.heroGroomBrideOpacity / 100 : 0.9,
                  textShadow: '0 1px 3px rgba(255, 255, 255, 0.75), 0 2px 10px rgba(122, 16, 60, 0.15)'
                }}
              >
                {settings.heroBrideName || 'Alka Joshi'}
              </h1>
              <p className="font-serif text-xs md:text-base lg:text-lg tracking-wider uppercase mt-2 md:mt-4 pb-6 md:pb-10 whitespace-pre-wrap">
                {settings.heroBrideParents || 'D/o Mr. Girish\n& Mrs. Bhawna Joshi'}
              </p>
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
                  className="w-full relative aspect-[9/16] sm:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl border-[3px] border-[#FAF5EA] ring-1 ring-[#C9A15A]/30 bg-stone-900 group"
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
                  <div className="absolute inset-0 bg-black/30 sm:bg-gradient-to-r sm:from-black/60 sm:via-black/40 sm:to-transparent pointer-events-none"></div>
                  
                  {/* Text Content */}
                  <div className="absolute top-0 h-[60%] sm:h-auto left-0 right-0 flex flex-col justify-center items-center text-center px-6 z-10 sm:bottom-0 sm:w-1/2 sm:items-start sm:text-left sm:pl-12 md:pl-16 pt-6 sm:pt-0">
                    <h3 className="text-[42px] leading-tight md:text-6xl font-['Great_Vibes',cursive] text-[#FAF5EA] mb-2 drop-shadow-md">
                      {event.heading}
                    </h3>
                    {event.showDescription !== false && event.description && (
                      <p className="font-serif italic text-[#FAF5EA]/90 mb-3 sm:mb-6 text-[13px] md:text-lg leading-relaxed drop-shadow md:max-w-md">
                        "{event.description}"
                      </p>
                    )}
                    {(event.showDate !== false || event.showTime !== false || event.showVenue !== false) && (
                       <div className="w-12 h-px bg-[#FAF5EA]/50 mb-4 md:ml-0" />
                    )}
                    
                    {event.showDate !== false && event.date && (
                      <div className="mb-3 w-full">
                         <div className="inline-block mb-1">
                           <p className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-sm font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>DATE</p>
                         </div>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium">{event.date}</p>
                      </div>
                    )}
                    {event.showTime !== false && event.time && (
                      <div className="mb-3 w-full">
                         <div className="inline-block mb-1">
                           <p className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-sm font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>TIME</p>
                         </div>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium">{event.time}</p>
                      </div>
                    )}
                    {event.showVenue !== false && event.venue && (
                      <div className="mb-3 w-full">
                         <div className="inline-block mb-1">
                           <p className="font-serif tracking-[0.2em] uppercase text-[10px] md:text-sm font-bold drop-shadow-md" style={{ color: event.detailsColor || '#C9A15A' }}>VENUE</p>
                         </div>
                         <p className="font-serif tracking-wide text-[#FAF5EA] text-[13px] md:text-base drop-shadow font-medium">{event.venue}</p>
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

                      {/* Desktop Caricature (Auto-fitted to 16:9 on the right) */}
                      <motion.div
                        animate={{ y: [-3, 3, -3] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute z-20 pointer-events-none origin-bottom hidden sm:flex items-end justify-center right-4 md:right-8 bottom-0 w-1/2 h-[95%]"
                      >
                        <img src={event.caricatureUrl} alt="Caricature overlay" className="w-auto h-full object-contain drop-shadow-2xl object-bottom" />
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
                {settings.familyNames || 'Mr. Rishi Ballabh Kestwal & Mrs. Shashi Kestwal\n(Parents of Groom)\n\nMr. Girish Joshi & Mrs. Bhawna Joshi\n(Parents of Bride)'}
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

        {/* Bottom Line & Credit */}
        <div className="w-full flex flex-col items-center justify-center pb-8 pt-4 bg-[#3B291F] relative z-10 border-t border-[#C9A15A]/20">
          <div className="flex flex-col items-center gap-3 mt-4">
            <p className="text-[9px] md:text-[10px] font-sans tracking-widest text-[#FAF5EA]/60 uppercase text-center mb-1">
              To create your memories contact
            </p>
            <div className="flex items-center gap-6 mb-2">
              <a href="https://www.instagram.com/digiinvitations_?igsi=MWh1ZnZhMm1xNnNkdw==" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:text-[#FAF5EA] transition-colors flex items-center gap-1.5 opacity-90 hover:opacity-100">
                <Instagram className="w-[14px] h-[14px]" />
                <span className="text-[9px] font-sans tracking-widest uppercase">Instagram</span>
              </a>
              <a href="https://wa.me/919456411569" target="_blank" rel="noopener noreferrer" className="text-[#C9A15A] hover:text-[#FAF5EA] transition-colors flex items-center gap-1.5 opacity-90 hover:opacity-100">
                <MessageCircle className="w-[14px] h-[14px]" />
                <span className="text-[9px] font-sans tracking-widest uppercase">WhatsApp</span>
              </a>
            </div>
            <p className="text-[8px] md:text-[9px] font-sans tracking-widest text-[#FAF5EA]/30 uppercase">
              Crafted with 🤍 by digiinvitations_
            </p>
          </div>
          {onOpenAdmin && (
            <button
              onClick={() => onOpenAdmin()}
              className="mt-6 mb-2 p-2 bg-white/5 hover:bg-white/10 text-[#FAF5EA]/50 hover:text-[#FAF5EA] rounded-full transition-all flex items-center justify-center"
              aria-label="Open Admin Panel"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
