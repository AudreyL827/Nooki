// sets.js — room-specific furniture sets beyond the living room.
// Every house is a different ROOM TYPE with unique furniture (never a recolor):
//   strawberry → Kitchen · lavender → Bedroom · honey → Café · seaside → Beach · cocoa → Forest Cabin
// Kitchen + Bedroom are fully drawn (16 pieces each). Café/Beach/Forest ship as
// text catalogs + hero illustrations ("upcoming blueprints" in the prototype).
// Usage: const sets = makeSets(React, clay)  →  { kitchen:{FURN,D}, bedroom:{FURN,D}, catalogs, heroes }

export function makeSets(React, clay) {
  const h = React.createElement;
  const { box, puck, sprite, onWallL, onWallR, face, sh, steam, shadowOval, rnd } = clay;
  const gf = (g) => (g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {});

  // ================================================================ KITCHEN =
  const KD = {};

  KD.mat = (T, g) => box('kmat', {
    x: 84, y: 156, w: 132, d: 108, ht: 4, r: 14, c: T.rug, ghost: g,
    cols: g ? null : [T.rug, sh(T.rug, -.08), sh(T.rug, -.18)],
    topExtra: g ? null : { backgroundImage: `repeating-conic-gradient(${sh(T.rug, .18)} 0% 25%, rgba(0,0,0,0) 0% 50%)`, backgroundSize: '26px 26px', borderRadius: '14px' }
  });

  KD.window = (T, g) => {
    const pane = h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'fr', style: { position: 'absolute', inset: '0', borderRadius: '46px 46px 12px 12px', background: '#fffdf4', boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.8), inset -3px -4px 8px rgba(190,160,150,.45), 0 3px 8px rgba(140,100,90,.16)' } },
        h('div', { style: { position: 'absolute', inset: '8px', borderRadius: '40px 40px 8px 8px', background: 'radial-gradient(circle at 50% 28%, #fffbe9, #fbe9d2)', boxShadow: g ? 'none' : '0 0 20px 5px rgba(255,238,214,.7)' } },
          h('div', { style: { position: 'absolute', left: '50%', top: '0', bottom: '0', width: '5px', marginLeft: '-2.5px', background: '#fffdf4', borderRadius: '3px' } }))),
      h('div', { key: 'sill', style: { position: 'absolute', left: '-6px', bottom: '-7px', right: '-6px', height: '9px', borderRadius: '5px', background: sh(T.wood, .08), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.6)' } }),
      [14, 66].map((lft, i) => h('div', { key: 'hp' + i, style: { position: 'absolute', left: lft + 'px', bottom: '1px', width: '17px', height: '14px', borderRadius: '3px 3px 6px 6px', background: T.accent2 } },
        h('span', { style: { position: 'absolute', left: '3px', top: '-9px', width: '11px', height: '10px', borderRadius: '50% 50% 40% 40%', background: '#94aa72' } })))
    ]);
    return [onWallL('kwf', 48, 76, 100, 82, pane)];
  };

  KD.fridge = (T, g) => [].concat(
    box('kfB', { x: 242, y: 8, w: 46, d: 42, ht: 112, r: 13, cols: g ? null : ['#fffdf4', '#f6ece2', '#e8d8cc'], c: '#fffdf4', ghost: g }),
    box('kfH', { x: 246, y: 50, w: 4, d: 3, ht: 26, r: 2, z0: 62, c: T.clay, ghost: g }),
    box('kfH2', { x: 246, y: 50, w: 4, d: 3, ht: 14, r: 2, z0: 38, c: T.clay, ghost: g }),
    g ? [] : [h('div', { key: 'kfL', style: { position: 'absolute', left: '244px', top: '50.5px', width: '42px', height: '2.5px', transform: 'translateZ(56px) rotateX(-90deg)', transformOrigin: '0 0', background: 'rgba(190,160,150,.4)', borderRadius: '2px' } })]
  );

  KD.stove = (T, g) => {
    const els = [].concat(
      box('ksB', { x: 178, y: 8, w: 58, d: 42, ht: 58, r: 8, cols: g ? null : ['#fbf3ea', '#f1e2d6', '#e2cfc2'], c: '#fbf3ea', ghost: g })
    );
    if (!g) {
      [[188, 16], [214, 16], [188, 34], [214, 34]].forEach((p, i) => els.push(
        h('div', { key: 'kb' + i, style: { position: 'absolute', left: p[0] + 'px', top: p[1] + 'px', width: '15px', height: '13px', transform: 'translateZ(58.8px)', borderRadius: '50%', background: 'radial-gradient(circle, #6b5f58 55%, #4e443e)', boxShadow: 'inset 0 1px 2px rgba(255,255,255,.25)' } })));
      els.push(face('ksO', { x: 184, y: 50, w: 46, hh: 32, tf: 'translateZ(44px) rotateX(-90deg)', bg: 'radial-gradient(circle at 50% 40%, #7a6a60, #55483f)', r: 7, soft: 'inset 0 0 0 4px rgba(251,243,234,.85), inset 0 -3px 8px rgba(0,0,0,.3)' }));
      els.push(face('ksK', { x: 184, y: 50, w: 46, hh: 7, tf: 'translateZ(54px) rotateX(-90deg)', bg: `repeating-linear-gradient(90deg, ${T.clay} 0 5px, rgba(0,0,0,0) 5px 14px)`, r: 3, soft: 'none' }));
    }
    return els;
  };

  KD.sink = (T, g) => {
    const els = [].concat(
      box('knB', { x: 112, y: 8, w: 60, d: 42, ht: 54, r: 8, c: T.wood, ghost: g }),
      g ? [] : [h('div', { key: 'knb', style: { position: 'absolute', left: '120px', top: '15px', width: '44px', height: '28px', transform: 'translateZ(54.8px)', borderRadius: '9px', background: 'radial-gradient(circle at 45% 35%, #f3ede2, #ddd2c0)', boxShadow: 'inset 2px 3px 6px rgba(120,100,80,.35), inset -1px -1px 2px rgba(255,255,255,.6)' } })]
    );
    if (!g) {
      const faucet = h('div', { style: { position: 'relative', width: '26px', height: '26px' } }, [
        h('span', { key: 'a', style: { position: 'absolute', left: '10px', bottom: '0', width: '5px', height: '20px', borderRadius: '3px', background: 'linear-gradient(180deg,#d8cfc2,#b3a897)' } }),
        h('span', { key: 'b', style: { position: 'absolute', left: '10px', bottom: '17px', width: '15px', height: '5px', borderRadius: '3px', background: '#d8cfc2' } }),
        h('span', { key: 'c', style: { position: 'absolute', left: '21px', bottom: '13px', width: '4px', height: '6px', borderRadius: '2px', background: '#b3a897' } })
      ]);
      els.push(sprite('knF', 152, 12, 54, faucet));
    }
    return els;
  };

  KD.counter = (T, g) => {
    const els = [].concat(box('kcB', { x: 42, y: 8, w: 62, d: 42, ht: 54, r: 8, c: T.wood, ghost: g }));
    if (!g) {
      [0, 1].forEach((i) => {
        els.push(face('kcd' + i, { x: 48, y: 50, w: 50, hh: 20, tf: `translateZ(${46 - i * 24}px) rotateX(-90deg)`, bg: T.clay, r: 6, soft: 'inset 2px 2px 4px rgba(255,255,255,.35), inset -2px -3px 5px rgba(0,0,0,.12)' }));
        els.push(face('kck' + i, { x: 70, y: 50, w: 7, hh: 7, tf: `translateZ(${39 - i * 24}px) rotateX(-90deg)`, bg: '#fffdf4', r: '50%', soft: 'none' }));
      });
    }
    return els;
  };

  KD.shelfjars = (T, g) => {
    const jar = (lft, w, hh, col, lid) => h('div', { key: 'j' + lft, style: { position: 'absolute', left: lft + 'px', bottom: '7px', width: w + 'px', height: hh + 'px', borderRadius: '5px', background: `linear-gradient(180deg, ${col} 40%, ${sh(col, -.1)})`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.55)' } },
      h('span', { style: { position: 'absolute', left: '2px', top: '-5px', right: '2px', height: '6px', borderRadius: '3px', background: lid } }));
    const node = h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'bar', style: { position: 'absolute', left: '0', bottom: '0', right: '0', height: '7px', borderRadius: '4px', background: sh(T.wood, .05), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.6), 0 3px 6px rgba(140,100,90,.2)' } }),
      jar(6, 18, 22, '#f3c7cf', T.woodD), jar(30, 15, 17, '#f7e3c1', T.clay), jar(51, 17, 25, '#e9b9c3', T.woodD), jar(74, 14, 15, '#fbf0dc', T.clay)
    ]);
    return [onWallL('ksj', 178, 104, 94, 34, node)];
  };

  KD.potrack = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'rail', style: { position: 'absolute', left: '0', top: '3px', right: '0', height: '5px', borderRadius: '3px', background: sh(T.woodD, .05), boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,.5)' } }),
      h('div', { key: 'pot', style: { position: 'absolute', left: '13px', top: '8px', width: '3px', height: '9px', background: sh(T.woodD, -.1) } }),
      h('div', { key: 'potb', style: { position: 'absolute', left: '2px', top: '16px', width: '26px', height: '16px', borderRadius: '4px 4px 9px 9px', background: `radial-gradient(circle at 38% 28%, ${sh(T.clay, .18)}, ${T.clay})`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.4)' } }),
      h('div', { key: 'pan', style: { position: 'absolute', left: '52px', top: '8px', width: '3px', height: '13px', background: sh(T.woodD, -.1) } }),
      h('div', { key: 'panb', style: { position: 'absolute', left: '42px', top: '20px', width: '24px', height: '11px', borderRadius: '3px 3px 10px 10px', background: 'radial-gradient(circle at 40% 25%, #8a7a70, #64564d)' } }),
      h('div', { key: 'lad', style: { position: 'absolute', left: '88px', top: '8px', width: '3px', height: '11px', background: sh(T.woodD, -.1) } }),
      h('div', { key: 'ladb', style: { position: 'absolute', left: '82px', top: '18px', width: '15px', height: '13px', borderRadius: '50%', background: '#e9dcc3', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.6), inset -2px -2px 3px rgba(150,130,100,.4)' } })
    ]);
    return [onWallR('kpr', 118, 124, 104, 36, node)];
  };

  KD.island = (T, g) => [].concat(
    box('kiB', { x: 112, y: 98, w: 76, d: 50, ht: 46, r: 8, c: T.clay, ghost: g }),
    box('kiT', { x: 106, y: 94, w: 88, d: 58, ht: 7, r: 9, z0: 46, c: T.woodL, ghost: g }),
    g ? [] : [face('kiTw', { x: 118, y: 152, w: 18, hh: 26, tf: 'translateZ(44px) rotateX(-90deg)', bg: '#fffdf4', r: '0 0 6px 6px', soft: 'inset -2px -3px 4px rgba(190,160,150,.4)' })]
  );

  KD.stools = (T, g) => {
    const st = (k, x, y) => [].concat(
      box(k + 'l1', { x: x + 3, y: y + 3, w: 4, d: 4, ht: 24, r: 2, c: T.woodD, ghost: g }),
      box(k + 'l2', { x: x + 21, y: y + 3, w: 4, d: 4, ht: 24, r: 2, c: T.woodD, ghost: g }),
      box(k + 'l3', { x: x + 3, y: y + 19, w: 4, d: 4, ht: 24, r: 2, c: T.woodD, ghost: g }),
      puck(k + 's', { x, y, w: 29, d: 27, ht: 7, z0: 24, c: T.accent, ghost: g })
    );
    return [].concat(st('kst1', 118, 168), st('kst2', 160, 168));
  };

  KD.dining = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 6, d: 6, ht: 30, r: 3, c: T.woodD, ghost: g });
    return [].concat(leg('kd1', 52, 206), leg('kd2', 84, 206), leg('kd3', 52, 234), leg('kd4', 84, 234),
      puck('kdT', { x: 38, y: 194, w: 66, d: 58, ht: 8, z0: 30, c: T.woodL, ghost: g }));
  };

  KD.chairs = (T, g) => {
    const ch = (k, x, y, backY) => [].concat(
      box(k + 'b', { x, y: backY, w: 30, d: 7, ht: 34, r: 7, z0: 16, c: T.clay, ghost: g }),
      puck(k + 's', { x: x - 2, y, w: 34, d: 30, ht: 7, z0: 20, c: T.clayL, ghost: g }),
      box(k + 'l1', { x: x + 2, y: y + 4, w: 4, d: 4, ht: 20, r: 2, c: T.woodD, ghost: g }),
      box(k + 'l2', { x: x + 24, y: y + 4, w: 4, d: 4, ht: 20, r: 2, c: T.woodD, ghost: g })
    );
    return [].concat(ch('kcA', 56, 158, 152), ch('kcB2', 56, 258, 288));
  };

  KD.cakestand = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '46px', height: '46px' }, gf(g)) }, [
      h('span', { key: 'pl', style: { position: 'absolute', left: '3px', bottom: '6px', width: '40px', height: '8px', borderRadius: '50%', background: '#fffdf4', boxShadow: 'inset 2px 2px 2px rgba(255,255,255,.9), inset -2px -3px 3px rgba(190,160,150,.5)' } }),
      h('span', { key: 'st', style: { position: 'absolute', left: '20px', bottom: '0', width: '6px', height: '8px', borderRadius: '2px', background: '#f0e4d4' } }),
      h('span', { key: 'ck', style: { position: 'absolute', left: '10px', bottom: '11px', width: '26px', height: '18px', borderRadius: '8px 8px 4px 4px', background: `linear-gradient(180deg, #fdf3ea 42%, ${T.clay} 42%)`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.6)' } }),
      h('span', { key: 'ch', style: { position: 'absolute', left: '20px', bottom: '28px', width: '7px', height: '7px', borderRadius: '50%', background: '#d9534f' } })
    ]);
    return [sprite('kcs', 150, 120, 53, node)];
  };

  KD.kettle = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '34px', height: '32px' }, gf(g)) }, [
      h('span', { key: 'b', style: { position: 'absolute', left: '4px', bottom: '0', width: '24px', height: '20px', borderRadius: '46% 46% 40% 40%', background: `radial-gradient(circle at 38% 28%, ${sh(T.accent2, .22)}, ${T.accent2})`, boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.5), inset -3px -3px 5px rgba(0,0,0,.12)' } }),
      h('span', { key: 'h', style: { position: 'absolute', left: '9px', bottom: '16px', width: '14px', height: '8px', borderRadius: '8px 8px 0 0', border: '3px solid ' + sh(T.accent2, -.2), borderBottom: 'none' } }),
      h('span', { key: 's', style: { position: 'absolute', left: '25px', bottom: '10px', width: '9px', height: '6px', borderRadius: '3px', background: T.accent2, transform: 'rotate(-28deg)' } }),
      g ? null : steam('kstm', 24, -12, .9)
    ].filter(Boolean));
    return [sprite('kke', 208, 24, 59, node)];
  };

  KD.chalkboard = (T, g) => onWallR('kcb', 42, 96, 62, 54,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '9px', background: sh(T.wood, .05), boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.55), 0 4px 8px rgba(140,100,90,.18)' }, gf(g)) },
      h('div', { style: { position: 'absolute', inset: '6px', borderRadius: '6px', background: '#5d6b5d', boxShadow: 'inset -2px -2px 5px rgba(0,0,0,.3)' } }, [
        h('span', { key: 't', style: { position: 'absolute', left: '7px', top: '6px', fontFamily: '"Fredoka",sans-serif', fontSize: '9px', fontWeight: 500, color: '#f7f1dc', letterSpacing: '.5px' } }, 'menu ♡'),
        h('span', { key: 'l1', style: { position: 'absolute', left: '7px', top: '22px', width: '30px', height: '2px', borderRadius: '1px', background: 'rgba(247,241,220,.65)' } }),
        h('span', { key: 'l2', style: { position: 'absolute', left: '7px', top: '29px', width: '38px', height: '2px', borderRadius: '1px', background: 'rgba(247,241,220,.5)' } }),
        h('span', { key: 'l3', style: { position: 'absolute', left: '7px', top: '36px', width: '24px', height: '2px', borderRadius: '1px', background: 'rgba(247,241,220,.5)' } })
      ])));

  KD.hangplant = (T, g) => {
    // one trailing vine: a slim stem with small ivy leaves alternating down it
    const leaf = (col, rot) => h('span', { style: { display: 'block', width: '11px', height: '10px', margin: '-1.5px 0', borderRadius: '62% 62% 60% 40% / 66% 66% 40% 40%', background: `radial-gradient(circle at 38% 28%, ${sh(col, .24)}, ${col})`, boxShadow: 'inset -1px -1px 2px rgba(0,0,0,.14)', transform: `rotate(${rot}deg)` } });
    const cols = ['#8fa070', '#7e9660', '#94aa72'];
    const vine = (lft, top, n, tilt, dl) => h('div', { key: 'v' + lft, style: { position: 'absolute', left: lft + 'px', top: top + 'px', width: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: '50% 0', transform: `rotate(${tilt}deg)`, animation: g ? 'none' : `sway ${4.4 + dl}s ease-in-out ${dl}s infinite` } },
      [h('span', { key: 's', style: { width: '2.5px', height: '7px', background: '#6f8a55', borderRadius: '2px' } })].concat(
        Array.from({ length: n }, (_, i) => leaf(cols[i % cols.length], i % 2 ? 24 : -24))));
    const node = h('div', { style: Object.assign({ position: 'relative', width: '58px', height: '96px' }, gf(g)) }, [
      // macramé hanger cords up to the arm
      h('span', { key: 'c1', style: { position: 'absolute', left: '15px', top: '0', width: '2px', height: '20px', background: '#cbb896', transform: 'rotate(15deg)', transformOrigin: '50% 0', borderRadius: '2px' } }),
      h('span', { key: 'c2', style: { position: 'absolute', left: '43px', top: '0', width: '2px', height: '20px', background: '#cbb896', transform: 'rotate(-15deg)', transformOrigin: '50% 0', borderRadius: '2px' } }),
      // terracotta pot (clearly a pot, with a rim)
      h('span', { key: 'pot', style: { position: 'absolute', left: '15px', top: '16px', width: '28px', height: '19px', borderRadius: '6px 6px 13px 13px', background: 'radial-gradient(circle at 38% 25%, #d99e79, #bd7d5a)', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.4), inset -3px -4px 6px rgba(120,70,45,.25)' } },
        h('span', { style: { position: 'absolute', left: '-2px', top: '-3px', right: '-2px', height: '8px', borderRadius: '5px', background: '#cf8f6f', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.45)' } })),
      // trailing ivy cascading from the pot
      vine(15, 32, 7, -14, 0), vine(24, 34, 8, 0, .5), vine(34, 32, 7, 14, 1)
    ]);
    const els = [].concat(
      box('khs', { x: 262, y: 218, w: 8, d: 8, ht: 92, r: 4, c: T.woodD, ghost: g }),
      box('kha', { x: 238, y: 220, w: 32, d: 5, ht: 5, r: 3, z0: 92, c: T.woodD, ghost: g }),
      puck('khb', { x: 252, y: 208, w: 28, d: 26, ht: 5, c: T.woodD, ghost: g })
    );
    els.push(sprite('khp', 249, 224, 6, node));
    return els;
  };

  const KITCHEN_FURN = [
    { key: 'window', label: 'Arched Window', icon: '🪟', cx: 24, cy: 98, fw: 40, fd: 110, bx: 64, by: 100, wall: true, fx: 98, fy: -117 },
    { key: 'mat', label: 'Checker Mat', icon: '🧶', cx: 150, cy: 210, fw: 132, fd: 108, bx: 150, by: 210, flat: true },
    { key: 'fridge', label: 'Round Fridge', icon: '🧊', cx: 265, cy: 29, fw: 48, fd: 44, bx: 262, by: 78, sdy: 48 },
    { key: 'stove', label: 'Little Stove', icon: '🍳', cx: 207, cy: 29, fw: 60, fd: 44, bx: 207, by: 78, sdy: 20 },
    { key: 'sink', label: 'Farm Sink', icon: '🫧', cx: 142, cy: 29, fw: 62, fd: 44, bx: 142, by: 78, sdy: 20 },
    { key: 'counter', label: 'Prep Counter', icon: '🔪', cx: 73, cy: 29, fw: 64, fd: 44, bx: 73, by: 78, sdy: 20 },
    { key: 'shelfjars', label: 'Jam Jar Shelf', icon: '🍯', cx: 24, cy: 225, fw: 36, fd: 96, bx: 60, by: 226, wall: true, fx: 225, fy: -121 },
    { key: 'potrack', label: 'Pot Rack', icon: '🍲', cx: 170, cy: 22, fw: 104, fd: 30, bx: 170, by: 78, wall: true, fx: 170, fy: -142 },
    { key: 'island', label: 'Baking Island', icon: '🧁', cx: 150, cy: 123, fw: 88, fd: 60, bx: 150, by: 210, sdy: 16 },
    { key: 'stools', label: 'Berry Stools', icon: '🍓', cx: 147, cy: 182, fw: 76, fd: 30, bx: 147, by: 214, sdy: 8 },
    { key: 'dining', label: 'Breakfast Table', icon: '🥐', cx: 71, cy: 223, fw: 66, fd: 60, bx: 116, by: 226, sdy: 10 },
    { key: 'chairs', label: 'Café Chairs', icon: '🪑', cx: 71, cy: 223, fw: 70, fd: 130, bx: 116, by: 260, sdy: 12 },
    { key: 'cakestand', label: 'Cake Stand', icon: '🍰', cx: 150, cy: 121, fw: 46, fd: 30, bx: 150, by: 210, sdy: 46 },
    { key: 'kettle', label: 'Copper Kettle', icon: '🫖', cx: 208, cy: 25, fw: 34, fd: 26, bx: 208, by: 78, sdy: 48 },
    { key: 'chalkboard', label: 'Menu Chalkboard', icon: '📋', cx: 73, cy: 20, fw: 60, fd: 28, bx: 73, by: 78, wall: true, fx: 73, fy: -123 },
    { key: 'hangplant', label: 'Trailing Ivy', icon: '🌿', cx: 266, cy: 224, fw: 40, fd: 38, bx: 240, by: 250, sdy: 40 }
  ];

  // ================================================================ BEDROOM =
  const BD = {};

  BD.rug = (T, g) => puck('brug', { x: 84, y: 148, w: 148, d: 128, ht: 3.5, c: T.rug, ghost: g });

  BD.bed = (T, g) => [].concat(
    box('bbF', { x: 28, y: 30, w: 98, d: 160, ht: 15, r: 9, c: T.wood, ghost: g }),
    box('bbH', { x: 28, y: 24, w: 98, d: 13, ht: 46, r: 10, c: T.clay, ghost: g }),
    box('bbM', { x: 33, y: 40, w: 88, d: 146, ht: 13, r: 10, z0: 15, cols: g ? null : ['#fdfaf1', '#efe8d8', '#e0d6c0'], c: '#fdfaf1', ghost: g }),
    box('bbD', { x: 30, y: 96, w: 94, d: 94, ht: 13, r: 12, z0: 21, c: T.clayL, ghost: g }),
    box('bbP1', { x: 40, y: 46, w: 34, d: 20, ht: 9, r: 9, z0: 28, cols: g ? null : ['#fffdf4', '#f2ecdc', '#e5dcc6'], c: '#fffdf4', ghost: g }),
    box('bbP2', { x: 80, y: 46, w: 34, d: 20, ht: 9, r: 9, z0: 28, c: T.accent2, ghost: g })
  );

  BD.nightstand = (T, g) => {
    const els = [].concat(
      box('bnB', { x: 138, y: 26, w: 42, d: 40, ht: 32, r: 7, c: T.wood, ghost: g }),
      box('bnL1', { x: 141, y: 30, w: 4, d: 4, ht: 6, r: 2, z0: -6, c: T.woodD, ghost: g })
    );
    if (!g) {
      els.push(face('bnd', { x: 143, y: 66, w: 32, hh: 16, tf: 'translateZ(26px) rotateX(-90deg)', bg: sh(T.wood, .1), r: 5, soft: 'inset 2px 2px 3px rgba(255,255,255,.5), inset -2px -2px 4px rgba(140,120,90,.25)' }));
      els.push(face('bnk', { x: 156, y: 66, w: 6, hh: 6, tf: 'translateZ(21px) rotateX(-90deg)', bg: T.gold, r: '50%', soft: 'none' }));
    }
    return els;
  };

  BD.moonlamp = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '34px', height: '42px' }, gf(g)) }, [
      h('span', { key: 'gl', style: { position: 'absolute', left: '-3px', top: '-4px', width: '40px', height: '34px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,238,180,.6), rgba(255,238,180,0) 70%)', animation: g ? 'none' : 'glowpulse 3.6s ease-in-out infinite' } }),
      h('span', { key: 'm', style: { position: 'absolute', left: '5px', top: '2px', width: '22px', height: '22px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 35%, #ffedb3, #f2cf6e)', boxShadow: '0 0 12px 3px rgba(255,232,160,.75)' } }),
      h('span', { key: 'mc', style: { position: 'absolute', left: '1px', top: '0px', width: '17px', height: '17px', borderRadius: '50%', background: T.wallIn, opacity: .96 } }),
      h('span', { key: 'st', style: { position: 'absolute', left: '14px', bottom: '4px', width: '5px', height: '10px', borderRadius: '2px', background: T.woodD } }),
      h('span', { key: 'ba', style: { position: 'absolute', left: '8px', bottom: '0', width: '17px', height: '5px', borderRadius: '50%', background: T.woodD } })
    ]);
    return [sprite('bml', 159, 44, 32, node)];
  };

  BD.wardrobe = (T, g) => {
    const els = [].concat(
      box('bwB', { x: 198, y: 8, w: 84, d: 40, ht: 142, r: 11, c: T.clay, ghost: g }),
      box('bwT', { x: 195, y: 6, w: 90, d: 44, ht: 7, r: 8, z0: 142, c: sh(T.clay, .08), ghost: g })
    );
    if (!g) {
      els.push(face('bwl', { x: 239, y: 48, w: 2.5, hh: 128, tf: 'translateZ(140px) rotateX(-90deg)', bg: 'rgba(90,80,120,.25)', r: 2, soft: 'none' }));
      els.push(face('bwk1', { x: 231, y: 48, w: 5, hh: 14, tf: 'translateZ(92px) rotateX(-90deg)', bg: T.gold, r: 3, soft: 'none' }));
      els.push(face('bwk2', { x: 244, y: 48, w: 5, hh: 14, tf: 'translateZ(92px) rotateX(-90deg)', bg: T.gold, r: 3, soft: 'none' }));
      els.push(face('bwm', { x: 206, y: 48, w: 20, hh: 46, tf: 'translateZ(128px) rotateX(-90deg)', bg: `radial-gradient(circle at 40% 30%, ${sh(T.accent, .16)}, ${T.accent})`, r: '10px', soft: 'inset 2px 2px 3px rgba(255,255,255,.5)' }));
    }
    return els;
  };

  BD.vanity = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 6, d: 6, ht: 34, r: 3, c: T.woodD, ghost: g });
    const els = [].concat(
      leg('bv1', 30, 214), leg('bv2', 82, 214), leg('bv3', 30, 250), leg('bv4', 82, 250),
      box('bvT', { x: 24, y: 208, w: 70, d: 54, ht: 7, r: 8, z0: 34, c: T.woodL, ghost: g })
    );
    if (!g) {
      const stuff = h('div', { style: { position: 'relative', width: '30px', height: '22px' } }, [
        h('span', { key: 'p1', style: { position: 'absolute', left: '0', bottom: '0', width: '9px', height: '13px', borderRadius: '3px 3px 4px 4px', background: T.accent2 } }),
        h('span', { key: 'p1t', style: { position: 'absolute', left: '3px', bottom: '12px', width: '3px', height: '5px', background: T.gold, borderRadius: '2px' } }),
        h('span', { key: 'p2', style: { position: 'absolute', left: '13px', bottom: '0', width: '12px', height: '9px', borderRadius: '50% 50% 4px 4px', background: '#f3e3f2' } })
      ]);
      els.push(sprite('bvs', 62, 226, 41, stuff));
    }
    return els;
  };

  BD.mirror = (T, g) => onWallL('bmr', 210, 78, 56, 70,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'f', style: { position: 'absolute', inset: '0', borderRadius: '50%', background: `linear-gradient(145deg, ${sh(T.gold, .18)}, ${T.gold})`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.6), 0 4px 9px rgba(110,95,140,.22)' } }),
      h('div', { key: 'g2', style: { position: 'absolute', inset: '6px', borderRadius: '50%', background: 'linear-gradient(135deg, #fdfbf3 20%, #e9e3f2 55%, #d8d0ea)', boxShadow: 'inset -2px -3px 6px rgba(140,125,170,.35)' } },
        h('span', { style: { position: 'absolute', left: '22%', top: '18%', width: '9px', height: '18px', borderRadius: '50%', background: 'rgba(255,255,255,.85)', transform: 'rotate(24deg)' } }))
    ]));

  BD.stool = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 5, d: 5, ht: 22, r: 2, c: T.woodD, ghost: g });
    return [].concat(leg('bs1', 106, 222), leg('bs2', 126, 222), leg('bs3', 106, 240), leg('bs4', 126, 240),
      puck('bsT', { x: 100, y: 216, w: 38, d: 34, ht: 9, z0: 22, c: T.accent2, ghost: g }));
  };

  BD.garland = (T, g) => onWallR('bgl', 46, 138, 210, 34,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'w1', style: { position: 'absolute', left: '0', top: '2px', width: '104px', height: '22px', borderRadius: '0 0 50% 50%', borderBottom: '2.5px solid ' + sh(T.gold, -.1), boxSizing: 'border-box' } }),
      h('div', { key: 'w2', style: { position: 'absolute', left: '102px', top: '2px', width: '104px', height: '22px', borderRadius: '0 0 50% 50%', borderBottom: '2.5px solid ' + sh(T.gold, -.1), boxSizing: 'border-box' } }),
      [12, 46, 82, 116, 152, 188].map((lft, i) => h('span', { key: 's' + i, style: { position: 'absolute', left: lft + 'px', top: i % 2 ? '16px' : '22px', fontFamily: '"Fredoka",sans-serif', fontSize: '13px', color: i % 2 ? T.gold : T.accent2, animation: g ? 'none' : `twinkle ${2 + (i % 3)}s ease-in-out ${i * .4}s infinite` } }, '✦'))
    ]));

  BD.window = (T, g) => onWallL('bwin', 78, 88, 82, 82,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'fr', style: { position: 'absolute', inset: '0', borderRadius: '50%', background: '#fffdf4', boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.8), inset -3px -4px 8px rgba(170,160,190,.5), 0 3px 8px rgba(110,95,140,.2)' } }),
      h('div', { key: 'sky', style: { position: 'absolute', inset: '8px', borderRadius: '50%', background: 'linear-gradient(160deg, #8d86c4 10%, #6f68a8 60%, #5d5694)', overflow: 'hidden', boxShadow: g ? 'none' : 'inset 0 0 14px rgba(40,34,80,.5)' } }, [
        h('span', { key: 'mo', style: { position: 'absolute', right: '17%', top: '16%', width: '18px', height: '18px', borderRadius: '50%', background: '#ffedb3', boxShadow: '0 0 12px 4px rgba(255,237,179,.55)' } }),
        [[20, 58], [38, 30], [58, 66], [14, 34], [66, 22]].map((p, i) => h('span', { key: 'st' + i, style: { position: 'absolute', left: p[0] + '%', top: p[1] + '%', width: '3px', height: '3px', borderRadius: '50%', background: '#f5efd8', animation: g ? 'none' : `twinkle ${1.8 + i * .5}s ease-in-out ${i * .55}s infinite` } }))
      ]),
      h('div', { key: 'bar', style: { position: 'absolute', left: '50%', top: '8px', bottom: '8px', width: '4px', marginLeft: '-2px', background: '#fffdf4', borderRadius: '2px' } })
    ]));

  BD.bookcandle = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '42px', height: '38px' }, gf(g)) }, [
      h('span', { key: 'b1', style: { position: 'absolute', left: '0', bottom: '0', width: '34px', height: '9px', borderRadius: '3px', background: T.clay, boxShadow: 'inset 2px 2px 2px rgba(255,255,255,.4)' } }),
      h('span', { key: 'b2', style: { position: 'absolute', left: '3px', bottom: '9px', width: '30px', height: '8px', borderRadius: '3px', background: T.accent2, transform: 'rotate(-3deg)' } }),
      h('span', { key: 'b3', style: { position: 'absolute', left: '1px', bottom: '17px', width: '31px', height: '8px', borderRadius: '3px', background: T.gold, transform: 'rotate(2deg)' } }),
      h('span', { key: 'c', style: { position: 'absolute', left: '10px', bottom: '25px', width: '9px', height: '13px', borderRadius: '3px', background: '#fdf8ea' } }),
      h('span', { key: 'fl', style: { position: 'absolute', left: '12.5px', bottom: '37px', width: '4px', height: '7px', borderRadius: '50% 50% 40% 40%', background: 'radial-gradient(circle at 50% 70%, #ffd27a, #f2a24b)', boxShadow: '0 0 8px 2px rgba(255,210,122,.7)', animation: g ? 'none' : 'glowpulse 1.6s ease-in-out infinite' } })
    ]);
    return [sprite('bbc', 198, 246, 0, node), g ? null : shadowOval('bbcs', 198, 247, 36, 16, .16)].filter(Boolean);
  };

  BD.plush = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '34px', height: '34px' }, gf(g)) }, [
      h('span', { key: 'e1', style: { position: 'absolute', left: '5px', top: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#d9b894' } }),
      h('span', { key: 'e2', style: { position: 'absolute', left: '19px', top: '1px', width: '10px', height: '10px', borderRadius: '50%', background: '#d9b894' } }),
      h('span', { key: 'hd', style: { position: 'absolute', left: '5px', top: '5px', width: '24px', height: '20px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 30%, #ecd2ae, #d9b894)', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5)' } }),
      h('span', { key: 'bd', style: { position: 'absolute', left: '3px', top: '19px', width: '28px', height: '15px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 30%, #ecd2ae, #d9b894)' } }),
      h('span', { key: 'y1', style: { position: 'absolute', left: '12px', top: '12px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#5c4a38' } }),
      h('span', { key: 'y2', style: { position: 'absolute', left: '20px', top: '12px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#5c4a38' } }),
      h('span', { key: 'mz', style: { position: 'absolute', left: '14.5px', top: '15px', width: '5px', height: '4px', borderRadius: '50%', background: '#f7ead2' } })
    ]);
    return [sprite('bpl', 74, 150, 34, node)];
  };

  BD.shelf = (T, g) => onWallR('bsh', 62, 96, 88, 34,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'bar', style: { position: 'absolute', left: '0', bottom: '0', right: '0', height: '7px', borderRadius: '4px', background: sh(T.wood, .05), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.6), 0 3px 6px rgba(110,95,140,.2)' } }),
      h('span', { key: 'p1', style: { position: 'absolute', left: '8px', bottom: '7px', width: '12px', height: '16px', borderRadius: '4px 4px 5px 5px', background: T.accent2 } }),
      h('span', { key: 'p2', style: { position: 'absolute', left: '26px', bottom: '7px', width: '10px', height: '11px', borderRadius: '50% 50% 4px 4px', background: T.accent } }),
      h('span', { key: 'p3', style: { position: 'absolute', left: '44px', bottom: '7px', width: '15px', height: '13px', borderRadius: '4px', background: '#fdf8ea', boxShadow: 'inset -1px -1px 2px rgba(170,160,190,.5)' } }),
      h('span', { key: 'p4', style: { position: 'absolute', left: '66px', bottom: '8px', fontFamily: '"Fredoka",sans-serif', fontSize: '13px', color: T.gold } }, '✦')
    ]));

  BD.basket = (T, g) => {
    const els = [].concat(puck('bbk', { x: 248, y: 122, w: 44, d: 40, ht: 26, c: T.wood, ghost: g }));
    if (!g) {
      els.push(h('div', { key: 'bbkT', style: { position: 'absolute', left: '253px', top: '126px', width: '34px', height: '31px', transform: 'translateZ(26.5px)', borderRadius: '50%', background: `radial-gradient(circle at 45% 40%, ${sh(T.wood, -.28)}, ${sh(T.wood, -.4)})`, boxShadow: 'inset 0 3px 6px rgba(0,0,0,.35)' } }));
      els.push(h('div', { key: 'bbkC', style: { position: 'absolute', left: '258px', top: '128px', width: '20px', height: '14px', transform: 'translateZ(27px)', borderRadius: '50% 50% 40% 60%', background: T.accent2, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5)' } }));
    }
    return els;
  };

  BD.slippers = (T, g) => [].concat(
    puck('bsl1', { x: 136, y: 148, w: 13, d: 22, ht: 3, c: T.accent2, ghost: g }),
    puck('bsl2', { x: 153, y: 150, w: 13, d: 22, ht: 3, c: T.accent2, ghost: g })
  );

  BD.fairylights = (T, g) => onWallL('bfl', 172, 150, 118, 26,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'w', style: { position: 'absolute', left: '0', top: '0', width: '118px', height: '18px', borderRadius: '0 0 50% 50%', borderBottom: '2px solid rgba(120,110,150,.5)', boxSizing: 'border-box' } }),
      [8, 30, 52, 74, 96, 112].map((lft, i) => h('span', { key: 'b' + i, style: { position: 'absolute', left: lft + 'px', top: i === 0 || i === 5 ? '8px' : '15px', width: '7px', height: '7px', borderRadius: '50%', background: ['#ffe9ae', T.accent2, '#ffe9ae', T.accent, '#ffe9ae', T.accent2][i], boxShadow: '0 0 8px 2px rgba(255,233,174,.75)', animation: g ? 'none' : `glowpulse ${1.4 + (i % 3) * .5}s ease-in-out ${i * .3}s infinite` } }))
    ]));

  const BEDROOM_FURN = [
    { key: 'window', label: 'Moon Window', icon: '🌙', cx: 24, cy: 119, fw: 40, fd: 86, bx: 64, by: 120, wall: true, fx: 119, fy: -129 },
    { key: 'rug', label: 'Round Rug', icon: '🧶', cx: 158, cy: 212, fw: 148, fd: 128, bx: 158, by: 212, flat: true },
    { key: 'bed', label: 'Dream Bed', icon: '🛏', cx: 77, cy: 108, fw: 100, fd: 168, bx: 145, by: 120, sdy: 10 },
    { key: 'nightstand', label: 'Nightstand', icon: '🕯', cx: 159, cy: 46, fw: 44, fd: 42, bx: 162, by: 92, sdy: 12 },
    { key: 'moonlamp', label: 'Moon Lamp', icon: '🌛', cx: 159, cy: 44, fw: 34, fd: 28, bx: 162, by: 92, sdy: 44 },
    { key: 'wardrobe', label: 'Wardrobe', icon: '🚪', cx: 240, cy: 28, fw: 88, fd: 46, bx: 240, by: 80, sdy: 58 },
    { key: 'vanity', label: 'Vanity Desk', icon: '🎀', cx: 59, cy: 235, fw: 72, fd: 56, bx: 59, by: 290, sdy: 14 },
    { key: 'mirror', label: 'Oval Mirror', icon: '🪞', cx: 24, cy: 238, fw: 36, fd: 58, bx: 59, by: 290, wall: true, fx: 238, fy: -113 },
    { key: 'stool', label: 'Vanity Stool', icon: '🪑', cx: 119, cy: 234, fw: 40, fd: 36, bx: 122, by: 270, sdy: 8 },
    { key: 'garland', label: 'Star Garland', icon: '✨', cx: 150, cy: 20, fw: 200, fd: 30, bx: 150, by: 70, wall: true, fx: 151, fy: -155 },
    { key: 'fairylights', label: 'Fairy Lights', icon: '💡', cx: 24, cy: 230, fw: 30, fd: 110, bx: 70, by: 200, wall: true, fx: 231, fy: -163 },
    { key: 'shelf', label: 'Trinket Shelf', icon: '🫙', cx: 106, cy: 20, fw: 86, fd: 28, bx: 106, by: 70, wall: true, fx: 106, fy: -113 },
    { key: 'plush', label: 'Bear Plush', icon: '🧸', cx: 74, cy: 150, fw: 34, fd: 26, bx: 140, by: 160, sdy: 34 },
    { key: 'bookcandle', label: 'Bedtime Books', icon: '📖', cx: 198, cy: 246, fw: 40, fd: 26, bx: 224, by: 264, sdy: 10 },
    { key: 'basket', label: 'Laundry Basket', icon: '🧺', cx: 270, cy: 142, fw: 46, fd: 42, bx: 262, by: 190, sdy: 10 },
    { key: 'slippers', label: 'Bunny Slippers', icon: '🥿', cx: 151, cy: 160, fw: 34, fd: 40, bx: 180, by: 170 }
  ];

  // ====================================================== UPCOMING ROOMS ====
  // Text catalogs (for PRD / notebook previews) + one hero illustration each.
  const CATALOGS = {
    cafe: ['Menu Chalkboard 📋', 'Espresso Machine ☕', 'Pastry Display 🥐', 'Coffee Bar Counter 🍮', 'Bar Stools 🪑', 'Bistro Table 🥯', 'Bistro Chairs 🪑', 'Pendant Lights 💡', 'Bean Shelf 🫘', 'Cake Stand 🍰', 'Window Booth 🪟', 'Striped Awning 🎪', 'Register & Tip Jar 🫙', 'Milk Cart 🥛', 'Hanging Ferns 🌿', "Soft 'open' Sign ✨"],
    beach: ['Woven Beach Rug 🧶', 'Window to the Sea 🌊', 'Hammock 🏖', 'Surfboard 🏄', 'Shell Shelf 🐚', 'Driftwood Desk 🪵', 'Rattan Chair 🪑', 'Beach Umbrella ⛱', 'Palm Plant 🌴', 'Rope Lanterns 🏮', 'Tide Clock 🕰', 'Coral Vase 🪸', 'Picnic Cooler 🧺', 'Starfish Wall Art ⭐', 'Bucket & Spade 🏰', 'Towel Stack 🧻'],
    forest: ['Mossy Rug 🌿', 'Stone Fireplace 🔥', 'Log Stack 🪵', 'Forest Window 🌲', 'Log Bench 🪑', 'Stump Side Table 🍄', 'Mushroom Lamp 🍄', 'Quilted Armchair 🛋', 'Pinecone Garland 🌰', 'Acorn Shelf 🐿', 'Herb Drying Rack 🌾', 'Storm Lantern 🏮', 'Bear Plush 🧸', 'Tea Cauldron 🫖', 'Woven Basket 🧺', 'Star Skylight ✨']
  };

  const heroes = {
    cafe: (T) => h('div', { style: { position: 'relative', width: '120px', height: '96px' } }, [
      h('span', { key: 'c', style: { position: 'absolute', left: '8px', bottom: '0', width: '104px', height: '42px', borderRadius: '12px', background: `linear-gradient(160deg, ${sh(T.clay, .14)}, ${T.clay})`, boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.5), inset -4px -5px 8px rgba(0,0,0,.08)' } }),
      h('span', { key: 'm', style: { position: 'absolute', left: '22px', bottom: '40px', width: '38px', height: '34px', borderRadius: '9px', background: 'linear-gradient(160deg, #fbf3ea, #ecd9c8)', boxShadow: 'inset 2px 2px 4px rgba(255,255,255,.7), inset -3px -3px 5px rgba(160,120,90,.25)' } }),
      h('span', { key: 'sp', style: { position: 'absolute', left: '34px', bottom: '34px', width: '13px', height: '7px', borderRadius: '0 0 6px 6px', background: '#a98457' } }),
      h('span', { key: 'cup', style: { position: 'absolute', left: '35px', bottom: '26px', width: '11px', height: '8px', borderRadius: '2px 2px 5px 5px', background: '#fffdf4' } }),
      h('span', { key: 'aw1', style: { position: 'absolute', left: '66px', bottom: '58px', width: '46px', height: '15px', borderRadius: '8px 8px 10px 10px', background: `repeating-linear-gradient(90deg, ${T.accent2} 0 11px, #fdf6e2 11px 22px)`, boxShadow: 'inset 0 -3px 4px rgba(0,0,0,.1)' } }),
      h('span', { key: 'cs', style: { position: 'absolute', left: '72px', bottom: '40px', width: '32px', height: '18px', borderRadius: '7px 7px 3px 3px', background: 'linear-gradient(180deg, #fdf3ea 45%, ' + T.accent2 + ' 45%)' } }),
      h('span', { key: 'ch', style: { position: 'absolute', left: '84px', bottom: '56px', width: '6px', height: '6px', borderRadius: '50%', background: '#d9534f' } })
    ]),
    beach: (T) => h('div', { style: { position: 'relative', width: '120px', height: '96px' } }, [
      h('span', { key: 'sand', style: { position: 'absolute', left: '0', bottom: '0', width: '120px', height: '22px', borderRadius: '12px', background: 'linear-gradient(160deg, #f3e2c2, #e5cfa5)' } }),
      h('span', { key: 'um1', style: { position: 'absolute', left: '58px', bottom: '18px', width: '4px', height: '52px', borderRadius: '2px', background: T.woodD, transform: 'rotate(6deg)' } }),
      h('span', { key: 'um2', style: { position: 'absolute', left: '30px', bottom: '58px', width: '64px', height: '30px', borderRadius: '50% 50% 12% 12%', background: `repeating-linear-gradient(90deg, ${T.clay} 0 13px, #fdfaf0 13px 26px)`, boxShadow: 'inset 3px 4px 6px rgba(255,255,255,.5), inset -4px -5px 7px rgba(0,0,0,.1)', transform: 'rotate(6deg)' } }),
      h('span', { key: 'sb', style: { position: 'absolute', left: '10px', bottom: '10px', width: '22px', height: '62px', borderRadius: '50% 50% 42% 42%', background: `linear-gradient(180deg, ${sh(T.clay, .2)}, ${T.clay})`, boxShadow: 'inset 2px 3px 5px rgba(255,255,255,.6)', transform: 'rotate(9deg)' } }),
      h('span', { key: 'sbl', style: { position: 'absolute', left: '19px', bottom: '16px', width: '3px', height: '46px', borderRadius: '2px', background: 'rgba(255,255,255,.75)', transform: 'rotate(9deg)' } }),
      h('span', { key: 'sh1', style: { position: 'absolute', left: '92px', bottom: '8px', width: '16px', height: '13px', borderRadius: '50% 50% 6px 6px', background: T.accent2, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.6)' } })
    ]),
    forest: (T) => h('div', { style: { position: 'relative', width: '120px', height: '96px' } }, [
      h('span', { key: 'hearth', style: { position: 'absolute', left: '24px', bottom: '0', width: '72px', height: '54px', borderRadius: '14px 14px 6px 6px', background: `linear-gradient(160deg, ${sh(T.clay, .16)}, ${T.clay})`, boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.4), inset -4px -5px 8px rgba(0,0,0,.12)' } }),
      h('span', { key: 'mant', style: { position: 'absolute', left: '18px', bottom: '52px', width: '84px', height: '10px', borderRadius: '6px', background: T.wood, boxShadow: 'inset 0 2px 3px rgba(255,255,255,.5)' } }),
      h('span', { key: 'op', style: { position: 'absolute', left: '40px', bottom: '6px', width: '40px', height: '34px', borderRadius: '18px 18px 4px 4px', background: 'radial-gradient(circle at 50% 80%, #4e4038, #322a24)' } }),
      h('span', { key: 'f1', style: { position: 'absolute', left: '50px', bottom: '9px', width: '20px', height: '24px', borderRadius: '50% 50% 40% 40%', background: 'radial-gradient(circle at 50% 85%, #ffd27a, #f2a24b 60%, #e07840)', boxShadow: '0 0 14px 4px rgba(255,180,90,.6)', animation: 'glowpulse 1.3s ease-in-out infinite' } }),
      h('span', { key: 'log1', style: { position: 'absolute', left: '100px', bottom: '4px', width: '17px', height: '17px', borderRadius: '50%', background: `radial-gradient(circle at 45% 40%, ${sh(T.wood, .25)}, ${T.wood})`, boxShadow: 'inset -2px -2px 3px rgba(0,0,0,.15)' } }),
      h('span', { key: 'log2', style: { position: 'absolute', left: '104px', bottom: '20px', width: '15px', height: '15px', borderRadius: '50%', background: `radial-gradient(circle at 45% 40%, ${sh(T.wood, .2)}, ${sh(T.wood, -.08)})` } }),
      h('span', { key: 'mush', style: { position: 'absolute', left: '4px', bottom: '2px', width: '15px', height: '10px', borderRadius: '8px 8px 3px 3px', background: T.accent2 } }),
      h('span', { key: 'mus2', style: { position: 'absolute', left: '9px', bottom: '0', width: '6px', height: '5px', background: '#fdf8ea', borderRadius: '2px' } })
    ])
  };

  return {
    kitchen: { FURN: KITCHEN_FURN, D: KD },
    bedroom: { FURN: BEDROOM_FURN, D: BD },
    catalogs: CATALOGS,
    heroes
  };
}
