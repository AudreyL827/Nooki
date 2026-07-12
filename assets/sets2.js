// sets2.js — Honey Café, Seaside Study (beach studio) and Cocoa Cabin (forest) furniture sets.
// Same drawing primitives as clay.js; 16 unique pieces per room.
// Usage: const s2 = makeSets2(React, clay) → { cafe:{FURN,D}, beach:{FURN,D}, forest:{FURN,D} }

export function makeSets2(React, clay) {
  const h = React.createElement;
  const { box, puck, sprite, onWallL, onWallR, face, sh, steam, shadowOval, rnd } = clay;
  const gf = (g) => (g ? { filter: 'saturate(0) brightness(.45)', opacity: .3 } : {});

  // ================================================================== CAFÉ ==
  const CD = {};

  CD.mat = (T, g) => box('cmat', {
    x: 76, y: 164, w: 148, d: 74, ht: 4, r: 12, c: T.rug, ghost: g,
    cols: g ? null : [T.rug, sh(T.rug, -.08), sh(T.rug, -.18)],
    topExtra: g ? null : { backgroundImage: `repeating-linear-gradient(90deg, ${sh(T.rug, .16)} 0 14px, rgba(0,0,0,0) 14px 28px)`, borderRadius: '12px' }
  });

  CD.window = (T, g) => {
    const pane = h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'fr', style: { position: 'absolute', inset: '0', borderRadius: '12px', background: '#fffdf4', boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.8), inset -3px -4px 8px rgba(190,168,120,.45), 0 3px 8px rgba(150,116,60,.16)' } },
        h('div', { style: { position: 'absolute', inset: '8px', borderRadius: '8px', background: 'radial-gradient(circle at 50% 30%, #fffbe6, #fbecc4)', boxShadow: g ? 'none' : '0 0 20px 5px rgba(255,240,200,.7)' } }, [
          h('div', { key: 'v', style: { position: 'absolute', left: '50%', top: '0', bottom: '0', width: '5px', marginLeft: '-2.5px', background: '#fffdf4', borderRadius: '3px' } }),
          h('div', { key: 'h2', style: { position: 'absolute', top: '50%', left: '0', right: '0', height: '5px', marginTop: '-2.5px', background: '#fffdf4', borderRadius: '3px' } })
        ]))
    ]);
    const awning = h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) },
      h('div', { style: { position: 'absolute', inset: '0', borderRadius: '9px 9px 12px 12px', background: `repeating-linear-gradient(90deg, ${T.accent2} 0 18px, #fdf6e2 18px 36px)`, boxShadow: 'inset 0 4px 5px rgba(255,255,255,.45), inset 0 -5px 7px rgba(0,0,0,.12), 0 4px 9px rgba(150,116,60,.2)' } },
        [0, 1, 2, 3].map((i) => h('span', { key: i, style: { position: 'absolute', left: (i * 36 + 9) + 'px', bottom: '-6px', width: '18px', height: '12px', borderRadius: '0 0 10px 10px', background: i % 2 ? '#fdf6e2' : T.accent2 } }))));
    return [onWallL('cwf', 40, 68, 118, 86, pane), onWallL('caw', 28, 158, 144, 24, awning)];
  };

  CD.counter = (T, g) => [].concat(
    box('ccB', { x: 96, y: 8, w: 150, d: 44, ht: 54, r: 8, c: T.clay, ghost: g }),
    box('ccT', { x: 90, y: 6, w: 162, d: 50, ht: 7, r: 9, z0: 54, c: T.woodL, ghost: g }),
    g ? [] : [face('ccP', { x: 104, y: 52, w: 134, hh: 38, tf: 'translateZ(48px) rotateX(-90deg)', bg: `repeating-linear-gradient(90deg, ${sh(T.clay, .12)} 0 20px, ${sh(T.clay, .02)} 20px 40px)`, r: 7, soft: 'inset 0 3px 4px rgba(255,255,255,.3), inset 0 -4px 6px rgba(0,0,0,.1)' })]
  );

  CD.espresso = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '46px', height: '42px' }, gf(g)) }, [
      h('span', { key: 'b', style: { position: 'absolute', left: '3px', bottom: '4px', width: '40px', height: '30px', borderRadius: '9px', background: 'linear-gradient(160deg, #fbf3ea, #e8d5c4)', boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.7), inset -3px -4px 6px rgba(160,120,90,.3)' } }),
      h('span', { key: 't', style: { position: 'absolute', left: '8px', bottom: '30px', width: '30px', height: '9px', borderRadius: '5px', background: sh(T.gold, -.06), boxShadow: 'inset 1px 2px 2px rgba(255,255,255,.5)' } }),
      h('span', { key: 'g2', style: { position: 'absolute', left: '18px', bottom: '20px', width: '10px', height: '7px', borderRadius: '0 0 5px 5px', background: '#a98457' } }),
      h('span', { key: 'cup', style: { position: 'absolute', left: '18px', bottom: '10px', width: '11px', height: '8px', borderRadius: '2px 2px 5px 5px', background: '#fffdf4', boxShadow: 'inset -1px -1px 2px rgba(160,120,90,.4)' } }),
      h('span', { key: 'dk', style: { position: 'absolute', left: '7px', bottom: '18px', width: '6px', height: '6px', borderRadius: '50%', background: T.accent2 } }),
      g ? null : steam('ces', 30, -8, .8)
    ].filter(Boolean));
    return [sprite('ces2', 210, 28, 61, node)];
  };

  CD.pastry = (T, g) => {
    const els = [].concat(
      box('cpB', { x: 34, y: 8, w: 52, d: 42, ht: 26, r: 7, c: T.wood, ghost: g }),
      box('cpG', { x: 36, y: 10, w: 48, d: 38, ht: 34, r: 7, z0: 26, cols: g ? null : ['rgba(255,255,255,.5)', 'rgba(255,255,255,.32)', 'rgba(235,240,245,.4)'], c: '#fff', ghost: g })
    );
    if (!g) {
      els.push.apply(els, puck('cp1', { x: 42, y: 16, w: 15, d: 13, ht: 8, z0: 28, c: T.accent2, ghost: g }));
      els.push.apply(els, puck('cp2', { x: 60, y: 16, w: 15, d: 13, ht: 10, z0: 28, c: '#f3d9a4', ghost: g }));
      els.push.apply(els, puck('cp3', { x: 50, y: 30, w: 15, d: 13, ht: 7, z0: 28, c: '#e8c9a8', ghost: g }));
    }
    return els;
  };

  CD.stools = (T, g) => {
    const st = (k, x) => [].concat(
      box(k + 'p', { x: x + 10, y: 78, w: 7, d: 7, ht: 30, r: 3, c: T.woodD, ghost: g }),
      puck(k + 'b', { x: x + 4, y: 72, w: 20, d: 18, ht: 4, c: T.woodD, ghost: g }),
      puck(k + 's', { x, y: 66, w: 28, d: 26, ht: 8, z0: 30, c: T.accent2, ghost: g })
    );
    return [].concat(st('cs1', 110), st('cs2', 156), st('cs3', 202));
  };

  CD.pendants = (T, g) => {
    const lamp = (k, x, y) => {
      const node = h('div', { style: Object.assign({ position: 'relative', width: '40px', height: '64px' }, gf(g)) }, [
        h('span', { key: 'c', style: { position: 'absolute', left: '18.5px', top: '0', width: '3px', height: '34px', background: sh(T.woodD, -.1), borderRadius: '2px' } }),
        h('span', { key: 's', style: { position: 'absolute', left: '6px', top: '32px', width: '28px', height: '20px', borderRadius: '50% 50% 10% 10%', background: `radial-gradient(circle at 40% 25%, ${sh(T.gold, .3)}, ${T.gold})`, boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.55), inset -3px -4px 5px rgba(0,0,0,.14)' } }),
        h('span', { key: 'b', style: { position: 'absolute', left: '14px', top: '48px', width: '12px', height: '10px', borderRadius: '50%', background: '#fff3cb', boxShadow: g ? 'none' : '0 0 14px 5px rgba(255,238,180,.8)', animation: g ? 'none' : 'glowpulse 3.2s ease-in-out infinite' } })
      ]);
      return sprite(k, x, y, 128, node);
    };
    return [lamp('cpd1', 130, 110), lamp('cpd2', 172, 110)];
  };

  CD.menu = (T, g) => onWallR('cmn', 96, 98, 108, 62,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '10px', background: sh(T.wood, .04), boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.55), 0 4px 8px rgba(150,116,60,.2)' }, gf(g)) },
      h('div', { style: { position: 'absolute', inset: '7px', borderRadius: '7px', background: '#655d4e', boxShadow: 'inset -2px -2px 5px rgba(0,0,0,.3)' } }, [
        h('span', { key: 't', style: { position: 'absolute', left: '9px', top: '7px', fontFamily: '"Fredoka",sans-serif', fontSize: '11px', fontWeight: 500, color: '#f7f1dc', letterSpacing: '.5px' } }, 'today ✦'),
        h('span', { key: 'l1', style: { position: 'absolute', left: '9px', top: '26px', width: '52px', height: '2.5px', borderRadius: '2px', background: 'rgba(247,241,220,.6)' } }),
        h('span', { key: 'l2', style: { position: 'absolute', left: '9px', top: '34px', width: '66px', height: '2.5px', borderRadius: '2px', background: 'rgba(247,241,220,.45)' } }),
        h('span', { key: 'cro', style: { position: 'absolute', right: '8px', top: '24px', width: '16px', height: '11px', borderRadius: '7px 7px 5px 5px', background: '#e3b26e' } })
      ])));

  CD.beanshelf = (T, g) => onWallL('cbs', 186, 98, 92, 40,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'bar', style: { position: 'absolute', left: '0', bottom: '0', right: '0', height: '7px', borderRadius: '4px', background: sh(T.wood, .05), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.6), 0 3px 6px rgba(150,116,60,.2)' } }),
      h('span', { key: 's1', style: { position: 'absolute', left: '6px', bottom: '7px', width: '19px', height: '23px', borderRadius: '5px 5px 7px 7px', background: '#e0c9a4', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5)' } },
        h('span', { style: { position: 'absolute', left: '4px', top: '9px', width: '11px', height: '7px', borderRadius: '3px', background: T.accent2 } })),
      h('span', { key: 's2', style: { position: 'absolute', left: '32px', bottom: '7px', width: '17px', height: '19px', borderRadius: '5px', background: T.clay, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.45)' } }),
      h('span', { key: 's3', style: { position: 'absolute', left: '56px', bottom: '7px', width: '16px', height: '22px', borderRadius: '4px', background: '#f7e8c8', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.6)' } },
        h('span', { style: { position: 'absolute', left: '2px', top: '-4px', right: '2px', height: '5px', borderRadius: '3px', background: T.woodD } }))
    ]));

  CD.bistro = (T, g) => [].concat(
    box('cbp', { x: 66, y: 216, w: 7, d: 7, ht: 32, r: 3, c: T.woodD, ghost: g }),
    puck('cbb', { x: 56, y: 208, w: 28, d: 24, ht: 4, c: T.woodD, ghost: g }),
    puck('cbt', { x: 40, y: 194, w: 60, d: 52, ht: 7, z0: 32, c: T.woodL, ghost: g })
  );

  CD.bchairs = (T, g) => {
    const ch = (k, x, y, backY) => [].concat(
      box(k + 'b', { x, y: backY, w: 28, d: 6, ht: 32, r: 7, z0: 14, c: T.gold, ghost: g }),
      puck(k + 's', { x: x - 2, y, w: 32, d: 28, ht: 6, z0: 20, c: T.accent, ghost: g }),
      box(k + 'l1', { x: x + 2, y: y + 4, w: 4, d: 4, ht: 20, r: 2, c: T.woodD, ghost: g }),
      box(k + 'l2', { x: x + 22, y: y + 4, w: 4, d: 4, ht: 20, r: 2, c: T.woodD, ghost: g })
    );
    return [].concat(ch('cch1', 56, 162, 156), ch('cch2', 56, 252, 282));
  };

  CD.cakestand = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '40px', height: '40px' }, gf(g)) }, [
      h('span', { key: 'pl', style: { position: 'absolute', left: '2px', bottom: '5px', width: '36px', height: '7px', borderRadius: '50%', background: '#fffdf4', boxShadow: 'inset 2px 2px 2px rgba(255,255,255,.9), inset -2px -3px 3px rgba(190,160,120,.5)' } }),
      h('span', { key: 'st', style: { position: 'absolute', left: '17px', bottom: '0', width: '6px', height: '7px', borderRadius: '2px', background: '#f0e4d4' } }),
      h('span', { key: 'dm', style: { position: 'absolute', left: '6px', bottom: '10px', width: '28px', height: '22px', borderRadius: '50% 50% 8% 8%', background: 'linear-gradient(160deg, rgba(255,255,255,.75), rgba(240,240,248,.4))', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.9)' } }),
      h('span', { key: 'ck', style: { position: 'absolute', left: '12px', bottom: '11px', width: '16px', height: '11px', borderRadius: '6px 6px 3px 3px', background: `linear-gradient(180deg, #fdf3ea 45%, ${T.accent2} 45%)` } })
    ]);
    return [sprite('ccs', 70, 218, 40, node)];
  };

  CD.register = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '42px', height: '32px' }, gf(g)) }, [
      h('span', { key: 'b', style: { position: 'absolute', left: '0', bottom: '0', width: '26px', height: '20px', borderRadius: '6px 6px 4px 4px', background: `linear-gradient(160deg, ${sh(T.clay, .14)}, ${T.clay})`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.4)' } }),
      h('span', { key: 'k', style: { position: 'absolute', left: '4px', bottom: '8px', width: '18px', height: '5px', borderRadius: '2px', backgroundImage: `repeating-linear-gradient(90deg, #fdf6e2 0 3px, rgba(0,0,0,0) 3px 6px)` } }),
      h('span', { key: 's', style: { position: 'absolute', left: '3px', bottom: '19px', width: '20px', height: '7px', borderRadius: '3px', background: '#655d4e' } }),
      h('span', { key: 'j', style: { position: 'absolute', left: '30px', bottom: '0', width: '11px', height: '14px', borderRadius: '4px 4px 5px 5px', background: 'rgba(255,255,255,.65)', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,.9), inset -1px -2px 2px rgba(160,130,90,.35)' } },
        h('span', { style: { position: 'absolute', left: '2px', bottom: '2px', right: '2px', height: '5px', borderRadius: '2px', background: T.gold } }))
    ]);
    return [sprite('crg', 122, 28, 61, node)];
  };

  CD.cart = (T, g) => {
    const els = [].concat(
      box('cctB', { x: 256, y: 122, w: 36, d: 44, ht: 34, r: 7, c: T.woodL, ghost: g }),
      box('cctT', { x: 253, y: 119, w: 42, d: 50, ht: 5, r: 6, z0: 34, c: T.wood, ghost: g })
    );
    if (!g) {
      els.push.apply(els, puck('cw1', { x: 258, y: 162, w: 12, d: 10, ht: 3, c: T.woodD, ghost: g }));
      els.push.apply(els, puck('cw2', { x: 278, y: 162, w: 12, d: 10, ht: 3, c: T.woodD, ghost: g }));
      const milk = h('div', { style: { position: 'relative', width: '26px', height: '22px' } }, [
        h('span', { key: 'm1', style: { position: 'absolute', left: '0', bottom: '0', width: '11px', height: '17px', borderRadius: '4px 4px 3px 3px', background: '#fffdf4', boxShadow: 'inset -1px -2px 2px rgba(160,130,90,.3)' } }),
        h('span', { key: 'm2', style: { position: 'absolute', left: '14px', bottom: '0', width: '11px', height: '20px', borderRadius: '4px 4px 3px 3px', background: '#fdf8ec', boxShadow: 'inset -1px -2px 2px rgba(160,130,90,.3)' } }),
        h('span', { key: 'c1', style: { position: 'absolute', left: '2px', top: '3px', width: '7px', height: '4px', borderRadius: '2px', background: T.accent2 } })
      ]);
      els.push(sprite('cmk', 274, 140, 39, milk));
    }
    return els;
  };

  CD.fern = (T, g) => {
    // wall planter with slim trailing tendrils of little leaves (reads as a plant, not a blob)
    const strand = (lft, n, tilt, dl) => h('div', { key: 's' + lft, style: { position: 'absolute', left: lft + 'px', top: '28px', width: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', transformOrigin: '50% 0', transform: `rotate(${tilt}deg)`, animation: g ? 'none' : `sway ${4 + dl}s ease-in-out ${dl}s infinite` } },
      [h('span', { key: 'st', style: { width: '2px', height: '5px', background: '#6f8a55', borderRadius: '1px' } })].concat(
        Array.from({ length: n }, (_, i) => h('span', { key: i, style: { width: '9px', height: '8px', margin: '-1.5px 0', borderRadius: '62% 62% 60% 40% / 66% 66% 40% 40%', background: i % 2 ? '#8fa070' : '#7e9660', boxShadow: 'inset -1px -1px 1px rgba(0,0,0,.12)', transform: `rotate(${i % 2 ? 24 : -24}deg)` } }))));
    return [onWallR('cfn', 34, 106, 52, 62,
      h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
        h('span', { key: 'hk', style: { position: 'absolute', left: '24px', top: '0', width: '3px', height: '10px', background: '#c9b58e', borderRadius: '2px' } }),
        // terracotta pot
        h('span', { key: 'pot', style: { position: 'absolute', left: '12px', top: '9px', width: '26px', height: '17px', borderRadius: '6px 6px 12px 12px', background: `radial-gradient(circle at 38% 25%, ${sh(T.wood, .2)}, ${T.wood})`, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.5), inset -3px -4px 6px rgba(150,116,60,.22)' } },
          h('span', { style: { position: 'absolute', left: '-2px', top: '-2px', right: '-2px', height: '6px', borderRadius: '4px', background: sh(T.wood, .1) } })),
        strand(13, 6, -13, 0), strand(21, 7, 0, .5), strand(30, 6, 13, 1)
      ]))];
  };

  CD.sign = (T, g) => onWallR('csg', 212, 116, 52, 30,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '999px', background: '#fdf6e2', boxShadow: g ? 'none' : `inset 0 0 0 2.5px ${T.accent2}, 0 0 16px 3px rgba(216,144,122,.55)`, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: g ? 'none' : 'glowpulse 2.8s ease-in-out infinite' }, gf(g)) },
      h('span', { style: { fontFamily: '"Fredoka",sans-serif', fontWeight: 600, fontSize: '14px', color: T.accent2, letterSpacing: '1px' } }, 'open ✦')));

  const CAFE_FURN = [
    { key: 'window', label: 'Booth Window & Awning', icon: '🎪', cx: 24, cy: 100, fw: 40, fd: 130, bx: 64, by: 102, wall: true, fx: 100, fy: -125 },
    { key: 'mat', label: 'Runner Rug', icon: '🧶', cx: 150, cy: 201, fw: 148, fd: 74, bx: 150, by: 201, flat: true },
    { key: 'counter', label: 'Coffee Bar Counter', icon: '🍮', cx: 171, cy: 30, fw: 162, fd: 50, bx: 171, by: 82, sdy: 18 },
    { key: 'espresso', label: 'Espresso Machine', icon: '☕', cx: 210, cy: 28, fw: 46, fd: 30, bx: 210, by: 82, sdy: 52 },
    { key: 'pastry', label: 'Pastry Display', icon: '🥐', cx: 60, cy: 29, fw: 54, fd: 44, bx: 60, by: 80, sdy: 26 },
    { key: 'stools', label: 'Counter Stools', icon: '🪑', cx: 165, cy: 79, fw: 120, fd: 30, bx: 165, by: 120, sdy: 10 },
    { key: 'pendants', label: 'Pendant Lights', icon: '💡', cx: 151, cy: 110, fw: 60, fd: 24, bx: 151, by: 150, sdy: 112 },
    { key: 'menu', label: 'Menu Board', icon: '📋', cx: 150, cy: 20, fw: 106, fd: 28, bx: 150, by: 82, wall: true, fx: 150, fy: -129 },
    { key: 'beanshelf', label: 'Bean Shelf', icon: '🫘', cx: 24, cy: 232, fw: 36, fd: 92, bx: 62, by: 232, wall: true, fx: 232, fy: -118 },
    { key: 'bistro', label: 'Bistro Table', icon: '🥯', cx: 70, cy: 220, fw: 60, fd: 52, bx: 114, by: 222, sdy: 12 },
    { key: 'bchairs', label: 'Bistro Chairs', icon: '🪑', cx: 70, cy: 220, fw: 64, fd: 124, bx: 114, by: 258, sdy: 12 },
    { key: 'cakestand', label: 'Cake Dome', icon: '🍰', cx: 70, cy: 218, fw: 40, fd: 26, bx: 114, by: 222, sdy: 42 },
    { key: 'register', label: 'Register & Tip Jar', icon: '🫙', cx: 122, cy: 26, fw: 42, fd: 26, bx: 122, by: 82, sdy: 50 },
    { key: 'cart', label: 'Milk Cart', icon: '🥛', cx: 274, cy: 142, fw: 44, fd: 52, bx: 246, by: 168, sdy: 20 },
    { key: 'fern', label: 'Hanging Fern', icon: '🌿', cx: 59, cy: 20, fw: 44, fd: 28, bx: 62, by: 82, wall: true, fx: 59, fy: -137 },
    { key: 'sign', label: "Soft 'open' Sign", icon: '✨', cx: 238, cy: 20, fw: 50, fd: 26, bx: 238, by: 78, wall: true, fx: 238, fy: -131 }
  ];

  // ================================================================= BEACH ==
  const BC = {};

  BC.rug = (T, g) => box('brg', {
    x: 84, y: 152, w: 132, d: 112, ht: 4, r: '50%', c: T.rug, ghost: g,
    cols: g ? null : [T.rug, sh(T.rug, -.08), sh(T.rug, -.18)],
    topExtra: g ? null : { backgroundImage: `repeating-radial-gradient(ellipse at 50% 50%, ${sh(T.rug, .14)} 0 11px, rgba(0,0,0,0) 11px 22px)`, borderRadius: '50%' }
  });

  BC.window = (T, g) => onWallL('bwn', 36, 66, 130, 90,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'fr', style: { position: 'absolute', inset: '0', borderRadius: '14px', background: '#fffdf4', boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.8), inset -3px -4px 8px rgba(150,180,190,.5), 0 3px 8px rgba(80,120,135,.18)' } }),
      h('div', { key: 'sea', style: { position: 'absolute', inset: '9px', borderRadius: '9px', background: 'linear-gradient(180deg, #eaf6f2 0 46%, #a8d2d8 46% 62%, #8fc2cc 62%)', overflow: 'hidden', boxShadow: g ? 'none' : '0 0 18px 4px rgba(220,245,245,.6)' } }, [
        h('span', { key: 'sun', style: { position: 'absolute', right: '14%', top: '12%', width: '16px', height: '16px', borderRadius: '50%', background: '#ffe9ae', boxShadow: '0 0 10px 3px rgba(255,233,174,.7)' } }),
        h('span', { key: 'w1', style: { position: 'absolute', left: '8%', top: '52%', width: '26px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.65)' } }),
        h('span', { key: 'w2', style: { position: 'absolute', left: '48%', top: '66%', width: '32px', height: '5px', borderRadius: '3px', background: 'rgba(255,255,255,.5)' } }),
        h('span', { key: 'g1', style: { position: 'absolute', left: '20%', top: '20%', width: '11px', height: '4px', borderBottom: '2.5px solid rgba(120,140,150,.7)', borderRadius: '50%', boxSizing: 'border-box' } }),
        h('span', { key: 'g2', style: { position: 'absolute', left: '34%', top: '28%', width: '9px', height: '4px', borderBottom: '2.5px solid rgba(120,140,150,.6)', borderRadius: '50%', boxSizing: 'border-box' } })
      ]),
      h('div', { key: 'bar', style: { position: 'absolute', left: '50%', top: '9px', bottom: '9px', width: '5px', marginLeft: '-2.5px', background: '#fffdf4', borderRadius: '3px' } })
    ]));

  BC.hammock = (T, g) => {
    // whole hammock as one billboard sprite so cloth + posts always line up
    const post = (side) => h('span', { key: 'p' + side, style: { position: 'absolute', [side]: '6px', bottom: '0', width: '10px', height: '74px', borderRadius: '4px', background: `linear-gradient(90deg, ${sh(T.wood, .14)}, ${sh(T.wood, -.12)})`, boxShadow: 'inset 1px 0 2px rgba(255,255,255,.4)' } });
    const cap = (side) => h('span', { key: 'c' + side, style: { position: 'absolute', [side]: '4px', top: '11px', width: '14px', height: '7px', borderRadius: '50%', background: sh(T.wood, .1) } });
    const node = h('div', { style: Object.assign({ position: 'relative', width: '152px', height: '90px' }, gf(g)) }, [
      post('left'), post('right'), cap('left'), cap('right'),
      // ropes anchored right at each post cap, angling down to the cloth ends
      h('span', { key: 'r1', style: { position: 'absolute', left: '10px', top: '13px', width: '32px', height: '3px', background: '#c9b58e', transform: 'rotate(26deg)', transformOrigin: '0 50%', borderRadius: '2px' } }),
      h('span', { key: 'r2', style: { position: 'absolute', right: '10px', top: '13px', width: '32px', height: '3px', background: '#c9b58e', transform: 'rotate(-26deg)', transformOrigin: '100% 50%', borderRadius: '2px' } }),
      // slung cloth between the ropes
      h('span', { key: 'cl', style: { position: 'absolute', left: '28px', top: '24px', width: '96px', height: '34px', borderRadius: '0 0 56px 56px', background: `repeating-linear-gradient(90deg, ${T.accent} 0 14px, #fdfaf0 14px 28px)`, boxShadow: 'inset 0 -6px 9px rgba(80,120,135,.25), inset 0 3px 4px rgba(255,255,255,.5)' } },
        [0, 1, 2, 3, 4].map((i) => h('span', { key: 'fr' + i, style: { position: 'absolute', left: 12 + i * 18 + 'px', bottom: '-6px', width: '2.5px', height: '8px', background: '#c9b58e', borderRadius: '2px' } })))
    ]);
    return [sprite('bhm', 146, 202, 0, node)];
  };

  BC.surfboard = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '38px', height: '104px' }, gf(g)) }, [
      h('span', { key: 'b', style: { position: 'absolute', left: '6px', bottom: '0', width: '24px', height: '100px', borderRadius: '50% 50% 44% 44%', background: `linear-gradient(180deg, ${sh(T.clay, .22)}, ${T.clay})`, boxShadow: 'inset 3px 4px 6px rgba(255,255,255,.55), inset -3px -5px 7px rgba(0,0,0,.1)', transform: 'rotate(7deg)', transformOrigin: '50% 100%' } }),
      h('span', { key: 's', style: { position: 'absolute', left: '17px', bottom: '8px', width: '3.5px', height: '84px', borderRadius: '2px', background: 'rgba(255,255,255,.8)', transform: 'rotate(7deg)', transformOrigin: '50% 100%' } })
    ]);
    return [sprite('bsf', 262, 34, 0, node), g ? null : shadowOval('bsfs', 262, 38, 40, 18, .16)].filter(Boolean);
  };

  BC.shellshelf = (T, g) => onWallR('bss', 60, 100, 90, 34,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'bar', style: { position: 'absolute', left: '0', bottom: '0', right: '0', height: '7px', borderRadius: '4px', background: sh(T.wood, .08), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.6), 0 3px 6px rgba(80,120,135,.2)' } }),
      h('span', { key: 's1', style: { position: 'absolute', left: '8px', bottom: '7px', width: '16px', height: '13px', borderRadius: '50% 50% 5px 5px', background: T.accent2, boxShadow: 'inset 2px 2px 2px rgba(255,255,255,.6)' } }),
      h('span', { key: 's2', style: { position: 'absolute', left: '34px', bottom: '7px', width: '13px', height: '13px', borderRadius: '50% 50% 50% 0', background: '#f3e3c1', transform: 'rotate(45deg)', boxShadow: 'inset 2px 2px 2px rgba(255,255,255,.6)' } }),
      h('span', { key: 's3', style: { position: 'absolute', left: '58px', bottom: '8px', fontFamily: '"Fredoka",sans-serif', fontSize: '15px', color: T.gold } }, '✦'),
      h('span', { key: 's4', style: { position: 'absolute', left: '72px', bottom: '7px', width: '10px', height: '12px', borderRadius: '5px 5px 6px 6px', background: '#d4e9ec' } })
    ]));

  BC.desk = (T, g) => {
    const leg = (k, x, y) => box(k, { x, y, w: 8, d: 8, ht: 37, r: 3, c: sh(T.wood, -.28), ghost: g });
    const els = [].concat(
      leg('bd1', 34, 236), leg('bd2', 108, 236), leg('bd3', 34, 270), leg('bd4', 108, 270),
      box('bdt', { x: 28, y: 230, w: 94, d: 52, ht: 8, r: 10, cols: g ? null : [sh(T.wood, .18), sh(T.wood, .02), sh(T.wood, -.12)], c: T.wood, ghost: g, z0: 37 }),
      box('bnb', { x: 48, y: 246, w: 24, d: 20, ht: 3, r: 2, cols: g ? null : ['#fdfaf1', '#eee5d2', '#dfd4bc'], c: '#fdfaf1', ghost: g, z0: 45 })
    );
    if (!g) els.push(h('div', { key: 'bln', style: { position: 'absolute', left: '52px', top: '250px', width: '16px', height: '13px', transform: 'translateZ(48.6px)', backgroundImage: 'repeating-linear-gradient(180deg, rgba(90,110,120,.4) 0 1.5px, rgba(0,0,0,0) 1.5px 5px)' } }));
    return els;
  };

  BC.chair = (T, g) => [].concat(
    // wide, thin backrest sitting along the rear edge of the seat
    box('bcb', { x: 137, y: 239, w: 42, d: 6, ht: 32, r: 8, z0: 18, c: '#e0caa9', ghost: g, cols: g ? null : ['#efe0c6', '#e0caa9', '#c3ab86'] }),
    puck('bcs', { x: 134, y: 240, w: 46, d: 42, ht: 10, z0: 22, c: T.accent, ghost: g }),
    box('bcl1', { x: 140, y: 246, w: 5, d: 5, ht: 22, r: 2, c: '#c3ab86', ghost: g }),
    box('bcl2', { x: 168, y: 246, w: 5, d: 5, ht: 22, r: 2, c: '#c3ab86', ghost: g }),
    box('bcl3', { x: 140, y: 270, w: 5, d: 5, ht: 22, r: 2, c: '#c3ab86', ghost: g }),
    box('bcl4', { x: 168, y: 270, w: 5, d: 5, ht: 22, r: 2, c: '#c3ab86', ghost: g })
  );

  BC.umbrella = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '86px', height: '108px' }, gf(g)) }, [
      h('span', { key: 'p', style: { position: 'absolute', left: '41px', bottom: '0', width: '5px', height: '74px', borderRadius: '3px', background: sh(T.wood, -.05), transform: 'rotate(5deg)', transformOrigin: '50% 100%' } }),
      h('span', { key: 'c', style: { position: 'absolute', left: '4px', bottom: '62px', width: '80px', height: '38px', borderRadius: '50% 50% 12% 12%', background: `repeating-linear-gradient(90deg, ${T.clay} 0 16px, #fdfaf0 16px 32px)`, boxShadow: 'inset 3px 4px 6px rgba(255,255,255,.5), inset -4px -6px 8px rgba(0,0,0,.1)', transform: 'rotate(5deg)' } }),
      h('span', { key: 't', style: { position: 'absolute', left: '46px', bottom: '100px', width: '5px', height: '9px', borderRadius: '3px', background: T.gold, transform: 'rotate(5deg)' } })
    ]);
    return [sprite('bum', 254, 122, 0, node), g ? null : shadowOval('bums', 254, 126, 66, 26, .14)].filter(Boolean);
  };

  BC.palm = (T, g) => {
    // slim pointed frond with a centre vein — reads clearly as a leaf.
    // Outer span holds the static fan angle; inner span does the sway so the
    // animation's transform never overwrites the fan rotation.
    const frond = (rot, len, dl) => h('span', { style: { position: 'absolute', left: '29px', bottom: '30px', width: '9px', height: len + 'px', transformOrigin: '50% 100%', transform: `rotate(${rot}deg)` } },
      h('span', { style: { position: 'absolute', inset: '0', borderRadius: '50% 50% 4px 4px', background: 'linear-gradient(180deg, #a4bd85 0%, #6f9159 100%)', boxShadow: 'inset -1px 0 2px rgba(0,0,0,.1)', transformOrigin: '50% 100%', animation: g ? 'none' : `sway ${4.6 + dl}s ease-in-out ${dl}s infinite` } },
        h('span', { style: { position: 'absolute', left: '50%', top: '12%', bottom: '8%', width: '1.5px', marginLeft: '-.75px', borderRadius: '1px', background: 'rgba(80,110,60,.55)' } })));
    const node = h('div', { style: Object.assign({ position: 'relative', width: '66px', height: '92px' }, gf(g)) }, [
      frond(-54, 34, 0), frond(-32, 42, .4), frond(-11, 47, .8), frond(11, 47, 1.2), frond(32, 42, 1.6), frond(54, 34, 2),
      h('span', { key: 'tr', style: { position: 'absolute', left: '29px', bottom: '14px', width: '9px', height: '22px', borderRadius: '4px', background: `repeating-linear-gradient(180deg, ${T.wood} 0 5px, ${sh(T.wood, -.14)} 5px 8px)` } }),
      h('span', { key: 'pot', style: { position: 'absolute', left: '16px', bottom: '0', width: '33px', height: '18px', borderRadius: '6px 6px 12px 12px', background: `radial-gradient(circle at 38% 25%, ${sh(T.accent2, .2)}, ${T.accent2})`, boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.5)' } })
    ]);
    return [sprite('bpm', 46, 62, 0, node), g ? null : shadowOval('bpms', 46, 64, 46, 20, .16)].filter(Boolean);
  };

  BC.lanterns = (T, g) => onWallR('blt', 122, 128, 118, 38,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'w', style: { position: 'absolute', left: '0', top: '2px', width: '118px', height: '18px', borderRadius: '0 0 50% 50%', borderBottom: '2.5px solid #c9b58e', boxSizing: 'border-box' } }),
      [12, 52, 92].map((lft, i) => h('span', { key: 'l' + i, style: { position: 'absolute', left: lft + 'px', top: i === 1 ? '18px' : '12px', width: '14px', height: '16px', borderRadius: '5px 5px 7px 7px', background: 'radial-gradient(circle at 45% 35%, #fff3cb, #f2cf6e)', boxShadow: g ? 'none' : '0 0 12px 3px rgba(255,238,180,.7)', animation: g ? 'none' : `glowpulse ${2 + i * .4}s ease-in-out ${i * .5}s infinite` } },
        h('span', { style: { position: 'absolute', left: '4px', top: '-4px', width: '6px', height: '4px', borderRadius: '2px', background: '#c9b58e' } })))
    ]));

  BC.tideclock = (T, g) => onWallL('btc', 198, 112, 42, 42,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0', borderRadius: '50%', background: '#fffdf4', boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.7), inset -3px -4px 6px rgba(150,180,190,.5), 0 3px 7px rgba(80,120,135,.2)' }, gf(g)) }, [
      h('div', { key: 'f', style: { position: 'absolute', inset: '6px', borderRadius: '50%', background: 'linear-gradient(180deg, #eef7f8 55%, #b8dde2 55%)', boxShadow: 'inset -2px -2px 4px rgba(150,180,190,.35)' } }, [
        h('div', { key: 'hm', style: { position: 'absolute', left: '50%', top: '50%', width: '3px', height: '10px', marginLeft: '-1.5px', background: '#4f7987', borderRadius: '2px', transformOrigin: '50% 100%', transform: 'translateY(-100%)', animation: g ? 'none' : 'spinhand 240s linear infinite' } }),
        h('span', { key: 'c', style: { position: 'absolute', left: '50%', top: '50%', width: '4px', height: '4px', margin: '-2px', borderRadius: '50%', background: '#4f7987' } })
      ])
    ]));

  BC.coral = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '30px', height: '38px' }, gf(g)) }, [
      h('span', { key: 'c1', style: { position: 'absolute', left: '12px', bottom: '12px', width: '6px', height: '20px', borderRadius: '4px', background: T.accent2 } }),
      h('span', { key: 'c2', style: { position: 'absolute', left: '6px', bottom: '16px', width: '5px', height: '13px', borderRadius: '4px', background: sh(T.accent2, .12), transform: 'rotate(-24deg)' } }),
      h('span', { key: 'c3', style: { position: 'absolute', left: '19px', bottom: '15px', width: '5px', height: '14px', borderRadius: '4px', background: sh(T.accent2, -.06), transform: 'rotate(22deg)' } }),
      h('span', { key: 'v', style: { position: 'absolute', left: '7px', bottom: '0', width: '16px', height: '14px', borderRadius: '4px 4px 8px 8px', background: '#fffdf4', boxShadow: 'inset -2px -2px 3px rgba(150,180,190,.45)' } })
    ]);
    return [sprite('bcr', 100, 252, 46, node)];
  };

  BC.cooler = (T, g) => {
    const els = [].concat(
      box('bclB', { x: 212, y: 212, w: 40, d: 34, ht: 24, r: 8, c: T.clayL, ghost: g }),
      box('bclL', { x: 209, y: 209, w: 46, d: 40, ht: 7, r: 9, z0: 24, c: '#fdfaf0', ghost: g, cols: g ? null : ['#fefcf4', '#efe8d6', '#ddd4bc'] })
    );
    if (!g) els.push.apply(els, box('bclH', { x: 226, y: 224, w: 12, d: 3, ht: 5, r: 3, z0: 31, c: T.clay, ghost: g }));
    return els;
  };

  BC.starfish = (T, g) => onWallR('bst', 56, 140, 40, 40,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'st', style: { position: 'absolute', left: '3px', top: '3px', width: '34px', height: '34px', background: `radial-gradient(circle at 42% 34%, ${sh(T.gold, .2)}, ${T.gold})`, clipPath: 'polygon(50% 2%, 61% 35%, 96% 35%, 68% 57%, 79% 92%, 50% 71%, 21% 92%, 32% 57%, 4% 35%, 39% 35%)', filter: g ? 'none' : 'drop-shadow(0 2px 3px rgba(150,116,60,.28))' } }, [
        h('span', { key: 'd1', style: { position: 'absolute', left: '15px', top: '15px', width: '5px', height: '5px', borderRadius: '50%', background: sh(T.gold, -.14), opacity: .5 } }),
        h('span', { key: 'd2', style: { position: 'absolute', left: '13px', top: '9px', width: '3px', height: '3px', borderRadius: '50%', background: sh(T.gold, -.14), opacity: .45 } })
      ])
    ]));

  BC.bucket = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '40px', height: '34px' }, gf(g)) }, [
      h('span', { key: 'b', style: { position: 'absolute', left: '4px', bottom: '0', width: '24px', height: '22px', borderRadius: '4px 4px 9px 9px', background: `linear-gradient(160deg, ${sh(T.clay, .18)}, ${T.clay})`, boxShadow: 'inset 2px 3px 4px rgba(255,255,255,.5)' } }),
      h('span', { key: 'r', style: { position: 'absolute', left: '2px', bottom: '20px', width: '28px', height: '6px', borderRadius: '4px', background: sh(T.clay, -.1) } }),
      h('span', { key: 'h2', style: { position: 'absolute', left: '6px', bottom: '24px', width: '20px', height: '10px', borderRadius: '10px 10px 0 0', border: '3px solid #c9b58e', borderBottom: 'none', boxSizing: 'border-box' } }),
      h('span', { key: 's', style: { position: 'absolute', left: '31px', bottom: '2px', width: '6px', height: '18px', borderRadius: '3px 3px 5px 5px', background: '#f3e3c1', transform: 'rotate(9deg)' } }),
      h('span', { key: 'sh', style: { position: 'absolute', left: '29px', bottom: '16px', width: '10px', height: '8px', borderRadius: '4px 4px 2px 2px', background: '#f3e3c1', transform: 'rotate(9deg)' } })
    ]);
    return [sprite('bbk2', 254, 258, 0, node), g ? null : shadowOval('bbks', 254, 259, 34, 15, .16)].filter(Boolean);
  };

  BC.towels = (T, g) => [].concat(
    box('btw1', { x: 208, y: 158, w: 38, d: 30, ht: 8, r: 9, c: T.accent, ghost: g }),
    box('btw2', { x: 211, y: 161, w: 32, d: 26, ht: 8, r: 8, z0: 8, c: '#fdfaf0', ghost: g, cols: g ? null : ['#fefcf4', '#efe8d6', '#ddd4bc'] }),
    box('btw3', { x: 214, y: 164, w: 26, d: 22, ht: 7, r: 7, z0: 16, c: T.accent2, ghost: g })
  );

  const BEACH_FURN = [
    { key: 'window', label: 'Window to the Sea', icon: '🌊', cx: 24, cy: 101, fw: 40, fd: 140, bx: 64, by: 102, wall: true, fx: 101, fy: -111 },
    { key: 'rug', label: 'Woven Beach Rug', icon: '🧶', cx: 150, cy: 208, fw: 132, fd: 112, bx: 150, by: 208, flat: true },
    { key: 'hammock', label: 'Hammock', icon: '🏖', cx: 146, cy: 208, fw: 132, fd: 40, bx: 128, by: 258, sdy: 30 },
    { key: 'surfboard', label: 'Surfboard', icon: '🏄', cx: 262, cy: 36, fw: 44, fd: 30, bx: 258, by: 84, sdy: 46 },
    { key: 'shellshelf', label: 'Shell Shelf', icon: '🐚', cx: 105, cy: 20, fw: 88, fd: 28, bx: 105, by: 72, wall: true, fx: 105, fy: -117 },
    { key: 'desk', label: 'Driftwood Desk', icon: '🪵', cx: 75, cy: 256, fw: 94, fd: 54, bx: 75, by: 296, sdy: 14 },
    { key: 'chair', label: 'Rattan Chair', icon: '🪑', cx: 158, cy: 262, fw: 52, fd: 46, bx: 162, by: 298, sdy: 12 },
    { key: 'umbrella', label: 'Beach Umbrella', icon: '⛱', cx: 254, cy: 124, fw: 66, fd: 40, bx: 232, by: 160, sdy: 58 },
    { key: 'palm', label: 'Palm Plant', icon: '🌴', cx: 46, cy: 63, fw: 50, fd: 40, bx: 88, by: 92, sdy: 42 },
    { key: 'lanterns', label: 'Rope Lanterns', icon: '🏮', cx: 181, cy: 20, fw: 116, fd: 28, bx: 181, by: 72, wall: true, fx: 181, fy: -147 },
    { key: 'tideclock', label: 'Tide Clock', icon: '🕰', cx: 24, cy: 219, fw: 36, fd: 46, bx: 62, by: 220, wall: true, fx: 219, fy: -133 },
    { key: 'coral', label: 'Coral Vase', icon: '🪸', cx: 100, cy: 250, fw: 30, fd: 22, bx: 75, by: 296, sdy: 46 },
    { key: 'cooler', label: 'Picnic Cooler', icon: '🧺', cx: 232, cy: 229, fw: 46, fd: 42, bx: 232, by: 270, sdy: 12 },
    { key: 'starfish', label: 'Starfish Wall Art', icon: '⭐', cx: 75, cy: 20, fw: 40, fd: 26, bx: 75, by: 72, wall: true, fx: 75, fy: -160 },
    { key: 'bucket', label: 'Bucket & Spade', icon: '🏰', cx: 254, cy: 258, fw: 40, fd: 28, bx: 230, by: 276, sdy: 24 },
    { key: 'towels', label: 'Towel Stack', icon: '🧻', cx: 227, cy: 173, fw: 40, fd: 32, bx: 227, by: 210, sdy: 10 }
  ];

  // ================================================================ FOREST ==
  const FD = {};

  FD.rug = (T, g) => [].concat(
    puck('frg1', { x: 92, y: 156, w: 118, d: 96, ht: 3.5, c: '#a3b184', ghost: g }),
    puck('frg2', { x: 150, y: 188, w: 74, d: 64, ht: 3.5, c: '#8fa070', ghost: g })
  );

  FD.fireplace = (T, g) => {
    const els = [].concat(
      box('ffB', { x: 152, y: 6, w: 88, d: 44, ht: 80, r: 10, cols: g ? null : ['#d8cfc0', '#c9beac', '#b3a790'], c: '#c9beac', ghost: g }),
      box('ffM', { x: 146, y: 4, w: 100, d: 50, ht: 8, r: 8, z0: 80, c: T.wood, ghost: g })
    );
    if (!g) {
      els.push(face('ffO', { x: 168, y: 50, w: 56, hh: 44, tf: 'translateZ(58px) rotateX(-90deg)', bg: 'radial-gradient(circle at 50% 85%, #55463c, #33291f)', r: '24px 24px 6px 6px', soft: 'inset 0 0 0 5px rgba(216,207,192,.9)' }));
      els.push(face('ffst', { x: 160, y: 50, w: 14, hh: 10, tf: 'translateZ(74px) rotateX(-90deg)', bg: 'rgba(120,105,88,.5)', r: '5px', soft: 'none' }));
      els.push(face('ffst2', { x: 220, y: 50, w: 11, hh: 8, tf: 'translateZ(30px) rotateX(-90deg)', bg: 'rgba(120,105,88,.45)', r: '4px', soft: 'none' }));
      const fire = h('div', { style: { position: 'relative', width: '40px', height: '38px' } }, [
        h('span', { key: 'gl', style: { position: 'absolute', left: '-6px', bottom: '-4px', width: '52px', height: '38px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,190,110,.55), rgba(255,190,110,0) 70%)', animation: 'glowpulse 1.4s ease-in-out infinite' } }),
        h('span', { key: 'f1', style: { position: 'absolute', left: '10px', bottom: '4px', width: '20px', height: '26px', borderRadius: '50% 50% 42% 42%', background: 'radial-gradient(circle at 50% 82%, #ffd27a, #f2a24b 62%, #dd7a3e)', boxShadow: '0 0 12px 3px rgba(255,180,90,.65)', animation: 'sway 1.1s ease-in-out infinite', transformOrigin: '50% 100%' } }),
        h('span', { key: 'f2', style: { position: 'absolute', left: '17px', bottom: '5px', width: '9px', height: '13px', borderRadius: '50% 50% 40% 40%', background: '#ffe9ae', animation: 'sway 1.1s ease-in-out .3s infinite', transformOrigin: '50% 100%' } }),
        h('span', { key: 'lg', style: { position: 'absolute', left: '4px', bottom: '0', width: '32px', height: '7px', borderRadius: '4px', background: '#6e523c' } })
      ]);
      els.push(sprite('fff', 196, 26, 4, fire));
    }
    return els;
  };

  FD.logstack = (T, g) => {
    // pyramid of three logs, each with a tree-ring end so it reads as a woodpile
    const ring = (k, x, y, z0, c) => g ? null : h('div', { key: k, style: { position: 'absolute', left: x + 'px', top: (y + 15) + 'px', width: '15px', height: '15px', transformOrigin: '0 0', transform: `translateZ(${z0 + 15}px) rotateX(-90deg) rotateY(90deg)`, borderRadius: '50%', background: `repeating-radial-gradient(circle at 50% 50%, ${sh(c, .2)} 0 2px, ${sh(c, .02)} 2px 4px)`, boxShadow: 'inset 0 0 3px rgba(90,64,40,.3)' } });
    const c1 = T.wood, c2 = sh(T.wood, -.08), c3 = sh(T.wood, .08);
    // flat element list so React renders every log (a nested array literal dropped
    // two of the three); rings get unique keys so both bottom ends show.
    return [].concat(
      box('fl1', { x: 234, y: 8, w: 46, d: 15, ht: 15, r: 7, c: c1, ghost: g }),
      box('fl2', { x: 234, y: 26, w: 46, d: 15, ht: 15, r: 7, c: c2, ghost: g }),
      box('fl3', { x: 237, y: 17, w: 40, d: 15, ht: 15, r: 7, z0: 15, c: c3, ghost: g }),
      [ring('flr1', 234, 8, 0, c1), ring('flr2', 234, 26, 0, c2), ring('flr3', 237, 17, 15, c3)].filter(Boolean)
    );
  };

  FD.window = (T, g) => onWallL('fwn', 44, 74, 108, 86,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'fr', style: { position: 'absolute', inset: '0', borderRadius: '12px', background: '#f7ead6', boxShadow: 'inset 3px 3px 6px rgba(255,255,255,.8), inset -3px -4px 8px rgba(150,120,90,.45), 0 3px 8px rgba(90,64,40,.18)' } }),
      h('div', { key: 'vw', style: { position: 'absolute', inset: '8px', borderRadius: '8px', background: 'linear-gradient(180deg, #dceadf 0 55%, #b9d0b4 55%)', overflow: 'hidden' } }, [
        h('span', { key: 'p1', style: { position: 'absolute', left: '12%', bottom: '18%', width: '0', height: '0', borderLeft: '11px solid rgba(0,0,0,0)', borderRight: '11px solid rgba(0,0,0,0)', borderBottom: '30px solid #74945e' } }),
        h('span', { key: 'p2', style: { position: 'absolute', left: '40%', bottom: '12%', width: '0', height: '0', borderLeft: '14px solid rgba(0,0,0,0)', borderRight: '14px solid rgba(0,0,0,0)', borderBottom: '40px solid #5f7f4c' } }),
        h('span', { key: 'p3', style: { position: 'absolute', left: '70%', bottom: '20%', width: '0', height: '0', borderLeft: '10px solid rgba(0,0,0,0)', borderRight: '10px solid rgba(0,0,0,0)', borderBottom: '27px solid #74945e' } }),
        h('span', { key: 'sun', style: { position: 'absolute', right: '12%', top: '10%', width: '13px', height: '13px', borderRadius: '50%', background: '#ffedb3', boxShadow: '0 0 10px 3px rgba(255,237,179,.6)' } })
      ]),
      h('div', { key: 'bar', style: { position: 'absolute', left: '50%', top: '8px', bottom: '8px', width: '5px', marginLeft: '-2.5px', background: '#f7ead6', borderRadius: '3px' } })
    ]));

  FD.bench = (T, g) => {
    // a fallen log to perch on — lies horizontally with a tree-ring end
    const X = 82, Y = 202, W = 94, D = 28, HT = 26;
    const els = box('fbn', { x: X, y: Y, w: W, d: D, ht: HT, r: 13, cols: g ? null : [sh(T.wood, .2), sh(T.wood, .02), sh(T.wood, -.14)], c: T.wood, ghost: g });
    if (!g) {
      // tree-ring cross-section on the near (right) end
      els.push(h('div', { key: 'fbnR', style: { position: 'absolute', left: (X + W) + 'px', top: (Y + D) + 'px', width: D + 'px', height: HT + 'px', transformOrigin: '0 0', transform: `translateZ(${HT}px) rotateX(-90deg) rotateY(90deg)`, borderRadius: '50%', background: `repeating-radial-gradient(circle at 50% 50%, ${sh(T.wood, .24)} 0 4px, ${sh(T.wood, .06)} 4px 8px)`, boxShadow: 'inset 0 0 4px rgba(90,64,40,.3)' } }));
    }
    return els;
  };

  FD.stump = (T, g) => {
    // a tree-stump side table set beside the sofa, at the back edge of the rug
    const els = puck('fst', { x: 88, y: 150, w: 44, d: 40, ht: 26, c: T.wood, ghost: g });
    if (!g) els.push(h('div', { key: 'fstR', style: { position: 'absolute', left: '93px', top: '154px', width: '34px', height: '31px', transform: 'translateZ(26.6px)', borderRadius: '50%', background: `repeating-radial-gradient(ellipse at 50% 50%, ${sh(T.wood, .28)} 0 4px, ${sh(T.wood, .12)} 4px 8px)` } }));
    return els;
  };

  FD.mushlamp = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '46px', height: '56px' }, gf(g)) }, [
      h('span', { key: 'gl', style: { position: 'absolute', left: '-2px', top: '-4px', width: '50px', height: '38px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,200,160,.5), rgba(255,200,160,0) 70%)', animation: g ? 'none' : 'glowpulse 3s ease-in-out infinite' } }),
      h('span', { key: 'cap', style: { position: 'absolute', left: '3px', top: '2px', width: '40px', height: '26px', borderRadius: '50% 50% 16% 16%', background: `radial-gradient(circle at 40% 25%, ${sh(T.accent2, .18)}, ${T.accent2})`, boxShadow: 'inset 3px 3px 5px rgba(255,255,255,.5), inset -3px -4px 6px rgba(0,0,0,.14)' } }),
      h('span', { key: 'd1', style: { position: 'absolute', left: '12px', top: '8px', width: '7px', height: '6px', borderRadius: '50%', background: '#fdf3e4', opacity: .9 } }),
      h('span', { key: 'd2', style: { position: 'absolute', left: '27px', top: '12px', width: '5px', height: '4px', borderRadius: '50%', background: '#fdf3e4', opacity: .85 } }),
      h('span', { key: 'st', style: { position: 'absolute', left: '16px', top: '24px', width: '14px', height: '24px', borderRadius: '7px 7px 9px 9px', background: 'linear-gradient(180deg, #fbf0dc, #ecd9bc)', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.7), inset -2px -3px 4px rgba(150,120,90,.3)' } }),
      h('span', { key: 'wn', style: { position: 'absolute', left: '20px', top: '30px', width: '6px', height: '8px', borderRadius: '3px 3px 5px 5px', background: '#ffdf9e', boxShadow: g ? 'none' : '0 0 8px 2px rgba(255,223,158,.8)' } }),
      h('span', { key: 'gr', style: { position: 'absolute', left: '8px', top: '46px', width: '30px', height: '10px', borderRadius: '50%', background: '#8fa070', opacity: .7 } })
    ]);
    // sits on top of the stump side-table (z = stump height), beside the sofa
    return [sprite('fml', 110, 168, 26, node)];
  };

  FD.quiltchair = (T, g) => [].concat(
    box('fqb', { x: 26, y: 136, w: 15, d: 66, ht: 48, r: 9, c: T.clay, ghost: g }),
    box('fqa1', { x: 26, y: 130, w: 54, d: 13, ht: 36, r: 8, c: T.clay, ghost: g }),
    box('fqa2', { x: 26, y: 194, w: 54, d: 13, ht: 36, r: 8, c: T.clay, ghost: g }),
    box('fqs', { x: 33, y: 143, w: 46, d: 51, ht: 24, r: 8, c: sh(T.clay, -.04), ghost: g }),
    box('fqc', { x: 36, y: 146, w: 41, d: 46, ht: 11, r: 10, z0: 24, c: T.accent, ghost: g, topExtra: g ? null : { backgroundImage: `repeating-conic-gradient(${sh(T.accent, -.09)} 0% 25%, rgba(0,0,0,0) 0% 50%)`, backgroundSize: '18px 18px', borderRadius: '10px' } })
  );

  FD.pinecones = (T, g) => onWallL('fpc', 164, 138, 116, 32,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'w', style: { position: 'absolute', left: '0', top: '2px', width: '116px', height: '16px', borderRadius: '0 0 50% 50%', borderBottom: '2.5px solid #a98457', boxSizing: 'border-box' } }),
      [10, 38, 66, 94].map((lft, i) => h('span', { key: 'p' + i, style: { position: 'absolute', left: lft + 'px', top: i % 2 ? '14px' : '18px', width: '11px', height: '14px', borderRadius: '46% 46% 50% 50%', background: `repeating-linear-gradient(120deg, #8a5c3e 0 3px, #6e4830 3px 6px)`, boxShadow: 'inset 1px 1px 2px rgba(255,255,255,.25)' } }))
    ]));

  FD.acornshelf = (T, g) => onWallR('fas', 58, 98, 84, 34,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'bar', style: { position: 'absolute', left: '0', bottom: '0', right: '0', height: '7px', borderRadius: '4px', background: sh(T.wood, .08), boxShadow: 'inset 0 2px 2px rgba(255,255,255,.5), 0 3px 6px rgba(90,64,40,.2)' } }),
      [[6, 13], [26, 11], [44, 14]].map((p, i) => h('span', { key: 'a' + i, style: { position: 'absolute', left: p[0] + 'px', bottom: '7px', width: p[1] + 'px', height: p[1] + 3 + 'px', borderRadius: '46% 46% 50% 50%', background: 'linear-gradient(180deg, #8a5c3e 34%, #c99b6e 34%)', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,.3)' } },
        h('span', { style: { position: 'absolute', left: '40%', top: '-4px', width: '2.5px', height: '5px', background: '#6e4830', borderRadius: '2px' } }))),
      h('span', { key: 'j', style: { position: 'absolute', left: '64px', bottom: '7px', width: '14px', height: '17px', borderRadius: '4px', background: 'rgba(255,250,240,.75)', boxShadow: 'inset 1px 1px 2px rgba(255,255,255,.8), inset -1px -2px 2px rgba(140,110,80,.35)' } },
        h('span', { style: { position: 'absolute', left: '2px', bottom: '2px', right: '2px', height: '7px', borderRadius: '2px', background: '#8a5c3e' } }))
    ]));

  FD.herbs = (T, g) => onWallL('fhb', 192, 96, 96, 40,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'rod', style: { position: 'absolute', left: '0', top: '4px', right: '0', height: '5px', borderRadius: '3px', background: T.woodD, boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,.4)' } }),
      [[10, 22, '#8fa070'], [40, 26, '#74945e'], [70, 20, '#a3b184']].map((p, i) => h('span', { key: 'h' + i, style: { position: 'absolute', left: p[0] + 'px', top: '9px', width: '13px', height: p[1] + 'px', borderRadius: '40% 40% 50% 50%', background: `linear-gradient(180deg, ${p[2]}, ${sh(p[2], -.12)})`, boxShadow: 'inset 1px 2px 2px rgba(255,255,255,.3)', animation: g ? 'none' : `sway ${5 + i}s ease-in-out ${i * .6}s infinite`, transformOrigin: '50% 0' } },
        h('span', { style: { position: 'absolute', left: '4px', top: '-3px', width: '5px', height: '4px', borderRadius: '2px', background: '#c9b58e' } })))
    ]));

  FD.lantern = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '30px', height: '42px' }, gf(g)) }, [
      h('span', { key: 'h2', style: { position: 'absolute', left: '7px', top: '0', width: '16px', height: '10px', borderRadius: '8px 8px 0 0', border: '3px solid #6e5a48', borderBottom: 'none', boxSizing: 'border-box' } }),
      h('span', { key: 'cap', style: { position: 'absolute', left: '4px', top: '8px', width: '22px', height: '7px', borderRadius: '4px 4px 2px 2px', background: '#6e5a48' } }),
      h('span', { key: 'g2', style: { position: 'absolute', left: '6px', top: '14px', width: '18px', height: '20px', borderRadius: '5px', background: 'radial-gradient(circle at 50% 60%, #ffe9ae, #f2cf6e)', boxShadow: g ? 'none' : '0 0 14px 4px rgba(255,232,160,.75)', animation: g ? 'none' : 'glowpulse 2.2s ease-in-out infinite' } }),
      h('span', { key: 'b', style: { position: 'absolute', left: '4px', top: '33px', width: '22px', height: '6px', borderRadius: '2px 2px 4px 4px', background: '#6e5a48' } })
    ]);
    return [sprite('fln', 112, 252, 0, node), g ? null : shadowOval('flns', 112, 253, 28, 13, .18)].filter(Boolean);
  };

  FD.bearplush = (T, g) => {
    const node = h('div', { style: Object.assign({ position: 'relative', width: '36px', height: '36px' }, gf(g)) }, [
      h('span', { key: 'e1', style: { position: 'absolute', left: '5px', top: '1px', width: '11px', height: '11px', borderRadius: '50%', background: '#b98a63' } }),
      h('span', { key: 'e2', style: { position: 'absolute', left: '20px', top: '1px', width: '11px', height: '11px', borderRadius: '50%', background: '#b98a63' } }),
      h('span', { key: 'hd', style: { position: 'absolute', left: '5px', top: '5px', width: '26px', height: '21px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 30%, #d3a97e, #b98a63)', boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.45)' } }),
      h('span', { key: 'bd', style: { position: 'absolute', left: '3px', top: '20px', width: '30px', height: '16px', borderRadius: '50%', background: 'radial-gradient(circle at 40% 30%, #d3a97e, #b98a63)' } }),
      h('span', { key: 'y1', style: { position: 'absolute', left: '13px', top: '12px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#4b3a2c' } }),
      h('span', { key: 'y2', style: { position: 'absolute', left: '21px', top: '12px', width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#4b3a2c' } }),
      h('span', { key: 'mz', style: { position: 'absolute', left: '15.5px', top: '15px', width: '6px', height: '5px', borderRadius: '50%', background: '#ecd2ae' } })
    ]);
    return [sprite('fbp', 292, 150, 0, node), g ? null : shadowOval('fbps', 292, 151, 30, 13, .16)].filter(Boolean);
  };

  FD.cauldron = (T, g) => {
    const els = [].concat(
      puck('fcd', { x: 34, y: 232, w: 40, d: 36, ht: 24, c: '#6e5a48', ghost: g }),
      box('fcl1', { x: 38, y: 258, w: 6, d: 6, ht: 8, r: 3, z0: -8, c: '#55463a', ghost: g }),
      box('fcl2', { x: 62, y: 258, w: 6, d: 6, ht: 8, r: 3, z0: -8, c: '#55463a', ghost: g })
    );
    if (!g) {
      els.push(h('div', { key: 'fcT', style: { position: 'absolute', left: '39px', top: '236px', width: '30px', height: '27px', transform: 'translateZ(24.6px)', borderRadius: '50%', background: 'radial-gradient(circle at 45% 40%, #b8a274, #96805a)', boxShadow: 'inset 0 3px 6px rgba(0,0,0,.3)' } }));
      els.push(sprite('fcS', 54, 244, 26, h('div', { style: { position: 'relative', width: '20px', height: '26px' } }, steam('fcst', 0, 0, 1.1))));
    }
    return els;
  };

  FD.basket = (T, g) => {
    const els = puck('fbk', { x: 250, y: 212, w: 42, d: 38, ht: 24, c: T.woodL, ghost: g });
    if (!g) {
      els.push(h('div', { key: 'fbkT', style: { position: 'absolute', left: '255px', top: '216px', width: '32px', height: '29px', transform: 'translateZ(24.5px)', borderRadius: '50%', background: `radial-gradient(circle at 45% 40%, ${sh(T.woodL, -.22)}, ${sh(T.woodL, -.36)})`, boxShadow: 'inset 0 3px 6px rgba(0,0,0,.3)' } }));
      els.push(h('div', { key: 'fbkY', style: { position: 'absolute', left: '260px', top: '219px', width: '20px', height: '15px', transform: 'translateZ(25px)', borderRadius: '50% 60% 50% 55%', background: T.accent2, boxShadow: 'inset 2px 2px 3px rgba(255,255,255,.4)' } }));
    }
    return els;
  };

  FD.stars = (T, g) => onWallR('fss', 152, 148, 108, 30,
    h('div', { style: Object.assign({ position: 'absolute', inset: '0' }, gf(g)) }, [
      h('div', { key: 'w', style: { position: 'absolute', left: '0', top: '2px', width: '108px', height: '16px', borderRadius: '0 0 50% 50%', borderBottom: '2px solid rgba(140,110,80,.55)', boxSizing: 'border-box' } }),
      [8, 34, 60, 86].map((lft, i) => h('span', { key: 's' + i, style: { position: 'absolute', left: lft + 'px', top: i % 2 ? '12px' : '17px', fontFamily: '"Fredoka",sans-serif', fontSize: '14px', color: i % 2 ? T.gold : '#ffe9ae', textShadow: '0 0 8px rgba(255,233,174,.8)', animation: g ? 'none' : `twinkle ${2 + (i % 3) * .6}s ease-in-out ${i * .45}s infinite` } }, '✦'))
    ]));

  const FOREST_FURN = [
    { key: 'window', label: 'Forest Window', icon: '🌲', cx: 24, cy: 98, fw: 40, fd: 116, bx: 64, by: 100, wall: true, fx: 98, fy: -117 },
    { key: 'rug', label: 'Mossy Rug', icon: '🌿', cx: 155, cy: 205, fw: 128, fd: 100, bx: 155, by: 205, flat: true },
    { key: 'fireplace', label: 'Stone Fireplace', icon: '🔥', cx: 196, cy: 29, fw: 100, fd: 52, bx: 196, by: 84, sdy: 24 },
    { key: 'logstack', label: 'Log Stack', icon: '🪵', cx: 270, cy: 26, fw: 44, fd: 38, bx: 264, by: 72, sdy: 12 },
    { key: 'bench', label: 'Log Bench', icon: '🪵', cx: 128, cy: 216, fw: 94, fd: 28, bx: 129, by: 258, sdy: 10 },
    { key: 'stump', label: 'Stump Table', icon: '🍄', cx: 110, cy: 170, fw: 44, fd: 40, bx: 206, by: 262, sdy: 10 },
    { key: 'mushlamp', label: 'Mushroom Lamp', icon: '🍄', cx: 110, cy: 176, fw: 48, fd: 36, bx: 230, by: 200, sdy: 32 },
    { key: 'quiltchair', label: 'Quilted Armchair', icon: '🛋', cx: 53, cy: 168, fw: 58, fd: 80, bx: 112, by: 172, sdy: 10 },
    { key: 'pinecones', label: 'Pinecone Garland', icon: '🌰', cx: 24, cy: 222, fw: 30, fd: 112, bx: 66, by: 222, wall: true, fx: 222, fy: -155 },
    { key: 'acornshelf', label: 'Acorn Shelf', icon: '🐿', cx: 100, cy: 20, fw: 82, fd: 28, bx: 100, by: 72, wall: true, fx: 100, fy: -115 },
    { key: 'herbs', label: 'Herb Drying Rack', icon: '🌾', cx: 24, cy: 240, fw: 30, fd: 94, bx: 66, by: 240, wall: true, fx: 240, fy: -116 },
    { key: 'lantern', label: 'Storm Lantern', icon: '🏮', cx: 112, cy: 252, fw: 30, fd: 22, bx: 140, by: 268, sdy: 22 },
    { key: 'bearplush', label: 'Bear Plush', icon: '🧸', cx: 292, cy: 150, fw: 34, fd: 26, bx: 268, by: 176, sdy: 24 },
    { key: 'cauldron', label: 'Tea Cauldron', icon: '🫖', cx: 54, cy: 250, fw: 44, fd: 40, bx: 96, by: 262, sdy: 16 },
    { key: 'basket', label: 'Woven Basket', icon: '🧺', cx: 271, cy: 231, fw: 44, fd: 40, bx: 246, by: 258, sdy: 10 },
    { key: 'stars', label: 'Star Strand', icon: '✨', cx: 206, cy: 20, fw: 106, fd: 26, bx: 206, by: 72, wall: true, fx: 206, fy: -163 }
  ];

  return {
    cafe: { FURN: CAFE_FURN, D: CD },
    beach: { FURN: BEACH_FURN, D: BC },
    forest: { FURN: FOREST_FURN, D: FD }
  };
}
