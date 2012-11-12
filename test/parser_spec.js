"use strict";

require('mocha');
var expect = require('chai').expect;
var fs = require('fs');
var _ = require('underscore');

var Parser = require('../lib/parser');

var jQueryFixture = fs.readFileSync(__dirname + '/fixtures/jQuery-1.8.2.js', 'utf-8');
var objectFixture = fs.readFileSync(__dirname + '/fixtures/object.js', 'utf-8');

describe('Parser', function() {
  var parser;

  beforeEach(function() {
    parser = new Parser();
  });

  describe('#parse jQuery', function() {
    var tree;
    beforeEach(function() {
      //tree = parser.parse(jQueryFixture);
    });
    xit('succeeds', function() {
      expect(tree).to.be.defined;
    });
  });

  describe('#parse object literals', function() {
    var list;
    var names;
    beforeEach(function() {
      list = parser.parse(objectFixture);
      names = _.pluck(list, 'name');
    });

    it('parses named functions', function() {
      expect(names).to.contain('namedFunction');
    });
    it('parses external methods', function() {
      expect(names).to.contain('externalMethod');
    });
    it('parses prototype methods', function() {
      expect(names).to.contain('prototypeMethod');
    });
    it('parses internal methods', function() {
      expect(names).to.contain('internalMethod');
    });
  });
});

