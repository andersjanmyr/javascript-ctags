"use strict";

var nopt = require('nopt');
var javascriptCtags = require('./javascript_ctags');


function main(args) {
  if (!args) args = process.argv;
  var options = parseArgs(args);
  if (options.help) return usage();
  javascriptCtags(options.pattern, options.tagfile);
}

function parseArgs(args) {
  var longOptions = {
      tagfile: String,
      help: Boolean
  };
  var shortcuts = {
      t: '--tagfile',
      h: '--help',
      '?': '--help'
  };

  var options = nopt(longOptions, shortcuts, args);
  var rest = options.argv.remain;
  options.pattern = rest.length > 0 ? rest[0] : '*.js';
  if (!options.tagfile) options.tagfile = 'tags';
  return options;
}

function usage() {
  console.log('javascript-ctags [-?] [-t tagfile] [fileglob]');
  console.log('--help, -h, -?\t show this');
  console.log('--tagfile, -t\t The generated tagfile (default tags)');
  console.log('  fileglob\t A glob pattern (supports **/*.js), (default *.js)');
}

module.exports = main;
main.parseArgs = parseArgs;
