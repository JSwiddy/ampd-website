// PDF Modal Functionality
(function() {
  const openBtn = document.querySelector('[data-ampd-open]');
  const closeBtn = document.querySelector('[data-ampd-close]');
  const overlay = document.querySelector('[data-ampd-overlay]');

  if (!openBtn || !closeBtn || !overlay) return;

  // Open modal
  openBtn.addEventListener('click', function() {
    overlay.classList.add('active');
    overlay.style.display = 'flex';
    document.body.classList.add('ampd-lock');
  });

  // Close modal on button click
  closeBtn.addEventListener('click', function() {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
    document.body.classList.remove('ampd-lock');
  });

  // Close modal on overlay click
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
      document.body.classList.remove('ampd-lock');
    }
  });

  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
      document.body.classList.remove('ampd-lock');
    }
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Orbit animation — items always face upright, pauses when off-screen
window.addEventListener('load', function() {
  var items = document.querySelectorAll('.ampd-orbit-item');
  if (!items.length) return;

  var wrap = document.querySelector('.ampd-orbit-wrap');
  var count = items.length;
  var angle = 0;
  var orbitVisible = true;
  var rafId = null;

  // Pause orbit when off-screen
  var orbitObserver = new IntersectionObserver(function(entries) {
    orbitVisible = entries[0].isIntersecting;
    if (orbitVisible && !rafId) {
      rafId = requestAnimationFrame(tick);
    }
  }, { threshold: 0.05 });
  orbitObserver.observe(wrap);

  function tick() {
    if (!orbitVisible) {
      rafId = null;
      return;
    }
    var radius = Math.max(wrap.offsetWidth / 2 - 50, 140);
    angle += 0.15;
    for (var i = 0; i < count; i++) {
      var a = (i / count) * 360 + angle;
      var rad = a * Math.PI / 180;
      var x = Math.cos(rad) * radius;
      var y = Math.sin(rad) * radius;
      items[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);
});

// Unified scroll fade-in observer — handles .reveal, .ampd-fade, .about-fade, .fade-up
(function() {
  var observer = new IntersectionObserver(function(entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('visible');
      }
    }
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  var selectors = '.reveal, .ampd-fade, .about-fade, .fade-up';
  var els = document.querySelectorAll(selectors);
  for (var j = 0; j < els.length; j++) {
    observer.observe(els[j]);
  }
})();

// Header scroll — add .scrolled class
(function() {
  var header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
})();

// Mobile hamburger toggle
(function() {
  var toggle = document.getElementById('navToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('ampd-lock');
  });

  // Close on link click
  var links = mobileNav.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      toggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('ampd-lock');
    });
  }
})();
