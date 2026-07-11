# Nooki — Product Requirements Document

**One-liner:** A cozy, gamified focus timer that turns study sessions into a tiny room you build, one win at a time.

| | |
|---|---|
| **Author** | Audrey Li |
| **Status** | v1.0 — Live ([audreyl827.github.io/Nooki](https://audreyl827.github.io/Nooki/)) |
| **Last updated** | July 2026 |
| **Type** | Consumer web app (PWA), self-serve |

---

## 1. TL;DR

Students and knowledge workers know they *should* use focus techniques like Pomodoro, but plain timers are joyless and easy to abandon. **Nooki** wraps a real Pomodoro timer in a warm, collectible reward loop: every completed focus session builds one piece of furniture in a soft-clay room, and every finished piece is "named" with what you accomplished — quietly turning your effort into a visible journal of wins. Six rooms, unlockable companions, and optional Spotify make the habit sticky without becoming a distraction. Nooki is live, installable to a phone home screen, and supports optional accounts so progress follows the user across devices.

## 2. Problem & context

Focus tools are a crowded space, yet retention is the universal weak point: most timer apps are used a handful of times and dropped. Two gaps drive this:

1. **No emotional payoff.** A ticking clock rewards you with… silence. There is no sense of progress accumulating, so motivation leaks out after the novelty fades.
2. **Effort is invisible.** People finish a hard week of studying with nothing to show for the *process* — only grades, weeks later. There's no lightweight record of "I did the work."

**Why now:** Post-2020, self-directed and remote study is the norm, "study-with-me" and lo-fi focus content is a massive attention category, and cozy games (Animal Crossing, Unpacking, Spiritfarer) have proven that gentle, low-stakes progression retains people. Nooki sits deliberately at that intersection: the discipline of Pomodoro, the reward psychology of a collection game, and the calm of a lo-fi study space.

## 3. Target users

| Segment | Job to be done | Why Nooki |
|---|---|---|
| **Primary — students (HS/university)** | "Help me actually start and sustain focused study, and feel like it added up to something." | Turns each 25-min block into visible progress + a win log they can revisit before exams. |
| **Secondary — remote knowledge workers** | "Give me a low-friction focus ritual that isn't another productivity chore." | Ambient, guilt-free, one-tap; music + cozy scene double as a work-mode cue. |
| **Tertiary — cozy-game / study-aesthetic fans** | "I want a calm, collectible thing to tend." | Six themed rooms, unlockable builders, and a hand-crafted clay art style. |

**Primary persona — "Mia, 20, pre-med."** Studies in 2–4 hour stretches, motivated by streaks and cute aesthetics, easily derailed by her phone. Wants to *start* studying and to feel her effort accumulating. Success for Mia = she reaches for Nooki instead of doom-scrolling when it's time to focus.

## 4. Goals & non-goals

**Goals**
- G1 — Make starting a focus session effortless and *finishing* it rewarding.
- G2 — Give users a durable, revisitable record of what their effort produced (the wins journal).
- G3 — Retain users past the novelty window via a paced, collectible progression.
- G4 — Ship a fast, calm, mobile-friendly experience that never becomes a distraction.

**Non-goals (v1)**
- Not a full study suite (no flashcards, notes, or task management).
- Not a social network — no feeds, no comparison, no public leaderboards (deliberate, to protect the "calm" promise).
- Not a monetized product yet — v1 optimizes for delight and retention, not revenue.

## 5. Success metrics

**North Star:** *Focus sessions completed per weekly active user.* It captures the core value exchange (real focused work done) rather than vanity engagement.

| Layer | Metric | v1 target |
|---|---|---|
| Acquisition | Landing → first "start" | ≥ 55% |
| Activation | New users completing ≥1 session day 1 | ≥ 40% |
| Core value | Sessions / WAU | ≥ 6 |
| Retention | D7 / D30 retention | ≥ 25% / ≥ 12% |
| Depth | Users completing ≥1 full room | ≥ 20% |
| **Guardrail** | Median session *completed* (not abandoned) | ≥ 70% |
| **Guardrail** | Reported "felt like a distraction" | < 5% |

Guardrails protect the product's soul: growth that comes from turning Nooki into a noisy game would violate the "calm by design" promise and is treated as a regression.

## 6. Solution overview & principles

Nooki is a single-screen web app: a timer + music card on the left, the live isometric room in the center, and a build "blueprint" checklist on the right.

**Design principles**
1. **Calm over loud.** Soft palette, gentle motion, no punitive streaks, no red badges. Pausing is always free and penalty-free.
2. **The reward is the record.** The furniture *is* the progress bar; the named wins *are* the achievement — one system, no meta-currency.
3. **One-tap to focus.** The primary action is always the biggest, closest button.
4. **Respect attention.** Music and effects are ambient and optional; nothing competes with the user's actual task.
5. **Yours, privately.** Accounts and music are opt-in; data is minimal and isolated per user.

## 7. Requirements

**P0 — core loop (must ship)**
- Pomodoro timer: 25/5 (classic) and 50/10 (deep), long break cadence, computed from wall-clock deltas (never trusts interval drift). Pause/resume free; "give up" forfeits the in-progress piece.
- Build loop: each completed focus session builds the next furniture piece; companion animates to the work spot and hammers; completion celebration.
- **Win journal:** on completion the user names what they accomplished; saved to that piece forever, browsable per room.
- Six rooms (Cottage, Kitchen, Bedroom, Café, Beach Studio, Forest Cabin), 16 unique pieces each; parallel progress, switch any time.
- Local persistence; new users start with all rooms empty.

**P1 — stickiness & continuity**
- Companion unlocks (bunny → cat → bear) gated on completed rooms.
- Optional **Google accounts** with per-user cloud save (cross-device continuity).
- Optional **Spotify** connect: play/pause/skip and choose from the user's own playlists in-app.
- First-run onboarding walkthrough; auto-continue mode for flow-state sessions.
- Installable PWA + dynamic tab favicon (reflects current room + builder).

**P2 — later**
- Notebook/collection view of completed rooms; room "rebuild" with archived history.
- `prefers-reduced-motion` support, additional rooms/companions, streak-free weekly recap.

## 8. Key user flows

1. **First run:** land → 4-step guide → pick mode → *start the first session* → focus → build piece → name win → break → repeat.
2. **Returning:** open → resume current room → sessions chain (optionally auto-continue) → complete room → unlock builder.
3. **Cross-device:** sign in with Google → progress syncs → continue on phone/laptop interchangeably.
4. **Music:** connect Spotify once → pick a playlist → controls live in the timer card.

## 9. Technical overview

- **Client:** static, dependency-light single-page app rendered with a small React-based runtime; all room art is procedural DOM/CSS "clay" (no bitmap assets), which keeps the bundle tiny and the aesthetic consistent.
- **Hosting:** GitHub Pages via a CI workflow (push-to-deploy); zero server to run.
- **Auth & data:** Firebase Authentication (Google) + Firestore. Save model: one document per user at `saves/{uid}` holding rooms, wins, and preferences.
- **Music:** Spotify Authorization Code + PKCE (no client secret) with the Web Playback SDK.
- **Timer integrity:** elapsed time derived from `Date.now()` deltas so backgrounded tabs and throttling don't corrupt sessions.

## 10. Privacy, security & trust

- **Data minimization:** only game progress is stored; no email is persisted in the game database, no ads, no third-party trackers, nothing sold.
- **Per-user isolation:** Firestore security rules restrict every document to its owner (`request.auth.uid == uid`) — the guarantee that no account can read another's data. (Firebase web keys are public identifiers by design; safety is enforced by rules, not secrecy.)
- **No password handling:** authentication is delegated to Google; Nooki never sees credentials. Spotify tokens live only in the user's browser.
- **Transport:** HTTPS everywhere. Published Privacy Policy and Terms (no-warranty + liability limitation).

## 11. Risks & mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Novelty churn after first rooms | High | Paced unlocks, parallel rooms, low per-session cost; roadmap: weekly recap + new content. |
| Gamification undermines real focus | High | Ambient-only feedback, guardrail metric on "felt like a distraction," no punitive mechanics. |
| Spotify Dev-mode 25-user cap | Med | Music is optional and additive; request extended quota before any growth push. |
| Free-tier backend limits at scale | Med | Local-first design; usage well within Firebase Spark quotas; clear upgrade path. |
| Data-loss anxiety | Med | Local + cloud save; transparent privacy page; export on roadmap. |

## 12. Go-to-market

Distribution fit is organic and visual: study-aesthetic communities (TikTok/Instagram "studygram," Reddit r/GetStudying, Discord study servers) and "study with me" audiences. The shareable moment is a *completed room* — a screenshot-worthy artifact. Zero install friction (web + add-to-home-screen) lowers the cost of a viral click to near zero.

## 13. Milestones

- **M0 (done):** Core loop + all six rooms + win journal, local save — *live.*
- **M1 (done):** Companions, Google accounts + cloud save, Spotify, onboarding, PWA.
- **M2:** Notebook/collection polish, reduced-motion, analytics instrumentation, Spotify quota extension.
- **M3:** New rooms/companions, weekly recap, shareable room cards, optional gentle monetization (cosmetic themes).

## 14. Open questions

- Does auto-continue increase completed sessions, or reduce the satisfying "name your win" beat? (A/B post-instrumentation.)
- Is Spotify worth the setup cost for the median user, or should built-in ambient audio return as the default?
- What's the right first-week content pace to maximize D7 without cheapening the reward?

---

*Appendix — glossary: **piece** = one furniture item; **room/house** = a themed 16-piece set; **win** = the user-written note attached to a completed piece; **builder/companion** = the character that constructs pieces.*
