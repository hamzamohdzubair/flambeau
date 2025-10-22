(function () {
  'use strict';

  let isZoomed = false;
  let currentZoomedFigure = null;
  let processingAction = false;

  function isElementVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      parseFloat(style.opacity) > 0.5;
  }

  function captureVisibilityState() {
    const snapshot = new Map();
    const figures = document.querySelectorAll('figure[data-marpit-fragment]');

    figures.forEach(fig => {
      snapshot.set(fig, isElementVisible(fig));
    });

    return snapshot;
  }

  function findNewlyVisibleFigure(oldSnapshot) {
    const figures = document.querySelectorAll('figure[data-marpit-fragment]');

    for (const fig of figures) {
      const wasVisible = oldSnapshot.get(fig) || false;
      const isNowVisible = isElementVisible(fig);

      if (!wasVisible && isNowVisible) {
        return fig;
      }
    }

    return null;
  }

  function zoomFigure(fig) {
    if (!fig) return;
    console.log('Zooming figure:', fig);
    fig.classList.add('zoomed');
    currentZoomedFigure = fig;
    isZoomed = true;
  }

  function unzoomFigure() {
    if (!currentZoomedFigure) return;
    console.log('Unzooming figure:', currentZoomedFigure);
    currentZoomedFigure.classList.remove('zoomed');
    currentZoomedFigure = null;
    isZoomed = false;
  }

  function initFragmentZoom() {
    let visibilitySnapshot = captureVisibilityState();

    // Intercept clicks
    document.addEventListener('click', function (e) {
      if (processingAction) return;
      processingAction = true;

      if (isZoomed) {
        // Currently zoomed - this click should unzoom
        e.stopPropagation();
        e.stopImmediatePropagation();
        e.preventDefault();

        unzoomFigure();

        setTimeout(() => {
          visibilitySnapshot = captureVisibilityState();
          processingAction = false;
        }, 100);

        return false;
      } else {
        // Not zoomed - let Marpit show fragment, then zoom it
        setTimeout(() => {
          const newlyVisible = findNewlyVisibleFigure(visibilitySnapshot);

          if (newlyVisible) {
            // Wait a bit more to ensure Marpit's animation is complete
            setTimeout(() => {
              zoomFigure(newlyVisible);
              processingAction = false;
            }, 200);
          } else {
            processingAction = false;
          }

          visibilitySnapshot = captureVisibilityState();
        }, 150);
      }
    }, true);

    // Handle keyboard
    document.addEventListener('keydown', function (e) {
      if (processingAction) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        processingAction = true;

        if (isZoomed) {
          e.stopPropagation();
          e.stopImmediatePropagation();
          e.preventDefault();

          unzoomFigure();

          setTimeout(() => {
            visibilitySnapshot = captureVisibilityState();
            processingAction = false;
          }, 100);

          return false;
        } else {
          setTimeout(() => {
            const newlyVisible = findNewlyVisibleFigure(visibilitySnapshot);

            if (newlyVisible) {
              setTimeout(() => {
                zoomFigure(newlyVisible);
                processingAction = false;
              }, 200);
            } else {
              processingAction = false;
            }

            visibilitySnapshot = captureVisibilityState();
          }, 150);
        }
      }
    }, true);
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initFragmentZoom, 1000);
    });
  } else {
    setTimeout(initFragmentZoom, 1000);
  }
})();
