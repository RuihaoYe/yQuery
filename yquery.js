((window, undefined) => {
  let yQuery = (() => {
    // 构造函数
    let yQuery = (selector, context) => {
      return new yQuery.fn.init(selector, context, rootyQuery)
    }
    yQuery.fn = yQuery.prototype = {
      constructor: yQuery,
      init: (selector, context, rootyQuery) => {}
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