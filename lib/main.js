"use strict";

var glob = require('glob');
var nopt = require('nopt');
var fs = require('fs');
var _ = require('underscore');
var Parser = require('./parser');
var Generator = require('./generator');


function main(args) {
  if (!args) args = process.argv;
  var options = parseArgs(args);
  var tags = parseAndGenerate(files(options.pattern));
  tags.sort();
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

function parseAndGenerate(files) {
  var parser = new Parser();
  var generator = new Generator();
  var tags = [];
  _.each(files, function(file) {
    var contents = fs.readFileSync(file, 'utf-8');
    var entries = parser.parse(contents);
    tags = tags.concat(generator.generate(file, entries));
  });
  return tags;
}

function writeFile(filename, tags) {
  fs.writeFileSync(filename, tags.join('\n'));
}

module.exports = main;
main.parseArgs = parseArgs;
main.files = files;
