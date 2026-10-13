const fs = require('fs');
let content = fs.readFileSync('src/components/HeroSection.tsx', 'utf8');

const flowerIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="inline-block mx-2 opacity-80"><path d="M12 22c-4 0-8-3-8-8s4-8 8-8 8 3 8 8-4 8-8 8z"/><path d="M12 14c-1.5 0-3-1-3-3s1.5-3 3-3 3 1 3 3-1.5 3-3 3z"/></svg>`;
const flowerSymbol = `✿`;

content = content.replace(/<span className="font-serif text-lg">---\ \$ ---<\/span>/g, `<span className="font-serif text-lg flex items-center opacity-70">--- <span className="mx-2 text-xl">✿</span> ---</span>`);
content = content.replace(/<span className="font-serif text-lg">\$<\/span>/g, `<span className="font-serif text-2xl opacity-70">✿</span>`);

fs.writeFileSync('src/components/HeroSection.tsx', content);
