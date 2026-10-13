export interface TextElement {
  id: string;
  text: string;
  top: number;
  left: number;
  color: string;
  fontFamily: string;
  fontSize: number;
  textAlign: 'left' | 'center' | 'right';
}

export interface EventDetail {
  id: string;
  heading: string;
  detailsColor?: string;
  description?: string;
  date?: string;
  time?: string;
  venue?: string;
  imageUrl: string;
  directionUrl?: string;
  caricatureUrl?: string;
  showCaricature?: boolean;
  caricatureSize?: number;
  caricatureBottom?: number;
  caricatureLeft?: number;
  showDescription?: boolean;
  showDate?: boolean;
  showTime?: boolean;
  showVenue?: boolean;
}

export interface ECardSettings {
  remixOf?: string;
  openingBgColor: string;
  embeddedImageUrl: string;
  embeddedImageTop: number;
  embeddedImageLeft: number;
  embeddedImageWidth: number;
  textElements: TextElement[];
  heroImageUrl: string;
  ogImageUrl?: string;
  ganeshaIconUrl?: string;
  musicUrl: string;
  targetDate: string;
  eventDetails: EventDetail[];
  eventsBgColor: string;
  eventsSectionHeadingColor?: string;
  eventsSectionHeadingFont?: string;
  eventsImageHeadingColor?: string;
  eventsHeadingColor?: string; // keeping for backward compatibility
  sectionsBgColor?: string;
  mapHeading?: string;
  mapSubHeading?: string;
  mapAddress?: string;
  showMap?: boolean;
  
  // New section options
  invitationMessageHeading?: string;
  invitationMessageBody?: string;

  familyInviteHeading?: string;
  familyInviteSubHeading1?: string;
  familyInviteSubHeading2?: string;
  familyNames?: string;
  familyInviteBgColor?: string;
  
  contactHeading?: string;
  contactName?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactBgColor?: string;
  
  footerInviteHeading?: string;
  footerInviteNames?: string;
  footerInviteDate?: string;
  footerHashtag?: string;
  footerInviteFamilies?: string;
  footerInviteBgColor?: string;
  
  // New section option for holding page
  paymentPending?: boolean;
  paymentPendingText?: string;
  adminPassword?: string;
  heroTopText?: string;
  heroGroomName?: string;
  heroGroomParents?: string;
  heroMiddleText?: string;
  heroBrideName?: string;
  heroBrideParents?: string;
  customFields?: Record<string, string>;
  heroGroomBrideFont?: string;
  heroGroomBrideColor?: string;
  heroGroomBrideOpacity?: number;
  clientName?: string;
  clientId?: string;
  savedAs?: string;
  isOfficial?: boolean;
  isRemix?: boolean;
  remixName?: string;
  lastSaved?: string;
}

export const defaultSettings: ECardSettings = {
  clientName: 'nitin sir client -2',
  clientId: 'nitin-sir-client-2',
  savedAs: 'nitin sir client -2',
  isOfficial: false,
  isRemix: true,
  remixName: 'nitin sir client -2',
  heroTopText: 'We cordially invite you to witness the beginning of our forever and celebrate the wedding ceremony of',
  heroGroomName: 'Anshul Kestwal',
  heroGroomParents: 'S/o Mr. Rishi Ballabh \n& Mrs. Shashi Kestwal',
  heroMiddleText: 'with',
  heroBrideName: 'Alka Joshi',
  heroBrideParents: 'D/o Mr. Girish \n& Mrs. Bhawna Joshi',
  heroGroomBrideFont: 'Playfair Display',
  heroGroomBrideColor: '#7a103c',
  heroGroomBrideOpacity: 90,
  openingBgColor: '#DCE8D3',
  embeddedImageUrl: 'https://i.ibb.co/qY2S0Wfm/file-0000000038a882088dd609cbd193300b.png',
  embeddedImageTop: 46,
  embeddedImageLeft: 50,
  embeddedImageWidth: 84,
  textElements: [
    {
      id: 'migrated-1',
      text: 'You are invited!',
      top: 63,
      left: 14,
      color: '#000000',
      fontFamily: 'Cinzel',
      fontSize: 2,
      textAlign: 'center',
    },
    {
      id: 'text-1785678639587',
      text: 'Tap envelop to reveal Invitation ',
      top: 69,
      left: 23,
      color: '#000000',
      fontFamily: 'Great Vibes',
      fontSize: 1.3,
      textAlign: 'center',
    }
  ],
  heroImageUrl: 'https://i.ibb.co/PzwNNBD6/file-00000000ae748211873325400fc9bd40.png',
  ogImageUrl: 'https://cdn.phototourl.com/member/2026-10-13-dbde0119-ca10-4095-b75a-166637ecdb6a.png',
  ganeshaIconUrl: 'https://i.ibb.co/3mCLv4Zf/ganesh-idol-Tuby-Yj-SJ.png',
  musicUrl: 'https://www.image2url.com/r2/default/audio/1785770108745-a5a46950-d478-470f-a009-e4114ad223f9.mp3',
  targetDate: '2026-11-26',
  eventDetails: [
    {
      id: 'event-1785691647794',
      heading: 'Mehndi Ceremony',
      description: 'An evening of intricate mehndi designs, music, dance, and joyful celebrations with family and friends.',
      date: '25th November 2026, Wednesday ',
      time: '6:00 PM Onwards ',
      venue: 'Pravat Homes Resort, Thano, Dehradun',
      imageUrl: 'https://i.ibb.co/7NC15FJh/Mehndi-bg.png',
      directionUrl: 'https://share.google/cHJfHLG2bxOcpgDq1',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: true,
      caricatureUrl: 'https://i.supaimg.com/b43c386e-b172-419b-9f38-7856075f2e77/39878101-cb43-48d1-9dc1-49eb6e780148.png',
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    },
    {
      id: 'event-1785691683471',
      heading: 'Sangeet Ceremony',
      description: 'Get ready for a magical evening of music, dance, performances, and unforgettable memories as both families come together.',
      date: '26th November 2026, Wednesday ',
      time: '6:00 PM Onwards ',
      venue: 'Pravat Homes Resort, Thano, Dehradun',
      imageUrl: 'https://i.ibb.co/sp4RP4Zp/Sangeet-bg.png',
      directionUrl: 'https://share.google/cHJfHLG2bxOcpgDq1',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: true,
      caricatureUrl: 'https://i.supaimg.com/b43c386e-b172-419b-9f38-7856075f2e77/5de9845c-dd9d-468b-b9a0-82d0a9f4928b.png',
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 48
    },
    {
      id: 'event-1',
      heading: 'Haldi Ceremony',
      detailsColor: '#ff0000',
      description: 'A vibrant morning filled with haldi, laughter, music, and beautiful family moments as we begin the wedding celebrations.',
      date: '26th November 2026, Thursday',
      time: '10:00 AM – 1:00 PM',
      venue: 'Pravat Homes Resort, Thano, Dehradun ',
      imageUrl: 'https://i.ibb.co/4ZdnFx9f/file-000000007c048208a93c5954867ca76e.png',
      directionUrl: 'Pravat Homes Resort, Thano, Dehradun',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: true,
      caricatureUrl: 'https://i.supaimg.com/b43c386e-b172-419b-9f38-7856075f2e77/d9eb2632-7dbe-42eb-92b8-4ab74977cd5a.png',
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    },
    {
      id: 'event-1785691714818',
      heading: 'Wedding Ceremony',
      detailsColor: '#FF69B4',
      description: 'With the blessings of our loved ones, we invite you to witness the beautiful beginning of our forever as we exchange vows and embark on a new journey together.',
      date: '26th November 2026, Thursday ',
      time: '7:00 PM onwards',
      venue: 'Pravat Homes Resort, Thano, Dehradun',
      imageUrl: 'https://i.ibb.co/prLDW5Sk/wedding-bg.png',
      directionUrl: 'https://share.google/cHJfHLG2bxOcpgDq1',
      showDescription: true,
      showDate: true,
      showTime: true,
      showVenue: true,
      showCaricature: true,
      caricatureUrl: 'https://i.supaimg.com/b43c386e-b172-419b-9f38-7856075f2e77/e10a5293-c733-42ef-9329-aefe7ef4ce04.png',
      caricatureSize: 50,
      caricatureBottom: 0,
      caricatureLeft: 50
    }
  ],
  eventsBgColor: '#FAF5EA',
  eventsSectionHeadingColor: '#8D2342',
  eventsSectionHeadingFont: 'Great Vibes',
  eventsImageHeadingColor: '#000000',
  eventsHeadingColor: '#000000',
  sectionsBgColor: '#FAF5EA',
  mapHeading: 'Where We Celebrate',
  mapSubHeading: 'VENUE',
  mapAddress: 'Pravat Homes Resort, Thano, Dehradun',
  showMap: true,
  invitationMessageHeading: 'Awaiting Your Noble Presence',
  invitationMessageBody: 'Because meeting two souls requires twice the joy — and you! Please join us to celebrate the wedding of Anshul & Alka.',
  familyInviteHeading: 'WITH LOVE',
  familyInviteSubHeading1: 'The Kestwal & Joshi Families',
  familyInviteSubHeading2: 'AWAITING YOUR GRACIOUS PRESENCE',
  familyNames: 'Mr. Rishi Ballabh Kestwal & Mrs. Shashi Kestwal\n(Parents of Groom)\n\nMr. Girish Joshi & Mrs. Bhawna Joshi\n(Parents of Bride)',
  familyInviteBgColor: '#DCE8D3',
  contactHeading: 'CONTACT DETAILS:',
  contactName: 'RISHI BALLABH KESTWAL / GIRISH JOSHI',
  contactPhone: '+91 9456411569',
  contactAddress: 'Address: 42 Lotus Heights, Bandra West, Mumbai 400050',
  contactBgColor: '',
  footerInviteHeading: 'WITH LOVE',
  footerInviteNames: 'ANSHUL & ALKA',
  footerInviteDate: '26th November 2026',
  footerHashtag: '#ANSHULWEDSALKA',
  footerInviteFamilies: 'KESTWAL & JOSHI FAMILIES',
  footerInviteBgColor: '#3B291F',
  paymentPending: false,
  paymentPendingText: "'Anshul weds Alka' wedding Invitation website didn't purchase yet",
};
