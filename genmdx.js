const fs = require('fs');
const path = require('path');

const sourceDir = 'md';
const outputDir = 'mdx';
const templatesDir = 'templates';

// Cache for template contents
const templateCache = {};

function loadTemplate(name) {
  if (!templateCache[name]) {
    const templatePath = path.join(templatesDir, `${name}.md`);
    if (fs.existsSync(templatePath)) {
      templateCache[name] = fs.readFileSync(templatePath, 'utf8');
    } else {
      console.warn(`Template not found: ${name}`);
      templateCache[name] = `<!-- Template {{${name}}} not found -->`;
    }
  }
  return templateCache[name];
}

function processContent(content) {
  return content.replace(/\{\{(\w+)\}\}/g, (match, name) => {
    const template = loadTemplate(name);
    return processContent(template);
  });
}

function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const processed = processContent(content);

    const relativePath = path.relative(sourceDir, filePath);
    const outputPath = path.join(outputDir, relativePath);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, processed);
    console.log(`✓ Processed: ${relativePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
  }
}

function clearTemplateCache() {
  Object.keys(templateCache).forEach(key => delete templateCache[key]);
  console.log('🔄 Template cache cleared');
}

// Ensure output directory exists
fs.mkdirSync(outputDir, { recursive: true });

// Initial build
function buildAll() {
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (file.endsWith('.md')) {
        processFile(fullPath);
      }
    });
  }

  if (fs.existsSync(sourceDir)) {
    walkDir(sourceDir);
  }
}

buildAll();

console.log('👀 Watching for changes...');

// Watch source directory with fs.watch (recursive on macOS)
function watchDirectory(dir, callback) {
  try {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (filename && filename.endsWith('.md')) {
        const fullPath = path.join(dir, filename);
        // Debounce: wait a bit to ensure file is fully written
        setTimeout(() => {
          if (fs.existsSync(fullPath)) {
            console.log(`📝 Detected change: ${filename}`);
            callback(fullPath);
          }
        }, 100);
      }
    });
    console.log(`✓ Watching: ${dir}`);
  } catch (err) {
    console.error(`Error watching ${dir}:`, err.message);
  }
}

// Watch source files
watchDirectory(sourceDir, processFile);

// Watch templates
watchDirectory(templatesDir, () => {
  clearTemplateCache();
  console.log('📝 Template changed, rebuilding all...');
  buildAll();
});

// Keep process alive
process.stdin.resume();
