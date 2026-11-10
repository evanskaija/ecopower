(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.EcoPowerCmsFields = api;
}(typeof window !== 'undefined' ? window : globalThis, function () {
  const text = (id, selector, group, label) => ({ id, selector, kind: 'text', group, label });
  const image = (id, selector, group, label) => ({ id, selector, kind: 'image', group, label });
  const many = (page, prefix, selector, count, kind, group, label) => Array.from({ length: count }, (_, index) => {
    const number = index + 1;
    const itemSelector = selector.replace('{n}', String(number));
    return (kind === 'image' ? image : text)(`${page}.${prefix}.${number}`, itemSelector, group, `${label} ${number}`);
  });

  const footer = (page) => [
    text(`${page}.footer.brand`, '.footer-brand .footer-name', 'footer', 'Footer brand'),
    text(`${page}.footer.description`, '.footer-brand > p', 'footer', 'Footer description'),
    text(`${page}.footer.contactHeading`, '.footer-grid .footer-col:nth-child(2) h3', 'footer', 'Contact heading'),
    text(`${page}.footer.phone`, '.footer-grid .footer-col:nth-child(2) a:nth-of-type(1)', 'footer', 'Phone line'),
    text(`${page}.footer.email`, '.footer-grid .footer-col:nth-child(2) a:nth-of-type(2)', 'footer', 'Email'),
    text(`${page}.footer.address`, '.footer-grid .footer-col:nth-child(2) span', 'footer', 'Address'),
    text(`${page}.footer.paymentHeading`, '.footer-grid .footer-col:nth-child(3) h3', 'footer', 'Payment heading'),
    text(`${page}.footer.mpesa`, '.footer-grid .footer-col:nth-child(3) span:nth-of-type(1)', 'footer', 'M-Pesa line'),
    text(`${page}.footer.crdb`, '.footer-grid .footer-col:nth-child(3) span:nth-of-type(2)', 'footer', 'CRDB line'),
    text(`${page}.footer.cash`, '.footer-grid .footer-col:nth-child(3) span:nth-of-type(3)', 'footer', 'Cash line'),
    text(`${page}.footer.socialHeading`, '.footer-grid .footer-col:nth-child(4) h3', 'footer', 'Social heading'),
    text(`${page}.footer.socialOne`, '.footer-grid .footer-col:nth-child(4) span:nth-of-type(1)', 'footer', 'Social line one'),
    text(`${page}.footer.socialTwo`, '.footer-grid .footer-col:nth-child(4) span:nth-of-type(2)', 'footer', 'Social line two')
  ];

  const products = [
    text('products.hero.eyebrow', '.page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('products.hero.title', '.page-hero h1', 'hero', 'Hero heading'),
    text('products.hero.description', '.page-hero h1 + p', 'hero', 'Hero description'),
    image('products.hero.image', '.page-hero-art', 'hero', 'Hero image'),
    text('products.makange.eyebrow', '#makange .catalogue-copy > .eyebrow', 'makange', 'Section label'),
    text('products.makange.title', '#makange .catalogue-copy h2', 'makange', 'Section heading'),
    text('products.makange.description', '#makange .catalogue-copy > p:not(.eyebrow)', 'makange', 'Description'),
    image('products.makange.image', '#makange .catalogue-image', 'makange', 'Product image'),
    text('products.makange.order', '#makange .catalogue-copy > .button', 'makange', 'Order button'),
    text('products.lighting.eyebrow', '#lighting .section-heading .eyebrow', 'lighting', 'Lighting label'),
    text('products.lighting.title', '#lighting .section-heading h2', 'lighting', 'Lighting heading'),
    text('products.lighting.description', '#lighting .section-heading > p', 'lighting', 'Lighting description'),
    ...many('products', 'lighting.image', '#lighting .lighting-card:nth-child({n}) img', 4, 'image', 'lighting', 'Lighting image'),
    ...many('products', 'lighting.title', '#lighting .lighting-card:nth-child({n}) strong', 4, 'text', 'lighting', 'Lighting step'),
    ...many('products', 'lighting.description', '#lighting .lighting-card:nth-child({n}) p', 4, 'text', 'lighting', 'Lighting step description'),
    text('products.stoves.eyebrow', '#stoves .section-heading .eyebrow', 'stoves', 'Stove label'),
    text('products.stoves.title', '#stoves .section-heading h2', 'stoves', 'Stove heading'),
    text('products.stoves.description', '#stoves .section-heading > p', 'stoves', 'Stove description'),
    ...many('products', 'stoves.image', '#stoves .stove-card:nth-child({n}) img', 4, 'image', 'stoves', 'Stove image'),
    ...many('products', 'stoves.kicker', '#stoves .stove-card:nth-child({n}) .card-kicker', 4, 'text', 'stoves', 'Stove category'),
    ...many('products', 'stoves.name', '#stoves .stove-card:nth-child({n}) h3', 4, 'text', 'stoves', 'Stove name'),
    ...many('products', 'stoves.description', '#stoves .stove-card:nth-child({n}) p:not(.card-kicker)', 4, 'text', 'stoves', 'Stove description'),
    ...many('products', 'stoves.price', '#stoves .stove-card:nth-child({n}) .price-row strong', 4, 'text', 'stoves', 'Stove price'),
    ...many('products', 'stoves.order', '#stoves .stove-card:nth-child({n}) .button', 4, 'text', 'stoves', 'Stove button'),
    text('products.bundle.title', '#bundle h3', 'bundle', 'Bundle heading'),
    text('products.bundle.description', '#bundle p', 'bundle', 'Bundle description'),
    text('products.bundle.total', '#bundle .price-row > strong', 'bundle', 'Bundle price'),
    text('products.bundle.order', '#bundle .button', 'bundle', 'Bundle button'),
    text('products.cta.title', '.products-bottom-cta h2', 'cta', 'CTA heading'),
    text('products.cta.description', '.products-bottom-cta p', 'cta', 'CTA description'),
    text('products.cta.button', '.products-bottom-cta .button', 'cta', 'CTA button')
  ];

  const about = [
    text('about.hero.eyebrow', '.about-page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('about.hero.title', '.about-page-hero h1', 'hero', 'Hero heading'),
    image('about.hero.image', '.about-page-hero .page-hero-art', 'hero', 'Hero image'),
    text('about.intro.title', '.about-intro h2', 'intro', 'Introduction heading'),
    text('about.intro.description', '.about-intro .about-layout > div:first-child p', 'intro', 'Introduction description'),
    text('about.mission.title', '.about-intro .mission-card:nth-child(1) h3', 'intro', 'Mission heading'),
    text('about.mission.description', '.about-intro .mission-card:nth-child(1) p', 'intro', 'Mission description'),
    text('about.vision.title', '.about-intro .mission-card:nth-child(2) h3', 'intro', 'Vision heading'),
    text('about.vision.description', '.about-intro .mission-card:nth-child(2) p', 'intro', 'Vision description'),
    text('about.story.title', '.about-story-section h2', 'story', 'Story heading'),
    text('about.story.subtitle', '.about-story-subtitle', 'story', 'Story subtitle'),
    ...many('about', 'story.year', '.timeline-card:nth-child({n}) strong', 4, 'text', 'story', 'Story year'),
    ...many('about', 'story.title', '.timeline-card:nth-child({n}) h3', 4, 'text', 'story', 'Story milestone'),
    ...many('about', 'story.description', '.timeline-card:nth-child({n}) p', 4, 'text', 'story', 'Story description'),
    text('about.process.title', '.about-process-section h2', 'process', 'Process heading'),
    ...many('about', 'process.image', '.journey-card:nth-child({n}) img', 4, 'image', 'process', 'Process image'),
    ...many('about', 'process.title', '.journey-card:nth-child({n}) strong', 4, 'text', 'process', 'Process step'),
    ...many('about', 'process.description', '.journey-card:nth-child({n}) p', 4, 'text', 'process', 'Process description'),
    image('about.founder.image', '.about-founder-card img', 'founder', 'Founder image'),
    text('about.founder.name', '.about-founder-card h2', 'founder', 'Founder name'),
    text('about.founder.role', '.about-founder-card span', 'founder', 'Founder role'),
    text('about.founder.description', '.about-founder-card p', 'founder', 'Founder description'),
    text('about.founder.link', '.about-founder-card .text-link', 'founder', 'Founder link'),
    ...many('about', 'partners.logo', '.about-bottom-section .home-partner-logo:nth-child({n}) img', 6, 'image', 'partners', 'Partner logo')
  ];

  const team = [
    text('team.hero.eyebrow', '.page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('team.hero.title', '.page-hero h1', 'hero', 'Hero heading'),
    text('team.hero.description', '.page-hero h1 + p', 'hero', 'Hero description'),
    image('team.hero.image', '.page-hero-art', 'hero', 'Hero image'),
    text('team.management.eyebrow', '.section-white .section-heading .eyebrow', 'management', 'Management label'),
    text('team.management.title', '.section-white .section-heading h2', 'management', 'Management heading'),
    text('team.management.description', '.section-white .section-heading > p', 'management', 'Management description'),
    ...many('team', 'management.image', 'section.section-white:nth-of-type(2) .person-card:nth-child({n}) img', 2, 'image', 'management', 'Management photo'),
    ...many('team', 'management.name', 'section.section-white:nth-of-type(2) .person-card:nth-child({n}) h3', 2, 'text', 'management', 'Management name'),
    ...many('team', 'management.role', 'section.section-white:nth-of-type(2) .person-card:nth-child({n}) span', 2, 'text', 'management', 'Management role'),
    ...many('team', 'management.bio', 'section.section-white:nth-of-type(2) .person-card:nth-child({n}) p', 2, 'text', 'management', 'Management biography'),
    text('team.board.eyebrow', '.section-cream .section-heading .eyebrow', 'board', 'Board label'),
    text('team.board.title', '.section-cream .section-heading h2', 'board', 'Board heading'),
    text('team.board.description', '.section-cream .section-heading > p', 'board', 'Board description'),
    ...many('team', 'board.image', '.section-cream .person-card:nth-child({n}) img', 3, 'image', 'board', 'Board photo'),
    ...many('team', 'board.name', '.section-cream .person-card:nth-child({n}) h3', 3, 'text', 'board', 'Board name'),
    ...many('team', 'board.role', '.section-cream .person-card:nth-child({n}) span', 3, 'text', 'board', 'Board role'),
    image('team.crew.image', '.crew-panel > img', 'crew', 'Crew image'),
    text('team.crew.eyebrow', '.crew-panel .eyebrow', 'crew', 'Crew label'),
    text('team.crew.title', '.crew-panel h2', 'crew', 'Crew heading'),
    text('team.crew.description', '.crew-panel > div > p:not(.eyebrow)', 'crew', 'Crew description'),
    text('team.cta.title', '.cta h2', 'cta', 'CTA heading'),
    text('team.cta.description', '.cta-inner > p:not(.eyebrow)', 'cta', 'CTA description')
  ];

  const impact = [
    text('impact.hero.eyebrow', '.impact-page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('impact.hero.title', '.impact-page-hero h1', 'hero', 'Hero heading'),
    text('impact.hero.description', '.impact-page-hero h1 + p', 'hero', 'Hero description'),
    text('impact.metrics.label', '.impact-metrics-label', 'metrics', 'Metrics label'),
    ...many('impact', 'metrics.value', '.impact-number:nth-child({n}) strong', 4, 'text', 'metrics', 'Metric value'),
    ...many('impact', 'metrics.title', '.impact-number:nth-child({n}) span', 4, 'text', 'metrics', 'Metric title'),
    ...many('impact', 'metrics.note', '.impact-number:nth-child({n}) small', 4, 'text', 'metrics', 'Metric note'),
    text('impact.comparison.title', '.comparison-card h2', 'comparison', 'Comparison heading'),
    text('impact.comparison.description', '.comparison-card > p', 'comparison', 'Comparison description'),
    text('impact.comparison.note', '.comparison-note', 'comparison', 'Comparison note'),
    ...many('impact', 'comparison.name', '.comparison-card .data-table tbody tr:nth-child({n}) td:nth-child(1) strong', 3, 'text', 'comparison', 'Fuel name'),
    ...many('impact', 'comparison.unit', '.comparison-card .data-table tbody tr:nth-child({n}) td:nth-child(1) small', 3, 'text', 'comparison', 'Fuel price and unit'),
    ...many('impact', 'comparison.amount', '.comparison-card .data-table tbody tr:nth-child({n}) td:nth-child(2)', 3, 'text', 'comparison', 'Amount per day'),
    ...many('impact', 'comparison.cost', '.comparison-card .data-table tbody tr:nth-child({n}) td:nth-child(3)', 3, 'text', 'comparison', 'Cost per day'),
    ...many('impact', 'benefits.title', '.impact-benefit:nth-child({n}) h3', 3, 'text', 'benefits', 'Impact benefit'),
    ...many('impact', 'benefits.description', '.impact-benefit:nth-child({n}) p', 3, 'text', 'benefits', 'Impact benefit description'),
    text('impact.customers.title', '.impact-customers-section h2', 'customers', 'Customers heading'),
    ...many('impact', 'customers.image', '.customer-card:nth-child({n}) img', 2, 'image', 'customers', 'Customer photo'),
    ...many('impact', 'customers.quote', '.customer-card:nth-child({n}) blockquote', 2, 'text', 'customers', 'Customer quote'),
    ...many('impact', 'customers.description', '.customer-card:nth-child({n}) p', 2, 'text', 'customers', 'Customer description'),
    ...many('impact', 'customers.attribution', '.customer-card:nth-child({n}) cite', 2, 'text', 'customers', 'Customer attribution')
  ];

  const partners = [
    text('partners.hero.eyebrow', '.partners-page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('partners.hero.title', '.partners-page-hero h1', 'hero', 'Hero heading'),
    text('partners.hero.description', '.partners-page-hero h1 + p', 'hero', 'Hero description'),
    text('partners.wakala.eyebrow', '.partners-wakala-card > .eyebrow', 'wakala', 'WAKALA label'),
    text('partners.wakala.title', '.partners-wakala-card h2', 'wakala', 'WAKALA heading'),
    text('partners.wakala.description', '.partners-wakala-card > p:not(.eyebrow):not(.partners-wakala-label)', 'wakala', 'WAKALA description'),
    text('partners.wakala.label', '.partners-wakala-label', 'wakala', 'WAKALA shop list label'),
    text('partners.wakala.followup', '.partners-wakala-card > p:last-of-type', 'wakala', 'WAKALA follow-up description'),
    image('partners.wakala.image', '.partners-wakala-photo', 'wakala', 'WAKALA image'),
    text('partners.wakala.button', '.partners-wakala-card .button', 'wakala', 'WAKALA button'),
    ...many('partners', 'wakala.name', '.partners-wakala-card .wakala-card:nth-child({n}) strong', 5, 'text', 'wakala', 'WAKALA shop name'),
    ...many('partners', 'wakala.phone', '.partners-wakala-card .wakala-card:nth-child({n}) span', 5, 'text', 'wakala', 'WAKALA phone'),
    text('partners.business.eyebrow', '.partners-business-section .eyebrow', 'business', 'Business label'),
    text('partners.business.title', '.partners-business-section h2', 'business', 'Business heading'),
    text('partners.business.description', '.partners-business-section > .page-width > div > p', 'business', 'Business description'),
    text('partners.business.button', '.partners-business-section .button', 'business', 'Business button'),
    ...many('partners', 'business.service', '.partner-services .service-pill:nth-child({n})', 4, 'text', 'business', 'Business service'),
    text('partners.funders.title', '.partners-funders-section h2', 'funders', 'Funders heading'),
    text('partners.funders.description', '.partners-funders-intro', 'funders', 'Funders description'),
    image('partners.funders.image.1', '.partners-funder-card:nth-child(1) img', 'funders', 'Partner logo 1'),
    image('partners.funders.image.2', '.partners-funder-card:nth-child(2) img', 'funders', 'Partner logo 2'),
    image('partners.funders.image.3', '.partners-funder-card:nth-child(3) img', 'funders', 'Partner logo 3'),
    image('partners.funders.image.4', '.partners-funder-card:nth-child(4) img', 'funders', 'Partner logo 4'),
    image('partners.funders.image.5', '.partners-funder-card:nth-child(5) img', 'funders', 'Partner logo 5'),
    image('partners.funders.image.6', '.partners-funder-card:nth-child(6) img', 'funders', 'Partner logo 6'),
    ...many('partners', 'funders.name', '.partners-funder-card:nth-child({n}) span', 6, 'text', 'funders', 'Partner name')
  ];

  const faqQuestionDefinitions = [];
  const faqGroupCounts = [4, 3, 5, 2];
  faqGroupCounts.forEach((count, groupIndex) => {
    const group = groupIndex + 1;
    for (let item = 1; item <= count; item += 1) {
      faqQuestionDefinitions.push(text(
        `faq.question.${group}.${item}`,
        `.faq-group:nth-child(${group}) .faq-item:nth-child(${item}) .faq-question span:first-child`,
        'questions',
        `Question ${group}.${item}`
      ));
      faqQuestionDefinitions.push(text(
        `faq.answer.${group}.${item}`,
        `.faq-group:nth-child(${group}) .faq-item:nth-child(${item}) .faq-answer`,
        'questions',
        `Answer ${group}.${item}`
      ));
    }
  });

  const faq = [
    text('faq.hero.eyebrow', '.faq-page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('faq.hero.title', '.faq-page-hero h1', 'hero', 'Hero heading'),
    ...many('faq', 'group.title', '.faq-group:nth-child({n}) h3', 4, 'text', 'questions', 'Question category'),
    ...faqQuestionDefinitions,
    text('faq.cta.title', '.faq-reference-cta strong', 'cta', 'FAQ CTA'),
    text('faq.cta.button', '.faq-reference-cta .button', 'cta', 'FAQ CTA button')
  ];

  const contact = [
    text('contact.hero.eyebrow', '.contact-page-hero .eyebrow', 'hero', 'Hero eyebrow'),
    text('contact.hero.title', '.contact-page-hero h1', 'hero', 'Hero heading'),
    text('contact.hero.description', '.contact-page-hero h1 + p', 'hero', 'Hero description'),
    text('contact.phone.label', '.contact-card:nth-child(1) .eyebrow', 'contact', 'Phone label'),
    text('contact.phone.number', '.contact-card:nth-child(1) h2', 'contact', 'Phone number'),
    text('contact.phone.secondary', '.contact-card:nth-child(1) > span', 'contact', 'Secondary phone'),
    text('contact.address.label', '.contact-card:nth-child(2) .eyebrow', 'contact', 'Address label'),
    text('contact.address.value', '.contact-address', 'contact', 'Address'),
    text('contact.hours.label', '.contact-card:nth-child(3) .eyebrow', 'contact', 'Hours label'),
    text('contact.email', '.contact-email', 'contact', 'Email'),
    text('contact.wakala.title', '.contact-wakala-card h2', 'wakala', 'WAKALA heading'),
    text('contact.wakala.description', '.contact-wakala-card > p', 'wakala', 'WAKALA description'),
    ...many('contact', 'wakala.location', '.wakala-actions > a:nth-child({n}) strong', 5, 'text', 'wakala', 'WAKALA location'),
    ...many('contact', 'wakala.phone', '.wakala-actions > a:nth-child({n}) > span', 5, 'text', 'wakala', 'WAKALA phone'),
    text('contact.payment.title', '.contact-payment-copy h2', 'payment', 'Payment heading'),
    text('contact.payment.description', '.contact-payment-copy > p', 'payment', 'Payment description'),
    image('contact.payment.mpesaQr', '.contact-qr-stack img:nth-child(1)', 'payment', 'M-Pesa QR'),
    image('contact.payment.crdbQr', '.contact-qr-stack img:nth-child(2)', 'payment', 'CRDB QR'),
    text('contact.form.title', '.contact-form h2', 'form', 'Form heading')
  ];

  const definitions = {
    products: [...products, ...footer('products')],
    about: [...about, ...footer('about')],
    team: [...team, ...footer('team')],
    impact: [...impact, ...footer('impact')],
    partners: [...partners, ...footer('partners')],
    faq: [...faq, ...footer('faq')],
    contact: [...contact, ...footer('contact')]
  };
  const byId = new Map(Object.values(definitions).flat().map((definition) => [definition.id, definition]));
  const get = (page) => definitions[page] || [];
  const find = (page, id) => get(page).find((definition) => definition.id === id) || byId.get(id) || null;
  const install = (page, root = typeof document !== 'undefined' ? document : null) => {
    if (!root) return;
    get(page).forEach((definition) => {
      const element = root.querySelector(definition.selector);
      if (element) {
        element.setAttribute('data-cms-id', definition.id);
        const section = element.closest('section, footer');
        if (section && !section.dataset.cmsSection) section.dataset.cmsSection = definition.group || 'content';
      }
    });
  };
  return { definitions, get, find, install };
}));
