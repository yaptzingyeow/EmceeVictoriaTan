   // Footer year
    document.getElementById('year').textContent = new Date().getFullYear();

    // ---------- Your pattern applied to ALL services ----------
    // Adjust counts to match the number of images you have in each folder.
     
  const protocolCount = 9;
  const corporateBeautyCount = 11;   // <- change as needed
  const corporateTechCount = 9;     // <- change as needed
  const weddingCount = 8;  // assets/wedding/wedding-1.webp ... wedding-10.webp
  const commercialCount = 10; // assets/commercial/commercial-1.webp ... commercial-10.webp

const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

function buildSlides(count, wrapperId, folder, prefix) {
  const gallery = document.getElementById(wrapperId);
  if (!gallery) return;

  for (let i = 1; i <= count; i++) {
    const href = `assets/${folder}/${prefix}-${i}.webp`;
    const slide = document.createElement('div');
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <div class="w-full aspect-[4/3] bg-transparent flex items-center justify-center rounded-lg overflow-hidden group">
        <a href="${href}" target="_blank" rel="noopener">
          <img
            src="${BLANK}"
            data-src="${href}"
            alt="${prefix} ${i}"
            ${i <= 2 ? 'loading="eager"' : 'loading="lazy"'}
            decoding="async"
            ${i <= 2 ? 'fetchpriority="high" decoding="async"' : 'fetchpriority="auto"'}
            class="lazy-img max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
          >
        </a>
      </div>
    `;
    gallery.appendChild(slide);
  }
  enableLazy(`#${wrapperId} .lazy-img`, { rootMargin: '600px 0px', prefetchNext: true });
}

function enableLazy(selector, { rootMargin = '400px 0px', prefetchNext = true } = {}) {
  const imgs = [...document.querySelectorAll(selector)];
  if (!imgs.length) return;

  // Kick off immediate load for any eager imgs
  imgs.filter(img => img.getAttribute('loading') === 'eager').forEach(loadImg);

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const img = e.target;
      loadImg(img);

      // Prefetch the next sibling image to make swiping feel instant
      if (prefetchNext) {
        const next = nextLazy(imgs, img);
        if (next) warm(next.dataset.src);
      }
      io.unobserve(img);
    });
  }, { rootMargin, threshold: 0.01 });

  imgs.filter(img => img.getAttribute('loading') !== 'eager').forEach(img => io.observe(img));

  function loadImg(img) {
    if (!img || !img.dataset) return;
    const src = img.dataset.src;
    if (src && img.src !== src) {
      img.src = src;
      img.removeAttribute('data-src');
    }
  }

  function nextLazy(list, node) {
    const idx = list.indexOf(node);
    for (let i = idx + 1; i < list.length; i++) {
      if (list[i] && list[i].dataset && list[i].dataset.src) return list[i];
    }
    return null;
  }

  // Warm the browser cache without attaching to DOM
  function warm(url) {
    if (!url) return;
    const img = new Image();
    img.decoding = 'async';
    img.loading = 'eager';
    img.src = url;
  }
}
    // Inject slides for each service
buildSlides(protocolCount,        'protocol-gallery',         'protocol',         'protocol');
  buildSlides(corporateBeautyCount, 'corporate-beauty-gallery', 'corporate-beauty', 'corporate-beauty');
  buildSlides(corporateTechCount,   'corporate-tech-gallery',   'corporate-tech',   'corporate-tech');
  buildSlides(weddingCount,         'wedding-gallery',          'wedding',          'wedding');
  //buildSlides(commercialCount,      'commercial-gallery',       'commercial',       'commercial');

    // Init Swipers AFTER slides are in the DOM
    function initAllSwipers() {
      document.querySelectorAll('.swiper').forEach((el) => {
        new Swiper(el, {
          slidesPerView: 1,
          spaceBetween: 12,
          pagination: { el: el.querySelector('.swiper-pagination'), clickable: true },
          breakpoints: { 640:{slidesPerView:2}, 1024:{slidesPerView:3} }
        });
      });
    }
    initAllSwipers();

      function initPortfolioSlider() {
    if (window.innerWidth < 768 && !window.portfolioSwiper) {
      window.portfolioSwiper = new Swiper('#portfolio-swiper', {
        slidesPerView: 1,
        spaceBetween: 16,
        pagination: { el: '#portfolio-swiper .swiper-pagination', clickable: true },
      });
    }
  }
  initPortfolioSlider();
  window.addEventListener('resize', () => {
    // Optional: destroy on resize to desktop if you want
    if (window.innerWidth >= 768 && window.portfolioSwiper) {
      window.portfolioSwiper.destroy(true, true);
      window.portfolioSwiper = null;
    } else {
      initPortfolioSlider();
    }
  });

// Put this where you defined portfolioConfig
const portfolioConfig = {
  events: {
    count: 28,
    base: 'assets/portfolio/events/event-',
    label: 'Corporate & Brand Events',
    titles: [
    "Jo Loves Grand Opening-Jo Malone CBE’s 1st fragrance boutique in Malaysia",
    "Ralph Lauren Polo Red Parfum Launch @ Pavilion KL <br>(Special Appearance: Thai Celeb, Joong Archen)",
    "Golden Eagle Awards 金鹰奖",
    "Launch Ceremony of the Premium Cold Chain <br> Shipping Route:Kuantan Port - Beibu Gulf Port. <br> 中马关丹港一北部湾港冷链精品航线首航仪式",
"Outstanding Elite Award Night by China Press<br>中国报粉红社杰出商才奖",
"Versace Dylan Purple Launch @ KLCC <br>(Special Appearance: Thai Celeb, Hirunkit & Jo Vynn)",
"Sephora X Jo Loves <br>Jo Malone CBE Exclusive Meet & Greet",
"Unilever Food Solutions <br>Chef Showcase",
"Unilever Food Solutions <br>Chef Showcase",
"Parfum De Marly’s Valaya Exclusif Launch @ Pavilllion KL",
"Miss Charm Transformation Grand Final",
"Kayali Fleur Majesty Rose Royal | 31 Launch & PR Event",
"Brightray MY-01 Data Centre &#x1F1E8;&#x1F1F3; &#x1F1F2;&#x1F1FE; Official Debut & Gala Dinner",
"“两国 双园”马中关丹产业园十周年庆祝活动 兼彭享州与广西壮族自治区欢迎晚宴",
"Electrolux Middle East & Africa Dealers Convention @ Pattaya Thailand",
"Malaysia Health & Wellness Brand Awards",
"Universal Robots’ Conferences",
"Grand Launch of Vono’s Latest Innovation & Dealer Awards Night",
"Automotive Mobility Solutions Conference- Automechanika Messe Frankfurt",
"Corporate Events",
"POLA’s PR & media event -Japanese Luxury Skincare Brand",
"MotoGP World Championship",
"Grand Opening of Renewed Medic Clinic",
"HID Global Launch & Golf Event ",
"Taiwan Expo @ KLCC",
"China-Malaysia Gov Cooperation Forum",
"Jennyhouse Launch – First Korean Salon Haircare Brand",
"Laura Mercier New Product Launch"

    ]
  },
  tv: {
    count: 7,
    base: 'assets/portfolio/tv/tv-',
    label: 'TV & Media',
    titles: [
      "8TV Starfluencer Awards <br>八度空间 Cuckoo最霸娱乐盛典",
      "8TV TV Host",
      "8TV TV Wowshop",
      "TV Programs &  Commercials (TVC)",
      "TV Programs &  Commercials (TVC)",
      "Watsons",
      "8TV Host",
    ]
  },
 lifestyle: {
    count: 9,
    base: 'assets/portfolio/lifestyle/lifestyle-',
    label: 'Festivals,Weddings & Lifestyle',
    titles: [
         "Cittabella Magazine <br>Better Together Events",
              "Shu Uemura PR Media Event" ,
              "Giorgio Armani Make up Workshop",
               "Amazing Thailand- Hello Thailand Event by Royal Embassy of Thailand & Tourism Authority of Thailand Malaysia",
      "EcoWorld CNY events",
      "International & Malaysian Weddings",
      "International & Malaysian Weddings",
    "International & Malaysian Weddings",
       "International & Malaysian Weddings",
    ]
  }
};

  // set counts to how many images you actually have per album

  // ====== RENDER HELPERS ======
  function pairFromHref(href) {
  const high = href.replace(/\.webp$/i, '_High.webp');
  const low  = href.replace(/\.webp$/i,  '_low.webp');
  return { high, low };
}
function makeMobileSlide(href, alt, label) {
  const { high, low } = pairFromHref(href);
  return `
    <div class="swiper-slide">
      <div class="block rounded-xl overflow-hidden bg-black flex items-center justify-center">
        <a href="${high}" data-lightbox="gallery" data-title="${label}">
          <img
            src="${low}"
            alt="${alt}"
            class="h-64 object-contain cursor-pointer transition-transform duration-500 ease-out hover:scale-105"
            loading="lazy" decoding="async"
            onerror="this.onerror=null;this.src='${high}'"
          >
        </a>
      </div>
      <p class="mt-3 text-center text-sm font-medium text-wordcolor">${label}</p>
    </div>`;
}

function makeDesktopCard(href, caption) {
  const { high, low } = pairFromHref(href);
  return `
    <div class="col-span-12 sm:col-span-6 md:col-span-4">
      <div class="group relative block rounded-xl overflow-hidden bg-black flex items-center justify-center">
        <a href="${high}" data-lightbox="gallery" data-title="${caption}">
          <img
            class="h-64 object-contain transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
            src="${low}" alt="${caption}" loading="lazy" decoding="async"
            onerror="this.onerror=null;this.src='${high}'"
          >
        </a>
        <div class="absolute bottom-0 left-0 right-0 p-2 sm:p-4 pointer-events-none">
          <div class="text-sm font-semibold text-gray-800 rounded-lg bg-white/80 backdrop-blur-sm p-2 md:p-3 md:text-base">
            ${caption}
          </div>
        </div>
      </div>
    </div>`;
}

function fillAlbumUI(key) {
  const cfg = portfolioConfig[key];
  const mobileWrap = document.getElementById(`swiper-wrapper-${key}`);
  const grid = document.getElementById(`grid-${key}`);
  if (!cfg || !mobileWrap || !grid) return;

  // Mobile slides
  if (!mobileWrap.dataset.filled) {
    let slides = '';
    for (let i = 1; i <= cfg.count; i++) {
      const href = `${cfg.base}${i}.webp`; // keep your existing pattern
      const title = (cfg.titles && cfg.titles[i - 1]) ? cfg.titles[i - 1] : `${cfg.label} ${i}`;
      slides += makeMobileSlide(href, title, title);
    }
    mobileWrap.innerHTML = slides;
    mobileWrap.dataset.filled = '1';
  }

  // Desktop cards
  if (!grid.dataset.filled) {
    let cards = '';
    for (let i = 1; i <= cfg.count; i++) {
      const href = `${cfg.base}${i}.webp`;
      const title = (cfg.titles && cfg.titles[i - 1]) ? cfg.titles[i - 1] : `${cfg.label} ${i}`;
      cards += makeDesktopCard(href, title);
    }
    grid.innerHTML = cards;
    grid.dataset.filled = '1';
  }
}

  // ====== SWIPER INIT (per tab, mobile only) ======
  const swipers = {}; // cache

  function ensureSwiper(key) {
  const el = document.querySelector(`#swiper-${key}`); // your swiper container
  if (!el) return;

  if (!swipers[key]) {
    swipers[key] = new Swiper(el, {
      slidesPerView: 1.1,      // your settings
      spaceBetween: 12,
      loop: false,              // avoid clones causing confusion
      centeredSlides: false,
      preloadImages: false,
      lazy: false,
      updateOnWindowResize: false // we’ll call update() ourselves
    });
  }
}

function initSwiperFor(key) {
  // Only run on mobile
  if (window.innerWidth >= 768) return;

  // Prevent double-init
  if (swipers[key]) return;

  const sel = `#swiper-${key}`;
  const el = document.querySelector(sel);
  if (!el) return;

  swipers[key] = new Swiper(sel, {
    slidesPerView: 1,        // only one photo
    centeredSlides: true,    // center it
    loop: true,              // infinite scroll
    spaceBetween: 20,        // little margin around
    pagination: {
      el: `${sel} .swiper-pagination`,
      clickable: true,
    },
  });
}


  // destroy swipers when going desktop (optional)
  function maybeDestroySwipers() {
    if (window.innerWidth < 768) return;
    Object.keys(swipers).forEach(k => {
      if (swipers[k]) { swipers[k].destroy(true, true); swipers[k] = null; }
    });
  }

  // ====== TABS ======
  const tabButtons = document.querySelectorAll('.tab-btn');
  const panels = {
    events: document.getElementById('panel-events'),
    tv: document.getElementById('panel-tv'),
    lifestyle: document.getElementById('panel-lifestyle'),
  };

  function activateTab(key) {
    // buttons
    tabButtons.forEach(btn => {
      const active = btn.dataset.tab === key;
      btn.classList.toggle('text-wordcolor', active);
      btn.classList.toggle('text-zinc-600', !active);
      btn.classList.toggle('bg-white', active);
      btn.classList.toggle('border', true);
      btn.classList.toggle('border-line', true);
      btn.classList.toggle('border-b-transparent', active);
    });

    // panels
    Object.entries(panels).forEach(([k, el]) => {
      el.classList.toggle('hidden', k !== key);
    });

    // render content for this tab if needed
    fillAlbumUI(key);
    // init swiper if mobile
     ensureSwiper(key);

  // now that it's visible, fix measurements & start at first slide
  requestAnimationFrame(() => {
    const s = swipers[key];
    if (!s) return;
    s.update();
    s.slideTo(0, 0, false);  // index 0, no animation
  });
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab);
    });
  });

  // initial state
  activateTab('events');

  // handle resize (init/destroy swipers appropriately)
  window.addEventListener('resize', () => {
    // if we’re on an active tab and mobile, ensure swiper exists
    const activeBtn = Array.from(tabButtons).find(b => b.classList.contains('text-wordcolor'));
    if (activeBtn) initSwiperFor(activeBtn.dataset.tab);
    // destroy on desktop
    maybeDestroySwipers();
  });


    (function() {
    const path = location.pathname.toLowerCase();
    const lang = path.includes('index-zh') ? 'zh' : 'en';
    document.querySelectorAll('#lang-switch a').forEach(a => {
      const isActive = a.dataset.lang === lang;
      a.classList.toggle('bg-whisper', isActive);
      a.classList.toggle('text-wordcolor', isActive);
      a.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
    // Optional: remember last choice
    document.querySelectorAll('#lang-switch a').forEach(a => {
      a.addEventListener('click', () => localStorage.setItem('pref-lang', a.dataset.lang));
    });
    // Optional: first visit redirect to saved preference
    const saved = localStorage.getItem('pref-lang');
    if (!path.includes('index-') && saved === 'zh') {
      // if they land on a different file root someday
      // location.href = 'index-zh.html';
    }
  })();

   let preconnected = false;
  function warmConnections(){
    if (preconnected) return; preconnected = true;
    ["https://www.youtube.com","https://www.google.com","https://i.ytimg.com"].forEach(h=>{
      const l = document.createElement('link'); l.rel="preconnect"; l.href=h; l.crossOrigin="anonymous"; document.head.appendChild(l);
    });
  }

  // Setup lite players
  document.querySelectorAll('.yt-lite').forEach(el=>{
    const id = el.dataset.ytid;
    // Use maxresdefault if available; fallback automatically handled by YouTube
    el.style.backgroundImage = `url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)`;
    const play = document.createElement('span'); play.className = 'play'; el.appendChild(play);

    // Preconnect when visible
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting){ warmConnections(); io.disconnect(); } });
    }, {rootMargin: '200px'});
    io.observe(el);

    // Click → swap in iframe
    el.addEventListener('click', ()=>{
      const iframe = document.createElement('iframe');
       iframe.className = 'w-full h-full';      
      iframe.title = el.getAttribute('aria-label') || 'YouTube video player';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.loading = 'lazy';
      iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0&playsinline=1`;
      el.replaceWith(iframe);
    }, { once:true });
  });
  
  (() => {
  function setupCollapses() {
    const btns = document.querySelectorAll('[data-collapse]');
    btns.forEach(btn => {
      const targetSel = btn.getAttribute('data-collapse');
      const panel = document.querySelector(targetSel);
      if (!panel) return;

      // ensure ARIA state matches DOM
      const sync = () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.querySelector('[data-icon="open"]')?.classList.toggle('hidden', expanded);
        btn.querySelector('[data-icon="close"]')?.classList.toggle('hidden', !expanded);
        panel.classList.toggle('hidden', !expanded);
      };
      sync();

      const open = () => { btn.setAttribute('aria-expanded','true'); sync(); };
      const close = () => { btn.setAttribute('aria-expanded','false'); sync(); };

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        expanded ? close() : open();
      });

      // Close on ESC
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
      });

      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!panel.contains(e.target) && !btn.contains(e.target)) close();
      });

      // Close when any link inside is clicked (mobile)
      panel.querySelectorAll('a[href]').forEach(a => {
        a.addEventListener('click', () => close());
      });

      // Ensure desktop state (md:) wins when resizing
      const mq = window.matchMedia('(min-width: 768px)');
      mq.addEventListener('change', () => {
        // On desktop, keep panel visible; on mobile, respect aria state
        if (mq.matches) {
          panel.classList.remove('hidden');
          btn.setAttribute('aria-expanded','true');
          sync();
        } else {
          btn.setAttribute('aria-expanded','false');
          sync();
        }
      });
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupCollapses);
  } else {
    setupCollapses();
  }
})();
