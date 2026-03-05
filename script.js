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

// Orbit animation — items always face upright
window.addEventListener('load', function() {
  var items = document.querySelectorAll('.ampd-orbit-item');
  if (!items.length) return;

  var wrap = document.querySelector('.ampd-orbit-wrap');
  var count = items.length;
  var angle = 0;

  function tick() {
    var radius = wrap.offsetWidth / 2 - 50;
    angle += 0.15; // degrees per frame
    for (var i = 0; i < count; i++) {
      var a = (i / count) * 360 + angle;
      var rad = a * Math.PI / 180;
      var x = Math.cos(rad) * radius;
      var y = Math.sin(rad) * radius;
      items[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
});

// Add active state to header on scroll
let lastScroll = 0;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', function() {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.style.background = 'rgba(0, 0, 0, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
  } else {
    header.style.background = '#000';
    header.style.backdropFilter = 'none';
  }
  
  lastScroll = currentScroll;
});
