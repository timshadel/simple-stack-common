/**
 * Module dependencies
 */

/**
 * Returns an empty favicon
 */
module.exports = function() {
  return function favicon(req, res, next) {
    res.writeHead(200);
    res.end();
  };
}