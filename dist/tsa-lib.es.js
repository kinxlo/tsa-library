import oo, { jsx as T, jsxs as be, Fragment as St } from "react/jsx-runtime";
import * as S from "react";
import se, { forwardRef as un, createElement as Cr, cloneElement as vc, useLayoutEffect as Ec, useEffect as Tr, useState as bt } from "react";
import * as ln from "react-dom";
import ba from "react-dom";
function va(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = va(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Ea() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = va(e)) && (r && (r += " "), r += t);
  return r;
}
const io = "-", Rc = (e) => {
  const t = Sc(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const s = a.split(io);
      return s[0] === "" && s.length !== 1 && s.shift(), Ra(s, t) || wc(a);
    },
    getConflictingClassGroupIds: (a, s) => {
      const c = n[a] || [];
      return s && r[a] ? [...c, ...r[a]] : c;
    }
  };
}, Ra = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ra(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const i = e.join(io);
  return (a = t.validators.find(({
    validator: s
  }) => s(i))) == null ? void 0 : a.classGroupId;
}, Oo = /^\[(.+)\]$/, wc = (e) => {
  if (Oo.test(e)) {
    const t = Oo.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Sc = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    Nr(n[o], r, o, t);
  return r;
}, Nr = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const i = o === "" ? t : Po(t, o);
      i.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (xc(o)) {
        Nr(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([i, a]) => {
      Nr(a, Po(t, i), n, r);
    });
  });
}, Po = (e, t) => {
  let n = e;
  return t.split(io).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, xc = (e) => e.isThemeGetter, Oc = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (i, a) => {
    n.set(i, a), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let a = n.get(i);
      if (a !== void 0)
        return a;
      if ((a = r.get(i)) !== void 0)
        return o(i, a), a;
    },
    set(i, a) {
      n.has(i) ? n.set(i, a) : o(i, a);
    }
  };
}, Ir = "!", Dr = ":", Pc = Dr.length, Ac = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const i = [];
    let a = 0, s = 0, c = 0, u;
    for (let v = 0; v < o.length; v++) {
      let f = o[v];
      if (a === 0 && s === 0) {
        if (f === Dr) {
          i.push(o.slice(c, v)), c = v + Pc;
          continue;
        }
        if (f === "/") {
          u = v;
          continue;
        }
      }
      f === "[" ? a++ : f === "]" ? a-- : f === "(" ? s++ : f === ")" && s--;
    }
    const l = i.length === 0 ? o : o.substring(c), d = Cc(l), m = d !== l, h = u && u > c ? u - c : void 0;
    return {
      modifiers: i,
      hasImportantModifier: m,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + Dr, i = r;
    r = (a) => a.startsWith(o) ? i(a.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: a,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const o = r;
    r = (i) => n({
      className: i,
      parseClassName: o
    });
  }
  return r;
}, Cc = (e) => e.endsWith(Ir) ? e.substring(0, e.length - 1) : e.startsWith(Ir) ? e.substring(1) : e, Tc = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const o = [];
    let i = [];
    return r.forEach((a) => {
      a[0] === "[" || t[a] ? (o.push(...i.sort(), a), i = []) : i.push(a);
    }), o.push(...i.sort()), o;
  };
}, Nc = (e) => ({
  cache: Oc(e.cacheSize),
  parseClassName: Ac(e),
  sortModifiers: Tc(e),
  ...Rc(e)
}), Ic = /\s+/, Dc = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: i
  } = t, a = [], s = e.trim().split(Ic);
  let c = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const l = s[u], {
      isExternal: d,
      modifiers: m,
      hasImportantModifier: h,
      baseClassName: v,
      maybePostfixModifierPosition: f
    } = n(l);
    if (d) {
      c = l + (c.length > 0 ? " " + c : c);
      continue;
    }
    let y = !!f, g = r(y ? v.substring(0, f) : v);
    if (!g) {
      if (!y) {
        c = l + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (g = r(v), !g) {
        c = l + (c.length > 0 ? " " + c : c);
        continue;
      }
      y = !1;
    }
    const w = i(m).join(":"), p = h ? w + Ir : w, R = p + g;
    if (a.includes(R))
      continue;
    a.push(R);
    const E = o(g, y);
    for (let A = 0; A < E.length; ++A) {
      const O = E[A];
      a.push(p + O);
    }
    c = l + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Mc() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = wa(t)) && (r && (r += " "), r += n);
  return r;
}
const wa = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = wa(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Lc(e, ...t) {
  let n, r, o, i = a;
  function a(c) {
    const u = t.reduce((l, d) => d(l), e());
    return n = Nc(u), r = n.cache.get, o = n.cache.set, i = s, s(c);
  }
  function s(c) {
    const u = r(c);
    if (u)
      return u;
    const l = Dc(c, n);
    return o(c, l), l;
  }
  return function() {
    return i(Mc.apply(null, arguments));
  };
}
const Re = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Sa = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, xa = /^\((?:(\w[\w-]*):)?(.+)\)$/i, kc = /^\d+\/\d+$/, jc = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Hc = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, $c = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Fc = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Uc = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, rt = (e) => kc.test(e), ue = (e) => !!e && !Number.isNaN(Number(e)), qe = (e) => !!e && Number.isInteger(Number(e)), Sn = (e) => e.endsWith("%") && ue(e.slice(0, -1)), He = (e) => jc.test(e), Bc = () => !0, qc = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Hc.test(e) && !$c.test(e)
), Oa = () => !1, zc = (e) => Fc.test(e), Xc = (e) => Uc.test(e), Wc = (e) => !Q(e) && !Z(e), Vc = (e) => lt(e, Ca, Oa), Q = (e) => Sa.test(e), Qe = (e) => lt(e, Ta, qc), xn = (e) => lt(e, Zc, ue), Ao = (e) => lt(e, Pa, Oa), Gc = (e) => lt(e, Aa, Xc), Pt = (e) => lt(e, Na, zc), Z = (e) => xa.test(e), gt = (e) => ft(e, Ta), Kc = (e) => ft(e, Jc), Co = (e) => ft(e, Pa), Yc = (e) => ft(e, Ca), Qc = (e) => ft(e, Aa), At = (e) => ft(e, Na, !0), lt = (e, t, n) => {
  const r = Sa.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, ft = (e, t, n = !1) => {
  const r = xa.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Pa = (e) => e === "position" || e === "percentage", Aa = (e) => e === "image" || e === "url", Ca = (e) => e === "length" || e === "size" || e === "bg-size", Ta = (e) => e === "length", Zc = (e) => e === "number", Jc = (e) => e === "family-name", Na = (e) => e === "shadow", eu = () => {
  const e = Re("color"), t = Re("font"), n = Re("text"), r = Re("font-weight"), o = Re("tracking"), i = Re("leading"), a = Re("breakpoint"), s = Re("container"), c = Re("spacing"), u = Re("radius"), l = Re("shadow"), d = Re("inset-shadow"), m = Re("text-shadow"), h = Re("drop-shadow"), v = Re("blur"), f = Re("perspective"), y = Re("aspect"), g = Re("ease"), w = Re("animate"), p = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], R = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], E = () => [...R(), Z, Q], A = () => ["auto", "hidden", "clip", "visible", "scroll"], O = () => ["auto", "contain", "none"], P = () => [Z, Q, c], I = () => [rt, "full", "auto", ...P()], C = () => [qe, "none", "subgrid", Z, Q], D = () => ["auto", {
    span: ["full", qe, Z, Q]
  }, qe, Z, Q], L = () => [qe, "auto", Z, Q], q = () => ["auto", "min", "max", "fr", Z, Q], k = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], B = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], H = () => ["auto", ...P()], K = () => [rt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...P()], N = () => [e, Z, Q], X = () => [...R(), Co, Ao, {
    position: [Z, Q]
  }], ee = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ce = () => ["auto", "cover", "contain", Yc, Vc, {
    size: [Z, Q]
  }], oe = () => [Sn, gt, Qe], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    Z,
    Q
  ], Y = () => ["", ue, gt, Qe], fe = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], x = () => [ue, Sn, Co, Ao], J = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    v,
    Z,
    Q
  ], W = () => ["none", ue, Z, Q], G = () => ["none", ue, Z, Q], _ = () => [ue, Z, Q], b = () => [rt, "full", ...P()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [He],
      breakpoint: [He],
      color: [Bc],
      container: [He],
      "drop-shadow": [He],
      ease: ["in", "out", "in-out"],
      font: [Wc],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [He],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [He],
      shadow: [He],
      spacing: ["px", ue],
      text: [He],
      "text-shadow": [He],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", rt, Q, Z, y]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ue, Q, Z, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": p()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": p()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: E()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: A()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": A()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": A()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: O()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": O()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": O()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: I()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": I()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": I()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: I()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: I()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: I()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: I()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: I()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: I()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [qe, "auto", Z, Q]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [rt, "full", "auto", s, ...P()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [ue, rt, "auto", "initial", "none", Q]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", ue, Z, Q]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", ue, Z, Q]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [qe, "first", "last", "none", Z, Q]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": C()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: D()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": L()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": L()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": C()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: D()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": L()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": L()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": q()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": q()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: P()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": P()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": P()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...k(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...B(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...B()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...k()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...B(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...B(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": k()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...B(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...B()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: P()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: P()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: P()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: P()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: P()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: P()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: P()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: P()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: P()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: H()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: H()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: H()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: H()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: H()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: H()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: H()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: H()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: H()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": P()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": P()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: K()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...K()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...K()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          s,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [a]
          },
          ...K()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...K()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...K()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...K()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, gt, Qe]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [r, Z, xn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", Sn, Q]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Kc, Q, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [o, Z, Q]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [ue, "none", Z, xn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
          ...P()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", Z, Q]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", Z, Q]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: N()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: N()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...fe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [ue, "from-font", "auto", Z, Qe]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: N()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [ue, "auto", Z, Q]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: P()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", Z, Q]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", Z, Q]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: X()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ee()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ce()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, qe, Z, Q],
          radial: ["", Z, Q],
          conic: [qe, Z, Q]
        }, Qc, Gc]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: N()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: oe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: oe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: oe()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: N()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: N()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: N()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: ne()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": ne()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": ne()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": ne()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": ne()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": ne()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": ne()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": ne()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": ne()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": ne()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": ne()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": ne()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": ne()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": ne()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": ne()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Y()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Y()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Y()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Y()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Y()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Y()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Y()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Y()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Y()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Y()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": Y()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...fe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...fe(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: N()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": N()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": N()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": N()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": N()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": N()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": N()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": N()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": N()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: N()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...fe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [ue, Z, Q]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", ue, gt, Qe]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: N()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          l,
          At,
          Pt
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: N()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, At, Pt]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": N()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Y()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: N()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [ue, Qe]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": N()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Y()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": N()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", m, At, Pt]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": N()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [ue, Z, Q]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ie(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ie()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [ue]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": x()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": x()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": N()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": x()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": x()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": N()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": x()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": x()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": N()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": x()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": x()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": N()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": x()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": x()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": N()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": x()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": x()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": N()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": x()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": x()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": N()
      }],
      "mask-image-radial": [{
        "mask-radial": [Z, Q]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": x()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": x()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": N()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": R()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [ue]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": x()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": x()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": N()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: X()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ee()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ce()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", Z, Q]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          Z,
          Q
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: J()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [ue, Z, Q]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [ue, Z, Q]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          h,
          At,
          Pt
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": N()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", ue, Z, Q]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [ue, Z, Q]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", ue, Z, Q]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [ue, Z, Q]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", ue, Z, Q]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          Z,
          Q
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": J()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [ue, Z, Q]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [ue, Z, Q]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", ue, Z, Q]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [ue, Z, Q]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", ue, Z, Q]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [ue, Z, Q]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [ue, Z, Q]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", ue, Z, Q]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": P()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": P()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": P()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", Z, Q]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [ue, "initial", Z, Q]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", g, Z, Q]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [ue, Z, Q]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, Z, Q]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [f, Z, Q]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": E()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: W()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": W()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": W()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": W()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: G()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": G()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": G()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": G()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: _()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": _()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": _()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [Z, Q, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: E()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: b()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": b()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": b()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": b()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: N()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: N()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", Z, Q]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": P()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": P()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": P()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": P()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": P()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": P()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": P()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": P()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": P()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": P()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": P()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": P()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": P()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": P()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": P()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": P()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": P()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": P()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", Z, Q]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...N()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [ue, gt, Qe, xn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...N()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, tu = /* @__PURE__ */ Lc(eu);
function we(...e) {
  return tu(Ea(e));
}
function To(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ia(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = To(o, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : To(e[o], null);
        }
      };
  };
}
function Se(...e) {
  return S.useCallback(Ia(...e), e);
}
// @__NO_SIDE_EFFECTS__
function vt(e) {
  const t = /* @__PURE__ */ ru(e), n = S.forwardRef((r, o) => {
    const { children: i, ...a } = r, s = S.Children.toArray(i), c = s.find(iu);
    if (c) {
      const u = c.props.children, l = s.map((d) => d === c ? S.Children.count(u) > 1 ? S.Children.only(null) : S.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ T(t, { ...a, ref: o, children: S.isValidElement(u) ? S.cloneElement(u, void 0, l) : null });
    }
    return /* @__PURE__ */ T(t, { ...a, ref: o, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
var nu = /* @__PURE__ */ vt("Slot");
// @__NO_SIDE_EFFECTS__
function ru(e) {
  const t = S.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (S.isValidElement(o)) {
      const a = su(o), s = au(i, o.props);
      return o.type !== S.Fragment && (s.ref = r ? Ia(r, a) : a), S.cloneElement(o, s);
    }
    return S.Children.count(o) > 1 ? S.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ou = Symbol("radix.slottable");
function iu(e) {
  return S.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ou;
}
function au(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...s) => {
      i(...s), o(...s);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...i } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function su(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const No = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Io = Ea, cu = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Io(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: i } = t, a = Object.keys(o).map((u) => {
    const l = n == null ? void 0 : n[u], d = i == null ? void 0 : i[u];
    if (l === null) return null;
    const m = No(l) || No(d);
    return o[u][m];
  }), s = n && Object.entries(n).reduce((u, l) => {
    let [d, m] = l;
    return m === void 0 || (u[d] = m), u;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, l) => {
    let { class: d, className: m, ...h } = l;
    return Object.entries(h).every((v) => {
      let [f, y] = v;
      return Array.isArray(y) ? y.includes({
        ...i,
        ...s
      }[f]) : {
        ...i,
        ...s
      }[f] === y;
    }) ? [
      ...u,
      d,
      m
    ] : u;
  }, []);
  return Io(e, a, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, uu = cu(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-default text-default-foreground shadow",
        primary: "bg-primary text-primary-foreground shadow",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover",
        subtle: "bg-subtle text-subtle-foreground shadow-sm hover:bg-subtle-hover",
        loading: "bg-loading text-loading-foreground shadow-sm hover:bg-loading-hover opacity-50 hover:opacity-100 transition-opacity duration-500 ease-out",
        outline: "bg-outline text-outline-foreground shadow-sm border border-border hover:bg-outline-hover",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-link underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8  px-3 text-xs",
        lg: "h-10  px-8",
        xl: "h-12  px-8",
        link: "h-9 px-0 py-2",
        icon: "px-2 py-2",
        circle: "px-3 py-3 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Jt = un(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ T(r ? nu : "button", { className: we(uu({ variant: t, size: n, className: e })), ref: i, ...o })
);
Jt.displayName = "Button";
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lu = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), fu = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Do = (e) => {
  const t = fu(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Da = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), du = (e) => {
  for (const t in e)
    if (t.startsWith("aria-") || t === "role" || t === "title")
      return !0;
};
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var pu = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hu = un(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: i,
    iconNode: a,
    ...s
  }, c) => Cr(
    "svg",
    {
      ref: c,
      ...pu,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Da("lucide", o),
      ...!i && !du(s) && { "aria-hidden": "true" },
      ...s
    },
    [
      ...a.map(([u, l]) => Cr(u, l)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ue = (e, t) => {
  const n = un(
    ({ className: r, ...o }, i) => Cr(hu, {
      ref: i,
      iconNode: t,
      className: Da(
        `lucide-${lu(Do(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Do(e), n;
};
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mu = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], gu = Ue("check", mu);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yu = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ma = Ue("chevron-down", yu);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _u = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], bu = Ue("chevron-up", _u);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vu = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], Eu = Ue("eye-off", vu);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ru = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], wu = Ue("eye", Ru);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Su = [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
], xu = Ue("loader", Su);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ou = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Pu = Ue("menu", Ou);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Au = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Cu = Ue("plus", Au);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tu = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Nu = Ue("x", Tu);
function La(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Mr = { exports: {} }, dt = {};
function ka(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (ka = function(r) {
    return r ? n : t;
  })(e);
}
function Iu(e, t) {
  if (!t && e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var n = ka(t);
  if (n && n.has(e)) return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
dt._ = Iu;
var Ct = { exports: {} }, On = {}, Mo;
function ja() {
  return Mo || (Mo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, s) {
      for (var c in s) Object.defineProperty(a, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      assign: function() {
        return i;
      },
      searchParamsToUrlQuery: function() {
        return n;
      },
      urlQueryToSearchParams: function() {
        return o;
      }
    });
    function n(a) {
      const s = {};
      for (const [c, u] of a.entries()) {
        const l = s[c];
        typeof l > "u" ? s[c] = u : Array.isArray(l) ? l.push(u) : s[c] = [
          l,
          u
        ];
      }
      return s;
    }
    function r(a) {
      return typeof a == "string" ? a : typeof a == "number" && !isNaN(a) || typeof a == "boolean" ? String(a) : "";
    }
    function o(a) {
      const s = new URLSearchParams();
      for (const [c, u] of Object.entries(a))
        if (Array.isArray(u))
          for (const l of u)
            s.append(c, r(l));
        else
          s.set(c, r(u));
      return s;
    }
    function i(a) {
      for (var s = arguments.length, c = new Array(s > 1 ? s - 1 : 0), u = 1; u < s; u++)
        c[u - 1] = arguments[u];
      for (const l of c) {
        for (const d of l.keys())
          a.delete(d);
        for (const [d, m] of l.entries())
          a.append(d, m);
      }
      return a;
    }
  }(On)), On;
}
var Pn = {}, Lo;
function Ha() {
  return Lo || (Lo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var l in u) Object.defineProperty(c, l, {
        enumerable: !0,
        get: u[l]
      });
    }
    t(e, {
      formatUrl: function() {
        return i;
      },
      formatWithValidation: function() {
        return s;
      },
      urlObjectKeys: function() {
        return a;
      }
    });
    const r = /* @__PURE__ */ dt._(ja()), o = /https?|ftp|gopher|file/;
    function i(c) {
      let { auth: u, hostname: l } = c, d = c.protocol || "", m = c.pathname || "", h = c.hash || "", v = c.query || "", f = !1;
      u = u ? encodeURIComponent(u).replace(/%3A/i, ":") + "@" : "", c.host ? f = u + c.host : l && (f = u + (~l.indexOf(":") ? "[" + l + "]" : l), c.port && (f += ":" + c.port)), v && typeof v == "object" && (v = String(r.urlQueryToSearchParams(v)));
      let y = c.search || v && "?" + v || "";
      return d && !d.endsWith(":") && (d += ":"), c.slashes || (!d || o.test(d)) && f !== !1 ? (f = "//" + (f || ""), m && m[0] !== "/" && (m = "/" + m)) : f || (f = ""), h && h[0] !== "#" && (h = "#" + h), y && y[0] !== "?" && (y = "?" + y), m = m.replace(/[?#]/g, encodeURIComponent), y = y.replace("#", "%23"), "" + d + f + m + y + h;
    }
    const a = [
      "auth",
      "hash",
      "host",
      "hostname",
      "href",
      "path",
      "pathname",
      "port",
      "protocol",
      "query",
      "search",
      "slashes"
    ];
    function s(c) {
      return process.env.NODE_ENV === "development" && c !== null && typeof c == "object" && Object.keys(c).forEach((u) => {
        a.includes(u) || console.warn("Unknown key passed via urlObject into url.format: " + u);
      }), i(c);
    }
  }(Pn)), Pn;
}
var An = {}, ko;
function Du() {
  return ko || (ko = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "omit", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n, r) {
      const o = {};
      return Object.keys(n).forEach((i) => {
        r.includes(i) || (o[i] = n[i]);
      }), o;
    }
  }(An)), An;
}
var Cn = {}, jo;
function fn() {
  return jo || (jo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(R, E) {
      for (var A in E) Object.defineProperty(R, A, {
        enumerable: !0,
        get: E[A]
      });
    }
    t(e, {
      DecodeError: function() {
        return v;
      },
      MiddlewareNotFoundError: function() {
        return w;
      },
      MissingStaticPage: function() {
        return g;
      },
      NormalizeError: function() {
        return f;
      },
      PageNotFoundError: function() {
        return y;
      },
      SP: function() {
        return m;
      },
      ST: function() {
        return h;
      },
      WEB_VITALS: function() {
        return n;
      },
      execOnce: function() {
        return r;
      },
      getDisplayName: function() {
        return c;
      },
      getLocationOrigin: function() {
        return a;
      },
      getURL: function() {
        return s;
      },
      isAbsoluteUrl: function() {
        return i;
      },
      isResSent: function() {
        return u;
      },
      loadGetInitialProps: function() {
        return d;
      },
      normalizeRepeatedSlashes: function() {
        return l;
      },
      stringifyError: function() {
        return p;
      }
    });
    const n = [
      "CLS",
      "FCP",
      "FID",
      "INP",
      "LCP",
      "TTFB"
    ];
    function r(R) {
      let E = !1, A;
      return function() {
        for (var O = arguments.length, P = new Array(O), I = 0; I < O; I++)
          P[I] = arguments[I];
        return E || (E = !0, A = R(...P)), A;
      };
    }
    const o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, i = (R) => o.test(R);
    function a() {
      const { protocol: R, hostname: E, port: A } = window.location;
      return R + "//" + E + (A ? ":" + A : "");
    }
    function s() {
      const { href: R } = window.location, E = a();
      return R.substring(E.length);
    }
    function c(R) {
      return typeof R == "string" ? R : R.displayName || R.name || "Unknown";
    }
    function u(R) {
      return R.finished || R.headersSent;
    }
    function l(R) {
      const E = R.split("?");
      return E[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (E[1] ? "?" + E.slice(1).join("?") : "");
    }
    async function d(R, E) {
      if (process.env.NODE_ENV !== "production") {
        var A;
        if ((A = R.prototype) != null && A.getInitialProps) {
          const I = '"' + c(R) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
          throw Object.defineProperty(new Error(I), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0
          });
        }
      }
      const O = E.res || E.ctx && E.ctx.res;
      if (!R.getInitialProps)
        return E.ctx && E.Component ? {
          pageProps: await d(E.Component, E.ctx)
        } : {};
      const P = await R.getInitialProps(E);
      if (O && u(O))
        return P;
      if (!P) {
        const I = '"' + c(R) + '.getInitialProps()" should resolve to an object. But found "' + P + '" instead.';
        throw Object.defineProperty(new Error(I), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0
        });
      }
      return process.env.NODE_ENV !== "production" && Object.keys(P).length === 0 && !E.ctx && console.warn("" + c(R) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps"), P;
    }
    const m = typeof performance < "u", h = m && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((R) => typeof performance[R] == "function");
    class v extends Error {
    }
    class f extends Error {
    }
    class y extends Error {
      constructor(E) {
        super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = "Cannot find module for page: " + E;
      }
    }
    class g extends Error {
      constructor(E, A) {
        super(), this.message = "Failed to load static file for page: " + E + " " + A;
      }
    }
    class w extends Error {
      constructor() {
        super(), this.code = "ENOENT", this.message = "Cannot find the middleware module";
      }
    }
    function p(R) {
      return JSON.stringify({
        message: R.message,
        stack: R.stack
      });
    }
  }(Cn)), Cn;
}
var Tt = { exports: {} }, Tn = {}, Ho;
function $a() {
  return Ho || (Ho = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "removeTrailingSlash", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n) {
      return n.replace(/\/$/, "") || "/";
    }
  }(Tn)), Tn;
}
var Nn = {}, $o;
function ao() {
  return $o || ($o = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "parsePath", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n) {
      const r = n.indexOf("#"), o = n.indexOf("?"), i = o > -1 && (r < 0 || o < r);
      return i || r > -1 ? {
        pathname: n.substring(0, i ? o : r),
        query: i ? n.substring(o, r > -1 ? r : void 0) : "",
        hash: r > -1 ? n.slice(r) : ""
      } : {
        pathname: n,
        query: "",
        hash: ""
      };
    }
  }(Nn)), Nn;
}
var Fo;
function dn() {
  return Fo || (Fo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizePathTrailingSlash", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = $a(), r = ao(), o = (i) => {
      if (!i.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH)
        return i;
      const { pathname: a, query: s, hash: c } = (0, r.parsePath)(i);
      return process.env.__NEXT_TRAILING_SLASH ? /\.[^/]+\/?$/.test(a) ? "" + (0, n.removeTrailingSlash)(a) + s + c : a.endsWith("/") ? "" + a + s + c : a + "/" + s + c : "" + (0, n.removeTrailingSlash)(a) + s + c;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Tt, Tt.exports)), Tt.exports;
}
var In = {}, Nt = { exports: {} }, Dn = {}, Uo;
function Fa() {
  return Uo || (Uo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "pathHasPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = ao();
    function n(r, o) {
      if (typeof r != "string")
        return !1;
      const { pathname: i } = (0, t.parsePath)(r);
      return i === o || i.startsWith(o + "/");
    }
  }(Dn)), Dn;
}
var Bo;
function Mu() {
  return Bo || (Bo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "hasBasePath", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Fa(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(i) {
      return (0, n.pathHasPrefix)(i, r);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Nt, Nt.exports)), Nt.exports;
}
var qo;
function Ua() {
  return qo || (qo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isLocalURL", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = fn(), n = Mu();
    function r(o) {
      if (!(0, t.isAbsoluteUrl)(o)) return !0;
      try {
        const i = (0, t.getLocationOrigin)(), a = new URL(o, i);
        return a.origin === i && (0, n.hasBasePath)(a.pathname);
      } catch {
        return !1;
      }
    }
  }(In)), In;
}
var Mn = {}, Ln = {}, zo;
function Lu() {
  return zo || (zo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var s in a) Object.defineProperty(i, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    t(e, {
      getSortedRouteObjects: function() {
        return o;
      },
      getSortedRoutes: function() {
        return r;
      }
    });
    class n {
      insert(a) {
        this._insert(a.split("/").filter(Boolean), [], !1);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(a) {
        a === void 0 && (a = "/");
        const s = [
          ...this.children.keys()
        ].sort();
        this.slugName !== null && s.splice(s.indexOf("[]"), 1), this.restSlugName !== null && s.splice(s.indexOf("[...]"), 1), this.optionalRestSlugName !== null && s.splice(s.indexOf("[[...]]"), 1);
        const c = s.map((u) => this.children.get(u)._smoosh("" + a + u + "/")).reduce((u, l) => [
          ...u,
          ...l
        ], []);
        if (this.slugName !== null && c.push(...this.children.get("[]")._smoosh(a + "[" + this.slugName + "]/")), !this.placeholder) {
          const u = a === "/" ? "/" : a.slice(0, -1);
          if (this.optionalRestSlugName != null)
            throw Object.defineProperty(new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + u + '" and "' + u + "[[..." + this.optionalRestSlugName + ']]").'), "__NEXT_ERROR_CODE", {
              value: "E458",
              enumerable: !1,
              configurable: !0
            });
          c.unshift(u);
        }
        return this.restSlugName !== null && c.push(...this.children.get("[...]")._smoosh(a + "[..." + this.restSlugName + "]/")), this.optionalRestSlugName !== null && c.push(...this.children.get("[[...]]")._smoosh(a + "[[..." + this.optionalRestSlugName + "]]/")), c;
      }
      _insert(a, s, c) {
        if (a.length === 0) {
          this.placeholder = !1;
          return;
        }
        if (c)
          throw Object.defineProperty(new Error("Catch-all must be the last part of the URL."), "__NEXT_ERROR_CODE", {
            value: "E392",
            enumerable: !1,
            configurable: !0
          });
        let u = a[0];
        if (u.startsWith("[") && u.endsWith("]")) {
          let m = function(h, v) {
            if (h !== null && h !== v)
              throw Object.defineProperty(new Error("You cannot use different slug names for the same dynamic path ('" + h + "' !== '" + v + "')."), "__NEXT_ERROR_CODE", {
                value: "E337",
                enumerable: !1,
                configurable: !0
              });
            s.forEach((f) => {
              if (f === v)
                throw Object.defineProperty(new Error('You cannot have the same slug name "' + v + '" repeat within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E247",
                  enumerable: !1,
                  configurable: !0
                });
              if (f.replace(/\W/g, "") === u.replace(/\W/g, ""))
                throw Object.defineProperty(new Error('You cannot have the slug names "' + f + '" and "' + v + '" differ only by non-word symbols within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E499",
                  enumerable: !1,
                  configurable: !0
                });
            }), s.push(v);
          }, l = u.slice(1, -1), d = !1;
          if (l.startsWith("[") && l.endsWith("]") && (l = l.slice(1, -1), d = !0), l.startsWith("…"))
            throw Object.defineProperty(new Error("Detected a three-dot character ('…') at ('" + l + "'). Did you mean ('...')?"), "__NEXT_ERROR_CODE", {
              value: "E147",
              enumerable: !1,
              configurable: !0
            });
          if (l.startsWith("...") && (l = l.substring(3), c = !0), l.startsWith("[") || l.endsWith("]"))
            throw Object.defineProperty(new Error("Segment names may not start or end with extra brackets ('" + l + "')."), "__NEXT_ERROR_CODE", {
              value: "E421",
              enumerable: !1,
              configurable: !0
            });
          if (l.startsWith("."))
            throw Object.defineProperty(new Error("Segment names may not start with erroneous periods ('" + l + "')."), "__NEXT_ERROR_CODE", {
              value: "E288",
              enumerable: !1,
              configurable: !0
            });
          if (c)
            if (d) {
              if (this.restSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + a[0] + '" ).'), "__NEXT_ERROR_CODE", {
                  value: "E299",
                  enumerable: !1,
                  configurable: !0
                });
              m(this.optionalRestSlugName, l), this.optionalRestSlugName = l, u = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + a[0] + '").'), "__NEXT_ERROR_CODE", {
                  value: "E300",
                  enumerable: !1,
                  configurable: !0
                });
              m(this.restSlugName, l), this.restSlugName = l, u = "[...]";
            }
          else {
            if (d)
              throw Object.defineProperty(new Error('Optional route parameters are not yet supported ("' + a[0] + '").'), "__NEXT_ERROR_CODE", {
                value: "E435",
                enumerable: !1,
                configurable: !0
              });
            m(this.slugName, l), this.slugName = l, u = "[]";
          }
        }
        this.children.has(u) || this.children.set(u, new n()), this.children.get(u)._insert(a.slice(1), s, c);
      }
      constructor() {
        this.placeholder = !0, this.children = /* @__PURE__ */ new Map(), this.slugName = null, this.restSlugName = null, this.optionalRestSlugName = null;
      }
    }
    function r(i) {
      const a = new n();
      return i.forEach((s) => a.insert(s)), a.smoosh();
    }
    function o(i, a) {
      const s = {}, c = [];
      for (let l = 0; l < i.length; l++) {
        const d = a(i[l]);
        s[d] = l, c[l] = d;
      }
      return r(c).map((l) => i[s[l]]);
    }
  }(Ln)), Ln;
}
var kn = {}, jn = {}, Hn = {}, $n = {}, Xo;
function ku() {
  return Xo || (Xo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ensureLeadingSlash", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n) {
      return n.startsWith("/") ? n : "/" + n;
    }
  }($n)), $n;
}
var so = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(s, c) {
    for (var u in c) Object.defineProperty(s, u, {
      enumerable: !0,
      get: c[u]
    });
  }
  t(e, {
    DEFAULT_SEGMENT_KEY: function() {
      return a;
    },
    PAGE_SEGMENT_KEY: function() {
      return i;
    },
    addSearchParamsIfPageSegment: function() {
      return o;
    },
    isGroupSegment: function() {
      return n;
    },
    isParallelRouteSegment: function() {
      return r;
    }
  });
  function n(s) {
    return s[0] === "(" && s.endsWith(")");
  }
  function r(s) {
    return s.startsWith("@") && s !== "@children";
  }
  function o(s, c) {
    if (s.includes(i)) {
      const l = JSON.stringify(c);
      return l !== "{}" ? i + "?" + l : i;
    }
    return s;
  }
  const i = "__PAGE__", a = "__DEFAULT__";
})(so);
var Wo;
function ju() {
  return Wo || (Wo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, s) {
      for (var c in s) Object.defineProperty(a, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      normalizeAppPath: function() {
        return o;
      },
      normalizeRscURL: function() {
        return i;
      }
    });
    const n = ku(), r = so;
    function o(a) {
      return (0, n.ensureLeadingSlash)(a.split("/").reduce((s, c, u, l) => !c || (0, r.isGroupSegment)(c) || c[0] === "@" || (c === "page" || c === "route") && u === l.length - 1 ? s : s + "/" + c, ""));
    }
    function i(a) {
      return a.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }(Hn)), Hn;
}
var Vo;
function Ba() {
  return Vo || (Vo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, s) {
      for (var c in s) Object.defineProperty(a, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return r;
      },
      extractInterceptionRouteInformation: function() {
        return i;
      },
      isInterceptionRouteAppPath: function() {
        return o;
      }
    });
    const n = ju(), r = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function o(a) {
      return a.split("/").find((s) => r.find((c) => s.startsWith(c))) !== void 0;
    }
    function i(a) {
      let s, c, u;
      for (const l of a.split("/"))
        if (c = r.find((d) => l.startsWith(d)), c) {
          [s, u] = a.split(c, 2);
          break;
        }
      if (!s || !c || !u)
        throw Object.defineProperty(new Error("Invalid interception route: " + a + ". Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>"), "__NEXT_ERROR_CODE", {
          value: "E269",
          enumerable: !1,
          configurable: !0
        });
      switch (s = (0, n.normalizeAppPath)(s), c) {
        case "(.)":
          s === "/" ? u = "/" + u : u = s + "/" + u;
          break;
        case "(..)":
          if (s === "/")
            throw Object.defineProperty(new Error("Invalid interception route: " + a + ". Cannot use (..) marker at the root level, use (.) instead."), "__NEXT_ERROR_CODE", {
              value: "E207",
              enumerable: !1,
              configurable: !0
            });
          u = s.split("/").slice(0, -1).concat(u).join("/");
          break;
        case "(...)":
          u = "/" + u;
          break;
        case "(..)(..)":
          const l = s.split("/");
          if (l.length <= 2)
            throw Object.defineProperty(new Error("Invalid interception route: " + a + ". Cannot use (..)(..) marker at the root level or one level up."), "__NEXT_ERROR_CODE", {
              value: "E486",
              enumerable: !1,
              configurable: !0
            });
          u = l.slice(0, -2).concat(u).join("/");
          break;
        default:
          throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
            value: "E112",
            enumerable: !1,
            configurable: !0
          });
      }
      return {
        interceptingRoute: s,
        interceptedRoute: u
      };
    }
  }(jn)), jn;
}
var Go;
function Hu() {
  return Go || (Go = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isDynamicRoute", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = Ba(), n = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, r = /\/\[[^/]+\](?=\/|$)/;
    function o(i, a) {
      return a === void 0 && (a = !0), (0, t.isInterceptionRouteAppPath)(i) && (i = (0, t.extractInterceptionRouteInformation)(i).interceptedRoute), a ? r.test(i) : n.test(i);
    }
  }(kn)), kn;
}
var Ko;
function $u() {
  return Ko || (Ko = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(o, i) {
      for (var a in i) Object.defineProperty(o, a, {
        enumerable: !0,
        get: i[a]
      });
    }
    t(e, {
      getSortedRouteObjects: function() {
        return n.getSortedRouteObjects;
      },
      getSortedRoutes: function() {
        return n.getSortedRoutes;
      },
      isDynamicRoute: function() {
        return r.isDynamicRoute;
      }
    });
    const n = Lu(), r = Hu();
  }(Mn)), Mn;
}
var Fn = {}, Un = {}, Yo;
function Fu() {
  return Yo || (Yo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getRouteMatcher", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = fn();
    function n(r) {
      let { re: o, groups: i } = r;
      return (a) => {
        const s = o.exec(a);
        if (!s) return !1;
        const c = (l) => {
          try {
            return decodeURIComponent(l);
          } catch {
            throw Object.defineProperty(new t.DecodeError("failed to decode param"), "__NEXT_ERROR_CODE", {
              value: "E528",
              enumerable: !1,
              configurable: !0
            });
          }
        }, u = {};
        for (const [l, d] of Object.entries(i)) {
          const m = s[d.pos];
          m !== void 0 && (d.repeat ? u[l] = m.split("/").map((h) => c(h)) : u[l] = c(m));
        }
        return u;
      };
    }
  }(Un)), Un;
}
var Bn = {}, qn = {}, Qo;
function Uu() {
  return Qo || (Qo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(le, xe) {
      for (var ye in xe) Object.defineProperty(le, ye, {
        enumerable: !0,
        get: xe[ye]
      });
    }
    t(e, {
      ACTION_SUFFIX: function() {
        return d;
      },
      APP_DIR_ALIAS: function() {
        return B;
      },
      CACHE_ONE_YEAR: function() {
        return O;
      },
      DOT_NEXT_ALIAS: function() {
        return q;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return j;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return J;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return _;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return W;
      },
      INFINITE_CACHE: function() {
        return P;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return D;
      },
      MATCHED_PATH_HEADER: function() {
        return o;
      },
      MIDDLEWARE_FILENAME: function() {
        return I;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return C;
      },
      NEXT_BODY_SUFFIX: function() {
        return v;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return A;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return y;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return g;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return E;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return f;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return p;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return R;
      },
      NEXT_DATA_SUFFIX: function() {
        return m;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return r;
      },
      NEXT_META_SUFFIX: function() {
        return h;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return n;
      },
      NEXT_RESUME_HEADER: function() {
        return w;
      },
      NON_STANDARD_NODE_ENV: function() {
        return b;
      },
      PAGES_DIR_ALIAS: function() {
        return L;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return i;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return a;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return oe;
      },
      ROOT_DIR_ALIAS: function() {
        return k;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return ce;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return ee;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return N;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return K;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return X;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return H;
      },
      RSC_PREFETCH_SUFFIX: function() {
        return s;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function() {
        return c;
      },
      RSC_SEGMENT_SUFFIX: function() {
        return u;
      },
      RSC_SUFFIX: function() {
        return l;
      },
      SERVER_PROPS_EXPORT_ERROR: function() {
        return x;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return Y;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return fe;
      },
      SERVER_RUNTIME: function() {
        return F;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return $;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return ne;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return ie;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return G;
      },
      WEBPACK_LAYERS: function() {
        return de;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return he;
      }
    });
    const n = "nxtP", r = "nxtI", o = "x-matched-path", i = "x-prerender-revalidate", a = "x-prerender-revalidate-if-generated", s = ".prefetch.rsc", c = ".segments", u = ".segment.rsc", l = ".rsc", d = ".action", m = ".json", h = ".meta", v = ".body", f = "x-next-cache-tags", y = "x-next-revalidated-tags", g = "x-next-revalidate-tag-token", w = "next-resume", p = 128, R = 256, E = 1024, A = "_N_T_", O = 31536e3, P = 4294967294, I = "middleware", C = `(?:src/)?${I}`, D = "instrumentation", L = "private-next-pages", q = "private-dot-next", k = "private-next-root-dir", B = "private-next-app-dir", H = "private-next-rsc-mod-ref-proxy", K = "private-next-rsc-action-validate", N = "private-next-rsc-server-reference", X = "private-next-rsc-cache-wrapper", ee = "private-next-rsc-action-encryption", ce = "private-next-rsc-action-client-wrapper", oe = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", ne = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", Y = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", fe = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", ie = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", x = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", J = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", W = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", G = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", _ = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", b = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', $ = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", j = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ], F = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    }, V = {
      /**
      * The layer for the shared code between the client and server bundles.
      */
      shared: "shared",
      /**
      * The layer for server-only runtime and picking up `react-server` export conditions.
      * Including app router RSC pages and app router custom routes and metadata routes.
      */
      reactServerComponents: "rsc",
      /**
      * Server Side Rendering layer for app (ssr).
      */
      serverSideRendering: "ssr",
      /**
      * The browser client bundle layer for actions.
      */
      actionBrowser: "action-browser",
      /**
      * The Node.js bundle layer for the API routes.
      */
      apiNode: "api-node",
      /**
      * The Edge Lite bundle layer for the API routes.
      */
      apiEdge: "api-edge",
      /**
      * The layer for the middleware code.
      */
      middleware: "middleware",
      /**
      * The layer for the instrumentation hooks.
      */
      instrument: "instrument",
      /**
      * The layer for assets on the edge.
      */
      edgeAsset: "edge-asset",
      /**
      * The browser client bundle layer for App directory.
      */
      appPagesBrowser: "app-pages-browser",
      /**
      * The browser client bundle layer for Pages directory.
      */
      pagesDirBrowser: "pages-dir-browser",
      /**
      * The Edge Lite bundle layer for Pages directory.
      */
      pagesDirEdge: "pages-dir-edge",
      /**
      * The Node.js bundle layer for Pages directory.
      */
      pagesDirNode: "pages-dir-node"
    }, de = {
      ...V,
      GROUP: {
        builtinReact: [
          V.reactServerComponents,
          V.actionBrowser
        ],
        serverOnly: [
          V.reactServerComponents,
          V.actionBrowser,
          V.instrument,
          V.middleware
        ],
        neutralTarget: [
          // pages api
          V.apiNode,
          V.apiEdge
        ],
        clientOnly: [
          V.serverSideRendering,
          V.appPagesBrowser
        ],
        bundled: [
          V.reactServerComponents,
          V.actionBrowser,
          V.serverSideRendering,
          V.appPagesBrowser,
          V.shared,
          V.instrument,
          V.middleware
        ],
        appPages: [
          // app router pages and layouts
          V.reactServerComponents,
          V.serverSideRendering,
          V.appPagesBrowser,
          V.actionBrowser
        ]
      }
    }, he = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }(qn)), qn;
}
var zn = {}, Zo;
function Bu() {
  return Zo || (Zo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "escapeStringRegexp", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = /[|\\{}()[\]^$+*?.-]/, n = /[|\\{}()[\]^$+*?.-]/g;
    function r(o) {
      return t.test(o) ? o.replace(n, "\\$&") : o;
    }
  }(zn)), zn;
}
var Jo;
function qu() {
  return Jo || (Jo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(y, g) {
      for (var w in g) Object.defineProperty(y, w, {
        enumerable: !0,
        get: g[w]
      });
    }
    t(e, {
      getNamedMiddlewareRegex: function() {
        return f;
      },
      getNamedRouteRegex: function() {
        return v;
      },
      getRouteRegex: function() {
        return l;
      },
      parseParameter: function() {
        return s;
      }
    });
    const n = Uu(), r = Ba(), o = Bu(), i = $a(), a = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
    function s(y) {
      const g = y.match(a);
      return c(g ? g[2] : y);
    }
    function c(y) {
      const g = y.startsWith("[") && y.endsWith("]");
      g && (y = y.slice(1, -1));
      const w = y.startsWith("...");
      return w && (y = y.slice(3)), {
        key: y,
        repeat: w,
        optional: g
      };
    }
    function u(y, g, w) {
      const p = {};
      let R = 1;
      const E = [];
      for (const A of (0, i.removeTrailingSlash)(y).slice(1).split("/")) {
        const O = r.INTERCEPTION_ROUTE_MARKERS.find((I) => A.startsWith(I)), P = A.match(a);
        if (O && P && P[2]) {
          const { key: I, optional: C, repeat: D } = c(P[2]);
          p[I] = {
            pos: R++,
            repeat: D,
            optional: C
          }, E.push("/" + (0, o.escapeStringRegexp)(O) + "([^/]+?)");
        } else if (P && P[2]) {
          const { key: I, repeat: C, optional: D } = c(P[2]);
          p[I] = {
            pos: R++,
            repeat: C,
            optional: D
          }, w && P[1] && E.push("/" + (0, o.escapeStringRegexp)(P[1]));
          let L = C ? D ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
          w && P[1] && (L = L.substring(1)), E.push(L);
        } else
          E.push("/" + (0, o.escapeStringRegexp)(A));
        g && P && P[3] && E.push((0, o.escapeStringRegexp)(P[3]));
      }
      return {
        parameterizedRoute: E.join(""),
        groups: p
      };
    }
    function l(y, g) {
      let { includeSuffix: w = !1, includePrefix: p = !1, excludeOptionalTrailingSlash: R = !1 } = g === void 0 ? {} : g;
      const { parameterizedRoute: E, groups: A } = u(y, w, p);
      let O = E;
      return R || (O += "(?:/)?"), {
        re: new RegExp("^" + O + "$"),
        groups: A
      };
    }
    function d() {
      let y = 0;
      return () => {
        let g = "", w = ++y;
        for (; w > 0; )
          g += String.fromCharCode(97 + (w - 1) % 26), w = Math.floor((w - 1) / 26);
        return g;
      };
    }
    function m(y) {
      let { interceptionMarker: g, getSafeRouteKey: w, segment: p, routeKeys: R, keyPrefix: E, backreferenceDuplicateKeys: A } = y;
      const { key: O, optional: P, repeat: I } = c(p);
      let C = O.replace(/\W/g, "");
      E && (C = "" + E + C);
      let D = !1;
      (C.length === 0 || C.length > 30) && (D = !0), isNaN(parseInt(C.slice(0, 1))) || (D = !0), D && (C = w());
      const L = C in R;
      E ? R[C] = "" + E + O : R[C] = O;
      const q = g ? (0, o.escapeStringRegexp)(g) : "";
      let k;
      return L && A ? k = "\\k<" + C + ">" : I ? k = "(?<" + C + ">.+?)" : k = "(?<" + C + ">[^/]+?)", P ? "(?:/" + q + k + ")?" : "/" + q + k;
    }
    function h(y, g, w, p, R) {
      const E = d(), A = {}, O = [];
      for (const P of (0, i.removeTrailingSlash)(y).slice(1).split("/")) {
        const I = r.INTERCEPTION_ROUTE_MARKERS.some((D) => P.startsWith(D)), C = P.match(a);
        if (I && C && C[2])
          O.push(m({
            getSafeRouteKey: E,
            interceptionMarker: C[1],
            segment: C[2],
            routeKeys: A,
            keyPrefix: g ? n.NEXT_INTERCEPTION_MARKER_PREFIX : void 0,
            backreferenceDuplicateKeys: R
          }));
        else if (C && C[2]) {
          p && C[1] && O.push("/" + (0, o.escapeStringRegexp)(C[1]));
          let D = m({
            getSafeRouteKey: E,
            segment: C[2],
            routeKeys: A,
            keyPrefix: g ? n.NEXT_QUERY_PARAM_PREFIX : void 0,
            backreferenceDuplicateKeys: R
          });
          p && C[1] && (D = D.substring(1)), O.push(D);
        } else
          O.push("/" + (0, o.escapeStringRegexp)(P));
        w && C && C[3] && O.push((0, o.escapeStringRegexp)(C[3]));
      }
      return {
        namedParameterizedRoute: O.join(""),
        routeKeys: A
      };
    }
    function v(y, g) {
      var w, p, R;
      const E = h(y, g.prefixRouteKeys, (w = g.includeSuffix) != null ? w : !1, (p = g.includePrefix) != null ? p : !1, (R = g.backreferenceDuplicateKeys) != null ? R : !1);
      let A = E.namedParameterizedRoute;
      return g.excludeOptionalTrailingSlash || (A += "(?:/)?"), {
        ...l(y, g),
        namedRegex: "^" + A + "$",
        routeKeys: E.routeKeys
      };
    }
    function f(y, g) {
      const { parameterizedRoute: w } = u(y, !1, !1), { catchAll: p = !0 } = g;
      if (w === "/")
        return {
          namedRegex: "^/" + (p ? ".*" : "") + "$"
        };
      const { namedParameterizedRoute: R } = h(y, !1, !1, !1, !1);
      let E = p ? "(?:(/.*)?)" : "";
      return {
        namedRegex: "^" + R + E + "$"
      };
    }
  }(Bn)), Bn;
}
var ei;
function zu() {
  return ei || (ei = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "interpolateAs", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Fu(), n = qu();
    function r(o, i, a) {
      let s = "";
      const c = (0, n.getRouteRegex)(o), u = c.groups, l = (
        // Try to match the dynamic route against the asPath
        (i !== o ? (0, t.getRouteMatcher)(c)(i) : "") || // Fall back to reading the values from the href
        // TODO: should this take priority; also need to change in the router.
        a
      );
      s = o;
      const d = Object.keys(u);
      return d.every((m) => {
        let h = l[m] || "";
        const { repeat: v, optional: f } = u[m];
        let y = "[" + (v ? "..." : "") + m + "]";
        return f && (y = (h ? "" : "/") + "[" + y + "]"), v && !Array.isArray(h) && (h = [
          h
        ]), (f || m in l) && // Interpolate group into data URL if present
        (s = s.replace(y, v ? h.map(
          // these values should be fully encoded instead of just
          // path delimiter escaped since they are being inserted
          // into the URL and we expect URL encoded segments
          // when parsing dynamic route params
          (g) => encodeURIComponent(g)
        ).join("/") : encodeURIComponent(h)) || "/");
      }) || (s = ""), {
        params: d,
        result: s
      };
    }
  }(Fn)), Fn;
}
var ti;
function Xu() {
  return ti || (ti = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "resolveHref", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const n = ja(), r = Ha(), o = Du(), i = fn(), a = dn(), s = Ua(), c = $u(), u = zu();
    function l(d, m, h) {
      let v, f = typeof m == "string" ? m : (0, r.formatWithValidation)(m);
      const y = f.match(/^[a-zA-Z]{1,}:\/\//), g = y ? f.slice(y[0].length) : f;
      if ((g.split("?", 1)[0] || "").match(/(\/\/|\\)/)) {
        console.error("Invalid href '" + f + "' passed to next/router in page: '" + d.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
        const p = (0, i.normalizeRepeatedSlashes)(g);
        f = (y ? y[0] : "") + p;
      }
      if (!(0, s.isLocalURL)(f))
        return h ? [
          f
        ] : f;
      try {
        v = new URL(f.startsWith("#") ? d.asPath : d.pathname, "http://n");
      } catch {
        v = new URL("/", "http://n");
      }
      try {
        const p = new URL(f, v);
        p.pathname = (0, a.normalizePathTrailingSlash)(p.pathname);
        let R = "";
        if ((0, c.isDynamicRoute)(p.pathname) && p.searchParams && h) {
          const A = (0, n.searchParamsToUrlQuery)(p.searchParams), { result: O, params: P } = (0, u.interpolateAs)(p.pathname, p.pathname, A);
          O && (R = (0, r.formatWithValidation)({
            pathname: O,
            hash: p.hash,
            query: (0, o.omit)(A, P)
          }));
        }
        const E = p.origin === v.origin ? p.href.slice(p.origin.length) : p.href;
        return h ? [
          E,
          R || E
        ] : E;
      } catch {
        return h ? [
          f
        ] : f;
      }
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ct, Ct.exports)), Ct.exports;
}
var It = { exports: {} }, Xn = {}, Wn = {}, ni;
function qa() {
  return ni || (ni = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = ao();
    function n(r, o) {
      if (!r.startsWith("/") || !o)
        return r;
      const { pathname: i, query: a, hash: s } = (0, t.parsePath)(r);
      return "" + o + i + a + s;
    }
  }(Wn)), Wn;
}
var ri;
function Wu() {
  return ri || (ri = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = qa(), n = Fa();
    function r(o, i, a, s) {
      if (!i || i === a) return o;
      const c = o.toLowerCase();
      return !s && ((0, n.pathHasPrefix)(c, "/api") || (0, n.pathHasPrefix)(c, "/" + i.toLowerCase())) ? o : (0, t.addPathPrefix)(o, "/" + i);
    }
  }(Xn)), Xn;
}
var oi;
function Vu() {
  return oi || (oi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = dn(), r = function(o) {
      for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
        a[s - 1] = arguments[s];
      return process.env.__NEXT_I18N_SUPPORT ? (0, n.normalizePathTrailingSlash)(Wu().addLocale(o, ...a)) : o;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(It, It.exports)), It.exports;
}
var Vn = {}, Be = {};
function Gu(e) {
  return e && e.__esModule ? e : { default: e };
}
Be._ = Gu;
var ii;
function za() {
  return ii || (ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "RouterContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ Be._(se)).default.createContext(null);
    process.env.NODE_ENV !== "production" && (r.displayName = "RouterContext");
  }(Vn)), Vn;
}
var Dt = { exports: {} }, Mt = { exports: {} }, ai;
function Ku() {
  return ai || (ai = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(i, a) {
      for (var s in a) Object.defineProperty(i, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    n(t, {
      cancelIdleCallback: function() {
        return o;
      },
      requestIdleCallback: function() {
        return r;
      }
    });
    const r = typeof self < "u" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(i) {
      let a = Date.now();
      return self.setTimeout(function() {
        i({
          didTimeout: !1,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - a));
          }
        });
      }, 1);
    }, o = typeof self < "u" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(i) {
      return clearTimeout(i);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Mt, Mt.exports)), Mt.exports;
}
var si;
function Yu() {
  return si || (si = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useIntersection", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const n = se, r = Ku(), o = typeof IntersectionObserver == "function", i = /* @__PURE__ */ new Map(), a = [];
    function s(l) {
      const d = {
        root: l.root || null,
        margin: l.rootMargin || ""
      }, m = a.find((y) => y.root === d.root && y.margin === d.margin);
      let h;
      if (m && (h = i.get(m), h))
        return h;
      const v = /* @__PURE__ */ new Map(), f = new IntersectionObserver((y) => {
        y.forEach((g) => {
          const w = v.get(g.target), p = g.isIntersecting || g.intersectionRatio > 0;
          w && p && w(p);
        });
      }, l);
      return h = {
        id: d,
        observer: f,
        elements: v
      }, a.push(d), i.set(d, h), h;
    }
    function c(l, d, m) {
      const { id: h, observer: v, elements: f } = s(m);
      return f.set(l, d), v.observe(l), function() {
        if (f.delete(l), v.unobserve(l), f.size === 0) {
          v.disconnect(), i.delete(h);
          const g = a.findIndex((w) => w.root === h.root && w.margin === h.margin);
          g > -1 && a.splice(g, 1);
        }
      };
    }
    function u(l) {
      let { rootRef: d, rootMargin: m, disabled: h } = l;
      const v = h || !o, [f, y] = (0, n.useState)(!1), g = (0, n.useRef)(null), w = (0, n.useCallback)((R) => {
        g.current = R;
      }, []);
      (0, n.useEffect)(() => {
        if (o) {
          if (v || f) return;
          const R = g.current;
          if (R && R.tagName)
            return c(R, (A) => A && y(A), {
              root: d == null ? void 0 : d.current,
              rootMargin: m
            });
        } else if (!f) {
          const R = (0, r.requestIdleCallback)(() => y(!0));
          return () => (0, r.cancelIdleCallback)(R);
        }
      }, [
        v,
        m,
        d,
        f,
        g.current
      ]);
      const p = (0, n.useCallback)(() => {
        y(!1);
      }, []);
      return [
        w,
        f,
        p
      ];
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Dt, Dt.exports)), Dt.exports;
}
var Lt = { exports: {} }, kt = { exports: {} }, Gn = {}, ci;
function Qu() {
  return ci || (ci = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = /* @__PURE__ */ new WeakMap();
    function n(r, o) {
      if (!o) return {
        pathname: r
      };
      let i = t.get(o);
      i || (i = o.map((l) => l.toLowerCase()), t.set(o, i));
      let a;
      const s = r.split("/", 2);
      if (!s[1]) return {
        pathname: r
      };
      const c = s[1].toLowerCase(), u = i.indexOf(c);
      return u < 0 ? {
        pathname: r
      } : (a = o[u], r = r.slice(a.length + 1) || "/", {
        pathname: r,
        detectedLocale: a
      });
    }
  }(Gn)), Gn;
}
var ui;
function Zu() {
  return ui || (ui = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (r, o) => process.env.__NEXT_I18N_SUPPORT ? Qu().normalizeLocalePath(r, o) : {
      pathname: r,
      detectedLocale: void 0
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(kt, kt.exports)), kt.exports;
}
var jt = { exports: {} }, Kn = {}, li;
function Ju() {
  return li || (li = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "detectDomainLocale", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n, r, o) {
      if (n) {
        o && (o = o.toLowerCase());
        for (const s of n) {
          var i, a;
          const c = (i = s.domain) == null ? void 0 : i.split(":", 1)[0].toLowerCase();
          if (r === c || o === s.defaultLocale.toLowerCase() || (a = s.locales) != null && a.some((u) => u.toLowerCase() === o))
            return s;
        }
      }
    }
  }(Kn)), Kn;
}
var fi;
function el() {
  return fi || (fi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "detectDomainLocale", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = function() {
      for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++)
        o[i] = arguments[i];
      if (process.env.__NEXT_I18N_SUPPORT)
        return Ju().detectDomainLocale(...o);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(jt, jt.exports)), jt.exports;
}
var di;
function tl() {
  return di || (di = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "getDomainLocale", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = dn(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(i, a, s, c) {
      if (process.env.__NEXT_I18N_SUPPORT) {
        const u = Zu().normalizeLocalePath, l = el().detectDomainLocale, d = a || u(i, s).detectedLocale, m = l(c, void 0, d);
        if (m) {
          const h = "http" + (m.http ? "" : "s") + "://", v = d === m.defaultLocale ? "" : "/" + d;
          return "" + h + m.domain + (0, n.normalizePathTrailingSlash)("" + r + v + i);
        }
        return !1;
      } else
        return !1;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Lt, Lt.exports)), Lt.exports;
}
var Ht = { exports: {} }, pi;
function nl() {
  return pi || (pi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addBasePath", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = qa(), r = dn(), o = process.env.__NEXT_ROUTER_BASEPATH || "";
    function i(a, s) {
      return (0, r.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !s ? a : (0, n.addPathPrefix)(a, o));
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ht, Ht.exports)), Ht.exports;
}
var $t = { exports: {} }, hi;
function Xa() {
  return hi || (hi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useMergedRef", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = se;
    function r(i, a) {
      const s = (0, n.useRef)(null), c = (0, n.useRef)(null);
      return (0, n.useCallback)((u) => {
        if (u === null) {
          const l = s.current;
          l && (s.current = null, l());
          const d = c.current;
          d && (c.current = null, d());
        } else
          i && (s.current = o(i, u)), a && (c.current = o(a, u));
      }, [
        i,
        a
      ]);
    }
    function o(i, a) {
      if (typeof i == "function") {
        const s = i(a);
        return typeof s == "function" ? s : () => i(null);
      } else
        return i.current = a, () => {
          i.current = null;
        };
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }($t, $t.exports)), $t.exports;
}
var Yn = {}, mi;
function rl() {
  return mi || (mi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "errorOnce", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    let t = (n) => {
    };
    if (process.env.NODE_ENV !== "production") {
      const n = /* @__PURE__ */ new Set();
      t = (r) => {
        n.has(r) || console.error(r), n.add(r);
      };
    }
  }(Yn)), Yn;
}
(function(e, t) {
  "use client";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(C, D) {
    for (var L in D) Object.defineProperty(C, L, {
      enumerable: !0,
      get: D[L]
    });
  }
  n(t, {
    default: function() {
      return I;
    },
    useLinkStatus: function() {
      return P;
    }
  });
  const r = dt, o = oo, i = /* @__PURE__ */ r._(se), a = Xu(), s = Ua(), c = Ha(), u = fn(), l = Vu(), d = za(), m = Yu(), h = tl(), v = nl(), f = Xa(), y = rl(), g = /* @__PURE__ */ new Set();
  function w(C, D, L, q) {
    if (!(typeof window > "u") && (0, s.isLocalURL)(D)) {
      if (!q.bypassPrefetchedCheck) {
        const k = (
          // Let the link's locale prop override the default router locale.
          typeof q.locale < "u" ? q.locale : "locale" in C ? C.locale : void 0
        ), B = D + "%" + L + "%" + k;
        if (g.has(B))
          return;
        g.add(B);
      }
      C.prefetch(D, L, q).catch((k) => {
        if (process.env.NODE_ENV !== "production")
          throw k;
      });
    }
  }
  function p(C) {
    const L = C.currentTarget.getAttribute("target");
    return L && L !== "_self" || C.metaKey || C.ctrlKey || C.shiftKey || C.altKey || // triggers resource download
    C.nativeEvent && C.nativeEvent.which === 2;
  }
  function R(C, D, L, q, k, B, H, K, N) {
    const { nodeName: X } = C.currentTarget;
    if (X.toUpperCase() === "A" && p(C) || C.currentTarget.hasAttribute("download"))
      return;
    if (!(0, s.isLocalURL)(L)) {
      k && (C.preventDefault(), location.replace(L));
      return;
    }
    C.preventDefault(), (() => {
      if (N) {
        let ne = !1;
        if (N({
          preventDefault: () => {
            ne = !0;
          }
        }), ne)
          return;
      }
      const oe = H ?? !0;
      "beforePopState" in D ? D[k ? "replace" : "push"](L, q, {
        shallow: B,
        locale: K,
        scroll: oe
      }) : D[k ? "replace" : "push"](q || L, {
        scroll: oe
      });
    })();
  }
  function E(C) {
    return typeof C == "string" ? C : (0, c.formatUrl)(C);
  }
  const A = /* @__PURE__ */ i.default.forwardRef(function(D, L) {
    let q;
    const { href: k, as: B, children: H, prefetch: K = null, passHref: N, replace: X, shallow: ee, scroll: ce, locale: oe, onClick: ne, onNavigate: Y, onMouseEnter: fe, onTouchStart: ie, legacyBehavior: x = !1, ...J } = D;
    q = H, x && (typeof q == "string" || typeof q == "number") && (q = /* @__PURE__ */ (0, o.jsx)("a", {
      children: q
    }));
    const W = i.default.useContext(d.RouterContext), G = K !== !1;
    if (process.env.NODE_ENV !== "production") {
      let ae = function(M) {
        return Object.defineProperty(new Error("Failed prop type: The prop `" + M.key + "` expects a " + M.expected + " in `<Link>`, but got `" + M.actual + "` instead." + (typeof window < "u" ? `
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
          value: "E319",
          enumerable: !1,
          configurable: !0
        });
      };
      Object.keys({
        href: !0
      }).forEach((M) => {
        if (M === "href" && (D[M] == null || typeof D[M] != "string" && typeof D[M] != "object"))
          throw ae({
            key: M,
            expected: "`string` or `object`",
            actual: D[M] === null ? "null" : typeof D[M]
          });
      }), Object.keys({
        as: !0,
        replace: !0,
        scroll: !0,
        shallow: !0,
        passHref: !0,
        prefetch: !0,
        locale: !0,
        onClick: !0,
        onMouseEnter: !0,
        onTouchStart: !0,
        legacyBehavior: !0,
        onNavigate: !0
      }).forEach((M) => {
        const te = typeof D[M];
        if (M === "as") {
          if (D[M] && te !== "string" && te !== "object")
            throw ae({
              key: M,
              expected: "`string` or `object`",
              actual: te
            });
        } else if (M === "locale") {
          if (D[M] && te !== "string")
            throw ae({
              key: M,
              expected: "`string`",
              actual: te
            });
        } else if (M === "onClick" || M === "onMouseEnter" || M === "onTouchStart" || M === "onNavigate") {
          if (D[M] && te !== "function")
            throw ae({
              key: M,
              expected: "`function`",
              actual: te
            });
        } else if ((M === "replace" || M === "scroll" || M === "shallow" || M === "passHref" || M === "prefetch" || M === "legacyBehavior") && D[M] != null && te !== "boolean")
          throw ae({
            key: M,
            expected: "`boolean`",
            actual: te
          });
      });
    }
    const { href: _, as: b } = i.default.useMemo(() => {
      if (!W) {
        const z = E(k);
        return {
          href: z,
          as: B ? E(B) : z
        };
      }
      const [ae, ge] = (0, a.resolveHref)(W, k, !0);
      return {
        href: ae,
        as: B ? (0, a.resolveHref)(W, B) : ge || ae
      };
    }, [
      W,
      k,
      B
    ]), $ = i.default.useRef(_), j = i.default.useRef(b);
    let F;
    if (x)
      if (process.env.NODE_ENV === "development") {
        ne && console.warn('"onClick" was passed to <Link> with `href` of `' + k + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link'), fe && console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + k + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
        try {
          F = i.default.Children.only(q);
        } catch {
          throw q ? Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + k + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window < "u" ? ` 
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
            value: "E266",
            enumerable: !1,
            configurable: !0
          }) : Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + k + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
            value: "E320",
            enumerable: !1,
            configurable: !0
          });
        }
      } else
        F = i.default.Children.only(q);
    else if (process.env.NODE_ENV === "development" && (q == null ? void 0 : q.type) === "a")
      throw Object.defineProperty(new Error(`Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor`), "__NEXT_ERROR_CODE", {
        value: "E209",
        enumerable: !1,
        configurable: !0
      });
    const V = x ? F && typeof F == "object" && F.ref : L, [de, he, le] = (0, m.useIntersection)({
      rootMargin: "200px"
    }), xe = i.default.useCallback((ae) => {
      (j.current !== b || $.current !== _) && (le(), j.current = b, $.current = _), de(ae);
    }, [
      b,
      _,
      le,
      de
    ]), ye = (0, f.useMergedRef)(xe, V);
    i.default.useEffect(() => {
      process.env.NODE_ENV === "production" && W && (!he || !G || w(W, _, b, {
        locale: oe
      }));
    }, [
      b,
      _,
      he,
      oe,
      G,
      W == null ? void 0 : W.locale,
      W
    ]);
    const re = {
      ref: ye,
      onClick(ae) {
        if (process.env.NODE_ENV !== "production" && !ae)
          throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
            value: "E312",
            enumerable: !1,
            configurable: !0
          });
        !x && typeof ne == "function" && ne(ae), x && F.props && typeof F.props.onClick == "function" && F.props.onClick(ae), W && (ae.defaultPrevented || R(ae, W, _, b, X, ee, ce, oe, Y));
      },
      onMouseEnter(ae) {
        !x && typeof fe == "function" && fe(ae), x && F.props && typeof F.props.onMouseEnter == "function" && F.props.onMouseEnter(ae), W && w(W, _, b, {
          locale: oe,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      },
      onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? void 0 : function(ge) {
        !x && typeof ie == "function" && ie(ge), x && F.props && typeof F.props.onTouchStart == "function" && F.props.onTouchStart(ge), W && w(W, _, b, {
          locale: oe,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      }
    };
    if ((0, u.isAbsoluteUrl)(b))
      re.href = b;
    else if (!x || N || F.type === "a" && !("href" in F.props)) {
      const ae = typeof oe < "u" ? oe : W == null ? void 0 : W.locale, ge = (W == null ? void 0 : W.isLocaleDomain) && (0, h.getDomainLocale)(b, ae, W == null ? void 0 : W.locales, W == null ? void 0 : W.domainLocales);
      re.href = ge || (0, v.addBasePath)((0, l.addLocale)(b, ae, W == null ? void 0 : W.defaultLocale));
    }
    return x ? (process.env.NODE_ENV === "development" && (0, y.errorOnce)(`\`legacyBehavior\` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:

npx @next/codemod@latest new-link .

Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components`), /* @__PURE__ */ i.default.cloneElement(F, re)) : /* @__PURE__ */ (0, o.jsx)("a", {
      ...J,
      ...re,
      children: q
    });
  }), O = /* @__PURE__ */ (0, i.createContext)({
    // We do not support link status in the Pages Router, so we always return false
    pending: !1
  }), P = () => (0, i.useContext)(O), I = A;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Mr, Mr.exports);
var ol = Mr.exports, il = ol;
const Et = /* @__PURE__ */ La(il), Xe = un(
  ({
    type: e = "button",
    variant: t,
    size: n,
    children: r,
    isLoading: o = !1,
    isLeftIconVisible: i = !1,
    isRightIconVisible: a = !1,
    icon: s,
    isDisabled: c = !1,
    isIconOnly: u = !1,
    ariaLabel: l,
    href: d,
    className: m,
    onClick: h,
    ...v
  }, f) => {
    const y = s ? vc(
      s,
      {
        className: "w-[1rem] h-[1rem]",
        "data-testid": "icon"
      }
    ) : /* @__PURE__ */ T(Cu, { className: "h-[1rem] w-[1rem]", "data-testid": "icon" }), g = /* @__PURE__ */ be(St, { children: [
      i && !o && y,
      o && /* @__PURE__ */ T(xu, { className: "h-[1rem] w-[1rem] animate-spin", "data-testid": "loading-spinner" }),
      u && !o && y,
      !u && r,
      !u && !r && o && "Loading",
      a && !o && y
    ] }), w = `transition-all duration-300 ease-in-out ${c ? "opacity-50 cursor-not-allowed" : "hover:shadow-sneob dark:hover:shadow-sneobw focus:shadow-none"} ${m}`;
    return d ? /^https?:\/\//.test(d) ? /* @__PURE__ */ T("a", { href: d, target: "_blank", rel: "noopener noreferrer", "aria-label": l, children: /* @__PURE__ */ T(
      Jt,
      {
        type: e,
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: w,
        onClick: h,
        role: "button",
        ref: f,
        ...v,
        children: g
      }
    ) }) : /* @__PURE__ */ T(Et, { href: c ? "" : d, passHref: !0, "aria-label": l, children: /* @__PURE__ */ T(
      Jt,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: w,
        onClick: h,
        role: "button",
        ref: f,
        ...v,
        children: g
      }
    ) }) : /* @__PURE__ */ T(
      Jt,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: w,
        onClick: h,
        role: "button",
        ref: f,
        ...v,
        children: g
      }
    );
  }
);
Xe.displayName = "CustomButton";
function gi({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ T(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: we(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...n
    }
  );
}
var al = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ve = al.reduce((e, t) => {
  const n = /* @__PURE__ */ vt(`Primitive.${t}`), r = S.forwardRef((o, i) => {
    const { asChild: a, ...s } = o, c = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ T(c, { ...s, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function sl(e, t) {
  e && ln.flushSync(() => e.dispatchEvent(t));
}
var cl = "Label", Wa = S.forwardRef((e, t) => /* @__PURE__ */ T(
  ve.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
Wa.displayName = cl;
var ul = Wa;
function ll({ className: e, ...t }) {
  return /* @__PURE__ */ T(
    ul,
    {
      "data-slot": "label",
      className: we(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function yi(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Ee(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function co(e, t = []) {
  let n = [];
  function r(i, a) {
    const s = S.createContext(a), c = n.length;
    n = [...n, a];
    const u = (d) => {
      var g;
      const { scope: m, children: h, ...v } = d, f = ((g = m == null ? void 0 : m[e]) == null ? void 0 : g[c]) || s, y = S.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ T(f.Provider, { value: y, children: h });
    };
    u.displayName = i + "Provider";
    function l(d, m) {
      var f;
      const h = ((f = m == null ? void 0 : m[e]) == null ? void 0 : f[c]) || s, v = S.useContext(h);
      if (v) return v;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return [u, l];
  }
  const o = () => {
    const i = n.map((a) => S.createContext(a));
    return function(s) {
      const c = (s == null ? void 0 : s[e]) || i;
      return S.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: c } }),
        [s, c]
      );
    };
  };
  return o.scopeName = e, [r, fl(o, ...t)];
}
function fl(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(i) {
      const a = r.reduce((s, { useScope: c, scopeName: u }) => {
        const d = c(i)[`__scope${u}`];
        return { ...s, ...d };
      }, {});
      return S.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function dl(e) {
  const t = e + "CollectionProvider", [n, r] = co(t), [o, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (f) => {
    const { scope: y, children: g } = f, w = se.useRef(null), p = se.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ T(o, { scope: y, itemMap: p, collectionRef: w, children: g });
  };
  a.displayName = t;
  const s = e + "CollectionSlot", c = /* @__PURE__ */ vt(s), u = se.forwardRef(
    (f, y) => {
      const { scope: g, children: w } = f, p = i(s, g), R = Se(y, p.collectionRef);
      return /* @__PURE__ */ T(c, { ref: R, children: w });
    }
  );
  u.displayName = s;
  const l = e + "CollectionItemSlot", d = "data-radix-collection-item", m = /* @__PURE__ */ vt(l), h = se.forwardRef(
    (f, y) => {
      const { scope: g, children: w, ...p } = f, R = se.useRef(null), E = Se(y, R), A = i(l, g);
      return se.useEffect(() => (A.itemMap.set(R, { ref: R, ...p }), () => void A.itemMap.delete(R))), /* @__PURE__ */ T(m, { [d]: "", ref: E, children: w });
    }
  );
  h.displayName = l;
  function v(f) {
    const y = i(e + "CollectionConsumer", f);
    return se.useCallback(() => {
      const w = y.collectionRef.current;
      if (!w) return [];
      const p = Array.from(w.querySelectorAll(`[${d}]`));
      return Array.from(y.itemMap.values()).sort(
        (A, O) => p.indexOf(A.ref.current) - p.indexOf(O.ref.current)
      );
    }, [y.collectionRef, y.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    v,
    r
  ];
}
var pl = S.createContext(void 0);
function hl(e) {
  const t = S.useContext(pl);
  return e || t || "ltr";
}
function Ze(e) {
  const t = S.useRef(e);
  return S.useEffect(() => {
    t.current = e;
  }), S.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function ml(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ze(e);
  S.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var gl = "DismissableLayer", Lr = "dismissableLayer.update", yl = "dismissableLayer.pointerDownOutside", _l = "dismissableLayer.focusOutside", _i, Va = S.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ga = S.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: i,
      onInteractOutside: a,
      onDismiss: s,
      ...c
    } = e, u = S.useContext(Va), [l, d] = S.useState(null), m = (l == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = S.useState({}), v = Se(t, (O) => d(O)), f = Array.from(u.layers), [y] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), g = f.indexOf(y), w = l ? f.indexOf(l) : -1, p = u.layersWithOutsidePointerEventsDisabled.size > 0, R = w >= g, E = El((O) => {
      const P = O.target, I = [...u.branches].some((C) => C.contains(P));
      !R || I || (o == null || o(O), a == null || a(O), O.defaultPrevented || s == null || s());
    }, m), A = Rl((O) => {
      const P = O.target;
      [...u.branches].some((C) => C.contains(P)) || (i == null || i(O), a == null || a(O), O.defaultPrevented || s == null || s());
    }, m);
    return ml((O) => {
      w === u.layers.size - 1 && (r == null || r(O), !O.defaultPrevented && s && (O.preventDefault(), s()));
    }, m), S.useEffect(() => {
      if (l)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (_i = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(l)), u.layers.add(l), bi(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = _i);
        };
    }, [l, m, n, u]), S.useEffect(() => () => {
      l && (u.layers.delete(l), u.layersWithOutsidePointerEventsDisabled.delete(l), bi());
    }, [l, u]), S.useEffect(() => {
      const O = () => h({});
      return document.addEventListener(Lr, O), () => document.removeEventListener(Lr, O);
    }, []), /* @__PURE__ */ T(
      ve.div,
      {
        ...c,
        ref: v,
        style: {
          pointerEvents: p ? R ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Ee(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: Ee(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: Ee(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Ga.displayName = gl;
var bl = "DismissableLayerBranch", vl = S.forwardRef((e, t) => {
  const n = S.useContext(Va), r = S.useRef(null), o = Se(t, r);
  return S.useEffect(() => {
    const i = r.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ T(ve.div, { ...e, ref: o });
});
vl.displayName = bl;
function El(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ze(e), r = S.useRef(!1), o = S.useRef(() => {
  });
  return S.useEffect(() => {
    const i = (s) => {
      if (s.target && !r.current) {
        let c = function() {
          Ka(
            yl,
            n,
            u,
            { discrete: !0 }
          );
        };
        const u = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Rl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ze(e), r = S.useRef(!1);
  return S.useEffect(() => {
    const o = (i) => {
      i.target && !r.current && Ka(_l, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function bi() {
  const e = new CustomEvent(Lr);
  document.dispatchEvent(e);
}
function Ka(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? sl(o, i) : o.dispatchEvent(i);
}
var Qn = 0;
function wl() {
  S.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? vi()), document.body.insertAdjacentElement("beforeend", e[1] ?? vi()), Qn++, () => {
      Qn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Qn--;
    };
  }, []);
}
function vi() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Zn = "focusScope.autoFocusOnMount", Jn = "focusScope.autoFocusOnUnmount", Ei = { bubbles: !1, cancelable: !0 }, Sl = "FocusScope", Ya = S.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: i,
    ...a
  } = e, [s, c] = S.useState(null), u = Ze(o), l = Ze(i), d = S.useRef(null), m = Se(t, (f) => c(f)), h = S.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  S.useEffect(() => {
    if (r) {
      let f = function(p) {
        if (h.paused || !s) return;
        const R = p.target;
        s.contains(R) ? d.current = R : ze(d.current, { select: !0 });
      }, y = function(p) {
        if (h.paused || !s) return;
        const R = p.relatedTarget;
        R !== null && (s.contains(R) || ze(d.current, { select: !0 }));
      }, g = function(p) {
        if (document.activeElement === document.body)
          for (const E of p)
            E.removedNodes.length > 0 && ze(s);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", y);
      const w = new MutationObserver(g);
      return s && w.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", y), w.disconnect();
      };
    }
  }, [r, s, h.paused]), S.useEffect(() => {
    if (s) {
      wi.add(h);
      const f = document.activeElement;
      if (!s.contains(f)) {
        const g = new CustomEvent(Zn, Ei);
        s.addEventListener(Zn, u), s.dispatchEvent(g), g.defaultPrevented || (xl(Tl(Qa(s)), { select: !0 }), document.activeElement === f && ze(s));
      }
      return () => {
        s.removeEventListener(Zn, u), setTimeout(() => {
          const g = new CustomEvent(Jn, Ei);
          s.addEventListener(Jn, l), s.dispatchEvent(g), g.defaultPrevented || ze(f ?? document.body, { select: !0 }), s.removeEventListener(Jn, l), wi.remove(h);
        }, 0);
      };
    }
  }, [s, u, l, h]);
  const v = S.useCallback(
    (f) => {
      if (!n && !r || h.paused) return;
      const y = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, g = document.activeElement;
      if (y && g) {
        const w = f.currentTarget, [p, R] = Ol(w);
        p && R ? !f.shiftKey && g === R ? (f.preventDefault(), n && ze(p, { select: !0 })) : f.shiftKey && g === p && (f.preventDefault(), n && ze(R, { select: !0 })) : g === w && f.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ T(ve.div, { tabIndex: -1, ...a, ref: m, onKeyDown: v });
});
Ya.displayName = Sl;
function xl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (ze(r, { select: t }), document.activeElement !== n) return;
}
function Ol(e) {
  const t = Qa(e), n = Ri(t, e), r = Ri(t.reverse(), e);
  return [n, r];
}
function Qa(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ri(e, t) {
  for (const n of e)
    if (!Pl(n, { upTo: t })) return n;
}
function Pl(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Al(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function ze(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Al(e) && t && e.select();
  }
}
var wi = Cl();
function Cl() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Si(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Si(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Si(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Tl(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ae = globalThis != null && globalThis.document ? S.useLayoutEffect : () => {
}, Nl = S[" useId ".trim().toString()] || (() => {
}), Il = 0;
function uo(e) {
  const [t, n] = S.useState(Nl());
  return Ae(() => {
    n((r) => r ?? String(Il++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const Dl = ["top", "right", "bottom", "left"], We = Math.min, Ce = Math.max, rn = Math.round, Ft = Math.floor, Le = (e) => ({
  x: e,
  y: e
}), Ml = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Ll = {
  start: "end",
  end: "start"
};
function kr(e, t, n) {
  return Ce(e, We(t, n));
}
function $e(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Fe(e) {
  return e.split("-")[0];
}
function pt(e) {
  return e.split("-")[1];
}
function lo(e) {
  return e === "x" ? "y" : "x";
}
function fo(e) {
  return e === "y" ? "height" : "width";
}
function Ve(e) {
  return ["top", "bottom"].includes(Fe(e)) ? "y" : "x";
}
function po(e) {
  return lo(Ve(e));
}
function kl(e, t, n) {
  n === void 0 && (n = !1);
  const r = pt(e), o = po(e), i = fo(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (a = on(a)), [a, on(a)];
}
function jl(e) {
  const t = on(e);
  return [jr(e), t, jr(t)];
}
function jr(e) {
  return e.replace(/start|end/g, (t) => Ll[t]);
}
function Hl(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], i = ["top", "bottom"], a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? i : a;
    default:
      return [];
  }
}
function $l(e, t, n, r) {
  const o = pt(e);
  let i = Hl(Fe(e), n === "start", r);
  return o && (i = i.map((a) => a + "-" + o), t && (i = i.concat(i.map(jr)))), i;
}
function on(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Ml[t]);
}
function Fl(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Za(e) {
  return typeof e != "number" ? Fl(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function an(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function xi(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = Ve(t), a = po(t), s = fo(a), c = Fe(t), u = i === "y", l = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, m = r[s] / 2 - o[s] / 2;
  let h;
  switch (c) {
    case "top":
      h = {
        x: l,
        y: r.y - o.height
      };
      break;
    case "bottom":
      h = {
        x: l,
        y: r.y + r.height
      };
      break;
    case "right":
      h = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      h = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      h = {
        x: r.x,
        y: r.y
      };
  }
  switch (pt(t)) {
    case "start":
      h[a] -= m * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += m * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const Ul = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: a
  } = n, s = i.filter(Boolean), c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: d
  } = xi(u, r, c), m = r, h = {}, v = 0;
  for (let f = 0; f < s.length; f++) {
    const {
      name: y,
      fn: g
    } = s[f], {
      x: w,
      y: p,
      data: R,
      reset: E
    } = await g({
      x: l,
      y: d,
      initialPlacement: r,
      placement: m,
      strategy: o,
      middlewareData: h,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = w ?? l, d = p ?? d, h = {
      ...h,
      [y]: {
        ...h[y],
        ...R
      }
    }, E && v <= 50 && (v++, typeof E == "object" && (E.placement && (m = E.placement), E.rects && (u = E.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : E.rects), {
      x: l,
      y: d
    } = xi(u, m, c)), f = -1);
  }
  return {
    x: l,
    y: d,
    placement: m,
    strategy: o,
    middlewareData: h
  };
};
async function Rt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: a,
    elements: s,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: d = "floating",
    altBoundary: m = !1,
    padding: h = 0
  } = $e(t, e), v = Za(h), y = s[m ? d === "floating" ? "reference" : "floating" : d], g = an(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(y))) == null || n ? y : y.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: l,
    strategy: c
  })), w = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, p = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), R = await (i.isElement == null ? void 0 : i.isElement(p)) ? await (i.getScale == null ? void 0 : i.getScale(p)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = an(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: p,
    strategy: c
  }) : w);
  return {
    top: (g.top - E.top + v.top) / R.y,
    bottom: (E.bottom - g.bottom + v.bottom) / R.y,
    left: (g.left - E.left + v.left) / R.x,
    right: (E.right - g.right + v.right) / R.x
  };
}
const Bl = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: i,
      platform: a,
      elements: s,
      middlewareData: c
    } = t, {
      element: u,
      padding: l = 0
    } = $e(e, t) || {};
    if (u == null)
      return {};
    const d = Za(l), m = {
      x: n,
      y: r
    }, h = po(o), v = fo(h), f = await a.getDimensions(u), y = h === "y", g = y ? "top" : "left", w = y ? "bottom" : "right", p = y ? "clientHeight" : "clientWidth", R = i.reference[v] + i.reference[h] - m[h] - i.floating[v], E = m[h] - i.reference[h], A = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let O = A ? A[p] : 0;
    (!O || !await (a.isElement == null ? void 0 : a.isElement(A))) && (O = s.floating[p] || i.floating[v]);
    const P = R / 2 - E / 2, I = O / 2 - f[v] / 2 - 1, C = We(d[g], I), D = We(d[w], I), L = C, q = O - f[v] - D, k = O / 2 - f[v] / 2 + P, B = kr(L, k, q), H = !c.arrow && pt(o) != null && k !== B && i.reference[v] / 2 - (k < L ? C : D) - f[v] / 2 < 0, K = H ? k < L ? k - L : k - q : 0;
    return {
      [h]: m[h] + K,
      data: {
        [h]: B,
        centerOffset: k - B - K,
        ...H && {
          alignmentOffset: K
        }
      },
      reset: H
    };
  }
}), ql = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: i,
        rects: a,
        initialPlacement: s,
        platform: c,
        elements: u
      } = t, {
        mainAxis: l = !0,
        crossAxis: d = !0,
        fallbackPlacements: m,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: f = !0,
        ...y
      } = $e(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const g = Fe(o), w = Ve(s), p = Fe(s) === s, R = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = m || (p || !f ? [on(s)] : jl(s)), A = v !== "none";
      !m && A && E.push(...$l(s, f, v, R));
      const O = [s, ...E], P = await Rt(t, y), I = [];
      let C = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (l && I.push(P[g]), d) {
        const k = kl(o, a, R);
        I.push(P[k[0]], P[k[1]]);
      }
      if (C = [...C, {
        placement: o,
        overflows: I
      }], !I.every((k) => k <= 0)) {
        var D, L;
        const k = (((D = i.flip) == null ? void 0 : D.index) || 0) + 1, B = O[k];
        if (B)
          return {
            data: {
              index: k,
              overflows: C
            },
            reset: {
              placement: B
            }
          };
        let H = (L = C.filter((K) => K.overflows[0] <= 0).sort((K, N) => K.overflows[1] - N.overflows[1])[0]) == null ? void 0 : L.placement;
        if (!H)
          switch (h) {
            case "bestFit": {
              var q;
              const K = (q = C.filter((N) => {
                if (A) {
                  const X = Ve(N.placement);
                  return X === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  X === "y";
                }
                return !0;
              }).map((N) => [N.placement, N.overflows.filter((X) => X > 0).reduce((X, ee) => X + ee, 0)]).sort((N, X) => N[1] - X[1])[0]) == null ? void 0 : q[0];
              K && (H = K);
              break;
            }
            case "initialPlacement":
              H = s;
              break;
          }
        if (o !== H)
          return {
            reset: {
              placement: H
            }
          };
      }
      return {};
    }
  };
};
function Oi(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Pi(e) {
  return Dl.some((t) => e[t] >= 0);
}
const zl = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = $e(e, t);
      switch (r) {
        case "referenceHidden": {
          const i = await Rt(t, {
            ...o,
            elementContext: "reference"
          }), a = Oi(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Pi(a)
            }
          };
        }
        case "escaped": {
          const i = await Rt(t, {
            ...o,
            altBoundary: !0
          }), a = Oi(i, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Pi(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Xl(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Fe(n), s = pt(n), c = Ve(n) === "y", u = ["left", "top"].includes(a) ? -1 : 1, l = i && c ? -1 : 1, d = $e(t, e);
  let {
    mainAxis: m,
    crossAxis: h,
    alignmentAxis: v
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return s && typeof v == "number" && (h = s === "end" ? v * -1 : v), c ? {
    x: h * l,
    y: m * u
  } : {
    x: m * u,
    y: h * l
  };
}
const Wl = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: i,
        placement: a,
        middlewareData: s
      } = t, c = await Xl(t, e);
      return a === ((n = s.offset) == null ? void 0 : n.placement) && (r = s.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: a
        }
      };
    }
  };
}, Vl = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: s = {
          fn: (y) => {
            let {
              x: g,
              y: w
            } = y;
            return {
              x: g,
              y: w
            };
          }
        },
        ...c
      } = $e(e, t), u = {
        x: n,
        y: r
      }, l = await Rt(t, c), d = Ve(Fe(o)), m = lo(d);
      let h = u[m], v = u[d];
      if (i) {
        const y = m === "y" ? "top" : "left", g = m === "y" ? "bottom" : "right", w = h + l[y], p = h - l[g];
        h = kr(w, h, p);
      }
      if (a) {
        const y = d === "y" ? "top" : "left", g = d === "y" ? "bottom" : "right", w = v + l[y], p = v - l[g];
        v = kr(w, v, p);
      }
      const f = s.fn({
        ...t,
        [m]: h,
        [d]: v
      });
      return {
        ...f,
        data: {
          x: f.x - n,
          y: f.y - r,
          enabled: {
            [m]: i,
            [d]: a
          }
        }
      };
    }
  };
}, Gl = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: i,
        middlewareData: a
      } = t, {
        offset: s = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = $e(e, t), l = {
        x: n,
        y: r
      }, d = Ve(o), m = lo(d);
      let h = l[m], v = l[d];
      const f = $e(s, t), y = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...f
      };
      if (c) {
        const p = m === "y" ? "height" : "width", R = i.reference[m] - i.floating[p] + y.mainAxis, E = i.reference[m] + i.reference[p] - y.mainAxis;
        h < R ? h = R : h > E && (h = E);
      }
      if (u) {
        var g, w;
        const p = m === "y" ? "width" : "height", R = ["top", "left"].includes(Fe(o)), E = i.reference[d] - i.floating[p] + (R && ((g = a.offset) == null ? void 0 : g[d]) || 0) + (R ? 0 : y.crossAxis), A = i.reference[d] + i.reference[p] + (R ? 0 : ((w = a.offset) == null ? void 0 : w[d]) || 0) - (R ? y.crossAxis : 0);
        v < E ? v = E : v > A && (v = A);
      }
      return {
        [m]: h,
        [d]: v
      };
    }
  };
}, Kl = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: i,
        platform: a,
        elements: s
      } = t, {
        apply: c = () => {
        },
        ...u
      } = $e(e, t), l = await Rt(t, u), d = Fe(o), m = pt(o), h = Ve(o) === "y", {
        width: v,
        height: f
      } = i.floating;
      let y, g;
      d === "top" || d === "bottom" ? (y = d, g = m === (await (a.isRTL == null ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (g = d, y = m === "end" ? "top" : "bottom");
      const w = f - l.top - l.bottom, p = v - l.left - l.right, R = We(f - l[y], w), E = We(v - l[g], p), A = !t.middlewareData.shift;
      let O = R, P = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (P = p), (r = t.middlewareData.shift) != null && r.enabled.y && (O = w), A && !m) {
        const C = Ce(l.left, 0), D = Ce(l.right, 0), L = Ce(l.top, 0), q = Ce(l.bottom, 0);
        h ? P = v - 2 * (C !== 0 || D !== 0 ? C + D : Ce(l.left, l.right)) : O = f - 2 * (L !== 0 || q !== 0 ? L + q : Ce(l.top, l.bottom));
      }
      await c({
        ...t,
        availableWidth: P,
        availableHeight: O
      });
      const I = await a.getDimensions(s.floating);
      return v !== I.width || f !== I.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function pn() {
  return typeof window < "u";
}
function ht(e) {
  return Ja(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Te(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function je(e) {
  var t;
  return (t = (Ja(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Ja(e) {
  return pn() ? e instanceof Node || e instanceof Te(e).Node : !1;
}
function Ie(e) {
  return pn() ? e instanceof Element || e instanceof Te(e).Element : !1;
}
function ke(e) {
  return pn() ? e instanceof HTMLElement || e instanceof Te(e).HTMLElement : !1;
}
function Ai(e) {
  return !pn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Te(e).ShadowRoot;
}
function xt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = De(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function Yl(e) {
  return ["table", "td", "th"].includes(ht(e));
}
function hn(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function ho(e) {
  const t = mo(), n = Ie(e) ? De(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Ql(e) {
  let t = Ge(e);
  for (; ke(t) && !ut(t); ) {
    if (ho(t))
      return t;
    if (hn(t))
      return null;
    t = Ge(t);
  }
  return null;
}
function mo() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ut(e) {
  return ["html", "body", "#document"].includes(ht(e));
}
function De(e) {
  return Te(e).getComputedStyle(e);
}
function mn(e) {
  return Ie(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ge(e) {
  if (ht(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Ai(e) && e.host || // Fallback.
    je(e)
  );
  return Ai(t) ? t.host : t;
}
function es(e) {
  const t = Ge(e);
  return ut(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ke(t) && xt(t) ? t : es(t);
}
function wt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = es(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Te(o);
  if (i) {
    const s = Hr(a);
    return t.concat(a, a.visualViewport || [], xt(o) ? o : [], s && n ? wt(s) : []);
  }
  return t.concat(o, wt(o, [], n));
}
function Hr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ts(e) {
  const t = De(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ke(e), i = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, s = rn(n) !== i || rn(r) !== a;
  return s && (n = i, r = a), {
    width: n,
    height: r,
    $: s
  };
}
function go(e) {
  return Ie(e) ? e : e.contextElement;
}
function st(e) {
  const t = go(e);
  if (!ke(t))
    return Le(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = ts(t);
  let a = (i ? rn(n.width) : n.width) / r, s = (i ? rn(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: a,
    y: s
  };
}
const Zl = /* @__PURE__ */ Le(0);
function ns(e) {
  const t = Te(e);
  return !mo() || !t.visualViewport ? Zl : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Jl(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Te(e) ? !1 : t;
}
function Je(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = go(e);
  let a = Le(1);
  t && (r ? Ie(r) && (a = st(r)) : a = st(e));
  const s = Jl(i, n, r) ? ns(i) : Le(0);
  let c = (o.left + s.x) / a.x, u = (o.top + s.y) / a.y, l = o.width / a.x, d = o.height / a.y;
  if (i) {
    const m = Te(i), h = r && Ie(r) ? Te(r) : r;
    let v = m, f = Hr(v);
    for (; f && r && h !== v; ) {
      const y = st(f), g = f.getBoundingClientRect(), w = De(f), p = g.left + (f.clientLeft + parseFloat(w.paddingLeft)) * y.x, R = g.top + (f.clientTop + parseFloat(w.paddingTop)) * y.y;
      c *= y.x, u *= y.y, l *= y.x, d *= y.y, c += p, u += R, v = Te(f), f = Hr(v);
    }
  }
  return an({
    width: l,
    height: d,
    x: c,
    y: u
  });
}
function yo(e, t) {
  const n = mn(e).scrollLeft;
  return t ? t.left + n : Je(je(e)).left + n;
}
function rs(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    yo(e, r)
  )), i = r.top + t.scrollTop;
  return {
    x: o,
    y: i
  };
}
function ef(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const i = o === "fixed", a = je(r), s = t ? hn(t.floating) : !1;
  if (r === a || s && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Le(1);
  const l = Le(0), d = ke(r);
  if ((d || !d && !i) && ((ht(r) !== "body" || xt(a)) && (c = mn(r)), ke(r))) {
    const h = Je(r);
    u = st(r), l.x = h.x + r.clientLeft, l.y = h.y + r.clientTop;
  }
  const m = a && !d && !i ? rs(a, c, !0) : Le(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + l.x + m.x,
    y: n.y * u.y - c.scrollTop * u.y + l.y + m.y
  };
}
function tf(e) {
  return Array.from(e.getClientRects());
}
function nf(e) {
  const t = je(e), n = mn(e), r = e.ownerDocument.body, o = Ce(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = Ce(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + yo(e);
  const s = -n.scrollTop;
  return De(r).direction === "rtl" && (a += Ce(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: a,
    y: s
  };
}
function rf(e, t) {
  const n = Te(e), r = je(e), o = n.visualViewport;
  let i = r.clientWidth, a = r.clientHeight, s = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    const u = mo();
    (!u || u && t === "fixed") && (s = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: s,
    y: c
  };
}
function of(e, t) {
  const n = Je(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = ke(e) ? st(e) : Le(1), a = e.clientWidth * i.x, s = e.clientHeight * i.y, c = o * i.x, u = r * i.y;
  return {
    width: a,
    height: s,
    x: c,
    y: u
  };
}
function Ci(e, t, n) {
  let r;
  if (t === "viewport")
    r = rf(e, n);
  else if (t === "document")
    r = nf(je(e));
  else if (Ie(t))
    r = of(t, n);
  else {
    const o = ns(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return an(r);
}
function os(e, t) {
  const n = Ge(e);
  return n === t || !Ie(n) || ut(n) ? !1 : De(n).position === "fixed" || os(n, t);
}
function af(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = wt(e, [], !1).filter((s) => Ie(s) && ht(s) !== "body"), o = null;
  const i = De(e).position === "fixed";
  let a = i ? Ge(e) : e;
  for (; Ie(a) && !ut(a); ) {
    const s = De(a), c = ho(a);
    !c && s.position === "fixed" && (o = null), (i ? !c && !o : !c && s.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || xt(a) && !c && os(e, a)) ? r = r.filter((l) => l !== a) : o = s, a = Ge(a);
  }
  return t.set(e, r), r;
}
function sf(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? hn(t) ? [] : af(t, this._c) : [].concat(n), r], s = a[0], c = a.reduce((u, l) => {
    const d = Ci(t, l, o);
    return u.top = Ce(d.top, u.top), u.right = We(d.right, u.right), u.bottom = We(d.bottom, u.bottom), u.left = Ce(d.left, u.left), u;
  }, Ci(t, s, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function cf(e) {
  const {
    width: t,
    height: n
  } = ts(e);
  return {
    width: t,
    height: n
  };
}
function uf(e, t, n) {
  const r = ke(t), o = je(t), i = n === "fixed", a = Je(e, !0, i, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Le(0);
  if (r || !r && !i)
    if ((ht(t) !== "body" || xt(o)) && (s = mn(t)), r) {
      const m = Je(t, !0, i, t);
      c.x = m.x + t.clientLeft, c.y = m.y + t.clientTop;
    } else o && (c.x = yo(o));
  const u = o && !r && !i ? rs(o, s) : Le(0), l = a.left + s.scrollLeft - c.x - u.x, d = a.top + s.scrollTop - c.y - u.y;
  return {
    x: l,
    y: d,
    width: a.width,
    height: a.height
  };
}
function er(e) {
  return De(e).position === "static";
}
function Ti(e, t) {
  if (!ke(e) || De(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return je(e) === n && (n = n.ownerDocument.body), n;
}
function is(e, t) {
  const n = Te(e);
  if (hn(e))
    return n;
  if (!ke(e)) {
    let o = Ge(e);
    for (; o && !ut(o); ) {
      if (Ie(o) && !er(o))
        return o;
      o = Ge(o);
    }
    return n;
  }
  let r = Ti(e, t);
  for (; r && Yl(r) && er(r); )
    r = Ti(r, t);
  return r && ut(r) && er(r) && !ho(r) ? n : r || Ql(e) || n;
}
const lf = async function(e) {
  const t = this.getOffsetParent || is, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: uf(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function ff(e) {
  return De(e).direction === "rtl";
}
const df = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ef,
  getDocumentElement: je,
  getClippingRect: sf,
  getOffsetParent: is,
  getElementRects: lf,
  getClientRects: tf,
  getDimensions: cf,
  getScale: st,
  isElement: Ie,
  isRTL: ff
};
function as(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function pf(e, t) {
  let n = null, r;
  const o = je(e);
  function i() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), n = null;
  }
  function a(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), i();
    const u = e.getBoundingClientRect(), {
      left: l,
      top: d,
      width: m,
      height: h
    } = u;
    if (s || t(), !m || !h)
      return;
    const v = Ft(d), f = Ft(o.clientWidth - (l + m)), y = Ft(o.clientHeight - (d + h)), g = Ft(l), p = {
      rootMargin: -v + "px " + -f + "px " + -y + "px " + -g + "px",
      threshold: Ce(0, We(1, c)) || 1
    };
    let R = !0;
    function E(A) {
      const O = A[0].intersectionRatio;
      if (O !== c) {
        if (!R)
          return a();
        O ? a(!1, O) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      O === 1 && !as(u, e.getBoundingClientRect()) && a(), R = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...p,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, p);
    }
    n.observe(e);
  }
  return a(!0), i;
}
function hf(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = go(e), l = o || i ? [...u ? wt(u) : [], ...wt(t)] : [];
  l.forEach((g) => {
    o && g.addEventListener("scroll", n, {
      passive: !0
    }), i && g.addEventListener("resize", n);
  });
  const d = u && s ? pf(u, n) : null;
  let m = -1, h = null;
  a && (h = new ResizeObserver((g) => {
    let [w] = g;
    w && w.target === u && h && (h.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var p;
      (p = h) == null || p.observe(t);
    })), n();
  }), u && !c && h.observe(u), h.observe(t));
  let v, f = c ? Je(e) : null;
  c && y();
  function y() {
    const g = Je(e);
    f && !as(f, g) && n(), f = g, v = requestAnimationFrame(y);
  }
  return n(), () => {
    var g;
    l.forEach((w) => {
      o && w.removeEventListener("scroll", n), i && w.removeEventListener("resize", n);
    }), d == null || d(), (g = h) == null || g.disconnect(), h = null, c && cancelAnimationFrame(v);
  };
}
const mf = Wl, gf = Vl, yf = ql, _f = Kl, bf = zl, Ni = Bl, vf = Gl, Ef = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: df,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return Ul(e, t, {
    ...o,
    platform: i
  });
};
var en = typeof document < "u" ? Ec : Tr;
function sn(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!sn(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !sn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function ss(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ii(e, t) {
  const n = ss(e);
  return Math.round(t * n) / n;
}
function tr(e) {
  const t = S.useRef(e);
  return en(() => {
    t.current = e;
  }), t;
}
function Rf(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: i,
      floating: a
    } = {},
    transform: s = !0,
    whileElementsMounted: c,
    open: u
  } = e, [l, d] = S.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, h] = S.useState(r);
  sn(m, r) || h(r);
  const [v, f] = S.useState(null), [y, g] = S.useState(null), w = S.useCallback((N) => {
    N !== A.current && (A.current = N, f(N));
  }, []), p = S.useCallback((N) => {
    N !== O.current && (O.current = N, g(N));
  }, []), R = i || v, E = a || y, A = S.useRef(null), O = S.useRef(null), P = S.useRef(l), I = c != null, C = tr(c), D = tr(o), L = tr(u), q = S.useCallback(() => {
    if (!A.current || !O.current)
      return;
    const N = {
      placement: t,
      strategy: n,
      middleware: m
    };
    D.current && (N.platform = D.current), Ef(A.current, O.current, N).then((X) => {
      const ee = {
        ...X,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: L.current !== !1
      };
      k.current && !sn(P.current, ee) && (P.current = ee, ln.flushSync(() => {
        d(ee);
      }));
    });
  }, [m, t, n, D, L]);
  en(() => {
    u === !1 && P.current.isPositioned && (P.current.isPositioned = !1, d((N) => ({
      ...N,
      isPositioned: !1
    })));
  }, [u]);
  const k = S.useRef(!1);
  en(() => (k.current = !0, () => {
    k.current = !1;
  }), []), en(() => {
    if (R && (A.current = R), E && (O.current = E), R && E) {
      if (C.current)
        return C.current(R, E, q);
      q();
    }
  }, [R, E, q, C, I]);
  const B = S.useMemo(() => ({
    reference: A,
    floating: O,
    setReference: w,
    setFloating: p
  }), [w, p]), H = S.useMemo(() => ({
    reference: R,
    floating: E
  }), [R, E]), K = S.useMemo(() => {
    const N = {
      position: n,
      left: 0,
      top: 0
    };
    if (!H.floating)
      return N;
    const X = Ii(H.floating, l.x), ee = Ii(H.floating, l.y);
    return s ? {
      ...N,
      transform: "translate(" + X + "px, " + ee + "px)",
      ...ss(H.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: X,
      top: ee
    };
  }, [n, s, H.floating, l.x, l.y]);
  return S.useMemo(() => ({
    ...l,
    update: q,
    refs: B,
    elements: H,
    floatingStyles: K
  }), [l, q, B, H, K]);
}
const wf = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? Ni({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Ni({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Sf = (e, t) => ({
  ...mf(e),
  options: [e, t]
}), xf = (e, t) => ({
  ...gf(e),
  options: [e, t]
}), Of = (e, t) => ({
  ...vf(e),
  options: [e, t]
}), Pf = (e, t) => ({
  ...yf(e),
  options: [e, t]
}), Af = (e, t) => ({
  ..._f(e),
  options: [e, t]
}), Cf = (e, t) => ({
  ...bf(e),
  options: [e, t]
}), Tf = (e, t) => ({
  ...wf(e),
  options: [e, t]
});
var Nf = "Arrow", cs = S.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...i } = e;
  return /* @__PURE__ */ T(
    ve.svg,
    {
      ...i,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ T("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
cs.displayName = Nf;
var If = cs;
function Df(e) {
  const [t, n] = S.useState(void 0);
  return Ae(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const i = o[0];
        let a, s;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
          a = u.inlineSize, s = u.blockSize;
        } else
          a = e.offsetWidth, s = e.offsetHeight;
        n({ width: a, height: s });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var _o = "Popper", [us, ls] = co(_o), [Mf, fs] = us(_o), ds = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = S.useState(null);
  return /* @__PURE__ */ T(Mf, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
ds.displayName = _o;
var ps = "PopperAnchor", hs = S.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, i = fs(ps, n), a = S.useRef(null), s = Se(t, a);
    return S.useEffect(() => {
      i.onAnchorChange((r == null ? void 0 : r.current) || a.current);
    }), r ? null : /* @__PURE__ */ T(ve.div, { ...o, ref: s });
  }
);
hs.displayName = ps;
var bo = "PopperContent", [Lf, kf] = us(bo), ms = S.forwardRef(
  (e, t) => {
    var x, J, W, G, _, b;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: i = "center",
      alignOffset: a = 0,
      arrowPadding: s = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u = [],
      collisionPadding: l = 0,
      sticky: d = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: v,
      ...f
    } = e, y = fs(bo, n), [g, w] = S.useState(null), p = Se(t, ($) => w($)), [R, E] = S.useState(null), A = Df(R), O = (A == null ? void 0 : A.width) ?? 0, P = (A == null ? void 0 : A.height) ?? 0, I = r + (i !== "center" ? "-" + i : ""), C = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, D = Array.isArray(u) ? u : [u], L = D.length > 0, q = {
      padding: C,
      boundary: D.filter(Hf),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: L
    }, { refs: k, floatingStyles: B, placement: H, isPositioned: K, middlewareData: N } = Rf({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: I,
      whileElementsMounted: (...$) => hf(...$, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: y.anchor
      },
      middleware: [
        Sf({ mainAxis: o + P, alignmentAxis: a }),
        c && xf({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Of() : void 0,
          ...q
        }),
        c && Pf({ ...q }),
        Af({
          ...q,
          apply: ({ elements: $, rects: j, availableWidth: F, availableHeight: V }) => {
            const { width: de, height: he } = j.reference, le = $.floating.style;
            le.setProperty("--radix-popper-available-width", `${F}px`), le.setProperty("--radix-popper-available-height", `${V}px`), le.setProperty("--radix-popper-anchor-width", `${de}px`), le.setProperty("--radix-popper-anchor-height", `${he}px`);
          }
        }),
        R && Tf({ element: R, padding: s }),
        $f({ arrowWidth: O, arrowHeight: P }),
        m && Cf({ strategy: "referenceHidden", ...q })
      ]
    }), [X, ee] = _s(H), ce = Ze(v);
    Ae(() => {
      K && (ce == null || ce());
    }, [K, ce]);
    const oe = (x = N.arrow) == null ? void 0 : x.x, ne = (J = N.arrow) == null ? void 0 : J.y, Y = ((W = N.arrow) == null ? void 0 : W.centerOffset) !== 0, [fe, ie] = S.useState();
    return Ae(() => {
      g && ie(window.getComputedStyle(g).zIndex);
    }, [g]), /* @__PURE__ */ T(
      "div",
      {
        ref: k.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...B,
          transform: K ? B.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: fe,
          "--radix-popper-transform-origin": [
            (G = N.transformOrigin) == null ? void 0 : G.x,
            (_ = N.transformOrigin) == null ? void 0 : _.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((b = N.hide) == null ? void 0 : b.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ T(
          Lf,
          {
            scope: n,
            placedSide: X,
            onArrowChange: E,
            arrowX: oe,
            arrowY: ne,
            shouldHideArrow: Y,
            children: /* @__PURE__ */ T(
              ve.div,
              {
                "data-side": X,
                "data-align": ee,
                ...f,
                ref: p,
                style: {
                  ...f.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: K ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
ms.displayName = bo;
var gs = "PopperArrow", jf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ys = S.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, i = kf(gs, r), a = jf[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ T(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ T(
          If,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
ys.displayName = gs;
function Hf(e) {
  return e !== null;
}
var $f = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var y, g, w;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((y = o.arrow) == null ? void 0 : y.centerOffset) !== 0, s = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [u, l] = _s(n), d = { start: "0%", center: "50%", end: "100%" }[l], m = (((g = o.arrow) == null ? void 0 : g.x) ?? 0) + s / 2, h = (((w = o.arrow) == null ? void 0 : w.y) ?? 0) + c / 2;
    let v = "", f = "";
    return u === "bottom" ? (v = a ? d : `${m}px`, f = `${-c}px`) : u === "top" ? (v = a ? d : `${m}px`, f = `${r.floating.height + c}px`) : u === "right" ? (v = `${-c}px`, f = a ? d : `${h}px`) : u === "left" && (v = `${r.floating.width + c}px`, f = a ? d : `${h}px`), { data: { x: v, y: f } };
  }
});
function _s(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ff = ds, Uf = hs, Bf = ms, qf = ys, zf = "Portal", bs = S.forwardRef((e, t) => {
  var s;
  const { container: n, ...r } = e, [o, i] = S.useState(!1);
  Ae(() => i(!0), []);
  const a = n || o && ((s = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : s.body);
  return a ? ba.createPortal(/* @__PURE__ */ T(ve.div, { ...r, ref: t }), a) : null;
});
bs.displayName = zf;
var Xf = S[" useInsertionEffect ".trim().toString()] || Ae;
function Di({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, i, a] = Wf({
    defaultProp: t,
    onChange: n
  }), s = e !== void 0, c = s ? e : o;
  {
    const l = S.useRef(e !== void 0);
    S.useEffect(() => {
      const d = l.current;
      d !== s && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = s;
    }, [s, r]);
  }
  const u = S.useCallback(
    (l) => {
      var d;
      if (s) {
        const m = Vf(l) ? l(e) : l;
        m !== e && ((d = a.current) == null || d.call(a, m));
      } else
        i(l);
    },
    [s, e, i, a]
  );
  return [c, u];
}
function Wf({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = S.useState(e), o = S.useRef(n), i = S.useRef(t);
  return Xf(() => {
    i.current = t;
  }, [t]), S.useEffect(() => {
    var a;
    o.current !== n && ((a = i.current) == null || a.call(i, n), o.current = n);
  }, [n, o]), [n, r, i];
}
function Vf(e) {
  return typeof e == "function";
}
function Gf(e) {
  const t = S.useRef({ value: e, previous: e });
  return S.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var vs = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), Kf = "VisuallyHidden", Yf = S.forwardRef(
  (e, t) => /* @__PURE__ */ T(
    ve.span,
    {
      ...e,
      ref: t,
      style: { ...vs, ...e.style }
    }
  )
);
Yf.displayName = Kf;
var Qf = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, ot = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Bt = {}, nr = 0, Es = function(e) {
  return e && (e.host || Es(e.parentNode));
}, Zf = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Es(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Jf = function(e, t, n, r) {
  var o = Zf(t, Array.isArray(e) ? e : [e]);
  Bt[n] || (Bt[n] = /* @__PURE__ */ new WeakMap());
  var i = Bt[n], a = [], s = /* @__PURE__ */ new Set(), c = new Set(o), u = function(d) {
    !d || s.has(d) || (s.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var l = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(m) {
      if (s.has(m))
        l(m);
      else
        try {
          var h = m.getAttribute(r), v = h !== null && h !== "false", f = (ot.get(m) || 0) + 1, y = (i.get(m) || 0) + 1;
          ot.set(m, f), i.set(m, y), a.push(m), f === 1 && v && Ut.set(m, !0), y === 1 && m.setAttribute(n, "true"), v || m.setAttribute(r, "true");
        } catch (g) {
          console.error("aria-hidden: cannot operate on ", m, g);
        }
    });
  };
  return l(t), s.clear(), nr++, function() {
    a.forEach(function(d) {
      var m = ot.get(d) - 1, h = i.get(d) - 1;
      ot.set(d, m), i.set(d, h), m || (Ut.has(d) || d.removeAttribute(r), Ut.delete(d)), h || d.removeAttribute(n);
    }), nr--, nr || (ot = /* @__PURE__ */ new WeakMap(), ot = /* @__PURE__ */ new WeakMap(), Ut = /* @__PURE__ */ new WeakMap(), Bt = {});
  };
}, ed = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Qf(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Jf(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Me = function() {
  return Me = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, Me.apply(this, arguments);
};
function Rs(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function td(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, i; r < o; r++)
    (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var tn = "right-scroll-bar-position", nn = "width-before-scroll-bar", nd = "with-scroll-bars-hidden", rd = "--removed-body-scroll-bar-size";
function rr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function od(e, t) {
  var n = bt(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var id = typeof window < "u" ? S.useLayoutEffect : S.useEffect, Mi = /* @__PURE__ */ new WeakMap();
function ad(e, t) {
  var n = od(null, function(r) {
    return e.forEach(function(o) {
      return rr(o, r);
    });
  });
  return id(function() {
    var r = Mi.get(n);
    if (r) {
      var o = new Set(r), i = new Set(e), a = n.current;
      o.forEach(function(s) {
        i.has(s) || rr(s, null);
      }), i.forEach(function(s) {
        o.has(s) || rr(s, a);
      });
    }
    Mi.set(n, e);
  }, [e]), n;
}
function sd(e) {
  return e;
}
function cd(e, t) {
  t === void 0 && (t = sd);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var a = t(i, r);
      return n.push(a), function() {
        n = n.filter(function(s) {
          return s !== a;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (r = !0; n.length; ) {
        var a = n;
        n = [], a.forEach(i);
      }
      n = {
        push: function(s) {
          return i(s);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(i) {
      r = !0;
      var a = [];
      if (n.length) {
        var s = n;
        n = [], s.forEach(i), a = n;
      }
      var c = function() {
        var l = a;
        a = [], l.forEach(i);
      }, u = function() {
        return Promise.resolve().then(c);
      };
      u(), n = {
        push: function(l) {
          a.push(l), u();
        },
        filter: function(l) {
          return a = a.filter(l), n;
        }
      };
    }
  };
  return o;
}
function ud(e) {
  e === void 0 && (e = {});
  var t = cd(null);
  return t.options = Me({ async: !0, ssr: !1 }, e), t;
}
var ws = function(e) {
  var t = e.sideCar, n = Rs(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return S.createElement(r, Me({}, n));
};
ws.isSideCarExport = !0;
function ld(e, t) {
  return e.useMedium(t), ws;
}
var Ss = ud(), or = function() {
}, gn = S.forwardRef(function(e, t) {
  var n = S.useRef(null), r = S.useState({
    onScrollCapture: or,
    onWheelCapture: or,
    onTouchMoveCapture: or
  }), o = r[0], i = r[1], a = e.forwardProps, s = e.children, c = e.className, u = e.removeScrollBar, l = e.enabled, d = e.shards, m = e.sideCar, h = e.noIsolation, v = e.inert, f = e.allowPinchZoom, y = e.as, g = y === void 0 ? "div" : y, w = e.gapMode, p = Rs(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = m, E = ad([n, t]), A = Me(Me({}, p), o);
  return S.createElement(
    S.Fragment,
    null,
    l && S.createElement(R, { sideCar: Ss, removeScrollBar: u, shards: d, noIsolation: h, inert: v, setCallbacks: i, allowPinchZoom: !!f, lockRef: n, gapMode: w }),
    a ? S.cloneElement(S.Children.only(s), Me(Me({}, A), { ref: E })) : S.createElement(g, Me({}, A, { className: c, ref: E }), s)
  );
});
gn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
gn.classNames = {
  fullWidth: nn,
  zeroRight: tn
};
var fd = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function dd() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = fd();
  return t && e.setAttribute("nonce", t), e;
}
function pd(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function hd(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var md = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = dd()) && (pd(t, n), hd(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, gd = function() {
  var e = md();
  return function(t, n) {
    S.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, xs = function() {
  var e = gd(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, yd = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, ir = function(e) {
  return parseInt(e || "", 10) || 0;
}, _d = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [ir(n), ir(r), ir(o)];
}, bd = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return yd;
  var t = _d(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, vd = xs(), ct = "data-scroll-locked", Ed = function(e, t, n, r) {
  var o = e.left, i = e.top, a = e.right, s = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(nd, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(s, "px ").concat(r, `;
  }
  body[`).concat(ct, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(s, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(tn, ` {
    right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(nn, ` {
    margin-right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(tn, " .").concat(tn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(nn, " .").concat(nn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(ct, `] {
    `).concat(rd, ": ").concat(s, `px;
  }
`);
}, Li = function() {
  var e = parseInt(document.body.getAttribute(ct) || "0", 10);
  return isFinite(e) ? e : 0;
}, Rd = function() {
  S.useEffect(function() {
    return document.body.setAttribute(ct, (Li() + 1).toString()), function() {
      var e = Li() - 1;
      e <= 0 ? document.body.removeAttribute(ct) : document.body.setAttribute(ct, e.toString());
    };
  }, []);
}, wd = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Rd();
  var i = S.useMemo(function() {
    return bd(o);
  }, [o]);
  return S.createElement(vd, { styles: Ed(i, !t, o, n ? "" : "!important") });
}, $r = !1;
if (typeof window < "u")
  try {
    var qt = Object.defineProperty({}, "passive", {
      get: function() {
        return $r = !0, !0;
      }
    });
    window.addEventListener("test", qt, qt), window.removeEventListener("test", qt, qt);
  } catch {
    $r = !1;
  }
var it = $r ? { passive: !1 } : !1, Sd = function(e) {
  return e.tagName === "TEXTAREA";
}, Os = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Sd(e) && n[t] === "visible")
  );
}, xd = function(e) {
  return Os(e, "overflowY");
}, Od = function(e) {
  return Os(e, "overflowX");
}, ki = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Ps(e, r);
    if (o) {
      var i = As(e, r), a = i[1], s = i[2];
      if (a > s)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Pd = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ad = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Ps = function(e, t) {
  return e === "v" ? xd(t) : Od(t);
}, As = function(e, t) {
  return e === "v" ? Pd(t) : Ad(t);
}, Cd = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Td = function(e, t, n, r, o) {
  var i = Cd(e, window.getComputedStyle(t).direction), a = i * r, s = n.target, c = t.contains(s), u = !1, l = a > 0, d = 0, m = 0;
  do {
    var h = As(e, s), v = h[0], f = h[1], y = h[2], g = f - y - i * v;
    (v || g) && Ps(e, s) && (d += g, m += v), s instanceof ShadowRoot ? s = s.host : s = s.parentNode;
  } while (
    // portaled content
    !c && s !== document.body || // self content
    c && (t.contains(s) || t === s)
  );
  return (l && Math.abs(d) < 1 || !l && Math.abs(m) < 1) && (u = !0), u;
}, zt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, ji = function(e) {
  return [e.deltaX, e.deltaY];
}, Hi = function(e) {
  return e && "current" in e ? e.current : e;
}, Nd = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Id = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Dd = 0, at = [];
function Md(e) {
  var t = S.useRef([]), n = S.useRef([0, 0]), r = S.useRef(), o = S.useState(Dd++)[0], i = S.useState(xs)[0], a = S.useRef(e);
  S.useEffect(function() {
    a.current = e;
  }, [e]), S.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = td([e.lockRef.current], (e.shards || []).map(Hi), !0).filter(Boolean);
      return f.forEach(function(y) {
        return y.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(y) {
          return y.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = S.useCallback(function(f, y) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !a.current.allowPinchZoom;
    var g = zt(f), w = n.current, p = "deltaX" in f ? f.deltaX : w[0] - g[0], R = "deltaY" in f ? f.deltaY : w[1] - g[1], E, A = f.target, O = Math.abs(p) > Math.abs(R) ? "h" : "v";
    if ("touches" in f && O === "h" && A.type === "range")
      return !1;
    var P = ki(O, A);
    if (!P)
      return !0;
    if (P ? E = O : (E = O === "v" ? "h" : "v", P = ki(O, A)), !P)
      return !1;
    if (!r.current && "changedTouches" in f && (p || R) && (r.current = E), !E)
      return !0;
    var I = r.current || E;
    return Td(I, y, f, I === "h" ? p : R);
  }, []), c = S.useCallback(function(f) {
    var y = f;
    if (!(!at.length || at[at.length - 1] !== i)) {
      var g = "deltaY" in y ? ji(y) : zt(y), w = t.current.filter(function(E) {
        return E.name === y.type && (E.target === y.target || y.target === E.shadowParent) && Nd(E.delta, g);
      })[0];
      if (w && w.should) {
        y.cancelable && y.preventDefault();
        return;
      }
      if (!w) {
        var p = (a.current.shards || []).map(Hi).filter(Boolean).filter(function(E) {
          return E.contains(y.target);
        }), R = p.length > 0 ? s(y, p[0]) : !a.current.noIsolation;
        R && y.cancelable && y.preventDefault();
      }
    }
  }, []), u = S.useCallback(function(f, y, g, w) {
    var p = { name: f, delta: y, target: g, should: w, shadowParent: Ld(g) };
    t.current.push(p), setTimeout(function() {
      t.current = t.current.filter(function(R) {
        return R !== p;
      });
    }, 1);
  }, []), l = S.useCallback(function(f) {
    n.current = zt(f), r.current = void 0;
  }, []), d = S.useCallback(function(f) {
    u(f.type, ji(f), f.target, s(f, e.lockRef.current));
  }, []), m = S.useCallback(function(f) {
    u(f.type, zt(f), f.target, s(f, e.lockRef.current));
  }, []);
  S.useEffect(function() {
    return at.push(i), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", c, it), document.addEventListener("touchmove", c, it), document.addEventListener("touchstart", l, it), function() {
      at = at.filter(function(f) {
        return f !== i;
      }), document.removeEventListener("wheel", c, it), document.removeEventListener("touchmove", c, it), document.removeEventListener("touchstart", l, it);
    };
  }, []);
  var h = e.removeScrollBar, v = e.inert;
  return S.createElement(
    S.Fragment,
    null,
    v ? S.createElement(i, { styles: Id(o) }) : null,
    h ? S.createElement(wd, { gapMode: e.gapMode }) : null
  );
}
function Ld(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const kd = ld(Ss, Md);
var Cs = S.forwardRef(function(e, t) {
  return S.createElement(gn, Me({}, e, { ref: t, sideCar: kd }));
});
Cs.classNames = gn.classNames;
var jd = [" ", "Enter", "ArrowUp", "ArrowDown"], Hd = [" ", "Enter"], et = "Select", [yn, _n, $d] = dl(et), [mt, Oh] = co(et, [
  $d,
  ls
]), bn = ls(), [Fd, Ke] = mt(et), [Ud, Bd] = mt(et), Ts = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: i,
    value: a,
    defaultValue: s,
    onValueChange: c,
    dir: u,
    name: l,
    autoComplete: d,
    disabled: m,
    required: h,
    form: v
  } = e, f = bn(t), [y, g] = S.useState(null), [w, p] = S.useState(null), [R, E] = S.useState(!1), A = hl(u), [O, P] = Di({
    prop: r,
    defaultProp: o ?? !1,
    onChange: i,
    caller: et
  }), [I, C] = Di({
    prop: a,
    defaultProp: s,
    onChange: c,
    caller: et
  }), D = S.useRef(null), L = y ? v || !!y.closest("form") : !0, [q, k] = S.useState(/* @__PURE__ */ new Set()), B = Array.from(q).map((H) => H.props.value).join(";");
  return /* @__PURE__ */ T(Ff, { ...f, children: /* @__PURE__ */ be(
    Fd,
    {
      required: h,
      scope: t,
      trigger: y,
      onTriggerChange: g,
      valueNode: w,
      onValueNodeChange: p,
      valueNodeHasChildren: R,
      onValueNodeHasChildrenChange: E,
      contentId: uo(),
      value: I,
      onValueChange: C,
      open: O,
      onOpenChange: P,
      dir: A,
      triggerPointerDownPosRef: D,
      disabled: m,
      children: [
        /* @__PURE__ */ T(yn.Provider, { scope: t, children: /* @__PURE__ */ T(
          Ud,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: S.useCallback((H) => {
              k((K) => new Set(K).add(H));
            }, []),
            onNativeOptionRemove: S.useCallback((H) => {
              k((K) => {
                const N = new Set(K);
                return N.delete(H), N;
              });
            }, []),
            children: n
          }
        ) }),
        L ? /* @__PURE__ */ be(
          Zs,
          {
            "aria-hidden": !0,
            required: h,
            tabIndex: -1,
            name: l,
            autoComplete: d,
            value: I,
            onChange: (H) => C(H.target.value),
            disabled: m,
            form: v,
            children: [
              I === void 0 ? /* @__PURE__ */ T("option", { value: "" }) : null,
              Array.from(q)
            ]
          },
          B
        ) : null
      ]
    }
  ) });
};
Ts.displayName = et;
var Ns = "SelectTrigger", Is = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, i = bn(n), a = Ke(Ns, n), s = a.disabled || r, c = Se(t, a.onTriggerChange), u = _n(n), l = S.useRef("touch"), [d, m, h] = ec((f) => {
      const y = u().filter((p) => !p.disabled), g = y.find((p) => p.value === a.value), w = tc(y, f, g);
      w !== void 0 && a.onValueChange(w.value);
    }), v = (f) => {
      s || (a.onOpenChange(!0), h()), f && (a.triggerPointerDownPosRef.current = {
        x: Math.round(f.pageX),
        y: Math.round(f.pageY)
      });
    };
    return /* @__PURE__ */ T(Uf, { asChild: !0, ...i, children: /* @__PURE__ */ T(
      ve.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": a.contentId,
        "aria-expanded": a.open,
        "aria-required": a.required,
        "aria-autocomplete": "none",
        dir: a.dir,
        "data-state": a.open ? "open" : "closed",
        disabled: s,
        "data-disabled": s ? "" : void 0,
        "data-placeholder": Js(a.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: Ee(o.onClick, (f) => {
          f.currentTarget.focus(), l.current !== "mouse" && v(f);
        }),
        onPointerDown: Ee(o.onPointerDown, (f) => {
          l.current = f.pointerType;
          const y = f.target;
          y.hasPointerCapture(f.pointerId) && y.releasePointerCapture(f.pointerId), f.button === 0 && f.ctrlKey === !1 && f.pointerType === "mouse" && (v(f), f.preventDefault());
        }),
        onKeyDown: Ee(o.onKeyDown, (f) => {
          const y = d.current !== "";
          !(f.ctrlKey || f.altKey || f.metaKey) && f.key.length === 1 && m(f.key), !(y && f.key === " ") && jd.includes(f.key) && (v(), f.preventDefault());
        })
      }
    ) });
  }
);
Is.displayName = Ns;
var Ds = "SelectValue", Ms = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: i, placeholder: a = "", ...s } = e, c = Ke(Ds, n), { onValueNodeHasChildrenChange: u } = c, l = i !== void 0, d = Se(t, c.onValueNodeChange);
    return Ae(() => {
      u(l);
    }, [u, l]), /* @__PURE__ */ T(
      ve.span,
      {
        ...s,
        ref: d,
        style: { pointerEvents: "none" },
        children: Js(c.value) ? /* @__PURE__ */ T(St, { children: a }) : i
      }
    );
  }
);
Ms.displayName = Ds;
var qd = "SelectIcon", Ls = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ T(ve.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Ls.displayName = qd;
var zd = "SelectPortal", ks = (e) => /* @__PURE__ */ T(bs, { asChild: !0, ...e });
ks.displayName = zd;
var tt = "SelectContent", js = S.forwardRef(
  (e, t) => {
    const n = Ke(tt, e.__scopeSelect), [r, o] = S.useState();
    if (Ae(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const i = r;
      return i ? ln.createPortal(
        /* @__PURE__ */ T(Hs, { scope: e.__scopeSelect, children: /* @__PURE__ */ T(yn.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ T("div", { children: e.children }) }) }),
        i
      ) : null;
    }
    return /* @__PURE__ */ T($s, { ...e, ref: t });
  }
);
js.displayName = tt;
var Ne = 10, [Hs, Ye] = mt(tt), Xd = "SelectContentImpl", Wd = /* @__PURE__ */ vt("SelectContent.RemoveScroll"), $s = S.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: r = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: i,
      onPointerDownOutside: a,
      //
      // PopperContent props
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: f,
      avoidCollisions: y,
      //
      ...g
    } = e, w = Ke(tt, n), [p, R] = S.useState(null), [E, A] = S.useState(null), O = Se(t, (x) => R(x)), [P, I] = S.useState(null), [C, D] = S.useState(
      null
    ), L = _n(n), [q, k] = S.useState(!1), B = S.useRef(!1);
    S.useEffect(() => {
      if (p) return ed(p);
    }, [p]), wl();
    const H = S.useCallback(
      (x) => {
        const [J, ...W] = L().map((b) => b.ref.current), [G] = W.slice(-1), _ = document.activeElement;
        for (const b of x)
          if (b === _ || (b == null || b.scrollIntoView({ block: "nearest" }), b === J && E && (E.scrollTop = 0), b === G && E && (E.scrollTop = E.scrollHeight), b == null || b.focus(), document.activeElement !== _)) return;
      },
      [L, E]
    ), K = S.useCallback(
      () => H([P, p]),
      [H, P, p]
    );
    S.useEffect(() => {
      q && K();
    }, [q, K]);
    const { onOpenChange: N, triggerPointerDownPosRef: X } = w;
    S.useEffect(() => {
      if (p) {
        let x = { x: 0, y: 0 };
        const J = (G) => {
          var _, b;
          x = {
            x: Math.abs(Math.round(G.pageX) - (((_ = X.current) == null ? void 0 : _.x) ?? 0)),
            y: Math.abs(Math.round(G.pageY) - (((b = X.current) == null ? void 0 : b.y) ?? 0))
          };
        }, W = (G) => {
          x.x <= 10 && x.y <= 10 ? G.preventDefault() : p.contains(G.target) || N(!1), document.removeEventListener("pointermove", J), X.current = null;
        };
        return X.current !== null && (document.addEventListener("pointermove", J), document.addEventListener("pointerup", W, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", J), document.removeEventListener("pointerup", W, { capture: !0 });
        };
      }
    }, [p, N, X]), S.useEffect(() => {
      const x = () => N(!1);
      return window.addEventListener("blur", x), window.addEventListener("resize", x), () => {
        window.removeEventListener("blur", x), window.removeEventListener("resize", x);
      };
    }, [N]);
    const [ee, ce] = ec((x) => {
      const J = L().filter((_) => !_.disabled), W = J.find((_) => _.ref.current === document.activeElement), G = tc(J, x, W);
      G && setTimeout(() => G.ref.current.focus());
    }), oe = S.useCallback(
      (x, J, W) => {
        const G = !B.current && !W;
        (w.value !== void 0 && w.value === J || G) && (I(x), G && (B.current = !0));
      },
      [w.value]
    ), ne = S.useCallback(() => p == null ? void 0 : p.focus(), [p]), Y = S.useCallback(
      (x, J, W) => {
        const G = !B.current && !W;
        (w.value !== void 0 && w.value === J || G) && D(x);
      },
      [w.value]
    ), fe = r === "popper" ? Fr : Fs, ie = fe === Fr ? {
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: m,
      collisionPadding: h,
      sticky: v,
      hideWhenDetached: f,
      avoidCollisions: y
    } : {};
    return /* @__PURE__ */ T(
      Hs,
      {
        scope: n,
        content: p,
        viewport: E,
        onViewportChange: A,
        itemRefCallback: oe,
        selectedItem: P,
        onItemLeave: ne,
        itemTextRefCallback: Y,
        focusSelectedItem: K,
        selectedItemText: C,
        position: r,
        isPositioned: q,
        searchRef: ee,
        children: /* @__PURE__ */ T(Cs, { as: Wd, allowPinchZoom: !0, children: /* @__PURE__ */ T(
          Ya,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (x) => {
              x.preventDefault();
            },
            onUnmountAutoFocus: Ee(o, (x) => {
              var J;
              (J = w.trigger) == null || J.focus({ preventScroll: !0 }), x.preventDefault();
            }),
            children: /* @__PURE__ */ T(
              Ga,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: i,
                onPointerDownOutside: a,
                onFocusOutside: (x) => x.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ T(
                  fe,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (x) => x.preventDefault(),
                    ...g,
                    ...ie,
                    onPlaced: () => k(!0),
                    ref: O,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...g.style
                    },
                    onKeyDown: Ee(g.onKeyDown, (x) => {
                      const J = x.ctrlKey || x.altKey || x.metaKey;
                      if (x.key === "Tab" && x.preventDefault(), !J && x.key.length === 1 && ce(x.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(x.key)) {
                        let G = L().filter((_) => !_.disabled).map((_) => _.ref.current);
                        if (["ArrowUp", "End"].includes(x.key) && (G = G.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(x.key)) {
                          const _ = x.target, b = G.indexOf(_);
                          G = G.slice(b + 1);
                        }
                        setTimeout(() => H(G)), x.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
$s.displayName = Xd;
var Vd = "SelectItemAlignedPosition", Fs = S.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, i = Ke(tt, n), a = Ye(tt, n), [s, c] = S.useState(null), [u, l] = S.useState(null), d = Se(t, (O) => l(O)), m = _n(n), h = S.useRef(!1), v = S.useRef(!0), { viewport: f, selectedItem: y, selectedItemText: g, focusSelectedItem: w } = a, p = S.useCallback(() => {
    if (i.trigger && i.valueNode && s && u && f && y && g) {
      const O = i.trigger.getBoundingClientRect(), P = u.getBoundingClientRect(), I = i.valueNode.getBoundingClientRect(), C = g.getBoundingClientRect();
      if (i.dir !== "rtl") {
        const _ = C.left - P.left, b = I.left - _, $ = O.left - b, j = O.width + $, F = Math.max(j, P.width), V = window.innerWidth - Ne, de = yi(b, [
          Ne,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Ne, V - F)
        ]);
        s.style.minWidth = j + "px", s.style.left = de + "px";
      } else {
        const _ = P.right - C.right, b = window.innerWidth - I.right - _, $ = window.innerWidth - O.right - b, j = O.width + $, F = Math.max(j, P.width), V = window.innerWidth - Ne, de = yi(b, [
          Ne,
          Math.max(Ne, V - F)
        ]);
        s.style.minWidth = j + "px", s.style.right = de + "px";
      }
      const D = m(), L = window.innerHeight - Ne * 2, q = f.scrollHeight, k = window.getComputedStyle(u), B = parseInt(k.borderTopWidth, 10), H = parseInt(k.paddingTop, 10), K = parseInt(k.borderBottomWidth, 10), N = parseInt(k.paddingBottom, 10), X = B + H + q + N + K, ee = Math.min(y.offsetHeight * 5, X), ce = window.getComputedStyle(f), oe = parseInt(ce.paddingTop, 10), ne = parseInt(ce.paddingBottom, 10), Y = O.top + O.height / 2 - Ne, fe = L - Y, ie = y.offsetHeight / 2, x = y.offsetTop + ie, J = B + H + x, W = X - J;
      if (J <= Y) {
        const _ = D.length > 0 && y === D[D.length - 1].ref.current;
        s.style.bottom = "0px";
        const b = u.clientHeight - f.offsetTop - f.offsetHeight, $ = Math.max(
          fe,
          ie + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (_ ? ne : 0) + b + K
        ), j = J + $;
        s.style.height = j + "px";
      } else {
        const _ = D.length > 0 && y === D[0].ref.current;
        s.style.top = "0px";
        const $ = Math.max(
          Y,
          B + f.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (_ ? oe : 0) + ie
        ) + W;
        s.style.height = $ + "px", f.scrollTop = J - Y + f.offsetTop;
      }
      s.style.margin = `${Ne}px 0`, s.style.minHeight = ee + "px", s.style.maxHeight = L + "px", r == null || r(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    m,
    i.trigger,
    i.valueNode,
    s,
    u,
    f,
    y,
    g,
    i.dir,
    r
  ]);
  Ae(() => p(), [p]);
  const [R, E] = S.useState();
  Ae(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const A = S.useCallback(
    (O) => {
      O && v.current === !0 && (p(), w == null || w(), v.current = !1);
    },
    [p, w]
  );
  return /* @__PURE__ */ T(
    Kd,
    {
      scope: n,
      contentWrapper: s,
      shouldExpandOnScrollRef: h,
      onScrollButtonChange: A,
      children: /* @__PURE__ */ T(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: R
          },
          children: /* @__PURE__ */ T(
            ve.div,
            {
              ...o,
              ref: d,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...o.style
              }
            }
          )
        }
      )
    }
  );
});
Fs.displayName = Vd;
var Gd = "SelectPopperPosition", Fr = S.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Ne,
    ...i
  } = e, a = bn(n);
  return /* @__PURE__ */ T(
    Bf,
    {
      ...a,
      ...i,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...i.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Fr.displayName = Gd;
var [Kd, vo] = mt(tt, {}), Ur = "SelectViewport", Us = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, i = Ye(Ur, n), a = vo(Ur, n), s = Se(t, i.onViewportChange), c = S.useRef(0);
    return /* @__PURE__ */ be(St, { children: [
      /* @__PURE__ */ T(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ T(yn.Slot, { scope: n, children: /* @__PURE__ */ T(
        ve.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: s,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...o.style
          },
          onScroll: Ee(o.onScroll, (u) => {
            const l = u.currentTarget, { contentWrapper: d, shouldExpandOnScrollRef: m } = a;
            if (m != null && m.current && d) {
              const h = Math.abs(c.current - l.scrollTop);
              if (h > 0) {
                const v = window.innerHeight - Ne * 2, f = parseFloat(d.style.minHeight), y = parseFloat(d.style.height), g = Math.max(f, y);
                if (g < v) {
                  const w = g + h, p = Math.min(v, w), R = w - p;
                  d.style.height = p + "px", d.style.bottom === "0px" && (l.scrollTop = R > 0 ? R : 0, d.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = l.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Us.displayName = Ur;
var Bs = "SelectGroup", [Yd, Qd] = mt(Bs), Zd = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = uo();
    return /* @__PURE__ */ T(Yd, { scope: n, id: o, children: /* @__PURE__ */ T(ve.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
Zd.displayName = Bs;
var qs = "SelectLabel", Jd = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Qd(qs, n);
    return /* @__PURE__ */ T(ve.div, { id: o.id, ...r, ref: t });
  }
);
Jd.displayName = qs;
var cn = "SelectItem", [ep, zs] = mt(cn), Xs = S.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: i,
      ...a
    } = e, s = Ke(cn, n), c = Ye(cn, n), u = s.value === r, [l, d] = S.useState(i ?? ""), [m, h] = S.useState(!1), v = Se(
      t,
      (w) => {
        var p;
        return (p = c.itemRefCallback) == null ? void 0 : p.call(c, w, r, o);
      }
    ), f = uo(), y = S.useRef("touch"), g = () => {
      o || (s.onValueChange(r), s.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ T(
      ep,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: f,
        isSelected: u,
        onItemTextChange: S.useCallback((w) => {
          d((p) => p || ((w == null ? void 0 : w.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ T(
          yn.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: l,
            children: /* @__PURE__ */ T(
              ve.div,
              {
                role: "option",
                "aria-labelledby": f,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": u && m,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...a,
                ref: v,
                onFocus: Ee(a.onFocus, () => h(!0)),
                onBlur: Ee(a.onBlur, () => h(!1)),
                onClick: Ee(a.onClick, () => {
                  y.current !== "mouse" && g();
                }),
                onPointerUp: Ee(a.onPointerUp, () => {
                  y.current === "mouse" && g();
                }),
                onPointerDown: Ee(a.onPointerDown, (w) => {
                  y.current = w.pointerType;
                }),
                onPointerMove: Ee(a.onPointerMove, (w) => {
                  var p;
                  y.current = w.pointerType, o ? (p = c.onItemLeave) == null || p.call(c) : y.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Ee(a.onPointerLeave, (w) => {
                  var p;
                  w.currentTarget === document.activeElement && ((p = c.onItemLeave) == null || p.call(c));
                }),
                onKeyDown: Ee(a.onKeyDown, (w) => {
                  var R;
                  ((R = c.searchRef) == null ? void 0 : R.current) !== "" && w.key === " " || (Hd.includes(w.key) && g(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Xs.displayName = cn;
var yt = "SelectItemText", Ws = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...i } = e, a = Ke(yt, n), s = Ye(yt, n), c = zs(yt, n), u = Bd(yt, n), [l, d] = S.useState(null), m = Se(
      t,
      (g) => d(g),
      c.onItemTextChange,
      (g) => {
        var w;
        return (w = s.itemTextRefCallback) == null ? void 0 : w.call(s, g, c.value, c.disabled);
      }
    ), h = l == null ? void 0 : l.textContent, v = S.useMemo(
      () => /* @__PURE__ */ T("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: f, onNativeOptionRemove: y } = u;
    return Ae(() => (f(v), () => y(v)), [f, y, v]), /* @__PURE__ */ be(St, { children: [
      /* @__PURE__ */ T(ve.span, { id: c.textId, ...i, ref: m }),
      c.isSelected && a.valueNode && !a.valueNodeHasChildren ? ln.createPortal(i.children, a.valueNode) : null
    ] });
  }
);
Ws.displayName = yt;
var Vs = "SelectItemIndicator", Gs = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return zs(Vs, n).isSelected ? /* @__PURE__ */ T(ve.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
Gs.displayName = Vs;
var Br = "SelectScrollUpButton", Ks = S.forwardRef((e, t) => {
  const n = Ye(Br, e.__scopeSelect), r = vo(Br, e.__scopeSelect), [o, i] = S.useState(!1), a = Se(t, r.onScrollButtonChange);
  return Ae(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const u = c.scrollTop > 0;
        i(u);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ T(
    Qs,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = n;
        s && c && (s.scrollTop = s.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Ks.displayName = Br;
var qr = "SelectScrollDownButton", Ys = S.forwardRef((e, t) => {
  const n = Ye(qr, e.__scopeSelect), r = vo(qr, e.__scopeSelect), [o, i] = S.useState(!1), a = Se(t, r.onScrollButtonChange);
  return Ae(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const u = c.scrollHeight - c.clientHeight, l = Math.ceil(c.scrollTop) < u;
        i(l);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ T(
    Qs,
    {
      ...e,
      ref: a,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = n;
        s && c && (s.scrollTop = s.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Ys.displayName = qr;
var Qs = S.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, i = Ye("SelectScrollButton", n), a = S.useRef(null), s = _n(n), c = S.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return S.useEffect(() => () => c(), [c]), Ae(() => {
    var l;
    const u = s().find((d) => d.ref.current === document.activeElement);
    (l = u == null ? void 0 : u.ref.current) == null || l.scrollIntoView({ block: "nearest" });
  }, [s]), /* @__PURE__ */ T(
    ve.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: Ee(o.onPointerDown, () => {
        a.current === null && (a.current = window.setInterval(r, 50));
      }),
      onPointerMove: Ee(o.onPointerMove, () => {
        var u;
        (u = i.onItemLeave) == null || u.call(i), a.current === null && (a.current = window.setInterval(r, 50));
      }),
      onPointerLeave: Ee(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), tp = "SelectSeparator", np = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ T(ve.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
np.displayName = tp;
var zr = "SelectArrow", rp = S.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = bn(n), i = Ke(zr, n), a = Ye(zr, n);
    return i.open && a.position === "popper" ? /* @__PURE__ */ T(qf, { ...o, ...r, ref: t }) : null;
  }
);
rp.displayName = zr;
var op = "SelectBubbleInput", Zs = S.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = S.useRef(null), i = Se(r, o), a = Gf(t);
    return S.useEffect(() => {
      const s = o.current;
      if (!s) return;
      const c = window.HTMLSelectElement.prototype, l = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (a !== t && l) {
        const d = new Event("change", { bubbles: !0 });
        l.call(s, t), s.dispatchEvent(d);
      }
    }, [a, t]), /* @__PURE__ */ T(
      ve.select,
      {
        ...n,
        style: { ...vs, ...n.style },
        ref: i,
        defaultValue: t
      }
    );
  }
);
Zs.displayName = op;
function Js(e) {
  return e === "" || e === void 0;
}
function ec(e) {
  const t = Ze(e), n = S.useRef(""), r = S.useRef(0), o = S.useCallback(
    (a) => {
      const s = n.current + a;
      t(s), function c(u) {
        n.current = u, window.clearTimeout(r.current), u !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(s);
    },
    [t]
  ), i = S.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return S.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, i];
}
function tc(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let a = ip(e, Math.max(i, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const c = a.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function ip(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var ap = Ts, sp = Is, cp = Ms, up = Ls, lp = ks, fp = js, dp = Us, pp = Xs, hp = Ws, mp = Gs, gp = Ks, yp = Ys;
function _p({ ...e }) {
  return /* @__PURE__ */ T(ap, { "data-slot": "select", ...e });
}
function bp({ ...e }) {
  return /* @__PURE__ */ T(cp, { "data-slot": "select-value", ...e });
}
function vp({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ be(
    sp,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: we(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ T(up, { asChild: !0, children: /* @__PURE__ */ T(Ma, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Ep({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ T(lp, { children: /* @__PURE__ */ be(
    fp,
    {
      "data-slot": "select-content",
      className: we(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ T(wp, {}),
        /* @__PURE__ */ T(
          dp,
          {
            className: we(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ T(Sp, {})
      ]
    }
  ) });
}
function Rp({ className: e, children: t, ...n }) {
  return /* @__PURE__ */ be(
    pp,
    {
      "data-slot": "select-item",
      className: we(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ T("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ T(mp, { children: /* @__PURE__ */ T(gu, { className: "size-4" }) }) }),
        /* @__PURE__ */ T(hp, { children: t })
      ]
    }
  );
}
function wp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ T(
    gp,
    {
      "data-slot": "select-scroll-up-button",
      className: we("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ T(bu, { className: "size-4" })
    }
  );
}
function Sp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ T(
    yp,
    {
      "data-slot": "select-scroll-down-button",
      className: we("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ T(Ma, { className: "size-4" })
    }
  );
}
function xp({ className: e, ...t }) {
  return /* @__PURE__ */ T(
    "textarea",
    {
      "data-slot": "textarea",
      className: we(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ...t
    }
  );
}
var Op = (e) => e.type === "checkbox", _t = (e) => e instanceof Date, Eo = (e) => e == null;
const nc = (e) => typeof e == "object";
var nt = (e) => !Eo(e) && !Array.isArray(e) && nc(e) && !_t(e), Pp = (e) => nt(e) && e.target ? Op(e.target) ? e.target.checked : e.target.value : e, Ap = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, Cp = (e, t) => e.has(Ap(t)), Tp = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return nt(t) && t.hasOwnProperty("isPrototypeOf");
}, Np = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function rc(e) {
  let t;
  const n = Array.isArray(e), r = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(Np && (e instanceof Blob || r)) && (n || nt(e)))
    if (t = n ? [] : {}, !n && !Tp(e))
      t = e;
    else
      for (const o in e)
        e.hasOwnProperty(o) && (t[o] = rc(e[o]));
  else
    return e;
  return t;
}
var oc = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Xr = (e) => e === void 0, Pe = (e, t, n) => {
  if (!t || !nt(e))
    return n;
  const r = oc(t.split(/[,[\].]+?/)).reduce((o, i) => Eo(o) ? o : o[i], e);
  return Xr(r) || r === e ? Xr(e[t]) ? n : e[t] : r;
}, ar = (e) => typeof e == "boolean", Ip = (e) => /^\w*$/.test(e), Dp = (e) => oc(e.replace(/["|']|\]/g, "").split(/\.|\[/)), $i = (e, t, n) => {
  let r = -1;
  const o = Ip(t) ? [t] : Dp(t), i = o.length, a = i - 1;
  for (; ++r < i; ) {
    const s = o[r];
    let c = n;
    if (r !== a) {
      const u = e[s];
      c = nt(u) || Array.isArray(u) ? u : isNaN(+o[r + 1]) ? {} : [];
    }
    if (s === "__proto__" || s === "constructor" || s === "prototype")
      return;
    e[s] = c, e = e[s];
  }
};
const Fi = {
  BLUR: "blur",
  CHANGE: "change"
}, Ui = {
  all: "all"
}, Mp = se.createContext(null), vn = () => se.useContext(Mp);
var Lp = (e, t, n, r = !0) => {
  const o = {
    defaultValues: t._defaultValues
  };
  for (const i in e)
    Object.defineProperty(o, i, {
      get: () => {
        const a = i;
        return t._proxyFormState[a] !== Ui.all && (t._proxyFormState[a] = !r || Ui.all), n && (n[a] = !0), e[a];
      }
    });
  return o;
}, Bi = (e) => Eo(e) || !nc(e);
function ic(e, t) {
  if (Bi(e) || Bi(t))
    return e === t;
  if (_t(e) && _t(t))
    return e.getTime() === t.getTime();
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n) {
    const i = e[o];
    if (!r.includes(o))
      return !1;
    if (o !== "ref") {
      const a = t[o];
      if (_t(i) && _t(a) || nt(i) && nt(a) || Array.isArray(i) && Array.isArray(a) ? !ic(i, a) : i !== a)
        return !1;
    }
  }
  return !0;
}
const ac = (e, t) => {
  const n = S.useRef(t);
  ic(t, n.current) || (n.current = t), S.useEffect(e, n.current);
};
function kp(e) {
  const t = vn(), { control: n = t.control, disabled: r, name: o, exact: i } = e || {}, [a, s] = se.useState(n._formState), c = se.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return ac(() => n._subscribe({
    name: o,
    formState: c.current,
    exact: i,
    callback: (u) => {
      !r && s({
        ...n._formState,
        ...u
      });
    }
  }), [o, r, i]), se.useEffect(() => {
    c.current.isValid && n._setValid(!0);
  }, [n]), se.useMemo(() => Lp(a, n, c.current, !1), [a, n]);
}
var jp = (e) => typeof e == "string", Hp = (e, t, n, r, o) => jp(e) ? Pe(n, e, o) : Array.isArray(e) ? e.map((i) => Pe(n, i)) : n;
function $p(e) {
  const t = vn(), { control: n = t.control, name: r, defaultValue: o, disabled: i, exact: a } = e || {}, [s, c] = se.useState(n._getWatch(r, o));
  return ac(() => n._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: a,
    callback: (u) => !i && c(Hp(r, n._names, u.values || n._formValues, !1, o))
  }), [r, o, i, a]), se.useEffect(() => n._removeUnmounted()), s;
}
function Fp(e) {
  const t = vn(), { name: n, disabled: r, control: o = t.control, shouldUnregister: i } = e, a = Cp(o._names.array, n), s = $p({
    control: o,
    name: n,
    defaultValue: Pe(o._formValues, n, Pe(o._defaultValues, n, e.defaultValue)),
    exact: !0
  }), c = kp({
    control: o,
    name: n,
    exact: !0
  }), u = se.useRef(e), l = se.useRef(o.register(n, {
    ...e.rules,
    value: s,
    ...ar(e.disabled) ? { disabled: e.disabled } : {}
  })), d = se.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!Pe(c.errors, n)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!Pe(c.dirtyFields, n)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!Pe(c.touchedFields, n)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!Pe(c.validatingFields, n)
    },
    error: {
      enumerable: !0,
      get: () => Pe(c.errors, n)
    }
  }), [c, n]), m = se.useCallback((y) => l.current.onChange({
    target: {
      value: Pp(y),
      name: n
    },
    type: Fi.CHANGE
  }), [n]), h = se.useCallback(() => l.current.onBlur({
    target: {
      value: Pe(o._formValues, n),
      name: n
    },
    type: Fi.BLUR
  }), [n, o._formValues]), v = se.useCallback((y) => {
    const g = Pe(o._fields, n);
    g && y && (g._f.ref = {
      focus: () => y.focus(),
      select: () => y.select(),
      setCustomValidity: (w) => y.setCustomValidity(w),
      reportValidity: () => y.reportValidity()
    });
  }, [o._fields, n]), f = se.useMemo(() => ({
    name: n,
    value: s,
    ...ar(r) || c.disabled ? { disabled: c.disabled || r } : {},
    onChange: m,
    onBlur: h,
    ref: v
  }), [n, r, c.disabled, m, h, v, s]);
  return se.useEffect(() => {
    const y = o._options.shouldUnregister || i;
    o.register(n, {
      ...u.current.rules,
      ...ar(u.current.disabled) ? { disabled: u.current.disabled } : {}
    });
    const g = (w, p) => {
      const R = Pe(o._fields, w);
      R && R._f && (R._f.mount = p);
    };
    if (g(n, !0), y) {
      const w = rc(Pe(o._options.defaultValues, n));
      $i(o._defaultValues, n, w), Xr(Pe(o._formValues, n)) && $i(o._formValues, n, w);
    }
    return !a && o.register(n), () => {
      (a ? y && !o._state.action : y) ? o.unregister(n) : g(n, !1);
    };
  }, [n, o, a, i]), se.useEffect(() => {
    o._setDisabledField({
      disabled: r,
      name: n
    });
  }, [r, n, o]), se.useMemo(() => ({
    field: f,
    formState: c,
    fieldState: d
  }), [f, c, d]);
}
const Up = (e) => e.render(Fp(e));
typeof window < "u" ? se.useLayoutEffect : se.useEffect;
function Ph({
  label: e,
  name: t,
  type: n = "text",
  placeholder: r,
  required: o = !1,
  disabled: i = !1,
  options: a = [],
  className: s = "",
  containerClassName: c,
  leftAddon: u,
  rightAddon: l,
  labelDetailedNode: d,
  onChange: m
}) {
  var p;
  const {
    control: h,
    formState: { errors: v }
  } = vn(), f = v[t], [y, g] = bt(!1), w = () => {
    g((R) => !R);
  };
  return /* @__PURE__ */ be("div", { className: "space-y-2", children: [
    e && /* @__PURE__ */ be("div", { children: [
      /* @__PURE__ */ be(ll, { className: "text-[16px] font-medium", children: [
        e,
        o && /* @__PURE__ */ T("span", { className: "text-destructive ml-1", children: "*" })
      ] }),
      d && /* @__PURE__ */ T("div", { className: "text-mid-grey-II text-xs", children: d })
    ] }),
    /* @__PURE__ */ T(
      Up,
      {
        name: t,
        control: h,
        render: ({ field: R }) => {
          const E = we(
            "flex h-10 w-full min-w-[400px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            f && "border-destructive",
            s
          );
          return /* @__PURE__ */ be("div", { className: we("flex items-center gap-2", c), children: [
            u && /* @__PURE__ */ T("div", { className: "flex items-center", children: u }),
            n === "textarea" ? /* @__PURE__ */ T(
              xp,
              {
                ...R,
                placeholder: r,
                disabled: i,
                className: we(E, "resize-y")
              }
            ) : n === "select" ? /* @__PURE__ */ be(_p, { onValueChange: R.onChange, value: R.value, disabled: i, children: [
              /* @__PURE__ */ T(vp, { className: we(E, "w-full"), children: /* @__PURE__ */ T(bp, { placeholder: r }) }),
              /* @__PURE__ */ T(Ep, { children: a.map((O, P) => /* @__PURE__ */ T(Rp, { value: O.value, children: O.label }, P)) })
            ] }) : n === "number" ? /* @__PURE__ */ T(
              "input",
              {
                ...R,
                type: "number",
                placeholder: r,
                disabled: i,
                className: E,
                value: R.value || "",
                onChange: (O) => R.onChange(O.target.valueAsNumber)
              }
            ) : n === "password" ? /* @__PURE__ */ be("div", { className: "relative w-full", children: [
              /* @__PURE__ */ T(
                gi,
                {
                  ...R,
                  type: y ? "text" : "password",
                  placeholder: r,
                  disabled: i,
                  className: E,
                  onChange: (O) => {
                    R.onChange(O), m == null || m(O);
                  }
                }
              ),
              /* @__PURE__ */ T(
                "button",
                {
                  type: "button",
                  onClick: w,
                  className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2",
                  children: y ? /* @__PURE__ */ T(Eu, { size: 18 }) : /* @__PURE__ */ T(wu, { size: 18 })
                }
              )
            ] }) : /* @__PURE__ */ T(
              gi,
              {
                ...R,
                type: n,
                placeholder: r,
                disabled: i,
                className: E
              }
            ),
            l && /* @__PURE__ */ T("div", { className: "flex items-center", children: l })
          ] });
        }
      }
    ),
    f && /* @__PURE__ */ T("p", { className: "text-destructive text-sm", children: (p = f.message) == null ? void 0 : p.toString() })
  ] });
}
var sc = {}, Ro = {}, En = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "warnOnce", {
    enumerable: !0,
    get: function() {
      return t;
    }
  });
  let t = (n) => {
  };
  if (process.env.NODE_ENV !== "production") {
    const n = /* @__PURE__ */ new Set();
    t = (r) => {
      n.has(r) || console.warn(r), n.add(r);
    };
  }
})(En);
var cc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "getImageBlurSvg", {
    enumerable: !0,
    get: function() {
      return t;
    }
  });
  function t(n) {
    let { widthInt: r, heightInt: o, blurWidth: i, blurHeight: a, blurDataURL: s, objectFit: c } = n;
    const u = 20, l = i ? i * 40 : r, d = a ? a * 40 : o, m = l && d ? "viewBox='0 0 " + l + " " + d + "'" : "", h = m ? "none" : c === "contain" ? "xMidYMid" : c === "cover" ? "xMidYMid slice" : "none";
    return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + m + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + u + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + u + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + h + "' style='filter: url(%23b);' href='" + s + "'/%3E%3C/svg%3E";
  }
})(cc);
var Rn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(o, i) {
    for (var a in i) Object.defineProperty(o, a, {
      enumerable: !0,
      get: i[a]
    });
  }
  t(e, {
    VALID_LOADERS: function() {
      return n;
    },
    imageConfigDefault: function() {
      return r;
    }
  });
  const n = [
    "default",
    "imgix",
    "cloudinary",
    "akamai",
    "custom"
  ], r = {
    deviceSizes: [
      640,
      750,
      828,
      1080,
      1200,
      1920,
      2048,
      3840
    ],
    imageSizes: [
      16,
      32,
      48,
      64,
      96,
      128,
      256,
      384
    ],
    path: "/_next/image",
    loader: "default",
    loaderFile: "",
    domains: [],
    disableStaticImages: !1,
    minimumCacheTTL: 60,
    formats: [
      "image/webp"
    ],
    dangerouslyAllowSVG: !1,
    contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
    contentDispositionType: "attachment",
    localPatterns: void 0,
    remotePatterns: [],
    qualities: void 0,
    unoptimized: !1
  };
})(Rn);
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "getImgProps", {
    enumerable: !0,
    get: function() {
      return v;
    }
  });
  const t = En, n = cc, r = Rn, o = [
    "lazy",
    "eager",
    void 0
  ], i = [
    "-moz-initial",
    "fill",
    "none",
    "scale-down",
    void 0
  ];
  function a(f) {
    return f.default !== void 0;
  }
  function s(f) {
    return f.src !== void 0;
  }
  function c(f) {
    return !!f && typeof f == "object" && (a(f) || s(f));
  }
  const u = /* @__PURE__ */ new Map();
  let l;
  function d(f) {
    return typeof f > "u" ? f : typeof f == "number" ? Number.isFinite(f) ? f : NaN : typeof f == "string" && /^[0-9]+$/.test(f) ? parseInt(f, 10) : NaN;
  }
  function m(f, y, g) {
    let { deviceSizes: w, allSizes: p } = f;
    if (g) {
      const E = /(^|\s)(1?\d?\d)vw/g, A = [];
      for (let O; O = E.exec(g); O)
        A.push(parseInt(O[2]));
      if (A.length) {
        const O = Math.min(...A) * 0.01;
        return {
          widths: p.filter((P) => P >= w[0] * O),
          kind: "w"
        };
      }
      return {
        widths: p,
        kind: "w"
      };
    }
    return typeof y != "number" ? {
      widths: w,
      kind: "w"
    } : {
      widths: [
        ...new Set(
          // > This means that most OLED screens that say they are 3x resolution,
          // > are actually 3x in the green color, but only 1.5x in the red and
          // > blue colors. Showing a 3x resolution image in the app vs a 2x
          // > resolution image will be visually the same, though the 3x image
          // > takes significantly more data. Even true 3x resolution screens are
          // > wasteful as the human eye cannot see that level of detail without
          // > something like a magnifying glass.
          // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
          [
            y,
            y * 2
            /*, width * 3*/
          ].map((E) => p.find((A) => A >= E) || p[p.length - 1])
        )
      ],
      kind: "x"
    };
  }
  function h(f) {
    let { config: y, src: g, unoptimized: w, width: p, quality: R, sizes: E, loader: A } = f;
    if (w)
      return {
        src: g,
        srcSet: void 0,
        sizes: void 0
      };
    const { widths: O, kind: P } = m(y, p, E), I = O.length - 1;
    return {
      sizes: !E && P === "w" ? "100vw" : E,
      srcSet: O.map((C, D) => A({
        config: y,
        src: g,
        quality: R,
        width: C
      }) + " " + (P === "w" ? C : D + 1) + P).join(", "),
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      src: A({
        config: y,
        src: g,
        quality: R,
        width: O[I]
      })
    };
  }
  function v(f, y) {
    let { src: g, sizes: w, unoptimized: p = !1, priority: R = !1, loading: E, className: A, quality: O, width: P, height: I, fill: C = !1, style: D, overrideSrc: L, onLoad: q, onLoadingComplete: k, placeholder: B = "empty", blurDataURL: H, fetchPriority: K, decoding: N = "async", layout: X, objectFit: ee, objectPosition: ce, lazyBoundary: oe, lazyRoot: ne, ...Y } = f;
    const { imgConf: fe, showAltText: ie, blurComplete: x, defaultLoader: J } = y;
    let W, G = fe || r.imageConfigDefault;
    if ("allSizes" in G)
      W = G;
    else {
      var _;
      const M = [
        ...G.deviceSizes,
        ...G.imageSizes
      ].sort((pe, Oe) => pe - Oe), te = G.deviceSizes.sort((pe, Oe) => pe - Oe), _e = (_ = G.qualities) == null ? void 0 : _.sort((pe, Oe) => pe - Oe);
      W = {
        ...G,
        allSizes: M,
        deviceSizes: te,
        qualities: _e
      };
    }
    if (typeof J > "u")
      throw Object.defineProperty(new Error(`images.loaderFile detected but the file is missing default export.
Read more: https://nextjs.org/docs/messages/invalid-images-config`), "__NEXT_ERROR_CODE", {
        value: "E163",
        enumerable: !1,
        configurable: !0
      });
    let b = Y.loader || J;
    delete Y.loader, delete Y.srcSet;
    const $ = "__next_img_default" in b;
    if ($) {
      if (W.loader === "custom")
        throw Object.defineProperty(new Error('Image with src "' + g + `" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
          value: "E252",
          enumerable: !1,
          configurable: !0
        });
    } else {
      const M = b;
      b = (te) => {
        const { config: _e, ...pe } = te;
        return M(pe);
      };
    }
    if (X) {
      X === "fill" && (C = !0);
      const M = {
        intrinsic: {
          maxWidth: "100%",
          height: "auto"
        },
        responsive: {
          width: "100%",
          height: "auto"
        }
      }, te = {
        responsive: "100vw",
        fill: "100vw"
      }, _e = M[X];
      _e && (D = {
        ...D,
        ..._e
      });
      const pe = te[X];
      pe && !w && (w = pe);
    }
    let j = "", F = d(P), V = d(I), de, he;
    if (c(g)) {
      const M = a(g) ? g.default : g;
      if (!M.src)
        throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(M)), "__NEXT_ERROR_CODE", {
          value: "E460",
          enumerable: !1,
          configurable: !0
        });
      if (!M.height || !M.width)
        throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(M)), "__NEXT_ERROR_CODE", {
          value: "E48",
          enumerable: !1,
          configurable: !0
        });
      if (de = M.blurWidth, he = M.blurHeight, H = H || M.blurDataURL, j = M.src, !C) {
        if (!F && !V)
          F = M.width, V = M.height;
        else if (F && !V) {
          const te = F / M.width;
          V = Math.round(M.height * te);
        } else if (!F && V) {
          const te = V / M.height;
          F = Math.round(M.width * te);
        }
      }
    }
    g = typeof g == "string" ? g : j;
    let le = !R && (E === "lazy" || typeof E > "u");
    (!g || g.startsWith("data:") || g.startsWith("blob:")) && (p = !0, le = !1), W.unoptimized && (p = !0), $ && !W.dangerouslyAllowSVG && g.split("?", 1)[0].endsWith(".svg") && (p = !0);
    const xe = d(O);
    if (process.env.NODE_ENV !== "production") {
      if (W.output === "export" && $ && !p)
        throw Object.defineProperty(new Error("Image Optimization using the default loader is not compatible with `{ output: 'export' }`.\n  Possible solutions:\n    - Remove `{ output: 'export' }` and run \"next start\" to run server mode including the Image Optimization API.\n    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.\n  Read more: https://nextjs.org/docs/messages/export-image-api"), "__NEXT_ERROR_CODE", {
          value: "E500",
          enumerable: !1,
          configurable: !0
        });
      if (!g)
        p = !0;
      else if (C) {
        if (P)
          throw Object.defineProperty(new Error('Image with src "' + g + '" has both "width" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
            value: "E96",
            enumerable: !1,
            configurable: !0
          });
        if (I)
          throw Object.defineProperty(new Error('Image with src "' + g + '" has both "height" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
            value: "E115",
            enumerable: !1,
            configurable: !0
          });
        if (D != null && D.position && D.position !== "absolute")
          throw Object.defineProperty(new Error('Image with src "' + g + '" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E216",
            enumerable: !1,
            configurable: !0
          });
        if (D != null && D.width && D.width !== "100%")
          throw Object.defineProperty(new Error('Image with src "' + g + '" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E73",
            enumerable: !1,
            configurable: !0
          });
        if (D != null && D.height && D.height !== "100%")
          throw Object.defineProperty(new Error('Image with src "' + g + '" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E404",
            enumerable: !1,
            configurable: !0
          });
      } else {
        if (typeof F > "u")
          throw Object.defineProperty(new Error('Image with src "' + g + '" is missing required "width" property.'), "__NEXT_ERROR_CODE", {
            value: "E451",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(F))
          throw Object.defineProperty(new Error('Image with src "' + g + '" has invalid "width" property. Expected a numeric value in pixels but received "' + P + '".'), "__NEXT_ERROR_CODE", {
            value: "E66",
            enumerable: !1,
            configurable: !0
          });
        if (typeof V > "u")
          throw Object.defineProperty(new Error('Image with src "' + g + '" is missing required "height" property.'), "__NEXT_ERROR_CODE", {
            value: "E397",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(V))
          throw Object.defineProperty(new Error('Image with src "' + g + '" has invalid "height" property. Expected a numeric value in pixels but received "' + I + '".'), "__NEXT_ERROR_CODE", {
            value: "E444",
            enumerable: !1,
            configurable: !0
          });
        if (/^[\x00-\x20]/.test(g))
          throw Object.defineProperty(new Error('Image with src "' + g + '" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
            value: "E176",
            enumerable: !1,
            configurable: !0
          });
        if (/[\x00-\x20]$/.test(g))
          throw Object.defineProperty(new Error('Image with src "' + g + '" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
            value: "E21",
            enumerable: !1,
            configurable: !0
          });
      }
      if (!o.includes(E))
        throw Object.defineProperty(new Error('Image with src "' + g + '" has invalid "loading" property. Provided "' + E + '" should be one of ' + o.map(String).join(",") + "."), "__NEXT_ERROR_CODE", {
          value: "E357",
          enumerable: !1,
          configurable: !0
        });
      if (R && E === "lazy")
        throw Object.defineProperty(new Error('Image with src "' + g + `" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
          value: "E218",
          enumerable: !1,
          configurable: !0
        });
      if (B !== "empty" && B !== "blur" && !B.startsWith("data:image/"))
        throw Object.defineProperty(new Error('Image with src "' + g + '" has invalid "placeholder" property "' + B + '".'), "__NEXT_ERROR_CODE", {
          value: "E431",
          enumerable: !1,
          configurable: !0
        });
      if (B !== "empty" && F && V && F * V < 1600 && (0, t.warnOnce)('Image with src "' + g + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.'), B === "blur" && !H) {
        const M = [
          "jpeg",
          "png",
          "webp",
          "avif"
        ];
        throw Object.defineProperty(new Error('Image with src "' + g + `" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ` + M.join(",") + ` (animated images not supported)
          - Remove the "placeholder" property, effectively no blur effect
        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`), "__NEXT_ERROR_CODE", {
          value: "E371",
          enumerable: !1,
          configurable: !0
        });
      }
      if ("ref" in Y && (0, t.warnOnce)('Image with src "' + g + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.'), !p && !$) {
        const M = b({
          config: W,
          src: g,
          width: F || 400,
          quality: xe || 75
        });
        let te;
        try {
          te = new URL(M);
        } catch {
        }
        (M === g || te && te.pathname === g && !te.search) && (0, t.warnOnce)('Image with src "' + g + `" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
      }
      k && (0, t.warnOnce)('Image with src "' + g + '" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.');
      for (const [M, te] of Object.entries({
        layout: X,
        objectFit: ee,
        objectPosition: ce,
        lazyBoundary: oe,
        lazyRoot: ne
      }))
        te && (0, t.warnOnce)('Image with src "' + g + '" has legacy prop "' + M + `". Did you forget to run the codemod?
Read more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
      if (typeof window < "u" && !l && window.PerformanceObserver) {
        l = new PerformanceObserver((M) => {
          for (const _e of M.getEntries()) {
            var te;
            const pe = (_e == null || (te = _e.element) == null ? void 0 : te.src) || "", Oe = u.get(pe);
            Oe && !Oe.priority && Oe.placeholder === "empty" && !Oe.src.startsWith("data:") && !Oe.src.startsWith("blob:") && (0, t.warnOnce)('Image with src "' + Oe.src + `" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
Read more: https://nextjs.org/docs/api-reference/next/image#priority`);
          }
        });
        try {
          l.observe({
            type: "largest-contentful-paint",
            buffered: !0
          });
        } catch (M) {
          console.error(M);
        }
      }
    }
    const ye = Object.assign(C ? {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      objectFit: ee,
      objectPosition: ce
    } : {}, ie ? {} : {
      color: "transparent"
    }, D), re = !x && B !== "empty" ? B === "blur" ? 'url("data:image/svg+xml;charset=utf-8,' + (0, n.getImageBlurSvg)({
      widthInt: F,
      heightInt: V,
      blurWidth: de,
      blurHeight: he,
      blurDataURL: H || "",
      objectFit: ye.objectFit
    }) + '")' : 'url("' + B + '")' : null, ae = i.includes(ye.objectFit) ? ye.objectFit === "fill" ? "100% 100%" : "cover" : ye.objectFit;
    let ge = re ? {
      backgroundSize: ae,
      backgroundPosition: ye.objectPosition || "50% 50%",
      backgroundRepeat: "no-repeat",
      backgroundImage: re
    } : {};
    process.env.NODE_ENV === "development" && ge.backgroundImage && B === "blur" && H != null && H.startsWith("/") && (ge.backgroundImage = 'url("' + H + '")');
    const z = h({
      config: W,
      src: g,
      unoptimized: p,
      width: F,
      quality: xe,
      sizes: w,
      loader: b
    });
    if (process.env.NODE_ENV !== "production" && typeof window < "u") {
      let M;
      try {
        M = new URL(z.src);
      } catch {
        M = new URL(z.src, window.location.href);
      }
      u.set(M.href, {
        src: g,
        priority: R,
        placeholder: B
      });
    }
    return {
      props: {
        ...Y,
        loading: le ? "lazy" : E,
        fetchPriority: K,
        width: F,
        height: V,
        decoding: N,
        className: A,
        style: {
          ...ye,
          ...ge
        },
        sizes: z.sizes,
        srcSet: z.srcSet,
        src: L || z.src
      },
      meta: {
        unoptimized: p,
        priority: R,
        placeholder: B,
        fill: C
      }
    };
  }
})(Ro);
var Wr = { exports: {} }, Xt = { exports: {} }, sr = {}, qi;
function Bp() {
  return qi || (qi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const t = se, n = typeof window > "u", r = n ? () => {
    } : t.useLayoutEffect, o = n ? () => {
    } : t.useEffect;
    function i(a) {
      const { headManager: s, reduceComponentsToState: c } = a;
      function u() {
        if (s && s.mountedInstances) {
          const d = t.Children.toArray(Array.from(s.mountedInstances).filter(Boolean));
          s.updateHead(c(d, a));
        }
      }
      if (n) {
        var l;
        s == null || (l = s.mountedInstances) == null || l.add(a.children), u();
      }
      return r(() => {
        var d;
        return s == null || (d = s.mountedInstances) == null || d.add(a.children), () => {
          var m;
          s == null || (m = s.mountedInstances) == null || m.delete(a.children);
        };
      }), r(() => (s && (s._pendingUpdate = u), () => {
        s && (s._pendingUpdate = u);
      })), o(() => (s && s._pendingUpdate && (s._pendingUpdate(), s._pendingUpdate = null), () => {
        s && s._pendingUpdate && (s._pendingUpdate(), s._pendingUpdate = null);
      })), null;
    }
  }(sr)), sr;
}
var cr = {}, zi;
function qp() {
  return zi || (zi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "AmpStateContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ Be._(se)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "AmpStateContext");
  }(cr)), cr;
}
var ur = {}, Xi;
function zp() {
  return Xi || (Xi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "HeadManagerContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ Be._(se)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "HeadManagerContext");
  }(ur)), ur;
}
var lr = {}, Wi;
function Xp() {
  return Wi || (Wi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isInAmpMode", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n) {
      let { ampFirst: r = !1, hybrid: o = !1, hasQuery: i = !1 } = n === void 0 ? {} : n;
      return r || o && i;
    }
  }(lr)), lr;
}
var Vi;
function Wp() {
  return Vi || (Vi = 1, function(e, t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(p, R) {
      for (var E in R) Object.defineProperty(p, E, {
        enumerable: !0,
        get: R[E]
      });
    }
    n(t, {
      default: function() {
        return w;
      },
      defaultHead: function() {
        return m;
      }
    });
    const r = Be, o = dt, i = oo, a = /* @__PURE__ */ o._(se), s = /* @__PURE__ */ r._(Bp()), c = qp(), u = zp(), l = Xp(), d = En;
    function m(p) {
      p === void 0 && (p = !1);
      const R = [
        /* @__PURE__ */ (0, i.jsx)("meta", {
          charSet: "utf-8"
        }, "charset")
      ];
      return p || R.push(/* @__PURE__ */ (0, i.jsx)("meta", {
        name: "viewport",
        content: "width=device-width"
      }, "viewport")), R;
    }
    function h(p, R) {
      return typeof R == "string" || typeof R == "number" ? p : R.type === a.default.Fragment ? p.concat(
        // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
        a.default.Children.toArray(R.props.children).reduce(
          // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
          (E, A) => typeof A == "string" || typeof A == "number" ? E : E.concat(A),
          []
        )
      ) : p.concat(R);
    }
    const v = [
      "name",
      "httpEquiv",
      "charSet",
      "itemProp"
    ];
    function f() {
      const p = /* @__PURE__ */ new Set(), R = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), A = {};
      return (O) => {
        let P = !0, I = !1;
        if (O.key && typeof O.key != "number" && O.key.indexOf("$") > 0) {
          I = !0;
          const C = O.key.slice(O.key.indexOf("$") + 1);
          p.has(C) ? P = !1 : p.add(C);
        }
        switch (O.type) {
          case "title":
          case "base":
            R.has(O.type) ? P = !1 : R.add(O.type);
            break;
          case "meta":
            for (let C = 0, D = v.length; C < D; C++) {
              const L = v[C];
              if (O.props.hasOwnProperty(L))
                if (L === "charSet")
                  E.has(L) ? P = !1 : E.add(L);
                else {
                  const q = O.props[L], k = A[L] || /* @__PURE__ */ new Set();
                  (L !== "name" || !I) && k.has(q) ? P = !1 : (k.add(q), A[L] = k);
                }
            }
            break;
        }
        return P;
      };
    }
    function y(p, R) {
      const { inAmpMode: E } = R;
      return p.reduce(h, []).reverse().concat(m(E).reverse()).filter(f()).reverse().map((A, O) => {
        const P = A.key || O;
        if (process.env.NODE_ENV !== "development" && process.env.__NEXT_OPTIMIZE_FONTS && !E && A.type === "link" && A.props.href && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
        [
          "https://fonts.googleapis.com/css",
          "https://use.typekit.net/"
        ].some((I) => A.props.href.startsWith(I))) {
          const I = {
            ...A.props || {}
          };
          return I["data-href"] = I.href, I.href = void 0, I["data-optimized-fonts"] = !0, /* @__PURE__ */ a.default.cloneElement(A, I);
        }
        if (process.env.NODE_ENV === "development")
          if (A.type === "script" && A.props.type !== "application/ld+json") {
            const I = A.props.src ? '<script> tag with src="' + A.props.src + '"' : "inline <script>";
            (0, d.warnOnce)("Do not add <script> tags using next/head (see " + I + `). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
          } else A.type === "link" && A.props.rel === "stylesheet" && (0, d.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + A.props.href + `"). Use Document instead. 
See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
        return /* @__PURE__ */ a.default.cloneElement(A, {
          key: P
        });
      });
    }
    function g(p) {
      let { children: R } = p;
      const E = (0, a.useContext)(c.AmpStateContext), A = (0, a.useContext)(u.HeadManagerContext);
      return /* @__PURE__ */ (0, i.jsx)(s.default, {
        reduceComponentsToState: y,
        headManager: A,
        inAmpMode: (0, l.isInAmpMode)(E),
        children: R
      });
    }
    const w = g;
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Xt, Xt.exports)), Xt.exports;
}
var fr = {}, Gi;
function Vp() {
  return Gi || (Gi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ImageConfigContext", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = /* @__PURE__ */ Be._(se), r = Rn, o = n.default.createContext(r.imageConfigDefault);
    process.env.NODE_ENV !== "production" && (o.displayName = "ImageConfigContext");
  }(fr)), fr;
}
var dr = {}, pr = {}, hr = { exports: {} }, Ki;
function uc() {
  return Ki || (Ki = 1, (() => {
    var e = { 170: (o, i, a) => {
      const s = a(510), c = () => {
        if (typeof navigator < "u" && navigator.platform) {
          const l = navigator.platform.toLowerCase();
          return l === "win32" || l === "windows";
        }
        return typeof process < "u" && process.platform ? process.platform === "win32" : !1;
      };
      function u(l, d, m = !1) {
        return d && (d.windows === null || d.windows === void 0) && (d = { ...d, windows: c() }), s(l, d, m);
      }
      Object.assign(u, s), o.exports = u;
    }, 154: (o) => {
      const i = "\\\\/", a = `[^${i}]`, s = "\\.", c = "\\+", u = "\\?", l = "\\/", d = "(?=.)", m = "[^/]", h = `(?:${l}|$)`, v = `(?:^|${l})`, f = `${s}{1,2}${h}`, y = `(?!${s})`, g = `(?!${v}${f})`, w = `(?!${s}{0,1}${h})`, p = `(?!${f})`, R = `[^.${l}]`, E = `${m}*?`, O = { DOT_LITERAL: s, PLUS_LITERAL: c, QMARK_LITERAL: u, SLASH_LITERAL: l, ONE_CHAR: d, QMARK: m, END_ANCHOR: h, DOTS_SLASH: f, NO_DOT: y, NO_DOTS: g, NO_DOT_SLASH: w, NO_DOTS_SLASH: p, QMARK_NO_DOT: R, STAR: E, START_ANCHOR: v, SEP: "/" }, P = { ...O, SLASH_LITERAL: `[${i}]`, QMARK: a, STAR: `${a}*?`, DOTS_SLASH: `${s}{1,2}(?:[${i}]|$)`, NO_DOT: `(?!${s})`, NO_DOTS: `(?!(?:^|[${i}])${s}{1,2}(?:[${i}]|$))`, NO_DOT_SLASH: `(?!${s}{0,1}(?:[${i}]|$))`, NO_DOTS_SLASH: `(?!${s}{1,2}(?:[${i}]|$))`, QMARK_NO_DOT: `[^.${i}]`, START_ANCHOR: `(?:^|[${i}])`, END_ANCHOR: `(?:[${i}]|$)`, SEP: "\\" }, I = { alnum: "a-zA-Z0-9", alpha: "a-zA-Z", ascii: "\\x00-\\x7F", blank: " \\t", cntrl: "\\x00-\\x1F\\x7F", digit: "0-9", graph: "\\x21-\\x7E", lower: "a-z", print: "\\x20-\\x7E ", punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~", space: " \\t\\r\\n\\v\\f", upper: "A-Z", word: "A-Za-z0-9_", xdigit: "A-Fa-f0-9" };
      o.exports = { MAX_LENGTH: 65536, POSIX_REGEX_SOURCE: I, REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g, REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/, REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/, REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g, REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g, REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g, REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" }, CHAR_0: 48, CHAR_9: 57, CHAR_UPPERCASE_A: 65, CHAR_LOWERCASE_A: 97, CHAR_UPPERCASE_Z: 90, CHAR_LOWERCASE_Z: 122, CHAR_LEFT_PARENTHESES: 40, CHAR_RIGHT_PARENTHESES: 41, CHAR_ASTERISK: 42, CHAR_AMPERSAND: 38, CHAR_AT: 64, CHAR_BACKWARD_SLASH: 92, CHAR_CARRIAGE_RETURN: 13, CHAR_CIRCUMFLEX_ACCENT: 94, CHAR_COLON: 58, CHAR_COMMA: 44, CHAR_DOT: 46, CHAR_DOUBLE_QUOTE: 34, CHAR_EQUAL: 61, CHAR_EXCLAMATION_MARK: 33, CHAR_FORM_FEED: 12, CHAR_FORWARD_SLASH: 47, CHAR_GRAVE_ACCENT: 96, CHAR_HASH: 35, CHAR_HYPHEN_MINUS: 45, CHAR_LEFT_ANGLE_BRACKET: 60, CHAR_LEFT_CURLY_BRACE: 123, CHAR_LEFT_SQUARE_BRACKET: 91, CHAR_LINE_FEED: 10, CHAR_NO_BREAK_SPACE: 160, CHAR_PERCENT: 37, CHAR_PLUS: 43, CHAR_QUESTION_MARK: 63, CHAR_RIGHT_ANGLE_BRACKET: 62, CHAR_RIGHT_CURLY_BRACE: 125, CHAR_RIGHT_SQUARE_BRACKET: 93, CHAR_SEMICOLON: 59, CHAR_SINGLE_QUOTE: 39, CHAR_SPACE: 32, CHAR_TAB: 9, CHAR_UNDERSCORE: 95, CHAR_VERTICAL_LINE: 124, CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, extglobChars(C) {
        return { "!": { type: "negate", open: "(?:(?!(?:", close: `))${C.STAR})` }, "?": { type: "qmark", open: "(?:", close: ")?" }, "+": { type: "plus", open: "(?:", close: ")+" }, "*": { type: "star", open: "(?:", close: ")*" }, "@": { type: "at", open: "(?:", close: ")" } };
      }, globChars(C) {
        return C === !0 ? P : O;
      } };
    }, 697: (o, i, a) => {
      const s = a(154), c = a(96), { MAX_LENGTH: u, POSIX_REGEX_SOURCE: l, REGEX_NON_SPECIAL_CHARS: d, REGEX_SPECIAL_CHARS_BACKREF: m, REPLACEMENTS: h } = s, v = (g, w) => {
        if (typeof w.expandRange == "function")
          return w.expandRange(...g, w);
        g.sort();
        const p = `[${g.join("-")}]`;
        try {
          new RegExp(p);
        } catch {
          return g.map((E) => c.escapeRegex(E)).join("..");
        }
        return p;
      }, f = (g, w) => `Missing ${g}: "${w}" - use "\\\\${w}" to match literal characters`, y = (g, w) => {
        if (typeof g != "string")
          throw new TypeError("Expected a string");
        g = h[g] || g;
        const p = { ...w }, R = typeof p.maxLength == "number" ? Math.min(u, p.maxLength) : u;
        let E = g.length;
        if (E > R)
          throw new SyntaxError(`Input length: ${E}, exceeds maximum allowed length: ${R}`);
        const A = { type: "bos", value: "", output: p.prepend || "" }, O = [A], P = p.capture ? "" : "?:", I = s.globChars(p.windows), C = s.extglobChars(I), { DOT_LITERAL: D, PLUS_LITERAL: L, SLASH_LITERAL: q, ONE_CHAR: k, DOTS_SLASH: B, NO_DOT: H, NO_DOT_SLASH: K, NO_DOTS_SLASH: N, QMARK: X, QMARK_NO_DOT: ee, STAR: ce, START_ANCHOR: oe } = I, ne = (z) => `(${P}(?:(?!${oe}${z.dot ? B : D}).)*?)`, Y = p.dot ? "" : H, fe = p.dot ? X : ee;
        let ie = p.bash === !0 ? ne(p) : ce;
        p.capture && (ie = `(${ie})`), typeof p.noext == "boolean" && (p.noextglob = p.noext);
        const x = { input: g, index: -1, start: 0, dot: p.dot === !0, consumed: "", output: "", prefix: "", backtrack: !1, negated: !1, brackets: 0, braces: 0, parens: 0, quotes: 0, globstar: !1, tokens: O };
        g = c.removePrefix(g, x), E = g.length;
        const J = [], W = [], G = [];
        let _ = A, b;
        const $ = () => x.index === E - 1, j = x.peek = (z = 1) => g[x.index + z], F = x.advance = () => g[++x.index] || "", V = () => g.slice(x.index + 1), de = (z = "", me = 0) => {
          x.consumed += z, x.index += me;
        }, he = (z) => {
          x.output += z.output != null ? z.output : z.value, de(z.value);
        }, le = () => {
          let z = 1;
          for (; j() === "!" && (j(2) !== "(" || j(3) === "?"); )
            F(), x.start++, z++;
          return z % 2 === 0 ? !1 : (x.negated = !0, x.start++, !0);
        }, xe = (z) => {
          x[z]++, G.push(z);
        }, ye = (z) => {
          x[z]--, G.pop();
        }, re = (z) => {
          if (_.type === "globstar") {
            const me = x.braces > 0 && (z.type === "comma" || z.type === "brace"), U = z.extglob === !0 || J.length && (z.type === "pipe" || z.type === "paren");
            z.type !== "slash" && z.type !== "paren" && !me && !U && (x.output = x.output.slice(0, -_.output.length), _.type = "star", _.value = "*", _.output = ie, x.output += _.output);
          }
          if (J.length && z.type !== "paren" && (J[J.length - 1].inner += z.value), (z.value || z.output) && he(z), _ && _.type === "text" && z.type === "text") {
            _.output = (_.output || _.value) + z.value, _.value += z.value;
            return;
          }
          z.prev = _, O.push(z), _ = z;
        }, ae = (z, me) => {
          const U = { ...C[me], conditions: 1, inner: "" };
          U.prev = _, U.parens = x.parens, U.output = x.output;
          const M = (p.capture ? "(" : "") + U.open;
          xe("parens"), re({ type: z, value: me, output: x.output ? "" : k }), re({ type: "paren", extglob: !0, value: F(), output: M }), J.push(U);
        }, ge = (z) => {
          let me = z.close + (p.capture ? ")" : ""), U;
          if (z.type === "negate") {
            let M = ie;
            if (z.inner && z.inner.length > 1 && z.inner.includes("/") && (M = ne(p)), (M !== ie || $() || /^\)+$/.test(V())) && (me = z.close = `)$))${M}`), z.inner.includes("*") && (U = V()) && /^\.[^\\/.]+$/.test(U)) {
              const te = y(U, { ...w, fastpaths: !1 }).output;
              me = z.close = `)${te})${M})`;
            }
            z.prev.type === "bos" && (x.negatedExtglob = !0);
          }
          re({ type: "paren", extglob: !0, value: b, output: me }), ye("parens");
        };
        if (p.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(g)) {
          let z = !1, me = g.replace(m, (U, M, te, _e, pe, Oe) => _e === "\\" ? (z = !0, U) : _e === "?" ? M ? M + _e + (pe ? X.repeat(pe.length) : "") : Oe === 0 ? fe + (pe ? X.repeat(pe.length) : "") : X.repeat(te.length) : _e === "." ? D.repeat(te.length) : _e === "*" ? M ? M + _e + (pe ? ie : "") : ie : M ? U : `\\${U}`);
          return z === !0 && (p.unescape === !0 ? me = me.replace(/\\/g, "") : me = me.replace(/\\+/g, (U) => U.length % 2 === 0 ? "\\\\" : U ? "\\" : "")), me === g && p.contains === !0 ? (x.output = g, x) : (x.output = c.wrapOutput(me, x, w), x);
        }
        for (; !$(); ) {
          if (b = F(), b === "\0")
            continue;
          if (b === "\\") {
            const U = j();
            if (U === "/" && p.bash !== !0 || U === "." || U === ";")
              continue;
            if (!U) {
              b += "\\", re({ type: "text", value: b });
              continue;
            }
            const M = /^\\+/.exec(V());
            let te = 0;
            if (M && M[0].length > 2 && (te = M[0].length, x.index += te, te % 2 !== 0 && (b += "\\")), p.unescape === !0 ? b = F() : b += F(), x.brackets === 0) {
              re({ type: "text", value: b });
              continue;
            }
          }
          if (x.brackets > 0 && (b !== "]" || _.value === "[" || _.value === "[^")) {
            if (p.posix !== !1 && b === ":") {
              const U = _.value.slice(1);
              if (U.includes("[") && (_.posix = !0, U.includes(":"))) {
                const M = _.value.lastIndexOf("["), te = _.value.slice(0, M), _e = _.value.slice(M + 2), pe = l[_e];
                if (pe) {
                  _.value = te + pe, x.backtrack = !0, F(), !A.output && O.indexOf(_) === 1 && (A.output = k);
                  continue;
                }
              }
            }
            (b === "[" && j() !== ":" || b === "-" && j() === "]") && (b = `\\${b}`), b === "]" && (_.value === "[" || _.value === "[^") && (b = `\\${b}`), p.posix === !0 && b === "!" && _.value === "[" && (b = "^"), _.value += b, he({ value: b });
            continue;
          }
          if (x.quotes === 1 && b !== '"') {
            b = c.escapeRegex(b), _.value += b, he({ value: b });
            continue;
          }
          if (b === '"') {
            x.quotes = x.quotes === 1 ? 0 : 1, p.keepQuotes === !0 && re({ type: "text", value: b });
            continue;
          }
          if (b === "(") {
            xe("parens"), re({ type: "paren", value: b });
            continue;
          }
          if (b === ")") {
            if (x.parens === 0 && p.strictBrackets === !0)
              throw new SyntaxError(f("opening", "("));
            const U = J[J.length - 1];
            if (U && x.parens === U.parens + 1) {
              ge(J.pop());
              continue;
            }
            re({ type: "paren", value: b, output: x.parens ? ")" : "\\)" }), ye("parens");
            continue;
          }
          if (b === "[") {
            if (p.nobracket === !0 || !V().includes("]")) {
              if (p.nobracket !== !0 && p.strictBrackets === !0)
                throw new SyntaxError(f("closing", "]"));
              b = `\\${b}`;
            } else
              xe("brackets");
            re({ type: "bracket", value: b });
            continue;
          }
          if (b === "]") {
            if (p.nobracket === !0 || _ && _.type === "bracket" && _.value.length === 1) {
              re({ type: "text", value: b, output: `\\${b}` });
              continue;
            }
            if (x.brackets === 0) {
              if (p.strictBrackets === !0)
                throw new SyntaxError(f("opening", "["));
              re({ type: "text", value: b, output: `\\${b}` });
              continue;
            }
            ye("brackets");
            const U = _.value.slice(1);
            if (_.posix !== !0 && U[0] === "^" && !U.includes("/") && (b = `/${b}`), _.value += b, he({ value: b }), p.literalBrackets === !1 || c.hasRegexChars(U))
              continue;
            const M = c.escapeRegex(_.value);
            if (x.output = x.output.slice(0, -_.value.length), p.literalBrackets === !0) {
              x.output += M, _.value = M;
              continue;
            }
            _.value = `(${P}${M}|${_.value})`, x.output += _.value;
            continue;
          }
          if (b === "{" && p.nobrace !== !0) {
            xe("braces");
            const U = { type: "brace", value: b, output: "(", outputIndex: x.output.length, tokensIndex: x.tokens.length };
            W.push(U), re(U);
            continue;
          }
          if (b === "}") {
            const U = W[W.length - 1];
            if (p.nobrace === !0 || !U) {
              re({ type: "text", value: b, output: b });
              continue;
            }
            let M = ")";
            if (U.dots === !0) {
              const te = O.slice(), _e = [];
              for (let pe = te.length - 1; pe >= 0 && (O.pop(), te[pe].type !== "brace"); pe--)
                te[pe].type !== "dots" && _e.unshift(te[pe].value);
              M = v(_e, p), x.backtrack = !0;
            }
            if (U.comma !== !0 && U.dots !== !0) {
              const te = x.output.slice(0, U.outputIndex), _e = x.tokens.slice(U.tokensIndex);
              U.value = U.output = "\\{", b = M = "\\}", x.output = te;
              for (const pe of _e)
                x.output += pe.output || pe.value;
            }
            re({ type: "brace", value: b, output: M }), ye("braces"), W.pop();
            continue;
          }
          if (b === "|") {
            J.length > 0 && J[J.length - 1].conditions++, re({ type: "text", value: b });
            continue;
          }
          if (b === ",") {
            let U = b;
            const M = W[W.length - 1];
            M && G[G.length - 1] === "braces" && (M.comma = !0, U = "|"), re({ type: "comma", value: b, output: U });
            continue;
          }
          if (b === "/") {
            if (_.type === "dot" && x.index === x.start + 1) {
              x.start = x.index + 1, x.consumed = "", x.output = "", O.pop(), _ = A;
              continue;
            }
            re({ type: "slash", value: b, output: q });
            continue;
          }
          if (b === ".") {
            if (x.braces > 0 && _.type === "dot") {
              _.value === "." && (_.output = D);
              const U = W[W.length - 1];
              _.type = "dots", _.output += b, _.value += b, U.dots = !0;
              continue;
            }
            if (x.braces + x.parens === 0 && _.type !== "bos" && _.type !== "slash") {
              re({ type: "text", value: b, output: D });
              continue;
            }
            re({ type: "dot", value: b, output: D });
            continue;
          }
          if (b === "?") {
            if (!(_ && _.value === "(") && p.noextglob !== !0 && j() === "(" && j(2) !== "?") {
              ae("qmark", b);
              continue;
            }
            if (_ && _.type === "paren") {
              const M = j();
              let te = b;
              (_.value === "(" && !/[!=<:]/.test(M) || M === "<" && !/<([!=]|\w+>)/.test(V())) && (te = `\\${b}`), re({ type: "text", value: b, output: te });
              continue;
            }
            if (p.dot !== !0 && (_.type === "slash" || _.type === "bos")) {
              re({ type: "qmark", value: b, output: ee });
              continue;
            }
            re({ type: "qmark", value: b, output: X });
            continue;
          }
          if (b === "!") {
            if (p.noextglob !== !0 && j() === "(" && (j(2) !== "?" || !/[!=<:]/.test(j(3)))) {
              ae("negate", b);
              continue;
            }
            if (p.nonegate !== !0 && x.index === 0) {
              le();
              continue;
            }
          }
          if (b === "+") {
            if (p.noextglob !== !0 && j() === "(" && j(2) !== "?") {
              ae("plus", b);
              continue;
            }
            if (_ && _.value === "(" || p.regex === !1) {
              re({ type: "plus", value: b, output: L });
              continue;
            }
            if (_ && (_.type === "bracket" || _.type === "paren" || _.type === "brace") || x.parens > 0) {
              re({ type: "plus", value: b });
              continue;
            }
            re({ type: "plus", value: L });
            continue;
          }
          if (b === "@") {
            if (p.noextglob !== !0 && j() === "(" && j(2) !== "?") {
              re({ type: "at", extglob: !0, value: b, output: "" });
              continue;
            }
            re({ type: "text", value: b });
            continue;
          }
          if (b !== "*") {
            (b === "$" || b === "^") && (b = `\\${b}`);
            const U = d.exec(V());
            U && (b += U[0], x.index += U[0].length), re({ type: "text", value: b });
            continue;
          }
          if (_ && (_.type === "globstar" || _.star === !0)) {
            _.type = "star", _.star = !0, _.value += b, _.output = ie, x.backtrack = !0, x.globstar = !0, de(b);
            continue;
          }
          let z = V();
          if (p.noextglob !== !0 && /^\([^?]/.test(z)) {
            ae("star", b);
            continue;
          }
          if (_.type === "star") {
            if (p.noglobstar === !0) {
              de(b);
              continue;
            }
            const U = _.prev, M = U.prev, te = U.type === "slash" || U.type === "bos", _e = M && (M.type === "star" || M.type === "globstar");
            if (p.bash === !0 && (!te || z[0] && z[0] !== "/")) {
              re({ type: "star", value: b, output: "" });
              continue;
            }
            const pe = x.braces > 0 && (U.type === "comma" || U.type === "brace"), Oe = J.length && (U.type === "pipe" || U.type === "paren");
            if (!te && U.type !== "paren" && !pe && !Oe) {
              re({ type: "star", value: b, output: "" });
              continue;
            }
            for (; z.slice(0, 3) === "/**"; ) {
              const Ot = g[x.index + 4];
              if (Ot && Ot !== "/")
                break;
              z = z.slice(3), de("/**", 3);
            }
            if (U.type === "bos" && $()) {
              _.type = "globstar", _.value += b, _.output = ne(p), x.output = _.output, x.globstar = !0, de(b);
              continue;
            }
            if (U.type === "slash" && U.prev.type !== "bos" && !_e && $()) {
              x.output = x.output.slice(0, -(U.output + _.output).length), U.output = `(?:${U.output}`, _.type = "globstar", _.output = ne(p) + (p.strictSlashes ? ")" : "|$)"), _.value += b, x.globstar = !0, x.output += U.output + _.output, de(b);
              continue;
            }
            if (U.type === "slash" && U.prev.type !== "bos" && z[0] === "/") {
              const Ot = z[1] !== void 0 ? "|$" : "";
              x.output = x.output.slice(0, -(U.output + _.output).length), U.output = `(?:${U.output}`, _.type = "globstar", _.output = `${ne(p)}${q}|${q}${Ot})`, _.value += b, x.output += U.output + _.output, x.globstar = !0, de(b + F()), re({ type: "slash", value: "/", output: "" });
              continue;
            }
            if (U.type === "bos" && z[0] === "/") {
              _.type = "globstar", _.value += b, _.output = `(?:^|${q}|${ne(p)}${q})`, x.output = _.output, x.globstar = !0, de(b + F()), re({ type: "slash", value: "/", output: "" });
              continue;
            }
            x.output = x.output.slice(0, -_.output.length), _.type = "globstar", _.output = ne(p), _.value += b, x.output += _.output, x.globstar = !0, de(b);
            continue;
          }
          const me = { type: "star", value: b, output: ie };
          if (p.bash === !0) {
            me.output = ".*?", (_.type === "bos" || _.type === "slash") && (me.output = Y + me.output), re(me);
            continue;
          }
          if (_ && (_.type === "bracket" || _.type === "paren") && p.regex === !0) {
            me.output = b, re(me);
            continue;
          }
          (x.index === x.start || _.type === "slash" || _.type === "dot") && (_.type === "dot" ? (x.output += K, _.output += K) : p.dot === !0 ? (x.output += N, _.output += N) : (x.output += Y, _.output += Y), j() !== "*" && (x.output += k, _.output += k)), re(me);
        }
        for (; x.brackets > 0; ) {
          if (p.strictBrackets === !0) throw new SyntaxError(f("closing", "]"));
          x.output = c.escapeLast(x.output, "["), ye("brackets");
        }
        for (; x.parens > 0; ) {
          if (p.strictBrackets === !0) throw new SyntaxError(f("closing", ")"));
          x.output = c.escapeLast(x.output, "("), ye("parens");
        }
        for (; x.braces > 0; ) {
          if (p.strictBrackets === !0) throw new SyntaxError(f("closing", "}"));
          x.output = c.escapeLast(x.output, "{"), ye("braces");
        }
        if (p.strictSlashes !== !0 && (_.type === "star" || _.type === "bracket") && re({ type: "maybe_slash", value: "", output: `${q}?` }), x.backtrack === !0) {
          x.output = "";
          for (const z of x.tokens)
            x.output += z.output != null ? z.output : z.value, z.suffix && (x.output += z.suffix);
        }
        return x;
      };
      y.fastpaths = (g, w) => {
        const p = { ...w }, R = typeof p.maxLength == "number" ? Math.min(u, p.maxLength) : u, E = g.length;
        if (E > R)
          throw new SyntaxError(`Input length: ${E}, exceeds maximum allowed length: ${R}`);
        g = h[g] || g;
        const { DOT_LITERAL: A, SLASH_LITERAL: O, ONE_CHAR: P, DOTS_SLASH: I, NO_DOT: C, NO_DOTS: D, NO_DOTS_SLASH: L, STAR: q, START_ANCHOR: k } = s.globChars(p.windows), B = p.dot ? D : C, H = p.dot ? L : C, K = p.capture ? "" : "?:", N = { negated: !1, prefix: "" };
        let X = p.bash === !0 ? ".*?" : q;
        p.capture && (X = `(${X})`);
        const ee = (Y) => Y.noglobstar === !0 ? X : `(${K}(?:(?!${k}${Y.dot ? I : A}).)*?)`, ce = (Y) => {
          switch (Y) {
            case "*":
              return `${B}${P}${X}`;
            case ".*":
              return `${A}${P}${X}`;
            case "*.*":
              return `${B}${X}${A}${P}${X}`;
            case "*/*":
              return `${B}${X}${O}${P}${H}${X}`;
            case "**":
              return B + ee(p);
            case "**/*":
              return `(?:${B}${ee(p)}${O})?${H}${P}${X}`;
            case "**/*.*":
              return `(?:${B}${ee(p)}${O})?${H}${X}${A}${P}${X}`;
            case "**/.*":
              return `(?:${B}${ee(p)}${O})?${A}${P}${X}`;
            default: {
              const fe = /^(.*?)\.(\w+)$/.exec(Y);
              if (!fe) return;
              const ie = ce(fe[1]);
              return ie ? ie + A + fe[2] : void 0;
            }
          }
        }, oe = c.removePrefix(g, N);
        let ne = ce(oe);
        return ne && p.strictSlashes !== !0 && (ne += `${O}?`), ne;
      }, o.exports = y;
    }, 510: (o, i, a) => {
      const s = a(716), c = a(697), u = a(96), l = a(154), d = (h) => h && typeof h == "object" && !Array.isArray(h), m = (h, v, f = !1) => {
        if (Array.isArray(h)) {
          const O = h.map((I) => m(I, v, f));
          return (I) => {
            for (const C of O) {
              const D = C(I);
              if (D) return D;
            }
            return !1;
          };
        }
        const y = d(h) && h.tokens && h.input;
        if (h === "" || typeof h != "string" && !y)
          throw new TypeError("Expected pattern to be a non-empty string");
        const g = v || {}, w = g.windows, p = y ? m.compileRe(h, v) : m.makeRe(h, v, !1, !0), R = p.state;
        delete p.state;
        let E = () => !1;
        if (g.ignore) {
          const O = { ...v, ignore: null, onMatch: null, onResult: null };
          E = m(g.ignore, O, f);
        }
        const A = (O, P = !1) => {
          const { isMatch: I, match: C, output: D } = m.test(O, p, v, { glob: h, posix: w }), L = { glob: h, state: R, regex: p, posix: w, input: O, output: D, match: C, isMatch: I };
          return typeof g.onResult == "function" && g.onResult(L), I === !1 ? (L.isMatch = !1, P ? L : !1) : E(O) ? (typeof g.onIgnore == "function" && g.onIgnore(L), L.isMatch = !1, P ? L : !1) : (typeof g.onMatch == "function" && g.onMatch(L), P ? L : !0);
        };
        return f && (A.state = R), A;
      };
      m.test = (h, v, f, { glob: y, posix: g } = {}) => {
        if (typeof h != "string")
          throw new TypeError("Expected input to be a string");
        if (h === "")
          return { isMatch: !1, output: "" };
        const w = f || {}, p = w.format || (g ? u.toPosixSlashes : null);
        let R = h === y, E = R && p ? p(h) : h;
        return R === !1 && (E = p ? p(h) : h, R = E === y), (R === !1 || w.capture === !0) && (w.matchBase === !0 || w.basename === !0 ? R = m.matchBase(h, v, f, g) : R = v.exec(E)), { isMatch: !!R, match: R, output: E };
      }, m.matchBase = (h, v, f) => (v instanceof RegExp ? v : m.makeRe(v, f)).test(u.basename(h)), m.isMatch = (h, v, f) => m(v, f)(h), m.parse = (h, v) => Array.isArray(h) ? h.map((f) => m.parse(f, v)) : c(h, { ...v, fastpaths: !1 }), m.scan = (h, v) => s(h, v), m.compileRe = (h, v, f = !1, y = !1) => {
        if (f === !0)
          return h.output;
        const g = v || {}, w = g.contains ? "" : "^", p = g.contains ? "" : "$";
        let R = `${w}(?:${h.output})${p}`;
        h && h.negated === !0 && (R = `^(?!${R}).*$`);
        const E = m.toRegex(R, v);
        return y === !0 && (E.state = h), E;
      }, m.makeRe = (h, v = {}, f = !1, y = !1) => {
        if (!h || typeof h != "string")
          throw new TypeError("Expected a non-empty string");
        let g = { negated: !1, fastpaths: !0 };
        return v.fastpaths !== !1 && (h[0] === "." || h[0] === "*") && (g.output = c.fastpaths(h, v)), g.output || (g = c(h, v)), m.compileRe(g, v, f, y);
      }, m.toRegex = (h, v) => {
        try {
          const f = v || {};
          return new RegExp(h, f.flags || (f.nocase ? "i" : ""));
        } catch (f) {
          if (v && v.debug === !0) throw f;
          return /$^/;
        }
      }, m.constants = l, o.exports = m;
    }, 716: (o, i, a) => {
      const s = a(96), { CHAR_ASTERISK: c, CHAR_AT: u, CHAR_BACKWARD_SLASH: l, CHAR_COMMA: d, CHAR_DOT: m, CHAR_EXCLAMATION_MARK: h, CHAR_FORWARD_SLASH: v, CHAR_LEFT_CURLY_BRACE: f, CHAR_LEFT_PARENTHESES: y, CHAR_LEFT_SQUARE_BRACKET: g, CHAR_PLUS: w, CHAR_QUESTION_MARK: p, CHAR_RIGHT_CURLY_BRACE: R, CHAR_RIGHT_PARENTHESES: E, CHAR_RIGHT_SQUARE_BRACKET: A } = a(154), O = (C) => C === v || C === l, P = (C) => {
        C.isPrefix !== !0 && (C.depth = C.isGlobstar ? 1 / 0 : 1);
      }, I = (C, D) => {
        const L = D || {}, q = C.length - 1, k = L.parts === !0 || L.scanToEnd === !0, B = [], H = [], K = [];
        let N = C, X = -1, ee = 0, ce = 0, oe = !1, ne = !1, Y = !1, fe = !1, ie = !1, x = !1, J = !1, W = !1, G = !1, _ = !1, b = 0, $, j, F = { value: "", depth: 0, isGlob: !1 };
        const V = () => X >= q, de = () => N.charCodeAt(X + 1), he = () => ($ = j, N.charCodeAt(++X));
        for (; X < q; ) {
          j = he();
          let ae;
          if (j === l) {
            J = F.backslashes = !0, j = he(), j === f && (x = !0);
            continue;
          }
          if (x === !0 || j === f) {
            for (b++; V() !== !0 && (j = he()); ) {
              if (j === l) {
                J = F.backslashes = !0, he();
                continue;
              }
              if (j === f) {
                b++;
                continue;
              }
              if (x !== !0 && j === m && (j = he()) === m) {
                if (oe = F.isBrace = !0, Y = F.isGlob = !0, _ = !0, k === !0)
                  continue;
                break;
              }
              if (x !== !0 && j === d) {
                if (oe = F.isBrace = !0, Y = F.isGlob = !0, _ = !0, k === !0)
                  continue;
                break;
              }
              if (j === R && (b--, b === 0)) {
                x = !1, oe = F.isBrace = !0, _ = !0;
                break;
              }
            }
            if (k === !0)
              continue;
            break;
          }
          if (j === v) {
            if (B.push(X), H.push(F), F = { value: "", depth: 0, isGlob: !1 }, _ === !0) continue;
            if ($ === m && X === ee + 1) {
              ee += 2;
              continue;
            }
            ce = X + 1;
            continue;
          }
          if (L.noext !== !0 && (j === w || j === u || j === c || j === p || j === h) === !0 && de() === y) {
            if (Y = F.isGlob = !0, fe = F.isExtglob = !0, _ = !0, j === h && X === ee && (G = !0), k === !0) {
              for (; V() !== !0 && (j = he()); ) {
                if (j === l) {
                  J = F.backslashes = !0, j = he();
                  continue;
                }
                if (j === E) {
                  Y = F.isGlob = !0, _ = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (j === c) {
            if ($ === c && (ie = F.isGlobstar = !0), Y = F.isGlob = !0, _ = !0, k === !0)
              continue;
            break;
          }
          if (j === p) {
            if (Y = F.isGlob = !0, _ = !0, k === !0)
              continue;
            break;
          }
          if (j === g) {
            for (; V() !== !0 && (ae = he()); ) {
              if (ae === l) {
                J = F.backslashes = !0, he();
                continue;
              }
              if (ae === A) {
                ne = F.isBracket = !0, Y = F.isGlob = !0, _ = !0;
                break;
              }
            }
            if (k === !0)
              continue;
            break;
          }
          if (L.nonegate !== !0 && j === h && X === ee) {
            W = F.negated = !0, ee++;
            continue;
          }
          if (L.noparen !== !0 && j === y) {
            if (Y = F.isGlob = !0, k === !0) {
              for (; V() !== !0 && (j = he()); ) {
                if (j === y) {
                  J = F.backslashes = !0, j = he();
                  continue;
                }
                if (j === E) {
                  _ = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (Y === !0) {
            if (_ = !0, k === !0)
              continue;
            break;
          }
        }
        L.noext === !0 && (fe = !1, Y = !1);
        let le = N, xe = "", ye = "";
        ee > 0 && (xe = N.slice(0, ee), N = N.slice(ee), ce -= ee), le && Y === !0 && ce > 0 ? (le = N.slice(0, ce), ye = N.slice(ce)) : Y === !0 ? (le = "", ye = N) : le = N, le && le !== "" && le !== "/" && le !== N && O(le.charCodeAt(le.length - 1)) && (le = le.slice(0, -1)), L.unescape === !0 && (ye && (ye = s.removeBackslashes(ye)), le && J === !0 && (le = s.removeBackslashes(le)));
        const re = { prefix: xe, input: C, start: ee, base: le, glob: ye, isBrace: oe, isBracket: ne, isGlob: Y, isExtglob: fe, isGlobstar: ie, negated: W, negatedExtglob: G };
        if (L.tokens === !0 && (re.maxDepth = 0, O(j) || H.push(F), re.tokens = H), L.parts === !0 || L.tokens === !0) {
          let ae;
          for (let ge = 0; ge < B.length; ge++) {
            const z = ae ? ae + 1 : ee, me = B[ge], U = C.slice(z, me);
            L.tokens && (ge === 0 && ee !== 0 ? (H[ge].isPrefix = !0, H[ge].value = xe) : H[ge].value = U, P(H[ge]), re.maxDepth += H[ge].depth), (ge !== 0 || U !== "") && K.push(U), ae = me;
          }
          if (ae && ae + 1 < C.length) {
            const ge = C.slice(ae + 1);
            K.push(ge), L.tokens && (H[H.length - 1].value = ge, P(H[H.length - 1]), re.maxDepth += H[H.length - 1].depth);
          }
          re.slashes = B, re.parts = K;
        }
        return re;
      };
      o.exports = I;
    }, 96: (o, i, a) => {
      const { REGEX_BACKSLASH: s, REGEX_REMOVE_BACKSLASH: c, REGEX_SPECIAL_CHARS: u, REGEX_SPECIAL_CHARS_GLOBAL: l } = a(154);
      i.isObject = (d) => d !== null && typeof d == "object" && !Array.isArray(d), i.hasRegexChars = (d) => u.test(d), i.isRegexChar = (d) => d.length === 1 && i.hasRegexChars(d), i.escapeRegex = (d) => d.replace(l, "\\$1"), i.toPosixSlashes = (d) => d.replace(s, "/"), i.removeBackslashes = (d) => d.replace(c, (m) => m === "\\" ? "" : m), i.escapeLast = (d, m, h) => {
        const v = d.lastIndexOf(m, h);
        return v === -1 ? d : d[v - 1] === "\\" ? i.escapeLast(d, m, v - 1) : `${d.slice(0, v)}\\${d.slice(v)}`;
      }, i.removePrefix = (d, m = {}) => {
        let h = d;
        return h.startsWith("./") && (h = h.slice(2), m.prefix = "./"), h;
      }, i.wrapOutput = (d, m = {}, h = {}) => {
        const v = h.contains ? "" : "^", f = h.contains ? "" : "$";
        let y = `${v}(?:${d})${f}`;
        return m.negated === !0 && (y = `(?:^(?!${y}).*$)`), y;
      }, i.basename = (d, { windows: m } = {}) => {
        const h = d.split(m ? /[\\/]/ : "/"), v = h[h.length - 1];
        return v === "" ? h[h.length - 2] : v;
      };
    } }, t = {};
    function n(o) {
      var i = t[o];
      if (i !== void 0)
        return i.exports;
      var a = t[o] = { exports: {} }, s = !0;
      try {
        e[o](a, a.exports, n), s = !1;
      } finally {
        s && delete t[o];
      }
      return a.exports;
    }
    typeof n < "u" && (n.ab = __dirname + "/");
    var r = n(170);
    hr.exports = r;
  })()), hr.exports;
}
var Yi;
function Gp() {
  return Yi || (Yi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var s in a) Object.defineProperty(i, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    t(e, {
      hasLocalMatch: function() {
        return o;
      },
      matchLocalPattern: function() {
        return r;
      }
    });
    const n = uc();
    function r(i, a) {
      if (i.search !== void 0 && i.search !== a.search)
        return !1;
      var s;
      return !!(0, n.makeRe)((s = i.pathname) != null ? s : "**", {
        dot: !0
      }).test(a.pathname);
    }
    function o(i, a) {
      if (!i)
        return !0;
      const s = new URL(a, "http://n");
      return i.some((c) => r(c, s));
    }
  }(pr)), pr;
}
var mr = {}, Qi;
function Kp() {
  return Qi || (Qi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var s in a) Object.defineProperty(i, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    t(e, {
      hasRemoteMatch: function() {
        return o;
      },
      matchRemotePattern: function() {
        return r;
      }
    });
    const n = uc();
    function r(i, a) {
      if (i.protocol !== void 0 && i.protocol.replace(/:$/, "") !== a.protocol.replace(/:$/, "") || i.port !== void 0 && i.port !== a.port)
        return !1;
      if (i.hostname === void 0)
        throw Object.defineProperty(new Error(`Pattern should define hostname but found
` + JSON.stringify(i)), "__NEXT_ERROR_CODE", {
          value: "E410",
          enumerable: !1,
          configurable: !0
        });
      if (!(0, n.makeRe)(i.hostname).test(a.hostname) || i.search !== void 0 && i.search !== a.search)
        return !1;
      var s;
      return !!(0, n.makeRe)((s = i.pathname) != null ? s : "**", {
        dot: !0
      }).test(a.pathname);
    }
    function o(i, a, s) {
      return i.some((c) => s.hostname === c) || a.some((c) => r(c, s));
    }
  }(mr)), mr;
}
var Zi;
function lc() {
  return Zi || (Zi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = 75;
    function n(o) {
      let { config: i, src: a, width: s, quality: c } = o;
      var u;
      if (process.env.NODE_ENV !== "production") {
        const d = [];
        if (a || d.push("src"), s || d.push("width"), d.length > 0)
          throw Object.defineProperty(new Error("Next Image Optimization requires " + d.join(", ") + " to be provided. Make sure you pass them as props to the `next/image` component. Received: " + JSON.stringify({
            src: a,
            width: s,
            quality: c
          })), "__NEXT_ERROR_CODE", {
            value: "E188",
            enumerable: !1,
            configurable: !0
          });
        if (a.startsWith("//"))
          throw Object.defineProperty(new Error('Failed to parse src "' + a + '" on `next/image`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
            value: "E360",
            enumerable: !1,
            configurable: !0
          });
        if (a.startsWith("/") && i.localPatterns && process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
        process.env.NEXT_RUNTIME !== "edge") {
          const { hasLocalMatch: m } = Gp();
          if (!m(i.localPatterns, a))
            throw Object.defineProperty(new Error("Invalid src prop (" + a + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
              value: "E426",
              enumerable: !1,
              configurable: !0
            });
        }
        if (!a.startsWith("/") && (i.domains || i.remotePatterns)) {
          let m;
          try {
            m = new URL(a);
          } catch (h) {
            throw console.error(h), Object.defineProperty(new Error('Failed to parse src "' + a + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
              value: "E63",
              enumerable: !1,
              configurable: !0
            });
          }
          if (process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
          process.env.NEXT_RUNTIME !== "edge") {
            const { hasRemoteMatch: h } = Kp();
            if (!h(i.domains, i.remotePatterns, m))
              throw Object.defineProperty(new Error("Invalid src prop (" + a + ') on `next/image`, hostname "' + m.hostname + '" is not configured under images in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-host'), "__NEXT_ERROR_CODE", {
                value: "E231",
                enumerable: !1,
                configurable: !0
              });
          }
        }
        if (c && i.qualities && !i.qualities.includes(c))
          throw Object.defineProperty(new Error("Invalid quality prop (" + c + ") on `next/image` does not match `images.qualities` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-qualities"), "__NEXT_ERROR_CODE", {
            value: "E623",
            enumerable: !1,
            configurable: !0
          });
      }
      const l = c || ((u = i.qualities) == null ? void 0 : u.reduce((d, m) => Math.abs(m - t) < Math.abs(d - t) ? m : d)) || t;
      return i.path + "?url=" + encodeURIComponent(a) + "&w=" + s + "&q=" + l + (a.startsWith("/_next/static/media/") && process.env.NEXT_DEPLOYMENT_ID ? "&dpl=" + process.env.NEXT_DEPLOYMENT_ID : "");
    }
    n.__next_img_default = !0;
    const r = n;
  }(dr)), dr;
}
(function(e, t) {
  "use client";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "Image", {
    enumerable: !0,
    get: function() {
      return R;
    }
  });
  const n = Be, r = dt, o = oo, i = /* @__PURE__ */ r._(se), a = /* @__PURE__ */ n._(ba), s = /* @__PURE__ */ n._(Wp()), c = Ro, u = Rn, l = Vp(), d = En, m = za(), h = /* @__PURE__ */ n._(lc()), v = Xa(), f = process.env.__NEXT_IMAGE_OPTS;
  typeof window > "u" && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
  function y(E, A, O, P, I, C, D) {
    const L = E == null ? void 0 : E.src;
    if (!E || E["data-loaded-src"] === L)
      return;
    E["data-loaded-src"] = L, ("decode" in E ? E.decode() : Promise.resolve()).catch(() => {
    }).then(() => {
      if (!(!E.parentElement || !E.isConnected)) {
        if (A !== "empty" && I(!0), O != null && O.current) {
          const k = new Event("load");
          Object.defineProperty(k, "target", {
            writable: !1,
            value: E
          });
          let B = !1, H = !1;
          O.current({
            ...k,
            nativeEvent: k,
            currentTarget: E,
            target: E,
            isDefaultPrevented: () => B,
            isPropagationStopped: () => H,
            persist: () => {
            },
            preventDefault: () => {
              B = !0, k.preventDefault();
            },
            stopPropagation: () => {
              H = !0, k.stopPropagation();
            }
          });
        }
        if (P != null && P.current && P.current(E), process.env.NODE_ENV !== "production") {
          const k = new URL(L, "http://n").searchParams.get("url") || L;
          if (E.getAttribute("data-nimg") === "fill") {
            if (!C && (!D || D === "100vw") && E.getBoundingClientRect().width / window.innerWidth < 0.6 && (D === "100vw" ? (0, d.warnOnce)('Image with src "' + k + '" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes') : (0, d.warnOnce)('Image with src "' + k + '" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes')), E.parentElement) {
              const { position: K } = window.getComputedStyle(E.parentElement), N = [
                "absolute",
                "fixed",
                "relative"
              ];
              N.includes(K) || (0, d.warnOnce)('Image with src "' + k + '" has "fill" and parent element with invalid "position". Provided "' + K + '" should be one of ' + N.map(String).join(",") + ".");
            }
            E.height === 0 && (0, d.warnOnce)('Image with src "' + k + '" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.');
          }
          const B = E.height.toString() !== E.getAttribute("height"), H = E.width.toString() !== E.getAttribute("width");
          (B && !H || !B && H) && (0, d.warnOnce)('Image with src "' + k + `" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
        }
      }
    });
  }
  function g(E) {
    return i.use ? {
      fetchPriority: E
    } : {
      fetchpriority: E
    };
  }
  const w = /* @__PURE__ */ (0, i.forwardRef)((E, A) => {
    let { src: O, srcSet: P, sizes: I, height: C, width: D, decoding: L, className: q, style: k, fetchPriority: B, placeholder: H, loading: K, unoptimized: N, fill: X, onLoadRef: ee, onLoadingCompleteRef: ce, setBlurComplete: oe, setShowAltText: ne, sizesInput: Y, onLoad: fe, onError: ie, ...x } = E;
    const J = (0, i.useCallback)((G) => {
      G && (ie && (G.src = G.src), process.env.NODE_ENV !== "production" && (O || console.error('Image is missing required "src" property:', G), G.getAttribute("alt") === null && console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.')), G.complete && y(G, H, ee, ce, oe, N, Y));
    }, [
      O,
      H,
      ee,
      ce,
      oe,
      ie,
      N,
      Y
    ]), W = (0, v.useMergedRef)(A, J);
    return /* @__PURE__ */ (0, o.jsx)("img", {
      ...x,
      ...g(B),
      // It's intended to keep `loading` before `src` because React updates
      // props in order which causes Safari/Firefox to not lazy load properly.
      // See https://github.com/facebook/react/issues/25883
      loading: K,
      width: D,
      height: C,
      decoding: L,
      "data-nimg": X ? "fill" : "1",
      className: q,
      style: k,
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      sizes: I,
      srcSet: P,
      src: O,
      ref: W,
      onLoad: (G) => {
        const _ = G.currentTarget;
        y(_, H, ee, ce, oe, N, Y);
      },
      onError: (G) => {
        ne(!0), H !== "empty" && oe(!0), ie && ie(G);
      }
    });
  });
  function p(E) {
    let { isAppRouter: A, imgAttributes: O } = E;
    const P = {
      as: "image",
      imageSrcSet: O.srcSet,
      imageSizes: O.sizes,
      crossOrigin: O.crossOrigin,
      referrerPolicy: O.referrerPolicy,
      ...g(O.fetchPriority)
    };
    return A && a.default.preload ? (a.default.preload(
      O.src,
      // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
      P
    ), null) : /* @__PURE__ */ (0, o.jsx)(s.default, {
      children: /* @__PURE__ */ (0, o.jsx)("link", {
        rel: "preload",
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        href: O.srcSet ? void 0 : O.src,
        ...P
      }, "__nimg-" + O.src + O.srcSet + O.sizes)
    });
  }
  const R = /* @__PURE__ */ (0, i.forwardRef)((E, A) => {
    const P = !(0, i.useContext)(m.RouterContext), I = (0, i.useContext)(l.ImageConfigContext), C = (0, i.useMemo)(() => {
      var ce;
      const oe = f || I || u.imageConfigDefault, ne = [
        ...oe.deviceSizes,
        ...oe.imageSizes
      ].sort((ie, x) => ie - x), Y = oe.deviceSizes.sort((ie, x) => ie - x), fe = (ce = oe.qualities) == null ? void 0 : ce.sort((ie, x) => ie - x);
      return {
        ...oe,
        allSizes: ne,
        deviceSizes: Y,
        qualities: fe
      };
    }, [
      I
    ]), { onLoad: D, onLoadingComplete: L } = E, q = (0, i.useRef)(D);
    (0, i.useEffect)(() => {
      q.current = D;
    }, [
      D
    ]);
    const k = (0, i.useRef)(L);
    (0, i.useEffect)(() => {
      k.current = L;
    }, [
      L
    ]);
    const [B, H] = (0, i.useState)(!1), [K, N] = (0, i.useState)(!1), { props: X, meta: ee } = (0, c.getImgProps)(E, {
      defaultLoader: h.default,
      imgConf: C,
      blurComplete: B,
      showAltText: K
    });
    return /* @__PURE__ */ (0, o.jsxs)(o.Fragment, {
      children: [
        /* @__PURE__ */ (0, o.jsx)(w, {
          ...X,
          unoptimized: ee.unoptimized,
          placeholder: ee.placeholder,
          fill: ee.fill,
          onLoadRef: q,
          onLoadingCompleteRef: k,
          setBlurComplete: H,
          setShowAltText: N,
          sizesInput: E.sizes,
          ref: A
        }),
        ee.priority ? /* @__PURE__ */ (0, o.jsx)(p, {
          isAppRouter: P,
          imgAttributes: X
        }) : null
      ]
    });
  });
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Wr, Wr.exports);
var Yp = Wr.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(c, u) {
    for (var l in u) Object.defineProperty(c, l, {
      enumerable: !0,
      get: u[l]
    });
  }
  t(e, {
    default: function() {
      return s;
    },
    getImageProps: function() {
      return a;
    }
  });
  const n = Be, r = Ro, o = Yp, i = /* @__PURE__ */ n._(lc());
  function a(c) {
    const { props: u } = (0, r.getImgProps)(c, {
      defaultLoader: i.default,
      // This is replaced by webpack define plugin
      imgConf: process.env.__NEXT_IMAGE_OPTS
    });
    for (const [l, d] of Object.entries(u))
      d === void 0 && delete u[l];
    return {
      props: u
    };
  }
  const s = o.Image;
})(sc);
var Qp = sc;
const Zp = /* @__PURE__ */ La(Qp), Ah = ({ logo: e = "/images/logo-black.png", width: t = 120, height: n = 37, className: r }) => /* @__PURE__ */ T(Et, { href: "/", "data-testid": "logo", className: "", children: e ? /* @__PURE__ */ T(Zp, { src: e, alt: "Logo", width: t, height: n, className: r }) : /* @__PURE__ */ T("p", { className: "text-xl font-bold", children: "LOGO" }) });
var Vr = { exports: {} }, fc = {};
(function(e) {
  "use client";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(u, l) {
    for (var d in l) Object.defineProperty(u, d, {
      enumerable: !0,
      get: l[d]
    });
  }
  t(e, {
    AppRouterContext: function() {
      return o;
    },
    GlobalLayoutRouterContext: function() {
      return a;
    },
    LayoutRouterContext: function() {
      return i;
    },
    MissingSlotContext: function() {
      return c;
    },
    TemplateContext: function() {
      return s;
    }
  });
  const r = /* @__PURE__ */ Be._(se), o = r.default.createContext(null), i = r.default.createContext(null), a = r.default.createContext(null), s = r.default.createContext(null);
  process.env.NODE_ENV !== "production" && (o.displayName = "AppRouterContext", i.displayName = "LayoutRouterContext", a.displayName = "GlobalLayoutRouterContext", s.displayName = "TemplateContext");
  const c = r.default.createContext(/* @__PURE__ */ new Set());
})(fc);
var dc = {};
(function(e) {
  "use client";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(a, s) {
    for (var c in s) Object.defineProperty(a, c, {
      enumerable: !0,
      get: s[c]
    });
  }
  t(e, {
    PathParamsContext: function() {
      return i;
    },
    PathnameContext: function() {
      return o;
    },
    SearchParamsContext: function() {
      return r;
    }
  });
  const n = se, r = (0, n.createContext)(null), o = (0, n.createContext)(null), i = (0, n.createContext)(null);
  process.env.NODE_ENV !== "production" && (r.displayName = "SearchParamsContext", o.displayName = "PathnameContext", i.displayName = "PathParamsContext");
})(dc);
var Gr = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "getSegmentValue", {
    enumerable: !0,
    get: function() {
      return n;
    }
  });
  function n(r) {
    return Array.isArray(r) ? r[1] : r;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Gr, Gr.exports);
var Jp = Gr.exports, Kr = { exports: {} }, Yr = { exports: {} }, Qr = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "RedirectStatusCode", {
    enumerable: !0,
    get: function() {
      return n;
    }
  });
  var n = /* @__PURE__ */ function(r) {
    return r[r.SeeOther = 303] = "SeeOther", r[r.TemporaryRedirect = 307] = "TemporaryRedirect", r[r.PermanentRedirect = 308] = "PermanentRedirect", r;
  }({});
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Qr, Qr.exports);
var pc = Qr.exports, Zr = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(s, c) {
    for (var u in c) Object.defineProperty(s, u, {
      enumerable: !0,
      get: c[u]
    });
  }
  n(t, {
    REDIRECT_ERROR_CODE: function() {
      return o;
    },
    RedirectType: function() {
      return i;
    },
    isRedirectError: function() {
      return a;
    }
  });
  const r = pc, o = "NEXT_REDIRECT";
  var i = /* @__PURE__ */ function(s) {
    return s.push = "push", s.replace = "replace", s;
  }({});
  function a(s) {
    if (typeof s != "object" || s === null || !("digest" in s) || typeof s.digest != "string")
      return !1;
    const c = s.digest.split(";"), [u, l] = c, d = c.slice(2, -2).join(";"), m = c.at(-2), h = Number(m);
    return u === o && (l === "replace" || l === "push") && typeof d == "string" && !isNaN(h) && h in r.RedirectStatusCode;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Zr, Zr.exports);
var wo = Zr.exports, gr = {}, yr = {}, _r = {}, Ji;
function So() {
  return Ji || (Ji = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var l in u) Object.defineProperty(c, l, {
        enumerable: !0,
        get: u[l]
      });
    }
    t(e, {
      bindSnapshot: function() {
        return a;
      },
      createAsyncLocalStorage: function() {
        return i;
      },
      createSnapshot: function() {
        return s;
      }
    });
    const n = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
      value: "E504",
      enumerable: !1,
      configurable: !0
    });
    class r {
      disable() {
        throw n;
      }
      getStore() {
      }
      run() {
        throw n;
      }
      exit() {
        throw n;
      }
      enterWith() {
        throw n;
      }
      static bind(u) {
        return u;
      }
    }
    const o = typeof globalThis < "u" && globalThis.AsyncLocalStorage;
    function i() {
      return o ? new o() : new r();
    }
    function a(c) {
      return o ? o.bind(c) : r.bind(c);
    }
    function s() {
      return o ? o.snapshot() : function(c, ...u) {
        return c(...u);
      };
    }
  }(_r)), _r;
}
var ea;
function eh() {
  return ea || (ea = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "actionAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, So().createAsyncLocalStorage)();
  }(yr)), yr;
}
var ta;
function th() {
  return ta || (ta = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "actionAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.actionAsyncStorageInstance;
      }
    });
    const t = eh();
  }(gr)), gr;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(m, h) {
    for (var v in h) Object.defineProperty(m, v, {
      enumerable: !0,
      get: h[v]
    });
  }
  n(t, {
    getRedirectError: function() {
      return a;
    },
    getRedirectStatusCodeFromError: function() {
      return d;
    },
    getRedirectTypeFromError: function() {
      return l;
    },
    getURLFromRedirectError: function() {
      return u;
    },
    permanentRedirect: function() {
      return c;
    },
    redirect: function() {
      return s;
    }
  });
  const r = pc, o = wo, i = typeof window > "u" ? th().actionAsyncStorage : void 0;
  function a(m, h, v) {
    v === void 0 && (v = r.RedirectStatusCode.TemporaryRedirect);
    const f = Object.defineProperty(new Error(o.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    return f.digest = o.REDIRECT_ERROR_CODE + ";" + h + ";" + m + ";" + v + ";", f;
  }
  function s(m, h) {
    var v;
    throw h ?? (h = !(i == null || (v = i.getStore()) == null) && v.isAction ? o.RedirectType.push : o.RedirectType.replace), a(m, h, r.RedirectStatusCode.TemporaryRedirect);
  }
  function c(m, h) {
    throw h === void 0 && (h = o.RedirectType.replace), a(m, h, r.RedirectStatusCode.PermanentRedirect);
  }
  function u(m) {
    return (0, o.isRedirectError)(m) ? m.digest.split(";").slice(2, -2).join(";") : null;
  }
  function l(m) {
    if (!(0, o.isRedirectError)(m))
      throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
        value: "E260",
        enumerable: !1,
        configurable: !0
      });
    return m.digest.split(";", 2)[1];
  }
  function d(m) {
    if (!(0, o.isRedirectError)(m))
      throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
        value: "E260",
        enumerable: !1,
        configurable: !0
      });
    return Number(m.digest.split(";").at(-2));
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Yr, Yr.exports);
var nh = Yr.exports, Jr = { exports: {} }, eo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(u, l) {
    for (var d in l) Object.defineProperty(u, d, {
      enumerable: !0,
      get: l[d]
    });
  }
  n(t, {
    HTTPAccessErrorStatus: function() {
      return r;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
      return i;
    },
    getAccessFallbackErrorTypeByStatus: function() {
      return c;
    },
    getAccessFallbackHTTPStatus: function() {
      return s;
    },
    isHTTPAccessFallbackError: function() {
      return a;
    }
  });
  const r = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
  }, o = new Set(Object.values(r)), i = "NEXT_HTTP_ERROR_FALLBACK";
  function a(u) {
    if (typeof u != "object" || u === null || !("digest" in u) || typeof u.digest != "string")
      return !1;
    const [l, d] = u.digest.split(";");
    return l === i && o.has(Number(d));
  }
  function s(u) {
    const l = u.digest.split(";")[1];
    return Number(l);
  }
  function c(u) {
    switch (u) {
      case 401:
        return "unauthorized";
      case 403:
        return "forbidden";
      case 404:
        return "not-found";
      default:
        return;
    }
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(eo, eo.exports);
var wn = eo.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "notFound", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + wn.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
  function o() {
    const i = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw i.digest = r, i;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Jr, Jr.exports);
var rh = Jr.exports, to = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "forbidden", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + wn.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
  function o() {
    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS)
      throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
        value: "E488",
        enumerable: !1,
        configurable: !0
      });
    const i = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw i.digest = r, i;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(to, to.exports);
var oh = to.exports, no = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "unauthorized", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + wn.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
  function o() {
    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS)
      throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
        value: "E411",
        enumerable: !1,
        configurable: !0
      });
    const i = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw i.digest = r, i;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(no, no.exports);
var ih = no.exports, ro = { exports: {} }, Wt = { exports: {} }, br = {}, na;
function hc() {
  return na || (na = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, u) {
      for (var l in u) Object.defineProperty(c, l, {
        enumerable: !0,
        get: u[l]
      });
    }
    t(e, {
      isHangingPromiseRejectionError: function() {
        return n;
      },
      makeHangingPromise: function() {
        return a;
      }
    });
    function n(c) {
      return typeof c != "object" || c === null || !("digest" in c) ? !1 : c.digest === r;
    }
    const r = "HANGING_PROMISE_REJECTION";
    class o extends Error {
      constructor(u) {
        super(`During prerendering, ${u} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${u} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`), this.expression = u, this.digest = r;
      }
    }
    const i = /* @__PURE__ */ new WeakMap();
    function a(c, u) {
      if (c.aborted)
        return Promise.reject(new o(u));
      {
        const l = new Promise((d, m) => {
          const h = m.bind(null, new o(u));
          let v = i.get(c);
          if (v)
            v.push(h);
          else {
            const f = [
              h
            ];
            i.set(c, f), c.addEventListener("abort", () => {
              for (let y = 0; y < f.length; y++)
                f[y]();
            }, {
              once: !0
            });
          }
        });
        return l.catch(s), l;
      }
    }
    function s() {
    }
  }(br)), br;
}
var vr = {}, ra;
function ah() {
  return ra || (ra = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isPostpone", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = Symbol.for("react.postpone");
    function n(r) {
      return typeof r == "object" && r !== null && r.$$typeof === t;
    }
  }(vr)), vr;
}
var Er = {}, oa;
function xo() {
  return oa || (oa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var s in a) Object.defineProperty(i, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    t(e, {
      BailoutToCSRError: function() {
        return r;
      },
      isBailoutToCSRError: function() {
        return o;
      }
    });
    const n = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
    class r extends Error {
      constructor(a) {
        super("Bail out to client-side rendering: " + a), this.reason = a, this.digest = n;
      }
    }
    function o(i) {
      return typeof i != "object" || i === null || !("digest" in i) ? !1 : i.digest === n;
    }
  }(Er)), Er;
}
var Vt = { exports: {} }, ia;
function mc() {
  return ia || (ia = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "isNextRouterError", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = wn, r = wo;
    function o(i) {
      return (0, r.isRedirectError)(i) || (0, n.isHTTPAccessFallbackError)(i);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Vt, Vt.exports)), Vt.exports;
}
var Rr = {}, Gt = { exports: {} }, aa;
function gc() {
  return aa || (aa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(a, s) {
      for (var c in s) Object.defineProperty(a, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    n(t, {
      DynamicServerError: function() {
        return o;
      },
      isDynamicServerError: function() {
        return i;
      }
    });
    const r = "DYNAMIC_SERVER_USAGE";
    class o extends Error {
      constructor(s) {
        super("Dynamic server usage: " + s), this.description = s, this.digest = r;
      }
    }
    function i(a) {
      return typeof a != "object" || a === null || !("digest" in a) || typeof a.digest != "string" ? !1 : a.digest === r;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Gt, Gt.exports)), Gt.exports;
}
var Kt = { exports: {} }, sa;
function sh() {
  return sa || (sa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(a, s) {
      for (var c in s) Object.defineProperty(a, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    n(t, {
      StaticGenBailoutError: function() {
        return o;
      },
      isStaticGenBailoutError: function() {
        return i;
      }
    });
    const r = "NEXT_STATIC_GEN_BAILOUT";
    class o extends Error {
      constructor(...s) {
        super(...s), this.code = r;
      }
    }
    function i(a) {
      return typeof a != "object" || a === null || !("code" in a) ? !1 : a.code === r;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Kt, Kt.exports)), Kt.exports;
}
var wr = {}, Sr = {}, ca;
function ch() {
  return ca || (ca = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workUnitAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, So().createAsyncLocalStorage)();
  }(Sr)), Sr;
}
var Yt = { exports: {} }, ua;
function uh() {
  return ua || (ua = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(p, R) {
      for (var E in R) Object.defineProperty(p, E, {
        enumerable: !0,
        get: R[E]
      });
    }
    n(t, {
      ACTION_HEADER: function() {
        return o;
      },
      FLIGHT_HEADERS: function() {
        return m;
      },
      NEXT_DID_POSTPONE_HEADER: function() {
        return f;
      },
      NEXT_HMR_REFRESH_HASH_COOKIE: function() {
        return u;
      },
      NEXT_HMR_REFRESH_HEADER: function() {
        return c;
      },
      NEXT_IS_PRERENDER_HEADER: function() {
        return w;
      },
      NEXT_REWRITTEN_PATH_HEADER: function() {
        return y;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function() {
        return g;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function() {
        return a;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return s;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return v;
      },
      NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return i;
      },
      NEXT_RSC_UNION_QUERY: function() {
        return h;
      },
      NEXT_URL: function() {
        return l;
      },
      RSC_CONTENT_TYPE_HEADER: function() {
        return d;
      },
      RSC_HEADER: function() {
        return r;
      }
    });
    const r = "RSC", o = "Next-Action", i = "Next-Router-State-Tree", a = "Next-Router-Prefetch", s = "Next-Router-Segment-Prefetch", c = "Next-HMR-Refresh", u = "__next_hmr_refresh_hash__", l = "Next-Url", d = "text/x-component", m = [
      r,
      i,
      a,
      c,
      s
    ], h = "_rsc", v = "x-nextjs-stale-time", f = "x-nextjs-postponed", y = "x-nextjs-rewritten-path", g = "x-nextjs-rewritten-query", w = "x-nextjs-prerender";
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Yt, Yt.exports)), Yt.exports;
}
var la;
function lh() {
  return la || (la = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(l, d) {
      for (var m in d) Object.defineProperty(l, m, {
        enumerable: !0,
        get: d[m]
      });
    }
    t(e, {
      getDraftModeProviderForCacheScope: function() {
        return u;
      },
      getExpectedRequestStore: function() {
        return o;
      },
      getHmrRefreshHash: function() {
        return c;
      },
      getPrerenderResumeDataCache: function() {
        return a;
      },
      getRenderResumeDataCache: function() {
        return s;
      },
      throwForMissingRequestStore: function() {
        return i;
      },
      workUnitAsyncStorage: function() {
        return n.workUnitAsyncStorageInstance;
      }
    });
    const n = ch(), r = uh();
    function o(l) {
      const d = n.workUnitAsyncStorageInstance.getStore();
      switch (d || i(l), d.type) {
        case "request":
          return d;
        case "prerender":
        case "prerender-ppr":
        case "prerender-legacy":
          throw Object.defineProperty(new Error(`\`${l}\` cannot be called inside a prerender. This is a bug in Next.js.`), "__NEXT_ERROR_CODE", {
            value: "E401",
            enumerable: !1,
            configurable: !0
          });
        case "cache":
          throw Object.defineProperty(new Error(`\`${l}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`), "__NEXT_ERROR_CODE", {
            value: "E37",
            enumerable: !1,
            configurable: !0
          });
        case "unstable-cache":
          throw Object.defineProperty(new Error(`\`${l}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`), "__NEXT_ERROR_CODE", {
            value: "E69",
            enumerable: !1,
            configurable: !0
          });
        default:
          return d;
      }
    }
    function i(l) {
      throw Object.defineProperty(new Error(`\`${l}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: !1,
        configurable: !0
      });
    }
    function a(l) {
      return l.type === "prerender" || l.type === "prerender-ppr" ? l.prerenderResumeDataCache : null;
    }
    function s(l) {
      return l.type !== "prerender-legacy" && l.type !== "cache" && l.type !== "unstable-cache" ? l.type === "request" ? l.renderResumeDataCache : l.prerenderResumeDataCache : null;
    }
    function c(l, d) {
      var m;
      if (l.dev)
        return d.type === "cache" || d.type === "prerender" ? d.hmrRefreshHash : d.type === "request" ? (m = d.cookies.get(r.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : m.value : void 0;
    }
    function u(l, d) {
      if (l.isDraftMode)
        switch (d.type) {
          case "cache":
          case "unstable-cache":
          case "request":
            return d.draftMode;
          default:
            return;
        }
    }
  }(wr)), wr;
}
var xr = {}, Or = {}, fa;
function fh() {
  return fa || (fa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, So().createAsyncLocalStorage)();
  }(Or)), Or;
}
var da;
function yc() {
  return da || (da = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.workAsyncStorageInstance;
      }
    });
    const t = fh();
  }(xr)), xr;
}
var Pr = {}, pa;
function dh() {
  return pa || (pa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, a) {
      for (var s in a) Object.defineProperty(i, s, {
        enumerable: !0,
        get: a[s]
      });
    }
    t(e, {
      METADATA_BOUNDARY_NAME: function() {
        return n;
      },
      OUTLET_BOUNDARY_NAME: function() {
        return o;
      },
      VIEWPORT_BOUNDARY_NAME: function() {
        return r;
      }
    });
    const n = "__next_metadata_boundary__", r = "__next_viewport_boundary__", o = "__next_outlet_boundary__";
  }(Pr)), Pr;
}
var Ar = {}, ha;
function ph() {
  return ha || (ha = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, s) {
      for (var c in s) Object.defineProperty(a, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      atLeastOneTask: function() {
        return o;
      },
      scheduleImmediate: function() {
        return r;
      },
      scheduleOnNextTick: function() {
        return n;
      },
      waitAtLeastOneReactRenderTask: function() {
        return i;
      }
    });
    const n = (a) => {
      Promise.resolve().then(() => {
        process.env.NEXT_RUNTIME === "edge" ? setTimeout(a, 0) : process.nextTick(a);
      });
    }, r = (a) => {
      process.env.NEXT_RUNTIME === "edge" ? setTimeout(a, 0) : setImmediate(a);
    };
    function o() {
      return new Promise((a) => r(a));
    }
    function i() {
      return process.env.NEXT_RUNTIME === "edge" ? new Promise((a) => setTimeout(a, 0)) : new Promise((a) => setImmediate(a));
    }
  }(Ar)), Ar;
}
var ma;
function _c() {
  return ma || (ma = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(_, b) {
      for (var $ in b) Object.defineProperty(_, $, {
        enumerable: !0,
        get: b[$]
      });
    }
    t(e, {
      Postpone: function() {
        return P;
      },
      abortAndThrowOnSynchronousRequestDataAccess: function() {
        return A;
      },
      abortOnSynchronousPlatformIOAccess: function() {
        return R;
      },
      accessedDynamicData: function() {
        return H;
      },
      annotateDynamicAccess: function() {
        return oe;
      },
      consumeDynamicAccess: function() {
        return K;
      },
      createDynamicTrackingState: function() {
        return m;
      },
      createDynamicValidationState: function() {
        return h;
      },
      createHangingInputAbortSignal: function() {
        return ce;
      },
      createPostponedAbortSignal: function() {
        return ee;
      },
      formatDynamicAPIAccesses: function() {
        return N;
      },
      getFirstDynamicReason: function() {
        return v;
      },
      isDynamicPostpone: function() {
        return D;
      },
      isPrerenderInterruptedError: function() {
        return B;
      },
      markCurrentScopeAsDynamic: function() {
        return f;
      },
      postponeWithTracking: function() {
        return I;
      },
      throwIfDisallowedDynamic: function() {
        return G;
      },
      throwToInterruptStaticGeneration: function() {
        return g;
      },
      trackAllowedDynamicAccess: function() {
        return J;
      },
      trackDynamicDataInDynamicRender: function() {
        return w;
      },
      trackFallbackParamAccessed: function() {
        return y;
      },
      trackSynchronousPlatformIOAccessInDev: function() {
        return E;
      },
      trackSynchronousRequestDataAccessInDev: function() {
        return O;
      },
      useDynamicRouteParams: function() {
        return ne;
      }
    });
    const n = /* @__PURE__ */ l(se), r = gc(), o = sh(), i = lh(), a = yc(), s = hc(), c = dh(), u = ph();
    function l(_) {
      return _ && _.__esModule ? _ : {
        default: _
      };
    }
    const d = typeof n.default.unstable_postpone == "function";
    function m(_) {
      return {
        isDebugDynamicAccesses: _,
        dynamicAccesses: [],
        syncDynamicExpression: void 0,
        syncDynamicErrorWithStack: null
      };
    }
    function h() {
      return {
        hasSuspendedDynamic: !1,
        hasDynamicMetadata: !1,
        hasDynamicViewport: !1,
        hasSyncDynamicErrors: !1,
        dynamicErrors: []
      };
    }
    function v(_) {
      var b;
      return (b = _.dynamicAccesses[0]) == null ? void 0 : b.expression;
    }
    function f(_, b, $) {
      if (!(b && (b.type === "cache" || b.type === "unstable-cache")) && !(_.forceDynamic || _.forceStatic)) {
        if (_.dynamicShouldError)
          throw Object.defineProperty(new o.StaticGenBailoutError(`Route ${_.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${$}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (b)
          if (b.type === "prerender-ppr")
            I(_.route, $, b.dynamicTracking);
          else if (b.type === "prerender-legacy") {
            b.revalidate = 0;
            const j = Object.defineProperty(new r.DynamicServerError(`Route ${_.route} couldn't be rendered statically because it used ${$}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E550",
              enumerable: !1,
              configurable: !0
            });
            throw _.dynamicUsageDescription = $, _.dynamicUsageStack = j.stack, j;
          } else process.env.NODE_ENV === "development" && b && b.type === "request" && (b.usedDynamic = !0);
      }
    }
    function y(_, b) {
      const $ = i.workUnitAsyncStorage.getStore();
      !$ || $.type !== "prerender-ppr" || I(_.route, b, $.dynamicTracking);
    }
    function g(_, b, $) {
      const j = Object.defineProperty(new r.DynamicServerError(`Route ${b.route} couldn't be rendered statically because it used \`${_}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: !1,
        configurable: !0
      });
      throw $.revalidate = 0, b.dynamicUsageDescription = _, b.dynamicUsageStack = j.stack, j;
    }
    function w(_, b) {
      if (b) {
        if (b.type === "cache" || b.type === "unstable-cache")
          return;
        (b.type === "prerender" || b.type === "prerender-legacy") && (b.revalidate = 0), process.env.NODE_ENV === "development" && b.type === "request" && (b.usedDynamic = !0);
      }
    }
    function p(_, b, $) {
      const j = `Route ${_} needs to bail out of prerendering at this point because it used ${b}.`, F = k(j);
      $.controller.abort(F);
      const V = $.dynamicTracking;
      V && V.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: V.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: b
      });
    }
    function R(_, b, $, j) {
      const F = j.dynamicTracking;
      F && F.syncDynamicErrorWithStack === null && (F.syncDynamicExpression = b, F.syncDynamicErrorWithStack = $), p(_, b, j);
    }
    function E(_) {
      _.prerenderPhase = !1;
    }
    function A(_, b, $, j) {
      if (j.controller.signal.aborted === !1) {
        const V = j.dynamicTracking;
        V && V.syncDynamicErrorWithStack === null && (V.syncDynamicExpression = b, V.syncDynamicErrorWithStack = $, j.validating === !0 && (V.syncDynamicLogged = !0)), p(_, b, j);
      }
      throw k(`Route ${_} needs to bail out of prerendering at this point because it used ${b}.`);
    }
    const O = E;
    function P({ reason: _, route: b }) {
      const $ = i.workUnitAsyncStorage.getStore(), j = $ && $.type === "prerender-ppr" ? $.dynamicTracking : null;
      I(b, _, j);
    }
    function I(_, b, $) {
      X(), $ && $.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: $.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: b
      }), n.default.unstable_postpone(C(_, b));
    }
    function C(_, b) {
      return `Route ${_} needs to bail out of prerendering at this point because it used ${b}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function D(_) {
      return typeof _ == "object" && _ !== null && typeof _.message == "string" ? L(_.message) : !1;
    }
    function L(_) {
      return _.includes("needs to bail out of prerendering at this point because it used") && _.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
    }
    if (L(C("%%%", "^^^")) === !1)
      throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: !1,
        configurable: !0
      });
    const q = "NEXT_PRERENDER_INTERRUPTED";
    function k(_) {
      const b = Object.defineProperty(new Error(_), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return b.digest = q, b;
    }
    function B(_) {
      return typeof _ == "object" && _ !== null && _.digest === q && "name" in _ && "message" in _ && _ instanceof Error;
    }
    function H(_) {
      return _.length > 0;
    }
    function K(_, b) {
      return _.dynamicAccesses.push(...b.dynamicAccesses), _.dynamicAccesses;
    }
    function N(_) {
      return _.filter((b) => typeof b.stack == "string" && b.stack.length > 0).map(({ expression: b, stack: $ }) => ($ = $.split(`
`).slice(4).filter((j) => !(j.includes("node_modules/next/") || j.includes(" (<anonymous>)") || j.includes(" (node:"))).join(`
`), `Dynamic API Usage Debug - ${b}:
${$}`));
    }
    function X() {
      if (!d)
        throw Object.defineProperty(new Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E224",
          enumerable: !1,
          configurable: !0
        });
    }
    function ee(_) {
      X();
      const b = new AbortController();
      try {
        n.default.unstable_postpone(_);
      } catch ($) {
        b.abort($);
      }
      return b.signal;
    }
    function ce(_) {
      const b = new AbortController();
      return _.cacheSignal ? _.cacheSignal.inputReady().then(() => {
        b.abort();
      }) : (0, u.scheduleOnNextTick)(() => b.abort()), b.signal;
    }
    function oe(_, b) {
      const $ = b.dynamicTracking;
      $ && $.dynamicAccesses.push({
        stack: $.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: _
      });
    }
    function ne(_) {
      const b = a.workAsyncStorage.getStore();
      if (b && b.isStaticGeneration && b.fallbackRouteParams && b.fallbackRouteParams.size > 0) {
        const $ = i.workUnitAsyncStorage.getStore();
        $ && ($.type === "prerender" ? n.default.use((0, s.makeHangingPromise)($.renderSignal, _)) : $.type === "prerender-ppr" ? I(b.route, _, $.dynamicTracking) : $.type === "prerender-legacy" && g(_, b, $));
      }
    }
    const Y = /\n\s+at Suspense \(<anonymous>\)/, fe = new RegExp(`\\n\\s+at ${c.METADATA_BOUNDARY_NAME}[\\n\\s]`), ie = new RegExp(`\\n\\s+at ${c.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), x = new RegExp(`\\n\\s+at ${c.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    function J(_, b, $, j, F) {
      if (!x.test(b))
        if (fe.test(b)) {
          $.hasDynamicMetadata = !0;
          return;
        } else if (ie.test(b)) {
          $.hasDynamicViewport = !0;
          return;
        } else if (Y.test(b)) {
          $.hasSuspendedDynamic = !0;
          return;
        } else if (j.syncDynamicErrorWithStack || F.syncDynamicErrorWithStack) {
          $.hasSyncDynamicErrors = !0;
          return;
        } else {
          const V = `Route "${_}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`, de = W(V, b);
          $.dynamicErrors.push(de);
          return;
        }
    }
    function W(_, b) {
      const $ = Object.defineProperty(new Error(_), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return $.stack = "Error: " + _ + b, $;
    }
    function G(_, b, $, j) {
      let F, V, de;
      if ($.syncDynamicErrorWithStack ? (F = $.syncDynamicErrorWithStack, V = $.syncDynamicExpression, de = $.syncDynamicLogged === !0) : j.syncDynamicErrorWithStack ? (F = j.syncDynamicErrorWithStack, V = j.syncDynamicExpression, de = j.syncDynamicLogged === !0) : (F = null, V = void 0, de = !1), b.hasSyncDynamicErrors && F)
        throw de || console.error(F), new o.StaticGenBailoutError();
      const he = b.dynamicErrors;
      if (he.length) {
        for (let le = 0; le < he.length; le++)
          console.error(he[le]);
        throw new o.StaticGenBailoutError();
      }
      if (!b.hasSuspendedDynamic) {
        if (b.hasDynamicMetadata)
          throw F ? (console.error(F), Object.defineProperty(new o.StaticGenBailoutError(`Route "${_}" has a \`generateMetadata\` that could not finish rendering before ${V} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E608",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new o.StaticGenBailoutError(`Route "${_}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E534",
            enumerable: !1,
            configurable: !0
          });
        if (b.hasDynamicViewport)
          throw F ? (console.error(F), Object.defineProperty(new o.StaticGenBailoutError(`Route "${_}" has a \`generateViewport\` that could not finish rendering before ${V} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E573",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new o.StaticGenBailoutError(`Route "${_}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E590",
            enumerable: !1,
            configurable: !0
          });
      }
    }
  }(Rr)), Rr;
}
var ga;
function hh() {
  return ga || (ga = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const n = hc(), r = ah(), o = xo(), i = mc(), a = _c(), s = gc();
    function c(u) {
      if ((0, i.isNextRouterError)(u) || (0, o.isBailoutToCSRError)(u) || (0, s.isDynamicServerError)(u) || (0, a.isDynamicPostpone)(u) || (0, r.isPostpone)(u) || (0, n.isHangingPromiseRejectionError)(u))
        throw u;
      u instanceof Error && "cause" in u && c(u.cause);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Wt, Wt.exports)), Wt.exports;
}
var Qt = { exports: {} }, ya;
function mh() {
  return ya || (ya = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = xo(), r = mc();
    function o(i) {
      if ((0, r.isNextRouterError)(i) || (0, n.isBailoutToCSRError)(i))
        throw i;
      i instanceof Error && "cause" in i && o(i.cause);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Qt, Qt.exports)), Qt.exports;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "unstable_rethrow", {
    enumerable: !0,
    get: function() {
      return n;
    }
  });
  const n = typeof window > "u" ? hh().unstable_rethrow : mh().unstable_rethrow;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(ro, ro.exports);
var gh = ro.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(d, m) {
    for (var h in m) Object.defineProperty(d, h, {
      enumerable: !0,
      get: m[h]
    });
  }
  n(t, {
    ReadonlyURLSearchParams: function() {
      return l;
    },
    RedirectType: function() {
      return o.RedirectType;
    },
    forbidden: function() {
      return a.forbidden;
    },
    notFound: function() {
      return i.notFound;
    },
    permanentRedirect: function() {
      return r.permanentRedirect;
    },
    redirect: function() {
      return r.redirect;
    },
    unauthorized: function() {
      return s.unauthorized;
    },
    unstable_rethrow: function() {
      return c.unstable_rethrow;
    }
  });
  const r = nh, o = wo, i = rh, a = oh, s = ih, c = gh;
  class u extends Error {
    constructor() {
      super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
    }
  }
  class l extends URLSearchParams {
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
    append() {
      throw new u();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
    delete() {
      throw new u();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
    set() {
      throw new u();
    }
    /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
    sort() {
      throw new u();
    }
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Kr, Kr.exports);
var yh = Kr.exports, bc = {};
(function(e) {
  "use client";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(a, s) {
    for (var c in s) Object.defineProperty(a, c, {
      enumerable: !0,
      get: s[c]
    });
  }
  t(e, {
    ServerInsertedHTMLContext: function() {
      return o;
    },
    useServerInsertedHTML: function() {
      return i;
    }
  });
  const r = /* @__PURE__ */ dt._(se), o = /* @__PURE__ */ r.default.createContext(null);
  function i(a) {
    const s = (0, r.useContext)(o);
    s && s(a);
  }
})(bc);
var Zt = { exports: {} }, _a;
function _h() {
  return _a || (_a = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "bailoutToClientRendering", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = xo(), r = yc();
    function o(i) {
      const a = r.workAsyncStorage.getStore();
      if (!(a != null && a.forceStatic) && a != null && a.isStaticGeneration)
        throw Object.defineProperty(new n.BailoutToCSRError(i), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0
        });
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Zt, Zt.exports)), Zt.exports;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(w, p) {
    for (var R in p) Object.defineProperty(w, R, {
      enumerable: !0,
      get: p[R]
    });
  }
  n(t, {
    ReadonlyURLSearchParams: function() {
      return c.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
      return c.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
      return u.ServerInsertedHTMLContext;
    },
    forbidden: function() {
      return c.forbidden;
    },
    notFound: function() {
      return c.notFound;
    },
    permanentRedirect: function() {
      return c.permanentRedirect;
    },
    redirect: function() {
      return c.redirect;
    },
    unauthorized: function() {
      return c.unauthorized;
    },
    unstable_rethrow: function() {
      return c.unstable_rethrow;
    },
    useParams: function() {
      return v;
    },
    usePathname: function() {
      return m;
    },
    useRouter: function() {
      return h;
    },
    useSearchParams: function() {
      return d;
    },
    useSelectedLayoutSegment: function() {
      return g;
    },
    useSelectedLayoutSegments: function() {
      return y;
    },
    useServerInsertedHTML: function() {
      return u.useServerInsertedHTML;
    }
  });
  const r = se, o = fc, i = dc, a = Jp, s = so, c = yh, u = bc, l = typeof window > "u" ? _c().useDynamicRouteParams : void 0;
  function d() {
    const w = (0, r.useContext)(i.SearchParamsContext), p = (0, r.useMemo)(() => w ? new c.ReadonlyURLSearchParams(w) : null, [
      w
    ]);
    if (typeof window > "u") {
      const { bailoutToClientRendering: R } = _h();
      R("useSearchParams()");
    }
    return p;
  }
  function m() {
    return l == null || l("usePathname()"), (0, r.useContext)(i.PathnameContext);
  }
  function h() {
    const w = (0, r.useContext)(o.AppRouterContext);
    if (w === null)
      throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
        value: "E238",
        enumerable: !1,
        configurable: !0
      });
    return w;
  }
  function v() {
    return l == null || l("useParams()"), (0, r.useContext)(i.PathParamsContext);
  }
  function f(w, p, R, E) {
    R === void 0 && (R = !0), E === void 0 && (E = []);
    let A;
    if (R)
      A = w[1][p];
    else {
      const C = w[1];
      var O;
      A = (O = C.children) != null ? O : Object.values(C)[0];
    }
    if (!A) return E;
    const P = A[0];
    let I = (0, a.getSegmentValue)(P);
    return !I || I.startsWith(s.PAGE_SEGMENT_KEY) ? E : (E.push(I), f(A, p, !1, E));
  }
  function y(w) {
    w === void 0 && (w = "children"), l == null || l("useSelectedLayoutSegments()");
    const p = (0, r.useContext)(o.LayoutRouterContext);
    return p ? f(p.parentTree, w) : null;
  }
  function g(w) {
    w === void 0 && (w = "children"), l == null || l("useSelectedLayoutSegment()");
    const p = y(w);
    if (!p || p.length === 0)
      return null;
    const R = w === "children" ? p[0] : p[p.length - 1];
    return R === s.DEFAULT_SEGMENT_KEY ? null : R;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Vr, Vr.exports);
var bh = Vr.exports, vh = bh;
const Ch = ({
  logo: e,
  links: t = [],
  cta: n,
  user: r,
  className: o,
  mobileBreakpoint: i = "lg",
  theme: a = "light",
  sticky: s = !0
}) => {
  const c = vh.usePathname(), [u, l] = bt(!1), [d, m] = bt(!1);
  Tr(() => {
    if (s) {
      const f = () => {
        m(window.scrollY > 10);
      };
      return window.addEventListener("scroll", f), () => window.removeEventListener("scroll", f);
    }
  }, [s]), Tr(() => {
    l(!1);
  }, [c]);
  const h = (f) => c === f || f !== "/" && (c == null ? void 0 : c.startsWith(f));
  return /* @__PURE__ */ be(
    "nav",
    {
      className: we(
        "w-full transition-all duration-300",
        {
          light: "bg-white text-gray-900",
          dark: "bg-gray-900 text-white",
          custom: ""
        }[a],
        s && "sticky top-0 z-50",
        d && "shadow-sm",
        o
      ),
      children: [
        /* @__PURE__ */ T("div", { className: "mx-auto px-4", children: /* @__PURE__ */ be("div", { className: "flex h-16 items-center justify-between md:h-20", children: [
          /* @__PURE__ */ T("div", { className: "flex-shrink-0", children: e }),
          /* @__PURE__ */ T("div", { className: "hidden items-center space-x-4 lg:flex", children: t == null ? void 0 : t.map((f) => /* @__PURE__ */ T(Eh, { link: f, isActive: h(f == null ? void 0 : f.path) }, f.path)) }),
          /* @__PURE__ */ be("div", { className: "flex items-center space-x-4", children: [
            r ?? n ?? /* @__PURE__ */ be("div", { className: "hidden space-x-4 lg:flex", children: [
              /* @__PURE__ */ T(Xe, { href: "/login", children: "Sign in" }),
              /* @__PURE__ */ T(Xe, { variant: "primary", href: "/register", children: "Sign up" })
            ] }),
            /* @__PURE__ */ T(
              Xe,
              {
                variant: "primary",
                size: "icon",
                isIconOnly: !0,
                className: we("lg:hidden"),
                icon: u ? /* @__PURE__ */ T(Nu, {}) : /* @__PURE__ */ T(Pu, {}),
                onClick: () => l(!u),
                "aria-label": "Toggle menu"
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ T(
          "div",
          {
            className: we(
              `${i}:hidden fixed inset-x-0 z-40 w-full origin-top transform overflow-hidden bg-white shadow-md transition-all duration-300`,
              u ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
            ),
            style: { top: s ? "5rem" : "4rem" },
            children: /* @__PURE__ */ be("div", { className: "space-y-1 px-2 pt-2 pb-3", children: [
              t == null ? void 0 : t.map((f) => /* @__PURE__ */ T(Rh, { link: f, isActive: h(f == null ? void 0 : f.path) }, f == null ? void 0 : f.path)),
              !r && /* @__PURE__ */ be(St, { children: [
                /* @__PURE__ */ T(Xe, { href: "/login", children: "Sign in" }),
                /* @__PURE__ */ T(Xe, { variant: "primary", href: "/register", children: "Sign up" })
              ] })
            ] })
          }
        )
      ]
    }
  );
}, Eh = ({ link: e, isActive: t }) => e.type === "dropdown" && e.subLinks ? /* @__PURE__ */ be("div", { className: "group relative", children: [
  /* @__PURE__ */ be(Xe, { variant: "link", children: [
    /* @__PURE__ */ T("span", { children: e.name }),
    /* @__PURE__ */ T("svg", { className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ T("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
  ] }),
  /* @__PURE__ */ T("div", { className: "ring-opacity-5 invisible absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black transition-all duration-200 group-hover:visible group-hover:opacity-100", children: /* @__PURE__ */ T("div", { className: "py-1", children: e.subLinks.map((n) => /* @__PURE__ */ T(
    Et,
    {
      href: n.path,
      className: "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100",
      children: n.name
    },
    n.path
  )) }) })
] }) : /* @__PURE__ */ T(Xe, { variant: "link", href: e.path, className: we(t && "bg-gray-200 font-semibold"), children: e.name }), Rh = ({ link: e, isActive: t }) => {
  const [n, r] = bt(!1);
  return e.type === "dropdown" && e.subLinks ? /* @__PURE__ */ be("div", { className: "space-y-1", children: [
    /* @__PURE__ */ be(
      "button",
      {
        onClick: () => r(!n),
        className: "flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100",
        children: [
          /* @__PURE__ */ T("span", { children: e.name }),
          /* @__PURE__ */ T(
            "svg",
            {
              className: `h-5 w-5 transform transition-transform ${n ? "rotate-180" : ""}`,
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ T("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    n && /* @__PURE__ */ T("div", { className: "ml-4 space-y-1", children: e.subLinks.map((o) => /* @__PURE__ */ T(
      Et,
      {
        href: o.path,
        className: "block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100",
        children: o.name
      },
      o.path
    )) })
  ] }) : /* @__PURE__ */ T(
    Et,
    {
      href: e.path,
      className: we(
        "block rounded-md px-3 py-2 text-base font-medium hover:bg-gray-100",
        t && "bg-gray-200 font-semibold"
      ),
      children: e.name
    }
  );
};
export {
  Xe as CustomButton,
  Ph as InputField,
  Ah as Logo,
  Ch as Navbar
};
