/*! Responsive Carousel - v0.1.0 - 2012-08-16
* https://github.com/filamentgroup/responsive-carousel
* Copyright (c) 2012 Filament Group, Inc.; Licensed MIT, GPL */ (function(a) {
    var b = "carousel",
        c = "." + b,
        d = "data-transition",
        e = b + "-transitioning",
        f = b + "-item",
        g = b + "-active",
        h = b + "-in",
        i = b + "-out",
        j = b + "-nav",
        k = function() {
            var a = " -webkit- -moz- -o- -ms- ".split(" "),
                b = !1;
            while (a.length) a.shift() + "transition" in document.documentElement.style !== undefined && (b = !0);
            return b
        }(),
        l = {
            _create: function() {
                a(this)
                    .trigger("beforecreate." + b)[b]("_init")[b]("_addNextPrev")
                    .trigger("create." + b)
            },
            _init: function() {
                var c = a(this)
                    .attr(d);
                return c || (k = !1), a(this)
                    .addClass(b + " " + (c ? b + "-" + c : "") + " ")
                    .children()
                    .addClass(f)
                    .first()
                    .addClass(g)
            },
            next: function() {
                a(this)[b]("goTo", "+1")
            },
            prev: function() {
                a(this)[b]("goTo", "-1")
            },
            goTo: function(c) {
                var e = a(this),
                    j = e.attr(d),
                    l = " " + b + "-" + j + "-reverse";
                a(this)
                    .find("." + f)
                    .removeClass([i, h, l].join(" "));
                var m = a(this)
                    .find("." + g),
                    n = m.prevAll()
                        .length,
                    o = (n || 0) + 1,
                    p = typeof c == "number" ? c : o + parseFloat(c),
                    q = a(this)
                        .find(".carousel-item")
                        .eq(p - 1),
                    r = typeof c == "string" && !parseFloat(c) || p > o ? "" : l;
                q.length || (q = a(this)
                    .find("." + f)[r.length ? "last" : "first"]()), k ? e[b]("_transitionStart", m, q, r) : (q.addClass(g), e[b]("_transitionEnd", m, q, r)), e.trigger("goto." + b, q)
            },
            update: function() {
                return a(this)
                    .children()
                    .not("." + j)
                    .addClass(f), a(this)
                    .trigger("update." + b)
            },
            _transitionStart: function(c, d, e) {
                var f = a(this);
                d.one(navigator.userAgent.indexOf("AppleWebKit") > -1 ? "webkitTransitionEnd" : "transitionend", function() {
                    f[b]("_transitionEnd", c, d, e)
                }), a(this)
                    .addClass(e), c.addClass(i), d.addClass(h)
            },
            _transitionEnd: function(b, c, d) {
                a(this)
                    .removeClass(d), b.removeClass(i + " " + g), c.removeClass(h)
                    .addClass(g)
            },
            _bindEventListeners: function() {
                var c = a(this)
                    .bind("click", function(d) {
                    var e = a(d.target)
                        .closest("a[href='#next'],a[href='#prev']");
                    e.length && (c[b](e.is("[href='#next']") ? "next" : "prev"), d.preventDefault())
                });
                return this
            },
            _addNextPrev: function() {
                return a(this)
                    .append("<nav class='" + j + "'><a href='#prev' class='prev' title='Previous'>Prev</a><a href='#next' class='next' title='Next'>Next</a></nav>")[b]("_bindEventListeners")
            },
            destroy: function() {}
        };
    a.fn[b] = function(c, d, e, f) {
        return this.each(function() {
            if (c && typeof c == "string") return a.fn[b].prototype[c].call(this, d, e, f);
            if (a(this)
                .data(b + "data")) return a(this);
            a(this)
                .data(b + "active", !0), a.fn[b].prototype._create.call(this)
        })
    }, a.extend(a.fn[b].prototype, l), a(function() {
        a(c)[b]()
    })
})(jQuery),
function(a) {
    var b = "carousel",
        c = "." + b,
        d = b + "-no-transition",
        e = /iPhone|iPad|iPod/.test(navigator.platform) && navigator.userAgent.indexOf("AppleWebKit") > -1,
        f = {
            _dragBehavior: function() {
                var b = a(this),
                    f, g = {}, h, i, j = function(b) {
                        var d = b.touches || b.originalEvent.touches,
                            e = a(b.target)
                                .closest(c);
                        b.type === "touchstart" && (f = {
                            x: d[0].pageX,
                            y: d[0].pageY
                        }), d[0] && d[0].pageX && (g.touches = d, g.deltaX = d[0].pageX - f.x, g.deltaY = d[0].pageY - f.y, g.w = e.width(), g.h = e.height(), g.xPercent = g.deltaX / g.w, g.yPercent = g.deltaY / g.h, g.srcEvent = b)
                    }, k = function(b) {
                        j(b), a(b.target)
                            .closest(c)
                            .trigger("drag" + b.type.split("touch")[1], g)
                    };
                a(this)
                    .bind("touchstart", function(b) {
                    a(this)
                        .addClass(d), k(b)
                })
                    .bind("touchmove", function(a) {
                    j(a), k(a), e || (a.preventDefault(), window.scrollBy(0, - g.deltaY))
                })
                    .bind("touchend", function(b) {
                    a(this)
                        .removeClass(d), k(b)
                })
            }
        };
    a.extend(a.fn[b].prototype, f), a(c)
        .live("create." + b, function() {
        a(this)[b]("_dragBehavior")
    })
}(jQuery),
function(a) {
    var b = "carousel",
        c = "." + b,
        d = b + "-active",
        e = b + "-item",
        f = function(a) {
            return Math.abs(a) > 4
        }, g = function(a, c) {
            var d = a.find("." + b + "-active"),
                f = d.prevAll()
                    .length + 1,
                g = c < 0,
                h = f + (g ? 1 : -1),
                i = a.find("." + e)
                    .eq(h - 1);
            return i.length || (i = a.find("." + e)[g ? "first" : "last"]()), [d, i]
        };
    a(c)
        .live("dragmove", function(b, c) {
        if (!f(c.deltaX)) return;
        var d = g(a(this), c.deltaX);
        d[0].css("left", c.deltaX + "px"), d[1].css("left", c.deltaX < 0 ? c.w + c.deltaX + "px" : -c.w + c.deltaX + "px")
    })
        .live("dragend", function(b, c) {
        if (!f(c.deltaX)) return;
        var e = g(a(this), c.deltaX),
            h = Math.abs(c.deltaX) > 45;
        a(this)
            .one(navigator.userAgent.indexOf("AppleWebKit") ? "webkitTransitionEnd" : "transitionEnd", function() {
            e[0].add(e[1])
                .css("left", "")
        }), h ? (e[0].removeClass(d)
            .css("left", c.deltaX > 0 ? c.w + "px" : -c.w + "px"), e[1].addClass(d)
            .css("left", 0)) : (e[0].css("left", 0), e[1].css("left", c.deltaX > 0 ? -c.w + "px" : c.w + "px"))
    })
}(jQuery);