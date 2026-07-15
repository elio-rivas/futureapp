// Centralized stock imagery for the FFE marketing site.
// All URLs verified to return HTTP 200 (see FFE-IMG-001 Stop Gate B).
// Excludes: director portrait, brand logo, map embeds.

export const siteImages = {
  homeHero:        'https://images.pexels.com/photos/6654125/pexels-photo-6654125.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
  summerSection:   'https://images.pexels.com/photos/9127717/pexels-photo-9127717.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  parentConcern:   '/images/services/Screenshot_2026-07-14_at_6.08.36_PM.png',
  summerPageHero:  'https://images.pexels.com/photos/8205393/pexels-photo-8205393.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
  aboutFeature:    'https://images.pexels.com/photos/18830100/pexels-photo-18830100.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop',
  servicesBanner:  'https://images.pexels.com/photos/8363091/pexels-photo-8363091.jpeg?auto=compress&cs=tinysrgb&w=900&h=400&fit=crop',
  contactHero:     'https://images.pexels.com/photos/11065349/pexels-photo-11065349.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop',
} as const;
