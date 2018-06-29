/**
 * skyrepertory
 * 针对于业务的模块库
 */
// ============================================main============================================
!function (window) {
    "use strict";
    var doc = window.document;
    var xnrep = {};
    xnrep.DEBUG = true;
    xnrep.bindId = function (id) {
        return doc.getElementById(id);
    }
    xnrep.bindClass = function (param) {
        return doc.getElementsByClassName(param);
    }
    xnrep.bindTag = function (tag) {
        return doc.getElementsByTagName(tag);
    }

    if (typeof define === 'function') {
        define(xnrep);
    } else {
        window.$sky = xnrep;
    }
}(window);
// ============================================third party=====================================
/*es6*/
!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.ES6Promise = e()
}(this, function () {
    "use strict";

    function t(t) {
        return "function" == typeof t || "object" == typeof t && null !== t
    }

    function e(t) {
        return "function" == typeof t
    }

    function n(t) {
        I = t
    }

    function r(t) {
        J = t
    }

    function o() {
        return function () {
            return process.nextTick(a)
        }
    }

    function i() {
        return "undefined" != typeof H ? function () {
            H(a)
        } : c()
    }

    function s() {
        var t = 0, e = new V(a), n = document.createTextNode("");
        return e.observe(n, {characterData: !0}), function () {
            n.data = t = ++t % 2
        }
    }

    function u() {
        var t = new MessageChannel;
        return t.port1.onmessage = a, function () {
            return t.port2.postMessage(0)
        }
    }

    function c() {
        var t = setTimeout;
        return function () {
            return t(a, 1)
        }
    }

    function a() {
        for (var t = 0; t < G; t += 2) {
            var e = $[t], n = $[t + 1];
            e(n), $[t] = void 0, $[t + 1] = void 0
        }
        G = 0
    }

    function f() {
        try {
            var t = require, e = t("vertx");
            return H = e.runOnLoop || e.runOnContext, i()
        } catch (n) {
            return c()
        }
    }

    function l(t, e) {
        var n = arguments, r = this, o = new this.constructor(p);
        void 0 === o[et] && k(o);
        var i = r._state;
        return i ? !function () {
            var t = n[i - 1];
            J(function () {
                return x(i, o, t, r._result)
            })
        }() : E(r, o, t, e), o
    }

    function h(t) {
        var e = this;
        if (t && "object" == typeof t && t.constructor === e) return t;
        var n = new e(p);
        return g(n, t), n
    }

    function p() {
    }

    function v() {
        return new TypeError("You cannot resolve a promise with itself")
    }

    function d() {
        return new TypeError("A promises callback cannot return that same promise.")
    }

    function _(t) {
        try {
            return t.then
        } catch (e) {
            return it.error = e, it
        }
    }

    function y(t, e, n, r) {
        try {
            t.call(e, n, r)
        } catch (o) {
            return o
        }
    }

    function m(t, e, n) {
        J(function (t) {
            var r = !1, o = y(n, e, function (n) {
                r || (r = !0, e !== n ? g(t, n) : S(t, n))
            }, function (e) {
                r || (r = !0, j(t, e))
            }, "Settle: " + (t._label || " unknown promise"));
            !r && o && (r = !0, j(t, o))
        }, t)
    }

    function b(t, e) {
        e._state === rt ? S(t, e._result) : e._state === ot ? j(t, e._result) : E(e, void 0, function (e) {
            return g(t, e)
        }, function (e) {
            return j(t, e)
        })
    }

    function w(t, n, r) {
        n.constructor === t.constructor && r === l && n.constructor.resolve === h ? b(t, n) : r === it ? (j(t, it.error), it.error = null) : void 0 === r ? S(t, n) : e(r) ? m(t, n, r) : S(t, n)
    }

    function g(e, n) {
        e === n ? j(e, v()) : t(n) ? w(e, n, _(n)) : S(e, n)
    }

    function A(t) {
        t._onerror && t._onerror(t._result), T(t)
    }

    function S(t, e) {
        t._state === nt && (t._result = e, t._state = rt, 0 !== t._subscribers.length && J(T, t))
    }

    function j(t, e) {
        t._state === nt && (t._state = ot, t._result = e, J(A, t))
    }

    function E(t, e, n, r) {
        var o = t._subscribers, i = o.length;
        t._onerror = null, o[i] = e, o[i + rt] = n, o[i + ot] = r, 0 === i && t._state && J(T, t)
    }

    function T(t) {
        var e = t._subscribers, n = t._state;
        if (0 !== e.length) {
            for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) r = e[s], o = e[s + n], r ? x(n, r, o, i) : o(i);
            t._subscribers.length = 0
        }
    }

    function M() {
        this.error = null
    }

    function P(t, e) {
        try {
            return t(e)
        } catch (n) {
            return st.error = n, st
        }
    }

    function x(t, n, r, o) {
        var i = e(r), s = void 0, u = void 0, c = void 0, a = void 0;
        if (i) {
            if (s = P(r, o), s === st ? (a = !0, u = s.error, s.error = null) : c = !0, n === s) return void j(n, d())
        } else s = o, c = !0;
        n._state !== nt || (i && c ? g(n, s) : a ? j(n, u) : t === rt ? S(n, s) : t === ot && j(n, s))
    }

    function C(t, e) {
        try {
            e(function (e) {
                g(t, e)
            }, function (e) {
                j(t, e)
            })
        } catch (n) {
            j(t, n)
        }
    }

    function O() {
        return ut++
    }

    function k(t) {
        t[et] = ut++, t._state = void 0, t._result = void 0, t._subscribers = []
    }

    function Y(t, e) {
        this._instanceConstructor = t, this.promise = new t(p), this.promise[et] || k(this.promise), B(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && S(this.promise, this._result))) : j(this.promise, q())
    }

    function q() {
        return new Error("Array Methods must be provided an Array")
    }

    function F(t) {
        return new Y(this, t).promise
    }

    function D(t) {
        var e = this;
        return new e(B(t) ? function (n, r) {
            for (var o = t.length, i = 0; i < o; i++) e.resolve(t[i]).then(n, r)
        } : function (t, e) {
            return e(new TypeError("You must pass an array to race."))
        })
    }

    function K(t) {
        var e = this, n = new e(p);
        return j(n, t), n
    }

    function L() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }

    function N() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }

    function U(t) {
        this[et] = O(), this._result = this._state = void 0, this._subscribers = [], p !== t && ("function" != typeof t && L(), this instanceof U ? C(this, t) : N())
    }

    function W() {
        var t = void 0;
        if ("undefined" != typeof global) t = global; else if ("undefined" != typeof self) t = self; else try {
            t = Function("return this")()
        } catch (e) {
            throw new Error("polyfill failed because global object is unavailable in this environment")
        }
        var n = t.Promise;
        if (n) {
            var r = null;
            try {
                r = Object.prototype.toString.call(n.resolve())
            } catch (e) {
            }
            if ("[object Promise]" === r && !n.cast) return
        }
        t.Promise = U
    }

    var z = void 0;
    z = Array.isArray ? Array.isArray : function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };
    var B = z, G = 0, H = void 0, I = void 0, J = function (t, e) {
            $[G] = t, $[G + 1] = e, G += 2, 2 === G && (I ? I(a) : tt())
        }, Q = "undefined" != typeof window ? window : void 0, R = Q || {},
        V = R.MutationObserver || R.WebKitMutationObserver,
        X = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
        Z = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
        $ = new Array(1e3), tt = void 0;
    tt = X ? o() : V ? s() : Z ? u() : void 0 === Q && "function" == typeof require ? f() : c();
    var et = Math.random().toString(36).substring(16), nt = void 0, rt = 1, ot = 2, it = new M,
        st = new M, ut = 0;
    return Y.prototype._enumerate = function () {
        for (var t = this.length, e = this._input, n = 0; this._state === nt && n < t; n++) this._eachEntry(e[n], n)
    }, Y.prototype._eachEntry = function (t, e) {
        var n = this._instanceConstructor, r = n.resolve;
        if (r === h) {
            var o = _(t);
            if (o === l && t._state !== nt) this._settledAt(t._state, e, t._result); else if ("function" != typeof o) this._remaining--, this._result[e] = t; else if (n === U) {
                var i = new n(p);
                w(i, t, o), this._willSettleAt(i, e)
            } else this._willSettleAt(new n(function (e) {
                return e(t)
            }), e)
        } else this._willSettleAt(r(t), e)
    }, Y.prototype._settledAt = function (t, e, n) {
        var r = this.promise;
        r._state === nt && (this._remaining--, t === ot ? j(r, n) : this._result[e] = n), 0 === this._remaining && S(r, this._result)
    }, Y.prototype._willSettleAt = function (t, e) {
        var n = this;
        E(t, void 0, function (t) {
            return n._settledAt(rt, e, t)
        }, function (t) {
            return n._settledAt(ot, e, t)
        })
    }, U.all = F, U.race = D, U.resolve = h, U.reject = K, U._setScheduler = n, U._setAsap = r, U._asap = J, U.prototype = {
        constructor: U,
        then: l,
        "catch": function (t) {
            return this.then(null, t)
        }
    }, U.polyfill = W, U.Promise = U, U
});
/*! art-template@4.12.1 for browser */
!function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.template = t() : e.template = t()
}(this, function () {
    return function (e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var i = n[r] = {i: r, l: !1, exports: {}};
            return e[r].call(i.exports, i, i.exports, t), i.l = !0, i.exports
        }

        var n = {};
        return t.m = e, t.c = n, t.d = function (e, n, r) {
            t.o(e, n) || Object.defineProperty(e, n, {configurable: !1, enumerable: !0, get: r})
        }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
                return e["default"]
            } : function () {
                return e
            };
            return t.d(n, "a", n), n
        }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t)
        }, t.p = "", t(t.s = 6)
    }([function (e, t, n) {
        (function (t) {
            e.exports = !1;
            try {
                e.exports = "[object process]" === Object.prototype.toString.call(t.process)
            } catch (n) {
            }
        }).call(t, n(4))
    }, function (e, t, n) {
        "use strict";
        var r = n(8), i = n(3), o = n(23), s = function (e, t) {
            t.onerror(e, t);
            var n = function () {
                return "{Template Error}"
            };
            return n.mappings = [], n.sourcesContent = [], n
        }, a = function c(e) {
            var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            "string" != typeof e ? t = e : t.source = e, t = i.$extend(t), e = t.source, !0 === t.debug && (t.cache = !1, t.minimize = !1, t.compileDebug = !0), t.compileDebug && (t.minimize = !1), t.filename && (t.filename = t.resolveFilename(t.filename, t));
            var n = t.filename, a = t.cache, u = t.caches;
            if (a && n) {
                var p = u.get(n);
                if (p) return p
            }
            if (!e) try {
                e = t.loader(n, t), t.source = e
            } catch (d) {
                var l = new o({
                    name: "CompileError",
                    path: n,
                    message: "template not found: " + d.message,
                    stack: d.stack
                });
                if (t.bail) throw l;
                return s(l, t)
            }
            var f = void 0, h = new r(t);
            try {
                f = h.build()
            } catch (l) {
                if (l = new o(l), t.bail) throw l;
                return s(l, t)
            }
            var m = function (e, n) {
                try {
                    return f(e, n)
                } catch (l) {
                    if (!t.compileDebug) return t.cache = !1, t.compileDebug = !0, c(t)(e, n);
                    if (l = new o(l), t.bail) throw l;
                    return s(l, t)()
                }
            };
            return m.mappings = f.mappings, m.sourcesContent = f.sourcesContent, m.toString = function () {
                return f.toString()
            }, a && n && u.set(n, m), m
        };
        a.Compiler = r, e.exports = a
    }, function (e, t) {
        Object.defineProperty(t, "__esModule", {value: !0}), t["default"] = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyu]{1,5}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, t.matchToToken = function (e) {
            var t = {type: "invalid", value: e[0]};
            return e[1] ? (t.type = "string", t.closed = !(!e[3] && !e[4])) : e[5] ? t.type = "comment" : e[6] ? (t.type = "comment", t.closed = !!e[7]) : e[8] ? t.type = "regex" : e[9] ? t.type = "number" : e[10] ? t.type = "name" : e[11] ? t.type = "punctuator" : e[12] && (t.type = "whitespace"), t
        }
    }, function (e, t, n) {
        "use strict";

        function r() {
            this.$extend = function (e) {
                return e = e || {}, s(e, e instanceof r ? e : this)
            }
        }

        var i = n(0), o = n(12), s = n(13), a = n(14), c = n(15), u = n(16), p = n(17), l = n(18),
            f = n(19), h = n(20), m = n(22), d = {
                source: null,
                filename: null,
                rules: [f, l],
                escape: !0,
                debug: !!i && "production" !== process.env.NODE_ENV,
                bail: !0,
                cache: !0,
                minimize: !0,
                compileDebug: !1,
                resolveFilename: m,
                include: a,
                htmlMinifier: h,
                htmlMinifierOptions: {
                    collapseWhitespace: !0,
                    minifyCSS: !0,
                    minifyJS: !0,
                    ignoreCustomFragments: []
                },
                onerror: c,
                loader: p,
                caches: u,
                root: "/",
                extname: ".art",
                ignore: [],
                imports: o
            };
        r.prototype = d, e.exports = new r
    }, function (e, t) {
        var n;
        n = function () {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (r) {
            "object" == typeof window && (n = window)
        }
        e.exports = n
    }, function (e, t) {
    }, function (e, t, n) {
        "use strict";
        var r = n(7), i = n(1), o = n(24), s = function (e, t) {
            return t instanceof Object ? r({filename: e}, t) : i({filename: e, source: t})
        };
        s.render = r, s.compile = i, s.defaults = o, e.exports = s
    }, function (e, t, n) {
        "use strict";
        var r = n(1), i = function (e, t, n) {
            return r(e, n)(t)
        };
        e.exports = i
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        var i = n(9), o = n(11), s = "$data", a = "$imports", c = "print", u = "include",
            p = "extend", l = "block", f = "$$out", h = "$$line", m = "$$blocks", d = "$$slice",
            v = "$$from", g = "$$options", y = function (e, t) {
                return e.hasOwnProperty(t)
            }, b = JSON.stringify, x = function () {
                function e(t) {
                    var n, i, y = this;
                    r(this, e);
                    var b = t.source, x = t.minimize, w = t.htmlMinifier;
                    if (this.options = t, this.stacks = [], this.context = [], this.scripts = [], this.CONTEXT_MAP = {}, this.ignore = [s, a, g].concat(t.ignore), this.internal = (n = {}, n[f] = "''", n[h] = "[0,0]", n[m] = "arguments[1]||{}", n[v] = "null", n[c] = "function(){var s=''.concat.apply('',arguments);" + f + "+=s;return s}", n[u] = "function(src,data){var s=" + g + ".include(src,data||" + s + ",arguments[2]||" + m + "," + g + ");" + f + "+=s;return s}", n[p] = "function(from){" + v + "=from}", n[d] = "function(c,p,s){p=" + f + ";" + f + "='';c();s=" + f + ";" + f + "=p+s;return s}", n[l] = "function(){var a=arguments,s;if(typeof a[0]==='function'){return " + d + "(a[0])}else if(" + v + "){" + m + "[a[0]]=" + d + "(a[1])}else{s=" + m + "[a[0]];if(typeof s==='string'){" + f + "+=s}else{s=" + d + "(a[1])}return s}}", n), this.dependencies = (i = {}, i[c] = [f], i[u] = [f, g, s, m], i[p] = [v, u], i[l] = [d, v, f, m], i), this.importContext(f), t.compileDebug && this.importContext(h), x) try {
                        b = w(b, t)
                    } catch (E) {
                    }
                    this.source = b, this.getTplTokens(b, t.rules, this).forEach(function (e) {
                        e.type === o.TYPE_STRING ? y.parseString(e) : y.parseExpression(e)
                    })
                }

                return e.prototype.getTplTokens = function () {
                    return o.apply(undefined, arguments)
                }, e.prototype.getEsTokens = function (e) {
                    return i(e)
                }, e.prototype.getVariables = function (e) {
                    var t = !1;
                    return e.filter(function (e) {
                        return "whitespace" !== e.type && "comment" !== e.type
                    }).filter(function (e) {
                        return "name" === e.type && !t || (t = "punctuator" === e.type && "." === e.value, !1)
                    }).map(function (e) {
                        return e.value
                    })
                }, e.prototype.importContext = function (e) {
                    var t = this, n = "", r = this.internal, i = this.dependencies, o = this.ignore,
                        c = this.context, u = this.options, p = u.imports, l = this.CONTEXT_MAP;
                    y(l, e) || -1 !== o.indexOf(e) || (y(r, e) ? (n = r[e], y(i, e) && i[e].forEach(function (e) {
                        return t.importContext(e)
                    })) : n = "$escape" === e || "$each" === e || y(p, e) ? a + "." + e : s + "." + e, l[e] = n, c.push({
                        name: e,
                        value: n
                    }))
                }, e.prototype.parseString = function (e) {
                    var t = e.value;
                    if (t) {
                        var n = f + "+=" + b(t);
                        this.scripts.push({source: t, tplToken: e, code: n})
                    }
                }, e.prototype.parseExpression = function (e) {
                    var t = this, n = e.value, r = e.script, i = r.output, s = this.options.escape,
                        a = r.code;
                    i && (a = !1 === s || i === o.TYPE_RAW ? f + "+=" + r.code : f + "+=$escape(" + r.code + ")");
                    var c = this.getEsTokens(a);
                    this.getVariables(c).forEach(function (e) {
                        return t.importContext(e)
                    }), this.scripts.push({source: n, tplToken: e, code: a})
                }, e.prototype.checkExpression = function (e) {
                    for (var t = [[/^\s*}[\w\W]*?{?[\s;]*$/, ""], [/(^[\w\W]*?\([\w\W]*?(?:=>|\([\w\W]*?\))\s*{[\s;]*$)/, "$1})"], [/(^[\w\W]*?\([\w\W]*?\)\s*{[\s;]*$)/, "$1}"]], n = 0; n < t.length;) {
                        if (t[n][0].test(e)) {
                            var r;
                            e = (r = e).replace.apply(r, t[n]);
                            break
                        }
                        n++
                    }
                    try {
                        return new Function(e), !0
                    } catch (i) {
                        return !1
                    }
                }, e.prototype.build = function () {
                    var e = this.options, t = this.context, n = this.scripts, r = this.stacks,
                        i = this.source, c = e.filename, l = e.imports, d = [],
                        x = y(this.CONTEXT_MAP, p), w = 0, E = function (e, t) {
                            var n = t.line, i = t.start, o = {
                                generated: {line: r.length + w + 1, column: 1},
                                original: {line: n + 1, column: i + 1}
                            };
                            return w += e.split(/\n/).length - 1, o
                        }, k = function (e) {
                            return e.replace(/^[\t ]+|[\t ]$/g, "")
                        };
                    r.push("function(" + s + "){"), r.push("'use strict'"), r.push(s + "=" + s + "||{}"), r.push("var " + t.map(function (e) {
                        return e.name + "=" + e.value
                    }).join(",")), e.compileDebug ? (r.push("try{"), n.forEach(function (e) {
                        e.tplToken.type === o.TYPE_EXPRESSION && r.push(h + "=[" + [e.tplToken.line, e.tplToken.start].join(",") + "]"), d.push(E(e.code, e.tplToken)), r.push(k(e.code))
                    }), r.push("}catch(error){"), r.push("throw {" + ["name:'RuntimeError'", "path:" + b(c), "message:error.message", "line:" + h + "[0]+1", "column:" + h + "[1]+1", "source:" + b(i), "stack:error.stack"].join(",") + "}"), r.push("}")) : n.forEach(function (e) {
                        d.push(E(e.code, e.tplToken)), r.push(k(e.code))
                    }), x && (r.push(f + "=''"), r.push(u + "(" + v + "," + s + "," + m + ")")), r.push("return " + f), r.push("}");
                    var T = r.join("\n");
                    try {
                        var O = new Function(a, g, "return " + T)(l, e);
                        return O.mappings = d, O.sourcesContent = [i], O
                    } catch (F) {
                        for (var $ = 0, j = 0, S = 0, _ = void 0; $ < n.length;) {
                            var C = n[$];
                            if (!this.checkExpression(C.code)) {
                                j = C.tplToken.line, S = C.tplToken.start, _ = C.code;
                                break
                            }
                            $++
                        }
                        throw{
                            name: "CompileError",
                            path: c,
                            message: F.message,
                            line: j + 1,
                            column: S + 1,
                            source: i,
                            generated: _,
                            stack: F.stack
                        }
                    }
                }, e
            }();
        x.CONSTS = {
            DATA: s,
            IMPORTS: a,
            PRINT: c,
            INCLUDE: u,
            EXTEND: p,
            BLOCK: l,
            OPTIONS: g,
            OUT: f,
            LINE: h,
            BLOCKS: m,
            SLICE: d,
            FROM: v,
            ESCAPE: "$escape",
            EACH: "$each"
        }, e.exports = x
    }, function (e, t, n) {
        "use strict";
        var r = n(10), i = n(2)["default"], o = n(2).matchToToken, s = function (e) {
            return e.match(i).map(function (e) {
                return i.lastIndex = 0, o(i.exec(e))
            }).map(function (e) {
                return "name" === e.type && r(e.value) && (e.type = "keyword"), e
            })
        };
        e.exports = s
    }, function (e, t, n) {
        "use strict";
        var r = {
            "abstract": !0,
            await: !0,
            "boolean": !0,
            "break": !0,
            "byte": !0,
            "case": !0,
            "catch": !0,
            "char": !0,
            "class": !0,
            "const": !0,
            "continue": !0,
            "debugger": !0,
            "default": !0,
            "delete": !0,
            "do": !0,
            "double": !0,
            "else": !0,
            "enum": !0,
            "export": !0,
            "extends": !0,
            "false": !0,
            "final": !0,
            "finally": !0,
            "float": !0,
            "for": !0,
            "function": !0,
            "goto": !0,
            "if": !0,
            "implements": !0,
            "import": !0,
            "in": !0,
            "instanceof": !0,
            "int": !0,
            "interface": !0,
            "let": !0,
            "long": !0,
            "native": !0,
            "new": !0,
            "null": !0,
            "package": !0,
            "private": !0,
            "protected": !0,
            "public": !0,
            "return": !0,
            "short": !0,
            "static": !0,
            "super": !0,
            "switch": !0,
            "synchronized": !0,
            "this": !0,
            "throw": !0,
            "transient": !0,
            "true": !0,
            "try": !0,
            "typeof": !0,
            "var": !0,
            "void": !0,
            "volatile": !0,
            "while": !0,
            "with": !0,
            "yield": !0
        };
        e.exports = function (e) {
            return r.hasOwnProperty(e)
        }
    }, function (e, t, n) {
        "use strict";

        function r(e, t, n, r) {
            var i = new String(e);
            return i.line = t, i.start = n, i.end = r, i
        }

        var i = function (e, t) {
            for (var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {}, i = [{
                type: "string",
                value: e,
                line: 0,
                start: 0,
                end: e.length
            }], o = 0; o < t.length; o++) !function (e) {
                for (var t = e.test.ignoreCase ? "ig" : "g", o = e.test.source + "|^$|[\\w\\W]", s = new RegExp(o, t), a = 0; a < i.length; a++) if ("string" === i[a].type) {
                    for (var c = i[a].line, u = i[a].start, p = i[a].end, l = i[a].value.match(s), f = [], h = 0; h < l.length; h++) {
                        var m = l[h];
                        e.test.lastIndex = 0;
                        var d = e.test.exec(m), v = d ? "expression" : "string",
                            g = f[f.length - 1], y = g || i[a], b = y.value;
                        u = y.line === c ? g ? g.end : u : b.length - b.lastIndexOf("\n") - 1, p = u + m.length;
                        var x = {type: v, value: m, line: c, start: u, end: p};
                        if ("string" === v) g && "string" === g.type ? (g.value += m, g.end += m.length) : f.push(x); else {
                            d[0] = new r(d[0], c, u, p);
                            var w = e.use.apply(n, d);
                            x.script = w, f.push(x)
                        }
                        c += m.split(/\n/).length - 1
                    }
                    i.splice.apply(i, [a, 1].concat(f)), a += f.length - 1
                }
            }(t[o]);
            return i
        };
        i.TYPE_STRING = "string", i.TYPE_EXPRESSION = "expression", i.TYPE_RAW = "raw", i.TYPE_ESCAPE = "escape", e.exports = i
    }, function (e, t, n) {
        "use strict";
        (function (t) {
            function r(e) {
                return "string" != typeof e && (e = e === undefined || null === e ? "" : "function" == typeof e ? r(e.call(e)) : JSON.stringify(e)), e
            }

            function i(e) {
                var t = "" + e, n = a.exec(t);
                if (!n) return e;
                var r = "", i = void 0, o = void 0, s = void 0;
                for (i = n.index, o = 0; i < t.length; i++) {
                    switch (t.charCodeAt(i)) {
                        case 34:
                            s = "&#34;";
                            break;
                        case 38:
                            s = "&#38;";
                            break;
                        case 39:
                            s = "&#39;";
                            break;
                        case 60:
                            s = "&#60;";
                            break;
                        case 62:
                            s = "&#62;";
                            break;
                        default:
                            continue
                    }
                    o !== i && (r += t.substring(o, i)), o = i + 1, r += s
                }
                return o !== i ? r + t.substring(o, i) : r
            }

            /*! art-template@runtime | https://github.com/aui/art-template */
            var o = n(0), s = Object.create(o ? t : window), a = /["&'<>]/;
            s.$escape = function (e) {
                return i(r(e))
            }, s.$each = function (e, t) {
                if (Array.isArray(e)) for (var n = 0, r = e.length; n < r; n++) t(e[n], n); else for (var i in e) t(e[i], i)
            }, e.exports = s
        }).call(t, n(4))
    }, function (e, t, n) {
        "use strict";
        var r = Object.prototype.toString, i = function (e) {
            return null === e ? "Null" : r.call(e).slice(8, -1)
        }, o = function s(e, t) {
            var n = void 0, r = i(e);
            if ("Object" === r ? n = Object.create(t || {}) : "Array" === r && (n = [].concat(t || [])), n) {
                for (var o in e) e.hasOwnProperty(o) && (n[o] = s(e[o], n[o]));
                return n
            }
            return e
        };
        e.exports = o
    }, function (e, t, n) {
        "use strict";
        var r = function (e, t, r, i) {
            var o = n(1);
            return i = i.$extend({
                filename: i.resolveFilename(e, i),
                bail: !0,
                source: null
            }), o(i)(t, r)
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = function (e) {
            console.error(e.name, e.message)
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = {
            __data: Object.create(null), set: function (e, t) {
                this.__data[e] = t
            }, get: function (e) {
                return this.__data[e]
            }, reset: function () {
                this.__data = {}
            }
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = function (e) {
            if (r) {
                return n(5).readFileSync(e, "utf8")
            }
            var t = document.getElementById(e);
            return t.value || t.innerHTML
        };
        e.exports = i
    }, function (e, t, n) {
        "use strict";
        var r = {
            test: /{{([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*}}/, use: function (e, t, n, i) {
                var o = this, s = o.options, a = o.getEsTokens(i), c = a.map(function (e) {
                    return e.value
                }), u = {}, p = void 0, l = !!t && "raw", f = n + c.shift(), h = function (t, n) {
                    console.warn((s.filename || "anonymous") + ":" + (e.line + 1) + ":" + (e.start + 1) + "\nTemplate upgrade: {{" + t + "}} -> {{" + n + "}}")
                };
                switch ("#" === t && h("#value", "@value"), f) {
                    case"set":
                        i = "var " + c.join("").trim();
                        break;
                    case"if":
                        i = "if(" + c.join("").trim() + "){";
                        break;
                    case"else":
                        var m = c.indexOf("if");
                        ~m ? (c.splice(0, m + 1), i = "}else if(" + c.join("").trim() + "){") : i = "}else{";
                        break;
                    case"/if":
                        i = "}";
                        break;
                    case"each":
                        p = r._split(a), p.shift(), "as" === p[1] && (h("each object as value index", "each object value index"), p.splice(1, 1));
                        i = "$each(" + (p[0] || "$data") + ",function(" + (p[1] || "$value") + "," + (p[2] || "$index") + "){";
                        break;
                    case"/each":
                        i = "})";
                        break;
                    case"block":
                        p = r._split(a), p.shift(), i = "block(" + p.join(",").trim() + ",function(){";
                        break;
                    case"/block":
                        i = "})";
                        break;
                    case"echo":
                        f = "print", h("echo value", "value");
                    case"print":
                    case"include":
                    case"extend":
                        if (0 !== c.join("").trim().indexOf("(")) {
                            p = r._split(a), p.shift(), i = f + "(" + p.join(",") + ")";
                            break
                        }
                    default:
                        if (~c.indexOf("|")) {
                            var d = a.reduce(function (e, t) {
                                var n = t.value, r = t.type;
                                return "|" === n ? e.push([]) : "whitespace" !== r && "comment" !== r && (e.length || e.push([]), ":" === n && 1 === e[e.length - 1].length ? h("value | filter: argv", "value | filter argv") : e[e.length - 1].push(t)), e
                            }, []).map(function (e) {
                                return r._split(e)
                            });
                            i = d.reduce(function (e, t) {
                                var n = t.shift();
                                return t.unshift(e), "$imports." + n + "(" + t.join(",") + ")"
                            }, d.shift().join(" ").trim())
                        }
                        l = l || "escape"
                }
                return u.code = i, u.output = l, u
            }, _split: function (e) {
                e = e.filter(function (e) {
                    var t = e.type;
                    return "whitespace" !== t && "comment" !== t
                });
                for (var t = 0, n = e.shift(), r = /\]|\)/, i = [[n]]; t < e.length;) {
                    var o = e[t];
                    "punctuator" === o.type || "punctuator" === n.type && !r.test(n.value) ? i[i.length - 1].push(o) : i.push([o]), n = o, t++
                }
                return i.map(function (e) {
                    return e.map(function (e) {
                        return e.value
                    }).join("")
                })
            }
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = {
            test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/,
            use: function (e, t, n, r) {
                return n = {
                    "-": "raw",
                    "=": "escape",
                    "": !1,
                    "==": "raw",
                    "=#": "raw"
                }[n], t && (r = "/*" + r + "*/", n = !1), {code: r, output: n}
            }
        };
        e.exports = r
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = function (e, t) {
            if (r) {
                var i, o = n(21).minify, s = t.htmlMinifierOptions, a = t.rules.map(function (e) {
                    return e.test
                });
                (i = s.ignoreCustomFragments).push.apply(i, a), e = o(e, s)
            }
            return e
        };
        e.exports = i
    }, function (e, t) {
        !function (e) {
            e.noop = function () {
            }
        }("object" == typeof e && "object" == typeof e.exports ? e.exports : window)
    }, function (e, t, n) {
        "use strict";
        var r = n(0), i = /^\.+\//, o = function (e, t) {
            if (r) {
                var o = n(5), s = t.root, a = t.extname;
                if (i.test(e)) {
                    var c = t.filename, u = !c || e === c, p = u ? s : o.dirname(c);
                    e = o.resolve(p, e)
                } else e = o.resolve(s, e);
                o.extname(e) || (e += a)
            }
            return e
        };
        e.exports = o
    }, function (e, t, n) {
        "use strict";

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }

        function i(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
        }

        function o(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }

        function s(e) {
            var t = e.name, n = e.source, r = e.path, i = e.line, o = e.column, s = e.generated,
                a = e.message;
            if (!n) return a;
            var c = n.split(/\n/), u = Math.max(i - 3, 0), p = Math.min(c.length, i + 3),
                l = c.slice(u, p).map(function (e, t) {
                    var n = t + u + 1;
                    return (n === i ? " >> " : "    ") + n + "| " + e
                }).join("\n");
            return (r || "anonymous") + ":" + i + ":" + o + "\n" + l + "\n\n" + t + ": " + a + (s ? "\n   generated: " + s : "")
        }

        var a = function (e) {
            function t(n) {
                r(this, t);
                var o = i(this, e.call(this, n.message));
                return o.name = "TemplateError", o.message = s(n), Error.captureStackTrace && Error.captureStackTrace(o, o.constructor), o
            }

            return o(t, e), t
        }(Error);
        e.exports = a
    }, function (e, t, n) {
        "use strict";
        e.exports = n(3)
    }])
});
/*
 * netWorkUtil
 */
;(function (w) {
    var xmlhttp = new XMLHttpRequest(),
        time = 2000,//设置轮询时间
        url = "",//当 `url`为空的时候 默认所有浏览器使用 onLine 和 offline事件
        OL = OL || {}; //onLine所有网络相关工具方法
    OL = {
        OL_api: {//扩展API
            onLineListener: function (func) {
                skyNetUtil.online = func
                return this
            },
            offLineListener: function (func) {
                skyNetUtil.offline = func
                return this
            }
        },
        setStatus: function (newStatus) {
            this.eventStatus(newStatus);
            w.onLine = newStatus;
        },
        //状态改变执行事件
        eventStatus: function (newStatus) {
            if (newStatus === true && skyNetUtil.online !== undefined && (w.onLine !== true || this.handlerFired === false)) {
                skyNetUtil.online();
            }
            if (newStatus === false && skyNetUtil.offline !== undefined && (w.onLine !== false || this.handlerFired === false)) {
                skyNetUtil.offline();
            }
            this.handlerFired = true;
        },
        //http请求
        XMLHttpLogic: function (async) {
            var url = this.getOnLineCheckURL(),
                self = this;
            if (async) {
                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState === 4) {
                        try {
                            self.processXmlhttpStatus();
                        } catch (err) {
                            self.setStatus(false);
                        }
                    }
                };
            } else {
                xmlhttp.onreadystatechange = undefined;
            }
            xmlhttp.open("HEAD", url, async)
            this.tryToSend(xmlhttp);
        },
        processXmlhttpStatus: function () {
            var tempOnLine = this.verifyStatus(xmlhttp.status);
            this.setStatus(tempOnLine);
        },
        //尝试发送请求
        tryToSend: function (xmlhttprequest) {
            try {
                xmlhttprequest.send();
            } catch (e) {
                this.setStatus(false);
            }
        },
        //确认状态
        verifyStatus: function (status) {
            return status === 200;
        },
        //url加上随机数
        getOnLineCheckURL: function () {
            return url + '?' + Math.floor(Math.random() * 1000000);
        },
        //非 chrome 和 Safari 浏览器不停的检查，嘿嘿
        startCheck: function () {
            var self = this
            setInterval(function () {
                self.XMLHttpLogic(true)
            }, time);
        },
        //第一次检查是否在线
        checkOnLine: function () {
            this.XMLHttpLogic(false)
        },
        getStatusFromNavigatorOnLine: function () {
            if (w.navigator.onLine !== undefined) {
                this.setStatus(w.navigator.onLine);
            } else {
                this.setStatus(true);
            }
        },
        //判断浏览器
        getExplorer: function (newStatus) {
            var explorer = window.navigator.userAgent;
            this.setStatus(newStatus)
            // console.log(explorer)
            // console.log(url)
            if ((explorer.indexOf('Firefox') >= 0 || explorer.indexOf('MSIE') >= 0) && url) {
                // console.log("getExplorer:1")
                this.checkOnLine()
                this.setStatus(newStatus)
                this.startCheck(newStatus)
            } else {
                // console.log("getExplorer:2")
                this.eventStatus(newStatus)
            }
        },
        getCurrentState: function () {
            // return navigator.onLine;
        },
        //绑定事件
        addEvent: function (obj, type, callback) {
            if (window.attachEvent) obj.attachEvent('on' + type, callback);
            else obj.addEventListener(type, callback);
        }
        ,
        init: function () {
            var self = this
            //获取当前状态
            this.addEvent(w, 'load', function () {
                self.eventStatus(w.onLine);
            });

            //侦听 online 事件
            this.addEvent(w, 'online', function () {
                self.getExplorer(true)
            });

            //侦听 offline 事件
            this.addEvent(w, 'offline', function () {
                self.getExplorer(false)
            });

            self.getExplorer(true);//既然能进去一开始肯定有网（对于web来说是这样，但是对于app就不一定了）
            this.handlerFired = false;
        }
    }

    skyNetUtil = function (json) {
        if (json) {
            if (json.time) time = json.time;
            if (json.url) url = json.url;
        }
        OL.init()
        this.getCurrentState = OL.getCurrentState;
        this.getStatusFromNavigatorOnLine = OL.getStatusFromNavigatorOnLine();
        for (var a in OL.OL_api) this[a] = OL.OL_api[a];
        return this
    }
    w.skyNetUtil = skyNetUtil
})(window);
!function (n) {
    "use strict";

    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }

    function r(n, t) {
        return n << t | n >>> 32 - t
    }

    function e(n, e, o, u, c, f) {
        return t(r(t(t(e, n), t(u, f)), c), o)
    }

    function o(n, t, r, o, u, c, f) {
        return e(t & r | ~t & o, n, t, u, c, f)
    }

    function u(n, t, r, o, u, c, f) {
        return e(t & o | r & ~o, n, t, u, c, f)
    }

    function c(n, t, r, o, u, c, f) {
        return e(t ^ r ^ o, n, t, u, c, f)
    }

    function f(n, t, r, o, u, c, f) {
        return e(r ^ (t | ~o), n, t, u, c, f)
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878;
        for (e = 0; e < n.length; e += 16) i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h);
        return [l, g, v, m]
    }

    function a(n) {
        var t, r = "", e = 32 * n.length;
        for (t = 0; t < e; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function d(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function h(n) {
        return a(i(d(n), 8 * n.length))
    }

    function l(n, t) {
        var r, e, o = d(n), u = [], c = [];
        for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
        return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
    }

    function g(n) {
        var t, r, e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
        return e
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function m(n) {
        return h(v(n))
    }

    function p(n) {
        return g(m(n))
    }

    function s(n, t) {
        return l(v(n), v(t))
    }

    function C(n, t) {
        return g(s(n, t))
    }

    function A(n, t, r) {
        return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n)
    }

    "function" == typeof define && define.amd ? define(function () {
        return A
    }) : "object" == typeof module && module.exports ? module.exports = A : n.md5 = A
}(this);
// ============================================data============================================
!function (window) {
    "use strict";
    var model = window.$sky.Model = window.$sky.Model || {},
        doc = window.document,
        times = 0;

    /**
     * 获取当前时间
     * @param str
     * @param fmt
     * @returns {Date}
     */
    model.getNowFormatDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }

    /**
     *  获取网络数据
     *  param为对象（get、post都是）
     *  async（true为异步）
     *  todo:请求异常捕获
     * */
    model.getAjax = function (type, url, param, async, contentType, noGoInLoginPage) {
        var contentType;
        async = async || true; //true为异步
        var num = ++times;
        return new ES6Promise(function (resolve, reject) {
            var httpParam = {
                // 允许跨域
                crossDomain: true,
                // 允许跨域的cookie访问
                xhrFields: {
                    withCredentials: true
                }
            };
            //请求方式参数处理
            type == null || type.toUpperCase() == 'GET' ? type = 'get' : type = 'post';
            if (type == 'get') {
                param = formatParams(param);
                if (url.indexOf("?") > 0) {
                    param == null || param == '' ? url : url = url + '&' + param;
                } else {
                    param == null || param == '' ? url : url = url + '?' + param;
                }
                param = '';//param拼接到url后了，所以这里置为''
            } else if (type == 'post') {
                param = JSON.stringify(param);
                httpParam.contentType = contentType || "application/json;";
            }

            if (window.DEBUG) {
                console.log("================================ request[" + num + "] ==============================\n" +
                    "请求时间：" + model.getNowFormatDate() + "\n" +
                    "请求地址：" + url + "\n" +
                    (param == '' ? "" : "请求参数：" + param + "\n" ) +
                    "==========================================================================\n\n");
            }
            httpParam.url = url;
            httpParam.type = type;
            httpParam.data = param;
            httpParam.async = async;
            httpParam.success = function (data, textStatus, xhr) {
                // todo重定向URL并带入下一个页面的参数（当前页面URL）
                if (xhr.status == 200 || xhr.status == 304) {
                    if (typeof data == 'string') {
                        data = JSON.parse(data);
                    }
                    if (!noGoInLoginPage){
                        if (typeof (data.errorCode) != 'undefined' && data.errorCode == 2) {
                            var pageName = window.location.href;
                            window.location.href = $sky.Util.urlTimestamp("/sfb/app/page/setting/account/auth/login/auth_login.html?pageName=" + pageName);
                        }
                    }
                    //todo: window.DEBUG为undefine处理
                    if (window.DEBUG) {
                        console.log("================================ response[" + num + "] ==============================\n" +
                            "响应时间： " + model.getNowFormatDate() + "\n" +
                            "请求地址：" + url + "\n" +
                            "响应内容：");
                        console.log(data);
                        console.log("==========================================================================\n\n");
                    }
                    resolve(data);
                } else {
                    console.log("================================ error[" + num + "] ==============================\n" +
                        "响应时间： " + model.getNowFormatDate() + "\n" +
                        "请求地址：" + url + "\n" +
                        "响应内容：" + xhr.statusText);
                    console.log("==========================================================================\n\n");
                    reject(Error(xhr.statusText));
                }
            };
            httpParam.error = function (request, errorType, errorMessage) {
                console.log("网络出错,url : " + url);
                reject(Error("Network Error"));
            };
            $.ajax(httpParam);
        });

        function formatParams(data) {
            var _fpArr = [];
            for (var _fpName in data) {
                _fpArr.push(_fpName + "=" + data[_fpName]);
            }
            return _fpArr.join("&");
        };
    };

    /**
     * 定位功能
     * 返回s
     *  city: 省级名称,
     *  name: 地级市名称,
     *  code: 地级市编码,
     *  time:获取时间
     * @returns {*}
     */
    model.getLocation = function () {
        var DIRECTLY_CITY_CODES = ["11", "12", "31", "50", "71", "81", "82", "99"];
        return new ES6Promise(function (resolve, reject) {
            var cityInfo = $sky.Model.handSessionStorage.get("CITY_INFO");
            var invalid = false; //检测缓存中定位信息是是否失效

            if (undefined != cityInfo) {
                var nowDate = new Date();
                var storageDate = new Date(cityInfo.time);
                if ((parseInt(nowDate - storageDate) / 60000) <= 5) {//缓存失效为5分钟
                    resolve(cityInfo);
                } else {
                    invalid = true;
                }
            }

            if ($sky.Util.getCurrentNetState() && (undefined == cityInfo || invalid)) {
                var mapObj, geolocation;
                mapObj = new AMap.Map('iCenter');
                mapObj.plugin('AMap.Geolocation', function () {
                    geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,//是否使用高精度定位，默认:true
                        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,        //显示定位按钮，默认：true
                        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    mapObj.addControl(geolocation);
                    geolocation.getCurrentPosition();
                    //返回定位信息
                    AMap.event.addListener(geolocation, 'complete', function (data) {
                        console.log(data);
                        var code = data.addressComponent.adcode;
                        code = DIRECTLY_CITY_CODES.indexOf(code.substr(0, 2)) == -1 ? code.substr(0, 4) : code.substr(0, 2);
                        var city = {
                            city: data.addressComponent.province,
                            name: data.addressComponent.city,
                            code: code,
                            lng:data.position.lng,
                            lat:data.position.lat,
                            time: new Date()
                        };
                        $sky.Model.handSessionStorage.set("CITY_INFO", city);
                        resolve(city);
                    });

                    //返回定位出错信息
                    AMap.event.addListener(geolocation, 'error', function () {
                        reject("定位失败");
                    });
                });
            } else {
                reject("请查看网络");
            }
        });
    };

    model.checkPhoneNumber = function (value) {
        var phone = value;
        if (!(/^1[34578]\d{9}$/.test(phone))) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 获取地址栏参数
     * @param name
     * @returns {*}
     */
    model.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg),
            qs = '';
        if (r != null) qs = decodeURIComponent(r[2]);
        return qs;
    };

    model.handleMd5 = function (str) {
        return md5(str);
    }
    /**
     * Cookie
     * @type {{get, set}}
     */
    model.handCookie = function () {
        return {
            /**
             * 获取 Cookie
             * @param  {String} name
             * @return {String}
             */
            get: function (name) {
                var m = doc.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
                return (m && m[1]) ? decodeURIComponent(m[1]) : '';
            },
            /**
             * 设置 Cookie
             * @param {String}  name 名称
             * @param {String}  val 值
             * @param {Number} expires 单位（秒）
             * @param {String}  domain 域
             * @param {String}  path 所在的目录
             * @param {Boolean} secure 跨协议传递
             */
            set: function (name, val, expires, domain, path, secure) {
                var text = String(encodeURIComponent(val)),
                    date = expires;

                // 从当前时间开始，多少小时后过期
                if (typeof date === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 1000);
                }

                date instanceof Date && (text += '; expires=' + date.toUTCString());

                !!domain && (text += '; domain=' + domain);

                text += '; path=' + (path || '/');

                secure && (text += '; secure');

                doc.cookie = name + '=' + text;
            }
        }
    }();
    /**
     * localStorage本地存储
     */
    model.handLocalStorage = function () {
        return storage(window.localStorage);
    }();
    /**
     * Session存储
     */
    model.handSessionStorage = function () {
        return storage(window.sessionStorage);
    }();

    /**
     * 序列化
     * @param value
     * @returns {string}
     */
    model.serialize = function (value) {
        if (typeof value === 'string') return value;
        return JSON.stringify(value);
    };
    /**
     * 反序列化
     * @param value
     * @returns {*}
     */
    model.deserialize = function (value) {
        if (typeof value !== 'string') return undefined;
        try {
            return JSON.parse(value);
        } catch (e) {
            return value || undefined;
        }
    };

    /**
     * HTML5存储
     */
    function storage(ls) {
        return {
            set: function (key, value) {
                ls.setItem(key, model.serialize(value));
            },
            get: function (key) {
                return model.deserialize(ls.getItem(key));
            },
            remove: function (key) {
                ls.removeItem(key);
            },
            clear: function () {
                ls.clear();
            }
        };
    }

    /**
     * 非空判断
     * @param key
     * @returns {boolean}
     */
    model.handleCheckNull = function (key) {
        if (key == "" || typeof(key) == undefined || key == null) {
            return false;
        } else {
            return true;
        }
    }

    model.checkIdCardNo = function (number) {
        var num = removeBlank(number);
        if (num != "") {
            if (num == '') {
                return false;
            }
            num = num.toUpperCase();
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
            if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
                // 输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X;
                return false;
            }
            // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
            // 下面分别分析出生日期和校验位
            var len, re;
            len = num.length;
            if (len == 15) {
                re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
                var arrSplit = num.match(re);
                // 检查生日日期是否正确
                var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    // 输入的身份证号里出生日期不对;
                    return false;
                } else {
                    // 将15位身份证转成18位
                    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
                        5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5',
                        '4', '3', '2');
                    var nTemp = 0,
                        i;
                    num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    num += arrCh[nTemp % 11];
                    return num;
                }
            }
            if (len == 18) {
                re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
                var arrSplit = num.match(re);
                // 检查生日日期是否正确
                var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
                var bGoodDay;
                bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
                if (!bGoodDay) {
                    // alert(dtmBirth.getYear());
                    // alert(arrSplit[2]);
                    // 输入的身份证号不正确
                    return false;
                } else {
                    // 检验18位身份证的校验码是否正确。
                    // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                    var valnum;
                    var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10,
                        5, 8, 4, 2);
                    var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5',
                        '4', '3', '2');
                    var nTemp = 0,
                        i;
                    for (i = 0; i < 17; i++) {
                        nTemp += num.substr(i, 1) * arrInt[i];
                    }
                    valnum = arrCh[nTemp % 11];
                    if (valnum != num.substr(17, 1)) {
                        // 输入的身份证号不正确
                        return false;
                    }
                    return num;
                }
            }
            return false;
        } else {
            if (window.DEBUG) {
                console.log("参数不能为空");
            }
            return false;
        }
    }

    model.removeBlank = function (num) {
        var id_num = $.trim(num);
        return id_num;
    }

    /**
     * js 加减乘除
     * @param arg1 数值1
     * @param op 操作符string 【+ - * /】
     * @param arg2 数值2
     * @returns {Object} arg1 与 arg2运算的精确结果
     */
    model.handleCalc = function (arg1, op, arg2) {
        var ra = 1, rb = 1, m;

        try {
            ra = arg1.toString().split('.')[1].length;
        } catch (e) {
        }
        try {
            rb = arg2.toString().split('.')[1].length;
        } catch (e) {
        }
        m = Math.pow(10, Math.max(ra, rb));

        switch (op) {
            case '+':
            case '-':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                break;
            case '*':
                ra = Math.pow(10, ra);
                rb = Math.pow(10, rb);
                m = ra * rb;
                arg1 = Math.round(arg1 * ra);
                arg2 = Math.round(arg2 * rb);
                break;
            case '/':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                m = 1;
                break;
        }
        try {
            var result = eval('(' + '(' + arg1 + ')' + op + '(' + arg2 + ')' + ')/' + m);
        } catch (e) {
        }
        return result;
    };


}(window);
// ============================================aop============================================
!function (window) {
    "use strict";
    var aop = window.$sky.AOP = window.$sky.AOP || {},
        doc = window.document;
    aop.log = function (msg) {
        console.log("系统日志：" + msg);
    }
}(window);
// ============================================tool============================================
!function (window) {
    "use strict";
    var util = window.$sky.Util = window.$sky.Util || {},
        doc = window.document;
    util.urlTimestamp = function (url) {
        //var getTimestamp = new Date().getTime();
        // if (url.indexOf("?") > -1) {
        //     url = url + "&timestamp-" + getTimestamp + "=" + getTimestamp
        // } else {
        //     url = url + "?timestamp-" + getTimestamp + "=" + getTimestamp
        // }
        return url;
    };

    /**
     *判断是否为字符串类型
     * @param obj
     * @returns {boolean}
     */
    util.isString = function (str) {
        return (typeof str == 'string') && str.constructor == String;
    };

    /**
     *  判断是否为数组类型
     * @param obj
     * @returns {boolean}
     */
    util.isArray = function (obj) {
        return (typeof obj == 'object') && obj.constructor == Array;
    };

    /**
     * 表单：提交前验证
     */
    util.validateForm = function (mEleId, mEleValue) {
        var isPass = false;
        for (var a = 0; a < mEleId.length; a++) {
            if (util.isArray(mEleId[a])) {
                var isChecked = false;
                for (var b = 0; b < mEleId[a].length; b++) {
                    if ($sky.bindId(mEleId[a][b]).checked || isChecked) {
                        isChecked = true;
                        break;
                    }
                }
                if (!isChecked) {
                    isPass = true;
                    console.log(typeof (window.SKYUI));
                    if (typeof (window.SKYUI) !== undefined) {
                        window.SKYUI.dialog.toast("请完善" + mEleValue[a] + "栏信息！", 'none', 1000);
                    } else {
                        alert("请完善" + mEleValue[a] + "栏信息！");
                    }
                    break;
                }
            } else if (util.isString(mEleId[a]) && $sky.bindId(mEleId[a]).value === "") {
                console.log(typeof (window.SKYUI));
                if (typeof (window.SKYUI) !== undefined) {
                    window.SKYUI.dialog.toast("请完善" + mEleValue[a] + "栏信息！", 'none', 1000);
                } else {
                    alert("请完善" + mEleValue[a] + "栏信息！");
                }
                isPass = true;
                break;
            }
        }
        return !isPass;
    }

    /**
     *
     * @param tags
     * @param flag true为只读，false为可写
     */
    util.setReady = function (tags, flag) {

        for (var i = 0; i < tags.length; i++) {
            var arr = $sky.bindTag(tags[i]);
            if (tags[i] == "textarea") {
                for (var a = 0; a < arr.length; a++) {
                    var tag = flag ? "readOnly" : null
                    arr[a].readOnly = tag;
                }
            }
            if (tags[i] == "select") {
                for (var b = 0; b < arr.length; b++) {
                    var tag = flag ? "disabled" : null
                    arr[b].disabled = tag;
                }
            }
            if (tags[i] == "input") {
                for (var c = 0; c < arr.length; c++) {
                    if (arr[c].type == "checkbox") {
                        var tac = flag ? "disabled" : null
                        arr[c].disabled = tac;
                    } else {
                        var tag = flag ? "readOnly" : null
                        var tag = flag ? "disabled" : null
                        arr[c].readOnly = tag;
                        arr[c].disabled = tag;
                    }
                }
            }
        }
    }

    /**
     * jsonString 转 jsonObject
     * @param string
     * @returns {*}
     */
    util.parseOptions = function (string) {
        if ($.isPlainObject(string)) {
            return string;
        }

        var start = (string ? string.indexOf('{') : -1),
            options = {};

        if (start != -1) {
            try {
                //创建自执行函数给options
                options = (new Function('', 'var json = ' + string.substr(start) + '; return JSON.parse(JSON.stringify(json));'))();
            } catch (e) {
            }
        }
        return options;
    };

    /*网络状态监听与获取*/
    util.setNetWorkListener = function (onlineCallback, offlineCallback) {
        skyNetUtil().onLineListener(onlineCallback)

        skyNetUtil().offLineListener(offlineCallback)
    };
    util.getCurrentNetState = function () {
        return navigator.onLine;
    }

    /**
     * 判断css3动画是否执行完毕
     * @git http://blog.alexmaccaw.com/css-transitions
     * @param duration
     */
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false,
            $el = this;

        $(this).one('webkitTransitionEnd', function () {
            called = true;
        });

        var callback = function () {
            if (!called) $($el).trigger('webkitTransitionEnd');
        };

        setTimeout(callback, duration);
    };
}(window);