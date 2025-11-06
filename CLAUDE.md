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
   - Uses custom themes from `styles/` directory (extends Gaia theme)
   - Primary theme: `gaia2.css` with Font Awesome icons support

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
