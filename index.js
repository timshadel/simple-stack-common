
/**
 * Module dependencies.
 */
var pns = require("pack-n-stack")
  , express = require("express")
  , connect = require("express/node_modules/connect");

/**
 * Expose the stack
 */
module.exports = exports = function(config) {
  if (!config) config = {};

  // Create an express/pack-n-stack app
  var pack = pns(express());

  /**
   * Stack
   */
  pack
    // Pre-router stack
    .use("/favicon.ico", require("./lib/empty-favicon")())
    .use(require("connect-base")())
    .use(require("connect-metric")(null, {request_id: config.request_id || "x-request-id"}))
    .use(express.methodOverride())
    .use(express.bodyParser())
    .use(require("./lib/header-logger")())
    .use(express.compress())

    // Router
    .use(pack.router)

    // Post-router stack
    .use(require("./lib/error-logger")());

  /**
   * Configuration
   */
  pack
    .configure(function() {
      // Remove it for security
      pack.set("x-powered-by", false);
    })
    .configure("production", function() {

    })
    .configure("development", function() {
      pack.locals.pretty = true;
      // Log our requests
      pack.useAfter("base", express.logger('dev'));
    });

  return pack;
};

/**
 * Expose connect.middleware as obj.*
 */
exports.middleware = function(obj) {
  for (var key in connect.middleware) {
    Object.defineProperty(
        obj
      , key
      , Object.getOwnPropertyDescriptor(connect.middleware, key));
  }
};
exports.middleware(exports.middleware);
