const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// Update imports
content = content.replace(
  /import { MoveDown, MapPin, Settings } from 'lucide-react';/,
  "import { MoveDown, MapPin, Settings, Instagram, MessageCircle } from 'lucide-react';"
);

// Update footer section
const oldFooter = `<p className="text-[9px] md:text-[10px] font-sans tracking-widest text-[#FAF5EA]/40 uppercase mt-4">
            Crafted with 🤍 by digiinvitations_
          </p>`;
          
const newFooter = `<div className="flex flex-col items-center gap-3 mt-4">
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
          </div>`;

content = content.replace(oldFooter, newFooter);

fs.writeFileSync('src/components/HeroSection.tsx', content);
