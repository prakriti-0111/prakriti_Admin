/*! For license information please see 5849.js.LICENSE.txt */
(self.webpackChunk = self.webpackChunk || []).push([
  [5849],
  {
    91434: function (t, e, n) {
      "use strict";
      var a = n(73203);
      e.Z = void 0;
      var r = a(n(19124)),
        s = n(24246),
        i = (0, r.default)(
          (0, s.jsx)("path", {
            d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
          }),
          "ArrowBack"
        );
      e.Z = i;
    },
    52522: function (t, e, n) {
      "use strict";
      var a = n(73203);
      e.Z = void 0;
      var r = a(n(19124)),
        s = n(24246),
        i = (0, r.default)(
          (0, s.jsx)("path", {
            d: "M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z",
          }),
          "CloudUpload"
        );
      e.Z = i;
    },
    35491: function (t, e, n) {
      "use strict";
      var a = n(73203);
      e.Z = void 0;
      var r = a(n(19124)),
        s = n(24246),
        i = (0, r.default)(
          (0, s.jsx)("path", {
            d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z",
          }),
          "KeyboardArrowDown"
        );
      e.Z = i;
    },
    1743: function (t, e, n) {
      "use strict";
      var a = n(73203);
      e.Z = void 0;
      var r = a(n(19124)),
        s = n(24246),
        i = (0, r.default)(
          (0, s.jsx)("path", {
            d: "M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z",
          }),
          "KeyboardArrowUp"
        );
      e.Z = i;
    },
    33204: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z: function () {
          return f;
        },
      });
      var a = n(25773),
        r = n(30808),
        s = n(27378),
        i = n(38944),
        o = n(82267),
        c = n(67018),
        u = n(76112),
        l = n(6749);
      function d(t) {
        return (0, l.Z)("MuiAccordionDetails", t);
      }
      (0, n(44124).Z)("MuiAccordionDetails", ["root"]);
      var p = n(24246);
      const m = ["className"],
        h = (0, c.ZP)("div", {
          name: "MuiAccordionDetails",
          slot: "Root",
          overridesResolver: (t, e) => e.root,
        })(({ theme: t }) => ({ padding: t.spacing(1, 2, 2) }));
      var f = s.forwardRef(function (t, e) {
        const n = (0, u.Z)({ props: t, name: "MuiAccordionDetails" }),
          { className: s } = n,
          c = (0, r.Z)(n, m),
          l = n,
          f = ((t) => {
            const { classes: e } = t;
            return (0, o.Z)({ root: ["root"] }, d, e);
          })(l);
        return (0,
        p.jsx)(h, (0, a.Z)({ className: (0, i.Z)(f.root, s), ref: e, ownerState: l }, c));
      });
    },
    76410: function (t, e, n) {
      "use strict";
      n.d(e, {
        Z: function () {
          return F;
        },
      });
      var a = n(30808),
        r = n(25773),
        s = n(27378),
        i = n(38944),
        o = n(82267),
        c = n(7818),
        u = n(67018),
        l = n(76112),
        d = n(89090),
        p = n(19265),
        m = n(6749);
      function h(t) {
        return (0, m.Z)("MuiAlert", t);
      }
      var f,
        x = (0, n(44124).Z)("MuiAlert", [
          "root",
          "action",
          "icon",
          "message",
          "filled",
          "filledSuccess",
          "filledInfo",
          "filledWarning",
          "filledError",
          "outlined",
          "outlinedSuccess",
          "outlinedInfo",
          "outlinedWarning",
          "outlinedError",
          "standard",
          "standardSuccess",
          "standardInfo",
          "standardWarning",
          "standardError",
        ]),
        _ = n(52359),
        g = n(17849),
        y = n(24246),
        v = (0, g.Z)(
          (0, y.jsx)("path", {
            d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
          }),
          "SuccessOutlined"
        ),
        j = (0, g.Z)(
          (0, y.jsx)("path", {
            d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z",
          }),
          "ReportProblemOutlined"
        ),
        Z = (0, g.Z)(
          (0, y.jsx)("path", {
            d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
          }),
          "ErrorOutline"
        ),
        b = (0, g.Z)(
          (0, y.jsx)("path", {
            d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z",
          }),
          "InfoOutlined"
        ),
        P = n(57699);
      const w = [
          "action",
          "children",
          "className",
          "closeText",
          "color",
          "icon",
          "iconMapping",
          "onClose",
          "role",
          "severity",
          "variant",
        ],
        N = (0, u.ZP)(p.Z, {
          name: "MuiAlert",
          slot: "Root",
          overridesResolver: (t, e) => {
            const { ownerState: n } = t;
            return [
              e.root,
              e[n.variant],
              e[`${n.variant}${(0, d.Z)(n.color || n.severity)}`],
            ];
          },
        })(({ theme: t, ownerState: e }) => {
          const n = "light" === t.palette.mode ? c._j : c.$n,
            a = "light" === t.palette.mode ? c.$n : c._j,
            s = e.color || e.severity;
          return (0, r.Z)(
            {},
            t.typography.body2,
            {
              backgroundColor: "transparent",
              display: "flex",
              padding: "6px 16px",
            },
            s &&
              "standard" === e.variant && {
                color: t.vars
                  ? t.vars.palette.Alert[`${s}Color`]
                  : n(t.palette[s].light, 0.6),
                backgroundColor: t.vars
                  ? t.vars.palette.Alert[`${s}StandardBg`]
                  : a(t.palette[s].light, 0.9),
                [`& .${x.icon}`]: t.vars
                  ? { color: t.vars.palette.Alert[`${s}IconColor`] }
                  : {
                      color:
                        "dark" === t.palette.mode
                          ? t.palette[s].main
                          : t.palette[s].light,
                    },
              },
            s &&
              "outlined" === e.variant && {
                color: t.vars
                  ? t.vars.palette.Alert[`${s}Color`]
                  : n(t.palette[s].light, 0.6),
                border: `1px solid ${(t.vars || t).palette[s].light}`,
                [`& .${x.icon}`]: t.vars
                  ? { color: t.vars.palette.Alert[`${s}IconColor`] }
                  : {
                      color:
                        "dark" === t.palette.mode
                          ? t.palette[s].main
                          : t.palette[s].light,
                    },
              },
            s &&
              "filled" === e.variant &&
              (0, r.Z)(
                { fontWeight: t.typography.fontWeightMedium },
                t.vars
                  ? {
                      color: t.vars.palette.Alert[`${s}FilledColor`],
                      backgroundColor: t.vars.palette.Alert[`${s}FilledBg`],
                    }
                  : {
                      backgroundColor:
                        "dark" === t.palette.mode
                          ? t.palette[s].dark
                          : t.palette[s].main,
                      color: t.palette.getContrastText(
                        "dark" === t.palette.mode
                          ? t.palette[s].dark
                          : t.palette[s].main
                      ),
                    }
              )
          );
        }),
        k = (0, u.ZP)("div", {
          name: "MuiAlert",
          slot: "Icon",
          overridesResolver: (t, e) => e.icon,
        })({
          marginRight: 12,
          padding: "7px 0",
          display: "flex",
          fontSize: 22,
          opacity: 0.9,
        }),
        C = (0, u.ZP)("div", {
          name: "MuiAlert",
          slot: "Message",
          overridesResolver: (t, e) => e.message,
        })({ padding: "8px 0", minWidth: 0, overflow: "auto" }),
        S = (0, u.ZP)("div", {
          name: "MuiAlert",
          slot: "Action",
          overridesResolver: (t, e) => e.action,
        })({
          display: "flex",
          alignItems: "flex-start",
          padding: "4px 0 0 16px",
          marginLeft: "auto",
          marginRight: -8,
        }),
        L = {
          success: (0, y.jsx)(v, { fontSize: "inherit" }),
          warning: (0, y.jsx)(j, { fontSize: "inherit" }),
          error: (0, y.jsx)(Z, { fontSize: "inherit" }),
          info: (0, y.jsx)(b, { fontSize: "inherit" }),
        };
      var F = s.forwardRef(function (t, e) {
        const n = (0, l.Z)({ props: t, name: "MuiAlert" }),
          {
            action: s,
            children: c,
            className: u,
            closeText: p = "Close",
            color: m,
            icon: x,
            iconMapping: g = L,
            onClose: v,
            role: j = "alert",
            severity: Z = "success",
            variant: b = "standard",
          } = n,
          F = (0, a.Z)(n, w),
          A = (0, r.Z)({}, n, { color: m, severity: Z, variant: b }),
          D = ((t) => {
            const { variant: e, color: n, severity: a, classes: r } = t,
              s = {
                root: ["root", `${e}${(0, d.Z)(n || a)}`, `${e}`],
                icon: ["icon"],
                message: ["message"],
                action: ["action"],
              };
            return (0, o.Z)(s, h, r);
          })(A);
        return (0,
        y.jsxs)(N, (0, r.Z)({ role: j, elevation: 0, ownerState: A, className: (0, i.Z)(D.root, u), ref: e }, F, { children: [!1 !== x ? (0, y.jsx)(k, { ownerState: A, className: D.icon, children: x || g[Z] || L[Z] }) : null, (0, y.jsx)(C, { ownerState: A, className: D.message, children: c }), null != s ? (0, y.jsx)(S, { ownerState: A, className: D.action, children: s }) : null, null == s && v ? (0, y.jsx)(S, { ownerState: A, className: D.action, children: (0, y.jsx)(_.Z, { size: "small", "aria-label": p, title: p, color: "inherit", onClick: v, children: f || (f = (0, y.jsx)(P.Z, { fontSize: "small" })) }) }) : null] }));
      });
    },
    55513: function (t, e, n) {
      "use strict";
      n.d(e, {
        $P: function () {
          return l;
        },
        $t: function () {
          return u;
        },
        N0: function () {
          return i;
        },
        ds: function () {
          return c;
        },
        uf: function () {
          return o;
        },
      });
      var a = n(69222),
        r = n(98701),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/admin".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.RX, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/admin/store", t)
              .then(function (t) {
                e({ type: r.gq, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (e) {
            a.Z.get("/superadmin/admin/fetch/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.UY, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/admin/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.V5, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/admin/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.cW, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    40372: function (t, e, n) {
      "use strict";
      n.d(e, {
        ab: function () {
          return o;
        },
        lI: function () {
          return u;
        },
        wA: function () {
          return i;
        },
        y1: function () {
          return c;
        },
      });
      var a = n(69222),
        r = n(84917),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/categories".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.Ah, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/categories/store", t)
              .then(function (t) {
                e({ type: r.hq, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/categories/update/".concat(t), e)
              .then(function (t) {
                n({ type: r._o, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/categories/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.Dq, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    24761: function (t, e, n) {
      "use strict";
      n.d(e, {
        SG: function () {
          return o;
        },
        Wr: function () {
          return l;
        },
        gy: function () {
          return c;
        },
        pi: function () {
          return u;
        },
        zP: function () {
          return i;
        },
      });
      var a = n(69222),
        r = n(53743),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/distributors".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.TJ, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/distributors/store", t)
              .then(function (t) {
                e({ type: r.pn, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (e) {
            a.Z.get("/superadmin/distributors/fetch/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.N4, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/distributors/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.Ri, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/distributors/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r._v, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    84200: function (t, e, n) {
      "use strict";
      n.d(e, {
        BQ: function () {
          return c;
        },
        hV: function () {
          return o;
        },
        kI: function () {
          return u;
        },
        ll: function () {
          return i;
        },
        vR: function () {
          return l;
        },
      });
      var a = n(69222),
        r = n(53159),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/employees".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.qH, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/employees/store", t)
              .then(function (t) {
                e({ type: r.I0, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t, e) {
          return (
            (e = e || ""),
            function (n) {
              a.Z.get(
                "/superadmin/employees/fetch/".concat(t, "?role_id=").concat(e)
              )
                .then(function (t) {
                  t.data.success && n({ type: r.Bv, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        u = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/employees/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.cU, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/employees/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.$6, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    70228: function (t, e, n) {
      "use strict";
      n.d(e, {
        aq: function () {
          return u;
        },
        gf: function () {
          return o;
        },
        jD: function () {
          return i;
        },
        oH: function () {
          return d;
        },
        qX: function () {
          return c;
        },
        zZ: function () {
          return l;
        },
      });
      var a = n(69222),
        r = n(58996),
        s = n(57446),
        i = function (t) {
          return function (e) {
            a.Z.post("/superadmin/material-prices/store", t)
              .then(function (t) {
                e({ type: r.lC, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        o = function (t) {
          return function (e) {
            a.Z.get("/superadmin/material-prices/view/".concat(t))
              .then(function (t) {
                console.log(t.data.data),
                  t.data.success && e({ type: r.He, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/material-prices/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.G$, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/material-prices/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.BG, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.get(
              "/superadmin/material-prices/product-price-details/".concat(t),
              e
            )
              .then(function (t) {
                n({ type: r.r6, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        d = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            a.Z.get("/superadmin/material-prices".concat(t))
          );
        };
    },
    14365: function (t, e, n) {
      "use strict";
      n.d(e, {
        $G: function () {
          return p;
        },
        AW: function () {
          return u;
        },
        Id: function () {
          return o;
        },
        QN: function () {
          return i;
        },
        _c: function () {
          return c;
        },
        bE: function () {
          return l;
        },
        xo: function () {
          return d;
        },
      });
      var a = n(69222),
        r = n(22859),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/orders".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.Yn, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.get("/superadmin/orders/fetch/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.cd, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return a.Z.get("/superadmin/orders/fetch/".concat(t));
        },
        u = function (t) {
          return (
            (t = (0, s.B7)(t, !0)), a.Z.get("/superadmin/user-list".concat(t))
          );
        },
        l = function (t, e) {
          return a.Z.post("/superadmin/orders/update-status/".concat(t), e);
        },
        d = function (t, e) {
          return a.Z.post("/superadmin/orders/sale-proceed/".concat(t), e);
        },
        p = function (t) {
          return a.Z.post("/superadmin/orders/update-products", t);
        };
    },
    4497: function (t, e, n) {
      "use strict";
      n.d(e, {
        BP: function () {
          return o;
        },
        F6: function () {
          return d;
        },
        G_: function () {
          return u;
        },
        Ob: function () {
          return l;
        },
        Uu: function () {
          return i;
        },
        nh: function () {
          return c;
        },
      });
      var a = n(69222),
        r = n(11134),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/product".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.f$, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (t) {
              a.Z.get("/superadmin/product/create")
                .then(function (e) {
                  e.data.success && t({ type: r.l9, payload: e.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        c = function (t) {
          return function (e) {
            a.Z.post("/superadmin/product/store", t)
              .then(function (t) {
                e({ type: r.zN, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t) {
          return function (e) {
            a.Z.get("/superadmin/product/view/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.N4, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/product/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.Q7, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        d = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/product/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.u7, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    55569: function (t, e, n) {
      "use strict";
      n.d(e, {
        Ai: function () {
          return s;
        },
        Cp: function () {
          return o;
        },
        DR: function () {
          return u;
        },
        K9: function () {
          return i;
        },
        ZS: function () {
          return c;
        },
        a6: function () {
          return l;
        },
      });
      var a = n(69222),
        r = n(25113),
        s = function () {
          return a.Z.get("/superadmin/profile");
        },
        i = function (t) {
          return function (e) {
            a.Z.post("/superadmin/edit-profile", t)
              .then(function (t) {
                e({ type: r.h6, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/change-password", t)
              .then(function (t) {
                e({ type: r.P7, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (t) {
            a.Z.get("/superadmin/dashboard")
              .then(function (e) {
                t({ type: r.c$, payload: e.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t) {
          return function (t) {
            a.Z.get("/superadmin/auto-notifications")
              .then(function (t) {})
              .catch(function (t) {});
          };
        },
        l = function (t) {
          return a.Z.get("/superadmin/next-user-name?role=".concat(t));
        };
    },
    26270: function (t, e, n) {
      "use strict";
      n.d(e, {
        Ad: function () {
          return i;
        },
        CZ: function () {
          return h;
        },
        L5: function () {
          return c;
        },
        TX: function () {
          return u;
        },
        Vi: function () {
          return p;
        },
        cd: function () {
          return d;
        },
        fC: function () {
          return o;
        },
        ol: function () {
          return l;
        },
        rw: function () {
          return m;
        },
      });
      var a = n(69222),
        r = n(50180),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/retailers".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.Mz, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/retailers/store", t)
              .then(function (t) {
                e({ type: r.IX, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (e) {
            a.Z.get("/superadmin/retailers/fetch/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.$I, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/retailers/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.M2, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/retailers/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.sn, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        d = function (t) {
          return function (e) {
            a.Z.post("/superadmin/retailers/reviews/store", t)
              .then(function (t) {
                e({ type: r.IX, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        p = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/retailers/reviews".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.xK, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        m = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/retailers/review/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.M2, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        h = function (t, e) {
          return a.Z.get("/superadmin/retailers/my-review/".concat(t));
        };
    },
    23880: function (t, e, n) {
      "use strict";
      n.d(e, {
        Bp: function () {
          return h;
        },
        CX: function () {
          return f;
        },
        DZ: function () {
          return l;
        },
        IO: function () {
          return p;
        },
        Je: function () {
          return x;
        },
        LR: function () {
          return d;
        },
        d: function () {
          return c;
        },
        dv: function () {
          return u;
        },
        iM: function () {
          return _;
        },
        rr: function () {
          return o;
        },
        u: function () {
          return i;
        },
        v9: function () {
          return m;
        },
      });
      var a = n(69222),
        r = n(10772),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/sales".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r._u, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/sales/store", t)
              .then(function (t) {
                e({ type: r.N0, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (e) {
            a.Z.get("/superadmin/sales/view/".concat(t))
              .then(function (t) {
                console.log(t.data.data),
                  t.data.success && e({ type: r.Uz, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return a.Z.post("/superadmin/sales-on-approve/status/".concat(t), e);
        },
        l = function (t) {
          return function (e) {
            a.Z.get("/superadmin/sales/edit/".concat(t))
              .then(function (t) {
                console.log(t.data.data),
                  t.data.success && e({ type: r.Uz, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        d = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/sales/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.f_, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        p = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/sales/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.xg, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        m = function (t) {
          return a.Z.post("/superadmin/sales/download-invoice/".concat(t));
        },
        h = function (t) {
          return a.Z.get("/superadmin/sales/view/".concat(t));
        },
        f = function (t, e) {
          return a.Z.post("/superadmin/sales/return/".concat(t), e);
        },
        x = function (t) {
          return a.Z.post("/superadmin/sales/return-stock-transfer", t);
        },
        _ = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            a.Z.get("/superadmin/sales-products".concat(t))
          );
        };
    },
    70004: function (t, e, n) {
      "use strict";
      n.d(e, {
        AW: function () {
          return l;
        },
        CV: function () {
          return c;
        },
        IV: function () {
          return o;
        },
        _7: function () {
          return u;
        },
        cT: function () {
          return i;
        },
      });
      var a = n(69222),
        r = n(99351),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/employees".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.z4, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/employees/store", t)
              .then(function (t) {
                e({ type: r.T1, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (e) {
            a.Z.get("/superadmin/employees/fetch/".concat(t, "?role_id=4"))
              .then(function (t) {
                t.data.success && e({ type: r.aB, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/employees/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.Bb, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/employees/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.tf, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    62386: function (t, e, n) {
      "use strict";
      n.d(e, {
        Db: function () {
          return p;
        },
        Fc: function () {
          return f;
        },
        GF: function () {
          return m;
        },
        Nn: function () {
          return d;
        },
        fF: function () {
          return h;
        },
        gR: function () {
          return l;
        },
        i7: function () {
          return x;
        },
        zr: function () {
          return _;
        },
      });
      var a = n(69222),
        r = n(17937),
        s = n(57446);
      function i(t) {
        return (
          (i =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          i(t)
        );
      }
      function o() {
        o = function () {
          return t;
        };
        var t = {},
          e = Object.prototype,
          n = e.hasOwnProperty,
          a = "function" == typeof Symbol ? Symbol : {},
          r = a.iterator || "@@iterator",
          s = a.asyncIterator || "@@asyncIterator",
          c = a.toStringTag || "@@toStringTag";
        function u(t, e, n) {
          return (
            Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[e]
          );
        }
        try {
          u({}, "");
        } catch (t) {
          u = function (t, e, n) {
            return (t[e] = n);
          };
        }
        function l(t, e, n, a) {
          var r = e && e.prototype instanceof m ? e : m,
            s = Object.create(r.prototype),
            i = new w(a || []);
          return (
            (s._invoke = (function (t, e, n) {
              var a = "suspendedStart";
              return function (r, s) {
                if ("executing" === a)
                  throw new Error("Generator is already running");
                if ("completed" === a) {
                  if ("throw" === r) throw s;
                  return { value: void 0, done: !0 };
                }
                for (n.method = r, n.arg = s; ; ) {
                  var i = n.delegate;
                  if (i) {
                    var o = Z(i, n);
                    if (o) {
                      if (o === p) continue;
                      return o;
                    }
                  }
                  if ("next" === n.method) n.sent = n._sent = n.arg;
                  else if ("throw" === n.method) {
                    if ("suspendedStart" === a)
                      throw ((a = "completed"), n.arg);
                    n.dispatchException(n.arg);
                  } else "return" === n.method && n.abrupt("return", n.arg);
                  a = "executing";
                  var c = d(t, e, n);
                  if ("normal" === c.type) {
                    if (
                      ((a = n.done ? "completed" : "suspendedYield"),
                      c.arg === p)
                    )
                      continue;
                    return { value: c.arg, done: n.done };
                  }
                  "throw" === c.type &&
                    ((a = "completed"), (n.method = "throw"), (n.arg = c.arg));
                }
              };
            })(t, n, i)),
            s
          );
        }
        function d(t, e, n) {
          try {
            return { type: "normal", arg: t.call(e, n) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        t.wrap = l;
        var p = {};
        function m() {}
        function h() {}
        function f() {}
        var x = {};
        u(x, r, function () {
          return this;
        });
        var _ = Object.getPrototypeOf,
          g = _ && _(_(N([])));
        g && g !== e && n.call(g, r) && (x = g);
        var y = (f.prototype = m.prototype = Object.create(x));
        function v(t) {
          ["next", "throw", "return"].forEach(function (e) {
            u(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function j(t, e) {
          function a(r, s, o, c) {
            var u = d(t[r], t, s);
            if ("throw" !== u.type) {
              var l = u.arg,
                p = l.value;
              return p && "object" == i(p) && n.call(p, "__await")
                ? e.resolve(p.__await).then(
                    function (t) {
                      a("next", t, o, c);
                    },
                    function (t) {
                      a("throw", t, o, c);
                    }
                  )
                : e.resolve(p).then(
                    function (t) {
                      (l.value = t), o(l);
                    },
                    function (t) {
                      return a("throw", t, o, c);
                    }
                  );
            }
            c(u.arg);
          }
          var r;
          this._invoke = function (t, n) {
            function s() {
              return new e(function (e, r) {
                a(t, n, e, r);
              });
            }
            return (r = r ? r.then(s, s) : s());
          };
        }
        function Z(t, e) {
          var n = t.iterator[e.method];
          if (void 0 === n) {
            if (((e.delegate = null), "throw" === e.method)) {
              if (
                t.iterator.return &&
                ((e.method = "return"),
                (e.arg = void 0),
                Z(t, e),
                "throw" === e.method)
              )
                return p;
              (e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return p;
          }
          var a = d(n, t.iterator, e.arg);
          if ("throw" === a.type)
            return (
              (e.method = "throw"), (e.arg = a.arg), (e.delegate = null), p
            );
          var r = a.arg;
          return r
            ? r.done
              ? ((e[t.resultName] = r.value),
                (e.next = t.nextLoc),
                "return" !== e.method &&
                  ((e.method = "next"), (e.arg = void 0)),
                (e.delegate = null),
                p)
              : r
            : ((e.method = "throw"),
              (e.arg = new TypeError("iterator result is not an object")),
              (e.delegate = null),
              p);
        }
        function b(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function P(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function w(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(b, this),
            this.reset(!0);
        }
        function N(t) {
          if (t) {
            var e = t[r];
            if (e) return e.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var a = -1,
                s = function e() {
                  for (; ++a < t.length; )
                    if (n.call(t, a)) return (e.value = t[a]), (e.done = !1), e;
                  return (e.value = void 0), (e.done = !0), e;
                };
              return (s.next = s);
            }
          }
          return { next: k };
        }
        function k() {
          return { value: void 0, done: !0 };
        }
        return (
          (h.prototype = f),
          u(y, "constructor", f),
          u(f, "constructor", h),
          (h.displayName = u(f, c, "GeneratorFunction")),
          (t.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return (
              !!e &&
              (e === h || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (t.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, f)
                : ((t.__proto__ = f), u(t, c, "GeneratorFunction")),
              (t.prototype = Object.create(y)),
              t
            );
          }),
          (t.awrap = function (t) {
            return { __await: t };
          }),
          v(j.prototype),
          u(j.prototype, s, function () {
            return this;
          }),
          (t.AsyncIterator = j),
          (t.async = function (e, n, a, r, s) {
            void 0 === s && (s = Promise);
            var i = new j(l(e, n, a, r), s);
            return t.isGeneratorFunction(n)
              ? i
              : i.next().then(function (t) {
                  return t.done ? t.value : i.next();
                });
          }),
          v(y),
          u(y, c, "Generator"),
          u(y, r, function () {
            return this;
          }),
          u(y, "toString", function () {
            return "[object Generator]";
          }),
          (t.keys = function (t) {
            var e = [];
            for (var n in t) e.push(n);
            return (
              e.reverse(),
              function n() {
                for (; e.length; ) {
                  var a = e.pop();
                  if (a in t) return (n.value = a), (n.done = !1), n;
                }
                return (n.done = !0), n;
              }
            );
          }),
          (t.values = N),
          (w.prototype = {
            constructor: w,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(P),
                !t)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    n.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = void 0);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (t) {
              if (this.done) throw t;
              var e = this;
              function a(n, a) {
                return (
                  (i.type = "throw"),
                  (i.arg = t),
                  (e.next = n),
                  a && ((e.method = "next"), (e.arg = void 0)),
                  !!a
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var s = this.tryEntries[r],
                  i = s.completion;
                if ("root" === s.tryLoc) return a("end");
                if (s.tryLoc <= this.prev) {
                  var o = n.call(s, "catchLoc"),
                    c = n.call(s, "finallyLoc");
                  if (o && c) {
                    if (this.prev < s.catchLoc) return a(s.catchLoc, !0);
                    if (this.prev < s.finallyLoc) return a(s.finallyLoc);
                  } else if (o) {
                    if (this.prev < s.catchLoc) return a(s.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < s.finallyLoc) return a(s.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                var r = this.tryEntries[a];
                if (
                  r.tryLoc <= this.prev &&
                  n.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var s = r;
                  break;
                }
              }
              s &&
                ("break" === t || "continue" === t) &&
                s.tryLoc <= e &&
                e <= s.finallyLoc &&
                (s = null);
              var i = s ? s.completion : {};
              return (
                (i.type = t),
                (i.arg = e),
                s
                  ? ((this.method = "next"), (this.next = s.finallyLoc), p)
                  : this.complete(i)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                p
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.finallyLoc === t)
                  return this.complete(n.completion, n.afterLoc), P(n), p;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc === t) {
                  var a = n.completion;
                  if ("throw" === a.type) {
                    var r = a.arg;
                    P(n);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (t, e, n) {
              return (
                (this.delegate = { iterator: N(t), resultName: e, nextLoc: n }),
                "next" === this.method && (this.arg = void 0),
                p
              );
            },
          }),
          t
        );
      }
      function c(t, e, n, a, r, s, i) {
        try {
          var o = t[s](i),
            c = o.value;
        } catch (t) {
          return void n(t);
        }
        o.done ? e(c) : Promise.resolve(c).then(a, r);
      }
      function u(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (a, r) {
            var s = t.apply(e, n);
            function i(t) {
              c(s, a, r, i, o, "next", t);
            }
            function o(t) {
              c(s, a, r, i, o, "throw", t);
            }
            i(void 0);
          });
        };
      }
      var l = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/stocks".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.VR, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        d = function (t) {
          return function (e) {
            a.Z.get("/superadmin/stocks/view/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.Uy, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        p = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/stocks/products".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.FR, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        m = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/stocks/product-details".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.W4, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        h = (function () {
          var t = u(
            o().mark(function t(e) {
              return o().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2),
                        a.Z.post(
                          "/superadmin/stocks/check-certificate-exist",
                          e
                        )
                      );
                    case 2:
                      return t.abrupt("return", t.sent);
                    case 3:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })(),
        f = (function () {
          var t = u(
            o().mark(function t(e) {
              return o().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (e = (0, s.B7)(e, !0)),
                        (t.next = 3),
                        a.Z.get(
                          "/superadmin/stocks/stock-price-by-category".concat(e)
                        )
                      );
                    case 3:
                      return t.abrupt("return", t.sent);
                    case 4:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })(),
        x = (function () {
          var t = u(
            o().mark(function t(e) {
              return o().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (e = (0, s.B7)(e, !0)),
                        (t.next = 3),
                        a.Z.get("/superadmin/cart/checkdetail".concat(e))
                      );
                    case 3:
                      return t.abrupt("return", t.sent);
                    case 4:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })(),
        _ = (function () {
          var t = u(
            o().mark(function t(e) {
              return o().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      return (
                        (t.next = 2),
                        a.Z.post(
                          "/superadmin/stocks/return-stock/move-to-stock",
                          e
                        )
                      );
                    case 2:
                      return t.abrupt("return", t.sent);
                    case 3:
                    case "end":
                      return t.stop();
                  }
              }, t);
            })
          );
          return function (e) {
            return t.apply(this, arguments);
          };
        })();
    },
    45747: function (t, e, n) {
      "use strict";
      n.d(e, {
        Jg: function () {
          return c;
        },
        NM: function () {
          return i;
        },
        k8: function () {
          return l;
        },
        ks: function () {
          return o;
        },
        qg: function () {
          return u;
        },
      });
      var a = n(69222),
        r = n(84286),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/sub-categories".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.tx, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/sub-categories/store", t)
              .then(function (t) {
                e({ type: r.p0, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/sub-categories/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.LG, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/sub-categories/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.fV, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            a.Z.get("/superadmin/sub-categories".concat(t))
          );
        };
    },
    69267: function (t, e, n) {
      "use strict";
      n.d(e, {
        $$: function () {
          return u;
        },
        ED: function () {
          return i;
        },
        _K: function () {
          return o;
        },
        bW: function () {
          return l;
        },
        r6: function () {
          return c;
        },
      });
      var a = n(69222),
        r = n(79541),
        s = n(57446),
        i = function (t) {
          return (
            (t = (0, s.B7)(t, !0)),
            function (e) {
              a.Z.get("/superadmin/suppliers".concat(t))
                .then(function (t) {
                  t.data.success && e({ type: r.Pc, payload: t.data.data });
                })
                .catch(function (t) {});
            }
          );
        },
        o = function (t) {
          return function (e) {
            a.Z.post("/superadmin/suppliers/store", t)
              .then(function (t) {
                e({ type: r.v8, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        c = function (t) {
          return function (e) {
            a.Z.get("/superadmin/suppliers/fetch/".concat(t))
              .then(function (t) {
                t.data.success && e({ type: r.IW, payload: t.data.data });
              })
              .catch(function (t) {});
          };
        },
        u = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/suppliers/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.hK, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        l = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/suppliers/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.iL, payload: t.data });
              })
              .catch(function (t) {});
          };
        };
    },
    54074: function (t, e, n) {
      "use strict";
      var a = n(27378),
        r = n(23884),
        s = n(9647),
        i = n(43564),
        o = n(23434),
        c = n(56793),
        u = n(28730),
        l = n(10418),
        d = n(11523),
        p = n(22682),
        m = n(52359),
        h = n(93600),
        f = n(33565),
        x = n(76410),
        _ = n(41485),
        g = n(55378),
        y = n(60789),
        v = n(78153),
        j = n(64212),
        Z = n(76125),
        b = n(50243),
        P = n(38543),
        w = n(57446),
        N = n(10755),
        k = n(23880),
        C = n(62386),
        S = n(55569),
        L = n(70228),
        F = n(55513),
        A = n(4497),
        D = n(16655),
        M = n(72897),
        V = n(20511),
        O = n(13040),
        I = (n(8971), n(74570)),
        E = n(16569),
        q = n(26803),
        Y = n(69162),
        W = n(93033),
        z = n(62401),
        R = n(14442),
        X = n(67337),
        T = n(97722),
        B = n(49444),
        G = n(92146),
        $ = n(47265),
        U = n(96616),
        Q = n(68456),
        H = n(19265),
        K = n(98784),
        J = n.n(K),
        tt = n(10772),
        et = n(22859),
        nt = n(84286),
        at = n(17937),
        rt = n(45747),
        st = n(40372),
        it = n(61320),
        ot = n.n(it),
        ct = n(14365),
        ut = n(64986),
        lt = n(45508),
        dt = n(33204),
        pt = n(90813),
        mt = n(5805),
        ht = n(35491),
        ft = n(1743),
        xt = n(10047),
        _t = n(26270),
        gt = n(24761),
        yt = n(70004),
        vt = n(91434),
        jt = n(52522),
        Zt = n(3661),
        bt = n(46265),
        Pt = n(84200),
        wt = n(69267),
        Nt = n(90740),
        kt = n(24246);
      function Ct(t) {
        return (
          (Ct =
            "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t &&
                    "function" == typeof Symbol &&
                    t.constructor === Symbol &&
                    t !== Symbol.prototype
                    ? "symbol"
                    : typeof t;
                }),
          Ct(t)
        );
      }
      function St(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (t) {
                if ("string" == typeof t) return Lt(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === n && t.constructor && (n = t.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(t)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? Lt(t, e)
                    : void 0
                );
              }
            })(t)) ||
            (e && t && "number" == typeof t.length)
          ) {
            n && (t = n);
            var a = 0,
              r = function () {};
            return {
              s: r,
              n: function () {
                return a >= t.length
                  ? { done: !0 }
                  : { done: !1, value: t[a++] };
              },
              e: function (t) {
                throw t;
              },
              f: r,
            };
          }
          throw new TypeError(
            "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
          );
        }
        var s,
          i = !0,
          o = !1;
        return {
          s: function () {
            n = n.call(t);
          },
          n: function () {
            var t = n.next();
            return (i = t.done), t;
          },
          e: function (t) {
            (o = !0), (s = t);
          },
          f: function () {
            try {
              i || null == n.return || n.return();
            } finally {
              if (o) throw s;
            }
          },
        };
      }
      function Lt(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
        return a;
      }
      function Ft(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
          var a = Object.getOwnPropertySymbols(t);
          e &&
            (a = a.filter(function (e) {
              return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })),
            n.push.apply(n, a);
        }
        return n;
      }
      function At(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? Ft(Object(n), !0).forEach(function (e) {
                Wt(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : Ft(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function Dt() {
        Dt = function () {
          return t;
        };
        var t = {},
          e = Object.prototype,
          n = e.hasOwnProperty,
          a = "function" == typeof Symbol ? Symbol : {},
          r = a.iterator || "@@iterator",
          s = a.asyncIterator || "@@asyncIterator",
          i = a.toStringTag || "@@toStringTag";
        function o(t, e, n) {
          return (
            Object.defineProperty(t, e, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            t[e]
          );
        }
        try {
          o({}, "");
        } catch (t) {
          o = function (t, e, n) {
            return (t[e] = n);
          };
        }
        function c(t, e, n, a) {
          var r = e && e.prototype instanceof d ? e : d,
            s = Object.create(r.prototype),
            i = new b(a || []);
          return (
            (s._invoke = (function (t, e, n) {
              var a = "suspendedStart";
              return function (r, s) {
                if ("executing" === a)
                  throw new Error("Generator is already running");
                if ("completed" === a) {
                  if ("throw" === r) throw s;
                  return { value: void 0, done: !0 };
                }
                for (n.method = r, n.arg = s; ; ) {
                  var i = n.delegate;
                  if (i) {
                    var o = v(i, n);
                    if (o) {
                      if (o === l) continue;
                      return o;
                    }
                  }
                  if ("next" === n.method) n.sent = n._sent = n.arg;
                  else if ("throw" === n.method) {
                    if ("suspendedStart" === a)
                      throw ((a = "completed"), n.arg);
                    n.dispatchException(n.arg);
                  } else "return" === n.method && n.abrupt("return", n.arg);
                  a = "executing";
                  var c = u(t, e, n);
                  if ("normal" === c.type) {
                    if (
                      ((a = n.done ? "completed" : "suspendedYield"),
                      c.arg === l)
                    )
                      continue;
                    return { value: c.arg, done: n.done };
                  }
                  "throw" === c.type &&
                    ((a = "completed"), (n.method = "throw"), (n.arg = c.arg));
                }
              };
            })(t, n, i)),
            s
          );
        }
        function u(t, e, n) {
          try {
            return { type: "normal", arg: t.call(e, n) };
          } catch (t) {
            return { type: "throw", arg: t };
          }
        }
        t.wrap = c;
        var l = {};
        function d() {}
        function p() {}
        function m() {}
        var h = {};
        o(h, r, function () {
          return this;
        });
        var f = Object.getPrototypeOf,
          x = f && f(f(P([])));
        x && x !== e && n.call(x, r) && (h = x);
        var _ = (m.prototype = d.prototype = Object.create(h));
        function g(t) {
          ["next", "throw", "return"].forEach(function (e) {
            o(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function y(t, e) {
          function a(r, s, i, o) {
            var c = u(t[r], t, s);
            if ("throw" !== c.type) {
              var l = c.arg,
                d = l.value;
              return d && "object" == Ct(d) && n.call(d, "__await")
                ? e.resolve(d.__await).then(
                    function (t) {
                      a("next", t, i, o);
                    },
                    function (t) {
                      a("throw", t, i, o);
                    }
                  )
                : e.resolve(d).then(
                    function (t) {
                      (l.value = t), i(l);
                    },
                    function (t) {
                      return a("throw", t, i, o);
                    }
                  );
            }
            o(c.arg);
          }
          var r;
          this._invoke = function (t, n) {
            function s() {
              return new e(function (e, r) {
                a(t, n, e, r);
              });
            }
            return (r = r ? r.then(s, s) : s());
          };
        }
        function v(t, e) {
          var n = t.iterator[e.method];
          if (void 0 === n) {
            if (((e.delegate = null), "throw" === e.method)) {
              if (
                t.iterator.return &&
                ((e.method = "return"),
                (e.arg = void 0),
                v(t, e),
                "throw" === e.method)
              )
                return l;
              (e.method = "throw"),
                (e.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ));
            }
            return l;
          }
          var a = u(n, t.iterator, e.arg);
          if ("throw" === a.type)
            return (
              (e.method = "throw"), (e.arg = a.arg), (e.delegate = null), l
            );
          var r = a.arg;
          return r
            ? r.done
              ? ((e[t.resultName] = r.value),
                (e.next = t.nextLoc),
                "return" !== e.method &&
                  ((e.method = "next"), (e.arg = void 0)),
                (e.delegate = null),
                l)
              : r
            : ((e.method = "throw"),
              (e.arg = new TypeError("iterator result is not an object")),
              (e.delegate = null),
              l);
        }
        function j(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function Z(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function b(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(j, this),
            this.reset(!0);
        }
        function P(t) {
          if (t) {
            var e = t[r];
            if (e) return e.call(t);
            if ("function" == typeof t.next) return t;
            if (!isNaN(t.length)) {
              var a = -1,
                s = function e() {
                  for (; ++a < t.length; )
                    if (n.call(t, a)) return (e.value = t[a]), (e.done = !1), e;
                  return (e.value = void 0), (e.done = !0), e;
                };
              return (s.next = s);
            }
          }
          return { next: w };
        }
        function w() {
          return { value: void 0, done: !0 };
        }
        return (
          (p.prototype = m),
          o(_, "constructor", m),
          o(m, "constructor", p),
          (p.displayName = o(m, i, "GeneratorFunction")),
          (t.isGeneratorFunction = function (t) {
            var e = "function" == typeof t && t.constructor;
            return (
              !!e &&
              (e === p || "GeneratorFunction" === (e.displayName || e.name))
            );
          }),
          (t.mark = function (t) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(t, m)
                : ((t.__proto__ = m), o(t, i, "GeneratorFunction")),
              (t.prototype = Object.create(_)),
              t
            );
          }),
          (t.awrap = function (t) {
            return { __await: t };
          }),
          g(y.prototype),
          o(y.prototype, s, function () {
            return this;
          }),
          (t.AsyncIterator = y),
          (t.async = function (e, n, a, r, s) {
            void 0 === s && (s = Promise);
            var i = new y(c(e, n, a, r), s);
            return t.isGeneratorFunction(n)
              ? i
              : i.next().then(function (t) {
                  return t.done ? t.value : i.next();
                });
          }),
          g(_),
          o(_, i, "Generator"),
          o(_, r, function () {
            return this;
          }),
          o(_, "toString", function () {
            return "[object Generator]";
          }),
          (t.keys = function (t) {
            var e = [];
            for (var n in t) e.push(n);
            return (
              e.reverse(),
              function n() {
                for (; e.length; ) {
                  var a = e.pop();
                  if (a in t) return (n.value = a), (n.done = !1), n;
                }
                return (n.done = !0), n;
              }
            );
          }),
          (t.values = P),
          (b.prototype = {
            constructor: b,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(Z),
                !t)
              )
                for (var e in this)
                  "t" === e.charAt(0) &&
                    n.call(this, e) &&
                    !isNaN(+e.slice(1)) &&
                    (this[e] = void 0);
            },
            stop: function () {
              this.done = !0;
              var t = this.tryEntries[0].completion;
              if ("throw" === t.type) throw t.arg;
              return this.rval;
            },
            dispatchException: function (t) {
              if (this.done) throw t;
              var e = this;
              function a(n, a) {
                return (
                  (i.type = "throw"),
                  (i.arg = t),
                  (e.next = n),
                  a && ((e.method = "next"), (e.arg = void 0)),
                  !!a
                );
              }
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var s = this.tryEntries[r],
                  i = s.completion;
                if ("root" === s.tryLoc) return a("end");
                if (s.tryLoc <= this.prev) {
                  var o = n.call(s, "catchLoc"),
                    c = n.call(s, "finallyLoc");
                  if (o && c) {
                    if (this.prev < s.catchLoc) return a(s.catchLoc, !0);
                    if (this.prev < s.finallyLoc) return a(s.finallyLoc);
                  } else if (o) {
                    if (this.prev < s.catchLoc) return a(s.catchLoc, !0);
                  } else {
                    if (!c)
                      throw new Error("try statement without catch or finally");
                    if (this.prev < s.finallyLoc) return a(s.finallyLoc);
                  }
                }
              }
            },
            abrupt: function (t, e) {
              for (var a = this.tryEntries.length - 1; a >= 0; --a) {
                var r = this.tryEntries[a];
                if (
                  r.tryLoc <= this.prev &&
                  n.call(r, "finallyLoc") &&
                  this.prev < r.finallyLoc
                ) {
                  var s = r;
                  break;
                }
              }
              s &&
                ("break" === t || "continue" === t) &&
                s.tryLoc <= e &&
                e <= s.finallyLoc &&
                (s = null);
              var i = s ? s.completion : {};
              return (
                (i.type = t),
                (i.arg = e),
                s
                  ? ((this.method = "next"), (this.next = s.finallyLoc), l)
                  : this.complete(i)
              );
            },
            complete: function (t, e) {
              if ("throw" === t.type) throw t.arg;
              return (
                "break" === t.type || "continue" === t.type
                  ? (this.next = t.arg)
                  : "return" === t.type
                  ? ((this.rval = this.arg = t.arg),
                    (this.method = "return"),
                    (this.next = "end"))
                  : "normal" === t.type && e && (this.next = e),
                l
              );
            },
            finish: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.finallyLoc === t)
                  return this.complete(n.completion, n.afterLoc), Z(n), l;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc === t) {
                  var a = n.completion;
                  if ("throw" === a.type) {
                    var r = a.arg;
                    Z(n);
                  }
                  return r;
                }
              }
              throw new Error("illegal catch attempt");
            },
            delegateYield: function (t, e, n) {
              return (
                (this.delegate = { iterator: P(t), resultName: e, nextLoc: n }),
                "next" === this.method && (this.arg = void 0),
                l
              );
            },
          }),
          t
        );
      }
      function Mt(t, e, n, a, r, s, i) {
        try {
          var o = t[s](i),
            c = o.value;
        } catch (t) {
          return void n(t);
        }
        o.done ? e(c) : Promise.resolve(c).then(a, r);
      }
      function Vt(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (a, r) {
            var s = t.apply(e, n);
            function i(t) {
              Mt(s, a, r, i, o, "next", t);
            }
            function o(t) {
              Mt(s, a, r, i, o, "throw", t);
            }
            i(void 0);
          });
        };
      }
      function Ot(t, e) {
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          (a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            "value" in a && (a.writable = !0),
            Object.defineProperty(t, a.key, a);
        }
      }
      function It(t, e) {
        return (
          (It = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          It(t, e)
        );
      }
      function Et(t, e) {
        if (e && ("object" === Ct(e) || "function" == typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return qt(t);
      }
      function qt(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function Yt(t) {
        return (
          (Yt = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          Yt(t)
        );
      }
      function Wt(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      n(16222).default.updateSyncErrors;
      var zt = (function (t) {
        !(function (t, e) {
          if ("function" != typeof e && null !== e)
            throw new TypeError(
              "Super expression must either be null or a function"
            );
          (t.prototype = Object.create(e && e.prototype, {
            constructor: { value: t, writable: !0, configurable: !0 },
          })),
            Object.defineProperty(t, "prototype", { writable: !1 }),
            e && It(t, e);
        })(L, t);
        var e,
          n,
          r,
          s,
          N,
          C =
            ((s = L),
            (N = (function () {
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
              } catch (t) {
                return !1;
              }
            })()),
            function () {
              var t,
                e = Yt(s);
              if (N) {
                var n = Yt(this).constructor;
                t = Reflect.construct(e, arguments, n);
              } else t = e.apply(this, arguments);
              return Et(this, t);
            });
        function L(t) {
          var e, n;
          !(function (t, e) {
            if (!(t instanceof e))
              throw new TypeError("Cannot call a class as a function");
          })(this, L),
            Wt(
              qt((n = C.call(this, t))),
              "loadProfile",
              Vt(
                Dt().mark(function t() {
                  var e;
                  return Dt().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (t.next = 2), (0, S.Ai)();
                        case 2:
                          (e = t.sent).data.success &&
                            n.setState({ profile: e.data.data });
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            Wt(qt(n), "initializeFormData", function () {
              for (
                var t = At({}, n.state.formData), e = [], a = 0, r = 0, s = 0;
                s < t.products.length;
                s++
              )
                e.push({ id: t.products[s].id, is_return: !1 }),
                  "material" == t.products[s].product_type
                    ? (r += parseFloat(t.products[s].materials[0].quantity))
                    : r++;
              parseFloat(t.discount) > 0 &&
                (console.log("total_products", r),
                (a = (0, w.XY)(parseFloat(t.discount) / r))),
                n.setState(
                  {
                    formValues: t,
                    unique_materials: [],
                    isCreateFrom: !1,
                    return_products: e,
                    discount_per_product: a,
                  },
                  function () {
                    n.handleCalculateMainPrice(),
                      setTimeout(function () {
                        n.setAdminDetails();
                      }, 1e3);
                  }
                );
            }),
            Wt(
              qt(n),
              "loadSaleOnApproval",
              Vt(
                Dt().mark(function t() {
                  var e;
                  return Dt().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (
                            (0, w.xb)(n.props.query.get("sale_on_approval"))
                          ) {
                            t.next = 5;
                            break;
                          }
                          return (
                            (t.next = 3),
                            (0, k.Bp)(n.props.query.get("sale_on_approval"))
                          );
                        case 3:
                          (e = t.sent).data.success &&
                            n.setState(
                              {
                                formValues: At(
                                  At({}, n.state.formValues),
                                  {},
                                  {
                                    paid_amount: e.data.data.paid_amount
                                      ? e.data.data.paid_amount
                                      : "",
                                    user_id: e.data.data.user_id,
                                  }
                                ),
                              },
                              function () {
                                n.handleCalculateMainPrice(),
                                  setTimeout(function () {
                                    n.handleAdminChange(
                                      "",
                                      e.data.data.user_id
                                    );
                                  }, 1e3);
                              }
                            );
                        case 5:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            Wt(
              qt(n),
              "loadCart",
              Vt(
                Dt().mark(function t() {
                  var e, a, r, s, i, o, c, u, l, d, p, m, h, f, x, _, g, y;
                  return Dt().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (t.next = 2),
                            (0, xt.GC)({
                              from_order_price:
                                n.props.query.get("from_order_price"),
                              order_id: n.props.query.get("order_id"),
                            })
                          );
                        case 2:
                          if ((e = t.sent).data.success) {
                            for (
                              a = e.data.data.items, r = [], s = [], i = 0;
                              i < a.length;
                              i++
                            ) {
                              (o = a[i]),
                                (c = []),
                                (u = 1),
                                (l = St(o.materials));
                              try {
                                for (
                                  p = function () {
                                    var t = d.value;
                                    c.push({
                                      id: t.id,
                                      material_id: t.material_id,
                                      material_name: t.material_name,
                                      weight: t.weight,
                                      quantity: t.quantity,
                                      unit_name: t.unit_name,
                                      unit_id: t.unit_id,
                                      purity: t.purity,
                                      purity_id: t.purity_id,
                                      amount: t.amount,
                                      rate: t.rate,
                                      discount_percent: t.discount_percent,
                                      max_discount_percent:
                                        t.max_discount_percent,
                                      discount_amount: t.discount_amount,
                                      total_gram: t.total_gram,
                                      per_gram_price: t.per_gram_price,
                                    }),
                                      -1 ==
                                        J().findIndex(s, function (e) {
                                          return e.material_id == t.material_id;
                                        }) &&
                                        t.max_discount_percent > 0 &&
                                        s.push({
                                          material_id: t.material_id,
                                          material_name: t.material_name,
                                          amount: "",
                                          max_discount: t.max_discount_percent,
                                        });
                                  },
                                    l.s();
                                  !(d = l.n()).done;

                                )
                                  p();
                              } catch (t) {
                                l.e(t);
                              } finally {
                                l.f();
                              }
                              (m = (0, w.GQ)(
                                o.tax_info,
                                parseFloat(o.total_amount),
                                n.state.user_gst_no
                              )),
                                (h = m ? m.cgst : 0),
                                (f = m ? m.sgst : 0),
                                (x = m ? m.igst : 0),
                                (_ = (0, w.XY)(h + f + x)),
                                (g = (0, w.XY)(o.total_amount + h + f + x)),
                                "material" == o.product_type &&
                                  (u = c[0].quantity),
                                r.push({
                                  id: o.id,
                                  product_id: o.product_id,
                                  product_type: o.product_type,
                                  product_name: o.product_name,
                                  certificate_no: o.certificate_no,
                                  size_id: o.size_id,
                                  size_name: o.size_name,
                                  materials: c,
                                  making_charge: o.making_charge,
                                  making_charge_discount_percent:
                                    o.making_charge_discount_percent,
                                  max_making_charge_discount_percent:
                                    o.max_making_charge_discount_percent,
                                  making_charge_discount_amount:
                                    o.making_charge_discount_amount,
                                  total_discount: o.total_discount,
                                  stock_id: o.stock_id,
                                  sale_product_id: o.sale_product_id,
                                  category_id: o.category_id,
                                  sub_category_id: o.sub_category_id,
                                  total_weight: o.total_weight,
                                  sub_price: o.sub_price,
                                  rep: o.rep,
                                  cgst_tax: h,
                                  sgst_tax: f,
                                  igst_tax: x,
                                  total: g,
                                  tax_info: o.tax_info,
                                  total_tax: _,
                                  sub_cat_making_charge:
                                    o.sub_cat_making_charge,
                                  sub_cat_making_charge_type:
                                    o.sub_cat_making_charge_type,
                                  quantity: u,
                                  order_product_id: o.order_product_id,
                                });
                            }
                            ((y = n.state.formValues).products = [].concat(r)),
                              (y.invoice_number = e.data.data.next_invoice),
                              n.setState(
                                { formValues: y, unique_materials: s },
                                function () {
                                  n.calculateProductPrice();
                                }
                              );
                          }
                        case 4:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            Wt(qt(n), "handleAddNewProduct", function () {
              (0, w.xb)(n.state.formValues.user_id)
                ? n.props.enqueueSnackbar(
                    "Please select admin for tax calculate.",
                    { variant: "error" }
                  )
                : n.setState(
                    At({ productDialog: !0 }, n.getDefaultProductFormData())
                  );
            }),
            Wt(qt(n), "handleAdminChange", function (t, e, a) {
              n.updateFormValues(e, "user_id");
              var r = n.getUserList(),
                s = J().filter(r, { id: e }),
                i = "",
                o = 0;
              s.length &&
                ((i = s[0].gst), n.state.isAssign || (o = s[0].advance_amount)),
                null != a && a >= 0 && (o = a),
                n.setState(
                  {
                    user_gst_no: i,
                    formValues: At(
                      At({}, n.state.formValues),
                      {},
                      { advance_amount: o }
                    ),
                  },
                  function () {
                    (n.isSuperAdmin ||
                      (n.isAdmin && n.state.profile && n.state.profile.own)) &&
                    s.length &&
                    s[0].own
                      ? n.handleTransfer(e)
                      : n.handleCalculateMainPrice(),
                      n.setAdminDetails();
                  }
                );
            }),
            Wt(qt(n), "setAdminDetails", function () {
              if (!(0, w.xb)(n.state.formValues.user_id)) {
                var t = n.getUserList(),
                  e = J().filter(t, { id: n.state.formValues.user_id });
                e.length &&
                  n.setState({
                    admin_details: At(
                      At({}, n.state.admin_details),
                      {},
                      {
                        name: (0, w.xb)(e[0].name) ? "" : e[0].name,
                        company_name: (0, w.xb)(e[0].company_name)
                          ? ""
                          : e[0].company_name,
                        mobile: (0, w.xb)(e[0].mobile) ? "" : e[0].mobile,
                        city: (0, w.xb)(e[0].city) ? "" : e[0].city,
                        gst: (0, w.xb)(e[0].gst) ? "" : e[0].gst,
                        address: (0, w.xb)(e[0].address) ? "" : e[0].address,
                        pincode: (0, w.xb)(e[0].pincode) ? "" : e[0].pincode,
                      }
                    ),
                  });
              }
              return "";
            }),
            Wt(qt(n), "handleDefaultChange", function (t, e) {
              n.updateFormValues(t.target.value, e);
            }),
            Wt(qt(n), "updateFormValues", function (t, e) {
              var a = n.state.formValues;
              (a[e] = t),
                n.setState({ formValues: a }, function () {
                  n.calculateProductPrice();
                });
            }),
            Wt(qt(n), "handleProductChange", function (t, e) {
              n.updateProductFormValues(t.target.value, "product_id"),
                n.props.actions.stocksProducDetails({
                  product_id: t.target.value,
                });
            }),
            Wt(qt(n), "handleProductFormDefaultChange", function (t, e) {
              n.updateProductFormValues(t.target.value, e);
            }),
            Wt(qt(n), "handleProductFormStockChange", function (t) {
              var e =
                null == t.target.value
                  ? t.target.parentNode.value
                  : t.target.value;
              n.updateProductFormValues(e, "stock_id");
            }),
            Wt(qt(n), "handleSizeChange", function (t, e) {
              n.updateProductFormValues(t.target.value, "size_id");
            }),
            Wt(qt(n), "handleCategoryChange", function (t) {
              n.updateProductFormValues(t.target.value, "category_id"),
                (0, w.xb)(t.target.value)
                  ? n.props.dispatch({ type: nt.z8 })
                  : n.props.actions.subCategoryList({
                      all: 1,
                      category_id: t.target.value,
                    }),
                n.updateProductFormValues("", "sub_category_id"),
                n.updateProductFormValues("", "product_id"),
                n.props.dispatch({ type: at.vM });
            }),
            Wt(qt(n), "handleSubCategoryChange", function (t) {
              n.updateProductFormValues(t.target.value, "sub_category_id"),
                n.props.actions.stocksProductList({
                  sub_category_id: t.target.value,
                }),
                n.updateProductFormValues("", "product_id"),
                n.props.dispatch({ type: at.vM });
            }),
            Wt(qt(n), "updateProductFormValues", function (t, e) {
              var a = n.state.productFormValues,
                r = n.state.sizeList,
                s = n.state.materialFormErros;
              if (((a[e] = t), "product_id" == e)) {
                n.props.actions.materialPriceProductPriceInfo(t || 0);
                var i = J().filter(n.state.stockProductList, { id: t });
                (a.materials = []),
                  (a.product_type = i.length ? i[0].type : ""),
                  (a.product_name = i.length ? i[0].name : ""),
                  (a.tax_info = i.length ? i[0].tax_info : null);
              } else if ("size_id" == e);
              else if ("stock_id" == e) {
                var o,
                  c = J().filter(n.state.stockProductDetails, function (e) {
                    return e.stock_id == t;
                  }),
                  u = [],
                  l = St(c[0].materials);
                try {
                  for (l.s(); !(o = l.n()).done; ) {
                    var d = o.value;
                    u.push({
                      id: 0,
                      material_id: d.material_id,
                      material_name: d.material_name,
                      weight: "material" != c[0].product_type ? d.weight : "",
                      quantity:
                        "material" != c[0].product_type ? d.quantity : "",
                      unit_name: d.unit_name,
                      unit_id: d.unit_id,
                      purity: d.purity,
                      purity_id: d.purity_id,
                      amount: 0,
                      rate: 0,
                    }),
                      s.push({ weight: !1, quantity: !1 });
                  }
                } catch (t) {
                  l.e(t);
                } finally {
                  l.f();
                }
                (a.materials = u),
                  (a.size_id = c[0].size_id),
                  (a.size_name = c[0].size_name),
                  (a.certificate_no = c[0].certificate_no);
              }
              n.setState(
                { productFormValues: a, sizeList: r, materialFormErros: s },
                function () {
                  n.calculateProductPrice();
                }
              );
            }),
            Wt(qt(n), "calculateProductPrice", function () {
              for (
                var t = n.state.formValues,
                  e = t.products,
                  a = n.state.isAssign,
                  r = 0;
                r < e.length;
                r++
              ) {
                for (
                  var s = 0, i = 0, o = 0, c = 0, u = 0;
                  u < e[r].materials.length;
                  u++
                ) {
                  var l = e[r].materials[u].discount_percent
                    ? parseFloat(e[r].materials[u].discount_percent)
                    : 0;
                  l = a ? 0 : l;
                  var d = (0, w.XY)(
                      parseFloat(e[r].materials[u].per_gram_price) -
                        parseFloat(
                          (e[r].materials[u].per_gram_price * parseFloat(l)) /
                            100
                        )
                    ),
                    p = (0, w.XY)(
                      parseFloat(e[r].materials[u].per_gram_price) *
                        parseFloat(e[r].materials[u].total_gram)
                    );
                  (s += p),
                    (i += (0, w.XY)(
                      parseFloat(d) * parseFloat(e[r].materials[u].total_gram)
                    )),
                    (e[r].materials[u].amount = p),
                    (e[r].materials[u].discount_amount = (0, w.XY)(
                      p -
                        (0, w.XY)(
                          parseFloat(d) *
                            parseFloat(e[r].materials[u].total_gram)
                        )
                    )),
                    e[r].materials[u].quantity &&
                      parseInt(e[r].materials[u].quantity),
                    (c += (0, w.XY)(
                      p -
                        (0, w.XY)(
                          parseFloat(d) *
                            parseFloat(e[r].materials[u].total_gram)
                        )
                    ));
                }
                e[r].product_type,
                  "per_piece" == e[r].sub_cat_making_charge_type
                    ? (o = (0, w.XY)(parseFloat(e[r].sub_cat_making_charge)))
                    : "per_gram" == e[r].sub_cat_making_charge_type &&
                      (o = (0, w.XY)(
                        parseFloat(e[r].total_weight) *
                          parseFloat(parseFloat(e[r].sub_cat_making_charge))
                      ));
                var m = a
                    ? 0
                    : (0, w.XY)(
                        (o * parseFloat(e[r].making_charge_discount_percent)) /
                          100
                      ),
                  h = (0, w.XY)(o - m);
                c += m;
                var f = a
                    ? null
                    : (0, w.GQ)(
                        e[r].tax_info,
                        parseFloat(i) + parseFloat(h),
                        n.state.user_gst_no
                      ),
                  x = f ? f.cgst : 0,
                  _ = f ? f.sgst : 0,
                  g = f ? f.igst : 0,
                  y = (0, w.XY)(x + _ + g),
                  v = (0, w.XY)(h + i),
                  j = (0, w.XY)(v + x + _ + g);
                (e[r].making_charge_discount_amount = m),
                  (e[r].total_discount = (0, w.XY)(c)),
                  (e[r].sub_price = (0, w.XY)(parseFloat(s) + parseFloat(o))),
                  (e[r].making_charge = (0, w.XY)(o)),
                  (e[r].total = (0, w.XY)(j)),
                  (e[r].total_tax = (0, w.XY)(y)),
                  (e[r].cgst_tax = (0, w.XY)(x)),
                  (e[r].sgst_tax = (0, w.XY)(_)),
                  (e[r].igst_tax = (0, w.XY)(g));
              }
              (t.products = e),
                n.setState({ formValues: t }, function () {
                  n.handleCalculateMainPrice();
                });
            }),
            Wt(qt(n), "getDefaultProductFormData", function () {
              return {
                productFormValues: {
                  id: 0,
                  product_id: "",
                  product_type: "",
                  product_name: "",
                  certificate_no: "",
                  size_id: "",
                  size_name: "",
                  materials: [],
                  making_charge: 0,
                  stock_id: 0,
                  category_id: "",
                  sub_category_id: "",
                  total_weight: 0,
                  sub_price: 0,
                  rep: 0,
                  cgst_tax: 0,
                  sgst_tax: 0,
                  igst_tax: 0,
                  total: 0,
                  tax_info: null,
                  total_tax: 0,
                },
                productFormErros: {
                  product_id: !1,
                  certificate_no: !1,
                  size_id: !1,
                  category_id: !1,
                  sub_category_id: !1,
                },
                materialFormErros: [],
              };
            }),
            Wt(qt(n), "handleMaterialFormChange", function (t, e, a) {
              var r = n.state.productFormValues,
                s = r.materials;
              (s[e][a] = t.target.value),
                (r.materials = s),
                n.setState({ productFormValues: r }, function () {
                  n.calculateProductPrice();
                });
            }),
            Wt(qt(n), "handleProductDialogClose", function (t, e) {
              (e && "backdropClick" == e) || n.setState({ productDialog: !1 });
            }),
            Wt(qt(n), "getTotalWeightByProduct", function (t) {
              var e,
                a = 0,
                r = St(n.state.formValues.products[t].materials);
              try {
                for (r.s(); !(e = r.n()).done; ) {
                  var s = e.value;
                  a += s.weight ? parseFloat(s.weight) : 0;
                }
              } catch (t) {
                r.e(t);
              } finally {
                r.f();
              }
              return a;
            }),
            Wt(qt(n), "handleProductDelete", function (t) {
              n.setState({ deletingIndex: t, deleteDialogOpen: !0 });
            }),
            Wt(qt(n), "handleProductSubmit", function () {
              if (!n.productFormValidate()) {
                var t,
                  e = At({}, n.state.formValues),
                  a = At({}, n.state.productFormValues);
                e.products.push(a),
                  n.setState(
                    {
                      formValues: e,
                      productFormValues: At(
                        At({}, n.state.productFormValues),
                        {},
                        ((t = {
                          size_id: "",
                          size_name: "",
                          materials: [],
                          making_charge: 0,
                          stock_id: 0,
                          total_weight: 0,
                          sub_price: 0,
                        }),
                        Wt(t, "making_charge", 0),
                        Wt(t, "rep", 0),
                        Wt(t, "cgst_tax", 0),
                        Wt(t, "sgst_tax", 0),
                        Wt(t, "igst_tax", 0),
                        Wt(t, "total", 0),
                        Wt(t, "tax_info", null),
                        Wt(t, "total_tax", 0),
                        t)
                      ),
                    },
                    function () {
                      n.handleCalculateMainPrice();
                    }
                  );
              }
            }),
            Wt(qt(n), "calculatePrice", function () {}),
            Wt(qt(n), "handleCalculateMainPrice", function () {
              for (
                var t,
                  e = n.state.formValues,
                  a = 0,
                  r = 0,
                  s = 0,
                  i = 0,
                  o = 0,
                  c = 0,
                  u = 0,
                  l = 0,
                  d = 0,
                  p = 0,
                  m = 0;
                m < e.products.length;
                m++
              )
                (s +=
                  parseFloat(e.products[m].total) -
                  parseFloat(e.products[m].total_tax)),
                  (i += e.products[m].cgst_tax
                    ? parseFloat(e.products[m].cgst_tax)
                    : 0),
                  (o += e.products[m].sgst_tax
                    ? parseFloat(e.products[m].sgst_tax)
                    : 0),
                  (c += e.products[m].igst_tax
                    ? parseFloat(e.products[m].igst_tax)
                    : 0),
                  (u += parseFloat(e.products[m].total)),
                  (a += parseFloat(e.products[m].total_discount)),
                  (r += parseFloat(e.products[m].sub_price));
              (s = (0, w.XY)(s, !0)),
                (i = (0, w.XY)(i, !0)),
                (o = (0, w.XY)(o, !0)),
                (c = (0, w.XY)(c, !0)),
                (u = (0, w.XY)(u, !0)),
                (0, w.xb)(e.discount) || (l = parseFloat(e.discount)),
                (t = (0, w.XY)(u - l, !0)),
                (0, w.xb)(e.paid_amount) || (d = parseFloat(e.paid_amount));
              var h = e.advance_amount ? parseFloat(e.advance_amount) : 0;
              (p = n.state.isCreateFrom
                ? (0, w.XY)(t - d, !0)
                : parseFloat(n.state.formValues.due_amount)),
                e.pay_from_advance && (p = h > p ? 0 : (0, w.XY)(p - h, !0)),
                (e.taxable_amount = s),
                (e.cgst_tax = i),
                (e.sgst_tax = o),
                (e.igst_tax = c),
                (e.total_tax = (0, w.XY)(i + o + c)),
                (e.total_amount = u),
                (e.total_payable = n.state.isCreateFrom ? t : e.total_payable),
                (e.due_amount = p),
                (e.product_discount = (0, w.XY)(a)),
                (e.total_tag_price = (0, w.XY)(r)),
                n.setState({ formValues: e });
            }),
            Wt(qt(n), "productFormValidate", function () {
              var t = n.state.productFormValues,
                e = n.state.productFormErros,
                a = n.state.materialFormErros,
                r = !1;
              (0, w.xb)(t.product_id)
                ? ((e.product_id = !0), (r = !0))
                : (e.product_id = !1),
                "material" != t.product_type
                  ? t.stock_id
                  : ((e.certificate_no = !1), (e.size_id = !1)),
                t.materials.length ||
                  (n.props.enqueueSnackbar("Please select stock", {
                    variant: "error",
                  }),
                  (r = !0));
              for (var s = 0; s < t.materials.length; s++)
                (0, w.xb)(t.materials[s].weight)
                  ? ((a[s].weight = !0), (r = !0))
                  : (a[s].weight = !1),
                  (0, w.xb)(t.materials[s].quantity)
                    ? ((a[s].quantity = !0), (r = !0))
                    : (a[s].quantity = !1);
              return (
                n.setState({ productFormErros: e, materialFormErros: a }), r
              );
            }),
            Wt(qt(n), "handleDialogClose", function () {
              n.setState({ deleteDialogOpen: !1, deletingIndex: 0 });
            }),
            Wt(qt(n), "returnDialogClose", function () {
              n.setState({ returnDialogOpen: !1 });
            }),
            Wt(
              qt(n),
              "handleDeleteConfirm",
              Vt(
                Dt().mark(function t() {
                  var e, a;
                  return Dt().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (e = n.state.formValues.products),
                            (t.next = 3),
                            (0, xt.VE)(e[n.state.deletingIndex].id, !0)
                          );
                        case 3:
                          (a = t.sent).data.success
                            ? (n.props.enqueueSnackbar(a.data.message, {
                                variant: "success",
                              }),
                              n.loadCart(),
                              n.props.actions.cartList())
                            : n.props.enqueueSnackbar(a.data.message, {
                                variant: "error",
                              }),
                            n.setState(
                              { deleteDialogOpen: !1 },
                              function () {}
                            );
                        case 6:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            Wt(
              qt(n),
              "handleSubmit",
              (function () {
                var t = Vt(
                  Dt().mark(function t(e) {
                    var a, r, s;
                    return Dt().wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              ((a = n.state.formValues),
                              (r = n.formValidate(e)),
                              0 != a.products.length)
                            ) {
                              t.next = 5;
                              break;
                            }
                            return (
                              n.props.enqueueSnackbar(
                                "Please add at least one product",
                                { variant: "error" }
                              ),
                              t.abrupt("return", !1)
                            );
                          case 5:
                            if (r || !a.products.length) {
                              t.next = 21;
                              break;
                            }
                            if (
                              (n.setState({ submitting: !0, isOnApprove: e }),
                              ((s = At(
                                At({}, n.state.formValues),
                                {},
                                {
                                  on_approval: e,
                                  on_approval_id:
                                    n.props.query.get("sale_on_approval"),
                                }
                              )).order_id = n.state.order
                                ? n.state.order.id
                                : 0),
                              (s.order_from_customer =
                                !!n.state.order && n.state.order.is_customer),
                              n.state.order &&
                                "is_retailer" in n.state.order &&
                                n.state.order.is_retailer &&
                                (s.order_from_customer = !0),
                              (s.is_assigned = n.state.isAssign),
                              !s.image_file)
                            ) {
                              t.next = 18;
                              break;
                            }
                            return (t.next = 15), (0, w.s3)(s.image_file);
                          case 15:
                            (t.t0 = t.sent), (t.next = 19);
                            break;
                          case 18:
                            t.t0 = "";
                          case 19:
                            (s.image_file = t.t0),
                              n.state.isCreateFrom
                                ? n.props.actions.salesStore(s)
                                : n.props.actions.salesUpdate(
                                    n.state.formData.id,
                                    s
                                  );
                          case 21:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                );
                return function (e) {
                  return t.apply(this, arguments);
                };
              })()
            ),
            Wt(qt(n), "formValidate", function (t) {
              var e = n.state.formErros,
                a = n.state.formValues,
                r = !1;
              return (
                (0, w.xb)(a.user_id)
                  ? ((e.user_id = !0), (r = !0))
                  : (e.user_id = !1),
                (0, w.xb)(a.invoice_date)
                  ? ((e.invoice_date = !0), (r = !0))
                  : (e.invoice_date = !1),
                parseFloat(a.due_amount) > 0 &&
                  (!n.state.isAssign && (0, w.xb)(a.due_date)
                    ? ((e.due_date = !0), (r = !0))
                    : (e.due_date = !1),
                  n.state.isAssign || !(0, w.xb)(a.settlement_date) || t
                    ? (e.settlement_date = !1)
                    : ((e.settlement_date = !0), (r = !0))),
                (0, w.xb)(a.total_payable) ||
                  (0, w.xb)(a.paid_amount) ||
                  (parseFloat(a.paid_amount) > parseFloat(a.total_payable) &&
                    ((r = !0),
                    n.props.enqueueSnackbar(
                      "Paid amount must be less than or equal to payable amount.",
                      { variant: "error" }
                    ))),
                n.setState({ formErros: e }),
                r
              );
            }),
            Wt(qt(n), "checkIfStockAdded", function (t) {
              return J().filter(n.state.formValues.products, function (e) {
                return e.stock_id == t;
              }).length;
            }),
            Wt(qt(n), "checkIfAllStockAdded", function () {
              for (
                var t = !0, e = 0;
                e < n.state.stockProductDetails.length;
                e++
              )
                if (
                  !n.checkIfStockAdded(n.state.stockProductDetails[e].stock_id)
                ) {
                  t = !1;
                  break;
                }
              return t;
            }),
            Wt(qt(n), "handleMaterialDisc", function (t, e, a) {
              var r = n.state.formValues,
                s = t.target,
                i = s.value,
                o = s.max;
              "" != i &&
                (i = Math.max(Number(0), Math.min(Number(o), Number(i)))),
                (r.products[e].materials[a].discount_percent = i),
                n.setState({ formValues: r }, function () {
                  n.calculateProductPrice();
                });
            }),
            Wt(qt(n), "handleMakingDiscount", function (t, e) {
              var a = n.state.formValues,
                r = t.target,
                s = r.value,
                i = r.max;
              "" != s &&
                (s = Math.max(Number(0), Math.min(Number(i), Number(s)))),
                (a.products[e].making_charge_discount_percent = s),
                n.setState({ formValues: a }, function () {
                  n.calculateProductPrice();
                });
            }),
            Wt(qt(n), "handleCommonDis", function (t, e) {
              var a = n.state.unique_materials,
                r = t.target,
                s = r.value,
                i = r.max;
              "" != s &&
                (s = Math.max(Number(0), Math.min(Number(i), Number(s)))),
                (a[e].amount = s),
                n.setState({ unique_materials: a });
              for (
                var o = n.state.formValues, c = 0;
                c < o.products.length;
                c++
              )
                for (var u = 0; u < o.products[c].materials.length; u++)
                  a[e].material_id == o.products[c].materials[u].material_id &&
                    (o.products[c].materials[u].discount_percent = s);
              n.setState({ formValues: o }, function () {
                n.calculateProductPrice();
              });
            }),
            Wt(qt(n), "handleCommonMakingDis", function (t) {
              n.setState({ common_making_discount: t.target.value });
              for (
                var e = n.state.formValues, a = t.target.value, r = 0;
                r < e.products.length;
                r++
              )
                a
                  ? e.products[r].max_making_charge_discount_percent > 0 &&
                    (e.products[r].making_charge_discount_percent =
                      e.products[r].max_making_charge_discount_percent >=
                      parseFloat(a)
                        ? a
                        : e.products[r].max_making_charge_discount_percent)
                  : (e.products[r].making_charge_discount_percent = "");
              n.setState({ formValues: e }, function () {
                n.calculateProductPrice();
              });
            }),
            Wt(qt(n), "getUserList", function () {
              var t = [];
              if (n.isSuperAdmin)
                if (n.state.isAssign) {
                  t = n.state.employeeList;
                  for (var e = [], a = 0; a < n.state.adminList.length; a++)
                    n.state.adminList[a].own && e.push(n.state.adminList[a]);
                  t = t.concat(e);
                } else t = n.state.adminList;
              else if (n.isAdmin)
                if (n.state.isAssign) {
                  var r = [];
                  if (n.state.profile && n.state.profile.own) {
                    for (var s = 0; s < n.state.distributorList.length; s++)
                      n.state.distributorList[s].own &&
                        r.push(n.state.distributorList[s]);
                    for (var i = 0; i < n.state.supplierList.length; i++)
                      n.state.supplierList[i].own &&
                        r.push(n.state.supplierList[i]);
                  }
                  t = r;
                } else t = n.state.distributorList;
              else if (n.isDistributor)
                if (n.state.isAssign) {
                  var o = [];
                  if (n.state.profile && n.state.profile.own)
                    for (var c = 0; c < n.state.supplierList.length; c++)
                      n.state.supplierList[c].own &&
                        o.push(n.state.supplierList[c]);
                  t = n.state.salesExecutiveList.concat(o);
                } else t = n.state.retailerList;
              else
                n.isSalesExecutive &&
                  (t = n.state.isAssign
                    ? n.state.distributorList.concat(n.state.salesExecutiveList)
                    : n.state.retailerList);
              return t;
            }),
            Wt(qt(n), "handleTransfer", function (t) {
              var e = n.state.formValues.invoice_number;
              e && (e = e.replace("-S-", "-T-")),
                (t = void 0 === t ? "" : t),
                n.setState(
                  {
                    isAssign: !0,
                    formValues: At(
                      At({}, n.state.formValues),
                      {},
                      { user_id: t, invoice_number: e }
                    ),
                  },
                  function () {
                    n.calculateProductPrice();
                  }
                );
            }),
            Wt(qt(n), "handleBackAssign", function () {
              var t = n.state.formValues.invoice_number;
              t && (t = t.replace("-T-", "-S-")),
                n.setState(
                  {
                    isAssign: !1,
                    formValues: At(
                      At({}, n.state.formValues),
                      {},
                      { user_id: "", invoice_number: t }
                    ),
                  },
                  function () {
                    n.calculateProductPrice();
                  }
                );
            }),
            Wt(qt(n), "onChangeImage", function (t) {
              n.updateFormValues(t.target.files[0], "image_file"),
                n.imageFileRef && (n.imageFileRef.current.value = null);
            }),
            Wt(qt(n), "getImageSrc", function (t) {
              return URL.createObjectURL(t);
            }),
            Wt(qt(n), "deleteImage", function () {
              n.updateFormValues(null, "image_file");
            }),
            Wt(qt(n), "haveMakingComonDis", function () {
              var t,
                e = n.state,
                a = e.formValues,
                r = e.isAssign,
                s = !1,
                i = St(a.products);
              try {
                for (i.s(); !(t = i.n()).done; )
                  if (t.value.max_making_charge_discount_percent > 0 && !r) {
                    s = !0;
                    break;
                  }
              } catch (t) {
                i.e(t);
              } finally {
                i.f();
              }
              return s;
            }),
            Wt(qt(n), "handleCheckBox", function (t, e) {
              var a = n.state.formValues.products,
                r = n.state.return_products,
                s = a[e],
                i = n.hasReturn();
              if (t.target.checked && i.will_return_charge_apply)
                for (
                  var o = function (t) {
                      if (1 == r[t].is_return) {
                        var e = J().filter(
                          n.state.formValues.products,
                          function (e) {
                            return e.id == r[t].id;
                          }
                        );
                        if (e.length && e[0].category_id != s.category_id)
                          return {
                            v: n.props.enqueueSnackbar(
                              "You can't return different category product in one invoice.",
                              { variant: "error" }
                            ),
                          };
                      }
                    },
                    c = 0;
                  c < r.length;
                  c++
                ) {
                  var u = o(c);
                  if ("object" === Ct(u)) return u.v;
                }
              "material" != s.product_type
                ? ((r[e].is_return = t.target.checked),
                  n.setState({ return_products: r }, function () {
                    n.calculateReturnAmount();
                  }))
                : n.setState({
                    materialReturnDialog: !0,
                    actionProductIndex: e,
                  });
            }),
            Wt(qt(n), "handleReturn", function () {
              var t = n.hasReturn();
              if (!t.isReturn)
                return n.props.enqueueSnackbar(
                  "Please select return product.",
                  { variant: "error" }
                );
              n.setState({
                returnDialogOpen: !0,
                payment_type: t.will_return_charge_apply ? "return" : "advance",
              });
            }),
            Wt(
              qt(n),
              "handleReturnConfirm",
              Vt(
                Dt().mark(function t() {
                  var e;
                  return Dt().wrap(function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          if (n.hasReturn().isReturn) {
                            t.next = 3;
                            break;
                          }
                          return t.abrupt(
                            "return",
                            n.props.enqueueSnackbar(
                              "Please select return product.",
                              { variant: "error" }
                            )
                          );
                        case 3:
                          return (
                            (t.next = 5),
                            (0, k.CX)(n.state.formData.id, {
                              return_products: n.state.return_products,
                              return_data: n.state.formValues,
                              return_amount: n.state.return_amount,
                              product_amount: n.state.product_amount,
                              return_charge: n.state.return_charge,
                              return_date: n.state.return_date,
                              payment_type: n.state.payment_type,
                              return_payment_mode: n.state.return_payment_mode,
                              return_amount_from_wallet: (0, w.XY)(
                                parseFloat(n.state.return_amount) -
                                  parseFloat(n.state.formValues.due_amount)
                              ),
                            })
                          );
                        case 5:
                          (e = t.sent).data.success
                            ? (n.props.enqueueSnackbar(e.data.message, {
                                variant: "success",
                              }),
                              n.props.actions.getNotifiactions(),
                              n.props.navigate(
                                (0, w.ZA)((0, w.O2)(n.state.auth)) + "/sales"
                              ))
                            : n.props.enqueueSnackbar(e.data.message, {
                                variant: "error",
                              });
                        case 7:
                        case "end":
                          return t.stop();
                      }
                  }, t);
                })
              )
            ),
            Wt(qt(n), "handleReturnDialogClose", function (t, e) {
              (e && "backdropClick" == e) ||
                n.setState({ materialReturnDialog: !1 });
            }),
            Wt(qt(n), "handleCancelReturn", function () {
              var t = n.state,
                e = t.formValues,
                a = t.actionProductIndex,
                r = t.return_products;
              (e.products[a].materials[0].return_weight = 0),
                (e.products[a].materials[0].return_qty = 0),
                (r[a].is_return = !1),
                n.setState({
                  return_products: r,
                  formValues: e,
                  materialReturnDialog: !1,
                });
            }),
            Wt(qt(n), "handleReturnMaterialSubmit", function () {
              var t = n.state,
                e = t.formValues,
                a = t.actionProductIndex,
                r = e.products[a],
                s = !1;
              if (
                (!r.materials[0].return_weight ||
                parseFloat(r.materials[0].return_weight) >
                  parseFloat(r.materials[0].avl_weight)
                  ? ((s = !0),
                    n.setState({ return_weight_error: !0 }),
                    parseFloat(r.materials[0].return_weight) >
                      parseFloat(r.materials[0].avl_weight) &&
                      n.props.enqueueSnackbar(
                        "Weight can't be more than available weight.",
                        { variant: "error" }
                      ))
                  : n.setState({ return_weight_error: !1 }),
                !r.materials[0].return_qty ||
                parseFloat(r.materials[0].return_qty) >
                  parseFloat(r.materials[0].avl_qty)
                  ? ((s = !0),
                    n.setState({ return_qty_error: !0 }),
                    parseFloat(r.materials[0].return_qty) >
                      parseFloat(r.materials[0].avl_qty) &&
                      n.props.enqueueSnackbar(
                        "Quantity can't be more than available quantity.",
                        { variant: "error" }
                      ))
                  : n.setState({ return_qty_error: !1 }),
                !s)
              ) {
                var i = n.state.return_products;
                (i[a].is_return = !0),
                  n.setState(
                    { materialReturnDialog: !1, return_products: i },
                    function () {
                      n.calculateReturnAmount();
                    }
                  );
              }
            }),
            Wt(qt(n), "calculateReturnAmount", function () {
              for (
                var t = n.state,
                  e = t.formValues,
                  a = (t.actionProductIndex, t.discount_per_product),
                  r = n.state.return_products,
                  s = 0,
                  i = 0,
                  o = 0,
                  c = 0;
                c < r.length;
                c++
              )
                if (r[c].is_return)
                  if ("material" == e.products[c].product_type) {
                    var u = (0, w.XY)(
                        (parseFloat(e.products[c].materials[0].rate) *
                          parseFloat(
                            e.products[c].materials[0].discount_percent
                          )) /
                          100
                      ),
                      l = (0, w.XY)(
                        parseFloat(e.products[c].materials[0].rate) - u
                      ),
                      d = (0, w.XY)(
                        parseFloat(e.products[c].materials[0].return_weight) * l
                      );
                    d = (0, w.XY)(
                      d - parseFloat(e.products[c].materials[0].return_qty) * a
                    );
                    var p = (0, w.XY)(
                      parseFloat(e.products[c].total_tax) /
                        parseFloat(e.products[c].materials[0].return_qty)
                    );
                    console.log(d, p, a), (d = (0, w.XY)(d + p));
                    var m =
                      e.have_return_charge &&
                      parseFloat(e.products[c].return_charge_percent) > 0
                        ? (0, w.XY)(
                            (d *
                              parseFloat(e.products[c].return_charge_percent)) /
                              100
                          )
                        : 0;
                    (e.products[c].return_amount = d),
                      (e.products[c].return_charge = m),
                      (s += d - m),
                      (i += m),
                      (o += d);
                  } else {
                    var h = parseFloat(e.products[c].total);
                    h = (0, w.XY)(h - a);
                    var f =
                      e.have_return_charge &&
                      parseFloat(e.products[c].return_charge_percent) > 0
                        ? (h *
                            parseFloat(e.products[c].return_charge_percent)) /
                          100
                        : 0;
                    (e.products[c].return_amount = h),
                      (e.products[c].return_charge = f),
                      (s += h - f),
                      (i += f),
                      (o += h);
                  }
              for (var x, _ = 0; _ < n.state.return_products.length; _++) {
                var g = J().filter(n.state.formValues.products, {
                  id: n.state.return_products[_].id,
                });
                (g.length && 1 == g[0].is_return) ||
                  n.state.return_products[_].is_return;
              }
              (x = parseFloat(e.discount)),
                n.setState({
                  return_amount: (0, w.XY)(s, !0),
                  product_amount: (0, w.XY)(o, !0),
                  return_charge: (0, w.XY)(i, !0),
                  formValues: e,
                  return_discount: x,
                });
            }),
            Wt(qt(n), "handleReturnMaterial", function (t, e) {
              var a = n.state,
                r = a.formValues,
                s = a.actionProductIndex;
              (r.products[s].materials[0][e] = t),
                n.setState({ formValues: r });
            }),
            Wt(qt(n), "hasReturn", function () {
              for (
                var t = 0, e = !1, a = 0;
                a < n.state.return_products.length;
                a++
              ) {
                var r = J().filter(n.state.formValues.products, {
                  id: n.state.return_products[a].id,
                });
                (r.length && 1 == r[0].is_return) ||
                  (n.state.return_products[a].is_return && t++,
                  r[0].return_charge_percent > 0 && (e = !0));
              }
              return { isReturn: t, will_return_charge_apply: e };
            }),
            Wt(qt(n), "setOpen", function (t) {
              var e = n.state.view_open;
              (e[t] = !n.checkOpen(t)), n.setState({ view_open: e });
            }),
            Wt(qt(n), "checkOpen", function (t) {
              var e = n.state.view_open;
              return !(!(t in e) || !e[t]);
            }),
            Wt(qt(n), "handleAdvance", function (t) {
              n.setState(
                {
                  formValues: At(
                    At({}, n.state.formValues),
                    {},
                    { pay_from_advance: t.target.checked }
                  ),
                },
                function () {
                  n.handleCalculateMainPrice();
                }
              );
            });
          var r = "formData" in n.props ? n.props.formData : null;
          return (
            (n.state = At(
              At(
                {
                  auth: n.props.auth,
                  formData: r,
                  isCreateFrom: !r,
                  adminList: n.props.adminList,
                  retailerList: n.props.retailerList,
                  distributorList: n.props.distributorList,
                  salesExecutiveList: n.props.salesExecutiveList,
                  productList: n.props.productList,
                  productPriceInfo: n.props.productPriceInfo,
                  stockProductList: n.props.stockProductList,
                  stockProductDetails: n.props.stockProductDetails,
                  categoryList: n.props.categoryList,
                  subCategoryList: n.props.subCategoryList,
                  supplierList: n.props.supplierList,
                  materialList: [],
                  sizeList: [],
                  materials: [],
                  product_type: "",
                  productDialog: !1,
                  user_gst_no: "",
                  formValues: {
                    user_id: "",
                    invoice_number: "",
                    invoice_date: ot()().format("MM/DD/YYYY"),
                    products: [],
                    notes: "",
                    payment_mode: "cash",
                    transaction_no: "",
                    cheque_no: "",
                    taxable_amount: "",
                    total_amount: "",
                    discount: "",
                    total_payable: "",
                    paid_amount: "",
                    due_amount: "",
                    due_date: "",
                    cgst_tax: "",
                    sgst_tax: "",
                    igst_tax: "",
                    settlement_date: "",
                    product_discount: "",
                    total_tag_price: "",
                    total_tax: "",
                    image_file: "",
                    advance_amount: 0,
                    pay_from_advance: !1,
                  },
                  formErros: {
                    user_id: !1,
                    invoice_number: !1,
                    invoice_date: !1,
                    notes: !1,
                    payment_mode: !1,
                    transaction_no: !1,
                    total_amount: !1,
                    tax: !1,
                    discount: !1,
                    sub_total: !1,
                  },
                  deleteDialogOpen: !1,
                  deletingIndex: 0,
                  submitting: !1,
                },
                n.getDefaultProductFormData()
              ),
              {},
              (Wt(
                (e = {
                  actionCalled: n.props.actionCalled,
                  createSuccess: n.props.createSuccess,
                  editSuccess: n.props.editSuccess,
                  successMessage: n.props.successMessage,
                  errorMessage: n.props.errorMessage,
                  order_id: n.props.order_id,
                  order: n.props.order,
                  cartList: [],
                  common_discount: "",
                  common_making_discount: "",
                  unique_materials: [],
                  admin_details: {
                    name: "",
                    mobile: "",
                    gst: "",
                    address: "",
                    city: "",
                    pincode: "",
                  },
                  isAssign: !1,
                  isOnApprove: !1,
                  employeeList: n.props.employeeList,
                  return_products: [],
                }),
                "return_products",
                []
              ),
              Wt(e, "returnDialogOpen", !1),
              Wt(e, "return_amount", 0),
              Wt(e, "product_amount", 0),
              Wt(e, "return_charge", 0),
              Wt(e, "materialReturnDialog", !1),
              Wt(e, "actionProductIndex", 0),
              Wt(e, "return_weight_error", !1),
              Wt(e, "return_qty_error", !1),
              Wt(e, "view_open", {}),
              Wt(e, "return_date", ot()().format("MM/DD/YYYY")),
              Wt(e, "profile", null),
              Wt(e, "payment_type", "advance"),
              Wt(e, "return_payment_mode", "cash"),
              Wt(e, "return_discount", 0),
              Wt(e, "discount_per_product", 0),
              e)
            )),
            (n.isSuperAdmin = (0, w.j5)()),
            (n.isAdmin = (0, w.GJ)()),
            (n.isDistributor = (0, w.JH)()),
            (n.isSalesExecutive = (0, w.ty)()),
            (n.imageFileRef = a.createRef()),
            (n.columns = [
              { name: "image", display_name: "Image", isImage: !0 },
              { name: "product_name", display_name: "Product Name" },
              {
                name: "certificate_no",
                display_name: "Certificate No",
                width: "120px",
              },
              {
                name: "total_weight_display",
                display_name: "Total Wt.",
                width: "90px",
              },
              {
                name: "stock_material_display",
                display_name: "Materials Name",
                width: "165px",
              },
              { name: "weight_display", display_name: "Qty" },
              { name: "unit_display", display_name: "Unit" },
              { name: "product_code", display_name: "P Code" },
              { name: "size_name", display_name: "Size" },
              { name: "quantity", display_name: "Quantity" },
              { name: "rate", display_name: "Price" },
            ]),
            n
          );
        }
        return (
          (e = L),
          (r = [
            {
              key: "getDerivedStateFromProps",
              value: function (t, e) {
                var n = {};
                return (
                  t.adminList !== e.adminList && (n.adminList = t.adminList),
                  t.productList !== e.productList &&
                    (n.productList = t.productList),
                  t.actionCalled !== e.actionCalled &&
                    (n.actionCalled = t.actionCalled),
                  t.createSuccess !== e.createSuccess &&
                    (n.createSuccess = t.createSuccess),
                  t.editSuccess !== e.editSuccess &&
                    (n.editSuccess = t.editSuccess),
                  t.successMessage !== e.successMessage &&
                    (n.successMessage = t.successMessage),
                  t.errorMessage !== e.errorMessage &&
                    (n.errorMessage = t.errorMessage),
                  t.productPriceInfo !== e.productPriceInfo &&
                    (n.productPriceInfo = t.productPriceInfo),
                  t.stockProductList !== e.stockProductList &&
                    (n.stockProductList = t.stockProductList),
                  t.stockProductDetails !== e.stockProductDetails &&
                    (n.stockProductDetails = t.stockProductDetails),
                  t.categoryList !== e.categoryList &&
                    (n.categoryList = t.categoryList),
                  t.subCategoryList !== e.subCategoryList &&
                    (n.subCategoryList = t.subCategoryList),
                  t.order !== e.order && (n.order = t.order),
                  t.distributorList !== e.distributorList &&
                    (n.distributorList = t.distributorList),
                  t.retailerList !== e.retailerList &&
                    (n.retailerList = t.retailerList),
                  t.salesExecutiveList !== e.salesExecutiveList &&
                    (n.salesExecutiveList = t.salesExecutiveList),
                  t.auth !== e.auth && (n.auth = t.auth),
                  t.employeeList !== e.employeeList &&
                    (n.employeeList = t.employeeList),
                  t.formData !== e.formData && (n.formData = t.formData),
                  t.supplierList !== e.supplierList &&
                    (n.supplierList = t.supplierList),
                  n
                );
              },
            },
          ]),
          (n = [
            {
              key: "componentDidMount",
              value: function () {
                this.isSuperAdmin
                  ? (this.props.actions.adminList({ all: 1 }),
                    this.props.actions.employeeList({ role_id: 9 }))
                  : this.isAdmin
                  ? (this.props.actions.distributorList({ all: 1 }),
                    this.props.actions.supplierList({ all: 1, page: 1 }))
                  : this.isDistributor
                  ? (this.props.actions.retailerList({ all: 1 }),
                    this.props.actions.salesExecutiveList({
                      all: 1,
                      role_id: 4,
                    }),
                    this.props.actions.supplierList({ all: 1, page: 1 }))
                  : this.isSalesExecutive &&
                    (this.props.actions.retailerList({ all: 1 }),
                    this.props.actions.distributorList({ all: 1 }),
                    this.props.actions.salesExecutiveList({
                      all: 1,
                      role_id: 4,
                    })),
                  this.props.actions.categoryList({ all: 1 }),
                  this.props.dispatch({ type: et.cd, payload: null }),
                  this.state.order_id &&
                    this.props.actions.orderView(this.state.order_id),
                  this.state.formData
                    ? this.initializeFormData()
                    : (this.loadCart(), this.loadSaleOnApproval()),
                  this.loadProfile();
              },
            },
            {
              key: "componentDidUpdate",
              value: function (t) {
                var e = this;
                this.props.formData != t.formData
                  ? this.initializeFormData()
                  : this.props.query.get("sale_on_approval") !=
                      t.query.get("sale_on_approval") &&
                    this.loadSaleOnApproval(),
                  this.state.actionCalled &&
                    (this.state.isCreateFrom
                      ? this.state.createSuccess
                        ? (this.props.actions.cartList(),
                          this.props.enqueueSnackbar(
                            this.state.successMessage,
                            { variant: "success" }
                          ),
                          this.props.dispatch({ type: tt.W1 }),
                          this.props.actions.getNotifiactions(),
                          this.state.isAssign
                            ? this.props.navigate(
                                (0, w.ZA)((0, w.O2)(this.state.auth)) +
                                  "/transfer"
                              )
                            : this.state.isOnApprove
                            ? this.props.navigate(
                                (0, w.ZA)((0, w.O2)(this.state.auth)) +
                                  "/sale-on-approve"
                              )
                            : this.props.navigate(
                                (0, w.ZA)((0, w.O2)(this.state.auth)) + "/sales"
                              ))
                        : (this.setState({ submitting: !1 }),
                          this.props.enqueueSnackbar(this.state.errorMessage, {
                            variant: "error",
                          }),
                          this.props.dispatch({ type: tt.W1 }))
                      : this.state.editSuccess
                      ? (this.props.enqueueSnackbar(this.state.successMessage, {
                          variant: "success",
                        }),
                        this.props.dispatch({ type: tt.W1 }),
                        this.state.isAssign
                          ? this.props.navigate(
                              (0, w.ZA)((0, w.O2)(this.state.auth)) +
                                "/transfer"
                            )
                          : this.props.navigate(
                              (0, w.ZA)((0, w.O2)(this.state.auth)) + "/sales"
                            ))
                      : (this.setState({ submitting: !1 }),
                        this.props.enqueueSnackbar(this.state.errorMessage, {
                          variant: "error",
                        }),
                        this.props.dispatch({ type: tt.W1 }))),
                  t.order != this.props.order &&
                    this.props.order &&
                    (this.setState({
                      formValues: At(
                        At({}, this.state.formValues),
                        {},
                        { user_id: this.props.order.user_details.id }
                      ),
                      admin_details: At(
                        At({}, this.state.admin_details),
                        {},
                        {
                          name: this.props.order.user_details.name,
                          company_name:
                            this.props.order.user_details.company_name,
                          mobile: this.props.order.user_details.mobile,
                          city: this.props.order.user_details.city,
                          gst: this.props.order.user_details.gst,
                          address: this.props.order.user_details.address,
                          pincode: this.props.order.user_details.pincode,
                        }
                      ),
                    }),
                    setTimeout(function () {
                      e.setState(
                        { formValues: At({}, e.state.formValues) },
                        function () {
                          var t = null;
                          e.props.order.is_customer &&
                            e.props.order.paid_amount > 0 &&
                            (t = e.props.order.paid_amount),
                            e.handleAdminChange(
                              "",
                              e.props.order.user_details.id,
                              t
                            );
                        }
                      );
                    }, 1e3));
              },
            },
            {
              key: "render",
              value: function () {
                var t,
                  e = this,
                  n = this.state,
                  r = n.formValues,
                  s = n.formErros,
                  N = n.productFormValues,
                  k = n.productFormErros,
                  C = n.materialFormErros,
                  S = n.submitting,
                  L = n.order,
                  F = n.actionProductIndex,
                  A = r.products.length ? r.products[F] : null,
                  M = this.getUserList();
                t = this.state.isAssign
                  ? r.user_id
                    ? 2
                    : 4
                  : r.user_id
                  ? 4
                  : 6;
                var O = r.user_id ? J().filter(M, { id: r.user_id }) : [],
                  K = O.length ? O[0] : null,
                  tt = this.hasReturn(),
                  et = tt.will_return_charge_apply,
                  nt = tt.isReturn,
                  at = 0;
                if (
                  0 == parseFloat(r.due_amount) &&
                  parseFloat(r.total_payable) == parseFloat(r.paid_amount)
                ) {
                  for (
                    var rt = 0, st = 0, it = 0;
                    it < this.state.return_products.length;
                    it++
                  ) {
                    var ot = J().filter(r.products, {
                      id: this.state.return_products[it].id,
                    });
                    (ot.length && 1 == ot[0].is_return) ||
                      (this.state.return_products[it].is_return ? st++ : rt++);
                  }
                  1 == st && 0 == rt
                    ? ((at = parseFloat(r.paid_amount)),
                      (at = (0, w.XY)(at - this.state.return_charge)))
                    : 1 == st &&
                      rt > 0 &&
                      (at = parseFloat(this.state.return_amount));
                } else
                  this.state.formValues.due_amount &&
                    parseFloat(this.state.return_amount) >
                      parseFloat(this.state.formValues.due_amount) &&
                    (at = (0, w.XY)(
                      parseFloat(this.state.return_amount) -
                        parseFloat(this.state.formValues.due_amount)
                    ));
                return (0, kt.jsxs)(i.Z, {
                  sx: { flexGrow: 1, m: 0.5 },
                  className: "ratn-dialog-inner sale_create_page",
                  children: [
                    (0, kt.jsxs)(o.ZP, {
                      container: !0,
                      spacing: 2,
                      columnSpacing: { xs: 1, sm: 2, md: 2 },
                      className: "tax-input loans_view p_view",
                      children: [
                        L
                          ? (0, kt.jsx)(o.ZP, {
                              item: !0,
                              xs: 12,
                              md: 12,
                              className: "create-input",
                              children: (0, kt.jsxs)(ut.Z, {
                                className: "rtn_accordion",
                                children: [
                                  (0, kt.jsx)(lt.Z, {
                                    expandIcon: (0, kt.jsx)(mt.Z, {}),
                                    "aria-controls": "panel1a-content",
                                    id: "panel1a-header",
                                    children: (0, kt.jsxs)(pt.Z, {
                                      children: [
                                        "Order # ",
                                        L.order_no,
                                        " | ",
                                        L.order_from,
                                        " | ",
                                        L.order_date,
                                      ],
                                    }),
                                  }),
                                  (0, kt.jsx)(dt.Z, {
                                    children: (0, kt.jsx)(bt.Z, {
                                      columns: this.columns,
                                      rows: L.products,
                                      page: 1,
                                      limit: L.products.length,
                                      total: L.products.length,
                                      havePagination: !1,
                                    }),
                                  }),
                                ],
                              }),
                            })
                          : null,
                        (0, kt.jsxs)(o.ZP, {
                          container: !0,
                          spacing: 2,
                          columnSpacing: { xs: 1, sm: 2, md: 2 },
                          children: [
                            this.state.isAssign
                              ? (0, kt.jsx)(o.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 2,
                                  className: "create-input",
                                  children: (0, kt.jsx)(c.Z, {
                                    fullWidth: !0,
                                    children: (0, kt.jsx)(u.Z, {
                                      variant: "contained",
                                      size: "small",
                                      onClick: this.handleBackAssign,
                                      startIcon: (0, kt.jsx)(vt.Z, {}),
                                      children: "Back",
                                    }),
                                  }),
                                })
                              : null,
                            (0, kt.jsx)(o.ZP, {
                              item: !0,
                              md: t,
                              xs: 12,
                              className: "create-input",
                              children: (0, kt.jsx)(c.Z, {
                                fullWidth: !0,
                                error: s.user_id,
                                children:
                                  L && L.is_customer
                                    ? (0, kt.jsx)(l.Z, {
                                        label: "Name",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: L.user_details.name,
                                        disabled: !0,
                                        inputProps: {
                                          className: "non_disable_text",
                                        },
                                      })
                                    : (0, kt.jsx)(d.Z, {
                                        className: "autocomplete-selectbox",
                                        fullWidth: !0,
                                        options: M,
                                        value: K,
                                        autoHighlight: !0,
                                        getOptionLabel: function (t) {
                                          return e.state.isAssign
                                            ? t.name
                                            : t.company_name;
                                        },
                                        renderOption: function (t, n) {
                                          return (0, a.createElement)(
                                            "li",
                                            At(At({}, t), {}, { key: n.id }),
                                            e.state.isAssign
                                              ? n.name
                                              : n.company_name
                                          );
                                        },
                                        renderInput: function (t) {
                                          return (0, kt.jsx)(
                                            l.Z,
                                            At(
                                              At({}, t),
                                              {},
                                              {
                                                label: e.state.isAssign
                                                  ? "Transfer To"
                                                  : "Company Name",
                                                inputProps: At(
                                                  At({}, t.inputProps),
                                                  {},
                                                  {
                                                    autoComplete:
                                                      "new-password",
                                                  }
                                                ),
                                                fullWidth: !0,
                                                error: s.user_id,
                                                className: "non_disable_text",
                                              }
                                            )
                                          );
                                        },
                                        onChange: function (t, n) {
                                          e.handleAdminChange(t, n ? n.id : "");
                                        },
                                        disabled:
                                          !this.state.isCreateFrom ||
                                          !(0, w.xb)(
                                            this.props.query.get(
                                              "sale_on_approval"
                                            )
                                          ) ||
                                          !!L,
                                      }),
                              }),
                            }),
                            r.user_id
                              ? (0, kt.jsxs)(kt.Fragment, {
                                  children: [
                                    (0, kt.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 6,
                                      md: 2,
                                      className: "create-input",
                                      children: (0, kt.jsx)(l.Z, {
                                        label: "Owner Name",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: this.state.admin_details.name,
                                        disabled: !0,
                                        inputProps: {
                                          className: "non_disable_text",
                                        },
                                      }),
                                    }),
                                    (0, kt.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 6,
                                      md: 2,
                                      className: "create-input",
                                      children: (0, kt.jsx)(l.Z, {
                                        label: "Contact Number",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: this.state.admin_details.mobile,
                                        disabled: !0,
                                        inputProps: {
                                          className: "non_disable_text",
                                        },
                                      }),
                                    }),
                                    (0, kt.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 6,
                                      md: 2,
                                      className: "create-input",
                                      children: (0, kt.jsx)(l.Z, {
                                        label: "City",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: this.state.admin_details.city,
                                        disabled: !0,
                                        inputProps: {
                                          className: "non_disable_text",
                                        },
                                      }),
                                    }),
                                  ],
                                })
                              : null,
                            r.user_id
                              ? null
                              : (0, kt.jsx)(o.ZP, {
                                  item: !0,
                                  xs: 6,
                                  md: 3,
                                  className: "create-input",
                                  children: (0, kt.jsx)(l.Z, {
                                    label: "Invoice Number",
                                    variant: "outlined",
                                    fullWidth: !0,
                                    value: r.invoice_number,
                                    onChange: function (t) {
                                      return e.handleDefaultChange(
                                        t,
                                        "invoice_number"
                                      );
                                    },
                                    disabled: !this.state.isCreateFrom,
                                    className: "non_disable_text",
                                  }),
                                }),
                            (0, kt.jsx)(o.ZP, {
                              item: !0,
                              xs: (r.user_id, 6),
                              md: r.user_id ? 2 : 3,
                              className: "create-input p-invoice-date",
                              children: (0, kt.jsx)(R._, {
                                dateAdapter: z.y,
                                children: (0, kt.jsx)(X.M, {
                                  label: "Invoice Date",
                                  value: r.invoice_date,
                                  inputFormat: "DD/MM/YYYY",
                                  disabled: !this.state.isCreateFrom,
                                  onChange: function (t) {
                                    return e.updateFormValues(
                                      t,
                                      "invoice_date"
                                    );
                                  },
                                  renderInput: function (t) {
                                    return (0, kt.jsx)(
                                      l.Z,
                                      At(
                                        At({}, t),
                                        {},
                                        {
                                          error: s.invoice_date,
                                          className: "non_disable_text",
                                        }
                                      )
                                    );
                                  },
                                }),
                              }),
                            }),
                            r.user_id
                              ? (0, kt.jsxs)(kt.Fragment, {
                                  children: [
                                    (0, kt.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 12,
                                      md: 8,
                                      className: "create-input",
                                      children: (0, kt.jsx)(l.Z, {
                                        label: "Full Address",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: this.state.admin_details.address,
                                        disabled: !0,
                                        inputProps: {
                                          className: "non_disable_text",
                                        },
                                      }),
                                    }),
                                    (0, kt.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 6,
                                      md: 2,
                                      className: "create-input",
                                      children: (0, kt.jsx)(l.Z, {
                                        label: "GST Number",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: this.state.admin_details.gst,
                                        disabled: !0,
                                        inputProps: {
                                          className: "non_disable_text",
                                        },
                                      }),
                                    }),
                                    (0, kt.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 6,
                                      md: 2,
                                      className: "create-input",
                                      children: (0, kt.jsx)(l.Z, {
                                        label: "Invoice Number",
                                        variant: "outlined",
                                        fullWidth: !0,
                                        value: r.invoice_number,
                                        onChange: function (t) {
                                          return e.handleDefaultChange(
                                            t,
                                            "invoice_number"
                                          );
                                        },
                                        className: "non_disable_text",
                                        disabled: !this.state.isCreateFrom,
                                      }),
                                    }),
                                  ],
                                })
                              : null,
                          ],
                        }),
                      ],
                    }),
                    (0, kt.jsxs)(o.ZP, {
                      container: !0,
                      spacing: 2,
                      columnSpacing: { xs: 1, sm: 2, md: 2 },
                      className: "tax-input loans_view",
                      children: [
                        (0, kt.jsx)(o.ZP, {
                          item: !0,
                          xs: 12,
                          md: 12,
                          className:
                            " create-input p-add-product border-radius-0",
                          children: (0, kt.jsx)(U.Z, {
                            component: H.Z,
                            children: (0, kt.jsxs)(T.Z, {
                              sx: { minWidth: 650 },
                              "aria-label": "simple table",
                              className:
                                "ratn-table-product-wrapper sale_form_table",
                              children: [
                                (0, kt.jsx)(B.Z, {
                                  className: "ratn-table-header p_view",
                                  children: (0, kt.jsxs)(Q.Z, {
                                    children: [
                                      this.state.isCreateFrom
                                        ? null
                                        : (0, kt.jsx)($.Z, {
                                            sx: { width: "30px" },
                                          }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: 15 },
                                        children: "#",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: 225 },
                                        children: "Product Name",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: 90 },
                                        children: "Size",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: 120 },
                                        children: "Certificate No",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: 90 },
                                        children: "Matl Cost",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: 160 },
                                        children: "Mac Charge",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: "40px" },
                                        children: "Price",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: "20px" },
                                        children: "Dist",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: "80px" },
                                        children: "Tax",
                                      }),
                                      (0, kt.jsx)($.Z, {
                                        sx: { width: "40px" },
                                        children: "Total",
                                      }),
                                      this.state.isCreateFrom
                                        ? (0, kt.jsx)($.Z, {
                                            sx: { width: "20px" },
                                            children: "Actions",
                                          })
                                        : null,
                                    ],
                                  }),
                                }),
                                (0, kt.jsxs)(G.Z, {
                                  children: [
                                    r.products.map(function (t, n) {
                                      return (0, kt.jsxs)(
                                        a.Fragment,
                                        {
                                          children: [
                                            (0, kt.jsxs)(Q.Z, {
                                              className: "product_details",
                                              children: [
                                                e.state.isCreateFrom
                                                  ? null
                                                  : (0, kt.jsxs)($.Z, {
                                                      children: [
                                                        t.is_return
                                                          ? null
                                                          : (0, kt.jsx)(p.Z, {
                                                              onChange:
                                                                function (t) {
                                                                  return e.handleCheckBox(
                                                                    t,
                                                                    n
                                                                  );
                                                                },
                                                              checked:
                                                                e.state
                                                                  .return_products[
                                                                  n
                                                                ].is_return,
                                                            }),
                                                        !t.is_return &&
                                                        "material" ==
                                                          t.product_type &&
                                                        t.materials[0]
                                                          .return_weight
                                                          ? (0, kt.jsx)(m.Z, {
                                                              "aria-label":
                                                                "expand row",
                                                              size: "small",
                                                              onClick:
                                                                function () {
                                                                  return e.setOpen(
                                                                    t.id
                                                                  );
                                                                },
                                                              children:
                                                                e.checkOpen(
                                                                  t.id
                                                                )
                                                                  ? (0, kt.jsx)(
                                                                      ft.Z,
                                                                      {}
                                                                    )
                                                                  : (0, kt.jsx)(
                                                                      ht.Z,
                                                                      {}
                                                                    ),
                                                            })
                                                          : null,
                                                      ],
                                                    }),
                                                (0, kt.jsx)($.Z, {
                                                  children: n + 1,
                                                }),
                                                (0, kt.jsxs)($.Z, {
                                                  children: [
                                                    t.product_name,
                                                    " X ",
                                                    t.quantity,
                                                  ],
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.size_name,
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  colSpan: 7,
                                                  children: t.certificate_no,
                                                }),
                                                e.state.isCreateFrom
                                                  ? (0, kt.jsx)($.Z, {
                                                      rowSpan: 2,
                                                      className:
                                                        "action_column",
                                                      style: {
                                                        textAlign: "center",
                                                      },
                                                      children: (0, kt.jsx)(
                                                        u.Z,
                                                        {
                                                          variant: "contained",
                                                          className:
                                                            "sale-cross-icon",
                                                          onClick: function () {
                                                            return e.handleProductDelete(
                                                              n
                                                            );
                                                          },
                                                          children: " X ",
                                                        }
                                                      ),
                                                    })
                                                  : null,
                                              ],
                                            }),
                                            (0, kt.jsxs)(Q.Z, {
                                              className: "material_details",
                                              children: [
                                                (0, kt.jsx)($.Z, {}),
                                                e.state.isCreateFrom
                                                  ? null
                                                  : (0, kt.jsx)(kt.Fragment, {
                                                      children: (0, kt.jsx)(
                                                        $.Z,
                                                        {}
                                                      ),
                                                    }),
                                                (0, kt.jsx)($.Z, {
                                                  colSpan: 2,
                                                  children: t.materials.map(
                                                    function (t, e) {
                                                      return (0, kt.jsx)(
                                                        "div",
                                                        {
                                                          className:
                                                            "products-data-container",
                                                          children: (0,
                                                          kt.jsxs)("div", {
                                                            className:
                                                              "products-data-row",
                                                            children: [
                                                              (0, kt.jsxs)(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "products-data",
                                                                  style: {
                                                                    position:
                                                                      "relative",
                                                                  },
                                                                  children: [
                                                                    t.material_name,
                                                                    "  (",
                                                                    t.purity,
                                                                    ")    ",
                                                                    t.weight,
                                                                    "    ",
                                                                    t.unit_name,
                                                                    "     x     ",
                                                                    t.rate,
                                                                    " ",
                                                                  ],
                                                                },
                                                                e
                                                              ),
                                                              (0, kt.jsxs)(
                                                                "div",
                                                                {
                                                                  className:
                                                                    "products-amount",
                                                                  children: [
                                                                    " =    ",
                                                                    t.amount,
                                                                  ],
                                                                }
                                                              ),
                                                            ],
                                                          }),
                                                        },
                                                        e
                                                      );
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.materials.map(
                                                    function (t, a) {
                                                      return (0, kt.jsx)(
                                                        "div",
                                                        {
                                                          className:
                                                            "sale-discount-wrapper",
                                                          children: (0, kt.jsx)(
                                                            kt.Fragment,
                                                            {
                                                              children:
                                                                t.max_discount_percent >
                                                                  0 &&
                                                                !e.state
                                                                  .isAssign
                                                                  ? (0,
                                                                    kt.jsxs)(
                                                                      kt.Fragment,
                                                                      {
                                                                        children:
                                                                          [
                                                                            "Dis@ ",
                                                                            (0,
                                                                            kt.jsxs)(
                                                                              "div",
                                                                              {
                                                                                className:
                                                                                  "sale-discount",
                                                                                children:
                                                                                  [
                                                                                    (0,
                                                                                    kt.jsx)(
                                                                                      "input",
                                                                                      {
                                                                                        type: "text",
                                                                                        value:
                                                                                          t.discount_percent,
                                                                                        onChange:
                                                                                          function (
                                                                                            t
                                                                                          ) {
                                                                                            return e.handleMaterialDisc(
                                                                                              t,
                                                                                              n,
                                                                                              a
                                                                                            );
                                                                                          },
                                                                                        className:
                                                                                          "custom_input",
                                                                                        max: t.max_discount_percent,
                                                                                        disabled:
                                                                                          nt
                                                                                            ? "disabled"
                                                                                            : "",
                                                                                      }
                                                                                    ),
                                                                                    (0,
                                                                                    kt.jsx)(
                                                                                      "div",
                                                                                      {
                                                                                        className:
                                                                                          "sale-discount-inner",
                                                                                        children:
                                                                                          " %",
                                                                                      }
                                                                                    ),
                                                                                  ],
                                                                              }
                                                                            ),
                                                                            " ",
                                                                            t.mrp,
                                                                          ],
                                                                      }
                                                                    )
                                                                  : " - ",
                                                            }
                                                          ),
                                                        },
                                                        a
                                                      );
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.materials.map(
                                                    function (t, e) {
                                                      return (0, kt.jsx)(
                                                        "p",
                                                        {
                                                          children: (0, w.XY)(
                                                            t.amount -
                                                              t.discount_amount
                                                          ),
                                                        },
                                                        e
                                                      );
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsxs)($.Z, {
                                                  children: [
                                                    t.making_charge,
                                                    t.max_making_charge_discount_percent >
                                                      0 && !e.state.isAssign
                                                      ? (0, kt.jsxs)(
                                                          kt.Fragment,
                                                          {
                                                            children: [
                                                              "@ ",
                                                              (0, kt.jsxs)(
                                                                "span",
                                                                {
                                                                  style: {
                                                                    position:
                                                                      "relative",
                                                                  },
                                                                  children: [
                                                                    (0, kt.jsx)(
                                                                      "input",
                                                                      {
                                                                        type: "text",
                                                                        value:
                                                                          t.making_charge_discount_percent,
                                                                        onChange:
                                                                          function (
                                                                            t
                                                                          ) {
                                                                            return e.handleMakingDiscount(
                                                                              t,
                                                                              n
                                                                            );
                                                                          },
                                                                        className:
                                                                          "custom_input",
                                                                        max: t.max_making_charge_discount_percent,
                                                                        disabled:
                                                                          nt
                                                                            ? "disabled"
                                                                            : "",
                                                                      }
                                                                    ),
                                                                    (0, kt.jsx)(
                                                                      "span",
                                                                      {
                                                                        style: {
                                                                          position:
                                                                            "absolute",
                                                                          right:
                                                                            "1px",
                                                                          top: "0px",
                                                                        },
                                                                        children:
                                                                          " %",
                                                                      }
                                                                    ),
                                                                  ],
                                                                }
                                                              ),
                                                              "  ",
                                                              (0, w.XY)(
                                                                t.making_charge -
                                                                  t.making_charge_discount_amount
                                                              ),
                                                            ],
                                                          }
                                                        )
                                                      : null,
                                                  ],
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.sub_price,
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.total_discount,
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.total_tax,
                                                }),
                                                (0, kt.jsx)($.Z, {
                                                  children: t.total,
                                                }),
                                              ],
                                            }),
                                            !e.state.isCreateFrom &&
                                            1 == t.materials.length &&
                                            e.checkOpen(t.id)
                                              ? (0, kt.jsx)(Q.Z, {
                                                  className: "table-inner-row",
                                                  children: (0, kt.jsx)($.Z, {
                                                    style: {
                                                      paddingBottom: 0,
                                                      paddingTop: 0,
                                                    },
                                                    colSpan: 12,
                                                    children: (0, kt.jsx)(h.Z, {
                                                      in: e.checkOpen(t.id),
                                                      timeout: "auto",
                                                      unmountOnExit: !0,
                                                      children: (0, kt.jsxs)(
                                                        i.Z,
                                                        {
                                                          sx: { margin: 1 },
                                                          children: [
                                                            (0, kt.jsx)(pt.Z, {
                                                              variant: "h6",
                                                              gutterBottom: !0,
                                                              component: "div",
                                                            }),
                                                            (0, kt.jsxs)(T.Z, {
                                                              size: "medium",
                                                              "aria-label":
                                                                "purchases",
                                                              children: [
                                                                (0, kt.jsx)(
                                                                  B.Z,
                                                                  {
                                                                    children:
                                                                      (0,
                                                                      kt.jsxs)(
                                                                        Q.Z,
                                                                        {
                                                                          className:
                                                                            "pur-details-inner-table",
                                                                          children:
                                                                            [
                                                                              (0,
                                                                              kt.jsx)(
                                                                                $.Z,
                                                                                {
                                                                                  children:
                                                                                    "Quantity",
                                                                                }
                                                                              ),
                                                                              (0,
                                                                              kt.jsx)(
                                                                                $.Z,
                                                                                {
                                                                                  children:
                                                                                    "Weight",
                                                                                }
                                                                              ),
                                                                              (0,
                                                                              kt.jsx)(
                                                                                $.Z,
                                                                                {
                                                                                  children:
                                                                                    "Unit",
                                                                                }
                                                                              ),
                                                                            ],
                                                                        }
                                                                      ),
                                                                  }
                                                                ),
                                                                (0, kt.jsx)(
                                                                  G.Z,
                                                                  {
                                                                    className:
                                                                      "pur-details-table-body",
                                                                    children:
                                                                      (0,
                                                                      kt.jsxs)(
                                                                        Q.Z,
                                                                        {
                                                                          children:
                                                                            [
                                                                              (0,
                                                                              kt.jsx)(
                                                                                $.Z,
                                                                                {
                                                                                  scope:
                                                                                    "row",
                                                                                  children:
                                                                                    t
                                                                                      .materials[0]
                                                                                      .return_qty,
                                                                                }
                                                                              ),
                                                                              (0,
                                                                              kt.jsxs)(
                                                                                $.Z,
                                                                                {
                                                                                  children:
                                                                                    [
                                                                                      " ",
                                                                                      t
                                                                                        .materials[0]
                                                                                        .return_weight,
                                                                                    ],
                                                                                }
                                                                              ),
                                                                              (0,
                                                                              kt.jsx)(
                                                                                $.Z,
                                                                                {
                                                                                  children:
                                                                                    t
                                                                                      .materials[0]
                                                                                      .unit_name,
                                                                                }
                                                                              ),
                                                                            ],
                                                                        }
                                                                      ),
                                                                  }
                                                                ),
                                                              ],
                                                            }),
                                                          ],
                                                        }
                                                      ),
                                                    }),
                                                  }),
                                                })
                                              : null,
                                          ],
                                        },
                                        n
                                      );
                                    }),
                                    this.state.isAssign
                                      ? null
                                      : (0, kt.jsxs)(Q.Z, {
                                          children: [
                                            (0, kt.jsx)($.Z, {}),
                                            (0, kt.jsx)($.Z, {
                                              colSpan: "4",
                                              children: (0, kt.jsx)("div", {
                                                className: "unique-wrapper",
                                                children: (0, kt.jsx)("div", {
                                                  className:
                                                    "unique-wrapper-row",
                                                  children:
                                                    this.state.unique_materials.map(
                                                      function (t, n) {
                                                        return (0, kt.jsx)(
                                                          a.Fragment,
                                                          {
                                                            children: (0,
                                                            kt.jsxs)("div", {
                                                              className:
                                                                "unique_materials",
                                                              children: [
                                                                (0, kt.jsx)(
                                                                  "p",
                                                                  {
                                                                    children:
                                                                      t.material_name,
                                                                  }
                                                                ),
                                                                (0, kt.jsxs)(
                                                                  "span",
                                                                  {
                                                                    style: {
                                                                      position:
                                                                        "relative",
                                                                    },
                                                                    children: [
                                                                      (0,
                                                                      kt.jsx)(
                                                                        "input",
                                                                        {
                                                                          type: "text",
                                                                          value:
                                                                            t.amount,
                                                                          onChange:
                                                                            function (
                                                                              t
                                                                            ) {
                                                                              return e.handleCommonDis(
                                                                                t,
                                                                                n
                                                                              );
                                                                            },
                                                                          className:
                                                                            "custom_input",
                                                                          style:
                                                                            {
                                                                              width:
                                                                                "100%",
                                                                              height:
                                                                                "40px",
                                                                              padding:
                                                                                "5px 8px",
                                                                            },
                                                                          max: t.max_discount,
                                                                        }
                                                                      ),
                                                                      (0,
                                                                      kt.jsx)(
                                                                        "span",
                                                                        {
                                                                          style:
                                                                            {
                                                                              position:
                                                                                "absolute",
                                                                              right:
                                                                                "5px",
                                                                              top: "0px",
                                                                            },
                                                                          children:
                                                                            " %",
                                                                        }
                                                                      ),
                                                                    ],
                                                                  }
                                                                ),
                                                              ],
                                                            }),
                                                          },
                                                          n
                                                        );
                                                      }
                                                    ),
                                                }),
                                              }),
                                            }),
                                            (0, kt.jsx)($.Z, {
                                              sx: { verticalAlign: "top" },
                                              children:
                                                this.haveMakingComonDis()
                                                  ? (0, kt.jsxs)(kt.Fragment, {
                                                      children: [
                                                        (0, kt.jsx)("p", {
                                                          children:
                                                            "Making Disc",
                                                        }),
                                                        (0, kt.jsxs)("span", {
                                                          style: {
                                                            position:
                                                              "relative",
                                                          },
                                                          children: [
                                                            (0, kt.jsx)(
                                                              "input",
                                                              {
                                                                type: "text",
                                                                value:
                                                                  this.state
                                                                    .common_making_discount,
                                                                onChange:
                                                                  function (t) {
                                                                    return e.handleCommonMakingDis(
                                                                      t
                                                                    );
                                                                  },
                                                                className:
                                                                  "custom_input",
                                                                style: {
                                                                  width: "90%",
                                                                  height:
                                                                    "40px",
                                                                  padding:
                                                                    "5px 8px",
                                                                },
                                                                disabled: nt
                                                                  ? "disabled"
                                                                  : "",
                                                              }
                                                            ),
                                                            (0, kt.jsx)(
                                                              "span",
                                                              {
                                                                style: {
                                                                  position:
                                                                    "absolute",
                                                                  right: "5px",
                                                                  top: "0px",
                                                                },
                                                                children: " %",
                                                              }
                                                            ),
                                                          ],
                                                        }),
                                                      ],
                                                    })
                                                  : null,
                                            }),
                                            (0, kt.jsx)($.Z, {
                                              sx: { verticalAlign: "top" },
                                              children: (0, kt.jsxs)("b", {
                                                className: "mob-hide",
                                                children: [
                                                  "Price",
                                                  (0, kt.jsx)("br", {}),
                                                  (0, w.XY)(r.total_tag_price),
                                                ],
                                              }),
                                            }),
                                            (0, kt.jsx)($.Z, {
                                              sx: { verticalAlign: "top" },
                                              children: (0, kt.jsxs)("b", {
                                                className: "mob-hide",
                                                children: [
                                                  "Dist",
                                                  (0, kt.jsx)("br", {}),
                                                  (0, w.XY)(r.product_discount),
                                                ],
                                              }),
                                            }),
                                            (0, kt.jsx)($.Z, {
                                              sx: { verticalAlign: "top" },
                                              children: (0, kt.jsxs)("b", {
                                                className: "mob-hide",
                                                children: [
                                                  "Tax",
                                                  (0, kt.jsx)("br", {}),
                                                  (0, w.RS)(r.total_tax),
                                                ],
                                              }),
                                            }),
                                            (0, kt.jsx)($.Z, {
                                              colSpan: "2",
                                              sx: { verticalAlign: "top" },
                                              children: (0, kt.jsxs)("b", {
                                                className: "mob-hide",
                                                children: [
                                                  "Total Amount",
                                                  (0, kt.jsx)("br", {}),
                                                  (0, w.RS)(r.total_amount),
                                                ],
                                              }),
                                            }),
                                          ],
                                        }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, kt.jsx)(o.ZP, {
                          item: !0,
                          xs: 12,
                          md: 8,
                          style: {},
                          children: (0, kt.jsx)(o.ZP, {
                            container: !0,
                            spacing: 2,
                            className: "mob_responsive_purchase_input",
                            children: (0, kt.jsxs)("ul", {
                              className: "sale_total",
                              children: [
                                (0, kt.jsxs)("li", {
                                  children: [
                                    "Price ",
                                    (0, kt.jsx)("span", {
                                      children: (0, w.XY)(r.total_tag_price),
                                    }),
                                  ],
                                }),
                                (0, kt.jsxs)("li", {
                                  children: [
                                    "Dist ",
                                    (0, kt.jsx)("span", {
                                      children: (0, w.XY)(r.product_discount),
                                    }),
                                  ],
                                }),
                                (0, kt.jsxs)("li", {
                                  children: [
                                    "Tax ",
                                    (0, kt.jsx)("span", {
                                      children: (0, w.RS)(r.total_tax),
                                    }),
                                  ],
                                }),
                                (0, kt.jsxs)("li", {
                                  children: [
                                    "Total Amount ",
                                    (0, kt.jsx)("span", {
                                      children: (0, w.RS)(r.total_amount),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        }),
                        (0, kt.jsx)(o.ZP, {
                          item: !0,
                          xs: 12,
                          md: 8,
                          style: {},
                          children: (0, kt.jsxs)(o.ZP, {
                            container: !0,
                            spacing: 2,
                            columnSpacing: { xs: 1, sm: 2, md: 2 },
                            className: "mob_responsive_purchase_input",
                            children: [
                              (this.isSalesExecutive ||
                                this.isDistributor ||
                                this.isSuperAdmin ||
                                this.isAdmin) &&
                              !this.state.isAssign &&
                              !r.user_id &&
                              this.state.isCreateFrom &&
                              (0, w.xb)(
                                this.props.query.get("sale_on_approval")
                              )
                                ? (0, kt.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    className: "create-input button-right",
                                    style: {
                                      paddingTop: "0px",
                                      paddingBottom: "7px",
                                    },
                                    children: (0, kt.jsx)(u.Z, {
                                      variant: "contained",
                                      size: "small",
                                      onClick: this.handleTransfer,
                                      children: "Transfer",
                                    }),
                                  })
                                : null,
                              (0, kt.jsx)(o.ZP, {
                                item: !0,
                                xs: 12,
                                md: 12,
                                className: "create-input",
                                style: { paddingTop: "0px" },
                                children: (0, kt.jsx)(f.Z, {
                                  className: "description",
                                  minRows: 3,
                                  placeholder: "Notes",
                                  style: { width: "100%" },
                                  value: r.notes,
                                  onChange: function (t) {
                                    return e.handleDefaultChange(t, "notes");
                                  },
                                }),
                              }),
                              0 == this.props.query.get("all_added")
                                ? (0, kt.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    md: 12,
                                    className: "create-input",
                                    children: (0, kt.jsx)(x.Z, {
                                      variant: "filled",
                                      severity: "error",
                                      children:
                                        "You doesn't have enough stock.",
                                    }),
                                  })
                                : null,
                              (this.isSalesExecutive || this.isDistributor) &&
                              this.state.isAssign
                                ? (0, kt.jsxs)(kt.Fragment, {
                                    children: [
                                      r.image_file
                                        ? (0, kt.jsxs)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 2,
                                            className: "create-input",
                                            style: { position: "relative" },
                                            children: [
                                              (0, kt.jsx)(D.Z, {
                                                onClick: this.deleteImage,
                                                className: "image_delete",
                                                style: {
                                                  position: "absolute",
                                                  right: 0,
                                                  color: "#ff0000",
                                                  cursor: "pointer",
                                                },
                                              }),
                                              (0, kt.jsx)("img", {
                                                src: this.getImageSrc(
                                                  r.image_file
                                                ),
                                                id: "logo-img",
                                                style: {
                                                  height: "100px",
                                                  width: "100px",
                                                },
                                              }),
                                            ],
                                          })
                                        : (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 2,
                                            className: "create-input",
                                            children: (0, kt.jsx)("img", {
                                              src: Zt.Z,
                                              id: "logo-img1",
                                              style: {
                                                height: "100px",
                                                width: "100px",
                                              },
                                            }),
                                          }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 4,
                                        className: "create-input",
                                        children: (0, kt.jsxs)(u.Z, {
                                          variant: "contained",
                                          className: "image-button",
                                          component: "label",
                                          endIcon: (0, kt.jsx)(jt.Z, {}),
                                          children: [
                                            "Image",
                                            (0, kt.jsx)("input", {
                                              name: "main_image",
                                              hidden: !0,
                                              accept: "image/*",
                                              type: "file",
                                              onChange: function (t) {
                                                return e.onChangeImage(t);
                                              },
                                              ref: this.imageFileRef,
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  })
                                : null,
                            ],
                          }),
                        }),
                        this.state.isAssign
                          ? null
                          : (0, kt.jsx)(o.ZP, {
                              item: !0,
                              xs: 12,
                              md: 4,
                              style: {
                                paddingRight: "16px",
                                paddingTop: "8px",
                              },
                              children: (0, kt.jsxs)(o.ZP, {
                                container: !0,
                                spacing: 2,
                                columnSpacing: { xs: 1, sm: 2, md: 2 },
                                className:
                                  "mob_responsive_purchase_input_table",
                                children: [
                                  nt
                                    ? (0, kt.jsxs)(kt.Fragment, {
                                        children: [
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children:
                                                    "Return Product Amt",
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value:
                                                      this.state.product_amount,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                      className:
                                                        "non_disable_text",
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          this.state.return_discount > 0
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                md: 12,
                                                className: "pt-5",
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: "Discount",
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          className:
                                                            "ft-amount",
                                                          fullWidth: !0,
                                                          value:
                                                            this.state
                                                              .return_discount,
                                                          disabled: !0,
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                            className:
                                                              "non_disable_text",
                                                          },
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                          r.have_return_charge
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                md: 12,
                                                className: "pt-5",
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: "Return Charge",
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          className:
                                                            "ft-amount",
                                                          fullWidth: !0,
                                                          value:
                                                            this.state
                                                              .return_charge,
                                                          disabled: !0,
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                            className:
                                                              "non_disable_text",
                                                          },
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                          1 == r.products.length
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                className: "pt-5",
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, kt.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            " Cash Discount ",
                                                        }
                                                      ),
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          className:
                                                            "ft-amount",
                                                          fullWidth: !0,
                                                          value: r.discount,
                                                          onChange: function (
                                                            t
                                                          ) {
                                                            return e.handleDefaultChange(
                                                              t,
                                                              "discount"
                                                            );
                                                          },
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                          },
                                                          disabled: !0,
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)("b", {
                                                    children: "Return Amount",
                                                  }),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value:
                                                      this.state.return_amount,
                                                    onChange: function (t) {
                                                      return e.setState({
                                                        return_amount:
                                                          t.target.value,
                                                      });
                                                    },
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                      className:
                                                        "non_disable_text",
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                        ],
                                      })
                                    : (0, kt.jsxs)(kt.Fragment, {
                                        children: [
                                          r.cgst_tax > 0
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                md: 12,
                                                className: "pt-5",
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  spacing: 2,
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, kt.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            "CGST Amount",
                                                        }
                                                      ),
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          label: "CGST",
                                                          variant: "outlined",
                                                          fullWidth: !0,
                                                          value: r.cgst_tax,
                                                          disabled: !0,
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                            className:
                                                              "non_disable_text",
                                                          },
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                          r.sgst_tax > 0
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                md: 12,
                                                className: "pt-5",
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, kt.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            "SGST Amount",
                                                        }
                                                      ),
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          fullWidth: !0,
                                                          value: r.sgst_tax,
                                                          disabled: !0,
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                            className:
                                                              "non_disable_text",
                                                          },
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                          r.igst_tax > 0
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                style: { paddingTop: "0" },
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, kt.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            "IGST Amount",
                                                        }
                                                      ),
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          className:
                                                            "ft-amount",
                                                          fullWidth: !0,
                                                          value: r.igst_tax,
                                                          disabled: !0,
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                            className:
                                                              "non_disable_text",
                                                          },
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: "Tax Amount",
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.total_tax,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                      className:
                                                        "non_disable_text",
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: "Total Amount",
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.total_amount,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                      className:
                                                        "non_disable_text",
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children:
                                                        " Cash Discount ",
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.discount,
                                                    onChange: function (t) {
                                                      return e.handleDefaultChange(
                                                        t,
                                                        "discount"
                                                      );
                                                    },
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children:
                                                        " Total Payable ",
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.total_payable,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                      className:
                                                        "non_disable_text",
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          r.advance_amount > 0
                                            ? (0, kt.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                className: "pt-5",
                                                children: (0, kt.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  className: "display_center",
                                                  children: [
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 4,
                                                      md: 6,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, kt.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            " Advance Amount ",
                                                        }
                                                      ),
                                                    }),
                                                    (0, kt.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 8,
                                                      md: 6,
                                                      className: "pt-0",
                                                      children: (0, kt.jsx)(
                                                        l.Z,
                                                        {
                                                          className:
                                                            "ft-amount",
                                                          fullWidth: !0,
                                                          value:
                                                            r.advance_amount,
                                                          InputProps: {
                                                            startAdornment: (0,
                                                            kt.jsx)(_.Z, {
                                                              position: "start",
                                                              children: "₹",
                                                            }),
                                                            className:
                                                              "non_disable_text",
                                                            endAdornment: (0,
                                                            kt.jsx)(p.Z, {
                                                              checked:
                                                                r.pay_from_advance,
                                                              onChange:
                                                                this
                                                                  .handleAdvance,
                                                            }),
                                                            disabled: !0,
                                                          },
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              })
                                            : null,
                                        ],
                                      }),
                                  nt
                                    ? null
                                    : (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, kt.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 4,
                                              md: 6,
                                              className: "text-right pt-0",
                                              children: (0, kt.jsx)("span", {
                                                className: "tax-text",
                                                children: " Payment Mode ",
                                              }),
                                            }),
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 8,
                                              md: 6,
                                              className: "pt-0",
                                              children: (0, kt.jsx)(c.Z, {
                                                fullWidth: !0,
                                                className: "ft-amount",
                                                children: (0, kt.jsxs)(g.Z, {
                                                  className: "input-inner",
                                                  value: r.payment_mode,
                                                  fullWidth: !0,
                                                  onChange: function (t) {
                                                    return e.handleDefaultChange(
                                                      t,
                                                      "payment_mode"
                                                    );
                                                  },
                                                  children: [
                                                    (0, kt.jsx)(y.Z, {
                                                      value: "cash",
                                                      children: "Cash",
                                                    }),
                                                    (0, kt.jsx)(y.Z, {
                                                      value: "cheque",
                                                      children: "Cheque",
                                                    }),
                                                    (0, kt.jsx)(y.Z, {
                                                      value: "imps_neft",
                                                      children: "NEFT/IMPS/UPI",
                                                    }),
                                                    (0, kt.jsx)(y.Z, {
                                                      value: "online",
                                                      children: "Online",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                  "imps_neft" == r.payment_mode ||
                                  "upi" == r.payment_mode
                                    ? (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, kt.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 4,
                                              md: 6,
                                              className: "text-right pt-0",
                                              children: (0, kt.jsx)("span", {
                                                className: "tax-text",
                                                children: " Transaction No ",
                                              }),
                                            }),
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 8,
                                              md: 6,
                                              className: "pt-0",
                                              children: (0, kt.jsx)(l.Z, {
                                                className: "ft-amount",
                                                fullWidth: !0,
                                                value: r.transaction_no,
                                                onChange: function (t) {
                                                  return e.handleDefaultChange(
                                                    t,
                                                    "transaction_no"
                                                  );
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      })
                                    : null,
                                  "cheque" == r.payment_mode
                                    ? (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, kt.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 4,
                                              md: 6,
                                              className: "text-right pt-0",
                                              children: (0, kt.jsx)("span", {
                                                className: "tax-text",
                                                children: " Cheque No ",
                                              }),
                                            }),
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 8,
                                              md: 6,
                                              className: "pt-0",
                                              children: (0, kt.jsx)(l.Z, {
                                                className: "ft-amount",
                                                fullWidth: !0,
                                                value: r.cheque_no,
                                                onChange: function (t) {
                                                  return e.handleDefaultChange(
                                                    t,
                                                    "cheque_no"
                                                  );
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      })
                                    : null,
                                  nt
                                    ? (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 12,
                                        className:
                                          "p-invoice-date create-input pt-5",
                                        children: (0, kt.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          className: "display_center",
                                          children: [
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 4,
                                              md: 6,
                                              className: "text-right pt-0",
                                              children: "Return Date",
                                            }),
                                            (0, kt.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 8,
                                              md: 6,
                                              className: "pt-0",
                                              children: (0, kt.jsx)(R._, {
                                                dateAdapter: z.y,
                                                children: (0, kt.jsx)(X.M, {
                                                  className: "ft-amount",
                                                  value: this.state.return_date,
                                                  fullWidth: !0,
                                                  inputFormat: "DD/MM/YYYY",
                                                  onChange: function (t) {
                                                    return e.setState({
                                                      return_date: t,
                                                    });
                                                  },
                                                  renderInput: function (t) {
                                                    return (0, kt.jsx)(
                                                      l.Z,
                                                      At({ fullWidth: !0 }, t)
                                                    );
                                                  },
                                                }),
                                              }),
                                            }),
                                          ],
                                        }),
                                      })
                                    : (0, kt.jsxs)(kt.Fragment, {
                                        children: [
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: " Pay Now ",
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.paid_amount,
                                                    onChange: function (t) {
                                                      return e.handleDefaultChange(
                                                        t,
                                                        "paid_amount"
                                                      );
                                                    },
                                                    error: s.paid_amount,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          (0, kt.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, kt.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 4,
                                                  md: 6,
                                                  className: "text-right pt-0",
                                                  children: (0, kt.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: "  Due Amount ",
                                                    }
                                                  ),
                                                }),
                                                (0, kt.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 8,
                                                  md: 6,
                                                  className: "pt-0",
                                                  children: (0, kt.jsx)(l.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.due_amount,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      kt.jsx)(_.Z, {
                                                        position: "start",
                                                        children: "₹",
                                                      }),
                                                      className:
                                                        "non_disable_text",
                                                    },
                                                  }),
                                                }),
                                              ],
                                            }),
                                          }),
                                          parseFloat(r.due_amount) > 0
                                            ? (0, kt.jsxs)(kt.Fragment, {
                                                children: [
                                                  (0, kt.jsx)(o.ZP, {
                                                    item: !0,
                                                    xs: 12,
                                                    className:
                                                      "p-invoice-date create-input pt-5",
                                                    children: (0, kt.jsxs)(
                                                      o.ZP,
                                                      {
                                                        container: !0,
                                                        spacing: 2,
                                                        columnSpacing: {
                                                          xs: 1,
                                                          sm: 2,
                                                          md: 2,
                                                        },
                                                        className:
                                                          "display_center",
                                                        children: [
                                                          (0, kt.jsx)(o.ZP, {
                                                            item: !0,
                                                            xs: 4,
                                                            md: 6,
                                                            className:
                                                              "text-right pt-0",
                                                            children: (0,
                                                            kt.jsx)("span", {
                                                              className:
                                                                "tax-text",
                                                              children:
                                                                " Due Date ",
                                                            }),
                                                          }),
                                                          (0, kt.jsx)(o.ZP, {
                                                            item: !0,
                                                            xs: 8,
                                                            md: 6,
                                                            className: "pt-0",
                                                            children: (0,
                                                            kt.jsx)(R._, {
                                                              dateAdapter: z.y,
                                                              children: (0,
                                                              kt.jsx)(X.M, {
                                                                value:
                                                                  r.due_date,
                                                                fullWidth: !0,
                                                                className:
                                                                  "ft-amount",
                                                                inputFormat:
                                                                  "DD/MM/YYYY",
                                                                onChange:
                                                                  function (t) {
                                                                    return e.updateFormValues(
                                                                      t,
                                                                      "due_date"
                                                                    );
                                                                  },
                                                                renderInput:
                                                                  function (t) {
                                                                    return (0,
                                                                    kt.jsx)(
                                                                      l.Z,
                                                                      At(
                                                                        At(
                                                                          {
                                                                            fullWidth:
                                                                              !0,
                                                                          },
                                                                          t
                                                                        ),
                                                                        {},
                                                                        {
                                                                          error:
                                                                            s.due_date,
                                                                        }
                                                                      )
                                                                    );
                                                                  },
                                                              }),
                                                            }),
                                                          }),
                                                        ],
                                                      }
                                                    ),
                                                  }),
                                                  (0, kt.jsx)(o.ZP, {
                                                    item: !0,
                                                    xs: 12,
                                                    className:
                                                      "p-invoice-date create-input pt-5",
                                                    children: (0, kt.jsxs)(
                                                      o.ZP,
                                                      {
                                                        container: !0,
                                                        spacing: 2,
                                                        columnSpacing: {
                                                          xs: 1,
                                                          sm: 2,
                                                          md: 2,
                                                        },
                                                        className:
                                                          "display_center",
                                                        children: [
                                                          (0, kt.jsx)(o.ZP, {
                                                            item: !0,
                                                            xs: 4,
                                                            md: 6,
                                                            className:
                                                              "text-right pt-0",
                                                            children: (0,
                                                            kt.jsx)("span", {
                                                              className:
                                                                "tax-text",
                                                              children:
                                                                " Settlement Date ",
                                                            }),
                                                          }),
                                                          (0, kt.jsx)(o.ZP, {
                                                            item: !0,
                                                            xs: 8,
                                                            md: 6,
                                                            className: "pt-0",
                                                            children: (0,
                                                            kt.jsx)(R._, {
                                                              dateAdapter: z.y,
                                                              children: (0,
                                                              kt.jsx)(X.M, {
                                                                className:
                                                                  "ft-amount",
                                                                value:
                                                                  r.settlement_date,
                                                                fullWidth: !0,
                                                                inputFormat:
                                                                  "DD/MM/YYYY",
                                                                onChange:
                                                                  function (t) {
                                                                    return e.updateFormValues(
                                                                      t,
                                                                      "settlement_date"
                                                                    );
                                                                  },
                                                                renderInput:
                                                                  function (t) {
                                                                    return (0,
                                                                    kt.jsx)(
                                                                      l.Z,
                                                                      At(
                                                                        At(
                                                                          {
                                                                            fullWidth:
                                                                              !0,
                                                                          },
                                                                          t
                                                                        ),
                                                                        {},
                                                                        {
                                                                          error:
                                                                            s.settlement_date,
                                                                        }
                                                                      )
                                                                    );
                                                                  },
                                                              }),
                                                            }),
                                                          }),
                                                        ],
                                                      }
                                                    ),
                                                  }),
                                                ],
                                              })
                                            : null,
                                        ],
                                      }),
                                ],
                              }),
                            }),
                        (0, kt.jsx)(o.ZP, {
                          item: !0,
                          xs: (this.state.isAssign, 12),
                          md: this.state.isAssign ? 4 : 12,
                          children: (0, kt.jsxs)(v.Z, {
                            spacing: 1,
                            direction: "row",
                            className: "ratn-footer-buttons",
                            justifyContent: "flex-end",
                            style: {
                              paddingRight: "16px",
                              paddingBottom: "16px",
                            },
                            children: [
                              (0, w.xb)(
                                this.props.query.get("sale_on_approval")
                              ) &&
                              !this.state.order_id &&
                              !this.state.isAssign &&
                              this.state.isCreateFrom
                                ? (0, kt.jsx)(V.Z, {
                                    className: "conf-button",
                                    variant: "contained",
                                    type: "button",
                                    loading: S,
                                    disabled: S,
                                    onClick: function () {
                                      return e.handleSubmit(!0);
                                    },
                                    children: "Approval",
                                  })
                                : null,
                              this.state.isCreateFrom
                                ? (0, kt.jsx)(V.Z, {
                                    className: "conf-button",
                                    variant: "contained",
                                    type: "button",
                                    loading: S,
                                    disabled: S,
                                    onClick: function () {
                                      return e.handleSubmit(!1);
                                    },
                                    children: this.state.isAssign
                                      ? "Transfer"
                                      : "Submit",
                                  })
                                : (0, kt.jsx)(kt.Fragment, {
                                    children: this.state.return_products.length
                                      ? (0, kt.jsx)(u.Z, {
                                          variant: "outlined",
                                          type: "button",
                                          className: "conf-button",
                                          onClick: this.handleReturn,
                                          children: "Return",
                                        })
                                      : null,
                                  }),
                              S
                                ? null
                                : (0, kt.jsx)(u.Z, {
                                    variant: "outlined",
                                    className: "close-button",
                                    onClick: function () {
                                      return e.props.navigate(-1);
                                    },
                                    children: "Cancel",
                                  }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, kt.jsxs)(I.Z, {
                      open: this.state.productDialog,
                      onClose: this.handleProductDialogClose,
                      fullWidth: !0,
                      maxWidth: "lg",
                      className: "ratn-dialog-wrapper",
                      children: [
                        (0, kt.jsx)(W.Z, { children: "Add Product" }),
                        (0, kt.jsxs)(q.Z, {
                          children: [
                            (0, kt.jsx)(Y.Z, {}),
                            (0, kt.jsx)(i.Z, {
                              sx: { flexGrow: 1, m: 0.5 },
                              children: (0, kt.jsxs)(o.ZP, {
                                container: !0,
                                spacing: 2,
                                columnSpacing: { xs: 1, sm: 2, md: 2 },
                                children: [
                                  (0, kt.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    md: 3,
                                    children: (0, kt.jsxs)(c.Z, {
                                      fullWidth: !0,
                                      error: k.category_id,
                                      children: [
                                        (0, kt.jsx)(j.Z, {
                                          children: "Category",
                                        }),
                                        (0, kt.jsxs)(g.Z, {
                                          value: N.category_id,
                                          label: "Category",
                                          onChange: this.handleCategoryChange,
                                          defaultValue: "",
                                          children: [
                                            (0, kt.jsx)(y.Z, { value: "" }),
                                            this.state.categoryList.map(
                                              function (t, e) {
                                                return (0, kt.jsx)(
                                                  y.Z,
                                                  {
                                                    value: t.id,
                                                    children: t.name,
                                                  },
                                                  e
                                                );
                                              }
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, kt.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    md: 3,
                                    children: (0, kt.jsxs)(c.Z, {
                                      fullWidth: !0,
                                      error: k.sub_category_id,
                                      children: [
                                        (0, kt.jsx)(j.Z, {
                                          children: "Sub Category",
                                        }),
                                        (0, kt.jsxs)(g.Z, {
                                          value: N.sub_category_id,
                                          label: "Sub Category",
                                          onChange:
                                            this.handleSubCategoryChange,
                                          defaultValue: "",
                                          children: [
                                            (0, kt.jsx)(y.Z, { value: "" }),
                                            this.state.subCategoryList.map(
                                              function (t, e) {
                                                return (0, kt.jsx)(
                                                  y.Z,
                                                  {
                                                    value: t.id,
                                                    children: t.name,
                                                  },
                                                  e
                                                );
                                              }
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  (0, kt.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    md: 6,
                                    children: (0, kt.jsxs)(c.Z, {
                                      fullWidth: !0,
                                      error: k.product_id,
                                      children: [
                                        (0, kt.jsx)(j.Z, {
                                          children: "Product",
                                        }),
                                        (0, kt.jsxs)(g.Z, {
                                          value: N.product_id,
                                          label: "Product",
                                          onChange: this.handleProductChange,
                                          defaultValue: "",
                                          children: [
                                            (0, kt.jsx)(y.Z, { value: "" }),
                                            this.state.stockProductList.map(
                                              function (t, e) {
                                                return (0, kt.jsx)(
                                                  y.Z,
                                                  {
                                                    value: t.id,
                                                    children: t.name,
                                                  },
                                                  e
                                                );
                                              }
                                            ),
                                          ],
                                        }),
                                      ],
                                    }),
                                  }),
                                  "material" != N.product_type
                                    ? (0, kt.jsx)(kt.Fragment, {})
                                    : null,
                                  this.state.stockProductDetails.length &&
                                  N.product_id
                                    ? (0, kt.jsxs)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        children: [
                                          (0, kt.jsx)(c.Z, {
                                            fullWidth: !0,
                                            children: (0, kt.jsx)(Z.Z, {
                                              name: "stock_id",
                                              value: N.stock_id,
                                              onChange:
                                                this
                                                  .handleProductFormStockChange,
                                              children:
                                                this.checkIfAllStockAdded()
                                                  ? null
                                                  : (0, kt.jsx)(U.Z, {
                                                      component: H.Z,
                                                      children: (0, kt.jsxs)(
                                                        T.Z,
                                                        {
                                                          children: [
                                                            (0, kt.jsx)(B.Z, {
                                                              children: (0,
                                                              kt.jsxs)(Q.Z, {
                                                                children: [
                                                                  (0, kt.jsx)(
                                                                    $.Z,
                                                                    {
                                                                      children:
                                                                        "Size Name",
                                                                    }
                                                                  ),
                                                                  (0, kt.jsx)(
                                                                    $.Z,
                                                                    {
                                                                      children:
                                                                        "Material Name",
                                                                    }
                                                                  ),
                                                                  (0, kt.jsx)(
                                                                    $.Z,
                                                                    {
                                                                      children:
                                                                        "Purity",
                                                                    }
                                                                  ),
                                                                  (0, kt.jsx)(
                                                                    $.Z,
                                                                    {
                                                                      children:
                                                                        "Weight",
                                                                    }
                                                                  ),
                                                                  (0, kt.jsx)(
                                                                    $.Z,
                                                                    {
                                                                      children:
                                                                        "Unit",
                                                                    }
                                                                  ),
                                                                  (0, kt.jsx)(
                                                                    $.Z,
                                                                    {
                                                                      children:
                                                                        "Quantity",
                                                                    }
                                                                  ),
                                                                ],
                                                              }),
                                                            }),
                                                            (0, kt.jsx)(G.Z, {
                                                              children:
                                                                this.state.stockProductDetails.map(
                                                                  function (
                                                                    t,
                                                                    n
                                                                  ) {
                                                                    return e.checkIfStockAdded(
                                                                      t.stock_id
                                                                    )
                                                                      ? null
                                                                      : (0,
                                                                        kt.jsxs)(
                                                                          a.Fragment,
                                                                          {
                                                                            children:
                                                                              [
                                                                                (0,
                                                                                kt.jsx)(
                                                                                  Q.Z,
                                                                                  {
                                                                                    children:
                                                                                      (0,
                                                                                      kt.jsxs)(
                                                                                        $.Z,
                                                                                        {
                                                                                          rowSpan:
                                                                                            t
                                                                                              .materials
                                                                                              .length +
                                                                                            1,
                                                                                          children:
                                                                                            [
                                                                                              (0,
                                                                                              kt.jsx)(
                                                                                                b.Z,
                                                                                                {
                                                                                                  value:
                                                                                                    t.stock_id,
                                                                                                  control:
                                                                                                    (0,
                                                                                                    kt.jsx)(
                                                                                                      P.Z,
                                                                                                      {}
                                                                                                    ),
                                                                                                }
                                                                                              ),
                                                                                              " ",
                                                                                              t.size_name,
                                                                                            ],
                                                                                        }
                                                                                      ),
                                                                                  }
                                                                                ),
                                                                                t.materials.map(
                                                                                  function (
                                                                                    t,
                                                                                    e
                                                                                  ) {
                                                                                    return (0,
                                                                                    kt.jsx)(
                                                                                      a.Fragment,
                                                                                      {
                                                                                        children:
                                                                                          (0,
                                                                                          kt.jsxs)(
                                                                                            Q.Z,
                                                                                            {
                                                                                              children:
                                                                                                [
                                                                                                  (0,
                                                                                                  kt.jsx)(
                                                                                                    $.Z,
                                                                                                    {
                                                                                                      children:
                                                                                                        t.material_name,
                                                                                                    }
                                                                                                  ),
                                                                                                  (0,
                                                                                                  kt.jsx)(
                                                                                                    $.Z,
                                                                                                    {
                                                                                                      children:
                                                                                                        t.purity,
                                                                                                    }
                                                                                                  ),
                                                                                                  (0,
                                                                                                  kt.jsx)(
                                                                                                    $.Z,
                                                                                                    {
                                                                                                      children:
                                                                                                        (0,
                                                                                                        w.um)(
                                                                                                          t.weight,
                                                                                                          !0
                                                                                                        ),
                                                                                                    }
                                                                                                  ),
                                                                                                  (0,
                                                                                                  kt.jsx)(
                                                                                                    $.Z,
                                                                                                    {
                                                                                                      children:
                                                                                                        t.unit_name,
                                                                                                    }
                                                                                                  ),
                                                                                                  (0,
                                                                                                  kt.jsx)(
                                                                                                    $.Z,
                                                                                                    {
                                                                                                      children:
                                                                                                        t.quantity,
                                                                                                    }
                                                                                                  ),
                                                                                                ],
                                                                                            }
                                                                                          ),
                                                                                      },
                                                                                      e
                                                                                    );
                                                                                  }
                                                                                ),
                                                                              ],
                                                                          },
                                                                          n
                                                                        );
                                                                  }
                                                                ),
                                                            }),
                                                          ],
                                                        }
                                                      ),
                                                    }),
                                            }),
                                          }),
                                          (0, kt.jsx)(c.Z, {
                                            fullWidth: !0,
                                            children:
                                              this.checkIfAllStockAdded()
                                                ? (0, kt.jsx)("h3", {
                                                    children:
                                                      "No Stock available",
                                                  })
                                                : null,
                                          }),
                                        ],
                                      })
                                    : null,
                                  "material" == N.product_type
                                    ? (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        children: (0, kt.jsx)(U.Z, {
                                          component: H.Z,
                                          children: (0, kt.jsxs)(T.Z, {
                                            sx: { minWidth: 650 },
                                            "aria-label": "simple table",
                                            className:
                                              "ratn-table-product-wrapper",
                                            children: [
                                              (0, kt.jsx)(B.Z, {
                                                className: "ratn-table-header",
                                                children: (0, kt.jsxs)(Q.Z, {
                                                  className:
                                                    "pur-details-inner-table",
                                                  children: [
                                                    (0, kt.jsx)($.Z, {
                                                      children: "Material Name",
                                                    }),
                                                    (0, kt.jsx)($.Z, {
                                                      children: "Purity",
                                                    }),
                                                    (0, kt.jsx)($.Z, {
                                                      children: "Quantity",
                                                    }),
                                                    (0, kt.jsx)($.Z, {
                                                      children: "Weight",
                                                    }),
                                                  ],
                                                }),
                                              }),
                                              (0, kt.jsx)(G.Z, {
                                                className:
                                                  "pur-details-table-body",
                                                children: N.materials.map(
                                                  function (t, n) {
                                                    return (0, kt.jsxs)(
                                                      Q.Z,
                                                      {
                                                        children: [
                                                          (0, kt.jsx)($.Z, {
                                                            children:
                                                              t.material_name,
                                                          }),
                                                          (0, kt.jsx)($.Z, {
                                                            children: t.purity,
                                                          }),
                                                          (0, kt.jsx)($.Z, {
                                                            children: (0,
                                                            kt.jsx)(l.Z, {
                                                              label: "Quantity",
                                                              variant:
                                                                "outlined",
                                                              fullWidth: !0,
                                                              value: t.quantity,
                                                              onChange:
                                                                function (t) {
                                                                  return e.handleMaterialFormChange(
                                                                    t,
                                                                    n,
                                                                    "quantity"
                                                                  );
                                                                },
                                                              error:
                                                                C[n].quantity,
                                                            }),
                                                          }),
                                                          (0, kt.jsx)($.Z, {
                                                            children: (0,
                                                            kt.jsx)(l.Z, {
                                                              label: "Weight",
                                                              variant:
                                                                "outlined",
                                                              fullWidth: !0,
                                                              value: t.weight,
                                                              onChange:
                                                                function (t) {
                                                                  return e.handleMaterialFormChange(
                                                                    t,
                                                                    n,
                                                                    "weight"
                                                                  );
                                                                },
                                                              InputProps: {
                                                                endAdornment:
                                                                  (0, kt.jsx)(
                                                                    _.Z,
                                                                    {
                                                                      position:
                                                                        "start",
                                                                      children:
                                                                        t.unit_name,
                                                                    }
                                                                  ),
                                                              },
                                                              error:
                                                                C[n].weight,
                                                            }),
                                                          }),
                                                        ],
                                                      },
                                                      n
                                                    );
                                                  }
                                                ),
                                              }),
                                            ],
                                          }),
                                        }),
                                      })
                                    : null,
                                  (0, kt.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    children: (0, kt.jsxs)(v.Z, {
                                      spacing: 1,
                                      direction: "row",
                                      justifyContent: "flex-end",
                                      children: [
                                        (0, kt.jsx)(u.Z, {
                                          variant: "contained",
                                          type: "button",
                                          onClick: this.handleProductSubmit,
                                          children: "Add Product",
                                        }),
                                        (0, kt.jsx)(u.Z, {
                                          variant: "outlined",
                                          onClick:
                                            this.handleProductDialogClose,
                                          children: "Cancel",
                                        }),
                                      ],
                                    }),
                                  }),
                                ],
                              }),
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, kt.jsxs)(I.Z, {
                      open: this.state.deleteDialogOpen,
                      onClose: this.handleDialogClose,
                      fullWidth: !0,
                      maxWidth: "xs",
                      className: "ratn-dialog-wrapper",
                      children: [
                        (0, kt.jsx)(W.Z, { children: "Delete" }),
                        (0, kt.jsx)(q.Z, {
                          children: (0, kt.jsx)(Y.Z, {
                            id: "alert-dialog-slide-description",
                            children:
                              "Are you sure want to delete this record?",
                          }),
                        }),
                        (0, kt.jsx)(E.Z, {
                          children: (0, kt.jsxs)(v.Z, {
                            spacing: 2,
                            direction: "row",
                            justifyContent: "flex-end",
                            children: [
                              (0, kt.jsx)(u.Z, {
                                variant: "outlined",
                                onClick: this.handleDialogClose,
                                children: "Cancel",
                              }),
                              (0, kt.jsx)(u.Z, {
                                variant: "contained",
                                type: "button",
                                onClick: this.handleDeleteConfirm,
                                children: "Yes, Confirm",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, kt.jsxs)(I.Z, {
                      open: this.state.returnDialogOpen,
                      onClose: this.returnDialogClose,
                      fullWidth: !0,
                      maxWidth: "xs",
                      className: "ratn-dialog-wrapper",
                      children: [
                        (0, kt.jsx)(W.Z, { children: "Return" }),
                        (0, kt.jsxs)(q.Z, {
                          children: [
                            (0, kt.jsx)(Y.Z, {
                              id: "alert-dialog-slide-description",
                              children:
                                "Are you sure want to return these product(s)?",
                            }),
                            at > 0
                              ? (0, kt.jsxs)(kt.Fragment, {
                                  children: [
                                    (0, kt.jsx)(c.Z, {
                                      children: (0, kt.jsxs)(Z.Z, {
                                        row: !0,
                                        name: "row-radio-buttons-group",
                                        value: this.state.payment_type,
                                        onChange: function (t) {
                                          return e.setState({
                                            payment_type: t.target.value,
                                          });
                                        },
                                        children: [
                                          et
                                            ? null
                                            : (0, kt.jsx)(b.Z, {
                                                value: "advance",
                                                control: (0, kt.jsx)(P.Z, {}),
                                                label:
                                                  "Payment move to advance " +
                                                  (0, w.RS)(at),
                                              }),
                                          (0, kt.jsx)(b.Z, {
                                            value: "return",
                                            control: (0, kt.jsx)(P.Z, {}),
                                            label:
                                              "Payment Return " + (0, w.RS)(at),
                                          }),
                                        ],
                                      }),
                                    }),
                                    "return" != this.state.payment_type || et
                                      ? null
                                      : (0, kt.jsxs)(c.Z, {
                                          fullWidth: !0,
                                          children: [
                                            (0, kt.jsx)(j.Z, {
                                              children: "Payment Mode",
                                            }),
                                            (0, kt.jsxs)(g.Z, {
                                              className: "input-inner",
                                              value:
                                                this.state.return_payment_mode,
                                              fullWidth: !0,
                                              label: "Payment Mode",
                                              onChange: function (t) {
                                                return e.setState({
                                                  return_payment_mode:
                                                    t.target.value,
                                                });
                                              },
                                              children: [
                                                (0, kt.jsx)(y.Z, {
                                                  value: "cash",
                                                  children: "Cash",
                                                }),
                                                (0, kt.jsx)(y.Z, {
                                                  value: "cheque",
                                                  children: "Cheque",
                                                }),
                                                (0, kt.jsx)(y.Z, {
                                                  value: "imps_neft",
                                                  children: "NEFT/IMPS/UPI",
                                                }),
                                                (0, kt.jsx)(y.Z, {
                                                  value: "online",
                                                  children: "Online",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                  ],
                                })
                              : null,
                          ],
                        }),
                        (0, kt.jsx)(E.Z, {
                          children: (0, kt.jsxs)(v.Z, {
                            spacing: 2,
                            direction: "row",
                            justifyContent: "flex-end",
                            children: [
                              (0, kt.jsx)(u.Z, {
                                variant: "outlined",
                                onClick: this.returnDialogClose,
                                children: "Cancel",
                              }),
                              (0, kt.jsx)(u.Z, {
                                variant: "contained",
                                type: "button",
                                onClick: this.handleReturnConfirm,
                                children: "Yes, Confirm",
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                    (0, kt.jsxs)(I.Z, {
                      open: this.state.materialReturnDialog,
                      onClose: this.handleReturnDialogClose,
                      fullWidth: !0,
                      maxWidth: "md",
                      className: "ratn-dialog-wrapper",
                      children: [
                        (0, kt.jsx)(W.Z, { children: "Return Product" }),
                        (0, kt.jsxs)(q.Z, {
                          children: [
                            (0, kt.jsx)(Y.Z, {}),
                            (0, kt.jsx)(i.Z, {
                              sx: { flexGrow: 1, m: 0.5 },
                              children: A
                                ? (0, kt.jsxs)(o.ZP, {
                                    container: !0,
                                    spacing: 2,
                                    children: [
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 6,
                                        children: (0, kt.jsx)(l.Z, {
                                          label: "Name",
                                          variant: "outlined",
                                          fullWidth: !0,
                                          value: A.product_name,
                                          disabled: !0,
                                          InputProps: {
                                            className: "non_disable_text",
                                          },
                                        }),
                                      }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 2,
                                        children: (0, kt.jsx)(l.Z, {
                                          label: "Purity",
                                          variant: "outlined",
                                          fullWidth: !0,
                                          value: A.materials[0].purity_name,
                                          disabled: !0,
                                          InputProps: {
                                            className: "non_disable_text",
                                          },
                                        }),
                                      }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 2,
                                        children: (0, kt.jsx)(l.Z, {
                                          label: "Avl Qty",
                                          variant: "outlined",
                                          fullWidth: !0,
                                          value: A.materials[0].avl_qty,
                                          disabled: !0,
                                          InputProps: {
                                            className: "non_disable_text",
                                          },
                                        }),
                                      }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 2,
                                        children: (0, kt.jsx)(l.Z, {
                                          label: "Avl Weight",
                                          variant: "outlined",
                                          fullWidth: !0,
                                          value: A.materials[0].avl_weight,
                                          disabled: !0,
                                          InputProps: {
                                            className: "non_disable_text",
                                            endAdornment: (0, kt.jsx)(_.Z, {
                                              position: "start",
                                              children:
                                                A.materials[0].unit_name,
                                            }),
                                          },
                                        }),
                                      }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 4,
                                        children: (0, kt.jsx)(l.Z, {
                                          label: "Quantity",
                                          variant: "outlined",
                                          fullWidth: !0,
                                          value: A.materials[0].return_qty,
                                          onChange: function (t) {
                                            return e.handleReturnMaterial(
                                              t.target.value,
                                              "return_qty"
                                            );
                                          },
                                          error: this.state.return_qty_error,
                                        }),
                                      }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 4,
                                        children: (0, kt.jsx)(l.Z, {
                                          label: "Weight",
                                          variant: "outlined",
                                          fullWidth: !0,
                                          value: A.materials[0].return_weight,
                                          onChange: function (t) {
                                            return e.handleReturnMaterial(
                                              t.target.value,
                                              "return_weight"
                                            );
                                          },
                                          error: this.state.return_weight_error,
                                          InputProps: {
                                            className: "non_disable_text",
                                            endAdornment: (0, kt.jsx)(_.Z, {
                                              position: "start",
                                              children:
                                                A.materials[0].unit_name,
                                            }),
                                          },
                                        }),
                                      }),
                                      (0, kt.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 12,
                                        children: (0, kt.jsxs)(v.Z, {
                                          spacing: 1,
                                          direction: "row",
                                          justifyContent: "flex-end",
                                          children: [
                                            (0, kt.jsx)(u.Z, {
                                              variant: "outlined",
                                              onClick:
                                                this.handleReturnDialogClose,
                                              children: "Close",
                                            }),
                                            this.state.return_products.length &&
                                            this.state.return_products[F]
                                              .is_return
                                              ? (0, kt.jsx)(u.Z, {
                                                  variant: "outlined",
                                                  onClick:
                                                    this.handleCancelReturn,
                                                  children: "Cancel Return",
                                                })
                                              : null,
                                            (0, kt.jsx)(u.Z, {
                                              variant: "contained",
                                              type: "button",
                                              onClick:
                                                this.handleReturnMaterialSubmit,
                                              children: "Save",
                                            }),
                                          ],
                                        }),
                                      }),
                                    ],
                                  })
                                : null,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                });
              },
            },
          ]) && Ot(e.prototype, n),
          r && Ot(e, r),
          Object.defineProperty(e, "prototype", { writable: !1 }),
          L
        );
      })(a.Component);
      e.Z = (0, O.Z)(
        (0, M.RM)(
          (0, r.connect)(
            function (t) {
              return {
                distributorList: t.superadmin.distributor.items,
                adminList: t.superadmin.admin.items,
                retailerList: t.superadmin.retailer.items,
                salesExecutiveList: t.superadmin.salesExecutive.items,
                productList: t.superadmin.product.items,
                actionCalled: t.superadmin.sales.actionCalled,
                createSuccess: t.superadmin.sales.createSuccess,
                editSuccess: t.superadmin.sales.editSuccess,
                successMessage: t.superadmin.sales.successMessage,
                errorMessage: t.superadmin.sales.errorMessage,
                productPriceInfo: t.superadmin.materialPrice.productPriceInfo,
                stockProductList: t.superadmin.stocks.productList,
                stockProductDetails: t.superadmin.stocks.productDetails,
                categoryList: t.superadmin.category.items,
                subCategoryList: t.superadmin.subCategory.items,
                order: t.superadmin.orders.order,
                auth: t.auth,
                employeeList: t.superadmin.employee.items,
                supplierList: t.superadmin.supplier.items,
              };
            },
            function (t) {
              return {
                dispatch: t,
                actions: (0, N.bindActionCreators)(
                  {
                    salesStore: k.rr,
                    salesUpdate: k.LR,
                    adminList: F.N0,
                    productList: A.Uu,
                    materialPriceProductPriceInfo: L.zZ,
                    stocksProducDetails: C.GF,
                    stocksProductList: C.Db,
                    categoryList: st.wA,
                    subCategoryList: rt.NM,
                    orderView: ct.Id,
                    cartList: xt.bA,
                    retailerList: _t.Ad,
                    distributorList: gt.zP,
                    salesExecutiveList: yt.cT,
                    employeeList: Pt.ll,
                    supplierList: wt.ED,
                    getNotifiactions: Nt.Z,
                  },
                  t
                ),
              };
            }
          )((0, s.sx)({ form: "SaleForm" })(zt))
        )
      );
    },
    3661: function (t, e, n) {
      "use strict";
      e.Z = n.p + "assets/no_image.jpg";
    },
    95126: function (t, e, n) {
      var a = {
        "./af": 1009,
        "./af.js": 1009,
        "./ar": 88769,
        "./ar-dz": 23739,
        "./ar-dz.js": 23739,
        "./ar-kw": 93745,
        "./ar-kw.js": 93745,
        "./ar-ly": 99576,
        "./ar-ly.js": 99576,
        "./ar-ma": 67408,
        "./ar-ma.js": 67408,
        "./ar-sa": 48781,
        "./ar-sa.js": 48781,
        "./ar-tn": 87856,
        "./ar-tn.js": 87856,
        "./ar.js": 88769,
        "./az": 2030,
        "./az.js": 2030,
        "./be": 56476,
        "./be.js": 56476,
        "./bg": 25304,
        "./bg.js": 25304,
        "./bm": 48125,
        "./bm.js": 48125,
        "./bn": 34,
        "./bn-bd": 29835,
        "./bn-bd.js": 29835,
        "./bn.js": 34,
        "./bo": 64082,
        "./bo.js": 64082,
        "./br": 8317,
        "./br.js": 8317,
        "./bs": 93107,
        "./bs.js": 93107,
        "./ca": 68272,
        "./ca.js": 68272,
        "./cs": 98567,
        "./cs.js": 98567,
        "./cv": 61583,
        "./cv.js": 61583,
        "./cy": 10076,
        "./cy.js": 10076,
        "./da": 31760,
        "./da.js": 31760,
        "./de": 8973,
        "./de-at": 63214,
        "./de-at.js": 63214,
        "./de-ch": 74728,
        "./de-ch.js": 74728,
        "./de.js": 8973,
        "./dv": 54053,
        "./dv.js": 54053,
        "./el": 7499,
        "./el.js": 7499,
        "./en-au": 67876,
        "./en-au.js": 67876,
        "./en-ca": 47010,
        "./en-ca.js": 47010,
        "./en-gb": 34239,
        "./en-gb.js": 34239,
        "./en-ie": 99830,
        "./en-ie.js": 99830,
        "./en-il": 28438,
        "./en-il.js": 28438,
        "./en-in": 25322,
        "./en-in.js": 25322,
        "./en-nz": 43264,
        "./en-nz.js": 43264,
        "./en-sg": 55449,
        "./en-sg.js": 55449,
        "./eo": 39486,
        "./eo.js": 39486,
        "./es": 32430,
        "./es-do": 16310,
        "./es-do.js": 16310,
        "./es-mx": 27038,
        "./es-mx.js": 27038,
        "./es-us": 73099,
        "./es-us.js": 73099,
        "./es.js": 32430,
        "./et": 34975,
        "./et.js": 34975,
        "./eu": 87063,
        "./eu.js": 87063,
        "./fa": 68073,
        "./fa.js": 68073,
        "./fi": 50957,
        "./fi.js": 50957,
        "./fil": 8764,
        "./fil.js": 8764,
        "./fo": 81775,
        "./fo.js": 81775,
        "./fr": 74179,
        "./fr-ca": 14306,
        "./fr-ca.js": 14306,
        "./fr-ch": 73791,
        "./fr-ch.js": 73791,
        "./fr.js": 74179,
        "./fy": 47014,
        "./fy.js": 47014,
        "./ga": 46911,
        "./ga.js": 46911,
        "./gd": 62958,
        "./gd.js": 62958,
        "./gl": 87344,
        "./gl.js": 87344,
        "./gom-deva": 33161,
        "./gom-deva.js": 33161,
        "./gom-latn": 35798,
        "./gom-latn.js": 35798,
        "./gu": 68485,
        "./gu.js": 68485,
        "./he": 27917,
        "./he.js": 27917,
        "./hi": 52159,
        "./hi.js": 52159,
        "./hr": 95842,
        "./hr.js": 95842,
        "./hu": 30005,
        "./hu.js": 30005,
        "./hy-am": 51312,
        "./hy-am.js": 51312,
        "./id": 60781,
        "./id.js": 60781,
        "./is": 64101,
        "./is.js": 64101,
        "./it": 43467,
        "./it-ch": 4759,
        "./it-ch.js": 4759,
        "./it.js": 43467,
        "./ja": 44164,
        "./ja.js": 44164,
        "./jv": 70079,
        "./jv.js": 70079,
        "./ka": 57036,
        "./ka.js": 57036,
        "./kk": 92022,
        "./kk.js": 92022,
        "./km": 63418,
        "./km.js": 63418,
        "./kn": 43655,
        "./kn.js": 43655,
        "./ko": 30986,
        "./ko.js": 30986,
        "./ku": 91902,
        "./ku.js": 91902,
        "./ky": 4604,
        "./ky.js": 4604,
        "./lb": 99026,
        "./lb.js": 99026,
        "./lo": 20537,
        "./lo.js": 20537,
        "./lt": 22288,
        "./lt.js": 22288,
        "./lv": 1495,
        "./lv.js": 1495,
        "./me": 60690,
        "./me.js": 60690,
        "./mi": 2571,
        "./mi.js": 2571,
        "./mk": 93959,
        "./mk.js": 93959,
        "./ml": 97225,
        "./ml.js": 97225,
        "./mn": 88,
        "./mn.js": 88,
        "./mr": 46622,
        "./mr.js": 46622,
        "./ms": 11070,
        "./ms-my": 48899,
        "./ms-my.js": 48899,
        "./ms.js": 11070,
        "./mt": 63931,
        "./mt.js": 63931,
        "./my": 95393,
        "./my.js": 95393,
        "./nb": 4274,
        "./nb.js": 4274,
        "./ne": 8914,
        "./ne.js": 8914,
        "./nl": 33114,
        "./nl-be": 68479,
        "./nl-be.js": 68479,
        "./nl.js": 33114,
        "./nn": 4513,
        "./nn.js": 4513,
        "./oc-lnc": 46549,
        "./oc-lnc.js": 46549,
        "./pa-in": 28264,
        "./pa-in.js": 28264,
        "./pl": 32848,
        "./pl.js": 32848,
        "./pt": 90899,
        "./pt-br": 55077,
        "./pt-br.js": 55077,
        "./pt.js": 90899,
        "./ro": 92512,
        "./ro.js": 92512,
        "./ru": 21753,
        "./ru.js": 21753,
        "./sd": 16840,
        "./sd.js": 16840,
        "./se": 78362,
        "./se.js": 78362,
        "./si": 50464,
        "./si.js": 50464,
        "./sk": 66324,
        "./sk.js": 66324,
        "./sl": 41963,
        "./sl.js": 41963,
        "./sq": 53039,
        "./sq.js": 53039,
        "./sr": 93454,
        "./sr-cyrl": 10466,
        "./sr-cyrl.js": 10466,
        "./sr.js": 93454,
        "./ss": 36408,
        "./ss.js": 36408,
        "./sv": 28859,
        "./sv.js": 28859,
        "./sw": 57594,
        "./sw.js": 57594,
        "./ta": 26915,
        "./ta.js": 26915,
        "./te": 15677,
        "./te.js": 15677,
        "./tet": 92154,
        "./tet.js": 92154,
        "./tg": 74098,
        "./tg.js": 74098,
        "./th": 89071,
        "./th.js": 89071,
        "./tk": 49381,
        "./tk.js": 49381,
        "./tl-ph": 1869,
        "./tl-ph.js": 1869,
        "./tlh": 92346,
        "./tlh.js": 92346,
        "./tr": 71483,
        "./tr.js": 71483,
        "./tzl": 30266,
        "./tzl.js": 30266,
        "./tzm": 33138,
        "./tzm-latn": 32960,
        "./tzm-latn.js": 32960,
        "./tzm.js": 33138,
        "./ug-cn": 29456,
        "./ug-cn.js": 29456,
        "./uk": 50805,
        "./uk.js": 50805,
        "./ur": 61127,
        "./ur.js": 61127,
        "./uz": 29628,
        "./uz-latn": 80840,
        "./uz-latn.js": 80840,
        "./uz.js": 29628,
        "./vi": 56962,
        "./vi.js": 56962,
        "./x-pseudo": 49257,
        "./x-pseudo.js": 49257,
        "./yo": 62423,
        "./yo.js": 62423,
        "./zh-cn": 61002,
        "./zh-cn.js": 61002,
        "./zh-hk": 6046,
        "./zh-hk.js": 6046,
        "./zh-mo": 36903,
        "./zh-mo.js": 36903,
        "./zh-tw": 24710,
        "./zh-tw.js": 24710,
      };
      function r(t) {
        var e = s(t);
        return n(e);
      }
      function s(t) {
        if (!n.o(a, t)) {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        }
        return a[t];
      }
      (r.keys = function () {
        return Object.keys(a);
      }),
        (r.resolve = s),
        (t.exports = r),
        (r.id = 95126);
    },
  },
]);
