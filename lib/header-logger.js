/**
 * Module dependencies
 */
var debug = require("debug")("simple-stack-common:middleware:headers");

module.exports = function() {
  return function headerLogger(req, res, next) {
    debug(req.headers);
    next();
  };
};
