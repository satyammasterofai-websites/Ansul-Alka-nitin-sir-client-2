const fs = require('fs');

let code = fs.readFileSync('src/types.ts', 'utf8');
if (!code.includes('headingColor?: string;')) {
  code = code.replace('detailsColor?: string;', 'detailsColor?: string;\n  headingColor?: string;\n  textColor?: string;');
  fs.writeFileSync('src/types.ts', code);
}

let heroCode = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

// Replace heading color
heroCode = heroCode.replace(
  /<h3 className="text-\[42px\] leading-tight md:text-6xl font-\['Great_Vibes',cursive\] text-\[#FAF5EA\] mb-2 drop-shadow-md">/g,
  '<h3 className="text-[42px] leading-tight md:text-6xl font-[\'Great_Vibes\',cursive] mb-2 drop-shadow-md" style={{ color: event.headingColor || \'#FAF5EA\' }}>'
);

// Replace description color
heroCode = heroCode.replace(
  /<p className="font-serif italic text-\[#FAF5EA\]\/90 mb-3 sm:mb-6 text-\[13px\] md:text-lg leading-relaxed drop-shadow md:max-w-md">/g,
  '<p className="font-serif italic mb-3 sm:mb-6 text-[13px] md:text-lg leading-relaxed drop-shadow md:max-w-md" style={{ color: event.textColor ? `${event.textColor}E6` : \'rgba(250, 245, 234, 0.9)\' }}>'
);

// Replace date/time/venue value colors
heroCode = heroCode.replace(
  /<p className="font-serif tracking-wide text-\[#FAF5EA\] text-\[13px\] md:text-base drop-shadow font-medium">\{event.date\}<\/p>/g,
  '<p className="font-serif tracking-wide text-[13px] md:text-base drop-shadow font-medium" style={{ color: event.textColor || \'#FAF5EA\' }}>{event.date}</p>'
);
heroCode = heroCode.replace(
  /<p className="font-serif tracking-wide text-\[#FAF5EA\] text-\[13px\] md:text-base drop-shadow font-medium">\{event.time\}<\/p>/g,
  '<p className="font-serif tracking-wide text-[13px] md:text-base drop-shadow font-medium" style={{ color: event.textColor || \'#FAF5EA\' }}>{event.time}</p>'
);
heroCode = heroCode.replace(
  /<p className="font-serif tracking-wide text-\[#FAF5EA\] text-\[13px\] md:text-base drop-shadow font-medium">\{event.venue\}<\/p>/g,
  '<p className="font-serif tracking-wide text-[13px] md:text-base drop-shadow font-medium" style={{ color: event.textColor || \'#FAF5EA\' }}>{event.venue}</p>'
);

fs.writeFileSync('src/components/HeroSection.tsx', heroCode);
