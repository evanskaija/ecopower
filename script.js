const phone = '255784017225';

const translations = {
  en: {
    'nav.home': 'Home', 'nav.products': 'Products & prices', 'nav.about': 'About us', 'nav.team': 'Our team', 'nav.impact': 'Our impact', 'nav.partner': 'Partner with us', 'nav.faq': 'FAQ', 'nav.contact': 'Contact', 'nav.order': 'Order on WhatsApp',
    'lang.choose': 'Choose language', 'lang.english': 'English', 'lang.swahili': 'Swahili',
    'common.learn': 'Learn more', 'common.order': 'Order on WhatsApp', 'common.quote': 'Request a quote', 'common.contact': 'Contact the team', 'common.send': 'Send message', 'common.call': 'Call us',
    'home.eyebrow': 'CLEAN COOKING FUEL BY ECOPOWER · DAR ES SALAAM', 'home.title': 'Makange — Kwa maisha <em>bora.</em>', 'home.lede': 'Clean cooking fuel, delivered to your door. Briquettes made from char, agro and forest waste at our factory in Kunduchi, brought to your door by our own Toyo tricycles.', 'home.howToPay': 'How to pay', 'home.captionContact': 'Call or WhatsApp', 'home.caption': 'Pay cash on delivery or by Lipa Namba', 'home.explore': 'Explore our products', 'home.price': 'Makange pricing', 'home.priceNote': 'Door delivery from 20 × 50kg sacks · Bulk and monthly orders: ask on WhatsApp', 'home.trustFactory': 'Made in our own factory', 'home.trustFactoryNote': 'Silver Sands, Kunduchi, since 2023', 'home.trustDelivery': 'Next-day delivery', 'home.trustDeliveryNote': 'Within 10 km · order a day before · from 20 bags', 'home.trustPayment': 'Pay any way', 'home.trustPaymentNote': 'Cash, M-Pesa, any network, bank or card', 'home.trustBurn': 'Long, steady burn', 'home.trustBurnNote': 'Up to 6 hours, tested by TIRDO', 'home.productsEyebrow': 'Products & prices', 'home.productsTitle': 'Makange briquettes', 'home.productsText': 'Made from char dust, agro and forest waste mixed with a binder, pressed by machine and sun-dried.', 'home.monthlyTitle': 'Regular monthly orders', 'home.monthlyText': 'A fixed number of bags delivered through the month, paid on delivery. Already working for chips sellers in Kinondoni.', 'home.businessQuote': 'Get a business quote', 'home.howEyebrow': 'Simple ordering', 'home.howTitle': 'Order in <em>three steps.</em>', 'home.howText': 'Tell us what you need, choose your payment method, and our delivery crew will bring it to you.', 'home.step1': 'Call or WhatsApp', 'home.step1Text': 'Tell us the sack size, how many you need, and where.', 'home.step2': 'Pay your way', 'home.step2Text': 'Use Lipa Namba now, or pay cash when it arrives.', 'home.step3': 'Delivered next day', 'home.step3Text': 'Our Toyo crew delivers within 10 km. For smaller orders, visit a WAKALA shop.', 'home.paymentTitle': 'Pay by Lipa Namba from any network or bank', 'home.paymentText': 'Send the payment message to WhatsApp after paying so we can confirm your order.', 'home.factoryEyebrow': 'From our factory', 'home.factoryTitle': 'A working plant in Kunduchi, with its own delivery fleet', 'home.factoryText': 'EcoPower Solutions Limited started in 2023. We make Makange briquettes at our factory on Old Bagamoyo Road, Silver Sands, Kunduchi, using tailor-made machines that meet industry standards and give a premium output. Our cargo tricycles deliver to homes, food sellers and institutions across Dar es Salaam, together with our WAKALA partners and sales agents.', 'home.aboutMore': 'More about EcoPower', 'home.usersEyebrow': 'Who cooks with Makange', 'home.usersTitle': 'Built for real kitchens.', 'home.impactEyebrow': 'Our impact', 'home.impactTitle': 'Cleaner cooking with <em>measurable change.</em>', 'home.impactText': 'Our full-production estimates show the potential for waste recovery, local livelihoods and lower everyday cooking costs.', 'home.ctaTitle': 'Ready to cook <em>smarter?</em>', 'home.ctaText': 'Order Makange or contact the team for a business supply quotation.',
    'products.heroTitle': 'Better cooking starts with the <em>right fuel.</em>', 'products.heroText': 'Choose the Makange sack size and cookstove that fits your home, business or institution.', 'products.fuelTitle': 'Makange briquettes', 'products.fuelText': 'Made from charcoal dust, agricultural and forest waste mixed with a binder, machine-pressed and sun-dried.', 'products.lightTitle': 'How to light Makange', 'products.lightText': 'Four simple steps to get a steady cooking fire.', 'products.stovesTitle': 'Cookstoves', 'products.stovesText': 'Choose the stove for the way you cook.', 'products.bundleTitle': 'Starter bundle: household stove + 25 kg Makange', 'products.bundleText': 'A practical way to begin cleaner cooking at home.',
    'about.heroTitle': 'From local innovation to <em>cleaner kitchens.</em>', 'about.heroText': 'EcoPower Solutions Limited is a Tanzanian clean-energy manufacturer operating from Kunduchi since 2023.', 'about.whoTitle': 'Who we are', 'about.storyTitle': 'Our story so far', 'about.madeTitle': 'How Makange is made', 'about.mission': 'Our mission', 'about.vision': 'Our vision',
    'team.heroTitle': 'The people powering <em>EcoPower.</em>', 'team.heroText': 'A small Tanzanian team making clean cooking fuel in Kunduchi and bringing it to kitchens across Dar es Salaam.', 'team.management': 'Management', 'team.board': 'Board of directors', 'team.crew': 'The crew who make it happen',
    'impact.heroTitle': 'Cleaner cooking. <em>Measurable change.</em>', 'impact.heroText': 'Figures below are estimates based on full production of 50 tonnes of Makange per month.', 'impact.costTitle': 'Cost of cooking for one day', 'impact.costText': 'A typical day of cooking, at today\'s prices.',
    'partner.heroTitle': 'Let\'s build a cleaner <em>future together.</em>', 'partner.heroText': 'Sell Makange from your shop, set up a regular supply for your kitchen, or work with us on clean cooking projects.', 'partner.wakalaTitle': 'Become a Makange agent or WAKALA', 'partner.supplyTitle': 'Regular monthly orders', 'partner.formTitle': 'Start a partnership conversation',
    'faq.heroTitle': 'Everything you need to <em>know.</em>', 'faq.heroText': 'Clear answers about Makange, delivery, payment, cookstoves and becoming a WAKALA.', 'faq.search': 'Search questions...',
    'contact.heroTitle': 'Order, pay or <em>visit.</em>', 'contact.heroText': 'The fastest way to reach us is WhatsApp: 0784 017 225.', 'contact.wakalaTitle': 'Find a WAKALA near you', 'contact.paymentTitle': 'How to pay', 'contact.formTitle': 'Send us a message'
  },
  sw: {
    'nav.home': 'Nyumbani', 'nav.products': 'Bidhaa na bei', 'nav.about': 'Kuhusu sisi', 'nav.team': 'Timu yetu', 'nav.impact': 'Matokeo yetu', 'nav.partner': 'Shirikiana nasi', 'nav.faq': 'Maswali', 'nav.contact': 'Wasiliana nasi', 'nav.order': 'Agiza WhatsApp',
    'lang.choose': 'Chagua lugha', 'lang.english': 'Kiingereza', 'lang.swahili': 'Kiswahili',
    'common.learn': 'Jifunze zaidi', 'common.order': 'Agiza WhatsApp', 'common.quote': 'Omba bei ya biashara', 'common.contact': 'Wasiliana na timu', 'common.send': 'Tuma ujumbe', 'common.call': 'Piga simu',
    'home.eyebrow': 'MAFUTA SAFI YA KUPIKIA YA ECOPOWER · DAR ES SALAAM', 'home.title': 'Makange — Kwa maisha <em>bora.</em>', 'home.lede': 'Nishati safi ya kupikia, ikiletwa mlangoni kwako. Briquettes zinazotengenezwa kwa mabaki ya mkaa, taka za kilimo na misitu katika kiwanda chetu Kunduchi, kisha kuletwa kwako na Toyo zetu.', 'home.howToPay': 'Jinsi ya kulipa', 'home.captionContact': 'Piga simu au WhatsApp', 'home.caption': 'Lipa taslimu unapopokea au kwa Lipa Namba', 'home.explore': 'Tazama bidhaa zetu', 'home.price': 'Bei za Makange', 'home.priceNote': 'Delivery mlangoni kutoka magunia 20 ya 50kg · Maagizo ya jumla na kila mwezi: uliza WhatsApp', 'home.trustFactory': 'Inatengenezwa kiwandani kwetu', 'home.trustFactoryNote': 'Silver Sands, Kunduchi, tangu 2023', 'home.trustDelivery': 'Tunaleta kesho yake', 'home.trustDeliveryNote': 'Ndani ya km 10 · agiza siku moja kabla · kuanzia magunia 20', 'home.trustPayment': 'Lipa unavyotaka', 'home.trustPaymentNote': 'Taslimu, M-Pesa, mtandao wowote, benki au kadi', 'home.trustBurn': 'Inawaka muda mrefu, kwa utulivu', 'home.trustBurnNote': 'Hadi saa 6, imepimwa na TIRDO', 'home.productsEyebrow': 'Bidhaa na bei', 'home.productsTitle': 'Briquettes za Makange', 'home.productsText': 'Zimetengenezwa kwa mabaki ya mkaa, taka za kilimo na misitu zilizochanganywa na binder, zikabonyezwa kwa mashine na kukaushwa juani.', 'home.monthlyTitle': 'Maagizo ya kila mwezi', 'home.monthlyText': 'Idadi maalum ya magunia inapelekwa kwa mwezi na inalipwa wakati wa delivery. Tayari inawasaidia wauza chips Kinondoni.', 'home.businessQuote': 'Pata bei ya biashara', 'home.howEyebrow': 'Kuagiza kwa urahisi', 'home.howTitle': 'Agiza kwa <em>hatua tatu.</em>', 'home.howText': 'Tuambie unachohitaji, chagua njia ya malipo, na timu yetu italeta bidhaa kwako.', 'home.step1': 'Piga simu au WhatsApp', 'home.step1Text': 'Tuambie ukubwa wa gunia, idadi na eneo lako.', 'home.step2': 'Lipa kwa njia yako', 'home.step2Text': 'Tumia Lipa Namba sasa au lipa cash wakati bidhaa inafika.', 'home.step3': 'Delivery siku inayofuata', 'home.step3Text': 'Toyo yetu inaleta bidhaa ndani ya km 10. Kwa agizo dogo, tembelea WAKALA.', 'home.paymentTitle': 'Lipa Namba kutoka mtandao au benki yoyote', 'home.paymentText': 'Tuma ujumbe wa malipo WhatsApp baada ya kulipa ili tuthibitishe oda yako.', 'home.factoryEyebrow': 'Kutoka kiwandani kwetu', 'home.factoryTitle': 'Kiwanda kinachofanya kazi Kunduchi, chenye delivery yake', 'home.factoryText': 'EcoPower Solutions Limited ilianza mwaka 2023. Tunatengeneza briquettes za Makange katika kiwanda chetu Old Bagamoyo Road, Silver Sands, Kunduchi, kwa kutumia mashine maalum zinazokidhi viwango vya sekta na kutoa bidhaa bora. Tricycles zetu husafirisha kwa nyumba, wauza chakula na taasisi Dar es Salaam, pamoja na washirika wetu WAKALA na mawakala wa mauzo.', 'home.aboutMore': 'Zaidi kuhusu EcoPower', 'home.usersEyebrow': 'Nani anapika kwa Makange', 'home.usersTitle': 'Imetengenezwa kwa jikoni halisi.', 'home.impactEyebrow': 'Matokeo yetu', 'home.impactTitle': 'Upishi safi wenye <em>mabadiliko yanayopimika.</em>', 'home.impactText': 'Makadirio ya uzalishaji kamili yanaonyesha uwezo wa kubadilisha taka, kutengeneza ajira na kupunguza gharama za kupika kila siku.', 'home.ctaTitle': 'Uko tayari kupika <em>kwa werevu?</em>', 'home.ctaText': 'Agiza Makange au wasiliana na timu kwa bei ya supply ya biashara.',
    'products.heroTitle': 'Upishi bora huanza na <em>mafuta sahihi.</em>', 'products.heroText': 'Chagua ukubwa wa gunia la Makange na jiko linalofaa nyumba, biashara au taasisi yako.', 'products.fuelTitle': 'Briquettes za Makange', 'products.fuelText': 'Imetengenezwa kwa mabaki ya mkaa, taka za kilimo na misitu, binder, machine pressing na kukaushwa juani.', 'products.lightTitle': 'Jinsi ya kuwasha Makange', 'products.lightText': 'Hatua nne rahisi kupata moto wa kupikia ulio thabiti.', 'products.stovesTitle': 'Majiko', 'products.stovesText': 'Chagua jiko kulingana na namna unavyopika.', 'products.bundleTitle': 'Kifurushi cha kuanzia: jiko la nyumbani + Makange kilo 25', 'products.bundleText': 'Njia rahisi kuanza upishi safi nyumbani.',
    'about.heroTitle': 'Kutoka ubunifu wa hapa hadi <em>jikoni safi.</em>', 'about.heroText': 'EcoPower Solutions Limited ni mtengenezaji wa nishati safi Tanzania anayefanya kazi Kunduchi tangu 2023.', 'about.whoTitle': 'Sisi ni nani', 'about.storyTitle': 'Hadithi yetu', 'about.madeTitle': 'Jinsi Makange inavyotengenezwa', 'about.mission': 'Dhamira yetu', 'about.vision': 'Maono yetu',
    'team.heroTitle': 'Watu wanaoiwezesha <em>EcoPower.</em>', 'team.heroText': 'Timu ndogo ya Tanzania inayotengeneza nishati safi Kunduchi na kuipeleka jikoni Dar es Salaam.', 'team.management': 'Uongozi', 'team.board': 'Bodi ya wakurugenzi', 'team.crew': 'Timu inayofanya kazi itimie',
    'impact.heroTitle': 'Upishi safi. <em>Mabadiliko yanayopimika.</em>', 'impact.heroText': 'Takwimu hizi ni makadirio ya uzalishaji kamili wa tani 50 za Makange kwa mwezi.', 'impact.costTitle': 'Gharama ya kupika kwa siku', 'impact.costText': 'Siku ya kawaida ya kupika, kwa bei za sasa.',
    'partner.heroTitle': 'Tujenge kesho safi <em>pamoja.</em>', 'partner.heroText': 'Uza Makange kwenye duka lako, panga supply ya jikoni yako, au shirikiana nasi kwenye miradi ya upishi safi.', 'partner.wakalaTitle': 'Kuwa wakala wa Makange', 'partner.supplyTitle': 'Maagizo ya kila mwezi', 'partner.formTitle': 'Anza mazungumzo ya ushirikiano',
    'faq.heroTitle': 'Kila kitu unachohitaji <em>kujua.</em>', 'faq.heroText': 'Majibu kuhusu Makange, delivery, malipo, majiko na kuwa WAKALA.', 'faq.search': 'Tafuta swali...',
    'contact.heroTitle': 'Agiza, lipa au <em>tembelea.</em>', 'contact.heroText': 'Njia ya haraka zaidi kutufikia ni WhatsApp: 0784 017 225.', 'contact.wakalaTitle': 'Pata WAKALA aliye karibu', 'contact.paymentTitle': 'Jinsi ya kulipa', 'contact.formTitle': 'Tuma ujumbe kwetu'
  }
};

// The newer page sections contain useful editorial copy that is not tied to
// the original translation keys. Keep one small static dictionary so the
// language switch translates those sections as well as the shared controls.
const staticSwahili = {
  'Old Bagamoyo Road, Plot 234, Block D, Silver Sands, Kunduchi': 'Mtaa wa Old Bagamoyo, Plot 234, Block D, Silver Sands, Kunduchi',
  'Old Bagamoyo Road, Plot 234, Block D,': 'Mtaa wa Old Bagamoyo, Plot 234, Block D,',
  'Silver Sands, Kunduchi': 'Silver Sands, Kunduchi',
  'Mon - Sat 8:00 - 18:00': 'Jumatatu - Jumamosi 8:00 - 18:00',
  'Sun 8:00 - 14:00': 'Jumapili 8:00 - 14:00',
  'Open menu': 'Fungua menyu',
  'Products & prices': 'Bidhaa na bei',
  'Products & Prices': 'Bidhaa na Bei',
  'About us': 'Kuhusu sisi',
  'Our team': 'Timu yetu',
  'Our impact': 'Matokeo yetu',
  'Partner with us': 'Shirikiana nasi',
  'Contact': 'Wasiliana nasi',
  'Order on WhatsApp': 'Agiza WhatsApp',
  'Explore our products': 'Tazama bidhaa zetu',
  'Request a quote': 'Omba bei ya biashara',
  'Learn more': 'Jifunze zaidi',
  'Ask for a quote': 'Omba bei',
  'Ask on WhatsApp': 'Uliza WhatsApp',
  'Ask us on WhatsApp': 'Tuulize WhatsApp',
  'Call': 'Piga simu',
  'WhatsApp': 'WhatsApp',
  'Order & contact': 'Agizo na mawasiliano',
  'Pay': 'Malipo',
  'Cash on delivery': 'Lipa wakati wa kupokea',
  'Follow us': 'Tufuatilie',
  'Made with purpose in Tanzania': 'Imetengenezwa kwa kusudi Tanzania',
  'Instagram · Facebook · TikTok': 'Instagram · Facebook · TikTok',
  'LinkedIn · Google': 'LinkedIn · Google',
  'LinkedIn (company page) · Google': 'LinkedIn (ukurasa wa kampuni) · Google',
  'EcoPower Solutions Ltd': 'EcoPower Solutions Ltd',
  'Call / WhatsApp: 0784 017 225': 'Piga simu / WhatsApp: 0784 017 225',
  'info@ecopower.co.tz': 'info@ecopower.co.tz',
  'Home': 'Nyumbani',
  'Choose language': 'Chagua lugha',
  'English': 'Kiingereza',
  'Swahili': 'Kiswahili',
  'Made in our own factory': 'Imetengenezwa kiwandani kwetu',
  'Next-day delivery': 'Delivery siku inayofuata',
  'Pay any way': 'Lipa kwa njia yoyote',
  'Long, steady burn': 'Moto mrefu na thabiti',
  'Within our delivery area': 'Ndani ya eneo letu la delivery',
  'Cash, mobile money or bank': 'Cash, simu au benki',
  'Less smoke while cooking': 'Moshi mdogo wakati wa kupika',
  'For restaurants and schools': 'Kwa migahawa na shule',
  'For homes and small sellers': 'Kwa nyumba na wauzaji wadogo',
  'For businesses & institutions': 'Kwa biashara na taasisi',
  '50 kg Makange sack': 'Gunia la Makange kilo 50',
  '25 kg Makange sack': 'Gunia la Makange kilo 25',
  'For mama ntilie, food sellers, restaurants and schools.': 'Kwa mama ntilie, wauzaji wa chakula, migahawa na shule.',
  'For households and small food businesses that need reliable heat.': 'Kwa nyumba na biashara ndogo za chakula zinazohitaji moto wa kuaminika.',
  'Regular monthly orders': 'Maagizo ya kila mwezi',
  'Schools and hospitals': 'Shule na hospitali',
  'Restaurants and hotels': 'Migahawa na hoteli',
  'Food vendors and WAKALA shops': 'Wauzaji wa chakula na maduka ya WAKALA',
  'A fixed number of bags delivered through the month, paid on delivery. Ideal for schools, restaurants and institutions.': 'Idadi maalum ya magunia inapelekwa kila mwezi na inalipwa wakati wa delivery. Inafaa kwa shule, migahawa na taasisi.',
  'Apply on WhatsApp': 'Omba kupitia WhatsApp',
  'Partners and funders': 'Washirika na wafadhili',
  'Tanzania Clean Cooking Project': 'Mradi wa Upishi Safi Tanzania',
  'How to pay · Jinsi ya kulipa': 'Jinsi ya kulipa',
  'Scan with M-Pesa or any banking app': 'Scan kwa M-Pesa au app yoyote ya benki',
  'Scan with any banking or mobile money app': 'Scan kwa benki au simu yoyote',
  'Pay by Lipa Namba from any network or bank': 'Lipa Namba kutoka mtandao au benki yoyote',
  'M-Pesa Lipa Namba': 'M-Pesa Lipa Namba',
  'CRDB Lipa Namba': 'CRDB Lipa Namba',
  'Shows as ECOPOWER SOLUTIONS LTD 1': 'Inaonekana kama ECOPOWER SOLUTIONS LTD 1',
  'EcoPower Solutions Ltd · also takes cards': 'EcoPower Solutions Ltd · inakubali pia kadi',
  'Built for real kitchens.': 'Imetengenezwa kwa jikoni halisi.',
  'From a home breakfast to a busy food business, Makange is designed around dependable everyday cooking.': 'Kuanzia kifungua kinywa cha nyumbani hadi biashara yenye shughuli nyingi, Makange imeundwa kwa upishi wa kila siku unaotegemeka.',
  'Mama ntilie & chips stalls': 'Mama ntilie na vibanda vya chipsi',
  'Street food & restaurants': 'Chakula cha mtaani na migahawa',
  'Schools & institutions': 'Shule na taasisi',
  'Households': 'Nyumba',
  'Made by EcoPower': 'Imetengenezwa na EcoPower',
  'Cookstoves for every kitchen': 'Majiko kwa kila jikoni',
  'Made for Makange briquettes — one stove for each kind of cooking.': 'Yametengenezwa kwa briquettes za Makange — jiko kwa kila aina ya upishi.',
  'For homes': 'Kwa nyumba',
  'Household stove': 'Jiko la nyumbani',
  'A compact stove for the home kitchen, with pot rests and carry handles for everyday family cooking with Makange.': 'Jiko dogo la nyumbani lenye sehemu ya kuweka sufuria na vishikio kwa upishi wa kila siku wa familia kwa Makange.',
  'For mama ntilie & food sellers': 'Kwa mama ntilie na wauzaji wa chakula',
  'Mama ntilie stove': 'Jiko la mama ntilie',
  'A wide fire grate for big sufuria and long cooking hours — for mama ntilie, chips stalls and small restaurants.': 'Sehemu pana ya moto kwa sufuria kubwa na muda mrefu wa kupika — kwa mama ntilie, vibanda vya chipsi na migahawa midogo.',
  'For restaurants & busy kitchens': 'Kwa migahawa na jikoni zenye shughuli nyingi',
  'Two-burner stove': 'Jiko la burner mbili',
  'Two fire chambers on one steel stand, so two pots cook at once — for restaurants, canteens and caterers.': 'Vyumba viwili vya moto kwenye stendi moja ya chuma, hivyo sufuria mbili hupika kwa wakati mmoja — kwa migahawa, kantini na wapishi wa hafla.',
  'For schools & institutions': 'Kwa shule na taasisi',
  'Institutional stove': 'Jiko la taasisi',
  'Large single-pot stoves with a fitted pot and front fuel door, for schools, hospitals and large kitchens.': 'Majiko makubwa ya sufuria moja yenye sufuria maalum na mlango wa mbele wa mafuta, kwa shule, hospitali na jikoni kubwa.',
  'Quotation': 'Bei kwa makubaliano',
  'Start at home': 'Anza nyumbani',
  'Starter bundle: household stove + 25 kg Makange': 'Kifurushi cha kuanzia: jiko la nyumbani + Makange kilo 25',
  'A practical way to begin cleaner cooking at home.': 'Njia rahisi ya kuanza upishi safi nyumbani.',
  'Total': 'Jumla',
  'Order bundle': 'Agiza kifurushi',
  'Need fuel every week?': 'Unahitaji mafuta kila wiki?',
  'Set up a regular monthly order: a fixed number of bags delivered through the month, paid on delivery.': 'Panga oda ya kila mwezi: idadi maalum ya magunia italetwa kwa mwezi na kulipwa wakati wa delivery.',
  'Get a business quote': 'Pata bei ya biashara',
  'Products &amp; prices': 'Bidhaa na bei',
  'Makange fuel': 'Mafuta ya Makange',
  'Sack': 'Gunia',
  'Best for': 'Inafaa kwa',
  'Price': 'Bei',
  'Food sellers, restaurants, schools': 'Wauzaji wa chakula, migahawa, shule',
  'Homes and small food sellers': 'Nyumba na wauzaji wadogo wa chakula',
  'Bulk & monthly': 'Wingi na kila mwezi',
  'Fixed number of bags each month': 'Idadi maalum ya magunia kila mwezi',
  'Smallest order for delivery: 20 bags of 50 kg (1 tonne).': 'Oda ndogo zaidi ya delivery: magunia 20 ya kilo 50 (tani 1).',
  'Delivery within 10 km of Silver Sands, or visit a WAKALA shop for smaller orders.': 'Delivery ndani ya km 10 kutoka Silver Sands, au tembelea duka la WAKALA kwa oda ndogo.',
  'Makange burns for up to 6 hours, tested and approved by TIRDO.': 'Makange huwaka hadi saa 6, imepimwa na kuidhinishwa na TIRDO.',
  'Lighting guide': 'Mwongozo wa kuwasha',
  'Four simple steps to get a steady cooking fire.': 'Hatua nne rahisi za kupata moto thabiti wa kupikia.',
  '1. Set up the stove': '1. Weka jiko tayari',
  'Place the stove on firm, level ground with the air door open.': 'Weka jiko kwenye sehemu imara na iliyonyooka, mlango wa hewa ukiwa wazi.',
  '2. Add a starter': '2. Ongeza vianzishi',
  'Lay a first layer of Makange and add a few dry sticks in the centre.': 'Weka safu ya kwanza ya Makange na ongeza vijiti vikavu katikati.',
  '3. Light the briquettes': '3. Washa briquettes',
  'Cover the sticks with more Makange, leaving gaps for air, then light the sticks.': 'Funika vijiti kwa Makange zaidi, acha nafasi za hewa, kisha washa vijiti.',
  '4. Ready to cook': '4. Tayari kupika',
  'When the briquettes glow red, put your pot on and cook.': 'Briquettes zikianza kuwa nyekundu, weka sufuria yako na upike.',
  'Made for every kitchen': 'Limetengenezwa kwa kila jikoni',
  'Choose the stove for the way you cook.': 'Chagua jiko kulingana na namna unavyopika.',
  'Order 50 kg': 'Agiza kilo 50',
  'Order 25 kg': 'Agiza kilo 25',
  'About EcoPower': 'Kuhusu EcoPower',
  'A Tanzanian clean cooking company, making fuel in Kunduchi since 2023': 'Kampuni ya Tanzania ya upishi safi, inayotengeneza mafuta Kunduchi tangu 2023',
  'Who we are': 'Sisi ni nani',
  'EcoPower Solutions Limited started in 2023. We make Makange briquettes at our factory on Old Bagamoyo Road, Silver Sands, Kunduchi, using tailor-made machines that meet industry standards and give a premium output. Our cargo tricycles deliver to homes, food sellers and institutions across Dar es Salaam, together with our WAKALA partners and sales agents.': 'EcoPower Solutions Limited ilianza mwaka 2023. Tunatengeneza briquettes za Makange katika kiwanda chetu Old Bagamoyo Road, Silver Sands, Kunduchi, kwa kutumia mashine maalum zinazokidhi viwango vya sekta na kutoa bidhaa bora. Magari yetu madogo husafirisha kwa nyumba, wauzaji wa chakula na taasisi Dar es Salaam, pamoja na washirika wetu wa WAKALA na mawakala wa mauzo.',
  'Our mission': 'Dhamira yetu',
  'To make clean cooking fuel affordable and easy to get for every kitchen, from the mama ntilie to the school canteen.': 'Kufanya mafuta safi ya kupikia yawe nafuu na rahisi kupatikana kwa kila jikoni, kuanzia mama ntilie hadi kantini ya shule.',
  'Our vision': 'Maono yetu',
  'Clean energy for every Tanzanian home.': 'Nishati safi kwa kila nyumba ya Tanzania.',
  'Our story so far': 'Hadithi yetu hadi sasa',
  'From a small charcoal wood seller to a working factory with its own delivery fleet': 'Kutoka kwa muuzaji mdogo wa mkaa hadi kiwanda kinachofanya kazi na fleet yake ya delivery',
  'The start': 'Mwanzo',
  'We sold wood charcoal and saw its cost to families and forests. We began pressing briquettes from char dust and farm waste, by hand, in Kunduchi.': 'Tuliuza mkaa wa kuni na kuona gharama yake kwa familia na misitu. Tulianza kubinya briquettes kutoka vumbi la mkaa na taka za shamba, kwa mikono, Kunduchi.',
  'Steady ground': 'Msingi imara',
  'Food sellers came back each week. Independent tests confirmed a long, steady burn.': 'Wauzaji wa chakula walirudi kila wiki. Vipimo huru vilithibitisha moto mrefu na thabiti.',
  'Tested by hardship': 'Tulijaribiwa na changamoto',
  'Rain, power cuts and unrest slowed us down, but we kept going. We added our first delivery tricycle and our first WAKALA shop.': 'Mvua, kukatika kwa umeme na misukosuko vilitupunguza kasi, lakini tuliendelea. Tulinunua tricycle yetu ya kwanza ya delivery na duka letu la kwanza la WAKALA.',
  'A factory': 'Kiwanda',
  'Machines now press, mix and dry our fuel. Three tricycles deliver across the city, agents sell Makange in their neighbourhoods, and we build our own stoves.': 'Sasa mashine zinabinya, kuchanganya na kukausha mafuta yetu. Tricycle tatu husafirisha mjini, mawakala huuza Makange katika maeneo yao, na tunatengeneza majiko yetu wenyewe.',
  'How Makange is made': 'Jinsi Makange inavyotengenezwa',
  '1. Collect and mix': '1. Kusanya na changanya',
  'Char dust, agro and forest waste blended with a binder in our mixer.': 'Vumbi la mkaa, taka za kilimo na misitu huchanganywa na binder kwenye mixer yetu.',
  '2. Press': '2. Binya',
  'Pressed into long briquettes by our machine.': 'Hubinywa kuwa briquettes ndefu kwa mashine yetu.',
  '3. Dry and pack': '3. Kausha na pakia',
  'Dried on trays in our solar dryer, then packed in 25kg and 50kg sacks.': 'Hukaushwa kwenye treyi katika solar dryer yetu, kisha hupakiwa kwenye magunia ya kilo 25 na 50.',
  '4. Deliver': '4. Peleka',
  'Next day, by our own Toyo crew.': 'Siku inayofuata, na timu yetu ya Toyo.',
  'Founder & CEO': 'Mwanzilishi na Mkurugenzi Mkuu',
  'From selling charcoal to making a cleaner fuel for Tanzanian kitchens.': 'Kutoka kuuza mkaa hadi kutengeneza mafuta safi zaidi kwa majiko ya Tanzania.',
  'Meet the team': 'Kutana na timu',
  'The people powering': 'Watu wanaoiwezesha',
  'Leadership with purpose.': 'Uongozi wenye kusudi.',
  'People responsible for the company, factory operations and customer delivery.': 'Watu wanaosimamia kampuni, shughuli za kiwanda na delivery kwa wateja.',
  'Operations Manager': 'Meneja wa Uendeshaji',
  'Runs the factory floor, production planning and delivery operations.': 'Anasimamia uzalishaji kiwandani, mipango ya uzalishaji na shughuli za delivery.',
  'Board of directors': 'Bodi ya wakurugenzi',
  'Guiding EcoPower\'s growth.': 'Kuongoza ukuaji wa EcoPower.',
  'Governance and oversight supporting a credible Tanzanian clean-energy company.': 'Utawala na usimamizi unaoiunga mkono kampuni ya kuaminika ya nishati safi Tanzania.',
  'Director': 'Mkurugenzi',
  'The crew who make it happen': 'Timu inayofanya kazi itimie',
  'Local work, local delivery, local trust.': 'Kazi ya hapa, delivery ya hapa, uaminifu wa hapa.',
  'Our full-time staff, delivery team, WAKALA shops and resellers bring Makange to neighbourhood kitchens and businesses. Team figures shown here follow the supplied business reference and should be reconfirmed before publication.': 'Wafanyakazi wetu wa kudumu, timu ya delivery, maduka ya WAKALA na wauzaji huleta Makange kwenye majiko na biashara za maeneo yetu. Takwimu za timu zimechukuliwa kwenye taarifa ya biashara na zinapaswa kuthibitishwa tena kabla ya kuchapishwa.',
  'full-time staff': 'wafanyakazi wa kudumu',
  'WAKALA shops': 'maduka ya WAKALA',
  'resellers': 'wauzaji wa rejareja',
  'Work with our team': 'Fanya kazi na timu yetu',
  'Talk to the people behind': 'Ongea na watu walio nyuma ya',
  'Ask about products, delivery, monthly supply or WAKALA opportunities.': 'Uliza kuhusu bidhaa, delivery, supply ya kila mwezi au nafasi za WAKALA.',
  'WhatsApp the team': 'WhatsApp timu',
  'What Makange changes, in numbers we can show': 'Makange inabadilisha nini, kwa namba tunazoweza kuonyesha',
  'Figures below are based on full production of 50 tonnes a month.': 'Takwimu hapa chini zinategemea uzalishaji kamili wa tani 50 kwa mwezi.',
  'At full production: 50 tonnes of Makange a month': 'Kwa uzalishaji kamili: tani 50 za Makange kwa mwezi',
  'Clean fuel a year': 'Mafuta safi kwa mwaka',
  'Waste turned into fuel': 'Taka zilizobadilishwa kuwa mafuta',
  'Char dust, farm and forest waste': 'Vumbi la mkaa, taka za shamba na misitu',
  'Wood saved a year': 'Kuni zilizookolewa kwa mwaka',
  'Trees left standing': 'Miti iliyoachwa isimame',
  'Local jobs': 'Ajira za hapa',
  '7 staff · 5 WAKALA · 20 resellers': 'Wafanyakazi 7 · WAKALA 5 · wauzaji 20',
  'Cost of cooking for one day': 'Gharama ya kupika kwa siku moja',
  'A typical day of cooking, at today\'s prices.': 'Siku ya kawaida ya kupika, kwa bei za sasa.',
  'Fuel': 'Mafuta',
  'Amount per day': 'Kiasi kwa siku',
  'Cost per day': 'Gharama kwa siku',
  'Wood charcoal': 'Mkaa wa kuni',
  'Gas (LPG)': 'Gesi (LPG)',
  'Makange saves about TZS 1,200 a day against charcoal and TZS 1,400 against gas.': 'Makange huokoa takriban TZS 1,200 kwa siku dhidi ya mkaa na TZS 1,400 dhidi ya gesi.',
  'Less smoke in the kitchen': 'Moshi mdogo jikoni',
  'A little smoke only while lighting. Once lit, Makange burns clean with no smoke. Cooks breathe easier, and pots and walls stay cleaner.': 'Moshi kidogo tu wakati wa kuwasha. Ikishawaka, Makange huwaka bila moshi. Wapishi hupumua kwa urahisi, na sufuria pamoja na kuta hubaki safi.',
  'Fewer trees cut': 'Miti michache hukatwa',
  'Every sack of Makange takes the place of charcoal made from cut trees. At full production, that is about 190 tonnes of wood left standing every month.': 'Kila gunia la Makange linachukua nafasi ya mkaa uliotengenezwa kwa kukata miti. Kwa uzalishaji kamili, ni takriban tani 190 za kuni zinazoachwa kila mwezi.',
  'Our customers': 'Wateja wetu',
  'Partner with us': 'Shirikiana nasi',
  'Grow with Makange': 'Kua pamoja na Makange',
  'Sell Makange from your shop, set up a regular supply for your kitchen, or work with us on clean cooking projects.': 'Uza Makange kwenye duka lako, panga supply ya kawaida kwa jikoni yako, au shirikiana nasi kwenye miradi ya upishi safi.',
  'For shops and agents': 'Kwa maduka na mawakala',
  'Become a Makange agent or WAKALA': 'Kuwa wakala wa Makange',
  'Our 5 WAKALA shops and 20 resellers already sell Makange in their neighbourhoods. Join them.': 'Maduka yetu 5 ya WAKALA na wauzaji 20 tayari huuza Makange katika maeneo yao. Jiunge nao.',
  'Our WAKALA shops · WhatsApp or call': 'Maduka yetu ya WAKALA · WhatsApp au piga simu',
  'Want to become a WAKALA? Send us a message on WhatsApp and our team will guide you through prices, delivery and support.': 'Unataka kuwa WAKALA? Tutumie ujumbe WhatsApp na timu yetu itakuongoza kuhusu bei, delivery na msaada.',
  'Become a WAKALA on WhatsApp': 'Kuwa WAKALA kupitia WhatsApp',
  'For food sellers and institutions': 'Kwa wauzaji wa chakula na taasisi',
  'Agree a fixed number of bags each month. We deliver through the month and you pay on delivery, by cash or Lipa Namba. Already working for chips sellers in Kinondoni.': 'Kubali idadi maalum ya magunia kila mwezi. Tunasafirisha kwa mwezi mzima na unalipa wakati wa delivery, kwa cash au Lipa Namba. Tayari tunafanya kazi na wauzaji wa chipsi Kinondoni.',
  'Restaurants, hotels and canteens': 'Migahawa, hoteli na kantini',
  'Chips stalls and mama ntilie': 'Vibanda vya chipsi na mama ntilie',
  'Institutional stoves, built to order': 'Majiko ya taasisi, yanayotengenezwa kwa oda',
  'Funders and partners': 'Wafadhili na washirika',
  'The funders, researchers and suppliers who help us make clean cooking fuel in Tanzania.': 'Wafadhili, watafiti na wasambazaji wanaotusaidia kutengeneza mafuta safi ya kupikia Tanzania.',
  'CookFund': 'CookFund',
  'Research partnership': 'Ushirikiano wa utafiti',
  'Machinery partner': 'Mshirika wa mashine',
  'Equipment partner': 'Mshirika wa vifaa',
  'Partner': 'Mshirika',
  'FAQ · Maswali': 'Maswali · FAQ',
  'Questions customers ask us': 'Maswali ambayo wateja huuliza',
  'Ordering and delivery': 'Kuagiza na delivery',
  'How much does Makange cost?': 'Makange inagharimu kiasi gani?',
  '50kg sack TZS 22,000, 25kg sack TZS 13,000. For bulk and regular monthly orders, ask us on WhatsApp.': 'Gunia la kilo 50 ni TZS 22,000, gunia la kilo 25 ni TZS 13,000. Kwa oda za wingi na za kila mwezi, tuulize WhatsApp.',
  'What is the smallest order you deliver?': 'Oda ndogo zaidi mnayowasilisha ni ipi?',
  'Our regular delivery minimum is 20 bags of 50kg. For smaller orders, visit a WAKALA shop or ask us about availability.': 'Kiwango chetu cha kawaida cha delivery ni magunia 20 ya kilo 50. Kwa oda ndogo, tembelea duka la WAKALA au tuulize kuhusu upatikanaji.',
  'Where do you deliver, and how fast?': 'Mnafanya delivery wapi, na kwa haraka gani?',
  'We deliver within 10 km of the Kunduchi factory, with next-day delivery planned after your order is confirmed.': 'Tunafanya delivery ndani ya km 10 kutoka kiwanda cha Kunduchi, na delivery ya siku inayofuata hupangwa baada ya oda kuthibitishwa.',
  'How do I order?': 'Ninaagizaje?',
  'WhatsApp 0784 017 225 with the sack size, quantity and delivery location. Our team will confirm the order.': 'WhatsApp 0784 017 225 ukiweka ukubwa wa gunia, idadi na eneo la delivery. Timu yetu itathibitisha oda.',
  'Paying': 'Malipo',
  'How can I pay?': 'Ninawezaje kulipa?',
  'Why does the M-Pesa name say "ECOPOWER SOLUTIONS LTD 1"?': 'Kwa nini jina la M-Pesa linaandika "ECOPOWER SOLUTIONS LTD 1"?',
  'That is the registered payment name connected to the EcoPower Lipa Namba account.': 'Hilo ndilo jina la malipo lililosajiliwa kwenye akaunti ya EcoPower Lipa Namba.',
  'Can I pay with Mixx by Yas, Airtel Money or Halopesa?': 'Naweza kulipa kwa Mixx by Yas, Airtel Money au Halopesa?',
  'Yes. Use the Lipa Namba option available in your mobile money network, then send the payment confirmation on WhatsApp.': 'Ndiyo. Tumia chaguo la Lipa Namba kwenye mtandao wako wa simu, kisha tuma uthibitisho wa malipo WhatsApp.',
  'Using Makange': 'Kutumia Makange',
  'How long does it burn?': 'Inawaka kwa muda gani?',
  'Makange can burn for several hours depending on the stove, airflow and cooking load.': 'Makange inaweza kuwaka kwa saa kadhaa kulingana na jiko, hewa na uzito wa upishi.',
  'Does it smoke?': 'Inatoa moshi?',
  'There may be a little smoke while lighting. Once lit, Makange is designed to burn cleanly and steadily.': 'Kunaweza kuwa na moshi kidogo wakati wa kuwasha. Ikishawaka, Makange imeundwa kuwaka kwa usafi na kwa utulivu.',
  'How do I light it?': 'Ninawashaje?',
  'Add a starter and dry sticks to a level stove, light the sticks, then add Makange while leaving gaps for airflow.': 'Weka kianzishi na vijiti vikavu kwenye jiko lililonyooka, washa vijiti, kisha ongeza Makange ukiacha nafasi za hewa.',
  'What is it made from?': 'Imetengenezwa kutokana na nini?',
  'Makange is made from recovered charcoal dust, agricultural waste and forest waste.': 'Makange imetengenezwa kutokana na vumbi la mkaa lililorejeshwa, taka za kilimo na taka za misitu.',
  'Do you sell cookstoves?': 'Mnauza majiko?',
  'Yes. EcoPower offers household, mama ntilie, two-burner and institutional cookstoves.': 'Ndiyo. EcoPower inatoa majiko ya nyumbani, mama ntilie, burner mbili na taasisi.',
  'Business': 'Biashara',
  'Can I sell Makange from my shop?': 'Naweza kuuza Makange kwenye duka langu?',
  'Yes. Contact us to become a WAKALA or reseller and our team will guide you through prices, delivery and support.': 'Ndiyo. Wasiliana nasi kuwa WAKALA au muuzaji, na timu yetu itakuongoza kuhusu bei, delivery na msaada.',
  'What are your opening hours?': 'Mnafanya kazi saa ngapi?',
  'Monday to Saturday: 8:00 - 18:00. Sunday: 8:00 - 14:00.': 'Jumatatu hadi Jumamosi: 8:00 - 18:00. Jumapili: 8:00 - 14:00.',
  'Still have a question?': 'Bado una swali?',
  'Contact us · Wasiliana nasi': 'Wasiliana nasi · Contact us',
  'Order, pay or visit': 'Agiza, lipa au tembelea',
  'The fastest way to reach us is WhatsApp: 0784 017 225.': 'Njia ya haraka zaidi kutufikia ni WhatsApp: 0784 017 225.',
  'Call or WhatsApp': 'Piga simu au WhatsApp',
  '+255 784 017 225': '+255 784 017 225',
  '[Second line, if kept: 0752 538 825]': '[Mstari wa pili, ukiendelea: 0752 538 825]',
  'Visit the factory': 'Tembelea kiwanda',
  'Old Bagamoyo Road, Plot 234, Block D': 'Mtaa wa Old Bagamoyo, Plot 234, Block D',
  'Silver Sands, Kunduchi, Dar es Salaam': 'Silver Sands, Kunduchi, Dar es Salaam',
  'Open in Google Maps': 'Fungua kwenye Google Maps',
  'Opening hours': 'Saa za kazi',
  'Monday – Friday': 'Jumatatu – Ijumaa',
  'Saturday': 'Jumamosi',
  'Sunday': 'Jumapili',
  'Email: info@ecopower.co.tz': 'Barua pepe: info@ecopower.co.tz',
  'WAKALA shops': 'Maduka ya WAKALA',
  'Find a WAKALA near you': 'Pata WAKALA aliye karibu',
  'Buying less than 20 bags? Get Makange from your nearest WAKALA shop. Call or WhatsApp them before you go.': 'Unanunua chini ya magunia 20? Pata Makange kwenye duka la WAKALA lililo karibu nawe. Piga simu au WhatsApp kabla ya kwenda.',
  'Want to become a WAKALA?': 'Unataka kuwa WAKALA?',
  'Ask us on WhatsApp': 'Tuulize WhatsApp',
  'How to pay': 'Jinsi ya kulipa',
  'Cash on delivery, or Lipa Namba from any mobile network or bank. Send the payment message to 0784 017 225 on WhatsApp.': 'Lipa cash unapopokea, au Lipa Namba kutoka mtandao wa simu au benki yoyote. Tuma ujumbe wa malipo kwa 0784 017 225 WhatsApp.',
  'ECOPOWER SOLUTIONS LTD 1': 'ECOPOWER SOLUTIONS LTD 1',
  'ECOPOWER SOLUTIONS LTD · also takes cards': 'ECOPOWER SOLUTIONS LTD · inakubali pia kadi',
  'Send us a message': 'Tuma ujumbe kwetu',
  'Your name': 'Jina lako',
  'Phone or WhatsApp': 'Simu au WhatsApp',
  'Message': 'Ujumbe',
  'Send': 'Tuma',
  'EcoPower factory': 'Kiwanda cha EcoPower',
  'Old Bagamoyo Road, Plot 234, Silver Sands, Kunduchi': 'Mtaa wa Old Bagamoyo, Plot 234, Silver Sands, Kunduchi',
  '© 2026 EcoPower Solutions Limited': '© 2026 EcoPower Solutions Limited'
};

const swahiliAttributes = {
  'Choose language': 'Chagua lugha',
  'Open menu': 'Fungua menyu',
  'EcoPower home': 'Mwanzo wa EcoPower',
  'EcoPower factory location map': 'Ramani ya eneo la kiwanda cha EcoPower'
};

const swahiliPageMeta = {
  home: ['EcoPower Solutions Limited | Nishati safi ya kupikia ya Makange', 'EcoPower Solutions Limited inatengeneza mafuta safi ya kupikia ya Makange Kunduchi, Tanzania.'],
  products: ['Bidhaa na Bei | EcoPower Solutions Limited', 'Briquettes za Makange, majiko, bei na mwongozo wa kuwasha kutoka EcoPower Solutions Limited.'],
  about: ['Kuhusu EcoPower | Kutoka ubunifu wa hapa hadi jikoni safi', 'Kuhusu EcoPower Solutions Limited, mtengenezaji wa nishati safi wa Tanzania.'],
  team: ['Timu Yetu | EcoPower Solutions Limited', 'Kutana na timu ya EcoPower Solutions Limited inayotengeneza Makange.'],
  impact: ['Matokeo Yetu | EcoPower Solutions Limited', 'Matokeo ya EcoPower katika taka, gharama za kupika, ajira na miti.'],
  partner: ['Shirikiana na EcoPower | WAKALA na supply ya taasisi', 'Kuwa WAKALA, panga supply ya taasisi au shirikiana na miradi ya EcoPower.'],
  faq: ['Maswali | EcoPower Solutions Limited', 'Majibu ya maswali kuhusu bei, delivery, malipo, majiko na WAKALA.'],
  contact: ['Wasiliana na EcoPower | Agiza, lipa au tembelea', 'Wasiliana na EcoPower kwa simu, WhatsApp, barua pepe au tembelea kiwanda Kunduchi.']
};

const originalStaticText = new WeakMap();
const originalAttributes = new WeakMap();
const originalPageTitle = document.title;
const descriptionElement = document.querySelector('meta[name="description"]');
const originalPageDescription = descriptionElement?.content || '';

const applyStaticTranslations = (language) => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  let node;
  while ((node = walker.nextNode())) nodes.push(node);
  nodes.forEach((textNode) => {
    const parent = textNode.parentElement;
    if (!parent || parent.closest('script, style, noscript, [data-i18n]')) return;
    if (!originalStaticText.has(textNode)) originalStaticText.set(textNode, textNode.nodeValue);
    const original = originalStaticText.get(textNode);
    const key = original.trim();
    const replacement = language === 'sw' ? staticSwahili[key] : key;
    if (!replacement) return;
    const leading = original.match(/^\s*/)?.[0] || '';
    const trailing = original.match(/\s*$/)?.[0] || '';
    textNode.nodeValue = `${leading}${replacement}${trailing}`;
  });
  document.querySelectorAll('[aria-label], [placeholder]').forEach((element) => {
    ['aria-label', 'placeholder'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (attribute === 'placeholder' && element.hasAttribute('data-i18n-placeholder')) return;
      if (!originalAttributes.has(element)) originalAttributes.set(element, {});
      const values = originalAttributes.get(element);
      if (!values[attribute]) values[attribute] = element.getAttribute(attribute);
      const original = values[attribute];
      element.setAttribute(attribute, language === 'sw' ? (swahiliAttributes[original] || original) : original);
    });
  });
  const page = document.body.dataset.page;
  const meta = swahiliPageMeta[page];
  if (language === 'sw' && meta) {
    document.title = meta[0];
    if (descriptionElement) descriptionElement.content = meta[1];
  } else {
    document.title = originalPageTitle;
    if (descriptionElement) descriptionElement.content = originalPageDescription;
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navWrap = document.querySelector('.nav-wrap');

const closeMenu = () => {
  if (!menuToggle || !navMenu) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  navMenu.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navMenu?.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});
navMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

const syncHeader = () => navWrap?.classList.toggle('is-scrolled', window.scrollY > 1);
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const applyTranslations = (language) => {
  const dictionary = translations[language] || translations.en;
  document.documentElement.lang = language === 'sw' ? 'sw' : 'en';
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) element.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const value = dictionary[element.dataset.i18nPlaceholder];
    if (value) element.placeholder = value;
  });
  document.querySelectorAll('[data-language-label]').forEach((element) => { element.textContent = language.toUpperCase(); });
  applyStaticTranslations(language);
};

const cmsEscape = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
let cmsPublishedVersion = '';
const cmsAssetUrl = (value = '') => {
  if (value.startsWith('media:')) return `/api/media/${value.slice(6)}/file`;
  if (!cmsPublishedVersion || value.startsWith('data:') || value.startsWith('/api/')) return value;
  try {
    const url = new URL(value, window.location.href);
    const isPublishedAsset = url.pathname.startsWith('/uploads/published/') || url.hostname.endsWith('.blob.vercel-storage.com');
    if (!isPublishedAsset) return value;
    url.searchParams.set('cms_version', cmsPublishedVersion);
    return value.startsWith('/') ? `${url.pathname}${url.search}` : url.toString();
  } catch {
    return value;
  }
};
const cmsSetImage = (image, value) => {
  if (!image || !value) return;
  if (!image.dataset.cmsImageStateBound) {
    image.dataset.cmsImageStateBound = 'true';
    image.addEventListener('load', () => image.classList.remove('cms-image-unavailable'));
    image.addEventListener('error', () => image.classList.add('cms-image-unavailable'));
  }
  image.classList.remove('cms-image-unavailable');
  image.src = cmsAssetUrl(value);
};
const cmsText = (selector, value, html = false, scope = document) => {
  const element = scope.querySelector(selector);
  if (!element || value === undefined || value === null) return;
  if (html) element.innerHTML = value;
  else element.textContent = value;
};
const cmsHeadline = (copy) => `${cmsEscape(copy.title || '')} <em>${cmsEscape(copy.emphasis || '')}</em>`;
const cmsHeadlineWithEmphasis = (value = '', language = 'en') => {
  const safe = cmsEscape(value);
  return language === 'sw' ? safe.replace('hatua tatu.', '<em>hatua tatu.</em>') : safe.replace('three steps.', '<em>three steps.</em>');
};
const cmsImage = (selector, value, alt, position, scope = document) => {
  const image = scope.querySelector(selector);
  if (!image || !value) return;
  cmsSetImage(image, value);
  if (alt !== undefined) image.alt = alt;
  if (position) image.style.objectPosition = position;
};
const cmsImageList = (selector, records = []) => records.forEach((record, index) => {
  const image = document.querySelectorAll(selector)[index];
  if (!image || !record?.image) return;
  cmsSetImage(image, record.image);
  const copy = record[document.documentElement.lang === 'sw' ? 'sw' : 'en'] || record.en || {};
  if (copy.alt !== undefined) image.alt = copy.alt;
  if (record.position) image.style.objectPosition = record.position;
});
const cmsBlockCopy = (block, language) => block?.[language] || block?.en || block?.sw || {};
const cmsFormatClass = (format = {}) => {
  const allowed = {
    size: ['small', 'medium', 'large', 'display'],
    font: ['sans', 'serif', 'display'],
    weight: ['regular', 'bold'],
    style: ['normal', 'italic'],
    color: ['ink', 'forest', 'muted', 'accent'],
    align: ['left', 'center', 'right'],
    spacing: ['tight', 'normal', 'loose']
  };
  return Object.entries(allowed).map(([key, values]) => values.includes(format[key]) ? `cms-format-${key}-${format[key]}` : '').filter(Boolean).join(' ');
};
const cmsApplyTextFormat = (selector, format, scope = document) => {
  const element = scope.querySelector(selector);
  if (!element) return;
  element.classList.remove(...[...element.classList].filter((name) => name.startsWith('cms-format-')));
  const classes = cmsFormatClass(format).split(' ').filter(Boolean);
  if (classes.length) element.classList.add(...classes);
};
const cmsFormatTag = (format = {}, fallback = 'p') => ['p', 'h2', 'h3'].includes(format.heading) ? format.heading : fallback;
const cmsFormattedText = (value, format = {}, fallbackTag = 'p') => {
  if (!value) return '';
  const tag = cmsFormatTag(format, fallbackTag);
  return `<${tag} class="${cmsFormatClass(format)}">${cmsEscape(value)}</${tag}>`;
};
const cmsSafeHref = (value = '') => {
  const href = String(value || '').trim();
  if (/^(?:https?:\/\/[^\s]+|mailto:[^\s]+|tel:[^\s]+|#[^\s]*|\/[^\s]*|[a-z0-9][a-z0-9_-]*\.html(?:[?#].*)?)$/i.test(href)) return href;
  return '#';
};
const cmsBlockButton = (copy) => copy?.buttonLabel ? `<a class="button button-green" href="${cmsEscape(cmsSafeHref(copy.buttonLink))}">${cmsEscape(copy.buttonLabel)}</a>` : '';
const cmsBlockImage = (value, copy, className = '', position = 'center') => {
  const safePosition = ['center', 'top', 'bottom', 'left', 'right'].includes(position) ? position : 'center';
  return value ? `<img class="${className}" data-cms-image-ref="${cmsEscape(value)}" src="${cmsEscape(cmsAssetUrl(value))}" alt="${cmsEscape(copy?.alt || copy?.title || '')}" loading="lazy" style="object-position:${safePosition}" />` : '';
};
const cmsBlockMarkup = (block, language) => {
  const copy = cmsBlockCopy(block, language);
  if (block.type === 'text') return `<section class="cms-dynamic-block cms-dynamic-text section section-white"><div class="page-width cms-dynamic-copy">${copy.heading ? `<p class="eyebrow">${cmsEscape(copy.subheading || '')}</p>${cmsFormattedText(copy.heading, copy.format, 'h2')}` : ''}${cmsFormattedText(copy.description, copy.format, 'p')}${cmsBlockButton(copy)}</div></section>`;
  if (block.type === 'image') return `<section class="cms-dynamic-block cms-dynamic-image section section-cream"><div class="page-width cms-dynamic-image-grid"><figure>${cmsBlockImage(block.image, copy, '', block.position)}${copy.caption ? `<figcaption class="${cmsFormatClass(copy.format)}">${cmsEscape(copy.caption)}</figcaption>` : ''}</figure><div class="cms-dynamic-copy">${cmsFormattedText(copy.title, copy.format, 'h2')}${cmsFormattedText(copy.description, copy.format, 'p')}${cmsBlockButton(copy)}</div></div></section>`;
  if (block.type === 'imageText') {
    const image = `<div class="cms-dynamic-image-text-media">${cmsBlockImage(block.image, copy, '', block.position)}</div>`;
    const text = `<div class="cms-dynamic-copy">${cmsFormattedText(copy.heading, copy.format, 'h2')}${cmsFormattedText(copy.description, copy.format, 'p')}${cmsBlockButton(copy)}</div>`;
    return `<section class="cms-dynamic-block cms-dynamic-image-text section section-white"><div class="page-width cms-dynamic-image-text-grid layout-${block.layout === 'right' ? 'right' : 'left'}">${block.layout === 'right' ? `${text}${image}` : `${image}${text}`}</div></section>`;
  }
  if (block.type === 'payment') return `<section class="cms-dynamic-block cms-dynamic-payment section section-cream"><div class="page-width cms-dynamic-image-text-grid layout-left"><div class="cms-dynamic-image-text-media">${cmsBlockImage(block.image, copy, '', block.position)}</div><div class="cms-dynamic-copy">${cmsFormattedText(copy.title, copy.format, 'h2')}${cmsFormattedText(copy.description, copy.format, 'p')}${copy.instruction ? `<p class="cms-dynamic-payment-instruction">${cmsEscape(copy.instruction)}</p>` : ''}</div></div></section>`;
  if (block.type === 'stove') return `<section class="cms-dynamic-block cms-dynamic-stove section section-cream"><div class="page-width cms-dynamic-card-grid"><article class="cms-dynamic-card">${cmsBlockImage(block.image, copy, '', block.position)}${cmsFormattedText(copy.title, copy.format, 'h3')}${cmsFormattedText(copy.description, copy.format, 'p')}${block.price ? `<strong class="cms-dynamic-price">${cmsEscape(block.price)}</strong>` : ''}</article></div></section>`;
  if (block.type === 'cards' || block.type === 'product') {
    const cards = block.type === 'product' ? [block] : (block.cards || []);
    return `<section class="cms-dynamic-block cms-dynamic-cards section section-cream"><div class="page-width"><div class="section-heading"><div>${copy.subheading ? `<p class="eyebrow">${cmsEscape(copy.subheading)}</p>` : ''}${cmsFormattedText(copy.heading, copy.format, 'h2')}</div>${cmsFormattedText(copy.description, copy.format, 'p')}</div><div class="cms-dynamic-card-grid">${cards.map((card) => { const item = block.type === 'product' ? copy : cmsBlockCopy(card, language); const orderLink = block.type === 'product' ? block.link : (item.buttonLink || copy.buttonLink); return `<article class="cms-dynamic-card">${card.image ? cmsBlockImage(card.image, item, '', card.position) : ''}${item.kicker ? `<p class="card-kicker">${cmsEscape(item.kicker)}</p>` : ''}${cmsFormattedText(item.title || item.name, item.format || copy.format, 'h3')}${cmsFormattedText(item.description, item.format || copy.format, 'p')}${item.price ? `<strong class="cms-dynamic-price">${cmsEscape(item.price)}</strong>` : ''}${block.type === 'product' || item.buttonLabel ? cmsBlockButton({ buttonLabel: item.buttonLabel || copy.buttonLabel, buttonLink: orderLink }) : ''}</article>`; }).join('')}</div></div></section>`;
  }
  if (block.type === 'gallery') return `<section class="cms-dynamic-block cms-dynamic-gallery section section-white"><div class="page-width"><div class="section-heading"><div>${copy.subheading ? `<p class="eyebrow">${cmsEscape(copy.subheading)}</p>` : ''}${cmsFormattedText(copy.heading, copy.format, 'h2')}</div>${cmsFormattedText(copy.description, copy.format, 'p')}</div><div class="cms-dynamic-gallery-grid">${(block.images || []).map((item) => { const imageCopy = cmsBlockCopy(item, language); return `<figure>${cmsBlockImage(item.image, imageCopy, '', item.position)}${imageCopy.caption ? `<figcaption class="${cmsFormatClass(imageCopy.format || copy.format)}">${cmsEscape(imageCopy.caption)}</figcaption>` : ''}</figure>`; }).join('')}</div></div></section>`;
  if (block.type === 'partner') return `<section class="cms-dynamic-block cms-dynamic-partner section section-white"><div class="page-width cms-dynamic-partner-card">${block.image ? cmsBlockImage(block.image, copy, '', block.position) : ''}<div>${cmsFormattedText(copy.title || copy.name, copy.format, 'h2')}${cmsFormattedText(copy.description, copy.format, 'p')}${copy.buttonLabel ? cmsBlockButton(copy) : (copy.link ? `<a class="text-link" href="${cmsEscape(cmsSafeHref(copy.link))}">Visit partner website →</a>` : '')}</div></div></section>`;
  if (block.type === 'testimonial') return `<section class="cms-dynamic-block cms-dynamic-testimonial section section-cream"><div class="page-width cms-dynamic-testimonial-card">${block.image ? cmsBlockImage(block.image, copy, '', block.position) : ''}<blockquote class="${cmsFormatClass(copy.format)}">${cmsEscape(copy.quote || copy.description || '')}</blockquote>${copy.title ? `<cite><strong>${cmsEscape(copy.title)}</strong>${copy.attribution ? `, ${cmsEscape(copy.attribution)}` : ''}</cite>` : ''}</div></section>`;
  if (block.type === 'cta') return `<section class="cms-dynamic-block cms-dynamic-cta section section-green"><div class="page-width cms-dynamic-copy">${cmsFormattedText(copy.heading || copy.title, copy.format, 'h2')}${cmsFormattedText(copy.description, copy.format, 'p')}${cmsBlockButton(copy)}</div></section>`;
  return '';
};
const cmsHomeSectionSelectors = {
  hero: '.hero', trust: '.trust-strip', products: '#products', ordering: '#how-it-works',
  factory: '.story-grid', kitchen: '.kitchen-section', cookstoves: '.stove-showcase',
  impact: '.home-impact-summary', partners: '.home-partner-section', footer: 'footer'
};
const cmsMarkHomeSections = () => {
  if (document.body.dataset.page !== 'home') return;
  Object.entries(cmsHomeSectionSelectors).forEach(([key, selector]) => {
    const element = document.querySelector(selector)?.closest('section, footer') || document.querySelector(selector);
    if (element && !element.dataset.cmsSection) element.dataset.cmsSection = key;
  });
};
const cmsSectionElement = (anchor) => {
  if (!anchor) return null;
  cmsMarkHomeSections();
  const key = String(anchor).startsWith('block:') ? String(anchor).slice(6) : String(anchor);
  const resolvedKey = key === 'payment' ? 'ordering' : key === 'testimonial' ? 'kitchen' : key;
  return [...document.querySelectorAll('[data-cms-section]')].find((element) => element.dataset.cmsSection === resolvedKey) || null;
};
const cmsApplySectionOrder = (content) => {
  const main = document.querySelector('main');
  if (!main || !Array.isArray(content?.sectionOrder) || !content.sectionOrder.length) return;
  let previous = null;
  content.sectionOrder.forEach((anchor) => {
    const element = cmsSectionElement(anchor);
    if (!element || element.parentElement !== main) return;
    if (previous) previous.after(element); else main.prepend(element);
    previous = element;
  });
};
const cmsApplySectionVisibility = (content) => {
  cmsMarkHomeSections();
  const hidden = new Set(Array.isArray(content?.hiddenSections) ? content.hiddenSections : []);
  document.querySelectorAll('[data-cms-section]').forEach((element) => element.classList.toggle('cms-section-hidden', hidden.has(element.dataset.cmsSection)));
};
const renderCmsBlocks = (blocks = [], language = document.documentElement.lang || 'en') => {
  const main = document.querySelector('main');
  if (!main) return;
  main.querySelectorAll('[data-cms-dynamic-container]').forEach((container) => container.remove());
  const lastAfter = new Map();
  const lastBefore = new Map();
  (Array.isArray(blocks) ? blocks : []).filter((block) => block && block.visible !== false).forEach((block) => {
    const container = document.createElement('div');
    container.dataset.cmsDynamicContainer = 'true';
    container.dataset.cmsSection = block.id;
    container.innerHTML = cmsBlockMarkup(block, language);
    const anchor = cmsSectionElement(block.anchor);
    if (!anchor) main.appendChild(container);
    else if (block.placement === 'inside') anchor.appendChild(container);
    else if (block.placement === 'before') {
      const previous = lastBefore.get(anchor) || null;
      if (previous) previous.after(container); else anchor.before(container);
      lastBefore.set(anchor, container);
    } else {
      const previous = lastAfter.get(anchor) || anchor;
      previous.after(container);
      lastAfter.set(anchor, container);
    }
    container.querySelectorAll('[data-cms-image-ref]').forEach((image) => cmsSetImage(image, image.dataset.cmsImageRef));
  });
};
const cmsQuery = new URLSearchParams(window.location.search);
const cmsPreviewMode = cmsQuery.get('cmsPreview') === '1';
const cmsPreviewVariant = cmsQuery.get('previewMode') === 'published' ? 'published' : 'draft';
let cmsPreviewOverride = null;
const loadCmsContentFromApi = async (language, preview = cmsPreviewMode, variant = cmsPreviewVariant) => {
  const page = document.body.dataset.page || 'home';
  try {
    const useDraftEndpoint = preview && variant === 'draft';
    const response = await fetch(useDraftEndpoint ? `/api/pages/${page}` : `/api/public/${page}`, { credentials: 'same-origin', cache: 'no-store' });
    if (!response.ok) return null;
    const payload = await response.json();
    const collection = useDraftEndpoint ? payload.draft : payload.published;
    const requested = collection?.[language];
    const fallback = page === 'home' ? (collection?.en || collection?.sw) : null;
    const record = requested || fallback;
    cmsPublishedVersion = record?.updated_at || (record?.version ? String(record.version) : '');
    return record?.content || null;
  } catch { return null; }
};
const syncCmsHomeContent = async (language, preview = cmsPreviewMode) => {
  if (cmsPreviewOverride?.content) {
    if (document.body.dataset.page === 'home') applyCmsHomeContent(cmsPreviewOverride.content, cmsPreviewOverride.language || language);
    else applyCmsPageContent(cmsPreviewOverride.content);
    return;
  }
  const content = await loadCmsContentFromApi(language, preview);
  // A parent preview message may arrive while the API request is in flight.
  // Never let that older response overwrite the current dashboard selection.
  if (cmsPreviewOverride?.content) {
    if (document.body.dataset.page === 'home') applyCmsHomeContent(cmsPreviewOverride.content, cmsPreviewOverride.language || language);
    else applyCmsPageContent(cmsPreviewOverride.content);
    return;
  }
  if (!content) return;
  if (document.body.dataset.page === 'home') applyCmsHomeContent(content, language);
  else applyCmsPageContent(content);
};
const applyCmsHomeContent = (content, language = document.documentElement.lang || 'en') => {
  if (!content || document.body.dataset.page !== 'home') return;
  const lang = language === 'sw' ? 'sw' : 'en';
  const hero = content.hero;
  const heroCopy = hero?.[lang] || hero?.en;
  if (heroCopy) {
    cmsText('.hero .eyebrow', heroCopy.eyebrow);
    cmsText('.hero h1', cmsHeadline(heroCopy), true);
    cmsText('.hero .hero-copy > p:not(.eyebrow)', heroCopy.description);
    cmsApplyTextFormat('.hero h1', heroCopy.format);
    cmsApplyTextFormat('.hero .hero-copy > p:not(.eyebrow)', heroCopy.format);
    const heroButtons = document.querySelectorAll('.hero-actions a');
    if (heroButtons[0]) { heroButtons[0].textContent = heroCopy.primaryLabel; heroButtons[0].href = hero?.primaryLink || heroButtons[0].href; }
    if (heroButtons[1]) { heroButtons[1].textContent = heroCopy.secondaryLabel; heroButtons[1].href = hero?.secondaryLink || heroButtons[1].href; }
    cmsText('.hero-caption > span', `${cmsEscape(heroCopy.captionContact)} <strong>${cmsEscape('0784 017 225')}</strong> <span aria-hidden="true">·</span> ${cmsEscape(heroCopy.caption)}`, true);
    cmsImage('.hero-photo', hero.image, heroCopy.alt, hero.imagePosition);
  }
  const homeImages = content.images;
  if (homeImages) {
    cmsImage('.hero-brand-mark', homeImages.brand?.image, homeImages.brand?.[lang]?.alt, homeImages.brand?.position);
    cmsImageList('#how-it-works .payment-qr-card img', homeImages.paymentQr);
    cmsImageList('.factory-collage img', homeImages.factoryGallery);
    cmsImageList('.category-grid .category-card img', homeImages.kitchenGallery);
    cmsImageList('.home-partner-logos img', homeImages.partnerLogos);
  }
  const priceNote = content.hero?.[lang]?.priceNote || content.hero?.priceNote;
  if (priceNote) cmsText('.price-panel-note', priceNote);
  content.trust?.items?.forEach((item, index) => {
    const element = document.querySelectorAll('.trust-item')[index];
    const copy = item[lang] || item.en;
    if (!element || !copy) return;
    cmsText(`.trust-item:nth-child(${index + 1}) strong`, copy.title);
    cmsText(`.trust-item:nth-child(${index + 1}) span`, copy.description);
    cmsApplyTextFormat(`.trust-item:nth-child(${index + 1}) strong`, copy.format);
    cmsApplyTextFormat(`.trust-item:nth-child(${index + 1}) span`, copy.format);
  });
  const products = content.products;
  const productsCopy = products?.[lang] || products?.en;
  if (productsCopy) {
    cmsText('#products .section-heading .eyebrow', productsCopy.eyebrow);
    cmsText('#products .section-heading h2', productsCopy.heading);
    cmsText('#products .section-heading > p', productsCopy.description);
    cmsApplyTextFormat('#products .section-heading h2', productsCopy.format);
    cmsApplyTextFormat('#products .section-heading > p', productsCopy.format);
    products?.items?.forEach((product, index) => {
      const card = document.querySelectorAll('#products .product-card')[index];
      const copy = product[lang] || product.en;
      if (!card || !copy) return;
      cmsText('h3', copy.name, false, card);
      cmsText('p:not(.card-kicker)', copy.description, false, card);
      cmsApplyTextFormat('h3', copy.format, card);
      cmsApplyTextFormat('p:not(.card-kicker)', copy.format, card);
      cmsText('.price-row strong', product.price, false, card);
      const weight = copy.name.match(/\d+\s?kg/i)?.[0] || '';
      cmsText('.price-row span', weight, false, card);
      const button = card.querySelector('.button');
      if (button) { button.textContent = copy.button; button.href = product.link || button.href; }
      cmsImage('img', product.image, copy.alt, product.imagePosition, card);
    });
    products?.items?.forEach((product, index) => {
      const panelPrice = document.querySelectorAll('.price-panel-grid strong')[index];
      const panelWeight = document.querySelectorAll('.price-panel-grid small')[index];
      const copy = product[lang] || product.en || {};
      if (panelPrice) panelPrice.textContent = product.price || '';
      if (panelWeight) panelWeight.textContent = copy.name?.match(/\d+\s?kg/i)?.[0] || '';
    });
    const business = document.querySelector('#products .note-card');
    if (business) {
      cmsText('.eyebrow', productsCopy.businessLabel, false, business);
      cmsText('h3', productsCopy.businessHeading, false, business);
      cmsText('p', productsCopy.businessDescription, false, business);
      cmsApplyTextFormat('h3', productsCopy.businessFormat, business);
      cmsApplyTextFormat('p', productsCopy.businessFormat, business);
      business.querySelectorAll('li').forEach((item, index) => { if (productsCopy.list?.[index]) item.textContent = productsCopy.list[index]; });
      const button = business.querySelector('.button');
      if (button) button.textContent = productsCopy.businessButton;
    }
  }
  const ordering = content.ordering;
  const orderingCopy = ordering?.[lang] || ordering?.en;
  if (orderingCopy) {
    cmsText('#how-it-works .section-heading h2', cmsHeadlineWithEmphasis(orderingCopy.heading, lang), true);
    cmsApplyTextFormat('#how-it-works .section-heading h2', orderingCopy.format);
    orderingCopy.steps?.forEach((step, index) => { cmsText(`#how-it-works .step-card:nth-child(${index + 1}) h3`, step.title); cmsText(`#how-it-works .step-card:nth-child(${index + 1}) p`, step.description); cmsApplyTextFormat(`#how-it-works .step-card:nth-child(${index + 1}) h3`, step.format); cmsApplyTextFormat(`#how-it-works .step-card:nth-child(${index + 1}) p`, step.format); });
    cmsText('#how-it-works .payment-copy .eyebrow', orderingCopy.paymentEyebrow);
    cmsText('#how-it-works .payment-copy h3', orderingCopy.paymentTitle);
    const paymentDescription = document.querySelector('#how-it-works .payment-copy > [data-cms-payment-description]');
    if (paymentDescription && orderingCopy.paymentDescription) {
      cmsText('[data-cms-payment-description]', orderingCopy.paymentDescription, false, paymentDescription.parentElement);
      cmsApplyTextFormat('[data-cms-payment-description]', orderingCopy.paymentFormat, paymentDescription.parentElement);
    } else if (paymentDescription) paymentDescription.remove();
    cmsApplyTextFormat('#how-it-works .payment-copy h3', orderingCopy.paymentFormat);
    const rows = document.querySelectorAll('#how-it-works .payment-row');
    [[orderingCopy.mpesaLabel, orderingCopy.mpesaNumber, orderingCopy.mpesaNote], [orderingCopy.crdbLabel, orderingCopy.crdbNumber, orderingCopy.crdbNote]].forEach((row, index) => { if (!rows[index]) return; cmsText('span', row[0], false, rows[index]); cmsText('strong', row[1], false, rows[index]); cmsText('small', row[2], false, rows[index]); });
  }
  const factory = content.factory;
  const factoryCopy = factory?.[lang] || factory?.en;
  if (factoryCopy) {
    cmsText('.story-copy .eyebrow', factoryCopy.eyebrow);
    cmsText('.story-copy h2', factoryCopy.title);
    cmsText('.story-copy > p', factoryCopy.description);
    cmsApplyTextFormat('.story-copy h2', factoryCopy.format);
    cmsApplyTextFormat('.story-copy > p', factoryCopy.format);
    cmsText('.story-copy .text-link', `${factoryCopy.button} →`);
    cmsImage('.factory-main-image', factory.image, factoryCopy.alt, factory.imagePosition);
  }
  const kitchen = content.kitchen;
  const kitchenCopy = kitchen?.[lang] || kitchen?.en;
  if (kitchenCopy) {
    cmsText('.kitchen-section .section-heading .eyebrow', kitchenCopy.eyebrow);
    cmsText('.kitchen-section .section-heading h2', kitchenCopy.title);
    cmsApplyTextFormat('.kitchen-section .section-heading h2', kitchenCopy.format);
    kitchenCopy.categories?.forEach((value, index) => cmsText(`.category-grid .category-card:nth-child(${index + 1}) span`, value));
    cmsText('.kitchen-quote blockquote', kitchenCopy.quote);
    cmsText('.kitchen-quote p', kitchenCopy.translation);
    cmsApplyTextFormat('.kitchen-quote blockquote', kitchenCopy.testimonialFormat);
    cmsApplyTextFormat('.kitchen-quote p', kitchenCopy.testimonialFormat);
    const attribution = kitchenCopy.attribution?.split(',') || [];
    cmsText('.kitchen-quote cite', `<strong>${cmsEscape(attribution.shift()?.trim() || '')}</strong>${attribution.length ? `, ${cmsEscape(attribution.join(',').trim())}` : ''}`, true);
    if (!homeImages) cmsImage('.category-grid .category-card img', kitchen.image, undefined, kitchen.imagePosition);
  }
  const stoves = content.cookstoves;
  const stoveCopy = stoves?.[lang] || stoves?.en;
  if (stoveCopy) {
    cmsText('.stove-showcase .section-heading h2', stoveCopy.title);
    cmsText('.stove-showcase .section-heading > p', stoveCopy.description);
    cmsApplyTextFormat('.stove-showcase .section-heading h2', stoveCopy.format);
    cmsApplyTextFormat('.stove-showcase .section-heading > p', stoveCopy.format);
    stoves.items?.forEach((item, index) => {
      const card = document.querySelectorAll('.home-stove-card')[index];
      const copy = item[lang] || item.en;
      if (!card || !copy) return;
      cmsText('.card-kicker', copy.kicker, false, card); cmsText('h3', copy.name, false, card); cmsText('p:not(.card-kicker)', copy.description, false, card); cmsText('.home-stove-price', copy.price, false, card);
      cmsApplyTextFormat('h3', copy.format, card); cmsApplyTextFormat('p:not(.card-kicker)', copy.format, card);
      const button = card.querySelector('.button'); if (button) button.textContent = copy.button;
      cmsImage('img', item.image, copy.alt, item.imagePosition, card);
    });
  }
  const impact = content.impact;
  const impactCopy = impact?.[lang] || impact?.en;
  if (impactCopy) {
    cmsText('.home-impact-summary h2', impactCopy.title);
    cmsApplyTextFormat('.home-impact-summary h2', impactCopy.format);
    impact.stats?.forEach((stat, index) => { cmsText(`.home-impact-stats > div:nth-child(${index + 1}) strong`, stat.value); cmsText(`.home-impact-stats > div:nth-child(${index + 1}) span`, stat[lang] || stat.en); cmsApplyTextFormat(`.home-impact-stats > div:nth-child(${index + 1}) span`, stat[`${lang}Format`]); });
    cmsText('.home-impact-summary > .page-width > p', impactCopy.note);
    cmsApplyTextFormat('.home-impact-summary > .page-width > p', impactCopy.format);
  }
  const partners = content.partners;
  const partnerCopy = partners?.[lang] || partners?.en;
  if (partnerCopy) { cmsText('.home-wakala-card h2', partnerCopy.title); cmsText('.home-wakala-card p', partnerCopy.description); cmsApplyTextFormat('.home-wakala-card h2', partnerCopy.format); cmsApplyTextFormat('.home-wakala-card p', partnerCopy.format); const button = document.querySelector('.home-wakala-card .button'); if (button) { button.textContent = partnerCopy.button; button.href = partners.link || button.href; } }
  const footer = content.footer;
  const footerCopy = footer?.[lang] || footer?.en;
  if (footerCopy) {
    cmsText('.footer-name', footerCopy.brand); cmsText('.footer-brand > p', footerCopy.description); cmsApplyTextFormat('.footer-name', footerCopy.format); cmsApplyTextFormat('.footer-brand > p', footerCopy.format);
    const footerCols = document.querySelectorAll('.footer-col');
    if (footerCols[0]) { cmsText('h3', footerCopy.contactHeading, false, footerCols[0]); cmsText('a:nth-of-type(1)', footerCopy.phone, false, footerCols[0]); cmsText('a:nth-of-type(2)', footerCopy.email, false, footerCols[0]); cmsText('span', footerCopy.address, false, footerCols[0]); }
    if (footerCols[1]) { cmsText('h3', footerCopy.paymentHeading, false, footerCols[1]); cmsText('span:nth-of-type(1)', footerCopy.mpesa, false, footerCols[1]); cmsText('span:nth-of-type(2)', footerCopy.crdb, false, footerCols[1]); cmsText('span:nth-of-type(3)', footerCopy.cash, false, footerCols[1]); }
    if (footerCols[2]) { cmsText('h3', footerCopy.socialHeading, false, footerCols[2]); cmsText('span:nth-of-type(1)', footerCopy.socialOne, false, footerCols[2]); cmsText('span:nth-of-type(2)', footerCopy.socialTwo, false, footerCols[2]); }
  }
  cmsApplySectionOrder(content);
  cmsApplySectionVisibility(content);
  renderCmsBlocks(content.blocks, lang);
};
const applyCmsPageContent = (content) => {
  if (!content || document.body.dataset.page === 'home') return;
  window.EcoPowerCmsFields?.install(document.body.dataset.page);
  (content.elements || []).forEach((element) => {
    const escaped = element.field_id && window.CSS?.escape ? window.CSS.escape(element.field_id) : element.field_id?.replace(/(["\\])/g, '\\$1');
    const target = (escaped && document.querySelector(`[data-cms-id="${escaped}"]`)) || document.querySelectorAll(element.selector)[element.index];
    if (!target) return;
    if (element.kind === 'image') {
      if (element.value) cmsSetImage(target, element.value);
      if (element.alt !== undefined) target.alt = element.alt;
      if (element.position) target.style.objectPosition = element.position;
    } else {
      if (element.value !== undefined) target.textContent = element.value;
      if (element.href !== undefined && target.tagName === 'A') target.href = element.href;
    }
  });
  cmsApplySectionOrder(content);
  cmsApplySectionVisibility(content);
  renderCmsBlocks(content.blocks, document.documentElement.lang || 'en');
};
window.__ecopowerApplyPreview = (content, language = 'en', version = '') => {
  cmsPreviewOverride = { content, language, version };
  if (version) cmsPublishedVersion = String(version);
  if (document.body.dataset.page === 'home') applyCmsHomeContent(content, language);
  else applyCmsPageContent(content);
};

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) return;
  if (event.data?.type === 'ecopower-cms-preview-ready') {
    if (window.parent !== window) window.parent.postMessage({ type: 'ecopower-cms-preview-ready' }, window.location.origin);
    return;
  }
  if (event.data?.type !== 'ecopower-cms-preview') return;
  // The admin dashboard is the trusted same-origin parent of this iframe.
  // Keep the message path authoritative so a late API response cannot put the
  // old static image back over a newly selected draft image.
  window.__ecopowerApplyPreview(event.data.content, event.data.language, event.data.version || '');
});

const setLanguage = (language) => {
  const safeLanguage = language === 'sw' ? 'sw' : 'en';
  localStorage.setItem('ecopower-language', safeLanguage);
  applyTranslations(safeLanguage);
  void syncCmsHomeContent(safeLanguage);
  const code = document.querySelector('.language-code');
  const currentFlag = document.querySelector('.flag-current');
  const secondaryFlag = document.querySelector('.flag-secondary');
  if (code) code.textContent = safeLanguage.toUpperCase();
  if (currentFlag) currentFlag.src = safeLanguage === 'sw' ? 'Tanzania.webp' : 'United-States-of-America.webp';
  if (secondaryFlag) secondaryFlag.src = safeLanguage === 'sw' ? 'United-States-of-America.webp' : 'Tanzania.webp';
  if (currentFlag) currentFlag.alt = safeLanguage === 'sw' ? 'Swahili' : 'English';
  languageToggle?.setAttribute('aria-label', safeLanguage === 'sw' ? 'Language: Swahili. Choose language' : 'Language: English. Choose language');
  document.querySelectorAll('.language-menu button[data-language]').forEach((button) => button.classList.toggle('selected', button.dataset.language === safeLanguage));
};

const languageToggle = document.querySelector('.language-switcher');
const languageMenu = document.querySelector('.language-menu');
languageToggle?.addEventListener('click', () => {
  const isOpen = languageToggle.getAttribute('aria-expanded') === 'true';
  languageToggle.setAttribute('aria-expanded', String(!isOpen));
  if (languageMenu) languageMenu.hidden = isOpen;
});
languageMenu?.querySelectorAll('button[data-language]').forEach((button) => button.addEventListener('click', () => {
  setLanguage(button.dataset.language);
  languageMenu.hidden = true;
  languageToggle?.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('click', (event) => {
  if (languageToggle && languageMenu && !languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }
});

const makeWhatsAppUrl = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
document.querySelectorAll('[data-product-order]').forEach((link) => {
  const product = link.dataset.productOrder;
  link.href = makeWhatsAppUrl(`Hello EcoPower, I would like to order ${product}. Please confirm availability, delivery and payment details.`);
});

document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'mouse' && !event.target.closest('a')) card.classList.toggle('is-open');
  });
});

document.querySelectorAll('[data-faq-toggle]').forEach((button) => button.addEventListener('click', () => {
  const item = button.closest('.faq-item');
  const open = item?.classList.toggle('is-open');
  button.setAttribute('aria-expanded', String(Boolean(open)));
}));

const faqSearch = document.querySelector('.faq-search');
faqSearch?.addEventListener('input', () => {
  const query = faqSearch.value.trim().toLowerCase();
  document.querySelectorAll('.faq-item').forEach((item) => { item.hidden = query && !item.textContent.toLowerCase().includes(query); });
});

document.querySelectorAll('[data-form]').forEach((form) => form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const status = form.querySelector('.form-message');
  const message = Object.entries(values).map(([key, value]) => `${key}: ${value}`).join('\n');
  const button = form.querySelector('button[type="submit"]');
  if (button) button.disabled = true;
  try {
    const response = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...values, type: form.dataset.formType || 'contact' }) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Message could not be saved.');
    if (status) {
      status.textContent = document.documentElement.lang === 'sw' ? 'Asante. Ujumbe wako umehifadhiwa. Tutawasiliana nawe.' : 'Thanks. Your message has been received. We will get back to you.';
      status.classList.add('is-visible');
    }
    form.reset();
  } catch {
    window.open(makeWhatsAppUrl(`Hello EcoPower, I would like to get in touch.\n${message}`), '_blank', 'noopener');
    if (status) {
      status.textContent = document.documentElement.lang === 'sw' ? 'WhatsApp imefunguliwa na ujumbe wako. Bonyeza Tuma.' : 'WhatsApp opened with your message. Tap Send to complete the enquiry.';
      status.classList.add('is-visible');
    }
  } finally {
    if (button) button.disabled = false;
  }
}));

const revealSelectors = [
  'main > section:not(.page-hero):not(.hero)',
  'main > .trust-strip',
  '.section-heading',
  '.product-grid > *',
  '.step-grid > *',
  '.factory-collage',
  '.story-copy',
  '.category-card',
  '.home-stove-card',
  '.home-impact-stats > div',
  '.lighting-card',
  '.stove-card',
  '.journey-card',
  '.person-card',
  '.impact-number',
  '.comparison-card',
  '.impact-benefit',
  '.customer-card',
  '.partners-funder-card',
  '.partners-wakala-card',
  '.partners-wakala-photo',
  '.partners-business-panel',
  '.contact-card',
  '.contact-wakala-card',
  '.contact-payment-panel',
  '.contact-map-card',
  '.contact-form',
  '.faq-group',
  '.faq-reference-cta'
].join(', ');

const scrollRevealElements = [...document.querySelectorAll(revealSelectors)];
scrollRevealElements.forEach((element, index) => {
  element.classList.add('scroll-reveal');
  const direction = index % 3 === 0 ? 'scroll-reveal--left' : index % 3 === 1 ? 'scroll-reveal--right' : 'scroll-reveal--up';
  element.classList.add(direction);
  element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
});

const revealImmediately = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
if (revealImmediately || !('IntersectionObserver' in window)) {
  scrollRevealElements.forEach((element) => element.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -36px' });
  scrollRevealElements.forEach((element) => revealObserver.observe(element));
}

const socialProfiles = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/ecopower_solutions_ltd',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="12" cy="12" r="4.25" fill="none" stroke="currentColor" stroke-width="2" /><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" /></svg>'
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/othman-makange1974',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.5 3.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM3.2 8h2.6v12H3.2V8Zm5 0h2.5v1.64h.04c.35-.66 1.2-1.99 3.64-1.99 3.9 0 4.62 2.56 4.62 5.89V20h-2.6v-5.73c0-1.37-.03-3.13-1.91-3.13-1.92 0-2.21 1.5-2.21 3.03V20H8.2V8Z" /></svg>'
  }
];

const socialLinkMarkup = () => socialProfiles.map((profile) => (
  '<a href="' + profile.url + '" aria-label="' + profile.label + '" target="_blank" rel="noopener noreferrer">' +
  profile.icon +
  '<span class="sr-only">' + profile.label + '</span></a>'
)).join('');

document.querySelectorAll('.social-links').forEach((group) => {
  group.setAttribute('aria-label', 'Social media');
  group.innerHTML = socialLinkMarkup();
});

document.querySelectorAll('.footer-col').forEach((column) => {
  const heading = column.querySelector('h3');
  if (!heading || !/follow us|tufuatilie/i.test(heading.textContent || '')) return;
  column.querySelectorAll(':scope > span').forEach((text) => text.remove());
  const links = document.createElement('div');
  links.className = 'footer-social-links';
  links.setAttribute('aria-label', 'Social media');
  links.innerHTML = socialLinkMarkup();
  column.append(links);
});

const storedLanguage = localStorage.getItem('ecopower-language') || document.documentElement.lang || 'en';
setLanguage(storedLanguage);
if (document.body.dataset.page === 'home' && new URLSearchParams(window.location.search).get('externalPreview') === '1') void syncCmsHomeContent(storedLanguage, true);
if (window.parent !== window) window.parent.postMessage({ type: 'ecopower-cms-preview-ready' }, window.location.origin);
