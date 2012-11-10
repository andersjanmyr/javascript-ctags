"use strict";

require('mocha');
var expect = require('chai').expect;

var Parser = require('../lib/parser');

describe('Parser', function() {
  var parser;
 
  beforeEach(function() {
    parser = new Parser();
  });

  describe('#parse', function() {
    it('does something useful', function() {
      parser.parse();
    });
  });
});

