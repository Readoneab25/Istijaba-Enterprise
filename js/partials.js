// ===========================================================
// Shared header + footer, injected on every page
// ===========================================================
const BRAND_MARK = `
<svg class="brand-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="20" r="19" stroke="currentColor" stroke-width="1.4" opacity="0.25"/>
  <path d="M6 21c4-6 10-9 15-6 3.5 2 4 6 8 6" stroke="#3E7052" stroke-width="2.2" stroke-linecap="round" fill="none"/>
  <path d="M27 15l4.5 6-4.5 6" stroke="#C88A3D" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="12.5" cy="18.5" r="1.4" fill="#0F1B14"/>
</svg>`;

function renderHeader(active) {
  const links = [
    ['index.html', 'Home'],
    ['about.html', 'About'],
    ['products.html', 'Products'],
    ['gallery.html', 'Gallery'],
    ['contact.html', 'Contact'],
  ];
  const navLinks = links.map(([href, label]) =>
    `<a href="${href}" ${active === href ? 'aria-current="page"' : ''}>${label}</a>`
  ).join('');

  return `
  <header class="site-header" id="siteHeader">
    <div class="wrap header-inner">
      <a href="index.html" class="brand">
        ${BRAND_MARK}
        <span class="brand-name">Istijaba
          <span class="sub">Enterprises</span>
        </span>
      </a>
      <nav class="main-nav" id="mainNav">
        ${navLinks}
        <button  class="btn btn-primary">  <a href="contact.html" >Get a Quote</a></button> 
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span  ></span><span></span>
      </button>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="brand">
            ${BRAND_MARK}
            <span class="brand-name">Istijaba<span class="sub">Enterprises</span></span>
          </a>
          <p class="footer-tagline" style="cursor: default;">Fish feed, live fish and farm supplies for people who take their pond seriously.</p>
        </div>
        <div class="footer-col">
          <h4 style="cursor: default;">Explore</h4>
          <a href="products.html">Products</a>
          <a href="gallery.html">Gallery</a>
          <a href="about.html">About us</a>
          <a href="contact.html">Contact</a>
        </div>
        <div class="footer-col">
          <h4 style="cursor: default;">Products</h4>
          <a href="products.html#feed">Fish feed</a>
          <a href="products.html#livestock">Live fish</a>
          <a href="products.html#equipment">Pond equipment</a>
        </div>
        <div class="footer-col">
          <h4 style="cursor: default;">Reach us</h4>
          <p style="cursor: default;">Mon &ndash; Sat, 8am &ndash; 6pm</p>
          <a href="tel:+2340000000000">+234 000 000 0000</a>
          <a href="mailto:hello@istijabaenterprises.com">hello@istijabaenterprises.com</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span style="cursor: default;">&copy; <span id="year"></span> Istijaba Enterprises. All rights reserved.</span>
        <span style="cursor: default;"> <a href="https://wa.me/2349036795652">  Designed by Sanctum</a></span>
        <span style="cursor: default;">Built for people who feed the water that feeds everyone.</span>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/2340000000000" class="wa-float" aria-label="Chat on WhatsApp" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.12h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.26-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.2-8.25 8.2zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.12-1.05-.38-1.99-1.22-.74-.65-1.24-1.46-1.38-1.71-.15-.24-.02-.37.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.77-1.84-.2-.48-.41-.42-.56-.43-.15-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.22.24-.87.85-.87 2.08s.89 2.41 1.02 2.57c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.07-.11-.23-.17-.48-.29z"/></svg>
  </a>`;
}

document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  document.getElementById('header-placeholder').innerHTML = renderHeader(page);
  document.getElementById('footer-placeholder').innerHTML = renderFooter();
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile nav toggle
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
  }));


  
  // header scroll state
  const header = document.getElementById('siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
});