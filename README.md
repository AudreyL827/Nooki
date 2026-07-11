# Nooki

A cozy, gamified focus timer. Every study session builds one piece of furniture in a tiny soft-clay room, and every finished piece is named with what you got done, turning your effort into a little journal of wins.

**Live app: [audreyl827.github.io/Nooki](https://audreyl827.github.io/Nooki/)**

Read the product doc: **[PRD.md](./PRD.md)**

## Features

- 25/5 (classic) and 50/10 (deep) Pomodoro modes with optional auto-continue
- Six themed rooms to build (Cottage, Kitchen, Bedroom, Cafe, Beach Studio, Forest Cabin), 16 pieces each
- A wins journal: name what you accomplished on every completed piece
- Three unlockable companion builders (bunny, cat, bear)
- Sign in with Google to save progress across devices (optional)
- Connect your own Spotify to play, skip, and pick playlists in-app (optional, needs Premium)
- Installable to your phone home screen (PWA), responsive on mobile and desktop
- First-run onboarding, dynamic tab icon, Privacy Policy and Terms

## For players

Nothing to install or configure. Open the link, press start, and focus. Accounts and Spotify are optional and already set up: just tap "sign in" or "connect spotify" and log into your own account.

> Note: Spotify's app is in Development mode, so in-app music is currently limited to the first 25 people I add in the Spotify dashboard. Everyone else can use the full app; music just stays off until I request extended access. Playback also requires Spotify Premium (Spotify's rule).

## Tech

A dependency-light single-page app: all room art is procedural DOM/CSS "clay" (no image files), rendered by a small React-based runtime (`support.js`). Art lives in `assets/` (`clay.js`, `sets.js`, `sets2.js`), sound in `assets/audio.js`, Spotify in `assets/spotify.js`, accounts in `assets/cloud.js`. Hosted free on GitHub Pages, auto-deployed on every push.

<details>
<summary><b>Developer setup</b> (already configured, kept here for reference)</summary>

The game runs out of the box with local save. Accounts (Firebase) and music (Spotify) are enabled by credentials hard-coded at the top of the script in `index.html` (`FIREBASE_CONFIG_DEFAULT`, `SPOTIFY_CLIENT_ID_DEFAULT`). These are public client identifiers, safe to commit; data safety comes from the Firestore rules below, not from hiding a key.

### Accounts + cloud save (Firebase)
1. Create a project at [console.firebase.google.com](https://console.firebase.google.com).
2. Add a Web app and copy its `firebaseConfig`.
3. Authentication, Sign-in method: enable Google.
4. Authentication, Settings, Authorized domains: add `audreyl827.github.io` (and `localhost` for testing).
5. Firestore Database: create it, then publish these Security Rules so each user can only ever read/write their own save (this is what prevents any cross-account data access):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /saves/{uid} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
6. Put the config in `FIREBASE_CONFIG_DEFAULT` (or paste it into the in-app account panel).

### Spotify (play your own music)
1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard).
2. Add the Redirect URI exactly: `https://audreyl827.github.io/Nooki/` (plus a `http://localhost:PORT/...` URL for local testing).
3. Put the Client ID in `SPOTIFY_CLIENT_ID_DEFAULT`.
4. To open music to more than 25 users, request extended quota in the Spotify dashboard.

</details>

<details>
<summary><b>Publishing and local dev</b></summary>

A workflow at `.github/workflows/deploy.yml` deploys to GitHub Pages on every push to `main`. If Pages is not on yet: Settings, Pages, Build and deployment, Source: GitHub Actions. To move to a custom domain later, Vercel or Netlify can import this repo unchanged; just update the Spotify redirect URI and Firebase authorized domain to the new URL.

Run locally (serve over HTTP so module imports work):
```
python3 -m http.server 8000    # then open http://localhost:8000
```

</details>

<details>
<summary><b>Security and privacy</b></summary>

- HTTPS everywhere; per-user data isolation enforced by the Firestore rules above.
- Data minimisation: only game progress is stored. No password is ever seen (Google handles it), no email is kept in the game database, no ads, nothing sold; only aggregate Google Analytics (visit counts).
- Spotify and Firebase tokens live only in the user's own browser.
- Before a wider launch, fill in the contact email in `privacy.html` and `terms.html`, and have a lawyer review them for your jurisdiction.

</details>
