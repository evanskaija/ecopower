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

  const pageMeta = {
    home: { label: 'Home', file: 'index.html' },
    products: { label: 'Products and Prices', file: 'products.html' },
    about: { label: 'About Us', file: 'about.html' },
    team: { label: 'Our Team', file: 'team.html' },
    impact: { label: 'Our Results', file: 'impact.html' },
    partners: { label: 'Partner With Us', file: 'partners.html' },
    faq: { label: 'Questions', file: 'faq.html' },
    contact: { label: 'Contact Us', file: 'contact.html' }
  };
  const genericTextSelector = 'main h1, main h2, main h3, main p, main strong, main span, main a, main button, footer h3, footer p, footer span, footer a';
  const genericImageSelector = 'main img, footer img';

  const baseContent = {
    hero: {
      image: 'EcoPower_all_extracted_images/page_01_image_003.jpeg',
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

  baseContent.blocks = [];

  const initialMedia = [
    ['hero-brand', 'Makange brand mark', 'EcoPower_all_extracted_images/page_01_image_002.png'],
    ['hero-delivery', 'Hero delivery tricycle', 'EcoPower_all_extracted_images/page_01_image_003.jpeg'],
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
  let previewMode = 'draft';
  let mediaTarget = null;
  let mediaBusy = false;
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

  function setCmsBusy(busy) {
    document.querySelectorAll('[data-action="save-draft"], [data-action="publish"], [data-action="commit-add-content"]').forEach((button) => {
      button.disabled = busy;
      button.setAttribute('aria-busy', String(busy));
    });
  }

  function setMediaBusy(busy, message = '') {
    mediaBusy = busy;
    setCmsBusy(busy);
    const upload = $('#media-upload');
    const uploadLabel = upload?.closest('.upload-button');
    const urlForm = $('#media-url-form');
    const urlButton = urlForm?.querySelector('button[type="submit"]');
    if (upload) upload.disabled = busy;
    if (uploadLabel) uploadLabel.classList.toggle('is-busy', busy);
    if (urlButton) { urlButton.disabled = busy; urlButton.setAttribute('aria-busy', String(busy)); }
    const status = $('#media-upload-status');
    if (status && message) { status.textContent = message; status.className = `media-upload-status ${busy ? 'is-busy' : ''}`; }
  }

  function setMediaStatus(message, kind = '') {
    const status = $('#media-upload-status');
    if (!status) return;
    status.textContent = message;
    status.className = `media-upload-status${kind ? ` is-${kind}` : ''}`;
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
    if (!response.ok) throw new Error(data?.error || `Request failed with status ${response.status}.`);
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
      renderSectionList();
      renderForm(false);
      updatePreview();
      $('#draft-status').textContent = page.draft?.[language] ? 'Draft loaded from database' : 'No draft saved yet';
      $('#draft-status').classList.toggle('is-saved', Boolean(page.draft?.[language]));
      updateLastUpdated(page.draft?.[language]?.updated_at || page.published?.[language]?.updated_at);
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
    activeSection = slug === 'home' ? 'hero' : 'generic-text';
    $('#dashboard-view').hidden = true;
    $('#dashboard-reference-view').hidden = true;
    $('#page-editor-view').hidden = false;
    document.querySelectorAll('.admin-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.action === 'toggle-pages'));
    document.querySelector('.admin-breadcrumb span').textContent = 'Website Pages';
    document.querySelectorAll('.page-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.page === slug));
    document.querySelector('.admin-breadcrumb strong').textContent = pageMeta[slug].label;
    document.querySelector('#page-editor-view .admin-heading-row h1').textContent = `${pageMeta[slug].label} page`;
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
    resetTransientModals();
    $('#dashboard-view').hidden = true;
    $('#dashboard-reference-view').hidden = false;
    $('#page-editor-view').hidden = true;
    document.querySelectorAll('.admin-nav-item').forEach((item) => item.classList.toggle('active', item.dataset.action === 'dashboard'));
    document.querySelectorAll('.page-nav-item').forEach((item) => item.classList.remove('active'));
    document.querySelector('.admin-breadcrumb span').textContent = 'Dashboard';
    document.querySelector('.admin-breadcrumb strong').textContent = 'Overview';
    updateDashboardMetrics();
  }
  function showPageEditor() {
    isDashboard = false;
    document.body.classList.remove('dashboard-mode');
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

  function normalizeGenericContent(slug, content, defaults) {
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
    return {
      elements,
      blocks: Array.isArray(content?.blocks) ? clone(content.blocks) : [],
      sectionOrder: Array.isArray(content?.sectionOrder) ? content.sectionOrder.slice() : [],
      hiddenSections: Array.isArray(content?.hiddenSections) ? content.hiddenSections.slice() : []
    };
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
      draftByLanguage[code] = normalizeGenericContent(slug, draft || published, defaults);
      publishedByLanguage[code] = normalizeGenericContent(slug, published, defaults);
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
    activeSection = genericContent(slug).elements[0]?.group || (firstBlock ? `block:${firstBlock.id}` : 'content');
  }

  function currentDraft() { return activePage === 'home' ? state.draft : genericContent(); }
  function currentPublished() { return activePage === 'home' ? state.published : genericPublished(); }
  function currentRevisions() { return activePage === 'home' ? state.revisions : (genericState()?.revisions || []); }

  function currentPageContent() { return currentDraft(); }
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
  function contentForSection(section = activeSection) {
    if (section === '__new-content__') return addContentDraft?.block || {};
    const dynamic = dynamicBlockForSection(section);
    if (dynamic) return dynamic;
    return activePage === 'home' ? state.draft[homeSectionSource(section)] : genericContent();
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
    editorSession = null;
    document.body.classList.remove('modal-open', 'media-picker-open');
  }

  resetTransientModals();
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
    const select = (key, label, choices) => `<label><span>${label}</span><select class="format-select" data-format-path="${path}" data-format-key="${key}">${choices.map((choice) => `<option value="${choice}" ${value[key] === choice ? 'selected' : ''}>${choice[0].toUpperCase()}${choice.slice(1)}</option>`).join('')}</select></label>`;
    const toggle = (key, label, selected) => `<label class="format-toggle"><input type="checkbox" data-format-path="${path}" data-format-key="${key}" ${selected ? 'checked' : ''} /><span>${label}</span></label>`;
    return `<div class="format-toolbar" aria-label="Text formatting"><div class="format-toolbar-main">${select('size', 'Font size', ['small', 'medium', 'large', 'display'])}${select('font', 'Font family', ['sans', 'serif', 'display'])}${select('color', 'Text color', ['ink', 'forest', 'muted', 'accent'])}${toggle('weight', 'Bold', value.weight === 'bold')}${toggle('style', 'Italic', value.style === 'italic')}${select('align', 'Alignment', ['left', 'center', 'right'])}</div><details class="format-advanced"><summary>Advanced formatting</summary><div class="format-toolbar-advanced">${select('spacing', 'Spacing', ['tight', 'normal', 'loose'])}${select('heading', 'Level', ['p', 'h2', 'h3'])}</div></details></div>`;
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
    if (type === 'stove') { block.image = ''; block.position = 'center'; }
    if (type === 'product') { block.price = ''; block.link = 'https://wa.me/255784017225'; }
    if (type === 'stove') block.price = '';
    if (type === 'partner' || type === 'testimonial') { block.image = state.media[0]?.src || 'EcoPower_all_extracted_images/page_01_image_002.png'; block.position = 'center'; }
    if (type === 'cards') block.cards = [newCard(`${block.id}-card-1`)];
    if (type === 'gallery') block.images = [newGalleryImage(`${block.id}-image-1`)];
    return block;
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
    if (open) { drawer.setAttribute('aria-hidden', 'false'); drawer.classList.add('open'); $('#drawer-backdrop').hidden = false; syncModalScrollLock(); }
  }

  function pendingMediaPicker(label, path, value, options = {}) {
    const previousSection = activeSection;
    activeSection = '__new-content__';
    const markup = mediaPicker(label, path, value, { ...options, section: '__new-content__' });
    activeSection = previousSection;
    return markup;
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
    const titles = { product: 'Add briquette', payment: 'Add payment content', stove: 'Add stove', partner: 'Add partner' };
    $('#add-content-title').textContent = titles[addContentDraft.block.type] || 'Add content';
    $('#add-content-fields').innerHTML = renderPendingBlockFields(addContentDraft.block);
  }

  async function commitAddContent() {
    if (!addContentDraft) return;
    const { section, block } = addContentDraft;
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

  function sectionActionButtons(id, isDynamic = false) {
    if (isDynamic) return `<div class="section-row-actions"><button class="section-action primary-section-action" data-action="edit-section" data-section="${escapeHtml(id)}">Edit</button></div>`;
    const addButton = canAddContent(id) ? `<button class="section-action add-content-action" data-action="open-add-content" data-section="${escapeHtml(id)}">Add Content</button>` : '';
    return `<div class="section-row-actions"><button class="section-action primary-section-action" data-action="edit-section" data-section="${escapeHtml(id)}">Edit</button>${addButton}</div>`;
  }

  function staticSectionRow(id, label, description, index) {
    const hidden = sectionIsHidden(id);
    const dirty = activePage === 'home' ? sectionIsDirty(id) : pageIsDirty();
    return `<div class="section-row ${id === activeSection ? 'active' : ''} ${hidden ? 'is-hidden' : ''}" data-section="${escapeHtml(id)}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(label)}${dirty ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${hidden ? 'Hidden on the public page' : escapeHtml(description)}</small></div>${sectionActionButtons(id)}</div>`;
  }

  function dynamicBlockRow(block, index) {
    const copy = blockCopyForEditor(block, language);
    const label = copy.heading || copy.title || ({ text: 'Added text', image: 'Added image', imageText: 'Added image and text', cards: 'Added products', gallery: 'Added gallery', product: 'Added briquette', payment: 'Added payment content', stove: 'Added stove', partner: 'Added partner', testimonial: 'Added customer testimonial', cta: 'Added call to action' }[block.type] || 'Added content');
    return `<div class="section-row dynamic-section-row ${`block:${block.id}` === activeSection ? 'active' : ''} ${block.visible === false ? 'is-hidden' : ''}" data-section="block:${escapeHtml(block.id)}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(label)}${sectionIsDirty(`block:${block.id}`) ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${block.visible === false ? 'Hidden' : 'Added content'}</small></div>${sectionActionButtons(`block:${block.id}`, true)}</div>`;
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
    syncModalScrollLock();
    return true;
  }
  function openAddContent(section = activeSection) {
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
    if (open) {
      $('#editor-drawer').setAttribute('aria-hidden', 'false');
      $('#editor-drawer').classList.add('open');
      $('#drawer-backdrop').hidden = false;
      syncModalScrollLock();
    }
  }

  function renderForm(open = true) {
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
    if (open) {
      drawer.setAttribute('aria-hidden', 'false');
      drawer.classList.add('open');
      $('#drawer-backdrop').hidden = false;
      syncModalScrollLock();
    }
  }

  function renderSectionList() {
    if (activePage !== 'home') return renderGenericSectionList();
    const blocks = dynamicBlocks(state.draft);
    $('#section-count').textContent = `${sectionMeta.length + blocks.length} sections`;
    $('#section-list').innerHTML = sectionMeta.map(([id, label, description], index) => `<div class="section-row ${id === activeSection ? 'active' : ''}" data-section="${id}"><span class="section-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${label}${sectionIsDirty(id) ? ' <span class="section-image-dot"></span>' : ''}</strong><small>${description}</small></div><button class="section-action" data-action="edit-section" data-section="${id}">Edit</button></div>`).join('') + blocks.map((block, index) => dynamicBlockRow(block, index + sectionMeta.length)).join('');
  }

  function renderGenericSectionList() {
    const content = genericContent();
    const groups = [...new Map(content.elements.map((element) => [element.group || 'content', { id: element.group || 'content', label: element.groupLabel || 'Page content' }])).values()];
    const rows = orderedSectionRows(groups.map((group) => ({ id: group.id, label: group.label, description: `${content.elements.filter((element) => (element.group || 'content') === group.id).length} editable fields` })), content);
    $('#section-count').textContent = `${groups.length + dynamicBlocks(content).length} page sections`;
    $('#section-list').innerHTML = rows;
  }

  function renderSectionList() {
    if (activePage !== 'home') return renderGenericSectionList();
    const rows = orderedSectionRows(sectionMeta.map(([id, label, description]) => ({ id, label, description })), state.draft);
    $('#section-count').textContent = `${sectionMeta.length + dynamicBlocks(state.draft).length} sections`;
    $('#section-list').innerHTML = rows;
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
    $('#editor-drawer').classList.remove('open');
    $('#editor-drawer').setAttribute('aria-hidden', 'true');
    $('#drawer-backdrop').hidden = true;
    editorSession = null;
    syncModalScrollLock();
    return true;
  }

  function renderMedia() {
    $('#media-grid').innerHTML = state.media.map((item) => `<button class="media-card" data-action="select-media" data-src="${escapeHtml(item.src)}"><img src="${assetUrl(item.src)}" alt="" /><strong>${escapeHtml(item.name)}</strong><small>${mediaAssignment(item.src) || (item.uploaded ? 'Uploaded asset' : 'Existing website asset')}</small></button>`).join('');
  }

  function openMedia(section, path, { intentional = false } = {}) {
    // The Media Library belongs to page editors only. A stale click, restored
    // DOM state, or legacy dashboard action must never open it on the overview.
    if (!intentional || isDashboard || $('#page-editor-view')?.hidden) return;
    ensureMediaModalPortal();
    mediaFocusReturn = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    mediaTarget = { section, path };
    $('#media-upload').value = '';
    $('#media-url').value = '';
    $('#media-alt-text').value = '';
    $('#media-caption').value = '';
    $('#media-description').value = '';
    $('#media-metadata-language').textContent = `Metadata will be saved for ${language === 'sw' ? 'Kiswahili' : 'English'} and attached to the selected image content.`;
    setMediaStatus('');
    setMediaBusy(false);
    renderMedia();
    document.body.classList.add('media-picker-open');
    $('#media-backdrop').hidden = false;
    $('#media-modal').hidden = false;
    syncModalScrollLock();
    requestAnimationFrame(focusMediaModal);
  }

  function closeMedia({ force = false } = {}) {
    if (!force && mediaBusy) { showToast('Please wait for the image operation to finish.'); return false; }
    if (!force && hasUnsavedMediaForm() && !window.confirm('The media form has unsaved information. Close it and discard those values?')) return false;
    $('#media-backdrop').hidden = true;
    $('#media-modal').hidden = true;
    document.body.classList.remove('media-picker-open');
    mediaTarget = null;
    syncModalScrollLock();
    const focusTarget = mediaFocusReturn;
    mediaFocusReturn = null;
    if (focusTarget && document.contains(focusTarget)) focusTarget.focus();
    return true;
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
    const addModal = $('#add-content-modal');
    if (addModal && !addModal.hidden && event.key === 'Escape') { event.preventDefault(); closeAddContent(); return; }
    if ($('#editor-drawer')?.classList.contains('open') && event.key === 'Escape') { event.preventDefault(); closeDrawer(); }
  });

  document.addEventListener('click', (event) => {
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
    if (action === 'toggle-sidebar') { document.body.classList.toggle('sidebar-collapsed'); return; }
    if (action === 'dashboard') { showDashboard(); return; }
    if (action === 'open-pages') { if (!closeMedia() || !closeAddContent() || !closeDrawer()) return; showPageEditor(); renderSectionList(); renderForm(false); return; }
    if (action === 'logout') {
      apiRequest('/api/auth/logout', { method: 'POST', body: JSON.stringify({}) }).catch(() => {}).finally(() => showLogin('You have been signed out.'));
      return;
    }
    if (action === 'messages') { openMessages(); return; }
    if (action === 'settings') { openSettings(); return; }
    if (action === 'close-messages') { closeMessages(); return; }
    if (action === 'close-settings') { closeSettings(); return; }
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
    if (action === 'select-media' && mediaTarget) {
      const targetSection = mediaTarget.section;
      const targetPath = mediaTarget.path;
      const selectedSrc = target.dataset.src;
      setAt(contentForSection(targetSection), targetPath, selectedSrc);
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
  window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === 'ecopower-cms-preview-ready') sendPreview();
  });
  $('#preview-frame').addEventListener('load', () => { sendPreview(); setTimeout(bindPreviewClicks, 250); });

  function uploadMediaWithProgress(formData, onProgress) {
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

  async function assignUploadedMedia(uploaded, targetSection, targetPath, successMessage) {
    const item = { ...uploaded, name: uploaded.original_name, uploaded: true };
    state.media.unshift(item);
    setAt(contentForSection(targetSection), targetPath, item.src);
    applyImportedMetadata(targetSection, targetPath, item);
    draftChangeVersion += 1;
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

  $('#media-upload').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file || !mediaTarget || mediaBusy) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'].includes(file.type)) { showToast('Please upload a JPEG, PNG, WebP, AVIF or GIF image.'); return; }
    if (file.size > 10 * 1024 * 1024) { showToast('Image must be smaller than 10 MB.'); return; }
    const targetSection = mediaTarget.section;
    const targetPath = mediaTarget.path;
    const formData = new FormData();
    formData.append('file', file);
    Object.entries(mediaMetadata()).forEach(([key, value]) => formData.append(key, value));
    setMediaBusy(true, 'Validating image…');
    setMediaStatus('Validating image…', 'busy');
    requestAnimationFrame(() => setMediaBusy(true, 'Uploading image to Preview Blob… 0%'));
    uploadMediaWithProgress(formData, (percent) => setMediaBusy(true, `Uploading image… ${percent}%`)).then((uploaded) => assignUploadedMedia(uploaded, targetSection, targetPath, 'Image uploaded, saved to the draft, and ready to publish.')).catch((error) => { setMediaStatus(`Upload failed: ${error.message}`, 'error'); showToast(`Upload failed: ${error.message}`); }).finally(() => { setMediaBusy(false); event.target.value = ''; });
  });

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

  $('#login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button[type="submit"]');
    button.disabled = true;
    $('#login-error').textContent = '';
    try {
      const result = await apiRequest('/api/auth/login', { method: 'POST', body: JSON.stringify({ email: $('#login-email').value, password: $('#login-password').value }) });
      setAuthenticatedUser(result.user);
      await loadRemoteState();
      showDashboard();
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

  (async function boot() {
    try {
      const result = await apiRequest('/api/auth/me');
      setAuthenticatedUser(result.user);
      await loadRemoteState();
      showDashboard();
    } catch (error) {
      if (/not authenticated|authentication required|session/i.test(error.message)) showLogin();
      else showLogin(`Could not connect to the CMS backend: ${error.message}`);
    }
  }());
})();
