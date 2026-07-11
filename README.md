# ✦ Nooki ✦

A cozy pomodoro study game. Each completed focus session builds one piece of
furniture in a tiny soft-clay room — a chibi companion (Mochi the bunny, Suki
the cat, or **Maple the bear**) hops over and hammers while you study. Finished
pieces get "named" with what you got done, becoming a little journal of wins.
Six houses, six room types, one hue family each.

**Live app:** https://audreyl827.github.io/Nooki/

## Features
- 25·5 classic / 50·10 deep pomodoro modes with auto-continue
- Six rooms to build; three unlockable companion builders
- **Spotify** — connect your own account and play/skip/pick playlists in-app (Premium)
- **Accounts** — optional Google sign-in; your rooms & wins sync privately per account
- Soft UI sound effects (Web Audio)
- Installable to your phone home screen (PWA); responsive on mobile & desktop
- Privacy Policy + Terms included

## What's in here
- `index.html` — the game (art + logic)
- `support.js` — small React-based design-component runtime
- `assets/` — art (`clay.js`, `sets.js`, `sets2.js`), sound (`audio.js`),
  `spotify.js`, `cloud.js` (accounts), `doc-page.js`
- `Animation Assets.dc.html`, `PRD.dc.html` — the design/asset sheet and PRD
- `privacy.html`, `terms.html` — legal pages (edit the contact email!)

---

## Setup (one-time, to enable the optional integrations)

The game works out of the box with **local** save. Accounts and Spotify each
need a free developer app that **you** own — paste the credentials into the app
(saved in your browser) or hard-code them at the top of the `data-dc-script` in
`index.html` (`SPOTIFY_CLIENT_ID_DEFAULT`, `FIREBASE_CONFIG_DEFAULT`).

### A. Accounts + cloud save (Firebase)
1. Create a project at <https://console.firebase.google.com>.
2. Add a **Web app**; copy its `firebaseConfig` (apiKey, authDomain, projectId, appId…).
3. **Authentication → Sign-in method →** enable **Google**.
4. **Authentication → Settings → Authorized domains →** add `audreyl827.github.io`
   (and `localhost` for testing).
5. **Firestore Database →** create it, then set these **Security Rules** so each
   user can only ever touch their own save (this is what prevents any data leak
   or cross-over between accounts):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /saves/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
6. In Nooki, click **sign in → spotify setup**-style panel, paste the config JSON, save.

> The Firebase web API key is a **public identifier**, not a secret — safe to ship
> in client code. Data safety comes from the rules above, not from hiding the key.

### B. Spotify (play your own music)
1. Create an app at <https://developer.spotify.com/dashboard>.
2. Add this **Redirect URI** exactly: `https://audreyl827.github.io/Nooki/`
   (and your `http://localhost:PORT/...` URL for local testing).
3. Copy the **Client ID**; in Nooki click **connect spotify → spotify setup**, paste it.
4. Playback in the browser requires **Spotify Premium** (Spotify's rule, not ours).

---

## Publishing (GitHub Pages)
This repo ships a workflow at `.github/workflows/deploy.yml`. On every push to
`main` it builds and deploys to GitHub Pages automatically. If Pages isn't on yet:
**Settings → Pages → Build and deployment → Source: GitHub Actions**. Done — the
site publishes at the URL above. (Prefer a custom domain later? Vercel or Netlify
can import this repo unchanged; just update the Spotify redirect URI + Firebase
authorized domain to the new URL.)

## Security & privacy posture
- HTTPS everywhere (GitHub Pages).
- Per-user data isolation enforced by Firestore rules (see above).
- Data minimisation: we store only game progress; **no password is ever seen**
  (Google handles it), no email stored in the game DB, no ads, no trackers, nothing sold.
- Spotify/Firebase tokens live in the user's own browser.
- Before a serious launch: fill in the contact email in `privacy.html` / `terms.html`
  and have a lawyer review them for your jurisdiction.

## Running locally
Static site — serve over HTTP so module imports work:
```
python3 -m http.server 8000   # then open http://localhost:8000
```
