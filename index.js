
/**
 * Module dependencies.
 */
var pns = require("pack-n-stack")
  , express = require("express")
  , connect = require("express/node_modules/connect")
  , base = require("connect-base");

/**
 * Expose the stack
 */
module.exports = function(config) {
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
    .use(express.methodOverride())
    .use(express.bodyParser())
    .use(require("./lib/header-logger")())
    // TODO Replace with express@3.1.1
    // .use(express.compress())
    .use("", "compress", express.compress())

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
 * Expose connect.middleware as stack.*
 */
exports.middleware = {};
for (var key in connect.middleware) {
  Object.defineProperty(
      exports.middleware
    , key
    , Object.getOwnPropertyDescriptor(connect.middleware, key));
}