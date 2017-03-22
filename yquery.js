((window, undefined) => {
    let yQuery = (() => {
        // 构造函数
        let yQuery = (selector, context) => {
            // 如果构造函数有返回值，new所创建的对象会被丢弃，返回值将作为new表达式的值
            return new yQuery.fn.init(selector, context, rootyQuery)
        };

        let rootyQuery;

        // 依次匹配HTML代码和id
        let quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

        // Match a standalone tag
        let rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;

        // Save a reference to some core methods
        let toString = Object.prototype.toString,
            hasOwn = Object.prototype.hasOwnProperty,
            push = Array.prototype.push,
            slice = Array.prototype.slice,
            trim = String.prototype.trim,
            indexOf = Array.prototype.indexOf;

        yQuery.fn = yQuery.prototype = { // fn比prototype少7个字符，就是为了少写点
            constructor: yQuery,

            /**
             * @param selector undefined, DOM element, string, function, yQuery object, js object
             * @param context undefined or DOM element, yQuery object, js object
             * @param rootyQuery yQuery object contains document
             */
            init: (selector, context, rootyQuery) => {
                let match;
                let elem;
                let ret;
                let doc;

                // Handle $(""), $(null), $(undefined)
                if (!selector) {
                    return this;
                }

                // Handle $(DOMElement)
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }

                // The body element
                if (selector === 'body' && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = selector;
                    this.length = 1;
                    return this
                }

                // Handle HTML string
                if (typeof selector === 'string') {
                    if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
                        match = [null, selector, null];
                    } else {
                        match = quickExpr.exec(selector)
                    }

                    if (match && (match[1] || !context)) {
                        // HANDLE: $(html) -> $(array)
                        if (match[1]) {
                            context = context instanceof yQuery ? context[0] : context;
                            doc = ( context ? context.ownerDocument || context : document );

                            // If a single string is passed in and it's a single tag
                            // just do a createElement and skip the rest
                            ret = rsingleTag.exec( selector );

                            if ( ret ) {
                                if ( yQuery.isPlainObject( context ) ) {
                                    selector = [ document.createElement( ret[1] ) ];
                                    yQuery.fn.attr.call( selector, context, true );

                                } else {
                                    selector = [ doc.createElement( ret[1] ) ];
                                }

                            } else {
                                ret = yQuery.buildFragment( [ match[1] ], [ doc ] );
                                selector = ( ret.cacheable ? yQuery.clone(ret.fragment) : ret.fragment ).childNodes;
                            }

                            return yQuery.merge( this, selector );
                        }
                        // HANDLE: $("#id")
                        else {
                            elem = document.getElementById(match[2]);
                            if (elem) {
                                if ( elem.id !== match[2] ) {
                                    return rootyQuery.find( selector );
                                }
                                this.length = 1;
                                this[0] = elem;
                            }
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                    }
                    // HANDLE: $(expr, $(...))
                    else if (!context || context.yQuery) {
                        return (context || rootyQuery).find(selector);
                    }
                    // HANDLE: $(expr, context)
                    else {
                        return this.constructor(context).find(selector);
                    }
                }
                // HANDLE: $(function)
                else if (yQuery.isFunction(selector)) {
                    return rootyQuery.ready(selector);
                }

                if ( selector.selector !== undefined ) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                return yQuery.makeArray( selector, this );
            },

            // 其他原型属性和方法

            // Start with an empty selector
            selector: "",

            // The current version of jQuery being used
            yquery: "0.0.1",

            // The default length of a jQuery object is 0
            length: 0,

            size: function () {
                return this.length;
            },

            toArray: function () {
                return slice.call(this, 0);
            },

            get: function (num) {
                return num == null ?
                    this.toArray() :
                    (num < 0 ? this[this.length + num] : this[num]);
            }
        };
        yQuery.fn.init.prototype = yQuery.fn; // 用yQuery()的原型对象覆盖yQuery.fn.init()的原型对象，这样init的实例能调用yQuery的原型方法和属性
        yQuery.extend = yQuery.fn.extend = () => {};
        yQuery.extend({
            // ...
        });
        return yQuery;
    })();
    window.yQuery = window.$ = yQuery
})(window);
