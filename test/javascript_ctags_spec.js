"use strict";

require('mocha');
var expect = require('chai').expect;

var javascriptCtags = require('../lib/javascript_ctags');


describe('main', function() {
  describe('#files', function() {
    it('returns 5 nested files for fixtures/**/*.js', function() {
      var files = javascriptCtags.files(__dirname + '/fixtures/**/*.js', {debug: true});
      expect(files).to.have.length(5);
    });
  });
});
