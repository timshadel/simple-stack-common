/**
 * Module dependencies
 */
var debug = require("debug")
  , debug.headers = debug("simple-stack-common:middleware:headers"),
  , debug.base = debug("simple-stack-common:middleware:base"),
  , debug.env = debug("simple-stack-common:middleware:env"),
  , debug.body = debug("simple-stack-common:middleware:body");

module.exports = function() {
  return function headerLogger(req, res, next) {
    debug.headers('req.headers\n', req.headers);
    debug.base('req.base\n', req.base);
    debug.env('process.env\n', process.env);
    debug.body('req.body\n', req.body);
    next();
  };
};
