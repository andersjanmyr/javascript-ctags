"use strict";

var nopt = require('nopt');
var javascriptCtags = require('./javascript_ctags');


function main(args) {
  if (!args) args = process.argv;
  var options = parseArgs(args);
  javascriptCtags(options.pattern, options.tagfile);
}

function parseArgs(args) {
  var options = nopt({ tagfile: String }, { t: '--tagfile' }, args);
  var rest = options.argv.remain;
  options.pattern = rest.length > 0 ? rest[0] : '*.js';
  if (!options.tagfile) options.tagfile = 'tags';
  return options;
}

module.exports = main;
main.parseArgs = parseArgs;
