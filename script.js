// Initialize AOS
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({ duration: 750, once: false, offset: 30 });
  document.querySelectorAll('video').forEach(v => v.play().catch(()=>{}));
});

// WhatsApp form submit function
function sendToWhatsApp() {
  const name = document.getElementById('waName').value.trim();
  const phone = document.getElementById('waPhone').value.trim();
  const serviceSelect = document.getElementById('waService');
  const service = serviceSelect.value;
  const otherText = document.getElementById('waOtherText')?.value.trim() || '';
  const dateInput = document.getElementById('waDate').value;

  if (!name || !phone || !service || !dateInput) {
    alert('Please fill in name, phone, service, and date');
    return;
  }

  let serviceDetail = service;
  if (service === 'Other' && otherText) {
    serviceDetail = otherText;
  } else if (service === 'Other' && !otherText) {
    alert('Please describe the service you need');
    return;
  }

  const dateObj = new Date(dateInput + 'T12:00:00');
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString('en-GB', { month: 'long' });
  const year = dateObj.getFullYear();
  
  let dayWithSuffix = day;
  if (day > 3 && day < 21) dayWithSuffix = day + 'th';
  else {
    const lastDigit = day % 10;
    if (lastDigit === 1) dayWithSuffix = day + 'st';
    else if (lastDigit === 2) dayWithSuffix = day + 'nd';
    else if (lastDigit === 3) dayWithSuffix = day + 'rd';
    else dayWithSuffix = day + 'th';
  }
  
  const formattedDate = `${dayWithSuffix} ${month} ${year}`;
  
  const now = new Date();
  const timestamp = now.toLocaleString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const scriptURL = 'https://script.google.com/macros/s/AKfycbwZO_LpHcS7QILTUduxtefqtZX7ultwC7YaNY66UN3kbfuhRhJubqDNxX17oxefPPc/exec';
  
  const emailData = {
    name: name,
    phone: phone,
    service: serviceDetail,
    date: formattedDate,
    timestamp: timestamp
  };

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData)
  }).catch(error => {
    console.log('Email sent in background');
  });

  const message = `Hello Smile Royale,%0A%0AI'm ${name}. I want to book an appointment for ${serviceDetail} on ${formattedDate}.`;
  const whatsappURL = `https://wa.me/2348103564479?text=${message}`;
  
  window.open(whatsappURL, '_blank', 'noopener,noreferrer');
}

// Alpine.js data
document.addEventListener('alpine:init', () => {
  Alpine.data('waForm', () => ({
    otherService: false,
    selectedService: '',
    sendToWhatsApp
  }));
});

// Enhanced image loading with Intersection Observer
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
      console.log('✅ IntersectionObserver supported - enabling lazy loading');
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const container = img.closest('.service-image');
            
            if (container && !img.classList.contains('loaded') && !img.classList.contains('error')) {
              container.classList.add('loading');
              console.log('🖼️ Image entering viewport:', img.alt);
            }
            
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px',
        threshold: 0.01
      });

      const serviceImages = document.querySelectorAll('.service-image img');
      serviceImages.forEach(img => {
        imageObserver.observe(img);
      });
      
      console.log(`👀 Observing ${serviceImages.length} images`);
    } else {
      console.log('⚠️ IntersectionObserver not supported - using fallback');
      document.querySelectorAll('.service-image').forEach(container => {
        container.classList.add('loading');
      });
    }
    
    function preloadFirstRow() {
      const serviceCards = document.querySelectorAll('.service-card');
      const firstRowCards = [];
      
      if (window.innerWidth > 900) {
        for (let i = 0; i < Math.min(3, serviceCards.length); i++) {
          firstRowCards.push(serviceCards[i]);
        }
      } else if (window.innerWidth > 600) {
        for (let i = 0; i < Math.min(2, serviceCards.length); i++) {
          firstRowCards.push(serviceCards[i]);
        }
      } else {
        firstRowCards.push(serviceCards[0]);
      }
      
      firstRowCards.forEach(card => {
        const img = card.querySelector('img');
        const container = card.querySelector('.service-image');
        if (img && container && !img.classList.contains('loaded')) {
          container.classList.add('loading');
          img.fetchPriority = 'high';
        }
      });
    }
    
    setTimeout(preloadFirstRow, 100);
    
    window.addEventListener('error', function(e) {
      if (e.target.tagName === 'IMG') {
        const img = e.target;
        const container = img.closest('.service-image');
        
        if (container) {
          container.classList.add('has-error');
          container.classList.remove('loading');
          img.classList.add('error');
          console.warn('❌ Image failed to load:', img.alt || img.src);
        }
      }
    }, true);
    
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        preloadFirstRow();
      }, 250);
    });
  });
})();