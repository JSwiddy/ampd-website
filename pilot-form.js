// Pilot Program Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pilotForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(form);
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Send to Formspree
      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          form.style.display = 'none';
          formSuccess.style.display = 'flex';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(error => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Sorry, there was an error. Please try again or email us directly.');
        console.error('Form error:', error);
      });
    });
  }
  
  // Phone number formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0) {
        if (value.length <= 3) {
          value = `(${value}`;
        } else if (value.length <= 6) {
          value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
          value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
      }
      e.target.value = value;
    });
  }
});
