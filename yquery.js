((window, undefined) => {
  let yQuery = (() => {
    // 构造函数
    let yQuery = (selector, context) => {
      // 如果构造函数有返回值，new所创建的对象会被丢弃，返回值将作为new表达式的值
      return new yQuery.fn.init(selector, context, rootyQuery)
    }

    // 依次匹配HTML代码和id
    let quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/

    yQuery.fn = yQuery.prototype = {
      constructor: yQuery,

      /**
       * @param selector undefined, DOM element, string, function, yQuery object, js object
       * @param context undefined or DOM element, yQuery object, js object
       * @param rootyQuery yQuery object contains document
       */
      init: (selector, context, rootyQuery) => {
        let match
        let elem
        let ret
        let doc

        // Handle $(""), $(null), $(undefined)
        if (!selector) {
          return this
        }

        // Handle $(DOMElement)
        if (selector.nodeType) {
          this.context = this[0] = selector
          this.length = 1
          return this
        }

        // The body element
        if (selector === 'body' && !context && document.body) {
          this.context = document
          this[0] = document.body
          this.selector = selector
          this.length = 1
          return this
        }

        // Handle HTML string
        if (typeof selector === 'string') {
          if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
            match = [ null, selector, null ];
          }
          else {
            match = quickExpr.exec(selector)
          }

          if (match && (match[1] || !context)) {
            
          }
        }
      }

      // 其他原型属性和方法
    }
    yQuery.fn.init.prototype = yQuery.fn
    yQuery.extend = yQuery.fn.extend = () => {}
    yQuery.extend({
      // ...
    })
    return yQuery
  })()
  window.yQuery = window.$ = yQuery
})(window)