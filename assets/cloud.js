// cloud.js — optional accounts + per-user cloud save for Nooki via Firebase
// (Google sign-in + Firestore). Privacy/security posture:
//   • Google handles the login; we never see a password. We keep only the uid
//     (to key the save) and, in memory, the display name/photo for the greeting.
//   • Each player's save lives at saves/{uid}. Firestore SECURITY RULES must
//     restrict read/write to request.auth.uid == uid so no account can ever read
//     another's data (see README). The client API key is a public project
//     identifier, not a secret — data safety is enforced by those rules.
//   • We store ONLY game progress (rooms, wins log, preferences). No emails,
//     no tracking, nothing sold or shared.
// If no Firebase config is present the whole module is inert and the game just
// saves locally in the browser.

export function makeCloud(opts) {
  const cfg = opts && opts.config;
  const onChange = (opts && opts.onChange) || function () {};
  let app = null, auth = null, db = null, user = null, mods = null, err = null, saveTimer = null, booting = false;

  function enabled() { return !!(cfg && cfg.apiKey && cfg.projectId && cfg.appId); }

  async function init() {
    if (!enabled() || app || booting) return;
    booting = true;
    try {
      const V = 'https://www.gstatic.com/firebasejs/10.12.2/';
      const appMod = await import(V + 'firebase-app.js');
      const authMod = await import(V + 'firebase-auth.js');
      const fsMod = await import(V + 'firebase-firestore.js');
      mods = { authMod, fsMod };
      app = appMod.initializeApp(cfg);
      auth = authMod.getAuth(app);
      db = fsMod.getFirestore(app);
      try { await authMod.setPersistence(auth, authMod.browserLocalPersistence); } catch (e) {}
      authMod.onAuthStateChanged(auth, (u) => { user = u; onChange(); });
    } catch (e) { err = 'load-failed'; onChange(); }
    booting = false;
  }

  async function signIn() {
    try {
      await init();
      if (!auth) { err = 'not-configured'; onChange(); return; }
      const p = new mods.authMod.GoogleAuthProvider();
      p.setCustomParameters({ prompt: 'select_account' });
      await mods.authMod.signInWithPopup(auth, p);
      err = null;
    } catch (e) {
      const c = (e && e.code) || '';
      if (/popup-closed|cancelled/.test(c)) return; // user backed out — not an error
      err = /unauthorized-domain/.test(c) ? 'unauthorized-domain' : (c || 'signin-failed');
      onChange();
    }
  }
  async function signOut() { try { if (auth) await mods.authMod.signOut(auth); } catch (e) {} }

  function currentUser() {
    return user ? { uid: user.uid, name: (user.displayName || '').split(' ')[0] || 'friend', photo: user.photoURL || '' } : null;
  }

  async function load() {
    if (!user || !db) return null;
    try {
      const ref = mods.fsMod.doc(db, 'saves', user.uid);
      const snap = await mods.fsMod.getDoc(ref);
      return snap.exists() ? (snap.data().state || null) : null;
    } catch (e) { return null; }
  }
  function save(state) {
    if (!user || !db) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(async () => {
      try {
        const ref = mods.fsMod.doc(db, 'saves', user.uid);
        await mods.fsMod.setDoc(ref, { state, updated: Date.now(), v: 1 });
      } catch (e) {}
    }, 700);
  }

  return { enabled, init, signIn, signOut, currentUser, load, save, error: () => err };
}
