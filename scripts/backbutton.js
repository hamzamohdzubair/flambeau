// Dynamically generate breadcrumb navigation based on current URL path
document.addEventListener('DOMContentLoaded', async function () {
  const breadcrumbContainers = document.querySelectorAll('.breadcrumb');

  if (breadcrumbContainers.length === 0) {
    return;
  }

  // Get the current path and split into segments
  const path = window.location.pathname;
  const segments = path.split('/').filter(s => s && s !== 'index.html');

  // Remove the current page filename (last segment ending in .html)
  const lastSegment = segments[segments.length - 1];
  if (lastSegment && lastSegment.endsWith('.html') && lastSegment !== 'index.html') {
    segments.pop();
  }

  // Build breadcrumb links only for navigable folders (with index.html)
  const breadcrumbs = [];

  // Add home link at the beginning (always exists)
  breadcrumbs.push(`<a href="/index.html">home</a>`);

  // Check each segment asynchronously to see if it has an index.html
  const breadcrumbPromises = segments.map(async (segment, i) => {
    // Skip empty segments
    if (!segment) return null;

    // Calculate the path to this level's index.html
    const levelsUp = segments.length - i - 1;
    let href;

    // Build absolute path for checking
    const pathUpToSegment = segments.slice(0, i + 1).join('/');
    const absolutePath = '/' + pathUpToSegment + '/index.html';

    if (levelsUp === 0) {
      // We're at the current directory level
      href = './index.html';
    } else {
      // Go up the appropriate number of levels
      href = '../'.repeat(levelsUp) + 'index.html';
    }

    // Check if index.html exists at this path
    try {
      const response = await fetch(absolutePath, { method: 'HEAD' });
      if (response.ok) {
        // Show only first 4 letters in lowercase
        const displayName = segment.slice(0, 4).toLowerCase();
        return `<a href="${href}">${displayName}</a>`;
      }
    } catch (error) {
      // If fetch fails, skip this segment
      return null;
    }

    return null;
  });

  // Wait for all checks to complete
  const breadcrumbResults = await Promise.all(breadcrumbPromises);

  // Add valid breadcrumbs (filter out nulls)
  breadcrumbResults.forEach(result => {
    if (result) {
      breadcrumbs.push(result);
    }
  });

  // Join breadcrumbs with separator and inject into ALL breadcrumb containers
  if (breadcrumbs.length > 0) {
    const breadcrumbHTML = breadcrumbs.join(' &nbsp;>&nbsp; ');
    breadcrumbContainers.forEach(container => {
      container.innerHTML = breadcrumbHTML;
    });
  }
});
