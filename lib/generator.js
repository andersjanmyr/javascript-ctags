"use strict";

var _ = require('underscore');

function Generator() {
}

Generator.prototype.generate = function(filename, definitions) {
  return _.map(definitions, _.bind(generateEntry, null, filename));
};

function generateEntry(filename, def) {
  return [
    def.name,
    filename,
    '/' + def.name +'/;"',
    'f', 'lineno:' + def.line
  ].join('\t');
}


module.exports = Generator;

