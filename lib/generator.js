"use strict";

var _ = require('underscore');

function generate(fileDefs) {
    var lines = generateHeader();
    lines = lines.concat(generateTags(fileDefs));

    return lines;
}

function generateTags(fileDefs) {
    var tags = [];
    _.each(fileDefs, function(def) {
        tags = tags.concat(generateFile(def.filename, def.entries));
    });
    tags.sort();
    return tags;
}

function generateFile(filename, definitions) {
  return _.map(definitions, _.bind(generateEntry, null, filename));
}

function generateEntry(filename, def) {
  return [
    def.name,
    filename,
    '/' + def.name +'/;"',
    'f', 'lineno:' + def.line
  ].join('\t');
}

function generateHeader() {
    var lines = [
        '!_TAG_FILE_FORMAT       2       /extended format/',
        '!_TAG_FILE_SORTED       1       /0=unsorted, 1=sorted, 2=foldcase/',
        '!_TAG_PROGRAM_AUTHOR    Anders Janmyr  /anders@janmyr.com/',
        '!_TAG_PROGRAM_NAME      javascript-ctags //',
        '!_TAG_PROGRAM_URL       http://github.com/andersjanmyr/javascript-ctags      /GitHub repository/',
        '!_TAG_PROGRAM_VERSION   0.1     //'
    ];
    return lines.join('\n');
}
module.exports = generate;
generate.generateFile = generateFile;
