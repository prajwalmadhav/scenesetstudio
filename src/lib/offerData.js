// ─────────────────────────────────────────────────────────────
// Offer page data — EDIT PRICES HERE. Every offer page
// (/offer and the audience links) reads from this one file.
// All prices are starter prices in CAD.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  email: 'team@scenesetstudio.com',
  instagram: [
    { label: '@scenesetstudio', href: 'https://instagram.com/scenesetstudio' },
    // Add the other Instagram page(s) here:
    // { label: '@yourotherpage', href: 'https://instagram.com/yourotherpage' },
  ],
}

export const AREAS = 'Ottawa · Gatineau · Toronto · Montreal · Canada'

// ── Videos ─────────────────────────────────────────────────
// Drop files in /public/offer-videos/ and set `src` (e.g. '/offer-videos/football.mp4').
// Optional `poster`. Empty src = "coming soon" placeholder.
export const VIDEOS = {
  football:     { title: 'Football edit',          caption: 'High-energy sports edit — cut to the beat.', src: '' },
  prewedding:   { title: 'Pre-wedding film',       caption: 'Cinematic, film-look couple story.', src: '' },
  maternity:    { title: 'Maternity film',         caption: 'Soft, intimate, shot like a feature.', src: '' },
  realestate:   { title: 'Real estate walkthrough', caption: 'Highlight walkthrough that sells the space.', src: '' },
  agent:        { title: 'Agent signature reel',   caption: 'Creator-style reel that builds trust.', src: '' },
  event:        { title: 'Event highlight reel',   caption: 'The whole day, in under two minutes.', src: '' },
  restTiktok:   { title: 'TikTok-style story',     caption: 'Short storytelling for a restaurant client.', src: '' },
  restProcess:  { title: 'Process video',          caption: 'How the food gets made.', src: '' },
  restBts:      { title: 'Behind the scenes',      caption: 'The kitchen, the team, the moment.', src: '' },
  editBefore1:  { title: 'Before & after',         caption: 'Raw footage vs. final edit.', src: '' },
  editBefore2:  { title: 'Before & after',         caption: 'Raw footage vs. final edit.', src: '' },
  creator:      { title: 'Creator content',        caption: 'Creator-style and personal content (to be added).', src: '' },
  athlete:      { title: 'Athlete story film',     caption: 'Athlete story (to be added once made).', src: '' },
  basketball:   { title: 'Basketball edit',        caption: 'Basketball edit (to be added).', src: '' },
}

// ── Packages ───────────────────────────────────────────────
// price = number (CAD). priceMax optional range. per = suffix. prefix overrides "From".
export const PACKAGES = {
  // Real estate (stacked tiers)
  re1: { tab: 'realestate', name: 'Photos', includes: ['25 to 30 edited photos'], price: 200 },
  re2: { tab: 'realestate', name: 'Photos + Walkthrough', includes: ['Tier 1, plus', 'A highlight walkthrough video'], price: 450 },
  re3: { tab: 'realestate', name: 'Photos + Walkthrough + Aerial', includes: ['Tier 2, plus', 'Drone photos', 'A short aerial clip'], price: 650 },
  re4: { tab: 'realestate', name: 'Agent Signature', includes: ['Tier 3, plus', 'An agent talking video', 'A creator-style reel'], price: 900 },

  // Events
  ev1: { tab: 'events', name: 'Short', badge: 'About 2 hours', includes: ['One quick highlight reel', 'Basic photos (20 to 30 images)'], price: 450 },
  ev2: { tab: 'events', name: 'Half day', badge: 'About 4 hours', includes: ['Highlight film', 'Basic photos (20 to 30 images)'], price: 850 },
  ev3: { tab: 'events', name: 'Full day', badge: 'About 8 hours', includes: ['Highlight film', 'Speaker clips', 'Recap film', 'Basic photos (20 to 30 images)'], price: 1600 },

  // Storytelling & brand
  st1: { tab: 'storytelling', name: 'Concept', includes: ['30 to 60 second piece', "Client's concept and script", 'One location, one shoot day'], price: 600 },
  st2: { tab: 'storytelling', name: 'Narrative', includes: ['1 to 2 minute film', 'Up to two locations', 'Half-day crew', 'Drone if outdoors'], price: 1500 },
  st3: { tab: 'storytelling', name: 'Signature', includes: ['2 to 3 minute cinematic piece', 'Multiple locations, small crew', 'Colour grade'], price: 3000 },
  st4: { tab: 'storytelling', group: 'brand', name: 'Brand Essentials', includes: ['Half-day shoot', 'One 30 to 60 second brand video', '3 social cut-downs'], price: 800 },
  st5: { tab: 'storytelling', group: 'brand', name: 'Brand Standard', includes: ['Full-day shoot', '1 to 2 minute brand film', 'Product or service b-roll set', '6 social cut-downs'], price: 1800 },
  st6: { tab: 'storytelling', group: 'brand', name: 'Brand Monthly', includes: ['One shoot day each month', '8 to 12 short edits'], price: 1500, per: '/ month' },

  // People shoots
  pp1: { tab: 'people', name: 'Portrait Session', includes: ['1 hour, one location', '20 to 25 edited photos'], goodFor: 'Individual portraits, headshots, personal branding', price: 300 },
  pp2: { tab: 'people', name: 'Couple or Pre-wedding', includes: ['2-hour session', '30 edited photos', '1 to 2 minute cinematic film'], goodFor: 'Pre-weddings, engagement shoots, couple or anniversary shoots', price: 600 },
  pp3: { tab: 'people', name: 'Creator Shoot', includes: ['Half-day shoot', '4 to 6 short reels'], goodFor: 'Creators, coaches, realtors, small business owners, athletes', price: 450 },
  pp4: { tab: 'people', name: 'Creator Monthly', includes: ['One shoot day each month', '8 to 12 reels'], goodFor: 'Creators and professionals who post every week', price: 1000, per: '/ month' },

  // Weddings
  wd1: {
    tab: 'weddings', name: 'Full Wedding Package', badge: 'Founding offer, limited spots',
    includes: [
      'Cinematic highlight film, 3 to 8 minutes',
      'Longer documentary-style film with the main ceremony',
      'About 1,000 edited photos, consistent basic editing',
      'Delivered in about 4 to 6 weeks',
      'Raw photos not included',
    ],
    price: 3500, priceMax: 4000, prefix: '', cta: 'Request a quote',
  },
}

export const REAL_ESTATE_ADDON = 'Quick add-ons for agents who already have photos: walkthrough video only, or aerial only. Floor plans and 3D tours come later.'

export const TABS = {
  realestate: {
    label: 'Real estate',
    intro: 'Each tier includes everything in the tier below it.',
    pkgs: ['re1', 're2', 're3', 're4'],
    addons: [REAL_ESTATE_ADDON],
  },
  events: {
    label: 'Events',
    intro: 'Corporate events and sports events. Every package includes the edited video plus a basic photo selection of about 20 to 30 images.',
    pkgs: ['ev1', 'ev2', 'ev3'],
    addons: [
      'Drone aerials, outdoor events only: $150 to $250',
      'Same-day teaser reel, under 30 seconds: $150 to $200 (subject to editor availability, a few days’ notice)',
      'Second shooter: $300 to $400',
      'Full photo coverage with a dedicated photographer: $300 to $400',
    ],
  },
  storytelling: {
    label: 'Storytelling & brand',
    intro: "Production only. We shoot and edit your concept and script. A cut-down is a short vertical edit of 15 to 30 seconds pulled from the main film for Reels, TikTok, or Stories.",
    pkgs: ['st1', 'st2', 'st3', 'st4', 'st5', 'st6'],
    groups: { brand: 'Brand video' },
    addons: [
      'Ideation and screenplay (separate paid service): $300 to $800',
      'Talent or an actor',
      'Extra shoot days',
      'Drone',
    ],
  },
  people: {
    label: 'People shoots',
    intro: 'Portraits, couples, pre-weddings, and creators.',
    pkgs: ['pp1', 'pp2', 'pp3', 'pp4'],
  },
  weddings: {
    label: 'Weddings',
    intro: 'Boutique, cinematic, film-look style. A small crew: a lead videographer, a photographer, and Prajwal directing and shooting highlights. Hours and days of coverage are agreed in writing before booking. Smaller weddings can be quoted on request.',
    pkgs: ['wd1'],
  },
  editing: {
    label: 'Editing',
    intro: 'You shoot it, we edit it. Priced per video, and the rate drops as volume goes up. Introductory prices.',
    editing: true,
  },
}

// ── Editing (per video) ────────────────────────────────────
export const EDITING = {
  tiers: [
    { count: 4,  basic: 75, polished: 110 },
    { count: 8,  basic: 65, polished: 100 },
    { count: 10, basic: 62, polished: 97 },
    { count: 12, basic: 60, polished: 85, popular: true },
  ],
  sliderMin: 8,
  sliderMax: 12,
  sliderStep: 2,
  basicDesc: 'Cut, captions, basic music',
  polishedDesc: 'Motion graphics and sound design',
  longForm: 'Long-form and podcast editing: from $250 for a 10-minute edit, custom quote beyond that.',
  contract: '25 or more videos on a contract: contact us.',
}

// ── Booking terms (shown on every page) ────────────────────
export const TERMS = [
  { k: 'Deposit', v: '30 to 50 percent to book a date, balance before final delivery. Exact amount confirmed in your quote.' },
  { k: 'Revisions', v: 'Two rounds included on every edit. Extra rounds are charged.' },
  { k: 'Delivery', v: 'Short reels and edits in 48 hours to a few days. Real estate in about 48 hours. Event highlight films in about a week. Weddings in about 4 to 6 weeks.' },
  { k: 'Usage', v: 'We may post the finished work on our portfolio and social pages, with your permission.' },
  { k: 'Travel', v: 'Outside Ottawa and Gatineau, travel is quoted separately.' },
]

export const STEPS = [
  { t: 'Inquiry', d: 'Tell us what you need.' },
  { t: 'Quick call', d: 'A short chat to scope it.' },
  { t: 'Quote + deposit', d: 'Clear quote, deposit books your date.' },
  { t: 'Shoot', d: 'We show up and capture it.' },
  { t: 'Delivery', d: 'Edited, revised, delivered.' },
]

// Add real quotes only: { quote: '...', name: '...' }. Leave empty until one exists.
export const TESTIMONIALS = []

// ── Audience pages ─────────────────────────────────────────
// tabs: list of tab ids, or { id, only: [pkgIds] } to show a slice of a tab.
export const MAIN_PAGE = {
  videos: ['football', 'prewedding', 'realestate'],
  tabs: ['realestate', 'events', 'storytelling', 'people', 'weddings', 'editing'],
}

export const AUDIENCES = {
  // Existing pages, now on the new offer direction
  videoediting: {
    path: '/offers/videoediting',
    headline: 'Video editing. You shoot it, we cut it.',
    videos: ['editBefore1', 'editBefore2'],
    tabs: ['editing'],
  },
  'professional-services': {
    headline: 'Video that builds trust for service businesses',
    videos: ['realestate', 'agent'],
    tabs: ['realestate', { id: 'people', only: ['pp3', 'pp4'] }],
  },
  events: {
    headline: 'Event and sports highlight films',
    videos: ['event', 'football'],
    tabs: ['events'],
  },
  'weddings-couples': {
    headline: 'Film-look stories for couples',
    videos: ['prewedding', 'maternity'],
    tabs: ['weddings', 'people'],
  },
  restaurants: {
    headline: 'Content that fills tables',
    videos: ['restTiktok', 'restProcess', 'restBts'],
    tabs: [{ id: 'people', only: ['pp3', 'pp4'] }],
  },
  editing: {
    headline: 'Editing only. You shoot, we cut.',
    videos: ['editBefore1', 'editBefore2'],
    tabs: ['editing'],
  },
  creators: {
    headline: 'Content for creators and personal brands',
    videos: ['creator'],
    tabs: [{ id: 'people', only: ['pp3', 'pp4'] }, 'editing'],
  },
  'brands-sports': {
    headline: 'Film for sports brands and athletes',
    videos: ['athlete', 'football', 'basketball'],
    tabs: ['storytelling', { id: 'events', only: ['ev1', 'ev2', 'ev3'] }],
  },
}

// Every route that renders the offer page. Main page first.
export const OFFER_ROUTES = [
  { path: '/offers', audience: null },
  ...Object.entries(AUDIENCES).map(([k, v]) => ({ path: v.path || '/offers/' + k, audience: k })),
]
