const chokidar = require('chokidar');
const fs = require('fs');

console.log('Starting debug watcher...');
console.log('Watching: md-source/**/*.md');

const watcher = chokidar.watch('md-source/**/*.md', {
  ignoreInitial: false,
  persistent: true,
  usePolling: true,
  interval: 100,
  awaitWriteFinish: {
    stabilityThreshold: 200,
    pollInterval: 100
  }
});

watcher
  .on('add', path => console.log(`ADD: ${path}`))
  .on('change', path => console.log(`CHANGE: ${path}`))
  .on('unlink', path => console.log(`UNLINK: ${path}`))
  .on('error', error => console.log(`ERROR: ${error}`))
  .on('ready', () => console.log('Initial scan complete. Ready for changes.'));

// Keep process alive
process.stdin.resume();
