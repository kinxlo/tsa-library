import Vo, { jsx as R, jsxs as ve, Fragment as Ye } from "react/jsx-runtime";
import * as g from "react";
import ue, { forwardRef as jt, createElement as uo, cloneElement as Dl, useLayoutEffect as kl, useEffect as Ps, useState as qo } from "react";
import * as Dn from "react-dom";
import Xo from "react-dom";
function Os(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Os(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function As() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Os(e)) && (r && (r += " "), r += t);
  return r;
}
const Wo = "-", Ll = (e) => {
  const t = Fl(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (a) => {
      const s = a.split(Wo);
      return s[0] === "" && s.length !== 1 && s.shift(), Ts(s, t) || jl(a);
    },
    getConflictingClassGroupIds: (a, s) => {
      const c = n[a] || [];
      return s && r[a] ? [...c, ...r[a]] : c;
    }
  };
}, Ts = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? Ts(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const i = e.join(Wo);
  return (a = t.validators.find(({
    validator: s
  }) => s(i))) == null ? void 0 : a.classGroupId;
}, Ai = /^\[(.+)\]$/, jl = (e) => {
  if (Ai.test(e)) {
    const t = Ai.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Fl = (e) => {
  const {
    theme: t,
    classGroups: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const o in n)
    lo(n[o], r, o, t);
  return r;
}, lo = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const i = o === "" ? t : Ti(t, o);
      i.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Hl(o)) {
        lo(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([i, a]) => {
      lo(a, Ti(t, i), n, r);
    });
  });
}, Ti = (e, t) => {
  let n = e;
  return t.split(Wo).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Hl = (e) => e.isThemeGetter, $l = (e) => {
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
}, fo = "!", po = ":", Ul = po.length, Bl = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: n
  } = e;
  let r = (o) => {
    const i = [];
    let a = 0, s = 0, c = 0, u;
    for (let b = 0; b < o.length; b++) {
      let f = o[b];
      if (a === 0 && s === 0) {
        if (f === po) {
          i.push(o.slice(c, b)), c = b + Ul;
          continue;
        }
        if (f === "/") {
          u = b;
          continue;
        }
      }
      f === "[" ? a++ : f === "]" ? a-- : f === "(" ? s++ : f === ")" && s--;
    }
    const l = i.length === 0 ? o : o.substring(c), d = Gl(l), p = d !== l, h = u && u > c ? u - c : void 0;
    return {
      modifiers: i,
      hasImportantModifier: p,
      baseClassName: d,
      maybePostfixModifierPosition: h
    };
  };
  if (t) {
    const o = t + po, i = r;
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
}, Gl = (e) => e.endsWith(fo) ? e.substring(0, e.length - 1) : e.startsWith(fo) ? e.substring(1) : e, zl = (e) => {
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
}, Vl = (e) => ({
  cache: $l(e.cacheSize),
  parseClassName: Bl(e),
  sortModifiers: zl(e),
  ...Ll(e)
}), ql = /\s+/, Xl = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o,
    sortModifiers: i
  } = t, a = [], s = e.trim().split(ql);
  let c = "";
  for (let u = s.length - 1; u >= 0; u -= 1) {
    const l = s[u], {
      isExternal: d,
      modifiers: p,
      hasImportantModifier: h,
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
    const C = i(p).join(":"), m = h ? C + fo : C, y = m + v;
    if (a.includes(y))
      continue;
    a.push(y);
    const E = o(v, _);
    for (let A = 0; A < E.length; ++A) {
      const x = E[A];
      a.push(m + x);
    }
    c = l + (c.length > 0 ? " " + c : c);
  }
  return c;
};
function Wl() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = Ns(t)) && (r && (r += " "), r += n);
  return r;
}
const Ns = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = Ns(e[r])) && (n && (n += " "), n += t);
  return n;
};
function Kl(e, ...t) {
  let n, r, o, i = a;
  function a(c) {
    const u = t.reduce((l, d) => d(l), e());
    return n = Vl(u), r = n.cache.get, o = n.cache.set, i = s, s(c);
  }
  function s(c) {
    const u = r(c);
    if (u)
      return u;
    const l = Xl(c, n);
    return o(c, l), l;
  }
  return function() {
    return i(Wl.apply(null, arguments));
  };
}
const Se = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Is = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, Ms = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Yl = /^\d+\/\d+$/, Ql = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Zl = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Jl = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, ed = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, td = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, ft = (e) => Yl.test(e), de = (e) => !!e && !Number.isNaN(Number(e)), We = (e) => !!e && Number.isInteger(Number(e)), tr = (e) => e.endsWith("%") && de(e.slice(0, -1)), Ge = (e) => Ql.test(e), nd = () => !0, rd = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Zl.test(e) && !Jl.test(e)
), Ds = () => !1, od = (e) => ed.test(e), id = (e) => td.test(e), ad = (e) => !J(e) && !ee(e), sd = (e) => wt(e, js, Ds), J = (e) => Is.test(e), rt = (e) => wt(e, Fs, rd), nr = (e) => wt(e, fd, de), Ni = (e) => wt(e, ks, Ds), cd = (e) => wt(e, Ls, id), Vt = (e) => wt(e, Hs, od), ee = (e) => Ms.test(e), At = (e) => St(e, Fs), ud = (e) => St(e, pd), Ii = (e) => St(e, ks), ld = (e) => St(e, js), dd = (e) => St(e, Ls), qt = (e) => St(e, Hs, !0), wt = (e, t, n) => {
  const r = Is.exec(e);
  return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, St = (e, t, n = !1) => {
  const r = Ms.exec(e);
  return r ? r[1] ? t(r[1]) : n : !1;
}, ks = (e) => e === "position" || e === "percentage", Ls = (e) => e === "image" || e === "url", js = (e) => e === "length" || e === "size" || e === "bg-size", Fs = (e) => e === "length", fd = (e) => e === "number", pd = (e) => e === "family-name", Hs = (e) => e === "shadow", md = () => {
  const e = Se("color"), t = Se("font"), n = Se("text"), r = Se("font-weight"), o = Se("tracking"), i = Se("leading"), a = Se("breakpoint"), s = Se("container"), c = Se("spacing"), u = Se("radius"), l = Se("shadow"), d = Se("inset-shadow"), p = Se("text-shadow"), h = Se("drop-shadow"), b = Se("blur"), f = Se("perspective"), _ = Se("aspect"), v = Se("ease"), C = Se("animate"), m = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], y = () => [
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
  ], E = () => [...y(), ee, J], A = () => ["auto", "hidden", "clip", "visible", "scroll"], x = () => ["auto", "contain", "none"], O = () => [ee, J, c], N = () => [ft, "full", "auto", ...O()], T = () => [We, "none", "subgrid", ee, J], M = () => ["auto", {
    span: ["full", We, ee, J]
  }, We, ee, J], k = () => [We, "auto", ee, J], B = () => ["auto", "min", "max", "fr", ee, J], j = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], G = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], F = () => ["auto", ...O()], Q = () => [ft, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...O()], I = () => [e, ee, J], D = () => [...y(), Ii, Ni, {
    position: [ee, J]
  }], W = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], se = () => ["auto", "cover", "contain", ld, sd, {
    size: [ee, J]
  }], re = () => [tr, At, rt], ne = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    ee,
    J
  ], Y = () => ["", de, At, rt], pe = () => ["solid", "dashed", "dotted", "double"], ie = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], P = () => [de, tr, Ii, Ni], te = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    b,
    ee,
    J
  ], z = () => ["none", de, ee, J], K = () => ["none", de, ee, J], w = () => [de, ee, J], S = () => [ft, "full", ...O()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ge],
      breakpoint: [Ge],
      color: [nd],
      container: [Ge],
      "drop-shadow": [Ge],
      ease: ["in", "out", "in-out"],
      font: [ad],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ge],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ge],
      shadow: [Ge],
      spacing: ["px", de],
      text: [Ge],
      "text-shadow": [Ge],
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
        aspect: ["auto", "square", ft, J, ee, _]
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
        overscroll: x()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": x()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": x()
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
        z: [We, "auto", ee, J]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [ft, "full", "auto", s, ...O()]
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
        flex: [de, ft, "auto", "initial", "none", J]
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
        order: [We, "first", "last", "none", ee, J]
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
        size: Q()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...Q()]
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
          ...Q()
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
          ...Q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", ...Q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "none", ...Q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", ...Q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, At, rt]
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
        font: [r, ee, nr]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", tr, J]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ud, J, t]
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
        "line-clamp": [de, "none", ee, nr]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
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
        decoration: [...pe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [de, "from-font", "auto", ee, rt]
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
        bg: W()
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
          }, We, ee, J],
          radial: ["", ee, J],
          conic: [We, ee, J]
        }, dd, cd]
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
        border: [...pe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...pe(), "hidden", "none"]
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
        outline: [...pe(), "none", "hidden"]
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
        outline: ["", de, At, rt]
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
          qt,
          Vt
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
        "inset-shadow": ["none", d, qt, Vt]
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
        ring: I()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [de, rt]
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
        "inset-ring": Y()
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
        "text-shadow": ["none", p, qt, Vt]
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
        mask: W()
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
          h,
          qt,
          Vt
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
        animate: ["none", C, ee, J]
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
        scale: K()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": K()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": K()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": K()
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
        skew: w()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": w()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": w()
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
        translate: S()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": S()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": S()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": S()
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
        stroke: [de, At, rt, nr]
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
}, hd = /* @__PURE__ */ Kl(md);
function fe(...e) {
  return hd(As(e));
}
function Mi(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Ft(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = Mi(o, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : Mi(e[o], null);
        }
      };
  };
}
function ye(...e) {
  return g.useCallback(Ft(...e), e);
}
// @__NO_SIDE_EFFECTS__
function bt(e) {
  const t = /* @__PURE__ */ gd(e), n = g.forwardRef((r, o) => {
    const { children: i, ...a } = r, s = g.Children.toArray(i), c = s.find(_d);
    if (c) {
      const u = c.props.children, l = s.map((d) => d === c ? g.Children.count(u) > 1 ? g.Children.only(null) : g.isValidElement(u) ? u.props.children : null : d);
      return /* @__PURE__ */ R(t, { ...a, ref: o, children: g.isValidElement(u) ? g.cloneElement(u, void 0, l) : null });
    }
    return /* @__PURE__ */ R(t, { ...a, ref: o, children: i });
  });
  return n.displayName = `${e}.Slot`, n;
}
var $s = /* @__PURE__ */ bt("Slot");
// @__NO_SIDE_EFFECTS__
function gd(e) {
  const t = g.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (g.isValidElement(o)) {
      const a = yd(o), s = bd(i, o.props);
      return o.type !== g.Fragment && (s.ref = r ? Ft(r, a) : a), g.cloneElement(o, s);
    }
    return g.Children.count(o) > 1 ? g.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var vd = Symbol("radix.slottable");
function _d(e) {
  return g.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === vd;
}
function bd(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...s) => {
      i(...s), o(...s);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...i } : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function yd(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
const Di = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ki = As, Us = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return ki(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: i } = t, a = Object.keys(o).map((u) => {
    const l = n == null ? void 0 : n[u], d = i == null ? void 0 : i[u];
    if (l === null) return null;
    const p = Di(l) || Di(d);
    return o[u][p];
  }), s = n && Object.entries(n).reduce((u, l) => {
    let [d, p] = l;
    return p === void 0 || (u[d] = p), u;
  }, {}), c = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((u, l) => {
    let { class: d, className: p, ...h } = l;
    return Object.entries(h).every((b) => {
      let [f, _] = b;
      return Array.isArray(_) ? _.includes({
        ...i,
        ...s
      }[f]) : {
        ...i,
        ...s
      }[f] === _;
    }) ? [
      ...u,
      d,
      p
    ] : u;
  }, []);
  return ki(e, a, c, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, Ed = Us(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-default text-default-foreground shadow",
        primary: "bg-primary text-primary-foreground shadow",
        accent: "bg-accent text-accent-foreground shadow",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover",
        subtle: "bg-subtle text-subtle-foreground shadow-sm hover:bg-subtle-hover",
        loading: "bg-loading text-loading-foreground shadow-sm hover:bg-loading-hover opacity-50 hover:opacity-100 transition-opacity duration-500 ease-out",
        outline: "bg-outline text-outline-foreground shadow-sm border border-border hover:bg-outline-hover hover:text-black",
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
), yn = jt(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ R(r ? $s : "button", { className: fe(Ed({ variant: t, size: n, className: e })), ref: i, ...o })
);
yn.displayName = "Button";
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rd = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), wd = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (t, n, r) => r ? r.toUpperCase() : n.toLowerCase()
), Li = (e) => {
  const t = wd(e);
  return t.charAt(0).toUpperCase() + t.slice(1);
}, Bs = (...e) => e.filter((t, n, r) => !!t && t.trim() !== "" && r.indexOf(t) === n).join(" ").trim(), Sd = (e) => {
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
var Cd = {
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
const xd = jt(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: r,
    className: o = "",
    children: i,
    iconNode: a,
    ...s
  }, c) => uo(
    "svg",
    {
      ref: c,
      ...Cd,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: r ? Number(n) * 24 / Number(t) : n,
      className: Bs("lucide", o),
      ...!i && !Sd(s) && { "aria-hidden": "true" },
      ...s
    },
    [
      ...a.map(([u, l]) => uo(u, l)),
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
const Fe = (e, t) => {
  const n = jt(
    ({ className: r, ...o }, i) => uo(xd, {
      ref: i,
      iconNode: t,
      className: Bs(
        `lucide-${Rd(Li(e))}`,
        `lucide-${e}`,
        r
      ),
      ...o
    })
  );
  return n.displayName = Li(e), n;
};
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pd = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], Od = Fe("check", Pd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ad = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ko = Fe("chevron-down", Ad);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Td = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Nd = Fe("chevron-right", Td);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Id = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Md = Fe("chevron-up", Id);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dd = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], kd = Fe("ellipsis", Dd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ld = [
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
], jd = Fe("eye-off", Ld);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fd = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Hd = Fe("eye", Fd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $d = [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
], Ud = Fe("loader", $d);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bd = [
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }],
  ["line", { x1: "4", x2: "20", y1: "6", y2: "6", key: "1owob3" }],
  ["line", { x1: "4", x2: "20", y1: "18", y2: "18", key: "yk5zj1" }]
], Gd = Fe("menu", Bd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zd = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Vd = Fe("plus", zd);
/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qd = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Xd = Fe("x", qd);
function Gs(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var mo = { exports: {} }, Ct = {};
function zs(e) {
  if (typeof WeakMap != "function") return null;
  var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
  return (zs = function(r) {
    return r ? n : t;
  })(e);
}
function Wd(e, t) {
  if (!t && e && e.__esModule) return e;
  if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
  var n = zs(t);
  if (n && n.has(e)) return n.get(e);
  var r = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var i in e)
    if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
      var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
      a && (a.get || a.set) ? Object.defineProperty(r, i, a) : r[i] = e[i];
    }
  return r.default = e, n && n.set(e, r), r;
}
Ct._ = Wd;
var Xt = { exports: {} }, rr = {}, ji;
function Vs() {
  return ji || (ji = 1, function(e) {
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
        for (const [d, p] of l.entries())
          a.append(d, p);
      }
      return a;
    }
  }(rr)), rr;
}
var or = {}, Fi;
function qs() {
  return Fi || (Fi = 1, function(e) {
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
    const r = /* @__PURE__ */ Ct._(Vs()), o = /https?|ftp|gopher|file/;
    function i(c) {
      let { auth: u, hostname: l } = c, d = c.protocol || "", p = c.pathname || "", h = c.hash || "", b = c.query || "", f = !1;
      u = u ? encodeURIComponent(u).replace(/%3A/i, ":") + "@" : "", c.host ? f = u + c.host : l && (f = u + (~l.indexOf(":") ? "[" + l + "]" : l), c.port && (f += ":" + c.port)), b && typeof b == "object" && (b = String(r.urlQueryToSearchParams(b)));
      let _ = c.search || b && "?" + b || "";
      return d && !d.endsWith(":") && (d += ":"), c.slashes || (!d || o.test(d)) && f !== !1 ? (f = "//" + (f || ""), p && p[0] !== "/" && (p = "/" + p)) : f || (f = ""), h && h[0] !== "#" && (h = "#" + h), _ && _[0] !== "?" && (_ = "?" + _), p = p.replace(/[?#]/g, encodeURIComponent), _ = _.replace("#", "%23"), "" + d + f + p + _ + h;
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
  }(or)), or;
}
var ir = {}, Hi;
function Kd() {
  return Hi || (Hi = 1, function(e) {
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
  }(ir)), ir;
}
var ar = {}, $i;
function kn() {
  return $i || ($i = 1, function(e) {
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
        return C;
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
        for (var x = arguments.length, O = new Array(x), N = 0; N < x; N++)
          O[N] = arguments[N];
        return E || (E = !0, A = y(...O)), A;
      };
    }
    const o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/, i = (y) => o.test(y);
    function a() {
      const { protocol: y, hostname: E, port: A } = window.location;
      return y + "//" + E + (A ? ":" + A : "");
    }
    function s() {
      const { href: y } = window.location, E = a();
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
      const x = E.res || E.ctx && E.ctx.res;
      if (!y.getInitialProps)
        return E.ctx && E.Component ? {
          pageProps: await d(E.Component, E.ctx)
        } : {};
      const O = await y.getInitialProps(E);
      if (x && u(x))
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
    const p = typeof performance < "u", h = p && [
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
    class C extends Error {
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
  }(ar)), ar;
}
var Wt = { exports: {} }, sr = {}, Ui;
function Xs() {
  return Ui || (Ui = 1, function(e) {
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
  }(sr)), sr;
}
var cr = {}, Bi;
function Yo() {
  return Bi || (Bi = 1, function(e) {
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
  }(cr)), cr;
}
var Gi;
function Ln() {
  return Gi || (Gi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizePathTrailingSlash", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Xs(), r = Yo(), o = (i) => {
      if (!i.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH)
        return i;
      const { pathname: a, query: s, hash: c } = (0, r.parsePath)(i);
      return process.env.__NEXT_TRAILING_SLASH ? /\.[^/]+\/?$/.test(a) ? "" + (0, n.removeTrailingSlash)(a) + s + c : a.endsWith("/") ? "" + a + s + c : a + "/" + s + c : "" + (0, n.removeTrailingSlash)(a) + s + c;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Wt, Wt.exports)), Wt.exports;
}
var ur = {}, Kt = { exports: {} }, lr = {}, zi;
function Ws() {
  return zi || (zi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "pathHasPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = Yo();
    function n(r, o) {
      if (typeof r != "string")
        return !1;
      const { pathname: i } = (0, t.parsePath)(r);
      return i === o || i.startsWith(o + "/");
    }
  }(lr)), lr;
}
var Vi;
function Yd() {
  return Vi || (Vi = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "hasBasePath", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Ws(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(i) {
      return (0, n.pathHasPrefix)(i, r);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Kt, Kt.exports)), Kt.exports;
}
var qi;
function Ks() {
  return qi || (qi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isLocalURL", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = kn(), n = Yd();
    function r(o) {
      if (!(0, t.isAbsoluteUrl)(o)) return !0;
      try {
        const i = (0, t.getLocationOrigin)(), a = new URL(o, i);
        return a.origin === i && (0, n.hasBasePath)(a.pathname);
      } catch {
        return !1;
      }
    }
  }(ur)), ur;
}
var dr = {}, fr = {}, Xi;
function Qd() {
  return Xi || (Xi = 1, function(e) {
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
          let p = function(h, b) {
            if (h !== null && h !== b)
              throw Object.defineProperty(new Error("You cannot use different slug names for the same dynamic path ('" + h + "' !== '" + b + "')."), "__NEXT_ERROR_CODE", {
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
                throw Object.defineProperty(new Error('You cannot use both an required and optional catch-all route at the same level ("[...' + this.restSlugName + ']" and "' + a[0] + '" ).'), "__NEXT_ERROR_CODE", {
                  value: "E299",
                  enumerable: !1,
                  configurable: !0
                });
              p(this.optionalRestSlugName, l), this.optionalRestSlugName = l, u = "[[...]]";
            } else {
              if (this.optionalRestSlugName != null)
                throw Object.defineProperty(new Error('You cannot use both an optional and required catch-all route at the same level ("[[...' + this.optionalRestSlugName + ']]" and "' + a[0] + '").'), "__NEXT_ERROR_CODE", {
                  value: "E300",
                  enumerable: !1,
                  configurable: !0
                });
              p(this.restSlugName, l), this.restSlugName = l, u = "[...]";
            }
          else {
            if (d)
              throw Object.defineProperty(new Error('Optional route parameters are not yet supported ("' + a[0] + '").'), "__NEXT_ERROR_CODE", {
                value: "E435",
                enumerable: !1,
                configurable: !0
              });
            p(this.slugName, l), this.slugName = l, u = "[]";
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
  }(fr)), fr;
}
var pr = {}, mr = {}, hr = {}, gr = {}, Wi;
function Zd() {
  return Wi || (Wi = 1, function(e) {
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
  }(gr)), gr;
}
var Qo = {};
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
})(Qo);
var Ki;
function Jd() {
  return Ki || (Ki = 1, function(e) {
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
    const n = Zd(), r = Qo;
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
  }(hr)), hr;
}
var Yi;
function Ys() {
  return Yi || (Yi = 1, function(e) {
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
    const n = Jd(), r = [
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
  }(mr)), mr;
}
var Qi;
function ef() {
  return Qi || (Qi = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "isDynamicRoute", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const t = Ys(), n = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/, r = /\/\[[^/]+\](?=\/|$)/;
    function o(i, a) {
      return a === void 0 && (a = !0), (0, t.isInterceptionRouteAppPath)(i) && (i = (0, t.extractInterceptionRouteInformation)(i).interceptedRoute), a ? r.test(i) : n.test(i);
    }
  }(pr)), pr;
}
var Zi;
function tf() {
  return Zi || (Zi = 1, function(e) {
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
    const n = Qd(), r = ef();
  }(dr)), dr;
}
var vr = {}, _r = {}, Ji;
function nf() {
  return Ji || (Ji = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "getRouteMatcher", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = kn();
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
          const p = s[d.pos];
          p !== void 0 && (d.repeat ? u[l] = p.split("/").map((h) => c(h)) : u[l] = c(p));
        }
        return u;
      };
    }
  }(_r)), _r;
}
var br = {}, yr = {}, ea;
function rf() {
  return ea || (ea = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(me, Pe) {
      for (var Re in Pe) Object.defineProperty(me, Re, {
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
        return x;
      },
      DOT_NEXT_ALIAS: function() {
        return B;
      },
      ESLINT_DEFAULT_DIRS: function() {
        return H;
      },
      GSP_NO_RETURNED_VALUE: function() {
        return te;
      },
      GSSP_COMPONENT_MEMBER_ERROR: function() {
        return w;
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
        return h;
      },
      NEXT_QUERY_PARAM_PREFIX: function() {
        return n;
      },
      NEXT_RESUME_HEADER: function() {
        return C;
      },
      NON_STANDARD_NODE_ENV: function() {
        return S;
      },
      PAGES_DIR_ALIAS: function() {
        return k;
      },
      PRERENDER_REVALIDATE_HEADER: function() {
        return i;
      },
      PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
        return a;
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
        return W;
      },
      RSC_ACTION_PROXY_ALIAS: function() {
        return I;
      },
      RSC_ACTION_VALIDATE_ALIAS: function() {
        return Q;
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
        return Y;
      },
      SERVER_PROPS_SSG_CONFLICT: function() {
        return pe;
      },
      SERVER_RUNTIME: function() {
        return U;
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
        return K;
      },
      WEBPACK_LAYERS: function() {
        return he;
      },
      WEBPACK_RESOURCE_QUERIES: function() {
        return _e;
      }
    });
    const n = "nxtP", r = "nxtI", o = "x-matched-path", i = "x-prerender-revalidate", a = "x-prerender-revalidate-if-generated", s = ".prefetch.rsc", c = ".segments", u = ".segment.rsc", l = ".rsc", d = ".action", p = ".json", h = ".meta", b = ".body", f = "x-next-cache-tags", _ = "x-next-revalidated-tags", v = "x-next-revalidate-tag-token", C = "next-resume", m = 128, y = 256, E = 1024, A = "_N_T_", x = 31536e3, O = 4294967294, N = "middleware", T = `(?:src/)?${N}`, M = "instrumentation", k = "private-next-pages", B = "private-dot-next", j = "private-next-root-dir", G = "private-next-app-dir", F = "private-next-rsc-mod-ref-proxy", Q = "private-next-rsc-action-validate", I = "private-next-rsc-server-reference", D = "private-next-rsc-cache-wrapper", W = "private-next-rsc-action-encryption", se = "private-next-rsc-action-client-wrapper", re = "You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict", ne = "You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps", Y = "You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.", pe = "You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps", ie = "can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props", P = "pages with `getServerSideProps` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export", te = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?", z = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?", K = "The `unstable_revalidate` property is available for general use.\nPlease use `revalidate` instead.", w = "can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member", S = 'You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env', $ = "Pages with `fallback` enabled in `getStaticPaths` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export", H = [
      "app",
      "pages",
      "components",
      "lib",
      "src"
    ], U = {
      edge: "edge",
      experimentalEdge: "experimental-edge",
      nodejs: "nodejs"
    }, X = {
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
    }, he = {
      ...X,
      GROUP: {
        builtinReact: [
          X.reactServerComponents,
          X.actionBrowser
        ],
        serverOnly: [
          X.reactServerComponents,
          X.actionBrowser,
          X.instrument,
          X.middleware
        ],
        neutralTarget: [
          // pages api
          X.apiNode,
          X.apiEdge
        ],
        clientOnly: [
          X.serverSideRendering,
          X.appPagesBrowser
        ],
        bundled: [
          X.reactServerComponents,
          X.actionBrowser,
          X.serverSideRendering,
          X.appPagesBrowser,
          X.shared,
          X.instrument,
          X.middleware
        ],
        appPages: [
          // app router pages and layouts
          X.reactServerComponents,
          X.serverSideRendering,
          X.appPagesBrowser,
          X.actionBrowser
        ]
      }
    }, _e = {
      edgeSSREntry: "__next_edge_ssr_entry__",
      metadata: "__next_metadata__",
      metadataRoute: "__next_metadata_route__",
      metadataImageMeta: "__next_metadata_image_meta__"
    };
  }(yr)), yr;
}
var Er = {}, ta;
function of() {
  return ta || (ta = 1, function(e) {
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
  }(Er)), Er;
}
var na;
function af() {
  return na || (na = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(_, v) {
      for (var C in v) Object.defineProperty(_, C, {
        enumerable: !0,
        get: v[C]
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
    const n = rf(), r = Ys(), o = of(), i = Xs(), a = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
    function s(_) {
      const v = _.match(a);
      return c(v ? v[2] : _);
    }
    function c(_) {
      const v = _.startsWith("[") && _.endsWith("]");
      v && (_ = _.slice(1, -1));
      const C = _.startsWith("...");
      return C && (_ = _.slice(3)), {
        key: _,
        repeat: C,
        optional: v
      };
    }
    function u(_, v, C) {
      const m = {};
      let y = 1;
      const E = [];
      for (const A of (0, i.removeTrailingSlash)(_).slice(1).split("/")) {
        const x = r.INTERCEPTION_ROUTE_MARKERS.find((N) => A.startsWith(N)), O = A.match(a);
        if (x && O && O[2]) {
          const { key: N, optional: T, repeat: M } = c(O[2]);
          m[N] = {
            pos: y++,
            repeat: M,
            optional: T
          }, E.push("/" + (0, o.escapeStringRegexp)(x) + "([^/]+?)");
        } else if (O && O[2]) {
          const { key: N, repeat: T, optional: M } = c(O[2]);
          m[N] = {
            pos: y++,
            repeat: T,
            optional: M
          }, C && O[1] && E.push("/" + (0, o.escapeStringRegexp)(O[1]));
          let k = T ? M ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
          C && O[1] && (k = k.substring(1)), E.push(k);
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
      let { includeSuffix: C = !1, includePrefix: m = !1, excludeOptionalTrailingSlash: y = !1 } = v === void 0 ? {} : v;
      const { parameterizedRoute: E, groups: A } = u(_, C, m);
      let x = E;
      return y || (x += "(?:/)?"), {
        re: new RegExp("^" + x + "$"),
        groups: A
      };
    }
    function d() {
      let _ = 0;
      return () => {
        let v = "", C = ++_;
        for (; C > 0; )
          v += String.fromCharCode(97 + (C - 1) % 26), C = Math.floor((C - 1) / 26);
        return v;
      };
    }
    function p(_) {
      let { interceptionMarker: v, getSafeRouteKey: C, segment: m, routeKeys: y, keyPrefix: E, backreferenceDuplicateKeys: A } = _;
      const { key: x, optional: O, repeat: N } = c(m);
      let T = x.replace(/\W/g, "");
      E && (T = "" + E + T);
      let M = !1;
      (T.length === 0 || T.length > 30) && (M = !0), isNaN(parseInt(T.slice(0, 1))) || (M = !0), M && (T = C());
      const k = T in y;
      E ? y[T] = "" + E + x : y[T] = x;
      const B = v ? (0, o.escapeStringRegexp)(v) : "";
      let j;
      return k && A ? j = "\\k<" + T + ">" : N ? j = "(?<" + T + ">.+?)" : j = "(?<" + T + ">[^/]+?)", O ? "(?:/" + B + j + ")?" : "/" + B + j;
    }
    function h(_, v, C, m, y) {
      const E = d(), A = {}, x = [];
      for (const O of (0, i.removeTrailingSlash)(_).slice(1).split("/")) {
        const N = r.INTERCEPTION_ROUTE_MARKERS.some((M) => O.startsWith(M)), T = O.match(a);
        if (N && T && T[2])
          x.push(p({
            getSafeRouteKey: E,
            interceptionMarker: T[1],
            segment: T[2],
            routeKeys: A,
            keyPrefix: v ? n.NEXT_INTERCEPTION_MARKER_PREFIX : void 0,
            backreferenceDuplicateKeys: y
          }));
        else if (T && T[2]) {
          m && T[1] && x.push("/" + (0, o.escapeStringRegexp)(T[1]));
          let M = p({
            getSafeRouteKey: E,
            segment: T[2],
            routeKeys: A,
            keyPrefix: v ? n.NEXT_QUERY_PARAM_PREFIX : void 0,
            backreferenceDuplicateKeys: y
          });
          m && T[1] && (M = M.substring(1)), x.push(M);
        } else
          x.push("/" + (0, o.escapeStringRegexp)(O));
        C && T && T[3] && x.push((0, o.escapeStringRegexp)(T[3]));
      }
      return {
        namedParameterizedRoute: x.join(""),
        routeKeys: A
      };
    }
    function b(_, v) {
      var C, m, y;
      const E = h(_, v.prefixRouteKeys, (C = v.includeSuffix) != null ? C : !1, (m = v.includePrefix) != null ? m : !1, (y = v.backreferenceDuplicateKeys) != null ? y : !1);
      let A = E.namedParameterizedRoute;
      return v.excludeOptionalTrailingSlash || (A += "(?:/)?"), {
        ...l(_, v),
        namedRegex: "^" + A + "$",
        routeKeys: E.routeKeys
      };
    }
    function f(_, v) {
      const { parameterizedRoute: C } = u(_, !1, !1), { catchAll: m = !0 } = v;
      if (C === "/")
        return {
          namedRegex: "^/" + (m ? ".*" : "") + "$"
        };
      const { namedParameterizedRoute: y } = h(_, !1, !1, !1, !1);
      let E = m ? "(?:(/.*)?)" : "";
      return {
        namedRegex: "^" + y + E + "$"
      };
    }
  }(br)), br;
}
var ra;
function sf() {
  return ra || (ra = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "interpolateAs", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = nf(), n = af();
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
      return d.every((p) => {
        let h = l[p] || "";
        const { repeat: b, optional: f } = u[p];
        let _ = "[" + (b ? "..." : "") + p + "]";
        return f && (_ = (h ? "" : "/") + "[" + _ + "]"), b && !Array.isArray(h) && (h = [
          h
        ]), (f || p in l) && // Interpolate group into data URL if present
        (s = s.replace(_, b ? h.map(
          // these values should be fully encoded instead of just
          // path delimiter escaped since they are being inserted
          // into the URL and we expect URL encoded segments
          // when parsing dynamic route params
          (v) => encodeURIComponent(v)
        ).join("/") : encodeURIComponent(h)) || "/");
      }) || (s = ""), {
        params: d,
        result: s
      };
    }
  }(vr)), vr;
}
var oa;
function cf() {
  return oa || (oa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "resolveHref", {
      enumerable: !0,
      get: function() {
        return l;
      }
    });
    const n = Vs(), r = qs(), o = Kd(), i = kn(), a = Ln(), s = Ks(), c = tf(), u = sf();
    function l(d, p, h) {
      let b, f = typeof p == "string" ? p : (0, r.formatWithValidation)(p);
      const _ = f.match(/^[a-zA-Z]{1,}:\/\//), v = _ ? f.slice(_[0].length) : f;
      if ((v.split("?", 1)[0] || "").match(/(\/\/|\\)/)) {
        console.error("Invalid href '" + f + "' passed to next/router in page: '" + d.pathname + "'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");
        const m = (0, i.normalizeRepeatedSlashes)(v);
        f = (_ ? _[0] : "") + m;
      }
      if (!(0, s.isLocalURL)(f))
        return h ? [
          f
        ] : f;
      try {
        b = new URL(f.startsWith("#") ? d.asPath : d.pathname, "http://n");
      } catch {
        b = new URL("/", "http://n");
      }
      try {
        const m = new URL(f, b);
        m.pathname = (0, a.normalizePathTrailingSlash)(m.pathname);
        let y = "";
        if ((0, c.isDynamicRoute)(m.pathname) && m.searchParams && h) {
          const A = (0, n.searchParamsToUrlQuery)(m.searchParams), { result: x, params: O } = (0, u.interpolateAs)(m.pathname, m.pathname, A);
          x && (y = (0, r.formatWithValidation)({
            pathname: x,
            hash: m.hash,
            query: (0, o.omit)(A, O)
          }));
        }
        const E = m.origin === b.origin ? m.href.slice(m.origin.length) : m.href;
        return h ? [
          E,
          y || E
        ] : E;
      } catch {
        return h ? [
          f
        ] : f;
      }
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Xt, Xt.exports)), Xt.exports;
}
var Yt = { exports: {} }, Rr = {}, wr = {}, ia;
function Qs() {
  return ia || (ia = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addPathPrefix", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const t = Yo();
    function n(r, o) {
      if (!r.startsWith("/") || !o)
        return r;
      const { pathname: i, query: a, hash: s } = (0, t.parsePath)(r);
      return "" + o + i + a + s;
    }
  }(wr)), wr;
}
var aa;
function uf() {
  return aa || (aa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const t = Qs(), n = Ws();
    function r(o, i, a, s) {
      if (!i || i === a) return o;
      const c = o.toLowerCase();
      return !s && ((0, n.pathHasPrefix)(c, "/api") || (0, n.pathHasPrefix)(c, "/" + i.toLowerCase())) ? o : (0, t.addPathPrefix)(o, "/" + i);
    }
  }(Rr)), Rr;
}
var sa;
function lf() {
  return sa || (sa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addLocale", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = Ln(), r = function(o) {
      for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++)
        a[s - 1] = arguments[s];
      return process.env.__NEXT_I18N_SUPPORT ? (0, n.normalizePathTrailingSlash)(uf().addLocale(o, ...a)) : o;
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Yt, Yt.exports)), Yt.exports;
}
var Sr = {}, qe = {};
function df(e) {
  return e && e.__esModule ? e : { default: e };
}
qe._ = df;
var ca;
function Zs() {
  return ca || (ca = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "RouterContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ qe._(ue)).default.createContext(null);
    process.env.NODE_ENV !== "production" && (r.displayName = "RouterContext");
  }(Sr)), Sr;
}
var Qt = { exports: {} }, Zt = { exports: {} }, ua;
function ff() {
  return ua || (ua = 1, function(e, t) {
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
  }(Zt, Zt.exports)), Zt.exports;
}
var la;
function pf() {
  return la || (la = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useIntersection", {
      enumerable: !0,
      get: function() {
        return u;
      }
    });
    const n = ue, r = ff(), o = typeof IntersectionObserver == "function", i = /* @__PURE__ */ new Map(), a = [];
    function s(l) {
      const d = {
        root: l.root || null,
        margin: l.rootMargin || ""
      }, p = a.find((_) => _.root === d.root && _.margin === d.margin);
      let h;
      if (p && (h = i.get(p), h))
        return h;
      const b = /* @__PURE__ */ new Map(), f = new IntersectionObserver((_) => {
        _.forEach((v) => {
          const C = b.get(v.target), m = v.isIntersecting || v.intersectionRatio > 0;
          C && m && C(m);
        });
      }, l);
      return h = {
        id: d,
        observer: f,
        elements: b
      }, a.push(d), i.set(d, h), h;
    }
    function c(l, d, p) {
      const { id: h, observer: b, elements: f } = s(p);
      return f.set(l, d), b.observe(l), function() {
        if (f.delete(l), b.unobserve(l), f.size === 0) {
          b.disconnect(), i.delete(h);
          const v = a.findIndex((C) => C.root === h.root && C.margin === h.margin);
          v > -1 && a.splice(v, 1);
        }
      };
    }
    function u(l) {
      let { rootRef: d, rootMargin: p, disabled: h } = l;
      const b = h || !o, [f, _] = (0, n.useState)(!1), v = (0, n.useRef)(null), C = (0, n.useCallback)((y) => {
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
        C,
        f,
        m
      ];
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Qt, Qt.exports)), Qt.exports;
}
var Jt = { exports: {} }, en = { exports: {} }, Cr = {}, da;
function mf() {
  return da || (da = 1, function(e) {
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
  }(Cr)), Cr;
}
var fa;
function hf() {
  return fa || (fa = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "normalizeLocalePath", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (r, o) => process.env.__NEXT_I18N_SUPPORT ? mf().normalizeLocalePath(r, o) : {
      pathname: r,
      detectedLocale: void 0
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(en, en.exports)), en.exports;
}
var tn = { exports: {} }, xr = {}, pa;
function gf() {
  return pa || (pa = 1, function(e) {
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
  }(xr)), xr;
}
var ma;
function vf() {
  return ma || (ma = 1, function(e, t) {
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
        return gf().detectDomainLocale(...o);
    };
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(tn, tn.exports)), tn.exports;
}
var ha;
function _f() {
  return ha || (ha = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "getDomainLocale", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Ln(), r = process.env.__NEXT_ROUTER_BASEPATH || "";
    function o(i, a, s, c) {
      if (process.env.__NEXT_I18N_SUPPORT) {
        const u = hf().normalizeLocalePath, l = vf().detectDomainLocale, d = a || u(i, s).detectedLocale, p = l(c, void 0, d);
        if (p) {
          const h = "http" + (p.http ? "" : "s") + "://", b = d === p.defaultLocale ? "" : "/" + d;
          return "" + h + p.domain + (0, n.normalizePathTrailingSlash)("" + r + b + i);
        }
        return !1;
      } else
        return !1;
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(Jt, Jt.exports)), Jt.exports;
}
var nn = { exports: {} }, ga;
function bf() {
  return ga || (ga = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "addBasePath", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const n = Qs(), r = Ln(), o = process.env.__NEXT_ROUTER_BASEPATH || "";
    function i(a, s) {
      return (0, r.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !s ? a : (0, n.addPathPrefix)(a, o));
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(nn, nn.exports)), nn.exports;
}
var rn = { exports: {} }, va;
function Js() {
  return va || (va = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "useMergedRef", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const n = ue;
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
  }(rn, rn.exports)), rn.exports;
}
var Pr = {}, _a;
function yf() {
  return _a || (_a = 1, function(e) {
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
  }(Pr)), Pr;
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
  const r = Ct, o = Vo, i = /* @__PURE__ */ r._(ue), a = cf(), s = Ks(), c = qs(), u = kn(), l = lf(), d = Zs(), p = pf(), h = _f(), b = bf(), f = Js(), _ = yf(), v = /* @__PURE__ */ new Set();
  function C(T, M, k, B) {
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
  function y(T, M, k, B, j, G, F, Q, I) {
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
        locale: Q,
        scroll: re
      }) : M[j ? "replace" : "push"](B || k, {
        scroll: re
      });
    })();
  }
  function E(T) {
    return typeof T == "string" ? T : (0, c.formatUrl)(T);
  }
  const A = /* @__PURE__ */ i.default.forwardRef(function(M, k) {
    let B;
    const { href: j, as: G, children: F, prefetch: Q = null, passHref: I, replace: D, shallow: W, scroll: se, locale: re, onClick: ne, onNavigate: Y, onMouseEnter: pe, onTouchStart: ie, legacyBehavior: P = !1, ...te } = M;
    B = F, P && (typeof B == "string" || typeof B == "number") && (B = /* @__PURE__ */ (0, o.jsx)("a", {
      children: B
    }));
    const z = i.default.useContext(d.RouterContext), K = Q !== !1;
    if (process.env.NODE_ENV !== "production") {
      let ce = function(L) {
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
          throw ce({
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
            throw ce({
              key: L,
              expected: "`string` or `object`",
              actual: oe
            });
        } else if (L === "locale") {
          if (M[L] && oe !== "string")
            throw ce({
              key: L,
              expected: "`string`",
              actual: oe
            });
        } else if (L === "onClick" || L === "onMouseEnter" || L === "onTouchStart" || L === "onNavigate") {
          if (M[L] && oe !== "function")
            throw ce({
              key: L,
              expected: "`function`",
              actual: oe
            });
        } else if ((L === "replace" || L === "scroll" || L === "shallow" || L === "passHref" || L === "prefetch" || L === "legacyBehavior") && M[L] != null && oe !== "boolean")
          throw ce({
            key: L,
            expected: "`boolean`",
            actual: oe
          });
      });
    }
    const { href: w, as: S } = i.default.useMemo(() => {
      if (!z) {
        const q = E(j);
        return {
          href: q,
          as: G ? E(G) : q
        };
      }
      const [ce, Ee] = (0, a.resolveHref)(z, j, !0);
      return {
        href: ce,
        as: G ? (0, a.resolveHref)(z, G) : Ee || ce
      };
    }, [
      z,
      j,
      G
    ]), $ = i.default.useRef(w), H = i.default.useRef(S);
    let U;
    if (P)
      if (process.env.NODE_ENV === "development") {
        ne && console.warn('"onClick" was passed to <Link> with `href` of `' + j + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link'), pe && console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + j + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
        try {
          U = i.default.Children.only(B);
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
        U = i.default.Children.only(B);
    else if (process.env.NODE_ENV === "development" && (B == null ? void 0 : B.type) === "a")
      throw Object.defineProperty(new Error(`Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor`), "__NEXT_ERROR_CODE", {
        value: "E209",
        enumerable: !1,
        configurable: !0
      });
    const X = P ? U && typeof U == "object" && U.ref : k, [he, _e, me] = (0, p.useIntersection)({
      rootMargin: "200px"
    }), Pe = i.default.useCallback((ce) => {
      (H.current !== S || $.current !== w) && (me(), H.current = S, $.current = w), he(ce);
    }, [
      S,
      w,
      me,
      he
    ]), Re = (0, f.useMergedRef)(Pe, X);
    i.default.useEffect(() => {
      process.env.NODE_ENV === "production" && z && (!_e || !K || C(z, w, S, {
        locale: re
      }));
    }, [
      S,
      w,
      _e,
      re,
      K,
      z == null ? void 0 : z.locale,
      z
    ]);
    const ae = {
      ref: Re,
      onClick(ce) {
        if (process.env.NODE_ENV !== "production" && !ce)
          throw Object.defineProperty(new Error('Component rendered inside next/link has to pass click event to "onClick" prop.'), "__NEXT_ERROR_CODE", {
            value: "E312",
            enumerable: !1,
            configurable: !0
          });
        !P && typeof ne == "function" && ne(ce), P && U.props && typeof U.props.onClick == "function" && U.props.onClick(ce), z && (ce.defaultPrevented || y(ce, z, w, S, D, W, se, re, Y));
      },
      onMouseEnter(ce) {
        !P && typeof pe == "function" && pe(ce), P && U.props && typeof U.props.onMouseEnter == "function" && U.props.onMouseEnter(ce), z && C(z, w, S, {
          locale: re,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      },
      onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? void 0 : function(Ee) {
        !P && typeof ie == "function" && ie(Ee), P && U.props && typeof U.props.onTouchStart == "function" && U.props.onTouchStart(Ee), z && C(z, w, S, {
          locale: re,
          priority: !0,
          // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
          bypassPrefetchedCheck: !0
        });
      }
    };
    if ((0, u.isAbsoluteUrl)(S))
      ae.href = S;
    else if (!P || I || U.type === "a" && !("href" in U.props)) {
      const ce = typeof re < "u" ? re : z == null ? void 0 : z.locale, Ee = (z == null ? void 0 : z.isLocaleDomain) && (0, h.getDomainLocale)(S, ce, z == null ? void 0 : z.locales, z == null ? void 0 : z.domainLocales);
      ae.href = Ee || (0, b.addBasePath)((0, l.addLocale)(S, ce, z == null ? void 0 : z.defaultLocale));
    }
    return P ? (process.env.NODE_ENV === "development" && (0, _.errorOnce)(`\`legacyBehavior\` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:

npx @next/codemod@latest new-link .

Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components`), /* @__PURE__ */ i.default.cloneElement(U, ae)) : /* @__PURE__ */ (0, o.jsx)("a", {
      ...te,
      ...ae,
      children: B
    });
  }), x = /* @__PURE__ */ (0, i.createContext)({
    // We do not support link status in the Pages Router, so we always return false
    pending: !1
  }), O = () => (0, i.useContext)(x), N = A;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(mo, mo.exports);
var Ef = mo.exports, Rf = Ef;
const jn = /* @__PURE__ */ Gs(Rf), gt = jt(
  ({
    type: e = "button",
    variant: t,
    size: n = "xl",
    children: r,
    isLoading: o = !1,
    isLeftIconVisible: i = !1,
    isRightIconVisible: a = !1,
    icon: s,
    isDisabled: c = !1,
    isIconOnly: u = !1,
    ariaLabel: l,
    href: d,
    className: p,
    onClick: h
  }, b) => {
    const f = s ? Dl(
      s,
      {
        className: "w-[1rem] h-[1rem]",
        "data-testid": "icon"
      }
    ) : /* @__PURE__ */ R(Vd, { className: "h-[1rem] w-[1rem]", "data-testid": "icon" }), _ = /* @__PURE__ */ ve(Ye, { children: [
      i && !o && f,
      o && /* @__PURE__ */ R(Ud, { className: "h-[1rem] w-[1rem] animate-spin", "data-testid": "loading-spinner" }),
      u && !o && f,
      !u && r,
      !u && !r && o && "Loading",
      a && !o && f
    ] }), v = `transition-all duration-300 ease-in-out ${c ? "opacity-50 cursor-not-allowed" : "hover:shadow-sneob dark:hover:shadow-sneobw focus:shadow-none"} ${p}`;
    return d ? /^https?:\/\//.test(d) ? /* @__PURE__ */ R("a", { href: d, target: "_blank", rel: "noopener noreferrer", "aria-label": l, children: /* @__PURE__ */ R(
      yn,
      {
        type: e,
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: v,
        onClick: h,
        role: "button",
        ref: b,
        children: _
      }
    ) }) : /* @__PURE__ */ R(jn, { href: c ? "" : d, passHref: !0, "aria-label": l, children: /* @__PURE__ */ R(
      yn,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: v,
        onClick: h,
        role: "button",
        ref: b,
        children: _
      }
    ) }) : /* @__PURE__ */ R(
      yn,
      {
        variant: t,
        size: n,
        disabled: c,
        "aria-label": l,
        className: v,
        onClick: h,
        role: "button",
        ref: b,
        children: _
      }
    );
  }
);
gt.displayName = "CustomButton";
function ba({ className: e, type: t, ...n }) {
  return /* @__PURE__ */ R(
    "input",
    {
      type: t,
      "data-slot": "input",
      className: fe(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        e
      ),
      ...n
    }
  );
}
var wf = [
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
], le = wf.reduce((e, t) => {
  const n = /* @__PURE__ */ bt(`Primitive.${t}`), r = g.forwardRef((o, i) => {
    const { asChild: a, ...s } = o, c = a ? n : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ R(c, { ...s, ref: i });
  });
  return r.displayName = `Primitive.${t}`, { ...e, [t]: r };
}, {});
function Cn(e, t) {
  e && Dn.flushSync(() => e.dispatchEvent(t));
}
var Sf = "Label", ec = g.forwardRef((e, t) => /* @__PURE__ */ R(
  le.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
ec.displayName = Sf;
var Cf = ec;
function xf({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    Cf,
    {
      "data-slot": "label",
      className: fe(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        e
      ),
      ...t
    }
  );
}
function ya(e, [t, n]) {
  return Math.min(n, Math.max(t, e));
}
function Z(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function ct(e, t = []) {
  let n = [];
  function r(i, a) {
    const s = g.createContext(a), c = n.length;
    n = [...n, a];
    const u = (d) => {
      var v;
      const { scope: p, children: h, ...b } = d, f = ((v = p == null ? void 0 : p[e]) == null ? void 0 : v[c]) || s, _ = g.useMemo(() => b, Object.values(b));
      return /* @__PURE__ */ R(f.Provider, { value: _, children: h });
    };
    u.displayName = i + "Provider";
    function l(d, p) {
      var f;
      const h = ((f = p == null ? void 0 : p[e]) == null ? void 0 : f[c]) || s, b = g.useContext(h);
      if (b) return b;
      if (a !== void 0) return a;
      throw new Error(`\`${d}\` must be used within \`${i}\``);
    }
    return [u, l];
  }
  const o = () => {
    const i = n.map((a) => g.createContext(a));
    return function(s) {
      const c = (s == null ? void 0 : s[e]) || i;
      return g.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: c } }),
        [s, c]
      );
    };
  };
  return o.scopeName = e, [r, Pf(o, ...t)];
}
function Pf(...e) {
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
      return g.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Ht(e) {
  const t = e + "CollectionProvider", [n, r] = ct(t), [o, i] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), a = (f) => {
    const { scope: _, children: v } = f, C = ue.useRef(null), m = ue.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ R(o, { scope: _, itemMap: m, collectionRef: C, children: v });
  };
  a.displayName = t;
  const s = e + "CollectionSlot", c = /* @__PURE__ */ bt(s), u = ue.forwardRef(
    (f, _) => {
      const { scope: v, children: C } = f, m = i(s, v), y = ye(_, m.collectionRef);
      return /* @__PURE__ */ R(c, { ref: y, children: C });
    }
  );
  u.displayName = s;
  const l = e + "CollectionItemSlot", d = "data-radix-collection-item", p = /* @__PURE__ */ bt(l), h = ue.forwardRef(
    (f, _) => {
      const { scope: v, children: C, ...m } = f, y = ue.useRef(null), E = ye(_, y), A = i(l, v);
      return ue.useEffect(() => (A.itemMap.set(y, { ref: y, ...m }), () => void A.itemMap.delete(y))), /* @__PURE__ */ R(p, { [d]: "", ref: E, children: C });
    }
  );
  h.displayName = l;
  function b(f) {
    const _ = i(e + "CollectionConsumer", f);
    return ue.useCallback(() => {
      const C = _.collectionRef.current;
      if (!C) return [];
      const m = Array.from(C.querySelectorAll(`[${d}]`));
      return Array.from(_.itemMap.values()).sort(
        (A, x) => m.indexOf(A.ref.current) - m.indexOf(x.ref.current)
      );
    }, [_.collectionRef, _.itemMap]);
  }
  return [
    { Provider: a, Slot: u, ItemSlot: h },
    b,
    r
  ];
}
var Of = g.createContext(void 0);
function Fn(e) {
  const t = g.useContext(Of);
  return e || t || "ltr";
}
function xe(e) {
  const t = g.useRef(e);
  return g.useEffect(() => {
    t.current = e;
  }), g.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Af(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e);
  g.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Tf = "DismissableLayer", ho = "dismissableLayer.update", Nf = "dismissableLayer.pointerDownOutside", If = "dismissableLayer.focusOutside", Ea, tc = g.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Hn = g.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: i,
      onInteractOutside: a,
      onDismiss: s,
      ...c
    } = e, u = g.useContext(tc), [l, d] = g.useState(null), p = (l == null ? void 0 : l.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, h] = g.useState({}), b = ye(t, (x) => d(x)), f = Array.from(u.layers), [_] = [...u.layersWithOutsidePointerEventsDisabled].slice(-1), v = f.indexOf(_), C = l ? f.indexOf(l) : -1, m = u.layersWithOutsidePointerEventsDisabled.size > 0, y = C >= v, E = kf((x) => {
      const O = x.target, N = [...u.branches].some((T) => T.contains(O));
      !y || N || (o == null || o(x), a == null || a(x), x.defaultPrevented || s == null || s());
    }, p), A = Lf((x) => {
      const O = x.target;
      [...u.branches].some((T) => T.contains(O)) || (i == null || i(x), a == null || a(x), x.defaultPrevented || s == null || s());
    }, p);
    return Af((x) => {
      C === u.layers.size - 1 && (r == null || r(x), !x.defaultPrevented && s && (x.preventDefault(), s()));
    }, p), g.useEffect(() => {
      if (l)
        return n && (u.layersWithOutsidePointerEventsDisabled.size === 0 && (Ea = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), u.layersWithOutsidePointerEventsDisabled.add(l)), u.layers.add(l), Ra(), () => {
          n && u.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Ea);
        };
    }, [l, p, n, u]), g.useEffect(() => () => {
      l && (u.layers.delete(l), u.layersWithOutsidePointerEventsDisabled.delete(l), Ra());
    }, [l, u]), g.useEffect(() => {
      const x = () => h({});
      return document.addEventListener(ho, x), () => document.removeEventListener(ho, x);
    }, []), /* @__PURE__ */ R(
      le.div,
      {
        ...c,
        ref: b,
        style: {
          pointerEvents: m ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: Z(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: Z(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: Z(
          e.onPointerDownCapture,
          E.onPointerDownCapture
        )
      }
    );
  }
);
Hn.displayName = Tf;
var Mf = "DismissableLayerBranch", Df = g.forwardRef((e, t) => {
  const n = g.useContext(tc), r = g.useRef(null), o = ye(t, r);
  return g.useEffect(() => {
    const i = r.current;
    if (i)
      return n.branches.add(i), () => {
        n.branches.delete(i);
      };
  }, [n.branches]), /* @__PURE__ */ R(le.div, { ...e, ref: o });
});
Df.displayName = Mf;
function kf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e), r = g.useRef(!1), o = g.useRef(() => {
  });
  return g.useEffect(() => {
    const i = (s) => {
      if (s.target && !r.current) {
        let c = function() {
          nc(
            Nf,
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
function Lf(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = xe(e), r = g.useRef(!1);
  return g.useEffect(() => {
    const o = (i) => {
      i.target && !r.current && nc(If, n, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Ra() {
  const e = new CustomEvent(ho);
  document.dispatchEvent(e);
}
function nc(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Cn(o, i) : o.dispatchEvent(i);
}
var Or = 0;
function rc() {
  g.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? wa()), document.body.insertAdjacentElement("beforeend", e[1] ?? wa()), Or++, () => {
      Or === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), Or--;
    };
  }, []);
}
function wa() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ar = "focusScope.autoFocusOnMount", Tr = "focusScope.autoFocusOnUnmount", Sa = { bubbles: !1, cancelable: !0 }, jf = "FocusScope", Zo = g.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: i,
    ...a
  } = e, [s, c] = g.useState(null), u = xe(o), l = xe(i), d = g.useRef(null), p = ye(t, (f) => c(f)), h = g.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  g.useEffect(() => {
    if (r) {
      let f = function(m) {
        if (h.paused || !s) return;
        const y = m.target;
        s.contains(y) ? d.current = y : Ke(d.current, { select: !0 });
      }, _ = function(m) {
        if (h.paused || !s) return;
        const y = m.relatedTarget;
        y !== null && (s.contains(y) || Ke(d.current, { select: !0 }));
      }, v = function(m) {
        if (document.activeElement === document.body)
          for (const E of m)
            E.removedNodes.length > 0 && Ke(s);
      };
      document.addEventListener("focusin", f), document.addEventListener("focusout", _);
      const C = new MutationObserver(v);
      return s && C.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", f), document.removeEventListener("focusout", _), C.disconnect();
      };
    }
  }, [r, s, h.paused]), g.useEffect(() => {
    if (s) {
      xa.add(h);
      const f = document.activeElement;
      if (!s.contains(f)) {
        const v = new CustomEvent(Ar, Sa);
        s.addEventListener(Ar, u), s.dispatchEvent(v), v.defaultPrevented || (Ff(Gf(oc(s)), { select: !0 }), document.activeElement === f && Ke(s));
      }
      return () => {
        s.removeEventListener(Ar, u), setTimeout(() => {
          const v = new CustomEvent(Tr, Sa);
          s.addEventListener(Tr, l), s.dispatchEvent(v), v.defaultPrevented || Ke(f ?? document.body, { select: !0 }), s.removeEventListener(Tr, l), xa.remove(h);
        }, 0);
      };
    }
  }, [s, u, l, h]);
  const b = g.useCallback(
    (f) => {
      if (!n && !r || h.paused) return;
      const _ = f.key === "Tab" && !f.altKey && !f.ctrlKey && !f.metaKey, v = document.activeElement;
      if (_ && v) {
        const C = f.currentTarget, [m, y] = Hf(C);
        m && y ? !f.shiftKey && v === y ? (f.preventDefault(), n && Ke(m, { select: !0 })) : f.shiftKey && v === m && (f.preventDefault(), n && Ke(y, { select: !0 })) : v === C && f.preventDefault();
      }
    },
    [n, r, h.paused]
  );
  return /* @__PURE__ */ R(le.div, { tabIndex: -1, ...a, ref: p, onKeyDown: b });
});
Zo.displayName = jf;
function Ff(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Ke(r, { select: t }), document.activeElement !== n) return;
}
function Hf(e) {
  const t = oc(e), n = Ca(t, e), r = Ca(t.reverse(), e);
  return [n, r];
}
function oc(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Ca(e, t) {
  for (const n of e)
    if (!$f(n, { upTo: t })) return n;
}
function $f(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Uf(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Ke(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && Uf(e) && t && e.select();
  }
}
var xa = Bf();
function Bf() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = Pa(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = Pa(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function Pa(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function Gf(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ce = globalThis != null && globalThis.document ? g.useLayoutEffect : () => {
}, zf = g[" useId ".trim().toString()] || (() => {
}), Vf = 0;
function Qe(e) {
  const [t, n] = g.useState(zf());
  return Ce(() => {
    n((r) => r ?? String(Vf++));
  }, [e]), t ? `radix-${t}` : "";
}
const qf = ["top", "right", "bottom", "left"], Ze = Math.min, Ne = Math.max, xn = Math.round, on = Math.floor, $e = (e) => ({
  x: e,
  y: e
}), Xf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Wf = {
  start: "end",
  end: "start"
};
function go(e, t, n) {
  return Ne(e, Ze(t, n));
}
function ze(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ve(e) {
  return e.split("-")[0];
}
function xt(e) {
  return e.split("-")[1];
}
function Jo(e) {
  return e === "x" ? "y" : "x";
}
function ei(e) {
  return e === "y" ? "height" : "width";
}
function Je(e) {
  return ["top", "bottom"].includes(Ve(e)) ? "y" : "x";
}
function ti(e) {
  return Jo(Je(e));
}
function Kf(e, t, n) {
  n === void 0 && (n = !1);
  const r = xt(e), o = ti(e), i = ei(o);
  let a = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (a = Pn(a)), [a, Pn(a)];
}
function Yf(e) {
  const t = Pn(e);
  return [vo(e), t, vo(t)];
}
function vo(e) {
  return e.replace(/start|end/g, (t) => Wf[t]);
}
function Qf(e, t, n) {
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
function Zf(e, t, n, r) {
  const o = xt(e);
  let i = Qf(Ve(e), n === "start", r);
  return o && (i = i.map((a) => a + "-" + o), t && (i = i.concat(i.map(vo)))), i;
}
function Pn(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Xf[t]);
}
function Jf(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function ic(e) {
  return typeof e != "number" ? Jf(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function On(e) {
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
function Oa(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const i = Je(t), a = ti(t), s = ei(a), c = Ve(t), u = i === "y", l = r.x + r.width / 2 - o.width / 2, d = r.y + r.height / 2 - o.height / 2, p = r[s] / 2 - o[s] / 2;
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
  switch (xt(t)) {
    case "start":
      h[a] -= p * (n && u ? -1 : 1);
      break;
    case "end":
      h[a] += p * (n && u ? -1 : 1);
      break;
  }
  return h;
}
const ep = async (e, t, n) => {
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
  } = Oa(u, r, c), p = r, h = {}, b = 0;
  for (let f = 0; f < s.length; f++) {
    const {
      name: _,
      fn: v
    } = s[f], {
      x: C,
      y: m,
      data: y,
      reset: E
    } = await v({
      x: l,
      y: d,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: h,
      rects: u,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    l = C ?? l, d = m ?? d, h = {
      ...h,
      [_]: {
        ...h[_],
        ...y
      }
    }, E && b <= 50 && (b++, typeof E == "object" && (E.placement && (p = E.placement), E.rects && (u = E.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : E.rects), {
      x: l,
      y: d
    } = Oa(u, p, c)), f = -1);
  }
  return {
    x: l,
    y: d,
    placement: p,
    strategy: o,
    middlewareData: h
  };
};
async function Mt(e, t) {
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
    altBoundary: p = !1,
    padding: h = 0
  } = ze(t, e), b = ic(h), _ = s[p ? d === "floating" ? "reference" : "floating" : d], v = On(await i.getClippingRect({
    element: (n = await (i.isElement == null ? void 0 : i.isElement(_))) == null || n ? _ : _.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: u,
    rootBoundary: l,
    strategy: c
  })), C = d === "floating" ? {
    x: r,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, m = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), y = await (i.isElement == null ? void 0 : i.isElement(m)) ? await (i.getScale == null ? void 0 : i.getScale(m)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, E = On(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: C,
    offsetParent: m,
    strategy: c
  }) : C);
  return {
    top: (v.top - E.top + b.top) / y.y,
    bottom: (E.bottom - v.bottom + b.bottom) / y.y,
    left: (v.left - E.left + b.left) / y.x,
    right: (E.right - v.right + b.right) / y.x
  };
}
const tp = (e) => ({
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
    } = ze(e, t) || {};
    if (u == null)
      return {};
    const d = ic(l), p = {
      x: n,
      y: r
    }, h = ti(o), b = ei(h), f = await a.getDimensions(u), _ = h === "y", v = _ ? "top" : "left", C = _ ? "bottom" : "right", m = _ ? "clientHeight" : "clientWidth", y = i.reference[b] + i.reference[h] - p[h] - i.floating[b], E = p[h] - i.reference[h], A = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(u));
    let x = A ? A[m] : 0;
    (!x || !await (a.isElement == null ? void 0 : a.isElement(A))) && (x = s.floating[m] || i.floating[b]);
    const O = y / 2 - E / 2, N = x / 2 - f[b] / 2 - 1, T = Ze(d[v], N), M = Ze(d[C], N), k = T, B = x - f[b] - M, j = x / 2 - f[b] / 2 + O, G = go(k, j, B), F = !c.arrow && xt(o) != null && j !== G && i.reference[b] / 2 - (j < k ? T : M) - f[b] / 2 < 0, Q = F ? j < k ? j - k : j - B : 0;
    return {
      [h]: p[h] + Q,
      data: {
        [h]: G,
        centerOffset: j - G - Q,
        ...F && {
          alignmentOffset: Q
        }
      },
      reset: F
    };
  }
}), np = function(e) {
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
        fallbackPlacements: p,
        fallbackStrategy: h = "bestFit",
        fallbackAxisSideDirection: b = "none",
        flipAlignment: f = !0,
        ..._
      } = ze(e, t);
      if ((n = i.arrow) != null && n.alignmentOffset)
        return {};
      const v = Ve(o), C = Je(s), m = Ve(s) === s, y = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)), E = p || (m || !f ? [Pn(s)] : Yf(s)), A = b !== "none";
      !p && A && E.push(...Zf(s, f, b, y));
      const x = [s, ...E], O = await Mt(t, _), N = [];
      let T = ((r = i.flip) == null ? void 0 : r.overflows) || [];
      if (l && N.push(O[v]), d) {
        const j = Kf(o, a, y);
        N.push(O[j[0]], O[j[1]]);
      }
      if (T = [...T, {
        placement: o,
        overflows: N
      }], !N.every((j) => j <= 0)) {
        var M, k;
        const j = (((M = i.flip) == null ? void 0 : M.index) || 0) + 1, G = x[j];
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
        let F = (k = T.filter((Q) => Q.overflows[0] <= 0).sort((Q, I) => Q.overflows[1] - I.overflows[1])[0]) == null ? void 0 : k.placement;
        if (!F)
          switch (h) {
            case "bestFit": {
              var B;
              const Q = (B = T.filter((I) => {
                if (A) {
                  const D = Je(I.placement);
                  return D === C || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  D === "y";
                }
                return !0;
              }).map((I) => [I.placement, I.overflows.filter((D) => D > 0).reduce((D, W) => D + W, 0)]).sort((I, D) => I[1] - D[1])[0]) == null ? void 0 : B[0];
              Q && (F = Q);
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
function Aa(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function Ta(e) {
  return qf.some((t) => e[t] >= 0);
}
const rp = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = ze(e, t);
      switch (r) {
        case "referenceHidden": {
          const i = await Mt(t, {
            ...o,
            elementContext: "reference"
          }), a = Aa(i, n.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: Ta(a)
            }
          };
        }
        case "escaped": {
          const i = await Mt(t, {
            ...o,
            altBoundary: !0
          }), a = Aa(i, n.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: Ta(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function op(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), a = Ve(n), s = xt(n), c = Je(n) === "y", u = ["left", "top"].includes(a) ? -1 : 1, l = i && c ? -1 : 1, d = ze(t, e);
  let {
    mainAxis: p,
    crossAxis: h,
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
  return s && typeof b == "number" && (h = s === "end" ? b * -1 : b), c ? {
    x: h * l,
    y: p * u
  } : {
    x: p * u,
    y: h * l
  };
}
const ip = function(e) {
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
      } = t, c = await op(t, e);
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
}, ap = function(e) {
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
          fn: (_) => {
            let {
              x: v,
              y: C
            } = _;
            return {
              x: v,
              y: C
            };
          }
        },
        ...c
      } = ze(e, t), u = {
        x: n,
        y: r
      }, l = await Mt(t, c), d = Je(Ve(o)), p = Jo(d);
      let h = u[p], b = u[d];
      if (i) {
        const _ = p === "y" ? "top" : "left", v = p === "y" ? "bottom" : "right", C = h + l[_], m = h - l[v];
        h = go(C, h, m);
      }
      if (a) {
        const _ = d === "y" ? "top" : "left", v = d === "y" ? "bottom" : "right", C = b + l[_], m = b - l[v];
        b = go(C, b, m);
      }
      const f = s.fn({
        ...t,
        [p]: h,
        [d]: b
      });
      return {
        ...f,
        data: {
          x: f.x - n,
          y: f.y - r,
          enabled: {
            [p]: i,
            [d]: a
          }
        }
      };
    }
  };
}, sp = function(e) {
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
      } = ze(e, t), l = {
        x: n,
        y: r
      }, d = Je(o), p = Jo(d);
      let h = l[p], b = l[d];
      const f = ze(s, t), _ = typeof f == "number" ? {
        mainAxis: f,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...f
      };
      if (c) {
        const m = p === "y" ? "height" : "width", y = i.reference[p] - i.floating[m] + _.mainAxis, E = i.reference[p] + i.reference[m] - _.mainAxis;
        h < y ? h = y : h > E && (h = E);
      }
      if (u) {
        var v, C;
        const m = p === "y" ? "width" : "height", y = ["top", "left"].includes(Ve(o)), E = i.reference[d] - i.floating[m] + (y && ((v = a.offset) == null ? void 0 : v[d]) || 0) + (y ? 0 : _.crossAxis), A = i.reference[d] + i.reference[m] + (y ? 0 : ((C = a.offset) == null ? void 0 : C[d]) || 0) - (y ? _.crossAxis : 0);
        b < E ? b = E : b > A && (b = A);
      }
      return {
        [p]: h,
        [d]: b
      };
    }
  };
}, cp = function(e) {
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
      } = ze(e, t), l = await Mt(t, u), d = Ve(o), p = xt(o), h = Je(o) === "y", {
        width: b,
        height: f
      } = i.floating;
      let _, v;
      d === "top" || d === "bottom" ? (_ = d, v = p === (await (a.isRTL == null ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (v = d, _ = p === "end" ? "top" : "bottom");
      const C = f - l.top - l.bottom, m = b - l.left - l.right, y = Ze(f - l[_], C), E = Ze(b - l[v], m), A = !t.middlewareData.shift;
      let x = y, O = E;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (O = m), (r = t.middlewareData.shift) != null && r.enabled.y && (x = C), A && !p) {
        const T = Ne(l.left, 0), M = Ne(l.right, 0), k = Ne(l.top, 0), B = Ne(l.bottom, 0);
        h ? O = b - 2 * (T !== 0 || M !== 0 ? T + M : Ne(l.left, l.right)) : x = f - 2 * (k !== 0 || B !== 0 ? k + B : Ne(l.top, l.bottom));
      }
      await c({
        ...t,
        availableWidth: O,
        availableHeight: x
      });
      const N = await a.getDimensions(s.floating);
      return b !== N.width || f !== N.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function $n() {
  return typeof window < "u";
}
function Pt(e) {
  return ac(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Ie(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Be(e) {
  var t;
  return (t = (ac(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ac(e) {
  return $n() ? e instanceof Node || e instanceof Ie(e).Node : !1;
}
function Le(e) {
  return $n() ? e instanceof Element || e instanceof Ie(e).Element : !1;
}
function Ue(e) {
  return $n() ? e instanceof HTMLElement || e instanceof Ie(e).HTMLElement : !1;
}
function Na(e) {
  return !$n() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof Ie(e).ShadowRoot;
}
function $t(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = je(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function up(e) {
  return ["table", "td", "th"].includes(Pt(e));
}
function Un(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function ni(e) {
  const t = ri(), n = Le(e) ? je(e) : e;
  return ["transform", "translate", "scale", "rotate", "perspective"].some((r) => n[r] ? n[r] !== "none" : !1) || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function lp(e) {
  let t = et(e);
  for (; Ue(t) && !yt(t); ) {
    if (ni(t))
      return t;
    if (Un(t))
      return null;
    t = et(t);
  }
  return null;
}
function ri() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function yt(e) {
  return ["html", "body", "#document"].includes(Pt(e));
}
function je(e) {
  return Ie(e).getComputedStyle(e);
}
function Bn(e) {
  return Le(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function et(e) {
  if (Pt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    Na(e) && e.host || // Fallback.
    Be(e)
  );
  return Na(t) ? t.host : t;
}
function sc(e) {
  const t = et(e);
  return yt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ue(t) && $t(t) ? t : sc(t);
}
function Dt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = sc(e), i = o === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Ie(o);
  if (i) {
    const s = _o(a);
    return t.concat(a, a.visualViewport || [], $t(o) ? o : [], s && n ? Dt(s) : []);
  }
  return t.concat(o, Dt(o, [], n));
}
function _o(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function cc(e) {
  const t = je(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = Ue(e), i = o ? e.offsetWidth : n, a = o ? e.offsetHeight : r, s = xn(n) !== i || xn(r) !== a;
  return s && (n = i, r = a), {
    width: n,
    height: r,
    $: s
  };
}
function oi(e) {
  return Le(e) ? e : e.contextElement;
}
function vt(e) {
  const t = oi(e);
  if (!Ue(t))
    return $e(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: i
  } = cc(t);
  let a = (i ? xn(n.width) : n.width) / r, s = (i ? xn(n.height) : n.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: a,
    y: s
  };
}
const dp = /* @__PURE__ */ $e(0);
function uc(e) {
  const t = Ie(e);
  return !ri() || !t.visualViewport ? dp : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function fp(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== Ie(e) ? !1 : t;
}
function ot(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), i = oi(e);
  let a = $e(1);
  t && (r ? Le(r) && (a = vt(r)) : a = vt(e));
  const s = fp(i, n, r) ? uc(i) : $e(0);
  let c = (o.left + s.x) / a.x, u = (o.top + s.y) / a.y, l = o.width / a.x, d = o.height / a.y;
  if (i) {
    const p = Ie(i), h = r && Le(r) ? Ie(r) : r;
    let b = p, f = _o(b);
    for (; f && r && h !== b; ) {
      const _ = vt(f), v = f.getBoundingClientRect(), C = je(f), m = v.left + (f.clientLeft + parseFloat(C.paddingLeft)) * _.x, y = v.top + (f.clientTop + parseFloat(C.paddingTop)) * _.y;
      c *= _.x, u *= _.y, l *= _.x, d *= _.y, c += m, u += y, b = Ie(f), f = _o(b);
    }
  }
  return On({
    width: l,
    height: d,
    x: c,
    y: u
  });
}
function ii(e, t) {
  const n = Bn(e).scrollLeft;
  return t ? t.left + n : ot(Be(e)).left + n;
}
function lc(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    ii(e, r)
  )), i = r.top + t.scrollTop;
  return {
    x: o,
    y: i
  };
}
function pp(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const i = o === "fixed", a = Be(r), s = t ? Un(t.floating) : !1;
  if (r === a || s && i)
    return n;
  let c = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = $e(1);
  const l = $e(0), d = Ue(r);
  if ((d || !d && !i) && ((Pt(r) !== "body" || $t(a)) && (c = Bn(r)), Ue(r))) {
    const h = ot(r);
    u = vt(r), l.x = h.x + r.clientLeft, l.y = h.y + r.clientTop;
  }
  const p = a && !d && !i ? lc(a, c, !0) : $e(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + l.x + p.x,
    y: n.y * u.y - c.scrollTop * u.y + l.y + p.y
  };
}
function mp(e) {
  return Array.from(e.getClientRects());
}
function hp(e) {
  const t = Be(e), n = Bn(e), r = e.ownerDocument.body, o = Ne(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), i = Ne(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + ii(e);
  const s = -n.scrollTop;
  return je(r).direction === "rtl" && (a += Ne(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: i,
    x: a,
    y: s
  };
}
function gp(e, t) {
  const n = Ie(e), r = Be(e), o = n.visualViewport;
  let i = r.clientWidth, a = r.clientHeight, s = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    const u = ri();
    (!u || u && t === "fixed") && (s = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: s,
    y: c
  };
}
function vp(e, t) {
  const n = ot(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, i = Ue(e) ? vt(e) : $e(1), a = e.clientWidth * i.x, s = e.clientHeight * i.y, c = o * i.x, u = r * i.y;
  return {
    width: a,
    height: s,
    x: c,
    y: u
  };
}
function Ia(e, t, n) {
  let r;
  if (t === "viewport")
    r = gp(e, n);
  else if (t === "document")
    r = hp(Be(e));
  else if (Le(t))
    r = vp(t, n);
  else {
    const o = uc(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return On(r);
}
function dc(e, t) {
  const n = et(e);
  return n === t || !Le(n) || yt(n) ? !1 : je(n).position === "fixed" || dc(n, t);
}
function _p(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Dt(e, [], !1).filter((s) => Le(s) && Pt(s) !== "body"), o = null;
  const i = je(e).position === "fixed";
  let a = i ? et(e) : e;
  for (; Le(a) && !yt(a); ) {
    const s = je(a), c = ni(a);
    !c && s.position === "fixed" && (o = null), (i ? !c && !o : !c && s.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || $t(a) && !c && dc(e, a)) ? r = r.filter((l) => l !== a) : o = s, a = et(a);
  }
  return t.set(e, r), r;
}
function bp(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const a = [...n === "clippingAncestors" ? Un(t) ? [] : _p(t, this._c) : [].concat(n), r], s = a[0], c = a.reduce((u, l) => {
    const d = Ia(t, l, o);
    return u.top = Ne(d.top, u.top), u.right = Ze(d.right, u.right), u.bottom = Ze(d.bottom, u.bottom), u.left = Ne(d.left, u.left), u;
  }, Ia(t, s, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top
  };
}
function yp(e) {
  const {
    width: t,
    height: n
  } = cc(e);
  return {
    width: t,
    height: n
  };
}
function Ep(e, t, n) {
  const r = Ue(t), o = Be(t), i = n === "fixed", a = ot(e, !0, i, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const c = $e(0);
  if (r || !r && !i)
    if ((Pt(t) !== "body" || $t(o)) && (s = Bn(t)), r) {
      const p = ot(t, !0, i, t);
      c.x = p.x + t.clientLeft, c.y = p.y + t.clientTop;
    } else o && (c.x = ii(o));
  const u = o && !r && !i ? lc(o, s) : $e(0), l = a.left + s.scrollLeft - c.x - u.x, d = a.top + s.scrollTop - c.y - u.y;
  return {
    x: l,
    y: d,
    width: a.width,
    height: a.height
  };
}
function Nr(e) {
  return je(e).position === "static";
}
function Ma(e, t) {
  if (!Ue(e) || je(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return Be(e) === n && (n = n.ownerDocument.body), n;
}
function fc(e, t) {
  const n = Ie(e);
  if (Un(e))
    return n;
  if (!Ue(e)) {
    let o = et(e);
    for (; o && !yt(o); ) {
      if (Le(o) && !Nr(o))
        return o;
      o = et(o);
    }
    return n;
  }
  let r = Ma(e, t);
  for (; r && up(r) && Nr(r); )
    r = Ma(r, t);
  return r && yt(r) && Nr(r) && !ni(r) ? n : r || lp(e) || n;
}
const Rp = async function(e) {
  const t = this.getOffsetParent || fc, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Ep(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function wp(e) {
  return je(e).direction === "rtl";
}
const Sp = {
  convertOffsetParentRelativeRectToViewportRelativeRect: pp,
  getDocumentElement: Be,
  getClippingRect: bp,
  getOffsetParent: fc,
  getElementRects: Rp,
  getClientRects: mp,
  getDimensions: yp,
  getScale: vt,
  isElement: Le,
  isRTL: wp
};
function pc(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Cp(e, t) {
  let n = null, r;
  const o = Be(e);
  function i() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), n = null;
  }
  function a(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), i();
    const u = e.getBoundingClientRect(), {
      left: l,
      top: d,
      width: p,
      height: h
    } = u;
    if (s || t(), !p || !h)
      return;
    const b = on(d), f = on(o.clientWidth - (l + p)), _ = on(o.clientHeight - (d + h)), v = on(l), m = {
      rootMargin: -b + "px " + -f + "px " + -_ + "px " + -v + "px",
      threshold: Ne(0, Ze(1, c)) || 1
    };
    let y = !0;
    function E(A) {
      const x = A[0].intersectionRatio;
      if (x !== c) {
        if (!y)
          return a();
        x ? a(!1, x) : r = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      x === 1 && !pc(u, e.getBoundingClientRect()) && a(), y = !1;
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
  return a(!0), i;
}
function xp(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: c = !1
  } = r, u = oi(e), l = o || i ? [...u ? Dt(u) : [], ...Dt(t)] : [];
  l.forEach((v) => {
    o && v.addEventListener("scroll", n, {
      passive: !0
    }), i && v.addEventListener("resize", n);
  });
  const d = u && s ? Cp(u, n) : null;
  let p = -1, h = null;
  a && (h = new ResizeObserver((v) => {
    let [C] = v;
    C && C.target === u && h && (h.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var m;
      (m = h) == null || m.observe(t);
    })), n();
  }), u && !c && h.observe(u), h.observe(t));
  let b, f = c ? ot(e) : null;
  c && _();
  function _() {
    const v = ot(e);
    f && !pc(f, v) && n(), f = v, b = requestAnimationFrame(_);
  }
  return n(), () => {
    var v;
    l.forEach((C) => {
      o && C.removeEventListener("scroll", n), i && C.removeEventListener("resize", n);
    }), d == null || d(), (v = h) == null || v.disconnect(), h = null, c && cancelAnimationFrame(b);
  };
}
const Pp = ip, Op = ap, Ap = np, Tp = cp, Np = rp, Da = tp, Ip = sp, Mp = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Sp,
    ...n
  }, i = {
    ...o.platform,
    _c: r
  };
  return ep(e, t, {
    ...o,
    platform: i
  });
};
var En = typeof document < "u" ? kl : Ps;
function An(e, t) {
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
        if (!An(e[r], t[r]))
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
      if (!(i === "_owner" && e.$$typeof) && !An(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function mc(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function ka(e, t) {
  const n = mc(e);
  return Math.round(t * n) / n;
}
function Ir(e) {
  const t = g.useRef(e);
  return En(() => {
    t.current = e;
  }), t;
}
function Dp(e) {
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
  } = e, [l, d] = g.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, h] = g.useState(r);
  An(p, r) || h(r);
  const [b, f] = g.useState(null), [_, v] = g.useState(null), C = g.useCallback((I) => {
    I !== A.current && (A.current = I, f(I));
  }, []), m = g.useCallback((I) => {
    I !== x.current && (x.current = I, v(I));
  }, []), y = i || b, E = a || _, A = g.useRef(null), x = g.useRef(null), O = g.useRef(l), N = c != null, T = Ir(c), M = Ir(o), k = Ir(u), B = g.useCallback(() => {
    if (!A.current || !x.current)
      return;
    const I = {
      placement: t,
      strategy: n,
      middleware: p
    };
    M.current && (I.platform = M.current), Mp(A.current, x.current, I).then((D) => {
      const W = {
        ...D,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: k.current !== !1
      };
      j.current && !An(O.current, W) && (O.current = W, Dn.flushSync(() => {
        d(W);
      }));
    });
  }, [p, t, n, M, k]);
  En(() => {
    u === !1 && O.current.isPositioned && (O.current.isPositioned = !1, d((I) => ({
      ...I,
      isPositioned: !1
    })));
  }, [u]);
  const j = g.useRef(!1);
  En(() => (j.current = !0, () => {
    j.current = !1;
  }), []), En(() => {
    if (y && (A.current = y), E && (x.current = E), y && E) {
      if (T.current)
        return T.current(y, E, B);
      B();
    }
  }, [y, E, B, T, N]);
  const G = g.useMemo(() => ({
    reference: A,
    floating: x,
    setReference: C,
    setFloating: m
  }), [C, m]), F = g.useMemo(() => ({
    reference: y,
    floating: E
  }), [y, E]), Q = g.useMemo(() => {
    const I = {
      position: n,
      left: 0,
      top: 0
    };
    if (!F.floating)
      return I;
    const D = ka(F.floating, l.x), W = ka(F.floating, l.y);
    return s ? {
      ...I,
      transform: "translate(" + D + "px, " + W + "px)",
      ...mc(F.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: D,
      top: W
    };
  }, [n, s, F.floating, l.x, l.y]);
  return g.useMemo(() => ({
    ...l,
    update: B,
    refs: G,
    elements: F,
    floatingStyles: Q
  }), [l, B, G, F, Q]);
}
const kp = (e) => {
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
      return r && t(r) ? r.current != null ? Da({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? Da({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, Lp = (e, t) => ({
  ...Pp(e),
  options: [e, t]
}), jp = (e, t) => ({
  ...Op(e),
  options: [e, t]
}), Fp = (e, t) => ({
  ...Ip(e),
  options: [e, t]
}), Hp = (e, t) => ({
  ...Ap(e),
  options: [e, t]
}), $p = (e, t) => ({
  ...Tp(e),
  options: [e, t]
}), Up = (e, t) => ({
  ...Np(e),
  options: [e, t]
}), Bp = (e, t) => ({
  ...kp(e),
  options: [e, t]
});
var Gp = "Arrow", hc = g.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...i } = e;
  return /* @__PURE__ */ R(
    le.svg,
    {
      ...i,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ R("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
hc.displayName = Gp;
var zp = hc;
function Vp(e) {
  const [t, n] = g.useState(void 0);
  return Ce(() => {
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
var ai = "Popper", [gc, Gn] = ct(ai), [qp, vc] = gc(ai), _c = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = g.useState(null);
  return /* @__PURE__ */ R(qp, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
_c.displayName = ai;
var bc = "PopperAnchor", yc = g.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, i = vc(bc, n), a = g.useRef(null), s = ye(t, a);
    return g.useEffect(() => {
      i.onAnchorChange((r == null ? void 0 : r.current) || a.current);
    }), r ? null : /* @__PURE__ */ R(le.div, { ...o, ref: s });
  }
);
yc.displayName = bc;
var si = "PopperContent", [Xp, Wp] = gc(si), Ec = g.forwardRef(
  (e, t) => {
    var P, te, z, K, w, S;
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
      hideWhenDetached: p = !1,
      updatePositionStrategy: h = "optimized",
      onPlaced: b,
      ...f
    } = e, _ = vc(si, n), [v, C] = g.useState(null), m = ye(t, ($) => C($)), [y, E] = g.useState(null), A = Vp(y), x = (A == null ? void 0 : A.width) ?? 0, O = (A == null ? void 0 : A.height) ?? 0, N = r + (i !== "center" ? "-" + i : ""), T = typeof l == "number" ? l : { top: 0, right: 0, bottom: 0, left: 0, ...l }, M = Array.isArray(u) ? u : [u], k = M.length > 0, B = {
      padding: T,
      boundary: M.filter(Yp),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: k
    }, { refs: j, floatingStyles: G, placement: F, isPositioned: Q, middlewareData: I } = Dp({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: N,
      whileElementsMounted: (...$) => xp(...$, {
        animationFrame: h === "always"
      }),
      elements: {
        reference: _.anchor
      },
      middleware: [
        Lp({ mainAxis: o + O, alignmentAxis: a }),
        c && jp({
          mainAxis: !0,
          crossAxis: !1,
          limiter: d === "partial" ? Fp() : void 0,
          ...B
        }),
        c && Hp({ ...B }),
        $p({
          ...B,
          apply: ({ elements: $, rects: H, availableWidth: U, availableHeight: X }) => {
            const { width: he, height: _e } = H.reference, me = $.floating.style;
            me.setProperty("--radix-popper-available-width", `${U}px`), me.setProperty("--radix-popper-available-height", `${X}px`), me.setProperty("--radix-popper-anchor-width", `${he}px`), me.setProperty("--radix-popper-anchor-height", `${_e}px`);
          }
        }),
        y && Bp({ element: y, padding: s }),
        Qp({ arrowWidth: x, arrowHeight: O }),
        p && Up({ strategy: "referenceHidden", ...B })
      ]
    }), [D, W] = Sc(F), se = xe(b);
    Ce(() => {
      Q && (se == null || se());
    }, [Q, se]);
    const re = (P = I.arrow) == null ? void 0 : P.x, ne = (te = I.arrow) == null ? void 0 : te.y, Y = ((z = I.arrow) == null ? void 0 : z.centerOffset) !== 0, [pe, ie] = g.useState();
    return Ce(() => {
      v && ie(window.getComputedStyle(v).zIndex);
    }, [v]), /* @__PURE__ */ R(
      "div",
      {
        ref: j.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...G,
          transform: Q ? G.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: pe,
          "--radix-popper-transform-origin": [
            (K = I.transformOrigin) == null ? void 0 : K.x,
            (w = I.transformOrigin) == null ? void 0 : w.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((S = I.hide) == null ? void 0 : S.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ R(
          Xp,
          {
            scope: n,
            placedSide: D,
            onArrowChange: E,
            arrowX: re,
            arrowY: ne,
            shouldHideArrow: Y,
            children: /* @__PURE__ */ R(
              le.div,
              {
                "data-side": D,
                "data-align": W,
                ...f,
                ref: m,
                style: {
                  ...f.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: Q ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Ec.displayName = si;
var Rc = "PopperArrow", Kp = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, wc = g.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, i = Wp(Rc, r), a = Kp[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ R(
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
        children: /* @__PURE__ */ R(
          zp,
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
wc.displayName = Rc;
function Yp(e) {
  return e !== null;
}
var Qp = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var _, v, C;
    const { placement: n, rects: r, middlewareData: o } = t, a = ((_ = o.arrow) == null ? void 0 : _.centerOffset) !== 0, s = a ? 0 : e.arrowWidth, c = a ? 0 : e.arrowHeight, [u, l] = Sc(n), d = { start: "0%", center: "50%", end: "100%" }[l], p = (((v = o.arrow) == null ? void 0 : v.x) ?? 0) + s / 2, h = (((C = o.arrow) == null ? void 0 : C.y) ?? 0) + c / 2;
    let b = "", f = "";
    return u === "bottom" ? (b = a ? d : `${p}px`, f = `${-c}px`) : u === "top" ? (b = a ? d : `${p}px`, f = `${r.floating.height + c}px`) : u === "right" ? (b = `${-c}px`, f = a ? d : `${h}px`) : u === "left" && (b = `${r.floating.width + c}px`, f = a ? d : `${h}px`), { data: { x: b, y: f } };
  }
});
function Sc(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Cc = _c, xc = yc, Pc = Ec, Oc = wc, Zp = "Portal", ci = g.forwardRef((e, t) => {
  var s;
  const { container: n, ...r } = e, [o, i] = g.useState(!1);
  Ce(() => i(!0), []);
  const a = n || o && ((s = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : s.body);
  return a ? Xo.createPortal(/* @__PURE__ */ R(le.div, { ...r, ref: t }), a) : null;
});
ci.displayName = Zp;
var Jp = g[" useInsertionEffect ".trim().toString()] || Ce;
function Et({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  },
  caller: r
}) {
  const [o, i, a] = em({
    defaultProp: t,
    onChange: n
  }), s = e !== void 0, c = s ? e : o;
  {
    const l = g.useRef(e !== void 0);
    g.useEffect(() => {
      const d = l.current;
      d !== s && console.warn(
        `${r} is changing from ${d ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), l.current = s;
    }, [s, r]);
  }
  const u = g.useCallback(
    (l) => {
      var d;
      if (s) {
        const p = tm(l) ? l(e) : l;
        p !== e && ((d = a.current) == null || d.call(a, p));
      } else
        i(l);
    },
    [s, e, i, a]
  );
  return [c, u];
}
function em({
  defaultProp: e,
  onChange: t
}) {
  const [n, r] = g.useState(e), o = g.useRef(n), i = g.useRef(t);
  return Jp(() => {
    i.current = t;
  }, [t]), g.useEffect(() => {
    var a;
    o.current !== n && ((a = i.current) == null || a.call(i, n), o.current = n);
  }, [n, o]), [n, r, i];
}
function tm(e) {
  return typeof e == "function";
}
function Ac(e) {
  const t = g.useRef({ value: e, previous: e });
  return g.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Tc = Object.freeze({
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
}), nm = "VisuallyHidden", Nc = g.forwardRef(
  (e, t) => /* @__PURE__ */ R(
    le.span,
    {
      ...e,
      ref: t,
      style: { ...Tc, ...e.style }
    }
  )
);
Nc.displayName = nm;
var rm = Nc, om = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, pt = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap(), sn = {}, Mr = 0, Ic = function(e) {
  return e && (e.host || Ic(e.parentNode));
}, im = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = Ic(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, am = function(e, t, n, r) {
  var o = im(t, Array.isArray(e) ? e : [e]);
  sn[n] || (sn[n] = /* @__PURE__ */ new WeakMap());
  var i = sn[n], a = [], s = /* @__PURE__ */ new Set(), c = new Set(o), u = function(d) {
    !d || s.has(d) || (s.add(d), u(d.parentNode));
  };
  o.forEach(u);
  var l = function(d) {
    !d || c.has(d) || Array.prototype.forEach.call(d.children, function(p) {
      if (s.has(p))
        l(p);
      else
        try {
          var h = p.getAttribute(r), b = h !== null && h !== "false", f = (pt.get(p) || 0) + 1, _ = (i.get(p) || 0) + 1;
          pt.set(p, f), i.set(p, _), a.push(p), f === 1 && b && an.set(p, !0), _ === 1 && p.setAttribute(n, "true"), b || p.setAttribute(r, "true");
        } catch (v) {
          console.error("aria-hidden: cannot operate on ", p, v);
        }
    });
  };
  return l(t), s.clear(), Mr++, function() {
    a.forEach(function(d) {
      var p = pt.get(d) - 1, h = i.get(d) - 1;
      pt.set(d, p), i.set(d, h), p || (an.has(d) || d.removeAttribute(r), an.delete(d)), h || d.removeAttribute(n);
    }), Mr--, Mr || (pt = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), an = /* @__PURE__ */ new WeakMap(), sn = {});
  };
}, Mc = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = om(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), am(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, He = function() {
  return He = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
    }
    return t;
  }, He.apply(this, arguments);
};
function Dc(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function sm(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, i; r < o; r++)
    (i || !(r in t)) && (i || (i = Array.prototype.slice.call(t, 0, r)), i[r] = t[r]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var Rn = "right-scroll-bar-position", wn = "width-before-scroll-bar", cm = "with-scroll-bars-hidden", um = "--removed-body-scroll-bar-size";
function Dr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function lm(e, t) {
  var n = qo(function() {
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
var dm = typeof window < "u" ? g.useLayoutEffect : g.useEffect, La = /* @__PURE__ */ new WeakMap();
function fm(e, t) {
  var n = lm(null, function(r) {
    return e.forEach(function(o) {
      return Dr(o, r);
    });
  });
  return dm(function() {
    var r = La.get(n);
    if (r) {
      var o = new Set(r), i = new Set(e), a = n.current;
      o.forEach(function(s) {
        i.has(s) || Dr(s, null);
      }), i.forEach(function(s) {
        o.has(s) || Dr(s, a);
      });
    }
    La.set(n, e);
  }, [e]), n;
}
function pm(e) {
  return e;
}
function mm(e, t) {
  t === void 0 && (t = pm);
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
function hm(e) {
  e === void 0 && (e = {});
  var t = mm(null);
  return t.options = He({ async: !0, ssr: !1 }, e), t;
}
var kc = function(e) {
  var t = e.sideCar, n = Dc(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return g.createElement(r, He({}, n));
};
kc.isSideCarExport = !0;
function gm(e, t) {
  return e.useMedium(t), kc;
}
var Lc = hm(), kr = function() {
}, zn = g.forwardRef(function(e, t) {
  var n = g.useRef(null), r = g.useState({
    onScrollCapture: kr,
    onWheelCapture: kr,
    onTouchMoveCapture: kr
  }), o = r[0], i = r[1], a = e.forwardProps, s = e.children, c = e.className, u = e.removeScrollBar, l = e.enabled, d = e.shards, p = e.sideCar, h = e.noIsolation, b = e.inert, f = e.allowPinchZoom, _ = e.as, v = _ === void 0 ? "div" : _, C = e.gapMode, m = Dc(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), y = p, E = fm([n, t]), A = He(He({}, m), o);
  return g.createElement(
    g.Fragment,
    null,
    l && g.createElement(y, { sideCar: Lc, removeScrollBar: u, shards: d, noIsolation: h, inert: b, setCallbacks: i, allowPinchZoom: !!f, lockRef: n, gapMode: C }),
    a ? g.cloneElement(g.Children.only(s), He(He({}, A), { ref: E })) : g.createElement(v, He({}, A, { className: c, ref: E }), s)
  );
});
zn.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
zn.classNames = {
  fullWidth: wn,
  zeroRight: Rn
};
var vm = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function _m() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = vm();
  return t && e.setAttribute("nonce", t), e;
}
function bm(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function ym(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var Em = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = _m()) && (bm(t, n), ym(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Rm = function() {
  var e = Em();
  return function(t, n) {
    g.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, jc = function() {
  var e = Rm(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, wm = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, Lr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Sm = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [Lr(n), Lr(r), Lr(o)];
}, Cm = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return wm;
  var t = Sm(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, xm = jc(), _t = "data-scroll-locked", Pm = function(e, t, n, r) {
  var o = e.left, i = e.top, a = e.right, s = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(cm, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(s, "px ").concat(r, `;
  }
  body[`).concat(_t, `] {
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
  
  .`).concat(Rn, ` {
    right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(wn, ` {
    margin-right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(Rn, " .").concat(Rn, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(wn, " .").concat(wn, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(_t, `] {
    `).concat(um, ": ").concat(s, `px;
  }
`);
}, ja = function() {
  var e = parseInt(document.body.getAttribute(_t) || "0", 10);
  return isFinite(e) ? e : 0;
}, Om = function() {
  g.useEffect(function() {
    return document.body.setAttribute(_t, (ja() + 1).toString()), function() {
      var e = ja() - 1;
      e <= 0 ? document.body.removeAttribute(_t) : document.body.setAttribute(_t, e.toString());
    };
  }, []);
}, Am = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Om();
  var i = g.useMemo(function() {
    return Cm(o);
  }, [o]);
  return g.createElement(xm, { styles: Pm(i, !t, o, n ? "" : "!important") });
}, bo = !1;
if (typeof window < "u")
  try {
    var cn = Object.defineProperty({}, "passive", {
      get: function() {
        return bo = !0, !0;
      }
    });
    window.addEventListener("test", cn, cn), window.removeEventListener("test", cn, cn);
  } catch {
    bo = !1;
  }
var mt = bo ? { passive: !1 } : !1, Tm = function(e) {
  return e.tagName === "TEXTAREA";
}, Fc = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Tm(e) && n[t] === "visible")
  );
}, Nm = function(e) {
  return Fc(e, "overflowY");
}, Im = function(e) {
  return Fc(e, "overflowX");
}, Fa = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = Hc(e, r);
    if (o) {
      var i = $c(e, r), a = i[1], s = i[2];
      if (a > s)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Mm = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, Dm = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, Hc = function(e, t) {
  return e === "v" ? Nm(t) : Im(t);
}, $c = function(e, t) {
  return e === "v" ? Mm(t) : Dm(t);
}, km = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Lm = function(e, t, n, r, o) {
  var i = km(e, window.getComputedStyle(t).direction), a = i * r, s = n.target, c = t.contains(s), u = !1, l = a > 0, d = 0, p = 0;
  do {
    var h = $c(e, s), b = h[0], f = h[1], _ = h[2], v = f - _ - i * b;
    (b || v) && Hc(e, s) && (d += v, p += b), s instanceof ShadowRoot ? s = s.host : s = s.parentNode;
  } while (
    // portaled content
    !c && s !== document.body || // self content
    c && (t.contains(s) || t === s)
  );
  return (l && Math.abs(d) < 1 || !l && Math.abs(p) < 1) && (u = !0), u;
}, un = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, Ha = function(e) {
  return [e.deltaX, e.deltaY];
}, $a = function(e) {
  return e && "current" in e ? e.current : e;
}, jm = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Fm = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Hm = 0, ht = [];
function $m(e) {
  var t = g.useRef([]), n = g.useRef([0, 0]), r = g.useRef(), o = g.useState(Hm++)[0], i = g.useState(jc)[0], a = g.useRef(e);
  g.useEffect(function() {
    a.current = e;
  }, [e]), g.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var f = sm([e.lockRef.current], (e.shards || []).map($a), !0).filter(Boolean);
      return f.forEach(function(_) {
        return _.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), f.forEach(function(_) {
          return _.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = g.useCallback(function(f, _) {
    if ("touches" in f && f.touches.length === 2 || f.type === "wheel" && f.ctrlKey)
      return !a.current.allowPinchZoom;
    var v = un(f), C = n.current, m = "deltaX" in f ? f.deltaX : C[0] - v[0], y = "deltaY" in f ? f.deltaY : C[1] - v[1], E, A = f.target, x = Math.abs(m) > Math.abs(y) ? "h" : "v";
    if ("touches" in f && x === "h" && A.type === "range")
      return !1;
    var O = Fa(x, A);
    if (!O)
      return !0;
    if (O ? E = x : (E = x === "v" ? "h" : "v", O = Fa(x, A)), !O)
      return !1;
    if (!r.current && "changedTouches" in f && (m || y) && (r.current = E), !E)
      return !0;
    var N = r.current || E;
    return Lm(N, _, f, N === "h" ? m : y);
  }, []), c = g.useCallback(function(f) {
    var _ = f;
    if (!(!ht.length || ht[ht.length - 1] !== i)) {
      var v = "deltaY" in _ ? Ha(_) : un(_), C = t.current.filter(function(E) {
        return E.name === _.type && (E.target === _.target || _.target === E.shadowParent) && jm(E.delta, v);
      })[0];
      if (C && C.should) {
        _.cancelable && _.preventDefault();
        return;
      }
      if (!C) {
        var m = (a.current.shards || []).map($a).filter(Boolean).filter(function(E) {
          return E.contains(_.target);
        }), y = m.length > 0 ? s(_, m[0]) : !a.current.noIsolation;
        y && _.cancelable && _.preventDefault();
      }
    }
  }, []), u = g.useCallback(function(f, _, v, C) {
    var m = { name: f, delta: _, target: v, should: C, shadowParent: Um(v) };
    t.current.push(m), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== m;
      });
    }, 1);
  }, []), l = g.useCallback(function(f) {
    n.current = un(f), r.current = void 0;
  }, []), d = g.useCallback(function(f) {
    u(f.type, Ha(f), f.target, s(f, e.lockRef.current));
  }, []), p = g.useCallback(function(f) {
    u(f.type, un(f), f.target, s(f, e.lockRef.current));
  }, []);
  g.useEffect(function() {
    return ht.push(i), e.setCallbacks({
      onScrollCapture: d,
      onWheelCapture: d,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", c, mt), document.addEventListener("touchmove", c, mt), document.addEventListener("touchstart", l, mt), function() {
      ht = ht.filter(function(f) {
        return f !== i;
      }), document.removeEventListener("wheel", c, mt), document.removeEventListener("touchmove", c, mt), document.removeEventListener("touchstart", l, mt);
    };
  }, []);
  var h = e.removeScrollBar, b = e.inert;
  return g.createElement(
    g.Fragment,
    null,
    b ? g.createElement(i, { styles: Fm(o) }) : null,
    h ? g.createElement(Am, { gapMode: e.gapMode }) : null
  );
}
function Um(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const Bm = gm(Lc, $m);
var ui = g.forwardRef(function(e, t) {
  return g.createElement(zn, He({}, e, { ref: t, sideCar: Bm }));
});
ui.classNames = zn.classNames;
var Gm = [" ", "Enter", "ArrowUp", "ArrowDown"], zm = [" ", "Enter"], it = "Select", [Vn, qn, Vm] = Ht(it), [Ot, W_] = ct(it, [
  Vm,
  Gn
]), Xn = Gn(), [qm, tt] = Ot(it), [Xm, Wm] = Ot(it), Uc = (e) => {
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
    disabled: p,
    required: h,
    form: b
  } = e, f = Xn(t), [_, v] = g.useState(null), [C, m] = g.useState(null), [y, E] = g.useState(!1), A = Fn(u), [x, O] = Et({
    prop: r,
    defaultProp: o ?? !1,
    onChange: i,
    caller: it
  }), [N, T] = Et({
    prop: a,
    defaultProp: s,
    onChange: c,
    caller: it
  }), M = g.useRef(null), k = _ ? b || !!_.closest("form") : !0, [B, j] = g.useState(/* @__PURE__ */ new Set()), G = Array.from(B).map((F) => F.props.value).join(";");
  return /* @__PURE__ */ R(Cc, { ...f, children: /* @__PURE__ */ ve(
    qm,
    {
      required: h,
      scope: t,
      trigger: _,
      onTriggerChange: v,
      valueNode: C,
      onValueNodeChange: m,
      valueNodeHasChildren: y,
      onValueNodeHasChildrenChange: E,
      contentId: Qe(),
      value: N,
      onValueChange: T,
      open: x,
      onOpenChange: O,
      dir: A,
      triggerPointerDownPosRef: M,
      disabled: p,
      children: [
        /* @__PURE__ */ R(Vn.Provider, { scope: t, children: /* @__PURE__ */ R(
          Xm,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: g.useCallback((F) => {
              j((Q) => new Set(Q).add(F));
            }, []),
            onNativeOptionRemove: g.useCallback((F) => {
              j((Q) => {
                const I = new Set(Q);
                return I.delete(F), I;
              });
            }, []),
            children: n
          }
        ) }),
        k ? /* @__PURE__ */ ve(
          uu,
          {
            "aria-hidden": !0,
            required: h,
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
Uc.displayName = it;
var Bc = "SelectTrigger", Gc = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, disabled: r = !1, ...o } = e, i = Xn(n), a = tt(Bc, n), s = a.disabled || r, c = ye(t, a.onTriggerChange), u = qn(n), l = g.useRef("touch"), [d, p, h] = du((f) => {
      const _ = u().filter((m) => !m.disabled), v = _.find((m) => m.value === a.value), C = fu(_, f, v);
      C !== void 0 && a.onValueChange(C.value);
    }), b = (f) => {
      s || (a.onOpenChange(!0), h()), f && (a.triggerPointerDownPosRef.current = {
        x: Math.round(f.pageX),
        y: Math.round(f.pageY)
      });
    };
    return /* @__PURE__ */ R(xc, { asChild: !0, ...i, children: /* @__PURE__ */ R(
      le.button,
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
        "data-placeholder": lu(a.value) ? "" : void 0,
        ...o,
        ref: c,
        onClick: Z(o.onClick, (f) => {
          f.currentTarget.focus(), l.current !== "mouse" && b(f);
        }),
        onPointerDown: Z(o.onPointerDown, (f) => {
          l.current = f.pointerType;
          const _ = f.target;
          _.hasPointerCapture(f.pointerId) && _.releasePointerCapture(f.pointerId), f.button === 0 && f.ctrlKey === !1 && f.pointerType === "mouse" && (b(f), f.preventDefault());
        }),
        onKeyDown: Z(o.onKeyDown, (f) => {
          const _ = d.current !== "";
          !(f.ctrlKey || f.altKey || f.metaKey) && f.key.length === 1 && p(f.key), !(_ && f.key === " ") && Gm.includes(f.key) && (b(), f.preventDefault());
        })
      }
    ) });
  }
);
Gc.displayName = Bc;
var zc = "SelectValue", Vc = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, children: i, placeholder: a = "", ...s } = e, c = tt(zc, n), { onValueNodeHasChildrenChange: u } = c, l = i !== void 0, d = ye(t, c.onValueNodeChange);
    return Ce(() => {
      u(l);
    }, [u, l]), /* @__PURE__ */ R(
      le.span,
      {
        ...s,
        ref: d,
        style: { pointerEvents: "none" },
        children: lu(c.value) ? /* @__PURE__ */ R(Ye, { children: a }) : i
      }
    );
  }
);
Vc.displayName = zc;
var Km = "SelectIcon", qc = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, children: r, ...o } = e;
    return /* @__PURE__ */ R(le.span, { "aria-hidden": !0, ...o, ref: t, children: r || "▼" });
  }
);
qc.displayName = Km;
var Ym = "SelectPortal", Xc = (e) => /* @__PURE__ */ R(ci, { asChild: !0, ...e });
Xc.displayName = Ym;
var at = "SelectContent", Wc = g.forwardRef(
  (e, t) => {
    const n = tt(at, e.__scopeSelect), [r, o] = g.useState();
    if (Ce(() => {
      o(new DocumentFragment());
    }, []), !n.open) {
      const i = r;
      return i ? Dn.createPortal(
        /* @__PURE__ */ R(Kc, { scope: e.__scopeSelect, children: /* @__PURE__ */ R(Vn.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ R("div", { children: e.children }) }) }),
        i
      ) : null;
    }
    return /* @__PURE__ */ R(Yc, { ...e, ref: t });
  }
);
Wc.displayName = at;
var ke = 10, [Kc, nt] = Ot(at), Qm = "SelectContentImpl", Zm = /* @__PURE__ */ bt("SelectContent.RemoveScroll"), Yc = g.forwardRef(
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
      collisionBoundary: p,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: f,
      avoidCollisions: _,
      //
      ...v
    } = e, C = tt(at, n), [m, y] = g.useState(null), [E, A] = g.useState(null), x = ye(t, (P) => y(P)), [O, N] = g.useState(null), [T, M] = g.useState(
      null
    ), k = qn(n), [B, j] = g.useState(!1), G = g.useRef(!1);
    g.useEffect(() => {
      if (m) return Mc(m);
    }, [m]), rc();
    const F = g.useCallback(
      (P) => {
        const [te, ...z] = k().map((S) => S.ref.current), [K] = z.slice(-1), w = document.activeElement;
        for (const S of P)
          if (S === w || (S == null || S.scrollIntoView({ block: "nearest" }), S === te && E && (E.scrollTop = 0), S === K && E && (E.scrollTop = E.scrollHeight), S == null || S.focus(), document.activeElement !== w)) return;
      },
      [k, E]
    ), Q = g.useCallback(
      () => F([O, m]),
      [F, O, m]
    );
    g.useEffect(() => {
      B && Q();
    }, [B, Q]);
    const { onOpenChange: I, triggerPointerDownPosRef: D } = C;
    g.useEffect(() => {
      if (m) {
        let P = { x: 0, y: 0 };
        const te = (K) => {
          var w, S;
          P = {
            x: Math.abs(Math.round(K.pageX) - (((w = D.current) == null ? void 0 : w.x) ?? 0)),
            y: Math.abs(Math.round(K.pageY) - (((S = D.current) == null ? void 0 : S.y) ?? 0))
          };
        }, z = (K) => {
          P.x <= 10 && P.y <= 10 ? K.preventDefault() : m.contains(K.target) || I(!1), document.removeEventListener("pointermove", te), D.current = null;
        };
        return D.current !== null && (document.addEventListener("pointermove", te), document.addEventListener("pointerup", z, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", te), document.removeEventListener("pointerup", z, { capture: !0 });
        };
      }
    }, [m, I, D]), g.useEffect(() => {
      const P = () => I(!1);
      return window.addEventListener("blur", P), window.addEventListener("resize", P), () => {
        window.removeEventListener("blur", P), window.removeEventListener("resize", P);
      };
    }, [I]);
    const [W, se] = du((P) => {
      const te = k().filter((w) => !w.disabled), z = te.find((w) => w.ref.current === document.activeElement), K = fu(te, P, z);
      K && setTimeout(() => K.ref.current.focus());
    }), re = g.useCallback(
      (P, te, z) => {
        const K = !G.current && !z;
        (C.value !== void 0 && C.value === te || K) && (N(P), K && (G.current = !0));
      },
      [C.value]
    ), ne = g.useCallback(() => m == null ? void 0 : m.focus(), [m]), Y = g.useCallback(
      (P, te, z) => {
        const K = !G.current && !z;
        (C.value !== void 0 && C.value === te || K) && M(P);
      },
      [C.value]
    ), pe = r === "popper" ? yo : Qc, ie = pe === yo ? {
      side: s,
      sideOffset: c,
      align: u,
      alignOffset: l,
      arrowPadding: d,
      collisionBoundary: p,
      collisionPadding: h,
      sticky: b,
      hideWhenDetached: f,
      avoidCollisions: _
    } : {};
    return /* @__PURE__ */ R(
      Kc,
      {
        scope: n,
        content: m,
        viewport: E,
        onViewportChange: A,
        itemRefCallback: re,
        selectedItem: O,
        onItemLeave: ne,
        itemTextRefCallback: Y,
        focusSelectedItem: Q,
        selectedItemText: T,
        position: r,
        isPositioned: B,
        searchRef: W,
        children: /* @__PURE__ */ R(ui, { as: Zm, allowPinchZoom: !0, children: /* @__PURE__ */ R(
          Zo,
          {
            asChild: !0,
            trapped: C.open,
            onMountAutoFocus: (P) => {
              P.preventDefault();
            },
            onUnmountAutoFocus: Z(o, (P) => {
              var te;
              (te = C.trigger) == null || te.focus({ preventScroll: !0 }), P.preventDefault();
            }),
            children: /* @__PURE__ */ R(
              Hn,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: i,
                onPointerDownOutside: a,
                onFocusOutside: (P) => P.preventDefault(),
                onDismiss: () => C.onOpenChange(!1),
                children: /* @__PURE__ */ R(
                  pe,
                  {
                    role: "listbox",
                    id: C.contentId,
                    "data-state": C.open ? "open" : "closed",
                    dir: C.dir,
                    onContextMenu: (P) => P.preventDefault(),
                    ...v,
                    ...ie,
                    onPlaced: () => j(!0),
                    ref: x,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...v.style
                    },
                    onKeyDown: Z(v.onKeyDown, (P) => {
                      const te = P.ctrlKey || P.altKey || P.metaKey;
                      if (P.key === "Tab" && P.preventDefault(), !te && P.key.length === 1 && se(P.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(P.key)) {
                        let K = k().filter((w) => !w.disabled).map((w) => w.ref.current);
                        if (["ArrowUp", "End"].includes(P.key) && (K = K.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(P.key)) {
                          const w = P.target, S = K.indexOf(w);
                          K = K.slice(S + 1);
                        }
                        setTimeout(() => F(K)), P.preventDefault();
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
Yc.displayName = Qm;
var Jm = "SelectItemAlignedPosition", Qc = g.forwardRef((e, t) => {
  const { __scopeSelect: n, onPlaced: r, ...o } = e, i = tt(at, n), a = nt(at, n), [s, c] = g.useState(null), [u, l] = g.useState(null), d = ye(t, (x) => l(x)), p = qn(n), h = g.useRef(!1), b = g.useRef(!0), { viewport: f, selectedItem: _, selectedItemText: v, focusSelectedItem: C } = a, m = g.useCallback(() => {
    if (i.trigger && i.valueNode && s && u && f && _ && v) {
      const x = i.trigger.getBoundingClientRect(), O = u.getBoundingClientRect(), N = i.valueNode.getBoundingClientRect(), T = v.getBoundingClientRect();
      if (i.dir !== "rtl") {
        const w = T.left - O.left, S = N.left - w, $ = x.left - S, H = x.width + $, U = Math.max(H, O.width), X = window.innerWidth - ke, he = ya(S, [
          ke,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(ke, X - U)
        ]);
        s.style.minWidth = H + "px", s.style.left = he + "px";
      } else {
        const w = O.right - T.right, S = window.innerWidth - N.right - w, $ = window.innerWidth - x.right - S, H = x.width + $, U = Math.max(H, O.width), X = window.innerWidth - ke, he = ya(S, [
          ke,
          Math.max(ke, X - U)
        ]);
        s.style.minWidth = H + "px", s.style.right = he + "px";
      }
      const M = p(), k = window.innerHeight - ke * 2, B = f.scrollHeight, j = window.getComputedStyle(u), G = parseInt(j.borderTopWidth, 10), F = parseInt(j.paddingTop, 10), Q = parseInt(j.borderBottomWidth, 10), I = parseInt(j.paddingBottom, 10), D = G + F + B + I + Q, W = Math.min(_.offsetHeight * 5, D), se = window.getComputedStyle(f), re = parseInt(se.paddingTop, 10), ne = parseInt(se.paddingBottom, 10), Y = x.top + x.height / 2 - ke, pe = k - Y, ie = _.offsetHeight / 2, P = _.offsetTop + ie, te = G + F + P, z = D - te;
      if (te <= Y) {
        const w = M.length > 0 && _ === M[M.length - 1].ref.current;
        s.style.bottom = "0px";
        const S = u.clientHeight - f.offsetTop - f.offsetHeight, $ = Math.max(
          pe,
          ie + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (w ? ne : 0) + S + Q
        ), H = te + $;
        s.style.height = H + "px";
      } else {
        const w = M.length > 0 && _ === M[0].ref.current;
        s.style.top = "0px";
        const $ = Math.max(
          Y,
          G + f.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (w ? re : 0) + ie
        ) + z;
        s.style.height = $ + "px", f.scrollTop = te - Y + f.offsetTop;
      }
      s.style.margin = `${ke}px 0`, s.style.minHeight = W + "px", s.style.maxHeight = k + "px", r == null || r(), requestAnimationFrame(() => h.current = !0);
    }
  }, [
    p,
    i.trigger,
    i.valueNode,
    s,
    u,
    f,
    _,
    v,
    i.dir,
    r
  ]);
  Ce(() => m(), [m]);
  const [y, E] = g.useState();
  Ce(() => {
    u && E(window.getComputedStyle(u).zIndex);
  }, [u]);
  const A = g.useCallback(
    (x) => {
      x && b.current === !0 && (m(), C == null || C(), b.current = !1);
    },
    [m, C]
  );
  return /* @__PURE__ */ R(
    th,
    {
      scope: n,
      contentWrapper: s,
      shouldExpandOnScrollRef: h,
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
            le.div,
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
Qc.displayName = Jm;
var eh = "SelectPopperPosition", yo = g.forwardRef((e, t) => {
  const {
    __scopeSelect: n,
    align: r = "start",
    collisionPadding: o = ke,
    ...i
  } = e, a = Xn(n);
  return /* @__PURE__ */ R(
    Pc,
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
yo.displayName = eh;
var [th, li] = Ot(at, {}), Eo = "SelectViewport", Zc = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, nonce: r, ...o } = e, i = nt(Eo, n), a = li(Eo, n), s = ye(t, i.onViewportChange), c = g.useRef(0);
    return /* @__PURE__ */ ve(Ye, { children: [
      /* @__PURE__ */ R(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ R(Vn.Slot, { scope: n, children: /* @__PURE__ */ R(
        le.div,
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
          onScroll: Z(o.onScroll, (u) => {
            const l = u.currentTarget, { contentWrapper: d, shouldExpandOnScrollRef: p } = a;
            if (p != null && p.current && d) {
              const h = Math.abs(c.current - l.scrollTop);
              if (h > 0) {
                const b = window.innerHeight - ke * 2, f = parseFloat(d.style.minHeight), _ = parseFloat(d.style.height), v = Math.max(f, _);
                if (v < b) {
                  const C = v + h, m = Math.min(b, C), y = C - m;
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
Zc.displayName = Eo;
var Jc = "SelectGroup", [nh, rh] = Ot(Jc), oh = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Qe();
    return /* @__PURE__ */ R(nh, { scope: n, id: o, children: /* @__PURE__ */ R(le.div, { role: "group", "aria-labelledby": o, ...r, ref: t }) });
  }
);
oh.displayName = Jc;
var eu = "SelectLabel", ih = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = rh(eu, n);
    return /* @__PURE__ */ R(le.div, { id: o.id, ...r, ref: t });
  }
);
ih.displayName = eu;
var Tn = "SelectItem", [ah, tu] = Ot(Tn), nu = g.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: n,
      value: r,
      disabled: o = !1,
      textValue: i,
      ...a
    } = e, s = tt(Tn, n), c = nt(Tn, n), u = s.value === r, [l, d] = g.useState(i ?? ""), [p, h] = g.useState(!1), b = ye(
      t,
      (C) => {
        var m;
        return (m = c.itemRefCallback) == null ? void 0 : m.call(c, C, r, o);
      }
    ), f = Qe(), _ = g.useRef("touch"), v = () => {
      o || (s.onValueChange(r), s.onOpenChange(!1));
    };
    if (r === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ R(
      ah,
      {
        scope: n,
        value: r,
        disabled: o,
        textId: f,
        isSelected: u,
        onItemTextChange: g.useCallback((C) => {
          d((m) => m || ((C == null ? void 0 : C.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ R(
          Vn.ItemSlot,
          {
            scope: n,
            value: r,
            disabled: o,
            textValue: l,
            children: /* @__PURE__ */ R(
              le.div,
              {
                role: "option",
                "aria-labelledby": f,
                "data-highlighted": p ? "" : void 0,
                "aria-selected": u && p,
                "data-state": u ? "checked" : "unchecked",
                "aria-disabled": o || void 0,
                "data-disabled": o ? "" : void 0,
                tabIndex: o ? void 0 : -1,
                ...a,
                ref: b,
                onFocus: Z(a.onFocus, () => h(!0)),
                onBlur: Z(a.onBlur, () => h(!1)),
                onClick: Z(a.onClick, () => {
                  _.current !== "mouse" && v();
                }),
                onPointerUp: Z(a.onPointerUp, () => {
                  _.current === "mouse" && v();
                }),
                onPointerDown: Z(a.onPointerDown, (C) => {
                  _.current = C.pointerType;
                }),
                onPointerMove: Z(a.onPointerMove, (C) => {
                  var m;
                  _.current = C.pointerType, o ? (m = c.onItemLeave) == null || m.call(c) : _.current === "mouse" && C.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: Z(a.onPointerLeave, (C) => {
                  var m;
                  C.currentTarget === document.activeElement && ((m = c.onItemLeave) == null || m.call(c));
                }),
                onKeyDown: Z(a.onKeyDown, (C) => {
                  var y;
                  ((y = c.searchRef) == null ? void 0 : y.current) !== "" && C.key === " " || (zm.includes(C.key) && v(), C.key === " " && C.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
nu.displayName = Tn;
var Tt = "SelectItemText", ru = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, className: r, style: o, ...i } = e, a = tt(Tt, n), s = nt(Tt, n), c = tu(Tt, n), u = Wm(Tt, n), [l, d] = g.useState(null), p = ye(
      t,
      (v) => d(v),
      c.onItemTextChange,
      (v) => {
        var C;
        return (C = s.itemTextRefCallback) == null ? void 0 : C.call(s, v, c.value, c.disabled);
      }
    ), h = l == null ? void 0 : l.textContent, b = g.useMemo(
      () => /* @__PURE__ */ R("option", { value: c.value, disabled: c.disabled, children: h }, c.value),
      [c.disabled, c.value, h]
    ), { onNativeOptionAdd: f, onNativeOptionRemove: _ } = u;
    return Ce(() => (f(b), () => _(b)), [f, _, b]), /* @__PURE__ */ ve(Ye, { children: [
      /* @__PURE__ */ R(le.span, { id: c.textId, ...i, ref: p }),
      c.isSelected && a.valueNode && !a.valueNodeHasChildren ? Dn.createPortal(i.children, a.valueNode) : null
    ] });
  }
);
ru.displayName = Tt;
var ou = "SelectItemIndicator", iu = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return tu(ou, n).isSelected ? /* @__PURE__ */ R(le.span, { "aria-hidden": !0, ...r, ref: t }) : null;
  }
);
iu.displayName = ou;
var Ro = "SelectScrollUpButton", au = g.forwardRef((e, t) => {
  const n = nt(Ro, e.__scopeSelect), r = li(Ro, e.__scopeSelect), [o, i] = g.useState(!1), a = ye(t, r.onScrollButtonChange);
  return Ce(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const u = c.scrollTop > 0;
        i(u);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ R(
    cu,
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
au.displayName = Ro;
var wo = "SelectScrollDownButton", su = g.forwardRef((e, t) => {
  const n = nt(wo, e.__scopeSelect), r = li(wo, e.__scopeSelect), [o, i] = g.useState(!1), a = ye(t, r.onScrollButtonChange);
  return Ce(() => {
    if (n.viewport && n.isPositioned) {
      let s = function() {
        const u = c.scrollHeight - c.clientHeight, l = Math.ceil(c.scrollTop) < u;
        i(l);
      };
      const c = n.viewport;
      return s(), c.addEventListener("scroll", s), () => c.removeEventListener("scroll", s);
    }
  }, [n.viewport, n.isPositioned]), o ? /* @__PURE__ */ R(
    cu,
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
su.displayName = wo;
var cu = g.forwardRef((e, t) => {
  const { __scopeSelect: n, onAutoScroll: r, ...o } = e, i = nt("SelectScrollButton", n), a = g.useRef(null), s = qn(n), c = g.useCallback(() => {
    a.current !== null && (window.clearInterval(a.current), a.current = null);
  }, []);
  return g.useEffect(() => () => c(), [c]), Ce(() => {
    var l;
    const u = s().find((d) => d.ref.current === document.activeElement);
    (l = u == null ? void 0 : u.ref.current) == null || l.scrollIntoView({ block: "nearest" });
  }, [s]), /* @__PURE__ */ R(
    le.div,
    {
      "aria-hidden": !0,
      ...o,
      ref: t,
      style: { flexShrink: 0, ...o.style },
      onPointerDown: Z(o.onPointerDown, () => {
        a.current === null && (a.current = window.setInterval(r, 50));
      }),
      onPointerMove: Z(o.onPointerMove, () => {
        var u;
        (u = i.onItemLeave) == null || u.call(i), a.current === null && (a.current = window.setInterval(r, 50));
      }),
      onPointerLeave: Z(o.onPointerLeave, () => {
        c();
      })
    }
  );
}), sh = "SelectSeparator", ch = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e;
    return /* @__PURE__ */ R(le.div, { "aria-hidden": !0, ...r, ref: t });
  }
);
ch.displayName = sh;
var So = "SelectArrow", uh = g.forwardRef(
  (e, t) => {
    const { __scopeSelect: n, ...r } = e, o = Xn(n), i = tt(So, n), a = nt(So, n);
    return i.open && a.position === "popper" ? /* @__PURE__ */ R(Oc, { ...o, ...r, ref: t }) : null;
  }
);
uh.displayName = So;
var lh = "SelectBubbleInput", uu = g.forwardRef(
  ({ __scopeSelect: e, value: t, ...n }, r) => {
    const o = g.useRef(null), i = ye(r, o), a = Ac(t);
    return g.useEffect(() => {
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
    }, [a, t]), /* @__PURE__ */ R(
      le.select,
      {
        ...n,
        style: { ...Tc, ...n.style },
        ref: i,
        defaultValue: t
      }
    );
  }
);
uu.displayName = lh;
function lu(e) {
  return e === "" || e === void 0;
}
function du(e) {
  const t = xe(e), n = g.useRef(""), r = g.useRef(0), o = g.useCallback(
    (a) => {
      const s = n.current + a;
      t(s), function c(u) {
        n.current = u, window.clearTimeout(r.current), u !== "" && (r.current = window.setTimeout(() => c(""), 1e3));
      }(s);
    },
    [t]
  ), i = g.useCallback(() => {
    n.current = "", window.clearTimeout(r.current);
  }, []);
  return g.useEffect(() => () => window.clearTimeout(r.current), []), [n, o, i];
}
function fu(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let a = dh(e, Math.max(i, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const c = a.find(
    (u) => u.textValue.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function dh(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var fh = Uc, ph = Gc, mh = Vc, hh = qc, gh = Xc, vh = Wc, _h = Zc, bh = nu, yh = ru, Eh = iu, Rh = au, wh = su;
function Sh({ ...e }) {
  return /* @__PURE__ */ R(fh, { "data-slot": "select", ...e });
}
function Ch({ ...e }) {
  return /* @__PURE__ */ R(mh, { "data-slot": "select-value", ...e });
}
function xh({
  className: e,
  size: t = "default",
  children: n,
  ...r
}) {
  return /* @__PURE__ */ ve(
    ph,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: fe(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ R(hh, { asChild: !0, children: /* @__PURE__ */ R(Ko, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function Ph({
  className: e,
  children: t,
  position: n = "popper",
  ...r
}) {
  return /* @__PURE__ */ R(gh, { children: /* @__PURE__ */ ve(
    vh,
    {
      "data-slot": "select-content",
      className: fe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        n === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ R(Ah, {}),
        /* @__PURE__ */ R(
          _h,
          {
            className: fe(
              "p-1",
              n === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ R(Th, {})
      ]
    }
  ) });
}
function Oh({ className: e, children: t, ...n }) {
  return /* @__PURE__ */ ve(
    bh,
    {
      "data-slot": "select-item",
      className: fe(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ R("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ R(Eh, { children: /* @__PURE__ */ R(Od, { className: "size-4" }) }) }),
        /* @__PURE__ */ R(yh, { children: t })
      ]
    }
  );
}
function Ah({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R(
    Rh,
    {
      "data-slot": "select-scroll-up-button",
      className: fe("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ R(Md, { className: "size-4" })
    }
  );
}
function Th({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R(
    wh,
    {
      "data-slot": "select-scroll-down-button",
      className: fe("flex cursor-default items-center justify-center py-1", e),
      ...t,
      children: /* @__PURE__ */ R(Ko, { className: "size-4" })
    }
  );
}
function Nh({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    "textarea",
    {
      "data-slot": "textarea",
      className: fe(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        e
      ),
      ...t
    }
  );
}
var Ih = (e) => e.type === "checkbox", Nt = (e) => e instanceof Date, di = (e) => e == null;
const pu = (e) => typeof e == "object";
var st = (e) => !di(e) && !Array.isArray(e) && pu(e) && !Nt(e), Mh = (e) => st(e) && e.target ? Ih(e.target) ? e.target.checked : e.target.value : e, Dh = (e) => e.substring(0, e.search(/\.\d+(\.|$)/)) || e, kh = (e, t) => e.has(Dh(t)), Lh = (e) => {
  const t = e.constructor && e.constructor.prototype;
  return st(t) && t.hasOwnProperty("isPrototypeOf");
}, jh = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function mu(e) {
  let t;
  const n = Array.isArray(e), r = typeof FileList < "u" ? e instanceof FileList : !1;
  if (e instanceof Date)
    t = new Date(e);
  else if (e instanceof Set)
    t = new Set(e);
  else if (!(jh && (e instanceof Blob || r)) && (n || st(e)))
    if (t = n ? [] : {}, !n && !Lh(e))
      t = e;
    else
      for (const o in e)
        e.hasOwnProperty(o) && (t[o] = mu(e[o]));
  else
    return e;
  return t;
}
var hu = (e) => Array.isArray(e) ? e.filter(Boolean) : [], Co = (e) => e === void 0, Te = (e, t, n) => {
  if (!t || !st(e))
    return n;
  const r = hu(t.split(/[,[\].]+?/)).reduce((o, i) => di(o) ? o : o[i], e);
  return Co(r) || r === e ? Co(e[t]) ? n : e[t] : r;
}, jr = (e) => typeof e == "boolean", Fh = (e) => /^\w*$/.test(e), Hh = (e) => hu(e.replace(/["|']|\]/g, "").split(/\.|\[/)), Ua = (e, t, n) => {
  let r = -1;
  const o = Fh(t) ? [t] : Hh(t), i = o.length, a = i - 1;
  for (; ++r < i; ) {
    const s = o[r];
    let c = n;
    if (r !== a) {
      const u = e[s];
      c = st(u) || Array.isArray(u) ? u : isNaN(+o[r + 1]) ? {} : [];
    }
    if (s === "__proto__" || s === "constructor" || s === "prototype")
      return;
    e[s] = c, e = e[s];
  }
};
const Ba = {
  BLUR: "blur",
  CHANGE: "change"
}, Ga = {
  all: "all"
}, $h = ue.createContext(null), Wn = () => ue.useContext($h);
var Uh = (e, t, n, r = !0) => {
  const o = {
    defaultValues: t._defaultValues
  };
  for (const i in e)
    Object.defineProperty(o, i, {
      get: () => {
        const a = i;
        return t._proxyFormState[a] !== Ga.all && (t._proxyFormState[a] = !r || Ga.all), n && (n[a] = !0), e[a];
      }
    });
  return o;
}, za = (e) => di(e) || !pu(e);
function gu(e, t) {
  if (za(e) || za(t))
    return e === t;
  if (Nt(e) && Nt(t))
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
      if (Nt(i) && Nt(a) || st(i) && st(a) || Array.isArray(i) && Array.isArray(a) ? !gu(i, a) : i !== a)
        return !1;
    }
  }
  return !0;
}
const vu = (e, t) => {
  const n = g.useRef(t);
  gu(t, n.current) || (n.current = t), g.useEffect(e, n.current);
};
function Bh(e) {
  const t = Wn(), { control: n = t.control, disabled: r, name: o, exact: i } = e || {}, [a, s] = ue.useState(n._formState), c = ue.useRef({
    isDirty: !1,
    isLoading: !1,
    dirtyFields: !1,
    touchedFields: !1,
    validatingFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  });
  return vu(() => n._subscribe({
    name: o,
    formState: c.current,
    exact: i,
    callback: (u) => {
      !r && s({
        ...n._formState,
        ...u
      });
    }
  }), [o, r, i]), ue.useEffect(() => {
    c.current.isValid && n._setValid(!0);
  }, [n]), ue.useMemo(() => Uh(a, n, c.current, !1), [a, n]);
}
var Gh = (e) => typeof e == "string", zh = (e, t, n, r, o) => Gh(e) ? Te(n, e, o) : Array.isArray(e) ? e.map((i) => Te(n, i)) : n;
function Vh(e) {
  const t = Wn(), { control: n = t.control, name: r, defaultValue: o, disabled: i, exact: a } = e || {}, [s, c] = ue.useState(n._getWatch(r, o));
  return vu(() => n._subscribe({
    name: r,
    formState: {
      values: !0
    },
    exact: a,
    callback: (u) => !i && c(zh(r, n._names, u.values || n._formValues, !1, o))
  }), [r, o, i, a]), ue.useEffect(() => n._removeUnmounted()), s;
}
function qh(e) {
  const t = Wn(), { name: n, disabled: r, control: o = t.control, shouldUnregister: i } = e, a = kh(o._names.array, n), s = Vh({
    control: o,
    name: n,
    defaultValue: Te(o._formValues, n, Te(o._defaultValues, n, e.defaultValue)),
    exact: !0
  }), c = Bh({
    control: o,
    name: n,
    exact: !0
  }), u = ue.useRef(e), l = ue.useRef(o.register(n, {
    ...e.rules,
    value: s,
    ...jr(e.disabled) ? { disabled: e.disabled } : {}
  })), d = ue.useMemo(() => Object.defineProperties({}, {
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
  }), [c, n]), p = ue.useCallback((_) => l.current.onChange({
    target: {
      value: Mh(_),
      name: n
    },
    type: Ba.CHANGE
  }), [n]), h = ue.useCallback(() => l.current.onBlur({
    target: {
      value: Te(o._formValues, n),
      name: n
    },
    type: Ba.BLUR
  }), [n, o._formValues]), b = ue.useCallback((_) => {
    const v = Te(o._fields, n);
    v && _ && (v._f.ref = {
      focus: () => _.focus(),
      select: () => _.select(),
      setCustomValidity: (C) => _.setCustomValidity(C),
      reportValidity: () => _.reportValidity()
    });
  }, [o._fields, n]), f = ue.useMemo(() => ({
    name: n,
    value: s,
    ...jr(r) || c.disabled ? { disabled: c.disabled || r } : {},
    onChange: p,
    onBlur: h,
    ref: b
  }), [n, r, c.disabled, p, h, b, s]);
  return ue.useEffect(() => {
    const _ = o._options.shouldUnregister || i;
    o.register(n, {
      ...u.current.rules,
      ...jr(u.current.disabled) ? { disabled: u.current.disabled } : {}
    });
    const v = (C, m) => {
      const y = Te(o._fields, C);
      y && y._f && (y._f.mount = m);
    };
    if (v(n, !0), _) {
      const C = mu(Te(o._options.defaultValues, n));
      Ua(o._defaultValues, n, C), Co(Te(o._formValues, n)) && Ua(o._formValues, n, C);
    }
    return !a && o.register(n), () => {
      (a ? _ && !o._state.action : _) ? o.unregister(n) : v(n, !1);
    };
  }, [n, o, a, i]), ue.useEffect(() => {
    o._setDisabledField({
      disabled: r,
      name: n
    });
  }, [r, n, o]), ue.useMemo(() => ({
    field: f,
    formState: c,
    fieldState: d
  }), [f, c, d]);
}
const Xh = (e) => e.render(qh(e));
typeof window < "u" ? ue.useLayoutEffect : ue.useEffect;
function K_({
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
  onChange: p
}) {
  var m;
  const {
    control: h,
    formState: { errors: b }
  } = Wn(), f = b[t], [_, v] = qo(!1), C = () => {
    v((y) => !y);
  };
  return /* @__PURE__ */ ve("div", { className: "space-y-2", children: [
    e && /* @__PURE__ */ ve("div", { children: [
      /* @__PURE__ */ ve(xf, { className: "text-[16px] font-medium", children: [
        e,
        o && /* @__PURE__ */ R("span", { className: "text-destructive ml-1", children: "*" })
      ] }),
      d && /* @__PURE__ */ R("div", { className: "text-mid-grey-II text-xs", children: d })
    ] }),
    /* @__PURE__ */ R(
      Xh,
      {
        name: t,
        control: h,
        render: ({ field: y }) => {
          const E = fe(
            "flex h-10 w-full min-w-[400px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
            f && "border-destructive",
            s
          );
          return /* @__PURE__ */ ve("div", { className: fe("flex items-center gap-2", c), children: [
            u && /* @__PURE__ */ R("div", { className: "flex items-center", children: u }),
            n === "textarea" ? /* @__PURE__ */ R(
              Nh,
              {
                ...y,
                placeholder: r,
                disabled: i,
                className: fe(E, "resize-y")
              }
            ) : n === "select" ? /* @__PURE__ */ ve(Sh, { onValueChange: y.onChange, value: y.value, disabled: i, children: [
              /* @__PURE__ */ R(xh, { className: fe(E, "w-full"), children: /* @__PURE__ */ R(Ch, { placeholder: r }) }),
              /* @__PURE__ */ R(Ph, { children: a.map((x, O) => /* @__PURE__ */ R(Oh, { value: x.value, children: x.label }, O)) })
            ] }) : n === "number" ? /* @__PURE__ */ R(
              "input",
              {
                ...y,
                type: "number",
                placeholder: r,
                disabled: i,
                className: E,
                value: y.value || "",
                onChange: (x) => y.onChange(x.target.valueAsNumber)
              }
            ) : n === "password" ? /* @__PURE__ */ ve("div", { className: "relative w-full", children: [
              /* @__PURE__ */ R(
                ba,
                {
                  ...y,
                  type: _ ? "text" : "password",
                  placeholder: r,
                  disabled: i,
                  className: E,
                  onChange: (x) => {
                    y.onChange(x), p == null || p(x);
                  }
                }
              ),
              /* @__PURE__ */ R(
                "button",
                {
                  type: "button",
                  onClick: C,
                  className: "text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2",
                  children: _ ? /* @__PURE__ */ R(jd, { size: 18 }) : /* @__PURE__ */ R(Hd, { size: 18 })
                }
              )
            ] }) : /* @__PURE__ */ R(
              ba,
              {
                ...y,
                type: n,
                placeholder: r,
                disabled: i,
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
var _u = {}, fi = {}, Kn = {};
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
})(Kn);
var bu = {};
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
    const u = 20, l = i ? i * 40 : r, d = a ? a * 40 : o, p = l && d ? "viewBox='0 0 " + l + " " + d + "'" : "", h = p ? "none" : c === "contain" ? "xMidYMid" : c === "cover" ? "xMidYMid slice" : "none";
    return "%3Csvg xmlns='http://www.w3.org/2000/svg' " + p + "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='" + u + "'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='" + u + "'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" + h + "' style='filter: url(%23b);' href='" + s + "'/%3E%3C/svg%3E";
  }
})(bu);
var Yn = {};
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
})(Yn);
(function(e) {
  Object.defineProperty(e, "__esModule", {
    value: !0
  }), Object.defineProperty(e, "getImgProps", {
    enumerable: !0,
    get: function() {
      return b;
    }
  });
  const t = Kn, n = bu, r = Yn, o = [
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
  function p(f, _, v) {
    let { deviceSizes: C, allSizes: m } = f;
    if (v) {
      const E = /(^|\s)(1?\d?\d)vw/g, A = [];
      for (let x; x = E.exec(v); x)
        A.push(parseInt(x[2]));
      if (A.length) {
        const x = Math.min(...A) * 0.01;
        return {
          widths: m.filter((O) => O >= C[0] * x),
          kind: "w"
        };
      }
      return {
        widths: m,
        kind: "w"
      };
    }
    return typeof _ != "number" ? {
      widths: C,
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
  function h(f) {
    let { config: _, src: v, unoptimized: C, width: m, quality: y, sizes: E, loader: A } = f;
    if (C)
      return {
        src: v,
        srcSet: void 0,
        sizes: void 0
      };
    const { widths: x, kind: O } = p(_, m, E), N = x.length - 1;
    return {
      sizes: !E && O === "w" ? "100vw" : E,
      srcSet: x.map((T, M) => A({
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
        width: x[N]
      })
    };
  }
  function b(f, _) {
    let { src: v, sizes: C, unoptimized: m = !1, priority: y = !1, loading: E, className: A, quality: x, width: O, height: N, fill: T = !1, style: M, overrideSrc: k, onLoad: B, onLoadingComplete: j, placeholder: G = "empty", blurDataURL: F, fetchPriority: Q, decoding: I = "async", layout: D, objectFit: W, objectPosition: se, lazyBoundary: re, lazyRoot: ne, ...Y } = f;
    const { imgConf: pe, showAltText: ie, blurComplete: P, defaultLoader: te } = _;
    let z, K = pe || r.imageConfigDefault;
    if ("allSizes" in K)
      z = K;
    else {
      var w;
      const L = [
        ...K.deviceSizes,
        ...K.imageSizes
      ].sort((ge, Oe) => ge - Oe), oe = K.deviceSizes.sort((ge, Oe) => ge - Oe), we = (w = K.qualities) == null ? void 0 : w.sort((ge, Oe) => ge - Oe);
      z = {
        ...K,
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
    let S = Y.loader || te;
    delete Y.loader, delete Y.srcSet;
    const $ = "__next_img_default" in S;
    if ($) {
      if (z.loader === "custom")
        throw Object.defineProperty(new Error('Image with src "' + v + `" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
          value: "E252",
          enumerable: !1,
          configurable: !0
        });
    } else {
      const L = S;
      S = (oe) => {
        const { config: we, ...ge } = oe;
        return L(ge);
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
      const ge = oe[D];
      ge && !C && (C = ge);
    }
    let H = "", U = d(O), X = d(N), he, _e;
    if (c(v)) {
      const L = a(v) ? v.default : v;
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
      if (he = L.blurWidth, _e = L.blurHeight, F = F || L.blurDataURL, H = L.src, !T) {
        if (!U && !X)
          U = L.width, X = L.height;
        else if (U && !X) {
          const oe = U / L.width;
          X = Math.round(L.height * oe);
        } else if (!U && X) {
          const oe = X / L.height;
          U = Math.round(L.width * oe);
        }
      }
    }
    v = typeof v == "string" ? v : H;
    let me = !y && (E === "lazy" || typeof E > "u");
    (!v || v.startsWith("data:") || v.startsWith("blob:")) && (m = !0, me = !1), z.unoptimized && (m = !0), $ && !z.dangerouslyAllowSVG && v.split("?", 1)[0].endsWith(".svg") && (m = !0);
    const Pe = d(x);
    if (process.env.NODE_ENV !== "production") {
      if (z.output === "export" && $ && !m)
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
        if (typeof X > "u")
          throw Object.defineProperty(new Error('Image with src "' + v + '" is missing required "height" property.'), "__NEXT_ERROR_CODE", {
            value: "E397",
            enumerable: !1,
            configurable: !0
          });
        if (isNaN(X))
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
      if (G !== "empty" && U && X && U * X < 1600 && (0, t.warnOnce)('Image with src "' + v + '" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.'), G === "blur" && !F) {
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
      if ("ref" in Y && (0, t.warnOnce)('Image with src "' + v + '" is using unsupported "ref" property. Consider using the "onLoad" property instead.'), !m && !$) {
        const L = S({
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
        objectFit: W,
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
            const ge = (we == null || (oe = we.element) == null ? void 0 : oe.src) || "", Oe = u.get(ge);
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
      objectFit: W,
      objectPosition: se
    } : {}, ie ? {} : {
      color: "transparent"
    }, M), ae = !P && G !== "empty" ? G === "blur" ? 'url("data:image/svg+xml;charset=utf-8,' + (0, n.getImageBlurSvg)({
      widthInt: U,
      heightInt: X,
      blurWidth: he,
      blurHeight: _e,
      blurDataURL: F || "",
      objectFit: Re.objectFit
    }) + '")' : 'url("' + G + '")' : null, ce = i.includes(Re.objectFit) ? Re.objectFit === "fill" ? "100% 100%" : "cover" : Re.objectFit;
    let Ee = ae ? {
      backgroundSize: ce,
      backgroundPosition: Re.objectPosition || "50% 50%",
      backgroundRepeat: "no-repeat",
      backgroundImage: ae
    } : {};
    process.env.NODE_ENV === "development" && Ee.backgroundImage && G === "blur" && F != null && F.startsWith("/") && (Ee.backgroundImage = 'url("' + F + '")');
    const q = h({
      config: z,
      src: v,
      unoptimized: m,
      width: U,
      quality: Pe,
      sizes: C,
      loader: S
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
        ...Y,
        loading: me ? "lazy" : E,
        fetchPriority: Q,
        width: U,
        height: X,
        decoding: I,
        className: A,
        style: {
          ...Re,
          ...Ee
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
})(fi);
var xo = { exports: {} }, ln = { exports: {} }, Fr = {}, Va;
function Wh() {
  return Va || (Va = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return i;
      }
    });
    const t = ue, n = typeof window > "u", r = n ? () => {
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
          var p;
          s == null || (p = s.mountedInstances) == null || p.delete(a.children);
        };
      }), r(() => (s && (s._pendingUpdate = u), () => {
        s && (s._pendingUpdate = u);
      })), o(() => (s && s._pendingUpdate && (s._pendingUpdate(), s._pendingUpdate = null), () => {
        s && s._pendingUpdate && (s._pendingUpdate(), s._pendingUpdate = null);
      })), null;
    }
  }(Fr)), Fr;
}
var Hr = {}, qa;
function Kh() {
  return qa || (qa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "AmpStateContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ qe._(ue)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "AmpStateContext");
  }(Hr)), Hr;
}
var $r = {}, Xa;
function Yh() {
  return Xa || (Xa = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "HeadManagerContext", {
      enumerable: !0,
      get: function() {
        return r;
      }
    });
    const r = (/* @__PURE__ */ qe._(ue)).default.createContext({});
    process.env.NODE_ENV !== "production" && (r.displayName = "HeadManagerContext");
  }($r)), $r;
}
var Ur = {}, Wa;
function Qh() {
  return Wa || (Wa = 1, function(e) {
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
  }(Ur)), Ur;
}
var Ka;
function Zh() {
  return Ka || (Ka = 1, function(e, t) {
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
        return C;
      },
      defaultHead: function() {
        return p;
      }
    });
    const r = qe, o = Ct, i = Vo, a = /* @__PURE__ */ o._(ue), s = /* @__PURE__ */ r._(Wh()), c = Kh(), u = Yh(), l = Qh(), d = Kn;
    function p(m) {
      m === void 0 && (m = !1);
      const y = [
        /* @__PURE__ */ (0, i.jsx)("meta", {
          charSet: "utf-8"
        }, "charset")
      ];
      return m || y.push(/* @__PURE__ */ (0, i.jsx)("meta", {
        name: "viewport",
        content: "width=device-width"
      }, "viewport")), y;
    }
    function h(m, y) {
      return typeof y == "string" || typeof y == "number" ? m : y.type === a.default.Fragment ? m.concat(
        // @ts-expect-error @types/react does not remove fragments but this could also return ReactPortal[]
        a.default.Children.toArray(y.props.children).reduce(
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
      return (x) => {
        let O = !0, N = !1;
        if (x.key && typeof x.key != "number" && x.key.indexOf("$") > 0) {
          N = !0;
          const T = x.key.slice(x.key.indexOf("$") + 1);
          m.has(T) ? O = !1 : m.add(T);
        }
        switch (x.type) {
          case "title":
          case "base":
            y.has(x.type) ? O = !1 : y.add(x.type);
            break;
          case "meta":
            for (let T = 0, M = b.length; T < M; T++) {
              const k = b[T];
              if (x.props.hasOwnProperty(k))
                if (k === "charSet")
                  E.has(k) ? O = !1 : E.add(k);
                else {
                  const B = x.props[k], j = A[k] || /* @__PURE__ */ new Set();
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
      return m.reduce(h, []).reverse().concat(p(E).reverse()).filter(f()).reverse().map((A, x) => {
        const O = A.key || x;
        if (process.env.NODE_ENV !== "development" && process.env.__NEXT_OPTIMIZE_FONTS && !E && A.type === "link" && A.props.href && // TODO(prateekbh@): Replace this with const from `constants` when the tree shaking works.
        [
          "https://fonts.googleapis.com/css",
          "https://use.typekit.net/"
        ].some((N) => A.props.href.startsWith(N))) {
          const N = {
            ...A.props || {}
          };
          return N["data-href"] = N.href, N.href = void 0, N["data-optimized-fonts"] = !0, /* @__PURE__ */ a.default.cloneElement(A, N);
        }
        if (process.env.NODE_ENV === "development")
          if (A.type === "script" && A.props.type !== "application/ld+json") {
            const N = A.props.src ? '<script> tag with src="' + A.props.src + '"' : "inline <script>";
            (0, d.warnOnce)("Do not add <script> tags using next/head (see " + N + `). Use next/script instead. 
See more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
          } else A.type === "link" && A.props.rel === "stylesheet" && (0, d.warnOnce)('Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="' + A.props.href + `"). Use Document instead. 
See more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
        return /* @__PURE__ */ a.default.cloneElement(A, {
          key: O
        });
      });
    }
    function v(m) {
      let { children: y } = m;
      const E = (0, a.useContext)(c.AmpStateContext), A = (0, a.useContext)(u.HeadManagerContext);
      return /* @__PURE__ */ (0, i.jsx)(s.default, {
        reduceComponentsToState: _,
        headManager: A,
        inAmpMode: (0, l.isInAmpMode)(E),
        children: y
      });
    }
    const C = v;
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(ln, ln.exports)), ln.exports;
}
var Br = {}, Ya;
function Jh() {
  return Ya || (Ya = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "ImageConfigContext", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = /* @__PURE__ */ qe._(ue), r = Yn, o = n.default.createContext(r.imageConfigDefault);
    process.env.NODE_ENV !== "production" && (o.displayName = "ImageConfigContext");
  }(Br)), Br;
}
var Gr = {}, zr = {}, Vr = { exports: {} }, Qa;
function yu() {
  return Qa || (Qa = 1, (() => {
    var e = { 170: (o, i, a) => {
      const s = a(510), c = () => {
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
      const i = "\\\\/", a = `[^${i}]`, s = "\\.", c = "\\+", u = "\\?", l = "\\/", d = "(?=.)", p = "[^/]", h = `(?:${l}|$)`, b = `(?:^|${l})`, f = `${s}{1,2}${h}`, _ = `(?!${s})`, v = `(?!${b}${f})`, C = `(?!${s}{0,1}${h})`, m = `(?!${f})`, y = `[^.${l}]`, E = `${p}*?`, x = { DOT_LITERAL: s, PLUS_LITERAL: c, QMARK_LITERAL: u, SLASH_LITERAL: l, ONE_CHAR: d, QMARK: p, END_ANCHOR: h, DOTS_SLASH: f, NO_DOT: _, NO_DOTS: v, NO_DOT_SLASH: C, NO_DOTS_SLASH: m, QMARK_NO_DOT: y, STAR: E, START_ANCHOR: b, SEP: "/" }, O = { ...x, SLASH_LITERAL: `[${i}]`, QMARK: a, STAR: `${a}*?`, DOTS_SLASH: `${s}{1,2}(?:[${i}]|$)`, NO_DOT: `(?!${s})`, NO_DOTS: `(?!(?:^|[${i}])${s}{1,2}(?:[${i}]|$))`, NO_DOT_SLASH: `(?!${s}{0,1}(?:[${i}]|$))`, NO_DOTS_SLASH: `(?!${s}{1,2}(?:[${i}]|$))`, QMARK_NO_DOT: `[^.${i}]`, START_ANCHOR: `(?:^|[${i}])`, END_ANCHOR: `(?:[${i}]|$)`, SEP: "\\" }, N = { alnum: "a-zA-Z0-9", alpha: "a-zA-Z", ascii: "\\x00-\\x7F", blank: " \\t", cntrl: "\\x00-\\x1F\\x7F", digit: "0-9", graph: "\\x21-\\x7E", lower: "a-z", print: "\\x20-\\x7E ", punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~", space: " \\t\\r\\n\\v\\f", upper: "A-Z", word: "A-Za-z0-9_", xdigit: "A-Fa-f0-9" };
      o.exports = { MAX_LENGTH: 65536, POSIX_REGEX_SOURCE: N, REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g, REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/, REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/, REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g, REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g, REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g, REPLACEMENTS: { "***": "*", "**/**": "**", "**/**/**": "**" }, CHAR_0: 48, CHAR_9: 57, CHAR_UPPERCASE_A: 65, CHAR_LOWERCASE_A: 97, CHAR_UPPERCASE_Z: 90, CHAR_LOWERCASE_Z: 122, CHAR_LEFT_PARENTHESES: 40, CHAR_RIGHT_PARENTHESES: 41, CHAR_ASTERISK: 42, CHAR_AMPERSAND: 38, CHAR_AT: 64, CHAR_BACKWARD_SLASH: 92, CHAR_CARRIAGE_RETURN: 13, CHAR_CIRCUMFLEX_ACCENT: 94, CHAR_COLON: 58, CHAR_COMMA: 44, CHAR_DOT: 46, CHAR_DOUBLE_QUOTE: 34, CHAR_EQUAL: 61, CHAR_EXCLAMATION_MARK: 33, CHAR_FORM_FEED: 12, CHAR_FORWARD_SLASH: 47, CHAR_GRAVE_ACCENT: 96, CHAR_HASH: 35, CHAR_HYPHEN_MINUS: 45, CHAR_LEFT_ANGLE_BRACKET: 60, CHAR_LEFT_CURLY_BRACE: 123, CHAR_LEFT_SQUARE_BRACKET: 91, CHAR_LINE_FEED: 10, CHAR_NO_BREAK_SPACE: 160, CHAR_PERCENT: 37, CHAR_PLUS: 43, CHAR_QUESTION_MARK: 63, CHAR_RIGHT_ANGLE_BRACKET: 62, CHAR_RIGHT_CURLY_BRACE: 125, CHAR_RIGHT_SQUARE_BRACKET: 93, CHAR_SEMICOLON: 59, CHAR_SINGLE_QUOTE: 39, CHAR_SPACE: 32, CHAR_TAB: 9, CHAR_UNDERSCORE: 95, CHAR_VERTICAL_LINE: 124, CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279, extglobChars(T) {
        return { "!": { type: "negate", open: "(?:(?!(?:", close: `))${T.STAR})` }, "?": { type: "qmark", open: "(?:", close: ")?" }, "+": { type: "plus", open: "(?:", close: ")+" }, "*": { type: "star", open: "(?:", close: ")*" }, "@": { type: "at", open: "(?:", close: ")" } };
      }, globChars(T) {
        return T === !0 ? O : x;
      } };
    }, 697: (o, i, a) => {
      const s = a(154), c = a(96), { MAX_LENGTH: u, POSIX_REGEX_SOURCE: l, REGEX_NON_SPECIAL_CHARS: d, REGEX_SPECIAL_CHARS_BACKREF: p, REPLACEMENTS: h } = s, b = (v, C) => {
        if (typeof C.expandRange == "function")
          return C.expandRange(...v, C);
        v.sort();
        const m = `[${v.join("-")}]`;
        try {
          new RegExp(m);
        } catch {
          return v.map((E) => c.escapeRegex(E)).join("..");
        }
        return m;
      }, f = (v, C) => `Missing ${v}: "${C}" - use "\\\\${C}" to match literal characters`, _ = (v, C) => {
        if (typeof v != "string")
          throw new TypeError("Expected a string");
        v = h[v] || v;
        const m = { ...C }, y = typeof m.maxLength == "number" ? Math.min(u, m.maxLength) : u;
        let E = v.length;
        if (E > y)
          throw new SyntaxError(`Input length: ${E}, exceeds maximum allowed length: ${y}`);
        const A = { type: "bos", value: "", output: m.prepend || "" }, x = [A], O = m.capture ? "" : "?:", N = s.globChars(m.windows), T = s.extglobChars(N), { DOT_LITERAL: M, PLUS_LITERAL: k, SLASH_LITERAL: B, ONE_CHAR: j, DOTS_SLASH: G, NO_DOT: F, NO_DOT_SLASH: Q, NO_DOTS_SLASH: I, QMARK: D, QMARK_NO_DOT: W, STAR: se, START_ANCHOR: re } = N, ne = (q) => `(${O}(?:(?!${re}${q.dot ? G : M}).)*?)`, Y = m.dot ? "" : F, pe = m.dot ? D : W;
        let ie = m.bash === !0 ? ne(m) : se;
        m.capture && (ie = `(${ie})`), typeof m.noext == "boolean" && (m.noextglob = m.noext);
        const P = { input: v, index: -1, start: 0, dot: m.dot === !0, consumed: "", output: "", prefix: "", backtrack: !1, negated: !1, brackets: 0, braces: 0, parens: 0, quotes: 0, globstar: !1, tokens: x };
        v = c.removePrefix(v, P), E = v.length;
        const te = [], z = [], K = [];
        let w = A, S;
        const $ = () => P.index === E - 1, H = P.peek = (q = 1) => v[P.index + q], U = P.advance = () => v[++P.index] || "", X = () => v.slice(P.index + 1), he = (q = "", be = 0) => {
          P.consumed += q, P.index += be;
        }, _e = (q) => {
          P.output += q.output != null ? q.output : q.value, he(q.value);
        }, me = () => {
          let q = 1;
          for (; H() === "!" && (H(2) !== "(" || H(3) === "?"); )
            U(), P.start++, q++;
          return q % 2 === 0 ? !1 : (P.negated = !0, P.start++, !0);
        }, Pe = (q) => {
          P[q]++, K.push(q);
        }, Re = (q) => {
          P[q]--, K.pop();
        }, ae = (q) => {
          if (w.type === "globstar") {
            const be = P.braces > 0 && (q.type === "comma" || q.type === "brace"), V = q.extglob === !0 || te.length && (q.type === "pipe" || q.type === "paren");
            q.type !== "slash" && q.type !== "paren" && !be && !V && (P.output = P.output.slice(0, -w.output.length), w.type = "star", w.value = "*", w.output = ie, P.output += w.output);
          }
          if (te.length && q.type !== "paren" && (te[te.length - 1].inner += q.value), (q.value || q.output) && _e(q), w && w.type === "text" && q.type === "text") {
            w.output = (w.output || w.value) + q.value, w.value += q.value;
            return;
          }
          q.prev = w, x.push(q), w = q;
        }, ce = (q, be) => {
          const V = { ...T[be], conditions: 1, inner: "" };
          V.prev = w, V.parens = P.parens, V.output = P.output;
          const L = (m.capture ? "(" : "") + V.open;
          Pe("parens"), ae({ type: q, value: be, output: P.output ? "" : j }), ae({ type: "paren", extglob: !0, value: U(), output: L }), te.push(V);
        }, Ee = (q) => {
          let be = q.close + (m.capture ? ")" : ""), V;
          if (q.type === "negate") {
            let L = ie;
            if (q.inner && q.inner.length > 1 && q.inner.includes("/") && (L = ne(m)), (L !== ie || $() || /^\)+$/.test(X())) && (be = q.close = `)$))${L}`), q.inner.includes("*") && (V = X()) && /^\.[^\\/.]+$/.test(V)) {
              const oe = _(V, { ...C, fastpaths: !1 }).output;
              be = q.close = `)${oe})${L})`;
            }
            q.prev.type === "bos" && (P.negatedExtglob = !0);
          }
          ae({ type: "paren", extglob: !0, value: S, output: be }), Re("parens");
        };
        if (m.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(v)) {
          let q = !1, be = v.replace(p, (V, L, oe, we, ge, Oe) => we === "\\" ? (q = !0, V) : we === "?" ? L ? L + we + (ge ? D.repeat(ge.length) : "") : Oe === 0 ? pe + (ge ? D.repeat(ge.length) : "") : D.repeat(oe.length) : we === "." ? M.repeat(oe.length) : we === "*" ? L ? L + we + (ge ? ie : "") : ie : L ? V : `\\${V}`);
          return q === !0 && (m.unescape === !0 ? be = be.replace(/\\/g, "") : be = be.replace(/\\+/g, (V) => V.length % 2 === 0 ? "\\\\" : V ? "\\" : "")), be === v && m.contains === !0 ? (P.output = v, P) : (P.output = c.wrapOutput(be, P, C), P);
        }
        for (; !$(); ) {
          if (S = U(), S === "\0")
            continue;
          if (S === "\\") {
            const V = H();
            if (V === "/" && m.bash !== !0 || V === "." || V === ";")
              continue;
            if (!V) {
              S += "\\", ae({ type: "text", value: S });
              continue;
            }
            const L = /^\\+/.exec(X());
            let oe = 0;
            if (L && L[0].length > 2 && (oe = L[0].length, P.index += oe, oe % 2 !== 0 && (S += "\\")), m.unescape === !0 ? S = U() : S += U(), P.brackets === 0) {
              ae({ type: "text", value: S });
              continue;
            }
          }
          if (P.brackets > 0 && (S !== "]" || w.value === "[" || w.value === "[^")) {
            if (m.posix !== !1 && S === ":") {
              const V = w.value.slice(1);
              if (V.includes("[") && (w.posix = !0, V.includes(":"))) {
                const L = w.value.lastIndexOf("["), oe = w.value.slice(0, L), we = w.value.slice(L + 2), ge = l[we];
                if (ge) {
                  w.value = oe + ge, P.backtrack = !0, U(), !A.output && x.indexOf(w) === 1 && (A.output = j);
                  continue;
                }
              }
            }
            (S === "[" && H() !== ":" || S === "-" && H() === "]") && (S = `\\${S}`), S === "]" && (w.value === "[" || w.value === "[^") && (S = `\\${S}`), m.posix === !0 && S === "!" && w.value === "[" && (S = "^"), w.value += S, _e({ value: S });
            continue;
          }
          if (P.quotes === 1 && S !== '"') {
            S = c.escapeRegex(S), w.value += S, _e({ value: S });
            continue;
          }
          if (S === '"') {
            P.quotes = P.quotes === 1 ? 0 : 1, m.keepQuotes === !0 && ae({ type: "text", value: S });
            continue;
          }
          if (S === "(") {
            Pe("parens"), ae({ type: "paren", value: S });
            continue;
          }
          if (S === ")") {
            if (P.parens === 0 && m.strictBrackets === !0)
              throw new SyntaxError(f("opening", "("));
            const V = te[te.length - 1];
            if (V && P.parens === V.parens + 1) {
              Ee(te.pop());
              continue;
            }
            ae({ type: "paren", value: S, output: P.parens ? ")" : "\\)" }), Re("parens");
            continue;
          }
          if (S === "[") {
            if (m.nobracket === !0 || !X().includes("]")) {
              if (m.nobracket !== !0 && m.strictBrackets === !0)
                throw new SyntaxError(f("closing", "]"));
              S = `\\${S}`;
            } else
              Pe("brackets");
            ae({ type: "bracket", value: S });
            continue;
          }
          if (S === "]") {
            if (m.nobracket === !0 || w && w.type === "bracket" && w.value.length === 1) {
              ae({ type: "text", value: S, output: `\\${S}` });
              continue;
            }
            if (P.brackets === 0) {
              if (m.strictBrackets === !0)
                throw new SyntaxError(f("opening", "["));
              ae({ type: "text", value: S, output: `\\${S}` });
              continue;
            }
            Re("brackets");
            const V = w.value.slice(1);
            if (w.posix !== !0 && V[0] === "^" && !V.includes("/") && (S = `/${S}`), w.value += S, _e({ value: S }), m.literalBrackets === !1 || c.hasRegexChars(V))
              continue;
            const L = c.escapeRegex(w.value);
            if (P.output = P.output.slice(0, -w.value.length), m.literalBrackets === !0) {
              P.output += L, w.value = L;
              continue;
            }
            w.value = `(${O}${L}|${w.value})`, P.output += w.value;
            continue;
          }
          if (S === "{" && m.nobrace !== !0) {
            Pe("braces");
            const V = { type: "brace", value: S, output: "(", outputIndex: P.output.length, tokensIndex: P.tokens.length };
            z.push(V), ae(V);
            continue;
          }
          if (S === "}") {
            const V = z[z.length - 1];
            if (m.nobrace === !0 || !V) {
              ae({ type: "text", value: S, output: S });
              continue;
            }
            let L = ")";
            if (V.dots === !0) {
              const oe = x.slice(), we = [];
              for (let ge = oe.length - 1; ge >= 0 && (x.pop(), oe[ge].type !== "brace"); ge--)
                oe[ge].type !== "dots" && we.unshift(oe[ge].value);
              L = b(we, m), P.backtrack = !0;
            }
            if (V.comma !== !0 && V.dots !== !0) {
              const oe = P.output.slice(0, V.outputIndex), we = P.tokens.slice(V.tokensIndex);
              V.value = V.output = "\\{", S = L = "\\}", P.output = oe;
              for (const ge of we)
                P.output += ge.output || ge.value;
            }
            ae({ type: "brace", value: S, output: L }), Re("braces"), z.pop();
            continue;
          }
          if (S === "|") {
            te.length > 0 && te[te.length - 1].conditions++, ae({ type: "text", value: S });
            continue;
          }
          if (S === ",") {
            let V = S;
            const L = z[z.length - 1];
            L && K[K.length - 1] === "braces" && (L.comma = !0, V = "|"), ae({ type: "comma", value: S, output: V });
            continue;
          }
          if (S === "/") {
            if (w.type === "dot" && P.index === P.start + 1) {
              P.start = P.index + 1, P.consumed = "", P.output = "", x.pop(), w = A;
              continue;
            }
            ae({ type: "slash", value: S, output: B });
            continue;
          }
          if (S === ".") {
            if (P.braces > 0 && w.type === "dot") {
              w.value === "." && (w.output = M);
              const V = z[z.length - 1];
              w.type = "dots", w.output += S, w.value += S, V.dots = !0;
              continue;
            }
            if (P.braces + P.parens === 0 && w.type !== "bos" && w.type !== "slash") {
              ae({ type: "text", value: S, output: M });
              continue;
            }
            ae({ type: "dot", value: S, output: M });
            continue;
          }
          if (S === "?") {
            if (!(w && w.value === "(") && m.noextglob !== !0 && H() === "(" && H(2) !== "?") {
              ce("qmark", S);
              continue;
            }
            if (w && w.type === "paren") {
              const L = H();
              let oe = S;
              (w.value === "(" && !/[!=<:]/.test(L) || L === "<" && !/<([!=]|\w+>)/.test(X())) && (oe = `\\${S}`), ae({ type: "text", value: S, output: oe });
              continue;
            }
            if (m.dot !== !0 && (w.type === "slash" || w.type === "bos")) {
              ae({ type: "qmark", value: S, output: W });
              continue;
            }
            ae({ type: "qmark", value: S, output: D });
            continue;
          }
          if (S === "!") {
            if (m.noextglob !== !0 && H() === "(" && (H(2) !== "?" || !/[!=<:]/.test(H(3)))) {
              ce("negate", S);
              continue;
            }
            if (m.nonegate !== !0 && P.index === 0) {
              me();
              continue;
            }
          }
          if (S === "+") {
            if (m.noextglob !== !0 && H() === "(" && H(2) !== "?") {
              ce("plus", S);
              continue;
            }
            if (w && w.value === "(" || m.regex === !1) {
              ae({ type: "plus", value: S, output: k });
              continue;
            }
            if (w && (w.type === "bracket" || w.type === "paren" || w.type === "brace") || P.parens > 0) {
              ae({ type: "plus", value: S });
              continue;
            }
            ae({ type: "plus", value: k });
            continue;
          }
          if (S === "@") {
            if (m.noextglob !== !0 && H() === "(" && H(2) !== "?") {
              ae({ type: "at", extglob: !0, value: S, output: "" });
              continue;
            }
            ae({ type: "text", value: S });
            continue;
          }
          if (S !== "*") {
            (S === "$" || S === "^") && (S = `\\${S}`);
            const V = d.exec(X());
            V && (S += V[0], P.index += V[0].length), ae({ type: "text", value: S });
            continue;
          }
          if (w && (w.type === "globstar" || w.star === !0)) {
            w.type = "star", w.star = !0, w.value += S, w.output = ie, P.backtrack = !0, P.globstar = !0, he(S);
            continue;
          }
          let q = X();
          if (m.noextglob !== !0 && /^\([^?]/.test(q)) {
            ce("star", S);
            continue;
          }
          if (w.type === "star") {
            if (m.noglobstar === !0) {
              he(S);
              continue;
            }
            const V = w.prev, L = V.prev, oe = V.type === "slash" || V.type === "bos", we = L && (L.type === "star" || L.type === "globstar");
            if (m.bash === !0 && (!oe || q[0] && q[0] !== "/")) {
              ae({ type: "star", value: S, output: "" });
              continue;
            }
            const ge = P.braces > 0 && (V.type === "comma" || V.type === "brace"), Oe = te.length && (V.type === "pipe" || V.type === "paren");
            if (!oe && V.type !== "paren" && !ge && !Oe) {
              ae({ type: "star", value: S, output: "" });
              continue;
            }
            for (; q.slice(0, 3) === "/**"; ) {
              const zt = v[P.index + 4];
              if (zt && zt !== "/")
                break;
              q = q.slice(3), he("/**", 3);
            }
            if (V.type === "bos" && $()) {
              w.type = "globstar", w.value += S, w.output = ne(m), P.output = w.output, P.globstar = !0, he(S);
              continue;
            }
            if (V.type === "slash" && V.prev.type !== "bos" && !we && $()) {
              P.output = P.output.slice(0, -(V.output + w.output).length), V.output = `(?:${V.output}`, w.type = "globstar", w.output = ne(m) + (m.strictSlashes ? ")" : "|$)"), w.value += S, P.globstar = !0, P.output += V.output + w.output, he(S);
              continue;
            }
            if (V.type === "slash" && V.prev.type !== "bos" && q[0] === "/") {
              const zt = q[1] !== void 0 ? "|$" : "";
              P.output = P.output.slice(0, -(V.output + w.output).length), V.output = `(?:${V.output}`, w.type = "globstar", w.output = `${ne(m)}${B}|${B}${zt})`, w.value += S, P.output += V.output + w.output, P.globstar = !0, he(S + U()), ae({ type: "slash", value: "/", output: "" });
              continue;
            }
            if (V.type === "bos" && q[0] === "/") {
              w.type = "globstar", w.value += S, w.output = `(?:^|${B}|${ne(m)}${B})`, P.output = w.output, P.globstar = !0, he(S + U()), ae({ type: "slash", value: "/", output: "" });
              continue;
            }
            P.output = P.output.slice(0, -w.output.length), w.type = "globstar", w.output = ne(m), w.value += S, P.output += w.output, P.globstar = !0, he(S);
            continue;
          }
          const be = { type: "star", value: S, output: ie };
          if (m.bash === !0) {
            be.output = ".*?", (w.type === "bos" || w.type === "slash") && (be.output = Y + be.output), ae(be);
            continue;
          }
          if (w && (w.type === "bracket" || w.type === "paren") && m.regex === !0) {
            be.output = S, ae(be);
            continue;
          }
          (P.index === P.start || w.type === "slash" || w.type === "dot") && (w.type === "dot" ? (P.output += Q, w.output += Q) : m.dot === !0 ? (P.output += I, w.output += I) : (P.output += Y, w.output += Y), H() !== "*" && (P.output += j, w.output += j)), ae(be);
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
        if (m.strictSlashes !== !0 && (w.type === "star" || w.type === "bracket") && ae({ type: "maybe_slash", value: "", output: `${B}?` }), P.backtrack === !0) {
          P.output = "";
          for (const q of P.tokens)
            P.output += q.output != null ? q.output : q.value, q.suffix && (P.output += q.suffix);
        }
        return P;
      };
      _.fastpaths = (v, C) => {
        const m = { ...C }, y = typeof m.maxLength == "number" ? Math.min(u, m.maxLength) : u, E = v.length;
        if (E > y)
          throw new SyntaxError(`Input length: ${E}, exceeds maximum allowed length: ${y}`);
        v = h[v] || v;
        const { DOT_LITERAL: A, SLASH_LITERAL: x, ONE_CHAR: O, DOTS_SLASH: N, NO_DOT: T, NO_DOTS: M, NO_DOTS_SLASH: k, STAR: B, START_ANCHOR: j } = s.globChars(m.windows), G = m.dot ? M : T, F = m.dot ? k : T, Q = m.capture ? "" : "?:", I = { negated: !1, prefix: "" };
        let D = m.bash === !0 ? ".*?" : B;
        m.capture && (D = `(${D})`);
        const W = (Y) => Y.noglobstar === !0 ? D : `(${Q}(?:(?!${j}${Y.dot ? N : A}).)*?)`, se = (Y) => {
          switch (Y) {
            case "*":
              return `${G}${O}${D}`;
            case ".*":
              return `${A}${O}${D}`;
            case "*.*":
              return `${G}${D}${A}${O}${D}`;
            case "*/*":
              return `${G}${D}${x}${O}${F}${D}`;
            case "**":
              return G + W(m);
            case "**/*":
              return `(?:${G}${W(m)}${x})?${F}${O}${D}`;
            case "**/*.*":
              return `(?:${G}${W(m)}${x})?${F}${D}${A}${O}${D}`;
            case "**/.*":
              return `(?:${G}${W(m)}${x})?${A}${O}${D}`;
            default: {
              const pe = /^(.*?)\.(\w+)$/.exec(Y);
              if (!pe) return;
              const ie = se(pe[1]);
              return ie ? ie + A + pe[2] : void 0;
            }
          }
        }, re = c.removePrefix(v, I);
        let ne = se(re);
        return ne && m.strictSlashes !== !0 && (ne += `${x}?`), ne;
      }, o.exports = _;
    }, 510: (o, i, a) => {
      const s = a(716), c = a(697), u = a(96), l = a(154), d = (h) => h && typeof h == "object" && !Array.isArray(h), p = (h, b, f = !1) => {
        if (Array.isArray(h)) {
          const x = h.map((N) => p(N, b, f));
          return (N) => {
            for (const T of x) {
              const M = T(N);
              if (M) return M;
            }
            return !1;
          };
        }
        const _ = d(h) && h.tokens && h.input;
        if (h === "" || typeof h != "string" && !_)
          throw new TypeError("Expected pattern to be a non-empty string");
        const v = b || {}, C = v.windows, m = _ ? p.compileRe(h, b) : p.makeRe(h, b, !1, !0), y = m.state;
        delete m.state;
        let E = () => !1;
        if (v.ignore) {
          const x = { ...b, ignore: null, onMatch: null, onResult: null };
          E = p(v.ignore, x, f);
        }
        const A = (x, O = !1) => {
          const { isMatch: N, match: T, output: M } = p.test(x, m, b, { glob: h, posix: C }), k = { glob: h, state: y, regex: m, posix: C, input: x, output: M, match: T, isMatch: N };
          return typeof v.onResult == "function" && v.onResult(k), N === !1 ? (k.isMatch = !1, O ? k : !1) : E(x) ? (typeof v.onIgnore == "function" && v.onIgnore(k), k.isMatch = !1, O ? k : !1) : (typeof v.onMatch == "function" && v.onMatch(k), O ? k : !0);
        };
        return f && (A.state = y), A;
      };
      p.test = (h, b, f, { glob: _, posix: v } = {}) => {
        if (typeof h != "string")
          throw new TypeError("Expected input to be a string");
        if (h === "")
          return { isMatch: !1, output: "" };
        const C = f || {}, m = C.format || (v ? u.toPosixSlashes : null);
        let y = h === _, E = y && m ? m(h) : h;
        return y === !1 && (E = m ? m(h) : h, y = E === _), (y === !1 || C.capture === !0) && (C.matchBase === !0 || C.basename === !0 ? y = p.matchBase(h, b, f, v) : y = b.exec(E)), { isMatch: !!y, match: y, output: E };
      }, p.matchBase = (h, b, f) => (b instanceof RegExp ? b : p.makeRe(b, f)).test(u.basename(h)), p.isMatch = (h, b, f) => p(b, f)(h), p.parse = (h, b) => Array.isArray(h) ? h.map((f) => p.parse(f, b)) : c(h, { ...b, fastpaths: !1 }), p.scan = (h, b) => s(h, b), p.compileRe = (h, b, f = !1, _ = !1) => {
        if (f === !0)
          return h.output;
        const v = b || {}, C = v.contains ? "" : "^", m = v.contains ? "" : "$";
        let y = `${C}(?:${h.output})${m}`;
        h && h.negated === !0 && (y = `^(?!${y}).*$`);
        const E = p.toRegex(y, b);
        return _ === !0 && (E.state = h), E;
      }, p.makeRe = (h, b = {}, f = !1, _ = !1) => {
        if (!h || typeof h != "string")
          throw new TypeError("Expected a non-empty string");
        let v = { negated: !1, fastpaths: !0 };
        return b.fastpaths !== !1 && (h[0] === "." || h[0] === "*") && (v.output = c.fastpaths(h, b)), v.output || (v = c(h, b)), p.compileRe(v, b, f, _);
      }, p.toRegex = (h, b) => {
        try {
          const f = b || {};
          return new RegExp(h, f.flags || (f.nocase ? "i" : ""));
        } catch (f) {
          if (b && b.debug === !0) throw f;
          return /$^/;
        }
      }, p.constants = l, o.exports = p;
    }, 716: (o, i, a) => {
      const s = a(96), { CHAR_ASTERISK: c, CHAR_AT: u, CHAR_BACKWARD_SLASH: l, CHAR_COMMA: d, CHAR_DOT: p, CHAR_EXCLAMATION_MARK: h, CHAR_FORWARD_SLASH: b, CHAR_LEFT_CURLY_BRACE: f, CHAR_LEFT_PARENTHESES: _, CHAR_LEFT_SQUARE_BRACKET: v, CHAR_PLUS: C, CHAR_QUESTION_MARK: m, CHAR_RIGHT_CURLY_BRACE: y, CHAR_RIGHT_PARENTHESES: E, CHAR_RIGHT_SQUARE_BRACKET: A } = a(154), x = (T) => T === b || T === l, O = (T) => {
        T.isPrefix !== !0 && (T.depth = T.isGlobstar ? 1 / 0 : 1);
      }, N = (T, M) => {
        const k = M || {}, B = T.length - 1, j = k.parts === !0 || k.scanToEnd === !0, G = [], F = [], Q = [];
        let I = T, D = -1, W = 0, se = 0, re = !1, ne = !1, Y = !1, pe = !1, ie = !1, P = !1, te = !1, z = !1, K = !1, w = !1, S = 0, $, H, U = { value: "", depth: 0, isGlob: !1 };
        const X = () => D >= B, he = () => I.charCodeAt(D + 1), _e = () => ($ = H, I.charCodeAt(++D));
        for (; D < B; ) {
          H = _e();
          let ce;
          if (H === l) {
            te = U.backslashes = !0, H = _e(), H === f && (P = !0);
            continue;
          }
          if (P === !0 || H === f) {
            for (S++; X() !== !0 && (H = _e()); ) {
              if (H === l) {
                te = U.backslashes = !0, _e();
                continue;
              }
              if (H === f) {
                S++;
                continue;
              }
              if (P !== !0 && H === p && (H = _e()) === p) {
                if (re = U.isBrace = !0, Y = U.isGlob = !0, w = !0, j === !0)
                  continue;
                break;
              }
              if (P !== !0 && H === d) {
                if (re = U.isBrace = !0, Y = U.isGlob = !0, w = !0, j === !0)
                  continue;
                break;
              }
              if (H === y && (S--, S === 0)) {
                P = !1, re = U.isBrace = !0, w = !0;
                break;
              }
            }
            if (j === !0)
              continue;
            break;
          }
          if (H === b) {
            if (G.push(D), F.push(U), U = { value: "", depth: 0, isGlob: !1 }, w === !0) continue;
            if ($ === p && D === W + 1) {
              W += 2;
              continue;
            }
            se = D + 1;
            continue;
          }
          if (k.noext !== !0 && (H === C || H === u || H === c || H === m || H === h) === !0 && he() === _) {
            if (Y = U.isGlob = !0, pe = U.isExtglob = !0, w = !0, H === h && D === W && (K = !0), j === !0) {
              for (; X() !== !0 && (H = _e()); ) {
                if (H === l) {
                  te = U.backslashes = !0, H = _e();
                  continue;
                }
                if (H === E) {
                  Y = U.isGlob = !0, w = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (H === c) {
            if ($ === c && (ie = U.isGlobstar = !0), Y = U.isGlob = !0, w = !0, j === !0)
              continue;
            break;
          }
          if (H === m) {
            if (Y = U.isGlob = !0, w = !0, j === !0)
              continue;
            break;
          }
          if (H === v) {
            for (; X() !== !0 && (ce = _e()); ) {
              if (ce === l) {
                te = U.backslashes = !0, _e();
                continue;
              }
              if (ce === A) {
                ne = U.isBracket = !0, Y = U.isGlob = !0, w = !0;
                break;
              }
            }
            if (j === !0)
              continue;
            break;
          }
          if (k.nonegate !== !0 && H === h && D === W) {
            z = U.negated = !0, W++;
            continue;
          }
          if (k.noparen !== !0 && H === _) {
            if (Y = U.isGlob = !0, j === !0) {
              for (; X() !== !0 && (H = _e()); ) {
                if (H === _) {
                  te = U.backslashes = !0, H = _e();
                  continue;
                }
                if (H === E) {
                  w = !0;
                  break;
                }
              }
              continue;
            }
            break;
          }
          if (Y === !0) {
            if (w = !0, j === !0)
              continue;
            break;
          }
        }
        k.noext === !0 && (pe = !1, Y = !1);
        let me = I, Pe = "", Re = "";
        W > 0 && (Pe = I.slice(0, W), I = I.slice(W), se -= W), me && Y === !0 && se > 0 ? (me = I.slice(0, se), Re = I.slice(se)) : Y === !0 ? (me = "", Re = I) : me = I, me && me !== "" && me !== "/" && me !== I && x(me.charCodeAt(me.length - 1)) && (me = me.slice(0, -1)), k.unescape === !0 && (Re && (Re = s.removeBackslashes(Re)), me && te === !0 && (me = s.removeBackslashes(me)));
        const ae = { prefix: Pe, input: T, start: W, base: me, glob: Re, isBrace: re, isBracket: ne, isGlob: Y, isExtglob: pe, isGlobstar: ie, negated: z, negatedExtglob: K };
        if (k.tokens === !0 && (ae.maxDepth = 0, x(H) || F.push(U), ae.tokens = F), k.parts === !0 || k.tokens === !0) {
          let ce;
          for (let Ee = 0; Ee < G.length; Ee++) {
            const q = ce ? ce + 1 : W, be = G[Ee], V = T.slice(q, be);
            k.tokens && (Ee === 0 && W !== 0 ? (F[Ee].isPrefix = !0, F[Ee].value = Pe) : F[Ee].value = V, O(F[Ee]), ae.maxDepth += F[Ee].depth), (Ee !== 0 || V !== "") && Q.push(V), ce = be;
          }
          if (ce && ce + 1 < T.length) {
            const Ee = T.slice(ce + 1);
            Q.push(Ee), k.tokens && (F[F.length - 1].value = Ee, O(F[F.length - 1]), ae.maxDepth += F[F.length - 1].depth);
          }
          ae.slashes = G, ae.parts = Q;
        }
        return ae;
      };
      o.exports = N;
    }, 96: (o, i, a) => {
      const { REGEX_BACKSLASH: s, REGEX_REMOVE_BACKSLASH: c, REGEX_SPECIAL_CHARS: u, REGEX_SPECIAL_CHARS_GLOBAL: l } = a(154);
      i.isObject = (d) => d !== null && typeof d == "object" && !Array.isArray(d), i.hasRegexChars = (d) => u.test(d), i.isRegexChar = (d) => d.length === 1 && i.hasRegexChars(d), i.escapeRegex = (d) => d.replace(l, "\\$1"), i.toPosixSlashes = (d) => d.replace(s, "/"), i.removeBackslashes = (d) => d.replace(c, (p) => p === "\\" ? "" : p), i.escapeLast = (d, p, h) => {
        const b = d.lastIndexOf(p, h);
        return b === -1 ? d : d[b - 1] === "\\" ? i.escapeLast(d, p, b - 1) : `${d.slice(0, b)}\\${d.slice(b)}`;
      }, i.removePrefix = (d, p = {}) => {
        let h = d;
        return h.startsWith("./") && (h = h.slice(2), p.prefix = "./"), h;
      }, i.wrapOutput = (d, p = {}, h = {}) => {
        const b = h.contains ? "" : "^", f = h.contains ? "" : "$";
        let _ = `${b}(?:${d})${f}`;
        return p.negated === !0 && (_ = `(?:^(?!${_}).*$)`), _;
      }, i.basename = (d, { windows: p } = {}) => {
        const h = d.split(p ? /[\\/]/ : "/"), b = h[h.length - 1];
        return b === "" ? h[h.length - 2] : b;
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
    Vr.exports = r;
  })()), Vr.exports;
}
var Za;
function eg() {
  return Za || (Za = 1, function(e) {
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
    const n = yu();
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
  }(zr)), zr;
}
var qr = {}, Ja;
function tg() {
  return Ja || (Ja = 1, function(e) {
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
    const n = yu();
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
  }(qr)), qr;
}
var es;
function Eu() {
  return es || (es = 1, function(e) {
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
          const { hasLocalMatch: p } = eg();
          if (!p(i.localPatterns, a))
            throw Object.defineProperty(new Error("Invalid src prop (" + a + ") on `next/image` does not match `images.localPatterns` configured in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns"), "__NEXT_ERROR_CODE", {
              value: "E426",
              enumerable: !1,
              configurable: !0
            });
        }
        if (!a.startsWith("/") && (i.domains || i.remotePatterns)) {
          let p;
          try {
            p = new URL(a);
          } catch (h) {
            throw console.error(h), Object.defineProperty(new Error('Failed to parse src "' + a + '" on `next/image`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)'), "__NEXT_ERROR_CODE", {
              value: "E63",
              enumerable: !1,
              configurable: !0
            });
          }
          if (process.env.NODE_ENV !== "test" && // micromatch isn't compatible with edge runtime
          process.env.NEXT_RUNTIME !== "edge") {
            const { hasRemoteMatch: h } = tg();
            if (!h(i.domains, i.remotePatterns, p))
              throw Object.defineProperty(new Error("Invalid src prop (" + a + ') on `next/image`, hostname "' + p.hostname + '" is not configured under images in your `next.config.js`\nSee more info: https://nextjs.org/docs/messages/next-image-unconfigured-host'), "__NEXT_ERROR_CODE", {
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
      const l = c || ((u = i.qualities) == null ? void 0 : u.reduce((d, p) => Math.abs(p - t) < Math.abs(d - t) ? p : d)) || t;
      return i.path + "?url=" + encodeURIComponent(a) + "&w=" + s + "&q=" + l + (a.startsWith("/_next/static/media/") && process.env.NEXT_DEPLOYMENT_ID ? "&dpl=" + process.env.NEXT_DEPLOYMENT_ID : "");
    }
    n.__next_img_default = !0;
    const r = n;
  }(Gr)), Gr;
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
  const n = qe, r = Ct, o = Vo, i = /* @__PURE__ */ r._(ue), a = /* @__PURE__ */ n._(Xo), s = /* @__PURE__ */ n._(Zh()), c = fi, u = Yn, l = Jh(), d = Kn, p = Zs(), h = /* @__PURE__ */ n._(Eu()), b = Js(), f = process.env.__NEXT_IMAGE_OPTS;
  typeof window > "u" && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
  function _(E, A, x, O, N, T, M) {
    const k = E == null ? void 0 : E.src;
    if (!E || E["data-loaded-src"] === k)
      return;
    E["data-loaded-src"] = k, ("decode" in E ? E.decode() : Promise.resolve()).catch(() => {
    }).then(() => {
      if (!(!E.parentElement || !E.isConnected)) {
        if (A !== "empty" && N(!0), x != null && x.current) {
          const j = new Event("load");
          Object.defineProperty(j, "target", {
            writable: !1,
            value: E
          });
          let G = !1, F = !1;
          x.current({
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
              const { position: Q } = window.getComputedStyle(E.parentElement), I = [
                "absolute",
                "fixed",
                "relative"
              ];
              I.includes(Q) || (0, d.warnOnce)('Image with src "' + j + '" has "fill" and parent element with invalid "position". Provided "' + Q + '" should be one of ' + I.map(String).join(",") + ".");
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
    return i.use ? {
      fetchPriority: E
    } : {
      fetchpriority: E
    };
  }
  const C = /* @__PURE__ */ (0, i.forwardRef)((E, A) => {
    let { src: x, srcSet: O, sizes: N, height: T, width: M, decoding: k, className: B, style: j, fetchPriority: G, placeholder: F, loading: Q, unoptimized: I, fill: D, onLoadRef: W, onLoadingCompleteRef: se, setBlurComplete: re, setShowAltText: ne, sizesInput: Y, onLoad: pe, onError: ie, ...P } = E;
    const te = (0, i.useCallback)((K) => {
      K && (ie && (K.src = K.src), process.env.NODE_ENV !== "production" && (x || console.error('Image is missing required "src" property:', K), K.getAttribute("alt") === null && console.error('Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.')), K.complete && _(K, F, W, se, re, I, Y));
    }, [
      x,
      F,
      W,
      se,
      re,
      ie,
      I,
      Y
    ]), z = (0, b.useMergedRef)(A, te);
    return /* @__PURE__ */ (0, o.jsx)("img", {
      ...P,
      ...v(G),
      // It's intended to keep `loading` before `src` because React updates
      // props in order which causes Safari/Firefox to not lazy load properly.
      // See https://github.com/facebook/react/issues/25883
      loading: Q,
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
      src: x,
      ref: z,
      onLoad: (K) => {
        const w = K.currentTarget;
        _(w, F, W, se, re, I, Y);
      },
      onError: (K) => {
        ne(!0), F !== "empty" && re(!0), ie && ie(K);
      }
    });
  });
  function m(E) {
    let { isAppRouter: A, imgAttributes: x } = E;
    const O = {
      as: "image",
      imageSrcSet: x.srcSet,
      imageSizes: x.sizes,
      crossOrigin: x.crossOrigin,
      referrerPolicy: x.referrerPolicy,
      ...v(x.fetchPriority)
    };
    return A && a.default.preload ? (a.default.preload(
      x.src,
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
        href: x.srcSet ? void 0 : x.src,
        ...O
      }, "__nimg-" + x.src + x.srcSet + x.sizes)
    });
  }
  const y = /* @__PURE__ */ (0, i.forwardRef)((E, A) => {
    const O = !(0, i.useContext)(p.RouterContext), N = (0, i.useContext)(l.ImageConfigContext), T = (0, i.useMemo)(() => {
      var se;
      const re = f || N || u.imageConfigDefault, ne = [
        ...re.deviceSizes,
        ...re.imageSizes
      ].sort((ie, P) => ie - P), Y = re.deviceSizes.sort((ie, P) => ie - P), pe = (se = re.qualities) == null ? void 0 : se.sort((ie, P) => ie - P);
      return {
        ...re,
        allSizes: ne,
        deviceSizes: Y,
        qualities: pe
      };
    }, [
      N
    ]), { onLoad: M, onLoadingComplete: k } = E, B = (0, i.useRef)(M);
    (0, i.useEffect)(() => {
      B.current = M;
    }, [
      M
    ]);
    const j = (0, i.useRef)(k);
    (0, i.useEffect)(() => {
      j.current = k;
    }, [
      k
    ]);
    const [G, F] = (0, i.useState)(!1), [Q, I] = (0, i.useState)(!1), { props: D, meta: W } = (0, c.getImgProps)(E, {
      defaultLoader: h.default,
      imgConf: T,
      blurComplete: G,
      showAltText: Q
    });
    return /* @__PURE__ */ (0, o.jsxs)(o.Fragment, {
      children: [
        /* @__PURE__ */ (0, o.jsx)(C, {
          ...D,
          unoptimized: W.unoptimized,
          placeholder: W.placeholder,
          fill: W.fill,
          onLoadRef: B,
          onLoadingCompleteRef: j,
          setBlurComplete: F,
          setShowAltText: I,
          sizesInput: E.sizes,
          ref: A
        }),
        W.priority ? /* @__PURE__ */ (0, o.jsx)(m, {
          isAppRouter: O,
          imgAttributes: D
        }) : null
      ]
    });
  });
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(xo, xo.exports);
var ng = xo.exports;
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
  const n = qe, r = fi, o = ng, i = /* @__PURE__ */ n._(Eu());
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
})(_u);
var rg = _u;
const og = /* @__PURE__ */ Gs(rg), ig = ({ logo: e = "/images/logo-black.png", width: t = 120, height: n = 37, className: r }) => /* @__PURE__ */ R(jn, { href: "/", "data-testid": "logo", className: "", children: e ? /* @__PURE__ */ R(og, { src: e, alt: "Logo", width: t, height: n, className: r }) : /* @__PURE__ */ R("p", { className: "text-xl font-bold", children: "LOGO" }) }), ag = [
  {
    id: 3,
    title: "Link 1",
    href: "/explore",
    type: "dropdown",
    subLinks: [
      {
        id: 1,
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description: "A modal dialog that interrupts the user with important content and expects a response."
      },
      {
        id: 2,
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link."
      },
      {
        id: 3,
        title: "Progress",
        href: "/docs/primitives/progress",
        description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
      },
      {
        id: 4,
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content."
      },
      {
        id: 5,
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time."
      },
      {
        id: 6,
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
      }
    ]
  },
  { id: 5, title: "Link 2", href: "/features", type: "link" },
  { id: 4, title: "Link 3", href: "/pricing", type: "link" }
];
var Po = { exports: {} }, Ru = {};
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
  const r = /* @__PURE__ */ qe._(ue), o = r.default.createContext(null), i = r.default.createContext(null), a = r.default.createContext(null), s = r.default.createContext(null);
  process.env.NODE_ENV !== "production" && (o.displayName = "AppRouterContext", i.displayName = "LayoutRouterContext", a.displayName = "GlobalLayoutRouterContext", s.displayName = "TemplateContext");
  const c = r.default.createContext(/* @__PURE__ */ new Set());
})(Ru);
var wu = {};
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
  const n = ue, r = (0, n.createContext)(null), o = (0, n.createContext)(null), i = (0, n.createContext)(null);
  process.env.NODE_ENV !== "production" && (r.displayName = "SearchParamsContext", o.displayName = "PathnameContext", i.displayName = "PathParamsContext");
})(wu);
var Oo = { exports: {} };
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
})(Oo, Oo.exports);
var sg = Oo.exports, Ao = { exports: {} }, To = { exports: {} }, No = { exports: {} };
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
})(No, No.exports);
var Su = No.exports, Io = { exports: {} };
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
  const r = Su, o = "NEXT_REDIRECT";
  var i = /* @__PURE__ */ function(s) {
    return s.push = "push", s.replace = "replace", s;
  }({});
  function a(s) {
    if (typeof s != "object" || s === null || !("digest" in s) || typeof s.digest != "string")
      return !1;
    const c = s.digest.split(";"), [u, l] = c, d = c.slice(2, -2).join(";"), p = c.at(-2), h = Number(p);
    return u === o && (l === "replace" || l === "push") && typeof d == "string" && !isNaN(h) && h in r.RedirectStatusCode;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Io, Io.exports);
var pi = Io.exports, Xr = {}, Wr = {}, Kr = {}, ts;
function mi() {
  return ts || (ts = 1, function(e) {
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
  }(Kr)), Kr;
}
var ns;
function cg() {
  return ns || (ns = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "actionAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, mi().createAsyncLocalStorage)();
  }(Wr)), Wr;
}
var rs;
function ug() {
  return rs || (rs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "actionAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.actionAsyncStorageInstance;
      }
    });
    const t = cg();
  }(Xr)), Xr;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(p, h) {
    for (var b in h) Object.defineProperty(p, b, {
      enumerable: !0,
      get: h[b]
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
  const r = Su, o = pi, i = typeof window > "u" ? ug().actionAsyncStorage : void 0;
  function a(p, h, b) {
    b === void 0 && (b = r.RedirectStatusCode.TemporaryRedirect);
    const f = Object.defineProperty(new Error(o.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    return f.digest = o.REDIRECT_ERROR_CODE + ";" + h + ";" + p + ";" + b + ";", f;
  }
  function s(p, h) {
    var b;
    throw h ?? (h = !(i == null || (b = i.getStore()) == null) && b.isAction ? o.RedirectType.push : o.RedirectType.replace), a(p, h, r.RedirectStatusCode.TemporaryRedirect);
  }
  function c(p, h) {
    throw h === void 0 && (h = o.RedirectType.replace), a(p, h, r.RedirectStatusCode.PermanentRedirect);
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
})(To, To.exports);
var lg = To.exports, Mo = { exports: {} }, Do = { exports: {} };
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
})(Do, Do.exports);
var Qn = Do.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "notFound", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + Qn.HTTP_ERROR_FALLBACK_ERROR_CODE + ";404";
  function o() {
    const i = Object.defineProperty(new Error(r), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: !1,
      configurable: !0
    });
    throw i.digest = r, i;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Mo, Mo.exports);
var dg = Mo.exports, ko = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "forbidden", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + Qn.HTTP_ERROR_FALLBACK_ERROR_CODE + ";403";
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
})(ko, ko.exports);
var fg = ko.exports, Lo = { exports: {} };
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), Object.defineProperty(t, "unauthorized", {
    enumerable: !0,
    get: function() {
      return o;
    }
  });
  const r = "" + Qn.HTTP_ERROR_FALLBACK_ERROR_CODE + ";401";
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
})(Lo, Lo.exports);
var pg = Lo.exports, jo = { exports: {} }, dn = { exports: {} }, Yr = {}, os;
function Cu() {
  return os || (os = 1, function(e) {
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
        const l = new Promise((d, p) => {
          const h = p.bind(null, new o(u));
          let b = i.get(c);
          if (b)
            b.push(h);
          else {
            const f = [
              h
            ];
            i.set(c, f), c.addEventListener("abort", () => {
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
  }(Yr)), Yr;
}
var Qr = {}, is;
function mg() {
  return is || (is = 1, function(e) {
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
  }(Qr)), Qr;
}
var Zr = {}, as;
function hi() {
  return as || (as = 1, function(e) {
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
  }(Zr)), Zr;
}
var fn = { exports: {} }, ss;
function xu() {
  return ss || (ss = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "isNextRouterError", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = Qn, r = pi;
    function o(i) {
      return (0, r.isRedirectError)(i) || (0, n.isHTTPAccessFallbackError)(i);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(fn, fn.exports)), fn.exports;
}
var Jr = {}, pn = { exports: {} }, cs;
function Pu() {
  return cs || (cs = 1, function(e, t) {
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
  }(pn, pn.exports)), pn.exports;
}
var mn = { exports: {} }, us;
function hg() {
  return us || (us = 1, function(e, t) {
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
  }(mn, mn.exports)), mn.exports;
}
var eo = {}, to = {}, ls;
function gg() {
  return ls || (ls = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workUnitAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, mi().createAsyncLocalStorage)();
  }(to)), to;
}
var hn = { exports: {} }, ds;
function vg() {
  return ds || (ds = 1, function(e, t) {
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
        return C;
      },
      NEXT_REWRITTEN_PATH_HEADER: function() {
        return _;
      },
      NEXT_REWRITTEN_QUERY_HEADER: function() {
        return v;
      },
      NEXT_ROUTER_PREFETCH_HEADER: function() {
        return a;
      },
      NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
        return s;
      },
      NEXT_ROUTER_STALE_TIME_HEADER: function() {
        return b;
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
    const r = "RSC", o = "Next-Action", i = "Next-Router-State-Tree", a = "Next-Router-Prefetch", s = "Next-Router-Segment-Prefetch", c = "Next-HMR-Refresh", u = "__next_hmr_refresh_hash__", l = "Next-Url", d = "text/x-component", p = [
      r,
      i,
      a,
      c,
      s
    ], h = "_rsc", b = "x-nextjs-stale-time", f = "x-nextjs-postponed", _ = "x-nextjs-rewritten-path", v = "x-nextjs-rewritten-query", C = "x-nextjs-prerender";
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(hn, hn.exports)), hn.exports;
}
var fs;
function _g() {
  return fs || (fs = 1, function(e) {
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
    const n = gg(), r = vg();
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
  }(eo)), eo;
}
var no = {}, ro = {}, ps;
function bg() {
  return ps || (ps = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorageInstance", {
      enumerable: !0,
      get: function() {
        return n;
      }
    });
    const n = (0, mi().createAsyncLocalStorage)();
  }(ro)), ro;
}
var ms;
function Ou() {
  return ms || (ms = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "workAsyncStorage", {
      enumerable: !0,
      get: function() {
        return t.workAsyncStorageInstance;
      }
    });
    const t = bg();
  }(no)), no;
}
var oo = {}, hs;
function yg() {
  return hs || (hs = 1, function(e) {
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
  }(oo)), oo;
}
var io = {}, gs;
function Eg() {
  return gs || (gs = 1, function(e) {
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
  }(io)), io;
}
var vs;
function Au() {
  return vs || (vs = 1, function(e) {
    Object.defineProperty(e, "__esModule", {
      value: !0
    });
    function t(w, S) {
      for (var $ in S) Object.defineProperty(w, $, {
        enumerable: !0,
        get: S[$]
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
        return Q;
      },
      createDynamicTrackingState: function() {
        return p;
      },
      createDynamicValidationState: function() {
        return h;
      },
      createHangingInputAbortSignal: function() {
        return se;
      },
      createPostponedAbortSignal: function() {
        return W;
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
        return K;
      },
      throwToInterruptStaticGeneration: function() {
        return v;
      },
      trackAllowedDynamicAccess: function() {
        return te;
      },
      trackDynamicDataInDynamicRender: function() {
        return C;
      },
      trackFallbackParamAccessed: function() {
        return _;
      },
      trackSynchronousPlatformIOAccessInDev: function() {
        return E;
      },
      trackSynchronousRequestDataAccessInDev: function() {
        return x;
      },
      useDynamicRouteParams: function() {
        return ne;
      }
    });
    const n = /* @__PURE__ */ l(ue), r = Pu(), o = hg(), i = _g(), a = Ou(), s = Cu(), c = yg(), u = Eg();
    function l(w) {
      return w && w.__esModule ? w : {
        default: w
      };
    }
    const d = typeof n.default.unstable_postpone == "function";
    function p(w) {
      return {
        isDebugDynamicAccesses: w,
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
    function b(w) {
      var S;
      return (S = w.dynamicAccesses[0]) == null ? void 0 : S.expression;
    }
    function f(w, S, $) {
      if (!(S && (S.type === "cache" || S.type === "unstable-cache")) && !(w.forceDynamic || w.forceStatic)) {
        if (w.dynamicShouldError)
          throw Object.defineProperty(new o.StaticGenBailoutError(`Route ${w.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${$}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: !1,
            configurable: !0
          });
        if (S)
          if (S.type === "prerender-ppr")
            N(w.route, $, S.dynamicTracking);
          else if (S.type === "prerender-legacy") {
            S.revalidate = 0;
            const H = Object.defineProperty(new r.DynamicServerError(`Route ${w.route} couldn't be rendered statically because it used ${$}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
              value: "E550",
              enumerable: !1,
              configurable: !0
            });
            throw w.dynamicUsageDescription = $, w.dynamicUsageStack = H.stack, H;
          } else process.env.NODE_ENV === "development" && S && S.type === "request" && (S.usedDynamic = !0);
      }
    }
    function _(w, S) {
      const $ = i.workUnitAsyncStorage.getStore();
      !$ || $.type !== "prerender-ppr" || N(w.route, S, $.dynamicTracking);
    }
    function v(w, S, $) {
      const H = Object.defineProperty(new r.DynamicServerError(`Route ${S.route} couldn't be rendered statically because it used \`${w}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
        value: "E558",
        enumerable: !1,
        configurable: !0
      });
      throw $.revalidate = 0, S.dynamicUsageDescription = w, S.dynamicUsageStack = H.stack, H;
    }
    function C(w, S) {
      if (S) {
        if (S.type === "cache" || S.type === "unstable-cache")
          return;
        (S.type === "prerender" || S.type === "prerender-legacy") && (S.revalidate = 0), process.env.NODE_ENV === "development" && S.type === "request" && (S.usedDynamic = !0);
      }
    }
    function m(w, S, $) {
      const H = `Route ${w} needs to bail out of prerendering at this point because it used ${S}.`, U = j(H);
      $.controller.abort(U);
      const X = $.dynamicTracking;
      X && X.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: X.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: S
      });
    }
    function y(w, S, $, H) {
      const U = H.dynamicTracking;
      U && U.syncDynamicErrorWithStack === null && (U.syncDynamicExpression = S, U.syncDynamicErrorWithStack = $), m(w, S, H);
    }
    function E(w) {
      w.prerenderPhase = !1;
    }
    function A(w, S, $, H) {
      if (H.controller.signal.aborted === !1) {
        const X = H.dynamicTracking;
        X && X.syncDynamicErrorWithStack === null && (X.syncDynamicExpression = S, X.syncDynamicErrorWithStack = $, H.validating === !0 && (X.syncDynamicLogged = !0)), m(w, S, H);
      }
      throw j(`Route ${w} needs to bail out of prerendering at this point because it used ${S}.`);
    }
    const x = E;
    function O({ reason: w, route: S }) {
      const $ = i.workUnitAsyncStorage.getStore(), H = $ && $.type === "prerender-ppr" ? $.dynamicTracking : null;
      N(S, w, H);
    }
    function N(w, S, $) {
      D(), $ && $.dynamicAccesses.push({
        // When we aren't debugging, we don't need to create another error for the
        // stack trace.
        stack: $.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: S
      }), n.default.unstable_postpone(T(w, S));
    }
    function T(w, S) {
      return `Route ${w} needs to bail out of prerendering at this point because it used ${S}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
    }
    function M(w) {
      return typeof w == "object" && w !== null && typeof w.message == "string" ? k(w.message) : !1;
    }
    function k(w) {
      return w.includes("needs to bail out of prerendering at this point because it used") && w.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
    }
    if (k(T("%%%", "^^^")) === !1)
      throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
        value: "E296",
        enumerable: !1,
        configurable: !0
      });
    const B = "NEXT_PRERENDER_INTERRUPTED";
    function j(w) {
      const S = Object.defineProperty(new Error(w), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return S.digest = B, S;
    }
    function G(w) {
      return typeof w == "object" && w !== null && w.digest === B && "name" in w && "message" in w && w instanceof Error;
    }
    function F(w) {
      return w.length > 0;
    }
    function Q(w, S) {
      return w.dynamicAccesses.push(...S.dynamicAccesses), w.dynamicAccesses;
    }
    function I(w) {
      return w.filter((S) => typeof S.stack == "string" && S.stack.length > 0).map(({ expression: S, stack: $ }) => ($ = $.split(`
`).slice(4).filter((H) => !(H.includes("node_modules/next/") || H.includes(" (<anonymous>)") || H.includes(" (node:"))).join(`
`), `Dynamic API Usage Debug - ${S}:
${$}`));
    }
    function D() {
      if (!d)
        throw Object.defineProperty(new Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E224",
          enumerable: !1,
          configurable: !0
        });
    }
    function W(w) {
      D();
      const S = new AbortController();
      try {
        n.default.unstable_postpone(w);
      } catch ($) {
        S.abort($);
      }
      return S.signal;
    }
    function se(w) {
      const S = new AbortController();
      return w.cacheSignal ? w.cacheSignal.inputReady().then(() => {
        S.abort();
      }) : (0, u.scheduleOnNextTick)(() => S.abort()), S.signal;
    }
    function re(w, S) {
      const $ = S.dynamicTracking;
      $ && $.dynamicAccesses.push({
        stack: $.isDebugDynamicAccesses ? new Error().stack : void 0,
        expression: w
      });
    }
    function ne(w) {
      const S = a.workAsyncStorage.getStore();
      if (S && S.isStaticGeneration && S.fallbackRouteParams && S.fallbackRouteParams.size > 0) {
        const $ = i.workUnitAsyncStorage.getStore();
        $ && ($.type === "prerender" ? n.default.use((0, s.makeHangingPromise)($.renderSignal, w)) : $.type === "prerender-ppr" ? N(S.route, w, $.dynamicTracking) : $.type === "prerender-legacy" && v(w, S, $));
      }
    }
    const Y = /\n\s+at Suspense \(<anonymous>\)/, pe = new RegExp(`\\n\\s+at ${c.METADATA_BOUNDARY_NAME}[\\n\\s]`), ie = new RegExp(`\\n\\s+at ${c.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`), P = new RegExp(`\\n\\s+at ${c.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
    function te(w, S, $, H, U) {
      if (!P.test(S))
        if (pe.test(S)) {
          $.hasDynamicMetadata = !0;
          return;
        } else if (ie.test(S)) {
          $.hasDynamicViewport = !0;
          return;
        } else if (Y.test(S)) {
          $.hasSuspendedDynamic = !0;
          return;
        } else if (H.syncDynamicErrorWithStack || U.syncDynamicErrorWithStack) {
          $.hasSyncDynamicErrors = !0;
          return;
        } else {
          const X = `Route "${w}": A component accessed data, headers, params, searchParams, or a short-lived cache without a Suspense boundary nor a "use cache" above it. We don't have the exact line number added to error messages yet but you can see which component in the stack below. See more info: https://nextjs.org/docs/messages/next-prerender-missing-suspense`, he = z(X, S);
          $.dynamicErrors.push(he);
          return;
        }
    }
    function z(w, S) {
      const $ = Object.defineProperty(new Error(w), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: !1,
        configurable: !0
      });
      return $.stack = "Error: " + w + S, $;
    }
    function K(w, S, $, H) {
      let U, X, he;
      if ($.syncDynamicErrorWithStack ? (U = $.syncDynamicErrorWithStack, X = $.syncDynamicExpression, he = $.syncDynamicLogged === !0) : H.syncDynamicErrorWithStack ? (U = H.syncDynamicErrorWithStack, X = H.syncDynamicExpression, he = H.syncDynamicLogged === !0) : (U = null, X = void 0, he = !1), S.hasSyncDynamicErrors && U)
        throw he || console.error(U), new o.StaticGenBailoutError();
      const _e = S.dynamicErrors;
      if (_e.length) {
        for (let me = 0; me < _e.length; me++)
          console.error(_e[me]);
        throw new o.StaticGenBailoutError();
      }
      if (!S.hasSuspendedDynamic) {
        if (S.hasDynamicMetadata)
          throw U ? (console.error(U), Object.defineProperty(new o.StaticGenBailoutError(`Route "${w}" has a \`generateMetadata\` that could not finish rendering before ${X} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E608",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new o.StaticGenBailoutError(`Route "${w}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateMetadata\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E534",
            enumerable: !1,
            configurable: !0
          });
        if (S.hasDynamicViewport)
          throw U ? (console.error(U), Object.defineProperty(new o.StaticGenBailoutError(`Route "${w}" has a \`generateViewport\` that could not finish rendering before ${X} was used. Follow the instructions in the error for this expression to resolve.`), "__NEXT_ERROR_CODE", {
            value: "E573",
            enumerable: !1,
            configurable: !0
          })) : Object.defineProperty(new o.StaticGenBailoutError(`Route "${w}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or external data (\`fetch(...)\`, etc...) but the rest of the route was static or only used cached data (\`"use cache"\`). If you expected this route to be prerenderable update your \`generateViewport\` to not use Request data and only use cached external data. Otherwise, add \`await connection()\` somewhere within this route to indicate explicitly it should not be prerendered.`), "__NEXT_ERROR_CODE", {
            value: "E590",
            enumerable: !1,
            configurable: !0
          });
      }
    }
  }(Jr)), Jr;
}
var _s;
function Rg() {
  return _s || (_s = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return c;
      }
    });
    const n = Cu(), r = mg(), o = hi(), i = xu(), a = Au(), s = Pu();
    function c(u) {
      if ((0, i.isNextRouterError)(u) || (0, o.isBailoutToCSRError)(u) || (0, s.isDynamicServerError)(u) || (0, a.isDynamicPostpone)(u) || (0, r.isPostpone)(u) || (0, n.isHangingPromiseRejectionError)(u))
        throw u;
      u instanceof Error && "cause" in u && c(u.cause);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(dn, dn.exports)), dn.exports;
}
var gn = { exports: {} }, bs;
function wg() {
  return bs || (bs = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "unstable_rethrow", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = hi(), r = xu();
    function o(i) {
      if ((0, r.isNextRouterError)(i) || (0, n.isBailoutToCSRError)(i))
        throw i;
      i instanceof Error && "cause" in i && o(i.cause);
    }
    (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
  }(gn, gn.exports)), gn.exports;
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
  const n = typeof window > "u" ? Rg().unstable_rethrow : wg().unstable_rethrow;
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(jo, jo.exports);
var Sg = jo.exports;
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(d, p) {
    for (var h in p) Object.defineProperty(d, h, {
      enumerable: !0,
      get: p[h]
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
  const r = lg, o = pi, i = dg, a = fg, s = pg, c = Sg;
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
})(Ao, Ao.exports);
var Cg = Ao.exports, Tu = {};
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
  const r = /* @__PURE__ */ Ct._(ue), o = /* @__PURE__ */ r.default.createContext(null);
  function i(a) {
    const s = (0, r.useContext)(o);
    s && s(a);
  }
})(Tu);
var vn = { exports: {} }, ys;
function xg() {
  return ys || (ys = 1, function(e, t) {
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "bailoutToClientRendering", {
      enumerable: !0,
      get: function() {
        return o;
      }
    });
    const n = hi(), r = Ou();
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
  }(vn, vn.exports)), vn.exports;
}
(function(e, t) {
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  function n(C, m) {
    for (var y in m) Object.defineProperty(C, y, {
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
      return h;
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
  const r = ue, o = Ru, i = wu, a = sg, s = Qo, c = Cg, u = Tu, l = typeof window > "u" ? Au().useDynamicRouteParams : void 0;
  function d() {
    const C = (0, r.useContext)(i.SearchParamsContext), m = (0, r.useMemo)(() => C ? new c.ReadonlyURLSearchParams(C) : null, [
      C
    ]);
    if (typeof window > "u") {
      const { bailoutToClientRendering: y } = xg();
      y("useSearchParams()");
    }
    return m;
  }
  function p() {
    return l == null || l("usePathname()"), (0, r.useContext)(i.PathnameContext);
  }
  function h() {
    const C = (0, r.useContext)(o.AppRouterContext);
    if (C === null)
      throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
        value: "E238",
        enumerable: !1,
        configurable: !0
      });
    return C;
  }
  function b() {
    return l == null || l("useParams()"), (0, r.useContext)(i.PathParamsContext);
  }
  function f(C, m, y, E) {
    y === void 0 && (y = !0), E === void 0 && (E = []);
    let A;
    if (y)
      A = C[1][m];
    else {
      const T = C[1];
      var x;
      A = (x = T.children) != null ? x : Object.values(T)[0];
    }
    if (!A) return E;
    const O = A[0];
    let N = (0, a.getSegmentValue)(O);
    return !N || N.startsWith(s.PAGE_SEGMENT_KEY) ? E : (E.push(N), f(A, m, !1, E));
  }
  function _(C) {
    C === void 0 && (C = "children"), l == null || l("useSelectedLayoutSegments()");
    const m = (0, r.useContext)(o.LayoutRouterContext);
    return m ? f(m.parentTree, C) : null;
  }
  function v(C) {
    C === void 0 && (C = "children"), l == null || l("useSelectedLayoutSegment()");
    const m = _(C);
    if (!m || m.length === 0)
      return null;
    const y = C === "children" ? m[0] : m[m.length - 1];
    return y === s.DEFAULT_SEGMENT_KEY ? null : y;
  }
  (typeof t.default == "function" || typeof t.default == "object" && t.default !== null) && typeof t.default.__esModule > "u" && (Object.defineProperty(t.default, "__esModule", { value: !0 }), Object.assign(t.default, t), e.exports = t.default);
})(Po, Po.exports);
var Pg = Po.exports, Og = Pg;
const Ag = ({
  width: e = "max-w-[1240px]",
  height: t = "h-full",
  children: n,
  className: r,
  ...o
}) => /* @__PURE__ */ R("section", { ...o, className: fe(`mx-auto ${e} ${t} px-[1rem] xl:px-0`, r), children: n });
function Tg(e, t) {
  return g.useReducer((n, r) => t[n][r] ?? n, e);
}
var Xe = (e) => {
  const { present: t, children: n } = e, r = Ng(t), o = typeof n == "function" ? n({ present: r.isPresent }) : g.Children.only(n), i = ye(r.ref, Ig(o));
  return typeof n == "function" || r.isPresent ? g.cloneElement(o, { ref: i }) : null;
};
Xe.displayName = "Presence";
function Ng(e) {
  const [t, n] = g.useState(), r = g.useRef(null), o = g.useRef(e), i = g.useRef("none"), a = e ? "mounted" : "unmounted", [s, c] = Tg(a, {
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
  return g.useEffect(() => {
    const u = _n(r.current);
    i.current = s === "mounted" ? u : "none";
  }, [s]), Ce(() => {
    const u = r.current, l = o.current;
    if (l !== e) {
      const p = i.current, h = _n(u);
      e ? c("MOUNT") : h === "none" || (u == null ? void 0 : u.display) === "none" ? c("UNMOUNT") : c(l && p !== h ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, c]), Ce(() => {
    if (t) {
      let u;
      const l = t.ownerDocument.defaultView ?? window, d = (h) => {
        const f = _n(r.current).includes(h.animationName);
        if (h.target === t && f && (c("ANIMATION_END"), !o.current)) {
          const _ = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", u = l.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = _);
          });
        }
      }, p = (h) => {
        h.target === t && (i.current = _n(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", d), t.addEventListener("animationend", d), () => {
        l.clearTimeout(u), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", d), t.removeEventListener("animationend", d);
      };
    } else
      c("ANIMATION_END");
  }, [t, c]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: g.useCallback((u) => {
      r.current = u ? getComputedStyle(u) : null, n(u);
    }, [])
  };
}
function _n(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Ig(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var ut = "NavigationMenu", [gi, Nu, Mg] = Ht(ut), [Fo, Dg, kg] = Ht(ut), [vi, Y_] = ct(
  ut,
  [Mg, kg]
), [Lg, De] = vi(ut), [jg, Fg] = vi(ut), Iu = g.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: n,
      value: r,
      onValueChange: o,
      defaultValue: i,
      delayDuration: a = 200,
      skipDelayDuration: s = 300,
      orientation: c = "horizontal",
      dir: u,
      ...l
    } = e, [d, p] = g.useState(null), h = ye(t, (N) => p(N)), b = Fn(u), f = g.useRef(0), _ = g.useRef(0), v = g.useRef(0), [C, m] = g.useState(!0), [y, E] = Et({
      prop: r,
      onChange: (N) => {
        const T = N !== "", M = s > 0;
        T ? (window.clearTimeout(v.current), M && m(!1)) : (window.clearTimeout(v.current), v.current = window.setTimeout(
          () => m(!0),
          s
        )), o == null || o(N);
      },
      defaultProp: i ?? "",
      caller: ut
    }), A = g.useCallback(() => {
      window.clearTimeout(_.current), _.current = window.setTimeout(() => E(""), 150);
    }, [E]), x = g.useCallback(
      (N) => {
        window.clearTimeout(_.current), E(N);
      },
      [E]
    ), O = g.useCallback(
      (N) => {
        y === N ? window.clearTimeout(_.current) : f.current = window.setTimeout(() => {
          window.clearTimeout(_.current), E(N);
        }, a);
      },
      [y, E, a]
    );
    return g.useEffect(() => () => {
      window.clearTimeout(f.current), window.clearTimeout(_.current), window.clearTimeout(v.current);
    }, []), /* @__PURE__ */ R(
      Mu,
      {
        scope: n,
        isRootMenu: !0,
        value: y,
        dir: b,
        orientation: c,
        rootNavigationMenu: d,
        onTriggerEnter: (N) => {
          window.clearTimeout(f.current), C ? O(N) : x(N);
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
          le.nav,
          {
            "aria-label": "Main",
            "data-orientation": c,
            dir: b,
            ...l,
            ref: h
          }
        )
      }
    );
  }
);
Iu.displayName = ut;
var Ho = "NavigationMenuSub", Hg = g.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: n,
      value: r,
      onValueChange: o,
      defaultValue: i,
      orientation: a = "horizontal",
      ...s
    } = e, c = De(Ho, n), [u, l] = Et({
      prop: r,
      onChange: o,
      defaultProp: i ?? "",
      caller: Ho
    });
    return /* @__PURE__ */ R(
      Mu,
      {
        scope: n,
        isRootMenu: !1,
        value: u,
        dir: c.dir,
        orientation: a,
        rootNavigationMenu: c.rootNavigationMenu,
        onTriggerEnter: (d) => l(d),
        onItemSelect: (d) => l(d),
        onItemDismiss: () => l(""),
        children: /* @__PURE__ */ R(le.div, { "data-orientation": a, ...s, ref: t })
      }
    );
  }
);
Hg.displayName = Ho;
var Mu = (e) => {
  const {
    scope: t,
    isRootMenu: n,
    rootNavigationMenu: r,
    dir: o,
    orientation: i,
    children: a,
    value: s,
    onItemSelect: c,
    onItemDismiss: u,
    onTriggerEnter: l,
    onTriggerLeave: d,
    onContentEnter: p,
    onContentLeave: h
  } = e, [b, f] = g.useState(null), [_, v] = g.useState(/* @__PURE__ */ new Map()), [C, m] = g.useState(null);
  return /* @__PURE__ */ R(
    Lg,
    {
      scope: t,
      isRootMenu: n,
      rootNavigationMenu: r,
      value: s,
      previousValue: Ac(s),
      baseId: Qe(),
      dir: o,
      orientation: i,
      viewport: b,
      onViewportChange: f,
      indicatorTrack: C,
      onIndicatorTrackChange: m,
      onTriggerEnter: xe(l),
      onTriggerLeave: xe(d),
      onContentEnter: xe(p),
      onContentLeave: xe(h),
      onItemSelect: xe(c),
      onItemDismiss: xe(u),
      onViewportContentChange: g.useCallback((y, E) => {
        v((A) => (A.set(y, E), new Map(A)));
      }, []),
      onViewportContentRemove: g.useCallback((y) => {
        v((E) => E.has(y) ? (E.delete(y), new Map(E)) : E);
      }, []),
      children: /* @__PURE__ */ R(gi.Provider, { scope: t, children: /* @__PURE__ */ R(jg, { scope: t, items: _, children: a }) })
    }
  );
}, Du = "NavigationMenuList", ku = g.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = De(Du, n), i = /* @__PURE__ */ R(le.ul, { "data-orientation": o.orientation, ...r, ref: t });
    return /* @__PURE__ */ R(le.div, { style: { position: "relative" }, ref: o.onIndicatorTrackChange, children: /* @__PURE__ */ R(gi.Slot, { scope: n, children: o.isRootMenu ? /* @__PURE__ */ R(zu, { asChild: !0, children: i }) : i }) });
  }
);
ku.displayName = Du;
var Lu = "NavigationMenuItem", [$g, ju] = vi(Lu), Fu = g.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, value: r, ...o } = e, i = Qe(), a = r || i || "LEGACY_REACT_AUTO_VALUE", s = g.useRef(null), c = g.useRef(null), u = g.useRef(null), l = g.useRef(() => {
    }), d = g.useRef(!1), p = g.useCallback((b = "start") => {
      if (s.current) {
        l.current();
        const f = Uo(s.current);
        f.length && yi(b === "start" ? f : f.reverse());
      }
    }, []), h = g.useCallback(() => {
      if (s.current) {
        const b = Uo(s.current);
        b.length && (l.current = Wg(b));
      }
    }, []);
    return /* @__PURE__ */ R(
      $g,
      {
        scope: n,
        value: a,
        triggerRef: c,
        contentRef: s,
        focusProxyRef: u,
        wasEscapeCloseRef: d,
        onEntryKeyDown: p,
        onFocusProxyEnter: p,
        onRootContentClose: h,
        onContentFocusOutside: h,
        children: /* @__PURE__ */ R(le.li, { ...o, ref: t })
      }
    );
  }
);
Fu.displayName = Lu;
var $o = "NavigationMenuTrigger", Hu = g.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, disabled: r, ...o } = e, i = De($o, e.__scopeNavigationMenu), a = ju($o, e.__scopeNavigationMenu), s = g.useRef(null), c = ye(s, a.triggerRef, t), u = qu(i.baseId, a.value), l = Xu(i.baseId, a.value), d = g.useRef(!1), p = g.useRef(!1), h = a.value === i.value;
  return /* @__PURE__ */ ve(Ye, { children: [
    /* @__PURE__ */ R(gi.ItemSlot, { scope: n, value: a.value, children: /* @__PURE__ */ R(Vu, { asChild: !0, children: /* @__PURE__ */ R(
      le.button,
      {
        id: u,
        disabled: r,
        "data-disabled": r ? "" : void 0,
        "data-state": Ei(h),
        "aria-expanded": h,
        "aria-controls": l,
        ...o,
        ref: c,
        onPointerEnter: Z(e.onPointerEnter, () => {
          p.current = !1, a.wasEscapeCloseRef.current = !1;
        }),
        onPointerMove: Z(
          e.onPointerMove,
          Nn(() => {
            r || p.current || a.wasEscapeCloseRef.current || d.current || (i.onTriggerEnter(a.value), d.current = !0);
          })
        ),
        onPointerLeave: Z(
          e.onPointerLeave,
          Nn(() => {
            r || (i.onTriggerLeave(), d.current = !1);
          })
        ),
        onClick: Z(e.onClick, () => {
          i.onItemSelect(a.value), p.current = h;
        }),
        onKeyDown: Z(e.onKeyDown, (b) => {
          const _ = { horizontal: "ArrowDown", vertical: i.dir === "rtl" ? "ArrowLeft" : "ArrowRight" }[i.orientation];
          h && b.key === _ && (a.onEntryKeyDown(), b.preventDefault());
        })
      }
    ) }) }),
    h && /* @__PURE__ */ ve(Ye, { children: [
      /* @__PURE__ */ R(
        rm,
        {
          "aria-hidden": !0,
          tabIndex: 0,
          ref: a.focusProxyRef,
          onFocus: (b) => {
            const f = a.contentRef.current, _ = b.relatedTarget, v = _ === s.current, C = f == null ? void 0 : f.contains(_);
            (v || !C) && a.onFocusProxyEnter(v ? "start" : "end");
          }
        }
      ),
      i.viewport && /* @__PURE__ */ R("span", { "aria-owns": l })
    ] })
  ] });
});
Hu.displayName = $o;
var Ug = "NavigationMenuLink", Es = "navigationMenu.linkSelect", $u = g.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, active: r, onSelect: o, ...i } = e;
    return /* @__PURE__ */ R(Vu, { asChild: !0, children: /* @__PURE__ */ R(
      le.a,
      {
        "data-active": r ? "" : void 0,
        "aria-current": r ? "page" : void 0,
        ...i,
        ref: t,
        onClick: Z(
          e.onClick,
          (a) => {
            const s = a.target, c = new CustomEvent(Es, {
              bubbles: !0,
              cancelable: !0
            });
            if (s.addEventListener(Es, (u) => o == null ? void 0 : o(u), { once: !0 }), Cn(s, c), !c.defaultPrevented && !a.metaKey) {
              const u = new CustomEvent(Sn, {
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
$u.displayName = Ug;
var _i = "NavigationMenuIndicator", Bg = g.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = De(_i, e.__scopeNavigationMenu), i = !!o.value;
  return o.indicatorTrack ? Xo.createPortal(
    /* @__PURE__ */ R(Xe, { present: n || i, children: /* @__PURE__ */ R(Gg, { ...r, ref: t }) }),
    o.indicatorTrack
  ) : null;
});
Bg.displayName = _i;
var Gg = g.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, ...r } = e, o = De(_i, n), i = Nu(n), [a, s] = g.useState(
    null
  ), [c, u] = g.useState(null), l = o.orientation === "horizontal", d = !!o.value;
  g.useEffect(() => {
    var f;
    const b = (f = i().find((_) => _.value === o.value)) == null ? void 0 : f.ref.current;
    b && s(b);
  }, [i, o.value]);
  const p = () => {
    a && u({
      size: l ? a.offsetWidth : a.offsetHeight,
      offset: l ? a.offsetLeft : a.offsetTop
    });
  };
  return Bo(a, p), Bo(o.indicatorTrack, p), c ? /* @__PURE__ */ R(
    le.div,
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
}), Rt = "NavigationMenuContent", Uu = g.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = De(Rt, e.__scopeNavigationMenu), i = ju(Rt, e.__scopeNavigationMenu), a = ye(i.contentRef, t), s = i.value === o.value, c = {
    value: i.value,
    triggerRef: i.triggerRef,
    focusProxyRef: i.focusProxyRef,
    wasEscapeCloseRef: i.wasEscapeCloseRef,
    onContentFocusOutside: i.onContentFocusOutside,
    onRootContentClose: i.onRootContentClose,
    ...r
  };
  return o.viewport ? /* @__PURE__ */ R(zg, { forceMount: n, ...c, ref: a }) : /* @__PURE__ */ R(Xe, { present: n || s, children: /* @__PURE__ */ R(
    Bu,
    {
      "data-state": Ei(s),
      ...c,
      ref: a,
      onPointerEnter: Z(e.onPointerEnter, o.onContentEnter),
      onPointerLeave: Z(
        e.onPointerLeave,
        Nn(o.onContentLeave)
      ),
      style: {
        // Prevent interaction when animating out
        pointerEvents: !s && o.isRootMenu ? "none" : void 0,
        ...c.style
      }
    }
  ) });
});
Uu.displayName = Rt;
var zg = g.forwardRef((e, t) => {
  const n = De(Rt, e.__scopeNavigationMenu), { onViewportContentChange: r, onViewportContentRemove: o } = n;
  return Ce(() => {
    r(e.value, {
      ref: t,
      ...e
    });
  }, [e, t, r]), Ce(() => () => o(e.value), [e.value, o]), null;
}), Sn = "navigationMenu.rootContentDismiss", Bu = g.forwardRef((e, t) => {
  const {
    __scopeNavigationMenu: n,
    value: r,
    triggerRef: o,
    focusProxyRef: i,
    wasEscapeCloseRef: a,
    onRootContentClose: s,
    onContentFocusOutside: c,
    ...u
  } = e, l = De(Rt, n), d = g.useRef(null), p = ye(d, t), h = qu(l.baseId, r), b = Xu(l.baseId, r), f = Nu(n), _ = g.useRef(null), { onItemDismiss: v } = l;
  g.useEffect(() => {
    const m = d.current;
    if (l.isRootMenu && m) {
      const y = () => {
        var E;
        v(), s(), m.contains(document.activeElement) && ((E = o.current) == null || E.focus());
      };
      return m.addEventListener(Sn, y), () => m.removeEventListener(Sn, y);
    }
  }, [l.isRootMenu, e.value, o, v, s]);
  const C = g.useMemo(() => {
    const y = f().map((T) => T.value);
    l.dir === "rtl" && y.reverse();
    const E = y.indexOf(l.value), A = y.indexOf(l.previousValue), x = r === l.value, O = A === y.indexOf(r);
    if (!x && !O) return _.current;
    const N = (() => {
      if (E !== A) {
        if (x && A !== -1) return E > A ? "from-end" : "from-start";
        if (O && E !== -1) return E > A ? "to-start" : "to-end";
      }
      return null;
    })();
    return _.current = N, N;
  }, [l.previousValue, l.value, l.dir, f, r]);
  return /* @__PURE__ */ R(zu, { asChild: !0, children: /* @__PURE__ */ R(
    Hn,
    {
      id: b,
      "aria-labelledby": h,
      "data-motion": C,
      "data-orientation": l.orientation,
      ...u,
      ref: p,
      disableOutsidePointerEvents: !1,
      onDismiss: () => {
        var y;
        const m = new Event(Sn, {
          bubbles: !0,
          cancelable: !0
        });
        (y = d.current) == null || y.dispatchEvent(m);
      },
      onFocusOutside: Z(e.onFocusOutside, (m) => {
        var E;
        c();
        const y = m.target;
        (E = l.rootNavigationMenu) != null && E.contains(y) && m.preventDefault();
      }),
      onPointerDownOutside: Z(e.onPointerDownOutside, (m) => {
        var x;
        const y = m.target, E = f().some((O) => {
          var N;
          return (N = O.ref.current) == null ? void 0 : N.contains(y);
        }), A = l.isRootMenu && ((x = l.viewport) == null ? void 0 : x.contains(y));
        (E || A || !l.isRootMenu) && m.preventDefault();
      }),
      onKeyDown: Z(e.onKeyDown, (m) => {
        var A;
        const y = m.altKey || m.ctrlKey || m.metaKey;
        if (m.key === "Tab" && !y) {
          const x = Uo(m.currentTarget), O = document.activeElement, N = x.findIndex((k) => k === O), M = m.shiftKey ? x.slice(0, N).reverse() : x.slice(N + 1, x.length);
          yi(M) ? m.preventDefault() : (A = i.current) == null || A.focus();
        }
      }),
      onEscapeKeyDown: Z(e.onEscapeKeyDown, (m) => {
        a.current = !0;
      })
    }
  ) });
}), bi = "NavigationMenuViewport", Gu = g.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, i = !!De(bi, e.__scopeNavigationMenu).value;
  return /* @__PURE__ */ R(Xe, { present: n || i, children: /* @__PURE__ */ R(Vg, { ...r, ref: t }) });
});
Gu.displayName = bi;
var Vg = g.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, children: r, ...o } = e, i = De(bi, n), a = ye(t, i.onViewportChange), s = Fg(
    Rt,
    e.__scopeNavigationMenu
  ), [c, u] = g.useState(null), [l, d] = g.useState(null), p = c ? (c == null ? void 0 : c.width) + "px" : void 0, h = c ? (c == null ? void 0 : c.height) + "px" : void 0, b = !!i.value, f = b ? i.value : i.previousValue;
  return Bo(l, () => {
    l && u({ width: l.offsetWidth, height: l.offsetHeight });
  }), /* @__PURE__ */ R(
    le.div,
    {
      "data-state": Ei(b),
      "data-orientation": i.orientation,
      ...o,
      ref: a,
      style: {
        // Prevent interaction when animating out
        pointerEvents: !b && i.isRootMenu ? "none" : void 0,
        "--radix-navigation-menu-viewport-width": p,
        "--radix-navigation-menu-viewport-height": h,
        ...o.style
      },
      onPointerEnter: Z(e.onPointerEnter, i.onContentEnter),
      onPointerLeave: Z(e.onPointerLeave, Nn(i.onContentLeave)),
      children: Array.from(s.items).map(([v, { ref: C, forceMount: m, ...y }]) => {
        const E = f === v;
        return /* @__PURE__ */ R(Xe, { present: m || E, children: /* @__PURE__ */ R(
          Bu,
          {
            ...y,
            ref: Ft(C, (A) => {
              E && A && d(A);
            })
          }
        ) }, v);
      })
    }
  );
}), qg = "FocusGroup", zu = g.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = De(qg, n);
    return /* @__PURE__ */ R(Fo.Provider, { scope: n, children: /* @__PURE__ */ R(Fo.Slot, { scope: n, children: /* @__PURE__ */ R(le.div, { dir: o.dir, ...r, ref: t }) }) });
  }
), Rs = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"], Xg = "FocusGroupItem", Vu = g.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = Dg(n), i = De(Xg, n);
    return /* @__PURE__ */ R(Fo.ItemSlot, { scope: n, children: /* @__PURE__ */ R(
      le.button,
      {
        ...r,
        ref: t,
        onKeyDown: Z(e.onKeyDown, (a) => {
          if (["Home", "End", ...Rs].includes(a.key)) {
            let c = o().map((d) => d.ref.current);
            if ([i.dir === "rtl" ? "ArrowRight" : "ArrowLeft", "ArrowUp", "End"].includes(a.key) && c.reverse(), Rs.includes(a.key)) {
              const d = c.indexOf(a.currentTarget);
              c = c.slice(d + 1);
            }
            setTimeout(() => yi(c)), a.preventDefault();
          }
        })
      }
    ) });
  }
);
function Uo(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function yi(e) {
  const t = document.activeElement;
  return e.some((n) => n === t ? !0 : (n.focus(), document.activeElement !== t));
}
function Wg(e) {
  return e.forEach((t) => {
    t.dataset.tabindex = t.getAttribute("tabindex") || "", t.setAttribute("tabindex", "-1");
  }), () => {
    e.forEach((t) => {
      const n = t.dataset.tabindex;
      t.setAttribute("tabindex", n);
    });
  };
}
function Bo(e, t) {
  const n = xe(t);
  Ce(() => {
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
function Ei(e) {
  return e ? "open" : "closed";
}
function qu(e, t) {
  return `${e}-trigger-${t}`;
}
function Xu(e, t) {
  return `${e}-content-${t}`;
}
function Nn(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Kg = Iu, Yg = ku, Qg = Fu, Zg = Hu, Jg = $u, ev = Uu, tv = Gu;
function nv({
  className: e,
  children: t,
  viewport: n = !0,
  ...r
}) {
  return /* @__PURE__ */ ve(
    Kg,
    {
      "data-slot": "navigation-menu",
      "data-viewport": n,
      className: fe("group/navigation-menu relative flex max-w-max flex-1 items-center justify-center", e),
      ...r,
      children: [
        t,
        n && /* @__PURE__ */ R(av, {})
      ]
    }
  );
}
function rv({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    Yg,
    {
      "data-slot": "navigation-menu-list",
      className: fe("group flex list-none items-center justify-center gap-1", e),
      ...t
    }
  );
}
function ws({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    Qg,
    {
      "data-slot": "navigation-menu-item",
      className: fe("relative", e),
      ...t
    }
  );
}
const Wu = Us(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
);
function ov({
  className: e,
  children: t,
  ...n
}) {
  return /* @__PURE__ */ ve(
    Zg,
    {
      "data-slot": "navigation-menu-trigger",
      className: fe(Wu(), "group", e),
      ...n,
      children: [
        t,
        " ",
        /* @__PURE__ */ R(
          Ko,
          {
            className: "relative top-[1px] ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function iv({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R(
    ev,
    {
      "data-slot": "navigation-menu-content",
      className: fe(
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full p-2 pr-2.5 md:absolute md:w-auto",
        "group-data-[viewport=false]/navigation-menu:bg-popover group-data-[viewport=false]/navigation-menu:text-popover-foreground group-data-[viewport=false]/navigation-menu:data-[state=open]:animate-in group-data-[viewport=false]/navigation-menu:data-[state=closed]:animate-out group-data-[viewport=false]/navigation-menu:data-[state=closed]:zoom-out-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:zoom-in-95 group-data-[viewport=false]/navigation-menu:data-[state=open]:fade-in-0 group-data-[viewport=false]/navigation-menu:data-[state=closed]:fade-out-0 group-data-[viewport=false]/navigation-menu:top-full group-data-[viewport=false]/navigation-menu:mt-1.5 group-data-[viewport=false]/navigation-menu:overflow-hidden group-data-[viewport=false]/navigation-menu:rounded-md group-data-[viewport=false]/navigation-menu:border group-data-[viewport=false]/navigation-menu:shadow group-data-[viewport=false]/navigation-menu:duration-200 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none",
        e
      ),
      ...t
    }
  );
}
function av({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ R("div", { className: fe("absolute top-full left-0 isolate z-50 flex justify-center"), children: /* @__PURE__ */ R(
    tv,
    {
      "data-slot": "navigation-menu-viewport",
      className: fe(
        "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border shadow md:w-[var(--radix-navigation-menu-viewport-width)]",
        e
      ),
      ...t
    }
  ) });
}
function Ku({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    Jg,
    {
      "data-slot": "navigation-menu-link",
      className: fe(
        "data-[active=true]:focus:bg-accent data-[active=true]:hover:bg-accent data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-ring/50 [&_svg:not([class*='text-'])]:text-muted-foreground flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...t
    }
  );
}
const Ss = ({ links: e, isMobile: t, className: n }) => /* @__PURE__ */ R(nv, { className: fe(t && "block max-w-full", n), children: /* @__PURE__ */ R(rv, { className: fe(t && "block"), children: e.map((r, o) => r.type === "dropdown" && r.subLinks ? /* @__PURE__ */ ve(ws, { children: [
  /* @__PURE__ */ R(ov, { className: "w-full", children: r.title }),
  /* @__PURE__ */ R(iv, { children: /* @__PURE__ */ R("ul", { className: "grid gap-3 p-4 md:w-[600px] md:grid-cols-2", children: r.subLinks.map((i) => /* @__PURE__ */ R(Yu, { href: i.href, title: i.title, children: i.description }, i.id)) }) })
] }, o) : /* @__PURE__ */ R(ws, { children: /* @__PURE__ */ R(Ku, { asChild: !0, children: /* @__PURE__ */ R(jn, { href: r.href, className: fe(Wu(), "w-full"), legacyBehavior: !1, children: r.title }) }) }, o)) }) }), Yu = g.forwardRef(
  ({ className: e, title: t, children: n, href: r, ...o }, i) => /* @__PURE__ */ R("li", { children: /* @__PURE__ */ R(Ku, { asChild: !0, children: /* @__PURE__ */ ve(
    jn,
    {
      ref: i,
      href: r,
      className: fe(
        "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
        e
      ),
      ...o,
      children: [
        /* @__PURE__ */ R("div", { className: "text-sm leading-none font-medium", children: t }),
        /* @__PURE__ */ R("p", { className: "text-muted-foreground line-clamp-2 text-sm leading-snug", children: n })
      ]
    }
  ) }) })
);
Yu.displayName = "ListItem";
const sv = jt(
  ({
    logo: e = /* @__PURE__ */ R(ig, { logo: "/images/logo-black.png" }),
    links: t = ag,
    cta: n,
    user: r,
    className: o,
    navbarStyle: i,
    sticky: a = !0
  }, s) => {
    const c = Og.usePathname(), [u, l] = qo(!1);
    return Ps(() => {
      l(!1);
    }, [c]), /* @__PURE__ */ ve(
      "nav",
      {
        ref: s,
        className: fe("w-full transition-all duration-300", a && "fixed top-0 z-50", i),
        children: [
          /* @__PURE__ */ R(Ag, { className: "p-0", children: /* @__PURE__ */ ve("div", { className: fe("flex h-16 items-center justify-between md:h-24", o), children: [
            /* @__PURE__ */ R("div", { className: "flex-shrink-0", children: e }),
            /* @__PURE__ */ R(Ss, { links: t, className: "hidden lg:block" }),
            /* @__PURE__ */ ve("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ R("div", { className: "hidden gap-4 lg:flex", children: r || n || /* @__PURE__ */ ve(Ye, { children: [
                /* @__PURE__ */ R(gt, { href: "/login", children: "Sign in" }),
                /* @__PURE__ */ R(gt, { variant: "accent", href: "/register", children: "Sign up" })
              ] }) }),
              /* @__PURE__ */ R(
                gt,
                {
                  variant: "ghost",
                  size: "icon",
                  isIconOnly: !0,
                  icon: u ? /* @__PURE__ */ R(Xd, { className: "h-6 w-6" }) : /* @__PURE__ */ R(Gd, { className: "h-6 w-6" }),
                  className: "lg:hidden",
                  onClick: () => l(!u),
                  "aria-label": "Toggle menu"
                }
              )
            ] })
          ] }) }),
          u && /* @__PURE__ */ R(
            "div",
            {
              className: fe(
                "fixed inset-x-0 z-40 w-full bg-white shadow-md lg:hidden",
                a ? "top-16 md:top-20" : "top-0"
              ),
              children: /* @__PURE__ */ ve("div", { className: "space-y-2 px-4 py-3", children: [
                /* @__PURE__ */ R(Ss, { links: t, isMobile: !0 }),
                /* @__PURE__ */ R("div", { className: "flex flex-col space-y-2 pt-2", children: r || n || /* @__PURE__ */ ve(Ye, { children: [
                  /* @__PURE__ */ R(gt, { href: "/login", children: "Sign in" }),
                  /* @__PURE__ */ R(gt, { variant: "accent", href: "/register", children: "Sign up" })
                ] }) })
              ] })
            }
          )
        ]
      }
    );
  }
);
sv.displayName = "Navbar";
function cv({ ...e }) {
  return /* @__PURE__ */ R("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...e });
}
function uv({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    "ol",
    {
      "data-slot": "breadcrumb-list",
      className: fe(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        e
      ),
      ...t
    }
  );
}
function bn({ className: e, ...t }) {
  return /* @__PURE__ */ R("li", { "data-slot": "breadcrumb-item", className: fe("inline-flex items-center gap-1.5", e), ...t });
}
function Cs({
  asChild: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ R(
    e ? $s : "a",
    {
      "data-slot": "breadcrumb-link",
      className: fe("hover:text-foreground transition-colors", t),
      ...n
    }
  );
}
function lv({ className: e, ...t }) {
  return /* @__PURE__ */ R(
    "span",
    {
      "data-slot": "breadcrumb-page",
      role: "link",
      "aria-disabled": "true",
      "aria-current": "page",
      className: fe("text-foreground font-normal", e),
      ...t
    }
  );
}
function ao({ children: e, className: t, ...n }) {
  return /* @__PURE__ */ R(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: fe("[&>svg]:size-3.5", t),
      ...n,
      children: e ?? /* @__PURE__ */ R(Nd, {})
    }
  );
}
function dv({ className: e, ...t }) {
  return /* @__PURE__ */ ve(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: fe("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ R(kd, { className: "size-4" }),
        /* @__PURE__ */ R("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
var so = "rovingFocusGroup.onEntryFocus", fv = { bubbles: !1, cancelable: !0 }, Ut = "RovingFocusGroup", [Go, Qu, pv] = Ht(Ut), [mv, Zu] = ct(
  Ut,
  [pv]
), [hv, gv] = mv(Ut), Ju = g.forwardRef(
  (e, t) => /* @__PURE__ */ R(Go.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ R(Go.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ R(vv, { ...e, ref: t }) }) })
);
Ju.displayName = Ut;
var vv = g.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: i,
    currentTabStopId: a,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: c,
    onEntryFocus: u,
    preventScrollOnEntryFocus: l = !1,
    ...d
  } = e, p = g.useRef(null), h = ye(t, p), b = Fn(i), [f, _] = Et({
    prop: a,
    defaultProp: s ?? null,
    onChange: c,
    caller: Ut
  }), [v, C] = g.useState(!1), m = xe(u), y = Qu(n), E = g.useRef(!1), [A, x] = g.useState(0);
  return g.useEffect(() => {
    const O = p.current;
    if (O)
      return O.addEventListener(so, m), () => O.removeEventListener(so, m);
  }, [m]), /* @__PURE__ */ R(
    hv,
    {
      scope: n,
      orientation: r,
      dir: b,
      loop: o,
      currentTabStopId: f,
      onItemFocus: g.useCallback(
        (O) => _(O),
        [_]
      ),
      onItemShiftTab: g.useCallback(() => C(!0), []),
      onFocusableItemAdd: g.useCallback(
        () => x((O) => O + 1),
        []
      ),
      onFocusableItemRemove: g.useCallback(
        () => x((O) => O - 1),
        []
      ),
      children: /* @__PURE__ */ R(
        le.div,
        {
          tabIndex: v || A === 0 ? -1 : 0,
          "data-orientation": r,
          ...d,
          ref: h,
          style: { outline: "none", ...e.style },
          onMouseDown: Z(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: Z(e.onFocus, (O) => {
            const N = !E.current;
            if (O.target === O.currentTarget && N && !v) {
              const T = new CustomEvent(so, fv);
              if (O.currentTarget.dispatchEvent(T), !T.defaultPrevented) {
                const M = y().filter((F) => F.focusable), k = M.find((F) => F.active), B = M.find((F) => F.id === f), G = [k, B, ...M].filter(
                  Boolean
                ).map((F) => F.ref.current);
                nl(G, l);
              }
            }
            E.current = !1;
          }),
          onBlur: Z(e.onBlur, () => C(!1))
        }
      )
    }
  );
}), el = "RovingFocusGroupItem", tl = g.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: i,
      children: a,
      ...s
    } = e, c = Qe(), u = i || c, l = gv(el, n), d = l.currentTabStopId === u, p = Qu(n), { onFocusableItemAdd: h, onFocusableItemRemove: b, currentTabStopId: f } = l;
    return g.useEffect(() => {
      if (r)
        return h(), () => b();
    }, [r, h, b]), /* @__PURE__ */ R(
      Go.ItemSlot,
      {
        scope: n,
        id: u,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ R(
          le.span,
          {
            tabIndex: d ? 0 : -1,
            "data-orientation": l.orientation,
            ...s,
            ref: t,
            onMouseDown: Z(e.onMouseDown, (_) => {
              r ? l.onItemFocus(u) : _.preventDefault();
            }),
            onFocus: Z(e.onFocus, () => l.onItemFocus(u)),
            onKeyDown: Z(e.onKeyDown, (_) => {
              if (_.key === "Tab" && _.shiftKey) {
                l.onItemShiftTab();
                return;
              }
              if (_.target !== _.currentTarget) return;
              const v = yv(_, l.orientation, l.dir);
              if (v !== void 0) {
                if (_.metaKey || _.ctrlKey || _.altKey || _.shiftKey) return;
                _.preventDefault();
                let m = p().filter((y) => y.focusable).map((y) => y.ref.current);
                if (v === "last") m.reverse();
                else if (v === "prev" || v === "next") {
                  v === "prev" && m.reverse();
                  const y = m.indexOf(_.currentTarget);
                  m = l.loop ? Ev(m, y + 1) : m.slice(y + 1);
                }
                setTimeout(() => nl(m));
              }
            }),
            children: typeof a == "function" ? a({ isCurrentTabStop: d, hasTabStop: f != null }) : a
          }
        )
      }
    );
  }
);
tl.displayName = el;
var _v = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function bv(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function yv(e, t, n) {
  const r = bv(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return _v[r];
}
function nl(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function Ev(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Rv = Ju, wv = tl, zo = ["Enter", " "], Sv = ["ArrowDown", "PageUp", "Home"], rl = ["ArrowUp", "PageDown", "End"], Cv = [...Sv, ...rl], xv = {
  ltr: [...zo, "ArrowRight"],
  rtl: [...zo, "ArrowLeft"]
}, Pv = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Bt = "Menu", [kt, Ov, Av] = Ht(Bt), [lt, ol] = ct(Bt, [
  Av,
  Gn,
  Zu
]), Zn = Gn(), il = Zu(), [Tv, dt] = lt(Bt), [Nv, Gt] = lt(Bt), al = (e) => {
  const { __scopeMenu: t, open: n = !1, children: r, dir: o, onOpenChange: i, modal: a = !0 } = e, s = Zn(t), [c, u] = g.useState(null), l = g.useRef(!1), d = xe(i), p = Fn(o);
  return g.useEffect(() => {
    const h = () => {
      l.current = !0, document.addEventListener("pointerdown", b, { capture: !0, once: !0 }), document.addEventListener("pointermove", b, { capture: !0, once: !0 });
    }, b = () => l.current = !1;
    return document.addEventListener("keydown", h, { capture: !0 }), () => {
      document.removeEventListener("keydown", h, { capture: !0 }), document.removeEventListener("pointerdown", b, { capture: !0 }), document.removeEventListener("pointermove", b, { capture: !0 });
    };
  }, []), /* @__PURE__ */ R(Cc, { ...s, children: /* @__PURE__ */ R(
    Tv,
    {
      scope: t,
      open: n,
      onOpenChange: d,
      content: c,
      onContentChange: u,
      children: /* @__PURE__ */ R(
        Nv,
        {
          scope: t,
          onClose: g.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: l,
          dir: p,
          modal: a,
          children: r
        }
      )
    }
  ) });
};
al.displayName = Bt;
var Iv = "MenuAnchor", Ri = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Zn(n);
    return /* @__PURE__ */ R(xc, { ...o, ...r, ref: t });
  }
);
Ri.displayName = Iv;
var wi = "MenuPortal", [Mv, sl] = lt(wi, {
  forceMount: void 0
}), cl = (e) => {
  const { __scopeMenu: t, forceMount: n, children: r, container: o } = e, i = dt(wi, t);
  return /* @__PURE__ */ R(Mv, { scope: t, forceMount: n, children: /* @__PURE__ */ R(Xe, { present: n || i.open, children: /* @__PURE__ */ R(ci, { asChild: !0, container: o, children: r }) }) });
};
cl.displayName = wi;
var Me = "MenuContent", [Dv, Si] = lt(Me), ul = g.forwardRef(
  (e, t) => {
    const n = sl(Me, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, i = dt(Me, e.__scopeMenu), a = Gt(Me, e.__scopeMenu);
    return /* @__PURE__ */ R(kt.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(Xe, { present: r || i.open, children: /* @__PURE__ */ R(kt.Slot, { scope: e.__scopeMenu, children: a.modal ? /* @__PURE__ */ R(kv, { ...o, ref: t }) : /* @__PURE__ */ R(Lv, { ...o, ref: t }) }) }) });
  }
), kv = g.forwardRef(
  (e, t) => {
    const n = dt(Me, e.__scopeMenu), r = g.useRef(null), o = ye(t, r);
    return g.useEffect(() => {
      const i = r.current;
      if (i) return Mc(i);
    }, []), /* @__PURE__ */ R(
      Ci,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: Z(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }
), Lv = g.forwardRef((e, t) => {
  const n = dt(Me, e.__scopeMenu);
  return /* @__PURE__ */ R(
    Ci,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}), jv = /* @__PURE__ */ bt("MenuContent.ScrollLock"), Ci = g.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: n,
      loop: r = !1,
      trapFocus: o,
      onOpenAutoFocus: i,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: s,
      onEntryFocus: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: l,
      onFocusOutside: d,
      onInteractOutside: p,
      onDismiss: h,
      disableOutsideScroll: b,
      ...f
    } = e, _ = dt(Me, n), v = Gt(Me, n), C = Zn(n), m = il(n), y = Ov(n), [E, A] = g.useState(null), x = g.useRef(null), O = ye(t, x, _.onContentChange), N = g.useRef(0), T = g.useRef(""), M = g.useRef(0), k = g.useRef(null), B = g.useRef("right"), j = g.useRef(0), G = b ? ui : g.Fragment, F = b ? { as: jv, allowPinchZoom: !0 } : void 0, Q = (D) => {
      var P, te;
      const W = T.current + D, se = y().filter((z) => !z.disabled), re = document.activeElement, ne = (P = se.find((z) => z.ref.current === re)) == null ? void 0 : P.textValue, Y = se.map((z) => z.textValue), pe = Kv(Y, W, ne), ie = (te = se.find((z) => z.textValue === pe)) == null ? void 0 : te.ref.current;
      (function z(K) {
        T.current = K, window.clearTimeout(N.current), K !== "" && (N.current = window.setTimeout(() => z(""), 1e3));
      })(W), ie && setTimeout(() => ie.focus());
    };
    g.useEffect(() => () => window.clearTimeout(N.current), []), rc();
    const I = g.useCallback((D) => {
      var se, re;
      return B.current === ((se = k.current) == null ? void 0 : se.side) && Qv(D, (re = k.current) == null ? void 0 : re.area);
    }, []);
    return /* @__PURE__ */ R(
      Dv,
      {
        scope: n,
        searchRef: T,
        onItemEnter: g.useCallback(
          (D) => {
            I(D) && D.preventDefault();
          },
          [I]
        ),
        onItemLeave: g.useCallback(
          (D) => {
            var W;
            I(D) || ((W = x.current) == null || W.focus(), A(null));
          },
          [I]
        ),
        onTriggerLeave: g.useCallback(
          (D) => {
            I(D) && D.preventDefault();
          },
          [I]
        ),
        pointerGraceTimerRef: M,
        onPointerGraceIntentChange: g.useCallback((D) => {
          k.current = D;
        }, []),
        children: /* @__PURE__ */ R(G, { ...F, children: /* @__PURE__ */ R(
          Zo,
          {
            asChild: !0,
            trapped: o,
            onMountAutoFocus: Z(i, (D) => {
              var W;
              D.preventDefault(), (W = x.current) == null || W.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: a,
            children: /* @__PURE__ */ R(
              Hn,
              {
                asChild: !0,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: u,
                onPointerDownOutside: l,
                onFocusOutside: d,
                onInteractOutside: p,
                onDismiss: h,
                children: /* @__PURE__ */ R(
                  Rv,
                  {
                    asChild: !0,
                    ...m,
                    dir: v.dir,
                    orientation: "vertical",
                    loop: r,
                    currentTabStopId: E,
                    onCurrentTabStopIdChange: A,
                    onEntryFocus: Z(c, (D) => {
                      v.isUsingKeyboardRef.current || D.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ R(
                      Pc,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": Cl(_.open),
                        "data-radix-menu-content": "",
                        dir: v.dir,
                        ...C,
                        ...f,
                        ref: O,
                        style: { outline: "none", ...f.style },
                        onKeyDown: Z(f.onKeyDown, (D) => {
                          const se = D.target.closest("[data-radix-menu-content]") === D.currentTarget, re = D.ctrlKey || D.altKey || D.metaKey, ne = D.key.length === 1;
                          se && (D.key === "Tab" && D.preventDefault(), !re && ne && Q(D.key));
                          const Y = x.current;
                          if (D.target !== Y || !Cv.includes(D.key)) return;
                          D.preventDefault();
                          const ie = y().filter((P) => !P.disabled).map((P) => P.ref.current);
                          rl.includes(D.key) && ie.reverse(), Xv(ie);
                        }),
                        onBlur: Z(e.onBlur, (D) => {
                          D.currentTarget.contains(D.target) || (window.clearTimeout(N.current), T.current = "");
                        }),
                        onPointerMove: Z(
                          e.onPointerMove,
                          Lt((D) => {
                            const W = D.target, se = j.current !== D.clientX;
                            if (D.currentTarget.contains(W) && se) {
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
ul.displayName = Me;
var Fv = "MenuGroup", xi = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ R(le.div, { role: "group", ...r, ref: t });
  }
);
xi.displayName = Fv;
var Hv = "MenuLabel", ll = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ R(le.div, { ...r, ref: t });
  }
);
ll.displayName = Hv;
var In = "MenuItem", xs = "menu.itemSelect", Jn = g.forwardRef(
  (e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e, i = g.useRef(null), a = Gt(In, e.__scopeMenu), s = Si(In, e.__scopeMenu), c = ye(t, i), u = g.useRef(!1), l = () => {
      const d = i.current;
      if (!n && d) {
        const p = new CustomEvent(xs, { bubbles: !0, cancelable: !0 });
        d.addEventListener(xs, (h) => r == null ? void 0 : r(h), { once: !0 }), Cn(d, p), p.defaultPrevented ? u.current = !1 : a.onClose();
      }
    };
    return /* @__PURE__ */ R(
      dl,
      {
        ...o,
        ref: c,
        disabled: n,
        onClick: Z(e.onClick, l),
        onPointerDown: (d) => {
          var p;
          (p = e.onPointerDown) == null || p.call(e, d), u.current = !0;
        },
        onPointerUp: Z(e.onPointerUp, (d) => {
          var p;
          u.current || (p = d.currentTarget) == null || p.click();
        }),
        onKeyDown: Z(e.onKeyDown, (d) => {
          const p = s.searchRef.current !== "";
          n || p && d.key === " " || zo.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }
);
Jn.displayName = In;
var dl = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...i } = e, a = Si(In, n), s = il(n), c = g.useRef(null), u = ye(t, c), [l, d] = g.useState(!1), [p, h] = g.useState("");
    return g.useEffect(() => {
      const b = c.current;
      b && h((b.textContent ?? "").trim());
    }, [i.children]), /* @__PURE__ */ R(
      kt.ItemSlot,
      {
        scope: n,
        disabled: r,
        textValue: o ?? p,
        children: /* @__PURE__ */ R(wv, { asChild: !0, ...s, focusable: !r, children: /* @__PURE__ */ R(
          le.div,
          {
            role: "menuitem",
            "data-highlighted": l ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...i,
            ref: u,
            onPointerMove: Z(
              e.onPointerMove,
              Lt((b) => {
                r ? a.onItemLeave(b) : (a.onItemEnter(b), b.defaultPrevented || b.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: Z(
              e.onPointerLeave,
              Lt((b) => a.onItemLeave(b))
            ),
            onFocus: Z(e.onFocus, () => d(!0)),
            onBlur: Z(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }
), $v = "MenuCheckboxItem", fl = g.forwardRef(
  (e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return /* @__PURE__ */ R(vl, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ R(
      Jn,
      {
        role: "menuitemcheckbox",
        "aria-checked": Mn(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": Oi(n),
        onSelect: Z(
          o.onSelect,
          () => r == null ? void 0 : r(Mn(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
fl.displayName = $v;
var pl = "MenuRadioGroup", [Uv, Bv] = lt(
  pl,
  { value: void 0, onValueChange: () => {
  } }
), ml = g.forwardRef(
  (e, t) => {
    const { value: n, onValueChange: r, ...o } = e, i = xe(r);
    return /* @__PURE__ */ R(Uv, { scope: e.__scopeMenu, value: n, onValueChange: i, children: /* @__PURE__ */ R(xi, { ...o, ref: t }) });
  }
);
ml.displayName = pl;
var hl = "MenuRadioItem", gl = g.forwardRef(
  (e, t) => {
    const { value: n, ...r } = e, o = Bv(hl, e.__scopeMenu), i = n === o.value;
    return /* @__PURE__ */ R(vl, { scope: e.__scopeMenu, checked: i, children: /* @__PURE__ */ R(
      Jn,
      {
        role: "menuitemradio",
        "aria-checked": i,
        ...r,
        ref: t,
        "data-state": Oi(i),
        onSelect: Z(
          r.onSelect,
          () => {
            var a;
            return (a = o.onValueChange) == null ? void 0 : a.call(o, n);
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
gl.displayName = hl;
var Pi = "MenuItemIndicator", [vl, Gv] = lt(
  Pi,
  { checked: !1 }
), _l = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e, i = Gv(Pi, n);
    return /* @__PURE__ */ R(
      Xe,
      {
        present: r || Mn(i.checked) || i.checked === !0,
        children: /* @__PURE__ */ R(
          le.span,
          {
            ...o,
            ref: t,
            "data-state": Oi(i.checked)
          }
        )
      }
    );
  }
);
_l.displayName = Pi;
var zv = "MenuSeparator", bl = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return /* @__PURE__ */ R(
      le.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...r,
        ref: t
      }
    );
  }
);
bl.displayName = zv;
var Vv = "MenuArrow", yl = g.forwardRef(
  (e, t) => {
    const { __scopeMenu: n, ...r } = e, o = Zn(n);
    return /* @__PURE__ */ R(Oc, { ...o, ...r, ref: t });
  }
);
yl.displayName = Vv;
var qv = "MenuSub", [Q_, El] = lt(qv), It = "MenuSubTrigger", Rl = g.forwardRef(
  (e, t) => {
    const n = dt(It, e.__scopeMenu), r = Gt(It, e.__scopeMenu), o = El(It, e.__scopeMenu), i = Si(It, e.__scopeMenu), a = g.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: c } = i, u = { __scopeMenu: e.__scopeMenu }, l = g.useCallback(() => {
      a.current && window.clearTimeout(a.current), a.current = null;
    }, []);
    return g.useEffect(() => l, [l]), g.useEffect(() => {
      const d = s.current;
      return () => {
        window.clearTimeout(d), c(null);
      };
    }, [s, c]), /* @__PURE__ */ R(Ri, { asChild: !0, ...u, children: /* @__PURE__ */ R(
      dl,
      {
        id: o.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": o.contentId,
        "data-state": Cl(n.open),
        ...e,
        ref: Ft(t, o.onTriggerChange),
        onClick: (d) => {
          var p;
          (p = e.onClick) == null || p.call(e, d), !(e.disabled || d.defaultPrevented) && (d.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: Z(
          e.onPointerMove,
          Lt((d) => {
            i.onItemEnter(d), !d.defaultPrevented && !e.disabled && !n.open && !a.current && (i.onPointerGraceIntentChange(null), a.current = window.setTimeout(() => {
              n.onOpenChange(!0), l();
            }, 100));
          })
        ),
        onPointerLeave: Z(
          e.onPointerLeave,
          Lt((d) => {
            var h, b;
            l();
            const p = (h = n.content) == null ? void 0 : h.getBoundingClientRect();
            if (p) {
              const f = (b = n.content) == null ? void 0 : b.dataset.side, _ = f === "right", v = _ ? -5 : 5, C = p[_ ? "left" : "right"], m = p[_ ? "right" : "left"];
              i.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: d.clientX + v, y: d.clientY },
                  { x: C, y: p.top },
                  { x: m, y: p.top },
                  { x: m, y: p.bottom },
                  { x: C, y: p.bottom }
                ],
                side: f
              }), window.clearTimeout(s.current), s.current = window.setTimeout(
                () => i.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (i.onTriggerLeave(d), d.defaultPrevented) return;
              i.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: Z(e.onKeyDown, (d) => {
          var h;
          const p = i.searchRef.current !== "";
          e.disabled || p && d.key === " " || xv[r.dir].includes(d.key) && (n.onOpenChange(!0), (h = n.content) == null || h.focus(), d.preventDefault());
        })
      }
    ) });
  }
);
Rl.displayName = It;
var wl = "MenuSubContent", Sl = g.forwardRef(
  (e, t) => {
    const n = sl(Me, e.__scopeMenu), { forceMount: r = n.forceMount, ...o } = e, i = dt(Me, e.__scopeMenu), a = Gt(Me, e.__scopeMenu), s = El(wl, e.__scopeMenu), c = g.useRef(null), u = ye(t, c);
    return /* @__PURE__ */ R(kt.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(Xe, { present: r || i.open, children: /* @__PURE__ */ R(kt.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ R(
      Ci,
      {
        id: s.contentId,
        "aria-labelledby": s.triggerId,
        ...o,
        ref: u,
        align: "start",
        side: a.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (l) => {
          var d;
          a.isUsingKeyboardRef.current && ((d = c.current) == null || d.focus()), l.preventDefault();
        },
        onCloseAutoFocus: (l) => l.preventDefault(),
        onFocusOutside: Z(e.onFocusOutside, (l) => {
          l.target !== s.trigger && i.onOpenChange(!1);
        }),
        onEscapeKeyDown: Z(e.onEscapeKeyDown, (l) => {
          a.onClose(), l.preventDefault();
        }),
        onKeyDown: Z(e.onKeyDown, (l) => {
          var h;
          const d = l.currentTarget.contains(l.target), p = Pv[a.dir].includes(l.key);
          d && p && (i.onOpenChange(!1), (h = s.trigger) == null || h.focus(), l.preventDefault());
        })
      }
    ) }) }) });
  }
);
Sl.displayName = wl;
function Cl(e) {
  return e ? "open" : "closed";
}
function Mn(e) {
  return e === "indeterminate";
}
function Oi(e) {
  return Mn(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Xv(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function Wv(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function Kv(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((u) => u === t[0]) ? t[0] : t, i = n ? e.indexOf(n) : -1;
  let a = Wv(e, Math.max(i, 0));
  o.length === 1 && (a = a.filter((u) => u !== n));
  const c = a.find(
    (u) => u.toLowerCase().startsWith(o.toLowerCase())
  );
  return c !== n ? c : void 0;
}
function Yv(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let i = 0, a = t.length - 1; i < t.length; a = i++) {
    const s = t[i], c = t[a], u = s.x, l = s.y, d = c.x, p = c.y;
    l > r != p > r && n < (d - u) * (r - l) / (p - l) + u && (o = !o);
  }
  return o;
}
function Qv(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return Yv(n, t);
}
function Lt(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Zv = al, Jv = Ri, e_ = cl, t_ = ul, n_ = xi, r_ = ll, o_ = Jn, i_ = fl, a_ = ml, s_ = gl, c_ = _l, u_ = bl, l_ = yl, d_ = Rl, f_ = Sl, er = "DropdownMenu", [p_, Z_] = ct(
  er,
  [ol]
), Ae = ol(), [m_, xl] = p_(er), Pl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: n,
    dir: r,
    open: o,
    defaultOpen: i,
    onOpenChange: a,
    modal: s = !0
  } = e, c = Ae(t), u = g.useRef(null), [l, d] = Et({
    prop: o,
    defaultProp: i ?? !1,
    onChange: a,
    caller: er
  });
  return /* @__PURE__ */ R(
    m_,
    {
      scope: t,
      triggerId: Qe(),
      triggerRef: u,
      contentId: Qe(),
      open: l,
      onOpenChange: d,
      onOpenToggle: g.useCallback(() => d((p) => !p), [d]),
      modal: s,
      children: /* @__PURE__ */ R(Zv, { ...c, open: l, onOpenChange: d, dir: r, modal: s, children: n })
    }
  );
};
Pl.displayName = er;
var Ol = "DropdownMenuTrigger", Al = g.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e, i = xl(Ol, n), a = Ae(n);
    return /* @__PURE__ */ R(Jv, { asChild: !0, ...a, children: /* @__PURE__ */ R(
      le.button,
      {
        type: "button",
        id: i.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? i.contentId : void 0,
        "data-state": i.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: Ft(t, i.triggerRef),
        onPointerDown: Z(e.onPointerDown, (s) => {
          !r && s.button === 0 && s.ctrlKey === !1 && (i.onOpenToggle(), i.open || s.preventDefault());
        }),
        onKeyDown: Z(e.onKeyDown, (s) => {
          r || (["Enter", " "].includes(s.key) && i.onOpenToggle(), s.key === "ArrowDown" && i.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(s.key) && s.preventDefault());
        })
      }
    ) });
  }
);
Al.displayName = Ol;
var h_ = "DropdownMenuPortal", Tl = (e) => {
  const { __scopeDropdownMenu: t, ...n } = e, r = Ae(t);
  return /* @__PURE__ */ R(e_, { ...r, ...n });
};
Tl.displayName = h_;
var Nl = "DropdownMenuContent", Il = g.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = xl(Nl, n), i = Ae(n), a = g.useRef(!1);
    return /* @__PURE__ */ R(
      t_,
      {
        id: o.contentId,
        "aria-labelledby": o.triggerId,
        ...i,
        ...r,
        ref: t,
        onCloseAutoFocus: Z(e.onCloseAutoFocus, (s) => {
          var c;
          a.current || (c = o.triggerRef.current) == null || c.focus(), a.current = !1, s.preventDefault();
        }),
        onInteractOutside: Z(e.onInteractOutside, (s) => {
          const c = s.detail.originalEvent, u = c.button === 0 && c.ctrlKey === !0, l = c.button === 2 || u;
          (!o.modal || l) && (a.current = !0);
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
Il.displayName = Nl;
var g_ = "DropdownMenuGroup", v_ = g.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(n_, { ...o, ...r, ref: t });
  }
);
v_.displayName = g_;
var __ = "DropdownMenuLabel", b_ = g.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(r_, { ...o, ...r, ref: t });
  }
);
b_.displayName = __;
var y_ = "DropdownMenuItem", Ml = g.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(o_, { ...o, ...r, ref: t });
  }
);
Ml.displayName = y_;
var E_ = "DropdownMenuCheckboxItem", R_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(i_, { ...o, ...r, ref: t });
});
R_.displayName = E_;
var w_ = "DropdownMenuRadioGroup", S_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(a_, { ...o, ...r, ref: t });
});
S_.displayName = w_;
var C_ = "DropdownMenuRadioItem", x_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(s_, { ...o, ...r, ref: t });
});
x_.displayName = C_;
var P_ = "DropdownMenuItemIndicator", O_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(c_, { ...o, ...r, ref: t });
});
O_.displayName = P_;
var A_ = "DropdownMenuSeparator", T_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(u_, { ...o, ...r, ref: t });
});
T_.displayName = A_;
var N_ = "DropdownMenuArrow", I_ = g.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
    return /* @__PURE__ */ R(l_, { ...o, ...r, ref: t });
  }
);
I_.displayName = N_;
var M_ = "DropdownMenuSubTrigger", D_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(d_, { ...o, ...r, ref: t });
});
D_.displayName = M_;
var k_ = "DropdownMenuSubContent", L_ = g.forwardRef((e, t) => {
  const { __scopeDropdownMenu: n, ...r } = e, o = Ae(n);
  return /* @__PURE__ */ R(
    f_,
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
L_.displayName = k_;
var j_ = Pl, F_ = Al, H_ = Tl, $_ = Il, U_ = Ml;
function B_({ ...e }) {
  return /* @__PURE__ */ R(j_, { "data-slot": "dropdown-menu", ...e });
}
function G_({ ...e }) {
  return /* @__PURE__ */ R(F_, { "data-slot": "dropdown-menu-trigger", ...e });
}
function z_({
  className: e,
  sideOffset: t = 4,
  ...n
}) {
  return /* @__PURE__ */ R(H_, { children: /* @__PURE__ */ R(
    $_,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: fe(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
        e
      ),
      ...n
    }
  ) });
}
function co({
  className: e,
  inset: t,
  variant: n = "default",
  ...r
}) {
  return /* @__PURE__ */ R(
    U_,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": n,
      className: fe(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...r
    }
  );
}
const J_ = () => /* @__PURE__ */ R(cv, { children: /* @__PURE__ */ ve(uv, { children: [
  /* @__PURE__ */ R(bn, { children: /* @__PURE__ */ R(Cs, { href: "/", children: "Home" }) }),
  /* @__PURE__ */ R(ao, {}),
  /* @__PURE__ */ R(bn, { children: /* @__PURE__ */ ve(B_, { children: [
    /* @__PURE__ */ ve(G_, { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ R(dv, { className: "h-4 w-4" }),
      /* @__PURE__ */ R("span", { className: "sr-only", children: "Toggle menu" })
    ] }),
    /* @__PURE__ */ ve(z_, { align: "start", children: [
      /* @__PURE__ */ R(co, { children: "Documentation" }),
      /* @__PURE__ */ R(co, { children: "Themes" }),
      /* @__PURE__ */ R(co, { children: "GitHub" })
    ] })
  ] }) }),
  /* @__PURE__ */ R(ao, {}),
  /* @__PURE__ */ R(bn, { children: /* @__PURE__ */ R(Cs, { href: "/docs/components", children: "Components" }) }),
  /* @__PURE__ */ R(ao, {}),
  /* @__PURE__ */ R(bn, { children: /* @__PURE__ */ R(lv, { children: "Breadcrumb" }) })
] }) });
export {
  J_ as BreadCrumb,
  K_ as InputField,
  ig as Logo,
  sv as Navbar
};
