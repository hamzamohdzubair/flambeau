/* ==========================================================================
   Flambeau deck runtime. A deck is a plain HTML page whose <body> holds
   <section class="slide"> elements; this script turns them into a
   presentation: each slide is a 1600x900 canvas scaled to fit the window.
   See CLAUDE.md for the authoring guide.

   Public API (window.Deck):
     Deck.on(event, fn)        'enter' | 'leave' | 'step' | 'unstep'
                               fn(slideEl, index, detail)
     Deck.load(name)           Promise for a library: 'gsap', 'three',
                               'katex', 'hljs', 'd3', 'chart', 'anime'
     Deck.go(slide, step)      jump (0-based slide, steps shown)
     Deck.next() / Deck.prev()
     Deck.slides, Deck.index, Deck.step
   Each slide element also receives DOM events: 'slide:enter',
   'slide:leave', and each revealed step element gets 'step:show' /
   'step:hide'.
   ========================================================================== */

(function () {
  "use strict";

  // Pinned CDN versions so a deck never breaks on a library update
  const LIBS = {
    gsap: { script: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js", global: "gsap" },
    gsapMotionPath: { script: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js", global: "MotionPathPlugin", after: ["gsap"] },
    gsapText: { script: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/TextPlugin.min.js", global: "TextPlugin", after: ["gsap"] },
    three: { module: "three" },
    threeOrbit: { module: "three/addons/controls/OrbitControls.js" },
    d3: { module: "https://cdn.jsdelivr.net/npm/d3@7.8.5/+esm" },
    chart: { script: "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js", global: "Chart" },
    anime: { script: "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js", global: "anime" },
    hljs: { script: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js", global: "hljs" },
    katex: {
      css: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
      script: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
      global: "katex",
    },
    katexAuto: { script: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js", global: "renderMathInElement", after: ["katex"] },
  };

  // Friendlier names for folders in the breadcrumb trail
  const CRUMB_NAMES = {
    aiml: "AI/ML",
    cs: "CS",
    ops: "Ops",
    mlalgos: "ML algorithms",
    nn: "Neural nets",
    cnn: "CNN",
    glm: "GLM",
    la: "Linear algebra",
    linalg: "Linear algebra",
    ag: "Algebra",
    probstats: "Prob & stats",
    dist: "Distributions",
    cpp: "C++",
    sql: "SQL",
    numpy: "NumPy",
  };

  // Bare "three" imports (used by three.js addons and by deck scripts) resolve
  // through this import map; it must exist before the first module loads.
  const importMap = document.createElement("script");
  importMap.type = "importmap";
  importMap.textContent = JSON.stringify({
    imports: {
      three: "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js",
      "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/",
      gsap: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js",
      d3: "https://cdn.jsdelivr.net/npm/d3@7.8.5/+esm",
    },
  });
  document.currentScript?.after(importMap);

  const loaded = {};
  const listeners = { enter: [], leave: [], step: [], unstep: [] };

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });
  }

  function loadCss(href) {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    document.head.appendChild(l);
  }

  function load(name) {
    if (loaded[name]) return loaded[name];
    const lib = LIBS[name];
    if (!lib) return Promise.reject(new Error("Unknown library " + name));
    loaded[name] = (async () => {
      for (const dep of lib.after || []) await load(dep);
      if (lib.css) loadCss(lib.css);
      if (lib.module) return import(lib.module);
      await loadScript(lib.script);
      const g = window[lib.global];
      if (name === "gsapMotionPath" || name === "gsapText") window.gsap.registerPlugin(g);
      return g;
    })();
    return loaded[name];
  }

  // ---------------------------------------------------------------- helpers

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function el(tag, attrs = {}, html = "") {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
    e.innerHTML = html;
    return e;
  }

  const ICONS = {
    prev: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>',
    full: '<svg viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  };

  function favicon() {
    if ($('link[rel~="icon"]')) return;
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0' stop-color='%238b5cf6'/><stop offset='1' stop-color='%2306b6d4'/></linearGradient></defs><rect width='32' height='32' rx='8' fill='url(%23g)'/><path d='M9 23V9h14' stroke='white' stroke-width='3' fill='none' stroke-linecap='round'/></svg>";
    document.head.appendChild(el("link", { rel: "icon", href: "data:image/svg+xml," + svg }));
  }

  function analytics() {
    if (location.hostname === "localhost" || location.hostname === "127.0.0.1") return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", "G-NLV7GHEJDK");
    loadScript("https://www.googletagmanager.com/gtag/js?id=G-NLV7GHEJDK").catch(() => {});
  }

  // ------------------------------------------------------------------- code

  // Wrap each source line in <span class="line">, keeping highlight spans
  // balanced across line breaks.
  function splitLines(html) {
    const parts = html.split(/(<span[^>]*>|<\/span>|\n)/);
    const lines = [];
    const open = [];
    let cur = "";
    for (const p of parts) {
      if (!p) continue;
      if (p === "\n") {
        cur += "</span>".repeat(open.length);
        lines.push(cur);
        cur = open.join("");
      } else if (p.startsWith("<span")) {
        open.push(p);
        cur += p;
      } else if (p === "</span>") {
        open.pop();
        cur += p;
      } else {
        cur += p;
      }
    }
    if (cur.replace(/<[^>]+>/g, "").length || !lines.length) lines.push(cur);
    return lines;
  }

  async function prepareCode() {
    const blocks = $$("pre > code");
    if (!blocks.length) return;
    const needsHl = blocks.some((c) => /language-|lang-/.test(c.className) && !c.classList.contains("hljs"));
    let hljs = null;
    if (needsHl) {
      try {
        hljs = await load("hljs");
      } catch (e) {
        hljs = null;
      }
    }
    for (const code of blocks) {
      const pre = code.parentElement;
      // Strip the common indentation authors get from nesting HTML
      let text = code.textContent.replace(/^\n+|\s+$/g, "");
      const indent = Math.min(...text.split("\n").filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
      if (indent > 0 && isFinite(indent)) text = text.split("\n").map((l) => l.slice(indent)).join("\n");

      const lang = (code.className.match(/(?:language|lang)-(\w+)/) || [])[1];
      let html;
      if (hljs && lang && hljs.getLanguage(lang)) {
        html = hljs.highlight(text, { language: lang }).value;
        code.classList.add("hljs");
      } else {
        html = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }

      const steps = pre.classList.contains("steps");
      pre.classList.add("lines");
      code.innerHTML = splitLines(html)
        .map((line) => {
          // "# ans: text" marks an answer line and shows "# text"; a bare
          // trailing "# ans:" hides the line's code itself as the answer
          const plain = line.replace(/<[^>]+>/g, "");
          const isAnswer = /(#|\/\/)\s*ans:/.test(plain);
          if (isAnswer) {
            // Remove only the marker text; any highlight span around it stays balanced
            if (/(#|\/\/)\s*ans:\s*$/.test(plain)) line = line.replace(/\s*(#|\/\/)\s*ans:\s*(?=(<\/span>)*\s*$)/, "").replace(/<span[^>]*><\/span>/g, "");
            else line = line.replace(/(#|\/\/)\s*ans:\s?/, "$1 ");
          }
          const cls = ["line"];
          if (steps || isAnswer) cls.push("step");
          if (isAnswer) cls.push("answer");
          return `<span class="${cls.join(" ")}">${line || " "}</span>`;
        })
        .join("");
    }
  }

  async function prepareMath() {
    // Only visible text counts: scripts and code often contain \( or \[
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (n) => (n.parentElement.closest("script, style, pre, code, textarea") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    });
    let text = "";
    while (walker.nextNode()) text += walker.currentNode.nodeValue;
    if (!/\$\$|\\\(|\\\[/.test(text)) return;
    try {
      const render = await load("katexAuto");
      render(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
        ],
        ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
        throwOnError: false,
      });
    } catch (e) {
      /* maths stays as source text */
    }
  }

  // ------------------------------------------------------------- the chrome

  function crumbs() {
    const segs = location.pathname.split("/").filter(Boolean);
    const file = segs[segs.length - 1] || "index.html";
    if (/\.html?$/.test(file)) segs.pop();
    const isIndex = /^index\.html?$/.test(file) || !/\.html?$/.test(file);
    const name = (s) => CRUMB_NAMES[s] || s.replace(/[-_]/g, " ").replace(/^\w/, (c) => c.toUpperCase());

    const items = [`<a href="/index.html">Slides</a>`];
    segs.forEach((s, i) => {
      const href = "/" + segs.slice(0, i + 1).join("/") + "/index.html";
      const last = i === segs.length - 1 && isIndex;
      items.push(last ? `<span class="here">${name(s)}</span>` : `<a href="${href}">${name(s)}</a>`);
    });
    if (!isIndex) items.push(`<span class="here">${document.title || name(file.replace(/\.html?$/, ""))}</span>`);
    if (segs.length === 0 && isIndex) items[0] = `<span class="here">Slides</span>`;
    return items.join('<span class="sep">/</span>');
  }

  function buildChrome() {
    const bar = el(
      "nav",
      { class: "deck-bar" },
      `<a class="deck-home" href="https://hzubair.com" title="Back to hzubair.com"><i></i><b>hzubair.com</b></a>
       <div class="deck-crumbs">${crumbs()}</div>
       <div class="deck-tools">
         <span class="deck-count"></span>
         <button class="deck-btn" data-act="full" title="Fullscreen (F)">${ICONS.full}</button>
       </div>`
    );
    const nav = el(
      "div",
      { class: "deck-nav" },
      `<button class="deck-btn" data-act="prev" title="Previous (←)">${ICONS.prev}</button>
       <button class="deck-btn" data-act="next" title="Next (→ or space)">${ICONS.next}</button>`
    );
    const progress = el("div", { class: "deck-progress" });
    const zoom = el("div", { class: "deck-zoom" });
    document.body.append(bar, nav, progress, zoom);

    bar.addEventListener("click", onButton);
    nav.addEventListener("click", onButton);
    zoom.addEventListener("click", closeZoom);
    return { bar, nav, progress, zoom, count: $(".deck-count", bar), prev: $('[data-act="prev"]', nav), next: $('[data-act="next"]', nav) };
  }

  function onButton(e) {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    e.stopPropagation();
    const act = b.dataset.act;
    if (act === "prev") prev();
    else if (act === "next") next();
    else if (act === "full") toggleFull();
  }

  function toggleFull() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }

  function openZoom(img) {
    ui.zoom.innerHTML = "";
    const copy = el("img", { src: img.currentSrc || img.src, alt: img.alt || "" });
    ui.zoom.appendChild(copy);
    ui.zoom.classList.add("open");
  }

  function closeZoom() {
    ui.zoom.classList.remove("open");
  }

  const zoomOpen = () => ui.zoom.classList.contains("open");

  // ------------------------------------------------------------ the canvas

  const W = 1600;
  const H = 900;
  let stage;

  function buildStage() {
    stage = el("div", { class: "deck-stage" });
    slides[0].before(stage);
    stage.append(...slides);
    scaleStage();
    window.addEventListener("resize", scaleStage);
  }

  let rotateHint;
  function scaleStage() {
    stage.style.setProperty("--scale", Math.min(window.innerWidth / W, window.innerHeight / H));
    // Portrait phone: suggest landscape, briefly
    if (window.innerHeight > window.innerWidth * 1.2 && window.innerWidth < 760) {
      if (!rotateHint) {
        rotateHint = el("div", { class: "deck-rotate" }, "Turn your phone sideways for bigger slides");
        document.body.appendChild(rotateHint);
        requestAnimationFrame(() => rotateHint.classList.add("show"));
        setTimeout(() => rotateHint.classList.remove("show"), 4000);
      }
    } else rotateHint?.classList.remove("show");
  }

  // A slide whose content is taller or wider than the canvas is shrunk to fit
  // (CSS zoom keeps the slide box at full size). Slides should be written to
  // fit; this is the safety net, and Deck.overflow() lists the slides it caught.
  const fitted = new Map();
  function fit(slide) {
    slide.style.zoom = "";
    const over = Math.max(slide.scrollHeight / slide.clientHeight, slide.scrollWidth / slide.clientWidth);
    if (over > 1.01) {
      const z = Math.max(0.5, 1 / over);
      slide.style.zoom = z;
      fitted.set(slide, z);
    } else fitted.delete(slide);
  }

  function fitAll() {
    slides.forEach(fit);
  }

  // ------------------------------------------------------------- the engine

  let slides = [];
  let groups = []; // per slide: array of arrays of step elements
  let index = -1;
  let step = 0;
  let ui;
  let markReady;
  const ready = new Promise((r) => (markReady = r));

  function collectSteps(slide) {
    const els = $$(".step, .answer", slide);
    let auto = 0;
    const byKey = new Map();
    for (const e of els) {
      e.classList.add("step");
      const key = e.dataset.step !== undefined ? parseFloat(e.dataset.step) : ++auto;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(e);
    }
    return [...byKey.entries()].sort((a, b) => a[0] - b[0]).map((x) => x[1]);
  }

  function emit(name, slide, i, detail) {
    for (const fn of listeners[name]) {
      try {
        fn(slide, i, detail);
      } catch (e) {
        console.error(e);
      }
    }
  }

  function setStep(n, dir) {
    const g = groups[index];
    n = Math.max(0, Math.min(n, g.length));
    g.forEach((group, k) => {
      const show = k < n;
      for (const e of group) {
        const was = e.classList.contains("shown");
        e.classList.toggle("shown", show);
        e.classList.toggle("current", k === n - 1);
        if (show && !was) {
          e.dispatchEvent(new CustomEvent("step:show", { bubbles: true, detail: { step: k + 1, dir } }));
          if (dir > 0 && e.matches(".zoom-on-reveal")) {
            const img = e.matches("img") ? e : $("img", e);
            if (img) setTimeout(() => openZoom(img), 300);
          }
        } else if (!show && was) {
          e.dispatchEvent(new CustomEvent("step:hide", { bubbles: true, detail: { step: k + 1, dir } }));
        }
      }
      if (show && k >= step) emit("step", slides[index], index, { step: k + 1, elements: group, dir });
      if (!show && k < step) emit("unstep", slides[index], index, { step: k + 1, elements: group, dir });
    });
    step = n;
    render();
  }

  function go(i, s = 0, dir = 1) {
    i = Math.max(0, Math.min(i, slides.length - 1));
    if (i !== index) {
      const old = slides[index];
      if (old) {
        old.dispatchEvent(new CustomEvent("slide:leave", { detail: { index } }));
        emit("leave", old, index, { dir });
      }
      slides.forEach((sl, k) => {
        sl.classList.toggle("active", k === i);
        sl.classList.toggle("before", k < i);
        sl.setAttribute("aria-hidden", k === i ? "false" : "true");
      });
      const prevIndex = index;
      index = i;
      step = 0;
      groups[i].flat().forEach((e) => e.classList.remove("shown", "current"));
      slides[i].dispatchEvent(new CustomEvent("slide:enter", { detail: { index: i, from: prevIndex, dir } }));
      emit("enter", slides[i], i, { from: prevIndex, dir });
    }
    setStep(s === Infinity ? groups[i].length : s, dir);
  }

  function next() {
    if (zoomOpen()) return closeZoom();
    if (step < groups[index].length) setStep(step + 1, 1);
    else if (index < slides.length - 1) go(index + 1, 0, 1);
  }

  function prev() {
    if (zoomOpen()) return closeZoom();
    if (step > 0) setStep(step - 1, -1);
    else if (index > 0) go(index - 1, Infinity, -1);
  }

  function render() {
    ui.count.textContent = `${index + 1} / ${slides.length}`;
    const total = slides.length > 1 ? slides.length - 1 : 1;
    const within = groups[index].length ? step / groups[index].length : 1;
    ui.progress.style.transform = `scaleX(${slides.length > 1 ? (index + within) / total : 1})`;
    ui.prev.disabled = index === 0 && step === 0;
    ui.next.disabled = index === slides.length - 1 && step === groups[index].length;
    const hash = "#" + (index + 1) + (step && step < groups[index].length ? "." + step : "");
    if (location.hash !== hash) history.replaceState(null, "", hash);
  }

  function fromHash() {
    const m = location.hash.match(/^#(\d+)(?:\.(\d+))?$/);
    if (!m) return [0, 0];
    const i = parseInt(m[1], 10) - 1;
    const s = m[2] !== undefined ? parseInt(m[2], 10) : Infinity;
    return [i, i === 0 && m[2] === undefined ? 0 : s];
  }

  // ------------------------------------------------------------------ input

  const interactive = "a, button, input, select, textarea, label, iframe, canvas, video, audio, summary, [contenteditable], [data-interactive], .deck-bar, .deck-nav";

  function onKey(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target.closest("input, textarea, select, [contenteditable]")) return;
    const k = e.key;
    if (k === "Escape" && zoomOpen()) return closeZoom();
    if (["ArrowRight", " ", "PageDown", "l"].includes(k)) {
      e.preventDefault();
      next();
    } else if (["ArrowLeft", "PageUp", "Backspace", "h"].includes(k)) {
      e.preventDefault();
      prev();
    } else if (k === "ArrowDown" || k === "j") {
      e.preventDefault();
      go(index + 1, Infinity, 1);
    } else if (k === "ArrowUp" || k === "k") {
      e.preventDefault();
      go(index - 1, Infinity, -1);
    } else if (k === "Home") {
      go(0, 0, -1);
    } else if (k === "End") {
      go(slides.length - 1, Infinity, 1);
    } else if (k === "f" || k === "F") {
      toggleFull();
    }
  }

  function onClick(e) {
    if (zoomOpen()) return;
    const img = e.target.closest("figure img, img.zoom");
    if (img && !e.target.closest("a")) return openZoom(img);
    if (e.target.closest(interactive)) return;
    if (String(window.getSelection())) return;
    // Click on the left third goes back, anywhere else goes forward
    if (e.clientX < window.innerWidth * 0.3) prev();
    else next();
  }

  let touch = null;
  function onTouchStart(e) {
    if (e.touches.length !== 1) return (touch = null);
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }

  function onTouchEnd(e) {
    if (!touch) return;
    const dx = e.changedTouches[0].clientX - touch.x;
    const dy = e.changedTouches[0].clientY - touch.y;
    touch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (e.target.closest("pre, [data-interactive]")) return;
      dx < 0 ? next() : prev();
    }
  }

  // The chrome shows while the pointer moves and fades while presenting
  let idleTimer;
  function wake() {
    document.body.classList.remove("idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (!document.querySelector(".deck-bar:hover, .deck-nav:hover")) document.body.classList.add("idle");
    }, 2500);
  }

  // ------------------------------------------------------------------- boot

  async function boot() {
    slides = $$("body > section.slide, body > main > section.slide");
    if (!slides.length) return;
    analytics();
    favicon();
    buildStage();
    ui = buildChrome();
    document.body.classList.toggle("single", slides.length === 1);

    // Run code and maths preparation before steps are collected
    await prepareCode();
    groups = slides.map(collectSteps);
    prepareMath().then(fitAll);

    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    document.addEventListener("mousemove", wake);
    document.addEventListener("touchstart", wake, { passive: true });
    document.addEventListener("fullscreenchange", wake);
    window.addEventListener("hashchange", () => {
      const [i, s] = fromHash();
      if (i !== index) go(i, s);
    });

    // Fit slides once fonts, images and maths have settled, and again on entry
    // in case a script changed the slide's content
    fitAll();
    document.fonts?.ready.then(fitAll);
    window.addEventListener("load", fitAll);
    for (const img of $$("img", stage)) if (!img.complete) img.addEventListener("load", () => fit(img.closest(".slide")), { once: true });
    Deck.on("enter", (sl) => fit(sl));
    wake();

    markReady();
    const [i, s] = fromHash();
    go(i, s, 1);
    document.documentElement.classList.add("deck-ready");
  }

  window.Deck = {
    // Resolves once code is highlighted and split into .line spans and steps
    // are collected: await it before querying generated markup
    ready,
    on(name, fn) {
      if (!listeners[name]) throw new Error("Unknown deck event " + name);
      listeners[name].push(fn);
      // A listener added after the first slide is already showing still
      // hears about it, so per-slide scripts can live at the end of <body>
      if (name === "enter" && index >= 0) fn(slides[index], index, { from: -1, dir: 1 });
    },
    // Deck.scene('#orbit', { enter(slide), leave(slide), step(slide, n, els), unstep(slide, n, els) })
    // binds handlers to one slide, chosen by selector or element
    scene(target, handlers) {
      const match = (slide) => (typeof target === "string" ? slide.matches(target) : slide === target);
      if (handlers.enter) this.on("enter", (s, i, d) => match(s) && handlers.enter(s, d));
      if (handlers.leave) listeners.leave.push((s, i, d) => match(s) && handlers.leave(s, d));
      if (handlers.step) listeners.step.push((s, i, d) => match(s) && handlers.step(s, d.step, d.elements, d));
      if (handlers.unstep) listeners.unstep.push((s, i, d) => match(s) && handlers.unstep(s, d.step, d.elements, d));
    },
    load,
    // Before the deck has booted, a jump waits for it instead of failing
    go: (i, s = Infinity) => (groups.length ? go(i, s) : ready.then(() => go(i, s))),
    next: () => next(),
    prev: () => prev(),
    get slides() {
      return slides;
    },
    get index() {
      return index;
    },
    get step() {
      return step;
    },
    // Screen pixels per canvas pixel: divide getBoundingClientRect() sizes
    // and offsets by this to get canvas units (for FLIP-style animations)
    get scale() {
      return stage ? stage.getBoundingClientRect().width / W : 1;
    },
    // Slides the safety net had to shrink, as [slide number, zoom] pairs
    overflow: () => slides.map((sl, i) => [i + 1, fitted.get(sl)]).filter((x) => x[1]),
    fit: (slide) => (slide ? fit(slide) : fitAll()),
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
