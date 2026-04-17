
// Pilot Program Form Handler - Postmark Version
(function() {
  'use strict';
  
  const STORAGE_KEY = 'ampd_demo_state';

  function loadDemoState() {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveDemoState(state) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pilotForm');
    const formSuccess = document.getElementById('formSuccess');

    if (!form) return;

    function showBookingStage(firstName, lastName, email, stage) {
      const fullName = [firstName, lastName].filter(Boolean).join(' ').trim();
      form.style.display = 'none';
      formSuccess.style.display = 'block';

      const promptHeadline = document.getElementById('bookingPromptHeadline');
      const doneHeadline = document.getElementById('bookingDoneHeadline');
      if (firstName && promptHeadline) promptHeadline.textContent = `Grab a time that works, ${firstName}.`;
      if (firstName && doneHeadline) doneHeadline.textContent = `You're locked in, ${firstName}.`;

      if (stage === 'booked') {
        const prompt = document.getElementById('bookingPrompt');
        const done = document.getElementById('bookingDone');
        if (prompt) prompt.style.display = 'none';
        if (done) done.style.display = 'block';
      } else {
        initCalEmbed(fullName, email);
      }
    }

    const existing = loadDemoState();
    if (existing && existing.submitted) {
      showBookingStage(existing.firstName || '', existing.lastName || '', existing.email || '', existing.booked ? 'booked' : 'prompt');
    }

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
          const firstName = (data.firstName || '').trim();
          const lastName = (data.lastName || '').trim();
          const email = (data.email || '').trim();

          saveDemoState({ submitted: true, booked: false, firstName: firstName, lastName: lastName, email: email });

          showBookingStage(firstName, lastName, email, 'prompt');
          formSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    
    function initCalEmbed(name, email) {
      const btn = document.getElementById('openBookingBtn');
      if (!btn) return;

      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "demo-booking", { origin: "https://cal.com" });

      Cal.ns["demo-booking"]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
      });

      Cal.ns["demo-booking"]("on", {
        action: "bookingSuccessful",
        callback: function () {
          const existing = loadDemoState() || {};
          saveDemoState(Object.assign({}, existing, { submitted: true, booked: true }));

          const prompt = document.getElementById('bookingPrompt');
          const done = document.getElementById('bookingDone');
          if (prompt) prompt.style.display = 'none';
          if (done) {
            done.style.display = 'block';
            done.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      });

      btn.addEventListener('click', function () {
        Cal.ns["demo-booking"]("modal", {
          calLink: "get-ampd-up/30min",
          config: {
            layout: "month_view",
            name: name,
            email: email
          }
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
})();
