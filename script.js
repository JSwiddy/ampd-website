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

// Scroll fade-in observer for .reveal elements
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

  var els = document.querySelectorAll('.reveal');
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
    document.body.classList.toggle('nav-lock');
  });

  // Close on link click
  var links = mobileNav.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      toggle.classList.remove('active');
      mobileNav.classList.remove('active');
      document.body.classList.remove('nav-lock');
    });
  }
})();
