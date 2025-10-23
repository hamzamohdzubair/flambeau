// Add this to your presentation
document.addEventListener('keydown', (e) => {
  const deck = /* reference to your Bespoke deck */;

  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    // Navigate by slides only (skip fragments)
    if (e.key === 'ArrowUp') {
      deck.prev(); // or implement slide-only prev
    } else {
      deck.next(); // or implement slide-only next
    }
  }
  // Left/Right arrows will use default fragment navigation
});
