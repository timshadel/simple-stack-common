/**
 * Forwards compatibilty for express3x
 */

module.exports = function(deprecate) {
  return function header(req, res, next) {
    res.set = res.header;

    res.header = function() {
      if(deprecate) console.log("`res.header` has been deprecated. Please use `res.set`");
      res.set.apply(res, arguments);
    };

    next();
  };
};
