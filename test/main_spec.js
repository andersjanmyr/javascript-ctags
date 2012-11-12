"use strict";

require('mocha');
var expect = require('chai').expect;

var main = require('../lib/main');


describe('main', function() {
  describe('#files', function() {
    it('returns 8 files', function() {
      var files = main.files(__dirname + '/fixtures/**/*.js', {debug: true});
      expect(files).to.have.length(5);
    });
  });
});
