/* ==========================================================================
   Live quizzes: the audience answers a slide's questions on their phones.
   deck.js loads this file, before collecting steps, on decks that have an
   <ol class="poll">:

     <ol class="poll" data-options="10 20 30" data-context="one = np.array(...)">
       <li data-answer="30">one[2]</li>         one question per item
       <li data-answer="80" data-reveal="2">one[-1]</li>
     </ol>

   data-options (on the list or an item) are the choices; without them the
   phone asks for free text. A question's answer is revealed with the slide's
   step number data-reveal (default: its position, so the first question is
   revealed by the first step). data-pos="tr|tl|br|bl" puts the panel in a
   corner (default top right).

   Live mode is off until the presenter clicks the panel's button (it is
   remembered on that browser). Then each poll slide shows a QR code and
   the votes as they arrive; extra invisible steps open each question after
   the previous one is revealed, and show a leaderboard at the end. The
   relay is a Cloudflare Worker in live/worker; ?liveapi=ws://host:port
   points a deck at another one (e.g. wrangler dev).
   ========================================================================== */

(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const API_DEFAULT = "wss://slides-live.hamzamohdzubair.workers.dev";
  const API = params.get("liveapi") || API_DEFAULT;
  const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

  const store = (s, k, v) => {
    try {
      if (v === undefined) return s.getItem(k);
      v === null ? s.removeItem(k) : s.setItem(k, v);
    } catch {
      return null;
    }
  };
  const isLive = () => store(localStorage, "deck-live") === "1";

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const norm = (s) => String(s ?? "").trim().replace(/\s+/g, " ").toLowerCase();
  const split = (s) => (s ? s.trim().split(/\s+/) : null);

  const polls = []; // {slide, panel, questions, markers: {reveal[], open[], board}}

  // ------------------------------------------------------------ preparation

  // Mirrors deck.js collectSteps: the sorted step keys of a slide and their elements
  function stepKeys(slide) {
    const byKey = new Map();
    let auto = 0;
    for (const e of slide.querySelectorAll(".step, .answer")) {
      const key = e.dataset.step !== undefined ? parseFloat(e.dataset.step) : ++auto;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push(e);
    }
    return [...byKey.entries()].sort((a, b) => a[0] - b[0]);
  }

  function beat(panel, key) {
    const b = document.createElement("span");
    b.className = "step";
    b.dataset.anim = "none";
    b.dataset.step = String(key);
    panel.appendChild(b);
    return b;
  }

  function prepare(slides) {
    const live = isLive();
    slides.forEach((slide, si) => {
      const list = slide.querySelector("ol.poll");
      if (!list) return;
      const shared = split(list.dataset.options);
      const questions = [...list.children].map((li, qi) => ({
        id: `${si + 1}.${qi + 1}`,
        text: li.textContent.trim(),
        options: split(li.dataset.options) || shared,
        answer: li.dataset.answer ?? "",
        context: li.dataset.context || list.dataset.context || "",
        reveal: parseInt(li.dataset.reveal || qi + 1, 10),
      }));
      if (!questions.length) return;

      const panel = document.createElement("aside");
      panel.className = `live live-${list.dataset.pos || "tr"}`;
      panel.setAttribute("data-interactive", "");
      slide.appendChild(panel);
      const poll = { slide, panel, questions, markers: { reveal: [], open: [], board: null } };
      polls.push(poll);

      if (!live) {
        panel.innerHTML = `<button class="live-start" title="Let the audience answer on their phones">${PHONE} Live quiz</button>`;
        panel.querySelector("button").addEventListener("click", () => {
          store(localStorage, "deck-live", "1");
          location.reload();
        });
        return;
      }

      buildPanel(poll);
      // Reveal markers are the slide's own steps; beats between them open the
      // next question, and one after the last reveal shows the leaderboard
      const keys = stepKeys(slide);
      const keyAfter = (k) => {
        const i = keys.findIndex((x) => x[0] === k);
        return i >= 0 && i + 1 < keys.length ? (k + keys[i + 1][0]) / 2 : k + 0.5;
      };
      questions.forEach((q, qi) => {
        const entry = keys[q.reveal - 1];
        poll.markers.reveal[qi] = entry ? entry[1][0] : null;
        if (!entry) return;
        if (qi + 1 < questions.length) poll.markers.open[qi + 1] = beat(panel, keyAfter(entry[0]));
        else if (questions.length > 1) poll.markers.board = beat(panel, keyAfter(entry[0]));
      });
    });

    if (live && polls.length) {
      Deck.on("enter", sync);
      Deck.on("step", sync);
      Deck.on("unstep", sync);
      Deck.on("leave", (slide) => polls.some((p) => p.slide === slide) && idle());
      connect();
    }
  }

  const PHONE = '<svg viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/></svg>';

  function buildPanel(poll) {
    poll.panel.innerHTML = `
      <div class="live-main">
        <div class="live-head"><span class="live-q"></span><span class="live-n"></span></div>
        <div class="live-body"></div>
        <div class="live-foot"></div>
      </div>
      <div class="live-join">
        <div class="live-qr"></div>
        <div class="live-code"><small>slides.hzubair.com/live</small><b>····</b></div>
        <button class="live-stop" title="Turn off live quiz">×</button>
      </div>`;
    poll.panel.querySelector(".live-stop").addEventListener("click", () => {
      store(localStorage, "deck-live", null);
      store(sessionStorage, "deck-live-room", null);
      location.reload();
    });
  }

  // ------------------------------------------------------------ the room

  let ws;
  let room;
  let view = null; // the room's latest host view
  let sent = {}; // what the room has been told: {open, revealed: {id: true}}
  let retry = 0;

  function newRoom() {
    let code = "";
    for (let i = 0; i < 4; i++) code += LETTERS[Math.floor(Math.random() * LETTERS.length)];
    room = { code, token: crypto.randomUUID() };
    store(sessionStorage, "deck-live-room", JSON.stringify(room));
  }

  function joinUrl() {
    const base = `${location.origin}/live/`;
    return (API !== API_DEFAULT ? `${base}?api=${encodeURIComponent(API)}` : base) + `#${room.code}`;
  }

  async function connect() {
    try {
      room = JSON.parse(store(sessionStorage, "deck-live-room") || "null");
    } catch {}
    if (!room?.code) newRoom();
    drawQr();
    open();
  }

  function open() {
    ws = new WebSocket(`${API}/ws/${room.code}?host=${room.token}`);
    ws.onopen = () => {
      retry = 0;
      sent = { open: undefined, revealed: {} };
      sync();
    };
    ws.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      if (msg.t === "taken") {
        newRoom();
        drawQr();
      } else if (msg.t === "host") {
        view = msg;
        render();
      }
    };
    ws.onclose = () => {
      view = null;
      render();
      setTimeout(open, Math.min(8000, 500 * 2 ** retry++));
    };
  }

  const send = (msg) => ws?.readyState === 1 && ws.send(JSON.stringify(msg));

  async function drawQr() {
    const qrcode = await Deck.load("qrcode");
    const qr = qrcode(0, "M");
    qr.addData(joinUrl());
    qr.make();
    const svg = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    for (const p of polls) {
      p.panel.querySelector(".live-qr").innerHTML = svg;
      p.panel.querySelector(".live-code b").textContent = room.code;
    }
  }

  // ------------------------------------------------------------ slide state

  const current = () => polls.find((p) => p.slide === Deck.slides[Deck.index]);
  const shown = (e) => !!e && e.classList.contains("shown");

  // Which question is open, which are revealed, and whether the leaderboard shows,
  // read from the step elements so it holds whichever way the presenter moved
  function phase(poll) {
    const m = poll.markers;
    let open = 0;
    poll.questions.forEach((q, i) => {
      if (i > 0 && shown(m.open[i])) open = i;
    });
    return {
      open,
      revealed: poll.questions.map((q, i) => shown(m.reveal[i])),
      board: shown(m.board),
    };
  }

  function sync() {
    const poll = current();
    if (!poll) return;
    const ph = phase(poll);
    poll.questions.forEach((q, i) => {
      if (ph.revealed[i] && !sent.revealed[q.id]) {
        send({ t: "reveal", id: q.id, answer: q.answer });
        sent.revealed[q.id] = true;
      } else if (!ph.revealed[i] && sent.revealed[q.id]) {
        send({ t: "unreveal", id: q.id });
        delete sent.revealed[q.id];
      }
    });
    const want = ph.board ? null : poll.questions[ph.open].id;
    if (want !== sent.open) {
      if (want) {
        const q = poll.questions[ph.open];
        send({ t: "open", q: { id: q.id, text: q.text, options: q.options, context: q.context } });
        // The room ignores a reveal for a question it hasn't seen yet (jumped in with ↓)
        if (ph.revealed[ph.open]) {
          send({ t: "reveal", id: q.id, answer: q.answer });
          sent.revealed[q.id] = true;
        }
      } else send({ t: "idle" });
      sent.open = want;
    }
    render();
  }

  function idle() {
    if (sent.open !== null) send({ t: "idle" });
    sent.open = null;
  }

  // ------------------------------------------------------------ drawing

  const secs = (ms) => (ms / 1000).toFixed(1) + " s";

  function render() {
    const poll = current();
    if (!poll || !poll.panel.querySelector(".live-main")) return;
    const ph = phase(poll);
    const q = poll.questions[ph.open];
    const $ = (s) => poll.panel.querySelector(s);
    const online = view ? `${view.online} joined` : "connecting…";

    if (ph.board) {
      poll.panel.classList.add("board");
      $(".live-q").textContent = "Leaderboard";
      $(".live-n").textContent = online;
      const rows = view?.leaderboard || [];
      $(".live-body").innerHTML = rows.length
        ? `<ol class="live-board">${rows
            .map((r, i) => `<li${i === 0 ? ' class="first"' : ""}><span>${i === 0 ? "🏆" : i + 1}</span><b>${esc(r.name)}</b><em>${r.right}/${poll.questions.length}</em><small>${secs(r.ms)}</small></li>`)
            .join("")}</ol>`
        : `<p class="live-empty">No answers yet</p>`;
      $(".live-foot").textContent = "";
      return;
    }
    poll.panel.classList.remove("board");

    const mine = view && view.current === q.id;
    const counts = mine ? view.counts : (q.options || []).map((label) => ({ label, n: 0 }));
    const revealed = ph.revealed[ph.open];
    const max = Math.max(1, ...counts.map((c) => c.n));
    const votes = mine ? view.votes : 0;

    $(".live-q").innerHTML = `${poll.questions.length > 1 ? `Q${ph.open + 1} ` : ""}<code>${esc(q.text)}</code>`;
    $(".live-n").textContent = `${votes} vote${votes === 1 ? "" : "s"} · ${online}`;
    const body = $(".live-body");
    body.classList.toggle("free", !q.options);
    body.innerHTML = counts.length
      ? counts
          .map((c) => {
            const right = revealed && norm(c.label) === norm(q.answer);
            const cls = revealed ? (right ? "right" : "wrong") : "";
            return `<div class="live-bar ${cls}" style="--h:${c.n / max}"><i>${right ? "✓ " : ""}${c.n || ""}</i><span></span><b>${esc(c.label)}</b></div>`;
          })
          .join("")
      : `<p class="live-empty">Answers appear here</p>`;

    const w = mine && view.winner;
    $(".live-foot").innerHTML = revealed
      ? w
        ? `🏆 <b>${esc(w.name)}</b> was fastest: ${secs(w.ms)}`
        : votes
          ? "Nobody got this one"
          : ""
      : "";
  }

  window.DeckLive = { prepare };
})();
