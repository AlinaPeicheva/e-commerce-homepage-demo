(() => {
  'use strict';

  /* Sticky header shadow on scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Reveal on scroll */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Mobile menu toggle */
  const menuToggle = document.getElementById('menu-toggle');
  const siteNav = document.getElementById('site-nav');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    siteNav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  /* Hero cursor-follow bug — subtle, desktop only */
  const hero = document.querySelector('.hero');
  const cursorBug = document.querySelector('.hero__cursor-bug');
  if (hero && cursorBug && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let targetX = 0, targetY = 0, curX = 0, curY = 0, active = false;

    hero.addEventListener('mouseenter', () => {
      active = true;
      cursorBug.classList.add('is-active');
    });
    hero.addEventListener('mouseleave', () => {
      active = false;
      cursorBug.classList.remove('is-active');
    });
    hero.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    const tick = () => {
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      if (active) {
        cursorBug.style.transform = `translate(${curX + 16}px, ${curY - 8}px) rotate(${(targetX - curX) * 0.6}deg)`;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* Add to bag — lightweight feedback, no real cart */
  const cartCount = document.querySelector('.cart-count');
  let count = 0;
  document.querySelectorAll('.add-btn').forEach((btn) => {
    const originalText = btn.textContent;
    btn.addEventListener('click', () => {
      count += 1;
      if (cartCount) cartCount.textContent = String(count);
      btn.textContent = 'Added ✓';
      btn.classList.add('is-added');
      setTimeout(() => {
        btn.textContent = originalText;
        btn.classList.remove('is-added');
      }, 1400);
    });
  });

  /* Newsletter form — no backend, just friendly confirmation */
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = joinForm.querySelector('button');
      const input = joinForm.querySelector('input');
      button.textContent = 'Welcome ✓';
      joinForm.classList.add('is-sent');
      input.value = '';
      setTimeout(() => {
        button.textContent = 'Join';
        joinForm.classList.remove('is-sent');
      }, 2600);
    });
  }
})();
