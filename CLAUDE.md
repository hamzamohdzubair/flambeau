# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flambeau is a Marp-based presentation system that generates HTML slide decks from Markdown files. It uses a custom template preprocessing system to enable reusable components across presentations.

## Architecture

### Three-Stage Build Pipeline

1. **Template Processing (`genmdx.js`)**: Processes source markdown files in `md/` directory
   - Watches `md/` and `templates/` directories for changes
   - Expands template placeholders like `{{tile(title, url, image)}}` and `{{fig(caption, url)}}`
   - Supports both simple templates `{{name}}` and parameterized templates `{{name(arg1, arg2)}}`
   - Template arguments: `$1`, `$2`, etc. map to function arguments; `$0` joins all arguments
   - Outputs processed markdown to `mdx/` directory
   - Clears template cache and rebuilds all files when templates change

2. **Marp Rendering**: Converts processed markdown to HTML presentations
   - Uses custom Marp engine (`engine2.js`) that modifies syntax highlighting
   - All code blocks are automatically wrapped in numbered lists with fragment animations
   - Lines with `#ans:` comment are marked with `data-answer="true"` attribute
   - Uses custom themes from `styles/` directory (extends default theme)
   - Primary theme: `blank2.css` with Font Awesome icons support

3. **Asset Copying**: Copies supporting files (assets, scripts, styles) to `docs/`

### Directory Structure

- `md/`: Source markdown files (author here)
- `templates/`: Reusable markdown templates (e.g., `tile.md`, `fig.md`)
- `mdx/`: Auto-generated processed markdown (do not edit directly)
- `docs/`: Final HTML output (deployed to GitHub Pages)
- `styles/`: Custom Marp themes (CSS)
- `scripts/`: JavaScript for interactive features (zoom, navigation, back button)
- `assets/`: Images and media files

### Template System

Templates are expanded recursively and support nesting. Common templates include:
- `tile(title, url, image)`: Creates linked tiles with background images
- `fig(caption, url)`: Creates figures with captions and fragment animations
- Templates can reference other templates

## Development Commands

### Full Development Workflow
```bash
npm start
```
Runs all three watch processes concurrently:
- `npm run watch:md` - Watches `md/` and processes templates
- `npm run watch:mdx` - Watches `mdx/` and renders to HTML
- `npm run serve:html` - Serves `docs/` at http://localhost:8080

### Individual Commands
```bash
npm run build-ghp      # Build all mdx files to HTML (production build)
npm run assets         # Copy assets, scripts, and styles to docs/
npm run clean          # Remove entire docs/ directory
npm run clean-md       # Remove generated HTML files from md/ directory
```

### Watch Mode (Development)
```bash
npm run watch:mdx      # Watch mdx/ and rebuild HTML on changes
npm run watch:md       # Watch md/ and templates/, process on changes
```

## Editing Workflow

1. **Edit source markdown** in `md/` directory
2. Template processor (`genmdx.js`) automatically updates `mdx/`
3. Marp watcher automatically rebuilds HTML in `docs/`
4. Live server auto-refreshes browser

**Important**: Never edit files in `mdx/` directly - they are auto-generated from `md/` templates.

## Deployment

GitHub Actions workflow (`.github/workflows/build.yml`) automatically:
- Runs on push to `master` branch
- Builds presentations using `npm run build-ghp`
- Copies assets with `npm run assets`
- Compresses PNG images in `docs/assets/` using pngquant
- Deploys to GitHub Pages (`ghp` branch)
- Available at: slides.hzubair.com

## Custom Marp Engine Features

The `engine2.js` file customizes Marp's syntax highlighter:
- Wraps all code blocks in ordered lists (`<ol><li>`)
- Each line gets `data-marpit-fragment` attribute for progressive reveal
- Lines containing `#ans:` get `data-answer="true"` attribute (used for answer reveal)
- Fragment animations are enabled by default for all code blocks

## Utility Scripts

- `fix-ans.js`: Utility to normalize `#ans:` comments to `#` in code blocks (first occurrence only per block)

## Content Creation Guidelines

When creating educational content (slides in `md/` directory):

### Content Balance
- **Concepts must be covered**: Include theory, mathematical formulas, algorithms, and explanations
- **Code wherever possible**: Maximize coding examples and exercises throughout
- **No restriction on exercise count**:
  - Don't force exactly 5 exercise slides if there isn't enough content
  - Go beyond 5 slides if there are many things to practice
  - Let the content dictate the number of exercises

### Code Block Formatting
- **No empty lines**: Remove all empty lines within code blocks for compact presentation
- **Answer marking with `#ans:`**:
  - Mark the **first line where the answer starts**, not just the last line
  - If a question asks "how to do X?", the answer likely starts on the next line - mark it with `#ans:`
  - If multiple consecutive lines are part of the answer, mark **all of them** with `#ans:`
  - Example:
    ```python
    # how to create a red image?
    #ans: red = np.zeros((100, 100, 3), dtype=np.uint8)
    #ans: red[:, :, 2] = 255
    ```

### File Structure
Each topic file should follow this pattern:
1. **Conceptual slides** (3-5 slides): Theory, math, algorithms, when/why to use
2. **Code demonstration** (2-3 slides): Practical implementation examples
3. **Exercises** (flexible count): Mix of conceptual questions and coding exercises
- don't add apostrophe in tile text
