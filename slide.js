(() => {
  const vp    = document.querySelector('.marquee-viewport');
  const track = document.getElementById('logo-track') || vp?.querySelector('.animate-marquee');
  const tpl   = document.getElementById('logos-dup');
  if (!vp || !track) return;

  /* ---------- 0) Helpers: pause/resume animation via CSS class ---------- */
  let resumeTimer;
  const pause  = () => { vp.classList.add('pause-marquee'); clearTimeout(resumeTimer); };
  const resume = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => vp.classList.remove('pause-marquee'), 150); };

  /* ---------- 1) Early-start lazy images inside the viewport ---------- */
  const observeLazy = (root = vp) => {
    const lazyImgs = root.querySelectorAll('img[loading="lazy"]');
    if (!lazyImgs.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const img = e.target;
          // For SVGs, nudging loading to eager is enough to start fetching
          img.loading = 'eager';
          obs.unobserve(img);
        }
      }, { root: vp, rootMargin: '600px 0px' });

      lazyImgs.forEach(img => io.observe(img));
    } else {
      lazyImgs.forEach(img => img.loading = 'eager');
    }
  };
  observeLazy(vp);

  /* ---------- 2) Mount duplicate set on desktop after load ---------- */
  const mq = window.matchMedia('(min-width:1025px)');
  const mountDup = () => {
    if (!tpl || !mq.matches || track.dataset.dupMounted) return;
    track.appendChild(tpl.content.cloneNode(true));
    track.dataset.dupMounted = '1';
    // observe the newly added lazy images too
    observeLazy(track);
  };
  const onLoaded = () => setTimeout(mountDup, 200);
  if (document.readyState === 'complete') onLoaded();
  else window.addEventListener('load', onLoaded);
  mq.addEventListener ? mq.addEventListener('change', mountDup) : mq.addListener(mountDup);

  /* ---------- 3) Drag-to-scroll (desktop + touch-pointer) ---------- */
  // prevent native “image drag ghost”
  vp.addEventListener('dragstart', e => e.preventDefault());
  // disable image dragging at the element level if needed
  vp.querySelectorAll('img').forEach(img => img.setAttribute('draggable','false'));

  let isDown = false, startX = 0, startScroll = 0, pid = null, moved = false;

  const down = (e) => {
    isDown = true; moved = false;
    pause(); // pause animation while interacting
    pid = e.pointerId; vp.setPointerCapture?.(pid);
    vp.classList.add('grabbing');
    startX = e.clientX;
    startScroll = vp.scrollLeft;
    e.preventDefault(); // stop native image drag / text selection
  };
  const move = (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 3) moved = true;
    vp.scrollLeft = startScroll - dx;
    e.preventDefault();
  };
  const up = () => {
    isDown = false;
    if (pid != null) { try { vp.releasePointerCapture(pid); } catch {} pid = null; }
    vp.classList.remove('grabbing');
    resume(); // resume animation shortly after interaction
  };

  vp.addEventListener('pointerdown', down, { passive: false });
  vp.addEventListener('pointermove',  move, { passive: false });
  vp.addEventListener('pointerup',    up);
  vp.addEventListener('pointercancel',up);

  // pause on wheel/scroll, resume after
  vp.addEventListener('wheel',  pause,  { passive: true });
  vp.addEventListener('scroll', resume, { passive: true });

  // if logos are links, prevent accidental click after a drag
  vp.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);
})();