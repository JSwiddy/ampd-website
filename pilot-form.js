
// Pilot Program Form Handler - Postmark Version
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pilotForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    // Custom dropdown logic
    document.querySelectorAll('.custom-select').forEach(function(select) {
      var trigger = select.querySelector('.custom-select__trigger');
      var textEl = select.querySelector('.custom-select__text');
      var options = select.querySelectorAll('.custom-select__option');
      var hiddenInput = document.getElementById(select.dataset.target);

      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        // Close all other dropdowns
        document.querySelectorAll('.custom-select.open').forEach(function(s) {
          if (s !== select) s.classList.remove('open');
        });
        select.classList.toggle('open');
      });

      options.forEach(function(option) {
        option.addEventListener('click', function(e) {
          e.stopPropagation();
          textEl.textContent = option.textContent;
          hiddenInput.value = option.dataset.value;
          select.classList.add('has-value');
          select.classList.remove('open');
          // Mark selected
          options.forEach(function(o) { o.classList.remove('selected'); });
          option.classList.add('selected');
        });
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function() {
      document.querySelectorAll('.custom-select.open').forEach(function(s) {
        s.classList.remove('open');
      });
    });
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Validate custom dropdowns
      var missing = false;
      document.querySelectorAll('.custom-select').forEach(function(select) {
        var hiddenInput = document.getElementById(select.dataset.target);
        if (!hiddenInput.value) {
          select.querySelector('.custom-select__trigger').style.borderColor = '#e74c3c';
          missing = true;
        } else {
          select.querySelector('.custom-select__trigger').style.borderColor = '';
        }
      });
      if (missing) return;

      const formData = new FormData(form);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Send to Vercel serverless function
      fetch('/api/pilot-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Network response was not ok');
          });
        }
        return response.json();
      })
      .then(result => {
        if (result.success) {
          form.style.display = 'none';
          formSuccess.style.display = 'flex';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      })
      .catch(error => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        alert('Sorry, there was an error submitting your request. Please try again or email us directly.');
      });
      
      return false;
    });
    
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
})();
