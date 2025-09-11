/* ===== Alternating Backgrounds: brand / white / brand / white… ===== */
document.addEventListener('DOMContentLoaded', () => {
  const brand = getComputedStyle(document.documentElement).getPropertyValue('--brand').trim() || '#f1dabe';
  const sections = document.querySelectorAll('section[data-alt="brand-white"]');
  sections.forEach((sec, i) => {
    sec.style.backgroundColor = (i % 2 === 0) ? brand : '#ffffff';
  });
});

/* ===== Build Galleries (all services) using data attributes =====
   Each gallery wrapper must have:
   - data-folder="assets/wedding"
   - data-prefix="wedding"
   - data-count="10"
*/
function buildGallery(wrapper) {
  const folder = wrapper.dataset.folder;
  const prefix = wrapper.dataset.prefix;
  const count  = parseInt(wrapper.dataset.count || '0', 10);

  if (!folder || !prefix || !count) return;

  const frag = document.createDocumentFragment();
  for (let i = 1; i <= count; i++) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <img
        src="${folder}/${prefix}-${i}.jpg"
        alt="${prefix} ${i}"
        loading="lazy"
      />
    `;
    frag.appendChild(slide);
  }
  wrapper.appendChild(frag);
}

/* ===== Initialize Swipers after galleries are built ===== */
function initSwipers() {
  document.querySelectorAll('.service__swiper').forEach(container => {
    // eslint-disable-next-line no-undef
    new Swiper(container, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      navigation: {
        nextEl: container.querySelector('.swiper-button-next'),
        prevEl: container.querySelector('.swiper-button-prev')
      },
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true
      },
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  });
}

/* ===== YouTube Modal (under About) ===== */
(function setupYouTubeModal(){
  const openBtn = document.getElementById('about-yt-open');
  const modal   = document.getElementById('yt-modal');
  const iframe  = document.getElementById('yt-iframe');

  if (!openBtn || !modal || !iframe) return;

  const getVideoUrl = () => {
    const id = openBtn.getAttribute('data-video-id') || 'VIDEO_ID'; // replace with your ID
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  };

  function openModal(){
    iframe.src = getVideoUrl();
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    iframe.src = '';
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openModal);
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (!modal.hidden && e.key === 'Escape') closeModal();
  });
})();

/* ===== Boot: build all galleries then init carousels ===== */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-gallery]').forEach(buildGallery);
  initSwipers();

  // Ensure "Trusted by" is renamed (in case markup changes later)
  const partnersTitle = document.getElementById('partners-title');
  if (partnersTitle) partnersTitle.textContent = 'Cooperated By';
});
