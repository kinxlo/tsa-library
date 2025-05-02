import Ko, { jsx as R, jsxs as be, Fragment as Ze } from "react/jsx-runtime";
import * as h from "react";
import le, { forwardRef as Ft, createElement as mo, cloneElement as Zl, useLayoutEffect as Jl, useEffect as Is, useState as Yo } from "react";
import * as jn from "react-dom";
import Qo from "react-dom";
function Ms(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Ms(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Ds() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Ms(e)) && (r && (r += " "), r += t);
  return r;
}
const Zo = "-", ed = (e) => {
  const t = nd(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const s = i.split(Zo);
      return s[0] === "" && s.length !== 1 && s.shift(), ks(s, t) || td(i);
    },
    getConflictingClassGroupIds: (i, s) => {
      const c = n[i] || [];
      return s && r[i] ? [...c, ...r[i]] : c;
    }
  };
}, ks = (e, t) => {
  var i;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? ks(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Zo);
  return (i = t.validators.find(({
    validator: s
  }) => s(a))) == null ? void 0 : i.classGroupId;
}, ja = /^\[(.+)\]$/, td = (e) => {
  if (ja.test(e)) {
    const t = ja.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, nd = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    ho(n[o], r, o, t);
  return r;
}, ho = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : Fa(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (rd(o)) {
        ho(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, i]) => {
      ho(i, Fa(t, a), n, r);
    });
  });
}, Fa = (e, t) => {
  let n = e;
  return t.split(Zo).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, rd = (e) => e.isThemeGetter, od = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, i) => {
    n.set(a, i), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let i = n.get(a);
      if (i !== void 0)
        return i;
      if ((i = r.get(a)) !== void 0)
        return o(a, i), i;
    },
    set(a, i) {
      n.has(a) ? n.set(a, i) : o(a, i);
    }
  };
}, go = "!", vo = ":", ad = vo.length, id = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const a = [];
    let i = 0, s = 0, c = 0, u;
    for (let b = 0; b < o.length; b++) {
      let f = o[b];
      if (i === 0 && s === 0) {
        if (f === vo) {
          a.push(o.slice(c, b)), c = b + ad;
          continue;
        }
        if (f === "/") {
          u = b;
          continue;
        }
      }
      f === "[" ? i++ : f === "]" ? i-- : f === "(" ? s++ : f === ")" && s--;
    }
    const l = a.length === 0 ? o : o.substring(c), d = sd(l), p = d !== l, g = u && u > c ? u - c : void 0;
    return {
      modifiers: a,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: g
    };
  };
  if (t) {
    const o = t + vo, a = r;
    r = (i) => i.startsWith(o) ? a(i.substring(o.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: i,
      maybePostfixModifierPosition: void 0
    };
  }
  if (n) {
    const o = r;
    r = (a) => n({
      className: a,
      parseClassName: o
    });
  }
  return r;
}, sd = (e) => e.endsWith(go) ? e.substring(0, e.length - 1) : e.startsWith(go) ? e.substring(1) : e, cd = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((r) => [r, !0]));
  return (r) => {
    if (r.length <= 1)
      return r;
    const o = [];
    let a = [];
    return r.forEach((i) => {
      i[0] === "[" || t[i] ? (o.push(...a.sort(), i), a = []) : a.push(i);
    }), o.push(...a.sort()), o;
  };
}, ud = (e) => ({
  cache: od(e.cacheSize),
  parseClassName: id(e),
  sortModifiers: cd(e),
  ...ed(e)
}), ld = /\s+/, dd = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: a
  } = t, i = [], s = e.trim().split(ld);
  let c = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const l = s[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: g,
      baseClassName: b,
      maybePostfixModifierPosition: f
    } = n(l);
    if (d) {
      c = l + (c.length > 0 ? " " + c : c);
      continue;
    }
    let _ = !!f, v = r(_ ? b.substring(0, f) : b);
    if (!v) {
      if (!_) {
        c = l + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (v = r(b), !v) {
        c = l + (c.length > 0 ? " " + c : c);
        continue;
      }
      _ = !1;
    }
    const w = a(p).join(":"), m = g ? w + go : w, y = m + v;
    if (i.includes(y))
      continue;
    i.push(y);
    const E = o(v, _);
    for (let A = 0; A < E.length; ++A) {
      const C = E[A];
      i.push(m + C);
    }
    c = l + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function fd() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Ls(t)) && (r && (r += " "), r += n);
  return r;
}
const Ls = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Ls(e[r])) && (n && (n += " "), n += t);
  return n;
};
function pd(e, ...t) {
  let n, r, o, a = i;
  function i(c) {
    const u = t.reduce((l, d) => d(l), e());
    return n = ud(u), r = n.cache.get, o = n.cache.set, a = s, s(c);
  }
  function s(c) {
    const u = r(c);
    if (u)
      return u;
    const l = dd(c, n);
    return o(c, l), l;
  }
  return function() {
    return a(fd.apply(null, arguments));
  };
}
const Se = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, js = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Fs = /^\((?:(\w[\w-]*):)?(.+)\)$/i, md = /^\d+\/\d+$/, hd = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, gd = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, vd = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, _d = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, bd = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, gt = (e) => md.test(e), de = (e) => !!e && !Number.isNaN(Number(e)), Ye = (e) => !!e && Number.isInteger(Number(e)), sr = (e) => e.endsWith("%") && de(e.slice(0, -1)), Ve = (e) => hd.test(e), yd = () => !0, Ed = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  gd.test(e) && !vd.test(e)
), $s = () => !1, Rd = (e) => _d.test(e), wd = (e) => bd.test(e), Sd = (e) => !J(e) && !ee(e), xd = (e) => St(e, Bs, $s), J = (e) => js.test(e), at = (e) => St(e, Gs, Ed), cr = (e) => St(e, Td, de), $a = (e) => St(e, Hs, $s), Cd = (e) => St(e, Us, wd), Wt = (e) => St(e, zs, Rd), ee = (e) => Fs.test(e), Tt = (e) => xt(e, Gs), Pd = (e) => xt(e, Nd), Ha = (e) => xt(e, Hs), Od = (e) => xt(e, Bs), Ad = (e) => xt(e, Us), Xt = (e) => xt(e, zs, !0), St = (e, t, n) => {
  const r = js.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, xt = (e, t, n = !1) => {
  const r = Fs.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, Hs = (e) => e === "position" || e === "percentage", Us = (e) => e === "image" || e === "url", Bs = (e) => e === "length" || e === "size" || e === "bg-size", Gs = (e) => e === "length", Td = (e) => e === "number", Nd = (e) => e === "family-name", zs = (e) => e === "shadow", Id = () => {
  const e = Se("color"), t = Se("font"), n = Se("text"), r = Se("font-weight"), o = Se("tracking"), a = Se("leading"), i = Se("breakpoint"), s = Se("container"), c = Se("spacing"), u = Se("radius"), l = Se("shadow"), d = Se("inset-shadow"), p = Se("text-shadow"), g = Se("drop-shadow"), b = Se("blur"), f = Se("perspective"), _ = Se("aspect"), v = Se("ease"), w = Se("animate"), m = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], y = () => [
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
  ], E = () => [...y(), ee, J], A = () => ["auto", "hidden", "clip", "visible", "scroll"], C = () => ["auto", "contain", "none"], O = () => [ee, J, c], N = () => [gt, "full", "auto", ...O()], T = () => [Ye, "none", "subgrid", ee, J], M = () => ["auto", {
    span: ["full", Ye, ee, J]
  }, Ye, ee, J], k = () => [Ye, "auto", ee, J], B = () => ["auto", "min", "max", "fr", ee, J], j = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], G = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...O()], Z = () => [gt, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...O()], I = () => [e, ee, J], D = () => [...y(), Ha, $a, {
    position: [ee, J]
  }], K = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], se = () => ["auto", "cover", "contain", Od, xd, {
    size: [ee, J]
  }], re = () => [sr, Tt, at], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    ee,
    J
  ], Q = () => ["", de, Tt, at], fe = () => ["solid", "dashed", "dotted", "double"], ae = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], P = () => [de, sr, Ha, $a], te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    b,
    ee,
    J
  ], z = () => ["none", de, ee, J], Y = () => ["none", de, ee, J], S = () => [de, ee, J], x = () => [gt, "full", ...O()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ve],
      breakpoint: [Ve],
      color: [yd],
      container: [Ve],
      "drop-shadow": [Ve],
      ease: ["in", "out", "in-out"],
      font: [Sd],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ve],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ve],
      shadow: [Ve],
      spacing: ["px", de],
      text: [Ve],
      "text-shadow": [Ve],
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
        aspect: ["auto", "square", gt, J, ee, _]
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
        columns: [de, J, ee, s]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": m()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": m()
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
        overscroll: C()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": C()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": C()
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
        inset: N()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": N()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": N()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: N()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: N()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: N()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: N()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: N()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: N()
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
        z: [Ye, "auto", ee, J]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [gt, "full", "auto", s, ...O()]
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
        flex: [de, gt, "auto", "initial", "none", J]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", de, ee, J]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", de, ee, J]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ye, "first", "last", "none", ee, J]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": T()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: M()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": k()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": k()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": T()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: M()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": k()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": k()
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
        "auto-cols": B()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": B()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: O()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": O()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": O()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...j(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...G(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...G()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...j()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...G(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...G(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": j()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...G(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...G()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: O()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: O()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: O()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: O()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: O()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: O()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: O()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: O()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: O()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: F()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: F()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: F()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: F()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: F()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: F()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: F()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: F()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: F()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": O()
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
        "space-y": O()
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
        size: Z()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...Z()]
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
          ...Z()
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
            screen: [i]
          },
          ...Z()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...Z()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...Z()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...Z()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, Tt, at]
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
        font: [r, ee, cr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", sr, J]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Pd, J, t]
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
        tracking: [o, ee, J]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [de, "none", ee, cr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          a,
          ...O()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", ee, J]
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
        list: ["disc", "decimal", "none", ee, J]
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
        placeholder: I()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: I()
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
        decoration: [de, "from-font", "auto", ee, at]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: I()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [de, "auto", ee, J]
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
        indent: O()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", ee, J]
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
        content: ["none", ee, J]
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
        bg: D()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: K()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: se()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ye, ee, J],
          radial: ["", ee, J],
          conic: [Ye, ee, J]
        }, Ad, Cd]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: I()
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
        from: I()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: I()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: I()
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
        border: Q()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Q()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Q()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Q()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Q()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Q()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Q()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Q()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Q()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Q()
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
        "divide-y": Q()
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
        border: I()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": I()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": I()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": I()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": I()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": I()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": I()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": I()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": I()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: I()
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
        "outline-offset": [de, ee, J]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", de, Tt, at]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: I()
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
          Xt,
          Wt
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: I()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", d, Xt, Wt]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": I()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: Q()
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
        ring: I()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [de, at]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": I()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": Q()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": I()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", p, Xt, Wt]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": I()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [de, ee, J]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ae(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ae()
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
        "mask-linear": [de]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": P()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": I()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": I()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": P()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": I()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": I()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": P()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": I()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": I()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": P()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": I()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": I()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": P()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": I()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": I()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": P()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": I()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": I()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": P()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": I()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": I()
      }],
      "mask-image-radial": [{
        "mask-radial": [ee, J]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": P()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": P()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": I()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": I()
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
        "mask-conic": [de]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": P()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": P()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": I()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": I()
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
        mask: D()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: K()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: se()
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
        mask: ["none", ee, J]
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
          ee,
          J
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: te()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [de, ee, J]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [de, ee, J]
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
          g,
          Xt,
          Wt
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": I()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", de, ee, J]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [de, ee, J]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", de, ee, J]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [de, ee, J]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", de, ee, J]
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
          ee,
          J
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": te()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [de, ee, J]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [de, ee, J]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", de, ee, J]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [de, ee, J]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", de, ee, J]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [de, ee, J]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [de, ee, J]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", de, ee, J]
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
        "border-spacing": O()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": O()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": O()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", ee, J]
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
        duration: [de, "initial", ee, J]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", v, ee, J]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [de, ee, J]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", w, ee, J]
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
        perspective: [f, ee, J]
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
        rotate: z()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": z()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": z()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": z()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Y()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Y()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Y()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Y()
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
        skew: S()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": S()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": S()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [ee, J, "", "none", "gpu", "cpu"]
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
        translate: x()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": x()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": x()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": x()
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
        accent: I()
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
        caret: I()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", ee, J]
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
        "scroll-m": O()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": O()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": O()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": O()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": O()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": O()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": O()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": O()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": O()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": O()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": O()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": O()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": O()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": O()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": O()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": O()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": O()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": O()
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
        "will-change": ["auto", "scroll", "contents", "transform", ee, J]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...I()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [de, Tt, at, cr]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...I()]
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
}, Md = /* @__PURE__ */ pd(Id);
function Ee(...e) {
  return Md(Ds(e));
}
function Ua(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function $t(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const a = Ua(o, t);
      return !n && typeof a == "function" && (n = !0), a;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const a = r[o];
          typeof a == "function" ? a() : Ua(e[o], null);
        }
      };
  };
}
function ge(...e) {
  return h.useCallback($t(...e), e);
}
// @__NO_SIDE_EFFECTS__
function it(e) {
  const t = /* @__PURE__ */ kd(e), n = h.forwardRef((r, o) => {
    const { children: a, ...i } = r, s = h.Children.toArray(a), c = s.find(jd);
    if (c) {
      const u = c.props.children, l = s.map((d) => d === c ? h.Children.count(u) > 1 ? h.Children.only(null) : h.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ R(t, { ...i, ref: o, children: h.isValidElement(u) ? h.cloneElement(u, void 0, l) : null });
    }
    return /* @__PURE__ */ R(t, { ...i, ref: o, children: a });
  });
  return n.displayName = `${e}.Slot`, n;
}
var Dd = /* @__PURE__ */ it("Slot");
// @__NO_SIDE_EFFECTS__
function kd(e) {
  const t = h.forwardRef((n, r) => {
    const { children: o, ...a } = n;
    if (h.isValidElement(o)) {
      const i = $d(o), s = Fd(a, o.props);
      return o.type !== h.Fragment && (s.ref = r ? $t(r, i) : i), h.cloneElement(o, s);
    }
    return h.Children.count(o) > 1 ? h.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ld = Symbol("radix.slottable");
function jd(e) {
  return h.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ld;
}
function Fd(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...s) => {
      a(...s), o(...s);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function $d(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Ba = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Ga = Ds, Vs = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return Ga(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, i = Object.keys(o).map((u) => {
    const l = n == null ? void 0 : n[u], d = a == null ? void 0 : a[u];
    if (l === null) return null;
    const p = Ba(l) || Ba(d);
    return o[u][p];
  }), s = n && Object.entries(n).reduce((u, l) => {
    let [d, p] = l;
    return p === void 0 || (u[d] = p), u;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, l) => {
    let { class: d, className: p, ...g } = l;
    return Object.entries(g).every((b) => {
      let [f, _] = b;
      return Array.isArray(_) ? _.includes({
        ...a,
        ...s
      }[f]) : {
        ...a,
        ...s
      }[f] === _;
    }) ? [
      ...u,
      d,
      p
    ] : u;
  }, []);
  return Ga(e, i, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Hd = Vs(
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
), En = Ft(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ R(r ? Dd : "button", { className: Ee(Hd({ variant: t, size: n, className: e })), ref: a, ...o })
);
En.displayName = "Button";
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ud = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Bd = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), za = (e) => {
  const t = Bd(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, qs = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Gd = (e) => {
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
var zd = {
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
const Vd = Ft(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: a,
    iconNode: i,
    ...s
  }, c) => mo(
    "svg",
    {
      ref: c,
      ...zd,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: qs("lucide", o),
      ...!a && !Gd(s) && { "aria-hidden": "true" },
      ...s
    },
    [
      ...i.map(([u, l]) => mo(u, l)),
      ...Array.isArray(a) ? a : [a]
    ]
  )
);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xe = (e, t) => {
  const n = Ft(
    ({ className: r, ...o }, a) => mo(Vd, {
      ref: a,
      iconNode: t,
      className: qs(
        `lucide-${Ud(za(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = za(e), n;
};
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Wd = Xe("check", qd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xd = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Fn = Xe("chevron-down", Xd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kd = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Yd = Xe("chevron-up", Kd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qd = [
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
], Zd = Xe("eye-off", Qd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jd = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], ef = Xe("eye", Jd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tf = [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
], nf = Xe("loader", tf);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rf = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], of = Xe("menu", rf);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const af = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], sf = Xe("plus", af);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cf = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], uf = Xe("x", cf);
function Ws(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var _o = { exports: {} }, Ct = {};
function Xs(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (Xs = function(r) {
    return r ? n : t;
  })(e);
}
function lf(e, t) {
  if (!t && e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var n = Xs(t);
  if (n && n.has(e)) return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var a in e)
    if (a !== "default" && Object.prototype.hasOwnProperty.call(e, a)) {
      var i = o ? Object.getOwnPropertyDescriptor(e, a) : null;
      i && (i.get || i.set) ? Object.defineProperty(r, a, i) : r[a] = e[a];
    }
  return r.default = e, n && n.set(e, r), r;
}
Ct._ = lf;
var Kt = { exports: {} }, ur = {}, Va;
function Ks() {
  return Va || (Va = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      assign: function() {
        return a;
      },
      searchParamsToUrlQuery: function() {
        return n;
      },
      urlQueryToSearchParams: function() {
        return o;
      }
    });
    function n(i) {
      const s = {};
      for (const [c, u] of i.entries()) {
        const l = s[c];
        typeof l > "u" ? s[c] = u : Array.isArray(l) ? l.push(u) : s[c] = [
          l,
          u
        ];
      }
      return s;
    }
    function r(i) {
      return typeof i == "string" ? i : typeof i == "number" && !isNaN(i) || typeof i == "boolean" ? String(i) : "";
    }
    function o(i) {
      const s = new URLSearchParams();
      for (const [c, u] of Object.entries(i))
        if (Array.isArray(u))
          for (const l of u)
            s.append(c, r(l));
        else
          s.set(c, r(u));
      return s;
    }
    function a(i) {
      for (var s = arguments.length, c = new Array(s > 1 ? s - 1 : 0), u = 1; u < s; u++)
        c[u - 1] = arguments[u];
      for (const l of c) {
        for (const d of l.keys())
          i.delete(d);
        for (const [d, p] of l.entries())
          i.append(d, p);
      }
      return i;
    }
  }(ur)), ur;
}
var lr = {}, qa;
function Ys() {
  return qa || (qa = 1, function(e) {
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
        return a;
      },
      formatWithValidation: function() {
        return s;
      },
      urlObjectKeys: function() {
        return i;
      }
    });
    const r = /* @__PURE__ */ Ct._(Ks()), o = /https?|ftp|gopher|file/;
    function a(c) {
      let { auth: u, hostname: l } = c, d = c.protocol || "", p = c.pathname || "", g = c.hash || "", b = c.query || "", f = !1;
      u = u ? encodeURIComponent(u).replace(/%3A/i, ":") + "@" : "", c.host ? f = u + c.host : l && (f = u + (~l.indexOf(":") ? "[" + l + "]" : l), c.port && (f += ":" + c.port)), b && typeof b == "object" && (b = String(r.urlQueryToSearchParams(b)));
      let _ = c.search || b && "?" + b || "";
      return d && !d.endsWith(":") && (d += ":"), c.slashes || (!d || o.test(d)) && f !== !1 ? (f = "//" + (f || ""), p && p[0] !== "/" && (p = "/" + p)) : f || (f = ""), g && g[0] !== "#" && (g = "#" + g), _ && _[0] !== "?" && (_ = "?" + _), p = p.replace(/[?#]/g, encodeURIComponent), _ = _.replace("#", "%23"), "" + d + f + p + _ + g;
    }
    const i = [
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
        i.includes(u) || console.warn("Unknown key passed via urlObject into url.format: " + u);
      }), a(c);
    }
  }(lr)), lr;
}
var dr = {}, Wa;
function df() {
  return Wa || (Wa = 1, function(e) {
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
      return Object.keys(n).forEach((a) => {
        r.includes(a) || (o[a] = n[a]);
      }), o;
    }
  }(dr)), dr;
}
var fr = {}, Xa;
function $n() {
  return Xa || (Xa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(y, E) {
      for (var A in E) Object.defineProperty(y, A, {
        enumerable: !0,
        get: E[A]
      });
    }
    t(e, {
      DecodeError: function() {
        return b;
      },
      MiddlewareNotFoundError: function() {
        return w;
      },
      MissingStaticPage: function() {
        return v;
      },
      NormalizeError: function() {
        return f;
      },
      PageNotFoundError: function() {
        return _;
      },
      SP: function() {
        return p;
      },
      ST: function() {
        return g;
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
        return i;
      },
      getURL: function() {
        return s;
      },
      isAbsoluteUrl: function() {
        return a;
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
        return m;
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
      let E = !1, A;
      return function() {
        for (var C = arguments.length, O = new Array(C), N = 0; N < C; N++)
          O[N] = arguments[N];
        return E || (E = !0, A = y(...O)), A;
      };
    }
    const o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, a = (y) => o.test(y);
    function i() {
      const { protocol: y, hostname: E, port: A } = window.location;
      return y + "//" + E + (A ? ":" + A : "");
    }
    function s() {
      const { href: y } = window.location, E = i();
      return y.substring(E.length);
    }
    function c(y) {
      return typeof y == "string" ? y : y.displayName || y.name || "Unknown";
    }
    function u(y) {
      return y.finished || y.headersSent;
    }
    function l(y) {
      const E = y.split("?");
      return E[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") + (E[1] ? "?" + E.slice(1).join("?") : "");
    }
    async function d(y, E) {
      if (process.env.NODE_ENV !== "production") {
        var A;
        if ((A = y.prototype) != null && A.getInitialProps) {
          const N = '"' + c(y) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
          throw Object.defineProperty(new Error(N), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: !1,
            configurable: !0
          });
        }
      }
      const C = E.res || E.ctx && E.ctx.res;
      if (!y.getInitialProps)
        return E.ctx && E.Component ? {
          pageProps: await d(E.Component, E.ctx)
        } : {};
      const O = await y.getInitialProps(E);
      if (C && u(C))
        return O;
      if (!O) {
        const N = '"' + c(y) + '.getInitialProps()" should resolve to an object. But found "' + O + '" instead.';
        throw Object.defineProperty(new Error(N), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0
        });
      }
      return process.env.NODE_ENV !== "production" && Object.keys(O).length === 0 && !E.ctx && console.warn("" + c(y) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps"), O;
    }
    const p = typeof performance < "u", g = p && [
      "mark",
      "measure",
      "getEntriesByName"
    ].every((y) => typeof performance[y] == "function");
    class b extends Error {
    }
    class f extends Error {
    }
    class _ extends Error {
      constructor(E) {
        super(), this.code = "ENOENT", this.name = "PageNotFoundError", this.message = "Cannot find module for page: " + E;
      }
    }
    class v extends Error {
      constructor(E, A) {
        super(), this.message = "Failed to load static file for page: " + E + " " + A;
      }
    }
    class w extends Error {
      constructor() {
        super(), this.code = "ENOENT", this.message = "Cannot find the middleware module";
      }
    }
    function m(y) {
      return JSON.stringify({
        message: y.message,
        stack: y.stack
      });
    }
  }(fr)), fr;
}
var Yt = { exports: {} }, pr = {}, Ka;
function Qs() {
  return Ka || (Ka = 1, function(e) {
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
  }(pr)), pr;
}
var mr = {}, Ya;
function Jo() {
  return Ya || (Ya = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "parsePath", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n) {
      const r = n.indexOf("#"), o = n.indexOf("?"), a = o > -1 && (r < 0 || o < r);
      return a || r > -1 ? {
        pathname: n.substring(0, a ? o : r),
        query: a ? n.substring(o, r > -1 ? r : void 0) : "",
        hash: r > -1 ? n.slice(r) : ""
      } : {
        pathname: n,
        query: "",
        hash: ""
      };
    }
  }(mr)), mr;
}
var Qa;
function Hn() {
  return Qa || (Qa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizePathTrailingSlash", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Qs(), r = Jo(), o = (a) => {
      if (!a.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH)
        return a;
      const { pathname: i, query: s, hash: c } = (0, r.parsePath)(a);
      return process.env.__NEXT_TRAILING_SLASH ? /\.[^/]+\/?$/.test(i) ? "" + (0, n.removeTrailingSlash)(i) + s + c : i.endsWith("/") ? "" + i + s + c : i + "/" + s + c : "" + (0, n.removeTrailingSlash)(i) + s + c;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Yt, Yt.exports)), Yt.exports;
}
var hr = {}, Qt = { exports: {} }, gr = {}, Za;
function Zs() {
  return Za || (Za = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "pathHasPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = Jo();
    function n(r, o) {
      if (typeof r != "string")
        return !1;
      const { pathname: a } = (0, t.parsePath)(r);
      return a === o || a.startsWith(o + "/");
    }
  }(gr)), gr;
}
var Ja;
function ff() {
  return Ja || (Ja = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "hasBasePath", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Zs(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(a) {
      return (0, n.pathHasPrefix)(a, r);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Qt, Qt.exports)), Qt.exports;
}
var ei;
function Js() {
  return ei || (ei = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isLocalURL", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = $n(), n = ff();
    function r(o) {
      if (!(0, t.isAbsoluteUrl)(o)) return !0;
      try {
        const a = (0, t.getLocationOrigin)(), i = new URL(o, a);
        return i.origin === a && (0, n.hasBasePath)(i.pathname);
      } catch {
        return !1;
      }
    }
  }(hr)), hr;
}
var vr = {}, _r = {}, ti;
function pf() {
  return ti || (ti = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, i) {
      for (var s in i) Object.defineProperty(a, s, {
        enumerable: !0,
        get: i[s]
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
      insert(i) {
        this._insert(i.split("/").filter(Boolean), [], !1);
      }
      smoosh() {
        return this._smoosh();
      }
      _smoosh(i) {
        i === void 0 && (i = "/");
        const s = [
          ...this.children.keys()
        ].sort();
        this.slugName !== null && s.splice(s.indexOf("[]"), 1), this.restSlugName !== null && s.splice(s.indexOf("[...]"), 1), this.optionalRestSlugName !== null && s.splice(s.indexOf("[[...]]"), 1);
        const c = s.map((u) => this.children.get(u)._smoosh("" + i + u + "/")).reduce((u, l) => [
          ...u,
          ...l
        ], []);
        if (this.slugName !== null && c.push(...this.children.get("[]")._smoosh(i + "[" + this.slugName + "]/")), !this.placeholder) {
          const u = i === "/" ? "/" : i.slice(0, -1);
          if (this.optionalRestSlugName != null)
            throw Object.defineProperty(new Error('You cannot define a route with the same specificity as a optional catch-all route ("' + u + '" and "' + u + "[[..." + this.optionalRestSlugName + ']]").'), "__NEXT_ERROR_CODE", {
              value: "E458",
              enumerable: !1,
              configurable: !0
            });
          c.unshift(u);
        }
        return this.restSlugName !== null && c.push(...this.children.get("[...]")._smoosh(i + "[..." + this.restSlugName + "]/")), this.optionalRestSlugName !== null && c.push(...this.children.get("[[...]]")._smoosh(i + "[[..." + this.optionalRestSlugName + "]]/")), c;
      }
      _insert(i, s, c) {
        if (i.length === 0) {
          this.placeholder = !1;
          return;
        }
        if (c)
          throw Object.defineProperty(new Error("Catch-all must be the last part of the URL."), "__NEXT_ERROR_CODE", {
            value: "E392",
            enumerable: !1,
            configurable: !0
          });
        let u = i[0];
        if (u.startsWith("[") && u.endsWith("]")) {
          let p = function(g, b) {
            if (g !== null && g !== b)
              throw Object.defineProperty(new Error("You cannot use different slug names for the same dynamic path ('" + g + "' !== '" + b + "')."), "__NEXT_ERROR_CODE", {
                value: "E337",
                enumerable: !1,
                configurable: !0
              });
            s.forEach((f) => {
              if (f === b)
                throw Object.defineProperty(new Error('You cannot have the same slug name "' + b + '" repeat within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E247",
                  enumerable: !1,
                  configurable: !0
                });
              if (f.replace(/\W/g, "") === u.replace(/\W/g, ""))
                throw Object.defineProperty(new Error('You cannot have the slug names "' + f + '" and "' + b + '" differ only by non-word symbols within a single dynamic path'), "__NEXT_ERROR_CODE", {
                  value: "E499",
                  enumerable: !1,
                  configurable: !0
                });
            }), s.push(b);
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
                throw Object.defineProperty(new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + i[0] + '" ).'), "__NEXT_ERROR_CODE", {
                  value: "E299",
                  enumerable: !1,
                  configurable: !0
                });
              p(this.optionalRestSlugName, l), this.optionalRestSlugName = l, u = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + i[0] + '").'), "__NEXT_ERROR_CODE", {
                  value: "E300",
                  enumerable: !1,
                  configurable: !0
                });
              p(this.restSlugName, l), this.restSlugName = l, u = "[...]";
            }
          else {
            if (d)
              throw Object.defineProperty(new Error('Optional route parameters are not yet supported ("' + i[0] + '").'), "__NEXT_ERROR_CODE", {
                value: "E435",
                enumerable: !1,
                configurable: !0
              });
            p(this.slugName, l), this.slugName = l, u = "[]";
          }
        }
        this.children.has(u) || this.children.set(u, new n()), this.children.get(u)._insert(i.slice(1), s, c);
      }
      constructor() {
        this.placeholder = !0, this.children = /* @__PURE__ */ new Map(), this.slugName = null, this.restSlugName = null, this.optionalRestSlugName = null;
      }
    }
    function r(a) {
      const i = new n();
      return a.forEach((s) => i.insert(s)), i.smoosh();
    }
    function o(a, i) {
      const s = {}, c = [];
      for (let l = 0; l < a.length; l++) {
        const d = i(a[l]);
        s[d] = l, c[l] = d;
      }
      return r(c).map((l) => a[s[l]]);
    }
  }(_r)), _r;
}
var br = {}, yr = {}, Er = {}, Rr = {}, ni;
function mf() {
  return ni || (ni = 1, function(e) {
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
  }(Rr)), Rr;
}
var ea = {};
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
      return i;
    },
    PAGE_SEGMENT_KEY: function() {
      return a;
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
    if (s.includes(a)) {
      const l = JSON.stringify(c);
      return l !== "{}" ? a + "?" + l : a;
    }
    return s;
  }
  const a = "__PAGE__", i = "__DEFAULT__";
})(ea);
var ri;
function hf() {
  return ri || (ri = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      normalizeAppPath: function() {
        return o;
      },
      normalizeRscURL: function() {
        return a;
      }
    });
    const n = mf(), r = ea;
    function o(i) {
      return (0, n.ensureLeadingSlash)(i.split("/").reduce((s, c, u, l) => !c || (0, r.isGroupSegment)(c) || c[0] === "@" || (c === "page" || c === "route") && u === l.length - 1 ? s : s + "/" + c, ""));
    }
    function a(i) {
      return i.replace(
        /\.rsc($|\?)/,
        // $1 ensures `?` is preserved
        "$1"
      );
    }
  }(Er)), Er;
}
var oi;
function ec() {
  return oi || (oi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    t(e, {
      INTERCEPTION_ROUTE_MARKERS: function() {
        return r;
      },
      extractInterceptionRouteInformation: function() {
        return a;
      },
      isInterceptionRouteAppPath: function() {
        return o;
      }
    });
    const n = hf(), r = [
      "(..)(..)",
      "(.)",
      "(..)",
      "(...)"
    ];
    function o(i) {
      return i.split("/").find((s) => r.find((c) => s.startsWith(c))) !== void 0;
    }
    function a(i) {
      let s, c, u;
      for (const l of i.split("/"))
        if (c = r.find((d) => l.startsWith(d)), c) {
          [s, u] = i.split(c, 2);
          break;
        }
      if (!s || !c || !u)
        throw Object.defineProperty(new Error("Invalid interception route: " + i + ". Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>"), "__NEXT_ERROR_CODE", {
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
            throw Object.defineProperty(new Error("Invalid interception route: " + i + ". Cannot use (..) marker at the root level, use (.) instead."), "__NEXT_ERROR_CODE", {
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
            throw Object.defineProperty(new Error("Invalid interception route: " + i + ". Cannot use (..)(..) marker at the root level or one level up."), "__NEXT_ERROR_CODE", {
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
  }(yr)), yr;
}
var ai;
function gf() {
  return ai || (ai = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isDynamicRoute", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = ec(), n = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, r = /\/\[[^/]+\](?=\/|$)/;
    function o(a, i) {
      return i === void 0 && (i = !0), (0, t.isInterceptionRouteAppPath)(a) && (a = (0, t.extractInterceptionRouteInformation)(a).interceptedRoute), i ? r.test(a) : n.test(a);
    }
  }(br)), br;
}
var ii;
function vf() {
  return ii || (ii = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(o, a) {
      for (var i in a) Object.defineProperty(o, i, {
        enumerable: !0,
        get: a[i]
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
    const n = pf(), r = gf();
  }(vr)), vr;
}
var wr = {}, Sr = {}, si;
function _f() {
  return si || (si = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getRouteMatcher", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = $n();
    function n(r) {
      let { re: o, groups: a } = r;
      return (i) => {
        const s = o.exec(i);
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
        for (const [l, d] of Object.entries(a)) {
          const p = s[d.pos];
          p !== void 0 && (d.repeat ? u[l] = p.split("/").map((g) => c(g)) : u[l] = c(p));
        }
        return u;
      };
    }
  }(Sr)), Sr;
}
var xr = {}, Cr = {}, ci;
function bf() {
  return ci || (ci = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(pe, Pe) {
      for (var Re in Pe) Object.defineProperty(pe, Re, {
        enumerable: !0,
        get: Pe[Re]
      });
    }
    t(e, {
      ACTION_SUFFIX: function() {
        return d;
      },
      APP_DIR_ALIAS: function() {
        return G;
      },
      CACHE_ONE_YEAR: function() {
        return C;
      },
      DOT_NEXT_ALIAS: function() {
        return B;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return $;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return te;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return S;
      },
      GSSP_NO_RETURNED_VALUE: function() {
        return z;
      },
      INFINITE_CACHE: function() {
        return O;
      },
      INSTRUMENTATION_HOOK_FILENAME: function() {
        return M;
      },
      MATCHED_PATH_HEADER: function() {
        return o;
      },
      MIDDLEWARE_FILENAME: function() {
        return N;
      },
      MIDDLEWARE_LOCATION_REGEXP: function() {
        return T;
      },
      NEXT_BODY_SUFFIX: function() {
        return b;
      },
      NEXT_CACHE_IMPLICIT_TAG_ID: function() {
        return A;
      },
      NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
        return _;
      },
      NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
        return v;
      },
      NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
        return E;
      },
      NEXT_CACHE_TAGS_HEADER: function() {
        return f;
      },
      NEXT_CACHE_TAG_MAX_ITEMS: function() {
        return m;
      },
      NEXT_CACHE_TAG_MAX_LENGTH: function() {
        return y;
      },
      NEXT_DATA_SUFFIX: function() {
        return p;
      },
      NEXT_INTERCEPTION_MARKER_PREFIX: function() {
        return r;
      },
      NEXT_META_SUFFIX: function() {
        return g;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return n;
      },
      NEXT_RESUME_HEADER: function() {
        return w;
      },
      NON_STANDARD_NODE_ENV: function() {
        return x;
      },
      PAGES_DIR_ALIAS: function() {
        return k;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return a;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return i;
      },
      PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
        return re;
      },
      ROOT_DIR_ALIAS: function() {
        return j;
      },
      RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
        return se;
      },
      RSC_ACTION_ENCRYPTION_ALIAS: function() {
        return K;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return I;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return Z;
      },
      RSC_CACHE_WRAPPER_ALIAS: function() {
        return D;
      },
      RSC_MOD_REF_PROXY_ALIAS: function() {
        return F;
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
        return P;
      },
      SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
        return Q;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return fe;
      },
      SERVER_RUNTIME: function() {
        return U;
      },
      SSG_FALLBACK_EXPORT_ERROR: function() {
        return H;
      },
      SSG_GET_INITIAL_PROPS_CONFLICT: function() {
        return ne;
      },
      STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
        return ae;
      },
      UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
        return Y;
      },
      WEBPACK_LAYERS: function() {
        return me;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return ve;
      }
    });
    const n = "nxtP", r = "nxtI", o = "x-matched-path", a = "x-prerender-revalidate", i = "x-prerender-revalidate-if-generated", s = ".prefetch.rsc", c = ".segments", u = ".segment.rsc", l = ".rsc", d = ".action", p = ".json", g = ".meta", b = ".body", f = "x-next-cache-tags", _ = "x-next-revalidated-tags", v = "x-next-revalidate-tag-token", w = "next-resume", m = 128, y = 256, E = 1024, A = "_N_T_", C = 31536e3, O = 4294967294, N = "middleware", T = `(?:src/)?${N}`, M = "instrumentation", k = "private-next-pages", B = "private-dot-next", j = "private-next-root-dir", G = "private-next-app-dir", F = "private-next-rsc-mod-ref-proxy", Z = "private-next-rsc-action-validate", I = "private-next-rsc-server-reference", D = "private-next-rsc-cache-wrapper", K = "private-next-rsc-action-encryption", se = "private-next-rsc-action-client-wrapper", re = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", ne = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", Q = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", fe = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", ae = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", P = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", te = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", z = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", Y = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", S = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", x = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', H = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", $ = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ], U = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    }, W = {
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
    }, me = {
      ...W,
      GROUP: {
        builtinReact: [
          W.reactServerComponents,
          W.actionBrowser
        ],
        serverOnly: [
          W.reactServerComponents,
          W.actionBrowser,
          W.instrument,
          W.middleware
        ],
        neutralTarget: [
          // pages api
          W.apiNode,
          W.apiEdge
        ],
        clientOnly: [
          W.serverSideRendering,
          W.appPagesBrowser
        ],
        bundled: [
          W.reactServerComponents,
          W.actionBrowser,
          W.serverSideRendering,
          W.appPagesBrowser,
          W.shared,
          W.instrument,
          W.middleware
        ],
        appPages: [
          // app router pages and layouts
          W.reactServerComponents,
          W.serverSideRendering,
          W.appPagesBrowser,
          W.actionBrowser
        ]
      }
    }, ve = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }(Cr)), Cr;
}
var Pr = {}, ui;
function yf() {
  return ui || (ui = 1, function(e) {
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
  }(Pr)), Pr;
}
var li;
function Ef() {
  return li || (li = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(_, v) {
      for (var w in v) Object.defineProperty(_, w, {
        enumerable: !0,
        get: v[w]
      });
    }
    t(e, {
      getNamedMiddlewareRegex: function() {
        return f;
      },
      getNamedRouteRegex: function() {
        return b;
      },
      getRouteRegex: function() {
        return l;
      },
      parseParameter: function() {
        return s;
      }
    });
    const n = bf(), r = ec(), o = yf(), a = Qs(), i = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
    function s(_) {
      const v = _.match(i);
      return c(v ? v[2] : _);
    }
    function c(_) {
      const v = _.startsWith("[") && _.endsWith("]");
      v && (_ = _.slice(1, -1));
      const w = _.startsWith("...");
      return w && (_ = _.slice(3)), {
        key: _,
        repeat: w,
        optional: v
      };
    }
    function u(_, v, w) {
      const m = {};
      let y = 1;
      const E = [];
      for (const A of (0, a.removeTrailingSlash)(_).slice(1).split("/")) {
        const C = r.INTERCEPTION_ROUTE_MARKERS.find((N) => A.startsWith(N)), O = A.match(i);
        if (C && O && O[2]) {
          const { key: N, optional: T, repeat: M } = c(O[2]);
          m[N] = {
            pos: y++,
            repeat: M,
            optional: T
          }, E.push("/" + (0, o.escapeStringRegexp)(C) + "([^/]+?)");
        } else if (O && O[2]) {
          const { key: N, repeat: T, optional: M } = c(O[2]);
          m[N] = {
            pos: y++,
            repeat: T,
            optional: M
          }, w && O[1] && E.push("/" + (0, o.escapeStringRegexp)(O[1]));
          let k = T ? M ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
          w && O[1] && (k = k.substring(1)), E.push(k);
        } else
          E.push("/" + (0, o.escapeStringRegexp)(A));
        v && O && O[3] && E.push((0, o.escapeStringRegexp)(O[3]));
      }
      return {
        parameterizedRoute: E.join(""),
        groups: m
      };
    }
    function l(_, v) {
      let { includeSuffix: w = !1, includePrefix: m = !1, excludeOptionalTrailingSlash: y = !1 } = v === void 0 ? {} : v;
      const { parameterizedRoute: E, groups: A } = u(_, w, m);
      let C = E;
      return y || (C += "(?:/)?"), {
        re: new RegExp("^" + C + "$"),
        groups: A
      };
    }
    function d() {
      let _ = 0;
      return () => {
        let v = "", w = ++_;
        for (; w > 0; )
          v += String.fromCharCode(97 + (w - 1) % 26), w = Math.floor((w - 1) / 26);
        return v;
      };
    }
    function p(_) {
      let { interceptionMarker: v, getSafeRouteKey: w, segment: m, routeKeys: y, keyPrefix: E, backreferenceDuplicateKeys: A } = _;
      const { key: C, optional: O, repeat: N } = c(m);
      let T = C.replace(/\W/g, "");
      E && (T = "" + E + T);
      let M = !1;
      (T.length === 0 || T.length > 30) && (M = !0), isNaN(parseInt(T.slice(0, 1))) || (M = !0), M && (T = w());
      const k = T in y;
      E ? y[T] = "" + E + C : y[T] = C;
      const B = v ? (0, o.escapeStringRegexp)(v) : "";
      let j;
      return k && A ? j = "\\k<" + T + ">" : N ? j = "(?<" + T + ">.+?)" : j = "(?<" + T + ">[^/]+?)", O ? "(?:/" + B + j + ")?" : "/" + B + j;
    }
    function g(_, v, w, m, y) {
      const E = d(), A = {}, C = [];
      for (const O of (0, a.removeTrailingSlash)(_).slice(1).split("/")) {
        const N = r.INTERCEPTION_ROUTE_MARKERS.some((M) => O.startsWith(M)), T = O.match(i);
        if (N && T && T[2])
          C.push(p({
            getSafeRouteKey: E,
            interceptionMarker: T[1],
            segment: T[2],
            routeKeys: A,
            keyPrefix: v ? n.NEXT_INTERCEPTION_MARKER_PREFIX : void 0,
            backreferenceDuplicateKeys: y
          }));
        else if (T && T[2]) {
          m && T[1] && C.push("/" + (0, o.escapeStringRegexp)(T[1]));
          let M = p({
            getSafeRouteKey: E,
            segment: T[2],
            routeKeys: A,
            keyPrefix: v ? n.NEXT_QUERY_PARAM_PREFIX : void 0,
            backreferenceDuplicateKeys: y
          });
          m && T[1] && (M = M.substring(1)), C.push(M);
        } else
          C.push("/" + (0, o.escapeStringRegexp)(O));
        w && T && T[3] && C.push((0, o.escapeStringRegexp)(T[3]));
      }
      return {
        namedParameterizedRoute: C.join(""),
        routeKeys: A
      };
    }
    function b(_, v) {
      var w, m, y;
      const E = g(_, v.prefixRouteKeys, (w = v.includeSuffix) != null ? w : !1, (m = v.includePrefix) != null ? m : !1, (y = v.backreferenceDuplicateKeys) != null ? y : !1);
      let A = E.namedParameterizedRoute;
      return v.excludeOptionalTrailingSlash || (A += "(?:/)?"), {
        ...l(_, v),
        namedRegex: "^" + A + "$",
        routeKeys: E.routeKeys
      };
    }
    function f(_, v) {
      const { parameterizedRoute: w } = u(_, !1, !1), { catchAll: m = !0 } = v;
      if (w === "/")
        return {
          namedRegex: "^/" + (m ? ".*" : "") + "$"
        };
      const { namedParameterizedRoute: y } = g(_, !1, !1, !1, !1);
      let E = m ? "(?:(/.*)?)" : "";
      return {
        namedRegex: "^" + y + E + "$"
      };
    }
  }(xr)), xr;
}
var di;
function Rf() {
  return di || (di = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "interpolateAs", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = _f(), n = Ef();
    function r(o, a, i) {
      let s = "";
      const c = (0, n.getRouteRegex)(o), u = c.groups, l = (
        // Try to match the dynamic route against the asPath
        (a !== o ? (0, t.getRouteMatcher)(c)(a) : "") || // Fall back to reading the values from the href
        // TODO: should this take priority; also need to change in the router.
        i
      );
      s = o;
      const d = Object.keys(u);
      return d.every((p) => {
        let g = l[p] || "";
        const { repeat: b, optional: f } = u[p];
        let _ = "[" + (b ? "..." : "") + p + "]";
        return f && (_ = (g ? "" : "/") + "[" + _ + "]"), b && !Array.isArray(g) && (g = [
          g
        ]), (f || p in l) && // Interpolate group into data URL if present
        (s = s.replace(_, b ? g.map(
          // these values should be fully encoded instead of just
          // path delimiter escaped since they are being inserted
          // into the URL and we expect URL encoded segments
          // when parsing dynamic route params
          (v) => encodeURIComponent(v)
        ).join("/") : encodeURIComponent(g)) || "/");
      }) || (s = ""), {
        params: d,
        result: s
      };
    }
  }(wr)), wr;
}
var fi;
function wf() {
  return fi || (fi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "resolveHref", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const n = Ks(), r = Ys(), o = df(), a = $n(), i = Hn(), s = Js(), c = vf(), u = Rf();
    function l(d, p, g) {
      let b, f = typeof p == "string" ? p : (0, r.formatWithValidation)(p);
      const _ = f.match(/^[a-zA-Z]{1,}:\/\//), v = _ ? f.slice(_[0].length) : f;
      if ((v.split("?", 1)[0] || "").match(/(\/\/|\\)/)) {
        console.error("Invalid href '" + f + "' passed to next/router in page: '" + d.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
        const m = (0, a.normalizeRepeatedSlashes)(v);
        f = (_ ? _[0] : "") + m;
      }
      if (!(0, s.isLocalURL)(f))
        return g ? [
          f
        ] : f;
      try {
        b = new URL(f.startsWith("#") ? d.asPath : d.pathname, "http://n");
      } catch {
        b = new URL("/", "http://n");
      }
      try {
        const m = new URL(f, b);
        m.pathname = (0, i.normalizePathTrailingSlash)(m.pathname);
        let y = "";
        if ((0, c.isDynamicRoute)(m.pathname) && m.searchParams && g) {
          const A = (0, n.searchParamsToUrlQuery)(m.searchParams), { result: C, params: O } = (0, u.interpolateAs)(m.pathname, m.pathname, A);
          C && (y = (0, r.formatWithValidation)({
            pathname: C,
            hash: m.hash,
            query: (0, o.omit)(A, O)
          }));
        }
        const E = m.origin === b.origin ? m.href.slice(m.origin.length) : m.href;
        return g ? [
          E,
          y || E
        ] : E;
      } catch {
        return g ? [
          f
        ] : f;
      }
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Kt, Kt.exports)), Kt.exports;
}
var Zt = { exports: {} }, Or = {}, Ar = {}, pi;
function tc() {
  return pi || (pi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = Jo();
    function n(r, o) {
      if (!r.startsWith("/") || !o)
        return r;
      const { pathname: a, query: i, hash: s } = (0, t.parsePath)(r);
      return "" + o + a + i + s;
    }
  }(Ar)), Ar;
}
var mi;
function Sf() {
  return mi || (mi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = tc(), n = Zs();
    function r(o, a, i, s) {
      if (!a || a === i) return o;
      const c = o.toLowerCase();
      return !s && ((0, n.pathHasPrefix)(c, "/api") || (0, n.pathHasPrefix)(c, "/" + a.toLowerCase())) ? o : (0, t.addPathPrefix)(o, "/" + a);
    }
  }(Or)), Or;
}
var hi;
function xf() {
  return hi || (hi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = Hn(), r = function(o) {
      for (var a = arguments.length, i = new Array(a > 1 ? a - 1 : 0), s = 1; s < a; s++)
        i[s - 1] = arguments[s];
      return process.env.__NEXT_I18N_SUPPORT ? (0, n.normalizePathTrailingSlash)(Sf().addLocale(o, ...i)) : o;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Zt, Zt.exports)), Zt.exports;
}
var Tr = {}, Ke = {};
function Cf(e) {
  return e && e.__esModule ? e : { default: e };
}
Ke._ = Cf;
var gi;
function nc() {
  return gi || (gi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "RouterContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ Ke._(le)).default.createContext(null);
    process.env.NODE_ENV !== "production" && (r.displayName = "RouterContext");
  }(Tr)), Tr;
}
var Jt = { exports: {} }, en = { exports: {} }, vi;
function Pf() {
  return vi || (vi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(a, i) {
      for (var s in i) Object.defineProperty(a, s, {
        enumerable: !0,
        get: i[s]
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
    const r = typeof self < "u" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(a) {
      let i = Date.now();
      return self.setTimeout(function() {
        a({
          didTimeout: !1,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - i));
          }
        });
      }, 1);
    }, o = typeof self < "u" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(a) {
      return clearTimeout(a);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(en, en.exports)), en.exports;
}
var _i;
function Of() {
  return _i || (_i = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useIntersection", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const n = le, r = Pf(), o = typeof IntersectionObserver == "function", a = /* @__PURE__ */ new Map(), i = [];
    function s(l) {
      const d = {
        root: l.root || null,
        margin: l.rootMargin || ""
      }, p = i.find((_) => _.root === d.root && _.margin === d.margin);
      let g;
      if (p && (g = a.get(p), g))
        return g;
      const b = /* @__PURE__ */ new Map(), f = new IntersectionObserver((_) => {
        _.forEach((v) => {
          const w = b.get(v.target), m = v.isIntersecting || v.intersectionRatio > 0;
          w && m && w(m);
        });
      }, l);
      return g = {
        id: d,
        observer: f,
        elements: b
      }, i.push(d), a.set(d, g), g;
    }
    function c(l, d, p) {
      const { id: g, observer: b, elements: f } = s(p);
      return f.set(l, d), b.observe(l), function() {
        if (f.delete(l), b.unobserve(l), f.size === 0) {
          b.disconnect(), a.delete(g);
          const v = i.findIndex((w) => w.root === g.root && w.margin === g.margin);
          v > -1 && i.splice(v, 1);
        }
      };
    }
    function u(l) {
      let { rootRef: d, rootMargin: p, disabled: g } = l;
      const b = g || !o, [f, _] = (0, n.useState)(!1), v = (0, n.useRef)(null), w = (0, n.useCallback)((y) => {
        v.current = y;
      }, []);
      (0, n.useEffect)(() => {
        if (o) {
          if (b || f) return;
          const y = v.current;
          if (y && y.tagName)
            return c(y, (A) => A && _(A), {
              root: d == null ? void 0 : d.current,
              rootMargin: p
            });
        } else if (!f) {
          const y = (0, r.requestIdleCallback)(() => _(!0));
          return () => (0, r.cancelIdleCallback)(y);
        }
      }, [
        b,
        p,
        d,
        f,
        v.current
      ]);
      const m = (0, n.useCallback)(() => {
        _(!1);
      }, []);
      return [
        w,
        f,
        m
      ];
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Jt, Jt.exports)), Jt.exports;
}
var tn = { exports: {} }, nn = { exports: {} }, Nr = {}, bi;
function Af() {
  return bi || (bi = 1, function(e) {
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
      let a = t.get(o);
      a || (a = o.map((l) => l.toLowerCase()), t.set(o, a));
      let i;
      const s = r.split("/", 2);
      if (!s[1]) return {
        pathname: r
      };
      const c = s[1].toLowerCase(), u = a.indexOf(c);
      return u < 0 ? {
        pathname: r
      } : (i = o[u], r = r.slice(i.length + 1) || "/", {
        pathname: r,
        detectedLocale: i
      });
    }
  }(Nr)), Nr;
}
var yi;
function Tf() {
  return yi || (yi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (r, o) => process.env.__NEXT_I18N_SUPPORT ? Af().normalizeLocalePath(r, o) : {
      pathname: r,
      detectedLocale: void 0
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(nn, nn.exports)), nn.exports;
}
var rn = { exports: {} }, Ir = {}, Ei;
function Nf() {
  return Ei || (Ei = 1, function(e) {
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
          var a, i;
          const c = (a = s.domain) == null ? void 0 : a.split(":", 1)[0].toLowerCase();
          if (r === c || o === s.defaultLocale.toLowerCase() || (i = s.locales) != null && i.some((u) => u.toLowerCase() === o))
            return s;
        }
      }
    }
  }(Ir)), Ir;
}
var Ri;
function If() {
  return Ri || (Ri = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "detectDomainLocale", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = function() {
      for (var r = arguments.length, o = new Array(r), a = 0; a < r; a++)
        o[a] = arguments[a];
      if (process.env.__NEXT_I18N_SUPPORT)
        return Nf().detectDomainLocale(...o);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(rn, rn.exports)), rn.exports;
}
var wi;
function Mf() {
  return wi || (wi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "getDomainLocale", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Hn(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(a, i, s, c) {
      if (process.env.__NEXT_I18N_SUPPORT) {
        const u = Tf().normalizeLocalePath, l = If().detectDomainLocale, d = i || u(a, s).detectedLocale, p = l(c, void 0, d);
        if (p) {
          const g = "http" + (p.http ? "" : "s") + "://", b = d === p.defaultLocale ? "" : "/" + d;
          return "" + g + p.domain + (0, n.normalizePathTrailingSlash)("" + r + b + a);
        }
        return !1;
      } else
        return !1;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(tn, tn.exports)), tn.exports;
}
var on = { exports: {} }, Si;
function Df() {
  return Si || (Si = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addBasePath", {
      enumerable: !0,
      get: function() {
        return a;
      }
    });
    const n = tc(), r = Hn(), o = process.env.__NEXT_ROUTER_BASEPATH || "";
    function a(i, s) {
      return (0, r.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !s ? i : (0, n.addPathPrefix)(i, o));
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(on, on.exports)), on.exports;
}
var an = { exports: {} }, xi;
function rc() {
  return xi || (xi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useMergedRef", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = le;
    function r(a, i) {
      const s = (0, n.useRef)(null), c = (0, n.useRef)(null);
      return (0, n.useCallback)((u) => {
        if (u === null) {
          const l = s.current;
          l && (s.current = null, l());
          const d = c.current;
          d && (c.current = null, d());
        } else
          a && (s.current = o(a, u)), i && (c.current = o(i, u));
      }, [
        a,
        i
      ]);
    }
    function o(a, i) {
      if (typeof a == "function") {
        const s = a(i);
        return typeof s == "function" ? s : () => a(null);
      } else
        return a.current = i, () => {
          a.current = null;
        };
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(an, an.exports)), an.exports;
}
var Mr = {}, Ci;
function kf() {
  return Ci || (Ci = 1, function(e) {
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
  }(Mr)), Mr;
}
(function(e, t) {
  "use client";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(T, M) {
    for (var k in M) Object.defineProperty(T, k, {
      enumerable: !0,
      get: M[k]
    });
  }
  n(t, {
    default: function() {
      return N;
    },
    useLinkStatus: function() {
      return O;
    }
  });
  const r = Ct, o = Ko, a = /* @__PURE__ */ r._(le), i = wf(), s = Js(), c = Ys(), u = $n(), l = xf(), d = nc(), p = Of(), g = Mf(), b = Df(), f = rc(), _ = kf(), v = /* @__PURE__ */ new Set();
  function w(T, M, k, B) {
    if (!(typeof window > "u") && (0, s.isLocalURL)(M)) {
      if (!B.bypassPrefetchedCheck) {
        const j = (
          // Let the link's locale prop override the default router locale.
          typeof B.locale < "u" ? B.locale : "locale" in T ? T.locale : void 0
        ), G = M + "%" + k + "%" + j;
        if (v.has(G))
          return;
        v.add(G);
      }
      T.prefetch(M, k, B).catch((j) => {
        if (process.env.NODE_ENV !== "production")
          throw j;
      });
    }
  }
  function m(T) {
    const k = T.currentTarget.getAttribute("target");
    return k && k !== "_self" || T.metaKey || T.ctrlKey || T.shiftKey || T.altKey || // triggers resource download
    T.nativeEvent && T.nativeEvent.which === 2;
  }
  function y(T, M, k, B, j, G, F, Z, I) {
    const { nodeName: D } = T.currentTarget;
    if (D.toUpperCase() === "A" && m(T) || T.currentTarget.hasAttribute("download"))
      return;
    if (!(0, s.isLocalURL)(k)) {
      j && (T.preventDefault(), location.replace(k));
      return;
    }
    T.preventDefault(), (() => {
      if (I) {
        let ne = !1;
        if (I({
          preventDefault: () => {
            ne = !0;
          }
        }), ne)
          return;
      }
      const re = F ?? !0;
      "beforePopState" in M ? M[j ? "replace" : "push"](k, B, {
        shallow: G,
        locale: Z,
        scroll: re
      }) : M[j ? "replace" : "push"](B || k, {
        scroll: re
      });
    })();
  }
  function E(T) {
    return typeof T == "string" ? T : (0, c.formatUrl)(T);
  }
  const A = /* @__PURE__ */ a.default.forwardRef(function(M, k) {
    let B;
    const { href: j, as: G, children: F, prefetch: Z = null, passHref: I, replace: D, shallow: K, scroll: se, locale: re, onClick: ne, onNavigate: Q, onMouseEnter: fe, onTouchStart: ae, legacyBehavior: P = !1, ...te } = M;
    B = F, P && (typeof B == "string" || typeof B == "number") && (B = /* @__PURE__ */ (0, o.jsx)("a", {
      children: B
    }));
    const z = a.default.useContext(d.RouterContext), Y = Z !== !1;
    if (process.env.NODE_ENV !== "production") {
      let ue = function(L) {
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
        if (L === "href" && (M[L] == null || typeof M[L] != "string" && typeof M[L] != "object"))
          throw ue({
            key: L,
            expected: "`string` or `object`",
            actual: M[L] === null ? "null" : typeof M[L]
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
        const oe = typeof M[L];
        if (L === "as") {
          if (M[L] && oe !== "string" && oe !== "object")
            throw ue({
              key: L,
              expected: "`string` or `object`",
              actual: oe
            });
        } else if (L === "locale") {
          if (M[L] && oe !== "string")
            throw ue({
              key: L,
              expected: "`string`",
              actual: oe
            });
        } else if (L === "onClick" || L === "onMouseEnter" || L === "onTouchStart" || L === "onNavigate") {
          if (M[L] && oe !== "function")
            throw ue({
              key: L,
              expected: "`function`",
              actual: oe
            });
        } else if ((L === "replace" || L === "scroll" || L === "shallow" || L === "passHref" || L === "prefetch" || L === "legacyBehavior") && M[L] != null && oe !== "boolean")
          throw ue({
            key: L,
            expected: "`boolean`",
            actual: oe
          });
      });
    }
    const { href: S, as: x } = a.default.useMemo(() => {
      if (!z) {
        const q = E(j);
        return {
          href: q,
          as: G ? E(G) : q
        };
      }
      const [ue, ye] = (0, i.resolveHref)(z, j, !0);
      return {
        href: ue,
        as: G ? (0, i.resolveHref)(z, G) : ye || ue
      };
    }, [
      z,
      j,
      G
    ]), H = a.default.useRef(S), $ = a.default.useRef(x);
    let U;
    if (P)
      if (process.env.NODE_ENV === "development") {
        ne && console.warn('"onClick" was passed to <Link> with `href` of `' + j + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link'), fe && console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + j + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
        try {
          U = a.default.Children.only(B);
        } catch {
          throw B ? Object.defineProperty(new Error("Multiple children were passed to <Link> with `href` of `" + j + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window < "u" ? ` 
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
            value: "E266",
            enumerable: !1,
            configurable: !0
          }) : Object.defineProperty(new Error("No children were passed to <Link> with `href` of `" + j + "` but one child is required https://nextjs.org/docs/messages/link-no-children"), "__NEXT_ERROR_CODE", {
            value: "E320",
            enumerable: !1,
            configurable: !0
          });
        }
      } else
        U = a.default.Children.only(B);
    else if (process.env.NODE_ENV === "development" && (B == null ? void 0 : B.type) === "a")
      throw Object.defineProperty(new Error(`Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor`), "__NEXT_ERROR_CODE", {
        value: "E209",
        enumerable: !1,
        configurable: !0
      });
    const W = P ? U && typeof U == "object" && U.ref : k, [me, ve, pe] = (0, p.useIntersection)({
      rootMargin: "200px"
    }), Pe = a.default.useCallback((ue) => {
      ($.current !== x || H.current !== S) && (pe(), $.current = x, H.current = S), me(ue);
    }, [
      x,
      S,
      pe,
      me
    ]), Re = (0, f.useMergedRef)(Pe, W);
    a.default.useEffect(() => {
      process.env.NODE_ENV === "production" && z && (!ve || !Y || w(z, S, x, {
        locale: re
      }));
    }, [
      x,
      S,
      ve,
      re,
      Y,
      z == null ? void 0 : z.locale,
      z
    ]);
    const ie = {
      ref: Re,
      onClick(ue) {
        if (process.env.NODE_ENV !== "production" && !ue)
          throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
            value: "E312",
            enumerable: !1,
            configurable: !0
          });
        !P && typeof ne == "function" && ne(ue), P && U.props && typeof U.props.onClick == "function" && U.props.onClick(ue), z && (ue.defaultPrevented || y(ue, z, S, x, D, K, se, re, Q));
      },
      onMouseEnter(ue) {
        !P && typeof fe == "function" && fe(ue), P && U.props && typeof U.props.onMouseEnter == "function" && U.props.onMouseEnter(ue), z && w(z, S, x, {
          locale: re,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      },
      onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? void 0 : function(ye) {
        !P && typeof ae == "function" && ae(ye), P && U.props && typeof U.props.onTouchStart == "function" && U.props.onTouchStart(ye), z && w(z, S, x, {
          locale: re,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      }
    };
    if ((0, u.isAbsoluteUrl)(x))
      ie.href = x;
    else if (!P || I || U.type === "a" && !("href" in U.props)) {
      const ue = typeof re < "u" ? re : z == null ? void 0 : z.locale, ye = (z == null ? void 0 : z.isLocaleDomain) && (0, g.getDomainLocale)(x, ue, z == null ? void 0 : z.locales, z == null ? void 0 : z.domainLocales);
      ie.href = ye || (0, b.addBasePath)((0, l.addLocale)(x, ue, z == null ? void 0 : z.defaultLocale));
    }
    return P ? (process.env.NODE_ENV === "development" && (0, _.errorOnce)(`\`legacyBehavior\` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:

npx @next/codemod@latest new-link .

Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components`), /* @__PURE__ */ a.default.cloneElement(U, ie)) : /* @__PURE__ */ (0, o.jsx)("a", {
      ...te,
      ...ie,
      children: B
    });
  }), C = /* @__PURE__ */ (0, a.createContext)({
    // We do not support link status in the Pages Router, so we always return false
    pending: !1
  }), O = () => (0, a.useContext)(C), N = A;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(_o, _o.exports);
var Lf = _o.exports, jf = Lf;
const oc = /* @__PURE__ */ Ws(jf), ta = Ft(
  ({
    type: e = "button",
    variant: t,
    size: n,
    children: r,
    isLoading: o = !1,
    isLeftIconVisible: a = !1,
    isRightIconVisible: i = !1,
    icon: s,
    isDisabled: c = !1,
    isIconOnly: u = !1,
    ariaLabel: l,
    href: d,
    className: p,
    onClick: g,
    ...b
  }, f) => {
    const _ = s ? Zl(
      s,
      {
        className: "w-[1rem] h-[1rem]",
        "data-testid": "icon"
      }
    ) : /* @__PURE__ */ R(sf, { className: "h-[1rem] w-[1rem]", "data-testid": "icon" }), v = /* @__PURE__ */ be(Ze, { children: [
      a && !o && _,
      o && /* @__PURE__ */ R(nf, { className: "h-[1rem] w-[1rem] animate-spin", "data-testid": "loading-spinner" }),
      u && !o && _,
      !u && r,
      !u && !r && o && "Loading",
      i && !o && _
    ] }), w = `transition-all duration-300 ease-in-out ${c ? "opacity-50 cursor-not-allowed" : "hover:shadow-sneob dark:hover:shadow-sneobw focus:shadow-none"} ${p}`;
    return d ? /^https?:\/\//.test(d) ? /* @__PURE__ */ R("a", { href: d, target: "_blank", rel: "noopener noreferrer", "aria-label": l, children: /* @__PURE__ */ R(
      En,
      {
        type: e,
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: w,
        onClick: g,
        role: "button",
        ref: f,
        ...b,
        children: v
      }
    ) }) : /* @__PURE__ */ R(oc, { href: c ? "" : d, passHref: !0, "aria-label": l, children: /* @__PURE__ */ R(
      En,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: w,
        onClick: g,
        role: "button",
        ref: f,
        ...b,
        children: v
      }
    ) }) : /* @__PURE__ */ R(
      En,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: w,
        onClick: g,
        role: "button",
        ref: f,
        ...b,
        children: v
      }
    );
  }
);
ta.displayName = "CustomButton";
function Pi({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ R(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: Ee(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...n
    }
  );
}
var Ff = [
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
], ce = Ff.reduce((e, t) => {
  const n = /* @__PURE__ */ it(`Primitive.${t}`), r = h.forwardRef((o, a) => {
    const { asChild: i, ...s } = o, c = i ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ R(c, { ...s, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Cn(e, t) {
  e && jn.flushSync(() => e.dispatchEvent(t));
}
var $f = "Label", ac = h.forwardRef((e, t) => /* @__PURE__ */ R(
  ce.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
ac.displayName = $f;
var Hf = ac;
function Uf({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    Hf,
    {
      "data-slot": "label",
      className: Ee(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function Oi(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function X(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Bf(e, t) {
  const n = h.createContext(t), r = (a) => {
    const { children: i, ...s } = a, c = h.useMemo(() => s, Object.values(s));
    return /* @__PURE__ */ R(n.Provider, { value: c, children: i });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const i = h.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function nt(e, t = []) {
  let n = [];
  function r(a, i) {
    const s = h.createContext(i), c = n.length;
    n = [...n, i];
    const u = (d) => {
      var v;
      const { scope: p, children: g, ...b } = d, f = ((v = p == null ? void 0 : p[e]) == null ? void 0 : v[c]) || s, _ = h.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ R(f.Provider, { value: _, children: g });
    };
    u.displayName = a + "Provider";
    function l(d, p) {
      var f;
      const g = ((f = p == null ? void 0 : p[e]) == null ? void 0 : f[c]) || s, b = h.useContext(g);
      if (b) return b;
      if (i !== void 0) return i;
      throw new Error(`\`${d}\` must be used within \`${a}\``);
    }
    return [u, l];
  }
  const o = () => {
    const a = n.map((i) => h.createContext(i));
    return function(s) {
      const c = (s == null ? void 0 : s[e]) || a;
      return h.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: c } }),
        [s, c]
      );
    };
  };
  return o.scopeName = e, [r, Gf(o, ...t)];
}
function Gf(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const i = r.reduce((s, { useScope: c, scopeName: u }) => {
        const d = c(a)[`__scope${u}`];
        return { ...s, ...d };
      }, {});
      return h.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Ht(e) {
  const t = e + "CollectionProvider", [n, r] = nt(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (f) => {
    const { scope: _, children: v } = f, w = le.useRef(null), m = le.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ R(o, { scope: _, itemMap: m, collectionRef: w, children: v });
  };
  i.displayName = t;
  const s = e + "CollectionSlot", c = /* @__PURE__ */ it(s), u = le.forwardRef(
    (f, _) => {
      const { scope: v, children: w } = f, m = a(s, v), y = ge(_, m.collectionRef);
      return /* @__PURE__ */ R(c, { ref: y, children: w });
    }
  );
  u.displayName = s;
  const l = e + "CollectionItemSlot", d = "data-radix-collection-item", p = /* @__PURE__ */ it(l), g = le.forwardRef(
    (f, _) => {
      const { scope: v, children: w, ...m } = f, y = le.useRef(null), E = ge(_, y), A = a(l, v);
      return le.useEffect(() => (A.itemMap.set(y, { ref: y, ...m }), () => void A.itemMap.delete(y))), /* @__PURE__ */ R(p, { [d]: "", ref: E, children: w });
    }
  );
  g.displayName = l;
  function b(f) {
    const _ = a(e + "CollectionConsumer", f);
    return le.useCallback(() => {
      const w = _.collectionRef.current;
      if (!w) return [];
      const m = Array.from(w.querySelectorAll(`[${d}]`));
      return Array.from(_.itemMap.values()).sort(
        (A, C) => m.indexOf(A.ref.current) - m.indexOf(C.ref.current)
      );
    }, [_.collectionRef, _.itemMap]);
  }
  return [
    { Provider: i, Slot: u, ItemSlot: g },
    b,
    r
  ];
}
var zf = h.createContext(void 0);
function Un(e) {
  const t = h.useContext(zf);
  return e || t || "ltr";
}
function Ce(e) {
  const t = h.useRef(e);
  return h.useEffect(() => {
    t.current = e;
  }), h.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Vf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ce(e);
  h.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var qf = "DismissableLayer", bo = "dismissableLayer.update", Wf = "dismissableLayer.pointerDownOutside", Xf = "dismissableLayer.focusOutside", Ai, ic = h.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Ut = h.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: i,
      onDismiss: s,
      ...c
    } = e, u = h.useContext(ic), [l, d] = h.useState(null), p = (l == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, g] = h.useState({}), b = ge(t, (C) => d(C)), f = Array.from(u.layers), [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = f.indexOf(_), w = l ? f.indexOf(l) : -1, m = u.layersWithOutsidePointerEventsDisabled.size > 0, y = w >= v, E = Qf((C) => {
      const O = C.target, N = [...u.branches].some((T) => T.contains(O));
      !y || N || (o == null || o(C), i == null || i(C), C.defaultPrevented || s == null || s());
    }, p), A = Zf((C) => {
      const O = C.target;
      [...u.branches].some((T) => T.contains(O)) || (a == null || a(C), i == null || i(C), C.defaultPrevented || s == null || s());
    }, p);
    return Vf((C) => {
      w === u.layers.size - 1 && (r == null || r(C), !C.defaultPrevented && s && (C.preventDefault(), s()));
    }, p), h.useEffect(() => {
      if (l)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Ai = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(l)), u.layers.add(l), Ti(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Ai);
        };
    }, [l, p, n, u]), h.useEffect(() => () => {
      l && (u.layers.delete(l), u.layersWithOutsidePointerEventsDisabled.delete(l), Ti());
    }, [l, u]), h.useEffect(() => {
      const C = () => g({});
      return document.addEventListener(bo, C), () => document.removeEventListener(bo, C);
    }, []), /* @__PURE__ */ R(
      ce.div,
      {
        ...c,
        ref: b,
        style: {
          pointerEvents: m ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: X(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: X(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: X(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Ut.displayName = qf;
var Kf = "DismissableLayerBranch", Yf = h.forwardRef((e, t) => {
  const n = h.useContext(ic), r = h.useRef(null), o = ge(t, r);
  return h.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ R(ce.div, { ...e, ref: o });
});
Yf.displayName = Kf;
function Qf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ce(e), r = h.useRef(!1), o = h.useRef(() => {
  });
  return h.useEffect(() => {
    const a = (s) => {
      if (s.target && !r.current) {
        let c = function() {
          sc(
            Wf,
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
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function Zf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = Ce(e), r = h.useRef(!1);
  return h.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && sc(Xf, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ti() {
  const e = new CustomEvent(bo);
  document.dispatchEvent(e);
}
function sc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Cn(o, a) : o.dispatchEvent(a);
}
var Dr = 0;
function na() {
  h.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Ni()), document.body.insertAdjacentElement("beforeend", e[1] ?? Ni()), Dr++, () => {
      Dr === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Dr--;
    };
  }, []);
}
function Ni() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var kr = "focusScope.autoFocusOnMount", Lr = "focusScope.autoFocusOnUnmount", Ii = { bubbles: !1, cancelable: !0 }, Jf = "FocusScope", Bn = h.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...i
  } = e, [s, c] = h.useState(null), u = Ce(o), l = Ce(a), d = h.useRef(null), p = ge(t, (f) => c(f)), g = h.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  h.useEffect(() => {
    if (r) {
      let f = function(m) {
        if (g.paused || !s) return;
        const y = m.target;
        s.contains(y) ? d.current = y : Qe(d.current, { select: !0 });
      }, _ = function(m) {
        if (g.paused || !s) return;
        const y = m.relatedTarget;
        y !== null && (s.contains(y) || Qe(d.current, { select: !0 }));
      }, v = function(m) {
        if (document.activeElement === document.body)
          for (const E of m)
            E.removedNodes.length > 0 && Qe(s);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", _);
      const w = new MutationObserver(v);
      return s && w.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", _), w.disconnect();
      };
    }
  }, [r, s, g.paused]), h.useEffect(() => {
    if (s) {
      Di.add(g);
      const f = document.activeElement;
      if (!s.contains(f)) {
        const v = new CustomEvent(kr, Ii);
        s.addEventListener(kr, u), s.dispatchEvent(v), v.defaultPrevented || (ep(ap(cc(s)), { select: !0 }), document.activeElement === f && Qe(s));
      }
      return () => {
        s.removeEventListener(kr, u), setTimeout(() => {
          const v = new CustomEvent(Lr, Ii);
          s.addEventListener(Lr, l), s.dispatchEvent(v), v.defaultPrevented || Qe(f ?? document.body, { select: !0 }), s.removeEventListener(Lr, l), Di.remove(g);
        }, 0);
      };
    }
  }, [s, u, l, g]);
  const b = h.useCallback(
    (f) => {
      if (!n && !r || g.paused) return;
      const _ = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = document.activeElement;
      if (_ && v) {
        const w = f.currentTarget, [m, y] = tp(w);
        m && y ? !f.shiftKey && v === y ? (f.preventDefault(), n && Qe(m, { select: !0 })) : f.shiftKey && v === m && (f.preventDefault(), n && Qe(y, { select: !0 })) : v === w && f.preventDefault();
      }
    },
    [n, r, g.paused]
  );
  return /* @__PURE__ */ R(ce.div, { tabIndex: -1, ...i, ref: p, onKeyDown: b });
});
Bn.displayName = Jf;
function ep(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Qe(r, { select: t }), document.activeElement !== n) return;
}
function tp(e) {
  const t = cc(e), n = Mi(t, e), r = Mi(t.reverse(), e);
  return [n, r];
}
function cc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Mi(e, t) {
  for (const n of e)
    if (!np(n, { upTo: t })) return n;
}
function np(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function rp(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Qe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && rp(e) && t && e.select();
  }
}
var Di = op();
function op() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = ki(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = ki(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function ki(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ap(e) {
  return e.filter((t) => t.tagName !== "A");
}
var xe = globalThis != null && globalThis.document ? h.useLayoutEffect : () => {
}, ip = h[" useId ".trim().toString()] || (() => {
}), sp = 0;
function je(e) {
  const [t, n] = h.useState(ip());
  return xe(() => {
    n((r) => r ?? String(sp++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
const cp = ["top", "right", "bottom", "left"], Je = Math.min, Ne = Math.max, Pn = Math.round, sn = Math.floor, Be = (e) => ({
  x: e,
  y: e
}), up = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, lp = {
  start: "end",
  end: "start"
};
function yo(e, t, n) {
  return Ne(e, Je(t, n));
}
function qe(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function We(e) {
  return e.split("-")[0];
}
function Pt(e) {
  return e.split("-")[1];
}
function ra(e) {
  return e === "x" ? "y" : "x";
}
function oa(e) {
  return e === "y" ? "height" : "width";
}
function et(e) {
  return ["top", "bottom"].includes(We(e)) ? "y" : "x";
}
function aa(e) {
  return ra(et(e));
}
function dp(e, t, n) {
  n === void 0 && (n = !1);
  const r = Pt(e), o = aa(e), a = oa(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = On(i)), [i, On(i)];
}
function fp(e) {
  const t = On(e);
  return [Eo(e), t, Eo(t)];
}
function Eo(e) {
  return e.replace(/start|end/g, (t) => lp[t]);
}
function pp(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], a = ["top", "bottom"], i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? a : i;
    default:
      return [];
  }
}
function mp(e, t, n, r) {
  const o = Pt(e);
  let a = pp(We(e), n === "start", r);
  return o && (a = a.map((i) => i + "-" + o), t && (a = a.concat(a.map(Eo)))), a;
}
function On(e) {
  return e.replace(/left|right|bottom|top/g, (t) => up[t]);
}
function hp(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function uc(e) {
  return typeof e != "number" ? hp(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function An(e) {
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
function Li(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = et(t), i = aa(t), s = oa(i), c = We(t), u = a === "y", l = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, p = r[s] / 2 - o[s] / 2;
  let g;
  switch (c) {
    case "top":
      g = {
        x: l,
        y: r.y - o.height
      };
      break;
    case "bottom":
      g = {
        x: l,
        y: r.y + r.height
      };
      break;
    case "right":
      g = {
        x: r.x + r.width,
        y: d
      };
      break;
    case "left":
      g = {
        x: r.x - o.width,
        y: d
      };
      break;
    default:
      g = {
        x: r.x,
        y: r.y
      };
  }
  switch (Pt(t)) {
    case "start":
      g[i] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      g[i] += p * (n && u ? -1 : 1);
      break;
  }
  return g;
}
const gp = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: i
  } = n, s = a.filter(Boolean), c = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let u = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: l,
    y: d
  } = Li(u, r, c), p = r, g = {}, b = 0;
  for (let f = 0; f < s.length; f++) {
    const {
      name: _,
      fn: v
    } = s[f], {
      x: w,
      y: m,
      data: y,
      reset: E
    } = await v({
      x: l,
      y: d,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: g,
      rects: u,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = w ?? l, d = m ?? d, g = {
      ...g,
      [_]: {
        ...g[_],
        ...y
      }
    }, E && b <= 50 && (b++, typeof E == "object" && (E.placement && (p = E.placement), E.rects && (u = E.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : E.rects), {
      x: l,
      y: d
    } = Li(u, p, c)), f = -1);
  }
  return {
    x: l,
    y: d,
    placement: p,
    strategy: o,
    middlewareData: g
  };
};
async function Dt(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: i,
    elements: s,
    strategy: c
  } = e, {
    boundary: u = "clippingAncestors",
    rootBoundary: l = "viewport",
    elementContext: d = "floating",
    altBoundary: p = !1,
    padding: g = 0
  } = qe(t, e), b = uc(g), _ = s[p ? d === "floating" ? "reference" : "floating" : d], v = An(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(_))) == null || n ? _ : _.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: l,
    strategy: c
  })), w = d === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, m = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), y = await (a.isElement == null ? void 0 : a.isElement(m)) ? await (a.getScale == null ? void 0 : a.getScale(m)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = An(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: m,
    strategy: c
  }) : w);
  return {
    top: (v.top - E.top + b.top) / y.y,
    bottom: (E.bottom - v.bottom + b.bottom) / y.y,
    left: (v.left - E.left + b.left) / y.x,
    right: (E.right - v.right + b.right) / y.x
  };
}
const vp = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: i,
      elements: s,
      middlewareData: c
    } = t, {
      element: u,
      padding: l = 0
    } = qe(e, t) || {};
    if (u == null)
      return {};
    const d = uc(l), p = {
      x: n,
      y: r
    }, g = aa(o), b = oa(g), f = await i.getDimensions(u), _ = g === "y", v = _ ? "top" : "left", w = _ ? "bottom" : "right", m = _ ? "clientHeight" : "clientWidth", y = a.reference[b] + a.reference[g] - p[g] - a.floating[b], E = p[g] - a.reference[g], A = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
    let C = A ? A[m] : 0;
    (!C || !await (i.isElement == null ? void 0 : i.isElement(A))) && (C = s.floating[m] || a.floating[b]);
    const O = y / 2 - E / 2, N = C / 2 - f[b] / 2 - 1, T = Je(d[v], N), M = Je(d[w], N), k = T, B = C - f[b] - M, j = C / 2 - f[b] / 2 + O, G = yo(k, j, B), F = !c.arrow && Pt(o) != null && j !== G && a.reference[b] / 2 - (j < k ? T : M) - f[b] / 2 < 0, Z = F ? j < k ? j - k : j - B : 0;
    return {
      [g]: p[g] + Z,
      data: {
        [g]: G,
        centerOffset: j - G - Z,
        ...F && {
          alignmentOffset: Z
        }
      },
      reset: F
    };
  }
}), _p = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: i,
        initialPlacement: s,
        platform: c,
        elements: u
      } = t, {
        mainAxis: l = !0,
        crossAxis: d = !0,
        fallbackPlacements: p,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: f = !0,
        ..._
      } = qe(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const v = We(o), w = et(s), m = We(s) === s, y = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = p || (m || !f ? [On(s)] : fp(s)), A = b !== "none";
      !p && A && E.push(...mp(s, f, b, y));
      const C = [s, ...E], O = await Dt(t, _), N = [];
      let T = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (l && N.push(O[v]), d) {
        const j = dp(o, i, y);
        N.push(O[j[0]], O[j[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: N
      }], !N.every((j) => j <= 0)) {
        var M, k;
        const j = (((M = a.flip) == null ? void 0 : M.index) || 0) + 1, G = C[j];
        if (G)
          return {
            data: {
              index: j,
              overflows: T
            },
            reset: {
              placement: G
            }
          };
        let F = (k = T.filter((Z) => Z.overflows[0] <= 0).sort((Z, I) => Z.overflows[1] - I.overflows[1])[0]) == null ? void 0 : k.placement;
        if (!F)
          switch (g) {
            case "bestFit": {
              var B;
              const Z = (B = T.filter((I) => {
                if (A) {
                  const D = et(I.placement);
                  return D === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((D) => D > 0).reduce((D, K) => D + K, 0)]).sort((I, D) => I[1] - D[1])[0]) == null ? void 0 : B[0];
              Z && (F = Z);
              break;
            }
            case "initialPlacement":
              F = s;
              break;
          }
        if (o !== F)
          return {
            reset: {
              placement: F
            }
          };
      }
      return {};
    }
  };
};
function ji(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Fi(e) {
  return cp.some((t) => e[t] >= 0);
}
const bp = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = qe(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await Dt(t, {
            ...o,
            elementContext: "reference"
          }), i = ji(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: Fi(i)
            }
          };
        }
        case "escaped": {
          const a = await Dt(t, {
            ...o,
            altBoundary: !0
          }), i = ji(a, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: Fi(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function yp(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = We(n), s = Pt(n), c = et(n) === "y", u = ["left", "top"].includes(i) ? -1 : 1, l = a && c ? -1 : 1, d = qe(t, e);
  let {
    mainAxis: p,
    crossAxis: g,
    alignmentAxis: b
  } = typeof d == "number" ? {
    mainAxis: d,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: d.mainAxis || 0,
    crossAxis: d.crossAxis || 0,
    alignmentAxis: d.alignmentAxis
  };
  return s && typeof b == "number" && (g = s === "end" ? b * -1 : b), c ? {
    x: g * l,
    y: p * u
  } : {
    x: p * u,
    y: g * l
  };
}
const Ep = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: i,
        middlewareData: s
      } = t, c = await yp(t, e);
      return i === ((n = s.offset) == null ? void 0 : n.placement) && (r = s.arrow) != null && r.alignmentOffset ? {} : {
        x: o + c.x,
        y: a + c.y,
        data: {
          ...c,
          placement: i
        }
      };
    }
  };
}, Rp = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (_) => {
            let {
              x: v,
              y: w
            } = _;
            return {
              x: v,
              y: w
            };
          }
        },
        ...c
      } = qe(e, t), u = {
        x: n,
        y: r
      }, l = await Dt(t, c), d = et(We(o)), p = ra(d);
      let g = u[p], b = u[d];
      if (a) {
        const _ = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", w = g + l[_], m = g - l[v];
        g = yo(w, g, m);
      }
      if (i) {
        const _ = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", w = b + l[_], m = b - l[v];
        b = yo(w, b, m);
      }
      const f = s.fn({
        ...t,
        [p]: g,
        [d]: b
      });
      return {
        ...f,
        data: {
          x: f.x - n,
          y: f.y - r,
          enabled: {
            [p]: a,
            [d]: i
          }
        }
      };
    }
  };
}, wp = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: i
      } = t, {
        offset: s = 0,
        mainAxis: c = !0,
        crossAxis: u = !0
      } = qe(e, t), l = {
        x: n,
        y: r
      }, d = et(o), p = ra(d);
      let g = l[p], b = l[d];
      const f = qe(s, t), _ = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...f
      };
      if (c) {
        const m = p === "y" ? "height" : "width", y = a.reference[p] - a.floating[m] + _.mainAxis, E = a.reference[p] + a.reference[m] - _.mainAxis;
        g < y ? g = y : g > E && (g = E);
      }
      if (u) {
        var v, w;
        const m = p === "y" ? "width" : "height", y = ["top", "left"].includes(We(o)), E = a.reference[d] - a.floating[m] + (y && ((v = i.offset) == null ? void 0 : v[d]) || 0) + (y ? 0 : _.crossAxis), A = a.reference[d] + a.reference[m] + (y ? 0 : ((w = i.offset) == null ? void 0 : w[d]) || 0) - (y ? _.crossAxis : 0);
        b < E ? b = E : b > A && (b = A);
      }
      return {
        [p]: g,
        [d]: b
      };
    }
  };
}, Sp = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: a,
        platform: i,
        elements: s
      } = t, {
        apply: c = () => {
        },
        ...u
      } = qe(e, t), l = await Dt(t, u), d = We(o), p = Pt(o), g = et(o) === "y", {
        width: b,
        height: f
      } = a.floating;
      let _, v;
      d === "top" || d === "bottom" ? (_ = d, v = p === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (v = d, _ = p === "end" ? "top" : "bottom");
      const w = f - l.top - l.bottom, m = b - l.left - l.right, y = Je(f - l[_], w), E = Je(b - l[v], m), A = !t.middlewareData.shift;
      let C = y, O = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (O = m), (r = t.middlewareData.shift) != null && r.enabled.y && (C = w), A && !p) {
        const T = Ne(l.left, 0), M = Ne(l.right, 0), k = Ne(l.top, 0), B = Ne(l.bottom, 0);
        g ? O = b - 2 * (T !== 0 || M !== 0 ? T + M : Ne(l.left, l.right)) : C = f - 2 * (k !== 0 || B !== 0 ? k + B : Ne(l.top, l.bottom));
      }
      await c({
        ...t,
        availableWidth: O,
        availableHeight: C
      });
      const N = await i.getDimensions(s.floating);
      return b !== N.width || f !== N.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Gn() {
  return typeof window < "u";
}
function Ot(e) {
  return lc(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ie(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function ze(e) {
  var t;
  return (t = (lc(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function lc(e) {
  return Gn() ? e instanceof Node || e instanceof Ie(e).Node : !1;
}
function Fe(e) {
  return Gn() ? e instanceof Element || e instanceof Ie(e).Element : !1;
}
function Ge(e) {
  return Gn() ? e instanceof HTMLElement || e instanceof Ie(e).HTMLElement : !1;
}
function $i(e) {
  return !Gn() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ie(e).ShadowRoot;
}
function Bt(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = $e(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function xp(e) {
  return ["table", "td", "th"].includes(Ot(e));
}
function zn(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function ia(e) {
  const t = sa(), n = Fe(e) ? $e(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function Cp(e) {
  let t = tt(e);
  for (; Ge(t) && !Rt(t); ) {
    if (ia(t))
      return t;
    if (zn(t))
      return null;
    t = tt(t);
  }
  return null;
}
function sa() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function Rt(e) {
  return ["html", "body", "#document"].includes(Ot(e));
}
function $e(e) {
  return Ie(e).getComputedStyle(e);
}
function Vn(e) {
  return Fe(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function tt(e) {
  if (Ot(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    $i(e) && e.host || // Fallback.
    ze(e)
  );
  return $i(t) ? t.host : t;
}
function dc(e) {
  const t = tt(e);
  return Rt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ge(t) && Bt(t) ? t : dc(t);
}
function kt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = dc(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = Ie(o);
  if (a) {
    const s = Ro(i);
    return t.concat(i, i.visualViewport || [], Bt(o) ? o : [], s && n ? kt(s) : []);
  }
  return t.concat(o, kt(o, [], n));
}
function Ro(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function fc(e) {
  const t = $e(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Ge(e), a = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, s = Pn(n) !== a || Pn(r) !== i;
  return s && (n = a, r = i), {
    width: n,
    height: r,
    $: s
  };
}
function ca(e) {
  return Fe(e) ? e : e.contextElement;
}
function yt(e) {
  const t = ca(e);
  if (!Ge(t))
    return Be(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = fc(t);
  let i = (a ? Pn(n.width) : n.width) / r, s = (a ? Pn(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: i,
    y: s
  };
}
const Pp = /* @__PURE__ */ Be(0);
function pc(e) {
  const t = Ie(e);
  return !sa() || !t.visualViewport ? Pp : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Op(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ie(e) ? !1 : t;
}
function st(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = ca(e);
  let i = Be(1);
  t && (r ? Fe(r) && (i = yt(r)) : i = yt(e));
  const s = Op(a, n, r) ? pc(a) : Be(0);
  let c = (o.left + s.x) / i.x, u = (o.top + s.y) / i.y, l = o.width / i.x, d = o.height / i.y;
  if (a) {
    const p = Ie(a), g = r && Fe(r) ? Ie(r) : r;
    let b = p, f = Ro(b);
    for (; f && r && g !== b; ) {
      const _ = yt(f), v = f.getBoundingClientRect(), w = $e(f), m = v.left + (f.clientLeft + parseFloat(w.paddingLeft)) * _.x, y = v.top + (f.clientTop + parseFloat(w.paddingTop)) * _.y;
      c *= _.x, u *= _.y, l *= _.x, d *= _.y, c += m, u += y, b = Ie(f), f = Ro(b);
    }
  }
  return An({
    width: l,
    height: d,
    x: c,
    y: u
  });
}
function ua(e, t) {
  const n = Vn(e).scrollLeft;
  return t ? t.left + n : st(ze(e)).left + n;
}
function mc(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    ua(e, r)
  )), a = r.top + t.scrollTop;
  return {
    x: o,
    y: a
  };
}
function Ap(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", i = ze(r), s = t ? zn(t.floating) : !1;
  if (r === i || s && a)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = Be(1);
  const l = Be(0), d = Ge(r);
  if ((d || !d && !a) && ((Ot(r) !== "body" || Bt(i)) && (c = Vn(r)), Ge(r))) {
    const g = st(r);
    u = yt(r), l.x = g.x + r.clientLeft, l.y = g.y + r.clientTop;
  }
  const p = i && !d && !a ? mc(i, c, !0) : Be(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + l.x + p.x,
    y: n.y * u.y - c.scrollTop * u.y + l.y + p.y
  };
}
function Tp(e) {
  return Array.from(e.getClientRects());
}
function Np(e) {
  const t = ze(e), n = Vn(e), r = e.ownerDocument.body, o = Ne(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = Ne(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + ua(e);
  const s = -n.scrollTop;
  return $e(r).direction === "rtl" && (i += Ne(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: i,
    y: s
  };
}
function Ip(e, t) {
  const n = Ie(e), r = ze(e), o = n.visualViewport;
  let a = r.clientWidth, i = r.clientHeight, s = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    const u = sa();
    (!u || u && t === "fixed") && (s = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s,
    y: c
  };
}
function Mp(e, t) {
  const n = st(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = Ge(e) ? yt(e) : Be(1), i = e.clientWidth * a.x, s = e.clientHeight * a.y, c = o * a.x, u = r * a.y;
  return {
    width: i,
    height: s,
    x: c,
    y: u
  };
}
function Hi(e, t, n) {
  let r;
  if (t === "viewport")
    r = Ip(e, n);
  else if (t === "document")
    r = Np(ze(e));
  else if (Fe(t))
    r = Mp(t, n);
  else {
    const o = pc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return An(r);
}
function hc(e, t) {
  const n = tt(e);
  return n === t || !Fe(n) || Rt(n) ? !1 : $e(n).position === "fixed" || hc(n, t);
}
function Dp(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = kt(e, [], !1).filter((s) => Fe(s) && Ot(s) !== "body"), o = null;
  const a = $e(e).position === "fixed";
  let i = a ? tt(e) : e;
  for (; Fe(i) && !Rt(i); ) {
    const s = $e(i), c = ia(i);
    !c && s.position === "fixed" && (o = null), (a ? !c && !o : !c && s.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Bt(i) && !c && hc(e, i)) ? r = r.filter((l) => l !== i) : o = s, i = tt(i);
  }
  return t.set(e, r), r;
}
function kp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? zn(t) ? [] : Dp(t, this._c) : [].concat(n), r], s = i[0], c = i.reduce((u, l) => {
    const d = Hi(t, l, o);
    return u.top = Ne(d.top, u.top), u.right = Je(d.right, u.right), u.bottom = Je(d.bottom, u.bottom), u.left = Ne(d.left, u.left), u;
  }, Hi(t, s, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function Lp(e) {
  const {
    width: t,
    height: n
  } = fc(e);
  return {
    width: t,
    height: n
  };
}
function jp(e, t, n) {
  const r = Ge(t), o = ze(t), a = n === "fixed", i = st(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = Be(0);
  if (r || !r && !a)
    if ((Ot(t) !== "body" || Bt(o)) && (s = Vn(t)), r) {
      const p = st(t, !0, a, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && (c.x = ua(o));
  const u = o && !r && !a ? mc(o, s) : Be(0), l = i.left + s.scrollLeft - c.x - u.x, d = i.top + s.scrollTop - c.y - u.y;
  return {
    x: l,
    y: d,
    width: i.width,
    height: i.height
  };
}
function jr(e) {
  return $e(e).position === "static";
}
function Ui(e, t) {
  if (!Ge(e) || $e(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return ze(e) === n && (n = n.ownerDocument.body), n;
}
function gc(e, t) {
  const n = Ie(e);
  if (zn(e))
    return n;
  if (!Ge(e)) {
    let o = tt(e);
    for (; o && !Rt(o); ) {
      if (Fe(o) && !jr(o))
        return o;
      o = tt(o);
    }
    return n;
  }
  let r = Ui(e, t);
  for (; r && xp(r) && jr(r); )
    r = Ui(r, t);
  return r && Rt(r) && jr(r) && !ia(r) ? n : r || Cp(e) || n;
}
const Fp = async function(e) {
  const t = this.getOffsetParent || gc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: jp(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function $p(e) {
  return $e(e).direction === "rtl";
}
const Hp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ap,
  getDocumentElement: ze,
  getClippingRect: kp,
  getOffsetParent: gc,
  getElementRects: Fp,
  getClientRects: Tp,
  getDimensions: Lp,
  getScale: yt,
  isElement: Fe,
  isRTL: $p
};
function vc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Up(e, t) {
  let n = null, r;
  const o = ze(e);
  function a() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), n = null;
  }
  function i(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), a();
    const u = e.getBoundingClientRect(), {
      left: l,
      top: d,
      width: p,
      height: g
    } = u;
    if (s || t(), !p || !g)
      return;
    const b = sn(d), f = sn(o.clientWidth - (l + p)), _ = sn(o.clientHeight - (d + g)), v = sn(l), m = {
      rootMargin: -b + "px " + -f + "px " + -_ + "px " + -v + "px",
      threshold: Ne(0, Je(1, c)) || 1
    };
    let y = !0;
    function E(A) {
      const C = A[0].intersectionRatio;
      if (C !== c) {
        if (!y)
          return i();
        C ? i(!1, C) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      C === 1 && !vc(u, e.getBoundingClientRect()) && i(), y = !1;
    }
    try {
      n = new IntersectionObserver(E, {
        ...m,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(E, m);
    }
    n.observe(e);
  }
  return i(!0), a;
}
function Bp(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = ca(e), l = o || a ? [...u ? kt(u) : [], ...kt(t)] : [];
  l.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), a && v.addEventListener("resize", n);
  });
  const d = u && s ? Up(u, n) : null;
  let p = -1, g = null;
  i && (g = new ResizeObserver((v) => {
    let [w] = v;
    w && w.target === u && g && (g.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var m;
      (m = g) == null || m.observe(t);
    })), n();
  }), u && !c && g.observe(u), g.observe(t));
  let b, f = c ? st(e) : null;
  c && _();
  function _() {
    const v = st(e);
    f && !vc(f, v) && n(), f = v, b = requestAnimationFrame(_);
  }
  return n(), () => {
    var v;
    l.forEach((w) => {
      o && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), d == null || d(), (v = g) == null || v.disconnect(), g = null, c && cancelAnimationFrame(b);
  };
}
const Gp = Ep, zp = Rp, Vp = _p, qp = Sp, Wp = bp, Bi = vp, Xp = wp, Kp = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Hp,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return gp(e, t, {
    ...o,
    platform: a
  });
};
var Rn = typeof document < "u" ? Jl : Is;
function Tn(e, t) {
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
        if (!Tn(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (!(a === "_owner" && e.$$typeof) && !Tn(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function _c(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Gi(e, t) {
  const n = _c(e);
  return Math.round(t * n) / n;
}
function Fr(e) {
  const t = h.useRef(e);
  return Rn(() => {
    t.current = e;
  }), t;
}
function Yp(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: a,
      floating: i
    } = {},
    transform: s = !0,
    whileElementsMounted: c,
    open: u
  } = e, [l, d] = h.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, g] = h.useState(r);
  Tn(p, r) || g(r);
  const [b, f] = h.useState(null), [_, v] = h.useState(null), w = h.useCallback((I) => {
    I !== A.current && (A.current = I, f(I));
  }, []), m = h.useCallback((I) => {
    I !== C.current && (C.current = I, v(I));
  }, []), y = a || b, E = i || _, A = h.useRef(null), C = h.useRef(null), O = h.useRef(l), N = c != null, T = Fr(c), M = Fr(o), k = Fr(u), B = h.useCallback(() => {
    if (!A.current || !C.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: p
    };
    M.current && (I.platform = M.current), Kp(A.current, C.current, I).then((D) => {
      const K = {
        ...D,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: k.current !== !1
      };
      j.current && !Tn(O.current, K) && (O.current = K, jn.flushSync(() => {
        d(K);
      }));
    });
  }, [p, t, n, M, k]);
  Rn(() => {
    u === !1 && O.current.isPositioned && (O.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [u]);
  const j = h.useRef(!1);
  Rn(() => (j.current = !0, () => {
    j.current = !1;
  }), []), Rn(() => {
    if (y && (A.current = y), E && (C.current = E), y && E) {
      if (T.current)
        return T.current(y, E, B);
      B();
    }
  }, [y, E, B, T, N]);
  const G = h.useMemo(() => ({
    reference: A,
    floating: C,
    setReference: w,
    setFloating: m
  }), [w, m]), F = h.useMemo(() => ({
    reference: y,
    floating: E
  }), [y, E]), Z = h.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return I;
    const D = Gi(F.floating, l.x), K = Gi(F.floating, l.y);
    return s ? {
      ...I,
      transform: "translate(" + D + "px, " + K + "px)",
      ..._c(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: D,
      top: K
    };
  }, [n, s, F.floating, l.x, l.y]);
  return h.useMemo(() => ({
    ...l,
    update: B,
    refs: G,
    elements: F,
    floatingStyles: Z
  }), [l, B, G, F, Z]);
}
const Qp = (e) => {
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
      return r && t(r) ? r.current != null ? Bi({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Bi({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Zp = (e, t) => ({
  ...Gp(e),
  options: [e, t]
}), Jp = (e, t) => ({
  ...zp(e),
  options: [e, t]
}), em = (e, t) => ({
  ...Xp(e),
  options: [e, t]
}), tm = (e, t) => ({
  ...Vp(e),
  options: [e, t]
}), nm = (e, t) => ({
  ...qp(e),
  options: [e, t]
}), rm = (e, t) => ({
  ...Wp(e),
  options: [e, t]
}), om = (e, t) => ({
  ...Qp(e),
  options: [e, t]
});
var am = "Arrow", bc = h.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ R(
    ce.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ R("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
bc.displayName = am;
var im = bc;
function sm(e) {
  const [t, n] = h.useState(void 0);
  return xe(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let i, s;
        if ("borderBoxSize" in a) {
          const c = a.borderBoxSize, u = Array.isArray(c) ? c[0] : c;
          i = u.inlineSize, s = u.blockSize;
        } else
          i = e.offsetWidth, s = e.offsetHeight;
        n({ width: i, height: s });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var la = "Popper", [yc, qn] = nt(la), [cm, Ec] = yc(la), Rc = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = h.useState(null);
  return /* @__PURE__ */ R(cm, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Rc.displayName = la;
var wc = "PopperAnchor", Sc = h.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = Ec(wc, n), i = h.useRef(null), s = ge(t, i);
    return h.useEffect(() => {
      a.onAnchorChange((r == null ? void 0 : r.current) || i.current);
    }), r ? null : /* @__PURE__ */ R(ce.div, { ...o, ref: s });
  }
);
Sc.displayName = wc;
var da = "PopperContent", [um, lm] = yc(da), xc = h.forwardRef(
  (e, t) => {
    var P, te, z, Y, S, x;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: i = 0,
      arrowPadding: s = 0,
      avoidCollisions: c = !0,
      collisionBoundary: u = [],
      collisionPadding: l = 0,
      sticky: d = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: g = "optimized",
      onPlaced: b,
      ...f
    } = e, _ = Ec(da, n), [v, w] = h.useState(null), m = ge(t, (H) => w(H)), [y, E] = h.useState(null), A = sm(y), C = (A == null ? void 0 : A.width) ?? 0, O = (A == null ? void 0 : A.height) ?? 0, N = r + (a !== "center" ? "-" + a : ""), T = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, M = Array.isArray(u) ? u : [u], k = M.length > 0, B = {
      padding: T,
      boundary: M.filter(fm),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: k
    }, { refs: j, floatingStyles: G, placement: F, isPositioned: Z, middlewareData: I } = Yp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: N,
      whileElementsMounted: (...H) => Bp(...H, {
        animationFrame: g === "always"
      }),
      elements: {
        reference: _.anchor
      },
      middleware: [
        Zp({ mainAxis: o + O, alignmentAxis: i }),
        c && Jp({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? em() : void 0,
          ...B
        }),
        c && tm({ ...B }),
        nm({
          ...B,
          apply: ({ elements: H, rects: $, availableWidth: U, availableHeight: W }) => {
            const { width: me, height: ve } = $.reference, pe = H.floating.style;
            pe.setProperty("--radix-popper-available-width", `${U}px`), pe.setProperty("--radix-popper-available-height", `${W}px`), pe.setProperty("--radix-popper-anchor-width", `${me}px`), pe.setProperty("--radix-popper-anchor-height", `${ve}px`);
          }
        }),
        y && om({ element: y, padding: s }),
        pm({ arrowWidth: C, arrowHeight: O }),
        p && rm({ strategy: "referenceHidden", ...B })
      ]
    }), [D, K] = Oc(F), se = Ce(b);
    xe(() => {
      Z && (se == null || se());
    }, [Z, se]);
    const re = (P = I.arrow) == null ? void 0 : P.x, ne = (te = I.arrow) == null ? void 0 : te.y, Q = ((z = I.arrow) == null ? void 0 : z.centerOffset) !== 0, [fe, ae] = h.useState();
    return xe(() => {
      v && ae(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ R(
      "div",
      {
        ref: j.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...G,
          transform: Z ? G.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: fe,
          "--radix-popper-transform-origin": [
            (Y = I.transformOrigin) == null ? void 0 : Y.x,
            (S = I.transformOrigin) == null ? void 0 : S.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((x = I.hide) == null ? void 0 : x.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ R(
          um,
          {
            scope: n,
            placedSide: D,
            onArrowChange: E,
            arrowX: re,
            arrowY: ne,
            shouldHideArrow: Q,
            children: /* @__PURE__ */ R(
              ce.div,
              {
                "data-side": D,
                "data-align": K,
                ...f,
                ref: m,
                style: {
                  ...f.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: Z ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
xc.displayName = da;
var Cc = "PopperArrow", dm = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Pc = h.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = lm(Cc, r), i = dm[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ R(
      "span",
      {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ R(
          im,
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
Pc.displayName = Cc;
function fm(e) {
  return e !== null;
}
var pm = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var _, v, w;
    const { placement: n, rects: r, middlewareData: o } = t, i = ((_ = o.arrow) == null ? void 0 : _.centerOffset) !== 0, s = i ? 0 : e.arrowWidth, c = i ? 0 : e.arrowHeight, [u, l] = Oc(n), d = { start: "0%", center: "50%", end: "100%" }[l], p = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + s / 2, g = (((w = o.arrow) == null ? void 0 : w.y) ?? 0) + c / 2;
    let b = "", f = "";
    return u === "bottom" ? (b = i ? d : `${p}px`, f = `${-c}px`) : u === "top" ? (b = i ? d : `${p}px`, f = `${r.floating.height + c}px`) : u === "right" ? (b = `${-c}px`, f = i ? d : `${g}px`) : u === "left" && (b = `${r.floating.width + c}px`, f = i ? d : `${g}px`), { data: { x: b, y: f } };
  }
});
function Oc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ac = Rc, Tc = Sc, Nc = xc, Ic = Pc, mm = "Portal", Wn = h.forwardRef((e, t) => {
  var s;
  const { container: n, ...r } = e, [o, a] = h.useState(!1);
  xe(() => a(!0), []);
  const i = n || o && ((s = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : s.body);
  return i ? Qo.createPortal(/* @__PURE__ */ R(ce.div, { ...r, ref: t }), i) : null;
});
Wn.displayName = mm;
var hm = h[" useInsertionEffect ".trim().toString()] || xe;
function ct({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, a, i] = gm({
    defaultProp: t,
    onChange: n
  }), s = e !== void 0, c = s ? e : o;
  {
    const l = h.useRef(e !== void 0);
    h.useEffect(() => {
      const d = l.current;
      d !== s && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = s;
    }, [s, r]);
  }
  const u = h.useCallback(
    (l) => {
      var d;
      if (s) {
        const p = vm(l) ? l(e) : l;
        p !== e && ((d = i.current) == null || d.call(i, p));
      } else
        a(l);
    },
    [s, e, a, i]
  );
  return [c, u];
}
function gm({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = h.useState(e), o = h.useRef(n), a = h.useRef(t);
  return hm(() => {
    a.current = t;
  }, [t]), h.useEffect(() => {
    var i;
    o.current !== n && ((i = a.current) == null || i.call(a, n), o.current = n);
  }, [n, o]), [n, r, a];
}
function vm(e) {
  return typeof e == "function";
}
function Mc(e) {
  const t = h.useRef({ value: e, previous: e });
  return h.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Dc = Object.freeze({
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
}), _m = "VisuallyHidden", kc = h.forwardRef(
  (e, t) => /* @__PURE__ */ R(
    ce.span,
    {
      ...e,
      ref: t,
      style: { ...Dc, ...e.style }
    }
  )
);
kc.displayName = _m;
var bm = kc, ym = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, vt = /* @__PURE__ */ new WeakMap(), cn = /* @__PURE__ */ new WeakMap(), un = {}, $r = 0, Lc = function(e) {
  return e && (e.host || Lc(e.parentNode));
}, Em = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Lc(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Rm = function(e, t, n, r) {
  var o = Em(t, Array.isArray(e) ? e : [e]);
  un[n] || (un[n] = /* @__PURE__ */ new WeakMap());
  var a = un[n], i = [], s = /* @__PURE__ */ new Set(), c = new Set(o), u = function(d) {
    !d || s.has(d) || (s.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var l = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (s.has(p))
        l(p);
      else
        try {
          var g = p.getAttribute(r), b = g !== null && g !== "false", f = (vt.get(p) || 0) + 1, _ = (a.get(p) || 0) + 1;
          vt.set(p, f), a.set(p, _), i.push(p), f === 1 && b && cn.set(p, !0), _ === 1 && p.setAttribute(n, "true"), b || p.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", p, v);
        }
    });
  };
  return l(t), s.clear(), $r++, function() {
    i.forEach(function(d) {
      var p = vt.get(d) - 1, g = a.get(d) - 1;
      vt.set(d, p), a.set(d, g), p || (cn.has(d) || d.removeAttribute(r), cn.delete(d)), g || d.removeAttribute(n);
    }), $r--, $r || (vt = /* @__PURE__ */ new WeakMap(), vt = /* @__PURE__ */ new WeakMap(), cn = /* @__PURE__ */ new WeakMap(), un = {});
  };
}, fa = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = ym(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Rm(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, Ue = function() {
  return Ue = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, Ue.apply(this, arguments);
};
function jc(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function wm(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var wn = "right-scroll-bar-position", Sn = "width-before-scroll-bar", Sm = "with-scroll-bars-hidden", xm = "--removed-body-scroll-bar-size";
function Hr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Cm(e, t) {
  var n = Yo(function() {
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
var Pm = typeof window < "u" ? h.useLayoutEffect : h.useEffect, zi = /* @__PURE__ */ new WeakMap();
function Om(e, t) {
  var n = Cm(null, function(r) {
    return e.forEach(function(o) {
      return Hr(o, r);
    });
  });
  return Pm(function() {
    var r = zi.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), i = n.current;
      o.forEach(function(s) {
        a.has(s) || Hr(s, null);
      }), a.forEach(function(s) {
        o.has(s) || Hr(s, i);
      });
    }
    zi.set(n, e);
  }, [e]), n;
}
function Am(e) {
  return e;
}
function Tm(e, t) {
  t === void 0 && (t = Am);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var i = t(a, r);
      return n.push(i), function() {
        n = n.filter(function(s) {
          return s !== i;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var i = n;
        n = [], i.forEach(a);
      }
      n = {
        push: function(s) {
          return a(s);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var i = [];
      if (n.length) {
        var s = n;
        n = [], s.forEach(a), i = n;
      }
      var c = function() {
        var l = i;
        i = [], l.forEach(a);
      }, u = function() {
        return Promise.resolve().then(c);
      };
      u(), n = {
        push: function(l) {
          i.push(l), u();
        },
        filter: function(l) {
          return i = i.filter(l), n;
        }
      };
    }
  };
  return o;
}
function Nm(e) {
  e === void 0 && (e = {});
  var t = Tm(null);
  return t.options = Ue({ async: !0, ssr: !1 }, e), t;
}
var Fc = function(e) {
  var t = e.sideCar, n = jc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return h.createElement(r, Ue({}, n));
};
Fc.isSideCarExport = !0;
function Im(e, t) {
  return e.useMedium(t), Fc;
}
var $c = Nm(), Ur = function() {
}, Xn = h.forwardRef(function(e, t) {
  var n = h.useRef(null), r = h.useState({
    onScrollCapture: Ur,
    onWheelCapture: Ur,
    onTouchMoveCapture: Ur
  }), o = r[0], a = r[1], i = e.forwardProps, s = e.children, c = e.className, u = e.removeScrollBar, l = e.enabled, d = e.shards, p = e.sideCar, g = e.noIsolation, b = e.inert, f = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, w = e.gapMode, m = jc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), y = p, E = Om([n, t]), A = Ue(Ue({}, m), o);
  return h.createElement(
    h.Fragment,
    null,
    l && h.createElement(y, { sideCar: $c, removeScrollBar: u, shards: d, noIsolation: g, inert: b, setCallbacks: a, allowPinchZoom: !!f, lockRef: n, gapMode: w }),
    i ? h.cloneElement(h.Children.only(s), Ue(Ue({}, A), { ref: E })) : h.createElement(v, Ue({}, A, { className: c, ref: E }), s)
  );
});
Xn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Xn.classNames = {
  fullWidth: Sn,
  zeroRight: wn
};
var Mm = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Dm() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = Mm();
  return t && e.setAttribute("nonce", t), e;
}
function km(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Lm(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var jm = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = Dm()) && (km(t, n), Lm(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Fm = function() {
  var e = jm();
  return function(t, n) {
    h.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Hc = function() {
  var e = Fm(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, $m = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Br = function(e) {
  return parseInt(e || "", 10) || 0;
}, Hm = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Br(n), Br(r), Br(o)];
}, Um = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return $m;
  var t = Hm(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Bm = Hc(), Et = "data-scroll-locked", Gm = function(e, t, n, r) {
  var o = e.left, a = e.top, i = e.right, s = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(Sm, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(s, "px ").concat(r, `;
  }
  body[`).concat(Et, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(s, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(wn, ` {
    right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(Sn, ` {
    margin-right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(wn, " .").concat(wn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(Sn, " .").concat(Sn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Et, `] {
    `).concat(xm, ": ").concat(s, `px;
  }
`);
}, Vi = function() {
  var e = parseInt(document.body.getAttribute(Et) || "0", 10);
  return isFinite(e) ? e : 0;
}, zm = function() {
  h.useEffect(function() {
    return document.body.setAttribute(Et, (Vi() + 1).toString()), function() {
      var e = Vi() - 1;
      e <= 0 ? document.body.removeAttribute(Et) : document.body.setAttribute(Et, e.toString());
    };
  }, []);
}, Vm = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  zm();
  var a = h.useMemo(function() {
    return Um(o);
  }, [o]);
  return h.createElement(Bm, { styles: Gm(a, !t, o, n ? "" : "!important") });
}, wo = !1;
if (typeof window < "u")
  try {
    var ln = Object.defineProperty({}, "passive", {
      get: function() {
        return wo = !0, !0;
      }
    });
    window.addEventListener("test", ln, ln), window.removeEventListener("test", ln, ln);
  } catch {
    wo = !1;
  }
var _t = wo ? { passive: !1 } : !1, qm = function(e) {
  return e.tagName === "TEXTAREA";
}, Uc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !qm(e) && n[t] === "visible")
  );
}, Wm = function(e) {
  return Uc(e, "overflowY");
}, Xm = function(e) {
  return Uc(e, "overflowX");
}, qi = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Bc(e, r);
    if (o) {
      var a = Gc(e, r), i = a[1], s = a[2];
      if (i > s)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Km = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Ym = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Bc = function(e, t) {
  return e === "v" ? Wm(t) : Xm(t);
}, Gc = function(e, t) {
  return e === "v" ? Km(t) : Ym(t);
}, Qm = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Zm = function(e, t, n, r, o) {
  var a = Qm(e, window.getComputedStyle(t).direction), i = a * r, s = n.target, c = t.contains(s), u = !1, l = i > 0, d = 0, p = 0;
  do {
    var g = Gc(e, s), b = g[0], f = g[1], _ = g[2], v = f - _ - a * b;
    (b || v) && Bc(e, s) && (d += v, p += b), s instanceof ShadowRoot ? s = s.host : s = s.parentNode;
  } while (
    // portaled content
    !c && s !== document.body || // self content
    c && (t.contains(s) || t === s)
  );
  return (l && Math.abs(d) < 1 || !l && Math.abs(p) < 1) && (u = !0), u;
}, dn = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Wi = function(e) {
  return [e.deltaX, e.deltaY];
}, Xi = function(e) {
  return e && "current" in e ? e.current : e;
}, Jm = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, eh = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, th = 0, bt = [];
function nh(e) {
  var t = h.useRef([]), n = h.useRef([0, 0]), r = h.useRef(), o = h.useState(th++)[0], a = h.useState(Hc)[0], i = h.useRef(e);
  h.useEffect(function() {
    i.current = e;
  }, [e]), h.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = wm([e.lockRef.current], (e.shards || []).map(Xi), !0).filter(Boolean);
      return f.forEach(function(_) {
        return _.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(_) {
          return _.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = h.useCallback(function(f, _) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !i.current.allowPinchZoom;
    var v = dn(f), w = n.current, m = "deltaX" in f ? f.deltaX : w[0] - v[0], y = "deltaY" in f ? f.deltaY : w[1] - v[1], E, A = f.target, C = Math.abs(m) > Math.abs(y) ? "h" : "v";
    if ("touches" in f && C === "h" && A.type === "range")
      return !1;
    var O = qi(C, A);
    if (!O)
      return !0;
    if (O ? E = C : (E = C === "v" ? "h" : "v", O = qi(C, A)), !O)
      return !1;
    if (!r.current && "changedTouches" in f && (m || y) && (r.current = E), !E)
      return !0;
    var N = r.current || E;
    return Zm(N, _, f, N === "h" ? m : y);
  }, []), c = h.useCallback(function(f) {
    var _ = f;
    if (!(!bt.length || bt[bt.length - 1] !== a)) {
      var v = "deltaY" in _ ? Wi(_) : dn(_), w = t.current.filter(function(E) {
        return E.name === _.type && (E.target === _.target || _.target === E.shadowParent) && Jm(E.delta, v);
      })[0];
      if (w && w.should) {
        _.cancelable && _.preventDefault();
        return;
      }
      if (!w) {
        var m = (i.current.shards || []).map(Xi).filter(Boolean).filter(function(E) {
          return E.contains(_.target);
        }), y = m.length > 0 ? s(_, m[0]) : !i.current.noIsolation;
        y && _.cancelable && _.preventDefault();
      }
    }
  }, []), u = h.useCallback(function(f, _, v, w) {
    var m = { name: f, delta: _, target: v, should: w, shadowParent: rh(v) };
    t.current.push(m), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== m;
      });
    }, 1);
  }, []), l = h.useCallback(function(f) {
    n.current = dn(f), r.current = void 0;
  }, []), d = h.useCallback(function(f) {
    u(f.type, Wi(f), f.target, s(f, e.lockRef.current));
  }, []), p = h.useCallback(function(f) {
    u(f.type, dn(f), f.target, s(f, e.lockRef.current));
  }, []);
  h.useEffect(function() {
    return bt.push(a), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", c, _t), document.addEventListener("touchmove", c, _t), document.addEventListener("touchstart", l, _t), function() {
      bt = bt.filter(function(f) {
        return f !== a;
      }), document.removeEventListener("wheel", c, _t), document.removeEventListener("touchmove", c, _t), document.removeEventListener("touchstart", l, _t);
    };
  }, []);
  var g = e.removeScrollBar, b = e.inert;
  return h.createElement(
    h.Fragment,
    null,
    b ? h.createElement(a, { styles: eh(o) }) : null,
    g ? h.createElement(Vm, { gapMode: e.gapMode }) : null
  );
}
function rh(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const oh = Im($c, nh);
var Kn = h.forwardRef(function(e, t) {
  return h.createElement(Xn, Ue({}, e, { ref: t, sideCar: oh }));
});
Kn.classNames = Xn.classNames;
var ah = [" ", "Enter", "ArrowUp", "ArrowDown"], ih = [" ", "Enter"], ut = "Select", [Yn, Qn, sh] = Ht(ut), [At, _b] = nt(ut, [
  sh,
  qn
]), Zn = qn(), [ch, rt] = At(ut), [uh, lh] = At(ut), zc = (e) => {
  const {
    __scopeSelect: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    value: i,
    defaultValue: s,
    onValueChange: c,
    dir: u,
    name: l,
    autoComplete: d,
    disabled: p,
    required: g,
    form: b
  } = e, f = Zn(t), [_, v] = h.useState(null), [w, m] = h.useState(null), [y, E] = h.useState(!1), A = Un(u), [C, O] = ct({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: ut
  }), [N, T] = ct({
    prop: i,
    defaultProp: s,
    onChange: c,
    caller: ut
  }), M = h.useRef(null), k = _ ? b || !!_.closest("form") : !0, [B, j] = h.useState(/* @__PURE__ */ new Set()), G = Array.from(B).map((F) => F.props.value).join(";");
  return /* @__PURE__ */ R(Ac, { ...f, children: /* @__PURE__ */ be(
    ch,
    {
      required: g,
      scope: t,
      trigger: _,
      onTriggerChange: v,
      valueNode: w,
      onValueNodeChange: m,
      valueNodeHasChildren: y,
      onValueNodeHasChildrenChange: E,
      contentId: je(),
      value: N,
      onValueChange: T,
      open: C,
      onOpenChange: O,
      dir: A,
      triggerPointerDownPosRef: M,
      disabled: p,
      children: [
        /* @__PURE__ */ R(Yn.Provider, { scope: t, children: /* @__PURE__ */ R(
          uh,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: h.useCallback((F) => {
              j((Z) => new Set(Z).add(F));
            }, []),
            onNativeOptionRemove: h.useCallback((F) => {
              j((Z) => {
                const I = new Set(Z);
                return I.delete(F), I;
              });
            }, []),
            children: n
          }
        ) }),
        k ? /* @__PURE__ */ be(
          fu,
          {
            "aria-hidden": !0,
            required: g,
            tabIndex: -1,
            name: l,
            autoComplete: d,
            value: N,
            onChange: (F) => T(F.target.value),
            disabled: p,
            form: b,
            children: [
              N === void 0 ? /* @__PURE__ */ R("option", { value: "" }) : null,
              Array.from(B)
            ]
          },
          G
        ) : null
      ]
    }
  ) });
};
zc.displayName = ut;
var Vc = "SelectTrigger", qc = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, a = Zn(n), i = rt(Vc, n), s = i.disabled || r, c = ge(t, i.onTriggerChange), u = Qn(n), l = h.useRef("touch"), [d, p, g] = mu((f) => {
      const _ = u().filter((m) => !m.disabled), v = _.find((m) => m.value === i.value), w = hu(_, f, v);
      w !== void 0 && i.onValueChange(w.value);
    }), b = (f) => {
      s || (i.onOpenChange(!0), g()), f && (i.triggerPointerDownPosRef.current = {
        x: Math.round(f.pageX),
        y: Math.round(f.pageY)
      });
    };
    return /* @__PURE__ */ R(Tc, { asChild: !0, ...a, children: /* @__PURE__ */ R(
      ce.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.contentId,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: s,
        "data-disabled": s ? "" : void 0,
        "data-placeholder": pu(i.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: X(o.onClick, (f) => {
          f.currentTarget.focus(), l.current !== "mouse" && b(f);
        }),
        onPointerDown: X(o.onPointerDown, (f) => {
          l.current = f.pointerType;
          const _ = f.target;
          _.hasPointerCapture(f.pointerId) && _.releasePointerCapture(f.pointerId), f.button === 0 && f.ctrlKey === !1 && f.pointerType === "mouse" && (b(f), f.preventDefault());
        }),
        onKeyDown: X(o.onKeyDown, (f) => {
          const _ = d.current !== "";
          !(f.ctrlKey || f.altKey || f.metaKey) && f.key.length === 1 && p(f.key), !(_ && f.key === " ") && ah.includes(f.key) && (b(), f.preventDefault());
        })
      }
    ) });
  }
);
qc.displayName = Vc;
var Wc = "SelectValue", Xc = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: a, placeholder: i = "", ...s } = e, c = rt(Wc, n), { onValueNodeHasChildrenChange: u } = c, l = a !== void 0, d = ge(t, c.onValueNodeChange);
    return xe(() => {
      u(l);
    }, [u, l]), /* @__PURE__ */ R(
      ce.span,
      {
        ...s,
        ref: d,
        style: { pointerEvents: "none" },
        children: pu(c.value) ? /* @__PURE__ */ R(Ze, { children: i }) : a
      }
    );
  }
);
Xc.displayName = Wc;
var dh = "SelectIcon", Kc = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ R(ce.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
Kc.displayName = dh;
var fh = "SelectPortal", Yc = (e) => /* @__PURE__ */ R(Wn, { asChild: !0, ...e });
Yc.displayName = fh;
var lt = "SelectContent", Qc = h.forwardRef(
  (e, t) => {
    const n = rt(lt, e.__scopeSelect), [r, o] = h.useState();
    if (xe(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const a = r;
      return a ? jn.createPortal(
        /* @__PURE__ */ R(Zc, { scope: e.__scopeSelect, children: /* @__PURE__ */ R(Yn.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ R("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ R(Jc, { ...e, ref: t });
  }
);
Qc.displayName = lt;
var Le = 10, [Zc, ot] = At(lt), ph = "SelectContentImpl", mh = /* @__PURE__ */ it("SelectContent.RemoveScroll"), Jc = h.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      position: r = "item-aligned",
      onCloseAutoFocus: o,
      onEscapeKeyDown: a,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: p,
      collisionPadding: g,
      sticky: b,
      hideWhenDetached: f,
      avoidCollisions: _,
      //
      ...v
    } = e, w = rt(lt, n), [m, y] = h.useState(null), [E, A] = h.useState(null), C = ge(t, (P) => y(P)), [O, N] = h.useState(null), [T, M] = h.useState(
      null
    ), k = Qn(n), [B, j] = h.useState(!1), G = h.useRef(!1);
    h.useEffect(() => {
      if (m) return fa(m);
    }, [m]), na();
    const F = h.useCallback(
      (P) => {
        const [te, ...z] = k().map((x) => x.ref.current), [Y] = z.slice(-1), S = document.activeElement;
        for (const x of P)
          if (x === S || (x == null || x.scrollIntoView({ block: "nearest" }), x === te && E && (E.scrollTop = 0), x === Y && E && (E.scrollTop = E.scrollHeight), x == null || x.focus(), document.activeElement !== S)) return;
      },
      [k, E]
    ), Z = h.useCallback(
      () => F([O, m]),
      [F, O, m]
    );
    h.useEffect(() => {
      B && Z();
    }, [B, Z]);
    const { onOpenChange: I, triggerPointerDownPosRef: D } = w;
    h.useEffect(() => {
      if (m) {
        let P = { x: 0, y: 0 };
        const te = (Y) => {
          var S, x;
          P = {
            x: Math.abs(Math.round(Y.pageX) - (((S = D.current) == null ? void 0 : S.x) ?? 0)),
            y: Math.abs(Math.round(Y.pageY) - (((x = D.current) == null ? void 0 : x.y) ?? 0))
          };
        }, z = (Y) => {
          P.x <= 10 && P.y <= 10 ? Y.preventDefault() : m.contains(Y.target) || I(!1), document.removeEventListener("pointermove", te), D.current = null;
        };
        return D.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", z, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", z, { capture: !0 });
        };
      }
    }, [m, I, D]), h.useEffect(() => {
      const P = () => I(!1);
      return window.addEventListener("blur", P), window.addEventListener("resize", P), () => {
        window.removeEventListener("blur", P), window.removeEventListener("resize", P);
      };
    }, [I]);
    const [K, se] = mu((P) => {
      const te = k().filter((S) => !S.disabled), z = te.find((S) => S.ref.current === document.activeElement), Y = hu(te, P, z);
      Y && setTimeout(() => Y.ref.current.focus());
    }), re = h.useCallback(
      (P, te, z) => {
        const Y = !G.current && !z;
        (w.value !== void 0 && w.value === te || Y) && (N(P), Y && (G.current = !0));
      },
      [w.value]
    ), ne = h.useCallback(() => m == null ? void 0 : m.focus(), [m]), Q = h.useCallback(
      (P, te, z) => {
        const Y = !G.current && !z;
        (w.value !== void 0 && w.value === te || Y) && M(P);
      },
      [w.value]
    ), fe = r === "popper" ? So : eu, ae = fe === So ? {
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: p,
      collisionPadding: g,
      sticky: b,
      hideWhenDetached: f,
      avoidCollisions: _
    } : {};
    return /* @__PURE__ */ R(
      Zc,
      {
        scope: n,
        content: m,
        viewport: E,
        onViewportChange: A,
        itemRefCallback: re,
        selectedItem: O,
        onItemLeave: ne,
        itemTextRefCallback: Q,
        focusSelectedItem: Z,
        selectedItemText: T,
        position: r,
        isPositioned: B,
        searchRef: K,
        children: /* @__PURE__ */ R(Kn, { as: mh, allowPinchZoom: !0, children: /* @__PURE__ */ R(
          Bn,
          {
            asChild: !0,
            trapped: w.open,
            onMountAutoFocus: (P) => {
              P.preventDefault();
            },
            onUnmountAutoFocus: X(o, (P) => {
              var te;
              (te = w.trigger) == null || te.focus({ preventScroll: !0 }), P.preventDefault();
            }),
            children: /* @__PURE__ */ R(
              Ut,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: i,
                onFocusOutside: (P) => P.preventDefault(),
                onDismiss: () => w.onOpenChange(!1),
                children: /* @__PURE__ */ R(
                  fe,
                  {
                    role: "listbox",
                    id: w.contentId,
                    "data-state": w.open ? "open" : "closed",
                    dir: w.dir,
                    onContextMenu: (P) => P.preventDefault(),
                    ...v,
                    ...ae,
                    onPlaced: () => j(!0),
                    ref: C,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...v.style
                    },
                    onKeyDown: X(v.onKeyDown, (P) => {
                      const te = P.ctrlKey || P.altKey || P.metaKey;
                      if (P.key === "Tab" && P.preventDefault(), !te && P.key.length === 1 && se(P.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(P.key)) {
                        let Y = k().filter((S) => !S.disabled).map((S) => S.ref.current);
                        if (["ArrowUp", "End"].includes(P.key) && (Y = Y.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(P.key)) {
                          const S = P.target, x = Y.indexOf(S);
                          Y = Y.slice(x + 1);
                        }
                        setTimeout(() => F(Y)), P.preventDefault();
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
Jc.displayName = ph;
var hh = "SelectItemAlignedPosition", eu = h.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, a = rt(lt, n), i = ot(lt, n), [s, c] = h.useState(null), [u, l] = h.useState(null), d = ge(t, (C) => l(C)), p = Qn(n), g = h.useRef(!1), b = h.useRef(!0), { viewport: f, selectedItem: _, selectedItemText: v, focusSelectedItem: w } = i, m = h.useCallback(() => {
    if (a.trigger && a.valueNode && s && u && f && _ && v) {
      const C = a.trigger.getBoundingClientRect(), O = u.getBoundingClientRect(), N = a.valueNode.getBoundingClientRect(), T = v.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const S = T.left - O.left, x = N.left - S, H = C.left - x, $ = C.width + H, U = Math.max($, O.width), W = window.innerWidth - Le, me = Oi(x, [
          Le,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(Le, W - U)
        ]);
        s.style.minWidth = $ + "px", s.style.left = me + "px";
      } else {
        const S = O.right - T.right, x = window.innerWidth - N.right - S, H = window.innerWidth - C.right - x, $ = C.width + H, U = Math.max($, O.width), W = window.innerWidth - Le, me = Oi(x, [
          Le,
          Math.max(Le, W - U)
        ]);
        s.style.minWidth = $ + "px", s.style.right = me + "px";
      }
      const M = p(), k = window.innerHeight - Le * 2, B = f.scrollHeight, j = window.getComputedStyle(u), G = parseInt(j.borderTopWidth, 10), F = parseInt(j.paddingTop, 10), Z = parseInt(j.borderBottomWidth, 10), I = parseInt(j.paddingBottom, 10), D = G + F + B + I + Z, K = Math.min(_.offsetHeight * 5, D), se = window.getComputedStyle(f), re = parseInt(se.paddingTop, 10), ne = parseInt(se.paddingBottom, 10), Q = C.top + C.height / 2 - Le, fe = k - Q, ae = _.offsetHeight / 2, P = _.offsetTop + ae, te = G + F + P, z = D - te;
      if (te <= Q) {
        const S = M.length > 0 && _ === M[M.length - 1].ref.current;
        s.style.bottom = "0px";
        const x = u.clientHeight - f.offsetTop - f.offsetHeight, H = Math.max(
          fe,
          ae + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (S ? ne : 0) + x + Z
        ), $ = te + H;
        s.style.height = $ + "px";
      } else {
        const S = M.length > 0 && _ === M[0].ref.current;
        s.style.top = "0px";
        const H = Math.max(
          Q,
          G + f.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (S ? re : 0) + ae
        ) + z;
        s.style.height = H + "px", f.scrollTop = te - Q + f.offsetTop;
      }
      s.style.margin = `${Le}px 0`, s.style.minHeight = K + "px", s.style.maxHeight = k + "px", r == null || r(), requestAnimationFrame(() => g.current = !0);
    }
  }, [
    p,
    a.trigger,
    a.valueNode,
    s,
    u,
    f,
    _,
    v,
    a.dir,
    r
  ]);
  xe(() => m(), [m]);
  const [y, E] = h.useState();
  xe(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const A = h.useCallback(
    (C) => {
      C && b.current === !0 && (m(), w == null || w(), b.current = !1);
    },
    [m, w]
  );
  return /* @__PURE__ */ R(
    vh,
    {
      scope: n,
      contentWrapper: s,
      shouldExpandOnScrollRef: g,
      onScrollButtonChange: A,
      children: /* @__PURE__ */ R(
        "div",
        {
          ref: c,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: y
          },
          children: /* @__PURE__ */ R(
            ce.div,
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
eu.displayName = hh;
var gh = "SelectPopperPosition", So = h.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = Le,
    ...a
  } = e, i = Zn(n);
  return /* @__PURE__ */ R(
    Nc,
    {
      ...i,
      ...a,
      ref: t,
      align: r,
      collisionPadding: o,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...a.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
So.displayName = gh;
var [vh, pa] = At(lt, {}), xo = "SelectViewport", tu = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, a = ot(xo, n), i = pa(xo, n), s = ge(t, a.onViewportChange), c = h.useRef(0);
    return /* @__PURE__ */ be(Ze, { children: [
      /* @__PURE__ */ R(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ R(Yn.Slot, { scope: n, children: /* @__PURE__ */ R(
        ce.div,
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
          onScroll: X(o.onScroll, (u) => {
            const l = u.currentTarget, { contentWrapper: d, shouldExpandOnScrollRef: p } = i;
            if (p != null && p.current && d) {
              const g = Math.abs(c.current - l.scrollTop);
              if (g > 0) {
                const b = window.innerHeight - Le * 2, f = parseFloat(d.style.minHeight), _ = parseFloat(d.style.height), v = Math.max(f, _);
                if (v < b) {
                  const w = v + g, m = Math.min(b, w), y = w - m;
                  d.style.height = m + "px", d.style.bottom === "0px" && (l.scrollTop = y > 0 ? y : 0, d.style.justifyContent = "flex-end");
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
tu.displayName = xo;
var nu = "SelectGroup", [_h, bh] = At(nu), yh = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = je();
    return /* @__PURE__ */ R(_h, { scope: n, id: o, children: /* @__PURE__ */ R(ce.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
yh.displayName = nu;
var ru = "SelectLabel", Eh = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = bh(ru, n);
    return /* @__PURE__ */ R(ce.div, { id: o.id, ...r, ref: t });
  }
);
Eh.displayName = ru;
var Nn = "SelectItem", [Rh, ou] = At(Nn), au = h.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: a,
      ...i
    } = e, s = rt(Nn, n), c = ot(Nn, n), u = s.value === r, [l, d] = h.useState(a ?? ""), [p, g] = h.useState(!1), b = ge(
      t,
      (w) => {
        var m;
        return (m = c.itemRefCallback) == null ? void 0 : m.call(c, w, r, o);
      }
    ), f = je(), _ = h.useRef("touch"), v = () => {
      o || (s.onValueChange(r), s.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ R(
      Rh,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: f,
        isSelected: u,
        onItemTextChange: h.useCallback((w) => {
          d((m) => m || ((w == null ? void 0 : w.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ R(
          Yn.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: l,
            children: /* @__PURE__ */ R(
              ce.div,
              {
                role: "option",
                "aria-labelledby": f,
                "data-highlighted": p ? "" : void 0,
                "aria-selected": u && p,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...i,
                ref: b,
                onFocus: X(i.onFocus, () => g(!0)),
                onBlur: X(i.onBlur, () => g(!1)),
                onClick: X(i.onClick, () => {
                  _.current !== "mouse" && v();
                }),
                onPointerUp: X(i.onPointerUp, () => {
                  _.current === "mouse" && v();
                }),
                onPointerDown: X(i.onPointerDown, (w) => {
                  _.current = w.pointerType;
                }),
                onPointerMove: X(i.onPointerMove, (w) => {
                  var m;
                  _.current = w.pointerType, o ? (m = c.onItemLeave) == null || m.call(c) : _.current === "mouse" && w.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: X(i.onPointerLeave, (w) => {
                  var m;
                  w.currentTarget === document.activeElement && ((m = c.onItemLeave) == null || m.call(c));
                }),
                onKeyDown: X(i.onKeyDown, (w) => {
                  var y;
                  ((y = c.searchRef) == null ? void 0 : y.current) !== "" && w.key === " " || (ih.includes(w.key) && v(), w.key === " " && w.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
au.displayName = Nn;
var Nt = "SelectItemText", iu = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...a } = e, i = rt(Nt, n), s = ot(Nt, n), c = ou(Nt, n), u = lh(Nt, n), [l, d] = h.useState(null), p = ge(
      t,
      (v) => d(v),
      c.onItemTextChange,
      (v) => {
        var w;
        return (w = s.itemTextRefCallback) == null ? void 0 : w.call(s, v, c.value, c.disabled);
      }
    ), g = l == null ? void 0 : l.textContent, b = h.useMemo(
      () => /* @__PURE__ */ R("option", { value: c.value, disabled: c.disabled, children: g }, c.value),
      [c.disabled, c.value, g]
    ), { onNativeOptionAdd: f, onNativeOptionRemove: _ } = u;
    return xe(() => (f(b), () => _(b)), [f, _, b]), /* @__PURE__ */ be(Ze, { children: [
      /* @__PURE__ */ R(ce.span, { id: c.textId, ...a, ref: p }),
      c.isSelected && i.valueNode && !i.valueNodeHasChildren ? jn.createPortal(a.children, i.valueNode) : null
    ] });
  }
);
iu.displayName = Nt;
var su = "SelectItemIndicator", cu = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return ou(su, n).isSelected ? /* @__PURE__ */ R(ce.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
cu.displayName = su;
var Co = "SelectScrollUpButton", uu = h.forwardRef((e, t) => {
  const n = ot(Co, e.__scopeSelect), r = pa(Co, e.__scopeSelect), [o, a] = h.useState(!1), i = ge(t, r.onScrollButtonChange);
  return xe(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const u = c.scrollTop > 0;
        a(u);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ R(
    du,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = n;
        s && c && (s.scrollTop = s.scrollTop - c.offsetHeight);
      }
    }
  ) : null;
});
uu.displayName = Co;
var Po = "SelectScrollDownButton", lu = h.forwardRef((e, t) => {
  const n = ot(Po, e.__scopeSelect), r = pa(Po, e.__scopeSelect), [o, a] = h.useState(!1), i = ge(t, r.onScrollButtonChange);
  return xe(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const u = c.scrollHeight - c.clientHeight, l = Math.ceil(c.scrollTop) < u;
        a(l);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ R(
    du,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: c } = n;
        s && c && (s.scrollTop = s.scrollTop + c.offsetHeight);
      }
    }
  ) : null;
});
lu.displayName = Po;
var du = h.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, a = ot("SelectScrollButton", n), i = h.useRef(null), s = Qn(n), c = h.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return h.useEffect(() => () => c(), [c]), xe(() => {
    var l;
    const u = s().find((d) => d.ref.current === document.activeElement);
    (l = u == null ? void 0 : u.ref.current) == null || l.scrollIntoView({ block: "nearest" });
  }, [s]), /* @__PURE__ */ R(
    ce.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: X(o.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(r, 50));
      }),
      onPointerMove: X(o.onPointerMove, () => {
        var u;
        (u = a.onItemLeave) == null || u.call(a), i.current === null && (i.current = window.setInterval(r, 50));
      }),
      onPointerLeave: X(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), wh = "SelectSeparator", Sh = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ R(ce.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
Sh.displayName = wh;
var Oo = "SelectArrow", xh = h.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Zn(n), a = rt(Oo, n), i = ot(Oo, n);
    return a.open && i.position === "popper" ? /* @__PURE__ */ R(Ic, { ...o, ...r, ref: t }) : null;
  }
);
xh.displayName = Oo;
var Ch = "SelectBubbleInput", fu = h.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = h.useRef(null), a = ge(r, o), i = Mc(t);
    return h.useEffect(() => {
      const s = o.current;
      if (!s) return;
      const c = window.HTMLSelectElement.prototype, l = Object.getOwnPropertyDescriptor(
        c,
        "value"
      ).set;
      if (i !== t && l) {
        const d = new Event("change", { bubbles: !0 });
        l.call(s, t), s.dispatchEvent(d);
      }
    }, [i, t]), /* @__PURE__ */ R(
      ce.select,
      {
        ...n,
        style: { ...Dc, ...n.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
fu.displayName = Ch;
function pu(e) {
  return e === "" || e === void 0;
}
function mu(e) {
  const t = Ce(e), n = h.useRef(""), r = h.useRef(0), o = h.useCallback(
    (i) => {
      const s = n.current + i;
      t(s), function c(u) {
        n.current = u, window.clearTimeout(r.current), u !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(s);
    },
    [t]
  ), a = h.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return h.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, a];
}
function hu(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let i = Ph(e, Math.max(a, 0));
  o.length === 1 && (i = i.filter((u) => u !== n));
  const c = i.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Ph(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Oh = zc, Ah = qc, Th = Xc, Nh = Kc, Ih = Yc, Mh = Qc, Dh = tu, kh = au, Lh = iu, jh = cu, Fh = uu, $h = lu;
function Hh({ ...e }) {
  return /* @__PURE__ */ R(Oh, { "data-slot": "select", ...e });
}
function Uh({ ...e }) {
  return /* @__PURE__ */ R(Th, { "data-slot": "select-value", ...e });
}
function Bh({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ be(
    Ah,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: Ee(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ R(Nh, { asChild: !0, children: /* @__PURE__ */ R(Fn, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Gh({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ R(Ih, { children: /* @__PURE__ */ be(
    Mh,
    {
      "data-slot": "select-content",
      className: Ee(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ R(Vh, {}),
        /* @__PURE__ */ R(
          Dh,
          {
            className: Ee(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ R(qh, {})
      ]
    }
  ) });
}
function zh({ className: e, children: t, ...n }) {
  return /* @__PURE__ */ be(
    kh,
    {
      "data-slot": "select-item",
      className: Ee(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ R("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ R(jh, { children: /* @__PURE__ */ R(Wd, { className: "size-4" }) }) }),
        /* @__PURE__ */ R(Lh, { children: t })
      ]
    }
  );
}
function Vh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R(
    Fh,
    {
      "data-slot": "select-scroll-up-button",
      className: Ee("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ R(Yd, { className: "size-4" })
    }
  );
}
function qh({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R(
    $h,
    {
      "data-slot": "select-scroll-down-button",
      className: Ee("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ R(Fn, { className: "size-4" })
    }
  );
}
function Wh({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    "textarea",
    {
      "data-slot": "textarea",
      className: Ee(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ...t
    }
  );
}
var Xh = (e) => e.type === "checkbox", It = (e) => e instanceof Date, ma = (e) => e == null;
const gu = (e) => typeof e == "object";
var dt = (e) => !ma(e) && !Array.isArray(e) && gu(e) && !It(e), Kh = (e) => dt(e) && e.target ? Xh(e.target) ? e.target.checked : e.target.value : e, Yh = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, Qh = (e, t) => e.has(Yh(t)), Zh = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return dt(t) && t.hasOwnProperty("isPrototypeOf");
}, Jh = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function vu(e) {
  let t;
  const n = Array.isArray(e), r = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(Jh && (e instanceof Blob || r)) && (n || dt(e)))
    if (t = n ? [] : {}, !n && !Zh(e))
      t = e;
    else
      for (const o in e)
        e.hasOwnProperty(o) && (t[o] = vu(e[o]));
  else
    return e;
  return t;
}
var _u = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Ao = (e) => e === void 0, Te = (e, t, n) => {
  if (!t || !dt(e))
    return n;
  const r = _u(t.split(/[,[\].]+?/)).reduce((o, a) => ma(o) ? o : o[a], e);
  return Ao(r) || r === e ? Ao(e[t]) ? n : e[t] : r;
}, Gr = (e) => typeof e == "boolean", eg = (e) => /^\w*$/.test(e), tg = (e) => _u(e.replace(/["|']|\]/g, "").split(/\.|\[/)), Ki = (e, t, n) => {
  let r = -1;
  const o = eg(t) ? [t] : tg(t), a = o.length, i = a - 1;
  for (; ++r < a; ) {
    const s = o[r];
    let c = n;
    if (r !== i) {
      const u = e[s];
      c = dt(u) || Array.isArray(u) ? u : isNaN(+o[r + 1]) ? {} : [];
    }
    if (s === "__proto__" || s === "constructor" || s === "prototype")
      return;
    e[s] = c, e = e[s];
  }
};
const Yi = {
  BLUR: "blur",
  CHANGE: "change"
}, Qi = {
  all: "all"
}, ng = le.createContext(null), Jn = () => le.useContext(ng);
var rg = (e, t, n, r = !0) => {
  const o = {
    defaultValues: t._defaultValues
  };
  for (const a in e)
    Object.defineProperty(o, a, {
      get: () => {
        const i = a;
        return t._proxyFormState[i] !== Qi.all && (t._proxyFormState[i] = !r || Qi.all), n && (n[i] = !0), e[i];
      }
    });
  return o;
}, Zi = (e) => ma(e) || !gu(e);
function bu(e, t) {
  if (Zi(e) || Zi(t))
    return e === t;
  if (It(e) && It(t))
    return e.getTime() === t.getTime();
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return !1;
  for (const o of n) {
    const a = e[o];
    if (!r.includes(o))
      return !1;
    if (o !== "ref") {
      const i = t[o];
      if (It(a) && It(i) || dt(a) && dt(i) || Array.isArray(a) && Array.isArray(i) ? !bu(a, i) : a !== i)
        return !1;
    }
  }
  return !0;
}
const yu = (e, t) => {
  const n = h.useRef(t);
  bu(t, n.current) || (n.current = t), h.useEffect(e, n.current);
};
function og(e) {
  const t = Jn(), { control: n = t.control, disabled: r, name: o, exact: a } = e || {}, [i, s] = le.useState(n._formState), c = le.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return yu(() => n._subscribe({
    name: o,
    formState: c.current,
    exact: a,
    callback: (u) => {
      !r && s({
        ...n._formState,
        ...u
      });
    }
  }), [o, r, a]), le.useEffect(() => {
    c.current.isValid && n._setValid(!0);
  }, [n]), le.useMemo(() => rg(i, n, c.current, !1), [i, n]);
}
var ag = (e) => typeof e == "string", ig = (e, t, n, r, o) => ag(e) ? Te(n, e, o) : Array.isArray(e) ? e.map((a) => Te(n, a)) : n;
function sg(e) {
  const t = Jn(), { control: n = t.control, name: r, defaultValue: o, disabled: a, exact: i } = e || {}, [s, c] = le.useState(n._getWatch(r, o));
  return yu(() => n._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: i,
    callback: (u) => !a && c(ig(r, n._names, u.values || n._formValues, !1, o))
  }), [r, o, a, i]), le.useEffect(() => n._removeUnmounted()), s;
}
function cg(e) {
  const t = Jn(), { name: n, disabled: r, control: o = t.control, shouldUnregister: a } = e, i = Qh(o._names.array, n), s = sg({
    control: o,
    name: n,
    defaultValue: Te(o._formValues, n, Te(o._defaultValues, n, e.defaultValue)),
    exact: !0
  }), c = og({
    control: o,
    name: n,
    exact: !0
  }), u = le.useRef(e), l = le.useRef(o.register(n, {
    ...e.rules,
    value: s,
    ...Gr(e.disabled) ? { disabled: e.disabled } : {}
  })), d = le.useMemo(() => Object.defineProperties({}, {
    invalid: {
      enumerable: !0,
      get: () => !!Te(c.errors, n)
    },
    isDirty: {
      enumerable: !0,
      get: () => !!Te(c.dirtyFields, n)
    },
    isTouched: {
      enumerable: !0,
      get: () => !!Te(c.touchedFields, n)
    },
    isValidating: {
      enumerable: !0,
      get: () => !!Te(c.validatingFields, n)
    },
    error: {
      enumerable: !0,
      get: () => Te(c.errors, n)
    }
  }), [c, n]), p = le.useCallback((_) => l.current.onChange({
    target: {
      value: Kh(_),
      name: n
    },
    type: Yi.CHANGE
  }), [n]), g = le.useCallback(() => l.current.onBlur({
    target: {
      value: Te(o._formValues, n),
      name: n
    },
    type: Yi.BLUR
  }), [n, o._formValues]), b = le.useCallback((_) => {
    const v = Te(o._fields, n);
    v && _ && (v._f.ref = {
      focus: () => _.focus(),
      select: () => _.select(),
      setCustomValidity: (w) => _.setCustomValidity(w),
      reportValidity: () => _.reportValidity()
    });
  }, [o._fields, n]), f = le.useMemo(() => ({
    name: n,
    value: s,
    ...Gr(r) || c.disabled ? { disabled: c.disabled || r } : {},
    onChange: p,
    onBlur: g,
    ref: b
  }), [n, r, c.disabled, p, g, b, s]);
  return le.useEffect(() => {
    const _ = o._options.shouldUnregister || a;
    o.register(n, {
      ...u.current.rules,
      ...Gr(u.current.disabled) ? { disabled: u.current.disabled } : {}
    });
    const v = (w, m) => {
      const y = Te(o._fields, w);
      y && y._f && (y._f.mount = m);
    };
    if (v(n, !0), _) {
      const w = vu(Te(o._options.defaultValues, n));
      Ki(o._defaultValues, n, w), Ao(Te(o._formValues, n)) && Ki(o._formValues, n, w);
    }
    return !i && o.register(n), () => {
      (i ? _ && !o._state.action : _) ? o.unregister(n) : v(n, !1);
    };
  }, [n, o, i, a]), le.useEffect(() => {
    o._setDisabledField({
      disabled: r,
      name: n
    });
  }, [r, n, o]), le.useMemo(() => ({
    field: f,
    formState: c,
    fieldState: d
  }), [f, c, d]);
}
const ug = (e) => e.render(cg(e));
typeof window < "u" ? le.useLayoutEffect : le.useEffect;
function bb({
  label: e,
  name: t,
  type: n = "text",
  placeholder: r,
  required: o = !1,
  disabled: a = !1,
  options: i = [],
  className: s = "",
  containerClassName: c,
  leftAddon: u,
  rightAddon: l,
  labelDetailedNode: d,
  onChange: p
}) {
  var m;
  const {
    control: g,
    formState: { errors: b }
  } = Jn(), f = b[t], [_, v] = Yo(!1), w = () => {
    v((y) => !y);
  };
  return /* @__PURE__ */ be("div", { className: "space-y-2", children: [
    e && /* @__PURE__ */ be("div", { children: [
      /* @__PURE__ */ be(Uf, { className: "text-[16px] font-medium", children: [
        e,
        o && /* @__PURE__ */ R("span", { className: "text-destructive ml-1", children: "*" })
      ] }),
      d && /* @__PURE__ */ R("div", { className: "text-mid-grey-II text-xs", children: d })
    ] }),
    /* @__PURE__ */ R(
      ug,
      {
        name: t,
        control: g,
        render: ({ field: y }) => {
          const E = Ee(
            "flex h-10 w-full min-w-[400px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            f && "border-destructive",
            s
          );
          return /* @__PURE__ */ be("div", { className: Ee("flex items-center gap-2", c), children: [
            u && /* @__PURE__ */ R("div", { className: "flex items-center", children: u }),
            n === "textarea" ? /* @__PURE__ */ R(
              Wh,
              {
                ...y,
                placeholder: r,
                disabled: a,
                className: Ee(E, "resize-y")
              }
            ) : n === "select" ? /* @__PURE__ */ be(Hh, { onValueChange: y.onChange, value: y.value, disabled: a, children: [
              /* @__PURE__ */ R(Bh, { className: Ee(E, "w-full"), children: /* @__PURE__ */ R(Uh, { placeholder: r }) }),
              /* @__PURE__ */ R(Gh, { children: i.map((C, O) => /* @__PURE__ */ R(zh, { value: C.value, children: C.label }, O)) })
            ] }) : n === "number" ? /* @__PURE__ */ R(
              "input",
              {
                ...y,
                type: "number",
                placeholder: r,
                disabled: a,
                className: E,
                value: y.value || "",
                onChange: (C) => y.onChange(C.target.valueAsNumber)
              }
            ) : n === "password" ? /* @__PURE__ */ be("div", { className: "relative w-full", children: [
              /* @__PURE__ */ R(
                Pi,
                {
                  ...y,
                  type: _ ? "text" : "password",
                  placeholder: r,
                  disabled: a,
                  className: E,
                  onChange: (C) => {
                    y.onChange(C), p == null || p(C);
                  }
                }
              ),
              /* @__PURE__ */ R(
                "button",
                {
                  type: "button",
                  onClick: w,
                  className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2",
                  children: _ ? /* @__PURE__ */ R(Zd, { size: 18 }) : /* @__PURE__ */ R(ef, { size: 18 })
                }
              )
            ] }) : /* @__PURE__ */ R(
              Pi,
              {
                ...y,
                type: n,
                placeholder: r,
                disabled: a,
                className: E
              }
            ),
            l && /* @__PURE__ */ R("div", { className: "flex items-center", children: l })
          ] });
        }
      }
    ),
    f && /* @__PURE__ */ R("p", { className: "text-destructive text-sm", children: (m = f.message) == null ? void 0 : m.toString() })
  ] });
}
var Eu = {}, ha = {}, er = {};
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
})(er);
var Ru = {};
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
    let { widthInt: r, heightInt: o, blurWidth: a, blurHeight: i, blurDataURL: s, objectFit: c } = n;
    const u = 20, l = a ? a * 40 : r, d = i ? i * 40 : o, p = l && d ? "viewBox='0 0 " + l + " " + d + "'" : "", g = p ? "none" : c === "contain" ? "xMidYMid" : c === "cover" ? "xMidYMid slice" : "none";
    return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + p + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + u + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + u + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + g + "' style='filter: url(%23b);' href='" + s + "'/%3E%3C/svg%3E";
  }
})(Ru);
var tr = {};
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(o, a) {
    for (var i in a) Object.defineProperty(o, i, {
      enumerable: !0,
      get: a[i]
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
})(tr);
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "getImgProps", {
    enumerable: !0,
    get: function() {
      return b;
    }
  });
  const t = er, n = Ru, r = tr, o = [
    "lazy",
    "eager",
    void 0
  ], a = [
    "-moz-initial",
    "fill",
    "none",
    "scale-down",
    void 0
  ];
  function i(f) {
    return f.default !== void 0;
  }
  function s(f) {
    return f.src !== void 0;
  }
  function c(f) {
    return !!f && typeof f == "object" && (i(f) || s(f));
  }
  const u = /* @__PURE__ */ new Map();
  let l;
  function d(f) {
    return typeof f > "u" ? f : typeof f == "number" ? Number.isFinite(f) ? f : NaN : typeof f == "string" && /^[0-9]+$/.test(f) ? parseInt(f, 10) : NaN;
  }
  function p(f, _, v) {
    let { deviceSizes: w, allSizes: m } = f;
    if (v) {
      const E = /(^|\s)(1?\d?\d)vw/g, A = [];
      for (let C; C = E.exec(v); C)
        A.push(parseInt(C[2]));
      if (A.length) {
        const C = Math.min(...A) * 0.01;
        return {
          widths: m.filter((O) => O >= w[0] * C),
          kind: "w"
        };
      }
      return {
        widths: m,
        kind: "w"
      };
    }
    return typeof _ != "number" ? {
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
            _,
            _ * 2
            /*, width * 3*/
          ].map((E) => m.find((A) => A >= E) || m[m.length - 1])
        )
      ],
      kind: "x"
    };
  }
  function g(f) {
    let { config: _, src: v, unoptimized: w, width: m, quality: y, sizes: E, loader: A } = f;
    if (w)
      return {
        src: v,
        srcSet: void 0,
        sizes: void 0
      };
    const { widths: C, kind: O } = p(_, m, E), N = C.length - 1;
    return {
      sizes: !E && O === "w" ? "100vw" : E,
      srcSet: C.map((T, M) => A({
        config: _,
        src: v,
        quality: y,
        width: T
      }) + " " + (O === "w" ? T : M + 1) + O).join(", "),
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      src: A({
        config: _,
        src: v,
        quality: y,
        width: C[N]
      })
    };
  }
  function b(f, _) {
    let { src: v, sizes: w, unoptimized: m = !1, priority: y = !1, loading: E, className: A, quality: C, width: O, height: N, fill: T = !1, style: M, overrideSrc: k, onLoad: B, onLoadingComplete: j, placeholder: G = "empty", blurDataURL: F, fetchPriority: Z, decoding: I = "async", layout: D, objectFit: K, objectPosition: se, lazyBoundary: re, lazyRoot: ne, ...Q } = f;
    const { imgConf: fe, showAltText: ae, blurComplete: P, defaultLoader: te } = _;
    let z, Y = fe || r.imageConfigDefault;
    if ("allSizes" in Y)
      z = Y;
    else {
      var S;
      const L = [
        ...Y.deviceSizes,
        ...Y.imageSizes
      ].sort((he, Oe) => he - Oe), oe = Y.deviceSizes.sort((he, Oe) => he - Oe), we = (S = Y.qualities) == null ? void 0 : S.sort((he, Oe) => he - Oe);
      z = {
        ...Y,
        allSizes: L,
        deviceSizes: oe,
        qualities: we
      };
    }
    if (typeof te > "u")
      throw Object.defineProperty(new Error(`images.loaderFile detected but the file is missing default export.
Read more: https://nextjs.org/docs/messages/invalid-images-config`), "__NEXT_ERROR_CODE", {
        value: "E163",
        enumerable: !1,
        configurable: !0
      });
    let x = Q.loader || te;
    delete Q.loader, delete Q.srcSet;
    const H = "__next_img_default" in x;
    if (H) {
      if (z.loader === "custom")
        throw Object.defineProperty(new Error('Image with src "' + v + `" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
          value: "E252",
          enumerable: !1,
          configurable: !0
        });
    } else {
      const L = x;
      x = (oe) => {
        const { config: we, ...he } = oe;
        return L(he);
      };
    }
    if (D) {
      D === "fill" && (T = !0);
      const L = {
        intrinsic: {
          maxWidth: "100%",
          height: "auto"
        },
        responsive: {
          width: "100%",
          height: "auto"
        }
      }, oe = {
        responsive: "100vw",
        fill: "100vw"
      }, we = L[D];
      we && (M = {
        ...M,
        ...we
      });
      const he = oe[D];
      he && !w && (w = he);
    }
    let $ = "", U = d(O), W = d(N), me, ve;
    if (c(v)) {
      const L = i(v) ? v.default : v;
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
      if (me = L.blurWidth, ve = L.blurHeight, F = F || L.blurDataURL, $ = L.src, !T) {
        if (!U && !W)
          U = L.width, W = L.height;
        else if (U && !W) {
          const oe = U / L.width;
          W = Math.round(L.height * oe);
        } else if (!U && W) {
          const oe = W / L.height;
          U = Math.round(L.width * oe);
        }
      }
    }
    v = typeof v == "string" ? v : $;
    let pe = !y && (E === "lazy" || typeof E > "u");
    (!v || v.startsWith("data:") || v.startsWith("blob:")) && (m = !0, pe = !1), z.unoptimized && (m = !0), H && !z.dangerouslyAllowSVG && v.split("?", 1)[0].endsWith(".svg") && (m = !0);
    const Pe = d(C);
    if (process.env.NODE_ENV !== "production") {
      if (z.output === "export" && H && !m)
        throw Object.defineProperty(new Error("Image Optimization using the default loader is not compatible with `{ output: 'export' }`.\n  Possible solutions:\n    - Remove `{ output: 'export' }` and run \"next start\" to run server mode including the Image Optimization API.\n    - Configure `{ images: { unoptimized: true } }` in `next.config.js` to disable the Image Optimization API.\n  Read more: https://nextjs.org/docs/messages/export-image-api"), "__NEXT_ERROR_CODE", {
          value: "E500",
          enumerable: !1,
          configurable: !0
        });
      if (!v)
        m = !0;
      else if (T) {
        if (O)
          throw Object.defineProperty(new Error('Image with src "' + v + '" has both "width" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
            value: "E96",
            enumerable: !1,
            configurable: !0
          });
        if (N)
          throw Object.defineProperty(new Error('Image with src "' + v + '" has both "height" and "fill" properties. Only one should be used.'), "__NEXT_ERROR_CODE", {
            value: "E115",
            enumerable: !1,
            configurable: !0
          });
        if (M != null && M.position && M.position !== "absolute")
          throw Object.defineProperty(new Error('Image with src "' + v + '" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E216",
            enumerable: !1,
            configurable: !0
          });
        if (M != null && M.width && M.width !== "100%")
          throw Object.defineProperty(new Error('Image with src "' + v + '" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E73",
            enumerable: !1,
            configurable: !0
          });
        if (M != null && M.height && M.height !== "100%")
          throw Object.defineProperty(new Error('Image with src "' + v + '" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.'), "__NEXT_ERROR_CODE", {
            value: "E404",
            enumerable: !1,
            configurable: !0
          });
      } else {
        if (typeof U > "u")
          throw Object.defineProperty(new Error('Image with src "' + v + '" is missing required "width" property.'), "__NEXT_ERROR_CODE", {
            value: "E451",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(U))
          throw Object.defineProperty(new Error('Image with src "' + v + '" has invalid "width" property. Expected a numeric value in pixels but received "' + O + '".'), "__NEXT_ERROR_CODE", {
            value: "E66",
            enumerable: !1,
            configurable: !0
          });
        if (typeof W > "u")
          throw Object.defineProperty(new Error('Image with src "' + v + '" is missing required "height" property.'), "__NEXT_ERROR_CODE", {
            value: "E397",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(W))
          throw Object.defineProperty(new Error('Image with src "' + v + '" has invalid "height" property. Expected a numeric value in pixels but received "' + N + '".'), "__NEXT_ERROR_CODE", {
            value: "E444",
            enumerable: !1,
            configurable: !0
          });
        if (/^[\x00-\x20]/.test(v))
          throw Object.defineProperty(new Error('Image with src "' + v + '" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
            value: "E176",
            enumerable: !1,
            configurable: !0
          });
        if (/[\x00-\x20]$/.test(v))
          throw Object.defineProperty(new Error('Image with src "' + v + '" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.'), "__NEXT_ERROR_CODE", {
            value: "E21",
            enumerable: !1,
            configurable: !0
          });
      }
      if (!o.includes(E))
        throw Object.defineProperty(new Error('Image with src "' + v + '" has invalid "loading" property. Provided "' + E + '" should be one of ' + o.map(String).join(",") + "."), "__NEXT_ERROR_CODE", {
          value: "E357",
          enumerable: !1,
          configurable: !0
        });
      if (y && E === "lazy")
        throw Object.defineProperty(new Error('Image with src "' + v + `" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
          value: "E218",
          enumerable: !1,
          configurable: !0
        });
      if (G !== "empty" && G !== "blur" && !G.startsWith("data:image/"))
        throw Object.defineProperty(new Error('Image with src "' + v + '" has invalid "placeholder" property "' + G + '".'), "__NEXT_ERROR_CODE", {
          value: "E431",
          enumerable: !1,
          configurable: !0
        });
      if (G !== "empty" && U && W && U * W < 1600 && (0, t.warnOnce)('Image with src "' + v + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.'), G === "blur" && !F) {
        const L = [
          "jpeg",
          "png",
          "webp",
          "avif"
        ];
        throw Object.defineProperty(new Error('Image with src "' + v + `" has "placeholder='blur'" property but is missing the "blurDataURL" property.
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
      if ("ref" in Q && (0, t.warnOnce)('Image with src "' + v + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.'), !m && !H) {
        const L = x({
          config: z,
          src: v,
          width: U || 400,
          quality: Pe || 75
        });
        let oe;
        try {
          oe = new URL(L);
        } catch {
        }
        (L === v || oe && oe.pathname === v && !oe.search) && (0, t.warnOnce)('Image with src "' + v + `" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
      }
      j && (0, t.warnOnce)('Image with src "' + v + '" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.');
      for (const [L, oe] of Object.entries({
        layout: D,
        objectFit: K,
        objectPosition: se,
        lazyBoundary: re,
        lazyRoot: ne
      }))
        oe && (0, t.warnOnce)('Image with src "' + v + '" has legacy prop "' + L + `". Did you forget to run the codemod?
Read more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
      if (typeof window < "u" && !l && window.PerformanceObserver) {
        l = new PerformanceObserver((L) => {
          for (const we of L.getEntries()) {
            var oe;
            const he = (we == null || (oe = we.element) == null ? void 0 : oe.src) || "", Oe = u.get(he);
            Oe && !Oe.priority && Oe.placeholder === "empty" && !Oe.src.startsWith("data:") && !Oe.src.startsWith("blob:") && (0, t.warnOnce)('Image with src "' + Oe.src + `" was detected as the Largest Contentful Paint (LCP). Please add the "priority" property if this image is above the fold.
Read more: https://nextjs.org/docs/api-reference/next/image#priority`);
          }
        });
        try {
          l.observe({
            type: "largest-contentful-paint",
            buffered: !0
          });
        } catch (L) {
          console.error(L);
        }
      }
    }
    const Re = Object.assign(T ? {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      objectFit: K,
      objectPosition: se
    } : {}, ae ? {} : {
      color: "transparent"
    }, M), ie = !P && G !== "empty" ? G === "blur" ? 'url("data:image/svg+xml;charset=utf-8,' + (0, n.getImageBlurSvg)({
      widthInt: U,
      heightInt: W,
      blurWidth: me,
      blurHeight: ve,
      blurDataURL: F || "",
      objectFit: Re.objectFit
    }) + '")' : 'url("' + G + '")' : null, ue = a.includes(Re.objectFit) ? Re.objectFit === "fill" ? "100% 100%" : "cover" : Re.objectFit;
    let ye = ie ? {
      backgroundSize: ue,
      backgroundPosition: Re.objectPosition || "50% 50%",
      backgroundRepeat: "no-repeat",
      backgroundImage: ie
    } : {};
    process.env.NODE_ENV === "development" && ye.backgroundImage && G === "blur" && F != null && F.startsWith("/") && (ye.backgroundImage = 'url("' + F + '")');
    const q = g({
      config: z,
      src: v,
      unoptimized: m,
      width: U,
      quality: Pe,
      sizes: w,
      loader: x
    });
    if (process.env.NODE_ENV !== "production" && typeof window < "u") {
      let L;
      try {
        L = new URL(q.src);
      } catch {
        L = new URL(q.src, window.location.href);
      }
      u.set(L.href, {
        src: v,
        priority: y,
        placeholder: G
      });
    }
    return {
      props: {
        ...Q,
        loading: pe ? "lazy" : E,
        fetchPriority: Z,
        width: U,
        height: W,
        decoding: I,
        className: A,
        style: {
          ...Re,
          ...ye
        },
        sizes: q.sizes,
        srcSet: q.srcSet,
        src: k || q.src
      },
      meta: {
        unoptimized: m,
        priority: y,
        placeholder: G,
        fill: T
      }
    };
  }
})(ha);
var To = { exports: {} }, fn = { exports: {} }, zr = {}, Ji;
function lg() {
  return Ji || (Ji = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return a;
      }
    });
    const t = le, n = typeof window > "u", r = n ? () => {
    } : t.useLayoutEffect, o = n ? () => {
    } : t.useEffect;
    function a(i) {
      const { headManager: s, reduceComponentsToState: c } = i;
      function u() {
        if (s && s.mountedInstances) {
          const d = t.Children.toArray(Array.from(s.mountedInstances).filter(Boolean));
          s.updateHead(c(d, i));
        }
      }
      if (n) {
        var l;
        s == null || (l = s.mountedInstances) == null || l.add(i.children), u();
      }
      return r(() => {
        var d;
        return s == null || (d = s.mountedInstances) == null || d.add(i.children), () => {
          var p;
          s == null || (p = s.mountedInstances) == null || p.delete(i.children);
        };
      }), r(() => (s && (s._pendingUpdate = u), () => {
        s && (s._pendingUpdate = u);
      })), o(() => (s && s._pendingUpdate && (s._pendingUpdate(), s._pendingUpdate = null), () => {
        s && s._pendingUpdate && (s._pendingUpdate(), s._pendingUpdate = null);
      })), null;
    }
  }(zr)), zr;
}
var Vr = {}, es;
function dg() {
  return es || (es = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "AmpStateContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ Ke._(le)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "AmpStateContext");
  }(Vr)), Vr;
}
var qr = {}, ts;
function fg() {
  return ts || (ts = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "HeadManagerContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ Ke._(le)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "HeadManagerContext");
  }(qr)), qr;
}
var Wr = {}, ns;
function pg() {
  return ns || (ns = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isInAmpMode", {
      enumerable: !0,
      get: function() {
        return t;
      }
    });
    function t(n) {
      let { ampFirst: r = !1, hybrid: o = !1, hasQuery: a = !1 } = n === void 0 ? {} : n;
      return r || o && a;
    }
  }(Wr)), Wr;
}
var rs;
function mg() {
  return rs || (rs = 1, function(e, t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(m, y) {
      for (var E in y) Object.defineProperty(m, E, {
        enumerable: !0,
        get: y[E]
      });
    }
    n(t, {
      default: function() {
        return w;
      },
      defaultHead: function() {
        return p;
      }
    });
    const r = Ke, o = Ct, a = Ko, i = /* @__PURE__ */ o._(le), s = /* @__PURE__ */ r._(lg()), c = dg(), u = fg(), l = pg(), d = er;
    function p(m) {
      m === void 0 && (m = !1);
      const y = [
        /* @__PURE__ */ (0, a.jsx)("meta", {
          charSet: "utf-8"
        }, "charset")
      ];
      return m || y.push(/* @__PURE__ */ (0, a.jsx)("meta", {
        name: "viewport",
        content: "width=device-width"
      }, "viewport")), y;
    }
    function g(m, y) {
      return typeof y == "string" || typeof y == "number" ? m : y.type === i.default.Fragment ? m.concat(
        // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
        i.default.Children.toArray(y.props.children).reduce(
          // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
          (E, A) => typeof A == "string" || typeof A == "number" ? E : E.concat(A),
          []
        )
      ) : m.concat(y);
    }
    const b = [
      "name",
      "httpEquiv",
      "charSet",
      "itemProp"
    ];
    function f() {
      const m = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set(), A = {};
      return (C) => {
        let O = !0, N = !1;
        if (C.key && typeof C.key != "number" && C.key.indexOf("$") > 0) {
          N = !0;
          const T = C.key.slice(C.key.indexOf("$") + 1);
          m.has(T) ? O = !1 : m.add(T);
        }
        switch (C.type) {
          case "title":
          case "base":
            y.has(C.type) ? O = !1 : y.add(C.type);
            break;
          case "meta":
            for (let T = 0, M = b.length; T < M; T++) {
              const k = b[T];
              if (C.props.hasOwnProperty(k))
                if (k === "charSet")
                  E.has(k) ? O = !1 : E.add(k);
                else {
                  const B = C.props[k], j = A[k] || /* @__PURE__ */ new Set();
                  (k !== "name" || !N) && j.has(B) ? O = !1 : (j.add(B), A[k] = j);
                }
            }
            break;
        }
        return O;
      };
    }
    function _(m, y) {
      const { inAmpMode: E } = y;
      return m.reduce(g, []).reverse().concat(p(E).reverse()).filter(f()).reverse().map((A, C) => {
        const O = A.key || C;
        if (process.env.NODE_ENV !== "development" && process.env.__NEXT_OPTIMIZE_FONTS && !E && A.type === "link" && A.props.href && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
        [
          "https://fonts.googleapis.com/css",
          "https://use.typekit.net/"
        ].some((N) => A.props.href.startsWith(N))) {
          const N = {
            ...A.props || {}
          };
          return N["data-href"] = N.href, N.href = void 0, N["data-optimized-fonts"] = !0, /* @__PURE__ */ i.default.cloneElement(A, N);
        }
        if (process.env.NODE_ENV === "development")
          if (A.type === "script" && A.props.type !== "application/ld+json") {
            const N = A.props.src ? '<script> tag with src="' + A.props.src + '"' : "inline <script>";
            (0, d.warnOnce)("Do not add <script> tags using next/head (see " + N + `). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
          } else A.type === "link" && A.props.rel === "stylesheet" && (0, d.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + A.props.href + `"). Use Document instead. 
See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
        return /* @__PURE__ */ i.default.cloneElement(A, {
          key: O
        });
      });
    }
    function v(m) {
      let { children: y } = m;
      const E = (0, i.useContext)(c.AmpStateContext), A = (0, i.useContext)(u.HeadManagerContext);
      return /* @__PURE__ */ (0, a.jsx)(s.default, {
        reduceComponentsToState: _,
        headManager: A,
        inAmpMode: (0, l.isInAmpMode)(E),
        children: y
      });
    }
    const w = v;
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(fn, fn.exports)), fn.exports;
}
var Xr = {}, os;
function hg() {
  return os || (os = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ImageConfigContext", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = /* @__PURE__ */ Ke._(le), r = tr, o = n.default.createContext(r.imageConfigDefault);
    process.env.NODE_ENV !== "production" && (o.displayName = "ImageConfigContext");
  }(Xr)), Xr;
}
var Kr = {}, Yr = {}, Qr = { exports: {} }, as;
function wu() {
  return as || (as = 1, (() => {
    var e = { 170: (o, a, i) => {
      const s = i(510), c = () => {
        if (typeof navigator < "u" && navigator.platform) {
          const l = navigator.platform.toLowerCase();
          return l === "win32" || l === "windows";
        }
        return typeof process < "u" && process.platform ? process.platform === "win32" : !1;
      };
      function u(l, d, p = !1) {
        return d && (d.windows === null || d.windows === void 0) && (d = { ...d, windows: c() }), s(l, d, p);
      }
      Object.assign(u, s), o.exports = u;
    }, 154: (o) => {
      const a = "\\\\/", i = `[^${a}]`, s = "\\.", c = "\\+", u = "\\?", l = "\\/", d = "(?=.)", p = "[^/]", g = `(?:${l}|$)`, b = `(?:^|${l})`, f = `${s}{1,2}${g}`, _ = `(?!${s})`, v = `(?!${b}${f})`, w = `(?!${s}{0,1}${g})`, m = `(?!${f})`, y = `[^.${l}]`, E = `${p}*?`, C = { DOT_LITERAL: s, PLUS_LITERAL: c, QMARK_LITERAL: u, SLASH_LITERAL: l, ONE_CHAR: d, QMARK: p, END_ANCHOR: g, DOTS_SLASH: f, NO_DOT: _, NO_DOTS: v, NO_DOT_SLASH: w, NO_DOTS_SLASH: m, QMARK_NO_DOT: y, STAR: E, START_ANCHOR: b, SEP: "/" }, O = { ...C, SLASH_LITERAL: `[${a}]`, QMARK: i, STAR: `${i}*?`, DOTS_SLASH: `${s}{1,2}(?:[${a}]|$)`, NO_DOT: `(?!${s})`, NO_DOTS: `(?!(?:^|[${a}])${s}{1,2}(?:[${a}]|$))`, NO_DOT_SLASH: `(?!${s}{0,1}(?:[${a}]|$))`, NO_DOTS_SLASH: `(?!${s}{1,2}(?:[${a}]|$))`, QMARK_NO_DOT: `[^.${a}]`, START_ANCHOR: `(?:^|[${a}])`, END_ANCHOR: `(?:[${a}]|$)`, SEP: "\\" }, N = { alnum: "a-zA-Z0-9", alpha: "a-zA-Z", ascii: "\\x00-\\x7F", blank: " \\t", cntrl: "\\x00-\\x1F\\x7F", digit: "0-9", graph: "\\x21-\\x7E", lower: "a-z", print: "\\x20-\\x7E ", punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~", space: " \\t\\r\\n\\v\\f", upper: "A-Z", word: "A-Za-z0-9_", xdigit: "A-Fa-f0-9" };
      o.exports = { MAX_LENGTH: 65536, POSIX_REGEX_SOURCE: N, REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g, REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/, REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/, REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g, REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g, REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g, REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" }, CHAR_0: 48, CHAR_9: 57, CHAR_UPPERCASE_A: 65, CHAR_LOWERCASE_A: 97, CHAR_UPPERCASE_Z: 90, CHAR_LOWERCASE_Z: 122, CHAR_LEFT_PARENTHESES: 40, CHAR_RIGHT_PARENTHESES: 41, CHAR_ASTERISK: 42, CHAR_AMPERSAND: 38, CHAR_AT: 64, CHAR_BACKWARD_SLASH: 92, CHAR_CARRIAGE_RETURN: 13, CHAR_CIRCUMFLEX_ACCENT: 94, CHAR_COLON: 58, CHAR_COMMA: 44, CHAR_DOT: 46, CHAR_DOUBLE_QUOTE: 34, CHAR_EQUAL: 61, CHAR_EXCLAMATION_MARK: 33, CHAR_FORM_FEED: 12, CHAR_FORWARD_SLASH: 47, CHAR_GRAVE_ACCENT: 96, CHAR_HASH: 35, CHAR_HYPHEN_MINUS: 45, CHAR_LEFT_ANGLE_BRACKET: 60, CHAR_LEFT_CURLY_BRACE: 123, CHAR_LEFT_SQUARE_BRACKET: 91, CHAR_LINE_FEED: 10, CHAR_NO_BREAK_SPACE: 160, CHAR_PERCENT: 37, CHAR_PLUS: 43, CHAR_QUESTION_MARK: 63, CHAR_RIGHT_ANGLE_BRACKET: 62, CHAR_RIGHT_CURLY_BRACE: 125, CHAR_RIGHT_SQUARE_BRACKET: 93, CHAR_SEMICOLON: 59, CHAR_SINGLE_QUOTE: 39, CHAR_SPACE: 32, CHAR_TAB: 9, CHAR_UNDERSCORE: 95, CHAR_VERTICAL_LINE: 124, CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, extglobChars(T) {
        return { "!": { type: "negate", open: "(?:(?!(?:", close: `))${T.STAR})` }, "?": { type: "qmark", open: "(?:", close: ")?" }, "+": { type: "plus", open: "(?:", close: ")+" }, "*": { type: "star", open: "(?:", close: ")*" }, "@": { type: "at", open: "(?:", close: ")" } };
      }, globChars(T) {
        return T === !0 ? O : C;
      } };
    }, 697: (o, a, i) => {
      const s = i(154), c = i(96), { MAX_LENGTH: u, POSIX_REGEX_SOURCE: l, REGEX_NON_SPECIAL_CHARS: d, REGEX_SPECIAL_CHARS_BACKREF: p, REPLACEMENTS: g } = s, b = (v, w) => {
        if (typeof w.expandRange == "function")
          return w.expandRange(...v, w);
        v.sort();
        const m = `[${v.join("-")}]`;
        try {
          new RegExp(m);
        } catch {
          return v.map((E) => c.escapeRegex(E)).join("..");
        }
        return m;
      }, f = (v, w) => `Missing ${v}: "${w}" - use "\\\\${w}" to match literal characters`, _ = (v, w) => {
        if (typeof v != "string")
          throw new TypeError("Expected a string");
        v = g[v] || v;
        const m = { ...w }, y = typeof m.maxLength == "number" ? Math.min(u, m.maxLength) : u;
        let E = v.length;
        if (E > y)
          throw new SyntaxError(`Input length: ${E}, exceeds maximum allowed length: ${y}`);
        const A = { type: "bos", value: "", output: m.prepend || "" }, C = [A], O = m.capture ? "" : "?:", N = s.globChars(m.windows), T = s.extglobChars(N), { DOT_LITERAL: M, PLUS_LITERAL: k, SLASH_LITERAL: B, ONE_CHAR: j, DOTS_SLASH: G, NO_DOT: F, NO_DOT_SLASH: Z, NO_DOTS_SLASH: I, QMARK: D, QMARK_NO_DOT: K, STAR: se, START_ANCHOR: re } = N, ne = (q) => `(${O}(?:(?!${re}${q.dot ? G : M}).)*?)`, Q = m.dot ? "" : F, fe = m.dot ? D : K;
        let ae = m.bash === !0 ? ne(m) : se;
        m.capture && (ae = `(${ae})`), typeof m.noext == "boolean" && (m.noextglob = m.noext);
        const P = { input: v, index: -1, start: 0, dot: m.dot === !0, consumed: "", output: "", prefix: "", backtrack: !1, negated: !1, brackets: 0, braces: 0, parens: 0, quotes: 0, globstar: !1, tokens: C };
        v = c.removePrefix(v, P), E = v.length;
        const te = [], z = [], Y = [];
        let S = A, x;
        const H = () => P.index === E - 1, $ = P.peek = (q = 1) => v[P.index + q], U = P.advance = () => v[++P.index] || "", W = () => v.slice(P.index + 1), me = (q = "", _e = 0) => {
          P.consumed += q, P.index += _e;
        }, ve = (q) => {
          P.output += q.output != null ? q.output : q.value, me(q.value);
        }, pe = () => {
          let q = 1;
          for (; $() === "!" && ($(2) !== "(" || $(3) === "?"); )
            U(), P.start++, q++;
          return q % 2 === 0 ? !1 : (P.negated = !0, P.start++, !0);
        }, Pe = (q) => {
          P[q]++, Y.push(q);
        }, Re = (q) => {
          P[q]--, Y.pop();
        }, ie = (q) => {
          if (S.type === "globstar") {
            const _e = P.braces > 0 && (q.type === "comma" || q.type === "brace"), V = q.extglob === !0 || te.length && (q.type === "pipe" || q.type === "paren");
            q.type !== "slash" && q.type !== "paren" && !_e && !V && (P.output = P.output.slice(0, -S.output.length), S.type = "star", S.value = "*", S.output = ae, P.output += S.output);
          }
          if (te.length && q.type !== "paren" && (te[te.length - 1].inner += q.value), (q.value || q.output) && ve(q), S && S.type === "text" && q.type === "text") {
            S.output = (S.output || S.value) + q.value, S.value += q.value;
            return;
          }
          q.prev = S, C.push(q), S = q;
        }, ue = (q, _e) => {
          const V = { ...T[_e], conditions: 1, inner: "" };
          V.prev = S, V.parens = P.parens, V.output = P.output;
          const L = (m.capture ? "(" : "") + V.open;
          Pe("parens"), ie({ type: q, value: _e, output: P.output ? "" : j }), ie({ type: "paren", extglob: !0, value: U(), output: L }), te.push(V);
        }, ye = (q) => {
          let _e = q.close + (m.capture ? ")" : ""), V;
          if (q.type === "negate") {
            let L = ae;
            if (q.inner && q.inner.length > 1 && q.inner.includes("/") && (L = ne(m)), (L !== ae || H() || /^\)+$/.test(W())) && (_e = q.close = `)$))${L}`), q.inner.includes("*") && (V = W()) && /^\.[^\\/.]+$/.test(V)) {
              const oe = _(V, { ...w, fastpaths: !1 }).output;
              _e = q.close = `)${oe})${L})`;
            }
            q.prev.type === "bos" && (P.negatedExtglob = !0);
          }
          ie({ type: "paren", extglob: !0, value: x, output: _e }), Re("parens");
        };
        if (m.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(v)) {
          let q = !1, _e = v.replace(p, (V, L, oe, we, he, Oe) => we === "\\" ? (q = !0, V) : we === "?" ? L ? L + we + (he ? D.repeat(he.length) : "") : Oe === 0 ? fe + (he ? D.repeat(he.length) : "") : D.repeat(oe.length) : we === "." ? M.repeat(oe.length) : we === "*" ? L ? L + we + (he ? ae : "") : ae : L ? V : `\\${V}`);
          return q === !0 && (m.unescape === !0 ? _e = _e.replace(/\\/g, "") : _e = _e.replace(/\\+/g, (V) => V.length % 2 === 0 ? "\\\\" : V ? "\\" : "")), _e === v && m.contains === !0 ? (P.output = v, P) : (P.output = c.wrapOutput(_e, P, w), P);
        }
        for (; !H(); ) {
          if (x = U(), x === "\0")
            continue;
          if (x === "\\") {
            const V = $();
            if (V === "/" && m.bash !== !0 || V === "." || V === ";")
              continue;
            if (!V) {
              x += "\\", ie({ type: "text", value: x });
              continue;
            }
            const L = /^\\+/.exec(W());
            let oe = 0;
            if (L && L[0].length > 2 && (oe = L[0].length, P.index += oe, oe % 2 !== 0 && (x += "\\")), m.unescape === !0 ? x = U() : x += U(), P.brackets === 0) {
              ie({ type: "text", value: x });
              continue;
            }
          }
          if (P.brackets > 0 && (x !== "]" || S.value === "[" || S.value === "[^")) {
            if (m.posix !== !1 && x === ":") {
              const V = S.value.slice(1);
              if (V.includes("[") && (S.posix = !0, V.includes(":"))) {
                const L = S.value.lastIndexOf("["), oe = S.value.slice(0, L), we = S.value.slice(L + 2), he = l[we];
                if (he) {
                  S.value = oe + he, P.backtrack = !0, U(), !A.output && C.indexOf(S) === 1 && (A.output = j);
                  continue;
                }
              }
            }
            (x === "[" && $() !== ":" || x === "-" && $() === "]") && (x = `\\${x}`), x === "]" && (S.value === "[" || S.value === "[^") && (x = `\\${x}`), m.posix === !0 && x === "!" && S.value === "[" && (x = "^"), S.value += x, ve({ value: x });
            continue;
          }
          if (P.quotes === 1 && x !== '"') {
            x = c.escapeRegex(x), S.value += x, ve({ value: x });
            continue;
          }
          if (x === '"') {
            P.quotes = P.quotes === 1 ? 0 : 1, m.keepQuotes === !0 && ie({ type: "text", value: x });
            continue;
          }
          if (x === "(") {
            Pe("parens"), ie({ type: "paren", value: x });
            continue;
          }
          if (x === ")") {
            if (P.parens === 0 && m.strictBrackets === !0)
              throw new SyntaxError(f("opening", "("));
            const V = te[te.length - 1];
            if (V && P.parens === V.parens + 1) {
              ye(te.pop());
              continue;
            }
            ie({ type: "paren", value: x, output: P.parens ? ")" : "\\)" }), Re("parens");
            continue;
          }
          if (x === "[") {
            if (m.nobracket === !0 || !W().includes("]")) {
              if (m.nobracket !== !0 && m.strictBrackets === !0)
                throw new SyntaxError(f("closing", "]"));
              x = `\\${x}`;
            } else
              Pe("brackets");
            ie({ type: "bracket", value: x });
            continue;
          }
          if (x === "]") {
            if (m.nobracket === !0 || S && S.type === "bracket" && S.value.length === 1) {
              ie({ type: "text", value: x, output: `\\${x}` });
              continue;
            }
            if (P.brackets === 0) {
              if (m.strictBrackets === !0)
                throw new SyntaxError(f("opening", "["));
              ie({ type: "text", value: x, output: `\\${x}` });
              continue;
            }
            Re("brackets");
            const V = S.value.slice(1);
            if (S.posix !== !0 && V[0] === "^" && !V.includes("/") && (x = `/${x}`), S.value += x, ve({ value: x }), m.literalBrackets === !1 || c.hasRegexChars(V))
              continue;
            const L = c.escapeRegex(S.value);
            if (P.output = P.output.slice(0, -S.value.length), m.literalBrackets === !0) {
              P.output += L, S.value = L;
              continue;
            }
            S.value = `(${O}${L}|${S.value})`, P.output += S.value;
            continue;
          }
          if (x === "{" && m.nobrace !== !0) {
            Pe("braces");
            const V = { type: "brace", value: x, output: "(", outputIndex: P.output.length, tokensIndex: P.tokens.length };
            z.push(V), ie(V);
            continue;
          }
          if (x === "}") {
            const V = z[z.length - 1];
            if (m.nobrace === !0 || !V) {
              ie({ type: "text", value: x, output: x });
              continue;
            }
            let L = ")";
            if (V.dots === !0) {
              const oe = C.slice(), we = [];
              for (let he = oe.length - 1; he >= 0 && (C.pop(), oe[he].type !== "brace"); he--)
                oe[he].type !== "dots" && we.unshift(oe[he].value);
              L = b(we, m), P.backtrack = !0;
            }
            if (V.comma !== !0 && V.dots !== !0) {
              const oe = P.output.slice(0, V.outputIndex), we = P.tokens.slice(V.tokensIndex);
              V.value = V.output = "\\{", x = L = "\\}", P.output = oe;
              for (const he of we)
                P.output += he.output || he.value;
            }
            ie({ type: "brace", value: x, output: L }), Re("braces"), z.pop();
            continue;
          }
          if (x === "|") {
            te.length > 0 && te[te.length - 1].conditions++, ie({ type: "text", value: x });
            continue;
          }
          if (x === ",") {
            let V = x;
            const L = z[z.length - 1];
            L && Y[Y.length - 1] === "braces" && (L.comma = !0, V = "|"), ie({ type: "comma", value: x, output: V });
            continue;
          }
          if (x === "/") {
            if (S.type === "dot" && P.index === P.start + 1) {
              P.start = P.index + 1, P.consumed = "", P.output = "", C.pop(), S = A;
              continue;
            }
            ie({ type: "slash", value: x, output: B });
            continue;
          }
          if (x === ".") {
            if (P.braces > 0 && S.type === "dot") {
              S.value === "." && (S.output = M);
              const V = z[z.length - 1];
              S.type = "dots", S.output += x, S.value += x, V.dots = !0;
              continue;
            }
            if (P.braces + P.parens === 0 && S.type !== "bos" && S.type !== "slash") {
              ie({ type: "text", value: x, output: M });
              continue;
            }
            ie({ type: "dot", value: x, output: M });
            continue;
          }
          if (x === "?") {
            if (!(S && S.value === "(") && m.noextglob !== !0 && $() === "(" && $(2) !== "?") {
              ue("qmark", x);
              continue;
            }
            if (S && S.type === "paren") {
              const L = $();
              let oe = x;
              (S.value === "(" && !/[!=<:]/.test(L) || L === "<" && !/<([!=]|\w+>)/.test(W())) && (oe = `\\${x}`), ie({ type: "text", value: x, output: oe });
              continue;
            }
            if (m.dot !== !0 && (S.type === "slash" || S.type === "bos")) {
              ie({ type: "qmark", value: x, output: K });
              continue;
            }
            ie({ type: "qmark", value: x, output: D });
            continue;
          }
          if (x === "!") {
            if (m.noextglob !== !0 && $() === "(" && ($(2) !== "?" || !/[!=<:]/.test($(3)))) {
              ue("negate", x);
              continue;
            }
            if (m.nonegate !== !0 && P.index === 0) {
              pe();
              continue;
            }
          }
          if (x === "+") {
            if (m.noextglob !== !0 && $() === "(" && $(2) !== "?") {
              ue("plus", x);
              continue;
            }
            if (S && S.value === "(" || m.regex === !1) {
              ie({ type: "plus", value: x, output: k });
              continue;
            }
            if (S && (S.type === "bracket" || S.type === "paren" || S.type === "brace") || P.parens > 0) {
              ie({ type: "plus", value: x });
              continue;
            }
            ie({ type: "plus", value: k });
            continue;
          }
          if (x === "@") {
            if (m.noextglob !== !0 && $() === "(" && $(2) !== "?") {
              ie({ type: "at", extglob: !0, value: x, output: "" });
              continue;
            }
            ie({ type: "text", value: x });
            continue;
          }
          if (x !== "*") {
            (x === "$" || x === "^") && (x = `\\${x}`);
            const V = d.exec(W());
            V && (x += V[0], P.index += V[0].length), ie({ type: "text", value: x });
            continue;
          }
          if (S && (S.type === "globstar" || S.star === !0)) {
            S.type = "star", S.star = !0, S.value += x, S.output = ae, P.backtrack = !0, P.globstar = !0, me(x);
            continue;
          }
          let q = W();
          if (m.noextglob !== !0 && /^\([^?]/.test(q)) {
            ue("star", x);
            continue;
          }
          if (S.type === "star") {
            if (m.noglobstar === !0) {
              me(x);
              continue;
            }
            const V = S.prev, L = V.prev, oe = V.type === "slash" || V.type === "bos", we = L && (L.type === "star" || L.type === "globstar");
            if (m.bash === !0 && (!oe || q[0] && q[0] !== "/")) {
              ie({ type: "star", value: x, output: "" });
              continue;
            }
            const he = P.braces > 0 && (V.type === "comma" || V.type === "brace"), Oe = te.length && (V.type === "pipe" || V.type === "paren");
            if (!oe && V.type !== "paren" && !he && !Oe) {
              ie({ type: "star", value: x, output: "" });
              continue;
            }
            for (; q.slice(0, 3) === "/**"; ) {
              const qt = v[P.index + 4];
              if (qt && qt !== "/")
                break;
              q = q.slice(3), me("/**", 3);
            }
            if (V.type === "bos" && H()) {
              S.type = "globstar", S.value += x, S.output = ne(m), P.output = S.output, P.globstar = !0, me(x);
              continue;
            }
            if (V.type === "slash" && V.prev.type !== "bos" && !we && H()) {
              P.output = P.output.slice(0, -(V.output + S.output).length), V.output = `(?:${V.output}`, S.type = "globstar", S.output = ne(m) + (m.strictSlashes ? ")" : "|$)"), S.value += x, P.globstar = !0, P.output += V.output + S.output, me(x);
              continue;
            }
            if (V.type === "slash" && V.prev.type !== "bos" && q[0] === "/") {
              const qt = q[1] !== void 0 ? "|$" : "";
              P.output = P.output.slice(0, -(V.output + S.output).length), V.output = `(?:${V.output}`, S.type = "globstar", S.output = `${ne(m)}${B}|${B}${qt})`, S.value += x, P.output += V.output + S.output, P.globstar = !0, me(x + U()), ie({ type: "slash", value: "/", output: "" });
              continue;
            }
            if (V.type === "bos" && q[0] === "/") {
              S.type = "globstar", S.value += x, S.output = `(?:^|${B}|${ne(m)}${B})`, P.output = S.output, P.globstar = !0, me(x + U()), ie({ type: "slash", value: "/", output: "" });
              continue;
            }
            P.output = P.output.slice(0, -S.output.length), S.type = "globstar", S.output = ne(m), S.value += x, P.output += S.output, P.globstar = !0, me(x);
            continue;
          }
          const _e = { type: "star", value: x, output: ae };
          if (m.bash === !0) {
            _e.output = ".*?", (S.type === "bos" || S.type === "slash") && (_e.output = Q + _e.output), ie(_e);
            continue;
          }
          if (S && (S.type === "bracket" || S.type === "paren") && m.regex === !0) {
            _e.output = x, ie(_e);
            continue;
          }
          (P.index === P.start || S.type === "slash" || S.type === "dot") && (S.type === "dot" ? (P.output += Z, S.output += Z) : m.dot === !0 ? (P.output += I, S.output += I) : (P.output += Q, S.output += Q), $() !== "*" && (P.output += j, S.output += j)), ie(_e);
        }
        for (; P.brackets > 0; ) {
          if (m.strictBrackets === !0) throw new SyntaxError(f("closing", "]"));
          P.output = c.escapeLast(P.output, "["), Re("brackets");
        }
        for (; P.parens > 0; ) {
          if (m.strictBrackets === !0) throw new SyntaxError(f("closing", ")"));
          P.output = c.escapeLast(P.output, "("), Re("parens");
        }
        for (; P.braces > 0; ) {
          if (m.strictBrackets === !0) throw new SyntaxError(f("closing", "}"));
          P.output = c.escapeLast(P.output, "{"), Re("braces");
        }
        if (m.strictSlashes !== !0 && (S.type === "star" || S.type === "bracket") && ie({ type: "maybe_slash", value: "", output: `${B}?` }), P.backtrack === !0) {
          P.output = "";
          for (const q of P.tokens)
            P.output += q.output != null ? q.output : q.value, q.suffix && (P.output += q.suffix);
        }
        return P;
      };
      _.fastpaths = (v, w) => {
        const m = { ...w }, y = typeof m.maxLength == "number" ? Math.min(u, m.maxLength) : u, E = v.length;
        if (E > y)
          throw new SyntaxError(`Input length: ${E}, exceeds maximum allowed length: ${y}`);
        v = g[v] || v;
        const { DOT_LITERAL: A, SLASH_LITERAL: C, ONE_CHAR: O, DOTS_SLASH: N, NO_DOT: T, NO_DOTS: M, NO_DOTS_SLASH: k, STAR: B, START_ANCHOR: j } = s.globChars(m.windows), G = m.dot ? M : T, F = m.dot ? k : T, Z = m.capture ? "" : "?:", I = { negated: !1, prefix: "" };
        let D = m.bash === !0 ? ".*?" : B;
        m.capture && (D = `(${D})`);
        const K = (Q) => Q.noglobstar === !0 ? D : `(${Z}(?:(?!${j}${Q.dot ? N : A}).)*?)`, se = (Q) => {
          switch (Q) {
            case "*":
              return `${G}${O}${D}`;
            case ".*":
              return `${A}${O}${D}`;
            case "*.*":
              return `${G}${D}${A}${O}${D}`;
            case "*/*":
              return `${G}${D}${C}${O}${F}${D}`;
            case "**":
              return G + K(m);
            case "**/*":
              return `(?:${G}${K(m)}${C})?${F}${O}${D}`;
            case "**/*.*":
              return `(?:${G}${K(m)}${C})?${F}${D}${A}${O}${D}`;
            case "**/.*":
              return `(?:${G}${K(m)}${C})?${A}${O}${D}`;
            default: {
              const fe = /^(.*?)\.(\w+)$/.exec(Q);
              if (!fe) return;
              const ae = se(fe[1]);
              return ae ? ae + A + fe[2] : void 0;
            }
          }
        }, re = c.removePrefix(v, I);
        let ne = se(re);
        return ne && m.strictSlashes !== !0 && (ne += `${C}?`), ne;
      }, o.exports = _;
    }, 510: (o, a, i) => {
      const s = i(716), c = i(697), u = i(96), l = i(154), d = (g) => g && typeof g == "object" && !Array.isArray(g), p = (g, b, f = !1) => {
        if (Array.isArray(g)) {
          const C = g.map((N) => p(N, b, f));
          return (N) => {
            for (const T of C) {
              const M = T(N);
              if (M) return M;
            }
            return !1;
          };
        }
        const _ = d(g) && g.tokens && g.input;
        if (g === "" || typeof g != "string" && !_)
          throw new TypeError("Expected pattern to be a non-empty string");
        const v = b || {}, w = v.windows, m = _ ? p.compileRe(g, b) : p.makeRe(g, b, !1, !0), y = m.state;
        delete m.state;
        let E = () => !1;
        if (v.ignore) {
          const C = { ...b, ignore: null, onMatch: null, onResult: null };
          E = p(v.ignore, C, f);
        }
        const A = (C, O = !1) => {
          const { isMatch: N, match: T, output: M } = p.test(C, m, b, { glob: g, posix: w }), k = { glob: g, state: y, regex: m, posix: w, input: C, output: M, match: T, isMatch: N };
          return typeof v.onResult == "function" && v.onResult(k), N === !1 ? (k.isMatch = !1, O ? k : !1) : E(C) ? (typeof v.onIgnore == "function" && v.onIgnore(k), k.isMatch = !1, O ? k : !1) : (typeof v.onMatch == "function" && v.onMatch(k), O ? k : !0);
        };
        return f && (A.state = y), A;
      };
      p.test = (g, b, f, { glob: _, posix: v } = {}) => {
        if (typeof g != "string")
          throw new TypeError("Expected input to be a string");
        if (g === "")
          return { isMatch: !1, output: "" };
        const w = f || {}, m = w.format || (v ? u.toPosixSlashes : null);
        let y = g === _, E = y && m ? m(g) : g;
        return y === !1 && (E = m ? m(g) : g, y = E === _), (y === !1 || w.capture === !0) && (w.matchBase === !0 || w.basename === !0 ? y = p.matchBase(g, b, f, v) : y = b.exec(E)), { isMatch: !!y, match: y, output: E };
      }, p.matchBase = (g, b, f) => (b instanceof RegExp ? b : p.makeRe(b, f)).test(u.basename(g)), p.isMatch = (g, b, f) => p(b, f)(g), p.parse = (g, b) => Array.isArray(g) ? g.map((f) => p.parse(f, b)) : c(g, { ...b, fastpaths: !1 }), p.scan = (g, b) => s(g, b), p.compileRe = (g, b, f = !1, _ = !1) => {
        if (f === !0)
          return g.output;
        const v = b || {}, w = v.contains ? "" : "^", m = v.contains ? "" : "$";
        let y = `${w}(?:${g.output})${m}`;
        g && g.negated === !0 && (y = `^(?!${y}).*$`);
        const E = p.toRegex(y, b);
        return _ === !0 && (E.state = g), E;
      }, p.makeRe = (g, b = {}, f = !1, _ = !1) => {
        if (!g || typeof g != "string")
          throw new TypeError("Expected a non-empty string");
        let v = { negated: !1, fastpaths: !0 };
        return b.fastpaths !== !1 && (g[0] === "." || g[0] === "*") && (v.output = c.fastpaths(g, b)), v.output || (v = c(g, b)), p.compileRe(v, b, f, _);
      }, p.toRegex = (g, b) => {
        try {
          const f = b || {};
          return new RegExp(g, f.flags || (f.nocase ? "i" : ""));
        } catch (f) {
          if (b && b.debug === !0) throw f;
          return /$^/;
        }
      }, p.constants = l, o.exports = p;
    }, 716: (o, a, i) => {
      const s = i(96), { CHAR_ASTERISK: c, CHAR_AT: u, CHAR_BACKWARD_SLASH: l, CHAR_COMMA: d, CHAR_DOT: p, CHAR_EXCLAMATION_MARK: g, CHAR_FORWARD_SLASH: b, CHAR_LEFT_CURLY_BRACE: f, CHAR_LEFT_PARENTHESES: _, CHAR_LEFT_SQUARE_BRACKET: v, CHAR_PLUS: w, CHAR_QUESTION_MARK: m, CHAR_RIGHT_CURLY_BRACE: y, CHAR_RIGHT_PARENTHESES: E, CHAR_RIGHT_SQUARE_BRACKET: A } = i(154), C = (T) => T === b || T === l, O = (T) => {
        T.isPrefix !== !0 && (T.depth = T.isGlobstar ? 1 / 0 : 1);
      }, N = (T, M) => {
        const k = M || {}, B = T.length - 1, j = k.parts === !0 || k.scanToEnd === !0, G = [], F = [], Z = [];
        let I = T, D = -1, K = 0, se = 0, re = !1, ne = !1, Q = !1, fe = !1, ae = !1, P = !1, te = !1, z = !1, Y = !1, S = !1, x = 0, H, $, U = { value: "", depth: 0, isGlob: !1 };
        const W = () => D >= B, me = () => I.charCodeAt(D + 1), ve = () => (H = $, I.charCodeAt(++D));
        for (; D < B; ) {
          $ = ve();
          let ue;
          if ($ === l) {
            te = U.backslashes = !0, $ = ve(), $ === f && (P = !0);
            continue;
          }
          if (P === !0 || $ === f) {
            for (x++; W() !== !0 && ($ = ve()); ) {
              if ($ === l) {
                te = U.backslashes = !0, ve();
                continue;
              }
              if ($ === f) {
                x++;
                continue;
              }
              if (P !== !0 && $ === p && ($ = ve()) === p) {
                if (re = U.isBrace = !0, Q = U.isGlob = !0, S = !0, j === !0)
                  continue;
                break;
              }
              if (P !== !0 && $ === d) {
                if (re = U.isBrace = !0, Q = U.isGlob = !0, S = !0, j === !0)
                  continue;
                break;
              }
              if ($ === y && (x--, x === 0)) {
                P = !1, re = U.isBrace = !0, S = !0;
                break;
              }
            }
            if (j === !0)
              continue;
            break;
          }
          if ($ === b) {
            if (G.push(D), F.push(U), U = { value: "", depth: 0, isGlob: !1 }, S === !0) continue;
            if (H === p && D === K + 1) {
              K += 2;
              continue;
            }
            se = D + 1;
            continue;
          }
          if (k.noext !== !0 && ($ === w || $ === u || $ === c || $ === m || $ === g) === !0 && me() === _) {
            if (Q = U.isGlob = !0, fe = U.isExtglob = !0, S = !0, $ === g && D === K && (Y = !0), j === !0) {
              for (; W() !== !0 && ($ = ve()); ) {
                if ($ === l) {
                  te = U.backslashes = !0, $ = ve();
                  continue;
                }
                if ($ === E) {
                  Q = U.isGlob = !0, S = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if ($ === c) {
            if (H === c && (ae = U.isGlobstar = !0), Q = U.isGlob = !0, S = !0, j === !0)
              continue;
            break;
          }
          if ($ === m) {
            if (Q = U.isGlob = !0, S = !0, j === !0)
              continue;
            break;
          }
          if ($ === v) {
            for (; W() !== !0 && (ue = ve()); ) {
              if (ue === l) {
                te = U.backslashes = !0, ve();
                continue;
              }
              if (ue === A) {
                ne = U.isBracket = !0, Q = U.isGlob = !0, S = !0;
                break;
              }
            }
            if (j === !0)
              continue;
            break;
          }
          if (k.nonegate !== !0 && $ === g && D === K) {
            z = U.negated = !0, K++;
            continue;
          }
          if (k.noparen !== !0 && $ === _) {
            if (Q = U.isGlob = !0, j === !0) {
              for (; W() !== !0 && ($ = ve()); ) {
                if ($ === _) {
                  te = U.backslashes = !0, $ = ve();
                  continue;
                }
                if ($ === E) {
                  S = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (Q === !0) {
            if (S = !0, j === !0)
              continue;
            break;
          }
        }
        k.noext === !0 && (fe = !1, Q = !1);
        let pe = I, Pe = "", Re = "";
        K > 0 && (Pe = I.slice(0, K), I = I.slice(K), se -= K), pe && Q === !0 && se > 0 ? (pe = I.slice(0, se), Re = I.slice(se)) : Q === !0 ? (pe = "", Re = I) : pe = I, pe && pe !== "" && pe !== "/" && pe !== I && C(pe.charCodeAt(pe.length - 1)) && (pe = pe.slice(0, -1)), k.unescape === !0 && (Re && (Re = s.removeBackslashes(Re)), pe && te === !0 && (pe = s.removeBackslashes(pe)));
        const ie = { prefix: Pe, input: T, start: K, base: pe, glob: Re, isBrace: re, isBracket: ne, isGlob: Q, isExtglob: fe, isGlobstar: ae, negated: z, negatedExtglob: Y };
        if (k.tokens === !0 && (ie.maxDepth = 0, C($) || F.push(U), ie.tokens = F), k.parts === !0 || k.tokens === !0) {
          let ue;
          for (let ye = 0; ye < G.length; ye++) {
            const q = ue ? ue + 1 : K, _e = G[ye], V = T.slice(q, _e);
            k.tokens && (ye === 0 && K !== 0 ? (F[ye].isPrefix = !0, F[ye].value = Pe) : F[ye].value = V, O(F[ye]), ie.maxDepth += F[ye].depth), (ye !== 0 || V !== "") && Z.push(V), ue = _e;
          }
          if (ue && ue + 1 < T.length) {
            const ye = T.slice(ue + 1);
            Z.push(ye), k.tokens && (F[F.length - 1].value = ye, O(F[F.length - 1]), ie.maxDepth += F[F.length - 1].depth);
          }
          ie.slashes = G, ie.parts = Z;
        }
        return ie;
      };
      o.exports = N;
    }, 96: (o, a, i) => {
      const { REGEX_BACKSLASH: s, REGEX_REMOVE_BACKSLASH: c, REGEX_SPECIAL_CHARS: u, REGEX_SPECIAL_CHARS_GLOBAL: l } = i(154);
      a.isObject = (d) => d !== null && typeof d == "object" && !Array.isArray(d), a.hasRegexChars = (d) => u.test(d), a.isRegexChar = (d) => d.length === 1 && a.hasRegexChars(d), a.escapeRegex = (d) => d.replace(l, "\\$1"), a.toPosixSlashes = (d) => d.replace(s, "/"), a.removeBackslashes = (d) => d.replace(c, (p) => p === "\\" ? "" : p), a.escapeLast = (d, p, g) => {
        const b = d.lastIndexOf(p, g);
        return b === -1 ? d : d[b - 1] === "\\" ? a.escapeLast(d, p, b - 1) : `${d.slice(0, b)}\\${d.slice(b)}`;
      }, a.removePrefix = (d, p = {}) => {
        let g = d;
        return g.startsWith("./") && (g = g.slice(2), p.prefix = "./"), g;
      }, a.wrapOutput = (d, p = {}, g = {}) => {
        const b = g.contains ? "" : "^", f = g.contains ? "" : "$";
        let _ = `${b}(?:${d})${f}`;
        return p.negated === !0 && (_ = `(?:^(?!${_}).*$)`), _;
      }, a.basename = (d, { windows: p } = {}) => {
        const g = d.split(p ? /[\\/]/ : "/"), b = g[g.length - 1];
        return b === "" ? g[g.length - 2] : b;
      };
    } }, t = {};
    function n(o) {
      var a = t[o];
      if (a !== void 0)
        return a.exports;
      var i = t[o] = { exports: {} }, s = !0;
      try {
        e[o](i, i.exports, n), s = !1;
      } finally {
        s && delete t[o];
      }
      return i.exports;
    }
    typeof n < "u" && (n.ab = __dirname + "/");
    var r = n(170);
    Qr.exports = r;
  })()), Qr.exports;
}
var is;
function gg() {
  return is || (is = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, i) {
      for (var s in i) Object.defineProperty(a, s, {
        enumerable: !0,
        get: i[s]
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
    const n = wu();
    function r(a, i) {
      if (a.search !== void 0 && a.search !== i.search)
        return !1;
      var s;
      return !!(0, n.makeRe)((s = a.pathname) != null ? s : "**", {
        dot: !0
      }).test(i.pathname);
    }
    function o(a, i) {
      if (!a)
        return !0;
      const s = new URL(i, "http://n");
      return a.some((c) => r(c, s));
    }
  }(Yr)), Yr;
}
var Zr = {}, ss;
function vg() {
  return ss || (ss = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, i) {
      for (var s in i) Object.defineProperty(a, s, {
        enumerable: !0,
        get: i[s]
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
    const n = wu();
    function r(a, i) {
      if (a.protocol !== void 0 && a.protocol.replace(/:$/, "") !== i.protocol.replace(/:$/, "") || a.port !== void 0 && a.port !== i.port)
        return !1;
      if (a.hostname === void 0)
        throw Object.defineProperty(new Error(`Pattern should define hostname but found
` + JSON.stringify(a)), "__NEXT_ERROR_CODE", {
          value: "E410",
          enumerable: !1,
          configurable: !0
        });
      if (!(0, n.makeRe)(a.hostname).test(i.hostname) || a.search !== void 0 && a.search !== i.search)
        return !1;
      var s;
      return !!(0, n.makeRe)((s = a.pathname) != null ? s : "**", {
        dot: !0
      }).test(i.pathname);
    }
    function o(a, i, s) {
      return a.some((c) => s.hostname === c) || i.some((c) => r(c, s));
    }
  }(Zr)), Zr;
}
var cs;
function Su() {
  return cs || (cs = 1, function(e) {
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
      let { config: a, src: i, width: s, quality: c } = o;
      var u;
      if (process.env.NODE_ENV !== "production") {
        const d = [];
        if (i || d.push("src"), s || d.push("width"), d.length > 0)
          throw Object.defineProperty(new Error("Next Image Optimization requires " + d.join(", ") + " to be provided. Make sure you pass them as props to the `next/image` component. Received: " + JSON.stringify({
            src: i,
            width: s,
            quality: c
          })), "__NEXT_ERROR_CODE", {
            value: "E188",
            enumerable: !1,
            configurable: !0
          });
        if (i.startsWith("//"))
          throw Object.defineProperty(new Error('Failed to parse src "' + i + '" on `next/image`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
            value: "E360",
            enumerable: !1,
            configurable: !0
          });
        if (i.startsWith("/") && a.localPatterns && process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
        process.env.NEXT_RUNTIME !== "edge") {
          const { hasLocalMatch: p } = gg();
          if (!p(a.localPatterns, i))
            throw Object.defineProperty(new Error("Invalid src prop (" + i + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
              value: "E426",
              enumerable: !1,
              configurable: !0
            });
        }
        if (!i.startsWith("/") && (a.domains || a.remotePatterns)) {
          let p;
          try {
            p = new URL(i);
          } catch (g) {
            throw console.error(g), Object.defineProperty(new Error('Failed to parse src "' + i + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
              value: "E63",
              enumerable: !1,
              configurable: !0
            });
          }
          if (process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
          process.env.NEXT_RUNTIME !== "edge") {
            const { hasRemoteMatch: g } = vg();
            if (!g(a.domains, a.remotePatterns, p))
              throw Object.defineProperty(new Error("Invalid src prop (" + i + ') on `next/image`, hostname "' + p.hostname + '" is not configured under images in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-host'), "__NEXT_ERROR_CODE", {
                value: "E231",
                enumerable: !1,
                configurable: !0
              });
          }
        }
        if (c && a.qualities && !a.qualities.includes(c))
          throw Object.defineProperty(new Error("Invalid quality prop (" + c + ") on `next/image` does not match `images.qualities` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-qualities"), "__NEXT_ERROR_CODE", {
            value: "E623",
            enumerable: !1,
            configurable: !0
          });
      }
      const l = c || ((u = a.qualities) == null ? void 0 : u.reduce((d, p) => Math.abs(p - t) < Math.abs(d - t) ? p : d)) || t;
      return a.path + "?url=" + encodeURIComponent(i) + "&w=" + s + "&q=" + l + (i.startsWith("/_next/static/media/") && process.env.NEXT_DEPLOYMENT_ID ? "&dpl=" + process.env.NEXT_DEPLOYMENT_ID : "");
    }
    n.__next_img_default = !0;
    const r = n;
  }(Kr)), Kr;
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
  const n = Ke, r = Ct, o = Ko, a = /* @__PURE__ */ r._(le), i = /* @__PURE__ */ n._(Qo), s = /* @__PURE__ */ n._(mg()), c = ha, u = tr, l = hg(), d = er, p = nc(), g = /* @__PURE__ */ n._(Su()), b = rc(), f = process.env.__NEXT_IMAGE_OPTS;
  typeof window > "u" && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
  function _(E, A, C, O, N, T, M) {
    const k = E == null ? void 0 : E.src;
    if (!E || E["data-loaded-src"] === k)
      return;
    E["data-loaded-src"] = k, ("decode" in E ? E.decode() : Promise.resolve()).catch(() => {
    }).then(() => {
      if (!(!E.parentElement || !E.isConnected)) {
        if (A !== "empty" && N(!0), C != null && C.current) {
          const j = new Event("load");
          Object.defineProperty(j, "target", {
            writable: !1,
            value: E
          });
          let G = !1, F = !1;
          C.current({
            ...j,
            nativeEvent: j,
            currentTarget: E,
            target: E,
            isDefaultPrevented: () => G,
            isPropagationStopped: () => F,
            persist: () => {
            },
            preventDefault: () => {
              G = !0, j.preventDefault();
            },
            stopPropagation: () => {
              F = !0, j.stopPropagation();
            }
          });
        }
        if (O != null && O.current && O.current(E), process.env.NODE_ENV !== "production") {
          const j = new URL(k, "http://n").searchParams.get("url") || k;
          if (E.getAttribute("data-nimg") === "fill") {
            if (!T && (!M || M === "100vw") && E.getBoundingClientRect().width / window.innerWidth < 0.6 && (M === "100vw" ? (0, d.warnOnce)('Image with src "' + j + '" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes') : (0, d.warnOnce)('Image with src "' + j + '" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes')), E.parentElement) {
              const { position: Z } = window.getComputedStyle(E.parentElement), I = [
                "absolute",
                "fixed",
                "relative"
              ];
              I.includes(Z) || (0, d.warnOnce)('Image with src "' + j + '" has "fill" and parent element with invalid "position". Provided "' + Z + '" should be one of ' + I.map(String).join(",") + ".");
            }
            E.height === 0 && (0, d.warnOnce)('Image with src "' + j + '" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.');
          }
          const G = E.height.toString() !== E.getAttribute("height"), F = E.width.toString() !== E.getAttribute("width");
          (G && !F || !G && F) && (0, d.warnOnce)('Image with src "' + j + `" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
        }
      }
    });
  }
  function v(E) {
    return a.use ? {
      fetchPriority: E
    } : {
      fetchpriority: E
    };
  }
  const w = /* @__PURE__ */ (0, a.forwardRef)((E, A) => {
    let { src: C, srcSet: O, sizes: N, height: T, width: M, decoding: k, className: B, style: j, fetchPriority: G, placeholder: F, loading: Z, unoptimized: I, fill: D, onLoadRef: K, onLoadingCompleteRef: se, setBlurComplete: re, setShowAltText: ne, sizesInput: Q, onLoad: fe, onError: ae, ...P } = E;
    const te = (0, a.useCallback)((Y) => {
      Y && (ae && (Y.src = Y.src), process.env.NODE_ENV !== "production" && (C || console.error('Image is missing required "src" property:', Y), Y.getAttribute("alt") === null && console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.')), Y.complete && _(Y, F, K, se, re, I, Q));
    }, [
      C,
      F,
      K,
      se,
      re,
      ae,
      I,
      Q
    ]), z = (0, b.useMergedRef)(A, te);
    return /* @__PURE__ */ (0, o.jsx)("img", {
      ...P,
      ...v(G),
      // It's intended to keep `loading` before `src` because React updates
      // props in order which causes Safari/Firefox to not lazy load properly.
      // See https://github.com/facebook/react/issues/25883
      loading: Z,
      width: M,
      height: T,
      decoding: k,
      "data-nimg": D ? "fill" : "1",
      className: B,
      style: j,
      // It's intended to keep `src` the last attribute because React updates
      // attributes in order. If we keep `src` the first one, Safari will
      // immediately start to fetch `src`, before `sizes` and `srcSet` are even
      // updated by React. That causes multiple unnecessary requests if `srcSet`
      // and `sizes` are defined.
      // This bug cannot be reproduced in Chrome or Firefox.
      sizes: N,
      srcSet: O,
      src: C,
      ref: z,
      onLoad: (Y) => {
        const S = Y.currentTarget;
        _(S, F, K, se, re, I, Q);
      },
      onError: (Y) => {
        ne(!0), F !== "empty" && re(!0), ae && ae(Y);
      }
    });
  });
  function m(E) {
    let { isAppRouter: A, imgAttributes: C } = E;
    const O = {
      as: "image",
      imageSrcSet: C.srcSet,
      imageSizes: C.sizes,
      crossOrigin: C.crossOrigin,
      referrerPolicy: C.referrerPolicy,
      ...v(C.fetchPriority)
    };
    return A && i.default.preload ? (i.default.preload(
      C.src,
      // @ts-expect-error TODO: upgrade to `@types/react-dom@18.3.x`
      O
    ), null) : /* @__PURE__ */ (0, o.jsx)(s.default, {
      children: /* @__PURE__ */ (0, o.jsx)("link", {
        rel: "preload",
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        href: C.srcSet ? void 0 : C.src,
        ...O
      }, "__nimg-" + C.src + C.srcSet + C.sizes)
    });
  }
  const y = /* @__PURE__ */ (0, a.forwardRef)((E, A) => {
    const O = !(0, a.useContext)(p.RouterContext), N = (0, a.useContext)(l.ImageConfigContext), T = (0, a.useMemo)(() => {
      var se;
      const re = f || N || u.imageConfigDefault, ne = [
        ...re.deviceSizes,
        ...re.imageSizes
      ].sort((ae, P) => ae - P), Q = re.deviceSizes.sort((ae, P) => ae - P), fe = (se = re.qualities) == null ? void 0 : se.sort((ae, P) => ae - P);
      return {
        ...re,
        allSizes: ne,
        deviceSizes: Q,
        qualities: fe
      };
    }, [
      N
    ]), { onLoad: M, onLoadingComplete: k } = E, B = (0, a.useRef)(M);
    (0, a.useEffect)(() => {
      B.current = M;
    }, [
      M
    ]);
    const j = (0, a.useRef)(k);
    (0, a.useEffect)(() => {
      j.current = k;
    }, [
      k
    ]);
    const [G, F] = (0, a.useState)(!1), [Z, I] = (0, a.useState)(!1), { props: D, meta: K } = (0, c.getImgProps)(E, {
      defaultLoader: g.default,
      imgConf: T,
      blurComplete: G,
      showAltText: Z
    });
    return /* @__PURE__ */ (0, o.jsxs)(o.Fragment, {
      children: [
        /* @__PURE__ */ (0, o.jsx)(w, {
          ...D,
          unoptimized: K.unoptimized,
          placeholder: K.placeholder,
          fill: K.fill,
          onLoadRef: B,
          onLoadingCompleteRef: j,
          setBlurComplete: F,
          setShowAltText: I,
          sizesInput: E.sizes,
          ref: A
        }),
        K.priority ? /* @__PURE__ */ (0, o.jsx)(m, {
          isAppRouter: O,
          imgAttributes: D
        }) : null
      ]
    });
  });
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(To, To.exports);
var _g = To.exports;
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
      return i;
    }
  });
  const n = Ke, r = ha, o = _g, a = /* @__PURE__ */ n._(Su());
  function i(c) {
    const { props: u } = (0, r.getImgProps)(c, {
      defaultLoader: a.default,
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
})(Eu);
var bg = Eu;
const yg = /* @__PURE__ */ Ws(bg), Eg = ({ logo: e = "/images/logo-black.png", width: t = 120, height: n = 37, className: r }) => /* @__PURE__ */ R(oc, { href: "/", "data-testid": "logo", className: "", children: e ? /* @__PURE__ */ R(yg, { src: e, alt: "Logo", width: t, height: n, className: r }) : /* @__PURE__ */ R("p", { className: "text-xl font-bold", children: "LOGO" }) });
function Rg(e, t) {
  return h.useReducer((n, r) => t[n][r] ?? n, e);
}
var De = (e) => {
  const { present: t, children: n } = e, r = wg(t), o = typeof n == "function" ? n({ present: r.isPresent }) : h.Children.only(n), a = ge(r.ref, Sg(o));
  return typeof n == "function" || r.isPresent ? h.cloneElement(o, { ref: a }) : null;
};
De.displayName = "Presence";
function wg(e) {
  const [t, n] = h.useState(), r = h.useRef(null), o = h.useRef(e), a = h.useRef("none"), i = e ? "mounted" : "unmounted", [s, c] = Rg(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return h.useEffect(() => {
    const u = pn(r.current);
    a.current = s === "mounted" ? u : "none";
  }, [s]), xe(() => {
    const u = r.current, l = o.current;
    if (l !== e) {
      const p = a.current, g = pn(u);
      e ? c("MOUNT") : g === "none" || (u == null ? void 0 : u.display) === "none" ? c("UNMOUNT") : c(l && p !== g ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), xe(() => {
    if (t) {
      let u;
      const l = t.ownerDocument.defaultView ?? window, d = (g) => {
        const f = pn(r.current).includes(g.animationName);
        if (g.target === t && f && (c("ANIMATION_END"), !o.current)) {
          const _ = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = l.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = _);
          });
        }
      }, p = (g) => {
        g.target === t && (a.current = pn(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        l.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: h.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function pn(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Sg(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Jr = "rovingFocusGroup.onEntryFocus", xg = { bubbles: !1, cancelable: !0 }, Gt = "RovingFocusGroup", [No, xu, Cg] = Ht(Gt), [Pg, Cu] = nt(
  Gt,
  [Cg]
), [Og, Ag] = Pg(Gt), Pu = h.forwardRef(
  (e, t) => /* @__PURE__ */ R(No.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ R(No.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ R(Tg, { ...e, ref: t }) }) })
);
Pu.displayName = Gt;
var Tg = h.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: i,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: c,
    onEntryFocus: u,
    preventScrollOnEntryFocus: l = !1,
    ...d
  } = e, p = h.useRef(null), g = ge(t, p), b = Un(a), [f, _] = ct({
    prop: i,
    defaultProp: s ?? null,
    onChange: c,
    caller: Gt
  }), [v, w] = h.useState(!1), m = Ce(u), y = xu(n), E = h.useRef(!1), [A, C] = h.useState(0);
  return h.useEffect(() => {
    const O = p.current;
    if (O)
      return O.addEventListener(Jr, m), () => O.removeEventListener(Jr, m);
  }, [m]), /* @__PURE__ */ R(
    Og,
    {
      scope: n,
      orientation: r,
      dir: b,
      loop: o,
      currentTabStopId: f,
      onItemFocus: h.useCallback(
        (O) => _(O),
        [_]
      ),
      onItemShiftTab: h.useCallback(() => w(!0), []),
      onFocusableItemAdd: h.useCallback(
        () => C((O) => O + 1),
        []
      ),
      onFocusableItemRemove: h.useCallback(
        () => C((O) => O - 1),
        []
      ),
      children: /* @__PURE__ */ R(
        ce.div,
        {
          tabIndex: v || A === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: g,
          style: { outline: "none", ...e.style },
          onMouseDown: X(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: X(e.onFocus, (O) => {
            const N = !E.current;
            if (O.target === O.currentTarget && N && !v) {
              const T = new CustomEvent(Jr, xg);
              if (O.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const M = y().filter((F) => F.focusable), k = M.find((F) => F.active), B = M.find((F) => F.id === f), G = [k, B, ...M].filter(
                  Boolean
                ).map((F) => F.ref.current);
                Tu(G, l);
              }
            }
            E.current = !1;
          }),
          onBlur: X(e.onBlur, () => w(!1))
        }
      )
    }
  );
}), Ou = "RovingFocusGroupItem", Au = h.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      children: i,
      ...s
    } = e, c = je(), u = a || c, l = Ag(Ou, n), d = l.currentTabStopId === u, p = xu(n), { onFocusableItemAdd: g, onFocusableItemRemove: b, currentTabStopId: f } = l;
    return h.useEffect(() => {
      if (r)
        return g(), () => b();
    }, [r, g, b]), /* @__PURE__ */ R(
      No.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ R(
          ce.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": l.orientation,
            ...s,
            ref: t,
            onMouseDown: X(e.onMouseDown, (_) => {
              r ? l.onItemFocus(u) : _.preventDefault();
            }),
            onFocus: X(e.onFocus, () => l.onItemFocus(u)),
            onKeyDown: X(e.onKeyDown, (_) => {
              if (_.key === "Tab" && _.shiftKey) {
                l.onItemShiftTab();
                return;
              }
              if (_.target !== _.currentTarget) return;
              const v = Mg(_, l.orientation, l.dir);
              if (v !== void 0) {
                if (_.metaKey || _.ctrlKey || _.altKey || _.shiftKey) return;
                _.preventDefault();
                let m = p().filter((y) => y.focusable).map((y) => y.ref.current);
                if (v === "last") m.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && m.reverse();
                  const y = m.indexOf(_.currentTarget);
                  m = l.loop ? Dg(m, y + 1) : m.slice(y + 1);
                }
                setTimeout(() => Tu(m));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: d, hasTabStop: f != null }) : i
          }
        )
      }
    );
  }
);
Au.displayName = Ou;
var Ng = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Ig(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Mg(e, t, n) {
  const r = Ig(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Ng[r];
}
function Tu(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Dg(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var kg = Pu, Lg = Au, Io = ["Enter", " "], jg = ["ArrowDown", "PageUp", "Home"], Nu = ["ArrowUp", "PageDown", "End"], Fg = [...jg, ...Nu], $g = {
  ltr: [...Io, "ArrowRight"],
  rtl: [...Io, "ArrowLeft"]
}, Hg = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, zt = "Menu", [Lt, Ug, Bg] = Ht(zt), [pt, Iu] = nt(zt, [
  Bg,
  qn,
  Cu
]), nr = qn(), Mu = Cu(), [Gg, mt] = pt(zt), [zg, Vt] = pt(zt), Du = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: a, modal: i = !0 } = e, s = nr(t), [c, u] = h.useState(null), l = h.useRef(!1), d = Ce(a), p = Un(o);
  return h.useEffect(() => {
    const g = () => {
      l.current = !0, document.addEventListener("pointerdown", b, { capture: !0, once: !0 }), document.addEventListener("pointermove", b, { capture: !0, once: !0 });
    }, b = () => l.current = !1;
    return document.addEventListener("keydown", g, { capture: !0 }), () => {
      document.removeEventListener("keydown", g, { capture: !0 }), document.removeEventListener("pointerdown", b, { capture: !0 }), document.removeEventListener("pointermove", b, { capture: !0 });
    };
  }, []), /* @__PURE__ */ R(Ac, { ...s, children: /* @__PURE__ */ R(
    Gg,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: u,
      children: /* @__PURE__ */ R(
        zg,
        {
          scope: t,
          onClose: h.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: l,
          dir: p,
          modal: i,
          children: r
        }
      )
    }
  ) });
};
Du.displayName = zt;
var Vg = "MenuAnchor", ga = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = nr(n);
    return /* @__PURE__ */ R(Tc, { ...o, ...r, ref: t });
  }
);
ga.displayName = Vg;
var va = "MenuPortal", [qg, ku] = pt(va, {
  forceMount: void 0
}), Lu = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, a = mt(va, t);
  return /* @__PURE__ */ R(qg, { scope: t, forceMount: n, children: /* @__PURE__ */ R(De, { present: n || a.open, children: /* @__PURE__ */ R(Wn, { asChild: !0, container: o, children: r }) }) });
};
Lu.displayName = va;
var Me = "MenuContent", [Wg, _a] = pt(Me), ju = h.forwardRef(
  (e, t) => {
    const n = ku(Me, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = mt(Me, e.__scopeMenu), i = Vt(Me, e.__scopeMenu);
    return /* @__PURE__ */ R(Lt.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(De, { present: r || a.open, children: /* @__PURE__ */ R(Lt.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ R(Xg, { ...o, ref: t }) : /* @__PURE__ */ R(Kg, { ...o, ref: t }) }) }) });
  }
), Xg = h.forwardRef(
  (e, t) => {
    const n = mt(Me, e.__scopeMenu), r = h.useRef(null), o = ge(t, r);
    return h.useEffect(() => {
      const a = r.current;
      if (a) return fa(a);
    }, []), /* @__PURE__ */ R(
      ba,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: X(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Kg = h.forwardRef((e, t) => {
  const n = mt(Me, e.__scopeMenu);
  return /* @__PURE__ */ R(
    ba,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), Yg = /* @__PURE__ */ it("MenuContent.ScrollLock"), ba = h.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: a,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: s,
      onEntryFocus: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: p,
      onDismiss: g,
      disableOutsideScroll: b,
      ...f
    } = e, _ = mt(Me, n), v = Vt(Me, n), w = nr(n), m = Mu(n), y = Ug(n), [E, A] = h.useState(null), C = h.useRef(null), O = ge(t, C, _.onContentChange), N = h.useRef(0), T = h.useRef(""), M = h.useRef(0), k = h.useRef(null), B = h.useRef("right"), j = h.useRef(0), G = b ? Kn : h.Fragment, F = b ? { as: Yg, allowPinchZoom: !0 } : void 0, Z = (D) => {
      var P, te;
      const K = T.current + D, se = y().filter((z) => !z.disabled), re = document.activeElement, ne = (P = se.find((z) => z.ref.current === re)) == null ? void 0 : P.textValue, Q = se.map((z) => z.textValue), fe = cv(Q, K, ne), ae = (te = se.find((z) => z.textValue === fe)) == null ? void 0 : te.ref.current;
      (function z(Y) {
        T.current = Y, window.clearTimeout(N.current), Y !== "" && (N.current = window.setTimeout(() => z(""), 1e3));
      })(K), ae && setTimeout(() => ae.focus());
    };
    h.useEffect(() => () => window.clearTimeout(N.current), []), na();
    const I = h.useCallback((D) => {
      var se, re;
      return B.current === ((se = k.current) == null ? void 0 : se.side) && lv(D, (re = k.current) == null ? void 0 : re.area);
    }, []);
    return /* @__PURE__ */ R(
      Wg,
      {
        scope: n,
        searchRef: T,
        onItemEnter: h.useCallback(
          (D) => {
            I(D) && D.preventDefault();
          },
          [I]
        ),
        onItemLeave: h.useCallback(
          (D) => {
            var K;
            I(D) || ((K = C.current) == null || K.focus(), A(null));
          },
          [I]
        ),
        onTriggerLeave: h.useCallback(
          (D) => {
            I(D) && D.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: M,
        onPointerGraceIntentChange: h.useCallback((D) => {
          k.current = D;
        }, []),
        children: /* @__PURE__ */ R(G, { ...F, children: /* @__PURE__ */ R(
          Bn,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: X(a, (D) => {
              var K;
              D.preventDefault(), (K = C.current) == null || K.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ R(
              Ut,
              {
                asChild: !0,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: u,
                onPointerDownOutside: l,
                onFocusOutside: d,
                onInteractOutside: p,
                onDismiss: g,
                children: /* @__PURE__ */ R(
                  kg,
                  {
                    asChild: !0,
                    ...m,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: E,
                    onCurrentTabStopIdChange: A,
                    onEntryFocus: X(c, (D) => {
                      v.isUsingKeyboardRef.current || D.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ R(
                      Nc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Ju(_.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...w,
                        ...f,
                        ref: O,
                        style: { outline: "none", ...f.style },
                        onKeyDown: X(f.onKeyDown, (D) => {
                          const se = D.target.closest("[data-radix-menu-content]") === D.currentTarget, re = D.ctrlKey || D.altKey || D.metaKey, ne = D.key.length === 1;
                          se && (D.key === "Tab" && D.preventDefault(), !re && ne && Z(D.key));
                          const Q = C.current;
                          if (D.target !== Q || !Fg.includes(D.key)) return;
                          D.preventDefault();
                          const ae = y().filter((P) => !P.disabled).map((P) => P.ref.current);
                          Nu.includes(D.key) && ae.reverse(), iv(ae);
                        }),
                        onBlur: X(e.onBlur, (D) => {
                          D.currentTarget.contains(D.target) || (window.clearTimeout(N.current), T.current = "");
                        }),
                        onPointerMove: X(
                          e.onPointerMove,
                          jt((D) => {
                            const K = D.target, se = j.current !== D.clientX;
                            if (D.currentTarget.contains(K) && se) {
                              const re = D.clientX > j.current ? "right" : "left";
                              B.current = re, j.current = D.clientX;
                            }
                          })
                        )
                      }
                    )
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
ju.displayName = Me;
var Qg = "MenuGroup", ya = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ R(ce.div, { role: "group", ...r, ref: t });
  }
);
ya.displayName = Qg;
var Zg = "MenuLabel", Fu = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ R(ce.div, { ...r, ref: t });
  }
);
Fu.displayName = Zg;
var In = "MenuItem", us = "menu.itemSelect", rr = h.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, a = h.useRef(null), i = Vt(In, e.__scopeMenu), s = _a(In, e.__scopeMenu), c = ge(t, a), u = h.useRef(!1), l = () => {
      const d = a.current;
      if (!n && d) {
        const p = new CustomEvent(us, { bubbles: !0, cancelable: !0 });
        d.addEventListener(us, (g) => r == null ? void 0 : r(g), { once: !0 }), Cn(d, p), p.defaultPrevented ? u.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ R(
      $u,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: X(e.onClick, l),
        onPointerDown: (d) => {
          var p;
          (p = e.onPointerDown) == null || p.call(e, d), u.current = !0;
        },
        onPointerUp: X(e.onPointerUp, (d) => {
          var p;
          u.current || (p = d.currentTarget) == null || p.click();
        }),
        onKeyDown: X(e.onKeyDown, (d) => {
          const p = s.searchRef.current !== "";
          n || p && d.key === " " || Io.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
rr.displayName = In;
var $u = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...a } = e, i = _a(In, n), s = Mu(n), c = h.useRef(null), u = ge(t, c), [l, d] = h.useState(!1), [p, g] = h.useState("");
    return h.useEffect(() => {
      const b = c.current;
      b && g((b.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ R(
      Lt.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ R(Lg, { asChild: !0, ...s, focusable: !r, children: /* @__PURE__ */ R(
          ce.div,
          {
            role: "menuitem",
            "data-highlighted": l ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...a,
            ref: u,
            onPointerMove: X(
              e.onPointerMove,
              jt((b) => {
                r ? i.onItemLeave(b) : (i.onItemEnter(b), b.defaultPrevented || b.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: X(
              e.onPointerLeave,
              jt((b) => i.onItemLeave(b))
            ),
            onFocus: X(e.onFocus, () => d(!0)),
            onBlur: X(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), Jg = "MenuCheckboxItem", Hu = h.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ R(Vu, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ R(
      rr,
      {
        role: "menuitemcheckbox",
        "aria-checked": Mn(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Ra(n),
        onSelect: X(
          o.onSelect,
          () => r == null ? void 0 : r(Mn(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Hu.displayName = Jg;
var Uu = "MenuRadioGroup", [ev, tv] = pt(
  Uu,
  { value: void 0, onValueChange: () => {
  } }
), Bu = h.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, a = Ce(r);
    return /* @__PURE__ */ R(ev, { scope: e.__scopeMenu, value: n, onValueChange: a, children: /* @__PURE__ */ R(ya, { ...o, ref: t }) });
  }
);
Bu.displayName = Uu;
var Gu = "MenuRadioItem", zu = h.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = tv(Gu, e.__scopeMenu), a = n === o.value;
    return /* @__PURE__ */ R(Vu, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ R(
      rr,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...r,
        ref: t,
        "data-state": Ra(a),
        onSelect: X(
          r.onSelect,
          () => {
            var i;
            return (i = o.onValueChange) == null ? void 0 : i.call(o, n);
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
zu.displayName = Gu;
var Ea = "MenuItemIndicator", [Vu, nv] = pt(
  Ea,
  { checked: !1 }
), qu = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, a = nv(Ea, n);
    return /* @__PURE__ */ R(
      De,
      {
        present: r || Mn(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ R(
          ce.span,
          {
            ...o,
            ref: t,
            "data-state": Ra(a.checked)
          }
        )
      }
    );
  }
);
qu.displayName = Ea;
var rv = "MenuSeparator", Wu = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ R(
      ce.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
Wu.displayName = rv;
var ov = "MenuArrow", Xu = h.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = nr(n);
    return /* @__PURE__ */ R(Ic, { ...o, ...r, ref: t });
  }
);
Xu.displayName = ov;
var av = "MenuSub", [yb, Ku] = pt(av), Mt = "MenuSubTrigger", Yu = h.forwardRef(
  (e, t) => {
    const n = mt(Mt, e.__scopeMenu), r = Vt(Mt, e.__scopeMenu), o = Ku(Mt, e.__scopeMenu), a = _a(Mt, e.__scopeMenu), i = h.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = a, u = { __scopeMenu: e.__scopeMenu }, l = h.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return h.useEffect(() => l, [l]), h.useEffect(() => {
      const d = s.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [s, c]), /* @__PURE__ */ R(ga, { asChild: !0, ...u, children: /* @__PURE__ */ R(
      $u,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Ju(n.open),
        ...e,
        ref: $t(t, o.onTriggerChange),
        onClick: (d) => {
          var p;
          (p = e.onClick) == null || p.call(e, d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: X(
          e.onPointerMove,
          jt((d) => {
            a.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !i.current && (a.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              n.onOpenChange(!0), l();
            }, 100));
          })
        ),
        onPointerLeave: X(
          e.onPointerLeave,
          jt((d) => {
            var g, b;
            l();
            const p = (g = n.content) == null ? void 0 : g.getBoundingClientRect();
            if (p) {
              const f = (b = n.content) == null ? void 0 : b.dataset.side, _ = f === "right", v = _ ? -5 : 5, w = p[_ ? "left" : "right"], m = p[_ ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + v, y: d.clientY },
                  { x: w, y: p.top },
                  { x: m, y: p.top },
                  { x: m, y: p.bottom },
                  { x: w, y: p.bottom }
                ],
                side: f
              }), window.clearTimeout(s.current), s.current = window.setTimeout(
                () => a.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (a.onTriggerLeave(d), d.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: X(e.onKeyDown, (d) => {
          var g;
          const p = a.searchRef.current !== "";
          e.disabled || p && d.key === " " || $g[r.dir].includes(d.key) && (n.onOpenChange(!0), (g = n.content) == null || g.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Yu.displayName = Mt;
var Qu = "MenuSubContent", Zu = h.forwardRef(
  (e, t) => {
    const n = ku(Me, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, a = mt(Me, e.__scopeMenu), i = Vt(Me, e.__scopeMenu), s = Ku(Qu, e.__scopeMenu), c = h.useRef(null), u = ge(t, c);
    return /* @__PURE__ */ R(Lt.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(De, { present: r || a.open, children: /* @__PURE__ */ R(Lt.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(
      ba,
      {
        id: s.contentId,
        "aria-labelledby": s.triggerId,
        ...o,
        ref: u,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (l) => {
          var d;
          i.isUsingKeyboardRef.current && ((d = c.current) == null || d.focus()), l.preventDefault();
        },
        onCloseAutoFocus: (l) => l.preventDefault(),
        onFocusOutside: X(e.onFocusOutside, (l) => {
          l.target !== s.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: X(e.onEscapeKeyDown, (l) => {
          i.onClose(), l.preventDefault();
        }),
        onKeyDown: X(e.onKeyDown, (l) => {
          var g;
          const d = l.currentTarget.contains(l.target), p = Hg[i.dir].includes(l.key);
          d && p && (a.onOpenChange(!1), (g = s.trigger) == null || g.focus(), l.preventDefault());
        })
      }
    ) }) }) });
  }
);
Zu.displayName = Qu;
function Ju(e) {
  return e ? "open" : "closed";
}
function Mn(e) {
  return e === "indeterminate";
}
function Ra(e) {
  return Mn(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function iv(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function sv(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function cv(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, a = n ? e.indexOf(n) : -1;
  let i = sv(e, Math.max(a, 0));
  o.length === 1 && (i = i.filter((u) => u !== n));
  const c = i.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function uv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const s = t[a], c = t[i], u = s.x, l = s.y, d = c.x, p = c.y;
    l > r != p > r && n < (d - u) * (r - l) / (p - l) + u && (o = !o);
  }
  return o;
}
function lv(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return uv(n, t);
}
function jt(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var dv = Du, fv = ga, pv = Lu, mv = ju, hv = ya, gv = Fu, vv = rr, _v = Hu, bv = Bu, yv = zu, Ev = qu, Rv = Wu, wv = Xu, Sv = Yu, xv = Zu, or = "DropdownMenu", [Cv, Eb] = nt(
  or,
  [Iu]
), Ae = Iu(), [Pv, el] = Cv(or), tl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: a,
    onOpenChange: i,
    modal: s = !0
  } = e, c = Ae(t), u = h.useRef(null), [l, d] = ct({
    prop: o,
    defaultProp: a ?? !1,
    onChange: i,
    caller: or
  });
  return /* @__PURE__ */ R(
    Pv,
    {
      scope: t,
      triggerId: je(),
      triggerRef: u,
      contentId: je(),
      open: l,
      onOpenChange: d,
      onOpenToggle: h.useCallback(() => d((p) => !p), [d]),
      modal: s,
      children: /* @__PURE__ */ R(dv, { ...c, open: l, onOpenChange: d, dir: r, modal: s, children: n })
    }
  );
};
tl.displayName = or;
var nl = "DropdownMenuTrigger", rl = h.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, a = el(nl, n), i = Ae(n);
    return /* @__PURE__ */ R(fv, { asChild: !0, ...i, children: /* @__PURE__ */ R(
      ce.button,
      {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: $t(t, a.triggerRef),
        onPointerDown: X(e.onPointerDown, (s) => {
          !r && s.button === 0 && s.ctrlKey === !1 && (a.onOpenToggle(), a.open || s.preventDefault());
        }),
        onKeyDown: X(e.onKeyDown, (s) => {
          r || (["Enter", " "].includes(s.key) && a.onOpenToggle(), s.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(s.key) && s.preventDefault());
        })
      }
    ) });
  }
);
rl.displayName = nl;
var Ov = "DropdownMenuPortal", ol = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ae(t);
  return /* @__PURE__ */ R(pv, { ...r, ...n });
};
ol.displayName = Ov;
var al = "DropdownMenuContent", il = h.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = el(al, n), a = Ae(n), i = h.useRef(!1);
    return /* @__PURE__ */ R(
      mv,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...a,
        ...r,
        ref: t,
        onCloseAutoFocus: X(e.onCloseAutoFocus, (s) => {
          var c;
          i.current || (c = o.triggerRef.current) == null || c.focus(), i.current = !1, s.preventDefault();
        }),
        onInteractOutside: X(e.onInteractOutside, (s) => {
          const c = s.detail.originalEvent, u = c.button === 0 && c.ctrlKey === !0, l = c.button === 2 || u;
          (!o.modal || l) && (i.current = !0);
        }),
        style: {
          ...e.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }
);
il.displayName = al;
var Av = "DropdownMenuGroup", Tv = h.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(hv, { ...o, ...r, ref: t });
  }
);
Tv.displayName = Av;
var Nv = "DropdownMenuLabel", Iv = h.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(gv, { ...o, ...r, ref: t });
  }
);
Iv.displayName = Nv;
var Mv = "DropdownMenuItem", Dv = h.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(vv, { ...o, ...r, ref: t });
  }
);
Dv.displayName = Mv;
var kv = "DropdownMenuCheckboxItem", Lv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(_v, { ...o, ...r, ref: t });
});
Lv.displayName = kv;
var jv = "DropdownMenuRadioGroup", Fv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(bv, { ...o, ...r, ref: t });
});
Fv.displayName = jv;
var $v = "DropdownMenuRadioItem", Hv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(yv, { ...o, ...r, ref: t });
});
Hv.displayName = $v;
var Uv = "DropdownMenuItemIndicator", Bv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(Ev, { ...o, ...r, ref: t });
});
Bv.displayName = Uv;
var Gv = "DropdownMenuSeparator", zv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(Rv, { ...o, ...r, ref: t });
});
zv.displayName = Gv;
var Vv = "DropdownMenuArrow", qv = h.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(wv, { ...o, ...r, ref: t });
  }
);
qv.displayName = Vv;
var Wv = "DropdownMenuSubTrigger", Xv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(Sv, { ...o, ...r, ref: t });
});
Xv.displayName = Wv;
var Kv = "DropdownMenuSubContent", Yv = h.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(
    xv,
    {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
});
Yv.displayName = Kv;
var Qv = tl, Zv = rl, Jv = ol, e_ = il;
function sl({ ...e }) {
  return /* @__PURE__ */ R(Qv, { "data-slot": "dropdown-menu", ...e });
}
function cl({ ...e }) {
  return /* @__PURE__ */ R(Zv, { "data-slot": "dropdown-menu-trigger", ...e });
}
function ul({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ R(Jv, { children: /* @__PURE__ */ R(
    e_,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: Ee(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
var ht = "NavigationMenu", [wa, ll, t_] = Ht(ht), [Mo, n_, r_] = Ht(ht), [Sa, Rb] = nt(
  ht,
  [t_, r_]
), [o_, ke] = Sa(ht), [a_, i_] = Sa(ht), dl = h.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      delayDuration: i = 200,
      skipDelayDuration: s = 300,
      orientation: c = "horizontal",
      dir: u,
      ...l
    } = e, [d, p] = h.useState(null), g = ge(t, (N) => p(N)), b = Un(u), f = h.useRef(0), _ = h.useRef(0), v = h.useRef(0), [w, m] = h.useState(!0), [y, E] = ct({
      prop: r,
      onChange: (N) => {
        const T = N !== "", M = s > 0;
        T ? (window.clearTimeout(v.current), M && m(!1)) : (window.clearTimeout(v.current), v.current = window.setTimeout(
          () => m(!0),
          s
        )), o == null || o(N);
      },
      defaultProp: a ?? "",
      caller: ht
    }), A = h.useCallback(() => {
      window.clearTimeout(_.current), _.current = window.setTimeout(() => E(""), 150);
    }, [E]), C = h.useCallback(
      (N) => {
        window.clearTimeout(_.current), E(N);
      },
      [E]
    ), O = h.useCallback(
      (N) => {
        y === N ? window.clearTimeout(_.current) : f.current = window.setTimeout(() => {
          window.clearTimeout(_.current), E(N);
        }, i);
      },
      [y, E, i]
    );
    return h.useEffect(() => () => {
      window.clearTimeout(f.current), window.clearTimeout(_.current), window.clearTimeout(v.current);
    }, []), /* @__PURE__ */ R(
      fl,
      {
        scope: n,
        isRootMenu: !0,
        value: y,
        dir: b,
        orientation: c,
        rootNavigationMenu: d,
        onTriggerEnter: (N) => {
          window.clearTimeout(f.current), w ? O(N) : C(N);
        },
        onTriggerLeave: () => {
          window.clearTimeout(f.current), A();
        },
        onContentEnter: () => window.clearTimeout(_.current),
        onContentLeave: A,
        onItemSelect: (N) => {
          E((T) => T === N ? "" : N);
        },
        onItemDismiss: () => E(""),
        children: /* @__PURE__ */ R(
          ce.nav,
          {
            "aria-label": "Main",
            "data-orientation": c,
            dir: b,
            ...l,
            ref: g
          }
        )
      }
    );
  }
);
dl.displayName = ht;
var Do = "NavigationMenuSub", s_ = h.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: i = "horizontal",
      ...s
    } = e, c = ke(Do, n), [u, l] = ct({
      prop: r,
      onChange: o,
      defaultProp: a ?? "",
      caller: Do
    });
    return /* @__PURE__ */ R(
      fl,
      {
        scope: n,
        isRootMenu: !1,
        value: u,
        dir: c.dir,
        orientation: i,
        rootNavigationMenu: c.rootNavigationMenu,
        onTriggerEnter: (d) => l(d),
        onItemSelect: (d) => l(d),
        onItemDismiss: () => l(""),
        children: /* @__PURE__ */ R(ce.div, { "data-orientation": i, ...s, ref: t })
      }
    );
  }
);
s_.displayName = Do;
var fl = (e) => {
  const {
    scope: t,
    isRootMenu: n,
    rootNavigationMenu: r,
    dir: o,
    orientation: a,
    children: i,
    value: s,
    onItemSelect: c,
    onItemDismiss: u,
    onTriggerEnter: l,
    onTriggerLeave: d,
    onContentEnter: p,
    onContentLeave: g
  } = e, [b, f] = h.useState(null), [_, v] = h.useState(/* @__PURE__ */ new Map()), [w, m] = h.useState(null);
  return /* @__PURE__ */ R(
    o_,
    {
      scope: t,
      isRootMenu: n,
      rootNavigationMenu: r,
      value: s,
      previousValue: Mc(s),
      baseId: je(),
      dir: o,
      orientation: a,
      viewport: b,
      onViewportChange: f,
      indicatorTrack: w,
      onIndicatorTrackChange: m,
      onTriggerEnter: Ce(l),
      onTriggerLeave: Ce(d),
      onContentEnter: Ce(p),
      onContentLeave: Ce(g),
      onItemSelect: Ce(c),
      onItemDismiss: Ce(u),
      onViewportContentChange: h.useCallback((y, E) => {
        v((A) => (A.set(y, E), new Map(A)));
      }, []),
      onViewportContentRemove: h.useCallback((y) => {
        v((E) => E.has(y) ? (E.delete(y), new Map(E)) : E);
      }, []),
      children: /* @__PURE__ */ R(wa.Provider, { scope: t, children: /* @__PURE__ */ R(a_, { scope: t, items: _, children: i }) })
    }
  );
}, pl = "NavigationMenuList", ml = h.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = ke(pl, n), a = /* @__PURE__ */ R(ce.ul, { "data-orientation": o.orientation, ...r, ref: t });
    return /* @__PURE__ */ R(ce.div, { style: { position: "relative" }, ref: o.onIndicatorTrackChange, children: /* @__PURE__ */ R(wa.Slot, { scope: n, children: o.isRootMenu ? /* @__PURE__ */ R(El, { asChild: !0, children: a }) : a }) });
  }
);
ml.displayName = pl;
var hl = "NavigationMenuItem", [c_, gl] = Sa(hl), vl = h.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, value: r, ...o } = e, a = je(), i = r || a || "LEGACY_REACT_AUTO_VALUE", s = h.useRef(null), c = h.useRef(null), u = h.useRef(null), l = h.useRef(() => {
    }), d = h.useRef(!1), p = h.useCallback((b = "start") => {
      if (s.current) {
        l.current();
        const f = Lo(s.current);
        f.length && Pa(b === "start" ? f : f.reverse());
      }
    }, []), g = h.useCallback(() => {
      if (s.current) {
        const b = Lo(s.current);
        b.length && (l.current = __(b));
      }
    }, []);
    return /* @__PURE__ */ R(
      c_,
      {
        scope: n,
        value: i,
        triggerRef: c,
        contentRef: s,
        focusProxyRef: u,
        wasEscapeCloseRef: d,
        onEntryKeyDown: p,
        onFocusProxyEnter: p,
        onRootContentClose: g,
        onContentFocusOutside: g,
        children: /* @__PURE__ */ R(ce.li, { ...o, ref: t })
      }
    );
  }
);
vl.displayName = hl;
var ko = "NavigationMenuTrigger", u_ = h.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, disabled: r, ...o } = e, a = ke(ko, e.__scopeNavigationMenu), i = gl(ko, e.__scopeNavigationMenu), s = h.useRef(null), c = ge(s, i.triggerRef, t), u = wl(a.baseId, i.value), l = Sl(a.baseId, i.value), d = h.useRef(!1), p = h.useRef(!1), g = i.value === a.value;
  return /* @__PURE__ */ be(Ze, { children: [
    /* @__PURE__ */ R(wa.ItemSlot, { scope: n, value: i.value, children: /* @__PURE__ */ R(Rl, { asChild: !0, children: /* @__PURE__ */ R(
      ce.button,
      {
        id: u,
        disabled: r,
        "data-disabled": r ? "" : void 0,
        "data-state": Oa(g),
        "aria-expanded": g,
        "aria-controls": l,
        ...o,
        ref: c,
        onPointerEnter: X(e.onPointerEnter, () => {
          p.current = !1, i.wasEscapeCloseRef.current = !1;
        }),
        onPointerMove: X(
          e.onPointerMove,
          Dn(() => {
            r || p.current || i.wasEscapeCloseRef.current || d.current || (a.onTriggerEnter(i.value), d.current = !0);
          })
        ),
        onPointerLeave: X(
          e.onPointerLeave,
          Dn(() => {
            r || (a.onTriggerLeave(), d.current = !1);
          })
        ),
        onClick: X(e.onClick, () => {
          a.onItemSelect(i.value), p.current = g;
        }),
        onKeyDown: X(e.onKeyDown, (b) => {
          const _ = { horizontal: "ArrowDown", vertical: a.dir === "rtl" ? "ArrowLeft" : "ArrowRight" }[a.orientation];
          g && b.key === _ && (i.onEntryKeyDown(), b.preventDefault());
        })
      }
    ) }) }),
    g && /* @__PURE__ */ be(Ze, { children: [
      /* @__PURE__ */ R(
        bm,
        {
          "aria-hidden": !0,
          tabIndex: 0,
          ref: i.focusProxyRef,
          onFocus: (b) => {
            const f = i.contentRef.current, _ = b.relatedTarget, v = _ === s.current, w = f == null ? void 0 : f.contains(_);
            (v || !w) && i.onFocusProxyEnter(v ? "start" : "end");
          }
        }
      ),
      a.viewport && /* @__PURE__ */ R("span", { "aria-owns": l })
    ] })
  ] });
});
u_.displayName = ko;
var l_ = "NavigationMenuLink", ls = "navigationMenu.linkSelect", _l = h.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, active: r, onSelect: o, ...a } = e;
    return /* @__PURE__ */ R(Rl, { asChild: !0, children: /* @__PURE__ */ R(
      ce.a,
      {
        "data-active": r ? "" : void 0,
        "aria-current": r ? "page" : void 0,
        ...a,
        ref: t,
        onClick: X(
          e.onClick,
          (i) => {
            const s = i.target, c = new CustomEvent(ls, {
              bubbles: !0,
              cancelable: !0
            });
            if (s.addEventListener(ls, (u) => o == null ? void 0 : o(u), { once: !0 }), Cn(s, c), !c.defaultPrevented && !i.metaKey) {
              const u = new CustomEvent(xn, {
                bubbles: !0,
                cancelable: !0
              });
              Cn(s, u);
            }
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
_l.displayName = l_;
var xa = "NavigationMenuIndicator", d_ = h.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = ke(xa, e.__scopeNavigationMenu), a = !!o.value;
  return o.indicatorTrack ? Qo.createPortal(
    /* @__PURE__ */ R(De, { present: n || a, children: /* @__PURE__ */ R(f_, { ...r, ref: t }) }),
    o.indicatorTrack
  ) : null;
});
d_.displayName = xa;
var f_ = h.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, ...r } = e, o = ke(xa, n), a = ll(n), [i, s] = h.useState(
    null
  ), [c, u] = h.useState(null), l = o.orientation === "horizontal", d = !!o.value;
  h.useEffect(() => {
    var f;
    const b = (f = a().find((_) => _.value === o.value)) == null ? void 0 : f.ref.current;
    b && s(b);
  }, [a, o.value]);
  const p = () => {
    i && u({
      size: l ? i.offsetWidth : i.offsetHeight,
      offset: l ? i.offsetLeft : i.offsetTop
    });
  };
  return jo(i, p), jo(o.indicatorTrack, p), c ? /* @__PURE__ */ R(
    ce.div,
    {
      "aria-hidden": !0,
      "data-state": d ? "visible" : "hidden",
      "data-orientation": o.orientation,
      ...r,
      ref: t,
      style: {
        position: "absolute",
        ...l ? {
          left: 0,
          width: c.size + "px",
          transform: `translateX(${c.offset}px)`
        } : {
          top: 0,
          height: c.size + "px",
          transform: `translateY(${c.offset}px)`
        },
        ...r.style
      }
    }
  ) : null;
}), wt = "NavigationMenuContent", p_ = h.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = ke(wt, e.__scopeNavigationMenu), a = gl(wt, e.__scopeNavigationMenu), i = ge(a.contentRef, t), s = a.value === o.value, c = {
    value: a.value,
    triggerRef: a.triggerRef,
    focusProxyRef: a.focusProxyRef,
    wasEscapeCloseRef: a.wasEscapeCloseRef,
    onContentFocusOutside: a.onContentFocusOutside,
    onRootContentClose: a.onRootContentClose,
    ...r
  };
  return o.viewport ? /* @__PURE__ */ R(m_, { forceMount: n, ...c, ref: i }) : /* @__PURE__ */ R(De, { present: n || s, children: /* @__PURE__ */ R(
    bl,
    {
      "data-state": Oa(s),
      ...c,
      ref: i,
      onPointerEnter: X(e.onPointerEnter, o.onContentEnter),
      onPointerLeave: X(
        e.onPointerLeave,
        Dn(o.onContentLeave)
      ),
      style: {
        // Prevent interaction when animating out
        pointerEvents: !s && o.isRootMenu ? "none" : void 0,
        ...c.style
      }
    }
  ) });
});
p_.displayName = wt;
var m_ = h.forwardRef((e, t) => {
  const n = ke(wt, e.__scopeNavigationMenu), { onViewportContentChange: r, onViewportContentRemove: o } = n;
  return xe(() => {
    r(e.value, {
      ref: t,
      ...e
    });
  }, [e, t, r]), xe(() => () => o(e.value), [e.value, o]), null;
}), xn = "navigationMenu.rootContentDismiss", bl = h.forwardRef((e, t) => {
  const {
    __scopeNavigationMenu: n,
    value: r,
    triggerRef: o,
    focusProxyRef: a,
    wasEscapeCloseRef: i,
    onRootContentClose: s,
    onContentFocusOutside: c,
    ...u
  } = e, l = ke(wt, n), d = h.useRef(null), p = ge(d, t), g = wl(l.baseId, r), b = Sl(l.baseId, r), f = ll(n), _ = h.useRef(null), { onItemDismiss: v } = l;
  h.useEffect(() => {
    const m = d.current;
    if (l.isRootMenu && m) {
      const y = () => {
        var E;
        v(), s(), m.contains(document.activeElement) && ((E = o.current) == null || E.focus());
      };
      return m.addEventListener(xn, y), () => m.removeEventListener(xn, y);
    }
  }, [l.isRootMenu, e.value, o, v, s]);
  const w = h.useMemo(() => {
    const y = f().map((T) => T.value);
    l.dir === "rtl" && y.reverse();
    const E = y.indexOf(l.value), A = y.indexOf(l.previousValue), C = r === l.value, O = A === y.indexOf(r);
    if (!C && !O) return _.current;
    const N = (() => {
      if (E !== A) {
        if (C && A !== -1) return E > A ? "from-end" : "from-start";
        if (O && E !== -1) return E > A ? "to-start" : "to-end";
      }
      return null;
    })();
    return _.current = N, N;
  }, [l.previousValue, l.value, l.dir, f, r]);
  return /* @__PURE__ */ R(El, { asChild: !0, children: /* @__PURE__ */ R(
    Ut,
    {
      id: b,
      "aria-labelledby": g,
      "data-motion": w,
      "data-orientation": l.orientation,
      ...u,
      ref: p,
      disableOutsidePointerEvents: !1,
      onDismiss: () => {
        var y;
        const m = new Event(xn, {
          bubbles: !0,
          cancelable: !0
        });
        (y = d.current) == null || y.dispatchEvent(m);
      },
      onFocusOutside: X(e.onFocusOutside, (m) => {
        var E;
        c();
        const y = m.target;
        (E = l.rootNavigationMenu) != null && E.contains(y) && m.preventDefault();
      }),
      onPointerDownOutside: X(e.onPointerDownOutside, (m) => {
        var C;
        const y = m.target, E = f().some((O) => {
          var N;
          return (N = O.ref.current) == null ? void 0 : N.contains(y);
        }), A = l.isRootMenu && ((C = l.viewport) == null ? void 0 : C.contains(y));
        (E || A || !l.isRootMenu) && m.preventDefault();
      }),
      onKeyDown: X(e.onKeyDown, (m) => {
        var A;
        const y = m.altKey || m.ctrlKey || m.metaKey;
        if (m.key === "Tab" && !y) {
          const C = Lo(m.currentTarget), O = document.activeElement, N = C.findIndex((k) => k === O), M = m.shiftKey ? C.slice(0, N).reverse() : C.slice(N + 1, C.length);
          Pa(M) ? m.preventDefault() : (A = a.current) == null || A.focus();
        }
      }),
      onEscapeKeyDown: X(e.onEscapeKeyDown, (m) => {
        i.current = !0;
      })
    }
  ) });
}), Ca = "NavigationMenuViewport", yl = h.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, a = !!ke(Ca, e.__scopeNavigationMenu).value;
  return /* @__PURE__ */ R(De, { present: n || a, children: /* @__PURE__ */ R(h_, { ...r, ref: t }) });
});
yl.displayName = Ca;
var h_ = h.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, children: r, ...o } = e, a = ke(Ca, n), i = ge(t, a.onViewportChange), s = i_(
    wt,
    e.__scopeNavigationMenu
  ), [c, u] = h.useState(null), [l, d] = h.useState(null), p = c ? (c == null ? void 0 : c.width) + "px" : void 0, g = c ? (c == null ? void 0 : c.height) + "px" : void 0, b = !!a.value, f = b ? a.value : a.previousValue;
  return jo(l, () => {
    l && u({ width: l.offsetWidth, height: l.offsetHeight });
  }), /* @__PURE__ */ R(
    ce.div,
    {
      "data-state": Oa(b),
      "data-orientation": a.orientation,
      ...o,
      ref: i,
      style: {
        // Prevent interaction when animating out
        pointerEvents: !b && a.isRootMenu ? "none" : void 0,
        "--radix-navigation-menu-viewport-width": p,
        "--radix-navigation-menu-viewport-height": g,
        ...o.style
      },
      onPointerEnter: X(e.onPointerEnter, a.onContentEnter),
      onPointerLeave: X(e.onPointerLeave, Dn(a.onContentLeave)),
      children: Array.from(s.items).map(([v, { ref: w, forceMount: m, ...y }]) => {
        const E = f === v;
        return /* @__PURE__ */ R(De, { present: m || E, children: /* @__PURE__ */ R(
          bl,
          {
            ...y,
            ref: $t(w, (A) => {
              E && A && d(A);
            })
          }
        ) }, v);
      })
    }
  );
}), g_ = "FocusGroup", El = h.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = ke(g_, n);
    return /* @__PURE__ */ R(Mo.Provider, { scope: n, children: /* @__PURE__ */ R(Mo.Slot, { scope: n, children: /* @__PURE__ */ R(ce.div, { dir: o.dir, ...r, ref: t }) }) });
  }
), ds = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"], v_ = "FocusGroupItem", Rl = h.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = n_(n), a = ke(v_, n);
    return /* @__PURE__ */ R(Mo.ItemSlot, { scope: n, children: /* @__PURE__ */ R(
      ce.button,
      {
        ...r,
        ref: t,
        onKeyDown: X(e.onKeyDown, (i) => {
          if (["Home", "End", ...ds].includes(i.key)) {
            let c = o().map((d) => d.ref.current);
            if ([a.dir === "rtl" ? "ArrowRight" : "ArrowLeft", "ArrowUp", "End"].includes(i.key) && c.reverse(), ds.includes(i.key)) {
              const d = c.indexOf(i.currentTarget);
              c = c.slice(d + 1);
            }
            setTimeout(() => Pa(c)), i.preventDefault();
          }
        })
      }
    ) });
  }
);
function Lo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Pa(e) {
  const t = document.activeElement;
  return e.some((n) => n === t ? !0 : (n.focus(), document.activeElement !== t));
}
function __(e) {
  return e.forEach((t) => {
    t.dataset.tabindex = t.getAttribute("tabindex") || "", t.setAttribute("tabindex", "-1");
  }), () => {
    e.forEach((t) => {
      const n = t.dataset.tabindex;
      t.setAttribute("tabindex", n);
    });
  };
}
function jo(e, t) {
  const n = Ce(t);
  xe(() => {
    let r = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return o.observe(e), () => {
        window.cancelAnimationFrame(r), o.unobserve(e);
      };
    }
  }, [e, n]);
}
function Oa(e) {
  return e ? "open" : "closed";
}
function wl(e, t) {
  return `${e}-trigger-${t}`;
}
function Sl(e, t) {
  return `${e}-content-${t}`;
}
function Dn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var b_ = dl, y_ = ml, E_ = vl, R_ = _l, w_ = yl;
function xl({
  className: e,
  children: t,
  viewport: n = !0,
  ...r
}) {
  return /* @__PURE__ */ be(
    b_,
    {
      "data-slot": "navigation-menu",
      "data-viewport": n,
      className: Ee("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", e),
      ...r,
      children: [
        t,
        n && /* @__PURE__ */ R(S_, {})
      ]
    }
  );
}
function Cl({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    y_,
    {
      "data-slot": "navigation-menu-list",
      className: Ee("group flex flex-1 list-none items-center justify-center gap-1", e),
      ...t
    }
  );
}
function Pl({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    E_,
    {
      "data-slot": "navigation-menu-item",
      className: Ee("relative", e),
      ...t
    }
  );
}
const kn = Vs(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function S_({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R("div", { className: Ee("absolute top-full left-0 isolate z-50 flex justify-center"), children: /* @__PURE__ */ R(
    w_,
    {
      "data-slot": "navigation-menu-viewport",
      className: Ee(
        "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
        e
      ),
      ...t
    }
  ) });
}
function Aa({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    R_,
    {
      "data-slot": "navigation-menu-link",
      className: Ee(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...t
    }
  );
}
var Fo = { exports: {} }, Ol = {};
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
      return i;
    },
    LayoutRouterContext: function() {
      return a;
    },
    MissingSlotContext: function() {
      return c;
    },
    TemplateContext: function() {
      return s;
    }
  });
  const r = /* @__PURE__ */ Ke._(le), o = r.default.createContext(null), a = r.default.createContext(null), i = r.default.createContext(null), s = r.default.createContext(null);
  process.env.NODE_ENV !== "production" && (o.displayName = "AppRouterContext", a.displayName = "LayoutRouterContext", i.displayName = "GlobalLayoutRouterContext", s.displayName = "TemplateContext");
  const c = r.default.createContext(/* @__PURE__ */ new Set());
})(Ol);
var Al = {};
(function(e) {
  "use client";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(i, s) {
    for (var c in s) Object.defineProperty(i, c, {
      enumerable: !0,
      get: s[c]
    });
  }
  t(e, {
    PathParamsContext: function() {
      return a;
    },
    PathnameContext: function() {
      return o;
    },
    SearchParamsContext: function() {
      return r;
    }
  });
  const n = le, r = (0, n.createContext)(null), o = (0, n.createContext)(null), a = (0, n.createContext)(null);
  process.env.NODE_ENV !== "production" && (r.displayName = "SearchParamsContext", o.displayName = "PathnameContext", a.displayName = "PathParamsContext");
})(Al);
var $o = { exports: {} };
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
})($o, $o.exports);
var x_ = $o.exports, Ho = { exports: {} }, Uo = { exports: {} }, Bo = { exports: {} };
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
})(Bo, Bo.exports);
var Tl = Bo.exports, Go = { exports: {} };
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
      return a;
    },
    isRedirectError: function() {
      return i;
    }
  });
  const r = Tl, o = "NEXT_REDIRECT";
  var a = /* @__PURE__ */ function(s) {
    return s.push = "push", s.replace = "replace", s;
  }({});
  function i(s) {
    if (typeof s != "object" || s === null || !("digest" in s) || typeof s.digest != "string")
      return !1;
    const c = s.digest.split(";"), [u, l] = c, d = c.slice(2, -2).join(";"), p = c.at(-2), g = Number(p);
    return u === o && (l === "replace" || l === "push") && typeof d == "string" && !isNaN(g) && g in r.RedirectStatusCode;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Go, Go.exports);
var Ta = Go.exports, eo = {}, to = {}, no = {}, fs;
function Na() {
  return fs || (fs = 1, function(e) {
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
        return i;
      },
      createAsyncLocalStorage: function() {
        return a;
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
    function a() {
      return o ? new o() : new r();
    }
    function i(c) {
      return o ? o.bind(c) : r.bind(c);
    }
    function s() {
      return o ? o.snapshot() : function(c, ...u) {
        return c(...u);
      };
    }
  }(no)), no;
}
var ps;
function C_() {
  return ps || (ps = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "actionAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, Na().createAsyncLocalStorage)();
  }(to)), to;
}
var ms;
function P_() {
  return ms || (ms = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "actionAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.actionAsyncStorageInstance;
      }
    });
    const t = C_();
  }(eo)), eo;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(p, g) {
    for (var b in g) Object.defineProperty(p, b, {
      enumerable: !0,
      get: g[b]
    });
  }
  n(t, {
    getRedirectError: function() {
      return i;
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
  const r = Tl, o = Ta, a = typeof window > "u" ? P_().actionAsyncStorage : void 0;
  function i(p, g, b) {
    b === void 0 && (b = r.RedirectStatusCode.TemporaryRedirect);
    const f = Object.defineProperty(new Error(o.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    return f.digest = o.REDIRECT_ERROR_CODE + ";" + g + ";" + p + ";" + b + ";", f;
  }
  function s(p, g) {
    var b;
    throw g ?? (g = !(a == null || (b = a.getStore()) == null) && b.isAction ? o.RedirectType.push : o.RedirectType.replace), i(p, g, r.RedirectStatusCode.TemporaryRedirect);
  }
  function c(p, g) {
    throw g === void 0 && (g = o.RedirectType.replace), i(p, g, r.RedirectStatusCode.PermanentRedirect);
  }
  function u(p) {
    return (0, o.isRedirectError)(p) ? p.digest.split(";").slice(2, -2).join(";") : null;
  }
  function l(p) {
    if (!(0, o.isRedirectError)(p))
      throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
        value: "E260",
        enumerable: !1,
        configurable: !0
      });
    return p.digest.split(";", 2)[1];
  }
  function d(p) {
    if (!(0, o.isRedirectError)(p))
      throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
        value: "E260",
        enumerable: !1,
        configurable: !0
      });
    return Number(p.digest.split(";").at(-2));
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Uo, Uo.exports);
var O_ = Uo.exports, zo = { exports: {} }, Vo = { exports: {} };
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
      return a;
    },
    getAccessFallbackErrorTypeByStatus: function() {
      return c;
    },
    getAccessFallbackHTTPStatus: function() {
      return s;
    },
    isHTTPAccessFallbackError: function() {
      return i;
    }
  });
  const r = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
  }, o = new Set(Object.values(r)), a = "NEXT_HTTP_ERROR_FALLBACK";
  function i(u) {
    if (typeof u != "object" || u === null || !("digest" in u) || typeof u.digest != "string")
      return !1;
    const [l, d] = u.digest.split(";");
    return l === a && o.has(Number(d));
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
})(Vo, Vo.exports);
var ar = Vo.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "notFound", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + ar.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
  function o() {
    const a = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw a.digest = r, a;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(zo, zo.exports);
var A_ = zo.exports, qo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "forbidden", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + ar.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
  function o() {
    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS)
      throw Object.defineProperty(new Error("`forbidden()` is experimental and only allowed to be enabled when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
        value: "E488",
        enumerable: !1,
        configurable: !0
      });
    const a = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw a.digest = r, a;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(qo, qo.exports);
var T_ = qo.exports, Wo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "unauthorized", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + ar.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
  function o() {
    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS)
      throw Object.defineProperty(new Error("`unauthorized()` is experimental and only allowed to be used when `experimental.authInterrupts` is enabled."), "__NEXT_ERROR_CODE", {
        value: "E411",
        enumerable: !1,
        configurable: !0
      });
    const a = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw a.digest = r, a;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Wo, Wo.exports);
var N_ = Wo.exports, Xo = { exports: {} }, mn = { exports: {} }, ro = {}, hs;
function Nl() {
  return hs || (hs = 1, function(e) {
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
        return i;
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
    const a = /* @__PURE__ */ new WeakMap();
    function i(c, u) {
      if (c.aborted)
        return Promise.reject(new o(u));
      {
        const l = new Promise((d, p) => {
          const g = p.bind(null, new o(u));
          let b = a.get(c);
          if (b)
            b.push(g);
          else {
            const f = [
              g
            ];
            a.set(c, f), c.addEventListener("abort", () => {
              for (let _ = 0; _ < f.length; _++)
                f[_]();
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
  }(ro)), ro;
}
var oo = {}, gs;
function I_() {
  return gs || (gs = 1, function(e) {
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
  }(oo)), oo;
}
var ao = {}, vs;
function Ia() {
  return vs || (vs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, i) {
      for (var s in i) Object.defineProperty(a, s, {
        enumerable: !0,
        get: i[s]
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
      constructor(i) {
        super("Bail out to client-side rendering: " + i), this.reason = i, this.digest = n;
      }
    }
    function o(a) {
      return typeof a != "object" || a === null || !("digest" in a) ? !1 : a.digest === n;
    }
  }(ao)), ao;
}
var hn = { exports: {} }, _s;
function Il() {
  return _s || (_s = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "isNextRouterError", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = ar, r = Ta;
    function o(a) {
      return (0, r.isRedirectError)(a) || (0, n.isHTTPAccessFallbackError)(a);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(hn, hn.exports)), hn.exports;
}
var io = {}, gn = { exports: {} }, bs;
function Ml() {
  return bs || (bs = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    n(t, {
      DynamicServerError: function() {
        return o;
      },
      isDynamicServerError: function() {
        return a;
      }
    });
    const r = "DYNAMIC_SERVER_USAGE";
    class o extends Error {
      constructor(s) {
        super("Dynamic server usage: " + s), this.description = s, this.digest = r;
      }
    }
    function a(i) {
      return typeof i != "object" || i === null || !("digest" in i) || typeof i.digest != "string" ? !1 : i.digest === r;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(gn, gn.exports)), gn.exports;
}
var vn = { exports: {} }, ys;
function M_() {
  return ys || (ys = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
        enumerable: !0,
        get: s[c]
      });
    }
    n(t, {
      StaticGenBailoutError: function() {
        return o;
      },
      isStaticGenBailoutError: function() {
        return a;
      }
    });
    const r = "NEXT_STATIC_GEN_BAILOUT";
    class o extends Error {
      constructor(...s) {
        super(...s), this.code = r;
      }
    }
    function a(i) {
      return typeof i != "object" || i === null || !("code" in i) ? !1 : i.code === r;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(vn, vn.exports)), vn.exports;
}
var so = {}, co = {}, Es;
function D_() {
  return Es || (Es = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workUnitAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, Na().createAsyncLocalStorage)();
  }(co)), co;
}
var _n = { exports: {} }, Rs;
function k_() {
  return Rs || (Rs = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    function n(m, y) {
      for (var E in y) Object.defineProperty(m, E, {
        enumerable: !0,
        get: y[E]
      });
    }
    n(t, {
      ACTION_HEADER: function() {
        return o;
      },
      FLIGHT_HEADERS: function() {
        return p;
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
        return _;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function() {
        return v;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function() {
        return i;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return s;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return b;
      },
      NEXT_ROUTER_STATE_TREE_HEADER: function() {
        return a;
      },
      NEXT_RSC_UNION_QUERY: function() {
        return g;
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
    const r = "RSC", o = "Next-Action", a = "Next-Router-State-Tree", i = "Next-Router-Prefetch", s = "Next-Router-Segment-Prefetch", c = "Next-HMR-Refresh", u = "__next_hmr_refresh_hash__", l = "Next-Url", d = "text/x-component", p = [
      r,
      a,
      i,
      c,
      s
    ], g = "_rsc", b = "x-nextjs-stale-time", f = "x-nextjs-postponed", _ = "x-nextjs-rewritten-path", v = "x-nextjs-rewritten-query", w = "x-nextjs-prerender";
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(_n, _n.exports)), _n.exports;
}
var ws;
function L_() {
  return ws || (ws = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(l, d) {
      for (var p in d) Object.defineProperty(l, p, {
        enumerable: !0,
        get: d[p]
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
        return i;
      },
      getRenderResumeDataCache: function() {
        return s;
      },
      throwForMissingRequestStore: function() {
        return a;
      },
      workUnitAsyncStorage: function() {
        return n.workUnitAsyncStorageInstance;
      }
    });
    const n = D_(), r = k_();
    function o(l) {
      const d = n.workUnitAsyncStorageInstance.getStore();
      switch (d || a(l), d.type) {
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
    function a(l) {
      throw Object.defineProperty(new Error(`\`${l}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
        value: "E251",
        enumerable: !1,
        configurable: !0
      });
    }
    function i(l) {
      return l.type === "prerender" || l.type === "prerender-ppr" ? l.prerenderResumeDataCache : null;
    }
    function s(l) {
      return l.type !== "prerender-legacy" && l.type !== "cache" && l.type !== "unstable-cache" ? l.type === "request" ? l.renderResumeDataCache : l.prerenderResumeDataCache : null;
    }
    function c(l, d) {
      var p;
      if (l.dev)
        return d.type === "cache" || d.type === "prerender" ? d.hmrRefreshHash : d.type === "request" ? (p = d.cookies.get(r.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : p.value : void 0;
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
  }(so)), so;
}
var uo = {}, lo = {}, Ss;
function j_() {
  return Ss || (Ss = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, Na().createAsyncLocalStorage)();
  }(lo)), lo;
}
var xs;
function Dl() {
  return xs || (xs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.workAsyncStorageInstance;
      }
    });
    const t = j_();
  }(uo)), uo;
}
var fo = {}, Cs;
function F_() {
  return Cs || (Cs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(a, i) {
      for (var s in i) Object.defineProperty(a, s, {
        enumerable: !0,
        get: i[s]
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
  }(fo)), fo;
}
var po = {}, Ps;
function $_() {
  return Ps || (Ps = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(i, s) {
      for (var c in s) Object.defineProperty(i, c, {
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
        return a;
      }
    });
    const n = (i) => {
      Promise.resolve().then(() => {
        process.env.NEXT_RUNTIME === "edge" ? setTimeout(i, 0) : process.nextTick(i);
      });
    }, r = (i) => {
      process.env.NEXT_RUNTIME === "edge" ? setTimeout(i, 0) : setImmediate(i);
    };
    function o() {
      return new Promise((i) => r(i));
    }
    function a() {
      return process.env.NEXT_RUNTIME === "edge" ? new Promise((i) => setTimeout(i, 0)) : new Promise((i) => setImmediate(i));
    }
  }(po)), po;
}
var Os;
function kl() {
  return Os || (Os = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(S, x) {
      for (var H in x) Object.defineProperty(S, H, {
        enumerable: !0,
        get: x[H]
      });
    }
    t(e, {
      Postpone: function() {
        return O;
      },
      abortAndThrowOnSynchronousRequestDataAccess: function() {
        return A;
      },
      abortOnSynchronousPlatformIOAccess: function() {
        return y;
      },
      accessedDynamicData: function() {
        return F;
      },
      annotateDynamicAccess: function() {
        return re;
      },
      consumeDynamicAccess: function() {
        return Z;
      },
      createDynamicTrackingState: function() {
        return p;
      },
      createDynamicValidationState: function() {
        return g;
      },
      createHangingInputAbortSignal: function() {
        return se;
      },
      createPostponedAbortSignal: function() {
        return K;
      },
      formatDynamicAPIAccesses: function() {
        return I;
      },
      getFirstDynamicReason: function() {
        return b;
      },
      isDynamicPostpone: function() {
        return M;
      },
      isPrerenderInterruptedError: function() {
        return G;
      },
      markCurrentScopeAsDynamic: function() {
        return f;
      },
      postponeWithTracking: function() {
        return N;
      },
      throwIfDisallowedDynamic: function() {
        return Y;
      },
      throwToInterruptStaticGeneration: function() {
        return v;
      },
      trackAllowedDynamicAccess: function() {
        return te;
      },
      trackDynamicDataInDynamicRender: function() {
        return w;
      },
      trackFallbackParamAccessed: function() {
        return _;
      },
      trackSynchronousPlatformIOAccessInDev: function() {
        return E;
      },
      trackSynchronousRequestDataAccessInDev: function() {
        return C;
      },
      useDynamicRouteParams: function() {
        return ne;
      }
    });
    const n = /* @__PURE__ */ l(le), r = Ml(), o = M_(), a = L_(), i = Dl(), s = Nl(), c = F_(), u = $_();
    function l(S) {
      return S && S.__esModule ? S : {
        default: S
      };
    }
    const d = typeof n.default.unstable_postpone == "function";
    function p(S) {
      return {
        isDebugDynamicAccesses: S,
        dynamicAccesses: [],
        syncDynamicExpression: void 0,
        syncDynamicErrorWithStack: null
      };
    }
    function g() {
      return {
        hasSuspendedDynamic: !1,
        hasDynamicMetadata: !1,
        hasDynamicViewport: !1,
        hasSyncDynamicErrors: !1,
        dynamicErrors: []
      };
    }
    function b(S) {
      var x;
      return (x = S.dynamicAccesses[0]) == null ? void 0 : x.expression;
    }
    function f(S, x, H) {
      if (!(x && (x.type === "cache" || x.type === "unstable-cache")) && !(S.forceDynamic || S.forceStatic)) {
        if (S.dynamicShouldError)
          throw Object.defineProperty(new o.StaticGenBailoutError(`Route ${S.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${H}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (x)
          if (x.type === "prerender-ppr")
            N(S.route, H, x.dynamicTracking);
          else if (x.type === "prerender-legacy") {
            x.revalidate = 0;
            const $ = Object.defineProperty(new r.DynamicServerError(`Route ${S.route} couldn't be rendered statically because it used ${H}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E550",
              enumerable: !1,
              configurable: !0
            });
            throw S.dynamicUsageDescription = H, S.dynamicUsageStack = $.stack, $;
          } else process.env.NODE_ENV === "development" && x && x.type === "request" && (x.usedDynamic = !0);
      }
    }
    function _(S, x) {
      const H = a.workUnitAsyncStorage.getStore();
      !H || H.type !== "prerender-ppr" || N(S.route, x, H.dynamicTracking);
    }
    function v(S, x, H) {
      const $ = Object.defineProperty(new r.DynamicServerError(`Route ${x.route} couldn't be rendered statically because it used \`${S}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: !1,
        configurable: !0
      });
      throw H.revalidate = 0, x.dynamicUsageDescription = S, x.dynamicUsageStack = $.stack, $;
    }
    function w(S, x) {
      if (x) {
        if (x.type === "cache" || x.type === "unstable-cache")
          return;
        (x.type === "prerender" || x.type === "prerender-legacy") && (x.revalidate = 0), process.env.NODE_ENV === "development" && x.type === "request" && (x.usedDynamic = !0);
      }
    }
    function m(S, x, H) {
      const $ = `Route ${S} needs to bail out of prerendering at this point because it used ${x}.`, U = j($);
      H.controller.abort(U);
      const W = H.dynamicTracking;
      W && W.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: W.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: x
      });
    }
    function y(S, x, H, $) {
      const U = $.dynamicTracking;
      U && U.syncDynamicErrorWithStack === null && (U.syncDynamicExpression = x, U.syncDynamicErrorWithStack = H), m(S, x, $);
    }
    function E(S) {
      S.prerenderPhase = !1;
    }
    function A(S, x, H, $) {
      if ($.controller.signal.aborted === !1) {
        const W = $.dynamicTracking;
        W && W.syncDynamicErrorWithStack === null && (W.syncDynamicExpression = x, W.syncDynamicErrorWithStack = H, $.validating === !0 && (W.syncDynamicLogged = !0)), m(S, x, $);
      }
      throw j(`Route ${S} needs to bail out of prerendering at this point because it used ${x}.`);
    }
    const C = E;
    function O({ reason: S, route: x }) {
      const H = a.workUnitAsyncStorage.getStore(), $ = H && H.type === "prerender-ppr" ? H.dynamicTracking : null;
      N(x, S, $);
    }
    function N(S, x, H) {
      D(), H && H.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: H.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: x
      }), n.default.unstable_postpone(T(S, x));
    }
    function T(S, x) {
      return `Route ${S} needs to bail out of prerendering at this point because it used ${x}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function M(S) {
      return typeof S == "object" && S !== null && typeof S.message == "string" ? k(S.message) : !1;
    }
    function k(S) {
      return S.includes("needs to bail out of prerendering at this point because it used") && S.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
    }
    if (k(T("%%%", "^^^")) === !1)
      throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: !1,
        configurable: !0
      });
    const B = "NEXT_PRERENDER_INTERRUPTED";
    function j(S) {
      const x = Object.defineProperty(new Error(S), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return x.digest = B, x;
    }
    function G(S) {
      return typeof S == "object" && S !== null && S.digest === B && "name" in S && "message" in S && S instanceof Error;
    }
    function F(S) {
      return S.length > 0;
    }
    function Z(S, x) {
      return S.dynamicAccesses.push(...x.dynamicAccesses), S.dynamicAccesses;
    }
    function I(S) {
      return S.filter((x) => typeof x.stack == "string" && x.stack.length > 0).map(({ expression: x, stack: H }) => (H = H.split(`
`).slice(4).filter(($) => !($.includes("node_modules/next/") || $.includes(" (<anonymous>)") || $.includes(" (node:"))).join(`
`), `Dynamic API Usage Debug - ${x}:
${H}`));
    }
    function D() {
      if (!d)
        throw Object.defineProperty(new Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E224",
          enumerable: !1,
          configurable: !0
        });
    }
    function K(S) {
      D();
      const x = new AbortController();
      try {
        n.default.unstable_postpone(S);
      } catch (H) {
        x.abort(H);
      }
      return x.signal;
    }
    function se(S) {
      const x = new AbortController();
      return S.cacheSignal ? S.cacheSignal.inputReady().then(() => {
        x.abort();
      }) : (0, u.scheduleOnNextTick)(() => x.abort()), x.signal;
    }
    function re(S, x) {
      const H = x.dynamicTracking;
      H && H.dynamicAccesses.push({
        stack: H.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: S
      });
    }
    function ne(S) {
      const x = i.workAsyncStorage.getStore();
      if (x && x.isStaticGeneration && x.fallbackRouteParams && x.fallbackRouteParams.size > 0) {
        const H = a.workUnitAsyncStorage.getStore();
        H && (H.type === "prerender" ? n.default.use((0, s.makeHangingPromise)(H.renderSignal, S)) : H.type === "prerender-ppr" ? N(x.route, S, H.dynamicTracking) : H.type === "prerender-legacy" && v(S, x, H));
      }
    }
    const Q = /\n\s+at Suspense \(<anonymous>\)/, fe = new RegExp(`\\n\\s+at ${c.METADATA_BOUNDARY_NAME}[\\n\\s]`), ae = new RegExp(`\\n\\s+at ${c.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), P = new RegExp(`\\n\\s+at ${c.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    function te(S, x, H, $, U) {
      if (!P.test(x))
        if (fe.test(x)) {
          H.hasDynamicMetadata = !0;
          return;
        } else if (ae.test(x)) {
          H.hasDynamicViewport = !0;
          return;
        } else if (Q.test(x)) {
          H.hasSuspendedDynamic = !0;
          return;
        } else if ($.syncDynamicErrorWithStack || U.syncDynamicErrorWithStack) {
          H.hasSyncDynamicErrors = !0;
          return;
        } else {
          const W = `Route "${S}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`, me = z(W, x);
          H.dynamicErrors.push(me);
          return;
        }
    }
    function z(S, x) {
      const H = Object.defineProperty(new Error(S), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return H.stack = "Error: " + S + x, H;
    }
    function Y(S, x, H, $) {
      let U, W, me;
      if (H.syncDynamicErrorWithStack ? (U = H.syncDynamicErrorWithStack, W = H.syncDynamicExpression, me = H.syncDynamicLogged === !0) : $.syncDynamicErrorWithStack ? (U = $.syncDynamicErrorWithStack, W = $.syncDynamicExpression, me = $.syncDynamicLogged === !0) : (U = null, W = void 0, me = !1), x.hasSyncDynamicErrors && U)
        throw me || console.error(U), new o.StaticGenBailoutError();
      const ve = x.dynamicErrors;
      if (ve.length) {
        for (let pe = 0; pe < ve.length; pe++)
          console.error(ve[pe]);
        throw new o.StaticGenBailoutError();
      }
      if (!x.hasSuspendedDynamic) {
        if (x.hasDynamicMetadata)
          throw U ? (console.error(U), Object.defineProperty(new o.StaticGenBailoutError(`Route "${S}" has a \`generateMetadata\` that could not finish rendering before ${W} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E608",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new o.StaticGenBailoutError(`Route "${S}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E534",
            enumerable: !1,
            configurable: !0
          });
        if (x.hasDynamicViewport)
          throw U ? (console.error(U), Object.defineProperty(new o.StaticGenBailoutError(`Route "${S}" has a \`generateViewport\` that could not finish rendering before ${W} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E573",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new o.StaticGenBailoutError(`Route "${S}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E590",
            enumerable: !1,
            configurable: !0
          });
      }
    }
  }(io)), io;
}
var As;
function H_() {
  return As || (As = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const n = Nl(), r = I_(), o = Ia(), a = Il(), i = kl(), s = Ml();
    function c(u) {
      if ((0, a.isNextRouterError)(u) || (0, o.isBailoutToCSRError)(u) || (0, s.isDynamicServerError)(u) || (0, i.isDynamicPostpone)(u) || (0, r.isPostpone)(u) || (0, n.isHangingPromiseRejectionError)(u))
        throw u;
      u instanceof Error && "cause" in u && c(u.cause);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(mn, mn.exports)), mn.exports;
}
var bn = { exports: {} }, Ts;
function U_() {
  return Ts || (Ts = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Ia(), r = Il();
    function o(a) {
      if ((0, r.isNextRouterError)(a) || (0, n.isBailoutToCSRError)(a))
        throw a;
      a instanceof Error && "cause" in a && o(a.cause);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(bn, bn.exports)), bn.exports;
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
  const n = typeof window > "u" ? H_().unstable_rethrow : U_().unstable_rethrow;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Xo, Xo.exports);
var B_ = Xo.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(d, p) {
    for (var g in p) Object.defineProperty(d, g, {
      enumerable: !0,
      get: p[g]
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
      return i.forbidden;
    },
    notFound: function() {
      return a.notFound;
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
  const r = O_, o = Ta, a = A_, i = T_, s = N_, c = B_;
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
})(Ho, Ho.exports);
var G_ = Ho.exports, Ll = {};
(function(e) {
  "use client";
  Object.defineProperty(e, "__esModule", {
    value: !0
  });
  function t(i, s) {
    for (var c in s) Object.defineProperty(i, c, {
      enumerable: !0,
      get: s[c]
    });
  }
  t(e, {
    ServerInsertedHTMLContext: function() {
      return o;
    },
    useServerInsertedHTML: function() {
      return a;
    }
  });
  const r = /* @__PURE__ */ Ct._(le), o = /* @__PURE__ */ r.default.createContext(null);
  function a(i) {
    const s = (0, r.useContext)(o);
    s && s(i);
  }
})(Ll);
var yn = { exports: {} }, Ns;
function z_() {
  return Ns || (Ns = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "bailoutToClientRendering", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Ia(), r = Dl();
    function o(a) {
      const i = r.workAsyncStorage.getStore();
      if (!(i != null && i.forceStatic) && i != null && i.isStaticGeneration)
        throw Object.defineProperty(new n.BailoutToCSRError(a), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: !1,
          configurable: !0
        });
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(yn, yn.exports)), yn.exports;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(w, m) {
    for (var y in m) Object.defineProperty(w, y, {
      enumerable: !0,
      get: m[y]
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
      return b;
    },
    usePathname: function() {
      return p;
    },
    useRouter: function() {
      return g;
    },
    useSearchParams: function() {
      return d;
    },
    useSelectedLayoutSegment: function() {
      return v;
    },
    useSelectedLayoutSegments: function() {
      return _;
    },
    useServerInsertedHTML: function() {
      return u.useServerInsertedHTML;
    }
  });
  const r = le, o = Ol, a = Al, i = x_, s = ea, c = G_, u = Ll, l = typeof window > "u" ? kl().useDynamicRouteParams : void 0;
  function d() {
    const w = (0, r.useContext)(a.SearchParamsContext), m = (0, r.useMemo)(() => w ? new c.ReadonlyURLSearchParams(w) : null, [
      w
    ]);
    if (typeof window > "u") {
      const { bailoutToClientRendering: y } = z_();
      y("useSearchParams()");
    }
    return m;
  }
  function p() {
    return l == null || l("usePathname()"), (0, r.useContext)(a.PathnameContext);
  }
  function g() {
    const w = (0, r.useContext)(o.AppRouterContext);
    if (w === null)
      throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
        value: "E238",
        enumerable: !1,
        configurable: !0
      });
    return w;
  }
  function b() {
    return l == null || l("useParams()"), (0, r.useContext)(a.PathParamsContext);
  }
  function f(w, m, y, E) {
    y === void 0 && (y = !0), E === void 0 && (E = []);
    let A;
    if (y)
      A = w[1][m];
    else {
      const T = w[1];
      var C;
      A = (C = T.children) != null ? C : Object.values(T)[0];
    }
    if (!A) return E;
    const O = A[0];
    let N = (0, i.getSegmentValue)(O);
    return !N || N.startsWith(s.PAGE_SEGMENT_KEY) ? E : (E.push(N), f(A, m, !1, E));
  }
  function _(w) {
    w === void 0 && (w = "children"), l == null || l("useSelectedLayoutSegments()");
    const m = (0, r.useContext)(o.LayoutRouterContext);
    return m ? f(m.parentTree, w) : null;
  }
  function v(w) {
    w === void 0 && (w = "children"), l == null || l("useSelectedLayoutSegment()");
    const m = _(w);
    if (!m || m.length === 0)
      return null;
    const y = w === "children" ? m[0] : m[m.length - 1];
    return y === s.DEFAULT_SEGMENT_KEY ? null : y;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Fo, Fo.exports);
var V_ = Fo.exports, jl = V_, ir = "Dialog", [Fl, wb] = nt(ir), [q_, He] = Fl(ir), $l = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: i = !0
  } = e, s = h.useRef(null), c = h.useRef(null), [u, l] = ct({
    prop: r,
    defaultProp: o ?? !1,
    onChange: a,
    caller: ir
  });
  return /* @__PURE__ */ R(
    q_,
    {
      scope: t,
      triggerRef: s,
      contentRef: c,
      contentId: je(),
      titleId: je(),
      descriptionId: je(),
      open: u,
      onOpenChange: l,
      onOpenToggle: h.useCallback(() => l((d) => !d), [l]),
      modal: i,
      children: n
    }
  );
};
$l.displayName = ir;
var Hl = "DialogTrigger", Ul = h.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Hl, n), a = ge(t, o.triggerRef);
    return /* @__PURE__ */ R(
      ce.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": ka(o.open),
        ...r,
        ref: a,
        onClick: X(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ul.displayName = Hl;
var Ma = "DialogPortal", [W_, Bl] = Fl(Ma, {
  forceMount: void 0
}), Gl = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = He(Ma, t);
  return /* @__PURE__ */ R(W_, { scope: t, forceMount: n, children: h.Children.map(r, (i) => /* @__PURE__ */ R(De, { present: n || a.open, children: /* @__PURE__ */ R(Wn, { asChild: !0, container: o, children: i }) })) });
};
Gl.displayName = Ma;
var Ln = "DialogOverlay", zl = h.forwardRef(
  (e, t) => {
    const n = Bl(Ln, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = He(Ln, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ R(De, { present: r || a.open, children: /* @__PURE__ */ R(K_, { ...o, ref: t }) }) : null;
  }
);
zl.displayName = Ln;
var X_ = /* @__PURE__ */ it("DialogOverlay.RemoveScroll"), K_ = h.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Ln, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ R(Kn, { as: X_, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ R(
        ce.div,
        {
          "data-state": ka(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), ft = "DialogContent", Vl = h.forwardRef(
  (e, t) => {
    const n = Bl(ft, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = He(ft, e.__scopeDialog);
    return /* @__PURE__ */ R(De, { present: r || a.open, children: a.modal ? /* @__PURE__ */ R(Y_, { ...o, ref: t }) : /* @__PURE__ */ R(Q_, { ...o, ref: t }) });
  }
);
Vl.displayName = ft;
var Y_ = h.forwardRef(
  (e, t) => {
    const n = He(ft, e.__scopeDialog), r = h.useRef(null), o = ge(t, n.contentRef, r);
    return h.useEffect(() => {
      const a = r.current;
      if (a) return fa(a);
    }, []), /* @__PURE__ */ R(
      ql,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: X(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: X(e.onPointerDownOutside, (a) => {
          const i = a.detail.originalEvent, s = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || s) && a.preventDefault();
        }),
        onFocusOutside: X(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Q_ = h.forwardRef(
  (e, t) => {
    const n = He(ft, e.__scopeDialog), r = h.useRef(!1), o = h.useRef(!1);
    return /* @__PURE__ */ R(
      ql,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var i, s;
          (i = e.onCloseAutoFocus) == null || i.call(e, a), a.defaultPrevented || (r.current || (s = n.triggerRef.current) == null || s.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var c, u;
          (c = e.onInteractOutside) == null || c.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const i = a.target;
          ((u = n.triggerRef.current) == null ? void 0 : u.contains(i)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), ql = h.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...i } = e, s = He(ft, n), c = h.useRef(null), u = ge(t, c);
    return na(), /* @__PURE__ */ be(Ze, { children: [
      /* @__PURE__ */ R(
        Bn,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ R(
            Ut,
            {
              role: "dialog",
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": ka(s.open),
              ...i,
              ref: u,
              onDismiss: () => s.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ be(Ze, { children: [
        /* @__PURE__ */ R(eb, { titleId: s.titleId }),
        /* @__PURE__ */ R(nb, { contentRef: c, descriptionId: s.descriptionId })
      ] })
    ] });
  }
), Da = "DialogTitle", Z_ = h.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Da, n);
    return /* @__PURE__ */ R(ce.h2, { id: o.titleId, ...r, ref: t });
  }
);
Z_.displayName = Da;
var Wl = "DialogDescription", J_ = h.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Wl, n);
    return /* @__PURE__ */ R(ce.p, { id: o.descriptionId, ...r, ref: t });
  }
);
J_.displayName = Wl;
var Xl = "DialogClose", Kl = h.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = He(Xl, n);
    return /* @__PURE__ */ R(
      ce.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: X(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
Kl.displayName = Xl;
function ka(e) {
  return e ? "open" : "closed";
}
var Yl = "DialogTitleWarning", [Sb, Ql] = Bf(Yl, {
  contentName: ft,
  titleName: Da,
  docsSlug: "dialog"
}), eb = ({ titleId: e }) => {
  const t = Ql(Yl), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return h.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, tb = "DialogDescriptionWarning", nb = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Ql(tb).contentName}}.`;
  return h.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, rb = $l, ob = Ul, ab = Gl, ib = zl, sb = Vl, cb = Kl;
function ub({ ...e }) {
  return /* @__PURE__ */ R(rb, { "data-slot": "sheet", ...e });
}
function lb({ ...e }) {
  return /* @__PURE__ */ R(ob, { "data-slot": "sheet-trigger", ...e });
}
function db({ ...e }) {
  return /* @__PURE__ */ R(ab, { "data-slot": "sheet-portal", ...e });
}
function fb({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    ib,
    {
      "data-slot": "sheet-overlay",
      className: Ee(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        e
      ),
      ...t
    }
  );
}
function pb({
  className: e,
  children: t,
  side: n = "right",
  ...r
}) {
  return /* @__PURE__ */ be(db, { children: [
    /* @__PURE__ */ R(fb, {}),
    /* @__PURE__ */ be(
      sb,
      {
        "data-slot": "sheet-content",
        className: Ee(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
          n === "right" && "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
          n === "left" && "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
          n === "top" && "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b",
          n === "bottom" && "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t",
          e
        ),
        ...r,
        children: [
          t,
          /* @__PURE__ */ be(cb, { className: "ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [
            /* @__PURE__ */ R(uf, { className: "size-4" }),
            /* @__PURE__ */ R("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
const mb = ({ navLinks: e, linkClassName: t, children: n }) => /* @__PURE__ */ be(ub, { children: [
  /* @__PURE__ */ R(lb, { className: "cursor-pointer rounded-sm bg-white", asChild: !0, children: /* @__PURE__ */ R(of, { className: "text-black" }) }),
  /* @__PURE__ */ R(pb, { side: "top", className: "p-10", children: /* @__PURE__ */ be(xl, { className: "mx-auto flex max-w-xl flex-col gap-3", children: [
    e == null ? void 0 : e.map(
      (r, o) => {
        var a;
        return r != null && r.dropdown ? /* @__PURE__ */ be(sl, { children: [
          /* @__PURE__ */ be(
            cl,
            {
              className: Ee(
                kn(),
                "flex gap-1",
                "hover:text-mid-danger bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
                "text-black focus:text-black active:text-black",
                t
              ),
              children: [
                /* @__PURE__ */ R("p", { className: "hover:text-mid-danger text-black", children: r.route }),
                /* @__PURE__ */ R("div", { className: "ml-1", children: /* @__PURE__ */ R(Fn, { className: "text-black", size: ".8rem" }) })
              ]
            }
          ),
          /* @__PURE__ */ R(ul, { children: /* @__PURE__ */ R("ul", { className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]", children: (a = r == null ? void 0 : r.dropdown) == null ? void 0 : a.map((i) => /* @__PURE__ */ R(La, { title: i.title, href: i.href, children: i.description }, i.title)) }) })
        ] }, o) : /* @__PURE__ */ R(Cl, { children: /* @__PURE__ */ R(Pl, { children: /* @__PURE__ */ R(
          Aa,
          {
            href: r.link,
            className: Ee(
              kn(),
              "hover:text-mid-danger bg-transparent text-sm hover:bg-transparent hover:underline focus:bg-transparent"
            ),
            children: r.route
          }
        ) }) }, o);
      }
    ),
    /* @__PURE__ */ R("div", { className: "flex w-full items-center justify-center gap-x-2 md:gap-x-4", children: n || /* @__PURE__ */ R(ta, { href: "/signin", variant: "primary", className: "bg-mid-blue h-[47px] w-[97px] rounded-lg", children: "Sign In" }) })
  ] }) })
] }), xb = ({
  logoPath: e = "",
  navLinks: t,
  children: n,
  bgScrollColor: r,
  linkClassName: o,
  className: a
}) => {
  const [i, s] = Yo(!1), c = jl.usePathname(), u = () => {
    s(window.scrollY > 1);
  };
  Is(() => (window.addEventListener("scroll", u), () => {
    window.removeEventListener("scroll", u);
  }), []);
  const l = (d) => c === d;
  return /* @__PURE__ */ R(
    "section",
    {
      className: `${i ? `shadow-md ${r}` : "shadow-none"} sticky top-0 right-0 left-0 z-40 ${a}`,
      children: /* @__PURE__ */ R("nav", { children: /* @__PURE__ */ be(
        "div",
        {
          className: "relative mx-auto flex w-full max-w-[1240px] items-center justify-between gap-x-4 px-4 py-4 transition-all duration-500 md:py-6 xl:px-0",
          children: [
            /* @__PURE__ */ R(Eg, { logo: e }),
            /* @__PURE__ */ R(xl, { className: "hidden w-full items-center justify-center gap-x-4 lg:flex lg:gap-x-6", children: t == null ? void 0 : t.map(
              (d, p) => {
                var g;
                return d != null && d.dropdown ? /* @__PURE__ */ be(sl, { children: [
                  /* @__PURE__ */ be(
                    cl,
                    {
                      className: Ee(
                        kn(),
                        "flex gap-1",
                        "bg-transparent active:bg-transparent",
                        l(d.link) ? "text-blue-500 underline" : "hover:text-mid-danger text-white",
                        o
                      ),
                      children: [
                        /* @__PURE__ */ R("p", { children: d.route }),
                        /* @__PURE__ */ R("div", { className: "mt-1", children: /* @__PURE__ */ R(Fn, { className: "text-current", size: ".8rem" }) })
                      ]
                    }
                  ),
                  /* @__PURE__ */ R(ul, { children: /* @__PURE__ */ R("ul", { className: "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]", children: (g = d == null ? void 0 : d.dropdown) == null ? void 0 : g.map((b) => /* @__PURE__ */ R(
                    La,
                    {
                      title: b.title,
                      href: b.href,
                      className: l(b.href) ? "bg-gray-200 text-black" : "",
                      children: b.description
                    },
                    b.title
                  )) }) })
                ] }, p) : /* @__PURE__ */ R(Cl, { children: /* @__PURE__ */ R(Pl, { children: /* @__PURE__ */ R(
                  Aa,
                  {
                    href: d.link,
                    className: Ee(
                      kn(),
                      "bg-transparent text-sm",
                      l(d.link) ? "text-blue-500 underline" : "hover:text-mid-danger text-white",
                      o
                    ),
                    children: d.route
                  }
                ) }) }, p);
              }
            ) }),
            /* @__PURE__ */ R("div", { className: "hidden w-fit items-center justify-end gap-x-2 justify-self-end lg:flex lg:gap-x-4", children: n || /* @__PURE__ */ R(ta, { href: "/signin", variant: "primary", className: "bg-mid-blue h-[47px] w-[97px] rounded-lg", children: "Sign In" }) }),
            /* @__PURE__ */ R("section", { className: "lg:hidden", children: /* @__PURE__ */ R(mb, { linkClassName: o, navLinks: t, logoPath: "" }) })
          ]
        }
      ) })
    }
  );
}, La = Ft(
  ({ className: e, title: t, children: n, ...r }, o) => {
    const i = jl.usePathname() === r.href;
    return /* @__PURE__ */ R("li", { children: /* @__PURE__ */ R(Aa, { asChild: !0, children: /* @__PURE__ */ be(
      "a",
      {
        ref: o,
        className: Ee(
          "block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
          i ? "bg-gray-200 text-black" : "hover:bg-accent hover:text-accent-foreground",
          e
        ),
        ...r,
        children: [
          /* @__PURE__ */ R("div", { className: "text-sm leading-none font-medium", children: t }),
          /* @__PURE__ */ R("p", { className: "text-muted-foreground line-clamp-2 text-sm leading-snug", children: n })
        ]
      }
    ) }) });
  }
);
La.displayName = "ListItem";
export {
  ta as CustomButton,
  bb as InputField,
  La as ListItem,
  Eg as Logo,
  xb as Navbar
};
