// GitHub Pages SPA redirect helper
// This script runs in 404.html to handle client-side routing
(function() {
  // Only redirect if we're on GitHub Pages and not already on the correct page
  if (window.location.hostname === 'gennadiy01.github.io') {
    const path = window.location.pathname.replace('/eurogranite-website', '');
    const segments = path.split('/').filter(Boolean);

    // If we have path segments, redirect to the base app with hash
    if (segments.length > 0) {
      const newUrl = '/eurogranite-website/#' + path;
      window.history.replaceState(null, null, newUrl);
    }
  }
})();