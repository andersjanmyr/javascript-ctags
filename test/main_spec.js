"use strict";

require('mocha');
var expect = require('chai').expect;

var main = require('../lib/main');


describe('main', function() {
  describe('#files', function() {
    it('returns 5 nested files for fixtures/**/*.js', function() {
      var files = main.files(__dirname + '/fixtures/**/*.js', {debug: true});
      expect(files).to.have.length(5);
    });
  });
  describe('#parseArgs', function() {
    it('parses valid options', function() {
      var options = main.parseArgs(['node', 'main', '-t', 'libtags', '**/*.js']);
      expect(options.tagfile).to.equal('libtags');
      expect(options.pattern).to.deep.equal('**/*.js');
    });
    it('inserts default options', function() {
      var options = main.parseArgs(['node', 'main']);
      expect(options.tagfile).to.equal('tags');
      expect(options.pattern).to.deep.equal('*.js');
    });
  });
});
