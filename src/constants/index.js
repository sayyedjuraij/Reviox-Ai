// =====================================================
// REVIOX AI — All Constants & Data
// Edit this file to change pricing, features, FAQ, contact info
// =====================================================

export const BRAND = {
  name: 'Reviox AI',
  tagline: 'Intelligence that Relieves',
  description: 'Reviox AI transforms the way businesses collect and grow through customer feedback using AI-powered automation and smart review systems.',
  email: 'ai.reviox@gmail.com',
  phone1: '+971 52 968 2123',
  phone2: '+971 52 595 2878',
  whatsapp: '971529682123',
  location: 'Dubai, United Arab Emirates',
};

export const PRICING_PLANS = [
  {
    name: 'Basic',
    price: 49,
    popular: false,
    features: [
      '1 QR Code',
      'Up to 200 scans/month',
      'AI review suggestions',
      'Smart routing (positive → Google)',
      'Email support',
    ],
  },
  {
    name: 'Standard',
    price: 69,
    popular: true,
    features: [
      '3 QR Codes',
      'Up to 600 scans/month',
      'WhatsApp follow-ups',
      'SMS review requests',
      'Analytics dashboard',
      'Priority support',
    ],
  },
  {
    name: 'Premium',
    price: 99,
    popular: false,
    features: [
      'Unlimited QR Codes',
      'Unlimited scans',
      'Multi-language reviews',
      'Full API access',
      'Custom branding',
      'Dedicated account manager',
    ],
  },
];

export const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Generated Reviews',
    desc: 'Emotionally authentic, context-aware review text generated in seconds based on the customer's star rating and sentiment.',
  },
  {
    icon: '🔀',
    title: 'Smart Review Routing',
    desc: '5-star reviews go directly to Google. 1-3 stars are routed privately to you first. Protect your reputation automatically.',
  },
  {
    icon: '📲',
    title: 'Dynamic QR System',
    desc: 'Unique QR code per business location. Print it, display it on screen, or embed it on packaging.',
  },
  {
    icon: '⚡',
    title: 'Pre-filled Review Text',
    desc: 'Zero effort for customers. They pick a suggestion and click submit — done in under 30 seconds.',
  },
  {
    icon: '💬',
    title: 'WhatsApp Follow-ups',
    desc: 'Automated WhatsApp messages sent post-visit to capture delayed reviews from customers who didn't scan.',
  },
  {
    icon: '📱',
    title: 'SMS Review Requests',
    desc: 'Send SMS review links instantly after a transaction or service completion with one click.',
  },
  {
    icon: '🌍',
    title: 'Multi-Language Support',
    desc: 'Arabic, Hindi, English, French and more — customers can review in their native language automatically.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Full real-time view of scans, reviews generated, conversion rate, and trends — updated live.',
  },
];

export const HOW_IT_WORKS = [
  {
    num: '01',
    icon: '📱',
    title: 'Scan QR Code',
    desc: 'Customer scans your unique Reviox QR at the counter, table, or receipt. No app download needed.',
  },
  {
    num: '02',
    icon: '✨',
    title: 'AI Suggests Reviews',
    desc: 'Our AI instantly generates emotionally authentic review options based on the customer's star rating.',
  },
  {
    num: '03',
    icon: '🚀',
    title: 'Boost Reputation',
    desc: 'Positive reviews go straight to Google. Negative ones are routed privately so you handle them first.',
  },
];

export const FAQ = [
  {
    q: 'How does Reviox AI work?',
    a: 'Reviox AI works in three steps: your customer scans a unique QR code, they're shown star rating options and AI-generated review suggestions tailored to their experience, then they click submit. Positive reviews go to Google, while low-rated feedback is sent privately to you.',
  },
  {
    q: 'Is it connected to Google Reviews?',
    a: 'Yes. When a customer submits a positive review through our system, they are redirected to your Google Business Profile with the review text pre-filled. They just confirm and publish — the entire process takes under 30 seconds with zero effort from the customer.',
  },
  {
    q: 'Can I customize the review suggestions?',
    a: 'Absolutely. On Standard and Premium plans, you can set the tone and style of AI-generated suggestions — formal, casual, industry-specific, or language-specific. The AI adapts to your brand voice.',
  },
  {
    q: 'Is it legal and safe?',
    a: 'Yes — Reviox AI is fully compliant. We generate AI-assisted suggestions, but customers choose and submit their own reviews. This keeps everything within Google's review policies. Negative feedback is routed privately, which is a standard and accepted practice. All customer data is encrypted and never sold.',
  },
  {
    q: 'Do customers need to download an app?',
    a: 'No app required. Customers simply scan the QR code with their phone camera, and everything opens directly in the browser. The experience is instant, frictionless, and works on any smartphone.',
  },
];

export const BLOG_POSTS = [
  {
    tag: 'AI Reviews',
    title: 'Why 87% of Customers Trust Online Reviews as Much as Personal Recommendations',
    date: 'Apr 14, 2026',
    read: '4 min',
  },
  {
    tag: 'Strategy',
    title: 'How Dubai Restaurants Are Using QR Review Systems to Dominate Google Maps',
    date: 'Apr 8, 2026',
    read: '5 min',
  },
  {
    tag: 'Growth',
    title: 'The Psychology of Review Friction — And How AI Eliminates It Entirely',
    date: 'Mar 29, 2026',
    read: '6 min',
  },
];

export const AI_REVIEW_SUGGESTIONS = {
  5: [
    'Absolutely exceptional service! The team went above and beyond every expectation. Highly recommend to everyone!',
    'Outstanding experience from start to finish. The professionalism and attention to detail were truly remarkable.',
    'Five stars without hesitation! Everything was perfect — the service, the staff, and the results. Will definitely return!',
  ],
  4: [
    'Great experience overall! Minor things could be improved but the service was genuinely impressive and I'll be back.',
    'Really pleased with my visit. The team was helpful and the quality exceeded my expectations in most areas.',
    'Very good service! A few small tweaks would make it perfect, but overall a wonderful and memorable experience.',
  ],
  3: [
    'Decent experience. Some aspects were great while others have room for improvement. Would consider returning.',
    'Average service — not bad but not outstanding. The staff were friendly which made the difference.',
    'It was okay. A mixed bag overall, but the positives outweigh the negatives. Might try again.',
  ],
};
