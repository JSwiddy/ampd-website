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
