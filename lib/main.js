"use strict";

var glob = require('glob');
var nopt = require('nopt');

function main() {
  var options = parseArgs(process.argv);
  var files = files(options.pattern);
}


function parseArgs(args) {
  var options = nopt({ tagfile: String }, { t: '--tagfile' }, args);
  var rest = options.argv.remain;
  options.pattern = rest.length > 0 ? rest[0] : '*.js';
  if (!options.tagfile) options.tagfile = 'tags';
  return options;
}

function files(pattern) {
  return glob.sync(pattern);
}

module.exports = main;
main.parseArgs = parseArgs;
main.files = files;
