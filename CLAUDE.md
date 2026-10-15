# Flambeau: slides.hzubair.com

Hamza's lecture slides. Every deck is a **hand-written HTML file**. There is no build step, no
markdown and no generator: what is in the repo is what is served. Claude writes and edits the decks
directly.

The old Marp/markdown version is preserved at the git tag `marp-final`
(`git show marp-final:mdx/<path>.md` shows an old deck's source).

## Layout

```
index.html              slides home (topic tiles)
deck/deck.css           the one stylesheet every deck links
deck/deck.js            the runtime: navigation, steps, chrome, library loader
lab/showcase.html       a deck that exercises every feature; copy patterns from it
assets/                 images (pngquant-compressed on deploy)
<topic>/.../index.html  every folder has an index.html (the breadcrumb links to it)
<topic>/.../<deck>.html
```

URLs are the file paths, and decks link to each other with relative or root-absolute paths.
Every folder must have an `index.html`, because the breadcrumb trail links to each one.

## Preview and deploy

- Preview: `python3 -m http.server 8000` in the repo root, then open http://localhost:8000.
  Paths like `/assets/x.png` need the repo root as the server root.
- Deploy: push to `master`. `.github/workflows/deploy.yml` compresses PNGs and publishes the repo
  to the `ghp` branch, which GitHub Pages serves at slides.hzubair.com.

## A deck

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Region Processing</title>            <!-- shown in the breadcrumb -->
    <link rel="stylesheet" href="/deck/deck.css" />
    <script src="/deck/deck.js" defer></script>
    <style>/* styles for this deck only, scoped by slide id */</style>
  </head>
  <body>
    <section class="slide cover">
      <span class="kicker">Computer vision</span>
      <h1>Region Processing</h1>
      <p>One-line summary of the deck.</p>
    </section>

    <section class="slide">
      <h2>Slide title</h2>
      <ul>
        <li class="step">Revealed on the first press</li>
        <li class="step">Then this</li>
      </ul>
    </section>

    <script type="module">
      // Animations go here (see "Animation")
    </script>
  </body>
</html>
```

`deck.js` adds everything else: the top bar (a link back to hzubair.com, breadcrumbs, the slide
counter, fullscreen), prev/next buttons, the progress bar, keyboard/click/swipe navigation, image
zoom, code highlighting, KaTeX maths, the favicon and analytics. Never add those by hand.

## Slides are a fixed 16:9 canvas

These are presentations, not web pages. Every slide is a **1600×900 canvas** that deck.js scales
to fit the window (the aurora background fills any margin, so there are no black bars). Layouts
never reflow and **never scroll**: design each slide to fit the canvas, like a Keynote slide.

- Size things in `rem` (1rem = 24px of the 1600px canvas) or in `cqw`/`cqh` (percent of the
  canvas). Never use `vw`/`vh` or `@media` width queries inside slides: the canvas is always
  1600×900, whatever the screen. Phones see the same slide scaled down.
- Fill the canvas: a diagram or code block should use most of the slide, with text big enough to
  read from the back of a room. Body text is 1.15rem; don't go below 0.8rem anywhere.
- If a slide has too much for 1600×900, split it into two slides. As a safety net deck.js shrinks
  an overflowing slide to fit (down to 50%), and `Deck.overflow()` lists the slides it shrank; a
  finished deck should have none, or only tiny ones (zoom above 0.9).
- `<section class="slide">`: content is centred vertically under the title.
- The first `<h2>` in a slide is its title: pinned to the top in gradient text.
- Slide classes: `cover` (centred title slide with `<span class="kicker">`, `<h1>`, `<p>`),
  `section` (big centred divider), `top` (content starts under the title instead of centred).
- Topic index pages are decks too: a `cover hub-cover` slide with the title and a
  `<nav class="contents">` of `.pill` links to `#n`, then one `slide hub-group` per group
  (`<span class="kicker">`, `<h2>`, `.tiles`), at most about 10 tiles per slide.
- Give a slide an `id` when a script or a `<style>` needs to target it.

## Steps (fragments)

- `class="step"` on any element: hidden (blurred) until the presenter presses next. Steps reveal in
  document order.
- `data-step="2"`: explicit order; elements with the same number reveal together.
- `data-anim`: `fade`, `left`, `right`, `zoom`, `hidden` (invisible until shown), or `none` (no CSS
  effect, for steps a script animates).
- `class="answer"`: a step shown blurred over red, for quiz answers.
- `figure class="step zoom-on-reveal"`: the image opens full-screen when revealed.

## Content building blocks (all in deck.css)

| Need | Markup |
|---|---|
| Lead sentence | `<p class="lead">` |
| Two or three columns | `<div class="cols">` / `<div class="cols three">` (`cols top` aligns to top) |
| Cards | `<div class="cards"><div class="card"><h3>…</h3><p>…</p></div>…</div>` |
| Figure | `<figure><img src="/assets/x.png" alt="…"><figcaption>…</figcaption></figure>` |
| Row of figures | `<div class="figs">` of `<figure>`s; add `landscape`/`portrait` on a figure to crop, `figs contain` to never crop |
| Embedded page | `<figure class="frame"><iframe src="…"></iframe><figcaption>…</figcaption></figure>` |
| Topic tiles (index pages) | `<div class="tiles"><a class="tile" href="x.html" style="--img:url('/assets/y.png')"><span>Title<small>sub</small></span></a></div>` |
| Quote | `<blockquote>…<cite>— Who</cite></blockquote>` |
| Big number | `<span class="big grad">95%</span>` |
| Gradient text | `class="grad"`; for a heading whose words are animated separately, `class="grad-each"` with each word in a `<span>` |
| Pill / tag | `<span class="pill">` |
| Muted / centred text | `class="muted"`, `class="center"` |

Click any figure image to zoom it.

## Code

```html
<pre><code class="language-python">
  print("hello")
</code></pre>
```

- Highlighted at load with highlight.js; common indentation is stripped, so indent the code to
  match the HTML around it. Escape `<`, `>` and `&` as `&lt;`, `&gt;`, `&amp;`.
- Lines are numbered. `<pre class="steps">` reveals the code one line at a time.
- A line containing `# ans: text` (or `// ans: text`) is an answer line: hidden until revealed,
  shown as `# text`. Use it for "what does this print?" slides. A line ending in a bare `# ans:`
  hides its own code as the answer (the marker is removed). A whole block can be an answer:
  `<pre class="answer">`.

## Maths

Write LaTeX inline as `\( … \)` and display as `$$ … $$` or `\[ … \]`; KaTeX renders it when the
page contains any. A literal dollar sign in text is fine as long as it is not doubled.

## Animation

Put scripts in a `<script type="module">` at the end of `<body>` (module scripts run after deck.js,
so `Deck` exists). `await Deck.ready` before querying markup deck.js generates (code `.line`
spans). Load libraries on demand: they are pinned and cached.

```js
const gsap = await Deck.load("gsap");          // also gsapMotionPath, gsapText
const THREE = await Deck.load("three");        // or: import * as THREE from "three"
const { OrbitControls } = await Deck.load("threeOrbit");   // any addon: import from "three/addons/…"
const d3 = await Deck.load("d3");              // also "chart" (Chart.js), "anime", "katex"

Deck.scene("#my-slide", {
  enter(slide) { /* slide became visible: start timelines and render loops */ },
  leave(slide) { /* stop render loops, kill timelines */ },
  step(slide, n, elements) { /* step n was revealed */ },
  unstep(slide, n, elements) { /* step n was hidden again (presenter went back) */ },
});
```

- Drive a script-only sequence with invisible steps: `<span class="step" data-anim="none"></span>`
  per beat (an empty step span takes no space), then react in `step()` / `unstep()`.
- Rendering loops (three.js, canvas) must stop in `leave()`; only one slide is visible at a time.
- `step` can fire for several steps in one tick (↓/↑ and links into a deck show all steps at
  once). Make handlers idempotent and state-based; when `detail.dir < 0` (going back) or many steps
  arrive together, jump to the final state instead of animating.
- `enter` fires before that slide's step events.
- `Deck.on('enter' | 'leave' | 'step' | 'unstep', fn)` listens across all slides. Each slide also
  fires DOM events `slide:enter` / `slide:leave`, and step elements fire `step:show` / `step:hide`.
- Canvases, iframes, videos, buttons, links and anything with `data-interactive` (put it on a
  row of controls) do not advance the slide when clicked or swiped.
- Same-origin `/assets` images can be drawn on a canvas and read with `getImageData`, for live
  image-processing demos.
- Pointer coordinates: the canvas is scaled, so map `clientX/clientY` through
  `getBoundingClientRect()` ratios (`(e.clientX - r.left) / r.width * width`), never `offsetX`.
- `getBoundingClientRect()` returns screen pixels. To move or place something by a measured
  amount (e.g. animating an element from one box to another), divide by `Deck.scale` (screen px
  per canvas px), or the motion is wrong whenever the window isn't exactly 1600 wide. A slide that
  the safety net shrank also has a CSS zoom on it.
- Gotcha: gradient text (`background-clip: text`) disappears on children that get their own
  transform. Animate words inside a `grad-each` heading instead.
- Inline SVG is the easiest canvas for diagrams: draw it in the HTML, give parts classes, and
  animate them with GSAP in the slide's scene.

## Presenting

The hzubair.com link, breadcrumbs, counter and buttons fade out after a few seconds without mouse
movement, so they never sit on top of a slide while presenting.

→, space, PageDown, click (right side): next step. ←, PageUp, click (left third): back.
↓/↑: next/previous slide with every step shown. Home/End. F: fullscreen. Swipe on phones.
The URL hash is `#slide` or `#slide.step`, so a link can open a deck mid-way.

## Style

- Dark "aurora" theme matching hzubair.com: violet `#8b5cf6`, pink `#ec4899`, cyan `#22d3ee` on
  `#05060f`; Space Grotesk headings, Inter text, JetBrains Mono code. Use the CSS variables in
  deck.css (`--violet`, `--cyan`, `--muted`, `--gradient`, …) rather than new colours.
- Keep a slide to one idea. Prefer a diagram, animation or figure to a wall of bullets, but don't
  animate for the sake of it: motion should explain something (a process, a change, a comparison).
- Write in plain English; no emoji in slide text.

## Testing a deck

Open it through the local server and step through every slide (→ to the end), checking the browser
console for errors. A headless check at a 1600×900 window: load each page, confirm
`Deck.slides.length` is non-zero, no `pageerror` fires, and `Deck.overflow()` is empty.
