/*! For license information please see 4655.js.LICENSE.txt */
"use strict";
(self.webpackChunk = self.webpackChunk || []).push([
  [4655],
  {
    35491: function (e, t, r) {
      var n = r(73203);
      t.Z = void 0;
      var a = n(r(19124)),
        i = r(24246),
        o = (0, a.default)(
          (0, i.jsx)("path", {
            d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
          }),
          "KeyboardArrowDown"
        );
      t.Z = o;
    },
    1743: function (e, t, r) {
      var n = r(73203);
      t.Z = void 0;
      var a = n(r(19124)),
        i = r(24246),
        o = (0, a.default)(
          (0, i.jsx)("path", {
            d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z",
          }),
          "KeyboardArrowUp"
        );
      t.Z = o;
    },
    95287: function (e, t, r) {
      r.d(t, {
        Z: function () {
          return k;
        },
      });
      var n = r(30808),
        a = r(25773),
        i = r(27378),
        o = r(38944),
        s = r(82267),
        c = r(10043),
        l = r(89090),
        u = r(76112),
        d = r(67018),
        h = r(6749);
      function p(e) {
        return (0, h.Z)("MuiCircularProgress", e);
      }
      (0, r(44124).Z)("MuiCircularProgress", [
        "root",
        "determinate",
        "indeterminate",
        "colorPrimary",
        "colorSecondary",
        "svg",
        "circle",
        "circleDeterminate",
        "circleIndeterminate",
        "circleDisableShrink",
      ]);
      var f = r(24246);
      const m = [
        "className",
        "color",
        "disableShrink",
        "size",
        "style",
        "thickness",
        "value",
        "variant",
      ];
      let v,
        y,
        g,
        x,
        b = (e) => e;
      const j = (0, c.F4)(
          v ||
            (v = b`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)
        ),
        Z = (0, c.F4)(
          y ||
            (y = b`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)
        ),
        w = (0, d.ZP)("span", {
          name: "MuiCircularProgress",
          slot: "Root",
          overridesResolver: (e, t) => {
            const { ownerState: r } = e;
            return [t.root, t[r.variant], t[`color${(0, l.Z)(r.color)}`]];
          },
        })(
          ({ ownerState: e, theme: t }) =>
            (0, a.Z)(
              { display: "inline-block" },
              "determinate" === e.variant && {
                transition: t.transitions.create("transform"),
              },
              "inherit" !== e.color && {
                color: (t.vars || t).palette[e.color].main,
              }
            ),
          ({ ownerState: e }) =>
            "indeterminate" === e.variant &&
            (0, c.iv)(
              g ||
                (g = b`
      animation: ${0} 1.4s linear infinite;
    `),
              j
            )
        ),
        _ = (0, d.ZP)("svg", {
          name: "MuiCircularProgress",
          slot: "Svg",
          overridesResolver: (e, t) => t.svg,
        })({ display: "block" }),
        S = (0, d.ZP)("circle", {
          name: "MuiCircularProgress",
          slot: "Circle",
          overridesResolver: (e, t) => {
            const { ownerState: r } = e;
            return [
              t.circle,
              t[`circle${(0, l.Z)(r.variant)}`],
              r.disableShrink && t.circleDisableShrink,
            ];
          },
        })(
          ({ ownerState: e, theme: t }) =>
            (0, a.Z)(
              { stroke: "currentColor" },
              "determinate" === e.variant && {
                transition: t.transitions.create("stroke-dashoffset"),
              },
              "indeterminate" === e.variant && {
                strokeDasharray: "80px, 200px",
                strokeDashoffset: 0,
              }
            ),
          ({ ownerState: e }) =>
            "indeterminate" === e.variant &&
            !e.disableShrink &&
            (0, c.iv)(
              x ||
                (x = b`
      animation: ${0} 1.4s ease-in-out infinite;
    `),
              Z
            )
        );
      var k = i.forwardRef(function (e, t) {
        const r = (0, u.Z)({ props: e, name: "MuiCircularProgress" }),
          {
            className: i,
            color: c = "primary",
            disableShrink: d = !1,
            size: h = 40,
            style: v,
            thickness: y = 3.6,
            value: g = 0,
            variant: x = "indeterminate",
          } = r,
          b = (0, n.Z)(r, m),
          j = (0, a.Z)({}, r, {
            color: c,
            disableShrink: d,
            size: h,
            thickness: y,
            value: g,
            variant: x,
          }),
          Z = ((e) => {
            const { classes: t, variant: r, color: n, disableShrink: a } = e,
              i = {
                root: ["root", r, `color${(0, l.Z)(n)}`],
                svg: ["svg"],
                circle: [
                  "circle",
                  `circle${(0, l.Z)(r)}`,
                  a && "circleDisableShrink",
                ],
              };
            return (0, s.Z)(i, p, t);
          })(j),
          k = {},
          C = {},
          N = {};
        if ("determinate" === x) {
          const e = 2 * Math.PI * ((44 - y) / 2);
          (k.strokeDasharray = e.toFixed(3)),
            (N["aria-valuenow"] = Math.round(g)),
            (k.strokeDashoffset = `${(((100 - g) / 100) * e).toFixed(3)}px`),
            (C.transform = "rotate(-90deg)");
        }
        return (0,
        f.jsx)(w, (0, a.Z)({ className: (0, o.Z)(Z.root, i), style: (0, a.Z)({ width: h, height: h }, C, v), ownerState: j, ref: t, role: "progressbar" }, N, b, { children: (0, f.jsx)(_, { className: Z.svg, ownerState: j, viewBox: "22 22 44 44", children: (0, f.jsx)(S, { className: Z.circle, style: k, ownerState: j, cx: 44, cy: 44, r: (44 - y) / 2, fill: "none", strokeWidth: y }) }) }));
      });
    },
    52359: function (e, t, r) {
      r.d(t, {
        Z: function () {
          return x;
        },
      });
      var n = r(30808),
        a = r(25773),
        i = r(27378),
        o = r(38944),
        s = r(82267),
        c = r(7818),
        l = r(67018),
        u = r(76112),
        d = r(3870),
        h = r(89090),
        p = r(6749);
      function f(e) {
        return (0, p.Z)("MuiIconButton", e);
      }
      var m = (0, r(44124).Z)("MuiIconButton", [
          "root",
          "disabled",
          "colorInherit",
          "colorPrimary",
          "colorSecondary",
          "edgeStart",
          "edgeEnd",
          "sizeSmall",
          "sizeMedium",
          "sizeLarge",
        ]),
        v = r(24246);
      const y = [
          "edge",
          "children",
          "className",
          "color",
          "disabled",
          "disableFocusRipple",
          "size",
        ],
        g = (0, l.ZP)(d.Z, {
          name: "MuiIconButton",
          slot: "Root",
          overridesResolver: (e, t) => {
            const { ownerState: r } = e;
            return [
              t.root,
              "default" !== r.color && t[`color${(0, h.Z)(r.color)}`],
              r.edge && t[`edge${(0, h.Z)(r.edge)}`],
              t[`size${(0, h.Z)(r.size)}`],
            ];
          },
        })(
          ({ theme: e, ownerState: t }) =>
            (0, a.Z)(
              {
                textAlign: "center",
                flex: "0 0 auto",
                fontSize: e.typography.pxToRem(24),
                padding: 8,
                borderRadius: "50%",
                overflow: "visible",
                color: (e.vars || e).palette.action.active,
                transition: e.transitions.create("background-color", {
                  duration: e.transitions.duration.shortest,
                }),
              },
              !t.disableRipple && {
                "&:hover": {
                  backgroundColor: e.vars
                    ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`
                    : (0, c.Fq)(
                        e.palette.action.active,
                        e.palette.action.hoverOpacity
                      ),
                  "@media (hover: none)": { backgroundColor: "transparent" },
                },
              },
              "start" === t.edge && {
                marginLeft: "small" === t.size ? -3 : -12,
              },
              "end" === t.edge && { marginRight: "small" === t.size ? -3 : -12 }
            ),
          ({ theme: e, ownerState: t }) =>
            (0, a.Z)(
              {},
              "inherit" === t.color && { color: "inherit" },
              "inherit" !== t.color &&
                "default" !== t.color &&
                (0, a.Z)(
                  { color: (e.vars || e).palette[t.color].main },
                  !t.disableRipple && {
                    "&:hover": {
                      backgroundColor: e.vars
                        ? `rgba(${e.vars.palette[t.color].mainChannel} / ${
                            e.vars.palette.action.hoverOpacity
                          })`
                        : (0, c.Fq)(
                            e.palette[t.color].main,
                            e.palette.action.hoverOpacity
                          ),
                      "@media (hover: none)": {
                        backgroundColor: "transparent",
                      },
                    },
                  }
                ),
              "small" === t.size && {
                padding: 5,
                fontSize: e.typography.pxToRem(18),
              },
              "large" === t.size && {
                padding: 12,
                fontSize: e.typography.pxToRem(28),
              },
              {
                [`&.${m.disabled}`]: {
                  backgroundColor: "transparent",
                  color: (e.vars || e).palette.action.disabled,
                },
              }
            )
        );
      var x = i.forwardRef(function (e, t) {
        const r = (0, u.Z)({ props: e, name: "MuiIconButton" }),
          {
            edge: i = !1,
            children: c,
            className: l,
            color: d = "default",
            disabled: p = !1,
            disableFocusRipple: m = !1,
            size: x = "medium",
          } = r,
          b = (0, n.Z)(r, y),
          j = (0, a.Z)({}, r, {
            edge: i,
            color: d,
            disabled: p,
            disableFocusRipple: m,
            size: x,
          }),
          Z = ((e) => {
            const { classes: t, disabled: r, color: n, edge: a, size: i } = e,
              o = {
                root: [
                  "root",
                  r && "disabled",
                  "default" !== n && `color${(0, h.Z)(n)}`,
                  a && `edge${(0, h.Z)(a)}`,
                  `size${(0, h.Z)(i)}`,
                ],
              };
            return (0, s.Z)(o, f, t);
          })(j);
        return (0,
        v.jsx)(g, (0, a.Z)({ className: (0, o.Z)(Z.root, l), centerRipple: !0, focusRipple: !m, disabled: p, ref: t, ownerState: j }, b, { children: c }));
      });
    },
    22630: function (e, t, r) {
      r.d(t, {
        HP: function () {
          return o;
        },
        Q8: function () {
          return l;
        },
        ek: function () {
          return c;
        },
        rH: function () {
          return s;
        },
      });
      var n = r(69222),
        a = r(53488),
        i = r(57446),
        o = function (e) {
          return (
            (e = (0, i.B7)(e, !0)),
            function (t) {
              n.Z.get("/superadmin/return-sales".concat(e))
                .then(function (e) {
                  e.data.success && t({ type: a.C, payload: e.data.data });
                })
                .catch(function (e) {});
            }
          );
        },
        s = function (e) {
          return function (t) {
            n.Z.get("/superadmin/return-sales/view/".concat(e))
              .then(function (e) {
                e.data.success && t({ type: a.b, payload: e.data.data });
              })
              .catch(function (e) {});
          };
        },
        c = function (e) {
          return n.Z.get("/superadmin/return-sales/view/".concat(e));
        },
        l = function (e, t) {
          return n.Z.post("/superadmin/return-sales/update-status/" + e, t);
        };
    },
    74655: function (e, t, r) {
      r.r(t);
      var n = r(27378),
        a = r(23884),
        i = r(83160),
        o = r(28730),
        s = r(23434),
        c = r(95287),
        l = r(10418),
        u = r(78153),
        d = r(52359),
        h = r(93600),
        p = r(43564),
        f = r(90813),
        m = r(74154),
        v = r(8971),
        y = r(13040),
        g = (r(46265), r(72897)),
        x = r(22630),
        b = r(10755),
        j = r(97722),
        Z = r(49444),
        w = r(92146),
        _ = r(47265),
        S = r(96616),
        k = r(68456),
        C = r(19265),
        N = r(35491),
        P = r(1743),
        O = r(74570),
        D = r(26803),
        F = r(69162),
        R = r(93033),
        L = r(16569),
        E = r(57446),
        z = r(24246);
      function A(e) {
        return (
          (A =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    "function" == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? "symbol"
                    : typeof e;
                }),
          A(e)
        );
      }
      function I(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n;
      }
      function M() {
        M = function () {
          return e;
        };
        var e = {},
          t = Object.prototype,
          r = t.hasOwnProperty,
          n = "function" == typeof Symbol ? Symbol : {},
          a = n.iterator || "@@iterator",
          i = n.asyncIterator || "@@asyncIterator",
          o = n.toStringTag || "@@toStringTag";
        function s(e, t, r) {
          return (
            Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          );
        }
        try {
          s({}, "");
        } catch (e) {
          s = function (e, t, r) {
            return (e[t] = r);
          };
        }
        function c(e, t, r, n) {
          var a = t && t.prototype instanceof d ? t : d,
            i = Object.create(a.prototype),
            o = new w(n || []);
          return (
            (i._invoke = (function (e, t, r) {
              var n = "suspendedStart";
              return function (a, i) {
                if ("executing" === n)
                  throw new Error("Generator is already running");
                if ("completed" === n) {
                  if ("throw" === a) throw i;
                  return { value: void 0, done: !0 };
                }
                for (r.method = a, r.arg = i; ; ) {
                  var o = r.delegate;
                  if (o) {
                    var s = b(o, r);
                    if (s) {
                      if (s === u) continue;
                      return s;
                    }
                  }
                  if ("next" === r.method) r.sent = r._sent = r.arg;
                  else if ("throw" === r.method) {
                    if ("suspendedStart" === n)
                      throw ((n = "completed"), r.arg);
                    r.dispatchException(r.arg);
                  } else "return" === r.method && r.abrupt("return", r.arg);
                  n = "executing";
                  var c = l(e, t, r);
                  if ("normal" === c.type) {
                    if (
                      ((n = r.done ? "completed" : "suspendedYield"),
                      c.arg === u)
                    )
                      continue;
                    return { value: c.arg, done: r.done };
                  }
                  "throw" === c.type &&
                    ((n = "completed"), (r.method = "throw"), (r.arg = c.arg));
                }
              };
            })(e, r, o)),
            i
          );
        }
        function l(e, t, r) {
          try {
            return { type: "normal", arg: e.call(t, r) };
          } catch (e) {
            return { type: "throw", arg: e };
          }
        }
        e.wrap = c;
        var u = {};
        function d() {}
        function h() {}
        function p() {}
        var f = {};
        s(f, a, function () {
          return this;
        });
        var m = Object.getPrototypeOf,
          v = m && m(m(_([])));
        v && v !== t && r.call(v, a) && (f = v);
        var y = (p.prototype = d.prototype = Object.create(f));
        function g(e) {
          ["next", "throw", "return"].forEach(function (t) {
            s(e, t, function (e) {
              return this._invoke(t, e);
            });
          });
        }
        function x(e, t) {
          function n(a, i, o, s) {
            var c = l(e[a], e, i);
            if ("throw" !== c.type) {
              var u = c.arg,
                d = u.value;
              return d && "object" == A(d) && r.call(d, "__await")
                ? t.resolve(d.__await).then(
                    function (e) {
                      n("next", e, o, s);
                    },
                    function (e) {
                      n("throw", e, o, s);
                    }
                  )
                : t.resolve(d).then(
                    function (e) {
                      (u.value = e), o(u);
                    },
                    function (e) {
                      return n("throw", e, o, s);
                    }
                  );
            }
            s(c.arg);
          }
          var a;
          this._invoke = function (e, r) {
            function i() {
              return new t(function (t, a) {
                n(e, r, t, a);
              });
            }
            return (a = a ? a.then(i, i) : i());
          };
        }
        function b(e, t) {
          var r = e.iterator[t.method];
          if (void 0 === r) {
            if (((t.delegate = null), "throw" === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = "return"),
                (t.arg = void 0),
                b(e, t),
                "throw" === t.method)
              )
                return u;
              (t.method = "throw"),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return u;
          }
          var n = l(r, e.iterator, t.arg);
          if ("throw" === n.type)
            return (
              (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), u
            );
          var a = n.arg;
          return a
            ? a.done
              ? ((t[e.resultName] = a.value),
                (t.next = e.nextLoc),
                "return" !== t.method &&
                  ((t.method = "next"), (t.arg = void 0)),
                (t.delegate = null),
                u)
              : a
            : ((t.method = "throw"),
              (t.arg = new TypeError("iterator result is not an object")),
              (t.delegate = null),
              u);
        }
        function j(e) {
          var t = { tryLoc: e[0] };
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t);
        }
        function Z(e) {
          var t = e.completion || {};
          (t.type = "normal"), delete t.arg, (e.completion = t);
        }
        function w(e) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            e.forEach(j, this),
            this.reset(!0);
        }
        function _(e) {
          if (e) {
            var t = e[a];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
              var n = -1,
                i = function t() {
                  for (; ++n < e.length; )
                    if (r.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                  return (t.value = void 0), (t.done = !0), t;
                };
              return (i.next = i);
            }
          }
          return { next: S };
        }
        function S() {
          return { value: void 0, done: !0 };
        }
        return (
          (h.prototype = p),
          s(y, "constructor", p),
          s(p, "constructor", h),
          (h.displayName = s(p, o, "GeneratorFunction")),
          (e.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return (
              !!t &&
              (t === h || "GeneratorFunction" === (t.displayName || t.name))
            );
          }),
          (e.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, p)
                : ((e.__proto__ = p), s(e, o, "GeneratorFunction")),
              (e.prototype = Object.create(y)),
              e
            );
          }),
          (e.awrap = function (e) {
            return { __await: e };
          }),
          g(x.prototype),
          s(x.prototype, i, function () {
            return this;
          }),
          (e.AsyncIterator = x),
          (e.async = function (t, r, n, a, i) {
            void 0 === i && (i = Promise);
            var o = new x(c(t, r, n, a), i);
            return e.isGeneratorFunction(r)
              ? o
              : o.next().then(function (e) {
                  return e.done ? e.value : o.next();
                });
          }),
          g(y),
          s(y, o, "Generator"),
          s(y, a, function () {
            return this;
          }),
          s(y, "toString", function () {
            return "[object Generator]";
          }),
          (e.keys = function (e) {
            var t = [];
            for (var r in e) t.push(r);
            return (
              t.reverse(),
              function r() {
                for (; t.length; ) {
                  var n = t.pop();
                  if (n in e) return (r.value = n), (r.done = !1), r;
                }
                return (r.done = !0), r;
              }
            );
          }),
          (e.values = _),
          (w.prototype = {
            constructor: w,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(Z),
                !e)
              )
                for (var t in this)
                  "t" === t.charAt(0) &&
                    r.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0);
            },
            stop: function () {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function (e) {
              if (this.done) throw e;
              var t = this;
              function n(r, n) {
                return (
                  (o.type = "throw"),
                  (o.arg = e),
                  (t.next = r),
                  n && ((t.method = "next"), (t.arg = void 0)),
                  !!n
                );
              }
              for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                var i = this.tryEntries[a],
                  o = i.completion;
                if ("root" === i.tryLoc) return n("end");
                if (i.tryLoc <= this.prev) {
                  var s = r.call(i, "catchLoc"),
                    c = r.call(i, "finallyLoc");
                  if (s && c) {
                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                    if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                  } else if (s) {
                    if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < i.finallyLoc) return n(i.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                var a = this.tryEntries[n];
                if (
                  a.tryLoc <= this.prev &&
                  r.call(a, "finallyLoc") &&
                  this.prev < a.finallyLoc
                ) {
                  var i = a;
                  break;
                }
              }
              i &&
                ("break" === e || "continue" === e) &&
                i.tryLoc <= t &&
                t <= i.finallyLoc &&
                (i = null);
              var o = i ? i.completion : {};
              return (
                (o.type = e),
                (o.arg = t),
                i
                  ? ((this.method = "next"), (this.next = i.finallyLoc), u)
                  : this.complete(o)
              );
            },
            complete: function (e, t) {
              if ("throw" === e.type) throw e.arg;
              return (
                "break" === e.type || "continue" === e.type
                  ? (this.next = e.arg)
                  : "return" === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === e.type && t && (this.next = t),
                u
              );
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.finallyLoc === e)
                  return this.complete(r.completion, r.afterLoc), Z(r), u;
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.tryLoc === e) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var a = n.arg;
                    Z(r);
                  }
                  return a;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (e, t, r) {
              return (
                (this.delegate = { iterator: _(e), resultName: t, nextLoc: r }),
                "next" === this.method && (this.arg = void 0),
                u
              );
            },
          }),
          e
        );
      }
      function $(e, t, r, n, a, i, o) {
        try {
          var s = e[i](o),
            c = s.value;
        } catch (e) {
          return void r(e);
        }
        s.done ? t(c) : Promise.resolve(c).then(n, a);
      }
      function T(e) {
        return function () {
          var t = this,
            r = arguments;
          return new Promise(function (n, a) {
            var i = e.apply(t, r);
            function o(e) {
              $(i, n, a, o, s, "next", e);
            }
            function s(e) {
              $(i, n, a, o, s, "throw", e);
            }
            o(void 0);
          });
        };
      }
      function B(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
      }
      function W(e, t) {
        return (
          (W = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (e, t) {
                return (e.__proto__ = t), e;
              }),
          W(e, t)
        );
      }
      function G(e, t) {
        if (t && ("object" === A(t) || "function" == typeof t)) return t;
        if (void 0 !== t)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return q(e);
      }
      function q(e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return e;
      }
      function V(e) {
        return (
          (V = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
              }),
          V(e)
        );
      }
      function H(e, t, r) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = r),
          e
        );
      }
      var U = (function (e) {
        !(function (e, t) {
          if ("function" != typeof t && null !== t)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            t && W(e, t);
        })(p, e);
        var t,
          r,
          n,
          a,
          d,
          h =
            ((a = p),
            (d = (function () {
              if ("undefined" == typeof Reflect || !Reflect.construct)
                return !1;
              if (Reflect.construct.sham) return !1;
              if ("function" == typeof Proxy) return !0;
              try {
                return (
                  Boolean.prototype.valueOf.call(
                    Reflect.construct(Boolean, [], function () {})
                  ),
                  !0
                );
              } catch (e) {
                return !1;
              }
            })()),
            function () {
              var e,
                t = V(a);
              if (d) {
                var r = V(this).constructor;
                e = Reflect.construct(t, arguments, r);
              } else e = t.apply(this, arguments);
              return G(this, e);
            });
        function p(e) {
          var t;
          return (
            (function (e, t) {
              if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
            })(this, p),
            H(q((t = h.call(this, e))), "loadViewData", function () {
              t.props.actions.returnSaleView(t.props.params.id);
            }),
            H(
              q(t),
              "handleStatusChange",
              (function () {
                var e = T(
                  M().mark(function e(r) {
                    return M().wrap(function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            t.setState({
                              status_changing: r,
                              confirmDialog: !0,
                            });
                          case 1:
                          case "end":
                            return e.stop();
                        }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()
            ),
            H(
              q(t),
              "handleConfirmSubmit",
              T(
                M().mark(function e() {
                  var r, n;
                  return M().wrap(function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (r = { status: t.state.status_changing }),
                            (e.next = 3),
                            (0, x.Q8)(t.props.params.id, r)
                          );
                        case 3:
                          1 == (n = e.sent).data.success
                            ? (t.props.enqueueSnackbar(n.data.message, {
                                variant: "success",
                              }),
                              t.setState({ confirmDialog: !1 }),
                              t.loadViewData(),
                              "complete" == t.state.status_changing &&
                                t.props.navigate(
                                  (0, E.ZA)((0, E.O2)(t.state.auth)) +
                                    "/purchases/create?return_sale=" +
                                    t.props.params.id
                                ))
                            : t.props.enqueueSnackbar(n.data.message, {
                                variant: "error",
                              });
                        case 5:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )
            ),
            H(q(t), "handleConfirmDialogClose", function () {
              t.setState({ confirmDialog: !1 });
            }),
            (t.state = {
              returnSale: t.props.returnSale,
              confirmDialog: !1,
              status_changing: "",
              auth: t.props.auth,
            }),
            (t.isSuperAdmin = (0, E.j5)()),
            (t.isAdmin = (0, E.GJ)()),
            (t.isDistributor = (0, E.JH)()),
            (t.isSalesExecutive = (0, E.ty)()),
            t
          );
        }
        return (
          (t = p),
          (n = [
            {
              key: "getDerivedStateFromProps",
              value: function (e, t) {
                var r = {};
                return (
                  e.returnSale !== t.returnSale &&
                    (r.returnSale = e.returnSale),
                  e.auth !== t.auth && (r.auth = e.auth),
                  r
                );
              },
            },
          ]),
          (r = [
            {
              key: "componentDidMount",
              value: function () {
                this.loadViewData();
              },
            },
            {
              key: "componentDidUpdate",
              value: function (e) {
                this.props.params.id != e.params.id && this.loadViewData();
              },
            },
            {
              key: "render",
              value: function () {
                var e = this,
                  t = this.state.returnSale;
                return (0, z.jsxs)(v.Z, {
                  title: "Return Sale Details",
                  secondary: (0, z.jsxs)(z.Fragment, {
                    children: [
                      t
                        ? (0, z.jsx)(z.Fragment, {
                            children:
                              "pending" == t.status
                                ? (0, z.jsx)(i.Z, {
                                    label: t.status_display,
                                    color: "primary",
                                    className: "approved_status",
                                  })
                                : (0, z.jsx)(z.Fragment, {
                                    children:
                                      "accepted" == t.status ||
                                      "declined" != t.status
                                        ? (0, z.jsx)(i.Z, {
                                            label: t.status_display,
                                            color: "success",
                                            className: "approved_status",
                                          })
                                        : (0, z.jsx)(i.Z, {
                                            label: t.status_display,
                                            color: "error",
                                            className: "approved_status",
                                          }),
                                  }),
                          })
                        : null,
                      "  ",
                      (0, z.jsx)(o.Z, {
                        variant: "contained",
                        onClick: function () {
                          return e.props.navigate(-1);
                        },
                        children: "Back",
                      }),
                    ],
                  }),
                  children: [
                    t
                      ? (0, z.jsxs)(z.Fragment, {
                          children: [
                            (0, z.jsxs)(s.ZP, {
                              container: !0,
                              spacing: 2,
                              className: "loans_view p_view",
                              children: [
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, z.jsx)(l.Z, {
                                    label: "Owner",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: ""
                                      .concat(t.user_name, ", ")
                                      .concat(t.user_mobile),
                                    disabled: !0,
                                    InputProps: {
                                      className: "non_disable_text",
                                    },
                                  }),
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, z.jsx)(l.Z, {
                                    label: "Invoice Number",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: t.invoice_number,
                                    disabled: !0,
                                    InputProps: {
                                      className: "non_disable_text",
                                    },
                                  }),
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, z.jsx)(l.Z, {
                                    label: "Invoice Date",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: t.invoice_date,
                                    disabled: !0,
                                    InputProps: {
                                      className: "non_disable_text",
                                    },
                                  }),
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, z.jsx)(l.Z, {
                                    label: "Return Date",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: t.return_date,
                                    disabled: !0,
                                    InputProps: {
                                      className: "non_disable_text",
                                    },
                                  }),
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, z.jsx)(l.Z, {
                                    label: "Bill Amount",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: t.bill_amount,
                                    disabled: !0,
                                    InputProps: {
                                      className: "non_disable_text",
                                    },
                                  }),
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, z.jsx)(l.Z, {
                                    label: "Total Return",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: t.return_amount,
                                    disabled: !0,
                                    InputProps: {
                                      className: "non_disable_text",
                                    },
                                  }),
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 9,
                                  className: "create-input",
                                }),
                                (0, z.jsx)(s.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 3,
                                  className: "create-input",
                                  children: (0, z.jsx)("div", {
                                    className: "sale-view-button",
                                    children:
                                      this.isSalesExecutive ||
                                      this.isDistributor
                                        ? (0, z.jsx)(z.Fragment, {
                                            children:
                                              "pending" == t.status
                                                ? (0, z.jsx)(o.Z, {
                                                    variant: "contained",
                                                    className: "primary accept",
                                                    onClick: function () {
                                                      return e.handleStatusChange(
                                                        "send_to_superadmin"
                                                      );
                                                    },
                                                    children:
                                                      "Send to Superadmin",
                                                  })
                                                : (0, z.jsx)(z.Fragment, {
                                                    children:
                                                      "superadmin_declined" ==
                                                      t.status
                                                        ? (0, z.jsx)(o.Z, {
                                                            variant:
                                                              "contained",
                                                            className:
                                                              "primary accept",
                                                            onClick:
                                                              function () {
                                                                return e.handleStatusChange(
                                                                  "declined_accept"
                                                                );
                                                              },
                                                            children:
                                                              "Declined Accept",
                                                          })
                                                        : (0, z.jsx)(
                                                            z.Fragment,
                                                            {
                                                              children:
                                                                "declined_accept" ==
                                                                t.status
                                                                  ? (0, z.jsx)(
                                                                      o.Z,
                                                                      {
                                                                        variant:
                                                                          "contained",
                                                                        className:
                                                                          "primary accept",
                                                                        onClick:
                                                                          function () {
                                                                            return e.handleStatusChange(
                                                                              "send_to_customer"
                                                                            );
                                                                          },
                                                                        children:
                                                                          "Send to Customer",
                                                                      }
                                                                    )
                                                                  : null,
                                                            }
                                                          ),
                                                  }),
                                          })
                                        : (0, z.jsx)(z.Fragment, {
                                            children: this.isSuperAdmin
                                              ? (0, z.jsx)(z.Fragment, {
                                                  children:
                                                    t.from_retailer_customer
                                                      ? (0, z.jsx)(z.Fragment, {
                                                          children:
                                                            "send_to_superadmin" ==
                                                            t.status
                                                              ? (0, z.jsxs)(
                                                                  z.Fragment,
                                                                  {
                                                                    children: [
                                                                      (0,
                                                                      z.jsx)(
                                                                        o.Z,
                                                                        {
                                                                          variant:
                                                                            "contained",
                                                                          className:
                                                                            "primary accept",
                                                                          onClick:
                                                                            function () {
                                                                              return e.handleStatusChange(
                                                                                "superadmin_accepted"
                                                                              );
                                                                            },
                                                                          children:
                                                                            "Accept",
                                                                        }
                                                                      ),
                                                                      (0,
                                                                      z.jsx)(
                                                                        o.Z,
                                                                        {
                                                                          variant:
                                                                            "contained",
                                                                          className:
                                                                            "danger decline",
                                                                          onClick:
                                                                            function () {
                                                                              return e.handleStatusChange(
                                                                                "superadmin_declined"
                                                                              );
                                                                            },
                                                                          children:
                                                                            "Decline",
                                                                        }
                                                                      ),
                                                                    ],
                                                                  }
                                                                )
                                                              : (0, z.jsx)(
                                                                  z.Fragment,
                                                                  {
                                                                    children:
                                                                      "superadmin_accepted" ==
                                                                      t.status
                                                                        ? (0,
                                                                          z.jsx)(
                                                                            o.Z,
                                                                            {
                                                                              variant:
                                                                                "contained",
                                                                              className:
                                                                                "primary accept",
                                                                              onClick:
                                                                                function () {
                                                                                  return e.handleStatusChange(
                                                                                    "complete"
                                                                                  );
                                                                                },
                                                                              children:
                                                                                "Purchase",
                                                                            }
                                                                          )
                                                                        : null,
                                                                  }
                                                                ),
                                                        })
                                                      : (0, z.jsx)(z.Fragment, {
                                                          children:
                                                            "pending" ==
                                                            t.status
                                                              ? (0, z.jsxs)(
                                                                  z.Fragment,
                                                                  {
                                                                    children: [
                                                                      (0,
                                                                      z.jsx)(
                                                                        o.Z,
                                                                        {
                                                                          variant:
                                                                            "contained",
                                                                          className:
                                                                            "primary accept",
                                                                          onClick:
                                                                            function () {
                                                                              return e.handleStatusChange(
                                                                                "accepted"
                                                                              );
                                                                            },
                                                                          children:
                                                                            "Accept",
                                                                        }
                                                                      ),
                                                                      (0,
                                                                      z.jsx)(
                                                                        o.Z,
                                                                        {
                                                                          variant:
                                                                            "contained",
                                                                          className:
                                                                            "danger decline",
                                                                          onClick:
                                                                            function () {
                                                                              return e.handleStatusChange(
                                                                                "declined"
                                                                              );
                                                                            },
                                                                          children:
                                                                            "Decline",
                                                                        }
                                                                      ),
                                                                    ],
                                                                  }
                                                                )
                                                              : null,
                                                        }),
                                                })
                                              : (0, z.jsx)(z.Fragment, {
                                                  children:
                                                    "pending" == t.status
                                                      ? (0, z.jsxs)(
                                                          z.Fragment,
                                                          {
                                                            children: [
                                                              (0, z.jsx)(o.Z, {
                                                                variant:
                                                                  "contained",
                                                                className:
                                                                  "primary accept",
                                                                onClick:
                                                                  function () {
                                                                    return e.handleStatusChange(
                                                                      "accepted"
                                                                    );
                                                                  },
                                                                children:
                                                                  "Accept",
                                                              }),
                                                              (0, z.jsx)(o.Z, {
                                                                variant:
                                                                  "contained",
                                                                className:
                                                                  "danger decline",
                                                                onClick:
                                                                  function () {
                                                                    return e.handleStatusChange(
                                                                      "declined"
                                                                    );
                                                                  },
                                                                children:
                                                                  "Decline",
                                                              }),
                                                            ],
                                                          }
                                                        )
                                                      : null,
                                                }),
                                          }),
                                  }),
                                }),
                              ],
                            }),
                            (0, z.jsx)(s.ZP, {
                              container: !0,
                              spacing: m.dv,
                              className:
                                "details-header ratn-pur-wrapper loans_view",
                              children: (0, z.jsxs)(s.ZP, {
                                item: !0,
                                xs: 12,
                                className: "p-add-product create-input",
                                children: [
                                  (0, z.jsx)("h3", {
                                    className: "p_heading_list",
                                    children: "Return Products",
                                  }),
                                  (0, z.jsx)(S.Z, {
                                    component: C.Z,
                                    children: (0, z.jsx)("div", {
                                      className: "ratn-table-purchase-wrapper",
                                      children: (0, z.jsxs)(j.Z, {
                                        "aria-label": "collapsible table",
                                        children: [
                                          (0, z.jsx)(Z.Z, {
                                            className: "ratn-table-header",
                                            children: (0, z.jsxs)(k.Z, {
                                              children: [
                                                (0, z.jsx)(_.Z, {}),
                                                (0, z.jsx)(_.Z, {
                                                  children: "#",
                                                }),
                                                (0, z.jsx)(_.Z, {
                                                  children: "Product Name",
                                                }),
                                                (0, z.jsx)(_.Z, {
                                                  children: "Category Name",
                                                }),
                                                (0, z.jsx)(_.Z, {
                                                  children:
                                                    "Certificate Number",
                                                }),
                                                (0, z.jsx)(_.Z, {
                                                  children: "Size",
                                                }),
                                                (0, z.jsx)(_.Z, {
                                                  children: "Amount",
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, z.jsx)(w.Z, {
                                            children: t.products.map(function (
                                              e,
                                              t
                                            ) {
                                              return (0, z.jsx)(
                                                Q,
                                                { row: e, index: t },
                                                t
                                              );
                                            }),
                                          }),
                                        ],
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        })
                      : (0, z.jsx)(s.ZP, {
                          container: !0,
                          justifyContent: "center",
                          children: (0, z.jsx)(c.Z, {}),
                        }),
                    (0, z.jsxs)(O.Z, {
                      open: this.state.confirmDialog,
                      onClose: this.handleConfirmDialogClose,
                      fullWidth: !0,
                      maxWidth: "xs",
                      className: "ratn-dialog-wrapper",
                      children: [
                        (0, z.jsx)(R.Z, {
                          children: (0, E.gz)(
                            this.state.status_changing.split("_").join(" ")
                          ),
                        }),
                        (0, z.jsx)(D.Z, {
                          children: t
                            ? (0, z.jsx)(F.Z, {
                                id: "alert-dialog-slide-description",
                                children:
                                  "accepted" == this.state.status_changing
                                    ? "Are you sure want to accept this return? Request "
                                        .concat(
                                          t.return_amount_from_wallet,
                                          " amount to "
                                        )
                                        .concat(
                                          t.payment_type,
                                          " by payment mode "
                                        )
                                        .concat(t.return_payment_mode, ".")
                                    : (0, z.jsx)(z.Fragment, {
                                        children:
                                          "declined" ==
                                          this.state.status_changing
                                            ? "Are you sure want to decline this return? Request "
                                                .concat(
                                                  t.return_amount_from_wallet,
                                                  " amount to "
                                                )
                                                .concat(t.payment_type, ".")
                                            : "Are you sure want to ".concat(
                                                (0, E.gz)(
                                                  this.state.status_changing
                                                    .split("_")
                                                    .join(" ")
                                                ),
                                                " this return?"
                                              ),
                                      }),
                              })
                            : null,
                        }),
                        (0, z.jsx)(L.Z, {
                          children: (0, z.jsxs)(u.Z, {
                            spacing: 2,
                            direction: "row",
                            justifyContent: "flex-end",
                            children: [
                              (0, z.jsx)(o.Z, {
                                variant: "outlined",
                                onClick: this.handleConfirmDialogClose,
                                children: "Cancel",
                              }),
                              (0, z.jsx)(o.Z, {
                                variant: "contained",
                                type: "button",
                                onClick: this.handleConfirmSubmit,
                                children: "Yes, Confirm",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                });
              },
            },
          ]) && B(t.prototype, r),
          n && B(t, n),
          Object.defineProperty(t, "prototype", { writable: !1 }),
          p
        );
      })(n.Component);
      function Q(e) {
        var t,
          r,
          a = e.row,
          i = e.index,
          o =
            ((t = n.useState(!1)),
            (r = 2),
            (function (e) {
              if (Array.isArray(e)) return e;
            })(t) ||
              (function (e, t) {
                var r =
                  null == e
                    ? null
                    : ("undefined" != typeof Symbol && e[Symbol.iterator]) ||
                      e["@@iterator"];
                if (null != r) {
                  var n,
                    a,
                    i = [],
                    o = !0,
                    s = !1;
                  try {
                    for (
                      r = r.call(e);
                      !(o = (n = r.next()).done) &&
                      (i.push(n.value), !t || i.length !== t);
                      o = !0
                    );
                  } catch (e) {
                    (s = !0), (a = e);
                  } finally {
                    try {
                      o || null == r.return || r.return();
                    } finally {
                      if (s) throw a;
                    }
                  }
                  return i;
                }
              })(t, r) ||
              (function (e, t) {
                if (e) {
                  if ("string" == typeof e) return I(e, t);
                  var r = Object.prototype.toString.call(e).slice(8, -1);
                  return (
                    "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r
                      ? Array.from(e)
                      : "Arguments" === r ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                      ? I(e, t)
                      : void 0
                  );
                }
              })(t, r) ||
              (function () {
                throw new TypeError(
                  "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
                );
              })()),
          s = o[0],
          c = o[1],
          l = i + 1,
          u = l % 2 == 0 ? "even" : "odd";
        return (0, z.jsxs)(n.Fragment, {
          children: [
            (0, z.jsxs)(k.Z, {
              sx: { "& > *": { borderBottom: "unset" } },
              className: u,
              children: [
                (0, z.jsx)(_.Z, {
                  children: (0, z.jsx)(d.Z, {
                    "aria-label": "expand row",
                    size: "small",
                    onClick: function () {
                      return c(!s);
                    },
                    children: s ? (0, z.jsx)(P.Z, {}) : (0, z.jsx)(N.Z, {}),
                  }),
                }),
                (0, z.jsx)(_.Z, {
                  component: "th",
                  scope: "row",
                  children: l <= 9 ? "0" + l : l,
                }),
                (0, z.jsx)(_.Z, {
                  component: "th",
                  scope: "row",
                  children: a.product_name,
                }),
                (0, z.jsx)(_.Z, { children: a.category_name }),
                (0, z.jsx)(_.Z, { children: a.certificate_no }),
                (0, z.jsx)(_.Z, { children: a.size_name }),
                (0, z.jsx)(_.Z, { children: a.sub_total }),
              ],
            }),
            (0, z.jsx)(k.Z, {
              className: "table-inner-row sub_table " + u,
              children: (0, z.jsx)(_.Z, {
                style: { paddingBottom: 0, paddingTop: 0 },
                colSpan: 11,
                children: (0, z.jsx)(h.Z, {
                  in: s,
                  timeout: "auto",
                  unmountOnExit: !0,
                  children: (0, z.jsxs)(p.Z, {
                    sx: { margin: 1 },
                    children: [
                      (0, z.jsx)(f.Z, {
                        variant: "h6",
                        gutterBottom: !0,
                        component: "div",
                      }),
                      (0, z.jsxs)(j.Z, {
                        size: "medium",
                        "aria-label": "purchases",
                        children: [
                          (0, z.jsx)(Z.Z, {
                            children: (0, z.jsxs)(k.Z, {
                              className: "pur-details-inner-table",
                              children: [
                                (0, z.jsx)(_.Z, { children: "Material Name" }),
                                (0, z.jsx)(_.Z, { children: "Purity" }),
                                (0, z.jsx)(_.Z, { children: "Quantity" }),
                                (0, z.jsx)(_.Z, { children: "Weight" }),
                                (0, z.jsx)(_.Z, { children: "Unit" }),
                              ],
                            }),
                          }),
                          (0, z.jsx)(w.Z, {
                            className: "pur-details-table-body",
                            children: a.materials.map(function (e, t) {
                              return (0,
                              z.jsxs)(k.Z, { children: [(0, z.jsx)(_.Z, { component: "th", scope: "row", children: e.material_name }), (0, z.jsx)(_.Z, { children: e.purity_name }), (0, z.jsx)(_.Z, { children: e.quantity }), (0, z.jsx)(_.Z, { children: e.weight }), (0, z.jsx)(_.Z, { children: e.unit_name })] }, t);
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              }),
            }),
          ],
        });
      }
      t.default = (0, g.RM)(
        (0, y.Z)(
          (0, a.connect)(
            function (e) {
              return {
                returnSale: e.superadmin.returnSale.returnSale,
                auth: e.auth,
              };
            },
            function (e) {
              return {
                dispatch: e,
                actions: (0, b.bindActionCreators)({ returnSaleView: x.rH }, e),
              };
            }
          )(U)
        )
      );
    },
  },
]);
