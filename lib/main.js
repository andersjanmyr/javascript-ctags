"use strict";

var glob = require('glob');

function main() {
}


function files(pattern) {
  return glob.sync(pattern);
}


module.exports = main;
main.files = files;
