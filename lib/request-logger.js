/**
 * Module dependencies
 */
var debug = require("debug")
  , metric = require('metric-log');

debug.headers = debug("simple-stack-common:middleware:headers");
debug.base = debug("simple-stack-common:middleware:base");
debug.env = debug("simple-stack-common:middleware:env");
debug.body = debug("simple-stack-common:middleware:body");

/**
 * Middleware to log basic parameters about the request.
 */
module.exports = function() {
  return function requestLogger(req, res, next) {
    debug.headers('at=requestLogger item=headers', metric.format(req.headers));
    debug.env('at=requestLogger item=env', metric.format(process.env));
    debug.base('at=requestLogger item=base', metric.format({ base: req.base }));
    debug.body('at=requestLogger item=body', metric.format({ body: req.body }));
    next();
  };
};
