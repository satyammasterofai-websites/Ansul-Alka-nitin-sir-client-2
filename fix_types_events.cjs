const fs = require('fs');
let content = fs.readFileSync('src/types.ts', 'utf8');

const eventDetailsRegex = /eventDetails:\s*\[[\s\S]*?\]\,/m;

const newEvents = `eventDetails: [
    {
      id: 'event-1',
      heading: 'Haldi Ceremony',
      description: 'Let the laughter, love, and haldi glow begin as we celebrate this beautiful new beginning!',
      date: '12 February 2027, Friday',
      time: '11:00 AM – 1:00 PM',
      venue: 'The Garden Courtyard, Jaipur',
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
      directionUrl: '',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: false,
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    },
    {
      id: 'event-2',
      heading: '🌿 Mehndi Ceremony',
      description: 'An evening filled with beautiful mehndi, music, laughter, and cherished memories.',
      date: '13 February 2027, Saturday',
      time: '5:00 PM – 8:00 PM',
      venue: 'Royal Orchid Lawn, Jaipur',
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
      directionUrl: '',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: false,
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    },
    {
      id: 'event-3',
      heading: '🎶 Sangeet Ceremony',
      description: 'Get ready to dance, sing, and celebrate the rhythm of love with our families and friends!',
      date: '14 February 2027, Sunday',
      time: '7:00 PM – 10:30 PM',
      venue: 'The Grand Palace Ballroom, Jaipur',
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
      directionUrl: '',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: false,
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    },
    {
      id: 'event-4',
      heading: '💍 Wedding Ceremony',
      description: 'With blessings in our hearts and love in our souls, we begin our forever together.',
      date: '15 February 2027, Monday',
      time: '7:00 PM onwards',
      venue: 'Rajputana Heritage Resort, Jaipur',
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
      directionUrl: '',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: false,
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    }
  ],`;

content = content.replace(eventDetailsRegex, newEvents);
fs.writeFileSync('src/types.ts', content);

