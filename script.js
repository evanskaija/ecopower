const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const languageToggle = document.querySelector('.language-switcher');
const languageMenu = document.querySelector('.language-menu');
const siteHeader = document.querySelector('.site-header');

const updateHeaderPosition = () => {
  if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 24);
};

updateHeaderPosition();
window.addEventListener('scroll', updateHeaderPosition, { passive: true });

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('open', !open);
    document.body.classList.toggle('menu-open', !open);
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

if (languageToggle && languageMenu) {
  const languageCode = languageToggle.querySelector('.language-code');
  const languageFlag = languageToggle.querySelector('.flag');
  languageToggle.addEventListener('click', () => {
    const open = languageToggle.getAttribute('aria-expanded') === 'true';
    languageToggle.setAttribute('aria-expanded', String(!open));
    languageMenu.hidden = open;
  });

  languageMenu.querySelectorAll('button').forEach((language) => {
    language.addEventListener('click', () => {
      const isSwahili = language.dataset.language === 'sw';
      if (languageCode) languageCode.textContent = isSwahili ? 'SW' : 'EN';
      if (languageFlag) languageFlag.textContent = isSwahili ? 'TZ' : 'GB';
      languageMenu.querySelectorAll('button').forEach((option) => option.classList.toggle('selected', option === language));
      languageMenu.hidden = true;
      languageToggle.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!languageToggle.contains(event.target) && !languageMenu.contains(event.target)) {
      languageMenu.hidden = true;
      languageToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}` || (visible.target.id === 'top' && link.getAttribute('href') === '#top')));
}, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .2, .6] });
sections.forEach((section) => sectionObserver.observe(section));

const revealTargets = [...document.querySelectorAll('main section .page-width > *')];
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

  revealTargets.forEach((target, index) => {
    target.classList.add('scroll-reveal', index % 3 === 0 ? 'from-left' : index % 3 === 1 ? 'from-right' : 'from-bottom');
    target.style.transitionDelay = `${Math.min((index % 3) * 90, 180)}ms`;
    revealObserver.observe(target);
  });
}

const testimonialData = [
  { quote: 'No more smoke in my kitchen!', name: 'Mama Fatuma', location: 'Kinondoni', initials: 'MF' },
  { quote: 'Cut my fuel costs by half.', name: "Juma's Restaurant", location: 'Salasala', initials: 'JR' },
  { quote: 'Reliable delivery every month.', name: "St. Mary's School", location: 'Mbagala', initials: 'SM' },
];

const testimonialRoot = document.querySelector('[data-testimonials]');
const testimonialFeature = testimonialRoot?.querySelector('.testimonial-feature');
const testimonialQuote = testimonialRoot?.querySelector('.testimonial-quote');
const testimonialName = testimonialRoot?.querySelector('.testimonial-name');
const testimonialLocation = testimonialRoot?.querySelector('.testimonial-location');
const testimonialAvatar = testimonialRoot?.querySelector('.testimonial-avatar');
const testimonialIndex = testimonialRoot?.querySelector('.testimonial-index');
const testimonialDots = [...(testimonialRoot?.querySelectorAll('[data-testimonial-dot]') || [])];
const previousTestimonial = testimonialRoot?.querySelector('[data-testimonial-prev]');
const nextTestimonial = testimonialRoot?.querySelector('[data-testimonial-next]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let activeTestimonial = 0;
let testimonialTimer;

const renderTestimonial = (index) => {
  if (!testimonialFeature || !testimonialQuote || !testimonialName || !testimonialLocation || !testimonialAvatar || !testimonialIndex) return;
  activeTestimonial = (index + testimonialData.length) % testimonialData.length;
  const testimonial = testimonialData[activeTestimonial];
  testimonialFeature.classList.add('is-changing');
  window.setTimeout(() => {
    testimonialQuote.textContent = testimonial.quote;
    testimonialName.textContent = testimonial.name;
    testimonialLocation.textContent = testimonial.location;
    testimonialAvatar.textContent = testimonial.initials;
    testimonialIndex.textContent = `0${activeTestimonial + 1} / 0${testimonialData.length}`;
    testimonialDots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeTestimonial;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });
    testimonialFeature.classList.remove('is-changing');
  }, reducedMotion ? 0 : 230);
};

const stopTestimonialRotation = () => window.clearInterval(testimonialTimer);
const startTestimonialRotation = () => {
  stopTestimonialRotation();
  if (!reducedMotion) testimonialTimer = window.setInterval(() => renderTestimonial(activeTestimonial + 1), 5200);
};

if (testimonialRoot) {
  previousTestimonial?.addEventListener('click', () => { renderTestimonial(activeTestimonial - 1); startTestimonialRotation(); });
  nextTestimonial?.addEventListener('click', () => { renderTestimonial(activeTestimonial + 1); startTestimonialRotation(); });
  testimonialDots.forEach((dot) => dot.addEventListener('click', () => {
    renderTestimonial(Number(dot.dataset.testimonialDot));
    startTestimonialRotation();
  }));
  testimonialRoot.addEventListener('mouseenter', stopTestimonialRotation);
  testimonialRoot.addEventListener('mouseleave', startTestimonialRotation);
  testimonialRoot.addEventListener('focusin', stopTestimonialRotation);
  testimonialRoot.addEventListener('focusout', (event) => {
    if (!testimonialRoot.contains(event.relatedTarget)) startTestimonialRotation();
  });
  document.addEventListener('visibilitychange', () => document.hidden ? stopTestimonialRotation() : startTestimonialRotation());
  startTestimonialRotation();
}

