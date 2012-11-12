"use strict";

var glob = require('glob');
var nopt = require('nopt');
var fs = require('fs');
var _ = require('underscore');
var Parser = require('./parser');
var generate = require('./generator');


function main(args) {
  if (!args) args = process.argv;
  var options = parseArgs(args);
  var fileDefs = parse(files(options.pattern));
  var tags = generate(fileDefs);
  writeFile(options.tagfile, tags);
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

function parse(files) {
  var parser = new Parser();
  return _.map(files, function(file) {
    var contents = fs.readFileSync(file, 'utf-8');
    var entries = parser.parse(contents);
    return {filename: file, entries: entries};
  });
}

function writeFile(filename, tags) {
  fs.writeFileSync(filename, tags.join('\n'));
}

module.exports = main;
main.parseArgs = parseArgs;
main.files = files;
