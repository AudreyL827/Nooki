// audio.js — Nooki's built-in sound: a gentle procedural lofi loop per room
// plus soft UI stingers. No audio files — everything is synthesised with the
// Web Audio API so it ships self-contained. Usage:
//   const audio = makeAudio(); audio.resume();           // on a user gesture
//   audio.setTheme('honey'); audio.playMusic();
//   audio.sfx('start' | 'tap' | 'complete' | 'break' | 'wake' | 'name');

export function makeAudio() {
  let ctx = null, master = null, musicBus = null, musicGain = null, lp = null, noiseBuf = null;
  let playing = false, timer = null, theme = 'matcha';
  let step = 0, nextTime = 0;

  // per-room mood: key root (Hz), pad timbre, beat length (s), filter cutoff, 4-chord loop (semitones from root)
  const CFG = {
    matcha:     { root: 174.61, wave: 'sine',     beat: 0.78, cut: 1500, prog: [[0, 4, 7, 11], [-3, 0, 4, 9], [-5, -1, 2, 7], [2, 5, 9, 12]] },
    strawberry: { root: 196.00, wave: 'triangle', beat: 0.66, cut: 1950, prog: [[0, 4, 7], [5, 9, 12], [-3, 0, 4], [2, 7, 11]] },
    lavender:   { root: 146.83, wave: 'sine',     beat: 0.86, cut: 1250, prog: [[0, 3, 7, 10], [-2, 3, 5, 10], [-4, 0, 3, 7], [3, 7, 10, 14]] },
    honey:      { root: 220.00, wave: 'triangle', beat: 0.70, cut: 1800, prog: [[0, 4, 7, 11], [2, 5, 9], [-3, 0, 4, 7], [5, 9, 12]] },
    seaside:    { root: 164.81, wave: 'sine',     beat: 0.80, cut: 1650, prog: [[0, 4, 7], [4, 7, 11], [-5, -1, 2], [2, 5, 9]] },
    cocoa:      { root: 130.81, wave: 'triangle', beat: 0.88, cut: 1150, prog: [[0, 3, 7], [-2, 3, 7], [-4, 0, 3], [3, 7, 10]] }
  };
  // a soft melodic figure over each bar (beat index → play?), gives a lazy lofi feel
  const MELODY = [1, 0, 1, 1, 0, 1, 0, 1];

  const hz = (root, semi) => root * Math.pow(2, semi / 12);

  function init() {
    if (ctx) return true;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = 0.9;
    master.connect(ctx.destination);
    // music runs through a warm low-pass for the lofi haze
    lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = CFG[theme].cut; lp.Q.value = 0.4;
    musicGain = ctx.createGain(); musicGain.gain.value = 0.0;
    musicBus = ctx.createGain(); musicBus.gain.value = 1;
    musicBus.connect(lp); lp.connect(musicGain); musicGain.connect(master);
    // one reusable noise buffer for hats/vinyl
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 1.2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return true;
  }

  // a single soft synth note with an ADSR-ish envelope
  function tone(freq, t, dur, wave, peak, dest) {
    const o = ctx.createOscillator(); o.type = wave || 'sine'; o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(dest || master);
    o.start(t); o.stop(t + dur + 0.05);
  }

  function hat(t, peak) {
    const s = ctx.createBufferSource(); s.buffer = noiseBuf;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 7000;
    const g = ctx.createGain();
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    s.connect(hp); hp.connect(g); g.connect(musicBus);
    s.start(t); s.stop(t + 0.06);
  }

  function kick(t) {
    const o = ctx.createOscillator(); o.type = 'sine';
    const g = ctx.createGain();
    o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.14);
    g.gain.setValueAtTime(0.22, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    o.connect(g); g.connect(musicBus);
    o.start(t); o.stop(t + 0.24);
  }

  function playStep(i, t) {
    const C = CFG[theme];
    const bar = Math.floor(i / MELODY.length) % C.prog.length;
    const beatInBar = i % MELODY.length;
    const chord = C.prog[bar];
    // pad: sustain the chord once at the top of each bar
    if (beatInBar === 0) {
      chord.forEach((s, k) => tone(hz(C.root, s - 12), t, C.beat * MELODY.length * 0.98, C.wave, 0.05 - k * 0.006, musicBus));
      kick(t);
    }
    if (beatInBar === 4) kick(t);
    // lazy melody note from the chord, an octave up
    if (MELODY[beatInBar]) {
      const s = chord[(i * 3 + beatInBar) % chord.length] + 12;
      tone(hz(C.root, s), t + 0.01, C.beat * 0.9, 'sine', 0.06, musicBus);
    }
    // soft off-beat hat
    if (beatInBar % 2 === 1) hat(t, 0.02);
  }

  function loop() {
    if (!playing) return;
    const beat = CFG[theme].beat;
    while (nextTime < ctx.currentTime + 0.25) { playStep(step, nextTime); nextTime += beat; step++; }
  }

  function resume() { if (!init()) return; if (ctx.state === 'suspended') ctx.resume(); }

  function playMusic() {
    if (!init()) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (playing) return;
    playing = true;
    step = 0; nextTime = ctx.currentTime + 0.08;
    musicGain.gain.cancelScheduledValues(ctx.currentTime);
    musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
    musicGain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
    timer = setInterval(loop, 60);
  }

  function pauseMusic() {
    if (!ctx || !playing) return;
    musicGain.gain.cancelScheduledValues(ctx.currentTime);
    musicGain.gain.setValueAtTime(musicGain.gain.value, ctx.currentTime);
    musicGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
    playing = false;
    if (timer) { clearInterval(timer); timer = null; }
  }

  function setTheme(t) {
    if (!CFG[t]) return; theme = t;
    if (lp) lp.frequency.linearRampToValueAtTime(CFG[t].cut, (ctx ? ctx.currentTime : 0) + 0.6);
  }

  function sfx(name) {
    if (!init()) return;
    if (ctx.state === 'suspended') ctx.resume();
    const t = ctx.currentTime + 0.01;
    const bus = master;
    if (name === 'tap') {
      tone(660, t, 0.12, 'sine', 0.08, bus);
    } else if (name === 'start') {
      [523.25, 659.25, 783.99].forEach((f, i) => tone(f, t + i * 0.08, 0.24, 'triangle', 0.09, bus));
    } else if (name === 'complete') {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.1, 0.5, 'triangle', 0.1, bus));
      tone(1567.98, t + 0.42, 0.5, 'sine', 0.05, bus);
    } else if (name === 'break') {
      [587.33, 440].forEach((f, i) => tone(f, t + i * 0.14, 0.4, 'sine', 0.08, bus));
    } else if (name === 'wake') {
      // break's over — a gentle rising two-note chime to nudge back to work
      [440, 587.33, 783.99].forEach((f, i) => tone(f, t + i * 0.13, 0.42, 'triangle', 0.09, bus));
      tone(1174.66, t + 0.28, 0.4, 'sine', 0.05, bus);
    } else if (name === 'name') {
      [784, 1046.5].forEach((f, i) => tone(f, t + i * 0.09, 0.5, 'sine', 0.08, bus));
    }
  }

  return { resume, playMusic, pauseMusic, setTheme, sfx, isPlaying: () => playing };
}
