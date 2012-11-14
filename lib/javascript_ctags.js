"use strict";

var glob = require('glob');
var nopt = require('nopt');
var fs = require('fs');
var _ = require('underscore');
var Parser = require('./parser');
var generate = require('./generate');

function parseAndGenerate(pattern, tagfile) {
  var fileDefs = parse(files(pattern));
  var tags = generate(fileDefs);
  writeFile(tagfile, tags);
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

module.exports = parseAndGenerate;
module.exports.files = files;
