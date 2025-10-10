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
      templateCache[name] = fs.readFileSync(templatePath, 'utf8').trim();
    } else {
      console.warn(`Template not found: ${name}`);
      templateCache[name] = `<!-- Template {{${name}}} not found -->`;
    }
  }
  return templateCache[name];
}

function parseArguments(argsString) {
  // Parse comma-separated arguments, handling quoted strings
  const args = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = null;

  for (let i = 0; i < argsString.length; i++) {
    const char = argsString[i];

    if ((char === '"' || char === "'") && (i === 0 || argsString[i - 1] !== '\\')) {
      if (!inQuotes) {
        inQuotes = true;
        quoteChar = char;
      } else if (char === quoteChar) {
        inQuotes = false;
        quoteChar = null;
      } else {
        current += char;
      }
    } else if (char === ',' && !inQuotes) {
      args.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    args.push(current.trim());
  }

  return args;
}

function processTemplate(templateName, args) {
  const template = loadTemplate(templateName);

  // Replace $1, $2, $3... with the corresponding arguments
  let result = template;
  args.forEach((arg, index) => {
    const placeholder = `$${index + 1}`;
    result = result.split(placeholder).join(arg);
  });

  // Replace $0 with all arguments joined by space (if needed)
  result = result.replace(/\$0/g, args.join(' '));

  return result;
}

function processContent(content) {
  // First pass: Process function-style templates {{ name(args) }}
  content = content.replace(/\{\{\s*(\w+)\s*\((.*?)\)\s*\}\}/g, (match, name, argsString) => {
    const args = parseArguments(argsString);
    const processed = processTemplate(name, args);
    return processContent(processed); // Recursively process in case template contains more placeholders
  });

  // Second pass: Process simple templates {{ name }}
  content = content.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name) => {
    const template = loadTemplate(name);
    return processContent(template); // Recursively process
  });

  return content;
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
