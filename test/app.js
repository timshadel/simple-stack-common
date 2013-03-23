/**
 * Module exports
 */
var stack = require("..");

/**
 * Expose the app
 */
var app = module.exports = stack();

/**
 * Routes
 */
app.get("/", function(req, res, next){
  res.send("Hello");
});
