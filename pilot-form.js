
// Pilot Program Form Handler - Postmark Version
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pilotForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form) {
      console.error('Form not found');
      return;
    }
    
    console.log('Form handler loaded');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Form submitted');
      
      const formData = new FormData(form);
      const data = {};
      
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      console.log('Sending to API:', data);
      
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
        console.log('Response status:', response.status);
        if (!response.ok) {
          return response.json().then(err => {
            throw new Error(err.error || 'Network response was not ok');
          });
        }
        return response.json();
      })
      .then(result => {
        console.log('Success:', result);
        if (result.success) {
          form.style.display = 'none';
          formSuccess.style.display = 'flex';
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Optional: Send to analytics
          if (window.gtag) {
            gtag('event', 'pilot_program_request', {
              organization_type: data.orgType,
              team_size: data.teamSize
            });
          }
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      })
      .catch(error => {
        console.error('Form error:', error);
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
