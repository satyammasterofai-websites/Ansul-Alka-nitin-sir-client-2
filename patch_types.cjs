const fs = require('fs');
let code = fs.readFileSync('src/types.ts', 'utf8');

const oldHaldi = `      heading: 'Haldi Ceremony',
      description: 'Let the laughter, love, and haldi glow begin as we celebrate this beautiful new beginning!',
      date: '12 February 2027, Friday',
      time: '11:00 AM – 1:00 PM',
      venue: 'The Garden Courtyard, Jaipur',`;
const newHaldi = `      heading: 'Haldi Ceremony',
      description: 'A vibrant morning filled with haldi, laughter, music, and beautiful family moments as we begin the wedding celebrations.',
      date: '18 February 2027, Thursday',
      time: '11:00 AM – 1:00 PM',
      venue: 'The Royal Garden, Jaipur',`;

const oldMehndi = `      heading: '🌿 Mehndi Ceremony',
      description: 'An evening filled with beautiful mehndi, music, laughter, and cherished memories.',
      date: '13 February 2027, Saturday',
      time: '5:00 PM – 8:00 PM',
      venue: 'Royal Orchid Lawn, Jaipur',`;
const newMehndi = `      heading: 'Mehndi Ceremony',
      description: 'An evening of intricate mehndi designs, music, dance, and joyful celebrations with family and friends.',
      date: '18 February 2027, Thursday',
      time: '5:00 PM – 8:00 PM',
      venue: 'The Royal Garden, Jaipur',`;

const oldSangeet = `      heading: '🎶 Sangeet Ceremony',
      description: 'Get ready to dance, sing, and celebrate the rhythm of love with our families and friends!',
      date: '14 February 2027, Sunday',
      time: '7:00 PM – 10:30 PM',
      venue: 'The Grand Palace Ballroom, Jaipur',`;
const newSangeet = `      heading: 'Sangeet Ceremony',
      description: 'Get ready for a magical evening of music, dance, performances, and unforgettable memories as both families come together.',
      date: '19 February 2027, Friday',
      time: '7:00 PM onwards',
      venue: 'Grand Palace Banquet, Jaipur',`;
      
const oldWedding = `      heading: '💍 Wedding Ceremony',
      description: 'With blessings in our hearts and love in our souls, we begin our forever together.',
      date: '15 February 2027, Monday',
      time: '7:00 PM onwards',
      venue: 'Rajputana Heritage Resort, Jaipur',`;
const newWedding = `      heading: 'Wedding Ceremony',
      description: 'With the blessings of our loved ones, we invite you to witness the beautiful beginning of our forever as we exchange vows and embark on a new journey together.',
      date: '20 February 2027, Saturday',
      time: '7:00 PM onwards',
      venue: 'Grand Palace Banquet, Jaipur',`;

code = code.replace(oldHaldi, newHaldi);
code = code.replace(oldMehndi, newMehndi);
code = code.replace(oldSangeet, newSangeet);
code = code.replace(oldWedding, newWedding);

fs.writeFileSync('src/types.ts', code);
