const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

const oldHaldi = `      heading: 'Haldi Ceremony',
      description: 'A vibrant morning filled with haldi, laughter, music, and beautiful family moments as we begin the wedding celebrations.',
      date: '18 February 2027, Thursday',
      time: '11:00 AM – 1:00 PM',
      venue: 'The Royal Garden, Jaipur',`;
const newHaldi = `      heading: 'Haldi Ceremony',
      headingColor: '#ff0000',
      detailsColor: '#ff0000',
      textColor: '#ff0000',
      description: 'A vibrant morning filled with haldi, laughter, music, and beautiful family moments as we begin the wedding celebrations.',
      date: '18 February 2027, Thursday',
      time: '11:00 AM – 1:00 PM',
      venue: 'The Royal Garden, Jaipur',`;

const oldWedding = `      heading: 'Wedding Ceremony',
      description: 'With the blessings of our loved ones, we invite you to witness the beautiful beginning of our forever as we exchange vows and embark on a new journey together.',
      date: '20 February 2027, Saturday',
      time: '7:00 PM onwards',
      venue: 'Grand Palace Banquet, Jaipur',`;
const newWedding = `      heading: 'Wedding Ceremony',
      headingColor: '#FF69B4',
      detailsColor: '#FF69B4',
      textColor: '#FF69B4',
      description: 'With the blessings of our loved ones, we invite you to witness the beautiful beginning of our forever as we exchange vows and embark on a new journey together.',
      date: '20 February 2027, Saturday',
      time: '7:00 PM onwards',
      venue: 'Grand Palace Banquet, Jaipur',`;

code = code.replace(oldHaldi, newHaldi);
code = code.replace(oldWedding, newWedding);

fs.writeFileSync('src/types.ts', code);
