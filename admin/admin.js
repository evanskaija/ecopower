(() => {
  'use strict';

  const sectionMeta = [
    ['hero', 'Hero', 'Main headline, buttons and hero image'],
    ['trust', 'Trust and benefits', 'Four homepage benefit items', false],
    ['products', 'Charcoal Briquettes', 'Product images, descriptions and prices'],
    ['ordering', 'Order in Three Steps', 'Ordering instructions and delivery steps', false],
    ['payment', 'Pay by Lipa Namba', 'Payment images, descriptions and account details'],
    ['factory', 'Factory and Delivery', 'Factory story, delivery fleet and production gallery'],
    ['kitchen', 'Built for Real Kitchens', 'Audience cards and cooking categories', false],
    ['testimonial', 'Customer Testimonials', 'Customer quote and attribution', false],
    ['cookstoves', 'Stoves for Every Kitchen', 'Stove images, descriptions and prices'],
    ['impact', 'Our Impact So Far', 'Statistics and supporting descriptions', false],
    ['partners', 'Partners and Donors', 'Partner logos, names and descriptions'],
    ['images', 'Factory Gallery, QR Codes and Partner Logos', 'Shared image records, captions, alternative text and ordering'],
    ['footer', 'Footer', 'Contact, payment and social information', false]
  ];

  const addContentSections = new Set(['products', 'payment', 'cookstoves', 'partners']);
  const homeSectionSource = (section) => section === 'payment' ? 'ordering' : section === 'testimonial' ? 'kitchen' : section;
  const canAddContent = (section) => addContentSections.has(section);
  const productsSectionMeta = [
    ['hero', 'Better cooking starts with the right fuel', 'Page introduction, headline and hero image'],
    ['makange', 'Makange Briquettes', 'Product image, introduction and pricing table'],
    ['lighting', 'How to Light Makange', 'Lighting guide steps and images'],
    ['stoves', 'Cookstoves', 'Cookstove cards, prices and WhatsApp links'],
    ['bundle', 'Starter Bundle', 'Starter and additional bundle cards'],
    ['cta', 'Need Fuel Every Week?', 'Regular supply call to action'],
    ['footer', 'Order & Contact', 'Footer contact, payment and social details']
  ];
  const productsSectionIds = new Set(productsSectionMeta.map(([id]) => id));
  const productsAddContentSections = new Set(['makange', 'stoves', 'bundle']);
  const productsCanAddContent = (section) => productsAddContentSections.has(section);
  const aboutSectionMeta = [
    ['story', 'Our Story So Far', 'Timeline milestones'],
    ['process', 'How Makange Is Made', 'Production steps, photos and descriptions'],
    ['founder', 'Founder Profile', 'Founder image, name, title and story'],
    ['partners', 'Partners and Funders', 'Partner logos and descriptions']
  ];
  const aboutSectionIds = new Set(aboutSectionMeta.map(([id]) => id));
  const aboutAddContentSections = new Set(['story', 'process', 'partners']);
  const aboutCanAddContent = (section) => aboutAddContentSections.has(section);
  const teamSectionMeta = [
    ['management', 'Management', 'Leadership with Purpose · 2 existing members'],
    ['board', 'Board of Directors', "Guiding EcoPower's Growth · 3 existing directors"]
  ];
  const teamSectionIds = new Set(teamSectionMeta.map(([id]) => id));
  const teamCanAddContent = (section) => teamSectionIds.has(section);
  const impactSectionMeta = [
    ['customers', 'Our Customers', 'Customer photos and testimonials'],
    ['comparison', 'Cost of Cooking for One Day', 'Fuel comparison table and savings'],
    ['benefits', 'Environmental and Social Impact', 'Less smoke, fewer trees cut and local jobs']
  ];
  const impactSectionIds = new Set(impactSectionMeta.map(([id]) => id));
  const impactCanAddContent = (section) => impactSectionIds.has(section);
  const partnerSectionMeta = [
    ['wakala', 'Become a Makange Agent or WAKALA', 'Shops, locations and contact numbers'],
    ['business', 'Regular Monthly Orders', 'Business and institution categories'],
    ['funders', 'Funders and Partners', 'Partner logos, names and descriptions']
  ];
  const partnerSectionIds = new Set(partnerSectionMeta.map(([id]) => id));
  const partnerCanAddContent = (section) => partnerSectionIds.has(section);
  const faqSectionMeta = [
    ['ordering', 'Ordering and Delivery', '4 existing questions'],
    ['paying', 'Paying', '3 existing questions'],
    ['using', 'Using Makange', '5 existing questions'],
    ['business', 'Business', '2 existing questions · fixed category']
  ];
  const faqSectionIds = new Set(faqSectionMeta.map(([id]) => id));
  const faqAddContentSections = new Set(['ordering', 'paying', 'using']);
  const faqCanAddContent = (section) => faqAddContentSections.has(section);
  const faqPageSectionMeta = [
    ['hero', 'Hero', 'FAQ heading and introduction'],
    ...faqSectionMeta,
    ['cta', 'Still have a question?', 'WhatsApp call to action'],
    ['footer', 'Footer', 'Contact, payment and social information']
  ];

  const pageMeta = {
    home: { label: 'Home', file: 'index.html' },
    products: { label: 'Products and Prices', file: 'products.html' },
    about: { label: 'About Us', file: 'about.html' },
    team: { label: 'Our Team', file: 'team.html' },
    impact: { label: 'Our Impact', file: 'impact.html' },
    partners: { label: 'Partner With Us', file: 'partners.html' },
    faq: { label: 'Questions', file: 'faq.html' },
    contact: { label: 'Contact Us', file: 'contact.html' }
  };
  const pageNavSectionCounts = { home: 14, products: productsSectionMeta.length, about: aboutSectionMeta.length, team: teamSectionMeta.length, impact: impactSectionMeta.length, partners: partnerSectionMeta.length, faq: faqPageSectionMeta.length, contact: null };
  let pageNavStatsBooted = false;
  const readableWordCount = (value, key = '') => {
    if (value === null || value === undefined || /^(id|image|position|imagePosition|link|href|alt|format|visible|displayOrder|open|isAdded|primaryLink|secondaryLink|buttonLink)$/i.test(key) || /url|src/i.test(key)) return 0;
    if (typeof value === 'string') return value.trim().split(/\s+/).filter((word) => word && !/^https?:\/\//i.test(word)).length;
    if (Array.isArray(value)) return value.reduce((total, item) => total + readableWordCount(item, key), 0);
    if (typeof value === 'object') return Object.entries(value).reduce((total, [childKey, childValue]) => total + readableWordCount(childValue, childKey), 0);
    return 0;
  };
  const compactWordCount = (count) => count >= 1000 ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1).replace(/\.0$/, '')}k` : String(count);
  const setPageNavStat = (slug, sections, words) => {
    const target = document.querySelector(`[data-page-stat="${slug}"]`);
    if (!target) return;
    const sectionLabel = `${sections} ${sections === 1 ? 'section' : 'sections'}`;
    target.textContent = `${sectionLabel} · ${compactWordCount(words)} words`;
  };
  const updatePageNavStats = (slug, content = null) => {
    if (!slug || !pageMeta[slug]) return;
    const sectionCount = pageNavSectionCounts[slug] || 1;
    const wordCount = readableWordCount(content || {});
    setPageNavStat(slug, sectionCount, wordCount);
  };
  const bootstrapPageNavStats = async () => {
    if (pageNavStatsBooted) return;
    pageNavStatsBooted = true;
    const entries = await Promise.all(Object.entries(pageMeta).map(async ([slug, meta]) => {
      try {
        const html = await fetch(`/${meta.file}`, { cache: 'no-store' }).then((response) => response.text());
        const documentCopy = new DOMParser().parseFromString(html, 'text/html');
        const main = documentCopy.querySelector('main');
        const words = readableWordCount(main?.textContent || '');
        const sections = pageNavSectionCounts[slug] || main?.querySelectorAll('section').length || 1;
        return [slug, sections, words];
      } catch {
        return [slug, pageNavSectionCounts[slug] || 1, 0];
      }
    }));
    entries.forEach(([slug, sections, words]) => setPageNavStat(slug, sections, words));
    Object.entries(genericStates).forEach(([slug, pageState]) => updatePageNavStats(slug, pageState?.draftByLanguage?.[language] || {}));
    updatePageNavStats(activePage, currentPageContent());
  };
  const genericTextSelector = 'main h1, main h2, main h3, main p, main strong, main span, main a, main button, footer h3, footer p, footer span, footer a';
  const genericImageSelector = 'main img, footer img';

  const baseContent = {
    hero: {
      image: 'EcoPower_all_extracted_images/Glowing Charcoal and Dancing Flames.png',
      primaryLink: 'https://wa.me/255784017225',
      secondaryLink: '#how-it-works',
      en: { eyebrow: 'CLEAN COOKING FUEL BY ECOPOWER · DAR ES SALAAM', title: 'Makange — Kwa maisha', emphasis: 'bora.', description: 'Clean cooking fuel, delivered to your door. Briquettes made from char, agro and forest waste at our factory in Kunduchi, brought to your door by our own Toyo tricycles.', primaryLabel: 'Order on WhatsApp', secondaryLabel: 'How to pay', captionContact: 'Call or WhatsApp', caption: 'Pay cash on delivery or by Lipa Namba', alt: 'Makange delivery briquettes arriving by Toyo tricycle' },
      sw: { eyebrow: 'MAFUTA SAFI YA KUPIKIA YA ECOPOWER · DAR ES SALAAM', title: 'Makange — Kwa maisha', emphasis: 'bora.', description: 'Nishati safi ya kupikia, ikiletwa mlangoni kwako. Briquettes zinazotengenezwa kwa mabaki ya mkaa, taka za kilimo na misitu katika kiwanda chetu Kunduchi, kisha kuletwa kwako na Toyo zetu.', primaryLabel: 'Agiza WhatsApp', secondaryLabel: 'Jinsi ya kulipa', captionContact: 'Piga simu au WhatsApp', caption: 'Lipa taslimu unapopokea au kwa Lipa Namba', alt: 'Briquettes za Makange zikiletwa kwa Toyo' }
    },
    images: {
      brand: { image: 'EcoPower_all_extracted_images/page_01_image_002.png', en: { alt: 'Makange' }, sw: { alt: 'Makange' }, position: 'center' },
      paymentQr: [
        { image: 'EcoPower_all_extracted_images/page_01_image_006.jpeg', en: { alt: 'M-Pesa payment QR code for EcoPower' }, sw: { alt: 'QR code ya malipo ya M-Pesa kwa EcoPower' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_007.jpeg', en: { alt: 'CRDB payment QR code for EcoPower' }, sw: { alt: 'QR code ya malipo ya CRDB kwa EcoPower' }, position: 'center' }
      ],
      factoryGallery: [
        { image: 'EcoPower_all_extracted_images/page_01_image_008.jpeg', en: { alt: 'Makange briquette press at the factory' }, sw: { alt: 'Mashine ya kubinya briquettes kiwandani' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_009.jpeg', en: { alt: 'Makange mixing machine' }, sw: { alt: 'Mashine ya kuchanganya Makange' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_003.jpeg', en: { alt: 'Makange delivery tricycle' }, sw: { alt: 'Toyo ya kusafirisha Makange' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_010.jpeg', en: { alt: 'Makange briquettes drying in the solar house' }, sw: { alt: 'Briquettes za Makange zikikaushwa' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_011.jpeg', en: { alt: 'Makange briquettes drying on racks' }, sw: { alt: 'Briquettes za Makange zikikaushwa kwenye rack' }, position: 'center' }
      ],
      kitchenGallery: [
        { image: 'EcoPower_all_extracted_images/page_01_image_012.jpeg', en: { alt: 'Mama ntilie and chips stall cooking with Makange' }, sw: { alt: 'Mama ntilie na kibanda cha chipsi kinachopika kwa Makange' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_013.jpeg', en: { alt: 'Street food seller cooking with Makange' }, sw: { alt: 'Muuzaji wa chakula cha mtaani akipika kwa Makange' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_014.jpeg', en: { alt: 'EcoPower stove for schools and institutions' }, sw: { alt: 'Jiko la EcoPower kwa shule na taasisi' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_015.jpeg', en: { alt: 'Household cooking with an EcoPower stove' }, sw: { alt: 'Upishi wa nyumbani kwa jiko la EcoPower' }, position: 'center' }
      ],
      partnerLogos: [
        { image: 'EcoPower_all_extracted_images/page_01_image_019.png', en: { alt: 'AECF' }, sw: { alt: 'AECF' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_020.png', en: { alt: 'UN CDF' }, sw: { alt: 'UN CDF' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/TIRDO_logo_from_EcoPower_PDF.png', en: { alt: 'TIRDO' }, sw: { alt: 'TIRDO' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_021.png', en: { alt: 'Samai Agro' }, sw: { alt: 'Samai Agro' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_022.png', en: { alt: 'Meher International' }, sw: { alt: 'Meher International' }, position: 'center' },
        { image: 'EcoPower_all_extracted_images/page_01_image_023.png', en: { alt: 'Zill' }, sw: { alt: 'Zill' }, position: 'center' }
      ]
    },
    trust: {
      items: [
        { icon: 'factory', en: { title: 'Made in our own factory', description: 'Silver Sands, Kunduchi, since 2023' }, sw: { title: 'Inatengenezwa kiwandani kwetu', description: 'Silver Sands, Kunduchi, tangu 2023' } },
        { icon: 'delivery', en: { title: 'Next-day delivery', description: 'Within 10 km · order a day before · from 20 bags' }, sw: { title: 'Tunaleta kesho yake', description: 'Ndani ya km 10 · agiza siku moja kabla · kuanzia magunia 20' } },
        { icon: 'payment', en: { title: 'Pay any way', description: 'Cash, M-Pesa, any network, bank or card' }, sw: { title: 'Lipa unavyotaka', description: 'Taslimu, M-Pesa, mtandao wowote, benki au kadi' } },
        { icon: 'burn', en: { title: 'Long, steady burn', description: 'Up to 6 hours, tested by TIRDO' }, sw: { title: 'Inawaka muda mrefu, kwa utulivu', description: 'Hadi saa 6, imepimwa na TIRDO' } }
      ]
    },
    products: {
      en: { eyebrow: 'Products & prices', heading: 'Makange briquettes', description: 'Made from char dust, agro and forest waste mixed with a binder, pressed by machine and sun-dried.', businessLabel: 'For businesses & institutions', businessHeading: 'Regular monthly orders', businessDescription: 'A fixed number of bags delivered through the month, paid on delivery. Already working for chips sellers in Kinondoni.', businessButton: 'Get a business quote', list: ['Schools and hospitals', 'Restaurants and hotels', 'Agents and WAKALA shops'] },
      sw: { eyebrow: 'Bidhaa na bei', heading: 'Briquettes za Makange', description: 'Zimetengenezwa kwa mabaki ya mkaa, taka za kilimo na misitu zilizochanganywa na binder, zikabonyezwa kwa mashine na kukaushwa juani.', businessLabel: 'Kwa biashara na taasisi', businessHeading: 'Maagizo ya kila mwezi', businessDescription: 'Idadi maalum ya magunia inapelekwa kwa mwezi na inalipwa wakati wa delivery. Tayari inawasaidia wauza chips Kinondoni.', businessButton: 'Pata bei ya biashara', list: ['Shule na hospitali', 'Migahawa na hoteli', 'Mawakala na maduka ya WAKALA'] },
      items: [
        { image: 'EcoPower_all_extracted_images/page_01_image_004.jpeg', price: 'TZS 22,000', link: 'https://wa.me/255784017225', en: { name: '50kg sack', description: 'For mama ntilie, chips stalls, restaurants and schools', button: 'Order 50kg on WhatsApp', alt: '50kg Makange briquette sack' }, sw: { name: 'Gunia la 50kg', description: 'Kwa mama ntilie, vibanda vya chipsi, migahawa na shule', button: 'Agiza 50kg WhatsApp', alt: 'Gunia la briquettes za Makange kilo 50' } },
        { image: 'EcoPower_all_extracted_images/page_01_image_005.jpeg', price: 'TZS 13,000', link: 'https://wa.me/255784017225', en: { name: '25kg sack', description: 'For homes and small food sellers', button: 'Order 25kg on WhatsApp', alt: '25kg Makange briquette sack' }, sw: { name: 'Gunia la 25kg', description: 'Kwa nyumba na wauza chakula wadogo', button: 'Agiza 25kg WhatsApp', alt: 'Gunia la briquettes za Makange kilo 25' } }
      ]
    },
    ordering: {
      en: { heading: 'Order in three steps.', steps: [{ title: 'Call or WhatsApp', description: '0784 017 225 — tell us the sack size, how many, and where.' }, { title: 'Pay your way', description: 'Lipa Namba now, or cash when it arrives. Send us the payment message.' }, { title: 'Delivered next day', description: 'Our Toyo crew brings it to your door within 10 km. Smallest order 20 bags; for less, visit a WAKALA shop.' }], paymentEyebrow: 'How to pay · Jinsi ya kulipa', paymentTitle: 'Pay by Lipa Namba from any network or bank', paymentDescription: '', mpesaLabel: 'M-Pesa Lipa Namba', mpesaNumber: '352491280', mpesaNote: 'Shows as ECOPOWER SOLUTIONS LTD 1', crdbLabel: 'CRDB Lipa Namba', crdbNumber: '104084772', crdbNote: 'ECOPOWER SOLUTIONS LTD · also takes cards' },
      sw: { heading: 'Agiza kwa hatua tatu.', steps: [{ title: 'Piga simu au WhatsApp', description: '0784 017 225 — tuambie ukubwa wa gunia, idadi na eneo.' }, { title: 'Lipa kwa njia yako', description: 'Tumia Lipa Namba sasa au lipa cash wakati bidhaa inafika. Tuma ujumbe wa malipo.' }, { title: 'Delivery siku inayofuata', description: 'Toyo yetu inaleta bidhaa ndani ya km 10. Agizo dogo zaidi ni magunia 20; kwa chini ya hapo, tembelea WAKALA.' }], paymentEyebrow: 'Jinsi ya kulipa', paymentTitle: 'Lipa Namba kutoka mtandao au benki yoyote', paymentDescription: '', mpesaLabel: 'M-Pesa Lipa Namba', mpesaNumber: '352491280', mpesaNote: 'Inaonekana kama ECOPOWER SOLUTIONS LTD 1', crdbLabel: 'CRDB Lipa Namba', crdbNumber: '104084772', crdbNote: 'ECOPOWER SOLUTIONS LTD · inakubali pia kadi' }
    },
    factory: { image: 'EcoPower_all_extracted_images/page_01_image_008.jpeg', en: { eyebrow: 'From our factory', title: 'A working plant in Kunduchi, with its own delivery fleet', description: 'EcoPower Solutions Limited started in 2023. We make Makange briquettes at our factory on Old Bagamoyo Road, Silver Sands, Kunduchi, using tailor-made machines that meet industry standards and give a premium output. Our cargo tricycles deliver to homes, food sellers and institutions across Dar es Salaam, together with our WAKALA partners and sales agents.', button: 'More about EcoPower', alt: 'Makange briquette press at the factory' }, sw: { eyebrow: 'Kutoka kiwandani kwetu', title: 'Kiwanda kinachofanya kazi Kunduchi, chenye delivery yake', description: 'EcoPower Solutions Limited ilianza mwaka 2023. Tunatengeneza briquettes za Makange katika kiwanda chetu Old Bagamoyo Road, Silver Sands, Kunduchi, kwa kutumia mashine maalum zinazokidhi viwango vya sekta na kutoa bidhaa bora. Tricycles zetu husafirisha kwa nyumba, wauza chakula na taasisi Dar es Salaam, pamoja na washirika wetu WAKALA na mawakala wa mauzo.', button: 'Zaidi kuhusu EcoPower', alt: 'Mashine ya kubinya briquettes za Makange kiwandani' } },
    kitchen: { en: { eyebrow: 'Who cooks with Makange', title: 'Built for real kitchens.', categories: ['Mama ntilie & chips stalls', 'Street food & restaurants', 'Schools & institutions', 'Households'], quote: '“Makange bei chee, mshkaji! Inanibania hela kuliko mkaa, na moto wake unakomaa mpaka msosi wa mchana unaisha. Bei poa, moto mkali — siwezi kurudi kwenye mkaa tena.”', translation: 'Makange is cheap, my friend! It saves me money over charcoal, and the fire holds strong until the lunch rush is over. Good price, strong fire — I’m not going back to charcoal.', attribution: 'Sele, muuza msosi, Kurasini' }, sw: { eyebrow: 'Nani anapika kwa Makange', title: 'Imetengenezwa kwa jikoni halisi.', categories: ['Mama ntilie na vibanda vya chipsi', 'Chakula cha mtaani na migahawa', 'Shule na taasisi', 'Nyumba'], quote: '“Makange bei chee, mshkaji! Inanibania hela kuliko mkaa, na moto wake unakomaa mpaka msosi wa mchana unaisha. Bei poa, moto mkali — siwezi kurudi kwenye mkaa tena.”', translation: 'Makange ni bei nzuri rafiki! Inaniokoa pesa kuliko mkaa, na moto wake unadumu hadi biashara ya mchana inaisha.', attribution: 'Sele, muuza msosi, Kurasini' }, image: 'EcoPower_all_extracted_images/page_01_image_012.jpeg' },
    cookstoves: { en: { title: 'Cookstoves for every kitchen', description: 'Made by EcoPower for Makange briquettes — one stove for each kind of cooking.' }, sw: { title: 'Majiko kwa kila jikoni', description: 'Yametengenezwa na EcoPower kwa briquettes za Makange — jiko kwa kila aina ya upishi.' }, items: [
      { image: 'EcoPower_all_extracted_images/page_01_image_016.jpeg', en: { kicker: 'For homes', name: 'Household stove', description: 'A compact stove for the home kitchen, with pot rests and carry handles, for everyday family cooking with Makange.', price: 'TZS 30,000', button: 'Order on WhatsApp', alt: 'Household EcoPower cookstove' }, sw: { kicker: 'Kwa nyumba', name: 'Jiko la nyumbani', description: 'Jiko dogo la nyumbani lenye sehemu ya kuweka sufuria na vishikio kwa upishi wa kila siku wa familia kwa Makange.', price: 'TZS 30,000', button: 'Agiza WhatsApp', alt: 'Jiko la nyumbani la EcoPower' } },
      { image: 'EcoPower_all_extracted_images/page_01_image_017.jpeg', en: { kicker: 'For mama ntilie & food sellers', name: 'Mama ntilie stove', description: 'A wide fire grate for big sufuria and long cooking hours — for mama ntilie, chips stalls and small restaurants.', price: 'TZS 80,000', button: 'Order on WhatsApp', alt: 'EcoPower mama ntilie cookstove' }, sw: { kicker: 'Kwa mama ntilie na wauza chakula', name: 'Jiko la mama ntilie', description: 'Sehemu pana ya moto kwa sufuria kubwa na muda mrefu wa kupika — kwa mama ntilie, vibanda vya chipsi na migahawa midogo.', price: 'TZS 80,000', button: 'Agiza WhatsApp', alt: 'Jiko la mama ntilie la EcoPower' } },
      { image: 'EcoPower_all_extracted_images/page_01_image_018.jpeg', en: { kicker: 'For restaurants & busy kitchens', name: 'Two-burner stove', description: 'Two fire chambers on one steel stand, so two pots cook at once — for restaurants, canteens and caterers.', price: 'TZS 60,000', button: 'Order on WhatsApp', alt: 'EcoPower two-burner cookstove' }, sw: { kicker: 'Kwa migahawa na jikoni zenye shughuli', name: 'Jiko la burner mbili', description: 'Vyumba viwili vya moto kwenye stendi moja ya chuma, hivyo sufuria mbili hupika kwa wakati mmoja — kwa migahawa, kantini na wapishi wa hafla.', price: 'TZS 60,000', button: 'Agiza WhatsApp', alt: 'Jiko la burner mbili la EcoPower' } },
      { image: 'EcoPower_all_extracted_images/page_01_image_014.jpeg', en: { kicker: 'For schools & institutions', name: 'Institutional stove', description: 'Large single-pot stoves with a fitted pot and lid and a front fuel door, for schools, hospitals and large kitchens. Built by EcoPower and sized to your needs, for example 100 litres.', price: 'Quotation', button: 'Ask for a quote', alt: 'EcoPower institutional cookstove' }, sw: { kicker: 'Kwa shule na taasisi', name: 'Jiko la taasisi', description: 'Majiko makubwa ya sufuria moja yenye sufuria na kifuniko, pamoja na mlango wa mbele wa mafuta, kwa shule, hospitali na jikoni kubwa. Yamejengwa na EcoPower kulingana na mahitaji yako, kwa mfano lita 100.', price: 'Bei kwa makubaliano', button: 'Omba bei', alt: 'Jiko la taasisi la EcoPower' } }
    ] },
    impact: { en: { title: 'Our impact so far', note: 'At full production of 50 tonnes a month.' }, sw: { title: 'Matokeo yetu hadi sasa', note: 'Kwa uzalishaji kamili wa tani 50 kwa mwezi.' }, stats: [{ value: '50 t', en: 'of Makange a month — 1,000 sacks of 50kg', sw: 'za Makange kwa mwezi — magunia 1,000 ya 50kg' }, { value: '~45 t', en: 'of char dust and waste turned into fuel a month', sw: 'za vumbi la mkaa na taka zinazobadilishwa kuwa mafuta kwa mwezi' }, { value: '~190 t', en: 'of wood not cut for charcoal a month', sw: 'za kuni ambazo hazikatwi kwa ajili ya mkaa kwa mwezi' }] },
    partners: { en: { title: 'Become a Makange agent or WAKALA', description: 'Sell Makange from wherever you are.', button: 'Apply on WhatsApp' }, sw: { title: 'Kuwa wakala wa Makange', description: 'Uza Makange kutoka popote ulipo.', button: 'Omba kupitia WhatsApp' }, link: 'https://wa.me/255784017225' },
    footer: { en: { brand: 'EcoPower Solutions Ltd', description: 'Makange — Kwa maisha bora. Clean cooking fuel, delivered to your door.', contactHeading: 'Order & contact', phone: 'Call / WhatsApp: 0784 017 225', email: 'info@ecopower.co.tz', address: 'Old Bagamoyo Road, Plot 234, Block D, Silver Sands, Kunduchi, Dar es Salaam', paymentHeading: 'Pay', mpesa: 'M-Pesa Lipa Namba 352491280', crdb: 'CRDB Lipa Namba 104084772', cash: 'Cash on delivery', socialHeading: 'Follow us', socialOne: 'Instagram · Facebook · TikTok', socialTwo: 'LinkedIn (company page) · Google' }, sw: { brand: 'EcoPower Solutions Ltd', description: 'Makange — Kwa maisha bora. Nishati safi ya kupikia, ikiletwa mlangoni kwako.', contactHeading: 'Agizo na mawasiliano', phone: 'Piga simu / WhatsApp: 0784 017 225', email: 'info@ecopower.co.tz', address: 'Old Bagamoyo Road, Plot 234, Block D, Silver Sands, Kunduchi, Dar es Salaam', paymentHeading: 'Malipo', mpesa: 'M-Pesa Lipa Namba 352491280', crdb: 'CRDB Lipa Namba 104084772', cash: 'Lipa wakati wa kupokea', socialHeading: 'Tufuatilie', socialOne: 'Instagram · Facebook · TikTok', socialTwo: 'LinkedIn (ukurasa wa kampuni) · Google' } }
  };

  baseContent.hero.en.alt = 'Glowing charcoal briquettes and dancing flames';
  baseContent.hero.sw.alt = 'Mkaa unaong’aa na miali ya moto';
  baseContent.blocks = [];

  const initialMedia = [
    ['hero-brand', 'Makange brand mark', 'EcoPower_all_extracted_images/page_01_image_002.png'],
    ['hero-flames', 'Glowing charcoal briquettes and dancing flames', 'EcoPower_all_extracted_images/Glowing Charcoal and Dancing Flames.png'],
    ['hero-briquette', 'Makange briquette press', 'EcoPower_all_extracted_images/page_01_image_008.jpeg'],
    ['product-50kg', '50kg Makange sack', 'EcoPower_all_extracted_images/page_01_image_004.jpeg'],
    ['product-25kg', '25kg Makange sack', 'EcoPower_all_extracted_images/page_01_image_005.jpeg'],
    ['factory-mix', 'Factory mixing machine', 'EcoPower_all_extracted_images/page_01_image_009.jpeg'],
    ['factory-dry', 'Makange solar drying', 'EcoPower_all_extracted_images/page_01_image_010.jpeg'],
    ['factory-racks', 'Makange drying racks', 'EcoPower_all_extracted_images/page_01_image_011.jpeg'],
    ['customer', 'Cooking with Makange', 'EcoPower_all_extracted_images/page_01_image_012.jpeg'],
    ['customer-street', 'Street food cooking', 'EcoPower_all_extracted_images/page_01_image_013.jpeg'],
    ['customer-institution', 'Institution cooking', 'EcoPower_all_extracted_images/page_01_image_014.jpeg'],
    ['customer-household', 'Household cooking', 'EcoPower_all_extracted_images/page_01_image_015.jpeg'],
    ['stove-household', 'Household stove', 'EcoPower_all_extracted_images/page_01_image_016.jpeg'],
    ['stove-mama', 'Mama ntilie stove', 'EcoPower_all_extracted_images/page_01_image_017.jpeg'],
    ['stove-two-burner', 'Two-burner stove', 'EcoPower_all_extracted_images/page_01_image_018.jpeg'],
    ['stove-institutional', 'Institutional stove', 'EcoPower_all_extracted_images/page_01_image_014.jpeg'],
    ['qr-mpesa', 'M-Pesa QR', 'EcoPower_all_extracted_images/page_01_image_006.jpeg'],
    ['qr-crdb', 'CRDB QR', 'EcoPower_all_extracted_images/page_01_image_007.jpeg'],
    ['partner-aecf', 'AECF partner logo', 'EcoPower_all_extracted_images/page_01_image_019.png'],
    ['partner-uncdf', 'UN CDF partner logo', 'EcoPower_all_extracted_images/page_01_image_020.png'],
    ['partner-tirdo', 'TIRDO partner logo', 'EcoPower_all_extracted_images/TIRDO_logo_from_EcoPower_PDF.png'],
    ['partner-samai', 'Samai Agro partner logo', 'EcoPower_all_extracted_images/page_01_image_021.png'],
    ['partner-meher', 'Meher International partner logo', 'EcoPower_all_extracted_images/page_01_image_022.png'],
    ['partner-zill', 'Zill partner logo', 'EcoPower_all_extracted_images/page_01_image_023.png']
  ].map(([id, name, src]) => ({ id, name, src, uploaded: false }));

  const $ = (selector) => document.querySelector(selector);
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const merge = (base, saved) => {
    if (!saved || typeof saved !== 'object') return clone(base);
    if (Array.isArray(base)) return Array.isArray(saved) ? saved : clone(base);
    if (typeof base !== 'object') return saved;
    return Object.fromEntries(Object.keys(base).map((key) => [key, key in saved ? merge(base[key], saved[key]) : clone(base[key])]).concat(Object.keys(saved).filter((key) => !(key in base)).map((key) => [key, saved[key]])));
  };
  const productsCatalogDefaults = () => ({
    hero: {
      image: 'EcoPower_all_extracted_images/page_03_image_027.jpeg',
      position: 'center',
      en: { eyebrow: 'Products & prices', title: 'Better cooking starts with the', emphasis: 'right fuel.', description: 'Choose the Makange sack size and cookstove that fits your home, business or institution.', alt: 'Makange briquettes lighting in a cookstove', format: { ...textFormatDefaults } },
      sw: { eyebrow: 'Bidhaa na bei', title: 'Upishi bora huanza na', emphasis: 'mafuta sahihi.', description: 'Chagua ukubwa wa gunia la Makange na jiko linalofaa nyumba, biashara au taasisi yako.', alt: 'Briquettes za Makange zikichomwa kwenye jiko', format: { ...textFormatDefaults } }
    },
    makange: {
      image: 'EcoPower_all_extracted_images/page_01_image_004.jpeg',
      position: 'center',
      en: { eyebrow: 'Makange fuel', title: 'Makange briquettes', description: 'Made from charcoal dust, agricultural and forest waste mixed with a binder, machine-pressed and sun-dried.', bullets: ['Smallest order for delivery: 20 bags of 50 kg (1 tonne).', 'Delivery within 10 km of Silver Sands, or visit a WAKALA shop for smaller orders.', 'Makange burns for up to 6 hours, tested and approved by TIRDO.'], button: 'Order on WhatsApp', buttonLink: 'https://wa.me/255784017225', alt: '50 kg Makange briquette sack', format: { ...textFormatDefaults } },
      sw: { eyebrow: 'Mafuta ya Makange', title: 'Briquettes za Makange', description: 'Imetengenezwa kwa mabaki ya mkaa, taka za kilimo na misitu zilizochanganywa na binder, zikabonyezwa kwa mashine na kukaushwa juani.', bullets: ['Agizo dogo la delivery: magunia 20 ya kilo 50 (tani 1).', 'Delivery ndani ya km 10 za Silver Sands, au tembelea duka la WAKALA kwa agizo dogo.', 'Makange huwaka hadi saa 6, imepimwa na kuidhinishwa na TIRDO.'], button: 'Agiza WhatsApp', buttonLink: 'https://wa.me/255784017225', alt: 'Gunia la briquettes za Makange kilo 50', format: { ...textFormatDefaults } },
      items: [
        { id: 'makange-50kg', image: 'EcoPower_all_extracted_images/page_01_image_004.jpeg', position: 'center', displayOrder: 1, visible: true, en: { name: '50 kg', packageType: '50 kg', bestFor: 'Food sellers, restaurants, schools', price: 'TZS 22,000', description: '', alt: '50 kg Makange briquette sack' }, sw: { name: 'Kilo 50', packageType: 'Kilo 50', bestFor: 'Wauza chakula, migahawa na shule', price: 'TZS 22,000', description: '', alt: 'Gunia la briquettes za Makange kilo 50' } },
        { id: 'makange-25kg', image: 'EcoPower_all_extracted_images/page_01_image_005.jpeg', position: 'center', displayOrder: 2, visible: true, en: { name: '25 kg', packageType: '25 kg', bestFor: 'Homes and small food sellers', price: 'TZS 13,000', description: '', alt: '25 kg Makange briquette sack' }, sw: { name: 'Kilo 25', packageType: 'Kilo 25', bestFor: 'Nyumba na wauza chakula wadogo', price: 'TZS 13,000', description: '', alt: 'Gunia la briquettes za Makange kilo 25' } },
        { id: 'makange-bulk', image: '', position: 'center', displayOrder: 3, visible: true, en: { name: 'Bulk & monthly', packageType: 'Bulk & monthly', bestFor: 'Fixed number of bags each month', price: 'Ask on WhatsApp', description: '', alt: '' }, sw: { name: 'Jumla na kila mwezi', packageType: 'Jumla na kila mwezi', bestFor: 'Idadi maalum ya magunia kila mwezi', price: 'Uliza WhatsApp', description: '', alt: '' } }
      ]
    },
    lighting: {
      en: { eyebrow: 'Lighting guide', title: 'How to light Makange', description: 'Four simple steps to get a steady cooking fire.', format: { ...textFormatDefaults } },
      sw: { eyebrow: 'Mwongozo wa kuwasha', title: 'Jinsi ya kuwasha Makange', description: 'Hatua nne rahisi kupata moto wa kupikia ulio thabiti.', format: { ...textFormatDefaults } },
      items: [
        { image: 'EcoPower_all_extracted_images/page_03_image_025.jpeg', position: 'center', en: { title: '1. Set up the stove', description: 'Place the stove on firm, level ground with the air door open.', alt: 'Makange briquettes arranged in a cookstove' }, sw: { title: '1. Weka jiko tayari', description: 'Weka jiko kwenye sehemu imara na iliyonyooka, mlango wa hewa ukiwa wazi.', alt: 'Briquettes za Makange kwenye jiko' } },
        { image: 'EcoPower_all_extracted_images/page_03_image_026.jpeg', position: 'center', en: { title: '2. Add a starter', description: 'Lay a first layer of Makange and add a few dry sticks in the centre.', alt: 'Dry starter material added to Makange briquettes' }, sw: { title: '2. Ongeza kianzishi', description: 'Weka safu ya kwanza ya Makange na ongeza vijiti vikavu katikati.', alt: 'Vijiti vikavu vimeongezwa kwenye Makange' } },
        { image: 'EcoPower_all_extracted_images/page_03_image_027.jpeg', position: 'center', en: { title: '3. Light the briquettes', description: 'Cover the sticks with more Makange, leaving gaps for air, then light the sticks.', alt: 'Makange briquettes being lit' }, sw: { title: '3. Washa briquettes', description: 'Funika vijiti kwa Makange zaidi, acha nafasi za hewa, kisha washa vijiti.', alt: 'Briquettes za Makange zikichomwa' } },
        { image: 'EcoPower_all_extracted_images/page_03_image_028.jpeg', position: 'center', en: { title: '4. Ready to cook', description: 'When the briquettes glow red, put your pot on and cook.', alt: 'Makange briquettes ready for cooking' }, sw: { title: '4. Tayari kupika', description: 'Briquettes zikianza kuwa nyekundu, weka sufuria na upike.', alt: 'Briquettes za Makange ziko tayari kupikia' } }
      ]
    },
    stoves: {
      en: { eyebrow: 'Made for every kitchen', title: 'Cookstoves', description: 'Choose the stove for the way you cook.', format: { ...textFormatDefaults } },
      sw: { eyebrow: 'Yametengenezwa kwa kila jikoni', title: 'Majiko', description: 'Chagua jiko kulingana na namna unavyopika.', format: { ...textFormatDefaults } },
      items: [
        { id: 'stove-household', image: 'EcoPower_all_extracted_images/page_01_image_016.jpeg', position: 'center', displayOrder: 1, visible: true, en: { kicker: 'For homes', name: 'Household stove', description: 'A compact stove for the home kitchen, with pot rests and carry handles for everyday family cooking with Makange.', price: 'TZS 30,000', button: 'Order on WhatsApp', link: 'https://wa.me/255784017225', alt: 'EcoPower household cookstove' }, sw: { kicker: 'Kwa nyumba', name: 'Jiko la nyumbani', description: 'Jiko dogo la nyumbani lenye sehemu ya kuweka sufuria na vishikio kwa upishi wa kila siku wa familia kwa Makange.', price: 'TZS 30,000', button: 'Agiza WhatsApp', link: 'https://wa.me/255784017225', alt: 'Jiko la nyumbani la EcoPower' } },
        { id: 'stove-mama', image: 'EcoPower_all_extracted_images/page_01_image_017.jpeg', position: 'center', displayOrder: 2, visible: true, en: { kicker: 'For mama ntilie & food sellers', name: 'Mama ntilie stove', description: 'A wide fire grate for big sufuria and long cooking hours — for mama ntilie, chips stalls and small restaurants.', price: 'TZS 80,000', button: 'Order on WhatsApp', link: 'https://wa.me/255784017225', alt: 'EcoPower mama ntilie cookstove' }, sw: { kicker: 'Kwa mama ntilie na wauza chakula', name: 'Jiko la mama ntilie', description: 'Sehemu pana ya moto kwa sufuria kubwa na muda mrefu wa kupika — kwa mama ntilie, vibanda vya chipsi na migahawa midogo.', price: 'TZS 80,000', button: 'Agiza WhatsApp', link: 'https://wa.me/255784017225', alt: 'Jiko la mama ntilie la EcoPower' } },
        { id: 'stove-two-burner', image: 'EcoPower_all_extracted_images/page_01_image_018.jpeg', position: 'center', displayOrder: 3, visible: true, en: { kicker: 'For restaurants & busy kitchens', name: 'Two-burner stove', description: 'Two fire chambers on one steel stand, so two pots cook at once — for restaurants, canteens and caterers.', price: 'TZS 60,000', button: 'Order on WhatsApp', link: 'https://wa.me/255784017225', alt: 'EcoPower two-burner cookstove' }, sw: { kicker: 'Kwa migahawa na jikoni zenye shughuli', name: 'Jiko la burner mbili', description: 'Vyumba viwili vya moto kwenye stendi moja ya chuma, hivyo sufuria mbili hupika kwa wakati mmoja — kwa migahawa, kantini na wapishi wa hafla.', price: 'TZS 60,000', button: 'Agiza WhatsApp', link: 'https://wa.me/255784017225', alt: 'Jiko la burner mbili la EcoPower' } },
        { id: 'stove-institutional', image: 'EcoPower_all_extracted_images/page_01_image_014.jpeg', position: 'center', displayOrder: 4, visible: true, en: { kicker: 'For schools & institutions', name: 'Institutional stove', description: 'Large single-pot stoves with a fitted pot and lid and a front fuel door, for schools, hospitals and large kitchens.', price: 'Quotation', button: 'Ask for a quote', link: 'partners.html#business', alt: 'EcoPower institutional cookstove' }, sw: { kicker: 'Kwa shule na taasisi', name: 'Jiko la taasisi', description: 'Majiko makubwa ya sufuria moja yenye sufuria na kifuniko, pamoja na mlango wa mbele wa mafuta, kwa shule, hospitali na jikoni kubwa.', price: 'Bei kwa makubaliano', button: 'Omba bei', link: 'partners.html#business', alt: 'Jiko la taasisi la EcoPower' } }
      ]
    },
    bundle: {
      items: [
        { id: 'starter-bundle', image: '', position: 'center', displayOrder: 1, visible: true, en: { kicker: 'Start at home', title: 'Starter bundle: household stove + 25 kg Makange', description: 'A practical way to begin cleaner cooking at home.', included: '', price: 'TZS 43,000', button: 'Order bundle', link: 'https://wa.me/255784017225', alt: '' }, sw: { kicker: 'Anza nyumbani', title: 'Kifurushi cha kuanzia: jiko la nyumbani + Makange kilo 25', description: 'Njia rahisi kuanza upishi safi nyumbani.', included: '', price: 'TZS 43,000', button: 'Agiza kifurushi', link: 'https://wa.me/255784017225', alt: '' } }
      ]
    },
    cta: {
      en: { title: 'Need fuel every week?', description: 'Set up a regular monthly order: a fixed number of bags delivered through the month, paid on delivery.', button: 'Get a business quote', link: 'partners.html#business', format: { ...textFormatDefaults } },
      sw: { title: 'Unahitaji mafuta kila wiki?', description: 'Panga agizo la kila mwezi: idadi maalum ya magunia yaletwe kwa mwezi na yalipwe wakati wa delivery.', button: 'Pata bei ya biashara', link: 'partners.html#business', format: { ...textFormatDefaults } }
    }
  });
  const aboutCatalogDefaults = () => ({
    story: {
      en: { title: 'Our story so far', subtitle: 'From a small charcoal wood seller to a working factory with its own delivery fleet', format: { ...textFormatDefaults } },
      sw: { title: 'Hadithi yetu hadi sasa', subtitle: 'Kutoka kwa muuzaji mdogo wa mkaa hadi kiwanda kinachofanya kazi na usafirishaji wake', format: { ...textFormatDefaults } },
      items: [
        { id: 'about-story-2023', displayOrder: 1, visible: true, en: { year: '2023', title: 'The start', description: 'We sold wood charcoal and saw its cost to families and forests. We began pressing briquettes from char dust and farm waste, by hand, in Kunduchi.', format: { ...textFormatDefaults } }, sw: { year: '2023', title: 'Mwanzo', description: 'Tuliuza mkaa wa kuni na kuona gharama yake kwa familia na misitu. Tulianza kubinya briquettes kutoka vumbi la mkaa na mabaki ya kilimo kwa mikono Kunduchi.', format: { ...textFormatDefaults } } },
        { id: 'about-story-2024', displayOrder: 2, visible: true, en: { year: '2024', title: 'Steady ground', description: 'Food sellers came back each week. Independent tests confirmed a long, steady burn.', format: { ...textFormatDefaults } }, sw: { year: '2024', title: 'Msingi imara', description: 'Wauza chakula walirudi kila wiki. Vipimo huru vilithibitisha moto unaodumu na kuwaka kwa utulivu.', format: { ...textFormatDefaults } } },
        { id: 'about-story-2025', displayOrder: 3, visible: true, en: { year: '2025', title: 'Tested by hardship', description: 'Rain, power cuts and unrest slowed us down, but we kept going. We added our first delivery tricycle and our first WAKALA shop.', format: { ...textFormatDefaults } }, sw: { year: '2025', title: 'Tulijaribiwa na changamoto', description: 'Mvua, kukatika kwa umeme na misukosuko vilitupunguza kasi, lakini tuliendelea. Tuliongeza Toyo yetu ya kwanza ya delivery na duka letu la kwanza la WAKALA.', format: { ...textFormatDefaults } } },
        { id: 'about-story-2026', displayOrder: 4, visible: true, en: { year: '2026', title: 'A factory', description: 'Machines now press, mix and dry our fuel. Three tricycles deliver across the city, agents sell Makange in their neighbourhoods, and we build our own stoves.', format: { ...textFormatDefaults } }, sw: { year: '2026', title: 'Kiwanda', description: 'Mashine sasa zinachanganya, zinabinya na kukausha mafuta yetu. Toyo tatu zinasafirisha jijini, mawakala wanauza Makange kwenye maeneo yao, na tunajenga majiko yetu.', format: { ...textFormatDefaults } } }
      ]
    },
    process: {
      en: { title: 'How Makange is made', format: { ...textFormatDefaults } },
      sw: { title: 'Jinsi Makange inavyotengenezwa', format: { ...textFormatDefaults } },
      items: [
        { id: 'about-process-collect', image: 'EcoPower_all_extracted_images/page_01_image_009.jpeg', position: 'center', displayOrder: 1, visible: true, en: { title: 'Collect and mix', description: 'Char dust, agro and forest waste blended with a binder in our mixer.', alt: 'Mixing materials for Makange briquettes', format: { ...textFormatDefaults } }, sw: { title: 'Kusanya na changanya', description: 'Vumbi la mkaa, mabaki ya kilimo na misitu vinachanganywa na binder kwenye mashine yetu.', alt: 'Kuchanganya vifaa vya briquettes za Makange', format: { ...textFormatDefaults } } },
        { id: 'about-process-press', image: 'EcoPower_all_extracted_images/page_04_image_030.jpeg', position: 'center', displayOrder: 2, visible: true, en: { title: 'Press', description: 'Pressed into long briquettes by our machine.', alt: 'Pressed Makange briquettes', format: { ...textFormatDefaults } }, sw: { title: 'Binya', description: 'Vinabonyezwa kuwa briquettes ndefu na mashine yetu.', alt: 'Briquettes za Makange zilizobinywa', format: { ...textFormatDefaults } } },
        { id: 'about-process-dry', image: 'EcoPower_all_extracted_images/page_04_image_031.jpeg', position: 'center', displayOrder: 3, visible: true, en: { title: 'Dry and pack', description: 'Dried on trays in our solar dryer, then packed in 25kg and 50kg sacks.', alt: 'Makange briquettes drying in the solar dryer', format: { ...textFormatDefaults } }, sw: { title: 'Kausha na pakia', description: 'Zinakauka kwenye trei katika solar dryer yetu, kisha zinafungashwa kwenye magunia ya kilo 25 na 50.', alt: 'Briquettes za Makange zikikaushwa kwenye solar dryer', format: { ...textFormatDefaults } } },
        { id: 'about-process-deliver', image: 'EcoPower_all_extracted_images/page_01_image_003.jpeg', position: 'center', displayOrder: 4, visible: true, en: { title: 'Deliver', description: 'Next day, by our own Toyo crew.', alt: 'Delivering Makange fuel to customers', format: { ...textFormatDefaults } }, sw: { title: 'Sambaza', description: 'Siku inayofuata, na timu yetu ya Toyo.', alt: 'Kusafirisha mafuta ya Makange kwa wateja', format: { ...textFormatDefaults } } }
      ]
    },
    founder: {
      image: 'EcoPower_all_extracted_images/page_04_image_032.jpeg', position: 'center',
      en: { name: 'Othman Makange', role: 'Founder & CEO', description: 'From selling charcoal to making a cleaner fuel for Tanzanian kitchens.', link: 'Meet the team', linkHref: 'team.html', alt: 'Othman Makange, founder and CEO', format: { ...textFormatDefaults } },
      sw: { name: 'Othman Makange', role: 'Mwanzilishi na Mkurugenzi Mkuu', description: 'Kutoka kuuza mkaa hadi kutengeneza mafuta safi kwa jikoni za Tanzania.', link: 'Kutana na timu', linkHref: 'team.html', alt: 'Othman Makange, mwanzilishi na Mkurugenzi Mkuu', format: { ...textFormatDefaults } }
    },
    partners: {
      en: { title: 'Partners and funders', description: '', format: { ...textFormatDefaults } },
      sw: { title: 'Washirika na wafadhili', description: '', format: { ...textFormatDefaults } },
      items: [
        { id: 'about-partner-aecf', image: 'EcoPower_all_extracted_images/page_01_image_019.png', position: 'center', displayOrder: 1, visible: true, en: { name: 'AECF', description: '', link: '', alt: 'AECF', format: { ...textFormatDefaults } }, sw: { name: 'AECF', description: '', link: '', alt: 'AECF', format: { ...textFormatDefaults } } },
        { id: 'about-partner-uncdf', image: 'EcoPower_all_extracted_images/page_01_image_020.png', position: 'center', displayOrder: 2, visible: true, en: { name: 'UNCDF', description: '', link: '', alt: 'UNCDF', format: { ...textFormatDefaults } }, sw: { name: 'UNCDF', description: '', link: '', alt: 'UNCDF', format: { ...textFormatDefaults } } },
        { id: 'about-partner-tirdo', image: 'EcoPower_all_extracted_images/TIRDO_logo_from_EcoPower_PDF.png', position: 'center', displayOrder: 3, visible: true, en: { name: 'TIRDO', description: '', link: '', alt: 'TIRDO', format: { ...textFormatDefaults } }, sw: { name: 'TIRDO', description: '', link: '', alt: 'TIRDO', format: { ...textFormatDefaults } } },
        { id: 'about-partner-samai', image: 'EcoPower_all_extracted_images/page_01_image_021.png', position: 'center', displayOrder: 4, visible: true, en: { name: 'Samai Agro', description: '', link: '', alt: 'Samai Agro', format: { ...textFormatDefaults } }, sw: { name: 'Samai Agro', description: '', link: '', alt: 'Samai Agro', format: { ...textFormatDefaults } } },
        { id: 'about-partner-meher', image: 'EcoPower_all_extracted_images/page_01_image_022.png', position: 'center', displayOrder: 5, visible: true, en: { name: 'Meher International', description: '', link: '', alt: 'Meher International', format: { ...textFormatDefaults } }, sw: { name: 'Meher International', description: '', link: '', alt: 'Meher International', format: { ...textFormatDefaults } } },
        { id: 'about-partner-zill', image: 'EcoPower_all_extracted_images/page_01_image_023.png', position: 'center', displayOrder: 6, visible: true, en: { name: 'Zill', description: '', link: '', alt: 'Zill', format: { ...textFormatDefaults } }, sw: { name: 'Zill', description: '', link: '', alt: 'Zill', format: { ...textFormatDefaults } } }
      ]
    }
  });
  const teamCatalogDefaults = () => ({
    management: {
      en: { title: 'Leadership with purpose.', description: 'People responsible for the company, factory operations and customer delivery.', format: { ...textFormatDefaults } },
      sw: { title: 'Uongozi wenye kusudi.', description: 'Watu wanaosimamia kampuni, shughuli za kiwanda na delivery kwa wateja.', format: { ...textFormatDefaults } },
      items: [
        { id: 'team-management-othman', image: 'EcoPower_all_extracted_images/page_04_image_032.jpeg', position: 'center', displayOrder: 1, visible: true, en: { name: 'Othman Makange', role: 'Founder & CEO', description: 'From selling charcoal to making a cleaner fuel for Tanzanian kitchens.', alt: 'Othman Makange', format: { ...textFormatDefaults } }, sw: { name: 'Othman Makange', role: 'Mwanzilishi na Mkurugenzi Mkuu', description: 'Kutoka kuuza mkaa hadi kutengeneza mafuta safi kwa jikoni za Tanzania.', alt: 'Othman Makange', format: { ...textFormatDefaults } } },
        { id: 'team-management-jacqueline', image: 'EcoPower_all_extracted_images/page_05_image_033.jpeg', position: 'center', displayOrder: 2, visible: true, en: { name: 'Jacqueline Mrema', role: 'Operations Manager', description: 'Runs the factory floor, production planning and delivery operations.', alt: 'Jacqueline Mrema', format: { ...textFormatDefaults } }, sw: { name: 'Jacqueline Mrema', role: 'Meneja wa Uendeshaji', description: 'Anasimamia kiwanda, mipango ya uzalishaji na shughuli za delivery.', alt: 'Jacqueline Mrema', format: { ...textFormatDefaults } } }
      ]
    },
    board: {
      en: { title: "Guiding EcoPower's growth.", description: 'Governance and oversight supporting a credible Tanzanian clean-energy company.', format: { ...textFormatDefaults } },
      sw: { title: 'Kuongoza ukuaji wa EcoPower.', description: 'Uongozi na usimamizi unaounga mkono kampuni ya nishati safi ya Tanzania.', format: { ...textFormatDefaults } },
      items: [
        { id: 'team-board-othman', image: 'EcoPower_all_extracted_images/page_04_image_032.jpeg', position: 'center', displayOrder: 1, visible: true, en: { name: 'Othman Makange', role: 'Director', description: '', alt: 'Othman Makange', format: { ...textFormatDefaults } }, sw: { name: 'Othman Makange', role: 'Mkurugenzi', description: '', alt: 'Othman Makange', format: { ...textFormatDefaults } } },
        { id: 'team-board-ashik', image: 'EcoPower_all_extracted_images/page_05_image_034.jpeg', position: 'center', displayOrder: 2, visible: true, en: { name: 'Ashik Shariff', role: 'Director', description: '', alt: 'Ashik Shariff', format: { ...textFormatDefaults } }, sw: { name: 'Ashik Shariff', role: 'Mkurugenzi', description: '', alt: 'Ashik Shariff', format: { ...textFormatDefaults } } },
        { id: 'team-board-amal', image: 'EcoPower_all_extracted_images/page_05_image_035.jpeg', position: 'center', displayOrder: 3, visible: true, en: { name: 'Amal Somaiya', role: 'Director', description: '', alt: 'Amal Somaiya', format: { ...textFormatDefaults } }, sw: { name: 'Amal Somaiya', role: 'Mkurugenzi', description: '', alt: 'Amal Somaiya', format: { ...textFormatDefaults } } }
      ]
    }
  });
  const impactCatalogDefaults = () => ({
    customers: {
      en: { title: 'Our customers', format: { ...textFormatDefaults } },
      sw: { title: 'Wateja wetu', format: { ...textFormatDefaults } },
      items: [
        { id: 'impact-customer-aizak', image: 'EcoPower_all_extracted_images/page_06_image_037.jpeg', position: 'center', displayOrder: 1, visible: true, en: { name: 'Mama Aizak', location: 'Kunduchi', occupation: 'Mmiliki wa mgahawa', quoteSw: 'Moto wa Makange unakaa muda mrefu, sufuria hazijai masizi, na mwisho wa mwezi naona faida.', quoteEn: 'The Makange fire lasts a long time, my pots don’t get covered in soot, and at the end of the month I see the profit.', alt: 'Mama Aizak, Makange customer', format: { ...textFormatDefaults } }, sw: { name: 'Mama Aizak', location: 'Kunduchi', occupation: 'Mmiliki wa mgahawa', quoteSw: 'Moto wa Makange unakaa muda mrefu, sufuria hazijai masizi, na mwisho wa mwezi naona faida.', quoteEn: 'The Makange fire lasts a long time, my pots don’t get covered in soot, and at the end of the month I see the profit.', alt: 'Mama Aizak, mteja wa Makange', format: { ...textFormatDefaults } } },
        { id: 'impact-customer-amina', image: 'EcoPower_all_extracted_images/page_06_image_038.jpeg', position: 'center', displayOrder: 2, visible: true, en: { name: 'Amina', location: 'Kurasini', occupation: 'Mama ntilie', quoteSw: 'Ugali unataka moto mkali usiokata. Makange inanipa moto huo kila siku, bila kuongeza mkaa kila mara.', quoteEn: 'Ugali needs a strong fire that doesn’t die down. Makange gives me that fire every day, without topping up all the time.', alt: 'Amina, Makange customer', format: { ...textFormatDefaults } }, sw: { name: 'Amina', location: 'Kurasini', occupation: 'Mama ntilie', quoteSw: 'Ugali unataka moto mkali usiokata. Makange inanipa moto huo kila siku, bila kuongeza mkaa kila mara.', quoteEn: 'Ugali needs a strong fire that doesn’t die down. Makange gives me that fire every day, without topping up all the time.', alt: 'Amina, mteja wa Makange', format: { ...textFormatDefaults } } }
      ]
    },
    comparison: {
      en: { title: 'Cost of cooking for one day', description: "A typical day of cooking, at today's prices.", note: 'Makange saves about TZS 1,200 a day against charcoal and TZS 1,400 against gas.', format: { ...textFormatDefaults } },
      sw: { title: 'Gharama ya kupika kwa siku moja', description: 'Siku ya kawaida ya kupika, kwa bei za leo.', note: 'Makange inaokoa takriban TZS 1,200 kwa siku dhidi ya mkaa na TZS 1,400 dhidi ya gesi.', format: { ...textFormatDefaults } },
      items: [
        { id: 'impact-fuel-makange', displayOrder: 1, visible: true, en: { name: 'Makange', unit: 'TZS 440/kg, 50kg sack', amount: '~9.5 kg', cost: 'TZS ~4,200', explanation: '', format: { ...textFormatDefaults } }, sw: { name: 'Makange', unit: 'TZS 440/kg, gunia la 50kg', amount: '~9.5 kg', cost: 'TZS ~4,200', explanation: '', format: { ...textFormatDefaults } } },
        { id: 'impact-fuel-charcoal', displayOrder: 2, visible: true, en: { name: 'Wood charcoal', unit: '~TZS 900/kg, bought by the sack', amount: '~6 kg', cost: 'TZS ~5,400', explanation: '', format: { ...textFormatDefaults } }, sw: { name: 'Mkaa wa kuni', unit: '~TZS 900/kg, unanunuliwa kwa gunia', amount: '~6 kg', cost: 'TZS ~5,400', explanation: '', format: { ...textFormatDefaults } } },
        { id: 'impact-fuel-gas', displayOrder: 3, visible: true, en: { name: 'Gas (LPG)', unit: '~TZS 3,260/kg, 38kg cylinder', amount: '~1.7 kg', cost: 'TZS ~5,600', explanation: '', format: { ...textFormatDefaults } }, sw: { name: 'Gesi (LPG)', unit: '~TZS 3,260/kg, mtungi wa 38kg', amount: '~1.7 kg', cost: 'TZS ~5,600', explanation: '', format: { ...textFormatDefaults } } }
      ]
    },
    benefits: {
      en: { title: 'Environmental and social impact', format: { ...textFormatDefaults } },
      sw: { title: 'Matokeo ya mazingira na jamii', format: { ...textFormatDefaults } },
      items: [
        { id: 'impact-benefit-smoke', displayOrder: 1, visible: true, en: { title: 'Less smoke in the kitchen', description: 'A little smoke only while lighting. Once lit, Makange burns clean with no smoke. Cooks breathe easier, and pots and walls stay cleaner.', statistic: '', source: '', format: { ...textFormatDefaults } }, sw: { title: 'Moshi mdogo jikoni', description: 'Moshi kidogo wakati wa kuwasha tu. Ikishawaka, Makange huwaka bila moshi. Wapishi hupumua vizuri na sufuria pamoja na kuta hubaki safi.', statistic: '', source: '', format: { ...textFormatDefaults } } },
        { id: 'impact-benefit-trees', displayOrder: 2, visible: true, en: { title: 'Fewer trees cut', description: 'Every sack of Makange takes the place of charcoal made from cut trees. At full production, that is about 190 tonnes of wood left standing every month.', statistic: '', source: '', format: { ...textFormatDefaults } }, sw: { title: 'Kukata miti kidogo', description: 'Kila gunia la Makange linachukua nafasi ya mkaa uliotengenezwa kwa miti iliyokatwa. Kwa uzalishaji kamili, ni takriban tani 190 za kuni zinazobaki kila mwezi.', statistic: '', source: '', format: { ...textFormatDefaults } } },
        { id: 'impact-benefit-jobs', displayOrder: 3, visible: true, en: { title: 'Local jobs', description: '7 full-time staff in production and delivery, 5 WAKALA shops and 20 resellers who earn by selling Makange.', statistic: '', source: '', format: { ...textFormatDefaults } }, sw: { title: 'Ajira za ndani', description: 'Wafanyakazi 7 wa kudumu katika uzalishaji na delivery, maduka 5 ya WAKALA na wauzaji 20 wanaopata kipato kwa kuuza Makange.', statistic: '', source: '', format: { ...textFormatDefaults } } }
      ]
    }
  });
  const partnerCatalogDefaults = () => ({
    wakala: {
      image: 'EcoPower_all_extracted_images/page_07_image_039.jpeg',
      position: 'center',
      en: { eyebrow: 'For shops and agents', title: 'Become a Makange agent or WAKALA', description: 'Our 5 WAKALA shops and 20 resellers already sell Makange in their neighbourhoods. Join them.', label: 'Our WAKALA shops · WhatsApp or call', followup: 'Want to become a WAKALA? Send us a message on WhatsApp and our team will guide you through prices, delivery and support.', button: 'Become a WAKALA on WhatsApp', buttonLink: 'https://wa.me/255784017225', alt: 'Makange fuel at a WAKALA shop', format: { ...textFormatDefaults } },
      sw: { eyebrow: 'Kwa maduka na mawakala', title: 'Kuwa wakala au WAKALA wa Makange', description: 'Maduka 5 ya WAKALA na wauzaji 20 tayari wanauza Makange kwenye maeneo yao. Jiunge nao.', label: 'Maduka yetu ya WAKALA · WhatsApp au simu', followup: 'Unataka kuwa WAKALA? Tutumie ujumbe WhatsApp na timu yetu itakuelekeza kuhusu bei, delivery na msaada.', button: 'Kuwa WAKALA kwa WhatsApp', buttonLink: 'https://wa.me/255784017225', alt: 'Mafuta ya Makange kwenye duka la WAKALA', format: { ...textFormatDefaults } },
      items: [
        { id: 'partner-wakala-ubungo', displayOrder: 1, visible: true, en: { name: 'Ubungo', phone: '0678 796 184', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Ubungo', phone: '0678 796 184', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-wakala-temeke', displayOrder: 2, visible: true, en: { name: 'Temeke', phone: '0692 466 233', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Temeke', phone: '0692 466 233', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-wakala-bunju', displayOrder: 3, visible: true, en: { name: 'Bunju', phone: '0717 219 492', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Bunju', phone: '0717 219 492', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-wakala-salasala', displayOrder: 4, visible: true, en: { name: 'Salasala', phone: '0714 148 345', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Salasala', phone: '0714 148 345', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-wakala-kigamboni', displayOrder: 5, visible: true, en: { name: 'Kigamboni / Kurasini', phone: '0768 558 889', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Kigamboni / Kurasini', phone: '0768 558 889', description: '', format: { ...textFormatDefaults } } }
      ]
    },
    business: {
      en: { eyebrow: 'For food sellers and institutions', title: 'Regular monthly orders', description: 'Agree a fixed number of bags each month. We deliver through the month and you pay on delivery, by cash or Lipa Namba. Already working for chips sellers in Kinondoni.', button: 'Get a business quote', buttonLink: 'https://wa.me/255784017225', format: { ...textFormatDefaults } },
      sw: { eyebrow: 'Kwa wauza chakula na taasisi', title: 'Maagizo ya kila mwezi', description: 'Kubali idadi maalum ya magunia kila mwezi. Tunaleta bidhaa kwa mwezi mzima na unalipa wakati wa kupokea kwa cash au Lipa Namba. Tayari inafanya kazi kwa wauza chips Kinondoni.', button: 'Pata bei ya biashara', buttonLink: 'https://wa.me/255784017225', format: { ...textFormatDefaults } },
      items: [
        { id: 'partner-business-schools', displayOrder: 1, visible: true, en: { name: 'Schools and hospitals', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Shule na hospitali', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-business-restaurants', displayOrder: 2, visible: true, en: { name: 'Restaurants, hotels and canteens', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Migahawa, hoteli na kantini', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-business-chips', displayOrder: 3, visible: true, en: { name: 'Chips stalls and mama ntilie', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Vibanda vya chipsi na mama ntilie', description: '', format: { ...textFormatDefaults } } },
        { id: 'partner-business-stoves', displayOrder: 4, visible: true, en: { name: 'Institutional stoves, built to order', description: '', format: { ...textFormatDefaults } }, sw: { name: 'Majiko ya taasisi, yanajengwa kwa oda', description: '', format: { ...textFormatDefaults } } }
      ]
    },
    funders: {
      en: { title: 'Funders and partners', description: 'The funders, researchers and suppliers who help us make clean cooking fuel in Tanzania.', format: { ...textFormatDefaults } },
      sw: { title: 'Wafadhili na washirika', description: 'Wafadhili, watafiti na wasambazaji wanaotusaidia kutengeneza nishati safi ya kupikia Tanzania.', format: { ...textFormatDefaults } },
      items: [
        { id: 'partner-funder-aecf', image: 'EcoPower_all_extracted_images/page_01_image_019.png', position: 'center', displayOrder: 1, visible: true, en: { name: 'Tanzania Clean Cooking Project', description: '', link: '', alt: 'AECF', format: { ...textFormatDefaults } }, sw: { name: 'Tanzania Clean Cooking Project', description: '', link: '', alt: 'AECF', format: { ...textFormatDefaults } } },
        { id: 'partner-funder-uncdf', image: 'EcoPower_all_extracted_images/page_01_image_020.png', position: 'center', displayOrder: 2, visible: true, en: { name: 'CookFund', description: '', link: '', alt: 'UN CDF', format: { ...textFormatDefaults } }, sw: { name: 'CookFund', description: '', link: '', alt: 'UN CDF', format: { ...textFormatDefaults } } },
        { id: 'partner-funder-tirdo', image: 'EcoPower_all_extracted_images/TIRDO_logo_from_EcoPower_PDF.png', position: 'center', displayOrder: 3, visible: true, en: { name: 'Research partnership', description: '', link: '', alt: 'TIRDO', format: { ...textFormatDefaults } }, sw: { name: 'Ushirikiano wa utafiti', description: '', link: '', alt: 'TIRDO', format: { ...textFormatDefaults } } },
        { id: 'partner-funder-samai', image: 'EcoPower_all_extracted_images/page_01_image_021.png', position: 'center', displayOrder: 4, visible: true, en: { name: 'Machinery partner', description: '', link: '', alt: 'Samai Agro', format: { ...textFormatDefaults } }, sw: { name: 'Mshirika wa mashine', description: '', link: '', alt: 'Samai Agro', format: { ...textFormatDefaults } } },
        { id: 'partner-funder-meher', image: 'EcoPower_all_extracted_images/page_01_image_022.png', position: 'center', displayOrder: 5, visible: true, en: { name: 'Equipment partner', description: '', link: '', alt: 'Meher International', format: { ...textFormatDefaults } }, sw: { name: 'Mshirika wa vifaa', description: '', link: '', alt: 'Meher International', format: { ...textFormatDefaults } } },
        { id: 'partner-funder-zill', image: 'EcoPower_all_extracted_images/page_01_image_023.png', position: 'center', displayOrder: 6, visible: true, en: { name: 'Partner', description: '', link: '', alt: 'Zill', format: { ...textFormatDefaults } }, sw: { name: 'Mshirika', description: '', link: '', alt: 'Zill', format: { ...textFormatDefaults } } }
      ]
    }
  });
  const faqQuestion = (id, displayOrder, question, answer, open = false, swQuestion = '', swAnswer = '') => ({
    id,
    displayOrder,
    visible: true,
    isAdded: false,
    open,
    en: { question, answer, answerLinkText: '', answerLinkUrl: '', format: { ...textFormatDefaults } },
    sw: { question: swQuestion, answer: swAnswer, answerLinkText: '', answerLinkUrl: '', format: { ...textFormatDefaults } }
  });
  const faqCatalogDefaults = () => ({
    ordering: {
      en: { title: 'Ordering and delivery', format: { ...textFormatDefaults } },
      sw: { title: 'Kuagiza na delivery', format: { ...textFormatDefaults } },
      items: [
        faqQuestion('faq-order-cost', 1, 'How much does Makange cost?', '50kg sack TZS 22,000, 25kg sack TZS 13,000. For bulk and regular monthly orders, ask us on WhatsApp.', true, 'Makange inagharimu kiasi gani?', 'Gunia la kilo 50 ni TZS 22,000, gunia la kilo 25 ni TZS 13,000. Kwa oda za wingi na za kila mwezi, tuulize WhatsApp.'),
        faqQuestion('faq-order-minimum', 2, 'What is the smallest order you deliver?', 'Our regular delivery minimum is 20 bags of 50kg. For smaller orders, visit a WAKALA shop or ask us about availability.', false, 'Oda ndogo zaidi mnayowasilisha ni ipi?', 'Kiwango chetu cha kawaida cha delivery ni magunia 20 ya kilo 50. Kwa oda ndogo, tembelea duka la WAKALA au tuulize kuhusu upatikanaji.'),
        faqQuestion('faq-order-delivery', 3, 'Where do you deliver, and how fast?', 'We deliver within 10 km of the Kunduchi factory, with next-day delivery planned after your order is confirmed.', false, 'Mnafanya delivery wapi, na kwa haraka gani?', 'Tunafanya delivery ndani ya km 10 kutoka kiwanda cha Kunduchi, na delivery ya siku inayofuata hupangwa baada ya oda kuthibitishwa.'),
        faqQuestion('faq-order-how', 4, 'How do I order?', 'WhatsApp 0784 017 225 with the sack size, quantity and delivery location. Our team will confirm the order.', false, 'Ninaagizaje?', 'WhatsApp 0784 017 225 ukiweka ukubwa wa gunia, idadi na eneo la delivery. Timu yetu itathibitisha oda.')
      ]
    },
    paying: {
      en: { title: 'Paying', format: { ...textFormatDefaults } },
      sw: { title: 'Malipo', format: { ...textFormatDefaults } },
      items: [
        faqQuestion('faq-paying-methods', 1, 'How can I pay?', 'Cash on delivery, or Lipa Namba from any mobile network or bank: M-Pesa Lipa Namba 352491280, or CRDB Lipa Namba 104084772 (also takes Visa, Mastercard, UnionPay and Amex). After paying, send the payment message on WhatsApp to 0784 017 225.', true, 'Ninawezaje kulipa?', 'Lipa wakati wa kupokea kwa cash, au tumia Lipa Namba kutoka mtandao wowote wa simu au benki: M-Pesa Lipa Namba 352491280, au CRDB Lipa Namba 104084772 (inakubali pia Visa, Mastercard, UnionPay na Amex). Baada ya kulipa, tuma ujumbe wa malipo WhatsApp 0784 017 225.'),
        faqQuestion('faq-paying-name', 2, 'Why does the M-Pesa name say "ECOPOWER SOLUTIONS LTD 1"?', 'That is the registered payment name connected to the EcoPower Lipa Namba account.', false, 'Kwa nini jina la M-Pesa linaandika "ECOPOWER SOLUTIONS LTD 1"?', 'Hilo ndilo jina la malipo lililosajiliwa kwenye akaunti ya EcoPower Lipa Namba.'),
        faqQuestion('faq-paying-networks', 3, 'Can I pay with Mixx by Yas, Airtel Money or Halopesa?', 'Yes. Use the Lipa Namba option available in your mobile money network, then send the payment confirmation on WhatsApp.', false, 'Naweza kulipa kwa Mixx by Yas, Airtel Money au Halopesa?', 'Ndiyo. Tumia chaguo la Lipa Namba kwenye mtandao wako wa simu, kisha tuma uthibitisho wa malipo WhatsApp.')
      ]
    },
    using: {
      en: { title: 'Using Makange', format: { ...textFormatDefaults } },
      sw: { title: 'Kutumia Makange', format: { ...textFormatDefaults } },
      items: [
        faqQuestion('faq-using-burn', 1, 'How long does it burn?', 'Makange can burn for several hours depending on the stove, airflow and cooking load.', false, 'Inawaka kwa muda gani?', 'Makange inaweza kuwaka kwa saa kadhaa kulingana na jiko, hewa na uzito wa upishi.'),
        faqQuestion('faq-using-smoke', 2, 'Does it smoke?', 'There may be a little smoke while lighting. Once lit, Makange is designed to burn cleanly and steadily.', false, 'Inatoa moshi?', 'Kunaweza kuwa na moshi kidogo wakati wa kuwasha. Ikishawaka, Makange imeundwa kuwaka kwa usafi na kwa utulivu.'),
        faqQuestion('faq-using-light', 3, 'How do I light it?', 'Add a starter and dry sticks to a level stove, light the sticks, then add Makange while leaving gaps for airflow.', false, 'Ninawashaje?', 'Weka kianzishi na vijiti vikavu kwenye jiko lililonyooka, washa vijiti, kisha ongeza Makange ukiacha nafasi za hewa.'),
        faqQuestion('faq-using-made', 4, 'What is it made from?', 'Makange is made from recovered charcoal dust, agricultural waste and forest waste.', false, 'Imetengenezwa kutokana na nini?', 'Makange imetengenezwa kutokana na vumbi la mkaa lililorejeshwa, taka za kilimo na taka za misitu.'),
        faqQuestion('faq-using-stoves', 5, 'Do you sell cookstoves?', 'Yes. EcoPower offers household, mama ntilie, two-burner and institutional cookstoves.', false, 'Mnauza majiko?', 'Ndiyo. EcoPower inatoa majiko ya nyumbani, mama ntilie, burner mbili na taasisi.')
      ]
    },
    business: {
      en: { title: 'Business', format: { ...textFormatDefaults } },
      sw: { title: 'Biashara', format: { ...textFormatDefaults } },
      items: [
        faqQuestion('faq-business-sell', 1, 'Can I sell Makange from my shop?', 'Yes. Contact us to become a WAKALA or reseller and our team will guide you through prices, delivery and support.', false, 'Naweza kuuza Makange kwenye duka langu?', 'Ndiyo. Wasiliana nasi kuwa WAKALA au muuzaji, na timu yetu itakuongoza kuhusu bei, delivery na msaada.'),
        faqQuestion('faq-business-hours', 2, 'What are your opening hours?', 'Monday to Saturday: 8:00 - 18:00. Sunday: 8:00 - 14:00.', false, 'Mnafanya kazi saa ngapi?', 'Jumatatu hadi Jumamosi: 8:00 - 18:00. Jumapili: 8:00 - 14:00.')
      ]
    }
  });
  const state = { draft: clone(baseContent), published: clone(baseContent), draftRecords: {}, publishedRecords: {}, revisions: [], media: initialMedia.slice() };
  const genericStates = {};
  let language = 'en';
  let activePage = 'home';
  let activeSection = 'hero';
  let isDashboard = false;
  let pendingContentSection = 'hero';
  let addContentDraft = null;
  let addContentInitialSnapshot = null;
  let editorSession = null;
  let mediaFocusReturn = null;
  let addContentModalSuspended = false;
  let previewMode = 'draft';
  let mediaTarget = null;
  let mediaSearch = '';
  let mediaBusy = false;
  let mediaLocalPreviewUrl = '';
  let mediaSelectedSrc = '';
  let toastTimer;
  let currentUser = null;
  let draftSaveTimer = null;
  let draftSavePromise = null;
  let draftSaveRevision = 0;
  let draftChangeVersion = 0;
  let loadingRemoteState = false;

  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
  const assetUrl = (src = '') => src.startsWith('media:') ? `/api/media/${src.slice(6)}/file` : src.startsWith('data:') || src.startsWith('http') || src.startsWith('/') ? src : `../${src}`;
  const emptyImagePlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 100'%3E%3Crect width='160' height='100' fill='%23eaf0eb'/%3E%3Cpath d='M45 68l22-25 17 18 12-14 19 21z' fill='%23b7c9bc'/%3E%3Ccircle cx='101' cy='34' r='9' fill='%23b7c9bc'/%3E%3C/svg%3E";
  const getAt = (obj, path) => path.split('.').reduce((value, key) => value?.[key], obj);
  const setAt = (obj, path, value) => { const bits = path.split('.'); const last = bits.pop(); const parent = bits.reduce((current, key) => current[key] ??= {}, obj); parent[last] = value; };
  const activeCopy = (section) => section[language] || section.en || {};
  function normalizeMediaForCompare(value) {
    if (typeof value === 'string' && value.startsWith('media:')) return state.media.find((item) => item.src === value)?.public_url || value;
    if (Array.isArray(value)) return value.map(normalizeMediaForCompare);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeMediaForCompare(item)]));
    return value;
  }
  function findMediaPath(value, target, path = []) {
    if (value === target) return path;
    if (Array.isArray(value)) { for (let index = 0; index < value.length; index += 1) { const found = findMediaPath(value[index], target, [...path, index]); if (found) return found; } }
    else if (value && typeof value === 'object') { for (const [key, item] of Object.entries(value)) { const found = findMediaPath(item, target, [...path, key]); if (found) return found; } }
    return null;
  }
  function mediaAssignment(src) {
    if (!src?.startsWith('media:')) return '';
    const homePath = findMediaPath(state.draft, src);
    if (homePath) return `Home · ${homePath.slice(0, -1).join(' · ')}`;
    for (const [slug, pageState] of Object.entries(genericStates)) {
      const found = findMediaPath(pageState.draftByLanguage?.[language], src);
      if (found) return `${pageMeta[slug].label} · ${found.join(' · ')}`;
    }
    return 'Uploaded asset · not assigned yet';
  }

  function showToast(message) {
    const toast = $('#admin-toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3200);
  }

  function syncDrawerSaveStatus() {
    const source = $('#draft-status');
    const drawer = $('#editor-drawer');
    const footer = drawer?.querySelector('.drawer-footer');
    if (!source || !footer) return;
    let mirror = $('#drawer-save-status');
    if (!mirror) {
      mirror = document.createElement('span');
      mirror.id = 'drawer-save-status';
      mirror.className = 'drawer-save-status';
      mirror.setAttribute('role', 'status');
      mirror.setAttribute('aria-live', 'polite');
      footer.prepend(mirror);
    }
    mirror.textContent = source.textContent;
    mirror.classList.toggle('is-saved', source.classList.contains('is-saved'));
  }

  function setCmsBusy(busy) {
    document.querySelectorAll('[data-action="save-draft"], [data-action="publish"], [data-action="commit-add-content"]').forEach((button) => {
      button.disabled = busy;
      button.setAttribute('aria-busy', String(busy));
    });
    syncDrawerSaveStatus();
  }

  function setMediaBusy(busy, message = '') {
    mediaBusy = busy;
    setCmsBusy(busy);
    const upload = $('#media-upload');
    const uploadLabel = upload?.closest('.upload-button');
    const cameraUpload = $('#media-camera');
    const cameraLabel = cameraUpload?.closest('.camera-upload-button');
    const urlForm = $('#media-url-form');
    const urlButton = urlForm?.querySelector('button[type="submit"]');
    if (upload) upload.disabled = busy;
    if (uploadLabel) uploadLabel.classList.toggle('is-busy', busy);
    if (cameraUpload) cameraUpload.disabled = busy;
    if (cameraLabel) cameraLabel.classList.toggle('is-busy', busy);
    if (urlButton) { urlButton.disabled = busy; urlButton.setAttribute('aria-busy', String(busy)); }
    syncMediaSelectionActions();
    const status = $('#media-upload-status');
    if (status && message) { status.textContent = message; status.className = `media-upload-status ${busy ? 'is-busy' : ''}`; }
  }

  function setMediaStatus(message, kind = '') {
    const status = $('#media-upload-status');
    if (!status) return;
    status.textContent = message;
    status.className = `media-upload-status${kind ? ` is-${kind}` : ''}`;
  }

  function clearMediaLocalPreview() {
    if (mediaLocalPreviewUrl) URL.revokeObjectURL(mediaLocalPreviewUrl);
    mediaLocalPreviewUrl = '';
  }

  function syncMediaSelectionActions() {
    const saveButton = $('#media-save-metadata');
    const deleteButton = $('#media-delete');
    if (saveButton) saveButton.disabled = mediaBusy || !mediaSelectedSrc;
    if (deleteButton) deleteButton.disabled = mediaBusy || !mediaSelectedSrc || !['owner', 'admin'].includes(currentUser?.role);
  }

  function showMediaFilePreview(file) {
    const image = $('#media-preview-image');
    const empty = $('#media-preview-empty');
    const name = $('#media-preview-name');
    const help = $('#media-preview-help');
    if (!image || !empty || !name || !help) return;
    clearMediaLocalPreview();
    mediaLocalPreviewUrl = URL.createObjectURL(file);
    image.src = mediaLocalPreviewUrl;
    image.alt = file.name || 'Selected image';
    image.hidden = false;
    empty.hidden = true;
    name.textContent = file.name || 'Selected image';
    help.textContent = 'Preview ready. The CMS will validate the image bytes before storing it in Preview Blob.';
  }

  function mediaMetadata() {
    const metadata = { alt_text_en: '', alt_text_sw: '', caption_en: '', caption_sw: '', description_en: '', description_sw: '' };
    const suffix = language === 'sw' ? 'sw' : 'en';
    metadata[`alt_text_${suffix}`] = $('#media-alt-text')?.value.trim() || '';
    metadata[`caption_${suffix}`] = $('#media-caption')?.value.trim() || '';
    metadata[`description_${suffix}`] = $('#media-description')?.value.trim() || '';
    return metadata;
  }

  function applyImportedMetadata(targetSection, targetPath, metadata) {
    const suffix = language === 'sw' ? 'sw' : 'en';
    const alt = metadata?.[`alt_text_${suffix}`] || '';
    const caption = metadata?.[`caption_${suffix}`] || '';
    const description = metadata?.[`description_${suffix}`] || '';
    const target = contentForSection(targetSection);
    if (targetSection === '__new-content__') {
      const block = addContentDraft?.block;
      if (!block) return;
      const parts = targetPath.split('.');
      const record = parts[0] === 'cards' ? block.cards?.[Number(parts[1])] : parts[0] === 'images' ? block.images?.[Number(parts[1])] : block;
      if (!record) return;
      const copy = record[language] || (record[language] = {});
      if (alt) copy.alt = alt;
      if (caption && 'caption' in copy) copy.caption = caption;
      if (description && 'description' in copy) copy.description = description;
      return;
    }
    if (activePage === 'about' && aboutSectionIds.has(targetSection)) {
      const parts = targetPath.split('.');
      const record = parts[0] === 'items' ? getAt(target, `items.${parts[1]}`) : target;
      const copy = record?.[language] || (record && (record[language] = {}));
      if (copy && alt) copy.alt = alt;
      return;
    }
    if (activePage === 'team' && teamSectionIds.has(targetSection)) {
      const parts = targetPath.split('.');
      const record = parts[0] === 'items' ? getAt(target, `items.${parts[1]}`) : target;
      const copy = record?.[language] || (record && (record[language] = {}));
      if (copy && alt) copy.alt = alt;
      return;
    }
    if (activePage === 'impact' && impactSectionIds.has(targetSection)) {
      const parts = targetPath.split('.');
      const record = parts[0] === 'items' ? getAt(target, `items.${parts[1]}`) : target;
      const copy = record?.[language] || (record && (record[language] = {}));
      if (copy && alt) copy.alt = alt;
      return;
    }
    if (activePage === 'partners' && partnerSectionIds.has(targetSection)) {
      const parts = targetPath.split('.');
      const record = parts[0] === 'items' ? getAt(target, `items.${parts[1]}`) : target;
      const copy = record?.[language] || (record && (record[language] = {}));
      if (copy && alt) copy.alt = alt;
      return;
    }
    const isGeneric = activePage !== 'home' && !targetSection.startsWith('block:');
    if (isGeneric) {
      const index = Number(targetPath.match(/^elements\.(\d+)\.value$/)?.[1]);
      if (Number.isInteger(index) && target.elements?.[index]) target.elements[index].alt = alt || target.elements[index].alt || '';
      return;
    }
    const parts = targetPath.split('.');
    const record = parts.length === 1 ? target : getAt(target, parts.slice(0, -1).join('.'));
    const copy = record?.[language] || (record && (record[language] = {}));
    if (!copy) return;
    if (alt) copy.alt = alt;
    if (targetSection.startsWith('block:')) {
      if (caption && 'caption' in copy) copy.caption = caption;
      if (description && 'description' in copy) copy.description = description;
    }
  }

  function updateLastUpdated(value) {
    const element = $('#last-updated');
    if (!element) return;
    element.textContent = value ? `Last updated: ${new Date(value).toLocaleString()}` : 'Last updated: not yet published';
  }

  function previewModeLabel() { return previewMode === 'published' ? 'Published' : 'Draft'; }
  function previewRecord() {
    if (activePage === 'home') {
      const records = previewMode === 'published' ? state.publishedRecords : state.draftRecords;
      return records?.[language] || records?.en || records?.sw || null;
    }
    const pageState = genericState();
    const records = previewMode === 'published' ? pageState?.publishedRecords : pageState?.draftRecords;
    return records?.[language] || records?.en || records?.sw || null;
  }
  function previewVersion() {
    return previewRecord()?.updated_at || (previewRecord()?.version ? String(previewRecord().version) : 'local');
  }
  function previewUrl(slug = activePage) {
    const params = new URLSearchParams({ cmsPreview: '1', previewMode });
    const version = previewVersion();
    if (version) params.set('previewVersion', version);
    return `../${pageMeta[slug].file}?${params.toString()}`;
  }

  function applyPreviewImages(content) {
    const frame = $('#preview-frame');
    const doc = frame?.contentDocument;
    if (!doc || !content) return;
    const imageUrl = (value) => {
      if (!value) return '';
      if (value.startsWith('media:')) return `/api/media/${value.slice(6)}/file`;
      if (value.startsWith('/') || value.startsWith('http') || value.startsWith('data:')) return value;
      return `/${value}`;
    };
    const byFieldId = (fieldId) => {
      if (!fieldId) return null;
      const escaped = window.CSS?.escape ? window.CSS.escape(fieldId) : fieldId.replace(/(["\\])/g, '\\$1');
      return doc.querySelector(`[data-cms-id="${escaped}"]`);
    };
    const setImage = (selector, value, index = 0, position) => {
      const image = doc.querySelectorAll(selector)[index];
      if (!image || !value) return;
      image.src = imageUrl(value);
      if (position) image.style.objectPosition = position;
    };
    if (activePage !== 'home') {
      if (activePage === 'products' && content.productsCatalog) {
        const catalog = content.productsCatalog;
        setImage('.page-hero-art', catalog.hero?.image, 0, catalog.hero?.position);
        setImage('.catalogue-image', catalog.makange?.image, 0, catalog.makange?.position);
        (catalog.lighting?.items || []).forEach((item, index) => setImage('#lighting .lighting-card img', item.image, index, item.position));
        (catalog.stoves?.items || []).forEach((item, index) => setImage('#stoves .stove-card img', item.image, index, item.position));
        return;
      }
      if (activePage === 'about' && content.aboutCatalog) {
        const catalog = content.aboutCatalog;
        setImage('.about-founder-card img', catalog.founder?.image, 0, catalog.founder?.position);
        (catalog.process?.items || []).forEach((item, index) => setImage('.journey-card img', item.image, index, item.position));
        (catalog.partners?.items || []).forEach((item, index) => setImage('.home-partner-logos img', item.image, index, item.position));
      }
    if (activePage === 'team' && content.teamCatalog) {
        const catalog = content.teamCatalog;
        (catalog.management?.items || []).forEach((item, index) => setImage('.section-white .people-grid .person-photo', item.image, index, item.position));
        (catalog.board?.items || []).forEach((item, index) => setImage('.section-cream .people-grid .person-photo', item.image, index, item.position));
      }
      if (activePage === 'impact' && content.impactCatalog) {
        const catalog = content.impactCatalog;
        const customers = (catalog.customers?.items || []).filter((item) => item?.visible !== false).map((item, index) => ({ item, index })).sort((left, right) => {
          const leftOrder = Number(left.item?.displayOrder);
          const rightOrder = Number(right.item?.displayOrder);
          const safeLeft = Number.isFinite(leftOrder) && leftOrder > 0 ? leftOrder : left.index + 1;
          const safeRight = Number.isFinite(rightOrder) && rightOrder > 0 ? rightOrder : right.index + 1;
          return safeLeft - safeRight || left.index - right.index;
        });
        customers.forEach(({ item }, index) => setImage('.impact-customers-section .customer-card img', item.image, index, item.position));
        return;
      }
      if (activePage === 'partners' && content.partnerCatalog) {
        const catalog = content.partnerCatalog;
        setImage('.partners-wakala-photo', catalog.wakala?.image, 0, catalog.wakala?.position);
        const funders = (catalog.funders?.items || []).filter((item) => item?.visible !== false).map((item, index) => ({ item, index })).sort((left, right) => {
          const leftOrder = Number(left.item?.displayOrder);
          const rightOrder = Number(right.item?.displayOrder);
          const safeLeft = Number.isFinite(leftOrder) && leftOrder > 0 ? leftOrder : left.index + 1;
          const safeRight = Number.isFinite(rightOrder) && rightOrder > 0 ? rightOrder : right.index + 1;
          return safeLeft - safeRight || left.index - right.index;
        });
        funders.forEach(({ item }, index) => setImage('.partners-funder-card img', item.image, index, item.position));
        return;
      }
      (content.elements || []).forEach((element) => {
        if (element.kind !== 'image' || !element.value) return;
        const image = byFieldId(element.field_id);
        if (image) {
          image.src = imageUrl(element.value);
          if (element.position) image.style.objectPosition = element.position;
        } else setImage(element.selector, element.value, element.index, element.position);
      });
      return;
    }
    setImage('.hero-photo', content.hero?.image, 0, content.hero?.imagePosition);
    setImage('.hero-brand-mark', content.images?.brand?.image, 0, content.images?.brand?.position);
    (content.images?.paymentQr || []).forEach((item, index) => setImage('#how-it-works .payment-qr-card img', item.image, index, item.position));
    (content.images?.factoryGallery || []).forEach((item, index) => setImage('.factory-collage img', item.image, index, item.position));
    (content.images?.kitchenGallery || []).forEach((item, index) => setImage('.category-grid .category-card img', item.image, index, item.position));
    (content.images?.partnerLogos || []).forEach((item, index) => setImage('.home-partner-logos img', item.image, index, item.position));
    (content.products?.items || []).forEach((item, index) => setImage('.product-card-image', item.image, index, item.imagePosition));
    (content.cookstoves?.items || []).forEach((item, index) => setImage('.home-stove-card img', item.image, index, item.imagePosition));
    setImage('.story-grid .factory-main-image', content.factory?.image, 0, content.factory?.imagePosition);
  }

  async function apiRequest(url, options = {}) {
    const response = await fetch(url, { credentials: 'same-origin', ...options, headers: { ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...(options.headers || {}) } });
    const raw = await response.text();
    let data = null;
    try { data = raw ? JSON.parse(raw) : null; } catch { data = { error: raw || 'The server returned an invalid response.' }; }
    if (!response.ok) {
      const error = new Error(data?.error || `Request failed with status ${response.status}.`);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function setAuthenticatedUser(user) {
    currentUser = user;
    $('.admin-app').classList.remove('is-locked');
    $('#login-screen').hidden = true;
    $('#admin-user-name').textContent = user.email;
    $('#admin-user-role').textContent = user.role === 'owner' ? 'Owner' : user.role === 'admin' ? 'Administrator' : 'Editor';
    $('#admin-user-name').closest('.admin-user').querySelector('.avatar').textContent = user.email.slice(0, 1).toUpperCase();
    $('#connection-label').textContent = 'Database connected';
    $('#connection-help').textContent = 'Authenticated local CMS · drafts and media persist on the server.';
  }

  const isMobileViewport = () => window.matchMedia?.('(max-width: 767px)').matches === true;
  let mobileMenuHistoryOpen = false;

  function filterSidebarNavigation(query = '') {
    const normalized = query.trim().toLowerCase();
    const pageItems = [...document.querySelectorAll('.page-nav-item')];
    const pageList = $('#page-nav-list');
    const emptyState = $('#sidebar-search-empty');
    const clearButton = $('#sidebar-search-clear');
    let visiblePages = 0;
    pageItems.forEach((item) => {
      const matches = !normalized || item.textContent.toLowerCase().includes(normalized);
      item.hidden = !matches;
      if (matches) visiblePages += 1;
    });
    if (pageList) {
      pageList.hidden = Boolean(normalized && !visiblePages);
      if (normalized && visiblePages) pageList.classList.remove('is-collapsed');
    }
    document.querySelectorAll('.admin-nav > .admin-nav-item').forEach((item) => {
      const action = item.dataset.action;
      if (!normalized) { item.hidden = false; return; }
      if (action === 'toggle-pages') item.hidden = !visiblePages && !item.textContent.toLowerCase().includes(normalized);
      else item.hidden = !item.textContent.toLowerCase().includes(normalized);
    });
    const visibleNavigation = [...document.querySelectorAll('.admin-nav > .admin-nav-item')].some((item) => !item.hidden);
    if (emptyState) emptyState.hidden = Boolean(!normalized || visiblePages || visibleNavigation);
    if (clearButton) clearButton.hidden = !normalized;
  }

  function setMobileMenuOpen(open, { fromHistory = false } = {}) {
    const mobile = isMobileViewport();
    if (!mobile) {
      document.body.classList.remove('mobile-menu-open');
      mobileMenuHistoryOpen = false;
      return;
    }
    const currentlyOpen = document.body.classList.contains('mobile-menu-open');
    if (currentlyOpen === open) return;
    document.body.classList.toggle('mobile-menu-open', open);
    document.querySelector('.dashboard-sidebar-toggle')?.setAttribute('aria-expanded', String(open));
    document.querySelector('.dashboard-sidebar-toggle')?.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (open) {
      const search = $('#sidebar-search-input');
      if (search) { search.value = ''; filterSidebarNavigation(''); }
      if (!fromHistory) {
        window.history.pushState({ ...(window.history.state || {}), ecopowerMobileMenu: true }, '', window.location.href);
        mobileMenuHistoryOpen = true;
      }
    } else {
      const shouldGoBack = !fromHistory && mobileMenuHistoryOpen && window.history.state?.ecopowerMobileMenu;
      mobileMenuHistoryOpen = false;
      if (shouldGoBack) window.history.back();
    }
  }

  window.addEventListener('popstate', () => {
    if (document.body.classList.contains('mobile-menu-open')) setMobileMenuOpen(false, { fromHistory: true });
  });

  function showLogin(errorMessage = '') {
    resetTransientModals();
    document.body.classList.add('dashboard-mode');
    currentUser = null;
    $('.admin-app').classList.add('is-locked');
    $('#login-screen').hidden = false;
    $('#login-error').textContent = errorMessage;
  }

  async function loadRemoteState() {
    loadingRemoteState = true;
    try {
      const [page, media] = await Promise.all([apiRequest(`/api/pages/${activePage}`), apiRequest('/api/media')]);
      if (activePage === 'home') applyRemotePage(page);
      else await applyGenericRemotePage(activePage, page);
      state.media = initialMedia.concat((media.media || []).map((item) => ({ ...item, name: item.original_name, uploaded: true })));
      updateDashboardMetrics();
      updatePageNavStats(activePage, currentPageContent());
      renderSectionList();
      renderForm(!isDashboard && !isMobileViewport());
      updatePreview();
      $('#draft-status').textContent = page.draft?.[language] ? 'Draft loaded from database' : 'No draft saved yet';
      $('#draft-status').classList.toggle('is-saved', Boolean(page.draft?.[language]));
      updateLastUpdated(page.draft?.[language]?.updated_at || page.published?.[language]?.updated_at);
      if (Array.isArray(page.image_conflicts) && page.image_conflicts.length) {
        showToast(`${page.image_conflicts.length} old EN/SW image difference${page.image_conflicts.length === 1 ? '' : 's'} reconciled using the English value. Review the affected image if needed.`);
      }
    } finally {
      loadingRemoteState = false;
    }
  }

  async function switchPage(slug, trigger) {
    if (!pageMeta[slug] || (slug === activePage && !isDashboard)) return;
    if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
    activePage = slug;
    isDashboard = false;
    document.body.classList.remove('dashboard-mode');
    setMobileMenuOpen(false);
    activeSection = slug === 'home' ? 'hero' : slug === 'products' ? 'hero' : slug === 'about' ? 'story' : slug === 'team' ? 'management' : slug === 'impact' ? 'customers' : slug === 'partners' ? 'wakala' : slug === 'faq' ? 'ordering' : 'generic-text';
    $('#dashboard-view').hidden = true;
    $('#dashboard-reference-view').hidden = true;
    $('#page-editor-view').hidden = false;
    document.querySelectorAll('.admin-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.action === 'toggle-pages'));
    document.querySelector('.admin-breadcrumb span').textContent = 'Website Pages';
    document.querySelectorAll('.page-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.page === slug));
    document.querySelector('.admin-breadcrumb strong').textContent = pageMeta[slug].label;
    document.querySelector('#page-editor-title').textContent = pageMeta[slug].label;
    document.querySelector('#page-editor-view .admin-subtitle').textContent = `Manage the ${pageMeta[slug].label} content. Draft changes stay private until you publish.`;
    document.querySelector('.admin-notice strong').textContent = `${pageMeta[slug].label} editor`;
    document.querySelector('.admin-notice p').lastChild.textContent = ` — Edit the actual sections, images and content on this public page. Changes stay private until you publish.`;
    $('#preview-frame').src = previewUrl(slug);
    showToast(`Loading ${pageMeta[slug].label} editor…`);
    try { await loadRemoteState(); showToast(`${pageMeta[slug].label} editor loaded.`); } catch (error) { showToast(`Could not load this page: ${error.message}`); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (trigger) trigger.blur();
  }

  function updateDashboardMetrics() {
    const pageCount = Object.keys(pageMeta).length;
    const mediaCount = $('#dashboard-media-count');
    const draftCount = $('#dashboard-draft-count');
    const referencePageCount = $('#dashboard-ref-page-count');
    const referenceMediaCount = $('#dashboard-ref-media-count');
    if (referencePageCount) referencePageCount.textContent = String(pageCount);
    if (referenceMediaCount) referenceMediaCount.textContent = String(state.media.length);
    if (mediaCount) mediaCount.textContent = String(state.media.length);
    if (draftCount) {
      const records = activePage === 'home' ? state.draftRecords : (genericState()?.draftRecords || {});
      draftCount.textContent = String(Object.keys(records || {}).length);
    }
  }
  function showDashboard() {
    if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
    isDashboard = true;
    document.body.classList.add('dashboard-mode');
    setMobileMenuOpen(false);
    resetTransientModals();
    $('#dashboard-view').hidden = true;
    $('#dashboard-reference-view').hidden = false;
    $('#page-editor-view').hidden = true;
    document.querySelectorAll('.admin-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.action === 'dashboard'));
    document.querySelectorAll('.page-nav-item').forEach((item) => item.classList.remove('active'));
    document.querySelector('.admin-breadcrumb span').textContent = 'Pages';
    document.querySelector('.admin-breadcrumb strong').textContent = 'Home';
    updateDashboardMetrics();
  }
  function showPageEditor() {
    isDashboard = false;
    document.body.classList.remove('dashboard-mode');
    setMobileMenuOpen(false);
    $('#dashboard-view').hidden = true;
    $('#dashboard-reference-view').hidden = true;
    $('#page-editor-view').hidden = false;
    document.querySelectorAll('.admin-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.action === 'toggle-pages'));
    document.querySelectorAll('.page-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.page === activePage));
    document.querySelector('.admin-breadcrumb span').textContent = 'Website Pages';
    document.querySelector('.admin-breadcrumb strong').textContent = pageMeta[activePage].label;
  }

  function applyRemotePage(data) {
    if (data.draft) state.draftRecords = data.draft;
    if (data.published) state.publishedRecords = data.published;
    const draftSource = state.draftRecords?.[language]?.content || state.draftRecords?.en?.content || state.draftRecords?.sw?.content;
    const publishedSource = state.publishedRecords?.[language]?.content || state.publishedRecords?.en?.content || state.publishedRecords?.sw?.content;
    // A server record is authoritative. Clone it directly so an older static
    // fallback cannot win while the editor is hydrating a saved draft.
    state.draft = draftSource ? clone(draftSource) : clone(publishedSource || baseContent);
    state.published = publishedSource ? clone(publishedSource) : clone(baseContent);
    if (!Array.isArray(state.draft.blocks)) state.draft.blocks = [];
    if (!Array.isArray(state.published.blocks)) state.published.blocks = [];
    state.revisions = (data.revisions || []).map((revision) => ({ id: revision.id, createdAt: revision.created_at, version: revision.version, language: revision.language }));
  }

  function genericDefaultsFromHtml(html) {
    const documentCopy = new DOMParser().parseFromString(html, 'text/html');
    const registry = window.EcoPowerCmsFields;
    registry?.install(activePage, documentCopy);
    const pageSections = [...documentCopy.querySelectorAll('main > section, footer')];
    const sectionDetails = (element, fallbackGroup = 'content') => {
      const section = element.closest('section, footer');
      const index = Math.max(0, pageSections.indexOf(section));
      const heading = section?.querySelector('h1, h2, h3')?.textContent.trim();
      return { group: section?.id || fallbackGroup || `section-${index + 1}`, groupLabel: heading || (section?.tagName === 'FOOTER' ? 'Footer' : `Section ${index + 1}`) };
    };
    const definitions = registry?.get(activePage) || [];
    const elements = definitions.map((definition) => {
      const element = documentCopy.querySelector(definition.selector);
      if (!element) return null;
      const collection = definition.kind === 'image' ? documentCopy.querySelectorAll(genericImageSelector) : documentCopy.querySelectorAll(genericTextSelector);
      const legacyIndex = [...collection].indexOf(element);
      const details = sectionDetails(element, definition.group);
      return {
        field_id: definition.id,
        kind: definition.kind,
        selector: definition.kind === 'image' ? genericImageSelector : genericTextSelector,
        index: legacyIndex,
        tag: element.tagName.toLowerCase(),
        label: definition.label,
        ...details,
        value: definition.kind === 'image' ? element.getAttribute('src') || '' : element.textContent.trim(),
        href: element.tagName.toLowerCase() === 'a' ? element.getAttribute('href') || '' : undefined,
        alt: definition.kind === 'image' ? element.getAttribute('alt') || '' : undefined,
        position: definition.kind === 'image' ? 'center' : undefined
      };
    }).filter(Boolean);
    return { elements, blocks: [], sectionOrder: [], hiddenSections: [] };
  }

  function applyProductsLegacyElements(catalog, elements, code) {
    const setCopy = (path, value) => {
      if (value === undefined || value === null) return;
      setAt(catalog, `${path}.${code}`, getAt(catalog, `${path}.${code}`) || {});
      setAt(catalog, `${path}.${code}`, value);
    };
    const setValue = (path, value) => { if (value !== undefined && value !== null) setAt(catalog, path, value); };
    (elements || []).forEach((element) => {
      const id = String(element?.field_id || '');
      if (!id.startsWith('products.')) return;
      const value = element.value;
      if (id === `products.hero.eyebrow`) setValue(`hero.${code}.eyebrow`, value);
      else if (id === `products.hero.title`) { setValue(`hero.${code}.title`, value); setValue(`hero.${code}.emphasis`, ''); }
      else if (id === `products.hero.description`) setValue(`hero.${code}.description`, value);
      else if (id === `products.hero.image`) { setValue('hero.image', value); setValue(`hero.${code}.alt`, element.alt || ''); }
      else if (id === `products.makange.eyebrow`) setValue(`makange.${code}.eyebrow`, value);
      else if (id === `products.makange.title`) setValue(`makange.${code}.title`, value);
      else if (id === `products.makange.description`) setValue(`makange.${code}.description`, value);
      else if (id === `products.makange.image`) { setValue('makange.image', value); setValue(`makange.${code}.alt`, element.alt || ''); }
      else if (id === `products.makange.order`) { setValue(`makange.${code}.button`, value); }
      else if (id === `products.lighting.eyebrow`) setValue(`lighting.${code}.eyebrow`, value);
      else if (id === `products.lighting.title`) setValue(`lighting.${code}.title`, value);
      else if (id === `products.lighting.description`) setValue(`lighting.${code}.description`, value);
      else {
        let match = id.match(/^products\.lighting\.(image|title|description)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const key = match[1] === 'image' ? 'image' : match[1] === 'title' ? 'title' : 'description';
          setValue(`lighting.items.${index}.${match[1] === 'image' ? 'image' : `${code}.${key}`}`, value);
          if (match[1] === 'image') setValue(`lighting.items.${index}.${code}.alt`, element.alt || '');
          return;
        }
        match = id.match(/^products\.stoves\.(image|kicker|name|description|price|order)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const key = { image: 'image', kicker: 'kicker', name: 'name', description: 'description', price: 'price', order: 'button' }[match[1]];
          setValue(`stoves.items.${index}.${match[1] === 'image' ? 'image' : `${code}.${key}`}`, value);
          if (match[1] === 'image') setValue(`stoves.items.${index}.${code}.alt`, element.alt || '');
          return;
        }
        if (id === 'products.bundle.title') setValue(`bundle.items.0.${code}.title`, value);
        else if (id === 'products.bundle.description') setValue(`bundle.items.0.${code}.description`, value);
        else if (id === 'products.bundle.total') setValue(`bundle.items.0.${code}.price`, value);
        else if (id === 'products.bundle.order') setValue(`bundle.items.0.${code}.button`, value);
        else if (id === 'products.cta.title') setValue(`cta.${code}.title`, value);
        else if (id === 'products.cta.description') setValue(`cta.${code}.description`, value);
        else if (id === 'products.cta.button') setValue(`cta.${code}.button`, value);
      }
    });
    return catalog;
  }

  function migrateProductsBlocks(catalog, blocks, code) {
    const migratedIds = new Set();
    (blocks || []).filter((block) => ['product', 'stove'].includes(block?.type)).forEach((block) => {
      const target = block.type === 'stove' ? catalog.stoves : catalog.makange;
      const collection = target.items || (target.items = []);
      if (collection.some((item) => item.id === block.id)) { migratedIds.add(block.id); return; }
      const copy = block[code] || block.en || block.sw || {};
      if (block.type === 'stove') {
        collection.push({ id: block.id || `migrated-stove-${collection.length + 1}`, image: block.image || '', position: block.position || 'center', displayOrder: collection.length + 1, visible: block.visible !== false, en: { kicker: copy.kicker || '', name: copy.title || copy.name || '', description: copy.description || '', price: block.price || copy.price || '', button: copy.buttonLabel || copy.button || 'Order on WhatsApp', link: block.link || copy.buttonLink || 'https://wa.me/255784017225', alt: copy.alt || '' }, sw: { kicker: copy.kicker || '', name: copy.title || copy.name || '', description: copy.description || '', price: block.price || copy.price || '', button: copy.buttonLabel || copy.button || 'Agiza WhatsApp', link: block.link || copy.buttonLink || 'https://wa.me/255784017225', alt: copy.alt || '' } });
      } else {
        collection.push({ id: block.id || `migrated-product-${collection.length + 1}`, image: block.image || '', position: block.position || 'center', displayOrder: collection.length + 1, visible: block.visible !== false, en: { name: copy.title || copy.name || '', packageType: copy.kicker || '', bestFor: copy.description || '', price: block.price || copy.price || '', description: '', alt: copy.alt || '' }, sw: { name: copy.title || copy.name || '', packageType: copy.kicker || '', bestFor: copy.description || '', price: block.price || copy.price || '', description: '', alt: copy.alt || '' } });
      }
      migratedIds.add(block.id);
    });
    return migratedIds;
  }

  function applyAboutLegacyElements(catalog, elements, code) {
    const setValue = (path, value) => { if (value !== undefined && value !== null) setAt(catalog, path, value); };
    const ensureItem = (collection, index) => {
      if (!Array.isArray(catalog[collection].items)) catalog[collection].items = [];
      while (catalog[collection].items.length <= index) catalog[collection].items.push({ id: `about-${collection}-${index + 1}`, image: '', position: 'center', displayOrder: index + 1, visible: true, en: {}, sw: {} });
      return catalog[collection].items[index];
    };
    (elements || []).forEach((element) => {
      const id = String(element?.field_id || '');
      if (!id.startsWith('about.')) return;
      const value = element.value;
      if (id === 'about.story.title') setValue(`story.${code}.title`, value);
      else if (id === 'about.story.subtitle') setValue(`story.${code}.subtitle`, value);
      else if (id === 'about.process.title') setValue(`process.${code}.title`, value);
      else if (id === 'about.founder.image') { setValue('founder.image', value); setValue(`founder.${code}.alt`, element.alt || ''); }
      else if (id === 'about.founder.name') setValue(`founder.${code}.name`, value);
      else if (id === 'about.founder.role') setValue(`founder.${code}.role`, value);
      else if (id === 'about.founder.description') setValue(`founder.${code}.description`, value);
      else if (id === 'about.founder.link') { setValue(`founder.${code}.link`, value); setValue(`founder.${code}.linkHref`, element.href || 'team.html'); }
      else {
        let match = id.match(/^about\.story\.(year|title|description)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('story', index);
          setValue(`story.items.${index}.${code}.${match[1]}`, value);
          return;
        }
        match = id.match(/^about\.process\.(image|title|description)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('process', index);
          if (match[1] === 'image') { setValue(`process.items.${index}.image`, value); setValue(`process.items.${index}.${code}.alt`, element.alt || ''); }
          else setValue(`process.items.${index}.${code}.${match[1]}`, match[1] === 'title' ? String(value || '').replace(/^\d+\.\s*/, '') : value);
          return;
        }
        match = id.match(/^about\.partners\.logo\.(\d+)$/);
        if (match) {
          const index = Number(match[1]) - 1;
          const item = ensureItem('partners', index);
          setValue(`partners.items.${index}.image`, value);
          setValue(`partners.items.${index}.${code}.alt`, element.alt || item?.[code]?.name || '');
        }
      }
    });
    return catalog;
  }

  function migrateAboutBlocks(catalog, blocks, code) {
    const migratedIds = new Set();
    (blocks || []).filter((block) => block?.type === 'partner').forEach((block) => {
      const collection = catalog.partners.items || (catalog.partners.items = []);
      if (collection.some((item) => item.id === block.id)) { migratedIds.add(block.id); return; }
      const copy = block[code] || block.en || block.sw || {};
      collection.push({
        id: block.id || `migrated-about-partner-${collection.length + 1}`,
        image: block.image || '', position: block.position || 'center', displayOrder: collection.length + 1, visible: block.visible !== false,
        en: { name: copy.title || copy.name || '', description: copy.description || '', link: copy.link || '', alt: copy.alt || '' },
        sw: { name: copy.title || copy.name || '', description: copy.description || '', link: copy.link || '', alt: copy.alt || '' }
      });
      migratedIds.add(block.id);
    });
    return migratedIds;
  }

  function applyTeamLegacyElements(catalog, elements, code) {
    const setValue = (path, value) => { if (value !== undefined && value !== null) setAt(catalog, path, value); };
    const ensureItem = (collection, index) => {
      if (!Array.isArray(catalog[collection].items)) catalog[collection].items = [];
      while (catalog[collection].items.length <= index) catalog[collection].items.push({ id: `team-${collection}-${index + 1}`, image: '', position: 'center', displayOrder: index + 1, visible: true, en: {}, sw: {} });
      return catalog[collection].items[index];
    };
    (elements || []).forEach((element) => {
      const id = String(element?.field_id || '');
      if (!id.startsWith('team.')) return;
      const value = element.value;
      if (id === 'team.management.title') setValue(`management.${code}.title`, value);
      else if (id === 'team.management.description') setValue(`management.${code}.description`, value);
      else if (id === 'team.board.title') setValue(`board.${code}.title`, value);
      else if (id === 'team.board.description') setValue(`board.${code}.description`, value);
      else {
        let match = id.match(/^team\.(management|board)\.(image|name|role|bio)\.(\d+)$/);
        if (!match) return;
        const collection = match[1];
        const index = Number(match[3]) - 1;
        const item = ensureItem(collection, index);
        if (match[2] === 'image') { setValue(`${collection}.items.${index}.image`, value); setValue(`${collection}.items.${index}.${code}.alt`, element.alt || item?.[code]?.name || ''); }
        else setValue(`${collection}.items.${index}.${code}.${match[2] === 'bio' ? 'description' : match[2]}`, value);
      }
    });
    return catalog;
  }

  function applyImpactLegacyElements(catalog, elements, code) {
    const setValue = (path, value) => { if (value !== undefined && value !== null) setAt(catalog, path, value); };
    const ensureItem = (collection, index) => {
      if (!Array.isArray(catalog[collection].items)) catalog[collection].items = [];
      while (catalog[collection].items.length <= index) catalog[collection].items.push({ id: `impact-${collection}-${index + 1}`, displayOrder: index + 1, visible: true, en: {}, sw: {} });
      return catalog[collection].items[index];
    };
    (elements || []).forEach((element) => {
      const id = String(element?.field_id || '');
      if (!id.startsWith('impact.')) return;
      const value = element.value;
      if (id === 'impact.comparison.title') setValue(`comparison.${code}.title`, value);
      else if (id === 'impact.comparison.description') setValue(`comparison.${code}.description`, value);
      else if (id === 'impact.comparison.note') setValue(`comparison.${code}.note`, value);
      else if (id === 'impact.customers.title') setValue(`customers.${code}.title`, value);
      else {
        let match = id.match(/^impact\.customers\.(image|quote|description|attribution)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('customers', index);
          if (match[1] === 'image') {
            setValue(`customers.items.${index}.image`, value);
            setValue(`customers.items.${index}.${code}.alt`, element.alt || item?.[code]?.name || '');
          } else if (match[1] === 'quote') setValue(`customers.items.${index}.${code}.quoteSw`, value);
          else if (match[1] === 'description') setValue(`customers.items.${index}.${code}.quoteEn`, value);
          else {
            const attribution = String(value || '').split(',').map((part) => part.trim());
            setValue(`customers.items.${index}.${code}.name`, attribution.shift() || '');
            setValue(`customers.items.${index}.${code}.occupation`, attribution.shift() || '');
            setValue(`customers.items.${index}.${code}.location`, attribution.join(', '));
          }
          return;
        }
        match = id.match(/^impact\.comparison\.(name|unit|amount|cost)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('comparison', index);
          setValue(`comparison.items.${index}.${code}.${match[1]}`, value);
          return;
        }
        match = id.match(/^impact\.benefits\.(title|description)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('benefits', index);
          setValue(`benefits.items.${index}.${code}.${match[1]}`, value);
        }
      }
    });
    return catalog;
  }

  function applyPartnerLegacyElements(catalog, elements, code) {
    const setValue = (path, value) => { if (value !== undefined && value !== null) setAt(catalog, path, value); };
    const ensureItem = (collection, index) => {
      if (!Array.isArray(catalog[collection].items)) catalog[collection].items = [];
      while (catalog[collection].items.length <= index) catalog[collection].items.push({ id: `partner-${collection}-${index + 1}`, displayOrder: index + 1, visible: true, en: {}, sw: {} });
      return catalog[collection].items[index];
    };
    (elements || []).forEach((element) => {
      const id = String(element?.field_id || '');
      if (!id.startsWith('partners.')) return;
      const value = element.value;
      if (id === 'partners.wakala.eyebrow') setValue(`wakala.${code}.eyebrow`, value);
      else if (id === 'partners.wakala.title') setValue(`wakala.${code}.title`, value);
      else if (id === 'partners.wakala.description') setValue(`wakala.${code}.description`, value);
      else if (id === 'partners.wakala.image') { setValue('wakala.image', value); setValue(`wakala.${code}.alt`, element.alt || ''); }
      else if (id === 'partners.wakala.button') { setValue(`wakala.${code}.button`, value); setValue(`wakala.${code}.buttonLink`, element.href || 'https://wa.me/255784017225'); }
      else if (id === 'partners.business.eyebrow') setValue(`business.${code}.eyebrow`, value);
      else if (id === 'partners.business.title') setValue(`business.${code}.title`, value);
      else if (id === 'partners.business.description') setValue(`business.${code}.description`, value);
      else if (id === 'partners.business.button') { setValue(`business.${code}.button`, value); setValue(`business.${code}.buttonLink`, element.href || 'https://wa.me/255784017225'); }
      else if (id === 'partners.funders.title') setValue(`funders.${code}.title`, value);
      else if (id === 'partners.funders.description') setValue(`funders.${code}.description`, value);
      else {
        let match = id.match(/^partners\.wakala\.(name|phone)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('wakala', index);
          setValue(`wakala.items.${index}.${code}.${match[1]}`, value);
          return;
        }
        match = id.match(/^partners\.business\.service\.(\d+)$/);
        if (match) {
          const index = Number(match[1]) - 1;
          const item = ensureItem('business', index);
          setValue(`business.items.${index}.${code}.name`, value);
          return;
        }
        match = id.match(/^partners\.funders\.(image|name)\.(\d+)$/);
        if (match) {
          const index = Number(match[2]) - 1;
          const item = ensureItem('funders', index);
          if (match[1] === 'image') {
            setValue(`funders.items.${index}.image`, value);
            setValue(`funders.items.${index}.${code}.alt`, element.alt || item?.[code]?.name || '');
          } else setValue(`funders.items.${index}.${code}.name`, value);
        }
      }
    });
    return catalog;
  }

  function applyFaqLegacyElements(catalog, elements, code) {
    const setValue = (path, value) => { if (value !== undefined && value !== null) setAt(catalog, path, value); };
    const groups = ['ordering', 'paying', 'using', 'business'];
    const ensureItem = (group, index) => {
      const target = catalog[group];
      if (!Array.isArray(target.items)) target.items = [];
      while (target.items.length <= index) target.items.push({ id: `faq-${group}-${index + 1}`, displayOrder: index + 1, visible: true, isAdded: false, open: false, en: { question: '', answer: '', format: { ...textFormatDefaults } }, sw: { question: '', answer: '', format: { ...textFormatDefaults } } });
      return target.items[index];
    };
    (elements || []).forEach((element) => {
      const id = String(element?.field_id || '');
      const groupMatch = id.match(/^faq\.group\.title\.(\d+)$/);
      if (groupMatch) {
        const group = groups[Number(groupMatch[1]) - 1];
        if (group) setValue(`${group}.${code}.title`, element.value);
        return;
      }
      const itemMatch = id.match(/^faq\.(question|answer)\.(\d+)\.(\d+)$/);
      if (!itemMatch) return;
      const group = groups[Number(itemMatch[2]) - 1];
      const index = Number(itemMatch[3]) - 1;
      if (!group || index < 0) return;
      ensureItem(group, index);
      setValue(`${group}.items.${index}.${code}.${itemMatch[1]}`, element.value);
    });
    return catalog;
  }

  function normalizeGenericContent(slug, content, defaults, code = language) {
    const existing = Array.isArray(content?.elements) ? content.elements : [];
    const byId = new Map(existing.filter((element) => element?.field_id).map((element) => [element.field_id, element]));
    const byLegacy = new Map(existing.map((element) => [`${element.selector}|${element.index}|${element.kind}`, element]));
    const used = new Set();
    const elements = defaults.elements.map((definition) => {
      const saved = byId.get(definition.field_id) || byLegacy.get(`${definition.selector}|${definition.index}|${definition.kind}`) || {};
      if (saved) used.add(saved);
      return { ...definition, ...saved, field_id: definition.field_id, selector: definition.selector, index: definition.index, kind: definition.kind };
    });
    // Keep older fields that are not yet in the page registry. They remain
    // editable through the generic fallback and receive a stable legacy ID.
    existing.forEach((element) => {
      if (!element || used.has(element)) return;
      elements.push({ ...element, field_id: element.field_id || `${slug}.legacy.${element.kind}.${element.index}` });
    });
    const normalized = {
      elements,
      blocks: Array.isArray(content?.blocks) ? clone(content.blocks) : [],
      sectionOrder: Array.isArray(content?.sectionOrder) ? content.sectionOrder.slice() : [],
      hiddenSections: Array.isArray(content?.hiddenSections) ? content.hiddenSections.slice() : []
    };
    if (slug === 'products') {
      const hasCatalog = Boolean(content?.productsCatalog);
      normalized.productsCatalog = merge(productsCatalogDefaults(), content?.productsCatalog || {});
      if (!hasCatalog) applyProductsLegacyElements(normalized.productsCatalog, elements, code);
      const migratedIds = migrateProductsBlocks(normalized.productsCatalog, normalized.blocks, code);
      if (migratedIds.size) normalized.blocks = normalized.blocks.filter((block) => !migratedIds.has(block.id));
    }
    if (slug === 'about') {
      const hasCatalog = Boolean(content?.aboutCatalog);
      normalized.aboutCatalog = merge(aboutCatalogDefaults(), content?.aboutCatalog || {});
      if (!hasCatalog) applyAboutLegacyElements(normalized.aboutCatalog, elements, code);
      const migratedIds = migrateAboutBlocks(normalized.aboutCatalog, normalized.blocks, code);
      if (migratedIds.size) normalized.blocks = normalized.blocks.filter((block) => !migratedIds.has(block.id));
    }
    if (slug === 'team') {
      const hasCatalog = Boolean(content?.teamCatalog);
      normalized.teamCatalog = merge(teamCatalogDefaults(), content?.teamCatalog || {});
      if (!hasCatalog) applyTeamLegacyElements(normalized.teamCatalog, elements, code);
    }
    if (slug === 'impact') {
      const hasCatalog = Boolean(content?.impactCatalog);
      normalized.impactCatalog = merge(impactCatalogDefaults(), content?.impactCatalog || {});
      if (!hasCatalog) applyImpactLegacyElements(normalized.impactCatalog, elements, code);
    }
    if (slug === 'partners') {
      const hasCatalog = Boolean(content?.partnerCatalog);
      normalized.partnerCatalog = merge(partnerCatalogDefaults(), content?.partnerCatalog || {});
      if (!hasCatalog) applyPartnerLegacyElements(normalized.partnerCatalog, elements, code);
    }
    if (slug === 'faq') {
      const hasCatalog = Boolean(content?.faqCatalog);
      normalized.faqCatalog = merge(faqCatalogDefaults(), content?.faqCatalog || {});
      if (!hasCatalog) applyFaqLegacyElements(normalized.faqCatalog, elements, code);
    }
    return normalized;
  }

  function genericState(slug = activePage) { return genericStates[slug]; }
  function genericContent(slug = activePage) { return genericState(slug)?.draftByLanguage?.[language] || { elements: [], blocks: [] }; }
  function genericPublished(slug = activePage) { return genericState(slug)?.publishedByLanguage?.[language] || { elements: [], blocks: [] }; }

  async function applyGenericRemotePage(slug, data) {
    const html = await fetch(`/${pageMeta[slug].file}`, { cache: 'no-store' }).then((response) => response.text());
    const defaults = genericDefaultsFromHtml(html);
    const draftByLanguage = {};
    const publishedByLanguage = {};
    ['en', 'sw'].forEach((code) => {
      const draft = data.draft?.[code]?.content;
      const published = data.published?.[code]?.content;
      draftByLanguage[code] = normalizeGenericContent(slug, draft || published, defaults, code);
      publishedByLanguage[code] = normalizeGenericContent(slug, published, defaults, code);
    });
    genericStates[slug] = {
      draftByLanguage,
      publishedByLanguage,
      draftRecords: data.draft || {},
      publishedRecords: data.published || {},
      revisions: (data.revisions || []).map((revision) => ({ id: revision.id, createdAt: revision.created_at, version: revision.version, language: revision.language })),
      lastUpdated: data.draft?.[language]?.updated_at || data.published?.[language]?.updated_at || null
    };
    const firstBlock = genericContent(slug).blocks?.[0];
    activeSection = slug === 'products' ? 'hero' : slug === 'about' ? 'story' : slug === 'team' ? 'management' : slug === 'impact' ? 'customers' : slug === 'partners' ? 'wakala' : slug === 'faq' ? 'ordering' : genericContent(slug).elements[0]?.group || (firstBlock ? `block:${firstBlock.id}` : 'content');
  }

  function currentDraft() { return activePage === 'home' ? state.draft : genericContent(); }
  function currentPublished() { return activePage === 'home' ? state.published : genericPublished(); }
  function currentRevisions() { return activePage === 'home' ? state.revisions : (genericState()?.revisions || []); }

  function currentPageContent() { return currentDraft(); }
  function productsCatalog(content = currentPageContent()) {
    if (!content || activePage !== 'products') return null;
    if (!content.productsCatalog) content.productsCatalog = productsCatalogDefaults();
    return content.productsCatalog;
  }
  function aboutCatalog(content = currentPageContent()) {
    if (!content || activePage !== 'about') return null;
    if (!content.aboutCatalog) content.aboutCatalog = aboutCatalogDefaults();
    return content.aboutCatalog;
  }
  function teamCatalog(content = currentPageContent()) {
    if (!content || activePage !== 'team') return null;
    if (!content.teamCatalog) content.teamCatalog = teamCatalogDefaults();
    return content.teamCatalog;
  }
  function impactCatalog(content = currentPageContent()) {
    if (!content || activePage !== 'impact') return null;
    if (!content.impactCatalog) content.impactCatalog = impactCatalogDefaults();
    return content.impactCatalog;
  }
  function partnerCatalog(content = currentPageContent()) {
    if (!content || activePage !== 'partners') return null;
    if (!content.partnerCatalog) content.partnerCatalog = partnerCatalogDefaults();
    return content.partnerCatalog;
  }
  function faqCatalog(content = currentPageContent()) {
    if (!content || activePage !== 'faq') return null;
    if (!content.faqCatalog) content.faqCatalog = faqCatalogDefaults();
    return content.faqCatalog;
  }
  function orderedProductItems(items = []) {
    return items.map((item, index) => ({ item, sourceIndex: index })).sort((left, right) => {
      const leftOrder = Number(left.item?.displayOrder);
      const rightOrder = Number(right.item?.displayOrder);
      const safeLeft = Number.isFinite(leftOrder) && leftOrder > 0 ? leftOrder : left.sourceIndex + 1;
      const safeRight = Number.isFinite(rightOrder) && rightOrder > 0 ? rightOrder : right.sourceIndex + 1;
      return safeLeft - safeRight || left.sourceIndex - right.sourceIndex;
    });
  }
  function orderedAboutItems(items = []) {
    return items.map((item, index) => ({ item, sourceIndex: index })).sort((left, right) => {
      const leftOrder = Number(left.item?.displayOrder);
      const rightOrder = Number(right.item?.displayOrder);
      const safeLeft = Number.isFinite(leftOrder) && leftOrder > 0 ? leftOrder : left.sourceIndex + 1;
      const safeRight = Number.isFinite(rightOrder) && rightOrder > 0 ? rightOrder : right.sourceIndex + 1;
      return safeLeft - safeRight || left.sourceIndex - right.sourceIndex;
    });
  }
  function productsSectionContent(section = activeSection, content = currentPageContent()) {
    return productsCatalog(content)?.[section] || {};
  }
  function aboutSectionContent(section = activeSection, content = currentPageContent()) {
    return aboutCatalog(content)?.[section] || {};
  }
  function teamSectionContent(section = activeSection, content = currentPageContent()) {
    return teamCatalog(content)?.[section] || {};
  }
  function impactSectionContent(section = activeSection, content = currentPageContent()) {
    return impactCatalog(content)?.[section] || {};
  }
  function partnerSectionContent(section = activeSection, content = currentPageContent()) {
    return partnerCatalog(content)?.[section] || {};
  }
  function faqSectionContent(section = activeSection, content = currentPageContent()) {
    return faqCatalog(content)?.[section] || {};
  }
  function hiddenSections(content = currentPageContent()) {
    if (!content || typeof content !== 'object') return [];
    if (!Array.isArray(content.hiddenSections)) content.hiddenSections = [];
    return content.hiddenSections;
  }
  function sectionIsHidden(id, content = currentPageContent()) { return hiddenSections(content).includes(id); }
  function dynamicBlocks(content = currentPageContent()) {
    if (!content || typeof content !== 'object') return [];
    if (!Array.isArray(content.blocks)) content.blocks = [];
    return content.blocks;
  }
  function dynamicBlockForSection(section = activeSection, content = currentPageContent()) {
    if (!String(section).startsWith('block:')) return null;
    return dynamicBlocks(content).find((block) => `block:${block.id}` === section) || null;
  }
  function contentForSection(section = activeSection, content = currentPageContent()) {
    if (section === '__new-content__') return addContentDraft?.block || {};
    const dynamic = dynamicBlockForSection(section, content);
    if (dynamic) return dynamic;
    if (activePage === 'products' && productsSectionIds.has(section) && section !== 'footer') return productsSectionContent(section, content);
    if (activePage === 'about' && aboutSectionIds.has(section)) return aboutSectionContent(section, content);
    if (activePage === 'team' && teamSectionIds.has(section)) return teamSectionContent(section, content);
    if (activePage === 'impact' && impactSectionIds.has(section)) return impactSectionContent(section, content);
    if (activePage === 'partners' && partnerSectionIds.has(section)) return partnerSectionContent(section, content);
    if (activePage === 'faq' && faqSectionIds.has(section)) return faqSectionContent(section, content);
    return activePage === 'home' ? state.draft[homeSectionSource(section)] : content;
  }

  function setSharedImageAt(section, path, value) {
    if (section === '__new-content__' || activePage === 'home') {
      setAt(contentForSection(section), path, value);
      return;
    }
    const pageState = genericState(activePage);
    const languages = pageState?.draftByLanguage || {};
    let updated = false;
    ['en', 'sw'].forEach((code) => {
      const content = languages[code];
      if (!content) return;
      setAt(contentForSection(section, content), path, value);
      updated = true;
    });
    if (!updated) setAt(contentForSection(section), path, value);
  }

  function addSharedCatalogItem(section, item) {
    const pageState = genericState(activePage);
    if (!pageState || activePage === 'home') return;
    const catalogFor = {
      products: productsCatalog,
      about: aboutCatalog,
      team: teamCatalog,
      impact: impactCatalog,
      partners: partnerCatalog,
      faq: faqCatalog
    }[activePage];
    if (!catalogFor) return;
    ['en', 'sw'].forEach((code) => {
      const catalog = catalogFor(pageState.draftByLanguage?.[code]);
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      const alreadyPresent = item?.id
        ? target.items.some((candidate) => candidate?.id === item.id)
        : target.items.some((candidate) => candidate === item);
      if (!alreadyPresent) target.items.push(clone(item));
    });
  }

  function blockCopyForEditor(block, code = language) {
    if (!block[code] || typeof block[code] !== 'object') block[code] = {};
    return block[code];
  }
  function sectionIsDirty(id) {
    if (String(id).startsWith('block:')) {
      const draftBlock = dynamicBlockForSection(id, currentDraft());
      const publishedBlock = dynamicBlockForSection(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftBlock)) !== JSON.stringify(normalizeMediaForCompare(publishedBlock));
    }
    if (activePage === 'products' && productsSectionIds.has(id) && id !== 'footer') {
      const draftSection = productsSectionContent(id, currentDraft());
      const publishedSection = productsSectionContent(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftSection)) !== JSON.stringify(normalizeMediaForCompare(publishedSection));
    }
    if (activePage === 'about' && aboutSectionIds.has(id)) {
      const draftSection = aboutSectionContent(id, currentDraft());
      const publishedSection = aboutSectionContent(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftSection)) !== JSON.stringify(normalizeMediaForCompare(publishedSection));
    }
    if (activePage === 'team' && teamSectionIds.has(id)) {
      const draftSection = teamSectionContent(id, currentDraft());
      const publishedSection = teamSectionContent(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftSection)) !== JSON.stringify(normalizeMediaForCompare(publishedSection));
    }
    if (activePage === 'impact' && impactSectionIds.has(id)) {
      const draftSection = impactSectionContent(id, currentDraft());
      const publishedSection = impactSectionContent(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftSection)) !== JSON.stringify(normalizeMediaForCompare(publishedSection));
    }
    if (activePage === 'partners' && partnerSectionIds.has(id)) {
      const draftSection = partnerSectionContent(id, currentDraft());
      const publishedSection = partnerSectionContent(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftSection)) !== JSON.stringify(normalizeMediaForCompare(publishedSection));
    }
    if (activePage === 'faq' && faqSectionIds.has(id)) {
      const draftSection = faqSectionContent(id, currentDraft());
      const publishedSection = faqSectionContent(id, currentPublished());
      return JSON.stringify(normalizeMediaForCompare(draftSection)) !== JSON.stringify(normalizeMediaForCompare(publishedSection));
    }
    if (activePage === 'faq') return pageIsDirty();
    const source = homeSectionSource(id);
    return JSON.stringify(normalizeMediaForCompare(state.draft[source])) !== JSON.stringify(normalizeMediaForCompare(state.published[source]));
  }

  function pageIsDirty() { return JSON.stringify(normalizeMediaForCompare(currentDraft())) !== JSON.stringify(normalizeMediaForCompare(currentPublished())); }

  function syncModalScrollLock() {
    const modalOpen = Boolean(document.querySelector('.admin-drawer.open, .admin-modal:not([hidden])'));
    document.body.classList.toggle('modal-open', modalOpen);
  }

  // Modals are transient UI state. Always start the dashboard with them closed,
  // including when the browser restores a cached page after back/forward navigation.
  function resetTransientModals() {
    ['#media-backdrop', '#media-modal', '#add-content-backdrop', '#add-content-modal', '#revision-backdrop', '#revision-modal', '#messages-backdrop', '#messages-modal', '#settings-backdrop', '#settings-modal'].forEach((selector) => {
      const element = $(selector);
      if (element) element.hidden = true;
    });
    const drawer = $('#editor-drawer');
    if (drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
    }
    const drawerBackdrop = $('#drawer-backdrop');
    if (drawerBackdrop) drawerBackdrop.hidden = true;
    mediaTarget = null;
    mediaFocusReturn = null;
    mediaBusy = false;
    addContentDraft = null;
    addContentInitialSnapshot = null;
    addContentModalSuspended = false;
    editorSession = null;
    document.body.classList.remove('modal-open', 'media-picker-open');
  }

  function ensureInlineEditorPanel() {
    const drawer = $('#editor-drawer');
    const workspace = document.querySelector('.admin-workspace');
    if (drawer && workspace && drawer.parentElement !== workspace) workspace.appendChild(drawer);
  }

  function openEditorPanel() {
    const drawer = $('#editor-drawer');
    if (!drawer) return;
    drawer.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    drawer.classList.add('open');
    $('#drawer-backdrop').hidden = true;
    syncDrawerSaveStatus();
    syncModalScrollLock();
  }

  resetTransientModals();
  ensureInlineEditorPanel();
  window.addEventListener('pageshow', resetTransientModals);

  function ensureMediaModalPortal() {
    const backdrop = $('#media-backdrop');
    const modal = $('#media-modal');
    if (!backdrop || !modal || !document.body) return;
    document.body.append(backdrop);
    document.body.append(modal);
  }

  function mediaFocusableElements() {
    const modal = $('#media-modal');
    if (!modal) return [];
    return [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((element) => element.offsetParent !== null);
  }

  function focusMediaModal() {
    mediaFocusableElements()[0]?.focus();
  }

  function pendingDraftSave() {
    return Boolean(draftSavePromise) || draftChangeVersion > draftSaveRevision || $('#draft-status')?.textContent === 'Unsaved changes';
  }

  function beginEditorSession() {
    const key = `${activePage}:${language}:${activeSection}`;
    if (!editorSession || editorSession.key !== key) editorSession = { key, snapshot: clone(currentPageContent()) };
  }

  function hasUnsavedEditorChanges() {
    if (!editorSession) return false;
    return pendingDraftSave() || JSON.stringify(normalizeMediaForCompare(editorSession.snapshot)) !== JSON.stringify(normalizeMediaForCompare(currentPageContent()));
  }

  function hasUnsavedAddContent() {
    if (!addContentDraft || !addContentInitialSnapshot) return false;
    return JSON.stringify(normalizeMediaForCompare(addContentDraft.block)) !== JSON.stringify(normalizeMediaForCompare(addContentInitialSnapshot));
  }

  function hasUnsavedMediaForm() {
    if (!mediaTarget) return false;
    return Boolean($('#media-upload')?.files?.length || $('#media-url')?.value.trim() || $('#media-alt-text')?.value.trim() || $('#media-caption')?.value.trim() || $('#media-description')?.value.trim());
  }

  function confirmCloseEditor() {
    if (!hasUnsavedEditorChanges()) return true;
    return window.confirm('You have unsaved editor changes. Close this editor and keep them in the current draft?');
  }

  function confirmCloseAddContent() {
    if (!hasUnsavedAddContent()) return true;
    return window.confirm('This new item has unsaved changes. Close Add Content and discard this new item?');
  }

  async function saveDraftRemote(showMessage = true) {
    if (!currentUser || loadingRemoteState) return false;
    if (draftSavePromise) {
      const pendingRevision = draftSaveRevision;
      const pendingResult = await draftSavePromise;
      if (draftChangeVersion === pendingRevision) return pendingResult;
    }
    clearTimeout(draftSaveTimer);
    const status = $('#draft-status');
    status.textContent = 'Saving draft…';
    status.classList.remove('is-saved');
    const pageAtStart = activePage;
    const languageAtStart = language;
    const revisionAtStart = draftChangeVersion;
    const contentSnapshot = clone(currentDraft());
    draftSaveRevision = revisionAtStart;
    const operation = (async () => {
      setCmsBusy(true);
      try {
        const result = await apiRequest(`/api/pages/${pageAtStart}/draft`, { method: 'PUT', body: JSON.stringify({ content: contentSnapshot, language: languageAtStart }) });
        // Do not overwrite a newer keystroke/image choice with the response to
        // an older request. A later save below will persist the new snapshot.
        if (draftChangeVersion === revisionAtStart && activePage === pageAtStart && language === languageAtStart) {
          if (pageAtStart === 'home') {
            state.draftRecords = result.draft || state.draftRecords;
            const savedContent = state.draftRecords?.[languageAtStart]?.content;
            if (savedContent) state.draft = clone(savedContent);
          } else {
            const pageState = genericState(pageAtStart);
            if (pageState) {
              pageState.draftRecords = result.draft || pageState.draftRecords;
              pageState.draftByLanguage[languageAtStart] = pageState.draftRecords?.[languageAtStart]?.content || contentSnapshot;
            }
          }
          status.textContent = 'Draft saved successfully';
          status.classList.add('is-saved');
          updateLastUpdated(result.draft?.[languageAtStart]?.updated_at || new Date().toISOString());
          renderSectionList();
          updatePreview();
          if (showMessage) showToast('Draft saved successfully. Your changes are not yet public.');
        }
        return true;
      } catch (error) {
        status.textContent = 'Draft save failed';
        showToast(error.message);
        return false;
      } finally {
        setCmsBusy(false);
      }
    })();
    draftSavePromise = operation;
    let saved;
    try { saved = await operation; } finally { if (draftSavePromise === operation) draftSavePromise = null; }
    if (saved && draftChangeVersion !== revisionAtStart) return saveDraftRemote(showMessage);
    return saved;
  }

  function persistDraft(showMessage = true) {
    draftChangeVersion += 1;
    updatePageNavStats(activePage, currentPageContent());
    renderSectionList();
    updatePreview();
    const status = $('#draft-status');
    status.textContent = 'Unsaved changes';
    status.classList.remove('is-saved');
    clearTimeout(draftSaveTimer);
    draftSaveTimer = setTimeout(() => saveDraftRemote(showMessage), showMessage ? 0 : 650);
  }

  function field(label, path, value, options = {}) {
    const sensitive = options.confirmChange ? ` data-confirm-change="${escapeHtml(options.confirmChange)}" data-original-value="${escapeHtml(value)}"` : '';
    const control = options.textarea ? `<textarea class="field-textarea" data-path="${path}"${sensitive}>${escapeHtml(value)}</textarea>` : `<input class="field-input" data-path="${path}" type="${options.type || 'text'}" value="${escapeHtml(value)}"${sensitive} />`;
    return `<div class="field-group"><label>${label}</label>${control}${options.formatPath ? formatToolbar(options.formatPath, options.format || {}) : ''}${options.help ? `<small>${options.help}</small>` : ''}</div>`;
  }

  const textFormatDefaults = { size: 'medium', weight: 'regular', style: 'normal', color: 'ink', align: 'left', spacing: 'normal', heading: 'p', font: 'sans' };
  function formatToolbar(path, format = {}) {
    const value = { ...textFormatDefaults, ...(format || {}) };
    const select = (key, label, choices) => `<label><span>${label}</span><select aria-label="${label}" class="format-select" data-format-path="${path}" data-format-key="${key}">${choices.map((choice) => `<option value="${choice}" ${value[key] === choice ? 'selected' : ''}>${choice[0].toUpperCase()}${choice.slice(1)}</option>`).join('')}</select></label>`;
    const toggle = (key, label, selected, accessibleLabel = label) => `<label class="format-toggle" title="${accessibleLabel}"><input type="checkbox" aria-label="${accessibleLabel}" data-format-path="${path}" data-format-key="${key}" ${selected ? 'checked' : ''} /><span>${label}</span></label>`;
    return `<div class="format-toolbar" aria-label="Text formatting"><div class="format-toolbar-main">${toggle('weight', 'B', value.weight === 'bold', 'Bold')}${toggle('style', 'I', value.style === 'italic', 'Italic')}${select('align', 'Alignment', ['left', 'center', 'right'])}${select('color', 'Text color', ['ink', 'forest', 'muted', 'accent'])}</div><details class="format-advanced"><summary>Advanced formatting</summary><div class="format-toolbar-advanced">${select('font', 'Font family', ['sans', 'serif', 'display'])}${select('size', 'Font size', ['small', 'medium', 'large', 'display'])}${select('spacing', 'Letter spacing', ['tight', 'normal', 'loose'])}${select('heading', 'Additional styling', ['p', 'h2', 'h3'])}</div></details></div>`;
  }

  function formatControlValue(target) {
    if (target.type !== 'checkbox') return target.value;
    return target.dataset.formatKey === 'weight' ? (target.checked ? 'bold' : 'regular') : (target.checked ? 'italic' : 'normal');
  }

  function selectField(label, path, value, options = {}) {
    const choices = options.choices || ['center', 'top', 'bottom', 'left', 'right'];
    return `<div class="field-group"><label>${label}</label><select class="field-input" data-path="${path}">${choices.map((choice) => `<option value="${choice}" ${choice === value ? 'selected' : ''}>${choice.replace('-', ' ')}</option>`).join('')}</select>${options.help ? `<small>${options.help}</small>` : ''}</div>`;
  }

  function mediaPicker(label, path, value, options = {}) {
    const safeValue = value || '';
    const name = state.media.find((item) => item.src === safeValue)?.name || safeValue.split('/').pop() || 'No image selected';
    const section = options.section || activeSection;
    const position = options.positionPath ? getAt(contentForSection(section), options.positionPath) || 'center' : null;
    return `<div class="field-group"><label>${label}</label><div class="media-picker"><img src="${safeValue ? assetUrl(safeValue) : emptyImagePlaceholder}" alt="${safeValue ? '' : 'No image selected'}" style="object-position:${position || 'center'}" /><div class="media-picker-info"><strong>${escapeHtml(name)}</strong><small>${safeValue ? 'Click to replace or reposition' : 'Choose an image to continue'}</small><button type="button" data-action="media" data-section="${escapeHtml(section)}" data-path="${path}">Choose image</button></div></div>${options.positionPath ? selectField('Image position', options.positionPath, position, { choices: ['center', 'top', 'bottom', 'left', 'right'] }) : ''}</div>`;
  }

  function updateMediaPicker(path, src, section = null) {
    const button = [...document.querySelectorAll('[data-action="media"]')].find((item) => item.dataset.path === path && (!section || item.dataset.section === section));
    const picker = button?.closest('.media-picker');
    if (!picker) return;
    const image = picker.querySelector('img');
    const name = state.media.find((item) => item.src === src)?.name || src.split('/').pop() || 'No image selected';
    if (image) image.src = assetUrl(src);
    const label = picker.querySelector('strong');
    if (label) label.textContent = name;
  }

  function focusMediaTargetButton(section, path) {
    const button = [...document.querySelectorAll('[data-action="media"]')].find((item) => item.dataset.section === section && item.dataset.path === path);
    button?.focus();
  }

  function productsItemActions(collection, sourceIndex, orderIndex, item) {
    const lastIndex = (productsSectionContent(activeSection)?.[collection] || []).length - 1;
    return `<span class="product-item-actions"><button type="button" class="section-action" data-action="product-item-move-up" data-products-collection="${collection}" data-products-index="${sourceIndex}" ${orderIndex === 0 ? 'disabled' : ''}>↑</button><button type="button" class="section-action" data-action="product-item-move-down" data-products-collection="${collection}" data-products-index="${sourceIndex}" ${orderIndex >= lastIndex ? 'disabled' : ''}>↓</button><button type="button" class="section-action" data-action="product-item-toggle" data-products-collection="${collection}" data-products-index="${sourceIndex}">${item.visible === false ? 'Show' : 'Hide'}</button><button type="button" class="section-action" data-action="product-item-delete" data-products-collection="${collection}" data-products-index="${sourceIndex}">Delete</button></span>`;
  }

  function renderProductsMakangeItem(item, sourceIndex, orderIndex) {
    const copy = item[language] || item.en || {};
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Product ${orderIndex + 1}</strong>${productsItemActions('items', sourceIndex, orderIndex, item)}</div>${mediaPicker('Product image', `items.${sourceIndex}.image`, item.image, { section: 'makange', positionPath: `items.${sourceIndex}.position` })}<div class="field-grid">${field('Product name', `items.${sourceIndex}.${language}.name`, copy.name || '')}${field('Sack size or package type', `items.${sourceIndex}.${language}.packageType`, copy.packageType || '')}</div>${field('Best for', `items.${sourceIndex}.${language}.bestFor`, copy.bestFor || '', { textarea: true })}${field('Price in TZS or quotation', `items.${sourceIndex}.${language}.price`, copy.price || '')}${field('Additional description (optional)', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true })}<div class="field-grid">${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div></div>`;
  }

  function renderProductsStoveItem(item, sourceIndex, orderIndex) {
    const copy = item[language] || item.en || {};
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Stove ${orderIndex + 1}</strong>${productsItemActions('items', sourceIndex, orderIndex, item)}</div>${mediaPicker('Stove image', `items.${sourceIndex}.image`, item.image, { section: 'stoves', positionPath: `items.${sourceIndex}.position` })}${field('Category or intended use', `items.${sourceIndex}.${language}.kicker`, copy.kicker || '')}${field('Stove name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Description', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Price or quotation', `items.${sourceIndex}.${language}.price`, copy.price || '')}${field('WhatsApp order link', `items.${sourceIndex}.${language}.link`, copy.link || '')}</div><div class="field-grid">${field('Button label', `items.${sourceIndex}.${language}.button`, copy.button || '')}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderProductsBundleItem(item, sourceIndex, orderIndex) {
    const copy = item[language] || item.en || {};
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Bundle ${orderIndex + 1}</strong>${productsItemActions('items', sourceIndex, orderIndex, item)}</div>${mediaPicker('Bundle image', `items.${sourceIndex}.image`, item.image, { section: 'bundle', positionPath: `items.${sourceIndex}.position` })}<div class="field-grid">${field('Small heading or label', `items.${sourceIndex}.${language}.kicker`, copy.kicker || '')}${field('Bundle title', `items.${sourceIndex}.${language}.title`, copy.title || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}</div>${field('Description', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Included products', `items.${sourceIndex}.${language}.included`, copy.included || '', { textarea: true })}<div class="field-grid">${field('Total price in TZS', `items.${sourceIndex}.${language}.price`, copy.price || '')}${field('WhatsApp order link', `items.${sourceIndex}.${language}.link`, copy.link || '')}</div><div class="field-grid">${field('Button label', `items.${sourceIndex}.${language}.button`, copy.button || '')}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderProductsHero(section) {
    const copy = activeCopy(section);
    return `${mediaPicker('Hero image', 'image', section.image, { section: 'hero', positionPath: 'position' })}${field('Small introductory heading', `${language}.eyebrow`, copy.eyebrow || '')}${field('Headline', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Emphasized words', `${language}.emphasis`, copy.emphasis || '')}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Image alternative text', `${language}.alt`, copy.alt || '')}`;
  }

  function renderProductsMakange(section) {
    const copy = activeCopy(section);
    const items = orderedProductItems(section.items || []);
    return `${mediaPicker('Section product image', 'image', section.image, { section: 'makange', positionPath: 'position' })}${field('Image alternative text', `${language}.alt`, copy.alt || '')}${field('Section label', `${language}.eyebrow`, copy.eyebrow || '')}${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Introduction', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Order button label', `${language}.button`, copy.button || '')}${field('Order button link', `${language}.buttonLink`, copy.buttonLink || '')}${copy.bullets?.map((value, index) => field(`Information point ${index + 1}`, `${language}.bullets.${index}`, value, { textarea: true })).join('') || ''}<div class="subsection">Pricing table products</div>${items.map(({ item, sourceIndex }, index) => renderProductsMakangeItem(item, sourceIndex, index)).join('')}`;
  }

  function renderProductsLighting(section) {
    const copy = activeCopy(section);
    return `${field('Section label', `${language}.eyebrow`, copy.eyebrow || '')}${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${(section.items || []).map((item, index) => { const itemCopy = item[language] || item.en || {}; return `<div class="subsection">Step ${index + 1}</div><div class="repeat-card">${mediaPicker('Step image', `items.${index}.image`, item.image, { section: 'lighting', positionPath: `items.${index}.position` })}${field('Step title', `items.${index}.${language}.title`, itemCopy.title || '')}${field('Description', `items.${index}.${language}.description`, itemCopy.description || '', { textarea: true })}${field('Alternative text', `items.${index}.${language}.alt`, itemCopy.alt || '')}</div>`; }).join('')}`;
  }

  function renderProductsStoves(section) {
    const copy = activeCopy(section);
    const items = orderedProductItems(section.items || []);
    return `${field('Section label', `${language}.eyebrow`, copy.eyebrow || '')}${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="subsection">Cookstove cards</div>${items.map(({ item, sourceIndex }, index) => renderProductsStoveItem(item, sourceIndex, index)).join('')}`;
  }

  function renderProductsBundle(section) {
    const items = orderedProductItems(section.items || []);
    return `<p class="form-intro">The existing starter bundle stays in this same section. Add more bundles and they will use the same responsive bundle card layout.</p><div class="subsection">Bundle cards</div>${items.map(({ item, sourceIndex }, index) => renderProductsBundleItem(item, sourceIndex, index)).join('')}`;
  }

  function renderProductsCta(section) {
    const copy = activeCopy(section);
    return `${field('Heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button label', `${language}.button`, copy.button || '')}${field('Button link', `${language}.link`, copy.link || '')}`;
  }

  function aboutCopy(record) {
    const selected = record?.[language];
    if (selected && [selected.year, selected.title, selected.name, selected.description, selected.role, selected.alt].some((value) => String(value || '').trim())) return selected;
    return record?.en || record?.sw || selected || {};
  }

  function aboutItemActions(collection, sourceIndex, orderIndex, item) {
    const lastIndex = (aboutSectionContent(activeSection)?.items || []).length - 1;
    return `<span class="product-item-actions about-item-actions"><button type="button" class="section-action" data-action="about-item-move-up" data-about-collection="${collection}" data-about-index="${sourceIndex}" ${orderIndex === 0 ? 'disabled' : ''}>↑</button><button type="button" class="section-action" data-action="about-item-move-down" data-about-collection="${collection}" data-about-index="${sourceIndex}" ${orderIndex >= lastIndex ? 'disabled' : ''}>↓</button><button type="button" class="section-action" data-action="about-item-toggle" data-about-collection="${collection}" data-about-index="${sourceIndex}">${item.visible === false ? 'Show' : 'Hide'}</button><button type="button" class="section-action" data-action="about-item-delete" data-about-collection="${collection}" data-about-index="${sourceIndex}">Delete</button></span>`;
  }

  function renderAboutStoryItem(item, sourceIndex, orderIndex) {
    const copy = aboutCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Milestone ${orderIndex + 1}</strong>${aboutItemActions('story', sourceIndex, orderIndex, item)}</div><div class="field-grid">${field('Year', `items.${sourceIndex}.${language}.year`, copy.year || '')}${field('Milestone title', `items.${sourceIndex}.${language}.title`, copy.title || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}</div>${field('Description', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>`;
  }

  function renderAboutProcessItem(item, sourceIndex, orderIndex) {
    const copy = aboutCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Step ${orderIndex + 1}</strong>${aboutItemActions('process', sourceIndex, orderIndex, item)}</div>${mediaPicker('Step image', `items.${sourceIndex}.image`, item.image, { section: 'process', positionPath: `items.${sourceIndex}.position` })}${field('Step title', `items.${sourceIndex}.${language}.title`, copy.title || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Description', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div></div>`;
  }

  function renderAboutPartnerItem(item, sourceIndex, orderIndex) {
    const copy = aboutCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Partner ${orderIndex + 1}</strong>${aboutItemActions('partners', sourceIndex, orderIndex, item)}</div>${mediaPicker('Partner logo', `items.${sourceIndex}.image`, item.image, { section: 'partners', positionPath: `items.${sourceIndex}.position` })}<div class="field-grid">${field('Partner name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Website URL (optional)', `items.${sourceIndex}.${language}.link`, copy.link || '')}</div>${field('Description (optional)', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div></div>`;
  }

  function renderAboutStory(section) {
    const copy = activeCopy(section);
    const items = orderedAboutItems(section.items || []);
    return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Supporting description', `${language}.subtitle`, copy.subtitle || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="subsection">Timeline milestones</div>${items.map(({ item, sourceIndex }, index) => renderAboutStoryItem(item, sourceIndex, index)).join('')}`;
  }

  function renderAboutProcess(section) {
    const copy = activeCopy(section);
    const items = orderedAboutItems(section.items || []);
    return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">New steps are numbered automatically from their display order and use the existing responsive production-step card.</p>${items.map(({ item, sourceIndex }, index) => renderAboutProcessItem(item, sourceIndex, index)).join('')}`;
  }

  function renderAboutFounder(section) {
    const copy = activeCopy(section);
    return `${mediaPicker('Founder image', 'image', section.image, { section: 'founder', positionPath: 'position' })}${field('Founder name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Position', `${language}.role`, copy.role || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Meet the Team label', `${language}.link`, copy.link || '')}${field('Meet the Team URL', `${language}.linkHref`, copy.linkHref || '')}</div>${field('Image alternative text', `${language}.alt`, copy.alt || '')}`;
  }

  function renderAboutPartners(section) {
    const copy = activeCopy(section);
    const items = orderedAboutItems(section.items || []);
    return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Supporting description (optional)', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">Partner logos stay in the existing three-column grid. Descriptions and website links are stored with each logo without changing its dimensions.</p>${items.map(({ item, sourceIndex }, index) => renderAboutPartnerItem(item, sourceIndex, index)).join('')}`;
  }

  function renderAboutPageForm(open = true) {
    if (open) beginEditorSession();
    const catalog = aboutCatalog();
    const section = catalog?.[activeSection] || {};
    const meta = aboutSectionMeta.find(([id]) => id === activeSection) || aboutSectionMeta[0];
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    const forms = { story: renderAboutStory, process: renderAboutProcess, founder: renderAboutFounder, partners: renderAboutPartners };
    $('#section-form').innerHTML = forms[activeSection] ? forms[activeSection](section) : '<p class="form-intro">This page section has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function teamCopy(record) {
    const selected = record?.[language];
    if (selected && [selected.name, selected.role, selected.description, selected.alt].some((value) => String(value || '').trim())) return selected;
    return record?.en || record?.sw || selected || {};
  }

  function teamItemActions(sourceIndex, orderIndex, item) {
    const lastIndex = (teamSectionContent(activeSection)?.items || []).length - 1;
    return `<span class="product-item-actions team-item-actions"><button type="button" class="section-action" data-action="team-item-move-up" data-team-index="${sourceIndex}" ${orderIndex === 0 ? 'disabled' : ''}>↑</button><button type="button" class="section-action" data-action="team-item-move-down" data-team-index="${sourceIndex}" ${orderIndex >= lastIndex ? 'disabled' : ''}>↓</button><button type="button" class="section-action" data-action="team-item-toggle" data-team-index="${sourceIndex}">${item.visible === false ? 'Show' : 'Hide'}</button><button type="button" class="section-action" data-action="team-item-delete" data-team-index="${sourceIndex}">Delete</button></span>`;
  }

  function renderTeamMemberItem(item, sourceIndex, orderIndex) {
    const copy = teamCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Team member ${orderIndex + 1}</strong>${teamItemActions(sourceIndex, orderIndex, item)}</div>${mediaPicker('Member photo', `items.${sourceIndex}.image`, item.image, { section: activeSection, positionPath: `items.${sourceIndex}.position` })}<div class="field-grid">${field('Full name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Position', `items.${sourceIndex}.${language}.role`, copy.role || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}</div>${field('Short description (optional)', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderTeamSection(section) {
    const copy = activeCopy(section);
    const items = orderedAboutItems(section.items || []);
    return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Supporting description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">Team members use the existing portrait card grid. Reordering changes their position without changing the shared card layout.</p>${items.map(({ item, sourceIndex }, index) => renderTeamMemberItem(item, sourceIndex, index)).join('')}`;
  }

  function renderTeamPageForm(open = true) {
    if (open) beginEditorSession();
    const catalog = teamCatalog();
    const section = catalog?.[activeSection] || {};
    const meta = teamSectionMeta.find(([id]) => id === activeSection) || teamSectionMeta[0];
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    $('#section-form').innerHTML = teamSectionIds.has(activeSection) ? renderTeamSection(section) : '<p class="form-intro">This page section has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function impactCopy(record) {
    const selected = record?.[language];
    if (selected && [selected.name, selected.title, selected.description, selected.quoteSw, selected.quoteEn, selected.cost].some((value) => String(value || '').trim())) return selected;
    return record?.en || record?.sw || selected || {};
  }

  function impactItemActions(collection, sourceIndex, orderIndex, item) {
    const lastIndex = (impactSectionContent(collection)?.items || []).length - 1;
    return `<span class="product-item-actions impact-item-actions"><button type="button" class="section-action" data-action="impact-item-move-up" data-impact-collection="${escapeHtml(collection)}" data-impact-index="${sourceIndex}" ${orderIndex === 0 ? 'disabled' : ''}>â†‘</button><button type="button" class="section-action" data-action="impact-item-move-down" data-impact-collection="${escapeHtml(collection)}" data-impact-index="${sourceIndex}" ${orderIndex >= lastIndex ? 'disabled' : ''}>â†“</button><button type="button" class="section-action" data-action="impact-item-toggle" data-impact-collection="${escapeHtml(collection)}" data-impact-index="${sourceIndex}">${item.visible === false ? 'Show' : 'Hide'}</button><button type="button" class="section-action" data-action="impact-item-delete" data-impact-collection="${escapeHtml(collection)}" data-impact-index="${sourceIndex}">Delete</button></span>`;
  }

  function renderImpactCustomerItem(item, sourceIndex, orderIndex) {
    const copy = impactCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Customer testimonial ${orderIndex + 1}</strong>${impactItemActions('customers', sourceIndex, orderIndex, item)}</div>${mediaPicker('Customer photo', `items.${sourceIndex}.image`, item.image, { section: activeSection, positionPath: `items.${sourceIndex}.position` })}<div class="field-grid">${field('Customer name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Location', `items.${sourceIndex}.${language}.location`, copy.location || '')}</div>${field('Occupation or business', `items.${sourceIndex}.${language}.occupation`, copy.occupation || '')}${field('Swahili testimonial', `items.${sourceIndex}.${language}.quoteSw`, copy.quoteSw || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('English translation', `items.${sourceIndex}.${language}.quoteEn`, copy.quoteEn || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div></div>`;
  }

  function renderImpactComparisonItem(item, sourceIndex, orderIndex) {
    const copy = impactCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Fuel row ${orderIndex + 1}</strong>${impactItemActions('comparison', sourceIndex, orderIndex, item)}</div><div class="field-grid">${field('Fuel name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Fuel price and unit', `items.${sourceIndex}.${language}.unit`, copy.unit || '')}</div><div class="field-grid">${field('Amount consumed per day', `items.${sourceIndex}.${language}.amount`, copy.amount || '')}${field('Estimated cost per day', `items.${sourceIndex}.${language}.cost`, copy.cost || '')}</div>${field('Explanation (optional)', `items.${sourceIndex}.${language}.explanation`, copy.explanation || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>`;
  }

  function renderImpactBenefitItem(item, sourceIndex, orderIndex) {
    const copy = impactCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Impact statement ${orderIndex + 1}</strong>${impactItemActions('benefits', sourceIndex, orderIndex, item)}</div>${field('Impact heading', `items.${sourceIndex}.${language}.title`, copy.title || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Short description', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Supporting statistic (optional)', `items.${sourceIndex}.${language}.statistic`, copy.statistic || '')}${field('Source or evidence note (optional)', `items.${sourceIndex}.${language}.source`, copy.source || '')}</div>${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>`;
  }

  function renderImpactSection(section) {
    const copy = activeCopy(section);
    const items = orderedAboutItems(section.items || []);
    if (activeSection === 'customers') {
      return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">Customer testimonials stay in the existing two-column card grid. New records use the same circular image and quote layout.</p>${items.map(({ item, sourceIndex }, index) => renderImpactCustomerItem(item, sourceIndex, index)).join('')}`;
    }
    if (activeSection === 'comparison') {
      return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Supporting description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Savings statement', `${language}.note`, copy.note || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">Fuel entries are rendered as rows inside the existing comparison table. Costs are entered explicitly; the CMS does not invent calculations.</p>${items.map(({ item, sourceIndex }, index) => renderImpactComparisonItem(item, sourceIndex, index)).join('')}`;
    }
    return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">Impact statements stay in the existing pale-green benefit-card stack and collapse to one column on mobile.</p>${items.map(({ item, sourceIndex }, index) => renderImpactBenefitItem(item, sourceIndex, index)).join('')}`;
  }

  function renderImpactPageForm(open = true) {
    if (open) beginEditorSession();
    const catalog = impactCatalog();
    const section = catalog?.[activeSection] || {};
    const meta = impactSectionMeta.find(([id]) => id === activeSection) || impactSectionMeta[0];
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    $('#section-form').innerHTML = impactSectionIds.has(activeSection) ? renderImpactSection(section) : '<p class="form-intro">This page section has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function partnerCopy(record) {
    const selected = record?.[language];
    if (selected && [selected.name, selected.title, selected.description, selected.phone, selected.button].some((value) => String(value || '').trim())) return selected;
    return record?.en || record?.sw || selected || {};
  }

  function partnerItemActions(collection, sourceIndex, orderIndex, item) {
    const lastIndex = (partnerSectionContent(collection)?.items || []).length - 1;
    return `<span class="product-item-actions partner-item-actions"><button type="button" class="section-action" data-action="partner-item-move-up" data-partner-collection="${escapeHtml(collection)}" data-partner-index="${sourceIndex}" ${orderIndex === 0 ? 'disabled' : ''}>â†‘</button><button type="button" class="section-action" data-action="partner-item-move-down" data-partner-collection="${escapeHtml(collection)}" data-partner-index="${sourceIndex}" ${orderIndex >= lastIndex ? 'disabled' : ''}>â†“</button><button type="button" class="section-action" data-action="partner-item-toggle" data-partner-collection="${escapeHtml(collection)}" data-partner-index="${sourceIndex}">${item.visible === false ? 'Show' : 'Hide'}</button><button type="button" class="section-action" data-action="partner-item-delete" data-partner-collection="${escapeHtml(collection)}" data-partner-index="${sourceIndex}">Delete</button></span>`;
  }

  function renderPartnerWakalaItem(item, sourceIndex, orderIndex) {
    const copy = partnerCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>WAKALA shop ${orderIndex + 1}</strong>${partnerItemActions('wakala', sourceIndex, orderIndex, item)}</div><div class="field-grid">${field('Shop name or location', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Phone number', `items.${sourceIndex}.${language}.phone`, copy.phone || '', { help: 'Enter a Tanzanian phone number, for example 0712 345 678 or +255 712 345 678.' })}</div>${field('Description or address (optional)', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>`;
  }

  function renderPartnerBusinessItem(item, sourceIndex, orderIndex) {
    const copy = partnerCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Business category ${orderIndex + 1}</strong>${partnerItemActions('business', sourceIndex, orderIndex, item)}</div>${field('Business category name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Short description (optional)', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>`;
  }

  function renderPartnerFunderItem(item, sourceIndex, orderIndex) {
    const copy = partnerCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Partner ${orderIndex + 1}</strong>${partnerItemActions('funders', sourceIndex, orderIndex, item)}</div>${mediaPicker('Partner logo', `items.${sourceIndex}.image`, item.image, { section: 'funders', positionPath: `items.${sourceIndex}.position` })}<div class="field-grid">${field('Partner name', `items.${sourceIndex}.${language}.name`, copy.name || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Website URL (optional)', `items.${sourceIndex}.${language}.link`, copy.link || '')}</div>${field('Short description or partnership role', `items.${sourceIndex}.${language}.description`, copy.description || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}${field('Alternative text', `items.${sourceIndex}.${language}.alt`, copy.alt || '')}</div></div>`;
  }

  function renderPartnerSection(section) {
    const copy = activeCopy(section);
    const items = orderedAboutItems(section.items || []);
    if (activeSection === 'wakala') {
      return `${field('Section label', `${language}.eyebrow`, copy.eyebrow || '')}${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${mediaPicker('Agent panel image', 'image', section.image, { section: 'wakala', positionPath: 'position' })}${field('Image alternative text', `${language}.alt`, copy.alt || '')}${field('Shop list label', `${language}.label`, copy.label || '')}${field('Follow-up description', `${language}.followup`, copy.followup || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('WhatsApp button label', `${language}.button`, copy.button || '')}${field('WhatsApp button link', `${language}.buttonLink`, copy.buttonLink || '')}</div><p class="form-intro">WAKALA shops remain inside the existing white location boxes. Phone numbers are validated and rendered as clickable telephone links.</p>${items.map(({ item, sourceIndex }, index) => renderPartnerWakalaItem(item, sourceIndex, index)).join('')}`;
    }
    if (activeSection === 'business') {
      return `${field('Section label', `${language}.eyebrow`, copy.eyebrow || '')}${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Quotation button label', `${language}.button`, copy.button || '')}${field('Quotation button link', `${language}.buttonLink`, copy.buttonLink || '')}</div><p class="form-intro">Business categories stay inside the existing stacked list on the right side of the monthly-orders panel.</p>${items.map(({ item, sourceIndex }, index) => renderPartnerBusinessItem(item, sourceIndex, index)).join('')}`;
    }
    return `${field('Section heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<p class="form-intro">Partner logos stay inside the existing four-column grid and use contain-style image positioning.</p>${items.map(({ item, sourceIndex }, index) => renderPartnerFunderItem(item, sourceIndex, index)).join('')}`;
  }

  function renderPartnersPageForm(open = true) {
    if (open) beginEditorSession();
    const catalog = partnerCatalog();
    const section = catalog?.[activeSection] || {};
    const meta = partnerSectionMeta.find(([id]) => id === activeSection) || partnerSectionMeta[0];
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    $('#section-form').innerHTML = partnerSectionIds.has(activeSection) ? renderPartnerSection(section) : '<p class="form-intro">This page section has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function faqCopy(record) {
    return record?.[language] || {};
  }

  function faqTranslationWarning(record) {
    const copy = faqCopy(record);
    const otherLanguage = language === 'sw' ? 'en' : 'sw';
    const other = record?.[otherLanguage] || {};
    if (!String(copy.question || '').trim() || !String(copy.answer || '').trim()) return `<span class="translation-warning">Missing ${language === 'sw' ? 'Kiswahili' : 'English'} translation</span>`;
    if (!String(other.question || '').trim() || !String(other.answer || '').trim()) return `<span class="translation-warning">Missing ${otherLanguage === 'sw' ? 'Kiswahili' : 'English'} translation</span>`;
    return '';
  }

  function faqItemActions(collection, sourceIndex, orderIndex, item) {
    const lastIndex = (faqSectionContent(collection)?.items || []).length - 1;
    const deleteButton = item.isAdded === true ? `<button type="button" class="section-action" data-action="faq-item-delete" data-faq-collection="${escapeHtml(collection)}" data-faq-index="${sourceIndex}">Delete</button>` : '';
    return `<span class="product-item-actions faq-item-actions"><button type="button" class="section-action" data-action="faq-item-edit" data-faq-collection="${escapeHtml(collection)}" data-faq-index="${sourceIndex}">Edit</button><button type="button" class="section-action" data-action="faq-item-move-up" data-faq-collection="${escapeHtml(collection)}" data-faq-index="${sourceIndex}" ${orderIndex === 0 ? 'disabled' : ''}>↑</button><button type="button" class="section-action" data-action="faq-item-move-down" data-faq-collection="${escapeHtml(collection)}" data-faq-index="${sourceIndex}" ${orderIndex >= lastIndex ? 'disabled' : ''}>↓</button><button type="button" class="section-action" data-action="faq-item-toggle" data-faq-collection="${escapeHtml(collection)}" data-faq-index="${sourceIndex}">${item.visible === false ? 'Show' : 'Hide'}</button>${deleteButton}</span>`;
  }

  function renderFaqQuestionItem(item, sourceIndex, orderIndex, collection) {
    const copy = faqCopy(item);
    return `<div class="repeat-card product-catalog-item ${item.visible === false ? 'is-hidden' : ''}"><div class="repeat-card-header"><strong>Question ${orderIndex + 1}</strong>${faqTranslationWarning(item)}${faqItemActions(collection, sourceIndex, orderIndex, item)}</div>${field('Question', `items.${sourceIndex}.${language}.question`, copy.question || '', { formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}${field('Answer', `items.${sourceIndex}.${language}.answer`, copy.answer || '', { textarea: true, formatPath: `items.${sourceIndex}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Answer link text (optional)', `items.${sourceIndex}.${language}.answerLinkText`, copy.answerLinkText || '')}${field('Answer link URL (optional)', `items.${sourceIndex}.${language}.answerLinkUrl`, copy.answerLinkUrl || '')}</div>${field('Display order', `items.${sourceIndex}.displayOrder`, item.displayOrder || orderIndex + 1, { type: 'number' })}</div>`;
  }

  function renderFaqSection(section) {
    const copy = faqCopy(section);
    const items = orderedAboutItems(section.items || []);
    const translationNote = `<p class="form-intro">Questions marked with a missing-language warning are intentionally incomplete until that translation is entered. Questions remain inside the existing accordion list; new questions open closed by default and are never rendered as standalone content blocks.</p>`;
    return `${field('Category heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${translationNote}${items.map(({ item, sourceIndex }, index) => renderFaqQuestionItem(item, sourceIndex, index, activeSection)).join('')}`;
  }

  function renderFaqPageForm(open = true) {
    if (!faqSectionIds.has(activeSection)) return renderGenericForm(open);
    if (open) beginEditorSession();
    const catalog = faqCatalog();
    const section = catalog?.[activeSection] || {};
    const meta = faqSectionMeta.find(([id]) => id === activeSection) || faqSectionMeta[0];
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    $('#section-form').innerHTML = faqSectionIds.has(activeSection) ? renderFaqSection(section) : '<p class="form-intro">This page section has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function renderProductsPageForm(open = true) {
    if (activeSection === 'footer') return renderGenericForm(open);
    if (open) beginEditorSession();
    const catalog = productsCatalog();
    const section = catalog?.[activeSection] || {};
    const meta = productsSectionMeta.find(([id]) => id === activeSection) || productsSectionMeta[0];
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    const forms = { hero: renderProductsHero, makange: renderProductsMakange, lighting: renderProductsLighting, stoves: renderProductsStoves, bundle: renderProductsBundle, cta: renderProductsCta };
    $('#section-form').innerHTML = forms[activeSection] ? forms[activeSection](section) : '<p class="form-intro">This page section has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function renderHero(section) {
    const copy = activeCopy(section);
    return `<p class="form-intro">Edit the most important content on the public homepage.</p>${mediaPicker('Hero image', 'image', section.image, { positionPath: 'imagePosition' })}${field('Small introductory heading', `${language}.eyebrow`, copy.eyebrow)}${field('Main headline', `${language}.title`, copy.title, { formatPath: `${language}.format`, format: copy.format })}${field('Italic / emphasized words', `${language}.emphasis`, copy.emphasis, { help: 'Displayed using the approved italic headline style.' })}${field('Supporting description', `${language}.description`, copy.description, { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="subsection">Buttons and contact line</div>${field('Primary button text', `${language}.primaryLabel`, copy.primaryLabel)}${field('Primary button link', 'primaryLink', section.primaryLink)}${field('Secondary button text', `${language}.secondaryLabel`, copy.secondaryLabel)}${field('Secondary button link', 'secondaryLink', section.secondaryLink)}${field('Contact label', `${language}.captionContact`, copy.captionContact)}${field('Payment caption', `${language}.caption`, copy.caption)}${field('Image alternative text', `${language}.alt`, copy.alt)}`;
  }

  function renderTrust(section) {
    return `<p class="form-intro">Manage the four benefits shown directly after the hero.</p>${section.items.map((item, index) => `<div class="repeat-card"><div class="repeat-card-header"><strong>Benefit ${index + 1}</strong><span>${item.icon} icon</span></div>${field('Title', `items.${index}.${language}.title`, item[language].title, { formatPath: `items.${index}.${language}.format`, format: item[language].format })}${field('Short description', `items.${index}.${language}.description`, item[language].description, { textarea: true, formatPath: `items.${index}.${language}.format`, format: item[language].format })}</div>`).join('')}`;
  }

  function renderProducts(section) {
    const copy = activeCopy(section);
    return `${field('Section label', `${language}.eyebrow`, copy.eyebrow)}${field('Section heading', `${language}.heading`, copy.heading, { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description, { textarea: true, formatPath: `${language}.format`, format: copy.format })}${section.items.map((item, index) => `<div class="subsection">Product ${index + 1}</div><div class="repeat-card">${mediaPicker('Product photograph', `items.${index}.image`, item.image, { positionPath: `items.${index}.imagePosition` })}${field('Product name', `items.${index}.${language}.name`, item[language].name, { formatPath: `items.${index}.${language}.format`, format: item[language].format })}${field('Description', `items.${index}.${language}.description`, item[language].description, { textarea: true, formatPath: `items.${index}.${language}.format`, format: item[language].format })}<div class="field-grid">${field('Price', `items.${index}.price`, item.price)}${field('Order link', `items.${index}.link`, item.link)}</div>${field('Button text', `items.${index}.${language}.button`, item[language].button)}${field('Alternative text', `items.${index}.${language}.alt`, item[language].alt)}</div>`).join('')}<div class="subsection">Business order card</div>${field('Label', `${language}.businessLabel`, copy.businessLabel)}${field('Heading', `${language}.businessHeading`, copy.businessHeading, { formatPath: `${language}.businessFormat`, format: copy.businessFormat })}${field('Description', `${language}.businessDescription`, copy.businessDescription, { textarea: true, formatPath: `${language}.businessFormat`, format: copy.businessFormat })}${field('Button text', `${language}.businessButton`, copy.businessButton)}${copy.list.map((item, index) => field(`List item ${index + 1}`, `${language}.list.${index}`, item)).join('')}`;
  }

  function renderOrdering(section) {
    const copy = activeCopy(section);
    return `${field('Section heading', `${language}.heading`, copy.heading, { formatPath: `${language}.format`, format: copy.format })}${copy.steps.map((step, index) => `<div class="subsection">Step ${index + 1}</div>${field('Step title', `${language}.steps.${index}.title`, step.title, { formatPath: `${language}.steps.${index}.format`, format: step.format })}${field('Description', `${language}.steps.${index}.description`, step.description, { textarea: true, formatPath: `${language}.steps.${index}.format`, format: step.format })}`).join('')}`;
  }

  function renderPayment(section) {
    const copy = activeCopy(section);
    return `<p class="form-intro">Payment account numbers are protected. Changing either number requires confirmation and is recorded in the audit log.</p>${field('Payment section label', `${language}.paymentEyebrow`, copy.paymentEyebrow)}${field('Payment heading', `${language}.paymentTitle`, copy.paymentTitle, { formatPath: `${language}.paymentFormat`, format: copy.paymentFormat })}${field('Instructions', `${language}.paymentDescription`, copy.paymentDescription, { textarea: true, formatPath: `${language}.paymentFormat`, format: copy.paymentFormat })}<div class="field-grid">${field('M-Pesa label', `${language}.mpesaLabel`, copy.mpesaLabel)}${field('M-Pesa number', `${language}.mpesaNumber`, copy.mpesaNumber, { confirmChange: 'Confirm changing the M-Pesa Lipa Namba? This will be recorded and can affect customer payments.' })}${field('CRDB label', `${language}.crdbLabel`, copy.crdbLabel)}${field('CRDB number', `${language}.crdbNumber`, copy.crdbNumber, { confirmChange: 'Confirm changing the CRDB Lipa Namba? This will be recorded and can affect customer payments.' })}</div>${field('M-Pesa note', `${language}.mpesaNote`, copy.mpesaNote)}${field('CRDB note', `${language}.crdbNote`, copy.crdbNote)}<div class="subsection">Payment images</div>${mediaPicker('M-Pesa QR code', 'paymentQr.0.image', state.draft.images?.paymentQr?.[0]?.image || '', { section: 'images' })}${mediaPicker('CRDB QR code', 'paymentQr.1.image', state.draft.images?.paymentQr?.[1]?.image || '', { section: 'images' })}`;
  }

  function renderFactory(section) {
    const copy = activeCopy(section);
    return `${mediaPicker('Factory photograph', 'image', section.image, { positionPath: 'imagePosition' })}${field('Section label', `${language}.eyebrow`, copy.eyebrow)}${field('Heading', `${language}.title`, copy.title, { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description, { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button text', `${language}.button`, copy.button)}${field('Image alternative text', `${language}.alt`, copy.alt)}`;
  }

  function renderKitchen(section) {
    const copy = activeCopy(section);
    return `${mediaPicker('Kitchen photograph', 'image', section.image, { positionPath: 'imagePosition' })}${field('Section label', `${language}.eyebrow`, copy.eyebrow)}${field('Heading', `${language}.title`, copy.title, { formatPath: `${language}.format`, format: copy.format })}${copy.categories.map((item, index) => field(`Category ${index + 1}`, `${language}.categories.${index}`, item)).join('')}`;
  }

  function renderTestimonial(section) {
    const copy = activeCopy(section);
    return `${field('Customer quote', `${language}.quote`, copy.quote, { textarea: true, formatPath: `${language}.testimonialFormat`, format: copy.testimonialFormat })}${field('English explanation', `${language}.translation`, copy.translation, { textarea: true, formatPath: `${language}.testimonialFormat`, format: copy.testimonialFormat })}${field('Attribution', `${language}.attribution`, copy.attribution)}`;
  }

  function renderCookstoves(section) {
    const copy = activeCopy(section);
    return `${field('Section heading', `${language}.title`, copy.title, { formatPath: `${language}.format`, format: copy.format })}${field('Supporting description', `${language}.description`, copy.description, { textarea: true, formatPath: `${language}.format`, format: copy.format })}${section.items.map((item, index) => `<div class="subsection">Stove ${index + 1}</div><div class="repeat-card">${mediaPicker('Stove photograph', `items.${index}.image`, item.image, { positionPath: `items.${index}.imagePosition` })}${field('Category label', `items.${index}.${language}.kicker`, item[language].kicker)}${field('Stove name', `items.${index}.${language}.name`, item[language].name, { formatPath: `items.${index}.${language}.format`, format: item[language].format })}${field('Description', `items.${index}.${language}.description`, item[language].description, { textarea: true, formatPath: `items.${index}.${language}.format`, format: item[language].format })}<div class="field-grid">${field('Price', `items.${index}.${language}.price`, item[language].price)}${field('Button text', `items.${index}.${language}.button`, item[language].button)}</div>${field('Alternative text', `items.${index}.${language}.alt`, item[language].alt)}</div>`).join('')}`;
  }

  function renderImpact(section) {
    const copy = activeCopy(section);
    return `${field('Section heading', `${language}.title`, copy.title, { formatPath: `${language}.format`, format: copy.format })}${section.stats.map((stat, index) => `<div class="repeat-card"><div class="repeat-card-header"><strong>Statistic ${index + 1}</strong><span>Structured value</span></div>${field('Numerical value', `stats.${index}.value`, stat.value)}${field('Description', `stats.${index}.${language}`, stat[language], { textarea: true, formatPath: `stats.${index}.${language}Format`, format: stat[`${language}Format`] })}</div>`).join('')}${field('Source / qualification note', `${language}.note`, copy.note, { help: 'Keep verified results separate from estimates or projections.', formatPath: `${language}.format`, format: copy.format })}`;
  }

  function renderPartners(section) {
    const copy = activeCopy(section);
    return `${field('Heading', `${language}.title`, copy.title, { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description, { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button text', `${language}.button`, copy.button)}${field('Button link', 'link', section.link)}<p class="form-intro">Partner logos can be replaced from the image controls below.</p>`;
  }

  function renderImageRecord(label, path, record) {
    const copy = record[language] || record.en || {};
    return `<div class="repeat-card"><div class="repeat-card-header"><strong>${label}</strong><span>Public image</span></div>${mediaPicker('Image', `${path}.image`, record.image, { positionPath: `${path}.position` })}${field('Alternative text', `${path}.${language}.alt`, copy.alt || '')}${field('Caption', `${path}.${language}.caption`, copy.caption || '')}</div>`;
  }

  function renderImages(section) {
    return `<p class="form-intro">Every public Home image is controlled here. Upload a replacement, choose its focal position, save the draft, then publish when it is ready.</p>${renderImageRecord('Brand mark', 'brand', section.brand)}<div class="subsection">Payment QR codes</div>${section.paymentQr.map((item, index) => renderImageRecord(`Payment QR ${index + 1}`, `paymentQr.${index}`, item)).join('')}<div class="subsection">Factory gallery</div>${section.factoryGallery.map((item, index) => renderImageRecord(`Factory image ${index + 1}`, `factoryGallery.${index}`, item)).join('')}<div class="subsection">Kitchen gallery</div>${section.kitchenGallery.map((item, index) => renderImageRecord(`Kitchen image ${index + 1}`, `kitchenGallery.${index}`, item)).join('')}<div class="subsection">Partner logos</div>${section.partnerLogos.map((item, index) => renderImageRecord(`Partner logo ${index + 1}`, `partnerLogos.${index}`, item)).join('')}`;
  }

  function renderFooter(section) {
    const copy = activeCopy(section);
    return `${field('Brand name', `${language}.brand`, copy.brand, { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description, { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Contact heading', `${language}.contactHeading`, copy.contactHeading)}${field('Phone line', `${language}.phone`, copy.phone)}${field('Email', `${language}.email`, copy.email)}${field('Address', `${language}.address`, copy.address, { textarea: true })}${field('Payment heading', `${language}.paymentHeading`, copy.paymentHeading)}${field('M-Pesa line', `${language}.mpesa`, copy.mpesa)}${field('CRDB line', `${language}.crdb`, copy.crdb)}${field('Cash line', `${language}.cash`, copy.cash)}${field('Social heading', `${language}.socialHeading`, copy.socialHeading)}${field('Social line one', `${language}.socialOne`, copy.socialOne)}${field('Social line two', `${language}.socialTwo`, copy.socialTwo)}`;
  }

  function newBlockId(prefix = 'block') {
    const used = new Set(dynamicBlocks().map((block) => block.id));
    let id = `${prefix}-${Date.now().toString(36)}`;
    let suffix = 1;
    while (used.has(id)) id = `${prefix}-${Date.now().toString(36)}-${suffix++}`;
    return id;
  }

  function newBlockCopy(label = 'New content section') {
    return { heading: label, subheading: '', kicker: '', title: label, description: '', instruction: '', buttonLabel: '', buttonLink: '', alt: '', caption: '', quote: '', attribution: '', format: { ...textFormatDefaults } };
  }

  function newCard(id) {
    const image = state.media[0]?.src || 'EcoPower_all_extracted_images/page_01_image_002.png';
    return { id, image, position: 'center', en: { kicker: 'Product category', title: 'New card', description: '', price: 'TZS 0', buttonLabel: 'Order on WhatsApp', buttonLink: 'https://wa.me/255784017225', alt: 'EcoPower content', format: { ...textFormatDefaults } }, sw: { kicker: 'Aina ya bidhaa', title: 'Kadi mpya', description: '', price: 'TZS 0', buttonLabel: 'Agiza WhatsApp', buttonLink: 'https://wa.me/255784017225', alt: 'Maudhui ya EcoPower', format: { ...textFormatDefaults } } };
  }

  function newGalleryImage(id) {
    const image = state.media[0]?.src || 'EcoPower_all_extracted_images/page_01_image_002.png';
    return { id, image, position: 'center', en: { caption: '', alt: 'EcoPower content', format: { ...textFormatDefaults } }, sw: { caption: '', alt: 'Maudhui ya EcoPower', format: { ...textFormatDefaults } } };
  }

  function newDynamicBlock(type) {
    const block = { id: newBlockId(type), type, visible: true, en: newBlockCopy(''), sw: newBlockCopy('') };
    if (type === 'image' || type === 'imageText') { block.image = state.media[0]?.src || 'EcoPower_all_extracted_images/page_01_image_002.png'; block.position = 'center'; }
    if (type === 'imageText') block.layout = 'left';
    if (['product', 'payment'].includes(type)) { block.image = state.media[0]?.src || 'EcoPower_all_extracted_images/page_01_image_004.jpeg'; block.position = 'center'; }
    if (type === 'stove') { block.image = ''; block.position = 'center'; block.link = 'https://wa.me/255784017225'; }
    if (type === 'product') { block.price = ''; block.link = 'https://wa.me/255784017225'; }
    if (type === 'stove') block.price = '';
    if (type === 'partner' || type === 'testimonial') { block.image = state.media[0]?.src || 'EcoPower_all_extracted_images/page_01_image_002.png'; block.position = 'center'; }
    if (type === 'cards') block.cards = [newCard(`${block.id}-card-1`)];
    if (type === 'gallery') block.images = [newGalleryImage(`${block.id}-image-1`)];
    return block;
  }

  function newProductsItem(section) {
    const id = newBlockId(`${section}-item`);
    if (section === 'makange') return { id, image: '', position: 'center', displayOrder: (productsCatalog()?.makange?.items || []).length + 1, visible: true, en: { name: '', packageType: '', bestFor: '', price: '', description: '', alt: '' }, sw: { name: '', packageType: '', bestFor: '', price: '', description: '', alt: '' } };
    if (section === 'stoves') return { id, image: '', position: 'center', displayOrder: (productsCatalog()?.stoves?.items || []).length + 1, visible: true, en: { kicker: '', name: '', description: '', price: '', button: 'Order on WhatsApp', link: 'https://wa.me/255784017225', alt: '' }, sw: { kicker: '', name: '', description: '', price: '', button: 'Agiza WhatsApp', link: 'https://wa.me/255784017225', alt: '' } };
    return { id, image: '', position: 'center', displayOrder: (productsCatalog()?.bundle?.items || []).length + 1, visible: true, en: { kicker: '', title: '', description: '', included: '', price: '', button: 'Order bundle', link: 'https://wa.me/255784017225', alt: '' }, sw: { kicker: '', title: '', description: '', included: '', price: '', button: 'Agiza kifurushi', link: 'https://wa.me/255784017225', alt: '' } };
  }

  function newAboutItem(section) {
    const id = newBlockId(`about-${section}-item`);
    const displayOrder = (aboutSectionContent(section)?.items || []).length + 1;
    if (section === 'story') return { id, displayOrder, visible: true, en: { year: '', title: '', description: '', format: { ...textFormatDefaults } }, sw: { year: '', title: '', description: '', format: { ...textFormatDefaults } } };
    if (section === 'process') return { id, image: '', position: 'center', displayOrder, visible: true, en: { title: '', description: '', alt: '', format: { ...textFormatDefaults } }, sw: { title: '', description: '', alt: '', format: { ...textFormatDefaults } } };
    return { id, image: '', position: 'center', displayOrder, visible: true, en: { name: '', description: '', link: '', alt: '', format: { ...textFormatDefaults } }, sw: { name: '', description: '', link: '', alt: '', format: { ...textFormatDefaults } } };
  }

  function newTeamMember(section) {
    const id = newBlockId(`team-${section}-member`);
    const displayOrder = (teamSectionContent(section)?.items || []).length + 1;
    return { id, image: '', position: 'center', displayOrder, visible: true, en: { name: '', role: '', description: '', alt: '', format: { ...textFormatDefaults } }, sw: { name: '', role: '', description: '', alt: '', format: { ...textFormatDefaults } } };
  }

  function newImpactItem(section) {
    const id = newBlockId(`impact-${section}-item`);
    const displayOrder = (impactSectionContent(section)?.items || []).length + 1;
    if (section === 'customers') return { id, image: '', position: 'center', displayOrder, visible: true, en: { name: '', location: '', occupation: '', quoteSw: '', quoteEn: '', alt: '', format: { ...textFormatDefaults } }, sw: { name: '', location: '', occupation: '', quoteSw: '', quoteEn: '', alt: '', format: { ...textFormatDefaults } } };
    if (section === 'comparison') return { id, displayOrder, visible: true, en: { name: '', unit: '', amount: '', cost: '', explanation: '', format: { ...textFormatDefaults } }, sw: { name: '', unit: '', amount: '', cost: '', explanation: '', format: { ...textFormatDefaults } } };
    return { id, displayOrder, visible: true, en: { title: '', description: '', statistic: '', source: '', format: { ...textFormatDefaults } }, sw: { title: '', description: '', statistic: '', source: '', format: { ...textFormatDefaults } } };
  }

  function newPartnerItem(section) {
    const id = newBlockId(`partner-${section}-item`);
    const displayOrder = (partnerSectionContent(section)?.items || []).length + 1;
    if (section === 'wakala') return { id, displayOrder, visible: true, en: { name: '', phone: '', description: '', format: { ...textFormatDefaults } }, sw: { name: '', phone: '', description: '', format: { ...textFormatDefaults } } };
    if (section === 'business') return { id, displayOrder, visible: true, en: { name: '', description: '', format: { ...textFormatDefaults } }, sw: { name: '', description: '', format: { ...textFormatDefaults } } };
    return { id, image: '', position: 'center', displayOrder, visible: true, en: { name: '', description: '', link: '', alt: '', format: { ...textFormatDefaults } }, sw: { name: '', description: '', link: '', alt: '', format: { ...textFormatDefaults } } };
  }

  function newFaqQuestion(section) {
    const id = newBlockId(`faq-${section}-question`);
    const displayOrder = (faqSectionContent(section)?.items || []).length + 1;
    return { id, displayOrder, visible: true, isAdded: true, open: false, en: { question: '', answer: '', answerLinkText: '', answerLinkUrl: '', format: { ...textFormatDefaults } }, sw: { question: '', answer: '', answerLinkText: '', answerLinkUrl: '', format: { ...textFormatDefaults } } };
  }

  function dynamicToolbar(block) {
    const visibilityLabel = block.visible === false ? 'Show on public page' : 'Hide from public page';
    const index = dynamicBlocks().findIndex((item) => item.id === block.id);
    return `<div class="dynamic-block-toolbar"><span>${block.visible === false ? 'Hidden from public page' : 'Visible on public page'}</span><div><button type="button" class="section-action" data-action="move-block-up" data-block-id="${escapeHtml(block.id)}" ${index <= 0 ? 'disabled' : ''}>Move up</button><button type="button" class="section-action" data-action="move-block-down" data-block-id="${escapeHtml(block.id)}" ${index < 0 || index === dynamicBlocks().length - 1 ? 'disabled' : ''}>Move down</button><button type="button" class="section-action" data-action="toggle-block" data-block-id="${escapeHtml(block.id)}">${visibilityLabel}</button><button type="button" class="section-action" data-action="delete-block" data-block-id="${escapeHtml(block.id)}">Delete</button></div></div>`;
  }

  function renderDynamicCard(block, card, index, sectionKey = activeSection) {
    const copy = blockCopyForEditor(card);
    return `<div class="repeat-card dynamic-card-row"><div class="repeat-card-header"><strong>Card ${index + 1}</strong><span><button type="button" class="section-action" data-action="move-card-up" data-block-id="${escapeHtml(block.id)}" data-card-index="${index}" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" class="section-action" data-action="move-card-down" data-block-id="${escapeHtml(block.id)}" data-card-index="${index}" ${index === block.cards.length - 1 ? 'disabled' : ''}>↓</button><button type="button" class="section-action" data-action="remove-card" data-block-id="${escapeHtml(block.id)}" data-card-index="${index}">Remove</button></span></div>${mediaPicker('Card image', `cards.${index}.image`, card.image, { positionPath: `cards.${index}.position` })}${field('Category', `cards.${index}.${language}.kicker`, copy.kicker || '')}${field('Title', `cards.${index}.${language}.title`, copy.title || '', { formatPath: `cards.${index}.${language}.format`, format: copy.format })}${field('Description', `cards.${index}.${language}.description`, copy.description || '', { textarea: true, formatPath: `cards.${index}.${language}.format`, format: copy.format })}<div class="field-grid">${field('Price', `cards.${index}.${language}.price`, copy.price || '')}${field('Order link', `cards.${index}.${language}.buttonLink`, copy.buttonLink || '')}</div>${field('Button text', `cards.${index}.${language}.buttonLabel`, copy.buttonLabel || '')}${field('Alternative text', `cards.${index}.${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderDynamicGalleryImage(block, item, index, sectionKey = activeSection) {
    const copy = blockCopyForEditor(item);
    return `<div class="repeat-card dynamic-card-row"><div class="repeat-card-header"><strong>Gallery image ${index + 1}</strong><span><button type="button" class="section-action" data-action="move-gallery-image" data-block-id="${escapeHtml(block.id)}" data-image-index="${index}" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" class="section-action" data-action="move-gallery-image-down" data-block-id="${escapeHtml(block.id)}" data-image-index="${index}" ${index === block.images.length - 1 ? 'disabled' : ''}>↓</button><button type="button" class="section-action" data-action="remove-gallery-image" data-block-id="${escapeHtml(block.id)}" data-image-index="${index}">Remove</button></span></div>${mediaPicker('Gallery image', `images.${index}.image`, item.image, { positionPath: `images.${index}.position` })}${field('Caption', `images.${index}.${language}.caption`, copy.caption || '', { formatPath: `images.${index}.${language}.format`, format: copy.format })}${field('Alternative text', `images.${index}.${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderDynamicBlockForm(open = true) {
    if (open) beginEditorSession();
    const block = dynamicBlockForSection();
    if (!block) return;
    if (block.type === 'cards' && !Array.isArray(block.cards)) block.cards = [];
    if (block.type === 'gallery' && !Array.isArray(block.images)) block.images = [];
    const copy = blockCopyForEditor(block);
    const drawer = $('#editor-drawer');
    const labels = { text: 'Added text', image: 'Added image', imageText: 'Added image and text', cards: 'Added products', gallery: 'Added gallery', product: 'Added briquette', payment: 'Added payment content', stove: 'Added stove', partner: 'Added partner', testimonial: 'Added customer testimonial', cta: 'Added call to action' };
    $('#drawer-title').textContent = labels[block.type] || 'Added content';
    $('#drawer-description').textContent = 'Edit this item, then save the draft before publishing it.';
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    let html = dynamicToolbar(block);
    if (block.type === 'text') html += `${field('Small section label', `${language}.subheading`, copy.subheading || '')}${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'image') html += `${mediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${field('Title', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Caption', `${language}.caption`, copy.caption || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'imageText') html += `${mediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${selectField('Image alignment', 'layout', block.layout || 'left', { choices: ['left', 'right'] })}${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Alternative text', `${language}.alt`, copy.alt || '')}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'cards') html += `${field('Small section label', `${language}.subheading`, copy.subheading || '')}${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${block.cards.map((card, index) => renderDynamicCard(block, card, index)).join('')}<button type="button" class="admin-button button-outline" data-action="add-card" data-block-id="${escapeHtml(block.id)}">Add card</button>`;
    if (block.type === 'gallery') html += `${field('Small section label', `${language}.subheading`, copy.subheading || '')}${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${block.images.map((item, index) => renderDynamicGalleryImage(block, item, index)).join('')}<button type="button" class="admin-button button-outline" data-action="add-gallery-image" data-block-id="${escapeHtml(block.id)}">Add gallery image</button>`;
    if (block.type === 'product') html += `${mediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${field('Product name', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Size', `${language}.kicker`, copy.kicker || '')}${field('Price', 'price', block.price || '')}`;
    if (block.type === 'payment') html += `${mediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${field('Title', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Payment instruction (optional)', `${language}.instruction`, copy.instruction || '')}`;
    if (block.type === 'stove') html += `${mediaPicker('Stove image', 'image', block.image, { positionPath: 'position' })}${field('Stove name', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Price (optional)', 'price', block.price || '')}`;
    if (block.type === 'partner') html += `${mediaPicker('Partner logo', 'image', block.image, { positionPath: 'position' })}${field('Partner name', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Website link', `${language}.link`, copy.link || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
    if (block.type === 'testimonial') html += `${mediaPicker('Customer image', 'image', block.image, { positionPath: 'position' })}${field('Customer name', `${language}.title`, copy.title || '')}${field('Testimonial', `${language}.quote`, copy.quote || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Attribution', `${language}.attribution`, copy.attribution || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
    if (block.type === 'cta') html += `${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    $('#section-form').innerHTML = html;
    if (open) openEditorPanel();
  }

  function pendingMediaPicker(label, path, value, options = {}) {
    const previousSection = activeSection;
    activeSection = '__new-content__';
    const markup = mediaPicker(label, path, value, { ...options, section: '__new-content__' });
    activeSection = previousSection;
    return markup;
  }

  function renderPendingProductsItem(item, section) {
    const copy = item[language] || item.en || {};
    if (section === 'makange') return `${pendingMediaPicker('Product image', 'image', item.image, { positionPath: 'position' })}<div class="field-grid">${field('Product name', `${language}.name`, copy.name || '')}${field('Sack size or package type', `${language}.packageType`, copy.packageType || '')}</div>${field('Best for', `${language}.bestFor`, copy.bestFor || '', { textarea: true })}${field('Price in TZS or quotation', `${language}.price`, copy.price || '')}${field('Additional description (optional)', `${language}.description`, copy.description || '', { textarea: true })}${field('Display order', 'displayOrder', item.displayOrder || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
    if (section === 'stoves') return `${pendingMediaPicker('Stove image', 'image', item.image, { positionPath: 'position' })}${field('Category or intended use', `${language}.kicker`, copy.kicker || '')}${field('Stove name', `${language}.name`, copy.name || '')}${field('Description', `${language}.description`, copy.description || '', { textarea: true })}<div class="field-grid">${field('Price or quotation', `${language}.price`, copy.price || '')}${field('WhatsApp order link', `${language}.link`, copy.link || '')}</div><div class="field-grid">${field('Button label', `${language}.button`, copy.button || '')}${field('Display order', 'displayOrder', item.displayOrder || '')}</div>${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
    return `${pendingMediaPicker('Bundle image', 'image', item.image, { positionPath: 'position' })}<div class="field-grid">${field('Small heading or label', `${language}.kicker`, copy.kicker || '')}${field('Bundle title', `${language}.title`, copy.title || '')}</div>${field('Description', `${language}.description`, copy.description || '', { textarea: true })}${field('Included products', `${language}.included`, copy.included || '', { textarea: true })}<div class="field-grid">${field('Total price in TZS', `${language}.price`, copy.price || '')}${field('WhatsApp order link', `${language}.link`, copy.link || '')}</div><div class="field-grid">${field('Button label', `${language}.button`, copy.button || '')}${field('Display order', 'displayOrder', item.displayOrder || '')}</div>${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
  }

  function renderPendingAboutItem(item, section) {
    const copy = aboutCopy(item);
    if (section === 'story') return `<div class="field-grid">${field('Year', `${language}.year`, copy.year || '')}${field('Milestone title', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}</div>${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}<details class="format-advanced" open><summary>Appearance</summary><p class="form-intro">Use the compact formatting controls on the title and description fields above to adjust emphasis without changing the timeline card layout.</p></details>`;
    if (section === 'process') return `${pendingMediaPicker('Step image', 'image', item.image, { positionPath: 'position' })}${field('Step title', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}${field('Alternative text', `${language}.alt`, copy.alt || '')}</div>`;
    return `${pendingMediaPicker('Partner logo', 'image', item.image, { positionPath: 'position' })}<div class="field-grid">${field('Partner name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Website URL (optional)', `${language}.link`, copy.link || '')}</div>${field('Description (optional)', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}${field('Alternative text', `${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderPendingTeamMember(item) {
    const copy = teamCopy(item);
    return `${pendingMediaPicker('Member photo', 'image', item.image, { positionPath: 'position' })}<div class="field-grid">${field('Full name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Position', `${language}.role`, copy.role || '', { formatPath: `${language}.format`, format: copy.format })}</div>${field('Short description (optional)', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
  }

  function renderPendingImpactItem(item, section) {
    const copy = impactCopy(item);
    if (section === 'customers') return `${pendingMediaPicker('Customer photo', 'image', item.image, { positionPath: 'position' })}<div class="field-grid">${field('Customer name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Location', `${language}.location`, copy.location || '')}</div>${field('Occupation or business', `${language}.occupation`, copy.occupation || '')}${field('Swahili testimonial', `${language}.quoteSw`, copy.quoteSw || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('English translation', `${language}.quoteEn`, copy.quoteEn || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}${field('Alternative text', `${language}.alt`, copy.alt || '')}</div>`;
    if (section === 'comparison') return `<div class="field-grid">${field('Fuel name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Fuel price and unit', `${language}.unit`, copy.unit || '')}</div><div class="field-grid">${field('Amount consumed per day', `${language}.amount`, copy.amount || '')}${field('Estimated cost per day', `${language}.cost`, copy.cost || '')}</div>${field('Explanation (optional)', `${language}.explanation`, copy.explanation || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}`;
    return `${field('Impact heading', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Short description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Supporting statistic (optional)', `${language}.statistic`, copy.statistic || '')}${field('Source or evidence note (optional)', `${language}.source`, copy.source || '')}</div>${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}`;
  }

  function renderPendingPartnerItem(item, section) {
    const copy = partnerCopy(item);
    if (section === 'wakala') return `<div class="field-grid">${field('Shop name or location', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Phone number', `${language}.phone`, copy.phone || '', { help: 'Enter a Tanzanian phone number, for example 0712 345 678 or +255 712 345 678.' })}</div>${field('Description or address (optional)', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}`;
    if (section === 'business') return `${field('Business category name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Short description (optional)', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}`;
    return `${pendingMediaPicker('Partner logo', 'image', item.image, { positionPath: 'position' })}<div class="field-grid">${field('Partner name', `${language}.name`, copy.name || '', { formatPath: `${language}.format`, format: copy.format })}${field('Website URL (optional)', `${language}.link`, copy.link || '')}</div>${field('Short description or partnership role', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}${field('Alternative text', `${language}.alt`, copy.alt || '')}</div>`;
  }

  function renderPendingFaqQuestion(item) {
    const copy = faqCopy(item);
    return `${field('Question', `${language}.question`, copy.question || '', { formatPath: `${language}.format`, format: copy.format })}${field('Answer', `${language}.answer`, copy.answer || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}<div class="field-grid">${field('Answer link text (optional)', `${language}.answerLinkText`, copy.answerLinkText || '')}${field('Answer link URL (optional)', `${language}.answerLinkUrl`, copy.answerLinkUrl || '')}</div>${field('Display order', 'displayOrder', item.displayOrder || '', { type: 'number' })}<p class="form-intro">The category is assigned automatically from the section where Add Question was clicked. This new FAQ starts closed and will render in the existing accordion.</p>`;
  }

  function renderPendingBlockFields(block) {
    const copy = blockCopyForEditor(block);
    if (block.type === 'text') return `${field('Small section label', `${language}.subheading`, copy.subheading || '')}${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'image') return `${pendingMediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${field('Title', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Caption', `${language}.caption`, copy.caption || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'imageText') return `${pendingMediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${selectField('Image alignment', 'layout', block.layout || 'left', { choices: ['left', 'right'] })}${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Alternative text', `${language}.alt`, copy.alt || '')}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'product') return `${pendingMediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${field('Product name', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Size', `${language}.kicker`, copy.kicker || '')}${field('Price', 'price', block.price || '')}`;
    if (block.type === 'payment') return `${pendingMediaPicker('Image', 'image', block.image, { positionPath: 'position' })}${field('Title', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Payment instruction (optional)', `${language}.instruction`, copy.instruction || '')}`;
    if (block.type === 'stove') return `${pendingMediaPicker('Stove image', 'image', block.image)}${field('Stove name', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Price (optional)', 'price', block.price || '')}`;
    if (block.type === 'partner') return `${pendingMediaPicker('Partner logo', 'image', block.image, { positionPath: 'position' })}${field('Partner name', `${language}.title`, copy.title || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Website link', `${language}.link`, copy.link || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
    if (block.type === 'testimonial') return `${pendingMediaPicker('Customer image', 'image', block.image, { positionPath: 'position' })}${field('Customer name', `${language}.title`, copy.title || '')}${field('Testimonial', `${language}.quote`, copy.quote || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Attribution', `${language}.attribution`, copy.attribution || '')}${field('Alternative text', `${language}.alt`, copy.alt || '')}`;
    if (block.type === 'cta') return `${field('Heading', `${language}.heading`, copy.heading || '', { formatPath: `${language}.format`, format: copy.format })}${field('Description', `${language}.description`, copy.description || '', { textarea: true, formatPath: `${language}.format`, format: copy.format })}${field('Button label', `${language}.buttonLabel`, copy.buttonLabel || '')}${field('Button link', `${language}.buttonLink`, copy.buttonLink || '')}`;
    if (block.type === 'cards') {
      const previousSection = activeSection;
      activeSection = '__new-content__';
      const cards = block.cards.map((card, index) => renderDynamicCard(block, card, index)).join('');
      activeSection = previousSection;
      return `${field('Small section label', `${language}.subheading`, copy.subheading || '')}${field('Heading', `${language}.heading`, copy.heading || '')}${field('Description', `${language}.description`, copy.description || '', { textarea: true })}${cards}<button type="button" class="admin-button button-outline" data-action="add-card" data-block-id="${escapeHtml(block.id)}">Add card</button>`;
    }
    if (block.type === 'gallery') {
      const previousSection = activeSection;
      activeSection = '__new-content__';
      const images = block.images.map((item, index) => renderDynamicGalleryImage(block, item, index)).join('');
      activeSection = previousSection;
      return `${field('Small section label', `${language}.subheading`, copy.subheading || '')}${field('Heading', `${language}.heading`, copy.heading || '')}${field('Description', `${language}.description`, copy.description || '', { textarea: true })}${images}<button type="button" class="admin-button button-outline" data-action="add-gallery-image" data-block-id="${escapeHtml(block.id)}">Add gallery image</button>`;
    }
    return '';
  }

  function ensureAddContentPanel() {
    const form = $('#add-content-form');
    if (!form || form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    form.addEventListener('input', (event) => {
      const formatTarget = event.target.closest('[data-format-path][data-format-key]');
      if (formatTarget && addContentDraft) { setAt(addContentDraft.block, `${formatTarget.dataset.formatPath}.${formatTarget.dataset.formatKey}`, formatControlValue(formatTarget)); return; }
      const target = event.target.closest('[data-path]');
      if (target && addContentDraft) setAt(addContentDraft.block, target.dataset.path, target.value);
    });
    form.addEventListener('change', (event) => {
      const formatTarget = event.target.closest('[data-format-path][data-format-key]');
      if (formatTarget && addContentDraft) { setAt(addContentDraft.block, `${formatTarget.dataset.formatPath}.${formatTarget.dataset.formatKey}`, formatControlValue(formatTarget)); return; }
      const target = event.target.closest('[data-path]');
      if (target && addContentDraft) setAt(addContentDraft.block, target.dataset.path, target.value);
    });
    form.addEventListener('submit', (event) => { event.preventDefault(); void commitAddContent(); });
  }

  function renderAddContentModalForm() {
    ensureAddContentPanel();
    if (!addContentDraft) return;
    if (addContentDraft.productsItem) {
      const titles = { makange: 'Add briquette product', stoves: 'Add cookstove', bundle: 'Add starter bundle' };
      $('#add-content-title').textContent = titles[addContentDraft.section] || 'Add content';
      $('#add-content-fields').innerHTML = renderPendingProductsItem(addContentDraft.block, addContentDraft.section);
      return;
    }
    if (addContentDraft.aboutItem) {
      const titles = { story: 'Add timeline milestone', process: 'Add production step', partners: 'Add partner or funder' };
      $('#add-content-title').textContent = titles[addContentDraft.section] || 'Add About content';
      $('#add-content-fields').innerHTML = renderPendingAboutItem(addContentDraft.block, addContentDraft.section);
      return;
    }
    if (addContentDraft.teamItem) {
      const titles = { management: 'Add Management member', board: 'Add Board member' };
      $('#add-content-title').textContent = titles[addContentDraft.section] || 'Add Team member';
      $('#add-content-fields').innerHTML = renderPendingTeamMember(addContentDraft.block);
      return;
    }
    if (addContentDraft.impactItem) {
      const titles = { customers: 'Add customer testimonial', comparison: 'Add fuel comparison', benefits: 'Add impact card' };
      $('#add-content-title').textContent = titles[addContentDraft.section] || 'Add Impact content';
      $('#add-content-fields').innerHTML = renderPendingImpactItem(addContentDraft.block, addContentDraft.section);
      return;
    }
    if (addContentDraft.partnerItem) {
      const titles = { wakala: 'Add WAKALA shop', business: 'Add business category', funders: 'Add funder or partner' };
      $('#add-content-title').textContent = titles[addContentDraft.section] || 'Add Partner content';
      $('#add-content-fields').innerHTML = renderPendingPartnerItem(addContentDraft.block, addContentDraft.section);
      return;
    }
    if (addContentDraft.faqItem) {
      const meta = faqSectionMeta.find(([id]) => id === addContentDraft.section) || faqSectionMeta[0];
      $('#add-content-title').textContent = 'Add New Question';
      $('#add-content-fields').innerHTML = `<p class="form-intro"><strong>Category:</strong> ${escapeHtml(meta[1])}</p>${renderPendingFaqQuestion(addContentDraft.block)}`;
      return;
    }
    const titles = { product: 'Add briquette', payment: 'Add payment content', stove: 'Add stove', partner: 'Add partner' };
    $('#add-content-title').textContent = titles[addContentDraft.block.type] || 'Add content';
    $('#add-content-fields').innerHTML = renderPendingBlockFields(addContentDraft.block);
  }

  async function commitAddContent() {
    if (!addContentDraft) return;
    const { section, block } = addContentDraft;
    if (addContentDraft.productsItem) {
      if (!block.image) { showToast('Choose an image before saving.'); return; }
      const copy = block[language] || block.en || {};
      const label = section === 'bundle' ? copy.title : copy.name;
      if (!String(label || '').trim()) { showToast(`Enter a ${section === 'bundle' ? 'bundle title' : section === 'stoves' ? 'stove name' : 'product name'} before saving.`); return; }
      if (!String(copy.price || '').trim()) { showToast('Enter a price or quotation before saving.'); return; }
      const catalog = productsCatalog(currentPageContent());
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      target.items.push(block);
      addSharedCatalogItem(section, block);
      activeSection = section;
      addContentDraft = null;
      closeAddContent({ force: true });
      renderSectionList();
      renderProductsPageForm();
      updatePreview();
      draftChangeVersion += 1;
      clearTimeout(draftSaveTimer);
      const saved = await saveDraftRemote(true);
      if (saved) showToast('Content saved to the selected section draft. Publish when ready.');
      else showToast('Content was added locally, but the draft could not be saved. Try Save Draft again.');
      return;
    }
    if (addContentDraft.aboutItem) {
      const copy = block[language] || block.en || block.sw || {};
      const required = section === 'story' ? [copy.year, copy.title, copy.description] : section === 'process' ? [block.image, copy.title, copy.description] : [block.image, copy.name];
      if (required.some((value) => !String(value || '').trim())) {
        const label = section === 'story' ? 'year, milestone title and description' : section === 'process' ? 'an image, step title and description' : 'a logo and partner name';
        showToast(`Enter ${label} before saving.`);
        return;
      }
      const otherLanguage = language === 'sw' ? 'en' : 'sw';
      const otherCopy = block[otherLanguage] || (block[otherLanguage] = {});
      const hasOtherLanguage = Object.values(otherCopy).some((value) => String(value || '').trim());
      if (!hasOtherLanguage) block[otherLanguage] = clone(copy);
      const catalog = aboutCatalog(currentPageContent());
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      target.items.push(block);
      addSharedCatalogItem(section, block);
      activeSection = section;
      addContentDraft = null;
      closeAddContent({ force: true });
      renderSectionList();
      renderAboutPageForm();
      updatePreview();
      draftChangeVersion += 1;
      clearTimeout(draftSaveTimer);
      const saved = await saveDraftRemote(true);
      if (saved) showToast('Content saved to the selected About section draft. Publish when ready.');
      else showToast('Content was added locally, but the draft could not be saved. Try Save Draft again.');
      return;
    }
    if (addContentDraft.teamItem) {
      const copy = block[language] || block.en || block.sw || {};
      if (!block.image || !String(copy.name || '').trim() || !String(copy.role || '').trim()) {
        showToast('Choose a member photo and enter the full name and position before saving.');
        return;
      }
      const otherLanguage = language === 'sw' ? 'en' : 'sw';
      const otherCopy = block[otherLanguage] || (block[otherLanguage] = {});
      const hasOtherLanguage = Object.values(otherCopy).some((value) => String(value || '').trim());
      if (!hasOtherLanguage) block[otherLanguage] = clone(copy);
      const catalog = teamCatalog(currentPageContent());
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      target.items.push(block);
      addSharedCatalogItem(section, block);
      activeSection = section;
      addContentDraft = null;
      closeAddContent({ force: true });
      renderSectionList();
      renderTeamPageForm();
      updatePreview();
      draftChangeVersion += 1;
      clearTimeout(draftSaveTimer);
      const saved = await saveDraftRemote(true);
      if (saved) showToast('Team member saved to the selected section draft. Publish when ready.');
      else showToast('Team member was added locally, but the draft could not be saved. Try Save Draft again.');
      return;
    }
    if (addContentDraft.impactItem) {
      const copy = block[language] || block.en || block.sw || {};
      const required = section === 'customers' ? [block.image, copy.name, copy.quoteSw, copy.quoteEn] : section === 'comparison' ? [copy.name, copy.unit, copy.amount, copy.cost] : [copy.title, copy.description];
      if (required.some((value) => !String(value || '').trim())) {
        const label = section === 'customers' ? 'a photo, customer name, Swahili testimonial and English translation' : section === 'comparison' ? 'fuel name, price and unit, amount and estimated cost' : 'an impact heading and description';
        showToast(`Enter ${label} before saving.`);
        return;
      }
      const otherLanguage = language === 'sw' ? 'en' : 'sw';
      const otherCopy = block[otherLanguage] || (block[otherLanguage] = {});
      const hasOtherLanguage = Object.entries(otherCopy).some(([key, value]) => key !== 'format' && String(value || '').trim());
      if (!hasOtherLanguage) block[otherLanguage] = clone(copy);
      const catalog = impactCatalog(currentPageContent());
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      target.items.push(block);
      addSharedCatalogItem(section, block);
      activeSection = section;
      addContentDraft = null;
      closeAddContent({ force: true });
      renderSectionList();
      renderImpactPageForm();
      updatePreview();
      draftChangeVersion += 1;
      clearTimeout(draftSaveTimer);
      const saved = await saveDraftRemote(true);
      if (saved) showToast('Impact content saved to the selected section draft. Publish when ready.');
      else showToast('Impact content was added locally, but the draft could not be saved. Try Save Draft again.');
      return;
    }
    if (addContentDraft.partnerItem) {
      const copy = block[language] || block.en || block.sw || {};
      const phone = String(copy.phone || '').trim();
      const phoneValid = /^[+\d][\d\s().-]{6,}$/.test(phone) && phone.replace(/\D/g, '').length >= 9;
      const required = section === 'wakala' ? [copy.name, phone] : section === 'business' ? [copy.name] : [block.image, copy.name];
      if (required.some((value) => !String(value || '').trim())) {
        const label = section === 'wakala' ? 'shop location and phone number' : section === 'business' ? 'business category name' : 'a logo and partner name';
        showToast(`Enter ${label} before saving.`);
        return;
      }
      if (section === 'wakala' && !phoneValid) { showToast('Enter a valid phone number with at least 9 digits.'); return; }
      const otherLanguage = language === 'sw' ? 'en' : 'sw';
      const otherCopy = block[otherLanguage] || (block[otherLanguage] = {});
      const hasOtherLanguage = Object.entries(otherCopy).some(([key, value]) => key !== 'format' && String(value || '').trim());
      if (!hasOtherLanguage) block[otherLanguage] = clone(copy);
      const catalog = partnerCatalog(currentPageContent());
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      target.items.push(block);
      addSharedCatalogItem(section, block);
      activeSection = section;
      addContentDraft = null;
      closeAddContent({ force: true });
      renderSectionList();
      renderPartnersPageForm();
      updatePreview();
      draftChangeVersion += 1;
      clearTimeout(draftSaveTimer);
      const saved = await saveDraftRemote(true);
      if (saved) showToast('Partner content saved to the selected section draft. Publish when ready.');
      else showToast('Partner content was added locally, but the draft could not be saved. Try Save Draft again.');
      return;
    }
    if (addContentDraft.faqItem) {
      const copy = block[language] || {};
      if (!String(copy.question || '').trim() || !String(copy.answer || '').trim()) {
        showToast('Enter both the question and answer before saving.');
        return;
      }
      block.open = false;
      const catalog = faqCatalog(currentPageContent());
      const target = catalog?.[section];
      if (!target) return;
      if (!Array.isArray(target.items)) target.items = [];
      target.items.push(block);
      addSharedCatalogItem(section, block);
      activeSection = section;
      addContentDraft = null;
      closeAddContent({ force: true });
      renderSectionList();
      renderFaqPageForm();
      updatePreview();
      draftChangeVersion += 1;
      clearTimeout(draftSaveTimer);
      const saved = await saveDraftRemote(true);
      if (saved) showToast('Question saved to the selected category draft. Publish when ready.');
      else showToast('Question was added locally, but the draft could not be saved. Try Save Draft again.');
      return;
    }
    if (!block.image && ['product', 'payment', 'stove', 'partner'].includes(block.type)) { showToast('Choose an image before saving.'); return; }
    block.anchor = section || null;
    block.placement = 'after';
    dynamicBlocks(currentPageContent()).push(block);
    activeSection = `block:${block.id}`;
    addContentDraft = null;
    closeAddContent();
    renderSectionList();
    renderDynamicBlockForm();
    updatePreview();
    draftChangeVersion += 1;
    clearTimeout(draftSaveTimer);
    const saved = await saveDraftRemote(true);
    if (saved) showToast('Content saved to the selected section draft. Publish when ready.');
    else showToast('Content was added locally, but the draft could not be saved. Try Save Draft again.');
  }

  function dynamicBlockRow(block, index) {
    const copy = blockCopyForEditor(block, language);
    const label = copy.heading || copy.title || ({ text: 'Added text', image: 'Added image', imageText: 'Added image and text', cards: 'Added products', gallery: 'Added gallery', product: 'Added briquette', payment: 'Added payment content', stove: 'Added stove', partner: 'Added partner', testimonial: 'Added customer testimonial', cta: 'Added call to action' }[block.type] || 'Added content');
    return `<div class="section-row dynamic-section-row ${`block:${block.id}` === activeSection ? 'active' : ''} ${block.visible === false ? 'is-hidden' : ''}" data-section="block:${escapeHtml(block.id)}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(label)}${sectionIsDirty(`block:${block.id}`) ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${block.visible === false ? 'Hidden' : 'Visible'} · ${block.type}</small></div><div class="section-row-actions"><button class="section-action" data-action="edit-section" data-section="block:${escapeHtml(block.id)}">Edit</button><button class="section-action" data-action="move-block-up" data-block-id="${escapeHtml(block.id)}" ${index === 0 ? 'disabled' : ''}>↑</button><button class="section-action" data-action="move-block-down" data-block-id="${escapeHtml(block.id)}" ${index === dynamicBlocks().length - 1 ? 'disabled' : ''}>↓</button></div></div>`;
  }

  function moveDynamicBlock(id, delta) {
    const blocks = dynamicBlocks();
    const index = blocks.findIndex((block) => block.id === id);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= blocks.length) return;
    [blocks[index], blocks[next]] = [blocks[next], blocks[index]];
    renderSectionList();
    persistDraft(false);
  }
  function toggleDynamicBlock(id) { const block = dynamicBlocks().find((item) => item.id === id); if (!block) return; block.visible = block.visible === false; renderSectionList(); renderDynamicBlockForm(false); persistDraft(false); }
  function deleteDynamicBlock(id) {
    if (!window.confirm('Delete this added content? It will disappear from the public page after you publish.')) return;
    const blocks = dynamicBlocks();
    const index = blocks.findIndex((block) => block.id === id);
    if (index < 0) return;
    blocks.splice(index, 1);
    activeSection = activePage === 'home' ? 'hero' : (genericContent().elements[0]?.group || 'content');
    renderSectionList();
    renderForm(false);
    persistDraft(false);
  }
  function moveNested(items, index, delta) { const next = index + delta; if (!Array.isArray(items) || index < 0 || next < 0 || next >= items.length) return; [items[index], items[next]] = [items[next], items[index]]; }

  function sectionActionButtons(id, isDynamic = false, isHidden = false) {
    const visibilityAction = isDynamic ? 'toggle-block' : 'toggle-section';
    const visibilityAttribute = isDynamic ? `data-block-id="${escapeHtml(id.replace(/^block:/, ''))}"` : `data-section="${escapeHtml(id)}"`;
    const visibilityLabel = isHidden ? 'Show on website' : 'Hide from website';
    if (isDynamic) return `<div class="section-row-actions"><button class="section-visibility-button" data-action="${visibilityAction}" ${visibilityAttribute} aria-pressed="${String(!isHidden)}" title="${visibilityLabel}">${isHidden ? '○' : '●'}</button><button class="section-action primary-section-action" data-action="edit-section" data-section="${escapeHtml(id)}">Edit <span aria-hidden="true">›</span></button></div>`;
    const addAllowed = activePage === 'products' ? productsCanAddContent(id) : activePage === 'about' ? aboutCanAddContent(id) : activePage === 'team' ? teamCanAddContent(id) : activePage === 'impact' ? impactCanAddContent(id) : activePage === 'partners' ? partnerCanAddContent(id) : activePage === 'faq' ? faqCanAddContent(id) : canAddContent(id);
    const addButton = addAllowed ? `<button class="section-action add-content-action" data-action="open-add-content" data-section="${escapeHtml(id)}">Add Content</button>` : '';
    if (activePage === 'products' || activePage === 'about' || activePage === 'team' || activePage === 'impact' || activePage === 'partners' || activePage === 'faq') return `<div class="section-row-actions"><button class="section-action primary-section-action" data-action="edit-section" data-section="${escapeHtml(id)}">Edit</button>${activePage === 'faq' && addAllowed ? addButton.replace('Add Content', 'Add Question') : addButton}</div>`;
    return `<div class="section-row-actions"><button class="section-visibility-button" data-action="${visibilityAction}" ${visibilityAttribute} aria-pressed="${String(!isHidden)}" title="${visibilityLabel}">${isHidden ? '○' : '●'}</button><button class="section-action primary-section-action" data-action="edit-section" data-section="${escapeHtml(id)}">Edit <span aria-hidden="true">›</span></button>${addButton}</div>`;
  }

  // Keep primary editing visible while grouping reorder, visibility and delete
  // actions in one predictable overflow menu for every page section.
  function sectionActionButtons(id, isDynamic = false, isHidden = false) {
    const rowId = escapeHtml(id);
    const blockId = escapeHtml(String(id).replace(/^block:/, ''));
    const moveData = `data-section="${rowId}"`;
    const visibilityAction = isDynamic ? 'toggle-block' : 'toggle-section';
    const visibilityData = isDynamic ? `data-block-id="${blockId}"` : moveData;
    const visibilityLabel = isHidden ? 'Show on website' : 'Hide on website';
    const deleteAction = isDynamic ? `<button class="section-overflow-item danger" data-action="delete-block" data-block-id="${blockId}">Delete section</button>` : '';
    const overflow = `<div class="section-overflow-wrap"><button class="section-action section-overflow-button" data-action="toggle-section-menu" data-section="${rowId}" aria-expanded="false" aria-label="More section actions" title="More section actions">...</button><div class="section-overflow-menu" hidden><button class="section-overflow-item" data-action="move-section-up" ${moveData}>Move up</button><button class="section-overflow-item" data-action="move-section-down" ${moveData}>Move down</button><button class="section-overflow-item" data-action="${visibilityAction}" ${visibilityData}>${visibilityLabel}</button>${deleteAction}</div></div>`;
    const editButton = `<button class="section-action primary-section-action" data-action="edit-section" data-section="${rowId}">Edit <span aria-hidden="true">&gt;</span></button>`;
    if (isDynamic) return `<div class="section-row-actions">${editButton}${overflow}</div>`;
    const addAllowed = activePage === 'products' ? productsCanAddContent(id) : activePage === 'about' ? aboutCanAddContent(id) : activePage === 'team' ? teamCanAddContent(id) : activePage === 'impact' ? impactCanAddContent(id) : activePage === 'partners' ? partnerCanAddContent(id) : activePage === 'faq' ? faqCanAddContent(id) : canAddContent(id);
    const addLabel = activePage === 'faq' ? 'Add Question' : 'Add Content';
    const addButton = addAllowed ? `<button class="section-action add-content-action" data-action="open-add-content" data-section="${rowId}">${addLabel}</button>` : '';
    return `<div class="section-row-actions">${editButton}${addButton}${overflow}</div>`;
  }

  function staticSectionRow(id, label, description, index) {
    const hidden = sectionIsHidden(id);
    const dirty = activePage === 'home' || activePage === 'products' || activePage === 'about' || activePage === 'team' || activePage === 'impact' || activePage === 'partners' || activePage === 'faq' ? sectionIsDirty(id) : pageIsDirty();
    return `<div class="section-row ${id === activeSection ? 'active' : ''} ${hidden ? 'is-hidden' : ''}" data-section="${escapeHtml(id)}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(label)}${dirty ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${hidden ? 'Hidden on the public page' : escapeHtml(description)}</small></div>${sectionActionButtons(id, false, hidden)}</div>`;
  }

  function dynamicBlockRow(block, index) {
    const copy = blockCopyForEditor(block, language);
    const label = copy.heading || copy.title || ({ text: 'Added text', image: 'Added image', imageText: 'Added image and text', cards: 'Added products', gallery: 'Added gallery', product: 'Added briquette', payment: 'Added payment content', stove: 'Added stove', partner: 'Added partner', testimonial: 'Added customer testimonial', cta: 'Added call to action' }[block.type] || 'Added content');
    return `<div class="section-row dynamic-section-row ${`block:${block.id}` === activeSection ? 'active' : ''} ${block.visible === false ? 'is-hidden' : ''}" data-section="block:${escapeHtml(block.id)}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(label)}${sectionIsDirty(`block:${block.id}`) ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${block.visible === false ? 'Hidden' : 'Added content'}</small></div>${sectionActionButtons(`block:${block.id}`, true, block.visible === false)}</div>`;
  }

  function orderedSectionRows(entries, content) {
    const isHomeSectionList = entries.some((entry) => ['hero', 'payment', 'testimonial'].includes(entry.id));
    if (!isHomeSectionList && Array.isArray(content?.sectionOrder) && content.sectionOrder.length) {
      const byId = new Map(entries.map((entry) => [entry.id, entry]));
      const ordered = content.sectionOrder.map((id) => byId.get(id)).filter(Boolean);
      entries = ordered.concat(entries.filter((entry) => !content.sectionOrder.includes(entry.id)));
    }
    const blocks = dynamicBlocks(content);
    const used = new Set();
    let displayIndex = 0;
    const children = (anchor, placement) => blocks.filter((block) => !used.has(block) && block.anchor === anchor && (block.placement || 'after') === placement);
    const emitBlock = (block) => {
      if (!block || used.has(block)) return '';
      used.add(block);
      const row = dynamicBlockRow(block, displayIndex++);
      const nested = blocks.filter((child) => !used.has(child) && child.anchor === `block:${block.id}`).map((child) => emitBlock(child)).join('');
      return row + nested;
    };
    const output = entries.map((entry) => {
      const before = children(entry.id, 'before').map((block) => emitBlock(block)).join('');
      const row = staticSectionRow(entry.id, entry.label, entry.description, displayIndex++);
      const after = children(entry.id, 'inside').concat(children(entry.id, 'after')).map((block) => emitBlock(block)).join('');
      return before + row + after;
    }).join('');
    return output + blocks.filter((block) => !used.has(block)).map((block) => emitBlock(block)).join('');
  }

  function closeAddContent({ force = false } = {}) {
    if (!force && !confirmCloseAddContent()) return false;
    $('#add-content-backdrop').hidden = true;
    $('#add-content-modal').hidden = true;
    addContentDraft = null;
    addContentInitialSnapshot = null;
    addContentModalSuspended = false;
    syncModalScrollLock();
    return true;
  }
  function openAddSection() {
    if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
    ensureAddContentPanel();
    pendingContentSection = activeSection;
    addContentDraft = { section: pendingContentSection, block: newDynamicBlock('text') };
    addContentDraft.block.anchor = pendingContentSection;
    addContentDraft.block.placement = 'after';
    addContentInitialSnapshot = clone(addContentDraft.block);
    renderAddContentModalForm();
    $('#add-content-title').textContent = 'Add New Section';
    $('#add-content-backdrop').hidden = false;
    $('#add-content-modal').hidden = false;
    syncModalScrollLock();
  }

  function openAddContent(section = activeSection) {
    if (activePage === 'products' && productsCanAddContent(section)) {
      if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
      ensureAddContentPanel();
      pendingContentSection = section;
      addContentDraft = { section, block: newProductsItem(section), productsItem: true };
      addContentInitialSnapshot = clone(addContentDraft.block);
      renderAddContentModalForm();
      $('#add-content-backdrop').hidden = false;
      $('#add-content-modal').hidden = false;
      syncModalScrollLock();
      return;
    }
    if (activePage === 'about' && aboutCanAddContent(section)) {
      if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
      ensureAddContentPanel();
      pendingContentSection = section;
      addContentDraft = { section, block: newAboutItem(section), aboutItem: true };
      addContentInitialSnapshot = clone(addContentDraft.block);
      renderAddContentModalForm();
      $('#add-content-backdrop').hidden = false;
      $('#add-content-modal').hidden = false;
      syncModalScrollLock();
      return;
    }
    if (activePage === 'team' && teamCanAddContent(section)) {
      if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
      ensureAddContentPanel();
      pendingContentSection = section;
      addContentDraft = { section, block: newTeamMember(section), teamItem: true };
      addContentInitialSnapshot = clone(addContentDraft.block);
      renderAddContentModalForm();
      $('#add-content-backdrop').hidden = false;
      $('#add-content-modal').hidden = false;
      syncModalScrollLock();
      return;
    }
    if (activePage === 'impact' && impactCanAddContent(section)) {
      if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
      ensureAddContentPanel();
      pendingContentSection = section;
      addContentDraft = { section, block: newImpactItem(section), impactItem: true };
      addContentInitialSnapshot = clone(addContentDraft.block);
      renderAddContentModalForm();
      $('#add-content-backdrop').hidden = false;
      $('#add-content-modal').hidden = false;
      syncModalScrollLock();
      return;
    }
    if (activePage === 'partners' && partnerCanAddContent(section)) {
      if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
      ensureAddContentPanel();
      pendingContentSection = section;
      addContentDraft = { section, block: newPartnerItem(section), partnerItem: true };
      addContentInitialSnapshot = clone(addContentDraft.block);
      renderAddContentModalForm();
      $('#add-content-backdrop').hidden = false;
      $('#add-content-modal').hidden = false;
      syncModalScrollLock();
      return;
    }
    if (activePage === 'faq' && faqCanAddContent(section)) {
      if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
      ensureAddContentPanel();
      pendingContentSection = section;
      addContentDraft = { section, block: newFaqQuestion(section), faqItem: true };
      addContentInitialSnapshot = clone(addContentDraft.block);
      renderAddContentModalForm();
      $('#add-content-backdrop').hidden = false;
      $('#add-content-modal').hidden = false;
      syncModalScrollLock();
      return;
    }
    if (!canAddContent(section)) return;
    if (!closeMedia() || !closeAddContent() || !closeDrawer()) return;
    ensureAddContentPanel();
    pendingContentSection = section || activeSection;
    const type = { products: 'product', payment: 'payment', cookstoves: 'stove', partners: 'partner' }[pendingContentSection];
    addContentDraft = { section: pendingContentSection, block: newDynamicBlock(type) };
    addContentDraft.block.anchor = pendingContentSection;
    addContentDraft.block.placement = 'after';
    addContentInitialSnapshot = clone(addContentDraft.block);
    renderAddContentModalForm();
    $('#add-content-backdrop').hidden = false;
    $('#add-content-modal').hidden = false;
    syncModalScrollLock();
  }

  function renderGenericSectionList() {
    const content = genericContent();
    const groups = [...new Map(content.elements.map((element) => [element.group || 'content', { id: element.group || 'content', label: element.groupLabel || 'Page content' }])).values()];
    const blocks = dynamicBlocks(content);
    $('#section-count').textContent = `${groups.length + blocks.length} page sections`;
    const groupRows = groups.map((group, index) => {
      const items = content.elements.filter((element) => (element.group || 'content') === group.id);
      const imageCount = items.filter((element) => element.kind === 'image').length;
      return `<div class="section-row ${group.id === activeSection ? 'active' : ''}" data-section="${escapeHtml(group.id)}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(group.label)}${pageIsDirty() ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${items.length} editable fields${imageCount ? ` · ${imageCount} image${imageCount > 1 ? 's' : ''}` : ''}</small></div><button class="section-action" data-action="edit-section" data-section="${escapeHtml(group.id)}">Edit</button></div>`;
    }).join('');
    $('#section-list').innerHTML = groupRows + blocks.map((block, index) => dynamicBlockRow(block, index + groups.length)).join('');
  }

  function renderGenericForm(open = true) {
    if (activeSection.startsWith('block:')) return renderDynamicBlockForm(open);
    if (open) beginEditorSession();
    const content = genericContent();
    const elements = content.elements.filter((element) => (element.group || 'content') === activeSection);
    const group = elements[0]?.groupLabel || 'Page content';
    $('#drawer-title').textContent = group;
    $('#drawer-description').textContent = `Edit the visible content and images in this section of the ${pageMeta[activePage].label} page.`;
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    $('#section-form').innerHTML = elements.length ? elements.map((element) => {
      const fullIndex = content.elements.indexOf(element);
      if (element.kind === 'image') return `${mediaPicker(`Image ${String(element.index + 1).padStart(2, '0')}`, `elements.${fullIndex}.value`, element.value)}${field('Alternative text', `elements.${fullIndex}.alt`, element.alt || '')}${selectField('Image position', `elements.${fullIndex}.position`, element.position || 'center', { choices: ['center', 'top', 'bottom', 'left', 'right'] })}`;
      const label = element.label || `${element.tag.toUpperCase()} ${String(element.index + 1).padStart(2, '0')}`;
      return `${field(label, `elements.${fullIndex}.value`, element.value, { textarea: ['p', 'a', 'button'].includes(element.tag) })}${element.tag === 'a' ? field('Link URL', `elements.${fullIndex}.href`, element.href || '') : ''}`;
    }).join('') : '<p class="form-intro">This page has no editable content yet.</p>';
    if (open) openEditorPanel();
  }

  function renderForm(open = true) {
    if (activePage === 'products') return renderProductsPageForm(open);
    if (activePage === 'about') return renderAboutPageForm(open);
    if (activePage === 'team') return renderTeamPageForm(open);
    if (activePage === 'impact') return renderImpactPageForm(open);
    if (activePage === 'partners') return renderPartnersPageForm(open);
    if (activePage === 'faq') return renderFaqPageForm(open);
    if (activePage !== 'home') return renderGenericForm(open);
    if (activeSection.startsWith('block:')) return renderDynamicBlockForm(open);
    if (open) beginEditorSession();
    const meta = sectionMeta.find(([id]) => id === activeSection);
    const drawer = $('#editor-drawer');
    $('#drawer-title').textContent = meta[1];
    $('#drawer-description').textContent = meta[2];
    $('#drawer-language').textContent = language === 'sw' ? 'Kiswahili' : 'English';
    const source = homeSectionSource(activeSection);
    const section = state.draft[source];
    const forms = { hero: renderHero, trust: renderTrust, products: renderProducts, ordering: renderOrdering, payment: renderPayment, factory: renderFactory, kitchen: renderKitchen, testimonial: renderTestimonial, cookstoves: renderCookstoves, impact: renderImpact, partners: renderPartners, images: renderImages, footer: renderFooter };
    $('#section-form').innerHTML = forms[activeSection](section);
    if (open) openEditorPanel();
  }

  function renderGenericSectionList() {
    const content = genericContent();
    const groups = [...new Map(content.elements.map((element) => [element.group || 'content', { id: element.group || 'content', label: element.groupLabel || 'Page content' }])).values()];
    const rows = orderedSectionRows(groups.map((group) => ({ id: group.id, label: group.label, description: `${content.elements.filter((element) => (element.group || 'content') === group.id).length} editable fields` })), content);
    $('#section-count').textContent = `${groups.length + dynamicBlocks(content).length} page sections`;
    $('#section-list').innerHTML = rows;
    updateSelectedSectionAddButton();
  }

  function updateSelectedSectionAddButton() {
    const button = $('#selected-section-add');
    const context = document.querySelector('.panel-context');
    if (context) context.textContent = `(${pageMeta[activePage]?.label || 'Home'})`;
    if (!button) return;
    const allowed = activePage === 'home' && canAddContent(activeSection);
    button.hidden = !allowed;
    button.dataset.section = activeSection;
  }

  function renderSectionList() {
    if (activePage === 'products') {
      const rows = productsSectionMeta.map(([id, label, description], index) => staticSectionRow(id, label, description, index)).join('');
      $('#section-count').textContent = `${productsSectionMeta.length} sections`;
      $('#section-list').innerHTML = rows;
      updateSelectedSectionAddButton();
      return;
    }
    if (activePage === 'about') {
      const rows = aboutSectionMeta.map(([id, label, description], index) => staticSectionRow(id, label, description, index)).join('');
      $('#section-count').textContent = '3 expandable sections';
      $('#section-list').innerHTML = rows;
      updateSelectedSectionAddButton();
      return;
    }
    if (activePage === 'team') {
      const rows = teamSectionMeta.map(([id, label, description], index) => staticSectionRow(id, label, description, index)).join('');
      $('#section-count').textContent = '2 sections';
      $('#section-list').innerHTML = rows;
      updateSelectedSectionAddButton();
      return;
    }
    if (activePage === 'impact') {
      const rows = impactSectionMeta.map(([id, label, description], index) => staticSectionRow(id, label, description, index)).join('');
      $('#section-count').textContent = '3 expandable sections';
      $('#section-list').innerHTML = rows;
      updateSelectedSectionAddButton();
      return;
    }
    if (activePage === 'partners') {
      const rows = partnerSectionMeta.map(([id, label, description], index) => staticSectionRow(id, label, description, index)).join('');
      $('#section-count').textContent = '3 expandable sections';
      $('#section-list').innerHTML = rows;
      updateSelectedSectionAddButton();
      return;
    }
    if (activePage === 'faq') {
      const rows = faqPageSectionMeta.map(([id, label, description], index) => staticSectionRow(id, label, description, index)).join('');
      $('#section-count').textContent = '4 categories · 3 expandable sections';
      $('#section-list').innerHTML = rows;
      updateSelectedSectionAddButton();
      return;
    }
    if (activePage !== 'home') return renderGenericSectionList();
    const rows = orderedSectionRows(sectionMeta.map(([id, label, description]) => ({ id, label, description })), state.draft);
    $('#section-count').textContent = `${sectionMeta.length + dynamicBlocks(state.draft).length} sections`;
    $('#section-list').innerHTML = rows;
    updateSelectedSectionAddButton();
  }

  function sendPreview() {
    const frame = $('#preview-frame');
    if (!frame?.contentWindow) return;
    const content = previewMode === 'published' ? currentPublished() : currentDraft();
    const version = previewVersion();
    // Same-origin previews can be updated synchronously. Keep postMessage as
    // the fallback for a just-created iframe, and for compatibility with any
    // browser that exposes the preview only after its load event.
    if (typeof frame.contentWindow.__ecopowerApplyPreview === 'function') frame.contentWindow.__ecopowerApplyPreview(content, language, version);
    frame.contentWindow.postMessage({ type: 'ecopower-cms-preview', content, language, previewMode, version }, window.location.origin);
    // Keep image rendering deterministic even while the iframe's own script
    // is booting or waiting on its private API request.
    applyPreviewImages(content);
    highlightPreviewSection();
    // Re-apply after the embedded page finishes its own CMS boot sequence.
    // This keeps the dashboard's selected draft image authoritative.
    [120, 500, 1200].forEach((delay) => setTimeout(() => {
      const currentFrame = $('#preview-frame');
      if (!currentFrame?.contentWindow) return;
      const latest = previewMode === 'published' ? currentPublished() : currentDraft();
      if (typeof currentFrame.contentWindow.__ecopowerApplyPreview === 'function') currentFrame.contentWindow.__ecopowerApplyPreview(latest, language, previewVersion());
       applyPreviewImages(latest);
       highlightPreviewSection();
    }, delay));
    $('#preview-caption').textContent = `${previewModeLabel()} · ${language === 'sw' ? 'Kiswahili' : 'English'} · ${document.querySelector('.preview-size.active')?.textContent || 'Desktop'}`;
  }

  function bindPreviewClicks() {
    const doc = $('#preview-frame')?.contentDocument;
    if (!doc) return;
    if (activePage !== 'home') return;
    const targets = [
      ['hero', '.hero .hero-photo', 'image', 'image'], ['images', '.hero-brand-mark', 'image', 'brand.image'], ['hero', '.hero h1', 'text'], ['hero', '.hero .hero-copy > p:not(.eyebrow)', 'text'],
      ['trust', '.trust-strip', 'text'], ['products', '#products .product-card-image', 'image', 'items.INDEX.image'], ['products', '#products', 'text'], ['ordering', '#how-it-works', 'text'],
      ['images', '#how-it-works .payment-qr-card img', 'image', 'paymentQr.INDEX.image'], ['images', '.factory-collage img', 'image', 'factoryGallery.INDEX.image'], ['factory', '.story-copy h2', 'text'],
      ['kitchen', '.kitchen-section', 'text'], ['images', '.category-grid .category-card img', 'image', 'kitchenGallery.INDEX.image'], ['cookstoves', '.home-stove-card img', 'image', 'items.INDEX.image'], ['cookstoves', '.stove-showcase', 'text'],
      ['impact', '.home-impact-summary', 'text'], ['partners', '.home-partner-section', 'text'], ['images', '.home-partner-logos img', 'image', 'partnerLogos.INDEX.image'], ['footer', '.footer', 'text']
    ];
    targets.forEach(([section, selector, type, pathTemplate]) => doc.querySelectorAll(selector).forEach((node, index) => {
      node.style.cursor = 'pointer';
      node.title = 'Click to edit this section';
      node.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (type === 'image') openMedia(section, pathTemplate?.replace('INDEX', String(index)) || 'image', { intentional: true });
        else { activeSection = section; renderSectionList(); renderForm(); }
      }, { once: true });
    }));
  }

  function updatePreview() { sendPreview(); }
  function highlightPreviewSection() {
    const doc = $('#preview-frame')?.contentDocument;
    if (!doc) return;
    doc.querySelectorAll('.cms-admin-selected-section').forEach((element) => element.classList.remove('cms-admin-selected-section'));
    const key = activeSection.startsWith('block:') ? activeSection.slice(6) : activeSection;
    const match = [...doc.querySelectorAll('[data-cms-section]')].find((element) => element.dataset.cmsSection === key);
    if (match) match.classList.add('cms-admin-selected-section');
  }

  function closeDrawer({ force = false } = {}) {
    if (!force && !confirmCloseEditor()) return false;
    const drawer = $('#editor-drawer');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    if (drawer.parentElement?.classList.contains('admin-workspace')) drawer.hidden = true;
    $('#drawer-backdrop').hidden = true;
    editorSession = null;
    syncModalScrollLock();
    return true;
  }

  function updateMediaPreview(src) {
    const item = state.media.find((candidate) => candidate.src === src);
    const image = $('#media-preview-image');
    const empty = $('#media-preview-empty');
    const name = $('#media-preview-name');
    const help = $('#media-preview-help');
    if (!item || !image || !empty || !name || !help) return;
    clearMediaLocalPreview();
    mediaSelectedSrc = src;
    image.src = assetUrl(item.src);
    image.alt = item.name || 'Selected image';
    image.hidden = false;
    empty.hidden = true;
    name.textContent = item.name || 'Selected image';
    help.textContent = 'Click the image card to use it. Position and cropping remain editable in the section controls.';
    const suffix = language === 'sw' ? 'sw' : 'en';
    $('#media-alt-text').value = item[`alt_text_${suffix}`] || '';
    $('#media-caption').value = item[`caption_${suffix}`] || '';
    $('#media-description').value = item[`description_${suffix}`] || '';
    syncMediaSelectionActions();
  }

  function renderMedia() {
    const query = mediaSearch.trim().toLowerCase();
    const visibleMedia = state.media.filter((item) => !query || `${item.name || ''} ${item.src || ''}`.toLowerCase().includes(query));
    const count = $('#media-library-count');
    if (count) count.textContent = `${visibleMedia.length} of ${state.media.length} assets`;
    $('#media-grid').innerHTML = visibleMedia.map((item) => `<button class="media-card" data-action="select-media" data-src="${escapeHtml(item.src)}"><img src="${assetUrl(item.src)}" alt="" /><strong>${escapeHtml(item.name)}</strong><small>${mediaAssignment(item.src) || (item.uploaded ? 'Uploaded asset' : 'Existing website asset')}</small></button>`).join('') || '<p class="media-empty-state">No matching media assets.</p>';
  }

  function openMedia(section, path, { intentional = false } = {}) {
    // The Media Library belongs to page editors only. A stale click, restored
    // DOM state, or legacy dashboard action must never open it on the overview.
    if (!intentional || isDashboard || $('#page-editor-view')?.hidden) return;
    ensureMediaModalPortal();
    if ($('#add-content-modal') && !$('#add-content-modal').hidden) { $('#add-content-modal').hidden = true; addContentModalSuspended = true; }
    mediaFocusReturn = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    mediaTarget = section && path ? { section, path } : null;
    mediaSearch = '';
    if ($('#media-search')) $('#media-search').value = '';
    const previewImage = $('#media-preview-image');
    const previewEmpty = $('#media-preview-empty');
    const previewName = $('#media-preview-name');
    const previewHelp = $('#media-preview-help');
    clearMediaLocalPreview();
    mediaSelectedSrc = '';
    syncMediaSelectionActions();
    if (previewImage) { previewImage.hidden = true; previewImage.removeAttribute('src'); }
    if (previewEmpty) previewEmpty.hidden = false;
    if (previewName) previewName.textContent = 'No image selected';
    if (previewHelp) previewHelp.textContent = 'Choose an existing image or upload a new one. Position and cropping remain editable in the section controls.';
    $('#media-upload').value = '';
    if ($('#media-camera')) $('#media-camera').value = '';
    $('#media-url').value = '';
    $('#media-alt-text').value = '';
    $('#media-caption').value = '';
    $('#media-description').value = '';
    $('#media-metadata-language').textContent = mediaTarget
      ? `Metadata will be saved for ${language === 'sw' ? 'Kiswahili' : 'English'} and attached to the selected image content.`
      : 'Browse the library here, or open an image field from a page editor to attach an asset.';
    setMediaStatus('');
    setMediaBusy(false);
    renderMedia();
    document.body.classList.add('media-picker-open');
    $('#media-backdrop').hidden = false;
    $('#media-modal').hidden = false;
    syncModalScrollLock();
    requestAnimationFrame(focusMediaModal);
  }

  function openMediaLibrary() {
    if (isDashboard) {
      showPageEditor();
      renderSectionList();
      renderForm(false);
    }
    openMedia(null, null, { intentional: true });
  }

  function closeMedia({ force = false } = {}) {
    if (!force && mediaBusy) { showToast('Please wait for the image operation to finish.'); return false; }
    if (!force && hasUnsavedMediaForm() && !window.confirm('The media form has unsaved information. Close it and discard those values?')) return false;
    $('#media-backdrop').hidden = true;
    $('#media-modal').hidden = true;
    clearMediaLocalPreview();
    mediaSelectedSrc = '';
    syncMediaSelectionActions();
    document.body.classList.remove('media-picker-open');
    mediaTarget = null;
    syncModalScrollLock();
    const focusTarget = mediaFocusReturn;
    mediaFocusReturn = null;
    if (addContentModalSuspended && addContentDraft) { $('#add-content-modal').hidden = false; addContentModalSuspended = false; }
    if (focusTarget && document.contains(focusTarget)) focusTarget.focus();
    return true;
  }

  async function saveSelectedMediaMetadata() {
    if (!mediaSelectedSrc || mediaBusy) return;
    const item = state.media.find((candidate) => candidate.src === mediaSelectedSrc);
    if (!item) return;
    const suffix = language === 'sw' ? 'sw' : 'en';
    const metadata = Object.fromEntries(['alt_text_en', 'alt_text_sw', 'caption_en', 'caption_sw', 'description_en', 'description_sw'].map((key) => [key, item[key] || '']));
    metadata[`alt_text_${suffix}`] = $('#media-alt-text').value.trim();
    metadata[`caption_${suffix}`] = $('#media-caption').value.trim();
    metadata[`description_${suffix}`] = $('#media-description').value.trim();
    setMediaBusy(true, 'Saving image metadata…');
    try {
      const result = await apiRequest(`/api/media/${item.id}`, { method: 'PATCH', body: JSON.stringify(metadata) });
      Object.assign(item, result.media, { name: result.media.original_name });
      updateMediaPreview(item.src);
      renderMedia();
      setMediaStatus('Image metadata saved.', 'success');
    } catch (error) {
      setMediaStatus(`Metadata update failed: ${error.message}`, 'error');
      showToast(`Metadata update failed: ${error.message}`);
    } finally { setMediaBusy(false); }
  }

  async function deleteSelectedMedia() {
    if (!mediaSelectedSrc || mediaBusy || !['owner', 'admin'].includes(currentUser?.role)) return;
    const item = state.media.find((candidate) => candidate.src === mediaSelectedSrc);
    if (!item || !window.confirm(`Remove “${item.name || item.original_name}” from the Media Library? Only unused images can be removed.`)) return;
    setMediaBusy(true, 'Removing unused image…');
    try {
      await apiRequest(`/api/media/${item.id}`, { method: 'DELETE', body: JSON.stringify({}) });
      state.media = state.media.filter((candidate) => candidate.src !== mediaSelectedSrc);
      mediaSelectedSrc = '';
      clearMediaLocalPreview();
      const image = $('#media-preview-image');
      if (image) { image.hidden = true; image.removeAttribute('src'); }
      $('#media-preview-empty').hidden = false;
      $('#media-preview-name').textContent = 'No image selected';
      $('#media-preview-help').textContent = 'Choose an existing image or upload a new one. Position and cropping remain editable in the section controls.';
      renderMedia();
      setMediaStatus('Unused image removed.', 'success');
    } catch (error) {
      setMediaStatus(`Remove failed: ${error.message}`, 'error');
      showToast(`Remove failed: ${error.message}`);
    } finally { setMediaBusy(false); }
  }

  function openRevisions() {
    const list = $('#revision-list');
    const revisions = currentRevisions();
    list.innerHTML = revisions.length ? revisions.map((revision, index) => `<div class="revision-row"><div><strong>Published version ${revisions.length - index}</strong><small>${new Date(revision.createdAt).toLocaleString()} · ${revision.language === 'sw' ? 'Kiswahili' : 'English'}</small></div><button data-action="restore-revision" data-id="${revision.id}">Restore</button></div>`).join('') : '<p class="form-intro">No previous published versions have been recorded yet. Publish once to start revision history.</p>';
    $('#revision-backdrop').hidden = false;
    $('#revision-modal').hidden = false;
    syncModalScrollLock();
  }

  function closeRevisions() { $('#revision-backdrop').hidden = true; $('#revision-modal').hidden = true; syncModalScrollLock(); }

  function closeMessages() { $('#messages-backdrop').hidden = true; $('#messages-modal').hidden = true; syncModalScrollLock(); }
  async function openMessages() {
    try {
      const result = await apiRequest('/api/messages');
      $('#messages-list').innerHTML = result.messages.length ? result.messages.map((message) => `<article class="message-row ${message.status === 'handled' ? 'is-handled' : ''}"><div><strong>${escapeHtml(message.type === 'partnership' ? 'Partnership enquiry' : 'Contact enquiry')} · ${escapeHtml(message.name)}</strong><small>${escapeHtml(message.phone)}${message.email ? ` · ${escapeHtml(message.email)}` : ''} · ${new Date(message.created_at).toLocaleString()}</small><p>${escapeHtml(message.message)}</p></div>${message.status === 'new' ? `<button data-action="mark-message" data-id="${message.id}">Mark handled</button>` : '<small>Handled</small>'}</article>`).join('') : '<p class="form-intro">No messages have been received yet.</p>';
      $('#messages-backdrop').hidden = false;
      $('#messages-modal').hidden = false;
      syncModalScrollLock();
    } catch (error) { showToast(`Messages could not load: ${error.message}`); }
  }

  function closeSettings() { $('#settings-backdrop').hidden = true; $('#settings-modal').hidden = true; syncModalScrollLock(); }
  async function openSettings() {
    try {
      const result = await apiRequest('/api/settings');
      const settings = result.settings || {};
      $('#settings-form [name="phone"]').value = settings.phone || '0784 017 225';
      $('#settings-form [name="email"]').value = settings.email || 'info@ecopower.co.tz';
      $('#settings-form [name="address"]').value = settings.address || 'Old Bagamoyo Road, Plot 234, Block D, Silver Sands, Kunduchi, Dar es Salaam';
      $('#settings-status').textContent = '';
      $('#settings-backdrop').hidden = false;
      $('#settings-modal').hidden = false;
      syncModalScrollLock();
    } catch (error) { showToast(`Settings could not load: ${error.message}`); }
  }

  async function saveDraft() { await saveDraftRemote(true); }

  async function publish() {
    if (!window.confirm(`Publish the current ${pageMeta[activePage].label} draft? The public page will use this version.`)) return;
    setCmsBusy(true);
    try {
      const saved = await saveDraftRemote(false);
      if (!saved) throw new Error('Publish cancelled because the latest draft could not be saved.');
      const result = await apiRequest(`/api/pages/${activePage}/publish`, { method: 'POST', body: JSON.stringify({}) });
      if (activePage === 'home') applyRemotePage(result);
      else {
        const page = await apiRequest(`/api/pages/${activePage}`);
        await applyGenericRemotePage(activePage, page);
      }
      // A successful publish makes the two preview modes visually identical
      // until the editor creates a new draft change.
      if (activePage === 'home') {
        state.draft = clone(state.published);
        state.draftRecords = clone(state.publishedRecords);
      } else if (genericState()) {
        const pageState = genericState();
        pageState.draftByLanguage = clone(pageState.publishedByLanguage);
        pageState.draftRecords = clone(pageState.publishedRecords);
      }
      renderSectionList();
      updatePreview();
      $('#draft-status').textContent = 'Published successfully';
      $('#draft-status').classList.add('is-saved');
      updateLastUpdated(new Date().toISOString());
      showToast('Published successfully. Your website has been updated.');
    } catch (error) {
      showToast(`Publish failed: ${error.message}`);
    } finally {
      setCmsBusy(false);
    }
  }

  function setLanguage(next) { language = next === 'sw' ? 'sw' : 'en'; document.querySelectorAll('.language-tab').forEach((tab) => tab.classList.toggle('active', tab.dataset.language === language)); renderForm(); renderSectionList(); updatePreview(); }
  function setPreviewMode(next) {
    const nextMode = next === 'published' ? 'published' : 'draft';
    previewMode = nextMode;
    document.querySelectorAll('.preview-mode').forEach((button) => button.classList.toggle('active', button.dataset.previewMode === previewMode));
    const frame = $('#preview-frame');
    if (frame) frame.src = previewUrl();
    updatePreview();
  }

  function moveSection(id, delta) {
    if (String(id).startsWith('block:')) return moveDynamicBlock(id.slice(6), delta);
    const content = currentPageContent();
    const entries = activePage === 'home' ? sectionMeta.map(([sectionId]) => sectionId) : [...new Set(content.elements.map((element) => element.group || 'content'))];
    const order = Array.isArray(content.sectionOrder) && content.sectionOrder.length ? content.sectionOrder.slice() : entries.slice();
    const index = order.indexOf(id);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= order.length) return;
    [order[index], order[next]] = [order[next], order[index]];
    content.sectionOrder = order;
    renderSectionList();
    persistDraft(false);
  }
  function toggleSection(id) {
    if (String(id).startsWith('block:')) return toggleDynamicBlock(id.slice(6));
    const content = currentPageContent();
    const hidden = hiddenSections(content);
    const index = hidden.indexOf(id);
    if (index >= 0) hidden.splice(index, 1); else hidden.push(id);
    renderSectionList();
    renderForm(false);
    persistDraft(false);
  }

  function aboutItemAction(action, collection, sourceIndex) {
    if (activePage !== 'about' || !aboutSectionIds.has(activeSection)) return;
    const section = aboutSectionContent(activeSection);
    const items = section?.items;
    const index = Number(sourceIndex);
    if (!Array.isArray(items) || !Number.isInteger(index) || !items[index]) return;
    if (action === 'about-item-delete') {
      if (!window.confirm('Delete this About Us item? It will disappear from the public page after you publish.')) return;
      items.splice(index, 1);
    } else if (action === 'about-item-toggle') {
      items[index].visible = items[index].visible === false;
    } else {
      const ordered = orderedAboutItems(items);
      const orderedIndex = ordered.findIndex((entry) => entry.sourceIndex === index);
      const nextIndex = orderedIndex + (action === 'about-item-move-up' ? -1 : 1);
      if (orderedIndex < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
      const swapIndex = ordered[nextIndex].sourceIndex;
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      items.forEach((item, itemIndex) => { item.displayOrder = itemIndex + 1; });
    }
    renderSectionList();
    renderAboutPageForm(false);
    persistDraft(false);
    updatePreview();
  }

  function teamItemAction(action, sourceIndex) {
    if (activePage !== 'team' || !teamSectionIds.has(activeSection)) return;
    const section = teamSectionContent(activeSection);
    const items = section?.items;
    const index = Number(sourceIndex);
    if (!Array.isArray(items) || !Number.isInteger(index) || !items[index]) return;
    if (action === 'team-item-delete') {
      if (!window.confirm('Delete this team member? It will disappear from the public page after you publish.')) return;
      items.splice(index, 1);
    } else if (action === 'team-item-toggle') {
      items[index].visible = items[index].visible === false;
    } else {
      const ordered = orderedAboutItems(items);
      const orderedIndex = ordered.findIndex((entry) => entry.sourceIndex === index);
      const nextIndex = orderedIndex + (action === 'team-item-move-up' ? -1 : 1);
      if (orderedIndex < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
      const swapIndex = ordered[nextIndex].sourceIndex;
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      items.forEach((item, itemIndex) => { item.displayOrder = itemIndex + 1; });
    }
    renderSectionList();
    renderTeamPageForm(false);
    persistDraft(false);
    updatePreview();
  }

  function impactItemAction(action, collection, sourceIndex) {
    if (activePage !== 'impact' || !impactSectionIds.has(collection) || activeSection !== collection) return;
    const section = impactSectionContent(collection);
    const items = section?.items;
    const index = Number(sourceIndex);
    if (!Array.isArray(items) || !Number.isInteger(index) || !items[index]) return;
    if (action === 'impact-item-delete') {
      if (!window.confirm('Delete this Impact item? It will disappear from the public page after you publish.')) return;
      items.splice(index, 1);
    } else if (action === 'impact-item-toggle') {
      items[index].visible = items[index].visible === false;
    } else {
      const ordered = orderedAboutItems(items);
      const orderedIndex = ordered.findIndex((entry) => entry.sourceIndex === index);
      const nextIndex = orderedIndex + (action === 'impact-item-move-up' ? -1 : 1);
      if (orderedIndex < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
      const swapIndex = ordered[nextIndex].sourceIndex;
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      items.forEach((item, itemIndex) => { item.displayOrder = itemIndex + 1; });
    }
    renderSectionList();
    renderImpactPageForm(false);
    persistDraft(false);
    updatePreview();
  }

  function partnerItemAction(action, collection, sourceIndex) {
    if (activePage !== 'partners' || !partnerSectionIds.has(collection) || activeSection !== collection) return;
    const section = partnerSectionContent(collection);
    const items = section?.items;
    const index = Number(sourceIndex);
    if (!Array.isArray(items) || !Number.isInteger(index) || !items[index]) return;
    if (action === 'partner-item-delete') {
      if (!window.confirm('Delete this Partner With Us item? It will disappear from the public page after you publish.')) return;
      items.splice(index, 1);
    } else if (action === 'partner-item-toggle') {
      items[index].visible = items[index].visible === false;
    } else {
      const ordered = orderedAboutItems(items);
      const orderedIndex = ordered.findIndex((entry) => entry.sourceIndex === index);
      const nextIndex = orderedIndex + (action === 'partner-item-move-up' ? -1 : 1);
      if (orderedIndex < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
      const swapIndex = ordered[nextIndex].sourceIndex;
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      items.forEach((item, itemIndex) => { item.displayOrder = itemIndex + 1; });
    }
    renderSectionList();
    renderPartnersPageForm(false);
    persistDraft(false);
    updatePreview();
  }

  function faqItemAction(action, collection, sourceIndex) {
    if (activePage !== 'faq' || !faqSectionIds.has(collection) || activeSection !== collection) return;
    const section = faqSectionContent(collection);
    const items = section?.items;
    const index = Number(sourceIndex);
    if (!Array.isArray(items) || !Number.isInteger(index) || !items[index]) return;
    if (action === 'faq-item-edit') {
      const questionField = document.querySelector(`[data-path="items.${index}.${language}.question"]`);
      questionField?.focus({ preventScroll: true });
      questionField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (action === 'faq-item-delete') {
      if (items[index].isAdded !== true) return;
      if (!window.confirm('Delete this added question? It will disappear from the public page after you publish.')) return;
      items.splice(index, 1);
    } else if (action === 'faq-item-toggle') {
      items[index].visible = items[index].visible === false;
    } else {
      const ordered = orderedAboutItems(items);
      const orderedIndex = ordered.findIndex((entry) => entry.sourceIndex === index);
      const nextIndex = orderedIndex + (action === 'faq-item-move-up' ? -1 : 1);
      if (orderedIndex < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
      const swapIndex = ordered[nextIndex].sourceIndex;
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      items.forEach((item, itemIndex) => { item.displayOrder = itemIndex + 1; });
    }
    renderSectionList();
    renderFaqPageForm(false);
    persistDraft(false);
    updatePreview();
  }

  function productItemAction(action, collection, sourceIndex) {
    if (activePage !== 'products') return;
    const catalog = productsCatalog(currentPageContent());
    const section = catalog?.[activeSection];
    const items = section?.[collection];
    const index = Number(sourceIndex);
    if (!Array.isArray(items) || !Number.isInteger(index) || !items[index]) return;
    if (action === 'product-item-delete') {
      if (!window.confirm('Delete this item? It will disappear from the public page after you publish.')) return;
      items.splice(index, 1);
    } else if (action === 'product-item-toggle') {
      items[index].visible = items[index].visible === false;
    } else {
      const ordered = orderedProductItems(items);
      const orderedIndex = ordered.findIndex((entry) => entry.sourceIndex === index);
      const nextIndex = orderedIndex + (action === 'product-item-move-up' ? -1 : 1);
      if (orderedIndex < 0 || nextIndex < 0 || nextIndex >= ordered.length) return;
      const swapIndex = ordered[nextIndex].sourceIndex;
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
      items.forEach((item, itemIndex) => { item.displayOrder = itemIndex + 1; });
    }
    renderSectionList();
    renderProductsPageForm(false);
    persistDraft(false);
    updatePreview();
  }

  $('#section-list').addEventListener('click', (event) => {
    if (event.target.closest('[data-action]')) return;
    const row = event.target.closest('[data-section]');
    if (!row) return;
    activeSection = row.dataset.section;
    renderSectionList();
    renderForm();
    updatePreview();
  });

  $('#section-form').addEventListener('input', (event) => {
    const formatTarget = event.target.closest('[data-format-path][data-format-key]');
    if (formatTarget) {
      const draft = contentForSection(activeSection);
      setAt(draft, `${formatTarget.dataset.formatPath}.${formatTarget.dataset.formatKey}`, formatControlValue(formatTarget));
      persistDraft(false);
      return;
    }
    const target = event.target.closest('[data-path]');
    if (!target) return;
    const draft = contentForSection(activeSection);
    setAt(draft, target.dataset.path, target.value);
    persistDraft(false);
  });

  $('#section-form').addEventListener('change', (event) => {
    const sensitive = event.target.closest('[data-confirm-change]');
    if (!sensitive || sensitive.value === sensitive.dataset.originalValue) return;
    if (!window.confirm(sensitive.dataset.confirmChange)) {
      sensitive.value = sensitive.dataset.originalValue;
      const draft = contentForSection(activeSection);
      setAt(draft, sensitive.dataset.path, sensitive.dataset.originalValue);
      persistDraft(false);
      return;
    }
    sensitive.dataset.originalValue = sensitive.value;
  });

  document.addEventListener('keydown', (event) => {
    const mediaModal = $('#media-modal');
    if (mediaModal && !mediaModal.hidden) {
      if (event.key === 'Escape') { event.preventDefault(); closeMedia(); return; }
      if (event.key === 'Tab') {
        const focusable = mediaFocusableElements();
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      return;
    }
     if (isMobileViewport() && document.body.classList.contains('mobile-menu-open') && event.key === 'Escape') {
       event.preventDefault();
       setMobileMenuOpen(false);
       return;
     }
     const addModal = $('#add-content-modal');
    if (addModal && !addModal.hidden && event.key === 'Escape') { event.preventDefault(); closeAddContent(); return; }
    if ($('#editor-drawer')?.classList.contains('open') && event.key === 'Escape') { event.preventDefault(); closeDrawer(); }
  });

  document.addEventListener('click', (event) => {
    const notification = event.target.closest('.admin-notification');
    if (notification) {
      setMobileMenuOpen(false);
      if (!closeMedia() || !closeAddContent() || !closeRevisions() || !closeSettings() || !closeDrawer()) return;
      void openMessages();
      return;
    }
    const target = event.target.closest('[data-action], [data-page], [data-toast]');
    if (!target) {
      document.querySelectorAll('.section-overflow-menu:not([hidden])').forEach((menu) => { menu.hidden = true; });
      return;
    }
    if (target.dataset.page) {
      switchPage(target.dataset.page, target);
      return;
    }
    if (target.dataset.toast && !target.dataset.action) {
      showToast(target.dataset.toast);
      return;
    }
    const action = target.dataset.action;
    if (action === 'toggle-sidebar') {
      if (isMobileViewport()) {
        setMobileMenuOpen(!document.body.classList.contains('mobile-menu-open'));
      } else {
        document.body.classList.toggle('sidebar-collapsed');
      }
      return;
    }
    if (action === 'dashboard') { showDashboard(); return; }
    if (action === 'open-pages') { if (!closeMedia() || !closeAddContent() || !closeDrawer()) return; showPageEditor(); renderSectionList(); renderForm(!isMobileViewport()); return; }
    if (action === 'logout') {
      apiRequest('/api/auth/logout', { method: 'POST', body: JSON.stringify({}) }).catch(() => {}).finally(() => showLogin('You have been signed out.'));
      return;
    }
    if (action === 'open-media-library') { setMobileMenuOpen(false); openMediaLibrary(); return; }
    if (action === 'messages') { setMobileMenuOpen(false); openMessages(); return; }
    if (action === 'settings') { setMobileMenuOpen(false); openSettings(); return; }
    if (action === 'close-messages') { closeMessages(); return; }
    if (action === 'close-settings') { closeSettings(); return; }
    if (action === 'open-add-section') { openAddSection(); return; }
    if (action === 'open-add-content') { openAddContent(target.dataset.section || activeSection); return; }
    if (action === 'quick-add-block') { openAddContent(target.dataset.section || activeSection); return; }
    if (action === 'toggle-section-menu') {
      const row = target.closest('.section-row');
      const menu = row?.querySelector('.section-overflow-menu');
      document.querySelectorAll('.section-overflow-menu:not([hidden])').forEach((item) => { if (item !== menu) item.hidden = true; });
      if (menu) { menu.hidden = !menu.hidden; target.setAttribute('aria-expanded', String(!menu.hidden)); }
      return;
    }
    if (action === 'move-section-up') { moveSection(target.dataset.section, -1); return; }
    if (action === 'move-section-down') { moveSection(target.dataset.section, 1); return; }
    if (action === 'toggle-section') { toggleSection(target.dataset.section); return; }
    if (action === 'close-add-content') { closeAddContent(); return; }
    if (action === 'product-item-move-up' || action === 'product-item-move-down' || action === 'product-item-toggle' || action === 'product-item-delete') {
      productItemAction(action, target.dataset.productsCollection, target.dataset.productsIndex);
      return;
    }
    if (action === 'about-item-move-up' || action === 'about-item-move-down' || action === 'about-item-toggle' || action === 'about-item-delete') {
      aboutItemAction(action, target.dataset.aboutCollection, target.dataset.aboutIndex);
      return;
    }
    if (action === 'team-item-move-up' || action === 'team-item-move-down' || action === 'team-item-toggle' || action === 'team-item-delete') {
      teamItemAction(action, target.dataset.teamIndex);
      return;
    }
    if (action === 'impact-item-move-up' || action === 'impact-item-move-down' || action === 'impact-item-toggle' || action === 'impact-item-delete') {
      impactItemAction(action, target.dataset.impactCollection, target.dataset.impactIndex);
      return;
    }
    if (action === 'partner-item-move-up' || action === 'partner-item-move-down' || action === 'partner-item-toggle' || action === 'partner-item-delete') {
      partnerItemAction(action, target.dataset.partnerCollection, target.dataset.partnerIndex);
      return;
    }
    if (action === 'faq-item-edit' || action === 'faq-item-move-up' || action === 'faq-item-move-down' || action === 'faq-item-toggle' || action === 'faq-item-delete') {
      faqItemAction(action, target.dataset.faqCollection, target.dataset.faqIndex);
      return;
    }
    if (action === 'move-block-up') { moveDynamicBlock(target.dataset.blockId, -1); return; }
    if (action === 'move-block-down') { moveDynamicBlock(target.dataset.blockId, 1); return; }
    if (action === 'toggle-block') { toggleDynamicBlock(target.dataset.blockId); return; }
    if (action === 'delete-block') { deleteDynamicBlock(target.dataset.blockId); return; }
    if (action === 'add-card') {
      const pending = addContentDraft?.block?.id === target.dataset.blockId ? addContentDraft.block : null;
      const block = pending || dynamicBlocks().find((item) => item.id === target.dataset.blockId);
      if (block) { block.cards.push(newCard(`${block.id}-card-${block.cards.length + 1}`)); pending ? renderAddContentModalForm() : (renderDynamicBlockForm(false), persistDraft(false)); }
      return;
    }
    if (action === 'remove-card' || action === 'move-card-up' || action === 'move-card-down') {
      const pending = addContentDraft?.block?.id === target.dataset.blockId ? addContentDraft.block : null;
      const block = pending || dynamicBlocks().find((item) => item.id === target.dataset.blockId);
      const index = Number(target.dataset.cardIndex);
      if (block && Array.isArray(block.cards)) {
        if (action === 'remove-card') block.cards.splice(index, 1);
        else moveNested(block.cards, index, action === 'move-card-up' ? -1 : 1);
        if (pending) renderAddContentModalForm();
        else { renderDynamicBlockForm(false); persistDraft(false); }
      }
      return;
    }
    if (action === 'add-gallery-image') {
      const pending = addContentDraft?.block?.id === target.dataset.blockId ? addContentDraft.block : null;
      const block = pending || dynamicBlocks().find((item) => item.id === target.dataset.blockId);
      if (block) { block.images.push(newGalleryImage(`${block.id}-image-${block.images.length + 1}`)); pending ? renderAddContentModalForm() : (renderDynamicBlockForm(false), persistDraft(false)); }
      return;
    }
    if (action === 'remove-gallery-image' || action === 'move-gallery-image' || action === 'move-gallery-image-down') {
      const pending = addContentDraft?.block?.id === target.dataset.blockId ? addContentDraft.block : null;
      const block = pending || dynamicBlocks().find((item) => item.id === target.dataset.blockId);
      const index = Number(target.dataset.imageIndex);
      if (block && Array.isArray(block.images)) {
        if (action === 'remove-gallery-image') block.images.splice(index, 1);
        else moveNested(block.images, index, action === 'move-gallery-image' ? -1 : 1);
        if (pending) renderAddContentModalForm();
        else { renderDynamicBlockForm(false); persistDraft(false); }
      }
      return;
    }
    if (action === 'mark-message') { apiRequest(`/api/messages/${target.dataset.id}`, { method: 'PATCH', body: JSON.stringify({ status: 'handled' }) }).then(openMessages).catch((error) => showToast(error.message)); return; }
    if (action === 'toggle-pages') {
      const pageList = $('#page-nav-list');
      const isOpen = target.getAttribute('aria-expanded') === 'true';
      pageList.classList.toggle('is-collapsed', isOpen);
      target.setAttribute('aria-expanded', String(!isOpen));
      const chevron = target.querySelector('.nav-chevron');
      if (chevron) chevron.textContent = isOpen ? '⌄' : '⌃';
      return;
    }
    if (action === 'edit-section') { if (!closeAddContent() || !closeDrawer()) return; activeSection = target.dataset.section; showPageEditor(); renderSectionList(); renderForm(); updatePreview(); }
    if (action === 'save-draft') saveDraft();
    if (action === 'publish') publish();
    if (action === 'close-drawer') closeDrawer();
    if (action === 'drawer-media') { if (activePage === 'home') openMedia(activeSection, 'image', { intentional: true }); else showToast('Select an image field below to choose the replacement.'); }
    if (action === 'media') openMedia(target.dataset.section || activeSection, target.dataset.path, { intentional: true });
    if (action === 'close-media') closeMedia();
    if (action === 'save-media-metadata') { void saveSelectedMediaMetadata(); return; }
    if (action === 'delete-media') { void deleteSelectedMedia(); return; }
    if (action === 'select-media' && !mediaTarget) {
      updateMediaPreview(target.dataset.src);
      showToast('Open an image field from a page editor to attach this asset.');
      return;
    }
    if (action === 'select-media' && mediaTarget) {
      const targetSection = mediaTarget.section;
      const targetPath = mediaTarget.path;
      const selectedSrc = target.dataset.src;
      setSharedImageAt(targetSection, targetPath, selectedSrc);
      draftChangeVersion += 1;
      closeMedia({ force: true });
      updateMediaPicker(targetPath, selectedSrc, targetSection);
      if (targetSection === '__new-content__') { renderAddContentModalForm(); focusMediaTargetButton(targetSection, targetPath); showToast('Image selected for the new content block.'); return; }
      updatePreview();
      // Image selection is a content change. Persist it immediately so a
      // page switch, refresh, or publish cannot race the debounced text save.
      void saveDraftRemote(true);
      showToast('Image replaced in the draft.');
    }
    if (action === 'open-preview') { updatePreview(); window.open(`/${pageMeta[activePage].file}?cmsPreview=1&previewMode=${previewMode}&externalPreview=1`, '_blank', 'noopener'); }
    if (action === 'view-public') window.open(`/${pageMeta[activePage].file}`, '_blank', 'noopener');
    if (action === 'refresh-preview') { $('#preview-frame').src = previewUrl(); }
    if (action === 'dismiss-notice') target.closest('.admin-notice').remove();
    if (action === 'open-revisions') openRevisions();
    if (action === 'close-revisions') closeRevisions();
    if (action === 'restore-revision') { if (window.confirm('Restore this version into the current draft?')) { apiRequest(`/api/pages/${activePage}/restore/${target.dataset.id}`, { method: 'POST', body: JSON.stringify({}) }).then(async (result) => { if (activePage === 'home') applyRemotePage(result); else { const page = await apiRequest(`/api/pages/${activePage}`); await applyGenericRemotePage(activePage, page); } setPreviewMode('draft'); closeRevisions(); renderSectionList(); renderForm(); updatePreview(); showToast('Revision restored to the draft.'); }).catch((error) => showToast(`Restore failed: ${error.message}`)); } }
    if (target.dataset.toast) showToast(target.dataset.toast);
  });

  document.querySelectorAll('.language-tab').forEach((tab) => tab.addEventListener('click', () => setLanguage(tab.dataset.language)));
  document.querySelectorAll('.preview-mode').forEach((button) => button.addEventListener('click', () => setPreviewMode(button.dataset.previewMode)));
  document.querySelectorAll('.preview-size').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('.preview-size').forEach((item) => item.classList.remove('active')); button.classList.add('active'); $('#preview-stage').className = `preview-stage ${button.dataset.view}`; sendPreview(); }));
  const drawerTitle = $('#drawer-title');
  const drawerDescription = $('#drawer-description');
  const syncDrawerSummary = () => {
    const title = $('#drawer-mobile-title');
    const description = $('#drawer-mobile-description');
    if (title && drawerTitle) title.textContent = drawerTitle.textContent;
    if (description && drawerDescription) description.textContent = drawerDescription.textContent;
  };
  if (drawerTitle && drawerDescription && window.MutationObserver) {
    const drawerSummaryObserver = new MutationObserver(syncDrawerSummary);
    drawerSummaryObserver.observe(drawerTitle, { childList: true, characterData: true, subtree: true });
    drawerSummaryObserver.observe(drawerDescription, { childList: true, characterData: true, subtree: true });
  }
  syncDrawerSummary();
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === 'ecopower-cms-preview-ready') sendPreview();
  });
  $('#preview-frame').addEventListener('load', () => { sendPreview(); setTimeout(bindPreviewClicks, 250); });

  function uploadMediaViaServer(formData, onProgress) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', '/api/media');
      request.withCredentials = true;
      request.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
      });
      request.addEventListener('load', () => {
        let data;
        try { data = request.responseText ? JSON.parse(request.responseText) : null; } catch { data = null; }
        if (request.status < 200 || request.status >= 300) return reject(new Error(data?.error || `Upload failed with status ${request.status}.`));
        return resolve(data?.media);
      });
      request.addEventListener('error', () => reject(new Error('The image upload could not reach the CMS.')));
      request.addEventListener('timeout', () => reject(new Error('The image upload timed out.')));
      request.timeout = 120000;
      request.send(formData);
    });
  }

  function uploadBlobDirectly(pathname, clientToken, file, onProgress) {
    return new Promise((resolve, reject) => {
      const storeId = clientToken.split('_')[3];
      if (!storeId) return reject(new Error('The CMS returned an invalid secure upload token.'));
      const request = new XMLHttpRequest();
      const uploadUrl = `https://vercel.com/api/blob/?pathname=${encodeURIComponent(pathname)}`;
      request.open('PUT', uploadUrl, true);
      request.setRequestHeader('authorization', `Bearer ${clientToken}`);
      request.setRequestHeader('x-vercel-blob-store-id', storeId);
      request.setRequestHeader('x-api-version', '13');
      request.setRequestHeader('x-api-blob-request-id', `${storeId}:${Date.now()}:${Math.random().toString(16).slice(2)}`);
      request.setRequestHeader('x-content-length', String(file.size));
      request.setRequestHeader('x-vercel-blob-access', 'public');
      request.setRequestHeader('x-content-type', file.type);
      request.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
      });
      request.addEventListener('load', () => {
        let data;
        try { data = request.responseText ? JSON.parse(request.responseText) : null; } catch { data = null; }
        if (request.status < 200 || request.status >= 300) return reject(new Error(data?.error?.message || data?.error || `Direct Blob upload failed with status ${request.status}.`));
        if (!data?.pathname && !data?.url) return reject(new Error('The Blob store did not confirm the uploaded image.'));
        return resolve(data);
      });
      request.addEventListener('error', () => reject(new Error('The direct image upload could not reach Vercel Blob.')));
      request.addEventListener('timeout', () => reject(new Error('The direct image upload timed out.')));
      request.timeout = 180000;
      request.send(file);
    });
  }

  async function uploadMediaWithProgress(file, metadata, onProgress) {
    const extension = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif', 'image/gif': 'gif' }[file.type];
    if (!extension) throw new Error('Please upload a JPEG, PNG, WebP, AVIF or GIF image.');
    const uploadId = window.crypto?.randomUUID?.() || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => { const random = Math.random() * 16 | 0; const value = character === 'x' ? random : random & 3 | 8; return value.toString(16); });
    const pathname = `public/${uploadId}.${extension}`;
    let tokenResult;
    try {
      tokenResult = await apiRequest('/api/media/client-upload', { method: 'POST', body: JSON.stringify({ type: 'blob.generate-client-token', payload: { pathname, clientPayload: null, multipart: false } }) });
    } catch (error) {
      if (error.status !== 404) throw error;
      const formData = new FormData();
      formData.append('file', file);
      Object.entries(metadata).forEach(([key, value]) => formData.append(key, value));
      setMediaBusy(true, 'Uploading image to the CMS… 0%');
      return uploadMediaViaServer(formData, onProgress);
    }
    if (!tokenResult?.clientToken) throw new Error('The CMS could not prepare a secure image upload.');
    await uploadBlobDirectly(pathname, tokenResult.clientToken, file, onProgress);
    setMediaBusy(true, 'Saving image metadata…');
    const completed = await apiRequest('/api/media/client-upload/complete', { method: 'POST', body: JSON.stringify({ pathname, original_name: file.name, mime_type: file.type, metadata }) });
    if (!completed?.media) throw new Error('The CMS did not return the stored image record.');
    return completed.media;
  }

  async function assignUploadedMedia(uploaded, targetSection, targetPath, successMessage) {
    if (!uploaded?.id || !uploaded.src) throw new Error('The CMS did not return a usable stored image.');
    const item = { ...uploaded, name: uploaded.original_name, uploaded: true };
    state.media.unshift(item);
    setSharedImageAt(targetSection, targetPath, item.src);
    applyImportedMetadata(targetSection, targetPath, item);
    draftChangeVersion += 1;
    updateMediaPreview(item.src);
    updateMediaPicker(targetPath, item.src, targetSection);
    if (targetSection === '__new-content__') {
      closeMedia({ force: true });
      renderAddContentModalForm();
      focusMediaTargetButton(targetSection, targetPath);
      showToast('Image uploaded and attached to the new content block.');
      return;
    }
    updatePreview();
    const saved = await saveDraftRemote(true);
    if (saved) {
      closeMedia({ force: true });
      showToast(successMessage);
    } else {
      setMediaStatus('The image is stored, but the page draft could not be saved. Keep this modal open and try Save draft again.', 'error');
    }
  }

  const handleMediaFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file || !mediaTarget || mediaBusy) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'].includes(file.type)) { showToast('Please upload a JPEG, PNG, WebP, AVIF or GIF image.'); return; }
    if (file.size > 10 * 1024 * 1024) { showToast('Image must be smaller than 10 MB.'); return; }
    showMediaFilePreview(file);
    setMediaStatus(`Selected ${file.name}. Preparing secure upload…`, 'busy');
    const targetSection = mediaTarget.section;
    const targetPath = mediaTarget.path;
    const metadata = mediaMetadata();
    setMediaBusy(true, 'Validating image…');
    setMediaStatus('Validating image…', 'busy');
    requestAnimationFrame(() => setMediaBusy(true, 'Uploading image to Preview Blob… 0%'));
    uploadMediaWithProgress(file, metadata, (percent) => setMediaBusy(true, `Uploading image directly to Preview Blob… ${percent}%`)).then((uploaded) => assignUploadedMedia(uploaded, targetSection, targetPath, 'Image uploaded, saved to the draft, and ready to publish.')).catch((error) => { setMediaStatus(`Upload failed: ${error.message}`, 'error'); showToast(`Upload failed: ${error.message}`); }).finally(() => { setMediaBusy(false); event.target.value = ''; });
  };
  const mediaFileInputs = [$('#media-upload')].filter(Boolean);
  const cameraInput = document.createElement('input');
  cameraInput.type = 'file';
  cameraInput.id = 'media-camera';
  cameraInput.accept = 'image/*';
  cameraInput.setAttribute('capture', 'environment');
  const cameraLabel = document.createElement('label');
  cameraLabel.className = 'upload-button camera-upload-button';
  cameraLabel.append(cameraInput, 'Use Camera');
  $('#media-upload')?.closest('.upload-row')?.append(cameraLabel);
  mediaFileInputs.push(cameraInput);
  mediaFileInputs.forEach((input) => input.addEventListener('change', handleMediaFileChange));

  $('#media-url-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!mediaTarget || mediaBusy) return;
    const sourceUrl = $('#media-url').value.trim();
    if (!sourceUrl) return;
    const targetSection = mediaTarget.section;
    const targetPath = mediaTarget.path;
    const metadata = mediaMetadata();
    setMediaBusy(true, 'Validating image URL…');
    try {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      setMediaBusy(true, 'Uploading validated image to Preview Blob…');
      const result = await apiRequest('/api/media/import', { method: 'POST', body: JSON.stringify({ url: sourceUrl, ...metadata }) });
      await assignUploadedMedia(result.media, targetSection, targetPath, 'External image imported, saved to the draft, and ready to publish.');
    } catch (error) {
      setMediaStatus(`Import failed: ${error.message}`, 'error');
      showToast(`Import failed: ${error.message}`);
    } finally {
      setMediaBusy(false);
    }
  });

  $('#media-search').addEventListener('input', (event) => {
    mediaSearch = event.target.value;
    renderMedia();
  });
  $('#sidebar-search-input')?.addEventListener('input', (event) => {
    filterSidebarNavigation(event.target.value);
  });
  $('#sidebar-search-clear')?.addEventListener('click', () => {
    const search = $('#sidebar-search-input');
    if (!search) return;
    search.value = '';
    filterSidebarNavigation('');
    search.focus();
  });
  $('#media-grid').addEventListener('pointerover', (event) => {
    const card = event.target.closest('.media-card');
    if (card?.dataset.src) updateMediaPreview(card.dataset.src);
  });
  $('#media-grid').addEventListener('focusin', (event) => {
    const card = event.target.closest('.media-card');
    if (card?.dataset.src) updateMediaPreview(card.dataset.src);
  });

  $('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button[type="submit"]');
    button.disabled = true;
    $('#login-error').textContent = '';
    try {
      const result = await apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: $('#login-email').value, password: $('#login-password').value }) });
      setAuthenticatedUser(result.user);
      await loadRemoteState();
      ensureAddNewSectionButton();
      showDashboard();
      void bootstrapPageNavStats();
    } catch (error) {
      showLogin(error.message);
    } finally {
      button.disabled = false;
    }
  });

  $('#settings-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const settings = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await apiRequest('/api/settings', { method: 'PUT', body: JSON.stringify({ settings }) });
      $('#settings-status').textContent = 'Settings saved securely.';
      showToast('Website settings saved.');
    } catch (error) { $('#settings-status').textContent = error.message; }
  });

  function ensureAddNewSectionButton() {
    const workspace = document.querySelector('.admin-workspace');
    if (!workspace || workspace.querySelector('.add-new-section-button')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'admin-button button-green add-new-section-button';
    button.dataset.action = 'open-add-section';
    button.innerHTML = '<span aria-hidden="true">+</span> Add New Section';
    workspace.append(button);
  }

  (async function boot() {
    try {
      const result = await apiRequest('/api/auth/me');
      setAuthenticatedUser(result.user);
      await loadRemoteState();
      ensureAddNewSectionButton();
      showDashboard();
      void bootstrapPageNavStats();
    } catch (error) {
      if (/not authenticated|authentication required|session/i.test(error.message)) showLogin();
      else showLogin(`Could not connect to the CMS backend: ${error.message}`);
    }
  }());
})();
