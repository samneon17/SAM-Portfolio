/* =========================================
   1. PARTICLES BACKGROUND (Safe Init)
   ========================================= */
   (function () {
    const cfg = {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#a855f7" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.55 },
        "size": { "value": 3 },
        "line_linked": { "enable": true, "distance": 150, "color": "#a855f7", "opacity": 0.35, "width": 1 },
        "move": { "enable": true, "speed": 2.5 }
      },
      "interactivity": {
        "events": { "onhover": { "enable": true, "mode": "repulse" } }
      },
      "retina_detect": true
    };
  
    function initParticles() {
      try {
        if (window.particlesJS) {
          window.particlesJS('particles-js', cfg);
        }
      } catch (e) {
        console.warn('particles init error', e);
      }
    }
  
    if (typeof window !== 'undefined') {
      if (window.particlesJS) {
        initParticles();
      } else {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/particles.js';
        s.async = true;
        s.onload = initParticles;
        document.head.appendChild(s);
      }
    }
  })();
  
  
  /* =========================================
     2. MOBILE MENU & NAVIGATION (Multi-Page Safe)
     ========================================= */
  document.addEventListener('DOMContentLoaded', () => {
    const mobilePanel = document.getElementById('mobilePanel');
    const hambBtn = document.getElementById('hambBtn');
    
    // Agar page par button ya panel nahi hai to ruk jao (Error prevention)
    if (!mobilePanel || !hambBtn) return;
  
    function setMobileOpen(open) {
      if (open) {
        mobilePanel.classList.add('show');
        mobilePanel.setAttribute('aria-hidden', 'false');
        hambBtn.setAttribute('aria-expanded', 'true');
      } else {
        mobilePanel.classList.remove('show');
        mobilePanel.setAttribute('aria-hidden', 'true');
        hambBtn.setAttribute('aria-expanded', 'false');
      }
    }
  
    // 1. Toggle on click
    hambBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Button click ko document pe mat jane do
      const isOpen = mobilePanel.classList.contains('show');
      setMobileOpen(!isOpen);
    });
  
    // 2. Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 760 && mobilePanel.classList.contains('show')) {
        if (!mobilePanel.contains(e.target) && !hambBtn.contains(e.target)) {
          setMobileOpen(false);
        }
      }
    });
  
    // 3. Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setMobileOpen(false);
    });
  
    // 4. Close when a link inside menu is clicked
    const mobileLinks = mobilePanel.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        setMobileOpen(false);
      });
    });
  });
  
  
  /* =========================================
     3. TYPING EFFECT (Only runs if element exists)
     ========================================= */
  document.addEventListener("DOMContentLoaded", function () {
    const typedText = document.getElementById("typed-text");
    
    // Important Check: Agar ye page par nahi hai (jaise About/Contact page), to code run mat karo
    if (!typedText) return; 
  
    const roles = [
      "Community Manager",
      "Social Media Moderator",
      "Collab Manager"
    ];
  
    const typingDelay = 150;
    const erasingDelay = 80;
    const newTextDelay = 2000;
    let roleIndex = 0;
    let charIndex = 0;
    let isErasing = false;
  
    function typeEffect() {
      const currentRole = roles[roleIndex];
  
      if (!isErasing && charIndex < currentRole.length) {
        typedText.textContent += currentRole.charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, typingDelay);
      }
      else if (isErasing && charIndex > 0) {
        typedText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        setTimeout(typeEffect, erasingDelay);
      }
      else {
        if (!isErasing) {
          setTimeout(() => {
            isErasing = true;
            typeEffect();
          }, newTextDelay);
        } else {
          isErasing = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeEffect, 400);
        }
      }
    }
  
    typeEffect();
  });
  
  
  /* =========================================
     4. SMOOTH SCROLL (120fps)
     ========================================= */
  (function () {
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  
    let last = 0;
    const smoothStep = () => {
      const now = performance.now();
      const delta = now - last;
      if (delta > (1000 / 120)) {
        last = now;
      }
      requestAnimationFrame(smoothStep);
    };
    requestAnimationFrame(smoothStep);
  })();