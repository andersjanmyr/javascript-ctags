"use strict";

var _ = require('underscore');
var packageJson = require('../package');

function generate(fileDefs) {
    var lines = generateHeader();
    lines = lines.concat(generateTags(fileDefs));
    return lines;
}

function generateHeader() {
    var lines = [
        '!_TAG_FILE_FORMAT\t2\t/extended format/',
        '!_TAG_FILE_SORTED\t1\t/0=unsorted, 1=sorted, 2=foldcase/',
        '!_TAG_PROGRAM_AUTHOR\tAnders Janmyr\t/anders@janmyr.com/',
        '!_TAG_PROGRAM_NAME\tjavascript-ctags\t//',
        '!_TAG_PROGRAM_URL\thttp://github.com/andersjanmyr/javascript-ctags\t/GitHub repository/',
        '!_TAG_PROGRAM_VERSION\t' + packageJson.version + '\t//'
    ];
    return lines;
}

function generateTags(fileDefs) {
    var tags = [];
    _.each(fileDefs, function(def) {
        tags = tags.concat(generateEntries(def.filename, def.entries));
    });
    tags.sort();
    return tags;
}

function generateEntries(filename, definitions) {
  return _.map(definitions, _.bind(generateEntry, null, filename));
}

function generateEntry(filename, def) {
  return [
    def.name,
    filename,
    def.line-1 + '/\\<' + def.name +'\\>/;"',
    'f', 'lineno:' + def.line
  ].join('\t');
}

module.exports = generate;
generate.generateEntries = generateEntries;
