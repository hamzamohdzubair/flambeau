(function () {
  'use strict';

  let overlay = null;
  let isZoomed = false;

  function createOverlay() {
    overlay = document.createElement('div');
    overlay.id = 'image-zoom-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 99999;
      display: none;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      cursor: pointer;
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  function showZoom(img) {
    if (!overlay) overlay = createOverlay();

    // Clone the image
    const clonedImg = img.cloneNode(true);

    // Calculate zoom level to ensure minimum size
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const targetWidth = viewportWidth * 0.8; // 80% of viewport
    const targetHeight = viewportHeight * 0.8;

    // Get natural image dimensions
    const naturalWidth = img.naturalWidth || img.width;
    const naturalHeight = img.naturalHeight || img.height;

    // Calculate scale to fit at least 60% of target size
    const minScale = Math.max(
      (targetWidth * 0.6) / naturalWidth,
      (targetHeight * 0.6) / naturalHeight,
      1 // Never scale down below original
    );

    // Calculate final dimensions maintaining aspect ratio
    let finalWidth = naturalWidth * minScale;
    let finalHeight = naturalHeight * minScale;

    // Ensure it doesn't exceed 80% viewport
    const aspectRatio = naturalWidth / naturalHeight;
    if (finalWidth > targetWidth) {
      finalWidth = targetWidth;
      finalHeight = finalWidth / aspectRatio;
    }
    if (finalHeight > targetHeight) {
      finalHeight = targetHeight;
      finalWidth = finalHeight * aspectRatio;
    }

    clonedImg.style.cssText = `
      width: ${finalWidth}px;
      height: ${finalHeight}px;
      object-fit: contain;
      border-radius: 8px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.8);
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;

    // Clear and add new image
    overlay.innerHTML = '';
    overlay.appendChild(clonedImg);

    // Show with animation
    overlay.style.display = 'flex';
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      requestAnimationFrame(() => {
        clonedImg.style.transform = 'scale(1)';
      });
    });

    isZoomed = true;
  }

  function closeZoom(callback) {
    if (!overlay || !isZoomed) return;

    const img = overlay.querySelector('img');
    if (img) {
      img.style.transform = 'scale(0.9)';
    }

    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay.style.display = 'none';
      overlay.innerHTML = '';
      isZoomed = false;
      if (callback) callback();
    }, 300);
  }

  function interceptNavigation(e) {
    // Check if we should intercept navigation
    if (isZoomed) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      closeZoom();
      return false;
    }
  }

  function observeFragments() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        const target = mutation.target;

        // Check if a figure just became active with current fragment
        // AND has the "emph" class
        if (target.matches('.figrow figure[data-marpit-fragment].emph')) {
          const fragmentState = target.getAttribute('data-bespoke-marp-fragment');
          const isCurrent = target.getAttribute('data-bespoke-marp-current-fragment') === 'current';

          if (fragmentState === 'active' && isCurrent && !isZoomed) {
            const img = target.querySelector('img');
            if (img) {
              // Small delay to ensure fragment animation completes
              setTimeout(() => {
                showZoom(img);
              }, 50);
            }
          }
        }
      });
    });

    // Observe only figures with fragments AND the "emph" class
    document.querySelectorAll('.figrow figure[data-marpit-fragment].emph').forEach(figure => {
      observer.observe(figure, {
        attributes: true,
        attributeFilter: ['data-bespoke-marp-fragment', 'data-bespoke-marp-current-fragment']
      });
    });
  }

  function init() {
    // Create overlay
    createOverlay();

    // Intercept all navigation
    document.addEventListener('keydown', interceptNavigation, true);
    document.addEventListener('click', (e) => {
      if (isZoomed) {
        interceptNavigation(e);
      }
    }, true);

    // Start observing fragments
    observeFragments();

    // Also handle clicks directly on overlay
    if (overlay) {
      overlay.addEventListener('click', () => {
        closeZoom();
      });
    }
  }

  // Wait for Bespoke to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(init, 1000);
    });
  } else {
    setTimeout(init, 1000);
  }
})();
