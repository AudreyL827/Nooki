// clay.js — shared soft-clay art library for the Cozy Pomodoro study game.
// Everything is drawn with DOM elements (no images): CSS-3D isometric room,
// squishy bunny sprite, 16-piece furniture set, 6 palette themes, celebration FX.
// Usage: const clay = makeClay(React);  (pass the page's React in)
// NOTE: page must define the keyframes: floaty, bunbob, bunhop, bunlean, swing,
// puff, zfloat, steam, twinkle, cfburst, dropin, ghostpulse, glowpulse, sway,
// blink, breathe, sip, cheerjump, popin.

export const ROT = { x: 58, z: 45 }; // scene angles (corner at top, interior open toward viewer)

// ---------------------------------------------------------------- themes ----
// Each theme is a DIFFERENT ROOM TYPE with its own unique furniture set — never a recolor.
export const THEMES = [
  {
    id: 'matcha', name: 'Matcha Cottage', room: 'Living Room', set: 'living', flavor: 'a quiet green cottage that smells like warm tea',
    playlist: 'warm tea lofi', bg: '#c3c89d', deskBg: '#b9bf90', panel: '#f7efdb', panelEdge: '#e7dbbd',
    wallIn: '#f7e8ca', wallTop: '#f1dfb9', wallCap: '#e7d1a6', floor: '#f6efdc', floorSide: '#e2d5b4',
    rug: '#c7caa9', clay: '#a9ae8c', clayL: '#c3c6a6', wood: '#e5cfa3', woodD: '#c8ad7c', woodL: '#f3e5c4',
    accent: '#dde7c4', accent2: '#e8b7ad', gold: '#d9b268', ink: '#6c7150', inkSoft: '#8d9070',
    books: ['#cba3a3', '#a9ae8c', '#d9b268', '#b5c4cf', '#e8b7ad', '#8f9377']
  },
  {
    id: 'strawberry', name: 'Strawberry Loft', room: 'Kitchen', set: 'kitchen', flavor: 'a blushing bakery kitchen dusted in sugar',
    playlist: 'sugar rush beats', bg: '#f1cbd4', deskBg: '#eabfc9', panel: '#fdf2ee', panelEdge: '#eed7d4',
    wallIn: '#fdeef0', wallTop: '#f9e2e5', wallCap: '#efcdd2', floor: '#fdf6ee', floorSide: '#ecd9c9',
    rug: '#f0d3d8', clay: '#e8a1b0', clayL: '#f3bfca', wood: '#ecccaa', woodD: '#d3ab82', woodL: '#f7e6cd',
    accent: '#fadade', accent2: '#b7d3c6', gold: '#e5b471', ink: '#a25c6d', inkSoft: '#c08b97',
    books: ['#e8a1b0', '#b7d3c6', '#e5b471', '#c3b3dd', '#f3bfca', '#d98f9f']
  },
  {
    id: 'lavender', name: 'Lavender Nook', room: 'Bedroom', set: 'bedroom', flavor: 'a dusky bedroom tucked under a periwinkle sky',
    playlist: 'moonlight lullaby lofi', bg: '#c6c1e4', deskBg: '#bab4da', panel: '#f4f1fb', panelEdge: '#ded8ef',
    wallIn: '#f1edfb', wallTop: '#e7e1f6', wallCap: '#d4cceb', floor: '#f8f5fc', floorSide: '#dfd7ee',
    rug: '#d8d2ec', clay: '#a79ed6', clayL: '#c1baE5', wood: '#e2d2b8', woodD: '#c6b190', woodL: '#f0e5d1',
    accent: '#e4def5', accent2: '#efc3cf', gold: '#d9b268', ink: '#6b64a3', inkSoft: '#928cc0',
    books: ['#a79ed6', '#efc3cf', '#d9b268', '#9db9d6', '#c1bae5', '#8d84c4']
  },
  {
    id: 'honey', name: 'Honey Café', room: 'Café', set: 'cafe', flavor: 'a golden café corner, all butter and morning light',
    playlist: 'morning café jazzhop', bg: '#eed6a4', deskBg: '#e7cb92', panel: '#fdf6e2', panelEdge: '#efe0bc',
    wallIn: '#fdf2d7', wallTop: '#f8e9c2', wallCap: '#eed7a2', floor: '#fbf3e0', floorSide: '#e9d8b4',
    rug: '#efdcae', clay: '#e0b05c', clayL: '#edc684', wood: '#d9a967', woodD: '#bc8c4e', woodL: '#ecc98f',
    accent: '#f6e3b0', accent2: '#d8907a', gold: '#c98f3f', ink: '#93702f', inkSoft: '#b3924f',
    books: ['#e0b05c', '#d8907a', '#a9ae8c', '#c9a2a2', '#edc684', '#c98f3f']
  },
  {
    id: 'seaside', name: 'Seaside Study', room: 'Beach Studio', set: 'beach', flavor: 'a breezy blue studio with the window cracked to the tide',
    playlist: 'tidal chill', bg: '#b6d3dc', deskBg: '#aac9d3', panel: '#eff7f8', panelEdge: '#d5e6e9',
    wallIn: '#eef7f8', wallTop: '#e0eff1', wallCap: '#c8dee2', floor: '#f4fafa', floorSide: '#d9e8e9',
    rug: '#cfe2e6', clay: '#85b4c2', clayL: '#a8ccd7', wood: '#e0caa9', woodD: '#c3ab86', woodL: '#efe0c6',
    accent: '#d4e9ec', accent2: '#e8b7ad', gold: '#d9b268', ink: '#4f7987', inkSoft: '#7ba0ac',
    books: ['#85b4c2', '#e8b7ad', '#d9b268', '#a9ae8c', '#a8ccd7', '#5f8fa0']
  },
  {
    id: 'cocoa', name: 'Cocoa Cabin', room: 'Forest Cabin', set: 'forest', flavor: 'a toasty log cabin deep in the pines',
    playlist: 'fireside crackle lofi', bg: '#d5b295', deskBg: '#cba589', panel: '#f8ece0', panelEdge: '#e8d2bd',
    wallIn: '#f3e3d2', wallTop: '#ecd8c2', wallCap: '#dfc3a4', floor: '#f7ece0', floorSide: '#e3cdb4',
    rug: '#e0c5a9', clay: '#9a6b4c', clayL: '#b78a68', wood: '#b98a63', woodD: '#9c6f4a', woodL: '#d3a97e',
    accent: '#e6c8a4', accent2: '#c96f5e', gold: '#d9a04f', ink: '#6e4b33', inkSoft: '#93705a',
    books: ['#c96f5e', '#a9ae8c', '#d9a04f', '#9a6b4c', '#e6c8a4', '#8a5c3e']
  }
];

// Companions: blob-chibi builders, unlocked by completing houses.
export const COMPANIONS = [
  { id: 'bunny', name: 'Mochi', species: 'bunny', unlock: 0 },
  { id: 'cat', name: 'Suki', species: 'cat', unlock: 1 },
  { id: 'bear', name: 'Maple', species: 'bear', unlock: 3 }
];

// ---------------------------------------------------------------- factory ---
export function makeClay(React) {
  const h = React.createElement;

  // ---- color utils ----
  const hx = (c) => {
    const s = c.replace('#', '');
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  };
  const mix = (a, b, t) => {
    const A = hx(a), B = hx(b);
    const v = A.map((x, i) => Math.round(x + (B[i] - x) * t));
    return `rgb(${v[0]},${v[1]},${v[2]})`;
  };
  const sh = (c, amt) => (amt >= 0 ? mix(c, '#ffffff', amt) : mix(c, '#241f12', -amt));
  const rnd = (i) => { const x = Math.sin(i * 127.13 + 1.7) * 43758.5453; return x - Math.floor(x); };

  const GHOST = ['rgba(82,79,56,.13)', 'rgba(82,79,56,.20)', 'rgba(82,79,56,.27)'];

  // ---- geometry: faces & boxes (floor coords: x → lower-right, y → lower-left, z up)
  const face = (key, { x, y, w, hh, tf, bg, r, soft, extra }) =>
    h('div', {
      key,
      style: Object.assign({
        position: 'absolute', left: x + 'px', top: y + 'px', width: w + 'px', height: hh + 'px',
        transformOrigin: '0 0', transform: tf, background: bg,
        borderRadius: typeof r === 'number' ? r + 'px' : (r || 0),
        boxShadow: soft || 'none'
      }, extra || {})
    });

  // box: cuboid from z0..z0+ht at (x,y) size w×d. c = base color OR cols=[top,front,right].
  function box(key, o) {
    const { x, y, w, d, ht } = o; const z0 = o.z0 || 0;
    const cols = o.ghost ? GHOST : (o.cols || [sh(o.c, .16), sh(o.c, -.04), sh(o.c, -.18)]);
    const r = o.r != null ? o.r : 6; const rs = o.rs != null ? o.rs : 3;
    const softT = o.ghost ? null : 'inset 2px 2px 7px rgba(255,255,255,.38), inset -3px -3px 9px rgba(0,0,0,.05)';
    const softS = o.ghost ? null : 'inset 0 -5px 9px rgba(0,0,0,.07), inset 0 2px 4px rgba(255,255,255,.16)';
    return [
      face(key + 't', { x, y, w, hh: d, tf: `translateZ(${z0 + ht}px)`, bg: cols[0], r, soft: softT, extra: o.topExtra }),
      face(key + 'f', { x, y: y + d, w, hh: ht, tf: `translateZ(${z0 + ht}px) rotateX(-90deg)`, bg: cols[1], r: `0 0 ${rs}px ${rs}px`, soft: softS }),
      face(key + 'r', { x: x + w, y: y + d, w: d, hh: ht, tf: `translateZ(${z0 + ht}px) rotateX(-90deg) rotateY(90deg)`, bg: cols[2], r: `0 0 ${rs}px ${rs}px`, soft: softS })
    ];
  }

  // puck: soft extruded ellipse (round tables, stools)
  function puck(key, o) {
    const { x, y, w, d, ht } = o; const z0 = o.z0 || 0; const out = [];
    const n = 4;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const col = o.ghost ? GHOST[Math.min(2, i)] : sh(o.c, .16 - t * .3);
      out.push(face(key + i, {
        x, y, w, hh: d, tf: `translateZ(${z0 + ht - t * ht}px)`, bg: col, r: '50%',
        soft: (!o.ghost && i === 0) ? 'inset 2px 3px 8px rgba(255,255,255,.45), inset -3px -4px 9px rgba(0,0,0,.06)' : 'none'
      }));
    }
    return out.reverse();
  }

  // flat node standing on the LEFT wall (plane x = 1.5), spans y0..y0+w, z0..z0+hh
  // (when api._flat is set, renders as a plain 2D node for card previews: x = y0, y = -(z0+hh))
  const onWallL = (key, y0, z0, w, hh, node) =>
    api._flat
      ? h('div', { key, style: { position: 'absolute', left: y0 + 'px', top: (-(z0 + hh)) + 'px', width: w + 'px', height: hh + 'px' } }, node)
      : h('div', { key, style: { position: 'absolute', left: '1.5px', top: (y0 + w) + 'px', width: w + 'px', height: hh + 'px', transformOrigin: '0 0', transform: `translateZ(${z0 + hh}px) rotateX(-90deg) rotateY(90deg)` } }, node);
  // flat node standing on the RIGHT wall (plane y = 1.5), spans x0..x0+w, z0..z0+hh
  const onWallR = (key, x0, z0, w, hh, node) =>
    api._flat
      ? h('div', { key, style: { position: 'absolute', left: x0 + 'px', top: (-(z0 + hh)) + 'px', width: w + 'px', height: hh + 'px' } }, node)
      : h('div', { key, style: { position: 'absolute', left: x0 + 'px', top: '1.5px', width: w + 'px', height: hh + 'px', transformOrigin: '0 0', transform: `translateZ(${z0 + hh}px) rotateX(-90deg)` } }, node);

  // billboard sprite anchored bottom-center at floor point (x,y,z)
  function sprite(key, x, y, z, node, opts) {
    const o = opts || {};
    return h('div', {
      key,
      style: Object.assign({
        position: 'absolute', left: x + 'px', top: y + 'px', width: '0', height: '0',
        transformOrigin: '0 0', transform: `translateZ(${z || 0}px) rotateZ(${-ROT.z}deg) rotateX(${-ROT.x}deg)` + (o.cam ? ` translateZ(${o.cam}px)` : '')
      }, o.outer || {})
    }, h('div', { style: Object.assign({ position: 'absolute', left: '0', bottom: '0', transform: 'translate(-50%,0)' }, o.inner || {}) }, node));
  }

  const shadowOval = (key, cx, cy, w, d, op) =>
    h('div', { key, style: { position: 'absolute', left: (cx - w / 2) + 'px', top: (cy - d / 2) + 'px', width: w + 'px', height: d + 'px', transform: 'translateZ(.6px)', borderRadius: '50%', background: `radial-gradient(ellipse at 50% 50%, rgba(84,79,53,${op != null ? op : .22}), rgba(84,79,53,0) 68%)` } });

  const dashSpot = (key, cx, cy, w, d, T, active) =>
    h('div', {
      key, style: {
        position: 'absolute', left: (cx - w / 2) + 'px', top: (cy - d / 2) + 'px', width: w + 'px', height: d + 'px',
        transform: 'translateZ(.9px)', borderRadius: '26%', border: '2.5px dashed rgba(84,79,53,.34)',
        background: 'rgba(84,79,53,.07)', boxSizing: 'border-box',
        animation: active ? 'ghostpulse 1.8s ease-in-out infinite' : 'none'
      }
    });

  // -------------------------------------------------- blob companions -----
  const blob = (st, kids) => h('div', { style: st }, kids);
  const SKINS = {
    bunny: {
      bg: 'radial-gradient(circle at 38% 30%, #ffffff 0%, #fbf8f0 55%, #efe8d8 100%)',
      sh: 'inset -5px -7px 12px rgba(203,193,168,.5), inset 5px 7px 10px rgba(255,255,255,.9), 0 2px 4px rgba(120,110,80,.12)',
      earH: 30, earR: '8px 8px 11px 11px', earTip: null
    },
    cat: {
      bg: 'radial-gradient(circle at 38% 30%, #fdf6e9 0%, #f5ead4 55%, #e6d6b8 100%)',
      sh: 'inset -5px -7px 12px rgba(196,178,140,.5), inset 5px 7px 10px rgba(255,255,255,.9), 0 2px 4px rgba(120,110,80,.12)',
      earH: 17, earR: '46% 46% 30% 30%', earTip: '#e2b7a4'
    },
    bear: {
      bg: 'radial-gradient(circle at 38% 30%, #d9b184 0%, #cca375 52%, #b98a5c 100%)',
      sh: 'inset -5px -7px 12px rgba(150,110,72,.42), inset 5px 7px 10px rgba(255,244,228,.8), 0 2px 4px rgba(110,80,50,.16)',
      earH: 17, earR: '50%', earBg: 'radial-gradient(circle at 40% 35%, #c99f6f, #a97e50)', earTip: '#7c5a37'
    }
  };

  function companion(opts) {
    const o = opts || {}; const pose = o.pose || 'idle'; const s = o.scale || 1;
    const kind = o.kind || 'bunny'; const SK = SKINS[kind] || SKINS.bunny;
    const BODY_BG = SK.bg, BODY_SH = SK.sh;
    const nap = pose === 'nap', build = pose === 'build', tea = pose === 'tea',
      cheer = pose === 'cheer', hop = pose === 'hop' || pose === 'walk';
    const anim = nap ? 'breathe 3.2s ease-in-out infinite' :
      build ? 'bunlean 1.1s ease-in-out infinite' :
        tea ? 'sip 4.6s ease-in-out infinite' :
          cheer ? 'cheerjump .85s ease-in-out infinite' :
            hop ? 'bunhop .75s ease-in-out infinite' : 'bunbob 2.6s ease-in-out infinite';

    const ear = (lft, rot) => blob({
      position: 'absolute', left: lft + 'px', bottom: (kind === 'bunny' ? (nap ? 52 : 58) : 60) + 'px', width: '14px',
      height: (nap && kind === 'bunny' ? 24 : SK.earH) + 'px',
      borderRadius: SK.earR, background: SK.earBg || BODY_BG, boxShadow: BODY_SH,
      transform: `rotate(${rot}deg)`, transformOrigin: '50% 100%'
    }, SK.earTip ? blob({ position: 'absolute', left: '3.5px', top: '2.5px', width: '7px', height: '7px', borderRadius: '50%', background: SK.earTip, opacity: .8 }) : null);
    const eye = (lft) => nap
      ? blob({ position: 'absolute', left: lft + 'px', bottom: '46px', width: '8px', height: '5px', borderRadius: '50%', borderBottom: '2.5px solid #4b483d', boxSizing: 'border-box' })
      : blob({ position: 'absolute', left: lft + 'px', bottom: '47px', width: '5px', height: '5px', borderRadius: '50%', background: '#4b483d', animation: 'blink 5.2s infinite' });
    const cheek = (lft) => blob({ position: 'absolute', left: lft + 'px', bottom: '43px', width: '8px', height: '5px', borderRadius: '50%', background: 'rgba(240,170,160,.55)', filter: 'blur(1px)' });
    const arm = (lft, rot) => blob({
      position: 'absolute', left: lft + 'px', bottom: cheer ? '34px' : '16px', width: '13px', height: '18px',
      borderRadius: '8px', background: BODY_BG, boxShadow: BODY_SH,
      transform: `rotate(${cheer ? (lft < 30 ? -140 : 140) : rot}deg)`, transformOrigin: '50% 15%'
    });

    const kids = [
      // feet
      blob({ position: 'absolute', left: '7px', bottom: '0', width: '21px', height: '12px', borderRadius: '10px', background: BODY_BG, boxShadow: BODY_SH }),
      blob({ position: 'absolute', left: '36px', bottom: '0', width: '21px', height: '12px', borderRadius: '10px', background: BODY_BG, boxShadow: BODY_SH }),
      // body
      blob({ position: 'absolute', left: '8px', bottom: '5px', width: '48px', height: nap ? '34px' : '40px', borderRadius: '46%', background: BODY_BG, boxShadow: BODY_SH }),
      arm(2, -18), arm(49, 18),
      // ears + head
      ear(17, nap ? -34 : -9), ear(33, nap ? 30 : 9),
      blob({ position: 'absolute', left: '10px', bottom: nap ? '30px' : '34px', width: '44px', height: '38px', borderRadius: '48%', background: BODY_BG, boxShadow: BODY_SH }),
      eye(22), eye(37), cheek(17), cheek(41)
    ];

    if (kind === 'cat') {
      const wsk = (lft, top, rot) => blob({ position: 'absolute', left: lft + 'px', bottom: top + 'px', width: '11px', height: '1.6px', borderRadius: '2px', background: 'rgba(120,104,72,.55)', transform: `rotate(${rot}deg)` });
      kids.push(wsk(2, 46, 8), wsk(2, 43, -4), wsk(51, 46, -8), wsk(51, 43, 4));
      kids.push(blob({ position: 'absolute', left: '52px', bottom: '4px', width: '22px', height: '9px', borderRadius: '6px 10px 10px 6px', background: BODY_BG, boxShadow: BODY_SH, transform: 'rotate(-26deg)', transformOrigin: '0 50%', animation: 'sway 3.4s ease-in-out infinite' }));
    }
    if (kind === 'bear') {
      // cream muzzle patch across the lower face
      kids.push(blob({ position: 'absolute', left: '19px', bottom: (nap ? 27 : 30) + 'px', width: '26px', height: '17px', borderRadius: '50% 50% 48% 48%', background: 'radial-gradient(circle at 45% 40%, #f6e8d3, #e8d4b6)', boxShadow: 'inset -1px -2px 3px rgba(150,110,72,.18)' }));
      // little dark nose sitting on the muzzle
      kids.push(blob({ position: 'absolute', left: '28px', bottom: (nap ? 39 : 42) + 'px', width: '8px', height: '6px', borderRadius: '50% 50% 55% 55%', background: 'radial-gradient(circle at 40% 30%, #6b5340, #4a3828)' }));
    }

    if (build) kids.push(
      h('div', { key: 'mal', style: { position: 'absolute', left: '52px', bottom: '20px', width: '6px', height: '30px', borderRadius: '3px', background: '#cfb388', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,.6)', transformOrigin: '3px 28px', animation: 'swing 1.1s ease-in-out infinite' } },
        blob({ position: 'absolute', left: '-8px', top: '-9px', width: '22px', height: '13px', borderRadius: '6px', background: 'radial-gradient(circle at 35% 30%, #bd9a6c, #9c7a4e)', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.35)' })));
    if (tea) kids.push(
      h('div', { key: 'mug', style: { position: 'absolute', left: '24px', bottom: '18px', width: '17px', height: '14px', borderRadius: '4px 4px 7px 7px', background: 'radial-gradient(circle at 35% 25%, #f0b9ae, #dd9486)', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5)' } }, steam('st', 8, -6, .8)));
    if (nap) kids.push(zzz('zz'));
    if (cheer) kids.push(h('div', { key: 'spk', style: { position: 'absolute', left: '-16px', bottom: '30px', width: '96px', height: '70px', pointerEvents: 'none' } }, sparkles('cs', 5, 96, 70, '#f7d774')));

    return h('div', { style: { position: 'relative', width: '64px', height: '92px', transform: `scale(${s})`, transformOrigin: '50% 100%' } },
      h('div', { style: { position: 'absolute', inset: '0', animation: anim, transformOrigin: '50% 100%' } }, kids));
  }
  const bunny = (opts) => companion(Object.assign({ kind: 'bunny' }, opts || {}));

  // ---------------------------------------------------------------- FX -----
  function zzz(key) {
    return h('div', { key, style: { position: 'absolute', left: '46px', bottom: '58px', width: '40px', height: '54px', pointerEvents: 'none' } },
      [0, 1, 2].map((i) => h('span', {
        key: i, style: {
          position: 'absolute', left: i * 7 + 'px', bottom: i * 4 + 'px', fontFamily: '"Fredoka",sans-serif', fontWeight: 600,
          fontSize: (13 + i * 4) + 'px', color: 'rgba(110,104,74,.75)', animation: `zfloat 2.4s ease-out ${i * .8}s infinite`, opacity: 0
        }
      }, 'z')));
  }
  function steam(key, x, y, s) {
    return h('div', { key, style: { position: 'absolute', left: x + 'px', top: y + 'px', width: '20px', height: '26px', pointerEvents: 'none', transform: `scale(${s || 1})` } },
      [0, 1].map((i) => h('span', { key: i, style: { position: 'absolute', left: i * 7 + 'px', bottom: '0', width: '6px', height: '10px', borderRadius: '50%', background: 'rgba(255,255,255,.8)', filter: 'blur(1.5px)', animation: `steam 2.6s ease-out ${i * 1.1}s infinite`, opacity: 0 } })));
  }
  function puffs(key, scale) {
    return h('div', { key, style: { position: 'absolute', left: '0', bottom: '0', width: '60px', height: '30px', pointerEvents: 'none', transform: `scale(${scale || 1})` } },
      [0, 1, 2].map((i) => h('span', { key: i, style: { position: 'absolute', left: 14 + i * 12 + 'px', bottom: '2px', width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(240,232,210,.9)', '--px': (i - 1) * 18 + 'px', animation: `puff 1.1s ease-out ${i * .36}s infinite`, opacity: 0 } })));
  }
  function sparkles(key, n, w, hh, color) {
    return h('div', { key, style: { position: 'absolute', inset: '0', pointerEvents: 'none' } },
      Array.from({ length: n }, (_, i) => h('span', {
        key: i, style: {
          position: 'absolute', left: rnd(i * 3 + 1) * (w - 10) + 'px', top: rnd(i * 7 + 2) * (hh - 12) + 'px',
          fontSize: 9 + rnd(i + 5) * 9 + 'px', color: color || '#f2cf6e', fontFamily: '"Fredoka",sans-serif',
          animation: `twinkle ${1.4 + rnd(i) * 1.4}s ease-in-out ${rnd(i * 2) * 2}s infinite`
        }
      }, '✦')));
  }
  function confetti(key, o) {
    const opt = o || {}; const n = opt.n || 26;
    const cols = opt.colors || ['#e8b7ad', '#dde7c4', '#d9b268', '#a9ae8c', '#fff6de', '#b5c4cf'];
    return h('div', { key, style: { position: 'absolute', inset: '0', pointerEvents: 'none', overflow: 'visible' } },
      Array.from({ length: n }, (_, i) => {
        const a = rnd(i * 5 + 3) * Math.PI * 2, dist = 40 + rnd(i * 11 + 7) * (opt.spread || 120);
        return h('span', {
          key: i, style: {
            position: 'absolute', left: '50%', top: '55%', width: rnd(i) > .5 ? '9px' : '7px', height: rnd(i + 2) > .5 ? '6px' : '9px',
            borderRadius: rnd(i * 3) > .55 ? '50%' : '2.5px', background: cols[i % cols.length],
            '--dx': Math.cos(a) * dist + 'px', '--dy': (Math.sin(a) * dist * .7 - 60) + 'px', '--rot': (rnd(i * 7) * 720 - 360) + 'deg',
            animation: `cfburst ${.9 + rnd(i * 2) * .6}s cubic-bezier(.16,.84,.44,1) ${rnd(i * 13) * (opt.stagger || .12)}s ${opt.loop ? 'infinite' : '1'} both`
          }
        });
      }));
  }

  // ------------------------------------------------------- furniture -------
  // Each draw returns an array of elements in floor coords. g = ghost.
  const D = {};

  D.rug = (T, g) => box('rug', { x: 60, y: 78, w: 180, d: 180, ht: 5, r: 26, c: T.rug, ghost: g, cols: g ? null : [T.rug, sh(T.rug, -.08), sh(T.rug, -.18)] });

  D.window = (T, g) => {
    const filt = g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : null;
    const pane = h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, filt || {}) }, [
      h('div', { key: 'fr', style: { position: 'absolute', inset: '0', borderRadius: '14px', background: '#fffdf4', boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.8), inset -3px -4px 8px rgba(190,178,150,.45), 0 3px 8px rgba(120,108,70,.18)' } },
        h('div', { style: { position: 'absolute', inset: '9px', borderRadius: '8px', background: 'radial-gradient(circle at 50% 30%, #fffbe8, #f7ecc7)', boxShadow: g ? 'none' : '0 0 22px 6px rgba(255,244,205,.75)' } }, [
          h('div', { key: 'v', style: { position: 'absolute', left: '50%', top: '0', bottom: '0', width: '5px', marginLeft: '-2.5px', background: '#fffdf4', borderRadius: '3px' } }),
          h('div', { key: 'h2', style: { position: 'absolute', top: '50%', left: '0', right: '0', height: '5px', marginTop: '-2.5px', background: '#fffdf4', borderRadius: '3px' } })
        ]))
    ]);
    const curtain = (k) => h('div', {
      key: k, style: Object.assign({
        position: 'absolute', inset: '0', borderRadius: '6px 6px 12px 12px',
        background: `repeating-linear-gradient(90deg, ${sh(T.wallIn, .3)} 0 7px, ${sh(T.wallCap, .12)} 7px 14px)`,
        boxShadow: 'inset 0 -6px 9px rgba(160,146,112,.28), inset 0 4px 6px rgba(255,255,255,.5)',
        transformOrigin: '50% 0', animation: g ? 'none' : `sway ${k === 'c1' ? 5.2 : 6.1}s ease-in-out infinite`
      }, filt || {})
    });
    const rodBall = (lft) => h('span', { key: 'b' + lft, style: { position: 'absolute', left: lft, top: '-2px', width: '11px', height: '11px', borderRadius: '50%', background: sh(T.wood, -.05), boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5)' } });
    return [
      onWallL('wf', 46, 72, 116, 80, pane),
      onWallL('rod', 26, 154, 156, 7, h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '4px', background: sh(T.wood, .05), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.55)' }, filt || {}) }, [rodBall('-4px'), rodBall('149px')])),
      onWallL('cu1', 30, 62, 30, 94, curtain('c1')),
      onWallL('cu2', 148, 62, 30, 94, curtain('c2')),
      g ? null : h('div', { key: 'sun', style: { position: 'absolute', left: '12px', top: '52px', width: '96px', height: '116px', transform: 'translateZ(.4px)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(255,247,214,.5), rgba(255,247,214,0) 70%)' } })
    ].filter(Boolean);
  };

  D.sofa = (T, g) => [].concat(
    box('sb', { x: 146, y: 22, w: 126, d: 16, ht: 56, r: 10, c: T.clay, ghost: g }),
    box('sa1', { x: 142, y: 22, w: 15, d: 72, ht: 42, r: 9, c: T.clay, ghost: g }),
    box('sa2', { x: 257, y: 22, w: 15, d: 72, ht: 42, r: 9, c: T.clay, ghost: g }),
    box('sbase', { x: 157, y: 30, w: 100, d: 60, ht: 24, r: 8, c: sh(T.clay, -.04), ghost: g }),
    box('sc1', { x: 160, y: 34, w: 47, d: 52, ht: 13, r: 12, c: T.clayL, ghost: g }),
    box('sc2', { x: 209, y: 34, w: 47, d: 52, ht: 13, r: 12, c: T.clayL, ghost: g }),
    box('sp1', { x: 166, y: 30, w: 26, d: 9, ht: 24, r: 9, z0: 37, c: T.accent, ghost: g }),
    box('sp2', { x: 222, y: 30, w: 26, d: 9, ht: 24, r: 9, z0: 37, c: T.accent2, ghost: g })
  );

  D.armchair = (T, g) => [].concat(
    box('ab', { x: 26, y: 142, w: 16, d: 78, ht: 52, r: 9, c: T.clay, ghost: g }),
    box('aa1', { x: 26, y: 136, w: 62, d: 15, ht: 40, r: 9, c: T.clay, ghost: g }),
    box('aa2', { x: 26, y: 209, w: 62, d: 15, ht: 40, r: 9, c: T.clay, ghost: g }),
    box('abase', { x: 34, y: 150, w: 54, d: 60, ht: 24, r: 8, c: sh(T.clay, -.04), ghost: g }),
    box('acu', { x: 38, y: 153, w: 48, d: 54, ht: 13, r: 12, c: T.clayL, ghost: g }),
    box('api', { x: 36, y: 160, w: 9, d: 38, ht: 24, r: 9, z0: 36, c: T.accent, ghost: g })
  );

  D.coffeetable = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 7, d: 7, ht: 15, r: 3, c: T.woodD, ghost: g });
    return [].concat(
      leg('l1', 118, 144), leg('l2', 176, 144), leg('l3', 118, 176), leg('l4', 176, 176),
      puck('ct', { x: 106, y: 134, w: 90, d: 60, ht: 9, z0: 15, c: T.wood, ghost: g })
    );
  };

  D.stool = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 5, d: 5, ht: 27, r: 2, c: T.woodD, ghost: g });
    return [].concat(leg('l1', 92, 50), leg('l2', 112, 50), leg('l3', 92, 68), leg('l4', 112, 68),
      puck('st', { x: 84, y: 42, w: 42, d: 40, ht: 7, z0: 27, c: T.woodL, ghost: g }));
  };

  D.plant = (T, g) => {
    const leaf = (lft, bot, w, hh, rot, col, dl) => h('span', { style: { position: 'absolute', left: lft + 'px', bottom: bot + 'px', width: w + 'px', height: hh + 'px', borderRadius: '50% 50% 46% 46%', background: `radial-gradient(circle at 40% 25%, ${sh(col, .22)}, ${col})`, boxShadow: 'inset -2px -3px 4px rgba(0,0,0,.12)', transform: `rotate(${rot}deg)`, transformOrigin: '50% 100%', animation: g ? 'none' : `sway 4.4s ease-in-out ${dl}s infinite` } });
    const node = h('div', { style: Object.assign({ position: 'relative', width: '52px', height: '64px' }, g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {}) }, [
      leaf(20, 26, 14, 34, 0, '#7e9660', 0), leaf(8, 24, 13, 27, -26, '#94aa72', .6), leaf(30, 24, 13, 27, 26, '#94aa72', 1.1),
      h('div', { key: 'pot', style: { position: 'absolute', left: '13px', bottom: '0', width: '26px', height: '24px', borderRadius: '6px 6px 10px 10px', background: `radial-gradient(circle at 38% 25%, ${sh(T.accent2, .2)}, ${T.accent2})`, boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.5), inset -3px -4px 6px rgba(0,0,0,.12)' } },
        h('div', { style: { position: 'absolute', left: '-2px', top: '-3px', right: '-2px', height: '9px', borderRadius: '5px', background: sh(T.accent2, .12), boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5)' } }))
    ]);
    return [sprite('pl', 214, 116, 33, node), g ? null : shadowOval('ps', 214, 118, 40, 22, .14)].filter(Boolean);
  };

  D.clock = (T, g) => onWallL('ck', 196, 108, 46, 46,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '50%', background: sh(T.wood, .06), boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.6), inset -3px -4px 6px rgba(160,140,100,.5), 0 3px 7px rgba(120,108,70,.2)' }, g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {}) }, [
      h('div', { key: 'f', style: { position: 'absolute', inset: '6px', borderRadius: '50%', background: '#fffcf0', boxShadow: 'inset -2px -2px 4px rgba(190,178,150,.4)' } }, [
        h('div', { key: 'hm', style: { position: 'absolute', left: '50%', top: '50%', width: '3px', height: '11px', marginLeft: '-1.5px', background: '#6e684a', borderRadius: '2px', transformOrigin: '50% 100%', transform: 'translateY(-100%)', animation: g ? 'none' : 'spinhand 240s linear infinite' } }),
        h('div', { key: 'hh', style: { position: 'absolute', left: '50%', top: '50%', width: '3px', height: '8px', marginLeft: '-1.5px', background: '#6e684a', borderRadius: '2px', transformOrigin: '50% 100%', transform: 'translateY(-100%) rotate(105deg)', opacity: .85 } }),
        h('span', { key: 'c', style: { position: 'absolute', left: '50%', top: '50%', width: '4px', height: '4px', margin: '-2px', borderRadius: '50%', background: '#6e684a' } })
      ])
    ]));

  D.frame = (T, g) => onWallR('fr', 100, 96, 92, 56,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '10px', background: sh(T.wood, .04), boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.55), inset -3px -4px 6px rgba(160,140,100,.5), 0 4px 8px rgba(120,108,70,.2)' }, g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {}) },
      h('div', { style: { position: 'absolute', inset: '8px', borderRadius: '6px', background: '#fdf9ec', overflow: 'hidden', boxShadow: 'inset -2px -2px 4px rgba(190,178,150,.35)' } }, [
        h('span', { key: 'a', style: { position: 'absolute', left: '12%', bottom: '-20%', width: '45%', height: '75%', borderRadius: '50%', background: T.accent } }),
        h('span', { key: 'b', style: { position: 'absolute', right: '10%', bottom: '-32%', width: '58%', height: '85%', borderRadius: '50%', background: T.clayL, opacity: .8 } }),
        h('span', { key: 'sun2', style: { position: 'absolute', right: '16%', top: '14%', width: '13px', height: '13px', borderRadius: '50%', background: T.gold, opacity: .85 } })
      ])));

  D.sconce = (T, g) => onWallR('sc', 220, 104, 38, 58,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {}) }, [
      h('span', { key: 'arm', style: { position: 'absolute', left: '15px', bottom: '4px', width: '7px', height: '26px', borderRadius: '4px', background: `linear-gradient(180deg, ${T.gold}, ${sh(T.gold, -.2)})`, boxShadow: 'inset 1px 1px 2px rgba(255,255,255,.6)' } }),
      h('span', { key: 'cup', style: { position: 'absolute', left: '10px', bottom: '26px', width: '17px', height: '9px', borderRadius: '0 0 9px 9px', background: T.gold, boxShadow: 'inset 1px -2px 2px rgba(255,255,255,.4)' } }),
      h('span', { key: 'bulb', style: { position: 'absolute', left: '9px', bottom: '32px', width: '19px', height: '19px', borderRadius: '50%', background: 'radial-gradient(circle at 42% 35%, #fffdf0, #ffedb8)', boxShadow: g ? 'none' : '0 0 18px 7px rgba(255,236,175,.8)', animation: g ? 'none' : 'glowpulse 3.4s ease-in-out infinite' } })
    ]));

  D.bookshelf = (T, g) => {
    const els = [].concat(
      box('bs1', { x: 36, y: 8, w: 9, d: 34, ht: 78, r: 5, c: T.wood, ghost: g }),
      box('bs2', { x: 119, y: 8, w: 9, d: 34, ht: 78, r: 5, c: T.wood, ghost: g }),
      box('bsh0', { x: 40, y: 9, w: 84, d: 33, ht: 6, r: 3, z0: 4, c: sh(T.wood, .05), ghost: g }),
      box('bsh1', { x: 40, y: 9, w: 84, d: 33, ht: 6, r: 3, z0: 40, c: sh(T.wood, .05), ghost: g }),
      box('bsh2', { x: 38, y: 8, w: 88, d: 34, ht: 7, r: 4, z0: 74, c: T.wood, ghost: g })
    );
    const bw = 8.5;
    for (let i = 0; i < 7; i++) els.push.apply(els, box('bk' + i, { x: 47 + i * (bw + 1.2), y: 13, w: bw, d: 24, ht: 20 + rnd(i) * 7, r: 3, z0: 10, c: T.books[i % 6], ghost: g }));
    for (let i = 0; i < 4; i++) els.push.apply(els, box('bK' + i, { x: 50 + i * (bw + 1.6), y: 13, w: bw, d: 24, ht: 18 + rnd(i + 9) * 8, r: 3, z0: 46, c: T.books[(i + 3) % 6], ghost: g }));
    els.push.apply(els, puck('bv', { x: 96, y: 14, w: 20, d: 20, ht: 14, z0: 46, c: T.accent2, ghost: g }));
    return els;
  };

  D.lamp = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '64px', height: '118px' }, g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {}) }, [
      h('span', { key: 'glow', style: { position: 'absolute', left: '4px', top: '-4px', width: '56px', height: '52px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,190,.65), rgba(255,240,190,0) 70%)', animation: g ? 'none' : 'glowpulse 3.8s ease-in-out infinite' } }),
      h('span', { key: 'stem', style: { position: 'absolute', left: '29px', bottom: '6px', width: '6px', height: '78px', borderRadius: '3px', background: `linear-gradient(180deg, ${sh(T.wood, -.06)}, ${T.woodD})` } }),
      h('span', { key: 'base', style: { position: 'absolute', left: '17px', bottom: '0', width: '30px', height: '11px', borderRadius: '50%', background: T.woodD, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.35)' } }),
      h('span', { key: 'shade', style: { position: 'absolute', left: '7px', bottom: '76px', width: '50px', height: '36px', borderRadius: '50% 50% 14% 14%', background: `radial-gradient(circle at 40% 22%, ${sh(T.accent, .16)}, ${sh(T.accent, -.06)})`, boxShadow: 'inset 3px 4px 6px rgba(255,255,255,.6), inset -4px -6px 8px rgba(0,0,0,.09), 0 4px 10px rgba(120,108,70,.14)' } }),
      h('span', { key: 'lite', style: { position: 'absolute', left: '22px', bottom: '72px', width: '20px', height: '10px', borderRadius: '50%', background: '#fff3cb', filter: 'blur(2px)' } })
    ]);
    return [sprite('lp', 253, 148, 0, node), g ? null : shadowOval('ls', 253, 150, 52, 26, .18)].filter(Boolean);
  };

  D.desk = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 8, d: 8, ht: 37, r: 3, c: T.woodD, ghost: g });
    const els = [].concat(
      leg('d1', 34, 236), leg('d2', 110, 236), leg('d3', 34, 270), leg('d4', 110, 270),
      box('dt', { x: 28, y: 230, w: 96, d: 54, ht: 8, r: 9, z0: 37, c: T.wood, ghost: g }),
      // open notebook
      box('pg1', { x: 48, y: 244, w: 22, d: 27, ht: 2.5, r: 2, z0: 45, cols: g ? null : ['#fffdf2', '#efe7d2', '#e2d8bd'], c: '#fffdf2', ghost: g }),
      box('pg2', { x: 71, y: 244, w: 22, d: 27, ht: 2.5, r: 2, z0: 45, cols: g ? null : ['#fbf6e4', '#efe7d2', '#e2d8bd'], c: '#fbf6e4', ghost: g })
    );
    if (!g) {
      els.push(h('div', { key: 'ln', style: { position: 'absolute', left: '51px', top: '248px', width: '16px', height: '19px', transform: 'translateZ(48px)', backgroundImage: 'repeating-linear-gradient(180deg, rgba(120,110,80,.4) 0 1.5px, transparent 1.5px 5px)' } }));
      const cup = h('div', { style: { position: 'relative', width: '22px', height: '30px' } }, [
        h('span', { key: 'p1', style: { position: 'absolute', left: '4px', bottom: '10px', width: '4px', height: '16px', borderRadius: '2px', background: T.accent2, transform: 'rotate(-8deg)' } }),
        h('span', { key: 'p2', style: { position: 'absolute', left: '11px', bottom: '11px', width: '4px', height: '17px', borderRadius: '2px', background: T.gold, transform: 'rotate(7deg)' } }),
        h('span', { key: 'c', style: { position: 'absolute', left: '2px', bottom: '0', width: '16px', height: '15px', borderRadius: '4px 4px 7px 7px', background: `radial-gradient(circle at 38% 25%, ${sh(T.clay, .2)}, ${T.clay})`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.45)' } })
      ]);
      els.push(sprite('cupS', 108, 258, 45, cup));
    }
    return els;
  };

  D.chair = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 5, d: 5, ht: 25, r: 2, c: T.woodD, ghost: g });
    return [].concat(
      leg('c1', 142, 246), leg('c2', 166, 246), leg('c3', 142, 268), leg('c4', 166, 268),
      puck('cs', { x: 134, y: 240, w: 46, d: 42, ht: 9, z0: 25, c: T.clayL, ghost: g }),
      box('cb', { x: 176, y: 244, w: 8, d: 34, ht: 36, r: 6, z0: 20, c: T.clay, ghost: g })
    );
  };

  D.cushions = (T, g) => [].concat(
    box('cu1', { x: 30, y: 234, w: 50, d: 50, ht: 15, r: 18, c: T.accent, ghost: g }),
    box('cu2', { x: 37, y: 241, w: 37, d: 37, ht: 13, r: 15, z0: 15, c: T.accent2, ghost: g })
  );

  D.teaset = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '58px', height: '40px' }, g ? { filter: 'saturate(0) brightness(.45)', opacity: .32 } : {}) }, [
      h('span', { key: 'pot', style: { position: 'absolute', left: '14px', bottom: '2px', width: '26px', height: '21px', borderRadius: '48%', background: `radial-gradient(circle at 38% 28%, ${sh(T.accent2, .25)}, ${T.accent2})`, boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.55), inset -3px -3px 5px rgba(0,0,0,.1)' } }),
      h('span', { key: 'lid', style: { position: 'absolute', left: '24px', bottom: '21px', width: '6px', height: '6px', borderRadius: '50%', background: sh(T.accent2, -.15) } }),
      h('span', { key: 'spt', style: { position: 'absolute', left: '37px', bottom: '12px', width: '10px', height: '6px', borderRadius: '4px', background: T.accent2, transform: 'rotate(-24deg)' } }),
      h('span', { key: 'cup', style: { position: 'absolute', left: '0px', bottom: '0', width: '13px', height: '10px', borderRadius: '3px 3px 6px 6px', background: '#fffdf2', boxShadow: 'inset 2px 2px 2px rgba(255,255,255,.8), inset -2px -2px 3px rgba(190,178,150,.5)' } }),
      g ? null : steam('stm', 15, -14, 1)
    ].filter(Boolean));
    return [sprite('ts', 151, 166, 24, node)];
  };

  // catalog: build order + placement metadata (cx/cy = footprint center, bx/by = builder work spot,
  // sdy = card-preview downshift px, fx/fy = flat-preview center for wall items)
  const FURN = [
    { key: 'window', label: 'Window & Curtains', icon: '🪟', cx: 24, cy: 118, fw: 40, fd: 150, bx: 66, by: 120, wall: true, fx: 104, fy: -110 },
    { key: 'rug', label: 'Cozy Rug', icon: '🧶', cx: 150, cy: 168, fw: 180, fd: 180, bx: 150, by: 195 },
    { key: 'sofa', label: 'Squishy Sofa', icon: '🛋', cx: 207, cy: 58, fw: 130, fd: 74, bx: 205, by: 128, sdy: 14 },
    { key: 'armchair', label: 'Reading Armchair', icon: '💺', cx: 60, cy: 180, fw: 66, fd: 88, bx: 122, by: 185, sdy: 10 },
    { key: 'coffeetable', label: 'Coffee Table', icon: '🫖', cx: 151, cy: 164, fw: 90, fd: 60, bx: 151, by: 208, sdy: 6 },
    { key: 'stool', label: 'Side Stool', icon: '🪑', cx: 105, cy: 60, fw: 44, fd: 42, bx: 110, by: 106, sdy: 8 },
    { key: 'plant', label: 'Potted Plant', icon: '🪴', cx: 214, cy: 116, fw: 40, fd: 36, bx: 214, by: 156, sdy: 32 },
    { key: 'clock', label: 'Wall Clock', icon: '🕰', cx: 24, cy: 219, fw: 36, fd: 50, bx: 62, by: 222, wall: true, fx: 219, fy: -131 },
    { key: 'frame', label: 'Picture Frame', icon: '🖼', cx: 146, cy: 22, fw: 90, fd: 36, bx: 146, by: 62, wall: true, fx: 146, fy: -124 },
    { key: 'sconce', label: 'Wall Lamp', icon: '💡', cx: 239, cy: 22, fw: 42, fd: 36, bx: 239, by: 62, wall: true, fx: 239, fy: -133 },
    { key: 'bookshelf', label: 'Bookshelf', icon: '📚', cx: 82, cy: 25, fw: 92, fd: 40, bx: 82, by: 74, sdy: 26 },
    { key: 'lamp', label: 'Floor Lamp', icon: '🏮', cx: 253, cy: 150, fw: 50, fd: 34, bx: 250, by: 192, sdy: 38 },
    { key: 'desk', label: 'Study Desk', icon: '📓', cx: 76, cy: 257, fw: 96, fd: 56, bx: 76, by: 298, sdy: 14 },
    { key: 'chair', label: 'Desk Chair', icon: '🪑', cx: 158, cy: 258, fw: 50, fd: 44, bx: 162, by: 295, sdy: 10 },
    { key: 'cushions', label: 'Floor Cushions', icon: '🧸', cx: 55, cy: 259, fw: 52, fd: 52, bx: 96, by: 268, sdy: 6 },
    { key: 'teaset', label: 'Tea Set', icon: '🍵', cx: 151, cy: 165, fw: 58, fd: 34, bx: 151, by: 208, sdy: 20 }
  ];

  // ------------------------------------------------------------- room ------
  function roomShell(T, wallH) {
    const H = wallH || 186;
    return [].concat(
      box('flr', { x: -22, y: -22, w: 344, d: 344, ht: 16, z0: -16, r: 20, cols: [T.floor, sh(T.floorSide, -.02), sh(T.floorSide, -.14)], topExtra: { boxShadow: 'inset 4px 4px 14px rgba(255,255,255,.5), inset -6px -6px 16px rgba(140,124,88,.08)' } }),
      box('walL', { x: -22, y: -22, w: 22, d: 344, ht: H, r: 10, cols: [T.wallTop, sh(T.wallCap, -.02), T.wallIn] }),
      box('walR', { x: 0, y: -22, w: 322, d: 22, ht: H, r: 10, cols: [T.wallTop, T.wallIn, sh(T.wallCap, -.06)] })
    );
  }

  // opts: {theme, set:{FURN,D}, built:[], targetKey, justBuilt, bunny:{x,y,pose,kind,show}, scale, w, h, lift}
  function room(o) {
    const T = o.theme; const built = o.built || [];
    const CAT = (o.set && o.set.FURN) || FURN; const DR = (o.set && o.set.D) || D;
    const kids = roomShell(T, o.wallH);
    CAT.forEach((f) => {
      const isBuilt = built.indexOf(f.key) >= 0;
      const isTarget = o.targetKey === f.key;
      if (isBuilt) {
        kids.push(h('div', {
          key: 'F' + f.key,
          style: { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d', animation: o.justBuilt === f.key ? 'dropin .8s cubic-bezier(.22,1.2,.36,1) both' : 'none' }
        }, DR[f.key](T, false)));
        if (!f.wall && f.key !== 'rug' && !f.flat) kids.push(shadowOval('sh' + f.key, f.cx, f.cy, f.fw * 1.05, f.fd * .8, .16));
      } else {
        kids.push(h('div', { key: 'G' + f.key, style: { position: 'absolute', left: 0, top: 0, width: 0, height: 0, transformStyle: 'preserve-3d' } }, DR[f.key](T, true)));
        kids.push(dashSpot('ds' + f.key, f.cx, f.cy, Math.max(40, f.fw * .84), Math.max(34, f.fd * .8), T, isTarget));
      }
    });
    const b = o.bunny;
    if (b && b.show !== false) {
      kids.push(shadowOval('bunsh', 0, 0, 46, 22, .2) && h('div', { key: 'bunshWrap', style: { position: 'absolute', left: b.x + 'px', top: b.y + 'px', width: 0, height: 0, transition: 'left 1.6s ease-in-out, top 1.6s ease-in-out' } }, h('div', { style: { position: 'absolute', left: '-23px', top: '-11px', width: '46px', height: '22px', transform: 'translateZ(.7px)', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(84,79,53,.22), rgba(84,79,53,0) 68%)' } })));
      kids.push(h('div', { key: 'bun', style: { position: 'absolute', left: b.x + 'px', top: b.y + 'px', width: 0, height: 0, transformOrigin: '0 0', transform: `translateZ(${b.z || 0}px) rotateZ(${-ROT.z}deg) rotateX(${-ROT.x}deg) translateZ(52px)`, transition: 'left 1.6s ease-in-out, top 1.6s ease-in-out' } },
        h('div', { style: { position: 'absolute', left: 0, bottom: 0, transform: 'translate(-50%,0) scale(' + (b.scale || .92) + ')', transformOrigin: '50% 100%' } }, companion({ kind: b.kind || 'bunny', pose: b.pose || 'idle' }))));
      if (b.pose === 'build') {
        const tf = CAT.filter((f) => f.key === o.targetKey)[0];
        if (tf) kids.push(sprite('pf', tf.cx, tf.cy, 2, puffs('pp', 1), { cam: 44 }));
      }
    }
    (o.extras || []).forEach((e) => kids.push(e));
    const scale = o.scale || 1;
    return h('div', { style: { position: 'relative', width: (o.w || 640) + 'px', height: (o.h || 560) + 'px', pointerEvents: 'none' } },
      h('div', {
        style: {
          position: 'absolute', left: '50%', top: '50%', width: '300px', height: '300px', transformStyle: 'preserve-3d',
          transform: `translate(-50%,-${o.lift != null ? o.lift : 42}%) scale(${scale}) rotateX(${ROT.x}deg) rotateZ(${ROT.z}deg)`
        }
      }, kids));
  }

  // tiny standalone furniture stage (for asset sheet / notebook): one item centered.
  // Wall items render FLAT (facing the viewer); floor items keep the iso view.
  function itemStage(fkey, T, o) {
    const opt = o || {}; const CAT = (opt.set && opt.set.FURN) || FURN; const DR = (opt.set && opt.set.D) || D;
    const f = CAT.filter((x) => x.key === fkey)[0];
    const s = opt.scale || 1;
    const stage = (inner) => h('div', { style: { position: 'relative', width: (opt.w || 190) + 'px', height: (opt.h || 150) + 'px', overflow: 'visible', pointerEvents: 'none' } }, inner);
    if (f.wall) {
      api._flat = true;
      const els = DR[fkey](T, !!opt.ghost);
      api._flat = false;
      return stage(h('div', {
        style: { position: 'absolute', left: '50%', top: '50%', width: 0, height: 0, animation: opt.anim || 'none', transform: `scale(${s * 1.12}) translate(${-(f.fx || 0)}px,${-(f.fy || 0)}px)` }
      }, els));
    }
    const kids = [];
    if (opt.ghost) { kids.push(h('div', { key: 'g', style: { position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d' } }, DR[fkey](T, true))); kids.push(dashSpot('d', f.cx, f.cy, Math.max(40, f.fw * .84), Math.max(34, f.fd * .8), T, opt.pulse)); }
    else kids.push(h('div', { key: 's', style: { position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', animation: opt.anim || 'none' } }, DR[fkey](T, false)));
    if (!opt.ghost && !f.flat) kids.push(shadowOval('sh', f.cx, f.cy, f.fw * 1.05, f.fd * .8, .16));
    const dy = opt.dy != null ? opt.dy : Math.round((f.sdy || 0) * s);
    return stage(h('div', {
      style: {
        position: 'absolute', left: '50%', top: `calc(50% + ${dy}px)`, width: 0, height: 0, transformStyle: 'preserve-3d',
        transform: `scale(${s}) rotateX(${ROT.x}deg) rotateZ(${ROT.z}deg) translate(${-f.cx}px,${-f.cy}px)`
      }
    }, kids));
  }

  const api = { THEMES, FURN, D, bunny, companion, room, roomShell, itemStage, box, puck, sprite, onWallL, onWallR, shadowOval, dashSpot, confetti, sparkles, zzz, puffs, steam, face, sh, mix, rnd };
  return api;
}

export const KEYFRAME_NAMES = ['floaty', 'bunbob', 'bunhop', 'bunlean', 'swing', 'puff', 'zfloat', 'steam', 'twinkle', 'cfburst', 'dropin', 'ghostpulse', 'glowpulse', 'sway', 'blink', 'breathe', 'sip', 'cheerjump', 'popin', 'spinhand'];
