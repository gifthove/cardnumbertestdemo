// This file is not transpiled, so must use CommonJS and ES5

// Register Babel to transpile before running our tests
require("@babel/register")();

// Disable webpack features that Mocha doesnt understand
require.extensions[".css"] = function() {};
