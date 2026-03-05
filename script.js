/* ===========================
   AMPD — Site JS
   GSAP + ScrollTrigger + Lenis
   =========================== */

(function() {
  'use strict';

  // ── Lenis Smooth Scroll ──
  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    if (window.ScrollTrigger) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function(time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ── Header scroll effect ──
  var header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ── Mobile nav toggle ──
  var navToggle = document.getElementById('navToggle');
  var headerNav = document.getElementById('headerNav');
  if (navToggle && headerNav) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      headerNav.classList.toggle('open');
      document.body.classList.toggle('ampd-lock');
    });

    // Close nav when a link is clicked
    var navLinks = headerNav.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function() {
        navToggle.classList.remove('active');
        headerNav.classList.remove('open');
        document.body.classList.remove('ampd-lock');
      });
    }
  }

  // ── GSAP ScrollTrigger Animations ──
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal animations for all .reveal elements
    var reveals = document.querySelectorAll('.reveal');
    reveals.forEach(function(el) {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          }
        }
      );
    });

    // ── Desktop-only animations ──
    ScrollTrigger.matchMedia({
      '(min-width: 769px)': function() {

        // Hero parallax glow
        var heroGlow = document.querySelector('.hero-glow');
        if (heroGlow) {
          gsap.to(heroGlow, {
            y: 200,
            scale: 1.3,
            opacity: 0,
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }

        // Hero screenshot parallax
        var heroScreenshot = document.querySelector('.hero-screenshot');
        if (heroScreenshot) {
          gsap.to(heroScreenshot, {
            y: -60,
            scrollTrigger: {
              trigger: '.hero',
              start: 'center center',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }

        // Platform cards stagger
        var platformCards = document.querySelectorAll('.platform-card');
        if (platformCards.length) {
          gsap.fromTo(platformCards,
            { opacity: 0, y: 48, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: '.platform-grid',
                start: 'top 80%',
                once: true,
              }
            }
          );
        }

        // Differentiator feature sections — slide in from sides
        var diffFeatures = document.querySelectorAll('.diff-feature');
        diffFeatures.forEach(function(feature) {
          var visual = feature.querySelector('.diff-feature-visual');
          var text = feature.querySelector('.diff-feature-text');
          var isReverse = feature.classList.contains('diff-feature--reverse');

          if (visual) {
            gsap.fromTo(visual,
              { opacity: 0, x: isReverse ? 60 : -60 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 75%',
                  once: true,
                }
              }
            );
          }

          if (text) {
            gsap.fromTo(text,
              { opacity: 0, x: isReverse ? -60 : 60 },
              {
                opacity: 1,
                x: 0,
                duration: 1,
                delay: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: feature,
                  start: 'top 75%',
                  once: true,
                }
              }
            );
          }
        });

        // Trust badges stagger
        var trustBadges = document.querySelectorAll('.trust-badge');
        if (trustBadges.length) {
          gsap.fromTo(trustBadges,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.1,
              scrollTrigger: {
                trigger: '.trust-badges',
                start: 'top 85%',
                once: true,
              }
            }
          );
        }

        // Mission statement scale-in
        var missionH2 = document.querySelector('.mission-statement h2');
        if (missionH2) {
          gsap.fromTo(missionH2,
            { opacity: 0, scale: 0.92 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: '.mission-statement',
                start: 'top 75%',
                once: true,
              }
            }
          );
        }
      }
    });

  } else {
    // Fallback: simple IntersectionObserver for reveal
    var observer = new IntersectionObserver(function(entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          entries[i].target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
      }
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    var fallbackReveals = document.querySelectorAll('.reveal');
    for (var j = 0; j < fallbackReveals.length; j++) {
      observer.observe(fallbackReveals[j]);
    }
  }

  // ── PDF Modal (legacy support) ──
  var openBtn = document.querySelector('[data-ampd-open]');
  var closeBtn = document.querySelector('[data-ampd-close]');
  var overlay = document.querySelector('[data-ampd-overlay]');

  if (openBtn && closeBtn && overlay) {
    openBtn.addEventListener('click', function() {
      overlay.classList.add('active');
      overlay.style.display = 'flex';
      document.body.classList.add('ampd-lock');
    });

    closeBtn.addEventListener('click', function() {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
      document.body.classList.remove('ampd-lock');
    });

    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        overlay.style.display = 'none';
        document.body.classList.remove('ampd-lock');
      }
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          if (lenis) {
            lenis.scrollTo(target);
          } else {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }
    });
  });

})();
