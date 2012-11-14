"use strict";

require('mocha');
var expect = require('chai').expect;

var main = require('../lib/main');


describe('main', function() {
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

  it('parses the files and generates a tags file', function() {
    main(['node', 'main', '-t', 'tags', __dirname + '/fixtures/**/*.js']);
  });
});
