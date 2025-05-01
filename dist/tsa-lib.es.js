import Rr, { jsx as I, jsxs as Ce, Fragment as Qt } from "react/jsx-runtime";
import * as w from "react";
import ce, { forwardRef as Zt, createElement as sr, cloneElement as la, useLayoutEffect as ua, useEffect as fa, useState as mi } from "react";
import * as Jt from "react-dom";
import gi from "react-dom";
function vi(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = vi(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function bi() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = vi(e)) && (r && (r += " "), r += t);
  return r;
}
const Sr = "-", da = (e) => {
  const t = ha(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (s) => {
      const a = s.split(Sr);
      return a[0] === "" && a.length !== 1 && a.shift(), yi(a, t) || pa(s);
    },
    getConflictingClassGroupIds: (s, a) => {
      const c = n[s] || [];
      return a && r[s] ? [...c, ...r[s]] : c;
    }
  };
}, yi = (e, t) => {
  var s;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? yi(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const i = e.join(Sr);
  return (s = t.validators.find(({
    validator: a
  }) => a(i))) == null ? void 0 : s.classGroupId;
}, Fr = /^\[(.+)\]$/, pa = (e) => {
  if (Fr.test(e)) {
    const t = Fr.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, ha = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    ar(n[o], r, o, t);
  return r;
}, ar = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const i = o === "" ? t : Ur(t, o);
      i.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (ma(o)) {
        ar(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([i, s]) => {
      ar(s, Ur(t, i), n, r);
    });
  });
}, Ur = (e, t) => {
  let n = e;
  return t.split(Sr).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, ma = (e) => e.isThemeGetter, ga = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (i, s) => {
    n.set(i, s), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let s = n.get(i);
      if (s !== void 0)
        return s;
      if ((s = r.get(i)) !== void 0)
        return o(i, s), s;
    },
    set(i, s) {
      n.has(i) ? n.set(i, s) : o(i, s);
    }
  };
}, cr = "!", lr = ":", va = lr.length, ba = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const i = [];
    let s = 0, a = 0, c = 0, l;
    for (let _ = 0; _ < o.length; _++) {
      let f = o[_];
      if (s === 0 && a === 0) {
        if (f === lr) {
          i.push(o.slice(c, _)), c = _ + va;
          continue;
        }
        if (f === "/") {
          l = _;
          continue;
        }
      }
      f === "[" ? s++ : f === "]" ? s-- : f === "(" ? a++ : f === ")" && a--;
    }
    const u = i.length === 0 ? o : o.substring(c), d = ya(u), g = d !== u, m = l && l > c ? l - c : void 0;
    return {
      modifiers: i,
      hasImportantModifier: g,
      baseClassName: d,
      maybePostfixModifierPosition: m
    };
  };
  if (t) {
    const o = t + lr, i = r;
    r = (s) => s.startsWith(o) ? i(s.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: s,
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
}, ya = (e) => e.endsWith(cr) ? e.substring(0, e.length - 1) : e.startsWith(cr) ? e.substring(1) : e, _a = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const o = [];
    let i = [];
    return r.forEach((s) => {
      s[0] === "[" || t[s] ? (o.push(...i.sort(), s), i = []) : i.push(s);
    }), o.push(...i.sort()), o;
  };
}, Ea = (e) => ({
  cache: ga(e.cacheSize),
  parseClassName: ba(e),
  sortModifiers: _a(e),
  ...da(e)
}), wa = /\s+/, Ra = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: i
  } = t, s = [], a = e.trim().split(wa);
  let c = "";
  for (let l = a.length - 1; l >= 0; l -= 1) {
    const u = a[l], {
      isExternal: d,
      modifiers: g,
      hasImportantModifier: m,
      baseClassName: _,
      maybePostfixModifierPosition: f
    } = n(u);
    if (d) {
      c = u + (c.length > 0 ? " " + c : c);
      continue;
    }
    let v = !!f, h = r(v ? _.substring(0, f) : _);
    if (!h) {
      if (!v) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (h = r(_), !h) {
        c = u + (c.length > 0 ? " " + c : c);
        continue;
      }
      v = !1;
    }
    const E = i(g).join(":"), p = m ? E + cr : E, y = p + h;
    if (s.includes(y))
      continue;
    s.push(y);
    const b = o(h, v);
    for (let A = 0; A < b.length; ++A) {
      const S = b[A];
      s.push(p + S);
    }
    c = u + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Sa() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = _i(t)) && (r && (r += " "), r += n);
  return r;
}
const _i = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = _i(e[r])) && (n && (n += " "), n += t);
  return n;
};
function xa(e, ...t) {
  let n, r, o, i = s;
  function s(c) {
    const l = t.reduce((u, d) => d(u), e());
    return n = Ea(l), r = n.cache.get, o = n.cache.set, i = a, a(c);
  }
  function a(c) {
    const l = r(c);
    if (l)
      return l;
    const u = Ra(c, n);
    return o(c, u), u;
  }
  return function() {
    return i(Sa.apply(null, arguments));
  };
}
const Ee = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Ei = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, wi = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ca = /^\d+\/\d+$/, Pa = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Aa = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Oa = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Ta = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Na = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, nt = (e) => Ca.test(e), se = (e) => !!e && !Number.isNaN(Number(e)), Ue = (e) => !!e && Number.isInteger(Number(e)), pn = (e) => e.endsWith("%") && se(e.slice(0, -1)), He = (e) => Pa.test(e), Ia = () => !0, La = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Aa.test(e) && !Oa.test(e)
), Ri = () => !1, ka = (e) => Ta.test(e), Ma = (e) => Na.test(e), Da = (e) => !X(e) && !G(e), ja = (e) => lt(e, Ci, Ri), X = (e) => Ei.test(e), Ke = (e) => lt(e, Pi, La), hn = (e) => lt(e, Ba, se), Br = (e) => lt(e, Si, Ri), Ha = (e) => lt(e, xi, Ma), Rt = (e) => lt(e, Ai, ka), G = (e) => wi.test(e), ht = (e) => ut(e, Pi), $a = (e) => ut(e, za), zr = (e) => ut(e, Si), Fa = (e) => ut(e, Ci), Ua = (e) => ut(e, xi), St = (e) => ut(e, Ai, !0), lt = (e, t, n) => {
  const r = Ei.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, ut = (e, t, n = !1) => {
  const r = wi.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Si = (e) => e === "position" || e === "percentage", xi = (e) => e === "image" || e === "url", Ci = (e) => e === "length" || e === "size" || e === "bg-size", Pi = (e) => e === "length", Ba = (e) => e === "number", za = (e) => e === "family-name", Ai = (e) => e === "shadow", Va = () => {
  const e = Ee("color"), t = Ee("font"), n = Ee("text"), r = Ee("font-weight"), o = Ee("tracking"), i = Ee("leading"), s = Ee("breakpoint"), a = Ee("container"), c = Ee("spacing"), l = Ee("radius"), u = Ee("shadow"), d = Ee("inset-shadow"), g = Ee("text-shadow"), m = Ee("drop-shadow"), _ = Ee("blur"), f = Ee("perspective"), v = Ee("aspect"), h = Ee("ease"), E = Ee("animate"), p = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], y = () => [
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
  ], b = () => [...y(), G, X], A = () => ["auto", "hidden", "clip", "visible", "scroll"], S = () => ["auto", "contain", "none"], P = () => [G, X, c], k = () => [nt, "full", "auto", ...P()], O = () => [Ue, "none", "subgrid", G, X], N = () => ["auto", {
    span: ["full", Ue, G, X]
  }, Ue, G, X], M = () => [Ue, "auto", G, X], U = () => ["auto", "min", "max", "fr", G, X], D = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], $ = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], j = () => ["auto", ...P()], K = () => [nt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...P()], T = () => [e, G, X], B = () => [...y(), zr, Br, {
    position: [G, X]
  }], J = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], ae = () => ["auto", "cover", "contain", Fa, ja, {
    size: [G, X]
  }], re = () => [pn, ht, Ke], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    l,
    G,
    X
  ], Y = () => ["", se, ht, Ke], le = () => ["solid", "dashed", "dotted", "double"], oe = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], R = () => [se, pn, zr, Br], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    _,
    G,
    X
  ], V = () => ["none", se, G, X], W = () => ["none", se, G, X], x = () => [se, G, X], C = () => [nt, "full", ...P()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [He],
      breakpoint: [He],
      color: [Ia],
      container: [He],
      "drop-shadow": [He],
      ease: ["in", "out", "in-out"],
      font: [Da],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [He],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [He],
      shadow: [He],
      spacing: ["px", se],
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
        aspect: ["auto", "square", nt, X, G, v]
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
        columns: [se, X, G, a]
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
        object: b()
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
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
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
        inset: k()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": k()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": k()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: k()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: k()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: k()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: k()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: k()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: k()
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
        z: [Ue, "auto", G, X]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [nt, "full", "auto", a, ...P()]
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
        flex: [se, nt, "auto", "initial", "none", X]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", se, G, X]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", se, G, X]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ue, "first", "last", "none", G, X]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": O()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: N()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": M()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": M()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": O()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: N()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": M()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": M()
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
        "auto-cols": U()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": U()
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
        justify: [...D(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...$(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...$()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...D()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...$(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...$(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": D()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...$(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...$()]
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
        m: j()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: j()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: j()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: j()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: j()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: j()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: j()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: j()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: j()
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
        w: [a, "screen", ...K()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          a,
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
          a,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [s]
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
        text: ["base", n, ht, Ke]
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
        font: [r, G, hn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", pn, X]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [$a, X, t]
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
        tracking: [o, G, X]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [se, "none", G, hn]
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
        "list-image": ["none", G, X]
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
        list: ["disc", "decimal", "none", G, X]
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
        placeholder: T()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: T()
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
        decoration: [...le(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [se, "from-font", "auto", G, Ke]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: T()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [se, "auto", G, X]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", G, X]
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
        content: ["none", G, X]
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
        bg: B()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: J()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ae()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ue, G, X],
          radial: ["", G, X],
          conic: [Ue, G, X]
        }, Ua, Ha]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: T()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: re()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: re()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: re()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: T()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: T()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: T()
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
        border: [...le(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...le(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: T()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": T()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": T()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": T()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": T()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": T()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": T()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": T()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": T()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: T()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...le(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [se, G, X]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", se, ht, Ke]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: T()
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
          u,
          St,
          Rt
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: T()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, St, Rt]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": T()
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
        ring: T()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [se, Ke]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": T()
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
        "inset-ring": T()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", g, St, Rt]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": T()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [se, G, X]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...oe(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": oe()
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
        "mask-linear": [se]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": R()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": T()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": T()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": R()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": T()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": T()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": R()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": T()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": T()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": R()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": T()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": T()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": R()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": T()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": T()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": R()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": T()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": T()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": R()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": T()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": T()
      }],
      "mask-image-radial": [{
        "mask-radial": [G, X]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": R()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": R()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": T()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": T()
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
        "mask-radial-at": y()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [se]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": R()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": R()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": T()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": T()
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
        mask: B()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: J()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: ae()
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
        mask: ["none", G, X]
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
          G,
          X
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Q()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [se, G, X]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [se, G, X]
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
          m,
          St,
          Rt
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": T()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", se, G, X]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [se, G, X]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", se, G, X]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [se, G, X]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", se, G, X]
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
          G,
          X
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Q()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [se, G, X]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [se, G, X]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", se, G, X]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [se, G, X]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", se, G, X]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [se, G, X]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [se, G, X]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", se, G, X]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", G, X]
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
        duration: [se, "initial", G, X]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", h, G, X]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [se, G, X]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", E, G, X]
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
        perspective: [f, G, X]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": b()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: V()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": V()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": V()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": V()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: W()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": W()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": W()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": W()
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
        skew: x()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": x()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": x()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [G, X, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: b()
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
        translate: C()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": C()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": C()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": C()
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
        accent: T()
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
        caret: T()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", G, X]
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
        "will-change": ["auto", "scroll", "contents", "transform", G, X]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...T()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [se, ht, Ke, hn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...T()]
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
}, qa = /* @__PURE__ */ xa(Va);
function Pe(...e) {
  return qa(bi(e));
}
function Vr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Oi(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = Vr(o, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : Vr(e[o], null);
        }
      };
  };
}
function we(...e) {
  return w.useCallback(Oi(...e), e);
}
// @__NO_SIDE_EFFECTS__
function vt(e) {
  const t = /* @__PURE__ */ Xa(e), n = w.forwardRef((r, o) => {
    const { children: i, ...s } = r, a = w.Children.toArray(i), c = a.find(Ka);
    if (c) {
      const l = c.props.children, u = a.map((d) => d === c ? w.Children.count(l) > 1 ? w.Children.only(null) : w.isValidElement(l) ? l.props.children : null : d);
      return /* @__PURE__ */ I(t, { ...s, ref: o, children: w.isValidElement(l) ? w.cloneElement(l, void 0, u) : null });
    }
    return /* @__PURE__ */ I(t, { ...s, ref: o, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Wa = /* @__PURE__ */ vt("Slot");
// @__NO_SIDE_EFFECTS__
function Xa(e) {
  const t = w.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (w.isValidElement(o)) {
      const s = Qa(o), a = Ya(i, o.props);
      return o.type !== w.Fragment && (a.ref = r ? Oi(r, s) : s), w.cloneElement(o, a);
    }
    return w.Children.count(o) > 1 ? w.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ga = Symbol("radix.slottable");
function Ka(e) {
  return w.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ga;
}
function Ya(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...a) => {
      i(...a), o(...a);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...i } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Qa(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const qr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Wr = bi, Za = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Wr(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: i } = t, s = Object.keys(o).map((l) => {
    const u = n == null ? void 0 : n[l], d = i == null ? void 0 : i[l];
    if (u === null) return null;
    const g = qr(u) || qr(d);
    return o[l][g];
  }), a = n && Object.entries(n).reduce((l, u) => {
    let [d, g] = u;
    return g === void 0 || (l[d] = g), l;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((l, u) => {
    let { class: d, className: g, ...m } = u;
    return Object.entries(m).every((_) => {
      let [f, v] = _;
      return Array.isArray(v) ? v.includes({
        ...i,
        ...a
      }[f]) : {
        ...i,
        ...a
      }[f] === v;
    }) ? [
      ...l,
      d,
      g
    ] : l;
  }, []);
  return Wr(e, s, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ja = Za(
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
), Bt = Zt(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ I(r ? Wa : "button", { className: Pe(Ja({ variant: t, size: n, className: e })), ref: i, ...o })
);
Bt.displayName = "Button";
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ec = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), tc = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Xr = (e) => {
  const t = tc(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Ti = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), nc = (e) => {
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
var rc = {
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
const oc = Zt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: i,
    iconNode: s,
    ...a
  }, c) => sr(
    "svg",
    {
      ref: c,
      ...rc,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Ti("lucide", o),
      ...!i && !nc(a) && { "aria-hidden": "true" },
      ...a
    },
    [
      ...s.map(([l, u]) => sr(l, u)),
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
const tt = (e, t) => {
  const n = Zt(
    ({ className: r, ...o }, i) => sr(oc, {
      ref: i,
      iconNode: t,
      className: Ti(
        `lucide-${ec(Xr(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Xr(e), n;
};
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ic = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], sc = tt("check", ic);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ac = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ni = tt("chevron-down", ac);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cc = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], lc = tt("chevron-up", cc);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const uc = [
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
], fc = tt("eye-off", uc);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dc = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], pc = tt("eye", dc);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hc = [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
], mc = tt("loader", hc);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gc = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], vc = tt("plus", gc);
function Ii(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ur = { exports: {} }, _t = {};
function Li(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (Li = function(r) {
    return r ? n : t;
  })(e);
}
function bc(e, t) {
  if (!t && e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var n = Li(t);
  if (n && n.has(e)) return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var s = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      s && (s.get || s.set) ? Object.defineProperty(r, i, s) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
_t._ = bc;
var xt = { exports: {} }, mn = {}, Gr;
function ki() {
  return Gr || (Gr = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(s, a) {
      for (var c in a) Object.defineProperty(s, c, {
        enumerable: !0,
        get: a[c]
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
    function n(s) {
      const a = {};
      for (const [c, l] of s.entries()) {
        const u = a[c];
        typeof u > "u" ? a[c] = l : Array.isArray(u) ? u.push(l) : a[c] = [
          u,
          l
        ];
      }
      return a;
    }
    function r(s) {
      return typeof s == "string" ? s : typeof s == "number" && !isNaN(s) || typeof s == "boolean" ? String(s) : "";
    }
    function o(s) {
      const a = new URLSearchParams();
      for (const [c, l] of Object.entries(s))
        if (Array.isArray(l))
          for (const u of l)
            a.append(c, r(u));
        else
          a.set(c, r(l));
      return a;
    }
    function i(s) {
      for (var a = arguments.length, c = new Array(a > 1 ? a - 1 : 0), l = 1; l < a; l++)
        c[l - 1] = arguments[l];
      for (const u of c) {
        for (const d of u.keys())
          s.delete(d);
        for (const [d, g] of u.entries())
          s.append(d, g);
      }
      return s;
    }
  }(mn)), mn;
}
var gn = {}, Kr;
function Mi() {
  return Kr || (Kr = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(c, l) {
      for (var u in l) Object.defineProperty(c, u, {
        enumerable: !0,
        get: l[u]
      });
    }
    t(e, {
      formatUrl: function() {
        return i;
      },
      formatWithValidation: function() {
        return a;
      },
      urlObjectKeys: function() {
        return s;
      }
    });
    const r = /* @__PURE__ */ _t._(ki()), o = /https?|ftp|gopher|file/;
    function i(c) {
      let { auth: l, hostname: u } = c, d = c.protocol || "", g = c.pathname || "", m = c.hash || "", _ = c.query || "", f = !1;
      l = l ? encodeURIComponent(l).replace(/%3A/i, ":") + "@" : "", c.host ? f = l + c.host : u && (f = l + (~u.indexOf(":") ? "[" + u + "]" : u), c.port && (f += ":" + c.port)), _ && typeof _ == "object" && (_ = String(r.urlQueryToSearchParams(_)));
      let v = c.search || _ && "?" + _ || "";
      return d && !d.endsWith(":") && (d += ":"), c.slashes || (!d || o.test(d)) && f !== !1 ? (f = "//" + (f || ""), g && g[0] !== "/" && (g = "/" + g)) : f || (f = ""), m && m[0] !== "#" && (m = "#" + m), v && v[0] !== "?" && (v = "?" + v), g = g.replace(/[?#]/g, encodeURIComponent), v = v.replace("#", "%23"), "" + d + f + g + v + m;
    }
    const s = [
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
    function a(c) {
      return process.env.NODE_ENV === "development" && c !== null && typeof c == "object" && Object.keys(c).forEach((l) => {
        s.includes(l) || console.warn("Unknown key passed via urlObject into url.format: " + l);
      }), i(c);
    }
  }(gn)), gn;
}
var vn = {}, Yr;
function yc() {
  return Yr || (Yr = 1, function(e) {
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
  }(vn)), vn;
}
var bn = {}, Qr;
function en() {
  return Qr || (Qr = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(y, b) {
      for (var A in b) Object.defineProperty(y, A, {
        enumerable: !0,
        get: b[A]
      });
    }
    t(e, {
      DecodeError: function() {
        return _;
      },
      MiddlewareNotFoundError: function() {
        return E;
      },
      MissingStaticPage: function() {
        return h;
      },
      NormalizeError: function() {
        return f;
      },
      PageNotFoundError: function() {
        return v;
      },
      SP: function() {
        return g;
      },
      ST: function() {
        return m;
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
        return s;
      },
      getURL: function() {
        return a;
      },
      isAbsoluteUrl: function() {
        return i;
      },
      isResSent: function() {
        return l;
      },
      loadGetInitialProps: function() {
        return d;
      },
      normalizeRepeatedSlashes: function() {
        return u;
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
    function r(y) {
      let b = !1, A;
      return function() {
        for (var S = arguments.length, P = new Array(S), k = 0; k < S; k++)
          P[k] = arguments[k];
        return b || (b = !0, A = y(...P)), A;
      };
    }
    const o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, i = (y) => o.test(y);
    function s() {
      const { protocol: y, hostname: b, port: A } = window.location;
      return y + "//" + b + (A ? ":" + A : "");
    }
    function a() {
      const { href: y } = window.location, b = s();
      return y.substring(b.length);
    }
    function c(y) {
      return typeof y == "string" ? y : y.displayName || y.name || "Unknown";
    }
    function l(y) {
      return y.finished || y.headersSent;
    }
    function u(y) {
      const b = y.split("?");
      return b[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (b[1] ? "?" + b.slice(1).join("?") : "");
    }
    async function d(y, b) {
      if (process.env.NODE_ENV !== "production") {
        var A;
        if ((A = y.prototype) != null && A.getInitialProps) {
          const k = '"' + c(y) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
          throw Object.defineProperty(new Error(k), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0
          });
        }
      }
      const S = b.res || b.ctx && b.ctx.res;
      if (!y.getInitialProps)
        return b.ctx && b.Component ? {
          pageProps: await d(b.Component, b.ctx)
        } : {};
      const P = await y.getInitialProps(b);
      if (S && l(S))
        return P;
      if (!P) {
        const k = '"' + c(y) + '.getInitialProps()" should resolve to an object. But found "' + P + '" instead.';
        throw Object.defineProperty(new Error(k), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0
        });
      }
      return process.env.NODE_ENV !== "production" && Object.keys(P).length === 0 && !b.ctx && console.warn("" + c(y) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps"), P;
    }
    const g = typeof performance < "u", m = g && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((y) => typeof performance[y] == "function");
    class _ extends Error {
    }
    class f extends Error {
    }
    class v extends Error {
      constructor(b) {
        super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = "Cannot find module for page: " + b;
      }
    }
    class h extends Error {
      constructor(b, A) {
        super(), this.message = "Failed to load static file for page: " + b + " " + A;
      }
    }
    class E extends Error {
      constructor() {
        super(), this.code = "ENOENT", this.message = "Cannot find the middleware module";
      }
    }
    function p(y) {
      return JSON.stringify({
        message: y.message,
        stack: y.stack
      });
    }
  }(bn)), bn;
}
var Ct = { exports: {} }, yn = {}, Zr;
function Di() {
  return Zr || (Zr = 1, function(e) {
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
  }(yn)), yn;
}
var _n = {}, Jr;
function xr() {
  return Jr || (Jr = 1, function(e) {
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
  }(_n)), _n;
}
var eo;
function tn() {
  return eo || (eo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizePathTrailingSlash", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Di(), r = xr(), o = (i) => {
      if (!i.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH)
        return i;
      const { pathname: s, query: a, hash: c } = (0, r.parsePath)(i);
      return process.env.__NEXT_TRAILING_SLASH ? /\.[^/]+\/?$/.test(s) ? "" + (0, n.removeTrailingSlash)(s) + a + c : s.endsWith("/") ? "" + s + a + c : s + "/" + a + c : "" + (0, n.removeTrailingSlash)(s) + a + c;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ct, Ct.exports)), Ct.exports;
}
var En = {}, Pt = { exports: {} }, wn = {}, to;
function ji() {
  return to || (to = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "pathHasPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = xr();
    function n(r, o) {
      if (typeof r != "string")
        return !1;
      const { pathname: i } = (0, t.parsePath)(r);
      return i === o || i.startsWith(o + "/");
    }
  }(wn)), wn;
}
var no;
function _c() {
  return no || (no = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "hasBasePath", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = ji(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(i) {
      return (0, n.pathHasPrefix)(i, r);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Pt, Pt.exports)), Pt.exports;
}
var ro;
function Hi() {
  return ro || (ro = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isLocalURL", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = en(), n = _c();
    function r(o) {
      if (!(0, t.isAbsoluteUrl)(o)) return !0;
      try {
        const i = (0, t.getLocationOrigin)(), s = new URL(o, i);
        return s.origin === i && (0, n.hasBasePath)(s.pathname);
      } catch {
        return !1;
      }
    }
  }(En)), En;
}
var Rn = {}, Sn = {}, oo;
function Ec() {
  return oo || (oo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var a in s) Object.defineProperty(i, a, {
        enumerable: !0,
        get: s[a]
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
      insert(s) {
        this._insert(s.split("/").filter(Boolean), [], !1);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(s) {
        s === void 0 && (s = "/");
        const a = [
          ...this.children.keys()
        ].sort();
        this.slugName !== null && a.splice(a.indexOf("[]"), 1), this.restSlugName !== null && a.splice(a.indexOf("[...]"), 1), this.optionalRestSlugName !== null && a.splice(a.indexOf("[[...]]"), 1);
        const c = a.map((l) => this.children.get(l)._smoosh("" + s + l + "/")).reduce((l, u) => [
          ...l,
          ...u
        ], []);
        if (this.slugName !== null && c.push(...this.children.get("[]")._smoosh(s + "[" + this.slugName + "]/")), !this.placeholder) {
          const l = s === "/" ? "/" : s.slice(0, -1);
          if (this.optionalRestSlugName != null)
            throw Object.defineProperty(new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + l + '" and "' + l + "[[..." + this.optionalRestSlugName + ']]").'), "__NEXT_ERROR_CODE", {
              value: "E458",
              enumerable: !1,
              configurable: !0
            });
          c.unshift(l);
        }
        return this.restSlugName !== null && c.push(...this.children.get("[...]")._smoosh(s + "[..." + this.restSlugName + "]/")), this.optionalRestSlugName !== null && c.push(...this.children.get("[[...]]")._smoosh(s + "[[..." + this.optionalRestSlugName + "]]/")), c;
      }
      _insert(s, a, c) {
        if (s.length === 0) {
          this.placeholder = !1;
          return;
        }
        if (c)
          throw Object.defineProperty(new Error("Catch-all must be the last part of the URL."), "__NEXT_ERROR_CODE", {
            value: "E392",
            enumerable: !1,
            configurable: !0
          });
        let l = s[0];
        if (l.startsWith("[") && l.endsWith("]")) {
          let g = function(m, _) {
            if (m !== null && m !== _)
              throw Object.defineProperty(new Error("You cannot use different slug names for the same dynamic path ('" + m + "' !== '" + _ + "')."), "__NEXT_ERROR_CODE", {
                value: "E337",
                enumerable: !1,
                configurable: !0
              });
            a.forEach((f) => {
              if (f === _)
                throw Object.defineProperty(new Error('You cannot have the same slug name "' + _ + '" repeat within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E247",
                  enumerable: !1,
                  configurable: !0
                });
              if (f.replace(/\W/g, "") === l.replace(/\W/g, ""))
                throw Object.defineProperty(new Error('You cannot have the slug names "' + f + '" and "' + _ + '" differ only by non-word symbols within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E499",
                  enumerable: !1,
                  configurable: !0
                });
            }), a.push(_);
          }, u = l.slice(1, -1), d = !1;
          if (u.startsWith("[") && u.endsWith("]") && (u = u.slice(1, -1), d = !0), u.startsWith("…"))
            throw Object.defineProperty(new Error("Detected a three-dot character ('…') at ('" + u + "'). Did you mean ('...')?"), "__NEXT_ERROR_CODE", {
              value: "E147",
              enumerable: !1,
              configurable: !0
            });
          if (u.startsWith("...") && (u = u.substring(3), c = !0), u.startsWith("[") || u.endsWith("]"))
            throw Object.defineProperty(new Error("Segment names may not start or end with extra brackets ('" + u + "')."), "__NEXT_ERROR_CODE", {
              value: "E421",
              enumerable: !1,
              configurable: !0
            });
          if (u.startsWith("."))
            throw Object.defineProperty(new Error("Segment names may not start with erroneous periods ('" + u + "')."), "__NEXT_ERROR_CODE", {
              value: "E288",
              enumerable: !1,
              configurable: !0
            });
          if (c)
            if (d) {
              if (this.restSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + s[0] + '" ).'), "__NEXT_ERROR_CODE", {
                  value: "E299",
                  enumerable: !1,
                  configurable: !0
                });
              g(this.optionalRestSlugName, u), this.optionalRestSlugName = u, l = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + s[0] + '").'), "__NEXT_ERROR_CODE", {
                  value: "E300",
                  enumerable: !1,
                  configurable: !0
                });
              g(this.restSlugName, u), this.restSlugName = u, l = "[...]";
            }
          else {
            if (d)
              throw Object.defineProperty(new Error('Optional route parameters are not yet supported ("' + s[0] + '").'), "__NEXT_ERROR_CODE", {
                value: "E435",
                enumerable: !1,
                configurable: !0
              });
            g(this.slugName, u), this.slugName = u, l = "[]";
          }
        }
        this.children.has(l) || this.children.set(l, new n()), this.children.get(l)._insert(s.slice(1), a, c);
      }
      constructor() {
        this.placeholder = !0, this.children = /* @__PURE__ */ new Map(), this.slugName = null, this.restSlugName = null, this.optionalRestSlugName = null;
      }
    }
    function r(i) {
      const s = new n();
      return i.forEach((a) => s.insert(a)), s.smoosh();
    }
    function o(i, s) {
      const a = {}, c = [];
      for (let u = 0; u < i.length; u++) {
        const d = s(i[u]);
        a[d] = u, c[u] = d;
      }
      return r(c).map((u) => i[a[u]]);
    }
  }(Sn)), Sn;
}
var xn = {}, Cn = {}, Pn = {}, An = {}, io;
function wc() {
  return io || (io = 1, function(e) {
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
  }(An)), An;
}
var On = {}, so;
function Rc() {
  return so || (so = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, c) {
      for (var l in c) Object.defineProperty(a, l, {
        enumerable: !0,
        get: c[l]
      });
    }
    t(e, {
      DEFAULT_SEGMENT_KEY: function() {
        return s;
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
    function n(a) {
      return a[0] === "(" && a.endsWith(")");
    }
    function r(a) {
      return a.startsWith("@") && a !== "@children";
    }
    function o(a, c) {
      if (a.includes(i)) {
        const u = JSON.stringify(c);
        return u !== "{}" ? i + "?" + u : i;
      }
      return a;
    }
    const i = "__PAGE__", s = "__DEFAULT__";
  }(On)), On;
}
var ao;
function Sc() {
  return ao || (ao = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(s, a) {
      for (var c in a) Object.defineProperty(s, c, {
        enumerable: !0,
        get: a[c]
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
    const n = wc(), r = Rc();
    function o(s) {
      return (0, n.ensureLeadingSlash)(s.split("/").reduce((a, c, l, u) => !c || (0, r.isGroupSegment)(c) || c[0] === "@" || (c === "page" || c === "route") && l === u.length - 1 ? a : a + "/" + c, ""));
    }
    function i(s) {
      return s.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }(Pn)), Pn;
}
var co;
function $i() {
  return co || (co = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(s, a) {
      for (var c in a) Object.defineProperty(s, c, {
        enumerable: !0,
        get: a[c]
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
    const n = Sc(), r = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function o(s) {
      return s.split("/").find((a) => r.find((c) => a.startsWith(c))) !== void 0;
    }
    function i(s) {
      let a, c, l;
      for (const u of s.split("/"))
        if (c = r.find((d) => u.startsWith(d)), c) {
          [a, l] = s.split(c, 2);
          break;
        }
      if (!a || !c || !l)
        throw Object.defineProperty(new Error("Invalid interception route: " + s + ". Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>"), "__NEXT_ERROR_CODE", {
          value: "E269",
          enumerable: !1,
          configurable: !0
        });
      switch (a = (0, n.normalizeAppPath)(a), c) {
        case "(.)":
          a === "/" ? l = "/" + l : l = a + "/" + l;
          break;
        case "(..)":
          if (a === "/")
            throw Object.defineProperty(new Error("Invalid interception route: " + s + ". Cannot use (..) marker at the root level, use (.) instead."), "__NEXT_ERROR_CODE", {
              value: "E207",
              enumerable: !1,
              configurable: !0
            });
          l = a.split("/").slice(0, -1).concat(l).join("/");
          break;
        case "(...)":
          l = "/" + l;
          break;
        case "(..)(..)":
          const u = a.split("/");
          if (u.length <= 2)
            throw Object.defineProperty(new Error("Invalid interception route: " + s + ". Cannot use (..)(..) marker at the root level or one level up."), "__NEXT_ERROR_CODE", {
              value: "E486",
              enumerable: !1,
              configurable: !0
            });
          l = u.slice(0, -2).concat(l).join("/");
          break;
        default:
          throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
            value: "E112",
            enumerable: !1,
            configurable: !0
          });
      }
      return {
        interceptingRoute: a,
        interceptedRoute: l
      };
    }
  }(Cn)), Cn;
}
var lo;
function xc() {
  return lo || (lo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isDynamicRoute", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = $i(), n = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, r = /\/\[[^/]+\](?=\/|$)/;
    function o(i, s) {
      return s === void 0 && (s = !0), (0, t.isInterceptionRouteAppPath)(i) && (i = (0, t.extractInterceptionRouteInformation)(i).interceptedRoute), s ? r.test(i) : n.test(i);
    }
  }(xn)), xn;
}
var uo;
function Cc() {
  return uo || (uo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(o, i) {
      for (var s in i) Object.defineProperty(o, s, {
        enumerable: !0,
        get: i[s]
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
    const n = Ec(), r = xc();
  }(Rn)), Rn;
}
var Tn = {}, Nn = {}, fo;
function Pc() {
  return fo || (fo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getRouteMatcher", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = en();
    function n(r) {
      let { re: o, groups: i } = r;
      return (s) => {
        const a = o.exec(s);
        if (!a) return !1;
        const c = (u) => {
          try {
            return decodeURIComponent(u);
          } catch {
            throw Object.defineProperty(new t.DecodeError("failed to decode param"), "__NEXT_ERROR_CODE", {
              value: "E528",
              enumerable: !1,
              configurable: !0
            });
          }
        }, l = {};
        for (const [u, d] of Object.entries(i)) {
          const g = a[d.pos];
          g !== void 0 && (d.repeat ? l[u] = g.split("/").map((m) => c(m)) : l[u] = c(g));
        }
        return l;
      };
    }
  }(Nn)), Nn;
}
var In = {}, Ln = {}, po;
function Ac() {
  return po || (po = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(de, Re) {
      for (var ge in Re) Object.defineProperty(de, ge, {
        enumerable: !0,
        get: Re[ge]
      });
    }
    t(e, {
      ACTION_SUFFIX: function() {
        return d;
      },
      APP_DIR_ALIAS: function() {
        return $;
      },
      CACHE_ONE_YEAR: function() {
        return S;
      },
      DOT_NEXT_ALIAS: function() {
        return U;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return q;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return Q;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return x;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return V;
      },
      INFINITE_CACHE: function() {
        return P;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return N;
      },
      MATCHED_PATH_HEADER: function() {
        return o;
      },
      MIDDLEWARE_FILENAME: function() {
        return k;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return O;
      },
      NEXT_BODY_SUFFIX: function() {
        return _;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return A;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return v;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return h;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return b;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return f;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return p;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return y;
      },
      NEXT_DATA_SUFFIX: function() {
        return g;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return r;
      },
      NEXT_META_SUFFIX: function() {
        return m;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return n;
      },
      NEXT_RESUME_HEADER: function() {
        return E;
      },
      NON_STANDARD_NODE_ENV: function() {
        return C;
      },
      PAGES_DIR_ALIAS: function() {
        return M;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return i;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return s;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return re;
      },
      ROOT_DIR_ALIAS: function() {
        return D;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return ae;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return J;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return T;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return K;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return B;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return j;
      },
      RSC_PREFETCH_SUFFIX: function() {
        return a;
      },
      RSC_SEGMENTS_DIR_SUFFIX: function() {
        return c;
      },
      RSC_SEGMENT_SUFFIX: function() {
        return l;
      },
      RSC_SUFFIX: function() {
        return u;
      },
      SERVER_PROPS_EXPORT_ERROR: function() {
        return R;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return Y;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return le;
      },
      SERVER_RUNTIME: function() {
        return z;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return ue;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return ne;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return oe;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return W;
      },
      WEBPACK_LAYERS: function() {
        return ve;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return me;
      }
    });
    const n = "nxtP", r = "nxtI", o = "x-matched-path", i = "x-prerender-revalidate", s = "x-prerender-revalidate-if-generated", a = ".prefetch.rsc", c = ".segments", l = ".segment.rsc", u = ".rsc", d = ".action", g = ".json", m = ".meta", _ = ".body", f = "x-next-cache-tags", v = "x-next-revalidated-tags", h = "x-next-revalidate-tag-token", E = "next-resume", p = 128, y = 256, b = 1024, A = "_N_T_", S = 31536e3, P = 4294967294, k = "middleware", O = `(?:src/)?${k}`, N = "instrumentation", M = "private-next-pages", U = "private-dot-next", D = "private-next-root-dir", $ = "private-next-app-dir", j = "private-next-rsc-mod-ref-proxy", K = "private-next-rsc-action-validate", T = "private-next-rsc-server-reference", B = "private-next-rsc-cache-wrapper", J = "private-next-rsc-action-encryption", ae = "private-next-rsc-action-client-wrapper", re = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", ne = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", Y = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", le = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", oe = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", R = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", Q = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", V = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", W = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", x = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", C = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', ue = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", q = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ], z = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    }, Z = {
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
    }, ve = {
      ...Z,
      GROUP: {
        builtinReact: [
          Z.reactServerComponents,
          Z.actionBrowser
        ],
        serverOnly: [
          Z.reactServerComponents,
          Z.actionBrowser,
          Z.instrument,
          Z.middleware
        ],
        neutralTarget: [
          // pages api
          Z.apiNode,
          Z.apiEdge
        ],
        clientOnly: [
          Z.serverSideRendering,
          Z.appPagesBrowser
        ],
        bundled: [
          Z.reactServerComponents,
          Z.actionBrowser,
          Z.serverSideRendering,
          Z.appPagesBrowser,
          Z.shared,
          Z.instrument,
          Z.middleware
        ],
        appPages: [
          // app router pages and layouts
          Z.reactServerComponents,
          Z.serverSideRendering,
          Z.appPagesBrowser,
          Z.actionBrowser
        ]
      }
    }, me = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }(Ln)), Ln;
}
var kn = {}, ho;
function Oc() {
  return ho || (ho = 1, function(e) {
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
  }(kn)), kn;
}
var mo;
function Tc() {
  return mo || (mo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(v, h) {
      for (var E in h) Object.defineProperty(v, E, {
        enumerable: !0,
        get: h[E]
      });
    }
    t(e, {
      getNamedMiddlewareRegex: function() {
        return f;
      },
      getNamedRouteRegex: function() {
        return _;
      },
      getRouteRegex: function() {
        return u;
      },
      parseParameter: function() {
        return a;
      }
    });
    const n = Ac(), r = $i(), o = Oc(), i = Di(), s = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
    function a(v) {
      const h = v.match(s);
      return c(h ? h[2] : v);
    }
    function c(v) {
      const h = v.startsWith("[") && v.endsWith("]");
      h && (v = v.slice(1, -1));
      const E = v.startsWith("...");
      return E && (v = v.slice(3)), {
        key: v,
        repeat: E,
        optional: h
      };
    }
    function l(v, h, E) {
      const p = {};
      let y = 1;
      const b = [];
      for (const A of (0, i.removeTrailingSlash)(v).slice(1).split("/")) {
        const S = r.INTERCEPTION_ROUTE_MARKERS.find((k) => A.startsWith(k)), P = A.match(s);
        if (S && P && P[2]) {
          const { key: k, optional: O, repeat: N } = c(P[2]);
          p[k] = {
            pos: y++,
            repeat: N,
            optional: O
          }, b.push("/" + (0, o.escapeStringRegexp)(S) + "([^/]+?)");
        } else if (P && P[2]) {
          const { key: k, repeat: O, optional: N } = c(P[2]);
          p[k] = {
            pos: y++,
            repeat: O,
            optional: N
          }, E && P[1] && b.push("/" + (0, o.escapeStringRegexp)(P[1]));
          let M = O ? N ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
          E && P[1] && (M = M.substring(1)), b.push(M);
        } else
          b.push("/" + (0, o.escapeStringRegexp)(A));
        h && P && P[3] && b.push((0, o.escapeStringRegexp)(P[3]));
      }
      return {
        parameterizedRoute: b.join(""),
        groups: p
      };
    }
    function u(v, h) {
      let { includeSuffix: E = !1, includePrefix: p = !1, excludeOptionalTrailingSlash: y = !1 } = h === void 0 ? {} : h;
      const { parameterizedRoute: b, groups: A } = l(v, E, p);
      let S = b;
      return y || (S += "(?:/)?"), {
        re: new RegExp("^" + S + "$"),
        groups: A
      };
    }
    function d() {
      let v = 0;
      return () => {
        let h = "", E = ++v;
        for (; E > 0; )
          h += String.fromCharCode(97 + (E - 1) % 26), E = Math.floor((E - 1) / 26);
        return h;
      };
    }
    function g(v) {
      let { interceptionMarker: h, getSafeRouteKey: E, segment: p, routeKeys: y, keyPrefix: b, backreferenceDuplicateKeys: A } = v;
      const { key: S, optional: P, repeat: k } = c(p);
      let O = S.replace(/\W/g, "");
      b && (O = "" + b + O);
      let N = !1;
      (O.length === 0 || O.length > 30) && (N = !0), isNaN(parseInt(O.slice(0, 1))) || (N = !0), N && (O = E());
      const M = O in y;
      b ? y[O] = "" + b + S : y[O] = S;
      const U = h ? (0, o.escapeStringRegexp)(h) : "";
      let D;
      return M && A ? D = "\\k<" + O + ">" : k ? D = "(?<" + O + ">.+?)" : D = "(?<" + O + ">[^/]+?)", P ? "(?:/" + U + D + ")?" : "/" + U + D;
    }
    function m(v, h, E, p, y) {
      const b = d(), A = {}, S = [];
      for (const P of (0, i.removeTrailingSlash)(v).slice(1).split("/")) {
        const k = r.INTERCEPTION_ROUTE_MARKERS.some((N) => P.startsWith(N)), O = P.match(s);
        if (k && O && O[2])
          S.push(g({
            getSafeRouteKey: b,
            interceptionMarker: O[1],
            segment: O[2],
            routeKeys: A,
            keyPrefix: h ? n.NEXT_INTERCEPTION_MARKER_PREFIX : void 0,
            backreferenceDuplicateKeys: y
          }));
        else if (O && O[2]) {
          p && O[1] && S.push("/" + (0, o.escapeStringRegexp)(O[1]));
          let N = g({
            getSafeRouteKey: b,
            segment: O[2],
            routeKeys: A,
            keyPrefix: h ? n.NEXT_QUERY_PARAM_PREFIX : void 0,
            backreferenceDuplicateKeys: y
          });
          p && O[1] && (N = N.substring(1)), S.push(N);
        } else
          S.push("/" + (0, o.escapeStringRegexp)(P));
        E && O && O[3] && S.push((0, o.escapeStringRegexp)(O[3]));
      }
      return {
        namedParameterizedRoute: S.join(""),
        routeKeys: A
      };
    }
    function _(v, h) {
      var E, p, y;
      const b = m(v, h.prefixRouteKeys, (E = h.includeSuffix) != null ? E : !1, (p = h.includePrefix) != null ? p : !1, (y = h.backreferenceDuplicateKeys) != null ? y : !1);
      let A = b.namedParameterizedRoute;
      return h.excludeOptionalTrailingSlash || (A += "(?:/)?"), {
        ...u(v, h),
        namedRegex: "^" + A + "$",
        routeKeys: b.routeKeys
      };
    }
    function f(v, h) {
      const { parameterizedRoute: E } = l(v, !1, !1), { catchAll: p = !0 } = h;
      if (E === "/")
        return {
          namedRegex: "^/" + (p ? ".*" : "") + "$"
        };
      const { namedParameterizedRoute: y } = m(v, !1, !1, !1, !1);
      let b = p ? "(?:(/.*)?)" : "";
      return {
        namedRegex: "^" + y + b + "$"
      };
    }
  }(In)), In;
}
var go;
function Nc() {
  return go || (go = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "interpolateAs", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Pc(), n = Tc();
    function r(o, i, s) {
      let a = "";
      const c = (0, n.getRouteRegex)(o), l = c.groups, u = (
        // Try to match the dynamic route against the asPath
        (i !== o ? (0, t.getRouteMatcher)(c)(i) : "") || // Fall back to reading the values from the href
        // TODO: should this take priority; also need to change in the router.
        s
      );
      a = o;
      const d = Object.keys(l);
      return d.every((g) => {
        let m = u[g] || "";
        const { repeat: _, optional: f } = l[g];
        let v = "[" + (_ ? "..." : "") + g + "]";
        return f && (v = (m ? "" : "/") + "[" + v + "]"), _ && !Array.isArray(m) && (m = [
          m
        ]), (f || g in u) && // Interpolate group into data URL if present
        (a = a.replace(v, _ ? m.map(
          // these values should be fully encoded instead of just
          // path delimiter escaped since they are being inserted
          // into the URL and we expect URL encoded segments
          // when parsing dynamic route params
          (h) => encodeURIComponent(h)
        ).join("/") : encodeURIComponent(m)) || "/");
      }) || (a = ""), {
        params: d,
        result: a
      };
    }
  }(Tn)), Tn;
}
var vo;
function Ic() {
  return vo || (vo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "resolveHref", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const n = ki(), r = Mi(), o = yc(), i = en(), s = tn(), a = Hi(), c = Cc(), l = Nc();
    function u(d, g, m) {
      let _, f = typeof g == "string" ? g : (0, r.formatWithValidation)(g);
      const v = f.match(/^[a-zA-Z]{1,}:\/\//), h = v ? f.slice(v[0].length) : f;
      if ((h.split("?", 1)[0] || "").match(/(\/\/|\\)/)) {
        console.error("Invalid href '" + f + "' passed to next/router in page: '" + d.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
        const p = (0, i.normalizeRepeatedSlashes)(h);
        f = (v ? v[0] : "") + p;
      }
      if (!(0, a.isLocalURL)(f))
        return m ? [
          f
        ] : f;
      try {
        _ = new URL(f.startsWith("#") ? d.asPath : d.pathname, "http://n");
      } catch {
        _ = new URL("/", "http://n");
      }
      try {
        const p = new URL(f, _);
        p.pathname = (0, s.normalizePathTrailingSlash)(p.pathname);
        let y = "";
        if ((0, c.isDynamicRoute)(p.pathname) && p.searchParams && m) {
          const A = (0, n.searchParamsToUrlQuery)(p.searchParams), { result: S, params: P } = (0, l.interpolateAs)(p.pathname, p.pathname, A);
          S && (y = (0, r.formatWithValidation)({
            pathname: S,
            hash: p.hash,
            query: (0, o.omit)(A, P)
          }));
        }
        const b = p.origin === _.origin ? p.href.slice(p.origin.length) : p.href;
        return m ? [
          b,
          y || b
        ] : b;
      } catch {
        return m ? [
          f
        ] : f;
      }
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(xt, xt.exports)), xt.exports;
}
var At = { exports: {} }, Mn = {}, Dn = {}, bo;
function Fi() {
  return bo || (bo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = xr();
    function n(r, o) {
      if (!r.startsWith("/") || !o)
        return r;
      const { pathname: i, query: s, hash: a } = (0, t.parsePath)(r);
      return "" + o + i + s + a;
    }
  }(Dn)), Dn;
}
var yo;
function Lc() {
  return yo || (yo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Fi(), n = ji();
    function r(o, i, s, a) {
      if (!i || i === s) return o;
      const c = o.toLowerCase();
      return !a && ((0, n.pathHasPrefix)(c, "/api") || (0, n.pathHasPrefix)(c, "/" + i.toLowerCase())) ? o : (0, t.addPathPrefix)(o, "/" + i);
    }
  }(Mn)), Mn;
}
var _o;
function kc() {
  return _o || (_o = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = tn(), r = function(o) {
      for (var i = arguments.length, s = new Array(i > 1 ? i - 1 : 0), a = 1; a < i; a++)
        s[a - 1] = arguments[a];
      return process.env.__NEXT_I18N_SUPPORT ? (0, n.normalizePathTrailingSlash)(Lc().addLocale(o, ...s)) : o;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(At, At.exports)), At.exports;
}
var jn = {}, We = {};
function Mc(e) {
  return e && e.__esModule ? e : { default: e };
}
We._ = Mc;
var Eo;
function Ui() {
  return Eo || (Eo = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "RouterContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ We._(ce)).default.createContext(null);
    process.env.NODE_ENV !== "production" && (r.displayName = "RouterContext");
  }(jn)), jn;
}
var Ot = { exports: {} }, Tt = { exports: {} }, wo;
function Dc() {
  return wo || (wo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(i, s) {
      for (var a in s) Object.defineProperty(i, a, {
        enumerable: !0,
        get: s[a]
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
      let s = Date.now();
      return self.setTimeout(function() {
        i({
          didTimeout: !1,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - s));
          }
        });
      }, 1);
    }, o = typeof self < "u" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(i) {
      return clearTimeout(i);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Tt, Tt.exports)), Tt.exports;
}
var Ro;
function jc() {
  return Ro || (Ro = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useIntersection", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const n = ce, r = Dc(), o = typeof IntersectionObserver == "function", i = /* @__PURE__ */ new Map(), s = [];
    function a(u) {
      const d = {
        root: u.root || null,
        margin: u.rootMargin || ""
      }, g = s.find((v) => v.root === d.root && v.margin === d.margin);
      let m;
      if (g && (m = i.get(g), m))
        return m;
      const _ = /* @__PURE__ */ new Map(), f = new IntersectionObserver((v) => {
        v.forEach((h) => {
          const E = _.get(h.target), p = h.isIntersecting || h.intersectionRatio > 0;
          E && p && E(p);
        });
      }, u);
      return m = {
        id: d,
        observer: f,
        elements: _
      }, s.push(d), i.set(d, m), m;
    }
    function c(u, d, g) {
      const { id: m, observer: _, elements: f } = a(g);
      return f.set(u, d), _.observe(u), function() {
        if (f.delete(u), _.unobserve(u), f.size === 0) {
          _.disconnect(), i.delete(m);
          const h = s.findIndex((E) => E.root === m.root && E.margin === m.margin);
          h > -1 && s.splice(h, 1);
        }
      };
    }
    function l(u) {
      let { rootRef: d, rootMargin: g, disabled: m } = u;
      const _ = m || !o, [f, v] = (0, n.useState)(!1), h = (0, n.useRef)(null), E = (0, n.useCallback)((y) => {
        h.current = y;
      }, []);
      (0, n.useEffect)(() => {
        if (o) {
          if (_ || f) return;
          const y = h.current;
          if (y && y.tagName)
            return c(y, (A) => A && v(A), {
              root: d == null ? void 0 : d.current,
              rootMargin: g
            });
        } else if (!f) {
          const y = (0, r.requestIdleCallback)(() => v(!0));
          return () => (0, r.cancelIdleCallback)(y);
        }
      }, [
        _,
        g,
        d,
        f,
        h.current
      ]);
      const p = (0, n.useCallback)(() => {
        v(!1);
      }, []);
      return [
        E,
        f,
        p
      ];
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ot, Ot.exports)), Ot.exports;
}
var Nt = { exports: {} }, It = { exports: {} }, Hn = {}, So;
function Hc() {
  return So || (So = 1, function(e) {
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
      i || (i = o.map((u) => u.toLowerCase()), t.set(o, i));
      let s;
      const a = r.split("/", 2);
      if (!a[1]) return {
        pathname: r
      };
      const c = a[1].toLowerCase(), l = i.indexOf(c);
      return l < 0 ? {
        pathname: r
      } : (s = o[l], r = r.slice(s.length + 1) || "/", {
        pathname: r,
        detectedLocale: s
      });
    }
  }(Hn)), Hn;
}
var xo;
function $c() {
  return xo || (xo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (r, o) => process.env.__NEXT_I18N_SUPPORT ? Hc().normalizeLocalePath(r, o) : {
      pathname: r,
      detectedLocale: void 0
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(It, It.exports)), It.exports;
}
var Lt = { exports: {} }, $n = {}, Co;
function Fc() {
  return Co || (Co = 1, function(e) {
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
        for (const a of n) {
          var i, s;
          const c = (i = a.domain) == null ? void 0 : i.split(":", 1)[0].toLowerCase();
          if (r === c || o === a.defaultLocale.toLowerCase() || (s = a.locales) != null && s.some((l) => l.toLowerCase() === o))
            return a;
        }
      }
    }
  }($n)), $n;
}
var Po;
function Uc() {
  return Po || (Po = 1, function(e, t) {
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
        return Fc().detectDomainLocale(...o);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Lt, Lt.exports)), Lt.exports;
}
var Ao;
function Bc() {
  return Ao || (Ao = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "getDomainLocale", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = tn(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(i, s, a, c) {
      if (process.env.__NEXT_I18N_SUPPORT) {
        const l = $c().normalizeLocalePath, u = Uc().detectDomainLocale, d = s || l(i, a).detectedLocale, g = u(c, void 0, d);
        if (g) {
          const m = "http" + (g.http ? "" : "s") + "://", _ = d === g.defaultLocale ? "" : "/" + d;
          return "" + m + g.domain + (0, n.normalizePathTrailingSlash)("" + r + _ + i);
        }
        return !1;
      } else
        return !1;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Nt, Nt.exports)), Nt.exports;
}
var kt = { exports: {} }, Oo;
function zc() {
  return Oo || (Oo = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addBasePath", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = Fi(), r = tn(), o = process.env.__NEXT_ROUTER_BASEPATH || "";
    function i(s, a) {
      return (0, r.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !a ? s : (0, n.addPathPrefix)(s, o));
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(kt, kt.exports)), kt.exports;
}
var Mt = { exports: {} }, To;
function Bi() {
  return To || (To = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useMergedRef", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = ce;
    function r(i, s) {
      const a = (0, n.useRef)(null), c = (0, n.useRef)(null);
      return (0, n.useCallback)((l) => {
        if (l === null) {
          const u = a.current;
          u && (a.current = null, u());
          const d = c.current;
          d && (c.current = null, d());
        } else
          i && (a.current = o(i, l)), s && (c.current = o(s, l));
      }, [
        i,
        s
      ]);
    }
    function o(i, s) {
      if (typeof i == "function") {
        const a = i(s);
        return typeof a == "function" ? a : () => i(null);
      } else
        return i.current = s, () => {
          i.current = null;
        };
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Mt, Mt.exports)), Mt.exports;
}
var Fn = {}, No;
function Vc() {
  return No || (No = 1, function(e) {
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
  }(Fn)), Fn;
}
(function(e, t) {
  "use client";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(O, N) {
    for (var M in N) Object.defineProperty(O, M, {
      enumerable: !0,
      get: N[M]
    });
  }
  n(t, {
    default: function() {
      return k;
    },
    useLinkStatus: function() {
      return P;
    }
  });
  const r = _t, o = Rr, i = /* @__PURE__ */ r._(ce), s = Ic(), a = Hi(), c = Mi(), l = en(), u = kc(), d = Ui(), g = jc(), m = Bc(), _ = zc(), f = Bi(), v = Vc(), h = /* @__PURE__ */ new Set();
  function E(O, N, M, U) {
    if (!(typeof window > "u") && (0, a.isLocalURL)(N)) {
      if (!U.bypassPrefetchedCheck) {
        const D = (
          // Let the link's locale prop override the default router locale.
          typeof U.locale < "u" ? U.locale : "locale" in O ? O.locale : void 0
        ), $ = N + "%" + M + "%" + D;
        if (h.has($))
          return;
        h.add($);
      }
      O.prefetch(N, M, U).catch((D) => {
        if (process.env.NODE_ENV !== "production")
          throw D;
      });
    }
  }
  function p(O) {
    const M = O.currentTarget.getAttribute("target");
    return M && M !== "_self" || O.metaKey || O.ctrlKey || O.shiftKey || O.altKey || // triggers resource download
    O.nativeEvent && O.nativeEvent.which === 2;
  }
  function y(O, N, M, U, D, $, j, K, T) {
    const { nodeName: B } = O.currentTarget;
    if (B.toUpperCase() === "A" && p(O) || O.currentTarget.hasAttribute("download"))
      return;
    if (!(0, a.isLocalURL)(M)) {
      D && (O.preventDefault(), location.replace(M));
      return;
    }
    O.preventDefault(), (() => {
      if (T) {
        let ne = !1;
        if (T({
          preventDefault: () => {
            ne = !0;
          }
        }), ne)
          return;
      }
      const re = j ?? !0;
      "beforePopState" in N ? N[D ? "replace" : "push"](M, U, {
        shallow: $,
        locale: K,
        scroll: re
      }) : N[D ? "replace" : "push"](U || M, {
        scroll: re
      });
    })();
  }
  function b(O) {
    return typeof O == "string" ? O : (0, c.formatUrl)(O);
  }
  const A = /* @__PURE__ */ i.default.forwardRef(function(N, M) {
    let U;
    const { href: D, as: $, children: j, prefetch: K = null, passHref: T, replace: B, shallow: J, scroll: ae, locale: re, onClick: ne, onNavigate: Y, onMouseEnter: le, onTouchStart: oe, legacyBehavior: R = !1, ...Q } = N;
    U = j, R && (typeof U == "string" || typeof U == "number") && (U = /* @__PURE__ */ (0, o.jsx)("a", {
      children: U
    }));
    const V = i.default.useContext(d.RouterContext), W = K !== !1;
    if (process.env.NODE_ENV !== "production") {
      let ie = function(L) {
        return Object.defineProperty(new Error("Failed prop type: The prop `" + L.key + "` expects a " + L.expected + " in `<Link>`, but got `" + L.actual + "` instead." + (typeof window < "u" ? `
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
          value: "E319",
          enumerable: !1,
          configurable: !0
        });
      };
      Object.keys({
        href: !0
      }).forEach((L) => {
        if (L === "href" && (N[L] == null || typeof N[L] != "string" && typeof N[L] != "object"))
          throw ie({
            key: L,
            expected: "`string` or `object`",
            actual: N[L] === null ? "null" : typeof N[L]
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
      }).forEach((L) => {
        const ee = typeof N[L];
        if (L === "as") {
          if (N[L] && ee !== "string" && ee !== "object")
            throw ie({
              key: L,
              expected: "`string` or `object`",
              actual: ee
            });
        } else if (L === "locale") {
          if (N[L] && ee !== "string")
            throw ie({
              key: L,
              expected: "`string`",
              actual: ee
            });
        } else if (L === "onClick" || L === "onMouseEnter" || L === "onTouchStart" || L === "onNavigate") {
          if (N[L] && ee !== "function")
            throw ie({
              key: L,
              expected: "`function`",
              actual: ee
            });
        } else if ((L === "replace" || L === "scroll" || L === "shallow" || L === "passHref" || L === "prefetch" || L === "legacyBehavior") && N[L] != null && ee !== "boolean")
          throw ie({
            key: L,
            expected: "`boolean`",
            actual: ee
          });
      });
    }
    const { href: x, as: C } = i.default.useMemo(() => {
      if (!V) {
        const F = b(D);
        return {
          href: F,
          as: $ ? b($) : F
        };
      }
      const [ie, he] = (0, s.resolveHref)(V, D, !0);
      return {
        href: ie,
        as: $ ? (0, s.resolveHref)(V, $) : he || ie
      };
    }, [
      V,
      D,
      $
    ]), ue = i.default.useRef(x), q = i.default.useRef(C);
    let z;
    if (R)
      if (process.env.NODE_ENV === "development") {
        ne && console.warn('"onClick" was passed to <Link> with `href` of `' + D + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link'), le && console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + D + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
        try {
          z = i.default.Children.only(U);
        } catch {
          throw U ? Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + D + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window < "u" ? ` 
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
            value: "E266",
            enumerable: !1,
            configurable: !0
          }) : Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + D + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
            value: "E320",
            enumerable: !1,
            configurable: !0
          });
        }
      } else
        z = i.default.Children.only(U);
    else if (process.env.NODE_ENV === "development" && (U == null ? void 0 : U.type) === "a")
      throw Object.defineProperty(new Error(`Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor`), "__NEXT_ERROR_CODE", {
        value: "E209",
        enumerable: !1,
        configurable: !0
      });
    const Z = R ? z && typeof z == "object" && z.ref : M, [ve, me, de] = (0, g.useIntersection)({
      rootMargin: "200px"
    }), Re = i.default.useCallback((ie) => {
      (q.current !== C || ue.current !== x) && (de(), q.current = C, ue.current = x), ve(ie);
    }, [
      C,
      x,
      de,
      ve
    ]), ge = (0, f.useMergedRef)(Re, Z);
    i.default.useEffect(() => {
      process.env.NODE_ENV === "production" && V && (!me || !W || E(V, x, C, {
        locale: re
      }));
    }, [
      C,
      x,
      me,
      re,
      W,
      V == null ? void 0 : V.locale,
      V
    ]);
    const te = {
      ref: ge,
      onClick(ie) {
        if (process.env.NODE_ENV !== "production" && !ie)
          throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
            value: "E312",
            enumerable: !1,
            configurable: !0
          });
        !R && typeof ne == "function" && ne(ie), R && z.props && typeof z.props.onClick == "function" && z.props.onClick(ie), V && (ie.defaultPrevented || y(ie, V, x, C, B, J, ae, re, Y));
      },
      onMouseEnter(ie) {
        !R && typeof le == "function" && le(ie), R && z.props && typeof z.props.onMouseEnter == "function" && z.props.onMouseEnter(ie), V && E(V, x, C, {
          locale: re,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      },
      onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? void 0 : function(he) {
        !R && typeof oe == "function" && oe(he), R && z.props && typeof z.props.onTouchStart == "function" && z.props.onTouchStart(he), V && E(V, x, C, {
          locale: re,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      }
    };
    if ((0, l.isAbsoluteUrl)(C))
      te.href = C;
    else if (!R || T || z.type === "a" && !("href" in z.props)) {
      const ie = typeof re < "u" ? re : V == null ? void 0 : V.locale, he = (V == null ? void 0 : V.isLocaleDomain) && (0, m.getDomainLocale)(C, ie, V == null ? void 0 : V.locales, V == null ? void 0 : V.domainLocales);
      te.href = he || (0, _.addBasePath)((0, u.addLocale)(C, ie, V == null ? void 0 : V.defaultLocale));
    }
    return R ? (process.env.NODE_ENV === "development" && (0, v.errorOnce)(`\`legacyBehavior\` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:

npx @next/codemod@latest new-link .

Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components`), /* @__PURE__ */ i.default.cloneElement(z, te)) : /* @__PURE__ */ (0, o.jsx)("a", {
      ...Q,
      ...te,
      children: U
    });
  }), S = /* @__PURE__ */ (0, i.createContext)({
    // We do not support link status in the Pages Router, so we always return false
    pending: !1
  }), P = () => (0, i.useContext)(S), k = A;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(ur, ur.exports);
var qc = ur.exports, Wc = qc;
const zi = /* @__PURE__ */ Ii(Wc), Xc = Zt(
  ({
    type: e = "button",
    variant: t,
    size: n,
    children: r,
    isLoading: o = !1,
    isLeftIconVisible: i = !1,
    isRightIconVisible: s = !1,
    icon: a,
    isDisabled: c = !1,
    isIconOnly: l = !1,
    ariaLabel: u,
    href: d,
    className: g,
    onClick: m,
    ..._
  }, f) => {
    const v = a ? la(
      a,
      {
        className: "w-[1rem] h-[1rem]",
        "data-testid": "icon"
      }
    ) : /* @__PURE__ */ I(vc, { className: "h-[1rem] w-[1rem]", "data-testid": "icon" }), h = /* @__PURE__ */ Ce(Qt, { children: [
      i && !o && v,
      o && /* @__PURE__ */ I(mc, { className: "h-[1rem] w-[1rem] animate-spin", "data-testid": "loading-spinner" }),
      l && !o && v,
      !l && r,
      !l && !r && o && "Loading",
      s && !o && v
    ] }), E = `transition-all duration-300 ease-in-out ${c ? "opacity-50 cursor-not-allowed" : "hover:shadow-sneob dark:hover:shadow-sneobw focus:shadow-none"} ${g}`;
    return d ? /^https?:\/\//.test(d) ? /* @__PURE__ */ I("a", { href: d, target: "_blank", rel: "noopener noreferrer", "aria-label": u, children: /* @__PURE__ */ I(
      Bt,
      {
        type: e,
        variant: t,
        size: n,
        disabled: c,
        "aria-label": u,
        className: E,
        onClick: m,
        role: "button",
        ref: f,
        ..._,
        children: h
      }
    ) }) : /* @__PURE__ */ I(zi, { href: c ? "" : d, passHref: !0, "aria-label": u, children: /* @__PURE__ */ I(
      Bt,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": u,
        className: E,
        onClick: m,
        role: "button",
        ref: f,
        ..._,
        children: h
      }
    ) }) : /* @__PURE__ */ I(
      Bt,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": u,
        className: E,
        onClick: m,
        role: "button",
        ref: f,
        ..._,
        children: h
      }
    );
  }
);
Xc.displayName = "CustomButton";
function Io({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ I(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: Pe(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...n
    }
  );
}
var Gc = [
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
], ye = Gc.reduce((e, t) => {
  const n = /* @__PURE__ */ vt(`Primitive.${t}`), r = w.forwardRef((o, i) => {
    const { asChild: s, ...a } = o, c = s ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ I(c, { ...a, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Kc(e, t) {
  e && Jt.flushSync(() => e.dispatchEvent(t));
}
var Yc = "Label", Vi = w.forwardRef((e, t) => /* @__PURE__ */ I(
  ye.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
Vi.displayName = Yc;
var Qc = Vi;
function Zc({ className: e, ...t }) {
  return /* @__PURE__ */ I(
    Qc,
    {
      "data-slot": "label",
      className: Pe(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function Lo(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function _e(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Cr(e, t = []) {
  let n = [];
  function r(i, s) {
    const a = w.createContext(s), c = n.length;
    n = [...n, s];
    const l = (d) => {
      var h;
      const { scope: g, children: m, ..._ } = d, f = ((h = g == null ? void 0 : g[e]) == null ? void 0 : h[c]) || a, v = w.useMemo(() => _, Object.values(_));
      return /* @__PURE__ */ I(f.Provider, { value: v, children: m });
    };
    l.displayName = i + "Provider";
    function u(d, g) {
      var f;
      const m = ((f = g == null ? void 0 : g[e]) == null ? void 0 : f[c]) || a, _ = w.useContext(m);
      if (_) return _;
      if (s !== void 0) return s;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return [l, u];
  }
  const o = () => {
    const i = n.map((s) => w.createContext(s));
    return function(a) {
      const c = (a == null ? void 0 : a[e]) || i;
      return w.useMemo(
        () => ({ [`__scope${e}`]: { ...a, [e]: c } }),
        [a, c]
      );
    };
  };
  return o.scopeName = e, [r, Jc(o, ...t)];
}
function Jc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(i) {
      const s = r.reduce((a, { useScope: c, scopeName: l }) => {
        const d = c(i)[`__scope${l}`];
        return { ...a, ...d };
      }, {});
      return w.useMemo(() => ({ [`__scope${t.scopeName}`]: s }), [s]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function el(e) {
  const t = e + "CollectionProvider", [n, r] = Cr(t), [o, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = (f) => {
    const { scope: v, children: h } = f, E = ce.useRef(null), p = ce.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ I(o, { scope: v, itemMap: p, collectionRef: E, children: h });
  };
  s.displayName = t;
  const a = e + "CollectionSlot", c = /* @__PURE__ */ vt(a), l = ce.forwardRef(
    (f, v) => {
      const { scope: h, children: E } = f, p = i(a, h), y = we(v, p.collectionRef);
      return /* @__PURE__ */ I(c, { ref: y, children: E });
    }
  );
  l.displayName = a;
  const u = e + "CollectionItemSlot", d = "data-radix-collection-item", g = /* @__PURE__ */ vt(u), m = ce.forwardRef(
    (f, v) => {
      const { scope: h, children: E, ...p } = f, y = ce.useRef(null), b = we(v, y), A = i(u, h);
      return ce.useEffect(() => (A.itemMap.set(y, { ref: y, ...p }), () => void A.itemMap.delete(y))), /* @__PURE__ */ I(g, { [d]: "", ref: b, children: E });
    }
  );
  m.displayName = u;
  function _(f) {
    const v = i(e + "CollectionConsumer", f);
    return ce.useCallback(() => {
      const E = v.collectionRef.current;
      if (!E) return [];
      const p = Array.from(E.querySelectorAll(`[${d}]`));
      return Array.from(v.itemMap.values()).sort(
        (A, S) => p.indexOf(A.ref.current) - p.indexOf(S.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: s, Slot: l, ItemSlot: m },
    _,
    r
  ];
}
var tl = w.createContext(void 0);
function nl(e) {
  const t = w.useContext(tl);
  return e || t || "ltr";
}
function Ye(e) {
  const t = w.useRef(e);
  return w.useEffect(() => {
    t.current = e;
  }), w.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function rl(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ye(e);
  w.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var ol = "DismissableLayer", fr = "dismissableLayer.update", il = "dismissableLayer.pointerDownOutside", sl = "dismissableLayer.focusOutside", ko, qi = w.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Wi = w.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: i,
      onInteractOutside: s,
      onDismiss: a,
      ...c
    } = e, l = w.useContext(qi), [u, d] = w.useState(null), g = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, m] = w.useState({}), _ = we(t, (S) => d(S)), f = Array.from(l.layers), [v] = [...l.layersWithOutsidePointerEventsDisabled].slice(-1), h = f.indexOf(v), E = u ? f.indexOf(u) : -1, p = l.layersWithOutsidePointerEventsDisabled.size > 0, y = E >= h, b = ll((S) => {
      const P = S.target, k = [...l.branches].some((O) => O.contains(P));
      !y || k || (o == null || o(S), s == null || s(S), S.defaultPrevented || a == null || a());
    }, g), A = ul((S) => {
      const P = S.target;
      [...l.branches].some((O) => O.contains(P)) || (i == null || i(S), s == null || s(S), S.defaultPrevented || a == null || a());
    }, g);
    return rl((S) => {
      E === l.layers.size - 1 && (r == null || r(S), !S.defaultPrevented && a && (S.preventDefault(), a()));
    }, g), w.useEffect(() => {
      if (u)
        return n && (l.layersWithOutsidePointerEventsDisabled.size === 0 && (ko = g.body.style.pointerEvents, g.body.style.pointerEvents = "none"), l.layersWithOutsidePointerEventsDisabled.add(u)), l.layers.add(u), Mo(), () => {
          n && l.layersWithOutsidePointerEventsDisabled.size === 1 && (g.body.style.pointerEvents = ko);
        };
    }, [u, g, n, l]), w.useEffect(() => () => {
      u && (l.layers.delete(u), l.layersWithOutsidePointerEventsDisabled.delete(u), Mo());
    }, [u, l]), w.useEffect(() => {
      const S = () => m({});
      return document.addEventListener(fr, S), () => document.removeEventListener(fr, S);
    }, []), /* @__PURE__ */ I(
      ye.div,
      {
        ...c,
        ref: _,
        style: {
          pointerEvents: p ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: _e(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: _e(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: _e(
          e.onPointerDownCapture,
          b.onPointerDownCapture
        )
      }
    );
  }
);
Wi.displayName = ol;
var al = "DismissableLayerBranch", cl = w.forwardRef((e, t) => {
  const n = w.useContext(qi), r = w.useRef(null), o = we(t, r);
  return w.useEffect(() => {
    const i = r.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ I(ye.div, { ...e, ref: o });
});
cl.displayName = al;
function ll(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ye(e), r = w.useRef(!1), o = w.useRef(() => {
  });
  return w.useEffect(() => {
    const i = (a) => {
      if (a.target && !r.current) {
        let c = function() {
          Xi(
            il,
            n,
            l,
            { discrete: !0 }
          );
        };
        const l = { originalEvent: a };
        a.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = c, t.addEventListener("click", o.current, { once: !0 })) : c();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, s = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(s), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function ul(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ye(e), r = w.useRef(!1);
  return w.useEffect(() => {
    const o = (i) => {
      i.target && !r.current && Xi(sl, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Mo() {
  const e = new CustomEvent(fr);
  document.dispatchEvent(e);
}
function Xi(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Kc(o, i) : o.dispatchEvent(i);
}
var Un = 0;
function fl() {
  w.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Do()), document.body.insertAdjacentElement("beforeend", e[1] ?? Do()), Un++, () => {
      Un === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Un--;
    };
  }, []);
}
function Do() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Bn = "focusScope.autoFocusOnMount", zn = "focusScope.autoFocusOnUnmount", jo = { bubbles: !1, cancelable: !0 }, dl = "FocusScope", Gi = w.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: i,
    ...s
  } = e, [a, c] = w.useState(null), l = Ye(o), u = Ye(i), d = w.useRef(null), g = we(t, (f) => c(f)), m = w.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  w.useEffect(() => {
    if (r) {
      let f = function(p) {
        if (m.paused || !a) return;
        const y = p.target;
        a.contains(y) ? d.current = y : Be(d.current, { select: !0 });
      }, v = function(p) {
        if (m.paused || !a) return;
        const y = p.relatedTarget;
        y !== null && (a.contains(y) || Be(d.current, { select: !0 }));
      }, h = function(p) {
        if (document.activeElement === document.body)
          for (const b of p)
            b.removedNodes.length > 0 && Be(a);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", v);
      const E = new MutationObserver(h);
      return a && E.observe(a, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", v), E.disconnect();
      };
    }
  }, [r, a, m.paused]), w.useEffect(() => {
    if (a) {
      $o.add(m);
      const f = document.activeElement;
      if (!a.contains(f)) {
        const h = new CustomEvent(Bn, jo);
        a.addEventListener(Bn, l), a.dispatchEvent(h), h.defaultPrevented || (pl(bl(Ki(a)), { select: !0 }), document.activeElement === f && Be(a));
      }
      return () => {
        a.removeEventListener(Bn, l), setTimeout(() => {
          const h = new CustomEvent(zn, jo);
          a.addEventListener(zn, u), a.dispatchEvent(h), h.defaultPrevented || Be(f ?? document.body, { select: !0 }), a.removeEventListener(zn, u), $o.remove(m);
        }, 0);
      };
    }
  }, [a, l, u, m]);
  const _ = w.useCallback(
    (f) => {
      if (!n && !r || m.paused) return;
      const v = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, h = document.activeElement;
      if (v && h) {
        const E = f.currentTarget, [p, y] = hl(E);
        p && y ? !f.shiftKey && h === y ? (f.preventDefault(), n && Be(p, { select: !0 })) : f.shiftKey && h === p && (f.preventDefault(), n && Be(y, { select: !0 })) : h === E && f.preventDefault();
      }
    },
    [n, r, m.paused]
  );
  return /* @__PURE__ */ I(ye.div, { tabIndex: -1, ...s, ref: g, onKeyDown: _ });
});
Gi.displayName = dl;
function pl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Be(r, { select: t }), document.activeElement !== n) return;
}
function hl(e) {
  const t = Ki(e), n = Ho(t, e), r = Ho(t.reverse(), e);
  return [n, r];
}
function Ki(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ho(e, t) {
  for (const n of e)
    if (!ml(n, { upTo: t })) return n;
}
function ml(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function gl(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Be(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && gl(e) && t && e.select();
  }
}
var $o = vl();
function vl() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Fo(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Fo(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Fo(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function bl(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ae = globalThis != null && globalThis.document ? w.useLayoutEffect : () => {
}, yl = w[" useId ".trim().toString()] || (() => {
}), _l = 0;
function Pr(e) {
  const [t, n] = w.useState(yl());
  return Ae(() => {
    n((r) => r ?? String(_l++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const El = ["top", "right", "bottom", "left"], ze = Math.min, Oe = Math.max, Wt = Math.round, Dt = Math.floor, Me = (e) => ({
  x: e,
  y: e
}), wl = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Rl = {
  start: "end",
  end: "start"
};
function dr(e, t, n) {
  return Oe(e, ze(t, n));
}
function $e(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Fe(e) {
  return e.split("-")[0];
}
function ft(e) {
  return e.split("-")[1];
}
function Ar(e) {
  return e === "x" ? "y" : "x";
}
function Or(e) {
  return e === "y" ? "height" : "width";
}
function Ve(e) {
  return ["top", "bottom"].includes(Fe(e)) ? "y" : "x";
}
function Tr(e) {
  return Ar(Ve(e));
}
function Sl(e, t, n) {
  n === void 0 && (n = !1);
  const r = ft(e), o = Tr(e), i = Or(o);
  let s = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (s = Xt(s)), [s, Xt(s)];
}
function xl(e) {
  const t = Xt(e);
  return [pr(e), t, pr(t)];
}
function pr(e) {
  return e.replace(/start|end/g, (t) => Rl[t]);
}
function Cl(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], i = ["top", "bottom"], s = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? i : s;
    default:
      return [];
  }
}
function Pl(e, t, n, r) {
  const o = ft(e);
  let i = Cl(Fe(e), n === "start", r);
  return o && (i = i.map((s) => s + "-" + o), t && (i = i.concat(i.map(pr)))), i;
}
function Xt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => wl[t]);
}
function Al(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Yi(e) {
  return typeof e != "number" ? Al(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Gt(e) {
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
function Uo(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = Ve(t), s = Tr(t), a = Or(s), c = Fe(t), l = i === "y", u = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, g = r[a] / 2 - o[a] / 2;
  let m;
  switch (c) {
    case "top":
      m = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      m = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      m = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      m = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      m = {
        x: r.x,
        y: r.y
      };
  }
  switch (ft(t)) {
    case "start":
      m[s] -= g * (n && l ? -1 : 1);
      break;
    case "end":
      m[s] += g * (n && l ? -1 : 1);
      break;
  }
  return m;
}
const Ol = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: s
  } = n, a = i.filter(Boolean), c = await (s.isRTL == null ? void 0 : s.isRTL(t));
  let l = await s.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: d
  } = Uo(l, r, c), g = r, m = {}, _ = 0;
  for (let f = 0; f < a.length; f++) {
    const {
      name: v,
      fn: h
    } = a[f], {
      x: E,
      y: p,
      data: y,
      reset: b
    } = await h({
      x: u,
      y: d,
      initialPlacement: r,
      placement: g,
      strategy: o,
      middlewareData: m,
      rects: l,
      platform: s,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = E ?? u, d = p ?? d, m = {
      ...m,
      [v]: {
        ...m[v],
        ...y
      }
    }, b && _ <= 50 && (_++, typeof b == "object" && (b.placement && (g = b.placement), b.rects && (l = b.rects === !0 ? await s.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : b.rects), {
      x: u,
      y: d
    } = Uo(l, g, c)), f = -1);
  }
  return {
    x: u,
    y: d,
    placement: g,
    strategy: o,
    middlewareData: m
  };
};
async function bt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: i,
    rects: s,
    elements: a,
    strategy: c
  } = e, {
    boundary: l = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: d = "floating",
    altBoundary: g = !1,
    padding: m = 0
  } = $e(t, e), _ = Yi(m), v = a[g ? d === "floating" ? "reference" : "floating" : d], h = Gt(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(v))) == null || n ? v : v.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(a.floating)),
    boundary: l,
    rootBoundary: u,
    strategy: c
  })), E = d === "floating" ? {
    x: r,
    y: o,
    width: s.floating.width,
    height: s.floating.height
  } : s.reference, p = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(a.floating)), y = await (i.isElement == null ? void 0 : i.isElement(p)) ? await (i.getScale == null ? void 0 : i.getScale(p)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, b = Gt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: a,
    rect: E,
    offsetParent: p,
    strategy: c
  }) : E);
  return {
    top: (h.top - b.top + _.top) / y.y,
    bottom: (b.bottom - h.bottom + _.bottom) / y.y,
    left: (h.left - b.left + _.left) / y.x,
    right: (b.right - h.right + _.right) / y.x
  };
}
const Tl = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: i,
      platform: s,
      elements: a,
      middlewareData: c
    } = t, {
      element: l,
      padding: u = 0
    } = $e(e, t) || {};
    if (l == null)
      return {};
    const d = Yi(u), g = {
      x: n,
      y: r
    }, m = Tr(o), _ = Or(m), f = await s.getDimensions(l), v = m === "y", h = v ? "top" : "left", E = v ? "bottom" : "right", p = v ? "clientHeight" : "clientWidth", y = i.reference[_] + i.reference[m] - g[m] - i.floating[_], b = g[m] - i.reference[m], A = await (s.getOffsetParent == null ? void 0 : s.getOffsetParent(l));
    let S = A ? A[p] : 0;
    (!S || !await (s.isElement == null ? void 0 : s.isElement(A))) && (S = a.floating[p] || i.floating[_]);
    const P = y / 2 - b / 2, k = S / 2 - f[_] / 2 - 1, O = ze(d[h], k), N = ze(d[E], k), M = O, U = S - f[_] - N, D = S / 2 - f[_] / 2 + P, $ = dr(M, D, U), j = !c.arrow && ft(o) != null && D !== $ && i.reference[_] / 2 - (D < M ? O : N) - f[_] / 2 < 0, K = j ? D < M ? D - M : D - U : 0;
    return {
      [m]: g[m] + K,
      data: {
        [m]: $,
        centerOffset: D - $ - K,
        ...j && {
          alignmentOffset: K
        }
      },
      reset: j
    };
  }
}), Nl = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: i,
        rects: s,
        initialPlacement: a,
        platform: c,
        elements: l
      } = t, {
        mainAxis: u = !0,
        crossAxis: d = !0,
        fallbackPlacements: g,
        fallbackStrategy: m = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: f = !0,
        ...v
      } = $e(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const h = Fe(o), E = Ve(a), p = Fe(a) === a, y = await (c.isRTL == null ? void 0 : c.isRTL(l.floating)), b = g || (p || !f ? [Xt(a)] : xl(a)), A = _ !== "none";
      !g && A && b.push(...Pl(a, f, _, y));
      const S = [a, ...b], P = await bt(t, v), k = [];
      let O = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (u && k.push(P[h]), d) {
        const D = Sl(o, s, y);
        k.push(P[D[0]], P[D[1]]);
      }
      if (O = [...O, {
        placement: o,
        overflows: k
      }], !k.every((D) => D <= 0)) {
        var N, M;
        const D = (((N = i.flip) == null ? void 0 : N.index) || 0) + 1, $ = S[D];
        if ($)
          return {
            data: {
              index: D,
              overflows: O
            },
            reset: {
              placement: $
            }
          };
        let j = (M = O.filter((K) => K.overflows[0] <= 0).sort((K, T) => K.overflows[1] - T.overflows[1])[0]) == null ? void 0 : M.placement;
        if (!j)
          switch (m) {
            case "bestFit": {
              var U;
              const K = (U = O.filter((T) => {
                if (A) {
                  const B = Ve(T.placement);
                  return B === E || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  B === "y";
                }
                return !0;
              }).map((T) => [T.placement, T.overflows.filter((B) => B > 0).reduce((B, J) => B + J, 0)]).sort((T, B) => T[1] - B[1])[0]) == null ? void 0 : U[0];
              K && (j = K);
              break;
            }
            case "initialPlacement":
              j = a;
              break;
          }
        if (o !== j)
          return {
            reset: {
              placement: j
            }
          };
      }
      return {};
    }
  };
};
function Bo(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function zo(e) {
  return El.some((t) => e[t] >= 0);
}
const Il = function(e) {
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
          const i = await bt(t, {
            ...o,
            elementContext: "reference"
          }), s = Bo(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: s,
              referenceHidden: zo(s)
            }
          };
        }
        case "escaped": {
          const i = await bt(t, {
            ...o,
            altBoundary: !0
          }), s = Bo(i, n.floating);
          return {
            data: {
              escapedOffsets: s,
              escaped: zo(s)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function Ll(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), s = Fe(n), a = ft(n), c = Ve(n) === "y", l = ["left", "top"].includes(s) ? -1 : 1, u = i && c ? -1 : 1, d = $e(t, e);
  let {
    mainAxis: g,
    crossAxis: m,
    alignmentAxis: _
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return a && typeof _ == "number" && (m = a === "end" ? _ * -1 : _), c ? {
    x: m * u,
    y: g * l
  } : {
    x: g * l,
    y: m * u
  };
}
const kl = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: i,
        placement: s,
        middlewareData: a
      } = t, c = await Ll(t, e);
      return s === ((n = a.offset) == null ? void 0 : n.placement) && (r = a.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: i + c.y,
        data: {
          ...c,
          placement: s
        }
      };
    }
  };
}, Ml = function(e) {
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
        crossAxis: s = !1,
        limiter: a = {
          fn: (v) => {
            let {
              x: h,
              y: E
            } = v;
            return {
              x: h,
              y: E
            };
          }
        },
        ...c
      } = $e(e, t), l = {
        x: n,
        y: r
      }, u = await bt(t, c), d = Ve(Fe(o)), g = Ar(d);
      let m = l[g], _ = l[d];
      if (i) {
        const v = g === "y" ? "top" : "left", h = g === "y" ? "bottom" : "right", E = m + u[v], p = m - u[h];
        m = dr(E, m, p);
      }
      if (s) {
        const v = d === "y" ? "top" : "left", h = d === "y" ? "bottom" : "right", E = _ + u[v], p = _ - u[h];
        _ = dr(E, _, p);
      }
      const f = a.fn({
        ...t,
        [g]: m,
        [d]: _
      });
      return {
        ...f,
        data: {
          x: f.x - n,
          y: f.y - r,
          enabled: {
            [g]: i,
            [d]: s
          }
        }
      };
    }
  };
}, Dl = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: i,
        middlewareData: s
      } = t, {
        offset: a = 0,
        mainAxis: c = !0,
        crossAxis: l = !0
      } = $e(e, t), u = {
        x: n,
        y: r
      }, d = Ve(o), g = Ar(d);
      let m = u[g], _ = u[d];
      const f = $e(a, t), v = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...f
      };
      if (c) {
        const p = g === "y" ? "height" : "width", y = i.reference[g] - i.floating[p] + v.mainAxis, b = i.reference[g] + i.reference[p] - v.mainAxis;
        m < y ? m = y : m > b && (m = b);
      }
      if (l) {
        var h, E;
        const p = g === "y" ? "width" : "height", y = ["top", "left"].includes(Fe(o)), b = i.reference[d] - i.floating[p] + (y && ((h = s.offset) == null ? void 0 : h[d]) || 0) + (y ? 0 : v.crossAxis), A = i.reference[d] + i.reference[p] + (y ? 0 : ((E = s.offset) == null ? void 0 : E[d]) || 0) - (y ? v.crossAxis : 0);
        _ < b ? _ = b : _ > A && (_ = A);
      }
      return {
        [g]: m,
        [d]: _
      };
    }
  };
}, jl = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: i,
        platform: s,
        elements: a
      } = t, {
        apply: c = () => {
        },
        ...l
      } = $e(e, t), u = await bt(t, l), d = Fe(o), g = ft(o), m = Ve(o) === "y", {
        width: _,
        height: f
      } = i.floating;
      let v, h;
      d === "top" || d === "bottom" ? (v = d, h = g === (await (s.isRTL == null ? void 0 : s.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = d, v = g === "end" ? "top" : "bottom");
      const E = f - u.top - u.bottom, p = _ - u.left - u.right, y = ze(f - u[v], E), b = ze(_ - u[h], p), A = !t.middlewareData.shift;
      let S = y, P = b;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (P = p), (r = t.middlewareData.shift) != null && r.enabled.y && (S = E), A && !g) {
        const O = Oe(u.left, 0), N = Oe(u.right, 0), M = Oe(u.top, 0), U = Oe(u.bottom, 0);
        m ? P = _ - 2 * (O !== 0 || N !== 0 ? O + N : Oe(u.left, u.right)) : S = f - 2 * (M !== 0 || U !== 0 ? M + U : Oe(u.top, u.bottom));
      }
      await c({
        ...t,
        availableWidth: P,
        availableHeight: S
      });
      const k = await s.getDimensions(a.floating);
      return _ !== k.width || f !== k.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function nn() {
  return typeof window < "u";
}
function dt(e) {
  return Qi(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Te(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function je(e) {
  var t;
  return (t = (Qi(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Qi(e) {
  return nn() ? e instanceof Node || e instanceof Te(e).Node : !1;
}
function Ie(e) {
  return nn() ? e instanceof Element || e instanceof Te(e).Element : !1;
}
function De(e) {
  return nn() ? e instanceof HTMLElement || e instanceof Te(e).HTMLElement : !1;
}
function Vo(e) {
  return !nn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Te(e).ShadowRoot;
}
function Et(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = Le(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function Hl(e) {
  return ["table", "td", "th"].includes(dt(e));
}
function rn(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Nr(e) {
  const t = Ir(), n = Ie(e) ? Le(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function $l(e) {
  let t = qe(e);
  for (; De(t) && !ct(t); ) {
    if (Nr(t))
      return t;
    if (rn(t))
      return null;
    t = qe(t);
  }
  return null;
}
function Ir() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ct(e) {
  return ["html", "body", "#document"].includes(dt(e));
}
function Le(e) {
  return Te(e).getComputedStyle(e);
}
function on(e) {
  return Ie(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function qe(e) {
  if (dt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Vo(e) && e.host || // Fallback.
    je(e)
  );
  return Vo(t) ? t.host : t;
}
function Zi(e) {
  const t = qe(e);
  return ct(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : De(t) && Et(t) ? t : Zi(t);
}
function yt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Zi(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), s = Te(o);
  if (i) {
    const a = hr(s);
    return t.concat(s, s.visualViewport || [], Et(o) ? o : [], a && n ? yt(a) : []);
  }
  return t.concat(o, yt(o, [], n));
}
function hr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Ji(e) {
  const t = Le(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = De(e), i = o ? e.offsetWidth : n, s = o ? e.offsetHeight : r, a = Wt(n) !== i || Wt(r) !== s;
  return a && (n = i, r = s), {
    width: n,
    height: r,
    $: a
  };
}
function Lr(e) {
  return Ie(e) ? e : e.contextElement;
}
function st(e) {
  const t = Lr(e);
  if (!De(t))
    return Me(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = Ji(t);
  let s = (i ? Wt(n.width) : n.width) / r, a = (i ? Wt(n.height) : n.height) / o;
  return (!s || !Number.isFinite(s)) && (s = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: s,
    y: a
  };
}
const Fl = /* @__PURE__ */ Me(0);
function es(e) {
  const t = Te(e);
  return !Ir() || !t.visualViewport ? Fl : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ul(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Te(e) ? !1 : t;
}
function Qe(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = Lr(e);
  let s = Me(1);
  t && (r ? Ie(r) && (s = st(r)) : s = st(e));
  const a = Ul(i, n, r) ? es(i) : Me(0);
  let c = (o.left + a.x) / s.x, l = (o.top + a.y) / s.y, u = o.width / s.x, d = o.height / s.y;
  if (i) {
    const g = Te(i), m = r && Ie(r) ? Te(r) : r;
    let _ = g, f = hr(_);
    for (; f && r && m !== _; ) {
      const v = st(f), h = f.getBoundingClientRect(), E = Le(f), p = h.left + (f.clientLeft + parseFloat(E.paddingLeft)) * v.x, y = h.top + (f.clientTop + parseFloat(E.paddingTop)) * v.y;
      c *= v.x, l *= v.y, u *= v.x, d *= v.y, c += p, l += y, _ = Te(f), f = hr(_);
    }
  }
  return Gt({
    width: u,
    height: d,
    x: c,
    y: l
  });
}
function kr(e, t) {
  const n = on(e).scrollLeft;
  return t ? t.left + n : Qe(je(e)).left + n;
}
function ts(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    kr(e, r)
  )), i = r.top + t.scrollTop;
  return {
    x: o,
    y: i
  };
}
function Bl(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const i = o === "fixed", s = je(r), a = t ? rn(t.floating) : !1;
  if (r === s || a && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = Me(1);
  const u = Me(0), d = De(r);
  if ((d || !d && !i) && ((dt(r) !== "body" || Et(s)) && (c = on(r)), De(r))) {
    const m = Qe(r);
    l = st(r), u.x = m.x + r.clientLeft, u.y = m.y + r.clientTop;
  }
  const g = s && !d && !i ? ts(s, c, !0) : Me(0);
  return {
    width: n.width * l.x,
    height: n.height * l.y,
    x: n.x * l.x - c.scrollLeft * l.x + u.x + g.x,
    y: n.y * l.y - c.scrollTop * l.y + u.y + g.y
  };
}
function zl(e) {
  return Array.from(e.getClientRects());
}
function Vl(e) {
  const t = je(e), n = on(e), r = e.ownerDocument.body, o = Oe(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = Oe(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let s = -n.scrollLeft + kr(e);
  const a = -n.scrollTop;
  return Le(r).direction === "rtl" && (s += Oe(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: s,
    y: a
  };
}
function ql(e, t) {
  const n = Te(e), r = je(e), o = n.visualViewport;
  let i = r.clientWidth, s = r.clientHeight, a = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    const l = Ir();
    (!l || l && t === "fixed") && (a = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a,
    y: c
  };
}
function Wl(e, t) {
  const n = Qe(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = De(e) ? st(e) : Me(1), s = e.clientWidth * i.x, a = e.clientHeight * i.y, c = o * i.x, l = r * i.y;
  return {
    width: s,
    height: a,
    x: c,
    y: l
  };
}
function qo(e, t, n) {
  let r;
  if (t === "viewport")
    r = ql(e, n);
  else if (t === "document")
    r = Vl(je(e));
  else if (Ie(t))
    r = Wl(t, n);
  else {
    const o = es(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Gt(r);
}
function ns(e, t) {
  const n = qe(e);
  return n === t || !Ie(n) || ct(n) ? !1 : Le(n).position === "fixed" || ns(n, t);
}
function Xl(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = yt(e, [], !1).filter((a) => Ie(a) && dt(a) !== "body"), o = null;
  const i = Le(e).position === "fixed";
  let s = i ? qe(e) : e;
  for (; Ie(s) && !ct(s); ) {
    const a = Le(s), c = Nr(s);
    !c && a.position === "fixed" && (o = null), (i ? !c && !o : !c && a.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Et(s) && !c && ns(e, s)) ? r = r.filter((u) => u !== s) : o = a, s = qe(s);
  }
  return t.set(e, r), r;
}
function Gl(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const s = [...n === "clippingAncestors" ? rn(t) ? [] : Xl(t, this._c) : [].concat(n), r], a = s[0], c = s.reduce((l, u) => {
    const d = qo(t, u, o);
    return l.top = Oe(d.top, l.top), l.right = ze(d.right, l.right), l.bottom = ze(d.bottom, l.bottom), l.left = Oe(d.left, l.left), l;
  }, qo(t, a, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Kl(e) {
  const {
    width: t,
    height: n
  } = Ji(e);
  return {
    width: t,
    height: n
  };
}
function Yl(e, t, n) {
  const r = De(t), o = je(t), i = n === "fixed", s = Qe(e, !0, i, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Me(0);
  if (r || !r && !i)
    if ((dt(t) !== "body" || Et(o)) && (a = on(t)), r) {
      const g = Qe(t, !0, i, t);
      c.x = g.x + t.clientLeft, c.y = g.y + t.clientTop;
    } else o && (c.x = kr(o));
  const l = o && !r && !i ? ts(o, a) : Me(0), u = s.left + a.scrollLeft - c.x - l.x, d = s.top + a.scrollTop - c.y - l.y;
  return {
    x: u,
    y: d,
    width: s.width,
    height: s.height
  };
}
function Vn(e) {
  return Le(e).position === "static";
}
function Wo(e, t) {
  if (!De(e) || Le(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return je(e) === n && (n = n.ownerDocument.body), n;
}
function rs(e, t) {
  const n = Te(e);
  if (rn(e))
    return n;
  if (!De(e)) {
    let o = qe(e);
    for (; o && !ct(o); ) {
      if (Ie(o) && !Vn(o))
        return o;
      o = qe(o);
    }
    return n;
  }
  let r = Wo(e, t);
  for (; r && Hl(r) && Vn(r); )
    r = Wo(r, t);
  return r && ct(r) && Vn(r) && !Nr(r) ? n : r || $l(e) || n;
}
const Ql = async function(e) {
  const t = this.getOffsetParent || rs, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Yl(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Zl(e) {
  return Le(e).direction === "rtl";
}
const Jl = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Bl,
  getDocumentElement: je,
  getClippingRect: Gl,
  getOffsetParent: rs,
  getElementRects: Ql,
  getClientRects: zl,
  getDimensions: Kl,
  getScale: st,
  isElement: Ie,
  isRTL: Zl
};
function os(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function eu(e, t) {
  let n = null, r;
  const o = je(e);
  function i() {
    var a;
    clearTimeout(r), (a = n) == null || a.disconnect(), n = null;
  }
  function s(a, c) {
    a === void 0 && (a = !1), c === void 0 && (c = 1), i();
    const l = e.getBoundingClientRect(), {
      left: u,
      top: d,
      width: g,
      height: m
    } = l;
    if (a || t(), !g || !m)
      return;
    const _ = Dt(d), f = Dt(o.clientWidth - (u + g)), v = Dt(o.clientHeight - (d + m)), h = Dt(u), p = {
      rootMargin: -_ + "px " + -f + "px " + -v + "px " + -h + "px",
      threshold: Oe(0, ze(1, c)) || 1
    };
    let y = !0;
    function b(A) {
      const S = A[0].intersectionRatio;
      if (S !== c) {
        if (!y)
          return s();
        S ? s(!1, S) : r = setTimeout(() => {
          s(!1, 1e-7);
        }, 1e3);
      }
      S === 1 && !os(l, e.getBoundingClientRect()) && s(), y = !1;
    }
    try {
      n = new IntersectionObserver(b, {
        ...p,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(b, p);
    }
    n.observe(e);
  }
  return s(!0), i;
}
function tu(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: s = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, l = Lr(e), u = o || i ? [...l ? yt(l) : [], ...yt(t)] : [];
  u.forEach((h) => {
    o && h.addEventListener("scroll", n, {
      passive: !0
    }), i && h.addEventListener("resize", n);
  });
  const d = l && a ? eu(l, n) : null;
  let g = -1, m = null;
  s && (m = new ResizeObserver((h) => {
    let [E] = h;
    E && E.target === l && m && (m.unobserve(t), cancelAnimationFrame(g), g = requestAnimationFrame(() => {
      var p;
      (p = m) == null || p.observe(t);
    })), n();
  }), l && !c && m.observe(l), m.observe(t));
  let _, f = c ? Qe(e) : null;
  c && v();
  function v() {
    const h = Qe(e);
    f && !os(f, h) && n(), f = h, _ = requestAnimationFrame(v);
  }
  return n(), () => {
    var h;
    u.forEach((E) => {
      o && E.removeEventListener("scroll", n), i && E.removeEventListener("resize", n);
    }), d == null || d(), (h = m) == null || h.disconnect(), m = null, c && cancelAnimationFrame(_);
  };
}
const nu = kl, ru = Ml, ou = Nl, iu = jl, su = Il, Xo = Tl, au = Dl, cu = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Jl,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return Ol(e, t, {
    ...o,
    platform: i
  });
};
var zt = typeof document < "u" ? ua : fa;
function Kt(e, t) {
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
        if (!Kt(e[r], t[r]))
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
      if (!(i === "_owner" && e.$$typeof) && !Kt(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function is(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Go(e, t) {
  const n = is(e);
  return Math.round(t * n) / n;
}
function qn(e) {
  const t = w.useRef(e);
  return zt(() => {
    t.current = e;
  }), t;
}
function lu(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: i,
      floating: s
    } = {},
    transform: a = !0,
    whileElementsMounted: c,
    open: l
  } = e, [u, d] = w.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [g, m] = w.useState(r);
  Kt(g, r) || m(r);
  const [_, f] = w.useState(null), [v, h] = w.useState(null), E = w.useCallback((T) => {
    T !== A.current && (A.current = T, f(T));
  }, []), p = w.useCallback((T) => {
    T !== S.current && (S.current = T, h(T));
  }, []), y = i || _, b = s || v, A = w.useRef(null), S = w.useRef(null), P = w.useRef(u), k = c != null, O = qn(c), N = qn(o), M = qn(l), U = w.useCallback(() => {
    if (!A.current || !S.current)
      return;
    const T = {
      placement: t,
      strategy: n,
      middleware: g
    };
    N.current && (T.platform = N.current), cu(A.current, S.current, T).then((B) => {
      const J = {
        ...B,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: M.current !== !1
      };
      D.current && !Kt(P.current, J) && (P.current = J, Jt.flushSync(() => {
        d(J);
      }));
    });
  }, [g, t, n, N, M]);
  zt(() => {
    l === !1 && P.current.isPositioned && (P.current.isPositioned = !1, d((T) => ({
      ...T,
      isPositioned: !1
    })));
  }, [l]);
  const D = w.useRef(!1);
  zt(() => (D.current = !0, () => {
    D.current = !1;
  }), []), zt(() => {
    if (y && (A.current = y), b && (S.current = b), y && b) {
      if (O.current)
        return O.current(y, b, U);
      U();
    }
  }, [y, b, U, O, k]);
  const $ = w.useMemo(() => ({
    reference: A,
    floating: S,
    setReference: E,
    setFloating: p
  }), [E, p]), j = w.useMemo(() => ({
    reference: y,
    floating: b
  }), [y, b]), K = w.useMemo(() => {
    const T = {
      position: n,
      left: 0,
      top: 0
    };
    if (!j.floating)
      return T;
    const B = Go(j.floating, u.x), J = Go(j.floating, u.y);
    return a ? {
      ...T,
      transform: "translate(" + B + "px, " + J + "px)",
      ...is(j.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: B,
      top: J
    };
  }, [n, a, j.floating, u.x, u.y]);
  return w.useMemo(() => ({
    ...u,
    update: U,
    refs: $,
    elements: j,
    floatingStyles: K
  }), [u, U, $, j, K]);
}
const uu = (e) => {
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
      return r && t(r) ? r.current != null ? Xo({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Xo({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, fu = (e, t) => ({
  ...nu(e),
  options: [e, t]
}), du = (e, t) => ({
  ...ru(e),
  options: [e, t]
}), pu = (e, t) => ({
  ...au(e),
  options: [e, t]
}), hu = (e, t) => ({
  ...ou(e),
  options: [e, t]
}), mu = (e, t) => ({
  ...iu(e),
  options: [e, t]
}), gu = (e, t) => ({
  ...su(e),
  options: [e, t]
}), vu = (e, t) => ({
  ...uu(e),
  options: [e, t]
});
var bu = "Arrow", ss = w.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...i } = e;
  return /* @__PURE__ */ I(
    ye.svg,
    {
      ...i,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ I("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
ss.displayName = bu;
var yu = ss;
function _u(e) {
  const [t, n] = w.useState(void 0);
  return Ae(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const i = o[0];
        let s, a;
        if ("borderBoxSize" in i) {
          const c = i.borderBoxSize, l = Array.isArray(c) ? c[0] : c;
          s = l.inlineSize, a = l.blockSize;
        } else
          s = e.offsetWidth, a = e.offsetHeight;
        n({ width: s, height: a });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Mr = "Popper", [as, cs] = Cr(Mr), [Eu, ls] = as(Mr), us = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = w.useState(null);
  return /* @__PURE__ */ I(Eu, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
us.displayName = Mr;
var fs = "PopperAnchor", ds = w.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, i = ls(fs, n), s = w.useRef(null), a = we(t, s);
    return w.useEffect(() => {
      i.onAnchorChange((r == null ? void 0 : r.current) || s.current);
    }), r ? null : /* @__PURE__ */ I(ye.div, { ...o, ref: a });
  }
);
ds.displayName = fs;
var Dr = "PopperContent", [wu, Ru] = as(Dr), ps = w.forwardRef(
  (e, t) => {
    var R, Q, V, W, x, C;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: i = "center",
      alignOffset: s = 0,
      arrowPadding: a = 0,
      avoidCollisions: c = !0,
      collisionBoundary: l = [],
      collisionPadding: u = 0,
      sticky: d = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: m = "optimized",
      onPlaced: _,
      ...f
    } = e, v = ls(Dr, n), [h, E] = w.useState(null), p = we(t, (ue) => E(ue)), [y, b] = w.useState(null), A = _u(y), S = (A == null ? void 0 : A.width) ?? 0, P = (A == null ? void 0 : A.height) ?? 0, k = r + (i !== "center" ? "-" + i : ""), O = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, N = Array.isArray(l) ? l : [l], M = N.length > 0, U = {
      padding: O,
      boundary: N.filter(xu),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: M
    }, { refs: D, floatingStyles: $, placement: j, isPositioned: K, middlewareData: T } = lu({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: k,
      whileElementsMounted: (...ue) => tu(...ue, {
        animationFrame: m === "always"
      }),
      elements: {
        reference: v.anchor
      },
      middleware: [
        fu({ mainAxis: o + P, alignmentAxis: s }),
        c && du({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? pu() : void 0,
          ...U
        }),
        c && hu({ ...U }),
        mu({
          ...U,
          apply: ({ elements: ue, rects: q, availableWidth: z, availableHeight: Z }) => {
            const { width: ve, height: me } = q.reference, de = ue.floating.style;
            de.setProperty("--radix-popper-available-width", `${z}px`), de.setProperty("--radix-popper-available-height", `${Z}px`), de.setProperty("--radix-popper-anchor-width", `${ve}px`), de.setProperty("--radix-popper-anchor-height", `${me}px`);
          }
        }),
        y && vu({ element: y, padding: a }),
        Cu({ arrowWidth: S, arrowHeight: P }),
        g && gu({ strategy: "referenceHidden", ...U })
      ]
    }), [B, J] = gs(j), ae = Ye(_);
    Ae(() => {
      K && (ae == null || ae());
    }, [K, ae]);
    const re = (R = T.arrow) == null ? void 0 : R.x, ne = (Q = T.arrow) == null ? void 0 : Q.y, Y = ((V = T.arrow) == null ? void 0 : V.centerOffset) !== 0, [le, oe] = w.useState();
    return Ae(() => {
      h && oe(window.getComputedStyle(h).zIndex);
    }, [h]), /* @__PURE__ */ I(
      "div",
      {
        ref: D.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...$,
          transform: K ? $.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: le,
          "--radix-popper-transform-origin": [
            (W = T.transformOrigin) == null ? void 0 : W.x,
            (x = T.transformOrigin) == null ? void 0 : x.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((C = T.hide) == null ? void 0 : C.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ I(
          wu,
          {
            scope: n,
            placedSide: B,
            onArrowChange: b,
            arrowX: re,
            arrowY: ne,
            shouldHideArrow: Y,
            children: /* @__PURE__ */ I(
              ye.div,
              {
                "data-side": B,
                "data-align": J,
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
ps.displayName = Dr;
var hs = "PopperArrow", Su = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ms = w.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, i = Ru(hs, r), s = Su[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ I(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [s]: 0,
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
        children: /* @__PURE__ */ I(
          yu,
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
ms.displayName = hs;
function xu(e) {
  return e !== null;
}
var Cu = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var v, h, E;
    const { placement: n, rects: r, middlewareData: o } = t, s = ((v = o.arrow) == null ? void 0 : v.centerOffset) !== 0, a = s ? 0 : e.arrowWidth, c = s ? 0 : e.arrowHeight, [l, u] = gs(n), d = { start: "0%", center: "50%", end: "100%" }[u], g = (((h = o.arrow) == null ? void 0 : h.x) ?? 0) + a / 2, m = (((E = o.arrow) == null ? void 0 : E.y) ?? 0) + c / 2;
    let _ = "", f = "";
    return l === "bottom" ? (_ = s ? d : `${g}px`, f = `${-c}px`) : l === "top" ? (_ = s ? d : `${g}px`, f = `${r.floating.height + c}px`) : l === "right" ? (_ = `${-c}px`, f = s ? d : `${m}px`) : l === "left" && (_ = `${r.floating.width + c}px`, f = s ? d : `${m}px`), { data: { x: _, y: f } };
  }
});
function gs(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Pu = us, Au = ds, Ou = ps, Tu = ms, Nu = "Portal", vs = w.forwardRef((e, t) => {
  var a;
  const { container: n, ...r } = e, [o, i] = w.useState(!1);
  Ae(() => i(!0), []);
  const s = n || o && ((a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : a.body);
  return s ? gi.createPortal(/* @__PURE__ */ I(ye.div, { ...r, ref: t }), s) : null;
});
vs.displayName = Nu;
var Iu = w[" useInsertionEffect ".trim().toString()] || Ae;
function Ko({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, i, s] = Lu({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, c = a ? e : o;
  {
    const u = w.useRef(e !== void 0);
    w.useEffect(() => {
      const d = u.current;
      d !== a && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${a ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = a;
    }, [a, r]);
  }
  const l = w.useCallback(
    (u) => {
      var d;
      if (a) {
        const g = ku(u) ? u(e) : u;
        g !== e && ((d = s.current) == null || d.call(s, g));
      } else
        i(u);
    },
    [a, e, i, s]
  );
  return [c, l];
}
function Lu({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = w.useState(e), o = w.useRef(n), i = w.useRef(t);
  return Iu(() => {
    i.current = t;
  }, [t]), w.useEffect(() => {
    var s;
    o.current !== n && ((s = i.current) == null || s.call(i, n), o.current = n);
  }, [n, o]), [n, r, i];
}
function ku(e) {
  return typeof e == "function";
}
function Mu(e) {
  const t = w.useRef({ value: e, previous: e });
  return w.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var bs = Object.freeze({
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
}), Du = "VisuallyHidden", ju = w.forwardRef(
  (e, t) => /* @__PURE__ */ I(
    ye.span,
    {
      ...e,
      ref: t,
      style: { ...bs, ...e.style }
    }
  )
);
ju.displayName = Du;
var Hu = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, rt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Ht = {}, Wn = 0, ys = function(e) {
  return e && (e.host || ys(e.parentNode));
}, $u = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ys(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Fu = function(e, t, n, r) {
  var o = $u(t, Array.isArray(e) ? e : [e]);
  Ht[n] || (Ht[n] = /* @__PURE__ */ new WeakMap());
  var i = Ht[n], s = [], a = /* @__PURE__ */ new Set(), c = new Set(o), l = function(d) {
    !d || a.has(d) || (a.add(d), l(d.parentNode));
  };
  o.forEach(l);
  var u = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(g) {
      if (a.has(g))
        u(g);
      else
        try {
          var m = g.getAttribute(r), _ = m !== null && m !== "false", f = (rt.get(g) || 0) + 1, v = (i.get(g) || 0) + 1;
          rt.set(g, f), i.set(g, v), s.push(g), f === 1 && _ && jt.set(g, !0), v === 1 && g.setAttribute(n, "true"), _ || g.setAttribute(r, "true");
        } catch (h) {
          console.error("aria-hidden: cannot operate on ", g, h);
        }
    });
  };
  return u(t), a.clear(), Wn++, function() {
    s.forEach(function(d) {
      var g = rt.get(d) - 1, m = i.get(d) - 1;
      rt.set(d, g), i.set(d, m), g || (jt.has(d) || d.removeAttribute(r), jt.delete(d)), m || d.removeAttribute(n);
    }), Wn--, Wn || (rt = /* @__PURE__ */ new WeakMap(), rt = /* @__PURE__ */ new WeakMap(), jt = /* @__PURE__ */ new WeakMap(), Ht = {});
  };
}, Uu = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Hu(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Fu(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, ke = function() {
  return ke = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, ke.apply(this, arguments);
};
function _s(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function Bu(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, i; r < o; r++)
    (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var Vt = "right-scroll-bar-position", qt = "width-before-scroll-bar", zu = "with-scroll-bars-hidden", Vu = "--removed-body-scroll-bar-size";
function Xn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function qu(e, t) {
  var n = mi(function() {
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
var Wu = typeof window < "u" ? w.useLayoutEffect : w.useEffect, Yo = /* @__PURE__ */ new WeakMap();
function Xu(e, t) {
  var n = qu(null, function(r) {
    return e.forEach(function(o) {
      return Xn(o, r);
    });
  });
  return Wu(function() {
    var r = Yo.get(n);
    if (r) {
      var o = new Set(r), i = new Set(e), s = n.current;
      o.forEach(function(a) {
        i.has(a) || Xn(a, null);
      }), i.forEach(function(a) {
        o.has(a) || Xn(a, s);
      });
    }
    Yo.set(n, e);
  }, [e]), n;
}
function Gu(e) {
  return e;
}
function Ku(e, t) {
  t === void 0 && (t = Gu);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(i) {
      var s = t(i, r);
      return n.push(s), function() {
        n = n.filter(function(a) {
          return a !== s;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (r = !0; n.length; ) {
        var s = n;
        n = [], s.forEach(i);
      }
      n = {
        push: function(a) {
          return i(a);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(i) {
      r = !0;
      var s = [];
      if (n.length) {
        var a = n;
        n = [], a.forEach(i), s = n;
      }
      var c = function() {
        var u = s;
        s = [], u.forEach(i);
      }, l = function() {
        return Promise.resolve().then(c);
      };
      l(), n = {
        push: function(u) {
          s.push(u), l();
        },
        filter: function(u) {
          return s = s.filter(u), n;
        }
      };
    }
  };
  return o;
}
function Yu(e) {
  e === void 0 && (e = {});
  var t = Ku(null);
  return t.options = ke({ async: !0, ssr: !1 }, e), t;
}
var Es = function(e) {
  var t = e.sideCar, n = _s(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return w.createElement(r, ke({}, n));
};
Es.isSideCarExport = !0;
function Qu(e, t) {
  return e.useMedium(t), Es;
}
var ws = Yu(), Gn = function() {
}, sn = w.forwardRef(function(e, t) {
  var n = w.useRef(null), r = w.useState({
    onScrollCapture: Gn,
    onWheelCapture: Gn,
    onTouchMoveCapture: Gn
  }), o = r[0], i = r[1], s = e.forwardProps, a = e.children, c = e.className, l = e.removeScrollBar, u = e.enabled, d = e.shards, g = e.sideCar, m = e.noIsolation, _ = e.inert, f = e.allowPinchZoom, v = e.as, h = v === void 0 ? "div" : v, E = e.gapMode, p = _s(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), y = g, b = Xu([n, t]), A = ke(ke({}, p), o);
  return w.createElement(
    w.Fragment,
    null,
    u && w.createElement(y, { sideCar: ws, removeScrollBar: l, shards: d, noIsolation: m, inert: _, setCallbacks: i, allowPinchZoom: !!f, lockRef: n, gapMode: E }),
    s ? w.cloneElement(w.Children.only(a), ke(ke({}, A), { ref: b })) : w.createElement(h, ke({}, A, { className: c, ref: b }), a)
  );
});
sn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
sn.classNames = {
  fullWidth: qt,
  zeroRight: Vt
};
var Zu = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Ju() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Zu();
  return t && e.setAttribute("nonce", t), e;
}
function ef(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function tf(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var nf = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Ju()) && (ef(t, n), tf(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, rf = function() {
  var e = nf();
  return function(t, n) {
    w.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Rs = function() {
  var e = rf(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, of = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Kn = function(e) {
  return parseInt(e || "", 10) || 0;
}, sf = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Kn(n), Kn(r), Kn(o)];
}, af = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return of;
  var t = sf(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, cf = Rs(), at = "data-scroll-locked", lf = function(e, t, n, r) {
  var o = e.left, i = e.top, s = e.right, a = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(zu, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(at, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(s, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(a, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Vt, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(qt, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(Vt, " .").concat(Vt, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(qt, " .").concat(qt, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(at, `] {
    `).concat(Vu, ": ").concat(a, `px;
  }
`);
}, Qo = function() {
  var e = parseInt(document.body.getAttribute(at) || "0", 10);
  return isFinite(e) ? e : 0;
}, uf = function() {
  w.useEffect(function() {
    return document.body.setAttribute(at, (Qo() + 1).toString()), function() {
      var e = Qo() - 1;
      e <= 0 ? document.body.removeAttribute(at) : document.body.setAttribute(at, e.toString());
    };
  }, []);
}, ff = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  uf();
  var i = w.useMemo(function() {
    return af(o);
  }, [o]);
  return w.createElement(cf, { styles: lf(i, !t, o, n ? "" : "!important") });
}, mr = !1;
if (typeof window < "u")
  try {
    var $t = Object.defineProperty({}, "passive", {
      get: function() {
        return mr = !0, !0;
      }
    });
    window.addEventListener("test", $t, $t), window.removeEventListener("test", $t, $t);
  } catch {
    mr = !1;
  }
var ot = mr ? { passive: !1 } : !1, df = function(e) {
  return e.tagName === "TEXTAREA";
}, Ss = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !df(e) && n[t] === "visible")
  );
}, pf = function(e) {
  return Ss(e, "overflowY");
}, hf = function(e) {
  return Ss(e, "overflowX");
}, Zo = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = xs(e, r);
    if (o) {
      var i = Cs(e, r), s = i[1], a = i[2];
      if (s > a)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, mf = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, gf = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, xs = function(e, t) {
  return e === "v" ? pf(t) : hf(t);
}, Cs = function(e, t) {
  return e === "v" ? mf(t) : gf(t);
}, vf = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, bf = function(e, t, n, r, o) {
  var i = vf(e, window.getComputedStyle(t).direction), s = i * r, a = n.target, c = t.contains(a), l = !1, u = s > 0, d = 0, g = 0;
  do {
    var m = Cs(e, a), _ = m[0], f = m[1], v = m[2], h = f - v - i * _;
    (_ || h) && xs(e, a) && (d += h, g += _), a instanceof ShadowRoot ? a = a.host : a = a.parentNode;
  } while (
    // portaled content
    !c && a !== document.body || // self content
    c && (t.contains(a) || t === a)
  );
  return (u && Math.abs(d) < 1 || !u && Math.abs(g) < 1) && (l = !0), l;
}, Ft = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Jo = function(e) {
  return [e.deltaX, e.deltaY];
}, ei = function(e) {
  return e && "current" in e ? e.current : e;
}, yf = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, _f = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ef = 0, it = [];
function wf(e) {
  var t = w.useRef([]), n = w.useRef([0, 0]), r = w.useRef(), o = w.useState(Ef++)[0], i = w.useState(Rs)[0], s = w.useRef(e);
  w.useEffect(function() {
    s.current = e;
  }, [e]), w.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = Bu([e.lockRef.current], (e.shards || []).map(ei), !0).filter(Boolean);
      return f.forEach(function(v) {
        return v.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(v) {
          return v.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var a = w.useCallback(function(f, v) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !s.current.allowPinchZoom;
    var h = Ft(f), E = n.current, p = "deltaX" in f ? f.deltaX : E[0] - h[0], y = "deltaY" in f ? f.deltaY : E[1] - h[1], b, A = f.target, S = Math.abs(p) > Math.abs(y) ? "h" : "v";
    if ("touches" in f && S === "h" && A.type === "range")
      return !1;
    var P = Zo(S, A);
    if (!P)
      return !0;
    if (P ? b = S : (b = S === "v" ? "h" : "v", P = Zo(S, A)), !P)
      return !1;
    if (!r.current && "changedTouches" in f && (p || y) && (r.current = b), !b)
      return !0;
    var k = r.current || b;
    return bf(k, v, f, k === "h" ? p : y);
  }, []), c = w.useCallback(function(f) {
    var v = f;
    if (!(!it.length || it[it.length - 1] !== i)) {
      var h = "deltaY" in v ? Jo(v) : Ft(v), E = t.current.filter(function(b) {
        return b.name === v.type && (b.target === v.target || v.target === b.shadowParent) && yf(b.delta, h);
      })[0];
      if (E && E.should) {
        v.cancelable && v.preventDefault();
        return;
      }
      if (!E) {
        var p = (s.current.shards || []).map(ei).filter(Boolean).filter(function(b) {
          return b.contains(v.target);
        }), y = p.length > 0 ? a(v, p[0]) : !s.current.noIsolation;
        y && v.cancelable && v.preventDefault();
      }
    }
  }, []), l = w.useCallback(function(f, v, h, E) {
    var p = { name: f, delta: v, target: h, should: E, shadowParent: Rf(h) };
    t.current.push(p), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== p;
      });
    }, 1);
  }, []), u = w.useCallback(function(f) {
    n.current = Ft(f), r.current = void 0;
  }, []), d = w.useCallback(function(f) {
    l(f.type, Jo(f), f.target, a(f, e.lockRef.current));
  }, []), g = w.useCallback(function(f) {
    l(f.type, Ft(f), f.target, a(f, e.lockRef.current));
  }, []);
  w.useEffect(function() {
    return it.push(i), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: g
    }), document.addEventListener("wheel", c, ot), document.addEventListener("touchmove", c, ot), document.addEventListener("touchstart", u, ot), function() {
      it = it.filter(function(f) {
        return f !== i;
      }), document.removeEventListener("wheel", c, ot), document.removeEventListener("touchmove", c, ot), document.removeEventListener("touchstart", u, ot);
    };
  }, []);
  var m = e.removeScrollBar, _ = e.inert;
  return w.createElement(
    w.Fragment,
    null,
    _ ? w.createElement(i, { styles: _f(o) }) : null,
    m ? w.createElement(ff, { gapMode: e.gapMode }) : null
  );
}
function Rf(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Sf = Qu(ws, wf);
var Ps = w.forwardRef(function(e, t) {
  return w.createElement(sn, ke({}, e, { ref: t, sideCar: Sf }));
});
Ps.classNames = sn.classNames;
var xf = [" ", "Enter", "ArrowUp", "ArrowDown"], Cf = [" ", "Enter"], Ze = "Select", [an, cn, Pf] = el(Ze), [pt, Vd] = Cr(Ze, [
  Pf,
  cs
]), ln = cs(), [Af, Xe] = pt(Ze), [Of, Tf] = pt(Ze), As = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: i,
    value: s,
    defaultValue: a,
    onValueChange: c,
    dir: l,
    name: u,
    autoComplete: d,
    disabled: g,
    required: m,
    form: _
  } = e, f = ln(t), [v, h] = w.useState(null), [E, p] = w.useState(null), [y, b] = w.useState(!1), A = nl(l), [S, P] = Ko({
    prop: r,
    defaultProp: o ?? !1,
    onChange: i,
    caller: Ze
  }), [k, O] = Ko({
    prop: s,
    defaultProp: a,
    onChange: c,
    caller: Ze
  }), N = w.useRef(null), M = v ? _ || !!v.closest("form") : !0, [U, D] = w.useState(/* @__PURE__ */ new Set()), $ = Array.from(U).map((j) => j.props.value).join(";");
  return /* @__PURE__ */ I(Pu, { ...f, children: /* @__PURE__ */ Ce(
    Af,
    {
      required: m,
      scope: t,
      trigger: v,
      onTriggerChange: h,
      valueNode: E,
      onValueNodeChange: p,
      valueNodeHasChildren: y,
      onValueNodeHasChildrenChange: b,
      contentId: Pr(),
      value: k,
      onValueChange: O,
      open: S,
      onOpenChange: P,
      dir: A,
      triggerPointerDownPosRef: N,
      disabled: g,
      children: [
        /* @__PURE__ */ I(an.Provider, { scope: t, children: /* @__PURE__ */ I(
          Of,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: w.useCallback((j) => {
              D((K) => new Set(K).add(j));
            }, []),
            onNativeOptionRemove: w.useCallback((j) => {
              D((K) => {
                const T = new Set(K);
                return T.delete(j), T;
              });
            }, []),
            children: n
          }
        ) }),
        M ? /* @__PURE__ */ Ce(
          Ys,
          {
            "aria-hidden": !0,
            required: m,
            tabIndex: -1,
            name: u,
            autoComplete: d,
            value: k,
            onChange: (j) => O(j.target.value),
            disabled: g,
            form: _,
            children: [
              k === void 0 ? /* @__PURE__ */ I("option", { value: "" }) : null,
              Array.from(U)
            ]
          },
          $
        ) : null
      ]
    }
  ) });
};
As.displayName = Ze;
var Os = "SelectTrigger", Ts = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, i = ln(n), s = Xe(Os, n), a = s.disabled || r, c = we(t, s.onTriggerChange), l = cn(n), u = w.useRef("touch"), [d, g, m] = Zs((f) => {
      const v = l().filter((p) => !p.disabled), h = v.find((p) => p.value === s.value), E = Js(v, f, h);
      E !== void 0 && s.onValueChange(E.value);
    }), _ = (f) => {
      a || (s.onOpenChange(!0), m()), f && (s.triggerPointerDownPosRef.current = {
        x: Math.round(f.pageX),
        y: Math.round(f.pageY)
      });
    };
    return /* @__PURE__ */ I(Au, { asChild: !0, ...i, children: /* @__PURE__ */ I(
      ye.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": s.contentId,
        "aria-expanded": s.open,
        "aria-required": s.required,
        "aria-autocomplete": "none",
        dir: s.dir,
        "data-state": s.open ? "open" : "closed",
        disabled: a,
        "data-disabled": a ? "" : void 0,
        "data-placeholder": Qs(s.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: _e(o.onClick, (f) => {
          f.currentTarget.focus(), u.current !== "mouse" && _(f);
        }),
        onPointerDown: _e(o.onPointerDown, (f) => {
          u.current = f.pointerType;
          const v = f.target;
          v.hasPointerCapture(f.pointerId) && v.releasePointerCapture(f.pointerId), f.button === 0 && f.ctrlKey === !1 && f.pointerType === "mouse" && (_(f), f.preventDefault());
        }),
        onKeyDown: _e(o.onKeyDown, (f) => {
          const v = d.current !== "";
          !(f.ctrlKey || f.altKey || f.metaKey) && f.key.length === 1 && g(f.key), !(v && f.key === " ") && xf.includes(f.key) && (_(), f.preventDefault());
        })
      }
    ) });
  }
);
Ts.displayName = Os;
var Ns = "SelectValue", Is = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: i, placeholder: s = "", ...a } = e, c = Xe(Ns, n), { onValueNodeHasChildrenChange: l } = c, u = i !== void 0, d = we(t, c.onValueNodeChange);
    return Ae(() => {
      l(u);
    }, [l, u]), /* @__PURE__ */ I(
      ye.span,
      {
        ...a,
        ref: d,
        style: { pointerEvents: "none" },
        children: Qs(c.value) ? /* @__PURE__ */ I(Qt, { children: s }) : i
      }
    );
  }
);
Is.displayName = Ns;
var Nf = "SelectIcon", Ls = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ I(ye.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Ls.displayName = Nf;
var If = "SelectPortal", ks = (e) => /* @__PURE__ */ I(vs, { asChild: !0, ...e });
ks.displayName = If;
var Je = "SelectContent", Ms = w.forwardRef(
  (e, t) => {
    const n = Xe(Je, e.__scopeSelect), [r, o] = w.useState();
    if (Ae(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const i = r;
      return i ? Jt.createPortal(
        /* @__PURE__ */ I(Ds, { scope: e.__scopeSelect, children: /* @__PURE__ */ I(an.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ I("div", { children: e.children }) }) }),
        i
      ) : null;
    }
    return /* @__PURE__ */ I(js, { ...e, ref: t });
  }
);
Ms.displayName = Je;
var Ne = 10, [Ds, Ge] = pt(Je), Lf = "SelectContentImpl", kf = /* @__PURE__ */ vt("SelectContent.RemoveScroll"), js = w.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: r = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: i,
      onPointerDownOutside: s,
      //
      // PopperContent props
      side: a,
      sideOffset: c,
      align: l,
      alignOffset: u,
      arrowPadding: d,
      collisionBoundary: g,
      collisionPadding: m,
      sticky: _,
      hideWhenDetached: f,
      avoidCollisions: v,
      //
      ...h
    } = e, E = Xe(Je, n), [p, y] = w.useState(null), [b, A] = w.useState(null), S = we(t, (R) => y(R)), [P, k] = w.useState(null), [O, N] = w.useState(
      null
    ), M = cn(n), [U, D] = w.useState(!1), $ = w.useRef(!1);
    w.useEffect(() => {
      if (p) return Uu(p);
    }, [p]), fl();
    const j = w.useCallback(
      (R) => {
        const [Q, ...V] = M().map((C) => C.ref.current), [W] = V.slice(-1), x = document.activeElement;
        for (const C of R)
          if (C === x || (C == null || C.scrollIntoView({ block: "nearest" }), C === Q && b && (b.scrollTop = 0), C === W && b && (b.scrollTop = b.scrollHeight), C == null || C.focus(), document.activeElement !== x)) return;
      },
      [M, b]
    ), K = w.useCallback(
      () => j([P, p]),
      [j, P, p]
    );
    w.useEffect(() => {
      U && K();
    }, [U, K]);
    const { onOpenChange: T, triggerPointerDownPosRef: B } = E;
    w.useEffect(() => {
      if (p) {
        let R = { x: 0, y: 0 };
        const Q = (W) => {
          var x, C;
          R = {
            x: Math.abs(Math.round(W.pageX) - (((x = B.current) == null ? void 0 : x.x) ?? 0)),
            y: Math.abs(Math.round(W.pageY) - (((C = B.current) == null ? void 0 : C.y) ?? 0))
          };
        }, V = (W) => {
          R.x <= 10 && R.y <= 10 ? W.preventDefault() : p.contains(W.target) || T(!1), document.removeEventListener("pointermove", Q), B.current = null;
        };
        return B.current !== null && (document.addEventListener("pointermove", Q), document.addEventListener("pointerup", V, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", Q), document.removeEventListener("pointerup", V, { capture: !0 });
        };
      }
    }, [p, T, B]), w.useEffect(() => {
      const R = () => T(!1);
      return window.addEventListener("blur", R), window.addEventListener("resize", R), () => {
        window.removeEventListener("blur", R), window.removeEventListener("resize", R);
      };
    }, [T]);
    const [J, ae] = Zs((R) => {
      const Q = M().filter((x) => !x.disabled), V = Q.find((x) => x.ref.current === document.activeElement), W = Js(Q, R, V);
      W && setTimeout(() => W.ref.current.focus());
    }), re = w.useCallback(
      (R, Q, V) => {
        const W = !$.current && !V;
        (E.value !== void 0 && E.value === Q || W) && (k(R), W && ($.current = !0));
      },
      [E.value]
    ), ne = w.useCallback(() => p == null ? void 0 : p.focus(), [p]), Y = w.useCallback(
      (R, Q, V) => {
        const W = !$.current && !V;
        (E.value !== void 0 && E.value === Q || W) && N(R);
      },
      [E.value]
    ), le = r === "popper" ? gr : Hs, oe = le === gr ? {
      side: a,
      sideOffset: c,
      align: l,
      alignOffset: u,
      arrowPadding: d,
      collisionBoundary: g,
      collisionPadding: m,
      sticky: _,
      hideWhenDetached: f,
      avoidCollisions: v
    } : {};
    return /* @__PURE__ */ I(
      Ds,
      {
        scope: n,
        content: p,
        viewport: b,
        onViewportChange: A,
        itemRefCallback: re,
        selectedItem: P,
        onItemLeave: ne,
        itemTextRefCallback: Y,
        focusSelectedItem: K,
        selectedItemText: O,
        position: r,
        isPositioned: U,
        searchRef: J,
        children: /* @__PURE__ */ I(Ps, { as: kf, allowPinchZoom: !0, children: /* @__PURE__ */ I(
          Gi,
          {
            asChild: !0,
            trapped: E.open,
            onMountAutoFocus: (R) => {
              R.preventDefault();
            },
            onUnmountAutoFocus: _e(o, (R) => {
              var Q;
              (Q = E.trigger) == null || Q.focus({ preventScroll: !0 }), R.preventDefault();
            }),
            children: /* @__PURE__ */ I(
              Wi,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: i,
                onPointerDownOutside: s,
                onFocusOutside: (R) => R.preventDefault(),
                onDismiss: () => E.onOpenChange(!1),
                children: /* @__PURE__ */ I(
                  le,
                  {
                    role: "listbox",
                    id: E.contentId,
                    "data-state": E.open ? "open" : "closed",
                    dir: E.dir,
                    onContextMenu: (R) => R.preventDefault(),
                    ...h,
                    ...oe,
                    onPlaced: () => D(!0),
                    ref: S,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...h.style
                    },
                    onKeyDown: _e(h.onKeyDown, (R) => {
                      const Q = R.ctrlKey || R.altKey || R.metaKey;
                      if (R.key === "Tab" && R.preventDefault(), !Q && R.key.length === 1 && ae(R.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(R.key)) {
                        let W = M().filter((x) => !x.disabled).map((x) => x.ref.current);
                        if (["ArrowUp", "End"].includes(R.key) && (W = W.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(R.key)) {
                          const x = R.target, C = W.indexOf(x);
                          W = W.slice(C + 1);
                        }
                        setTimeout(() => j(W)), R.preventDefault();
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
js.displayName = Lf;
var Mf = "SelectItemAlignedPosition", Hs = w.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, i = Xe(Je, n), s = Ge(Je, n), [a, c] = w.useState(null), [l, u] = w.useState(null), d = we(t, (S) => u(S)), g = cn(n), m = w.useRef(!1), _ = w.useRef(!0), { viewport: f, selectedItem: v, selectedItemText: h, focusSelectedItem: E } = s, p = w.useCallback(() => {
    if (i.trigger && i.valueNode && a && l && f && v && h) {
      const S = i.trigger.getBoundingClientRect(), P = l.getBoundingClientRect(), k = i.valueNode.getBoundingClientRect(), O = h.getBoundingClientRect();
      if (i.dir !== "rtl") {
        const x = O.left - P.left, C = k.left - x, ue = S.left - C, q = S.width + ue, z = Math.max(q, P.width), Z = window.innerWidth - Ne, ve = Lo(C, [
          Ne,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Ne, Z - z)
        ]);
        a.style.minWidth = q + "px", a.style.left = ve + "px";
      } else {
        const x = P.right - O.right, C = window.innerWidth - k.right - x, ue = window.innerWidth - S.right - C, q = S.width + ue, z = Math.max(q, P.width), Z = window.innerWidth - Ne, ve = Lo(C, [
          Ne,
          Math.max(Ne, Z - z)
        ]);
        a.style.minWidth = q + "px", a.style.right = ve + "px";
      }
      const N = g(), M = window.innerHeight - Ne * 2, U = f.scrollHeight, D = window.getComputedStyle(l), $ = parseInt(D.borderTopWidth, 10), j = parseInt(D.paddingTop, 10), K = parseInt(D.borderBottomWidth, 10), T = parseInt(D.paddingBottom, 10), B = $ + j + U + T + K, J = Math.min(v.offsetHeight * 5, B), ae = window.getComputedStyle(f), re = parseInt(ae.paddingTop, 10), ne = parseInt(ae.paddingBottom, 10), Y = S.top + S.height / 2 - Ne, le = M - Y, oe = v.offsetHeight / 2, R = v.offsetTop + oe, Q = $ + j + R, V = B - Q;
      if (Q <= Y) {
        const x = N.length > 0 && v === N[N.length - 1].ref.current;
        a.style.bottom = "0px";
        const C = l.clientHeight - f.offsetTop - f.offsetHeight, ue = Math.max(
          le,
          oe + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (x ? ne : 0) + C + K
        ), q = Q + ue;
        a.style.height = q + "px";
      } else {
        const x = N.length > 0 && v === N[0].ref.current;
        a.style.top = "0px";
        const ue = Math.max(
          Y,
          $ + f.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (x ? re : 0) + oe
        ) + V;
        a.style.height = ue + "px", f.scrollTop = Q - Y + f.offsetTop;
      }
      a.style.margin = `${Ne}px 0`, a.style.minHeight = J + "px", a.style.maxHeight = M + "px", r == null || r(), requestAnimationFrame(() => m.current = !0);
    }
  }, [
    g,
    i.trigger,
    i.valueNode,
    a,
    l,
    f,
    v,
    h,
    i.dir,
    r
  ]);
  Ae(() => p(), [p]);
  const [y, b] = w.useState();
  Ae(() => {
    l && b(window.getComputedStyle(l).zIndex);
  }, [l]);
  const A = w.useCallback(
    (S) => {
      S && _.current === !0 && (p(), E == null || E(), _.current = !1);
    },
    [p, E]
  );
  return /* @__PURE__ */ I(
    jf,
    {
      scope: n,
      contentWrapper: a,
      shouldExpandOnScrollRef: m,
      onScrollButtonChange: A,
      children: /* @__PURE__ */ I(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: y
          },
          children: /* @__PURE__ */ I(
            ye.div,
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
Hs.displayName = Mf;
var Df = "SelectPopperPosition", gr = w.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Ne,
    ...i
  } = e, s = ln(n);
  return /* @__PURE__ */ I(
    Ou,
    {
      ...s,
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
gr.displayName = Df;
var [jf, jr] = pt(Je, {}), vr = "SelectViewport", $s = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, i = Ge(vr, n), s = jr(vr, n), a = we(t, i.onViewportChange), c = w.useRef(0);
    return /* @__PURE__ */ Ce(Qt, { children: [
      /* @__PURE__ */ I(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ I(an.Slot, { scope: n, children: /* @__PURE__ */ I(
        ye.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...o,
          ref: a,
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
          onScroll: _e(o.onScroll, (l) => {
            const u = l.currentTarget, { contentWrapper: d, shouldExpandOnScrollRef: g } = s;
            if (g != null && g.current && d) {
              const m = Math.abs(c.current - u.scrollTop);
              if (m > 0) {
                const _ = window.innerHeight - Ne * 2, f = parseFloat(d.style.minHeight), v = parseFloat(d.style.height), h = Math.max(f, v);
                if (h < _) {
                  const E = h + m, p = Math.min(_, E), y = E - p;
                  d.style.height = p + "px", d.style.bottom === "0px" && (u.scrollTop = y > 0 ? y : 0, d.style.justifyContent = "flex-end");
                }
              }
            }
            c.current = u.scrollTop;
          })
        }
      ) })
    ] });
  }
);
$s.displayName = vr;
var Fs = "SelectGroup", [Hf, $f] = pt(Fs), Ff = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Pr();
    return /* @__PURE__ */ I(Hf, { scope: n, id: o, children: /* @__PURE__ */ I(ye.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
Ff.displayName = Fs;
var Us = "SelectLabel", Uf = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = $f(Us, n);
    return /* @__PURE__ */ I(ye.div, { id: o.id, ...r, ref: t });
  }
);
Uf.displayName = Us;
var Yt = "SelectItem", [Bf, Bs] = pt(Yt), zs = w.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: i,
      ...s
    } = e, a = Xe(Yt, n), c = Ge(Yt, n), l = a.value === r, [u, d] = w.useState(i ?? ""), [g, m] = w.useState(!1), _ = we(
      t,
      (E) => {
        var p;
        return (p = c.itemRefCallback) == null ? void 0 : p.call(c, E, r, o);
      }
    ), f = Pr(), v = w.useRef("touch"), h = () => {
      o || (a.onValueChange(r), a.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ I(
      Bf,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: f,
        isSelected: l,
        onItemTextChange: w.useCallback((E) => {
          d((p) => p || ((E == null ? void 0 : E.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ I(
          an.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: u,
            children: /* @__PURE__ */ I(
              ye.div,
              {
                role: "option",
                "aria-labelledby": f,
                "data-highlighted": g ? "" : void 0,
                "aria-selected": l && g,
                "data-state": l ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...s,
                ref: _,
                onFocus: _e(s.onFocus, () => m(!0)),
                onBlur: _e(s.onBlur, () => m(!1)),
                onClick: _e(s.onClick, () => {
                  v.current !== "mouse" && h();
                }),
                onPointerUp: _e(s.onPointerUp, () => {
                  v.current === "mouse" && h();
                }),
                onPointerDown: _e(s.onPointerDown, (E) => {
                  v.current = E.pointerType;
                }),
                onPointerMove: _e(s.onPointerMove, (E) => {
                  var p;
                  v.current = E.pointerType, o ? (p = c.onItemLeave) == null || p.call(c) : v.current === "mouse" && E.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: _e(s.onPointerLeave, (E) => {
                  var p;
                  E.currentTarget === document.activeElement && ((p = c.onItemLeave) == null || p.call(c));
                }),
                onKeyDown: _e(s.onKeyDown, (E) => {
                  var y;
                  ((y = c.searchRef) == null ? void 0 : y.current) !== "" && E.key === " " || (Cf.includes(E.key) && h(), E.key === " " && E.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
zs.displayName = Yt;
var mt = "SelectItemText", Vs = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...i } = e, s = Xe(mt, n), a = Ge(mt, n), c = Bs(mt, n), l = Tf(mt, n), [u, d] = w.useState(null), g = we(
      t,
      (h) => d(h),
      c.onItemTextChange,
      (h) => {
        var E;
        return (E = a.itemTextRefCallback) == null ? void 0 : E.call(a, h, c.value, c.disabled);
      }
    ), m = u == null ? void 0 : u.textContent, _ = w.useMemo(
      () => /* @__PURE__ */ I("option", { value: c.value, disabled: c.disabled, children: m }, c.value),
      [c.disabled, c.value, m]
    ), { onNativeOptionAdd: f, onNativeOptionRemove: v } = l;
    return Ae(() => (f(_), () => v(_)), [f, v, _]), /* @__PURE__ */ Ce(Qt, { children: [
      /* @__PURE__ */ I(ye.span, { id: c.textId, ...i, ref: g }),
      c.isSelected && s.valueNode && !s.valueNodeHasChildren ? Jt.createPortal(i.children, s.valueNode) : null
    ] });
  }
);
Vs.displayName = mt;
var qs = "SelectItemIndicator", Ws = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return Bs(qs, n).isSelected ? /* @__PURE__ */ I(ye.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
Ws.displayName = qs;
var br = "SelectScrollUpButton", Xs = w.forwardRef((e, t) => {
  const n = Ge(br, e.__scopeSelect), r = jr(br, e.__scopeSelect), [o, i] = w.useState(!1), s = we(t, r.onScrollButtonChange);
  return Ae(() => {
    if (n.viewport && n.isPositioned) {
      let a = function() {
        const l = c.scrollTop > 0;
        i(l);
      };
      const c = n.viewport;
      return a(), c.addEventListener("scroll", a), () => c.removeEventListener("scroll", a);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ I(
    Ks,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: c } = n;
        a && c && (a.scrollTop = a.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
Xs.displayName = br;
var yr = "SelectScrollDownButton", Gs = w.forwardRef((e, t) => {
  const n = Ge(yr, e.__scopeSelect), r = jr(yr, e.__scopeSelect), [o, i] = w.useState(!1), s = we(t, r.onScrollButtonChange);
  return Ae(() => {
    if (n.viewport && n.isPositioned) {
      let a = function() {
        const l = c.scrollHeight - c.clientHeight, u = Math.ceil(c.scrollTop) < l;
        i(u);
      };
      const c = n.viewport;
      return a(), c.addEventListener("scroll", a), () => c.removeEventListener("scroll", a);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ I(
    Ks,
    {
      ...e,
      ref: s,
      onAutoScroll: () => {
        const { viewport: a, selectedItem: c } = n;
        a && c && (a.scrollTop = a.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
Gs.displayName = yr;
var Ks = w.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, i = Ge("SelectScrollButton", n), s = w.useRef(null), a = cn(n), c = w.useCallback(() => {
    s.current !== null && (window.clearInterval(s.current), s.current = null);
  }, []);
  return w.useEffect(() => () => c(), [c]), Ae(() => {
    var u;
    const l = a().find((d) => d.ref.current === document.activeElement);
    (u = l == null ? void 0 : l.ref.current) == null || u.scrollIntoView({ block: "nearest" });
  }, [a]), /* @__PURE__ */ I(
    ye.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: _e(o.onPointerDown, () => {
        s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerMove: _e(o.onPointerMove, () => {
        var l;
        (l = i.onItemLeave) == null || l.call(i), s.current === null && (s.current = window.setInterval(r, 50));
      }),
      onPointerLeave: _e(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), zf = "SelectSeparator", Vf = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ I(ye.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
Vf.displayName = zf;
var _r = "SelectArrow", qf = w.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = ln(n), i = Xe(_r, n), s = Ge(_r, n);
    return i.open && s.position === "popper" ? /* @__PURE__ */ I(Tu, { ...o, ...r, ref: t }) : null;
  }
);
qf.displayName = _r;
var Wf = "SelectBubbleInput", Ys = w.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = w.useRef(null), i = we(r, o), s = Mu(t);
    return w.useEffect(() => {
      const a = o.current;
      if (!a) return;
      const c = window.HTMLSelectElement.prototype, u = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (s !== t && u) {
        const d = new Event("change", { bubbles: !0 });
        u.call(a, t), a.dispatchEvent(d);
      }
    }, [s, t]), /* @__PURE__ */ I(
      ye.select,
      {
        ...n,
        style: { ...bs, ...n.style },
        ref: i,
        defaultValue: t
      }
    );
  }
);
Ys.displayName = Wf;
function Qs(e) {
  return e === "" || e === void 0;
}
function Zs(e) {
  const t = Ye(e), n = w.useRef(""), r = w.useRef(0), o = w.useCallback(
    (s) => {
      const a = n.current + s;
      t(a), function c(l) {
        n.current = l, window.clearTimeout(r.current), l !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(a);
    },
    [t]
  ), i = w.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return w.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, i];
}
function Js(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((l) => l === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let s = Xf(e, Math.max(i, 0));
  o.length === 1 && (s = s.filter((l) => l !== n));
  const c = s.find(
    (l) => l.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Xf(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Gf = As, Kf = Ts, Yf = Is, Qf = Ls, Zf = ks, Jf = Ms, ed = $s, td = zs, nd = Vs, rd = Ws, od = Xs, id = Gs;
function sd({ ...e }) {
  return /* @__PURE__ */ I(Gf, { "data-slot": "select", ...e });
}
function ad({ ...e }) {
  return /* @__PURE__ */ I(Yf, { "data-slot": "select-value", ...e });
}
function cd({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ Ce(
    Kf,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: Pe(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ I(Qf, { asChild: !0, children: /* @__PURE__ */ I(Ni, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function ld({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ I(Zf, { children: /* @__PURE__ */ Ce(
    Jf,
    {
      "data-slot": "select-content",
      className: Pe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ I(fd, {}),
        /* @__PURE__ */ I(
          ed,
          {
            className: Pe(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ I(dd, {})
      ]
    }
  ) });
}
function ud({ className: e, children: t, ...n }) {
  return /* @__PURE__ */ Ce(
    td,
    {
      "data-slot": "select-item",
      className: Pe(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ I("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ I(rd, { children: /* @__PURE__ */ I(sc, { className: "size-4" }) }) }),
        /* @__PURE__ */ I(nd, { children: t })
      ]
    }
  );
}
function fd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    od,
    {
      "data-slot": "select-scroll-up-button",
      className: Pe("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ I(lc, { className: "size-4" })
    }
  );
}
function dd({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ I(
    id,
    {
      "data-slot": "select-scroll-down-button",
      className: Pe("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ I(Ni, { className: "size-4" })
    }
  );
}
function pd({ className: e, ...t }) {
  return /* @__PURE__ */ I(
    "textarea",
    {
      "data-slot": "textarea",
      className: Pe(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ...t
    }
  );
}
var hd = (e) => e.type === "checkbox", gt = (e) => e instanceof Date, Hr = (e) => e == null;
const ea = (e) => typeof e == "object";
var et = (e) => !Hr(e) && !Array.isArray(e) && ea(e) && !gt(e), md = (e) => et(e) && e.target ? hd(e.target) ? e.target.checked : e.target.value : e, gd = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, vd = (e, t) => e.has(gd(t)), bd = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return et(t) && t.hasOwnProperty("isPrototypeOf");
}, yd = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function ta(e) {
  let t;
  const n = Array.isArray(e), r = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(yd && (e instanceof Blob || r)) && (n || et(e)))
    if (t = n ? [] : {}, !n && !bd(e))
      t = e;
    else
      for (const o in e)
        e.hasOwnProperty(o) && (t[o] = ta(e[o]));
  else
    return e;
  return t;
}
var na = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Er = (e) => e === void 0, xe = (e, t, n) => {
  if (!t || !et(e))
    return n;
  const r = na(t.split(/[,[\].]+?/)).reduce((o, i) => Hr(o) ? o : o[i], e);
  return Er(r) || r === e ? Er(e[t]) ? n : e[t] : r;
}, Yn = (e) => typeof e == "boolean", _d = (e) => /^\w*$/.test(e), Ed = (e) => na(e.replace(/["|']|\]/g, "").split(/\.|\[/)), ti = (e, t, n) => {
  let r = -1;
  const o = _d(t) ? [t] : Ed(t), i = o.length, s = i - 1;
  for (; ++r < i; ) {
    const a = o[r];
    let c = n;
    if (r !== s) {
      const l = e[a];
      c = et(l) || Array.isArray(l) ? l : isNaN(+o[r + 1]) ? {} : [];
    }
    if (a === "__proto__" || a === "constructor" || a === "prototype")
      return;
    e[a] = c, e = e[a];
  }
};
const ni = {
  BLUR: "blur",
  CHANGE: "change"
}, ri = {
  all: "all"
}, wd = ce.createContext(null), un = () => ce.useContext(wd);
var Rd = (e, t, n, r = !0) => {
  const o = {
    defaultValues: t._defaultValues
  };
  for (const i in e)
    Object.defineProperty(o, i, {
      get: () => {
        const s = i;
        return t._proxyFormState[s] !== ri.all && (t._proxyFormState[s] = !r || ri.all), n && (n[s] = !0), e[s];
      }
    });
  return o;
}, oi = (e) => Hr(e) || !ea(e);
function ra(e, t) {
  if (oi(e) || oi(t))
    return e === t;
  if (gt(e) && gt(t))
    return e.getTime() === t.getTime();
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n) {
    const i = e[o];
    if (!r.includes(o))
      return !1;
    if (o !== "ref") {
      const s = t[o];
      if (gt(i) && gt(s) || et(i) && et(s) || Array.isArray(i) && Array.isArray(s) ? !ra(i, s) : i !== s)
        return !1;
    }
  }
  return !0;
}
const oa = (e, t) => {
  const n = w.useRef(t);
  ra(t, n.current) || (n.current = t), w.useEffect(e, n.current);
};
function Sd(e) {
  const t = un(), { control: n = t.control, disabled: r, name: o, exact: i } = e || {}, [s, a] = ce.useState(n._formState), c = ce.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return oa(() => n._subscribe({
    name: o,
    formState: c.current,
    exact: i,
    callback: (l) => {
      !r && a({
        ...n._formState,
        ...l
      });
    }
  }), [o, r, i]), ce.useEffect(() => {
    c.current.isValid && n._setValid(!0);
  }, [n]), ce.useMemo(() => Rd(s, n, c.current, !1), [s, n]);
}
var xd = (e) => typeof e == "string", Cd = (e, t, n, r, o) => xd(e) ? xe(n, e, o) : Array.isArray(e) ? e.map((i) => xe(n, i)) : n;
function Pd(e) {
  const t = un(), { control: n = t.control, name: r, defaultValue: o, disabled: i, exact: s } = e || {}, [a, c] = ce.useState(n._getWatch(r, o));
  return oa(() => n._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: s,
    callback: (l) => !i && c(Cd(r, n._names, l.values || n._formValues, !1, o))
  }), [r, o, i, s]), ce.useEffect(() => n._removeUnmounted()), a;
}
function Ad(e) {
  const t = un(), { name: n, disabled: r, control: o = t.control, shouldUnregister: i } = e, s = vd(o._names.array, n), a = Pd({
    control: o,
    name: n,
    defaultValue: xe(o._formValues, n, xe(o._defaultValues, n, e.defaultValue)),
    exact: !0
  }), c = Sd({
    control: o,
    name: n,
    exact: !0
  }), l = ce.useRef(e), u = ce.useRef(o.register(n, {
    ...e.rules,
    value: a,
    ...Yn(e.disabled) ? { disabled: e.disabled } : {}
  })), d = ce.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!xe(c.errors, n)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!xe(c.dirtyFields, n)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!xe(c.touchedFields, n)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!xe(c.validatingFields, n)
    },
    error: {
      enumerable: !0,
      get: () => xe(c.errors, n)
    }
  }), [c, n]), g = ce.useCallback((v) => u.current.onChange({
    target: {
      value: md(v),
      name: n
    },
    type: ni.CHANGE
  }), [n]), m = ce.useCallback(() => u.current.onBlur({
    target: {
      value: xe(o._formValues, n),
      name: n
    },
    type: ni.BLUR
  }), [n, o._formValues]), _ = ce.useCallback((v) => {
    const h = xe(o._fields, n);
    h && v && (h._f.ref = {
      focus: () => v.focus(),
      select: () => v.select(),
      setCustomValidity: (E) => v.setCustomValidity(E),
      reportValidity: () => v.reportValidity()
    });
  }, [o._fields, n]), f = ce.useMemo(() => ({
    name: n,
    value: a,
    ...Yn(r) || c.disabled ? { disabled: c.disabled || r } : {},
    onChange: g,
    onBlur: m,
    ref: _
  }), [n, r, c.disabled, g, m, _, a]);
  return ce.useEffect(() => {
    const v = o._options.shouldUnregister || i;
    o.register(n, {
      ...l.current.rules,
      ...Yn(l.current.disabled) ? { disabled: l.current.disabled } : {}
    });
    const h = (E, p) => {
      const y = xe(o._fields, E);
      y && y._f && (y._f.mount = p);
    };
    if (h(n, !0), v) {
      const E = ta(xe(o._options.defaultValues, n));
      ti(o._defaultValues, n, E), Er(xe(o._formValues, n)) && ti(o._formValues, n, E);
    }
    return !s && o.register(n), () => {
      (s ? v && !o._state.action : v) ? o.unregister(n) : h(n, !1);
    };
  }, [n, o, s, i]), ce.useEffect(() => {
    o._setDisabledField({
      disabled: r,
      name: n
    });
  }, [r, n, o]), ce.useMemo(() => ({
    field: f,
    formState: c,
    fieldState: d
  }), [f, c, d]);
}
const Od = (e) => e.render(Ad(e));
typeof window < "u" ? ce.useLayoutEffect : ce.useEffect;
function qd({
  label: e,
  name: t,
  type: n = "text",
  placeholder: r,
  required: o = !1,
  disabled: i = !1,
  options: s = [],
  className: a = "",
  containerClassName: c,
  leftAddon: l,
  rightAddon: u,
  labelDetailedNode: d,
  onChange: g
}) {
  var p;
  const {
    control: m,
    formState: { errors: _ }
  } = un(), f = _[t], [v, h] = mi(!1), E = () => {
    h((y) => !y);
  };
  return /* @__PURE__ */ Ce("div", { className: "space-y-2", children: [
    e && /* @__PURE__ */ Ce("div", { children: [
      /* @__PURE__ */ Ce(Zc, { className: "text-[16px] font-medium", children: [
        e,
        o && /* @__PURE__ */ I("span", { className: "text-destructive ml-1", children: "*" })
      ] }),
      d && /* @__PURE__ */ I("div", { className: "text-mid-grey-II text-xs", children: d })
    ] }),
    /* @__PURE__ */ I(
      Od,
      {
        name: t,
        control: m,
        render: ({ field: y }) => {
          const b = Pe(
            "flex h-10 w-full min-w-[400px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            f && "border-destructive",
            a
          );
          return /* @__PURE__ */ Ce("div", { className: Pe("flex items-center gap-2", c), children: [
            l && /* @__PURE__ */ I("div", { className: "flex items-center", children: l }),
            n === "textarea" ? /* @__PURE__ */ I(
              pd,
              {
                ...y,
                placeholder: r,
                disabled: i,
                className: Pe(b, "resize-y")
              }
            ) : n === "select" ? /* @__PURE__ */ Ce(sd, { onValueChange: y.onChange, value: y.value, disabled: i, children: [
              /* @__PURE__ */ I(cd, { className: Pe(b, "w-full"), children: /* @__PURE__ */ I(ad, { placeholder: r }) }),
              /* @__PURE__ */ I(ld, { children: s.map((S, P) => /* @__PURE__ */ I(ud, { value: S.value, children: S.label }, P)) })
            ] }) : n === "number" ? /* @__PURE__ */ I(
              "input",
              {
                ...y,
                type: "number",
                placeholder: r,
                disabled: i,
                className: b,
                value: y.value || "",
                onChange: (S) => y.onChange(S.target.valueAsNumber)
              }
            ) : n === "password" ? /* @__PURE__ */ Ce("div", { className: "relative w-full", children: [
              /* @__PURE__ */ I(
                Io,
                {
                  ...y,
                  type: v ? "text" : "password",
                  placeholder: r,
                  disabled: i,
                  className: b,
                  onChange: (S) => {
                    y.onChange(S), g == null || g(S);
                  }
                }
              ),
              /* @__PURE__ */ I(
                "button",
                {
                  type: "button",
                  onClick: E,
                  className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2",
                  children: v ? /* @__PURE__ */ I(fc, { size: 18 }) : /* @__PURE__ */ I(pc, { size: 18 })
                }
              )
            ] }) : /* @__PURE__ */ I(
              Io,
              {
                ...y,
                type: n,
                placeholder: r,
                disabled: i,
                className: b
              }
            ),
            u && /* @__PURE__ */ I("div", { className: "flex items-center", children: u })
          ] });
        }
      }
    ),
    f && /* @__PURE__ */ I("p", { className: "text-destructive text-sm", children: (p = f.message) == null ? void 0 : p.toString() })
  ] });
}
var ia = {}, $r = {}, fn = {};
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
})(fn);
var sa = {};
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
    let { widthInt: r, heightInt: o, blurWidth: i, blurHeight: s, blurDataURL: a, objectFit: c } = n;
    const l = 20, u = i ? i * 40 : r, d = s ? s * 40 : o, g = u && d ? "viewBox='0 0 " + u + " " + d + "'" : "", m = g ? "none" : c === "contain" ? "xMidYMid" : c === "cover" ? "xMidYMid slice" : "none";
    return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + g + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + l + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + l + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + m + "' style='filter: url(%23b);' href='" + a + "'/%3E%3C/svg%3E";
  }
})(sa);
var dn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(o, i) {
    for (var s in i) Object.defineProperty(o, s, {
      enumerable: !0,
      get: i[s]
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
})(dn);
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "getImgProps", {
    enumerable: !0,
    get: function() {
      return _;
    }
  });
  const t = fn, n = sa, r = dn, o = [
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
  function s(f) {
    return f.default !== void 0;
  }
  function a(f) {
    return f.src !== void 0;
  }
  function c(f) {
    return !!f && typeof f == "object" && (s(f) || a(f));
  }
  const l = /* @__PURE__ */ new Map();
  let u;
  function d(f) {
    return typeof f > "u" ? f : typeof f == "number" ? Number.isFinite(f) ? f : NaN : typeof f == "string" && /^[0-9]+$/.test(f) ? parseInt(f, 10) : NaN;
  }
  function g(f, v, h) {
    let { deviceSizes: E, allSizes: p } = f;
    if (h) {
      const b = /(^|\s)(1?\d?\d)vw/g, A = [];
      for (let S; S = b.exec(h); S)
        A.push(parseInt(S[2]));
      if (A.length) {
        const S = Math.min(...A) * 0.01;
        return {
          widths: p.filter((P) => P >= E[0] * S),
          kind: "w"
        };
      }
      return {
        widths: p,
        kind: "w"
      };
    }
    return typeof v != "number" ? {
      widths: E,
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
            v,
            v * 2
            /*, width * 3*/
          ].map((b) => p.find((A) => A >= b) || p[p.length - 1])
        )
      ],
      kind: "x"
    };
  }
  function m(f) {
    let { config: v, src: h, unoptimized: E, width: p, quality: y, sizes: b, loader: A } = f;
    if (E)
      return {
        src: h,
        srcSet: void 0,
        sizes: void 0
      };
    const { widths: S, kind: P } = g(v, p, b), k = S.length - 1;
    return {
      sizes: !b && P === "w" ? "100vw" : b,
      srcSet: S.map((O, N) => A({
        config: v,
        src: h,
        quality: y,
        width: O
      }) + " " + (P === "w" ? O : N + 1) + P).join(", "),
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      src: A({
        config: v,
        src: h,
        quality: y,
        width: S[k]
      })
    };
  }
  function _(f, v) {
    let { src: h, sizes: E, unoptimized: p = !1, priority: y = !1, loading: b, className: A, quality: S, width: P, height: k, fill: O = !1, style: N, overrideSrc: M, onLoad: U, onLoadingComplete: D, placeholder: $ = "empty", blurDataURL: j, fetchPriority: K, decoding: T = "async", layout: B, objectFit: J, objectPosition: ae, lazyBoundary: re, lazyRoot: ne, ...Y } = f;
    const { imgConf: le, showAltText: oe, blurComplete: R, defaultLoader: Q } = v;
    let V, W = le || r.imageConfigDefault;
    if ("allSizes" in W)
      V = W;
    else {
      var x;
      const L = [
        ...W.deviceSizes,
        ...W.imageSizes
      ].sort((fe, Se) => fe - Se), ee = W.deviceSizes.sort((fe, Se) => fe - Se), be = (x = W.qualities) == null ? void 0 : x.sort((fe, Se) => fe - Se);
      V = {
        ...W,
        allSizes: L,
        deviceSizes: ee,
        qualities: be
      };
    }
    if (typeof Q > "u")
      throw Object.defineProperty(new Error(`images.loaderFile detected but the file is missing default export.
Read more: https://nextjs.org/docs/messages/invalid-images-config`), "__NEXT_ERROR_CODE", {
        value: "E163",
        enumerable: !1,
        configurable: !0
      });
    let C = Y.loader || Q;
    delete Y.loader, delete Y.srcSet;
    const ue = "__next_img_default" in C;
    if (ue) {
      if (V.loader === "custom")
        throw Object.defineProperty(new Error('Image with src "' + h + `" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
          value: "E252",
          enumerable: !1,
          configurable: !0
        });
    } else {
      const L = C;
      C = (ee) => {
        const { config: be, ...fe } = ee;
        return L(fe);
      };
    }
    if (B) {
      B === "fill" && (O = !0);
      const L = {
        intrinsic: {
          maxWidth: "100%",
          height: "auto"
        },
        responsive: {
          width: "100%",
          height: "auto"
        }
      }, ee = {
        responsive: "100vw",
        fill: "100vw"
      }, be = L[B];
      be && (N = {
        ...N,
        ...be
      });
      const fe = ee[B];
      fe && !E && (E = fe);
    }
    let q = "", z = d(P), Z = d(k), ve, me;
    if (c(h)) {
      const L = s(h) ? h.default : h;
      if (!L.src)
        throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received " + JSON.stringify(L)), "__NEXT_ERROR_CODE", {
          value: "E460",
          enumerable: !1,
          configurable: !0
        });
      if (!L.height || !L.width)
        throw Object.defineProperty(new Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received " + JSON.stringify(L)), "__NEXT_ERROR_CODE", {
          value: "E48",
          enumerable: !1,
          configurable: !0
        });
      if (ve = L.blurWidth, me = L.blurHeight, j = j || L.blurDataURL, q = L.src, !O) {
        if (!z && !Z)
          z = L.width, Z = L.height;
        else if (z && !Z) {
          const ee = z / L.width;
          Z = Math.round(L.height * ee);
        } else if (!z && Z) {
          const ee = Z / L.height;
          z = Math.round(L.width * ee);
        }
      }
    }
    h = typeof h == "string" ? h : q;
    let de = !y && (b === "lazy" || typeof b > "u");
    (!h || h.startsWith("data:") || h.startsWith("blob:")) && (p = !0, de = !1), V.unoptimized && (p = !0), ue && !V.dangerouslyAllowSVG && h.split("?", 1)[0].endsWith(".svg") && (p = !0);
    const Re = d(S);
    if (process.env.NODE_ENV !== "production") {
      if (V.output === "export" && ue && !p)
        throw Object.defineProperty(new Error("Image Optimization using the default loader is not compatible with `{ output: 'export' }`.\n  Possible solutions:\n    - Remove `{ output: 'export' }` and run \"next start\" to run server mode including the Image Optimization API.\n    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.\n  Read more: https://nextjs.org/docs/messages/export-image-api"), "__NEXT_ERROR_CODE", {
          value: "E500",
          enumerable: !1,
          configurable: !0
        });
      if (!h)
        p = !0;
      else if (O) {
        if (P)
          throw Object.defineProperty(new Error('Image with src "' + h + '" has both "width" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
            value: "E96",
            enumerable: !1,
            configurable: !0
          });
        if (k)
          throw Object.defineProperty(new Error('Image with src "' + h + '" has both "height" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
            value: "E115",
            enumerable: !1,
            configurable: !0
          });
        if (N != null && N.position && N.position !== "absolute")
          throw Object.defineProperty(new Error('Image with src "' + h + '" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E216",
            enumerable: !1,
            configurable: !0
          });
        if (N != null && N.width && N.width !== "100%")
          throw Object.defineProperty(new Error('Image with src "' + h + '" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E73",
            enumerable: !1,
            configurable: !0
          });
        if (N != null && N.height && N.height !== "100%")
          throw Object.defineProperty(new Error('Image with src "' + h + '" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E404",
            enumerable: !1,
            configurable: !0
          });
      } else {
        if (typeof z > "u")
          throw Object.defineProperty(new Error('Image with src "' + h + '" is missing required "width" property.'), "__NEXT_ERROR_CODE", {
            value: "E451",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(z))
          throw Object.defineProperty(new Error('Image with src "' + h + '" has invalid "width" property. Expected a numeric value in pixels but received "' + P + '".'), "__NEXT_ERROR_CODE", {
            value: "E66",
            enumerable: !1,
            configurable: !0
          });
        if (typeof Z > "u")
          throw Object.defineProperty(new Error('Image with src "' + h + '" is missing required "height" property.'), "__NEXT_ERROR_CODE", {
            value: "E397",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(Z))
          throw Object.defineProperty(new Error('Image with src "' + h + '" has invalid "height" property. Expected a numeric value in pixels but received "' + k + '".'), "__NEXT_ERROR_CODE", {
            value: "E444",
            enumerable: !1,
            configurable: !0
          });
        if (/^[\x00-\x20]/.test(h))
          throw Object.defineProperty(new Error('Image with src "' + h + '" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
            value: "E176",
            enumerable: !1,
            configurable: !0
          });
        if (/[\x00-\x20]$/.test(h))
          throw Object.defineProperty(new Error('Image with src "' + h + '" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
            value: "E21",
            enumerable: !1,
            configurable: !0
          });
      }
      if (!o.includes(b))
        throw Object.defineProperty(new Error('Image with src "' + h + '" has invalid "loading" property. Provided "' + b + '" should be one of ' + o.map(String).join(",") + "."), "__NEXT_ERROR_CODE", {
          value: "E357",
          enumerable: !1,
          configurable: !0
        });
      if (y && b === "lazy")
        throw Object.defineProperty(new Error('Image with src "' + h + `" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
          value: "E218",
          enumerable: !1,
          configurable: !0
        });
      if ($ !== "empty" && $ !== "blur" && !$.startsWith("data:image/"))
        throw Object.defineProperty(new Error('Image with src "' + h + '" has invalid "placeholder" property "' + $ + '".'), "__NEXT_ERROR_CODE", {
          value: "E431",
          enumerable: !1,
          configurable: !0
        });
      if ($ !== "empty" && z && Z && z * Z < 1600 && (0, t.warnOnce)('Image with src "' + h + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.'), $ === "blur" && !j) {
        const L = [
          "jpeg",
          "png",
          "webp",
          "avif"
        ];
        throw Object.defineProperty(new Error('Image with src "' + h + `" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ` + L.join(",") + ` (animated images not supported)
          - Remove the "placeholder" property, effectively no blur effect
        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`), "__NEXT_ERROR_CODE", {
          value: "E371",
          enumerable: !1,
          configurable: !0
        });
      }
      if ("ref" in Y && (0, t.warnOnce)('Image with src "' + h + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.'), !p && !ue) {
        const L = C({
          config: V,
          src: h,
          width: z || 400,
          quality: Re || 75
        });
        let ee;
        try {
          ee = new URL(L);
        } catch {
        }
        (L === h || ee && ee.pathname === h && !ee.search) && (0, t.warnOnce)('Image with src "' + h + `" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
      }
      D && (0, t.warnOnce)('Image with src "' + h + '" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.');
      for (const [L, ee] of Object.entries({
        layout: B,
        objectFit: J,
        objectPosition: ae,
        lazyBoundary: re,
        lazyRoot: ne
      }))
        ee && (0, t.warnOnce)('Image with src "' + h + '" has legacy prop "' + L + `". Did you forget to run the codemod?
Read more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
      if (typeof window < "u" && !u && window.PerformanceObserver) {
        u = new PerformanceObserver((L) => {
          for (const be of L.getEntries()) {
            var ee;
            const fe = (be == null || (ee = be.element) == null ? void 0 : ee.src) || "", Se = l.get(fe);
            Se && !Se.priority && Se.placeholder === "empty" && !Se.src.startsWith("data:") && !Se.src.startsWith("blob:") && (0, t.warnOnce)('Image with src "' + Se.src + `" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
Read more: https://nextjs.org/docs/api-reference/next/image#priority`);
          }
        });
        try {
          u.observe({
            type: "largest-contentful-paint",
            buffered: !0
          });
        } catch (L) {
          console.error(L);
        }
      }
    }
    const ge = Object.assign(O ? {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      objectFit: J,
      objectPosition: ae
    } : {}, oe ? {} : {
      color: "transparent"
    }, N), te = !R && $ !== "empty" ? $ === "blur" ? 'url("data:image/svg+xml;charset=utf-8,' + (0, n.getImageBlurSvg)({
      widthInt: z,
      heightInt: Z,
      blurWidth: ve,
      blurHeight: me,
      blurDataURL: j || "",
      objectFit: ge.objectFit
    }) + '")' : 'url("' + $ + '")' : null, ie = i.includes(ge.objectFit) ? ge.objectFit === "fill" ? "100% 100%" : "cover" : ge.objectFit;
    let he = te ? {
      backgroundSize: ie,
      backgroundPosition: ge.objectPosition || "50% 50%",
      backgroundRepeat: "no-repeat",
      backgroundImage: te
    } : {};
    process.env.NODE_ENV === "development" && he.backgroundImage && $ === "blur" && j != null && j.startsWith("/") && (he.backgroundImage = 'url("' + j + '")');
    const F = m({
      config: V,
      src: h,
      unoptimized: p,
      width: z,
      quality: Re,
      sizes: E,
      loader: C
    });
    if (process.env.NODE_ENV !== "production" && typeof window < "u") {
      let L;
      try {
        L = new URL(F.src);
      } catch {
        L = new URL(F.src, window.location.href);
      }
      l.set(L.href, {
        src: h,
        priority: y,
        placeholder: $
      });
    }
    return {
      props: {
        ...Y,
        loading: de ? "lazy" : b,
        fetchPriority: K,
        width: z,
        height: Z,
        decoding: T,
        className: A,
        style: {
          ...ge,
          ...he
        },
        sizes: F.sizes,
        srcSet: F.srcSet,
        src: M || F.src
      },
      meta: {
        unoptimized: p,
        priority: y,
        placeholder: $,
        fill: O
      }
    };
  }
})($r);
var wr = { exports: {} }, Ut = { exports: {} }, Qn = {}, ii;
function Td() {
  return ii || (ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const t = ce, n = typeof window > "u", r = n ? () => {
    } : t.useLayoutEffect, o = n ? () => {
    } : t.useEffect;
    function i(s) {
      const { headManager: a, reduceComponentsToState: c } = s;
      function l() {
        if (a && a.mountedInstances) {
          const d = t.Children.toArray(Array.from(a.mountedInstances).filter(Boolean));
          a.updateHead(c(d, s));
        }
      }
      if (n) {
        var u;
        a == null || (u = a.mountedInstances) == null || u.add(s.children), l();
      }
      return r(() => {
        var d;
        return a == null || (d = a.mountedInstances) == null || d.add(s.children), () => {
          var g;
          a == null || (g = a.mountedInstances) == null || g.delete(s.children);
        };
      }), r(() => (a && (a._pendingUpdate = l), () => {
        a && (a._pendingUpdate = l);
      })), o(() => (a && a._pendingUpdate && (a._pendingUpdate(), a._pendingUpdate = null), () => {
        a && a._pendingUpdate && (a._pendingUpdate(), a._pendingUpdate = null);
      })), null;
    }
  }(Qn)), Qn;
}
var Zn = {}, si;
function Nd() {
  return si || (si = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "AmpStateContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ We._(ce)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "AmpStateContext");
  }(Zn)), Zn;
}
var Jn = {}, ai;
function Id() {
  return ai || (ai = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "HeadManagerContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ We._(ce)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "HeadManagerContext");
  }(Jn)), Jn;
}
var er = {}, ci;
function Ld() {
  return ci || (ci = 1, function(e) {
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
  }(er)), er;
}
var li;
function kd() {
  return li || (li = 1, function(e, t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(p, y) {
      for (var b in y) Object.defineProperty(p, b, {
        enumerable: !0,
        get: y[b]
      });
    }
    n(t, {
      default: function() {
        return E;
      },
      defaultHead: function() {
        return g;
      }
    });
    const r = We, o = _t, i = Rr, s = /* @__PURE__ */ o._(ce), a = /* @__PURE__ */ r._(Td()), c = Nd(), l = Id(), u = Ld(), d = fn;
    function g(p) {
      p === void 0 && (p = !1);
      const y = [
        /* @__PURE__ */ (0, i.jsx)("meta", {
          charSet: "utf-8"
        }, "charset")
      ];
      return p || y.push(/* @__PURE__ */ (0, i.jsx)("meta", {
        name: "viewport",
        content: "width=device-width"
      }, "viewport")), y;
    }
    function m(p, y) {
      return typeof y == "string" || typeof y == "number" ? p : y.type === s.default.Fragment ? p.concat(
        // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
        s.default.Children.toArray(y.props.children).reduce(
          // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
          (b, A) => typeof A == "string" || typeof A == "number" ? b : b.concat(A),
          []
        )
      ) : p.concat(y);
    }
    const _ = [
      "name",
      "httpEquiv",
      "charSet",
      "itemProp"
    ];
    function f() {
      const p = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Set(), b = /* @__PURE__ */ new Set(), A = {};
      return (S) => {
        let P = !0, k = !1;
        if (S.key && typeof S.key != "number" && S.key.indexOf("$") > 0) {
          k = !0;
          const O = S.key.slice(S.key.indexOf("$") + 1);
          p.has(O) ? P = !1 : p.add(O);
        }
        switch (S.type) {
          case "title":
          case "base":
            y.has(S.type) ? P = !1 : y.add(S.type);
            break;
          case "meta":
            for (let O = 0, N = _.length; O < N; O++) {
              const M = _[O];
              if (S.props.hasOwnProperty(M))
                if (M === "charSet")
                  b.has(M) ? P = !1 : b.add(M);
                else {
                  const U = S.props[M], D = A[M] || /* @__PURE__ */ new Set();
                  (M !== "name" || !k) && D.has(U) ? P = !1 : (D.add(U), A[M] = D);
                }
            }
            break;
        }
        return P;
      };
    }
    function v(p, y) {
      const { inAmpMode: b } = y;
      return p.reduce(m, []).reverse().concat(g(b).reverse()).filter(f()).reverse().map((A, S) => {
        const P = A.key || S;
        if (process.env.NODE_ENV !== "development" && process.env.__NEXT_OPTIMIZE_FONTS && !b && A.type === "link" && A.props.href && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
        [
          "https://fonts.googleapis.com/css",
          "https://use.typekit.net/"
        ].some((k) => A.props.href.startsWith(k))) {
          const k = {
            ...A.props || {}
          };
          return k["data-href"] = k.href, k.href = void 0, k["data-optimized-fonts"] = !0, /* @__PURE__ */ s.default.cloneElement(A, k);
        }
        if (process.env.NODE_ENV === "development")
          if (A.type === "script" && A.props.type !== "application/ld+json") {
            const k = A.props.src ? '<script> tag with src="' + A.props.src + '"' : "inline <script>";
            (0, d.warnOnce)("Do not add <script> tags using next/head (see " + k + `). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
          } else A.type === "link" && A.props.rel === "stylesheet" && (0, d.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + A.props.href + `"). Use Document instead. 
See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
        return /* @__PURE__ */ s.default.cloneElement(A, {
          key: P
        });
      });
    }
    function h(p) {
      let { children: y } = p;
      const b = (0, s.useContext)(c.AmpStateContext), A = (0, s.useContext)(l.HeadManagerContext);
      return /* @__PURE__ */ (0, i.jsx)(a.default, {
        reduceComponentsToState: v,
        headManager: A,
        inAmpMode: (0, u.isInAmpMode)(b),
        children: y
      });
    }
    const E = h;
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Ut, Ut.exports)), Ut.exports;
}
var tr = {}, ui;
function Md() {
  return ui || (ui = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ImageConfigContext", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = /* @__PURE__ */ We._(ce), r = dn, o = n.default.createContext(r.imageConfigDefault);
    process.env.NODE_ENV !== "production" && (o.displayName = "ImageConfigContext");
  }(tr)), tr;
}
var nr = {}, rr = {}, or = { exports: {} }, fi;
function aa() {
  return fi || (fi = 1, (() => {
    var e = { 170: (o, i, s) => {
      const a = s(510), c = () => {
        if (typeof navigator < "u" && navigator.platform) {
          const u = navigator.platform.toLowerCase();
          return u === "win32" || u === "windows";
        }
        return typeof process < "u" && process.platform ? process.platform === "win32" : !1;
      };
      function l(u, d, g = !1) {
        return d && (d.windows === null || d.windows === void 0) && (d = { ...d, windows: c() }), a(u, d, g);
      }
      Object.assign(l, a), o.exports = l;
    }, 154: (o) => {
      const i = "\\\\/", s = `[^${i}]`, a = "\\.", c = "\\+", l = "\\?", u = "\\/", d = "(?=.)", g = "[^/]", m = `(?:${u}|$)`, _ = `(?:^|${u})`, f = `${a}{1,2}${m}`, v = `(?!${a})`, h = `(?!${_}${f})`, E = `(?!${a}{0,1}${m})`, p = `(?!${f})`, y = `[^.${u}]`, b = `${g}*?`, S = { DOT_LITERAL: a, PLUS_LITERAL: c, QMARK_LITERAL: l, SLASH_LITERAL: u, ONE_CHAR: d, QMARK: g, END_ANCHOR: m, DOTS_SLASH: f, NO_DOT: v, NO_DOTS: h, NO_DOT_SLASH: E, NO_DOTS_SLASH: p, QMARK_NO_DOT: y, STAR: b, START_ANCHOR: _, SEP: "/" }, P = { ...S, SLASH_LITERAL: `[${i}]`, QMARK: s, STAR: `${s}*?`, DOTS_SLASH: `${a}{1,2}(?:[${i}]|$)`, NO_DOT: `(?!${a})`, NO_DOTS: `(?!(?:^|[${i}])${a}{1,2}(?:[${i}]|$))`, NO_DOT_SLASH: `(?!${a}{0,1}(?:[${i}]|$))`, NO_DOTS_SLASH: `(?!${a}{1,2}(?:[${i}]|$))`, QMARK_NO_DOT: `[^.${i}]`, START_ANCHOR: `(?:^|[${i}])`, END_ANCHOR: `(?:[${i}]|$)`, SEP: "\\" }, k = { alnum: "a-zA-Z0-9", alpha: "a-zA-Z", ascii: "\\x00-\\x7F", blank: " \\t", cntrl: "\\x00-\\x1F\\x7F", digit: "0-9", graph: "\\x21-\\x7E", lower: "a-z", print: "\\x20-\\x7E ", punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~", space: " \\t\\r\\n\\v\\f", upper: "A-Z", word: "A-Za-z0-9_", xdigit: "A-Fa-f0-9" };
      o.exports = { MAX_LENGTH: 65536, POSIX_REGEX_SOURCE: k, REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g, REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/, REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/, REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g, REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g, REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g, REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" }, CHAR_0: 48, CHAR_9: 57, CHAR_UPPERCASE_A: 65, CHAR_LOWERCASE_A: 97, CHAR_UPPERCASE_Z: 90, CHAR_LOWERCASE_Z: 122, CHAR_LEFT_PARENTHESES: 40, CHAR_RIGHT_PARENTHESES: 41, CHAR_ASTERISK: 42, CHAR_AMPERSAND: 38, CHAR_AT: 64, CHAR_BACKWARD_SLASH: 92, CHAR_CARRIAGE_RETURN: 13, CHAR_CIRCUMFLEX_ACCENT: 94, CHAR_COLON: 58, CHAR_COMMA: 44, CHAR_DOT: 46, CHAR_DOUBLE_QUOTE: 34, CHAR_EQUAL: 61, CHAR_EXCLAMATION_MARK: 33, CHAR_FORM_FEED: 12, CHAR_FORWARD_SLASH: 47, CHAR_GRAVE_ACCENT: 96, CHAR_HASH: 35, CHAR_HYPHEN_MINUS: 45, CHAR_LEFT_ANGLE_BRACKET: 60, CHAR_LEFT_CURLY_BRACE: 123, CHAR_LEFT_SQUARE_BRACKET: 91, CHAR_LINE_FEED: 10, CHAR_NO_BREAK_SPACE: 160, CHAR_PERCENT: 37, CHAR_PLUS: 43, CHAR_QUESTION_MARK: 63, CHAR_RIGHT_ANGLE_BRACKET: 62, CHAR_RIGHT_CURLY_BRACE: 125, CHAR_RIGHT_SQUARE_BRACKET: 93, CHAR_SEMICOLON: 59, CHAR_SINGLE_QUOTE: 39, CHAR_SPACE: 32, CHAR_TAB: 9, CHAR_UNDERSCORE: 95, CHAR_VERTICAL_LINE: 124, CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, extglobChars(O) {
        return { "!": { type: "negate", open: "(?:(?!(?:", close: `))${O.STAR})` }, "?": { type: "qmark", open: "(?:", close: ")?" }, "+": { type: "plus", open: "(?:", close: ")+" }, "*": { type: "star", open: "(?:", close: ")*" }, "@": { type: "at", open: "(?:", close: ")" } };
      }, globChars(O) {
        return O === !0 ? P : S;
      } };
    }, 697: (o, i, s) => {
      const a = s(154), c = s(96), { MAX_LENGTH: l, POSIX_REGEX_SOURCE: u, REGEX_NON_SPECIAL_CHARS: d, REGEX_SPECIAL_CHARS_BACKREF: g, REPLACEMENTS: m } = a, _ = (h, E) => {
        if (typeof E.expandRange == "function")
          return E.expandRange(...h, E);
        h.sort();
        const p = `[${h.join("-")}]`;
        try {
          new RegExp(p);
        } catch {
          return h.map((b) => c.escapeRegex(b)).join("..");
        }
        return p;
      }, f = (h, E) => `Missing ${h}: "${E}" - use "\\\\${E}" to match literal characters`, v = (h, E) => {
        if (typeof h != "string")
          throw new TypeError("Expected a string");
        h = m[h] || h;
        const p = { ...E }, y = typeof p.maxLength == "number" ? Math.min(l, p.maxLength) : l;
        let b = h.length;
        if (b > y)
          throw new SyntaxError(`Input length: ${b}, exceeds maximum allowed length: ${y}`);
        const A = { type: "bos", value: "", output: p.prepend || "" }, S = [A], P = p.capture ? "" : "?:", k = a.globChars(p.windows), O = a.extglobChars(k), { DOT_LITERAL: N, PLUS_LITERAL: M, SLASH_LITERAL: U, ONE_CHAR: D, DOTS_SLASH: $, NO_DOT: j, NO_DOT_SLASH: K, NO_DOTS_SLASH: T, QMARK: B, QMARK_NO_DOT: J, STAR: ae, START_ANCHOR: re } = k, ne = (F) => `(${P}(?:(?!${re}${F.dot ? $ : N}).)*?)`, Y = p.dot ? "" : j, le = p.dot ? B : J;
        let oe = p.bash === !0 ? ne(p) : ae;
        p.capture && (oe = `(${oe})`), typeof p.noext == "boolean" && (p.noextglob = p.noext);
        const R = { input: h, index: -1, start: 0, dot: p.dot === !0, consumed: "", output: "", prefix: "", backtrack: !1, negated: !1, brackets: 0, braces: 0, parens: 0, quotes: 0, globstar: !1, tokens: S };
        h = c.removePrefix(h, R), b = h.length;
        const Q = [], V = [], W = [];
        let x = A, C;
        const ue = () => R.index === b - 1, q = R.peek = (F = 1) => h[R.index + F], z = R.advance = () => h[++R.index] || "", Z = () => h.slice(R.index + 1), ve = (F = "", pe = 0) => {
          R.consumed += F, R.index += pe;
        }, me = (F) => {
          R.output += F.output != null ? F.output : F.value, ve(F.value);
        }, de = () => {
          let F = 1;
          for (; q() === "!" && (q(2) !== "(" || q(3) === "?"); )
            z(), R.start++, F++;
          return F % 2 === 0 ? !1 : (R.negated = !0, R.start++, !0);
        }, Re = (F) => {
          R[F]++, W.push(F);
        }, ge = (F) => {
          R[F]--, W.pop();
        }, te = (F) => {
          if (x.type === "globstar") {
            const pe = R.braces > 0 && (F.type === "comma" || F.type === "brace"), H = F.extglob === !0 || Q.length && (F.type === "pipe" || F.type === "paren");
            F.type !== "slash" && F.type !== "paren" && !pe && !H && (R.output = R.output.slice(0, -x.output.length), x.type = "star", x.value = "*", x.output = oe, R.output += x.output);
          }
          if (Q.length && F.type !== "paren" && (Q[Q.length - 1].inner += F.value), (F.value || F.output) && me(F), x && x.type === "text" && F.type === "text") {
            x.output = (x.output || x.value) + F.value, x.value += F.value;
            return;
          }
          F.prev = x, S.push(F), x = F;
        }, ie = (F, pe) => {
          const H = { ...O[pe], conditions: 1, inner: "" };
          H.prev = x, H.parens = R.parens, H.output = R.output;
          const L = (p.capture ? "(" : "") + H.open;
          Re("parens"), te({ type: F, value: pe, output: R.output ? "" : D }), te({ type: "paren", extglob: !0, value: z(), output: L }), Q.push(H);
        }, he = (F) => {
          let pe = F.close + (p.capture ? ")" : ""), H;
          if (F.type === "negate") {
            let L = oe;
            if (F.inner && F.inner.length > 1 && F.inner.includes("/") && (L = ne(p)), (L !== oe || ue() || /^\)+$/.test(Z())) && (pe = F.close = `)$))${L}`), F.inner.includes("*") && (H = Z()) && /^\.[^\\/.]+$/.test(H)) {
              const ee = v(H, { ...E, fastpaths: !1 }).output;
              pe = F.close = `)${ee})${L})`;
            }
            F.prev.type === "bos" && (R.negatedExtglob = !0);
          }
          te({ type: "paren", extglob: !0, value: C, output: pe }), ge("parens");
        };
        if (p.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(h)) {
          let F = !1, pe = h.replace(g, (H, L, ee, be, fe, Se) => be === "\\" ? (F = !0, H) : be === "?" ? L ? L + be + (fe ? B.repeat(fe.length) : "") : Se === 0 ? le + (fe ? B.repeat(fe.length) : "") : B.repeat(ee.length) : be === "." ? N.repeat(ee.length) : be === "*" ? L ? L + be + (fe ? oe : "") : oe : L ? H : `\\${H}`);
          return F === !0 && (p.unescape === !0 ? pe = pe.replace(/\\/g, "") : pe = pe.replace(/\\+/g, (H) => H.length % 2 === 0 ? "\\\\" : H ? "\\" : "")), pe === h && p.contains === !0 ? (R.output = h, R) : (R.output = c.wrapOutput(pe, R, E), R);
        }
        for (; !ue(); ) {
          if (C = z(), C === "\0")
            continue;
          if (C === "\\") {
            const H = q();
            if (H === "/" && p.bash !== !0 || H === "." || H === ";")
              continue;
            if (!H) {
              C += "\\", te({ type: "text", value: C });
              continue;
            }
            const L = /^\\+/.exec(Z());
            let ee = 0;
            if (L && L[0].length > 2 && (ee = L[0].length, R.index += ee, ee % 2 !== 0 && (C += "\\")), p.unescape === !0 ? C = z() : C += z(), R.brackets === 0) {
              te({ type: "text", value: C });
              continue;
            }
          }
          if (R.brackets > 0 && (C !== "]" || x.value === "[" || x.value === "[^")) {
            if (p.posix !== !1 && C === ":") {
              const H = x.value.slice(1);
              if (H.includes("[") && (x.posix = !0, H.includes(":"))) {
                const L = x.value.lastIndexOf("["), ee = x.value.slice(0, L), be = x.value.slice(L + 2), fe = u[be];
                if (fe) {
                  x.value = ee + fe, R.backtrack = !0, z(), !A.output && S.indexOf(x) === 1 && (A.output = D);
                  continue;
                }
              }
            }
            (C === "[" && q() !== ":" || C === "-" && q() === "]") && (C = `\\${C}`), C === "]" && (x.value === "[" || x.value === "[^") && (C = `\\${C}`), p.posix === !0 && C === "!" && x.value === "[" && (C = "^"), x.value += C, me({ value: C });
            continue;
          }
          if (R.quotes === 1 && C !== '"') {
            C = c.escapeRegex(C), x.value += C, me({ value: C });
            continue;
          }
          if (C === '"') {
            R.quotes = R.quotes === 1 ? 0 : 1, p.keepQuotes === !0 && te({ type: "text", value: C });
            continue;
          }
          if (C === "(") {
            Re("parens"), te({ type: "paren", value: C });
            continue;
          }
          if (C === ")") {
            if (R.parens === 0 && p.strictBrackets === !0)
              throw new SyntaxError(f("opening", "("));
            const H = Q[Q.length - 1];
            if (H && R.parens === H.parens + 1) {
              he(Q.pop());
              continue;
            }
            te({ type: "paren", value: C, output: R.parens ? ")" : "\\)" }), ge("parens");
            continue;
          }
          if (C === "[") {
            if (p.nobracket === !0 || !Z().includes("]")) {
              if (p.nobracket !== !0 && p.strictBrackets === !0)
                throw new SyntaxError(f("closing", "]"));
              C = `\\${C}`;
            } else
              Re("brackets");
            te({ type: "bracket", value: C });
            continue;
          }
          if (C === "]") {
            if (p.nobracket === !0 || x && x.type === "bracket" && x.value.length === 1) {
              te({ type: "text", value: C, output: `\\${C}` });
              continue;
            }
            if (R.brackets === 0) {
              if (p.strictBrackets === !0)
                throw new SyntaxError(f("opening", "["));
              te({ type: "text", value: C, output: `\\${C}` });
              continue;
            }
            ge("brackets");
            const H = x.value.slice(1);
            if (x.posix !== !0 && H[0] === "^" && !H.includes("/") && (C = `/${C}`), x.value += C, me({ value: C }), p.literalBrackets === !1 || c.hasRegexChars(H))
              continue;
            const L = c.escapeRegex(x.value);
            if (R.output = R.output.slice(0, -x.value.length), p.literalBrackets === !0) {
              R.output += L, x.value = L;
              continue;
            }
            x.value = `(${P}${L}|${x.value})`, R.output += x.value;
            continue;
          }
          if (C === "{" && p.nobrace !== !0) {
            Re("braces");
            const H = { type: "brace", value: C, output: "(", outputIndex: R.output.length, tokensIndex: R.tokens.length };
            V.push(H), te(H);
            continue;
          }
          if (C === "}") {
            const H = V[V.length - 1];
            if (p.nobrace === !0 || !H) {
              te({ type: "text", value: C, output: C });
              continue;
            }
            let L = ")";
            if (H.dots === !0) {
              const ee = S.slice(), be = [];
              for (let fe = ee.length - 1; fe >= 0 && (S.pop(), ee[fe].type !== "brace"); fe--)
                ee[fe].type !== "dots" && be.unshift(ee[fe].value);
              L = _(be, p), R.backtrack = !0;
            }
            if (H.comma !== !0 && H.dots !== !0) {
              const ee = R.output.slice(0, H.outputIndex), be = R.tokens.slice(H.tokensIndex);
              H.value = H.output = "\\{", C = L = "\\}", R.output = ee;
              for (const fe of be)
                R.output += fe.output || fe.value;
            }
            te({ type: "brace", value: C, output: L }), ge("braces"), V.pop();
            continue;
          }
          if (C === "|") {
            Q.length > 0 && Q[Q.length - 1].conditions++, te({ type: "text", value: C });
            continue;
          }
          if (C === ",") {
            let H = C;
            const L = V[V.length - 1];
            L && W[W.length - 1] === "braces" && (L.comma = !0, H = "|"), te({ type: "comma", value: C, output: H });
            continue;
          }
          if (C === "/") {
            if (x.type === "dot" && R.index === R.start + 1) {
              R.start = R.index + 1, R.consumed = "", R.output = "", S.pop(), x = A;
              continue;
            }
            te({ type: "slash", value: C, output: U });
            continue;
          }
          if (C === ".") {
            if (R.braces > 0 && x.type === "dot") {
              x.value === "." && (x.output = N);
              const H = V[V.length - 1];
              x.type = "dots", x.output += C, x.value += C, H.dots = !0;
              continue;
            }
            if (R.braces + R.parens === 0 && x.type !== "bos" && x.type !== "slash") {
              te({ type: "text", value: C, output: N });
              continue;
            }
            te({ type: "dot", value: C, output: N });
            continue;
          }
          if (C === "?") {
            if (!(x && x.value === "(") && p.noextglob !== !0 && q() === "(" && q(2) !== "?") {
              ie("qmark", C);
              continue;
            }
            if (x && x.type === "paren") {
              const L = q();
              let ee = C;
              (x.value === "(" && !/[!=<:]/.test(L) || L === "<" && !/<([!=]|\w+>)/.test(Z())) && (ee = `\\${C}`), te({ type: "text", value: C, output: ee });
              continue;
            }
            if (p.dot !== !0 && (x.type === "slash" || x.type === "bos")) {
              te({ type: "qmark", value: C, output: J });
              continue;
            }
            te({ type: "qmark", value: C, output: B });
            continue;
          }
          if (C === "!") {
            if (p.noextglob !== !0 && q() === "(" && (q(2) !== "?" || !/[!=<:]/.test(q(3)))) {
              ie("negate", C);
              continue;
            }
            if (p.nonegate !== !0 && R.index === 0) {
              de();
              continue;
            }
          }
          if (C === "+") {
            if (p.noextglob !== !0 && q() === "(" && q(2) !== "?") {
              ie("plus", C);
              continue;
            }
            if (x && x.value === "(" || p.regex === !1) {
              te({ type: "plus", value: C, output: M });
              continue;
            }
            if (x && (x.type === "bracket" || x.type === "paren" || x.type === "brace") || R.parens > 0) {
              te({ type: "plus", value: C });
              continue;
            }
            te({ type: "plus", value: M });
            continue;
          }
          if (C === "@") {
            if (p.noextglob !== !0 && q() === "(" && q(2) !== "?") {
              te({ type: "at", extglob: !0, value: C, output: "" });
              continue;
            }
            te({ type: "text", value: C });
            continue;
          }
          if (C !== "*") {
            (C === "$" || C === "^") && (C = `\\${C}`);
            const H = d.exec(Z());
            H && (C += H[0], R.index += H[0].length), te({ type: "text", value: C });
            continue;
          }
          if (x && (x.type === "globstar" || x.star === !0)) {
            x.type = "star", x.star = !0, x.value += C, x.output = oe, R.backtrack = !0, R.globstar = !0, ve(C);
            continue;
          }
          let F = Z();
          if (p.noextglob !== !0 && /^\([^?]/.test(F)) {
            ie("star", C);
            continue;
          }
          if (x.type === "star") {
            if (p.noglobstar === !0) {
              ve(C);
              continue;
            }
            const H = x.prev, L = H.prev, ee = H.type === "slash" || H.type === "bos", be = L && (L.type === "star" || L.type === "globstar");
            if (p.bash === !0 && (!ee || F[0] && F[0] !== "/")) {
              te({ type: "star", value: C, output: "" });
              continue;
            }
            const fe = R.braces > 0 && (H.type === "comma" || H.type === "brace"), Se = Q.length && (H.type === "pipe" || H.type === "paren");
            if (!ee && H.type !== "paren" && !fe && !Se) {
              te({ type: "star", value: C, output: "" });
              continue;
            }
            for (; F.slice(0, 3) === "/**"; ) {
              const wt = h[R.index + 4];
              if (wt && wt !== "/")
                break;
              F = F.slice(3), ve("/**", 3);
            }
            if (H.type === "bos" && ue()) {
              x.type = "globstar", x.value += C, x.output = ne(p), R.output = x.output, R.globstar = !0, ve(C);
              continue;
            }
            if (H.type === "slash" && H.prev.type !== "bos" && !be && ue()) {
              R.output = R.output.slice(0, -(H.output + x.output).length), H.output = `(?:${H.output}`, x.type = "globstar", x.output = ne(p) + (p.strictSlashes ? ")" : "|$)"), x.value += C, R.globstar = !0, R.output += H.output + x.output, ve(C);
              continue;
            }
            if (H.type === "slash" && H.prev.type !== "bos" && F[0] === "/") {
              const wt = F[1] !== void 0 ? "|$" : "";
              R.output = R.output.slice(0, -(H.output + x.output).length), H.output = `(?:${H.output}`, x.type = "globstar", x.output = `${ne(p)}${U}|${U}${wt})`, x.value += C, R.output += H.output + x.output, R.globstar = !0, ve(C + z()), te({ type: "slash", value: "/", output: "" });
              continue;
            }
            if (H.type === "bos" && F[0] === "/") {
              x.type = "globstar", x.value += C, x.output = `(?:^|${U}|${ne(p)}${U})`, R.output = x.output, R.globstar = !0, ve(C + z()), te({ type: "slash", value: "/", output: "" });
              continue;
            }
            R.output = R.output.slice(0, -x.output.length), x.type = "globstar", x.output = ne(p), x.value += C, R.output += x.output, R.globstar = !0, ve(C);
            continue;
          }
          const pe = { type: "star", value: C, output: oe };
          if (p.bash === !0) {
            pe.output = ".*?", (x.type === "bos" || x.type === "slash") && (pe.output = Y + pe.output), te(pe);
            continue;
          }
          if (x && (x.type === "bracket" || x.type === "paren") && p.regex === !0) {
            pe.output = C, te(pe);
            continue;
          }
          (R.index === R.start || x.type === "slash" || x.type === "dot") && (x.type === "dot" ? (R.output += K, x.output += K) : p.dot === !0 ? (R.output += T, x.output += T) : (R.output += Y, x.output += Y), q() !== "*" && (R.output += D, x.output += D)), te(pe);
        }
        for (; R.brackets > 0; ) {
          if (p.strictBrackets === !0) throw new SyntaxError(f("closing", "]"));
          R.output = c.escapeLast(R.output, "["), ge("brackets");
        }
        for (; R.parens > 0; ) {
          if (p.strictBrackets === !0) throw new SyntaxError(f("closing", ")"));
          R.output = c.escapeLast(R.output, "("), ge("parens");
        }
        for (; R.braces > 0; ) {
          if (p.strictBrackets === !0) throw new SyntaxError(f("closing", "}"));
          R.output = c.escapeLast(R.output, "{"), ge("braces");
        }
        if (p.strictSlashes !== !0 && (x.type === "star" || x.type === "bracket") && te({ type: "maybe_slash", value: "", output: `${U}?` }), R.backtrack === !0) {
          R.output = "";
          for (const F of R.tokens)
            R.output += F.output != null ? F.output : F.value, F.suffix && (R.output += F.suffix);
        }
        return R;
      };
      v.fastpaths = (h, E) => {
        const p = { ...E }, y = typeof p.maxLength == "number" ? Math.min(l, p.maxLength) : l, b = h.length;
        if (b > y)
          throw new SyntaxError(`Input length: ${b}, exceeds maximum allowed length: ${y}`);
        h = m[h] || h;
        const { DOT_LITERAL: A, SLASH_LITERAL: S, ONE_CHAR: P, DOTS_SLASH: k, NO_DOT: O, NO_DOTS: N, NO_DOTS_SLASH: M, STAR: U, START_ANCHOR: D } = a.globChars(p.windows), $ = p.dot ? N : O, j = p.dot ? M : O, K = p.capture ? "" : "?:", T = { negated: !1, prefix: "" };
        let B = p.bash === !0 ? ".*?" : U;
        p.capture && (B = `(${B})`);
        const J = (Y) => Y.noglobstar === !0 ? B : `(${K}(?:(?!${D}${Y.dot ? k : A}).)*?)`, ae = (Y) => {
          switch (Y) {
            case "*":
              return `${$}${P}${B}`;
            case ".*":
              return `${A}${P}${B}`;
            case "*.*":
              return `${$}${B}${A}${P}${B}`;
            case "*/*":
              return `${$}${B}${S}${P}${j}${B}`;
            case "**":
              return $ + J(p);
            case "**/*":
              return `(?:${$}${J(p)}${S})?${j}${P}${B}`;
            case "**/*.*":
              return `(?:${$}${J(p)}${S})?${j}${B}${A}${P}${B}`;
            case "**/.*":
              return `(?:${$}${J(p)}${S})?${A}${P}${B}`;
            default: {
              const le = /^(.*?)\.(\w+)$/.exec(Y);
              if (!le) return;
              const oe = ae(le[1]);
              return oe ? oe + A + le[2] : void 0;
            }
          }
        }, re = c.removePrefix(h, T);
        let ne = ae(re);
        return ne && p.strictSlashes !== !0 && (ne += `${S}?`), ne;
      }, o.exports = v;
    }, 510: (o, i, s) => {
      const a = s(716), c = s(697), l = s(96), u = s(154), d = (m) => m && typeof m == "object" && !Array.isArray(m), g = (m, _, f = !1) => {
        if (Array.isArray(m)) {
          const S = m.map((k) => g(k, _, f));
          return (k) => {
            for (const O of S) {
              const N = O(k);
              if (N) return N;
            }
            return !1;
          };
        }
        const v = d(m) && m.tokens && m.input;
        if (m === "" || typeof m != "string" && !v)
          throw new TypeError("Expected pattern to be a non-empty string");
        const h = _ || {}, E = h.windows, p = v ? g.compileRe(m, _) : g.makeRe(m, _, !1, !0), y = p.state;
        delete p.state;
        let b = () => !1;
        if (h.ignore) {
          const S = { ..._, ignore: null, onMatch: null, onResult: null };
          b = g(h.ignore, S, f);
        }
        const A = (S, P = !1) => {
          const { isMatch: k, match: O, output: N } = g.test(S, p, _, { glob: m, posix: E }), M = { glob: m, state: y, regex: p, posix: E, input: S, output: N, match: O, isMatch: k };
          return typeof h.onResult == "function" && h.onResult(M), k === !1 ? (M.isMatch = !1, P ? M : !1) : b(S) ? (typeof h.onIgnore == "function" && h.onIgnore(M), M.isMatch = !1, P ? M : !1) : (typeof h.onMatch == "function" && h.onMatch(M), P ? M : !0);
        };
        return f && (A.state = y), A;
      };
      g.test = (m, _, f, { glob: v, posix: h } = {}) => {
        if (typeof m != "string")
          throw new TypeError("Expected input to be a string");
        if (m === "")
          return { isMatch: !1, output: "" };
        const E = f || {}, p = E.format || (h ? l.toPosixSlashes : null);
        let y = m === v, b = y && p ? p(m) : m;
        return y === !1 && (b = p ? p(m) : m, y = b === v), (y === !1 || E.capture === !0) && (E.matchBase === !0 || E.basename === !0 ? y = g.matchBase(m, _, f, h) : y = _.exec(b)), { isMatch: !!y, match: y, output: b };
      }, g.matchBase = (m, _, f) => (_ instanceof RegExp ? _ : g.makeRe(_, f)).test(l.basename(m)), g.isMatch = (m, _, f) => g(_, f)(m), g.parse = (m, _) => Array.isArray(m) ? m.map((f) => g.parse(f, _)) : c(m, { ..._, fastpaths: !1 }), g.scan = (m, _) => a(m, _), g.compileRe = (m, _, f = !1, v = !1) => {
        if (f === !0)
          return m.output;
        const h = _ || {}, E = h.contains ? "" : "^", p = h.contains ? "" : "$";
        let y = `${E}(?:${m.output})${p}`;
        m && m.negated === !0 && (y = `^(?!${y}).*$`);
        const b = g.toRegex(y, _);
        return v === !0 && (b.state = m), b;
      }, g.makeRe = (m, _ = {}, f = !1, v = !1) => {
        if (!m || typeof m != "string")
          throw new TypeError("Expected a non-empty string");
        let h = { negated: !1, fastpaths: !0 };
        return _.fastpaths !== !1 && (m[0] === "." || m[0] === "*") && (h.output = c.fastpaths(m, _)), h.output || (h = c(m, _)), g.compileRe(h, _, f, v);
      }, g.toRegex = (m, _) => {
        try {
          const f = _ || {};
          return new RegExp(m, f.flags || (f.nocase ? "i" : ""));
        } catch (f) {
          if (_ && _.debug === !0) throw f;
          return /$^/;
        }
      }, g.constants = u, o.exports = g;
    }, 716: (o, i, s) => {
      const a = s(96), { CHAR_ASTERISK: c, CHAR_AT: l, CHAR_BACKWARD_SLASH: u, CHAR_COMMA: d, CHAR_DOT: g, CHAR_EXCLAMATION_MARK: m, CHAR_FORWARD_SLASH: _, CHAR_LEFT_CURLY_BRACE: f, CHAR_LEFT_PARENTHESES: v, CHAR_LEFT_SQUARE_BRACKET: h, CHAR_PLUS: E, CHAR_QUESTION_MARK: p, CHAR_RIGHT_CURLY_BRACE: y, CHAR_RIGHT_PARENTHESES: b, CHAR_RIGHT_SQUARE_BRACKET: A } = s(154), S = (O) => O === _ || O === u, P = (O) => {
        O.isPrefix !== !0 && (O.depth = O.isGlobstar ? 1 / 0 : 1);
      }, k = (O, N) => {
        const M = N || {}, U = O.length - 1, D = M.parts === !0 || M.scanToEnd === !0, $ = [], j = [], K = [];
        let T = O, B = -1, J = 0, ae = 0, re = !1, ne = !1, Y = !1, le = !1, oe = !1, R = !1, Q = !1, V = !1, W = !1, x = !1, C = 0, ue, q, z = { value: "", depth: 0, isGlob: !1 };
        const Z = () => B >= U, ve = () => T.charCodeAt(B + 1), me = () => (ue = q, T.charCodeAt(++B));
        for (; B < U; ) {
          q = me();
          let ie;
          if (q === u) {
            Q = z.backslashes = !0, q = me(), q === f && (R = !0);
            continue;
          }
          if (R === !0 || q === f) {
            for (C++; Z() !== !0 && (q = me()); ) {
              if (q === u) {
                Q = z.backslashes = !0, me();
                continue;
              }
              if (q === f) {
                C++;
                continue;
              }
              if (R !== !0 && q === g && (q = me()) === g) {
                if (re = z.isBrace = !0, Y = z.isGlob = !0, x = !0, D === !0)
                  continue;
                break;
              }
              if (R !== !0 && q === d) {
                if (re = z.isBrace = !0, Y = z.isGlob = !0, x = !0, D === !0)
                  continue;
                break;
              }
              if (q === y && (C--, C === 0)) {
                R = !1, re = z.isBrace = !0, x = !0;
                break;
              }
            }
            if (D === !0)
              continue;
            break;
          }
          if (q === _) {
            if ($.push(B), j.push(z), z = { value: "", depth: 0, isGlob: !1 }, x === !0) continue;
            if (ue === g && B === J + 1) {
              J += 2;
              continue;
            }
            ae = B + 1;
            continue;
          }
          if (M.noext !== !0 && (q === E || q === l || q === c || q === p || q === m) === !0 && ve() === v) {
            if (Y = z.isGlob = !0, le = z.isExtglob = !0, x = !0, q === m && B === J && (W = !0), D === !0) {
              for (; Z() !== !0 && (q = me()); ) {
                if (q === u) {
                  Q = z.backslashes = !0, q = me();
                  continue;
                }
                if (q === b) {
                  Y = z.isGlob = !0, x = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (q === c) {
            if (ue === c && (oe = z.isGlobstar = !0), Y = z.isGlob = !0, x = !0, D === !0)
              continue;
            break;
          }
          if (q === p) {
            if (Y = z.isGlob = !0, x = !0, D === !0)
              continue;
            break;
          }
          if (q === h) {
            for (; Z() !== !0 && (ie = me()); ) {
              if (ie === u) {
                Q = z.backslashes = !0, me();
                continue;
              }
              if (ie === A) {
                ne = z.isBracket = !0, Y = z.isGlob = !0, x = !0;
                break;
              }
            }
            if (D === !0)
              continue;
            break;
          }
          if (M.nonegate !== !0 && q === m && B === J) {
            V = z.negated = !0, J++;
            continue;
          }
          if (M.noparen !== !0 && q === v) {
            if (Y = z.isGlob = !0, D === !0) {
              for (; Z() !== !0 && (q = me()); ) {
                if (q === v) {
                  Q = z.backslashes = !0, q = me();
                  continue;
                }
                if (q === b) {
                  x = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (Y === !0) {
            if (x = !0, D === !0)
              continue;
            break;
          }
        }
        M.noext === !0 && (le = !1, Y = !1);
        let de = T, Re = "", ge = "";
        J > 0 && (Re = T.slice(0, J), T = T.slice(J), ae -= J), de && Y === !0 && ae > 0 ? (de = T.slice(0, ae), ge = T.slice(ae)) : Y === !0 ? (de = "", ge = T) : de = T, de && de !== "" && de !== "/" && de !== T && S(de.charCodeAt(de.length - 1)) && (de = de.slice(0, -1)), M.unescape === !0 && (ge && (ge = a.removeBackslashes(ge)), de && Q === !0 && (de = a.removeBackslashes(de)));
        const te = { prefix: Re, input: O, start: J, base: de, glob: ge, isBrace: re, isBracket: ne, isGlob: Y, isExtglob: le, isGlobstar: oe, negated: V, negatedExtglob: W };
        if (M.tokens === !0 && (te.maxDepth = 0, S(q) || j.push(z), te.tokens = j), M.parts === !0 || M.tokens === !0) {
          let ie;
          for (let he = 0; he < $.length; he++) {
            const F = ie ? ie + 1 : J, pe = $[he], H = O.slice(F, pe);
            M.tokens && (he === 0 && J !== 0 ? (j[he].isPrefix = !0, j[he].value = Re) : j[he].value = H, P(j[he]), te.maxDepth += j[he].depth), (he !== 0 || H !== "") && K.push(H), ie = pe;
          }
          if (ie && ie + 1 < O.length) {
            const he = O.slice(ie + 1);
            K.push(he), M.tokens && (j[j.length - 1].value = he, P(j[j.length - 1]), te.maxDepth += j[j.length - 1].depth);
          }
          te.slashes = $, te.parts = K;
        }
        return te;
      };
      o.exports = k;
    }, 96: (o, i, s) => {
      const { REGEX_BACKSLASH: a, REGEX_REMOVE_BACKSLASH: c, REGEX_SPECIAL_CHARS: l, REGEX_SPECIAL_CHARS_GLOBAL: u } = s(154);
      i.isObject = (d) => d !== null && typeof d == "object" && !Array.isArray(d), i.hasRegexChars = (d) => l.test(d), i.isRegexChar = (d) => d.length === 1 && i.hasRegexChars(d), i.escapeRegex = (d) => d.replace(u, "\\$1"), i.toPosixSlashes = (d) => d.replace(a, "/"), i.removeBackslashes = (d) => d.replace(c, (g) => g === "\\" ? "" : g), i.escapeLast = (d, g, m) => {
        const _ = d.lastIndexOf(g, m);
        return _ === -1 ? d : d[_ - 1] === "\\" ? i.escapeLast(d, g, _ - 1) : `${d.slice(0, _)}\\${d.slice(_)}`;
      }, i.removePrefix = (d, g = {}) => {
        let m = d;
        return m.startsWith("./") && (m = m.slice(2), g.prefix = "./"), m;
      }, i.wrapOutput = (d, g = {}, m = {}) => {
        const _ = m.contains ? "" : "^", f = m.contains ? "" : "$";
        let v = `${_}(?:${d})${f}`;
        return g.negated === !0 && (v = `(?:^(?!${v}).*$)`), v;
      }, i.basename = (d, { windows: g } = {}) => {
        const m = d.split(g ? /[\\/]/ : "/"), _ = m[m.length - 1];
        return _ === "" ? m[m.length - 2] : _;
      };
    } }, t = {};
    function n(o) {
      var i = t[o];
      if (i !== void 0)
        return i.exports;
      var s = t[o] = { exports: {} }, a = !0;
      try {
        e[o](s, s.exports, n), a = !1;
      } finally {
        a && delete t[o];
      }
      return s.exports;
    }
    typeof n < "u" && (n.ab = __dirname + "/");
    var r = n(170);
    or.exports = r;
  })()), or.exports;
}
var di;
function Dd() {
  return di || (di = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var a in s) Object.defineProperty(i, a, {
        enumerable: !0,
        get: s[a]
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
    const n = aa();
    function r(i, s) {
      if (i.search !== void 0 && i.search !== s.search)
        return !1;
      var a;
      return !!(0, n.makeRe)((a = i.pathname) != null ? a : "**", {
        dot: !0
      }).test(s.pathname);
    }
    function o(i, s) {
      if (!i)
        return !0;
      const a = new URL(s, "http://n");
      return i.some((c) => r(c, a));
    }
  }(rr)), rr;
}
var ir = {}, pi;
function jd() {
  return pi || (pi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var a in s) Object.defineProperty(i, a, {
        enumerable: !0,
        get: s[a]
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
    const n = aa();
    function r(i, s) {
      if (i.protocol !== void 0 && i.protocol.replace(/:$/, "") !== s.protocol.replace(/:$/, "") || i.port !== void 0 && i.port !== s.port)
        return !1;
      if (i.hostname === void 0)
        throw Object.defineProperty(new Error(`Pattern should define hostname but found
` + JSON.stringify(i)), "__NEXT_ERROR_CODE", {
          value: "E410",
          enumerable: !1,
          configurable: !0
        });
      if (!(0, n.makeRe)(i.hostname).test(s.hostname) || i.search !== void 0 && i.search !== s.search)
        return !1;
      var a;
      return !!(0, n.makeRe)((a = i.pathname) != null ? a : "**", {
        dot: !0
      }).test(s.pathname);
    }
    function o(i, s, a) {
      return i.some((c) => a.hostname === c) || s.some((c) => r(c, a));
    }
  }(ir)), ir;
}
var hi;
function ca() {
  return hi || (hi = 1, function(e) {
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
      let { config: i, src: s, width: a, quality: c } = o;
      var l;
      if (process.env.NODE_ENV !== "production") {
        const d = [];
        if (s || d.push("src"), a || d.push("width"), d.length > 0)
          throw Object.defineProperty(new Error("Next Image Optimization requires " + d.join(", ") + " to be provided. Make sure you pass them as props to the `next/image` component. Received: " + JSON.stringify({
            src: s,
            width: a,
            quality: c
          })), "__NEXT_ERROR_CODE", {
            value: "E188",
            enumerable: !1,
            configurable: !0
          });
        if (s.startsWith("//"))
          throw Object.defineProperty(new Error('Failed to parse src "' + s + '" on `next/image`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
            value: "E360",
            enumerable: !1,
            configurable: !0
          });
        if (s.startsWith("/") && i.localPatterns && process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
        process.env.NEXT_RUNTIME !== "edge") {
          const { hasLocalMatch: g } = Dd();
          if (!g(i.localPatterns, s))
            throw Object.defineProperty(new Error("Invalid src prop (" + s + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
              value: "E426",
              enumerable: !1,
              configurable: !0
            });
        }
        if (!s.startsWith("/") && (i.domains || i.remotePatterns)) {
          let g;
          try {
            g = new URL(s);
          } catch (m) {
            throw console.error(m), Object.defineProperty(new Error('Failed to parse src "' + s + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
              value: "E63",
              enumerable: !1,
              configurable: !0
            });
          }
          if (process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
          process.env.NEXT_RUNTIME !== "edge") {
            const { hasRemoteMatch: m } = jd();
            if (!m(i.domains, i.remotePatterns, g))
              throw Object.defineProperty(new Error("Invalid src prop (" + s + ') on `next/image`, hostname "' + g.hostname + '" is not configured under images in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-host'), "__NEXT_ERROR_CODE", {
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
      const u = c || ((l = i.qualities) == null ? void 0 : l.reduce((d, g) => Math.abs(g - t) < Math.abs(d - t) ? g : d)) || t;
      return i.path + "?url=" + encodeURIComponent(s) + "&w=" + a + "&q=" + u + (s.startsWith("/_next/static/media/") && process.env.NEXT_DEPLOYMENT_ID ? "&dpl=" + process.env.NEXT_DEPLOYMENT_ID : "");
    }
    n.__next_img_default = !0;
    const r = n;
  }(nr)), nr;
}
(function(e, t) {
  "use client";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "Image", {
    enumerable: !0,
    get: function() {
      return y;
    }
  });
  const n = We, r = _t, o = Rr, i = /* @__PURE__ */ r._(ce), s = /* @__PURE__ */ n._(gi), a = /* @__PURE__ */ n._(kd()), c = $r, l = dn, u = Md(), d = fn, g = Ui(), m = /* @__PURE__ */ n._(ca()), _ = Bi(), f = process.env.__NEXT_IMAGE_OPTS;
  typeof window > "u" && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
  function v(b, A, S, P, k, O, N) {
    const M = b == null ? void 0 : b.src;
    if (!b || b["data-loaded-src"] === M)
      return;
    b["data-loaded-src"] = M, ("decode" in b ? b.decode() : Promise.resolve()).catch(() => {
    }).then(() => {
      if (!(!b.parentElement || !b.isConnected)) {
        if (A !== "empty" && k(!0), S != null && S.current) {
          const D = new Event("load");
          Object.defineProperty(D, "target", {
            writable: !1,
            value: b
          });
          let $ = !1, j = !1;
          S.current({
            ...D,
            nativeEvent: D,
            currentTarget: b,
            target: b,
            isDefaultPrevented: () => $,
            isPropagationStopped: () => j,
            persist: () => {
            },
            preventDefault: () => {
              $ = !0, D.preventDefault();
            },
            stopPropagation: () => {
              j = !0, D.stopPropagation();
            }
          });
        }
        if (P != null && P.current && P.current(b), process.env.NODE_ENV !== "production") {
          const D = new URL(M, "http://n").searchParams.get("url") || M;
          if (b.getAttribute("data-nimg") === "fill") {
            if (!O && (!N || N === "100vw") && b.getBoundingClientRect().width / window.innerWidth < 0.6 && (N === "100vw" ? (0, d.warnOnce)('Image with src "' + D + '" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes') : (0, d.warnOnce)('Image with src "' + D + '" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes')), b.parentElement) {
              const { position: K } = window.getComputedStyle(b.parentElement), T = [
                "absolute",
                "fixed",
                "relative"
              ];
              T.includes(K) || (0, d.warnOnce)('Image with src "' + D + '" has "fill" and parent element with invalid "position". Provided "' + K + '" should be one of ' + T.map(String).join(",") + ".");
            }
            b.height === 0 && (0, d.warnOnce)('Image with src "' + D + '" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.');
          }
          const $ = b.height.toString() !== b.getAttribute("height"), j = b.width.toString() !== b.getAttribute("width");
          ($ && !j || !$ && j) && (0, d.warnOnce)('Image with src "' + D + `" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
        }
      }
    });
  }
  function h(b) {
    return i.use ? {
      fetchPriority: b
    } : {
      fetchpriority: b
    };
  }
  const E = /* @__PURE__ */ (0, i.forwardRef)((b, A) => {
    let { src: S, srcSet: P, sizes: k, height: O, width: N, decoding: M, className: U, style: D, fetchPriority: $, placeholder: j, loading: K, unoptimized: T, fill: B, onLoadRef: J, onLoadingCompleteRef: ae, setBlurComplete: re, setShowAltText: ne, sizesInput: Y, onLoad: le, onError: oe, ...R } = b;
    const Q = (0, i.useCallback)((W) => {
      W && (oe && (W.src = W.src), process.env.NODE_ENV !== "production" && (S || console.error('Image is missing required "src" property:', W), W.getAttribute("alt") === null && console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.')), W.complete && v(W, j, J, ae, re, T, Y));
    }, [
      S,
      j,
      J,
      ae,
      re,
      oe,
      T,
      Y
    ]), V = (0, _.useMergedRef)(A, Q);
    return /* @__PURE__ */ (0, o.jsx)("img", {
      ...R,
      ...h($),
      // It's intended to keep `loading` before `src` because React updates
      // props in order which causes Safari/Firefox to not lazy load properly.
      // See https://github.com/facebook/react/issues/25883
      loading: K,
      width: N,
      height: O,
      decoding: M,
      "data-nimg": B ? "fill" : "1",
      className: U,
      style: D,
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      sizes: k,
      srcSet: P,
      src: S,
      ref: V,
      onLoad: (W) => {
        const x = W.currentTarget;
        v(x, j, J, ae, re, T, Y);
      },
      onError: (W) => {
        ne(!0), j !== "empty" && re(!0), oe && oe(W);
      }
    });
  });
  function p(b) {
    let { isAppRouter: A, imgAttributes: S } = b;
    const P = {
      as: "image",
      imageSrcSet: S.srcSet,
      imageSizes: S.sizes,
      crossOrigin: S.crossOrigin,
      referrerPolicy: S.referrerPolicy,
      ...h(S.fetchPriority)
    };
    return A && s.default.preload ? (s.default.preload(
      S.src,
      // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
      P
    ), null) : /* @__PURE__ */ (0, o.jsx)(a.default, {
      children: /* @__PURE__ */ (0, o.jsx)("link", {
        rel: "preload",
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        href: S.srcSet ? void 0 : S.src,
        ...P
      }, "__nimg-" + S.src + S.srcSet + S.sizes)
    });
  }
  const y = /* @__PURE__ */ (0, i.forwardRef)((b, A) => {
    const P = !(0, i.useContext)(g.RouterContext), k = (0, i.useContext)(u.ImageConfigContext), O = (0, i.useMemo)(() => {
      var ae;
      const re = f || k || l.imageConfigDefault, ne = [
        ...re.deviceSizes,
        ...re.imageSizes
      ].sort((oe, R) => oe - R), Y = re.deviceSizes.sort((oe, R) => oe - R), le = (ae = re.qualities) == null ? void 0 : ae.sort((oe, R) => oe - R);
      return {
        ...re,
        allSizes: ne,
        deviceSizes: Y,
        qualities: le
      };
    }, [
      k
    ]), { onLoad: N, onLoadingComplete: M } = b, U = (0, i.useRef)(N);
    (0, i.useEffect)(() => {
      U.current = N;
    }, [
      N
    ]);
    const D = (0, i.useRef)(M);
    (0, i.useEffect)(() => {
      D.current = M;
    }, [
      M
    ]);
    const [$, j] = (0, i.useState)(!1), [K, T] = (0, i.useState)(!1), { props: B, meta: J } = (0, c.getImgProps)(b, {
      defaultLoader: m.default,
      imgConf: O,
      blurComplete: $,
      showAltText: K
    });
    return /* @__PURE__ */ (0, o.jsxs)(o.Fragment, {
      children: [
        /* @__PURE__ */ (0, o.jsx)(E, {
          ...B,
          unoptimized: J.unoptimized,
          placeholder: J.placeholder,
          fill: J.fill,
          onLoadRef: U,
          onLoadingCompleteRef: D,
          setBlurComplete: j,
          setShowAltText: T,
          sizesInput: b.sizes,
          ref: A
        }),
        J.priority ? /* @__PURE__ */ (0, o.jsx)(p, {
          isAppRouter: P,
          imgAttributes: B
        }) : null
      ]
    });
  });
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(wr, wr.exports);
var Hd = wr.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(c, l) {
    for (var u in l) Object.defineProperty(c, u, {
      enumerable: !0,
      get: l[u]
    });
  }
  t(e, {
    default: function() {
      return a;
    },
    getImageProps: function() {
      return s;
    }
  });
  const n = We, r = $r, o = Hd, i = /* @__PURE__ */ n._(ca());
  function s(c) {
    const { props: l } = (0, r.getImgProps)(c, {
      defaultLoader: i.default,
      // This is replaced by webpack define plugin
      imgConf: process.env.__NEXT_IMAGE_OPTS
    });
    for (const [u, d] of Object.entries(l))
      d === void 0 && delete l[u];
    return {
      props: l
    };
  }
  const a = o.Image;
})(ia);
var $d = ia;
const Fd = /* @__PURE__ */ Ii($d), Wd = ({ logo: e = "/images/logo-black.png", width: t = 120, height: n = 37, className: r }) => /* @__PURE__ */ I(zi, { href: "/", "data-testid": "logo", className: "", children: e ? /* @__PURE__ */ I(Fd, { src: e, alt: "Logo", width: t, height: n, className: r }) : /* @__PURE__ */ I("p", { className: "text-xl font-bold", children: "LOGO" }) });
export {
  Xc as CustomButton,
  qd as InputField,
  Wd as Logo
};
