// spotify.js — real Spotify playback for Nooki.
// Authorization Code + PKCE (no client secret), Web API for playlists/control,
// and the Web Playback SDK to stream inside the page. Needs Spotify Premium and
// a Spotify app Client ID whose redirect URI matches this page's URL.
//
//   const sp = makeSpotify({ clientId, redirectUri, onChange });
//   await sp.handleRedirect();          // finishes login if we came back with ?code
//   if (sp.isLinked()) await sp.start();// boot the player
//   sp.login();  sp.logout();
//   await sp.getPlaylists();  sp.playContext(uri);  sp.toggle();  sp.next();  sp.prev();

const AUTH = 'https://accounts.spotify.com/authorize';
const TOKEN = 'https://accounts.spotify.com/api/token';
const API = 'https://api.spotify.com/v1';
const SCOPES = [
  'streaming', 'user-read-email', 'user-read-private',
  'user-read-playback-state', 'user-modify-playback-state',
  'playlist-read-private', 'playlist-read-collaborative', 'user-library-read'
].join(' ');

export function makeSpotify(opts) {
  const clientId = opts.clientId;
  const redirectUri = opts.redirectUri;
  const onChange = opts.onChange || function () {};
  const LS = 'nooki.spotify.tok';
  const LSV = 'nooki.spotify.verifier';

  let tok = null, refreshTok = null, expiry = 0;
  let player = null, deviceId = null, playerState = null, me = null, lastError = null;

  // ---- persistence ----
  try {
    const raw = JSON.parse(localStorage.getItem(LS) || 'null');
    if (raw) { tok = raw.access_token; refreshTok = raw.refresh_token; expiry = raw.expiry || 0; }
  } catch (e) {}
  function persist() {
    try { localStorage.setItem(LS, JSON.stringify({ access_token: tok, refresh_token: refreshTok, expiry })); } catch (e) {}
  }

  // ---- PKCE helpers ----
  function randStr(n) {
    const a = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const arr = crypto.getRandomValues(new Uint8Array(n));
    return Array.from(arr, (x) => a[x % a.length]).join('');
  }
  function b64url(buf) {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buf)))
      .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  async function challenge(verifier) {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return b64url(digest);
  }

  async function login() {
    if (!clientId) { lastError = 'no-client-id'; onChange(); return; }
    const verifier = randStr(96);
    localStorage.setItem(LSV, verifier);
    const params = new URLSearchParams({
      client_id: clientId, response_type: 'code', redirect_uri: redirectUri,
      scope: SCOPES, code_challenge_method: 'S256', code_challenge: await challenge(verifier)
    });
    window.location.href = AUTH + '?' + params.toString();
  }

  // finish login if we returned with ?code=...; also clears it from the URL
  async function handleRedirect() {
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const err = url.searchParams.get('error');
    if (err) { url.searchParams.delete('error'); history.replaceState({}, '', url.pathname + url.search + url.hash); return; }
    if (!code) return;
    const verifier = localStorage.getItem(LSV) || '';
    url.searchParams.delete('code'); url.searchParams.delete('state');
    history.replaceState({}, '', url.pathname + url.search + url.hash);
    try {
      const body = new URLSearchParams({
        client_id: clientId, grant_type: 'authorization_code', code,
        redirect_uri: redirectUri, code_verifier: verifier
      });
      const r = await fetch(TOKEN, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      const j = await r.json();
      if (j.access_token) { tok = j.access_token; refreshTok = j.refresh_token || refreshTok; expiry = Date.now() + (j.expires_in - 60) * 1000; persist(); localStorage.removeItem(LSV); onChange(); }
      else { lastError = j.error_description || 'token-exchange-failed'; onChange(); }
    } catch (e) { lastError = 'token-exchange-failed'; onChange(); }
  }

  async function refresh() {
    if (!refreshTok) return false;
    try {
      const body = new URLSearchParams({ client_id: clientId, grant_type: 'refresh_token', refresh_token: refreshTok });
      const r = await fetch(TOKEN, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body });
      const j = await r.json();
      if (j.access_token) { tok = j.access_token; if (j.refresh_token) refreshTok = j.refresh_token; expiry = Date.now() + (j.expires_in - 60) * 1000; persist(); return true; }
    } catch (e) {}
    return false;
  }
  async function ensureToken() {
    if (tok && Date.now() < expiry) return tok;
    if (await refresh()) return tok;
    return tok; // may be stale; caller handles 401
  }

  function isLinked() { return !!refreshTok || (!!tok && Date.now() < expiry); }
  function logout() {
    tok = refreshTok = null; expiry = 0;
    try { localStorage.removeItem(LS); } catch (e) {}
    if (player) { try { player.disconnect(); } catch (e) {} player = null; deviceId = null; playerState = null; }
    onChange();
  }

  // ---- Web API ----
  async function api(path, method, body) {
    await ensureToken();
    const r = await fetch(API + path, {
      method: method || 'GET',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
    if (r.status === 401) { if (await refresh()) return api(path, method, body); }
    if (r.status === 204 || r.status === 202) return null;
    if (!r.ok) { throw new Error('spotify api ' + r.status); }
    const t = await r.text();
    return t ? JSON.parse(t) : null;
  }
  async function getMe() { try { me = await api('/me'); return me; } catch (e) { return null; } }
  async function getPlaylists() {
    try {
      const j = await api('/me/playlists?limit=50');
      return (j && j.items ? j.items : []).filter(Boolean).map((p) => ({
        id: p.id, uri: p.uri, name: p.name,
        img: (p.images && p.images[0] && p.images[0].url) || '',
        count: p.tracks ? p.tracks.total : 0
      }));
    } catch (e) { return []; }
  }
  async function playContext(uri) {
    if (!deviceId) return;
    try { await api('/me/player/play?device_id=' + deviceId, 'PUT', { context_uri: uri }); } catch (e) { lastError = 'play-failed'; onChange(); }
  }

  // ---- Web Playback SDK ----
  function loadSDK() {
    return new Promise((resolve, reject) => {
      if (window.Spotify) return resolve();
      window.onSpotifyWebPlaybackSDKReady = () => resolve();
      const s = document.createElement('script');
      s.src = 'https://sdk.scdn.co/spotify-player.js';
      s.onerror = () => reject(new Error('sdk-load-failed'));
      document.head.appendChild(s);
    });
  }
  async function start() {
    if (!isLinked() || player) return;
    await ensureToken();
    await getMe();
    try { await loadSDK(); } catch (e) { lastError = 'sdk-load-failed'; onChange(); return; }
    player = new window.Spotify.Player({
      name: 'Nooki ✦',
      getOAuthToken: (cb) => { ensureToken().then(() => cb(tok)); },
      volume: 0.55
    });
    player.addListener('ready', ({ device_id }) => { deviceId = device_id; lastError = null; onChange(); });
    player.addListener('not_ready', () => { deviceId = null; onChange(); });
    player.addListener('player_state_changed', (st) => { playerState = st; onChange(); });
    player.addListener('initialization_error', ({ message }) => { lastError = 'init: ' + message; onChange(); });
    player.addListener('authentication_error', ({ message }) => { lastError = 'auth: ' + message; onChange(); });
    player.addListener('account_error', () => { lastError = 'premium-required'; onChange(); });
    try { await player.connect(); } catch (e) { lastError = 'connect-failed'; onChange(); }
  }

  function toggle() { if (player) player.togglePlay(); }
  function next() { if (player) player.nextTrack(); }
  function prev() { if (player) player.previousTrack(); }

  function currentTrack() {
    const t = playerState && playerState.track_window && playerState.track_window.current_track;
    if (!t) return null;
    return {
      name: t.name,
      artist: (t.artists || []).map((a) => a.name).join(', '),
      img: (t.album && t.album.images && t.album.images[0] && t.album.images[0].url) || '',
      paused: playerState.paused
    };
  }

  return {
    login, logout, handleRedirect, start,
    isLinked, hasClientId: () => !!clientId, ready: () => !!deviceId,
    getPlaylists, playContext, toggle, next, prev,
    currentTrack, error: () => lastError, name: () => (me && me.display_name) || ''
  };
}
