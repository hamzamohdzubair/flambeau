// scripts/navigation.js
(function () {
  'use strict';

  // Use capture phase to intercept before Bespoke
  document.addEventListener('keydown', function (e) {
    // Only handle up/down arrows
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') {
      return;
    }

    // Prevent default and stop propagation to block Bespoke's handler
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    // Find all slides and current active slide
    const slides = Array.from(document.querySelectorAll('.bespoke-marp-slide'));
    const activeSlide = document.querySelector('.bespoke-marp-active');

    if (!activeSlide) return;

    const currentIndex = slides.indexOf(activeSlide);
    let targetIndex;

    if (e.key === 'ArrowUp') {
      targetIndex = Math.max(0, currentIndex - 1);
    } else if (e.key === 'ArrowDown') {
      targetIndex = Math.min(slides.length - 1, currentIndex + 1);
    }

    if (targetIndex !== undefined && targetIndex !== currentIndex) {
      // Update URL hash to trigger slide change
      const newHash = targetIndex + 1;
      window.location.hash = newHash;

      // Also manually trigger the slide change
      slides.forEach((slide, idx) => {
        const isActive = idx === targetIndex;
        slide.classList.toggle('bespoke-marp-active', isActive);
        slide.setAttribute('aria-hidden', !isActive);

        // Reset all fragments in the target slide to visible
        if (isActive) {
          slide.querySelectorAll('[data-bespoke-marp-fragment]').forEach(fragment => {
            fragment.setAttribute('data-bespoke-marp-fragment', 'active');
          });
        }
      });

      // Update page counter if it exists
      const pageCounter = document.querySelector('[data-bespoke-marp-osc="page"]');
      if (pageCounter) {
        pageCounter.textContent = `Page ${targetIndex + 1} of ${slides.length}`;
      }
    }
  }, true); // Use capture phase (true parameter is important!)

})();
