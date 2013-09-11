"use strict";

require('mocha');
var sinon = require('sinon');
var expect = require('chai').expect;
var fs = require('fs');

var javascriptCtags = require('../lib/javascript_ctags');


describe('main', function() {
  describe('#files', function() {
    it('returns 5 nested files for fixtures/**/*.js', function() {
      var files = javascriptCtags.files(__dirname + '/fixtures/**/*.js', {debug: true});
      expect(files).to.have.length(5);
    });
  });

  describe("#writeFile", function(){
    var consoleSpy,
        fsSpy,
        tags = [];

    beforeEach(function() {
      consoleSpy = sinon.spy(console, 'log');
      fsSpy = sinon.spy(fs, 'writeFileSync');
    });

    afterEach(function() {
      console.log.restore();
      fs.writeFileSync.restore();
    });

    it("writes contents to console if filename is -", function(){
      javascriptCtags.writeFile("-", tags);
      expect(consoleSpy.called).to.equal(true);
      expect(fsSpy.called).to.equal(false);
    });

    it("writes contents to given file", function(){
      javascriptCtags.writeFile("tags", tags);
      expect(fsSpy.called).to.equal(true);
      expect(consoleSpy.called).to.equal(false);
    });
  });
});
