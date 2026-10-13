const fs = require('fs');

// 1. Update types.ts
let typesContent = fs.readFileSync('src/types.ts', 'utf8');
if (!typesContent.includes('headingColor?: string;')) {
  typesContent = typesContent.replace(
    '  heading: string;',
    '  heading: string;\n  headingColor?: string;'
  );
  fs.writeFileSync('src/types.ts', typesContent);
}

// 2. Update HeroSection.tsx
let heroContent = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');
heroContent = heroContent.replace(
  /<h3 className="text-4xl md:text-5xl font-\['Great_Vibes',cursive\] text-\[#FAF5EA\] mb-2 drop-shadow-md">/g,
  `<h3 className="text-4xl md:text-5xl font-['Great_Vibes',cursive] mb-2 drop-shadow-md" style={{ color: event.headingColor || '#FAF5EA' }}>`
);
fs.writeFileSync('src/components/HeroSection.tsx', heroContent);

// 3. Update AdminPanel.tsx
let adminContent = fs.readFileSync('src/components/AdminPanel.tsx', 'utf8');
const headingColorInput = `
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-stone-800 mb-2">Heading Color</label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={activeEl.headingColor || '#FAF5EA'}
                            onChange={(e) => updateEvent(activeEl.id, 'headingColor', e.target.value)}
                            className="h-10 w-20 cursor-pointer rounded border border-stone-200"
                          />
                          <input
                            type="text"
                            value={activeEl.headingColor || '#FAF5EA'}
                            onChange={(e) => updateEvent(activeEl.id, 'headingColor', e.target.value)}
                            className="flex-1 px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600 uppercase"
                          />
                        </div>
                      </div>
`;
if (!adminContent.includes('>Heading Color</label>')) {
  adminContent = adminContent.replace(
    `                        onChange={(e) => updateEvent(activeEl.id, 'heading', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600"
                      />`,
    `                        onChange={(e) => updateEvent(activeEl.id, 'heading', e.target.value)}
                        className="w-full px-3 py-2 border border-stone-200 rounded-md focus:ring-stone-900 sm:text-sm text-stone-600"
                      />` + headingColorInput
  );
  fs.writeFileSync('src/components/AdminPanel.tsx', adminContent);
}

