const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

code = code.replace('  headingColor?: string;\n  textColor?: string;\n', '');

const oldHaldi = `      heading: 'Haldi Ceremony',
      headingColor: '#ff0000',
      detailsColor: '#ff0000',
      textColor: '#ff0000',`;
const newHaldi = `      heading: 'Haldi Ceremony',
      detailsColor: '#ff0000',`;

const oldWedding = `      heading: 'Wedding Ceremony',
      headingColor: '#FF69B4',
      detailsColor: '#FF69B4',
      textColor: '#FF69B4',`;
const newWedding = `      heading: 'Wedding Ceremony',
      detailsColor: '#FF69B4',`;

code = code.replace(oldHaldi, newHaldi);
code = code.replace(oldWedding, newWedding);

fs.writeFileSync('src/types.ts', code);
