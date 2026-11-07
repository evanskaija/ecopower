const phone = '255784017225';

const translations = {
  en: {
    'nav.home': 'Home', 'nav.products': 'Products & prices', 'nav.about': 'About us', 'nav.team': 'Our team', 'nav.impact': 'Our impact', 'nav.partner': 'Partner with us', 'nav.faq': 'FAQ', 'nav.contact': 'Contact', 'nav.order': 'Order on WhatsApp',
    'lang.choose': 'Choose language', 'lang.english': 'English', 'lang.swahili': 'Swahili',
    'common.learn': 'Learn more', 'common.order': 'Order on WhatsApp', 'common.quote': 'Request a quote', 'common.contact': 'Contact the team', 'common.send': 'Send message', 'common.call': 'Call us',
    'home.eyebrow': 'Clean cooking. Made in Tanzania.', 'home.title': 'Makange - Kwa maisha <em>bora.</em>', 'home.lede': 'Clean cooking fuel made from recovered charcoal dust, agricultural and forest waste at our factory in Kunduchi. Reliable energy for homes, food businesses and institutions.', 'home.explore': 'Explore our products', 'home.caption': 'Pay cash on delivery or through Lipa Namba.', 'home.price': 'Makange pricing', 'home.priceNote': 'Order from 20 kg for delivery within 10 km. Smaller orders can be found at a WAKALA shop.', 'home.trustFactory': 'Made in our own factory', 'home.trustFactoryNote': 'Silver Sands, Kunduchi', 'home.trustDelivery': 'Next-day delivery', 'home.trustDeliveryNote': 'Within our delivery area', 'home.trustPayment': 'Pay any way', 'home.trustPaymentNote': 'Cash, mobile money or bank', 'home.trustBurn': 'Long, steady burn', 'home.trustBurnNote': 'Less smoke while cooking', 'home.productsEyebrow': 'Products & prices', 'home.productsTitle': 'Fuel that fits <em>your life.</em>', 'home.productsText': 'Makange is made for the way Tanzanian homes, food sellers, schools and institutions cook every day.', 'home.monthlyTitle': 'Regular monthly orders', 'home.monthlyText': 'A fixed number of bags delivered through the month, paid on delivery. Ideal for schools, restaurants and institutions.', 'home.howEyebrow': 'Simple ordering', 'home.howTitle': 'Order in <em>three steps.</em>', 'home.howText': 'Tell us what you need, choose your payment method, and our delivery crew will bring it to you.', 'home.step1': 'Contact or WhatsApp', 'home.step1Text': 'Tell us the sack size, how many you need, and where.', 'home.step2': 'Pay your way', 'home.step2Text': 'Use Lipa Namba now, or pay cash when it arrives.', 'home.step3': 'Delivered next day', 'home.step3Text': 'Our Toyo crew delivers within 10 km. For smaller orders, visit a WAKALA shop.', 'home.paymentTitle': 'Pay by Lipa Namba from any network or bank', 'home.paymentText': 'Send the payment message to WhatsApp after paying so we can confirm your order.', 'home.factoryEyebrow': 'From our factory', 'home.factoryTitle': 'A working plant in Kunduchi, with its own delivery fleet', 'home.factoryText': 'EcoPower Solutions Limited makes Makange briquettes from recovered charcoal dust, agricultural and forest waste. Our factory and delivery partners help bring reliable cooking fuel closer to households and businesses.', 'home.usersEyebrow': 'Who cooks with Makange', 'home.usersTitle': 'Built for real kitchens.', 'home.impactEyebrow': 'Our impact', 'home.impactTitle': 'Cleaner cooking with <em>measurable change.</em>', 'home.impactText': 'Our full-production estimates show the potential for waste recovery, local livelihoods and lower everyday cooking costs.', 'home.ctaTitle': 'Ready to cook <em>smarter?</em>', 'home.ctaText': 'Order Makange or contact the team for a business supply quotation.',
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
    'home.eyebrow': 'Upishi safi. Umetengenezwa Tanzania.', 'home.title': 'Makange - Kwa maisha <em>bora.</em>', 'home.lede': 'Nishati safi ya kupikia inayotengenezwa kutokana na mabaki ya mkaa, taka za kilimo na misitu katika kiwanda chetu Kunduchi. Nishati ya kuaminika kwa nyumba, biashara za chakula na taasisi.', 'home.explore': 'Tazama bidhaa zetu', 'home.caption': 'Lipa kwa fedha taslimu unapopokea au Lipa Namba.', 'home.price': 'Bei za Makange', 'home.priceNote': 'Agiza kuanzia kilo 20 kwa delivery ndani ya km 10. Agizo dogo linapatikana kwa WAKALA.', 'home.trustFactory': 'Imetengenezwa kiwandani kwetu', 'home.trustFactoryNote': 'Silver Sands, Kunduchi', 'home.trustDelivery': 'Delivery siku inayofuata', 'home.trustDeliveryNote': 'Ndani ya eneo letu', 'home.trustPayment': 'Lipa kwa njia yoyote', 'home.trustPaymentNote': 'Cash, simu au benki', 'home.trustBurn': 'Moto mrefu na thabiti', 'home.trustBurnNote': 'Moshi mdogo wakati wa kupika', 'home.productsEyebrow': 'Bidhaa na bei', 'home.productsTitle': 'Mafuta yanayolingana na <em>maisha yako.</em>', 'home.productsText': 'Makange imetengenezwa kwa namna ambavyo nyumba, mama ntilie, shule na taasisi Tanzania hupika kila siku.', 'home.monthlyTitle': 'Maagizo ya kila mwezi', 'home.monthlyText': 'Idadi maalum ya magunia inapelekwa kila mwezi na inalipwa wakati wa delivery. Inafaa kwa shule, migahawa na taasisi.', 'home.howEyebrow': 'Kuagiza kwa urahisi', 'home.howTitle': 'Agiza kwa <em>hatua tatu.</em>', 'home.howText': 'Tuambie unachohitaji, chagua njia ya malipo, na timu yetu italeta bidhaa kwako.', 'home.step1': 'Wasiliana WhatsApp', 'home.step1Text': 'Tuambie ukubwa wa gunia, idadi na eneo lako.', 'home.step2': 'Lipa kwa njia yako', 'home.step2Text': 'Tumia Lipa Namba sasa au lipa cash wakati bidhaa inafika.', 'home.step3': 'Delivery siku inayofuata', 'home.step3Text': 'Toyo yetu inaleta bidhaa ndani ya km 10. Kwa agizo dogo, tembelea WAKALA.', 'home.paymentTitle': 'Lipa Namba kutoka mtandao au benki yoyote', 'home.paymentText': 'Tuma ujumbe wa malipo WhatsApp baada ya kulipa ili tuthibitishe oda yako.', 'home.factoryEyebrow': 'Kutoka kiwandani kwetu', 'home.factoryTitle': 'Kiwanda kinachofanya kazi Kunduchi, chenye delivery yake', 'home.factoryText': 'EcoPower Solutions Limited inatengeneza briquettes za Makange kutokana na mabaki ya mkaa, taka za kilimo na misitu. Kiwanda na washirika wetu wa delivery huleta nishati ya kuaminika karibu na nyumba na biashara.', 'home.usersEyebrow': 'Nani anapika kwa Makange', 'home.usersTitle': 'Imetengenezwa kwa jikoni halisi.', 'home.impactEyebrow': 'Matokeo yetu', 'home.impactTitle': 'Upishi safi wenye <em>mabadiliko yanayopimika.</em>', 'home.impactText': 'Makadirio ya uzalishaji kamili yanaonyesha uwezo wa kubadilisha taka, kutengeneza ajira na kupunguza gharama za kupika kila siku.', 'home.ctaTitle': 'Uko tayari kupika <em>kwa werevu?</em>', 'home.ctaText': 'Agiza Makange au wasiliana na timu kwa bei ya supply ya biashara.',
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
  'Or pay cash when your order arrives. After paying, send the payment message on WhatsApp to 0784 017 225 so we can confirm your order.': 'Au lipa cash oda yako inapofika. Baada ya kulipa, tuma ujumbe wa malipo WhatsApp kwa 0784 017 225 ili tuthibitishe oda yako.',
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

const setLanguage = (language) => {
  const safeLanguage = language === 'sw' ? 'sw' : 'en';
  localStorage.setItem('ecopower-language', safeLanguage);
  applyTranslations(safeLanguage);
  const code = document.querySelector('.language-code');
  const currentFlag = document.querySelector('.flag-current');
  const secondaryFlag = document.querySelector('.flag-secondary');
  if (code) code.textContent = safeLanguage.toUpperCase();
  if (currentFlag) currentFlag.src = safeLanguage === 'sw' ? 'Tanzania.webp' : 'United-States-of-America.webp';
  if (secondaryFlag) secondaryFlag.src = safeLanguage === 'sw' ? 'United-States-of-America.webp' : 'Tanzania.webp';
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

document.querySelectorAll('[data-form]').forEach((form) => form.addEventListener('submit', (event) => {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(form).entries());
  const message = Object.entries(values).map(([key, value]) => `${key}: ${value}`).join('\n');
  window.open(makeWhatsAppUrl(`Hello EcoPower, I would like to get in touch.\n${message}`), '_blank', 'noopener');
  const status = form.querySelector('.form-message');
  if (status) {
    status.textContent = document.documentElement.lang === 'sw' ? 'Asante. WhatsApp imefunguliwa na ujumbe wako. Bonyeza Tuma.' : 'Thanks. WhatsApp opened with your message. Tap Send to complete the enquiry.';
    status.classList.add('is-visible');
  }
  form.reset();
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

const storedLanguage = localStorage.getItem('ecopower-language') || document.documentElement.lang || 'en';
setLanguage(storedLanguage);
