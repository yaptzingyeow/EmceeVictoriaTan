      document.documentElement.style.overflow = 'hidden';

  // OPTIONAL: show once per session
  const showOncePerSession = false; // set true to enable
  const hasSeen = sessionStorage.getItem('vt_preloader_seen');

  function hidePreloader() {
    const el = document.getElementById('preloader');
    if (!el) return;
    el.classList.add('is-hidden');
    // re-enable scroll after fade
    setTimeout(() => {
      document.documentElement.style.overflow = '';
      el.remove();
    }, 520); // match duration-500
  }

  // If once-per-session and already seen, skip immediately
  if (showOncePerSession && hasSeen) {
    hidePreloader();
  } else {
    // mark as seen for this session
    if (showOncePerSession) sessionStorage.setItem('vt_preloader_seen', '1');

    // hide when everything is ready
    window.addEventListener('load', () => {
      // small delay feels smoother
      setTimeout(hidePreloader, 300);
    });

    // fallback: if 'load' somehow doesn't fire within 8s, hide anyway
    setTimeout(hidePreloader, 8000);
  }
