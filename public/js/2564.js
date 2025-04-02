/*! For license information please see 2564.js.LICENSE.txt */
(self.webpackChunk = self.webpackChunk || []).push([
  [2564],
  {
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
        AW: function () {
          return c;
        },
        Id: function () {
          return o;
        },
        QN: function () {
          return i;
        },
        bE: function () {
          return u;
        },
        xo: function () {
          return l;
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
          return (
            (t = (0, s.B7)(t, !0)), a.Z.get("/superadmin/user-list".concat(t))
          );
        },
        u = function (t, e) {
          return a.Z.post("/superadmin/orders/update-status/".concat(t), e);
        },
        l = function (t, e) {
          return a.Z.post("/superadmin/orders/sale-proceed/".concat(t), e);
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
          return m;
        },
        IO: function () {
          return d;
        },
        LR: function () {
          return l;
        },
        d: function () {
          return c;
        },
        dv: function () {
          return u;
        },
        rr: function () {
          return o;
        },
        u: function () {
          return i;
        },
        v9: function () {
          return p;
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
        l = function (t, e) {
          return function (n) {
            a.Z.post("/superadmin/sales/update/".concat(t), e)
              .then(function (t) {
                n({ type: r.f_, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        d = function (t, e) {
          return function (n) {
            a.Z.delete("/superadmin/sales/delete/".concat(t), e)
              .then(function (t) {
                n({ type: r.xg, payload: t.data });
              })
              .catch(function (t) {});
          };
        },
        p = function (t) {
          return a.Z.post("/superadmin/sales/download-invoice/".concat(t));
        },
        m = function (t) {
          return a.Z.get("/superadmin/sales/view/".concat(t));
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
        Nn: function () {
          return d;
        },
        XH: function () {
          return g;
        },
        fF: function () {
          return h;
        },
        gR: function () {
          return l;
        },
        i7: function () {
          return m;
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
                    var o = b(i, n);
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
        var g = {};
        u(g, r, function () {
          return this;
        });
        var x = Object.getPrototypeOf,
          _ = x && x(x(k([])));
        _ && _ !== e && n.call(_, r) && (g = _);
        var y = (f.prototype = m.prototype = Object.create(g));
        function j(t) {
          ["next", "throw", "return"].forEach(function (e) {
            u(t, e, function (t) {
              return this._invoke(e, t);
            });
          });
        }
        function v(t, e) {
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
        function b(t, e) {
          var n = t.iterator[e.method];
          if (void 0 === n) {
            if (((e.delegate = null), "throw" === e.method)) {
              if (
                t.iterator.return &&
                ((e.method = "return"),
                (e.arg = void 0),
                b(t, e),
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
        function Z(t) {
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
            t.forEach(Z, this),
            this.reset(!0);
        }
        function k(t) {
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
          return { next: N };
        }
        function N() {
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
          j(v.prototype),
          u(v.prototype, s, function () {
            return this;
          }),
          (t.AsyncIterator = v),
          (t.async = function (e, n, a, r, s) {
            void 0 === s && (s = Promise);
            var i = new v(l(e, n, a, r), s);
            return t.isGeneratorFunction(n)
              ? i
              : i.next().then(function (t) {
                  return t.done ? t.value : i.next();
                });
          }),
          j(y),
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
          (t.values = k),
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
                (this.delegate = { iterator: k(t), resultName: e, nextLoc: n }),
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
        g = (function () {
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
    13951: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          default: function () {
            return qt;
          },
        });
      var a = n(27378),
        r = n(23884),
        s = n(9647),
        i = n(43564),
        o = n(23434),
        c = n(56793),
        u = n(28730),
        l = n(64212),
        d = n(55378),
        p = n(60789),
        m = n(10418),
        h = n(33565),
        f = n(76410),
        g = n(41485),
        x = n(78153),
        _ = n(76125),
        y = n(50243),
        j = n(38543),
        v = n(57446),
        b = n(10755),
        Z = n(23880),
        P = n(62386),
        w = n(70228),
        k = n(55513),
        N = n(4497),
        S = n(16655),
        L = n(72897),
        C = n(20511),
        F = n(13040),
        A = n(8971),
        D = n(74570),
        O = n(16569),
        E = n(26803),
        V = n(69162),
        M = n(93033),
        I = n(62401),
        Y = n(14442),
        z = n(67337),
        q = n(97722),
        W = n(49444),
        T = n(92146),
        X = n(47265),
        B = n(96616),
        R = n(68456),
        G = n(19265),
        U = n(98784),
        Q = n.n(U),
        $ = n(10772),
        H = n(22859),
        J = n(84286),
        K = n(17937),
        tt = n(45747),
        et = n(40372),
        nt = n(61320),
        at = n.n(nt),
        rt = n(14365),
        st = n(64986),
        it = n(45508),
        ot = n(33204),
        ct = n(90813),
        ut = n(5805),
        lt = n(10047),
        dt = n(26270),
        pt = n(24761),
        mt = n(70004),
        ht = n(91434),
        ft = n(52522),
        gt = n(3661),
        xt = n(46265),
        _t = n(24246);
      function yt(t) {
        return (
          (yt =
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
          yt(t)
        );
      }
      function jt(t, e) {
        var n =
          ("undefined" != typeof Symbol && t[Symbol.iterator]) ||
          t["@@iterator"];
        if (!n) {
          if (
            Array.isArray(t) ||
            (n = (function (t, e) {
              if (t) {
                if ("string" == typeof t) return vt(t, e);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return (
                  "Object" === n && t.constructor && (n = t.constructor.name),
                  "Map" === n || "Set" === n
                    ? Array.from(t)
                    : "Arguments" === n ||
                      /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                    ? vt(t, e)
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
      function vt(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, a = new Array(e); n < e; n++) a[n] = t[n];
        return a;
      }
      function bt() {
        bt = function () {
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
            i = new Z(a || []);
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
                    var o = j(i, n);
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
          g = f && f(f(P([])));
        g && g !== e && n.call(g, r) && (h = g);
        var x = (m.prototype = d.prototype = Object.create(h));
        function _(t) {
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
              return d && "object" == yt(d) && n.call(d, "__await")
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
        function j(t, e) {
          var n = t.iterator[e.method];
          if (void 0 === n) {
            if (((e.delegate = null), "throw" === e.method)) {
              if (
                t.iterator.return &&
                ((e.method = "return"),
                (e.arg = void 0),
                j(t, e),
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
        function v(t) {
          var e = { tryLoc: t[0] };
          1 in t && (e.catchLoc = t[1]),
            2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])),
            this.tryEntries.push(e);
        }
        function b(t) {
          var e = t.completion || {};
          (e.type = "normal"), delete e.arg, (t.completion = e);
        }
        function Z(t) {
          (this.tryEntries = [{ tryLoc: "root" }]),
            t.forEach(v, this),
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
          o(x, "constructor", m),
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
              (t.prototype = Object.create(x)),
              t
            );
          }),
          (t.awrap = function (t) {
            return { __await: t };
          }),
          _(y.prototype),
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
          _(x),
          o(x, i, "Generator"),
          o(x, r, function () {
            return this;
          }),
          o(x, "toString", function () {
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
          (Z.prototype = {
            constructor: Z,
            reset: function (t) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = "next"),
                (this.arg = void 0),
                this.tryEntries.forEach(b),
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
                  return this.complete(n.completion, n.afterLoc), b(n), l;
              }
            },
            catch: function (t) {
              for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                var n = this.tryEntries[e];
                if (n.tryLoc === t) {
                  var a = n.completion;
                  if ("throw" === a.type) {
                    var r = a.arg;
                    b(n);
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
      function Zt(t, e) {
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
      function Pt(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {};
          e % 2
            ? Zt(Object(n), !0).forEach(function (e) {
                At(t, e, n[e]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
            : Zt(Object(n)).forEach(function (e) {
                Object.defineProperty(
                  t,
                  e,
                  Object.getOwnPropertyDescriptor(n, e)
                );
              });
        }
        return t;
      }
      function wt(t, e, n, a, r, s, i) {
        try {
          var o = t[s](i),
            c = o.value;
        } catch (t) {
          return void n(t);
        }
        o.done ? e(c) : Promise.resolve(c).then(a, r);
      }
      function kt(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (a, r) {
            var s = t.apply(e, n);
            function i(t) {
              wt(s, a, r, i, o, "next", t);
            }
            function o(t) {
              wt(s, a, r, i, o, "throw", t);
            }
            i(void 0);
          });
        };
      }
      function Nt(t, e) {
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          (a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            "value" in a && (a.writable = !0),
            Object.defineProperty(t, a.key, a);
        }
      }
      function St(t, e) {
        return (
          (St = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          St(t, e)
        );
      }
      function Lt(t, e) {
        if (e && ("object" === yt(e) || "function" == typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return Ct(t);
      }
      function Ct(t) {
        if (void 0 === t)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return t;
      }
      function Ft(t) {
        return (
          (Ft = Object.setPrototypeOf
            ? Object.getPrototypeOf.bind()
            : function (t) {
                return t.__proto__ || Object.getPrototypeOf(t);
              }),
          Ft(t)
        );
      }
      function At(t, e, n) {
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
      var Dt = (function (t) {
          !(function (t, e) {
            if ("function" != typeof e && null !== e)
              throw new TypeError(
                "Super expression must either be null or a function"
              );
            (t.prototype = Object.create(e && e.prototype, {
              constructor: { value: t, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(t, "prototype", { writable: !1 }),
              e && St(t, e);
          })(w, t);
          var e,
            n,
            r,
            s,
            b,
            P =
              ((s = w),
              (b = (function () {
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
                  e = Ft(s);
                if (b) {
                  var n = Ft(this).constructor;
                  t = Reflect.construct(e, arguments, n);
                } else t = e.apply(this, arguments);
                return Lt(this, t);
              });
          function w(t) {
            var e;
            !(function (t, e) {
              if (!(t instanceof e))
                throw new TypeError("Cannot call a class as a function");
            })(this, w),
              At(
                Ct((e = P.call(this, t))),
                "loadSaleOnApproval",
                kt(
                  bt().mark(function t() {
                    var n;
                    return bt().wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            if (
                              (0, v.xb)(e.props.query.get("sale_on_approval"))
                            ) {
                              t.next = 5;
                              break;
                            }
                            return (
                              (t.next = 3),
                              (0, Z.Bp)(e.props.query.get("sale_on_approval"))
                            );
                          case 3:
                            (n = t.sent).data.success &&
                              e.setState(
                                {
                                  formValues: Pt(
                                    Pt({}, e.state.formValues),
                                    {},
                                    {
                                      paid_amount: n.data.data.paid_amount
                                        ? n.data.data.paid_amount
                                        : "",
                                    }
                                  ),
                                },
                                function () {
                                  e.handleCalculateMainPrice();
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
              At(
                Ct(e),
                "loadCart",
                kt(
                  bt().mark(function t() {
                    var n, a, r, s, i, o, c, u, l, d, p, m, h, f, g, x, _;
                    return bt().wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (t.next = 2),
                              (0, lt.GC)({
                                from_order_price:
                                  e.props.query.get("from_order_price"),
                                order_id: e.props.query.get("order_id"),
                              })
                            );
                          case 2:
                            if ((n = t.sent).data.success) {
                              for (
                                a = n.data.data.items, r = [], s = [], i = 0;
                                i < a.length;
                                i++
                              ) {
                                (o = a[i]), (c = []), (u = jt(o.materials));
                                try {
                                  for (
                                    d = function () {
                                      var t = l.value;
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
                                          Q().findIndex(s, function (e) {
                                            return (
                                              e.material_id == t.material_id
                                            );
                                          }) &&
                                          t.max_discount_percent > 0 &&
                                          s.push({
                                            material_id: t.material_id,
                                            material_name: t.material_name,
                                            amount: "",
                                            max_discount:
                                              t.max_discount_percent,
                                          });
                                    },
                                      u.s();
                                    !(l = u.n()).done;

                                  )
                                    d();
                                } catch (t) {
                                  u.e(t);
                                } finally {
                                  u.f();
                                }
                                (p = (0, v.GQ)(
                                  o.tax_info,
                                  parseFloat(o.total_amount),
                                  e.state.user_gst_no
                                )),
                                  (m = p ? p.cgst : 0),
                                  (h = p ? p.sgst : 0),
                                  (f = p ? p.igst : 0),
                                  (g = (0, v.XY)(m + h + f)),
                                  (x = (0, v.XY)(o.total_amount + m + h + f)),
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
                                    cgst_tax: m,
                                    sgst_tax: h,
                                    igst_tax: f,
                                    total: x,
                                    tax_info: o.tax_info,
                                    total_tax: g,
                                    sub_cat_making_charge:
                                      o.sub_cat_making_charge,
                                    sub_cat_making_charge_type:
                                      o.sub_cat_making_charge_type,
                                  });
                              }
                              ((_ = e.state.formValues).products = [].concat(
                                r
                              )),
                                (_.invoice_number = n.data.data.next_invoice),
                                e.setState(
                                  { formValues: _, unique_materials: s },
                                  function () {
                                    e.handleCalculateMainPrice();
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
              At(Ct(e), "handleAddNewProduct", function () {
                (0, v.xb)(e.state.formValues.user_id)
                  ? e.props.enqueueSnackbar(
                      "Please select admin for tax calculate.",
                      { variant: "error" }
                    )
                  : e.setState(
                      Pt({ productDialog: !0 }, e.getDefaultProductFormData())
                    );
              }),
              At(Ct(e), "handleAdminChange", function (t) {
                e.updateFormValues(t.target.value, "user_id");
                var n = e.getUserList(),
                  a = Q().filter(n, { id: t.target.value }),
                  r = "";
                a.length && (r = a[0].gst),
                  e.setState({ user_gst_no: r }, function () {
                    e.setAdminDetails();
                  });
              }),
              At(Ct(e), "setAdminDetails", function () {
                if (!(0, v.xb)(e.state.formValues.user_id)) {
                  var t = e.getUserList(),
                    n = Q().filter(t, { id: e.state.formValues.user_id });
                  n.length &&
                    e.setState({
                      admin_details: Pt(
                        Pt({}, e.state.admin_details),
                        {},
                        {
                          name: (0, v.xb)(n[0].name) ? "" : n[0].name,
                          company_name: (0, v.xb)(n[0].company_name)
                            ? ""
                            : n[0].company_name,
                          mobile: (0, v.xb)(n[0].mobile) ? "" : n[0].mobile,
                          city: (0, v.xb)(n[0].city) ? "" : n[0].city,
                          gst: (0, v.xb)(n[0].gst) ? "" : n[0].gst,
                          address: (0, v.xb)(n[0].address) ? "" : n[0].address,
                          pincode: (0, v.xb)(n[0].pincode) ? "" : n[0].pincode,
                        }
                      ),
                    });
                }
                return "";
              }),
              At(Ct(e), "handleDefaultChange", function (t, n) {
                e.updateFormValues(t.target.value, n);
              }),
              At(Ct(e), "updateFormValues", function (t, n) {
                var a = e.state.formValues;
                (a[n] = t),
                  e.setState({ formValues: a }, function () {
                    e.calculateProductPrice();
                  });
              }),
              At(Ct(e), "handleProductChange", function (t, n) {
                e.updateProductFormValues(t.target.value, "product_id"),
                  e.props.actions.stocksProducDetails({
                    product_id: t.target.value,
                  });
              }),
              At(Ct(e), "handleProductFormDefaultChange", function (t, n) {
                e.updateProductFormValues(t.target.value, n);
              }),
              At(Ct(e), "handleProductFormStockChange", function (t) {
                var n =
                  null == t.target.value
                    ? t.target.parentNode.value
                    : t.target.value;
                e.updateProductFormValues(n, "stock_id");
              }),
              At(Ct(e), "handleSizeChange", function (t, n) {
                e.updateProductFormValues(t.target.value, "size_id");
              }),
              At(Ct(e), "handleCategoryChange", function (t) {
                e.updateProductFormValues(t.target.value, "category_id"),
                  (0, v.xb)(t.target.value)
                    ? e.props.dispatch({ type: J.z8 })
                    : e.props.actions.subCategoryList({
                        all: 1,
                        category_id: t.target.value,
                      }),
                  e.updateProductFormValues("", "sub_category_id"),
                  e.updateProductFormValues("", "product_id"),
                  e.props.dispatch({ type: K.vM });
              }),
              At(Ct(e), "handleSubCategoryChange", function (t) {
                e.updateProductFormValues(t.target.value, "sub_category_id"),
                  e.props.actions.stocksProductList({
                    sub_category_id: t.target.value,
                  }),
                  e.updateProductFormValues("", "product_id"),
                  e.props.dispatch({ type: K.vM });
              }),
              At(Ct(e), "updateProductFormValues", function (t, n) {
                var a = e.state.productFormValues,
                  r = e.state.sizeList,
                  s = e.state.materialFormErros;
                if (((a[n] = t), "product_id" == n)) {
                  e.props.actions.materialPriceProductPriceInfo(t || 0);
                  var i = Q().filter(e.state.stockProductList, { id: t });
                  (a.materials = []),
                    (a.product_type = i.length ? i[0].type : ""),
                    (a.product_name = i.length ? i[0].name : ""),
                    (a.tax_info = i.length ? i[0].tax_info : null);
                } else if ("size_id" == n);
                else if ("stock_id" == n) {
                  var o,
                    c = Q().filter(e.state.stockProductDetails, function (e) {
                      return e.stock_id == t;
                    }),
                    u = [],
                    l = jt(c[0].materials);
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
                e.setState(
                  { productFormValues: a, sizeList: r, materialFormErros: s },
                  function () {
                    e.calculateProductPrice();
                  }
                );
              }),
              At(Ct(e), "calculateProductPrice", function () {
                for (
                  var t = e.state.formValues,
                    n = t.products,
                    a = e.state.isAssign,
                    r = 0;
                  r < n.length;
                  r++
                ) {
                  for (
                    var s = 0, i = 0, o = 0, c = 0, u = 0;
                    u < n[r].materials.length;
                    u++
                  ) {
                    var l = n[r].materials[u].discount_percent
                      ? parseFloat(n[r].materials[u].discount_percent)
                      : 0;
                    l = a ? 0 : l;
                    var d = (0, v.XY)(
                        parseFloat(n[r].materials[u].per_gram_price) -
                          parseFloat(
                            (n[r].materials[u].per_gram_price * parseFloat(l)) /
                              100
                          )
                      ),
                      p = (0, v.XY)(
                        parseFloat(n[r].materials[u].per_gram_price) *
                          parseFloat(n[r].materials[u].total_gram)
                      );
                    (s += p),
                      (i += (0, v.XY)(
                        parseFloat(d) * parseFloat(n[r].materials[u].total_gram)
                      )),
                      (n[r].materials[u].amount = p),
                      (n[r].materials[u].discount_amount = (0, v.XY)(
                        p -
                          (0, v.XY)(
                            parseFloat(d) *
                              parseFloat(n[r].materials[u].total_gram)
                          )
                      )),
                      console.log(
                        (0, v.XY)(
                          p -
                            (0, v.XY)(
                              parseFloat(d) *
                                parseFloat(n[r].materials[u].total_gram)
                            )
                        ),
                        l,
                        parseFloat((n[r].materials[u].rate * l) / 100)
                      ),
                      n[r].materials[u].quantity &&
                        parseInt(n[r].materials[u].quantity),
                      (c += (0, v.XY)(
                        p -
                          (0, v.XY)(
                            parseFloat(d) *
                              parseFloat(n[r].materials[u].total_gram)
                          )
                      ));
                  }
                  n[r].product_type,
                    "per_piece" == n[r].sub_cat_making_charge_type
                      ? (o = (0, v.XY)(parseFloat(n[r].sub_cat_making_charge)))
                      : "per_gram" == n[r].sub_cat_making_charge_type &&
                        (o = (0, v.XY)(
                          parseFloat(n[r].total_weight) *
                            parseFloat(parseFloat(n[r].sub_cat_making_charge))
                        ));
                  var m = (0, v.XY)(
                      (o * parseFloat(n[r].making_charge_discount_percent)) /
                        100
                    ),
                    h = (0, v.XY)(o - m);
                  c += m;
                  var f = a
                      ? null
                      : (0, v.GQ)(
                          n[r].tax_info,
                          parseFloat(i) + parseFloat(h),
                          e.state.user_gst_no
                        ),
                    g = f ? f.cgst : 0,
                    x = f ? f.sgst : 0,
                    _ = f ? f.igst : 0,
                    y = (0, v.XY)(g + x + _),
                    j = (0, v.XY)(h + i),
                    b = (0, v.XY)(j + g + x + _);
                  (n[r].making_charge_discount_amount = m),
                    (n[r].total_discount = (0, v.XY)(c)),
                    (n[r].sub_price = (0, v.XY)(parseFloat(s) + parseFloat(o))),
                    (n[r].making_charge = (0, v.XY)(o)),
                    (n[r].total = (0, v.XY)(b)),
                    (n[r].total_tax = (0, v.XY)(y)),
                    (n[r].cgst_tax = (0, v.XY)(g)),
                    (n[r].sgst_tax = (0, v.XY)(x)),
                    (n[r].igst_tax = (0, v.XY)(_));
                }
                console.log(n),
                  (t.products = n),
                  e.setState({ formValues: t }, function () {
                    e.handleCalculateMainPrice();
                  });
              }),
              At(Ct(e), "getDefaultProductFormData", function () {
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
              At(Ct(e), "handleMaterialFormChange", function (t, n, a) {
                var r = e.state.productFormValues,
                  s = r.materials;
                (s[n][a] = t.target.value),
                  (r.materials = s),
                  e.setState({ productFormValues: r }, function () {
                    e.calculateProductPrice();
                  });
              }),
              At(Ct(e), "handleProductDialogClose", function (t, n) {
                (n && "backdropClick" == n) ||
                  e.setState({ productDialog: !1 });
              }),
              At(Ct(e), "getTotalWeightByProduct", function (t) {
                var n,
                  a = 0,
                  r = jt(e.state.formValues.products[t].materials);
                try {
                  for (r.s(); !(n = r.n()).done; ) {
                    var s = n.value;
                    a += s.weight ? parseFloat(s.weight) : 0;
                  }
                } catch (t) {
                  r.e(t);
                } finally {
                  r.f();
                }
                return a;
              }),
              At(Ct(e), "handleProductDelete", function (t) {
                e.setState({ deletingIndex: t, deleteDialogOpen: !0 });
              }),
              At(Ct(e), "handleProductSubmit", function () {
                if (!e.productFormValidate()) {
                  var t,
                    n = Pt({}, e.state.formValues),
                    a = Pt({}, e.state.productFormValues);
                  n.products.push(a),
                    e.setState(
                      {
                        formValues: n,
                        productFormValues: Pt(
                          Pt({}, e.state.productFormValues),
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
                          At(t, "making_charge", 0),
                          At(t, "rep", 0),
                          At(t, "cgst_tax", 0),
                          At(t, "sgst_tax", 0),
                          At(t, "igst_tax", 0),
                          At(t, "total", 0),
                          At(t, "tax_info", null),
                          At(t, "total_tax", 0),
                          t)
                        ),
                      },
                      function () {
                        e.handleCalculateMainPrice();
                      }
                    );
                }
              }),
              At(Ct(e), "calculatePrice", function () {}),
              At(Ct(e), "handleCalculateMainPrice", function () {
                for (
                  var t,
                    n,
                    a = e.state.formValues,
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
                  m < a.products.length;
                  m++
                )
                  (i +=
                    parseFloat(a.products[m].total) -
                    parseFloat(a.products[m].total_tax)),
                    (o += a.products[m].cgst_tax
                      ? parseFloat(a.products[m].cgst_tax)
                      : 0),
                    (c += a.products[m].sgst_tax
                      ? parseFloat(a.products[m].sgst_tax)
                      : 0),
                    (u += a.products[m].igst_tax
                      ? parseFloat(a.products[m].igst_tax)
                      : 0),
                    (l += parseFloat(a.products[m].total)),
                    (r += parseFloat(a.products[m].total_discount)),
                    (s += parseFloat(a.products[m].sub_price));
                (i = (0, v.XY)(i, !0)),
                  (o = (0, v.XY)(o, !0)),
                  (c = (0, v.XY)(c, !0)),
                  (u = (0, v.XY)(u, !0)),
                  (l = (0, v.XY)(l, !0)),
                  (0, v.xb)(a.discount) || (d = parseFloat(a.discount)),
                  (t = (0, v.XY)(l - d, !0)),
                  (0, v.xb)(a.paid_amount) || (p = parseFloat(a.paid_amount)),
                  (n = (0, v.XY)(t - p, !0)),
                  (a.taxable_amount = i),
                  (a.cgst_tax = o),
                  (a.sgst_tax = c),
                  (a.igst_tax = u),
                  (a.total_tax = (0, v.XY)(o + c + u)),
                  (a.total_amount = l),
                  (a.total_payable = t),
                  (a.due_amount = n),
                  (a.product_discount = (0, v.XY)(r)),
                  (a.total_tag_price = (0, v.XY)(s)),
                  e.setState({ formValues: a });
              }),
              At(Ct(e), "productFormValidate", function () {
                var t = e.state.productFormValues,
                  n = e.state.productFormErros,
                  a = e.state.materialFormErros,
                  r = !1;
                (0, v.xb)(t.product_id)
                  ? ((n.product_id = !0), (r = !0))
                  : (n.product_id = !1),
                  "material" != t.product_type
                    ? t.stock_id
                    : ((n.certificate_no = !1), (n.size_id = !1)),
                  t.materials.length ||
                    (e.props.enqueueSnackbar("Please select stock", {
                      variant: "error",
                    }),
                    (r = !0));
                for (var s = 0; s < t.materials.length; s++)
                  (0, v.xb)(t.materials[s].weight)
                    ? ((a[s].weight = !0), (r = !0))
                    : (a[s].weight = !1),
                    (0, v.xb)(t.materials[s].quantity)
                      ? ((a[s].quantity = !0), (r = !0))
                      : (a[s].quantity = !1);
                return (
                  e.setState({ productFormErros: n, materialFormErros: a }), r
                );
              }),
              At(Ct(e), "handleDialogClose", function () {
                e.setState({ deleteDialogOpen: !1, deletingIndex: 0 });
              }),
              At(
                Ct(e),
                "handleDeleteConfirm",
                kt(
                  bt().mark(function t() {
                    var n, a;
                    return bt().wrap(function (t) {
                      for (;;)
                        switch ((t.prev = t.next)) {
                          case 0:
                            return (
                              (n = e.state.formValues.products),
                              (t.next = 3),
                              (0, lt.VE)(n[e.state.deletingIndex].id, !0)
                            );
                          case 3:
                            (a = t.sent).data.success
                              ? (e.props.enqueueSnackbar(a.data.message, {
                                  variant: "success",
                                }),
                                e.loadCart(),
                                e.props.actions.cartList())
                              : e.props.enqueueSnackbar(a.data.message, {
                                  variant: "error",
                                }),
                              e.setState({ deleteDialogOpen: !1 }, function () {
                                e.handleCalculateMainPrice();
                              });
                          case 6:
                          case "end":
                            return t.stop();
                        }
                    }, t);
                  })
                )
              ),
              At(
                Ct(e),
                "handleSubmit",
                (function () {
                  var t = kt(
                    bt().mark(function t(n) {
                      var a, r, s;
                      return bt().wrap(function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              if (
                                ((a = e.state.formValues),
                                (r = e.formValidate(n)),
                                0 != a.products.length)
                              ) {
                                t.next = 5;
                                break;
                              }
                              return (
                                e.props.enqueueSnackbar(
                                  "Please add at least one product",
                                  { variant: "error" }
                                ),
                                t.abrupt("return", !1)
                              );
                            case 5:
                              if (r || !a.products.length) {
                                t.next = 20;
                                break;
                              }
                              if (
                                (e.setState({ submitting: !0, isOnApprove: n }),
                                ((s = Pt(
                                  Pt({}, e.state.formValues),
                                  {},
                                  {
                                    on_approval: n,
                                    on_approval_id:
                                      e.props.query.get("sale_on_approval"),
                                  }
                                )).order_id = e.state.order
                                  ? e.state.order.id
                                  : 0),
                                (s.order_from_customer =
                                  !!e.state.order && e.state.order.is_customer),
                                (s.is_assigned = e.state.isAssign),
                                !s.image_file)
                              ) {
                                t.next = 17;
                                break;
                              }
                              return (t.next = 14), (0, v.s3)(s.image_file);
                            case 14:
                              (t.t0 = t.sent), (t.next = 18);
                              break;
                            case 17:
                              t.t0 = "";
                            case 18:
                              (s.image_file = t.t0),
                                e.state.isCreateFrom
                                  ? e.props.actions.salesStore(s)
                                  : e.props.actions.salesUpdate(
                                      e.state.formData.id,
                                      s
                                    );
                            case 20:
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
              At(Ct(e), "formValidate", function (t) {
                var n = e.state.formErros,
                  a = e.state.formValues,
                  r = !1;
                return (
                  (0, v.xb)(a.user_id)
                    ? ((n.user_id = !0), (r = !0))
                    : (n.user_id = !1),
                  (0, v.xb)(a.invoice_date)
                    ? ((n.invoice_date = !0), (r = !0))
                    : (n.invoice_date = !1),
                  parseFloat(a.due_amount) > 0 &&
                    (!e.state.isAssign && (0, v.xb)(a.due_date)
                      ? ((n.due_date = !0), (r = !0))
                      : (n.due_date = !1),
                    e.state.isAssign || !(0, v.xb)(a.settlement_date) || t
                      ? (n.settlement_date = !1)
                      : ((n.settlement_date = !0), (r = !0))),
                  (0, v.xb)(a.total_payable) ||
                    (0, v.xb)(a.paid_amount) ||
                    (parseFloat(a.paid_amount) > parseFloat(a.total_payable) &&
                      ((r = !0),
                      e.props.enqueueSnackbar(
                        "Paid amount must be less than or equal to payable amount.",
                        { variant: "error" }
                      ))),
                  e.setState({ formErros: n }),
                  r
                );
              }),
              At(Ct(e), "checkIfStockAdded", function (t) {
                return Q().filter(e.state.formValues.products, function (e) {
                  return e.stock_id == t;
                }).length;
              }),
              At(Ct(e), "checkIfAllStockAdded", function () {
                for (
                  var t = !0, n = 0;
                  n < e.state.stockProductDetails.length;
                  n++
                )
                  if (
                    !e.checkIfStockAdded(
                      e.state.stockProductDetails[n].stock_id
                    )
                  ) {
                    t = !1;
                    break;
                  }
                return t;
              }),
              At(Ct(e), "handleMaterialDisc", function (t, n, a) {
                var r = e.state.formValues,
                  s = t.target,
                  i = s.value,
                  o = s.max;
                "" != i &&
                  (i = Math.max(Number(0), Math.min(Number(o), Number(i)))),
                  (r.products[n].materials[a].discount_percent = i),
                  e.setState({ formValues: r }, function () {
                    e.calculateProductPrice();
                  });
              }),
              At(Ct(e), "handleMakingDiscount", function (t, n) {
                var a = e.state.formValues,
                  r = t.target,
                  s = r.value,
                  i = r.max;
                "" != s &&
                  (s = Math.max(Number(0), Math.min(Number(i), Number(s)))),
                  (a.products[n].making_charge_discount_percent = s),
                  e.setState({ formValues: a }, function () {
                    e.calculateProductPrice();
                  });
              }),
              At(Ct(e), "handleCommonDis", function (t, n) {
                var a = e.state.unique_materials,
                  r = t.target,
                  s = r.value,
                  i = r.max;
                "" != s &&
                  (s = Math.max(Number(0), Math.min(Number(i), Number(s)))),
                  (a[n].amount = s),
                  e.setState({ unique_materials: a });
                for (
                  var o = e.state.formValues, c = 0;
                  c < o.products.length;
                  c++
                )
                  for (var u = 0; u < o.products[c].materials.length; u++)
                    a[n].material_id ==
                      o.products[c].materials[u].material_id &&
                      (o.products[c].materials[u].discount_percent = s);
                e.setState({ formValues: o }, function () {
                  e.calculateProductPrice();
                });
              }),
              At(Ct(e), "handleCommonMakingDis", function (t) {
                e.setState({ common_making_discount: t.target.value });
                for (
                  var n = e.state.formValues, a = t.target.value, r = 0;
                  r < n.products.length;
                  r++
                )
                  a
                    ? n.products[r].max_making_charge_discount_percent > 0 &&
                      (n.products[r].making_charge_discount_percent =
                        n.products[r].max_making_charge_discount_percent >=
                        parseFloat(a)
                          ? a
                          : n.products[r].max_making_charge_discount_percent)
                    : (n.products[r].making_charge_discount_percent = "");
                e.setState({ formValues: n }, function () {
                  e.calculateProductPrice();
                });
              }),
              At(Ct(e), "getUserList", function () {
                var t = [];
                return (
                  e.isSuperAdmin
                    ? (t = e.state.adminList)
                    : e.isAdmin
                    ? (t = e.state.distributorList)
                    : e.isDistributor
                    ? (t = e.state.isAssign
                        ? e.state.salesExecutiveList
                        : e.state.retailerList)
                    : e.isSalesExecutive &&
                      (t = e.state.isAssign
                        ? e.state.distributorList.concat(
                            e.state.salesExecutiveList
                          )
                        : e.state.retailerList),
                  t
                );
              }),
              At(Ct(e), "handleTransfer", function () {
                var t = e.state.formValues.invoice_number;
                t && (t = t.replace("-S-", "-T-")),
                  e.setState(
                    {
                      isAssign: !0,
                      formValues: Pt(
                        Pt({}, e.state.formValues),
                        {},
                        { user_id: "", invoice_number: t }
                      ),
                    },
                    function () {
                      e.calculateProductPrice();
                    }
                  );
              }),
              At(Ct(e), "handleBackAssign", function () {
                var t = e.state.formValues.invoice_number;
                t && (t = t.replace("-T-", "-S-")),
                  e.setState(
                    {
                      isAssign: !1,
                      formValues: Pt(
                        Pt({}, e.state.formValues),
                        {},
                        { user_id: "", invoice_number: t }
                      ),
                    },
                    function () {
                      e.calculateProductPrice();
                    }
                  );
              }),
              At(Ct(e), "onChangeImage", function (t) {
                e.updateFormValues(t.target.files[0], "image_file"),
                  e.imageFileRef && (e.imageFileRef.current.value = null);
              }),
              At(Ct(e), "getImageSrc", function (t) {
                return URL.createObjectURL(t);
              }),
              At(Ct(e), "deleteImage", function () {
                e.updateFormValues(null, "image_file");
              }),
              At(Ct(e), "haveMakingComonDis", function () {
                var t,
                  n = e.state,
                  a = n.formValues,
                  r = n.isAssign,
                  s = !1,
                  i = jt(a.products);
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
              });
            var n = "formData" in e.props ? e.props.formData : null;
            return (
              (e.state = Pt(
                Pt(
                  {
                    auth: e.props.auth,
                    formData: n,
                    isCreateFrom: !n,
                    adminList: e.props.adminList,
                    retailerList: e.props.retailerList,
                    distributorList: e.props.distributorList,
                    salesExecutiveList: e.props.salesExecutiveList,
                    productList: e.props.productList,
                    productPriceInfo: e.props.productPriceInfo,
                    stockProductList: e.props.stockProductList,
                    stockProductDetails: e.props.stockProductDetails,
                    categoryList: e.props.categoryList,
                    subCategoryList: e.props.subCategoryList,
                    materialList: [],
                    sizeList: [],
                    materials: [],
                    product_type: "",
                    productDialog: !1,
                    user_gst_no: "",
                    formValues: {
                      user_id: "",
                      invoice_number: "",
                      invoice_date: at()().format("MM/DD/YYYY"),
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
                  e.getDefaultProductFormData()
                ),
                {},
                {
                  actionCalled: e.props.actionCalled,
                  createSuccess: e.props.createSuccess,
                  editSuccess: e.props.editSuccess,
                  successMessage: e.props.successMessage,
                  errorMessage: e.props.errorMessage,
                  order_id: e.props.order_id,
                  order: e.props.order,
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
                }
              )),
              (e.isSuperAdmin = (0, v.j5)()),
              (e.isAdmin = (0, v.GJ)()),
              (e.isDistributor = (0, v.JH)()),
              (e.isSalesExecutive = (0, v.ty)()),
              (e.imageFileRef = a.createRef()),
              (e.columns = [
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
              e
            );
          }
          return (
            (e = w),
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
                    n
                  );
                },
              },
            ]),
            (n = [
              {
                key: "componentDidMount",
                value: function () {
                  if (
                    (this.isSuperAdmin
                      ? this.props.actions.adminList({ all: 1 })
                      : this.isAdmin
                      ? this.props.actions.distributorList({ all: 1 })
                      : this.isDistributor
                      ? (this.props.actions.retailerList({ all: 1 }),
                        this.props.actions.salesExecutiveList({
                          all: 1,
                          role_id: 4,
                        }))
                      : this.isSalesExecutive &&
                        (this.props.actions.retailerList({ all: 1 }),
                        this.props.actions.distributorList({ all: 1 }),
                        this.props.actions.salesExecutiveList({
                          all: 1,
                          role_id: 4,
                        })),
                    this.props.actions.categoryList({ all: 1 }),
                    this.state.formData)
                  ) {
                    var t = Pt({}, this.state.formData);
                    this.setState({ formValues: t });
                  }
                  this.props.dispatch({ type: H.cd, payload: null }),
                    this.state.order_id &&
                      this.props.actions.orderView(this.state.order_id),
                    this.loadCart(),
                    this.loadSaleOnApproval();
                },
              },
              {
                key: "componentDidUpdate",
                value: function (t) {
                  var e = this;
                  this.props.query.get("sale_on_approval") !=
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
                            this.props.dispatch({ type: $.W1 }),
                            this.state.isAssign
                              ? this.props.navigate(
                                  (0, v.ZA)((0, v.O2)(this.state.auth)) +
                                    "/transfer"
                                )
                              : this.state.isOnApprove
                              ? this.props.navigate(
                                  (0, v.ZA)((0, v.O2)(this.state.auth)) +
                                    "/sale-on-approve"
                                )
                              : this.props.navigate(
                                  (0, v.ZA)((0, v.O2)(this.state.auth)) +
                                    "/sales"
                                ))
                          : (this.setState({ submitting: !1 }),
                            this.props.enqueueSnackbar(
                              this.state.errorMessage,
                              { variant: "error" }
                            ),
                            this.props.dispatch({ type: $.W1 }))
                        : this.state.editSuccess
                        ? (this.props.enqueueSnackbar(
                            this.state.successMessage,
                            { variant: "success" }
                          ),
                          this.props.dispatch({ type: $.W1 }),
                          this.state.isAssign
                            ? this.props.navigate(
                                (0, v.ZA)((0, v.O2)(this.state.auth)) +
                                  "/transfer"
                              )
                            : this.props.navigate(
                                (0, v.ZA)((0, v.O2)(this.state.auth)) + "/sales"
                              ))
                        : (this.setState({ submitting: !1 }),
                          this.props.enqueueSnackbar(this.state.errorMessage, {
                            variant: "error",
                          }),
                          this.props.dispatch({ type: $.W1 }))),
                    t.order != this.props.order &&
                      this.props.order &&
                      (this.setState({
                        formValues: Pt(
                          Pt({}, this.state.formValues),
                          {},
                          { user_id: this.props.order.user_details.id }
                        ),
                        admin_details: Pt(
                          Pt({}, this.state.admin_details),
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
                          {
                            formValues: Pt(
                              Pt({}, e.state.formValues),
                              {},
                              {
                                user_id: e.props.order.user_details.id,
                                paid_amount: e.props.order.paid_amount,
                                payment_mode: e.state.order.payment_mode,
                              }
                            ),
                          },
                          function () {
                            e.handleCalculateMainPrice();
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
                    b = n.productFormValues,
                    Z = n.productFormErros,
                    P = n.materialFormErros,
                    w = n.submitting,
                    k = n.order,
                    N = this.getUserList();
                  return (
                    (t = this.state.isAssign
                      ? r.user_id
                        ? 2
                        : 4
                      : r.user_id
                      ? 4
                      : 6),
                    (0, _t.jsxs)(i.Z, {
                      sx: { flexGrow: 1, m: 0.5 },
                      className: "ratn-dialog-inner sale_create_page",
                      children: [
                        (0, _t.jsxs)(o.ZP, {
                          container: !0,
                          spacing: 2,
                          columnSpacing: { xs: 1, sm: 2, md: 2 },
                          className: "tax-input loans_view p_view",
                          children: [
                            k
                              ? (0, _t.jsx)(o.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 12,
                                  className: "create-input",
                                  children: (0, _t.jsxs)(st.Z, {
                                    className: "rtn_accordion",
                                    children: [
                                      (0, _t.jsx)(it.Z, {
                                        expandIcon: (0, _t.jsx)(ut.Z, {}),
                                        "aria-controls": "panel1a-content",
                                        id: "panel1a-header",
                                        children: (0, _t.jsxs)(ct.Z, {
                                          children: [
                                            "Order # ",
                                            k.order_no,
                                            " | ",
                                            k.order_from,
                                            " | ",
                                            k.order_date,
                                          ],
                                        }),
                                      }),
                                      (0, _t.jsx)(ot.Z, {
                                        children: (0, _t.jsx)(xt.Z, {
                                          columns: this.columns,
                                          rows: k.products,
                                          page: 1,
                                          limit: k.products.length,
                                          total: k.products.length,
                                          havePagination: !1,
                                        }),
                                      }),
                                    ],
                                  }),
                                })
                              : null,
                            (0, _t.jsxs)(o.ZP, {
                              container: !0,
                              spacing: 2,
                              columnSpacing: { xs: 1, sm: 2, md: 2 },
                              children: [
                                (this.isDistributor || this.isSalesExecutive) &&
                                this.state.isAssign
                                  ? (0, _t.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 12,
                                      md: 2,
                                      className: "create-input",
                                      children: (0, _t.jsx)(c.Z, {
                                        fullWidth: !0,
                                        children: (0, _t.jsx)(u.Z, {
                                          variant: "contained",
                                          size: "small",
                                          onClick: this.handleBackAssign,
                                          startIcon: (0, _t.jsx)(ht.Z, {}),
                                          children: "Back",
                                        }),
                                      }),
                                    })
                                  : null,
                                (0, _t.jsx)(o.ZP, {
                                  item: !0,
                                  md: t,
                                  xs: 12,
                                  className: "create-input",
                                  children: (0, _t.jsxs)(c.Z, {
                                    fullWidth: !0,
                                    error: s.user_id,
                                    children: [
                                      (0, _t.jsx)(l.Z, {
                                        children: this.state.isAssign
                                          ? "Transfer To"
                                          : "Company Name",
                                      }),
                                      (0, _t.jsxs)(d.Z, {
                                        className: "input-inner",
                                        value: r.user_id,
                                        fullWidth: !0,
                                        label: this.state.isAssign
                                          ? "Transfer To"
                                          : "Company Name",
                                        onChange: this.handleAdminChange,
                                        children: [
                                          (0, _t.jsx)(p.Z, { value: "" }),
                                          N.map(function (t, n) {
                                            return (0,
                                            _t.jsx)(p.Z, { value: t.id, children: e.state.isAssign ? t.name : t.company_name }, n);
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                                r.user_id
                                  ? (0, _t.jsxs)(_t.Fragment, {
                                      children: [
                                        (0, _t.jsx)(o.ZP, {
                                          item: !0,
                                          xs: 6,
                                          md: 2,
                                          className: "create-input",
                                          children: (0, _t.jsx)(m.Z, {
                                            label: "Owner Name",
                                            variant: "outlined",
                                            fullWidth: !0,
                                            value:
                                              this.state.admin_details.name,
                                            disabled: !0,
                                            inputProps: {
                                              className: "non_disable_text",
                                            },
                                          }),
                                        }),
                                        (0, _t.jsx)(o.ZP, {
                                          item: !0,
                                          xs: 6,
                                          md: 2,
                                          className: "create-input",
                                          children: (0, _t.jsx)(m.Z, {
                                            label: "Contact Number",
                                            variant: "outlined",
                                            fullWidth: !0,
                                            value:
                                              this.state.admin_details.mobile,
                                            disabled: !0,
                                            inputProps: {
                                              className: "non_disable_text",
                                            },
                                          }),
                                        }),
                                        (0, _t.jsx)(o.ZP, {
                                          item: !0,
                                          xs: 6,
                                          md: 2,
                                          className: "create-input",
                                          children: (0, _t.jsx)(m.Z, {
                                            label: "City",
                                            variant: "outlined",
                                            fullWidth: !0,
                                            value:
                                              this.state.admin_details.city,
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
                                  : (0, _t.jsx)(o.ZP, {
                                      item: !0,
                                      xs: 6,
                                      md: 3,
                                      className: "create-input",
                                      children: (0, _t.jsx)(m.Z, {
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
                                      }),
                                    }),
                                (0, _t.jsx)(o.ZP, {
                                  item: !0,
                                  xs: (r.user_id, 6),
                                  md: r.user_id ? 2 : 3,
                                  className: "create-input p-invoice-date",
                                  children: (0, _t.jsx)(Y._, {
                                    dateAdapter: I.y,
                                    children: (0, _t.jsx)(z.M, {
                                      label: "Invoice Date",
                                      value: r.invoice_date,
                                      inputFormat: "DD/MM/YYYY",
                                      onChange: function (t) {
                                        return e.updateFormValues(
                                          t,
                                          "invoice_date"
                                        );
                                      },
                                      renderInput: function (t) {
                                        return (0, _t.jsx)(
                                          m.Z,
                                          Pt(
                                            Pt({}, t),
                                            {},
                                            { error: s.invoice_date }
                                          )
                                        );
                                      },
                                    }),
                                  }),
                                }),
                                r.user_id
                                  ? (0, _t.jsxs)(_t.Fragment, {
                                      children: [
                                        (0, _t.jsx)(o.ZP, {
                                          item: !0,
                                          xs: 12,
                                          md: 8,
                                          className: "create-input",
                                          children: (0, _t.jsx)(m.Z, {
                                            label: "Full Address",
                                            variant: "outlined",
                                            fullWidth: !0,
                                            value:
                                              this.state.admin_details.address,
                                            disabled: !0,
                                            inputProps: {
                                              className: "non_disable_text",
                                            },
                                          }),
                                        }),
                                        (0, _t.jsx)(o.ZP, {
                                          item: !0,
                                          xs: 6,
                                          md: 2,
                                          className: "create-input",
                                          children: (0, _t.jsx)(m.Z, {
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
                                        (0, _t.jsx)(o.ZP, {
                                          item: !0,
                                          xs: 6,
                                          md: 2,
                                          className: "create-input",
                                          children: (0, _t.jsx)(m.Z, {
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
                                          }),
                                        }),
                                      ],
                                    })
                                  : null,
                              ],
                            }),
                          ],
                        }),
                        (0, _t.jsxs)(o.ZP, {
                          container: !0,
                          spacing: 2,
                          columnSpacing: { xs: 1, sm: 2, md: 2 },
                          className: "tax-input loans_view",
                          children: [
                            (0, _t.jsx)(o.ZP, {
                              item: !0,
                              xs: 12,
                              md: 12,
                              className:
                                " create-input p-add-product border-radius-0",
                              children: (0, _t.jsx)(B.Z, {
                                component: G.Z,
                                children: (0, _t.jsxs)(q.Z, {
                                  sx: { minWidth: 650 },
                                  "aria-label": "simple table",
                                  className:
                                    "ratn-table-product-wrapper sale_form_table",
                                  children: [
                                    (0, _t.jsx)(W.Z, {
                                      className: "ratn-table-header p_view",
                                      children: (0, _t.jsxs)(R.Z, {
                                        children: [
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: 15 },
                                            children: "#",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: 225 },
                                            children: "Product Name",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: 90 },
                                            children: "Size",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: 120 },
                                            children: "Certificate No",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: 90 },
                                            children: "Matl Cost",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: 160 },
                                            children: "Mac Charge",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: "40px" },
                                            children: "Price",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: "20px" },
                                            children: "Dist",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: "80px" },
                                            children: "Tax",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: "40px" },
                                            children: "Total",
                                          }),
                                          (0, _t.jsx)(X.Z, {
                                            sx: { width: "20px" },
                                            children: "Actions",
                                          }),
                                        ],
                                      }),
                                    }),
                                    (0, _t.jsxs)(T.Z, {
                                      children: [
                                        r.products.map(function (t, n) {
                                          return (0, _t.jsxs)(
                                            a.Fragment,
                                            {
                                              children: [
                                                (0, _t.jsxs)(R.Z, {
                                                  className: "product_details",
                                                  children: [
                                                    (0, _t.jsx)(X.Z, {
                                                      children: n + 1,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.product_name,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.size_name,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      colSpan: 7,
                                                      children:
                                                        t.certificate_no,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      rowSpan: 2,
                                                      className:
                                                        "action_column",
                                                      style: {
                                                        textAlign: "center",
                                                      },
                                                      children: (0, _t.jsx)(
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
                                                    }),
                                                  ],
                                                }),
                                                (0, _t.jsxs)(R.Z, {
                                                  className: "material_details",
                                                  children: [
                                                    (0, _t.jsx)(X.Z, {}),
                                                    (0, _t.jsx)(X.Z, {
                                                      colSpan: 2,
                                                      children: t.materials.map(
                                                        function (t, e) {
                                                          return (0, _t.jsx)(
                                                            "div",
                                                            {
                                                              className:
                                                                "products-data-container",
                                                              children: (0,
                                                              _t.jsxs)("div", {
                                                                className:
                                                                  "products-data-row",
                                                                children: [
                                                                  (0, _t.jsxs)(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "products-data",
                                                                      style: {
                                                                        position:
                                                                          "relative",
                                                                      },
                                                                      children:
                                                                        [
                                                                          t.material_name,
                                                                          "    ",
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
                                                                  (0, _t.jsxs)(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "products-amount",
                                                                      children:
                                                                        [
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
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.materials.map(
                                                        function (t, a) {
                                                          return (0, _t.jsx)(
                                                            "div",
                                                            {
                                                              className:
                                                                "sale-discount-wrapper",
                                                              children: (0,
                                                              _t.jsx)(
                                                                _t.Fragment,
                                                                {
                                                                  children:
                                                                    t.max_discount_percent >
                                                                      0 &&
                                                                    !e.state
                                                                      .isAssign
                                                                      ? (0,
                                                                        _t.jsxs)(
                                                                          _t.Fragment,
                                                                          {
                                                                            children:
                                                                              [
                                                                                "Dis@ ",
                                                                                (0,
                                                                                _t.jsxs)(
                                                                                  "div",
                                                                                  {
                                                                                    className:
                                                                                      "sale-discount",
                                                                                    children:
                                                                                      [
                                                                                        (0,
                                                                                        _t.jsx)(
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
                                                                                          }
                                                                                        ),
                                                                                        (0,
                                                                                        _t.jsx)(
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
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.materials.map(
                                                        function (t, e) {
                                                          return (0, _t.jsx)(
                                                            "p",
                                                            {
                                                              children: (0,
                                                              v.XY)(
                                                                t.amount -
                                                                  t.discount_amount
                                                              ),
                                                            },
                                                            e
                                                          );
                                                        }
                                                      ),
                                                    }),
                                                    (0, _t.jsxs)(X.Z, {
                                                      children: [
                                                        t.making_charge,
                                                        t.max_making_charge_discount_percent >
                                                          0 && !e.state.isAssign
                                                          ? (0, _t.jsxs)(
                                                              _t.Fragment,
                                                              {
                                                                children: [
                                                                  "@ ",
                                                                  (0, _t.jsxs)(
                                                                    "span",
                                                                    {
                                                                      style: {
                                                                        position:
                                                                          "relative",
                                                                      },
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          _t.jsx)(
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
                                                                            }
                                                                          ),
                                                                          (0,
                                                                          _t.jsx)(
                                                                            "span",
                                                                            {
                                                                              style:
                                                                                {
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
                                                                  (0, v.XY)(
                                                                    t.making_charge -
                                                                      t.making_charge_discount_amount
                                                                  ),
                                                                ],
                                                              }
                                                            )
                                                          : null,
                                                      ],
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.sub_price,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      children:
                                                        t.total_discount,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.total_tax,
                                                    }),
                                                    (0, _t.jsx)(X.Z, {
                                                      children: t.total,
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            },
                                            n
                                          );
                                        }),
                                        this.state.isAssign
                                          ? null
                                          : (0, _t.jsxs)(R.Z, {
                                              children: [
                                                (0, _t.jsx)(X.Z, {}),
                                                (0, _t.jsx)(X.Z, {
                                                  colSpan: "4",
                                                  children: (0, _t.jsx)("div", {
                                                    className: "unique-wrapper",
                                                    children: (0, _t.jsx)(
                                                      "div",
                                                      {
                                                        className:
                                                          "unique-wrapper-row",
                                                        children:
                                                          this.state.unique_materials.map(
                                                            function (t, n) {
                                                              return (0,
                                                              _t.jsx)(
                                                                a.Fragment,
                                                                {
                                                                  children: (0,
                                                                  _t.jsxs)(
                                                                    "div",
                                                                    {
                                                                      className:
                                                                        "unique_materials",
                                                                      children:
                                                                        [
                                                                          (0,
                                                                          _t.jsx)(
                                                                            "p",
                                                                            {
                                                                              children:
                                                                                t.material_name,
                                                                            }
                                                                          ),
                                                                          (0,
                                                                          _t.jsxs)(
                                                                            "span",
                                                                            {
                                                                              style:
                                                                                {
                                                                                  position:
                                                                                    "relative",
                                                                                },
                                                                              children:
                                                                                [
                                                                                  (0,
                                                                                  _t.jsx)(
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
                                                                                  _t.jsx)(
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
                                                                    }
                                                                  ),
                                                                },
                                                                n
                                                              );
                                                            }
                                                          ),
                                                      }
                                                    ),
                                                  }),
                                                }),
                                                (0, _t.jsx)(X.Z, {
                                                  sx: { verticalAlign: "top" },
                                                  children:
                                                    this.haveMakingComonDis()
                                                      ? (0, _t.jsxs)(
                                                          _t.Fragment,
                                                          {
                                                            children: [
                                                              (0, _t.jsx)("p", {
                                                                children:
                                                                  "Making Disc",
                                                              }),
                                                              (0, _t.jsxs)(
                                                                "span",
                                                                {
                                                                  style: {
                                                                    position:
                                                                      "relative",
                                                                  },
                                                                  children: [
                                                                    (0, _t.jsx)(
                                                                      "input",
                                                                      {
                                                                        type: "text",
                                                                        value:
                                                                          this
                                                                            .state
                                                                            .common_making_discount,
                                                                        onChange:
                                                                          function (
                                                                            t
                                                                          ) {
                                                                            return e.handleCommonMakingDis(
                                                                              t
                                                                            );
                                                                          },
                                                                        className:
                                                                          "custom_input",
                                                                        style: {
                                                                          width:
                                                                            "90%",
                                                                          height:
                                                                            "40px",
                                                                          padding:
                                                                            "5px 8px",
                                                                        },
                                                                      }
                                                                    ),
                                                                    (0, _t.jsx)(
                                                                      "span",
                                                                      {
                                                                        style: {
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
                                                          }
                                                        )
                                                      : null,
                                                }),
                                                (0, _t.jsx)(X.Z, {
                                                  sx: { verticalAlign: "top" },
                                                  children: (0, _t.jsxs)("b", {
                                                    children: [
                                                      "Price",
                                                      (0, _t.jsx)("br", {}),
                                                      (0, v.XY)(
                                                        r.total_tag_price
                                                      ),
                                                    ],
                                                  }),
                                                }),
                                                (0, _t.jsx)(X.Z, {
                                                  sx: { verticalAlign: "top" },
                                                  children: (0, _t.jsxs)("b", {
                                                    children: [
                                                      "Dist",
                                                      (0, _t.jsx)("br", {}),
                                                      (0, v.XY)(
                                                        r.product_discount
                                                      ),
                                                    ],
                                                  }),
                                                }),
                                                (0, _t.jsx)(X.Z, {
                                                  sx: { verticalAlign: "top" },
                                                  children: (0, _t.jsxs)("b", {
                                                    children: [
                                                      "Tax",
                                                      (0, _t.jsx)("br", {}),
                                                      (0, v.RS)(r.total_tax),
                                                    ],
                                                  }),
                                                }),
                                                (0, _t.jsx)(X.Z, {
                                                  colSpan: "2",
                                                  sx: { verticalAlign: "top" },
                                                  children: (0, _t.jsxs)("b", {
                                                    children: [
                                                      "Total Amount",
                                                      (0, _t.jsx)("br", {}),
                                                      (0, v.RS)(r.total_amount),
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
                            (0, _t.jsx)(o.ZP, {
                              item: !0,
                              xs: 12,
                              md: 8,
                              style: {},
                              children: (0, _t.jsxs)(o.ZP, {
                                container: !0,
                                spacing: 2,
                                columnSpacing: { xs: 1, sm: 2, md: 2 },
                                className: "mob_responsive_purchase_input",
                                children: [
                                  (!this.isSalesExecutive &&
                                    !this.isDistributor) ||
                                  this.state.isAssign ||
                                  r.user_id
                                    ? null
                                    : (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "create-input button-right",
                                        style: {
                                          paddingTop: "0px",
                                          paddingBottom: "7px",
                                        },
                                        children: (0, _t.jsx)(u.Z, {
                                          variant: "contained",
                                          size: "small",
                                          onClick: this.handleTransfer,
                                          children: "Transfer",
                                        }),
                                      }),
                                  (0, _t.jsx)(o.ZP, {
                                    item: !0,
                                    xs: 12,
                                    md: 12,
                                    className: "create-input",
                                    style: { paddingTop: "0px" },
                                    children: (0, _t.jsx)(h.Z, {
                                      className: "description",
                                      minRows: 3,
                                      placeholder: "Notes",
                                      style: { width: "100%" },
                                      value: r.notes,
                                      onChange: function (t) {
                                        return e.handleDefaultChange(
                                          t,
                                          "notes"
                                        );
                                      },
                                    }),
                                  }),
                                  0 == this.props.query.get("all_added")
                                    ? (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 12,
                                        className: "create-input",
                                        children: (0, _t.jsx)(f.Z, {
                                          variant: "filled",
                                          severity: "error",
                                          children:
                                            "You doesn't have enough stock.",
                                        }),
                                      })
                                    : null,
                                  (this.isSalesExecutive ||
                                    this.isDistributor) &&
                                  this.state.isAssign
                                    ? (0, _t.jsxs)(_t.Fragment, {
                                        children: [
                                          r.image_file
                                            ? (0, _t.jsxs)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                md: 2,
                                                className: "create-input",
                                                style: { position: "relative" },
                                                children: [
                                                  (0, _t.jsx)(S.Z, {
                                                    onClick: this.deleteImage,
                                                    className: "image_delete",
                                                    style: {
                                                      position: "absolute",
                                                      right: 0,
                                                      color: "#ff0000",
                                                      cursor: "pointer",
                                                    },
                                                  }),
                                                  (0, _t.jsx)("img", {
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
                                            : (0, _t.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                md: 2,
                                                className: "create-input",
                                                children: (0, _t.jsx)("img", {
                                                  src: gt.Z,
                                                  id: "logo-img1",
                                                  style: {
                                                    height: "100px",
                                                    width: "100px",
                                                  },
                                                }),
                                              }),
                                          (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 4,
                                            className: "create-input",
                                            children: (0, _t.jsxs)(u.Z, {
                                              variant: "contained",
                                              className: "image-button",
                                              component: "label",
                                              endIcon: (0, _t.jsx)(ft.Z, {}),
                                              children: [
                                                "Image",
                                                (0, _t.jsx)("input", {
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
                              : (0, _t.jsx)(o.ZP, {
                                  item: !0,
                                  xs: 12,
                                  md: 4,
                                  style: {
                                    paddingRight: "16px",
                                    paddingTop: "8px",
                                  },
                                  children: (0, _t.jsxs)(o.ZP, {
                                    container: !0,
                                    spacing: 2,
                                    columnSpacing: { xs: 1, sm: 2, md: 2 },
                                    className:
                                      "mob_responsive_purchase_input_table",
                                    children: [
                                      r.cgst_tax > 0
                                        ? (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 12,
                                            className: "pt-5",
                                            children: (0, _t.jsxs)(o.ZP, {
                                              container: !0,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              spacing: 2,
                                              className: "display_center",
                                              children: [
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 5,
                                                  md: 5,
                                                  className: "text-right pt-0",
                                                  children: (0, _t.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: "CGST Amount",
                                                    }
                                                  ),
                                                }),
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 7,
                                                  md: 7,
                                                  className: "pt-0",
                                                  children: (0, _t.jsx)(m.Z, {
                                                    label: "CGST",
                                                    variant: "outlined",
                                                    fullWidth: !0,
                                                    value: r.cgst_tax,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      _t.jsx)(g.Z, {
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
                                          })
                                        : null,
                                      r.sgst_tax > 0
                                        ? (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            md: 12,
                                            className: "pt-5",
                                            children: (0, _t.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 5,
                                                  md: 5,
                                                  className: "text-right pt-0",
                                                  children: (0, _t.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: "SGST Amount",
                                                    }
                                                  ),
                                                }),
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 7,
                                                  md: 7,
                                                  className: "pt-0",
                                                  children: (0, _t.jsx)(m.Z, {
                                                    fullWidth: !0,
                                                    value: r.sgst_tax,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      _t.jsx)(g.Z, {
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
                                          })
                                        : null,
                                      r.igst_tax > 0
                                        ? (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            style: { paddingTop: "0" },
                                            children: (0, _t.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 5,
                                                  md: 5,
                                                  className: "text-right pt-0",
                                                  children: (0, _t.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: "IGST Amount",
                                                    }
                                                  ),
                                                }),
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 7,
                                                  md: 7,
                                                  className: "pt-0",
                                                  children: (0, _t.jsx)(m.Z, {
                                                    className: "ft-amount",
                                                    fullWidth: !0,
                                                    value: r.igst_tax,
                                                    disabled: !0,
                                                    InputProps: {
                                                      startAdornment: (0,
                                                      _t.jsx)(g.Z, {
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
                                          })
                                        : null,
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: "Tax Amount",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(m.Z, {
                                                className: "ft-amount",
                                                fullWidth: !0,
                                                value: r.total_tax,
                                                disabled: !0,
                                                InputProps: {
                                                  startAdornment: (0, _t.jsx)(
                                                    g.Z,
                                                    {
                                                      position: "start",
                                                      children: "₹",
                                                    }
                                                  ),
                                                  className: "non_disable_text",
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: "Total Amount",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(m.Z, {
                                                className: "ft-amount",
                                                fullWidth: !0,
                                                value: r.total_amount,
                                                disabled: !0,
                                                InputProps: {
                                                  startAdornment: (0, _t.jsx)(
                                                    g.Z,
                                                    {
                                                      position: "start",
                                                      children: "₹",
                                                    }
                                                  ),
                                                  className: "non_disable_text",
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: " Cash Discount ",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(m.Z, {
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
                                                  startAdornment: (0, _t.jsx)(
                                                    g.Z,
                                                    {
                                                      position: "start",
                                                      children: "₹",
                                                    }
                                                  ),
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: " Total Payable ",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(m.Z, {
                                                className: "ft-amount",
                                                fullWidth: !0,
                                                value: r.total_payable,
                                                disabled: !0,
                                                InputProps: {
                                                  startAdornment: (0, _t.jsx)(
                                                    g.Z,
                                                    {
                                                      position: "start",
                                                      children: "₹",
                                                    }
                                                  ),
                                                  className: "non_disable_text",
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: " Payment Mode ",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(c.Z, {
                                                fullWidth: !0,
                                                className: "ft-amount",
                                                children: (0, _t.jsxs)(d.Z, {
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
                                                    (0, _t.jsx)(p.Z, {
                                                      value: "cash",
                                                      children: "Cash",
                                                    }),
                                                    (0, _t.jsx)(p.Z, {
                                                      value: "cheque",
                                                      children: "Cheque",
                                                    }),
                                                    (0, _t.jsx)(p.Z, {
                                                      value: "imps_neft",
                                                      children: "NEFT/IMPS/UPI",
                                                    }),
                                                    (0, _t.jsx)(p.Z, {
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
                                        ? (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, _t.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 5,
                                                  md: 5,
                                                  className: "text-right pt-0",
                                                  children: (0, _t.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children:
                                                        " Transaction No ",
                                                    }
                                                  ),
                                                }),
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 7,
                                                  md: 7,
                                                  className: "pt-0",
                                                  children: (0, _t.jsx)(m.Z, {
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
                                        ? (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            className: "pt-5",
                                            children: (0, _t.jsxs)(o.ZP, {
                                              container: !0,
                                              spacing: 2,
                                              columnSpacing: {
                                                xs: 1,
                                                sm: 2,
                                                md: 2,
                                              },
                                              className: "display_center",
                                              children: [
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 5,
                                                  md: 5,
                                                  className: "text-right pt-0",
                                                  children: (0, _t.jsx)(
                                                    "span",
                                                    {
                                                      className: "tax-text",
                                                      children: " Cheque No ",
                                                    }
                                                  ),
                                                }),
                                                (0, _t.jsx)(o.ZP, {
                                                  item: !0,
                                                  xs: 7,
                                                  md: 7,
                                                  className: "pt-0",
                                                  children: (0, _t.jsx)(m.Z, {
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
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: " Pay Now ",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(m.Z, {
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
                                                  startAdornment: (0, _t.jsx)(
                                                    g.Z,
                                                    {
                                                      position: "start",
                                                      children: "₹",
                                                    }
                                                  ),
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        className: "pt-5",
                                        children: (0, _t.jsxs)(o.ZP, {
                                          container: !0,
                                          spacing: 2,
                                          columnSpacing: {
                                            xs: 1,
                                            sm: 2,
                                            md: 2,
                                          },
                                          className: "display_center",
                                          children: [
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 5,
                                              md: 5,
                                              className: "text-right pt-0",
                                              children: (0, _t.jsx)("span", {
                                                className: "tax-text",
                                                children: "  Due Amount ",
                                              }),
                                            }),
                                            (0, _t.jsx)(o.ZP, {
                                              item: !0,
                                              xs: 7,
                                              md: 7,
                                              className: "pt-0",
                                              children: (0, _t.jsx)(m.Z, {
                                                className: "ft-amount",
                                                fullWidth: !0,
                                                value: r.due_amount,
                                                disabled: !0,
                                                InputProps: {
                                                  startAdornment: (0, _t.jsx)(
                                                    g.Z,
                                                    {
                                                      position: "start",
                                                      children: "₹",
                                                    }
                                                  ),
                                                  className: "non_disable_text",
                                                },
                                              }),
                                            }),
                                          ],
                                        }),
                                      }),
                                      parseFloat(r.due_amount) > 0
                                        ? (0, _t.jsxs)(_t.Fragment, {
                                            children: [
                                              (0, _t.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                className:
                                                  "p-invoice-date create-input pt-5",
                                                children: (0, _t.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  className: "display_center",
                                                  children: [
                                                    (0, _t.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 5,
                                                      md: 5,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, _t.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            " Due Date ",
                                                        }
                                                      ),
                                                    }),
                                                    (0, _t.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 7,
                                                      md: 7,
                                                      className: "pt-0",
                                                      children: (0, _t.jsx)(
                                                        Y._,
                                                        {
                                                          dateAdapter: I.y,
                                                          children: (0, _t.jsx)(
                                                            z.M,
                                                            {
                                                              value: r.due_date,
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
                                                                  _t.jsx)(
                                                                    m.Z,
                                                                    Pt(
                                                                      Pt(
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
                                                            }
                                                          ),
                                                        }
                                                      ),
                                                    }),
                                                  ],
                                                }),
                                              }),
                                              (0, _t.jsx)(o.ZP, {
                                                item: !0,
                                                xs: 12,
                                                className:
                                                  "p-invoice-date create-input pt-5",
                                                children: (0, _t.jsxs)(o.ZP, {
                                                  container: !0,
                                                  spacing: 2,
                                                  columnSpacing: {
                                                    xs: 1,
                                                    sm: 2,
                                                    md: 2,
                                                  },
                                                  className: "display_center",
                                                  children: [
                                                    (0, _t.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 5,
                                                      md: 5,
                                                      className:
                                                        "text-right pt-0",
                                                      children: (0, _t.jsx)(
                                                        "span",
                                                        {
                                                          className: "tax-text",
                                                          children:
                                                            " Settlement Date ",
                                                        }
                                                      ),
                                                    }),
                                                    (0, _t.jsx)(o.ZP, {
                                                      item: !0,
                                                      xs: 7,
                                                      md: 7,
                                                      className: "pt-0",
                                                      children: (0, _t.jsx)(
                                                        Y._,
                                                        {
                                                          dateAdapter: I.y,
                                                          children: (0, _t.jsx)(
                                                            z.M,
                                                            {
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
                                                                  _t.jsx)(
                                                                    m.Z,
                                                                    Pt(
                                                                      Pt(
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
                                                            }
                                                          ),
                                                        }
                                                      ),
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
                            (0, _t.jsx)(o.ZP, {
                              item: !0,
                              xs: (this.state.isAssign, 12),
                              md: this.state.isAssign ? 4 : 12,
                              children: (0, _t.jsxs)(x.Z, {
                                spacing: 1,
                                direction: "row",
                                className: "ratn-footer-buttons",
                                justifyContent: "flex-end",
                                style: {
                                  paddingRight: "16px",
                                  paddingBottom: "16px",
                                },
                                children: [
                                  !(0, v.xb)(
                                    this.props.query.get("sale_on_approval")
                                  ) ||
                                  this.state.order_id ||
                                  this.state.isAssign
                                    ? null
                                    : (0, _t.jsx)(C.Z, {
                                        className: "conf-button",
                                        variant: "contained",
                                        type: "button",
                                        loading: w,
                                        disabled: w,
                                        onClick: function () {
                                          return e.handleSubmit(!0);
                                        },
                                        children: "Sale On Approval",
                                      }),
                                  (0, _t.jsx)(C.Z, {
                                    className: "conf-button",
                                    variant: "contained",
                                    type: "button",
                                    loading: w,
                                    disabled: w,
                                    onClick: function () {
                                      return e.handleSubmit(!1);
                                    },
                                    children: "Submit",
                                  }),
                                  w
                                    ? null
                                    : (0, _t.jsx)(u.Z, {
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
                        (0, _t.jsxs)(D.Z, {
                          open: this.state.productDialog,
                          onClose: this.handleProductDialogClose,
                          fullWidth: !0,
                          maxWidth: "lg",
                          className: "ratn-dialog-wrapper",
                          children: [
                            (0, _t.jsx)(M.Z, { children: "Add Product" }),
                            (0, _t.jsxs)(E.Z, {
                              children: [
                                (0, _t.jsx)(V.Z, {}),
                                (0, _t.jsx)(i.Z, {
                                  sx: { flexGrow: 1, m: 0.5 },
                                  children: (0, _t.jsxs)(o.ZP, {
                                    container: !0,
                                    spacing: 2,
                                    columnSpacing: { xs: 1, sm: 2, md: 2 },
                                    children: [
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 3,
                                        children: (0, _t.jsxs)(c.Z, {
                                          fullWidth: !0,
                                          error: Z.category_id,
                                          children: [
                                            (0, _t.jsx)(l.Z, {
                                              children: "Category",
                                            }),
                                            (0, _t.jsxs)(d.Z, {
                                              value: b.category_id,
                                              label: "Category",
                                              onChange:
                                                this.handleCategoryChange,
                                              defaultValue: "",
                                              children: [
                                                (0, _t.jsx)(p.Z, { value: "" }),
                                                this.state.categoryList.map(
                                                  function (t, e) {
                                                    return (0, _t.jsx)(
                                                      p.Z,
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
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 3,
                                        children: (0, _t.jsxs)(c.Z, {
                                          fullWidth: !0,
                                          error: Z.sub_category_id,
                                          children: [
                                            (0, _t.jsx)(l.Z, {
                                              children: "Sub Category",
                                            }),
                                            (0, _t.jsxs)(d.Z, {
                                              value: b.sub_category_id,
                                              label: "Sub Category",
                                              onChange:
                                                this.handleSubCategoryChange,
                                              defaultValue: "",
                                              children: [
                                                (0, _t.jsx)(p.Z, { value: "" }),
                                                this.state.subCategoryList.map(
                                                  function (t, e) {
                                                    return (0, _t.jsx)(
                                                      p.Z,
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
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        md: 6,
                                        children: (0, _t.jsxs)(c.Z, {
                                          fullWidth: !0,
                                          error: Z.product_id,
                                          children: [
                                            (0, _t.jsx)(l.Z, {
                                              children: "Product",
                                            }),
                                            (0, _t.jsxs)(d.Z, {
                                              value: b.product_id,
                                              label: "Product",
                                              onChange:
                                                this.handleProductChange,
                                              defaultValue: "",
                                              children: [
                                                (0, _t.jsx)(p.Z, { value: "" }),
                                                this.state.stockProductList.map(
                                                  function (t, e) {
                                                    return (0, _t.jsx)(
                                                      p.Z,
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
                                      "material" != b.product_type
                                        ? (0, _t.jsx)(_t.Fragment, {})
                                        : null,
                                      this.state.stockProductDetails.length &&
                                      b.product_id
                                        ? (0, _t.jsxs)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            children: [
                                              (0, _t.jsx)(c.Z, {
                                                fullWidth: !0,
                                                children: (0, _t.jsx)(_.Z, {
                                                  name: "stock_id",
                                                  value: b.stock_id,
                                                  onChange:
                                                    this
                                                      .handleProductFormStockChange,
                                                  children:
                                                    this.checkIfAllStockAdded()
                                                      ? null
                                                      : (0, _t.jsx)(B.Z, {
                                                          component: G.Z,
                                                          children: (0,
                                                          _t.jsxs)(q.Z, {
                                                            children: [
                                                              (0, _t.jsx)(W.Z, {
                                                                children: (0,
                                                                _t.jsxs)(R.Z, {
                                                                  children: [
                                                                    (0, _t.jsx)(
                                                                      X.Z,
                                                                      {
                                                                        children:
                                                                          "Size Name",
                                                                      }
                                                                    ),
                                                                    (0, _t.jsx)(
                                                                      X.Z,
                                                                      {
                                                                        children:
                                                                          "Material Name",
                                                                      }
                                                                    ),
                                                                    (0, _t.jsx)(
                                                                      X.Z,
                                                                      {
                                                                        children:
                                                                          "Purity",
                                                                      }
                                                                    ),
                                                                    (0, _t.jsx)(
                                                                      X.Z,
                                                                      {
                                                                        children:
                                                                          "Weight",
                                                                      }
                                                                    ),
                                                                    (0, _t.jsx)(
                                                                      X.Z,
                                                                      {
                                                                        children:
                                                                          "Unit",
                                                                      }
                                                                    ),
                                                                    (0, _t.jsx)(
                                                                      X.Z,
                                                                      {
                                                                        children:
                                                                          "Quantity",
                                                                      }
                                                                    ),
                                                                  ],
                                                                }),
                                                              }),
                                                              (0, _t.jsx)(T.Z, {
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
                                                                          _t.jsxs)(
                                                                            a.Fragment,
                                                                            {
                                                                              children:
                                                                                [
                                                                                  (0,
                                                                                  _t.jsx)(
                                                                                    R.Z,
                                                                                    {
                                                                                      children:
                                                                                        (0,
                                                                                        _t.jsxs)(
                                                                                          X.Z,
                                                                                          {
                                                                                            rowSpan:
                                                                                              t
                                                                                                .materials
                                                                                                .length +
                                                                                              1,
                                                                                            children:
                                                                                              [
                                                                                                (0,
                                                                                                _t.jsx)(
                                                                                                  y.Z,
                                                                                                  {
                                                                                                    value:
                                                                                                      t.stock_id,
                                                                                                    control:
                                                                                                      (0,
                                                                                                      _t.jsx)(
                                                                                                        j.Z,
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
                                                                                      _t.jsx)(
                                                                                        a.Fragment,
                                                                                        {
                                                                                          children:
                                                                                            (0,
                                                                                            _t.jsxs)(
                                                                                              R.Z,
                                                                                              {
                                                                                                children:
                                                                                                  [
                                                                                                    (0,
                                                                                                    _t.jsx)(
                                                                                                      X.Z,
                                                                                                      {
                                                                                                        children:
                                                                                                          t.material_name,
                                                                                                      }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    _t.jsx)(
                                                                                                      X.Z,
                                                                                                      {
                                                                                                        children:
                                                                                                          t.purity,
                                                                                                      }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    _t.jsx)(
                                                                                                      X.Z,
                                                                                                      {
                                                                                                        children:
                                                                                                          (0,
                                                                                                          v.um)(
                                                                                                            t.weight,
                                                                                                            !0
                                                                                                          ),
                                                                                                      }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    _t.jsx)(
                                                                                                      X.Z,
                                                                                                      {
                                                                                                        children:
                                                                                                          t.unit_name,
                                                                                                      }
                                                                                                    ),
                                                                                                    (0,
                                                                                                    _t.jsx)(
                                                                                                      X.Z,
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
                                                          }),
                                                        }),
                                                }),
                                              }),
                                              (0, _t.jsx)(c.Z, {
                                                fullWidth: !0,
                                                children:
                                                  this.checkIfAllStockAdded()
                                                    ? (0, _t.jsx)("h3", {
                                                        children:
                                                          "No Stock available",
                                                      })
                                                    : null,
                                              }),
                                            ],
                                          })
                                        : null,
                                      "material" == b.product_type
                                        ? (0, _t.jsx)(o.ZP, {
                                            item: !0,
                                            xs: 12,
                                            children: (0, _t.jsx)(B.Z, {
                                              component: G.Z,
                                              children: (0, _t.jsxs)(q.Z, {
                                                sx: { minWidth: 650 },
                                                "aria-label": "simple table",
                                                className:
                                                  "ratn-table-product-wrapper",
                                                children: [
                                                  (0, _t.jsx)(W.Z, {
                                                    className:
                                                      "ratn-table-header",
                                                    children: (0, _t.jsxs)(
                                                      R.Z,
                                                      {
                                                        className:
                                                          "pur-details-inner-table",
                                                        children: [
                                                          (0, _t.jsx)(X.Z, {
                                                            children:
                                                              "Material Name",
                                                          }),
                                                          (0, _t.jsx)(X.Z, {
                                                            children: "Purity",
                                                          }),
                                                          (0, _t.jsx)(X.Z, {
                                                            children:
                                                              "Quantity",
                                                          }),
                                                          (0, _t.jsx)(X.Z, {
                                                            children: "Weight",
                                                          }),
                                                        ],
                                                      }
                                                    ),
                                                  }),
                                                  (0, _t.jsx)(T.Z, {
                                                    className:
                                                      "pur-details-table-body",
                                                    children: b.materials.map(
                                                      function (t, n) {
                                                        return (0, _t.jsxs)(
                                                          R.Z,
                                                          {
                                                            children: [
                                                              (0, _t.jsx)(X.Z, {
                                                                children:
                                                                  t.material_name,
                                                              }),
                                                              (0, _t.jsx)(X.Z, {
                                                                children:
                                                                  t.purity,
                                                              }),
                                                              (0, _t.jsx)(X.Z, {
                                                                children: (0,
                                                                _t.jsx)(m.Z, {
                                                                  label:
                                                                    "Quantity",
                                                                  variant:
                                                                    "outlined",
                                                                  fullWidth: !0,
                                                                  value:
                                                                    t.quantity,
                                                                  onChange:
                                                                    function (
                                                                      t
                                                                    ) {
                                                                      return e.handleMaterialFormChange(
                                                                        t,
                                                                        n,
                                                                        "quantity"
                                                                      );
                                                                    },
                                                                  error:
                                                                    P[n]
                                                                      .quantity,
                                                                }),
                                                              }),
                                                              (0, _t.jsx)(X.Z, {
                                                                children: (0,
                                                                _t.jsx)(m.Z, {
                                                                  label:
                                                                    "Weight",
                                                                  variant:
                                                                    "outlined",
                                                                  fullWidth: !0,
                                                                  value:
                                                                    t.weight,
                                                                  onChange:
                                                                    function (
                                                                      t
                                                                    ) {
                                                                      return e.handleMaterialFormChange(
                                                                        t,
                                                                        n,
                                                                        "weight"
                                                                      );
                                                                    },
                                                                  InputProps: {
                                                                    endAdornment:
                                                                      (0,
                                                                      _t.jsx)(
                                                                        g.Z,
                                                                        {
                                                                          position:
                                                                            "start",
                                                                          children:
                                                                            t.unit_name,
                                                                        }
                                                                      ),
                                                                  },
                                                                  error:
                                                                    P[n].weight,
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
                                      (0, _t.jsx)(o.ZP, {
                                        item: !0,
                                        xs: 12,
                                        children: (0, _t.jsxs)(x.Z, {
                                          spacing: 1,
                                          direction: "row",
                                          justifyContent: "flex-end",
                                          children: [
                                            (0, _t.jsx)(u.Z, {
                                              variant: "contained",
                                              type: "button",
                                              onClick: this.handleProductSubmit,
                                              children: "Add Product",
                                            }),
                                            (0, _t.jsx)(u.Z, {
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
                        (0, _t.jsxs)(D.Z, {
                          open: this.state.deleteDialogOpen,
                          onClose: this.handleDialogClose,
                          fullWidth: !0,
                          maxWidth: "xs",
                          className: "ratn-dialog-wrapper",
                          children: [
                            (0, _t.jsx)(M.Z, { children: "Delete" }),
                            (0, _t.jsx)(E.Z, {
                              children: (0, _t.jsx)(V.Z, {
                                id: "alert-dialog-slide-description",
                                children:
                                  "Are you sure want to delete this record?",
                              }),
                            }),
                            (0, _t.jsx)(O.Z, {
                              children: (0, _t.jsxs)(x.Z, {
                                spacing: 2,
                                direction: "row",
                                justifyContent: "flex-end",
                                children: [
                                  (0, _t.jsx)(u.Z, {
                                    variant: "outlined",
                                    onClick: this.handleDialogClose,
                                    children: "Cancel",
                                  }),
                                  (0, _t.jsx)(u.Z, {
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
                      ],
                    })
                  );
                },
              },
            ]) && Nt(e.prototype, n),
            r && Nt(e, r),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            w
          );
        })(a.Component),
        Ot = (0, F.Z)(
          (0, L.RM)(
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
                };
              },
              function (t) {
                return {
                  dispatch: t,
                  actions: (0, b.bindActionCreators)(
                    {
                      salesStore: Z.rr,
                      salesUpdate: Z.LR,
                      adminList: k.N0,
                      productList: N.Uu,
                      materialPriceProductPriceInfo: w.zZ,
                      stocksProducDetails: P.i7,
                      stocksProductList: P.Db,
                      categoryList: et.wA,
                      subCategoryList: tt.NM,
                      orderView: rt.Id,
                      cartList: lt.bA,
                      retailerList: dt.Ad,
                      distributorList: pt.zP,
                      salesExecutiveList: mt.cT,
                    },
                    t
                  ),
                };
              }
            )((0, s.sx)({ form: "SaleForm" })(Dt))
          )
        );
      function Et(t) {
        return (
          (Et =
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
          Et(t)
        );
      }
      function Vt(t, e) {
        for (var n = 0; n < e.length; n++) {
          var a = e[n];
          (a.enumerable = a.enumerable || !1),
            (a.configurable = !0),
            "value" in a && (a.writable = !0),
            Object.defineProperty(t, a.key, a);
        }
      }
      function Mt(t, e) {
        return (
          (Mt = Object.setPrototypeOf
            ? Object.setPrototypeOf.bind()
            : function (t, e) {
                return (t.__proto__ = e), t;
              }),
          Mt(t, e)
        );
      }
      function It(t, e) {
        if (e && ("object" === Et(e) || "function" == typeof e)) return e;
        if (void 0 !== e)
          throw new TypeError(
            "Derived constructors may only return object or undefined"
          );
        return (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t);
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
              e && Mt(t, e);
          })(i, t);
          var e,
            n,
            a,
            r,
            s =
              ((a = i),
              (r = (function () {
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
                  e = Yt(a);
                if (r) {
                  var n = Yt(this).constructor;
                  t = Reflect.construct(e, arguments, n);
                } else t = e.apply(this, arguments);
                return It(this, t);
              });
          function i(t) {
            var e;
            return (
              (function (t, e) {
                if (!(t instanceof e))
                  throw new TypeError("Cannot call a class as a function");
              })(this, i),
              ((e = s.call(this, t)).state = {}),
              e
            );
          }
          return (
            (e = i),
            (n = [
              { key: "componentDidMount", value: function () {} },
              {
                key: "render",
                value: function () {
                  return (0, _t.jsx)(A.Z, {
                    children: (0, _t.jsx)("div", {
                      children: (0, _t.jsx)(Ot, {
                        order_id: this.props.query.get("order_id"),
                      }),
                    }),
                  });
                },
              },
            ]) && Vt(e.prototype, n),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            i
          );
        })(a.Component),
        qt = (0, L.RM)(
          (0, F.Z)(
            (0, r.connect)(
              function (t) {
                return {};
              },
              function (t) {
                return { dispatch: t };
              }
            )(zt)
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
