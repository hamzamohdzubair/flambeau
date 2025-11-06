const fs = require('fs');
const path = require('path');

function fixFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let inCodeBlock = false;
  let seenCommentInBlock = false;
  let modified = false;

  const newLines = lines.map(line => {
    // Check if we're entering a code block
    if (line.trim().startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        seenCommentInBlock = false;
      } else {
        inCodeBlock = false;
      }
      return line;
    }

    // If we're in a code block and this is the first comment
    if (inCodeBlock && !seenCommentInBlock && line.trim().startsWith('#ans:')) {
      seenCommentInBlock = true;
      modified = true;
      return line.replace('#ans:', '#');
    }

    // Track if we've seen any comment (for subsequent comments)
    if (inCodeBlock && line.trim().startsWith('#')) {
      seenCommentInBlock = true;
    }

    return line;
  });

  if (modified) {
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`Fixed: ${filePath}`);
  }
}

// Get all md files recursively
function getAllMdFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllMdFiles(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const files = [...getAllMdFiles('md'), ...getAllMdFiles('mdx')];
console.log(`Processing ${files.length} files...\n`);
files.forEach(fixFile);
console.log('\nDone!');
