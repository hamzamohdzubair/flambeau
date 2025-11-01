// Dynamically update the back button link based on current page
document.addEventListener('DOMContentLoaded', function () {
  // Find the back button by its icon
  const backIcon = document.querySelector('iconify-icon[title="Back"]');

  if (backIcon) {
    // Get the parent anchor tag
    const backLink = backIcon.closest('a');

    if (backLink) {
      // Get the current page filename
      const currentPage = window.location.pathname.split('/').pop();

      // If we're on an index page, go up one level
      // Otherwise, go to index in the same folder
      if (currentPage === 'index.html' || currentPage === '') {
        backLink.href = '../index.html';
      } else {
        backLink.href = './index.html';
      }
    }
  }
});
