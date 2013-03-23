/**
 * Module dependencies
 */

module.exports = function() {
  return function errorLogger(err, req, res, next) {
    // If it's a server error, print it
    ((!err.code || err.code > 499) ? console.error : console.warn)(err.stack || err);

    // Pass it on to the app specific error handler
    next(err);
  }
};
