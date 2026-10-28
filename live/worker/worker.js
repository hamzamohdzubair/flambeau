/* ==========================================================================
   slides-live: the relay behind live quizzes on slides.hzubair.com.

   One Durable Object per room. The presenter's deck connects as the host
   (/ws/CODE?host=TOKEN; the first token to arrive owns the room) and opens,
   reveals and closes questions. Phones connect to /ws/CODE as players and
   vote. The room keeps every question's votes, so the presenter can step
   back and forth through a slide and the results stay consistent.

   Host -> room   {t:"open", q:{id, text, options?, context?}}
                  {t:"reveal", id, answer}   {t:"unreveal", id}   {t:"idle"}
   Player -> room {t:"join", id, name}   {t:"vote", q, choice}
   Room -> host   {t:"host", ...}  (see hostView)
   Room -> player {t:"state", ...} (see playerView)
   ========================================================================== */

import { DurableObject } from "cloudflare:workers";

const CODE = /^[A-Z]{4,6}$/;
const IDLE_MS = 12 * 3600 * 1000; // rooms forget everything after 12 h unused

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/ws\/([A-Za-z]+)$/);
    if (!m) return new Response("slides-live", { headers: { "content-type": "text/plain" } });
    const code = m[1].toUpperCase();
    if (!CODE.test(code)) return new Response("bad room code", { status: 400 });
    if (req.headers.get("Upgrade") !== "websocket") return new Response("expected websocket", { status: 426 });
    return env.ROOM.get(env.ROOM.idFromName(code)).fetch(req);
  },
};

// Answers are compared loosely: case, surrounding space and repeated spaces don't matter
const norm = (s) => String(s ?? "").trim().replace(/\s+/g, " ").toLowerCase();

export class Room extends DurableObject {
  constructor(ctx, env) {
    super(ctx, env);
    ctx.blockConcurrencyWhile(async () => {
      this.s = (await ctx.storage.get("s")) || {
        host: null, // the presenter's token
        players: {}, // id -> name
        questions: {}, // id -> {text, options, context, openedAt}
        votes: {}, // question id -> {player id -> {c, ms}}
        revealed: {}, // question id -> answer
        current: null, // the open question's id
      };
    });
  }

  async fetch(req) {
    const url = new URL(req.url);
    const token = url.searchParams.get("host");
    const pair = new WebSocketPair();
    const [client, server] = Object.values(pair);

    if (token) {
      if (this.s.host && this.s.host !== token) {
        // Someone else's room: the deck picks a new code
        this.ctx.acceptWebSocket(server, ["reject"]);
        server.send(JSON.stringify({ t: "taken" }));
        server.close(4001, "room taken");
        return new Response(null, { status: 101, webSocket: client });
      }
      this.s.host = token;
      this.ctx.acceptWebSocket(server, ["host"]);
      await this.save();
      server.send(JSON.stringify(this.hostView()));
    } else {
      this.ctx.acceptWebSocket(server, ["player"]);
      server.serializeAttachment({ id: null });
    }
    return new Response(null, { status: 101, webSocket: client });
  }

  async webSocketMessage(ws, raw) {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    const tags = this.ctx.getTags(ws);
    if (tags.includes("host")) return this.onHost(msg);
    if (tags.includes("player")) return this.onPlayer(ws, msg);
  }

  webSocketClose(ws, code) {
    try {
      ws.close(code, "bye");
    } catch {}
    if (this.ctx.getTags(ws).includes("player")) this.toHost();
  }

  webSocketError() {}

  async alarm() {
    await this.ctx.storage.deleteAll();
  }

  // ----------------------------------------------------------- the presenter

  async onHost(msg) {
    const s = this.s;
    if (msg.t === "open" && msg.q?.id) {
      const q = msg.q;
      const old = s.questions[q.id];
      s.questions[q.id] = {
        text: String(q.text || "").slice(0, 500),
        context: q.context ? String(q.context).slice(0, 500) : "",
        options: Array.isArray(q.options) ? q.options.slice(0, 12).map(String) : null,
        openedAt: old?.openedAt || Date.now(),
      };
      s.votes[q.id] ||= {};
      s.current = q.id;
    } else if (msg.t === "reveal" && s.questions[msg.id]) {
      s.revealed[msg.id] = String(msg.answer ?? "");
    } else if (msg.t === "unreveal") {
      delete s.revealed[msg.id];
    } else if (msg.t === "idle") {
      s.current = null;
    } else return;
    await this.save();
    this.broadcast();
  }

  // ------------------------------------------------------------- the phones

  async onPlayer(ws, msg) {
    const s = this.s;
    if (msg.t === "join") {
      const id = String(msg.id || "").slice(0, 40);
      if (!id) return;
      s.players[id] = String(msg.name || "Anonymous").trim().slice(0, 24) || "Anonymous";
      ws.serializeAttachment({ id });
      await this.save();
      ws.send(JSON.stringify(this.playerView(id)));
      this.toHost();
    } else if (msg.t === "vote") {
      const { id } = ws.deserializeAttachment() || {};
      const q = s.questions[msg.q];
      const choice = String(msg.choice ?? "").trim().slice(0, 80);
      if (!id || !q || s.current !== msg.q || msg.q in s.revealed || !choice) return;
      if (q.options && !q.options.includes(choice)) return;
      const votes = s.votes[msg.q];
      if (votes[id]) return; // one vote each, no changing it
      votes[id] = { c: choice, ms: Date.now() - q.openedAt };
      await this.save();
      ws.send(JSON.stringify(this.playerView(id)));
      this.toHost();
    }
  }

  // ------------------------------------------------------------------ views

  // Votes per choice: every option in order, or the most common free answers
  counts(qid) {
    const q = this.s.questions[qid];
    const tally = new Map();
    if (q.options) for (const o of q.options) tally.set(o, 0);
    for (const v of Object.values(this.s.votes[qid] || {})) {
      const key = q.options ? v.c : norm(v.c);
      tally.set(key, (tally.get(key) || 0) + 1);
    }
    let rows = [...tally.entries()].map(([label, n]) => ({ label, n }));
    if (!q.options) rows = rows.sort((a, b) => b.n - a.n).slice(0, 8);
    return rows;
  }

  // The fastest correct voter on a revealed question
  winner(qid) {
    if (!(qid in this.s.revealed)) return null;
    const ans = norm(this.s.revealed[qid]);
    let best = null;
    for (const [pid, v] of Object.entries(this.s.votes[qid] || {})) {
      if (norm(v.c) === ans && (!best || v.ms < best.ms)) best = { id: pid, ms: v.ms };
    }
    return best && { name: this.s.players[best.id] || "?", ms: best.ms, id: best.id };
  }

  // Everyone who answered something, ranked by correct answers, then total time on them
  leaderboard() {
    const s = this.s;
    const score = {};
    for (const [qid, answer] of Object.entries(s.revealed)) {
      for (const [pid, v] of Object.entries(s.votes[qid] || {})) {
        score[pid] ||= { id: pid, name: s.players[pid] || "?", right: 0, ms: 0 };
        if (norm(v.c) === norm(answer)) {
          score[pid].right++;
          score[pid].ms += v.ms;
        }
      }
    }
    return Object.values(score).sort((a, b) => b.right - a.right || a.ms - b.ms);
  }

  online() {
    return this.ctx.getWebSockets("player").filter((ws) => ws.deserializeAttachment()?.id).length;
  }

  hostView() {
    const s = this.s;
    const q = s.current;
    return {
      t: "host",
      online: this.online(),
      current: q,
      votes: q ? Object.keys(s.votes[q] || {}).length : 0,
      counts: q ? this.counts(q) : [],
      revealed: q && q in s.revealed ? s.revealed[q] : null,
      winner: q ? this.winner(q) : null,
      leaderboard: this.leaderboard().slice(0, 5),
    };
  }

  playerView(pid) {
    const s = this.s;
    const qid = s.current;
    const q = qid && s.questions[qid];
    const board = this.leaderboard();
    const rank = board.findIndex((r) => r.id === pid);
    const view = {
      t: "state",
      name: s.players[pid],
      q: q ? { id: qid, text: q.text, context: q.context, options: q.options } : null,
      mine: q ? s.votes[qid]?.[pid]?.c ?? null : null,
      score: rank >= 0 ? board[rank].right : 0,
      rank: rank >= 0 ? rank + 1 : null,
      of: board.length,
    };
    if (q && qid in s.revealed) {
      const w = this.winner(qid);
      view.result = {
        answer: s.revealed[qid],
        correct: view.mine != null && norm(view.mine) === norm(s.revealed[qid]),
        winner: w && { name: w.name, ms: w.ms, you: w.id === pid },
      };
    }
    return view;
  }

  toHost() {
    const msg = JSON.stringify(this.hostView());
    for (const ws of this.ctx.getWebSockets("host")) ws.send(msg);
  }

  broadcast() {
    this.toHost();
    for (const ws of this.ctx.getWebSockets("player")) {
      const { id } = ws.deserializeAttachment() || {};
      if (id) ws.send(JSON.stringify(this.playerView(id)));
    }
  }

  async save() {
    await this.ctx.storage.put("s", this.s);
    await this.ctx.storage.setAlarm(Date.now() + IDLE_MS);
  }
}
