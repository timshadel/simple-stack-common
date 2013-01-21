
/**
 * Module dependencies.
 */
var pns = require("pack-n-stack")
  , join = require("path").join
  , express = require("express")
  , base = require("connect-base");

/**
 * Expose the stack
 */
module.exports = function(config) {
  if (!config) config = {};

  // Create a pack
  var pack = pns(express());

  // Some default configuration
  pack.configure(function() {
    // Remove it for security
    pack.set("x-powered-by", false);
  });

  // Base URL
  pack.use(base());

  // Logger
  pack.use(express.logger(config.logger || 'dev'));
  // We don't want logs in our tests
  pack.configure('test', function() {
    pack.remove("logger");
  });

  // GZip
  var compressFun = express.compress();
  pack.use(function compress(req, res, next) {
    compressFun(req, res, next);
  });

  // Body Parser
  pack.use(express.bodyParser());

  // Method Override
  pack.use(express.methodOverride());

  // Return the pack
  return pack;
};

/*
 * Expose express
 */
module.exports.middleware = express;
