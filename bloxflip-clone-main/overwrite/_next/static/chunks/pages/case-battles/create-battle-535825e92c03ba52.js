(function () {
    try {
      var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
      var t = new e.Error().stack;
      if (t) {
        e._sentryDebugIds = e._sentryDebugIds || {};
        e._sentryDebugIds[t] = "7314cbe1-bad0-4340-85e5-cd09bc4c7ae0";
        e._sentryDebugIdIdentifier = "sentry-dbid-7314cbe1-bad0-4340-85e5-cd09bc4c7ae0";
      }
    } catch (e) {}
  })();
  (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[2336], {
    37205: function (e, t, a) {
      (window.__NEXT_P = window.__NEXT_P || []).push(["/case-battles/create-battle", function () {
        return a(71247);
      }]);
    },
    71247: function (e, t, a) {
      "use strict";
  
      a.r(t);
      a.d(t, {
        default: function () {
          return CreateBattle;
        }
      });
      var s;
      var n;
      var l = a(85893);
      var r = a(67294);
      var i = a(2664);
      var d = a(49089);
      var c = a(11163);
      var o = a(4693);
      var u = a.n(o);
      var h = a(41664);
      var m = a.n(h);
      var C = a(93967);
      var g = a.n(C);
      var x = a(86501);
      var b = a(83198);
      var y = a(89755);
      var f = a.n(y);
      var p = a(2465);
      var v = a(62748);
      var j = a(2181);
      var T = a(62961);
      var w = a(39398);
      var Z = a(40400);
      var _ = a(56531);
      var N = a(66713);
      function _extends() {
        return (_extends = Object.assign ? Object.assign.bind() : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var s in a) {
              if ({}.hasOwnProperty.call(a, s)) {
                e[s] = a[s];
              }
            }
          }
          return e;
        }).apply(null, arguments);
      }
      function user(e) {
        return r.createElement("svg", _extends({
          width: 12,
          height: 13,
          xmlns: "http://www.w3.org/2000/svg"
        }, e), s ||= r.createElement("path", {
          d: "M6 .333a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM6 7.333c-2.782 0-4.818 1.863-5.373 4.335-.166.74.44 1.332 1.106 1.332h8.535c.666 0 1.272-.592 1.106-1.332C10.818 9.196 8.783 7.333 6 7.333Z"
        }));
      }
      function caret_left_extends() {
        return (caret_left_extends = Object.assign ? Object.assign.bind() : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var a = arguments[t];
            for (var s in a) {
              if ({}.hasOwnProperty.call(a, s)) {
                e[s] = a[s];
              }
            }
          }
          return e;
        }).apply(null, arguments);
      }
      function caret_left(e) {
        return r.createElement("svg", caret_left_extends({
          width: 7,
          height: 10,
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg"
        }, e), n ||= r.createElement("path", {
          d: "M1.046 5.588a.825.825 0 0 1 0-1.176l3.92-3.87a.844.844 0 0 1 1.183 0 .825.825 0 0 1 0 1.176L2.825 5 6.15 8.282a.825.825 0 0 1 0 1.176.844.844 0 0 1-1.184 0l-3.919-3.87Z",
          fill: "#474469",
          stroke: "#474469",
          strokeWidth: 0.4
        }));
      }
      var E = a(86554);
      var S = a(81654);
      var M = a(60916);
      var k = a(49922);
      var O = a(4595);
      var B = a(77579);
      var q = a(1773);
      var A = a(9396);
      var I = a(83865);
      var P = a.n(I);
      function CreateBattle() {
        let e = (0, c.useRouter)();
        let [t, a] = (0, r.useState)([]);
        let [s, n] = (0, r.useState)([]);
        let [o, h] = (0, r.useState)([]);
        let [C, y] = (0, r.useState)(0);
        let [f, k] = (0, r.useState)(0);
        let [A, I] = (0, r.useState)(false);
        let [G, R] = (0, r.useState)(false);
        let [H, D] = (0, r.useState)(false);
        let [L, W] = (0, r.useState)(false);
        let [z, F] = (0, r.useState)(false);
        let {
          fflags: V
        } = (0, i.v9)(e => e.auth);
        let {
          clone: X
        } = e.query;
        let Q = (0, i.I0)();
        let handleAddCase = e => {
          if (getTotalCases() >= 100) {
            x.ZP.error("Maximum total cases reached (100 cases)");
            return;
          }
          h(t => {
            let a = t.findIndex(t => {
              let {
                uuid: a,
                slug: s
              } = t;
              return e.uuid && a === e.uuid || e.slug && s === e.slug;
            });
            let s = [...t];
            if (a !== -1) {
              s[a].quantity++;
              x.ZP.success("Case Added - " + s[a].quantity);
            } else {
              s.push({
                ...e,
                quantity: 1
              });
              x.ZP.success("Case Added!");
            }
            return s;
          });
        };
        let handleRemoveCase = e => {
          h(t => {
            let a = t.findIndex(t => {
              let {
                uuid: a,
                slug: s
              } = t;
              return e.uuid && a === e.uuid || e.slug && s === e.slug;
            });
            let s = [...t];
            if (a !== -1) {
              if (s[a].quantity > 1) {
                s[a].quantity--;
              } else {
                s.splice(a, 1);
              }
            }
            return s;
          });
        };
        let handleClearCase = e => {
          h(t => {
            let a = t.findIndex(t => {
              let {
                uuid: a,
                slug: s
              } = t;
              return e.uuid && a === e.uuid || e.slug && s === e.slug;
            });
            let s = [...t];
            if (a !== -1) {
              s.splice(a, 1);
            }
            return s;
          });
        };
        (0, r.useEffect)(() => {
          Promise.all([(0, j.wLO)(), (0, j.nTd)()]).then(e => {
            a(e[0].map(e => ({
              ...e,
              quantity: 1
            })));
            n(e[1].map(e => ({
              ...e,
              quantity: 1
            })));
          });
        }, []);
        let getTotalCases = () => {
          let e = 0;
          o.forEach(t => {
            if (t.quantity) {
              e += t.quantity;
            } else {
              e++;
            }
          });
          return e;
        };
        (0, r.useEffect)(() => {
          if (!t.length) {
            return;
          }
          let fetchCloneData = async () => {
            let a = await (0, j.a4R)(X);
            let s = a[0].rounds.map(e => {
              let {
                itemCase: t
              } = e;
              return t;
            });
            let n = [];
            let l = Number(a[0].gameMode.match(/[0-9]+$/g) ?? 0) - 1;
            k(Math.max(l, 0));
            if (s != null) {
              s.forEach(e => {
                let a = n.findIndex(t => {
                  let {
                    slug: a
                  } = t;
                  return e.slug === a;
                });
                if (a === -1) {
                  let a = t.find(t => {
                    let {
                      slug: a
                    } = t;
                    return e.slug === a;
                  })?.price;
                  if (typeof a == "number") {
                    n.push({
                      ...e,
                      quantity: 1,
                      price: a
                    });
                  }
                } else {
                  n[a].quantity += 1;
                }
              });
            }
            h(n);
          };
          if (X) {
            fetchCloneData();
          }
        }, [X, t]);
        (0, r.useEffect)(() => {
          let e = 0;
          o.forEach(t => {
            let {
              price: a,
              quantity: s
            } = t;
            return e += a * s;
          });
          y(e);
        }, [o]);
        let handleCreateBattle = async () => {
            return alert("creating case battles is broken! creating single cases works fine")
        };
        (0, r.useEffect)(() => {
          if (L) {
            D(false);
            F(false);
          }
        }, [L]);
        return (0, l.jsxs)("section", {
          className: P().battlesCreate,
          "data-sentry-component": "CreateBattle",
          "data-sentry-source-file": "create-battle.tsx",
          children: [(0, l.jsxs)("div", {
            className: P().battlesCreateHeader,
            children: [(0, l.jsxs)(m(), {
              href: "/case-battles/",
              passHref: true,
              className: P().battlesCreateHeaderBack,
              "data-sentry-element": "Link",
              "data-sentry-source-file": "create-battle.tsx",
              children: [(0, l.jsx)(caret_left, {
                width: 7,
                height: 10,
                "data-sentry-element": "CaretLeftSvg",
                "data-sentry-source-file": "create-battle.tsx"
              }), (0, l.jsx)(B.Z, {
                element: "span",
                textType: "labelsRegular",
                "data-sentry-element": "Text",
                "data-sentry-source-file": "create-battle.tsx",
                children: "Go Back"
              })]
            }), (0, l.jsx)(B.Z, {
              element: "span",
              textType: "semibold16",
              className: P().battlesCreateHeaderTitle,
              "data-sentry-element": "Text",
              "data-sentry-source-file": "create-battle.tsx",
              children: "Create Case Battle"
            }), (0, l.jsxs)("div", {
              className: P().battlesCreateHeaderAmount,
              children: [(0, l.jsx)(N.Z, {
                "data-sentry-element": "CurrencyIcon",
                "data-sentry-source-file": "create-battle.tsx"
              }), (0, l.jsx)(B.Z, {
                element: "span",
                textType: "regular14",
                "data-sentry-element": "Text",
                "data-sentry-source-file": "create-battle.tsx",
                children: (0, w.Z)((0, Z.Z)(C))
              })]
            })]
          }), (0, l.jsxs)(p.ZP, {
            onSortEnd: (e, t) => {
              h(a => (0, v.q)(a, e, t));
            },
            className: P().battlesCreateCases,
            draggedItemClassName: "dragged",
            "data-sentry-element": "SortableList",
            "data-sentry-source-file": "create-battle.tsx",
            children: [o.map((e, t) => (0, l.jsx)(p.TR, {
              children: (0, l.jsx)("div", {
                children: (0, l.jsxs)(q.Z, {
                  noHover: true,
                  accentColor: e.color,
                  previewUrl: e.image,
                  className: P().battlesCreateCasesCase,
                  children: [(0, l.jsx)(q.Z.Title, {
                    children: e.displayName
                  }), (0, l.jsxs)(q.Z.Subtitle, {
                    children: [e.price, " ", (0, l.jsx)(N.Z, {})]
                  }), (0, l.jsxs)("div", {
                    className: P().battlesCreateCasesCaseCounter,
                    children: [(0, l.jsx)(u(), {
                      repeatDelay: 500,
                      repeatInterval: 32,
                      onPress: () => handleRemoveCase(e),
                      onHold: () => handleRemoveCase(e),
                      children: (0, l.jsx)(O.Z, {
                        className: P().battlesCreateCasesCaseCounterButton,
                        variant: "pagination",
                        children: (0, l.jsx)(E.Z, {
                          width: 10,
                          height: 2
                        })
                      })
                    }), (0, l.jsx)(B.Z, {
                      className: P().battlesCreateCasesCaseCounterText,
                      element: "span",
                      textType: "labelsRegular",
                      children: e.quantity
                    }), (0, l.jsx)(u(), {
                      repeatDelay: 500,
                      repeatInterval: 32,
                      onPress: () => handleAddCase(e),
                      onHold: () => handleAddCase(e),
                      children: (0, l.jsx)(O.Z, {
                        className: P().battlesCreateCasesCaseCounterButton,
                        variant: "pagination",
                        children: (0, l.jsx)(S.Z, {
                          width: 10,
                          height: 10
                        })
                      })
                    })]
                  }), (0, l.jsx)(q.Z.FixedRight, {
                    style: {
                      zIndex: "99"
                    },
                    children: (0, l.jsx)(O.Z, {
                      onClick: t => {
                        handleClearCase(e);
                        t.stopPropagation();
                      },
                      className: g()(P().createCaseManageButton, P().isTrash),
                      variant: "functional",
                      children: (0, l.jsx)(_.Z, {})
                    })
                  })]
                }, t)
              })
            }, e.displayName)), (0, l.jsx)(M.Z, {
              totalCost: C,
              allCases: t,
              allCommunityCases: s,
              selectedCases: o,
              handleAddCase: handleAddCase,
              handleRemoveCase: handleRemoveCase,
              handleClearCase: handleClearCase,
              handleClearAll: () => {
                h([]);
              },
              style: {
                height: "222px"
              },
              "data-sentry-element": "ModalChooseCase",
              "data-sentry-source-file": "create-battle.tsx"
            })]
          }), (0, l.jsxs)("div", {
            className: P().battlesCreateOptions,
            children: [(0, l.jsx)(GameModeToggle, {
              onChange: R,
              checked: G,
              title: "Quick Opening",
              description: "Open cases with faster animations",
              iconSrc: "/icons/quick-mode.svg",
              iconWidth: 23,
              iconHeight: 25,
              alt: "quick-mode",
              "data-sentry-element": "GameModeToggle",
              "data-sentry-source-file": "create-battle.tsx"
            }), (0, l.jsx)(GameModeToggle, {
              onChange: D,
              checked: H,
              title: "Crazy Mode",
              description: "Whoever pulls the lowest, wins!",
              iconSrc: "/icons/crazy-mode.svg",
              iconWidth: 34,
              iconHeight: 28,
              alt: "crazy-mode",
              disabled: L,
              "data-sentry-element": "GameModeToggle",
              "data-sentry-source-file": "create-battle.tsx"
            }), (0, l.jsx)(GameModeToggle, {
              onChange: W,
              checked: L,
              title: "Shared Mode",
              description: "Whoever wins split the prize value",
              iconSrc: "/icons/shared-mode.svg",
              iconWidth: 29,
              iconHeight: 24,
              alt: "shared-mode",
              "data-sentry-element": "GameModeToggle",
              "data-sentry-source-file": "create-battle.tsx"
            }), (0, l.jsx)(GameModeToggle, {
              onChange: F,
              checked: z,
              title: "Terminal Mode",
              description: "The highest pull on the final box win",
              iconSrc: "/icons/terminal-mode.svg",
              iconWidth: 24,
              iconHeight: 22,
              alt: "terminal-mode",
              disabled: L,
              "data-sentry-element": "GameModeToggle",
              "data-sentry-source-file": "create-battle.tsx"
            })]
          }), (0, l.jsxs)("div", {
            className: P().battlesCreateButtons,
            children: [(0, l.jsx)("div", {
              className: P().battlesCreateButtonsMode,
              children: ["2", "3", "4", ...(L ? [] : ["team"])].map((e, t) => (0, l.jsx)(O.Z, {
                variant: "tab",
                className: g()(P().battlesCreateButtonsModeSelect, t === f && P().isChosen),
                onClick: () => k(t),
                children: Array(e === "team" ? 4 : Number(e)).fill(null).map((a, s) => (0, l.jsxs)(l.Fragment, {
                  children: [(0, l.jsx)(user, {}), (e !== "team" && s <= t || e === "team" && s === 1) && (0, l.jsx)("span", {
                    children: L ? "+" : "v"
                  })]
                }))
              }, t))
            }), (0, l.jsx)(O.Z, {
              variant: "primary",
              disabled: A,
              onClick: handleCreateBattle,
              className: P().battlesCreateButtonsCreate,
              "data-sentry-element": "Button",
              "data-sentry-source-file": "create-battle.tsx",
              children: A ? "Creating..." : "Create Battle"
            })]
          })]
        });
      }
      let GameModeToggle = e => {
        let {
          onChange: t,
          checked: a,
          title: s,
          description: n,
          iconSrc: r,
          iconWidth: i,
          iconHeight: d,
          alt: c,
          disabled: o = false
        } = e;
        return (0, l.jsxs)("div", {
          className: P().battlesCreateOptionsElement,
          "data-sentry-component": "GameModeToggle",
          "data-sentry-source-file": "create-battle.tsx",
          children: [(0, l.jsx)(A.Z, {
            onChange: e => t(e.target.checked),
            checked: a,
            className: g()(P().battlesCreateOptionsElementSwitch, o && P().battlesCreateOptionsElementSwitchDisabled),
            disabled: o,
            "data-sentry-element": "Switcher",
            "data-sentry-source-file": "create-battle.tsx"
          }), (0, l.jsxs)("div", {
            className: P().battlesCreateOptionsElementText,
            children: [(0, l.jsx)(B.Z, {
              element: "span",
              textType: "semibold14",
              className: g()(P().battlesCreateOptionsElementTextTitle, o && P().battlesCreateOptionsElementTextTitleDisabled),
              "data-sentry-element": "Text",
              "data-sentry-source-file": "create-battle.tsx",
              children: s
            }), (0, l.jsx)(B.Z, {
              element: "span",
              textType: "labelsRegular",
              "data-sentry-element": "Text",
              "data-sentry-source-file": "create-battle.tsx",
              children: n
            })]
          }), (0, l.jsx)(f(), {
            src: r,
            width: i,
            height: d,
            alt: c,
            "data-sentry-element": "Image",
            "data-sentry-source-file": "create-battle.tsx"
          })]
        });
      };
      CreateBattle.getLayout = function (e) {
        return (0, l.jsx)(k.Z, {
          excludeGlobalStatistics: true,
          children: e
        });
      };
    }
  }, function (e) {
    e.O(0, [4885, 6542, 9758, 4918, 6510, 4307, 2122, 9774, 2888, 179], function () {
      return e(e.s = 37205);
    });
    _N_E = e.O();
  }]);