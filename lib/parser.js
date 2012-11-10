"use strict";

var esprima = require('esprima');

function Parser() {
}

Parser.prototype.parse = function() {
    console.log(JSON.stringify(esprima.parse('var answer = 42', { loc: true }), null, 4));
};

module.exports = Parser;


