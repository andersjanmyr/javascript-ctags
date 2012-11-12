"use strict";

require('mocha');
var expect = require('chai').expect;

var Generator = require('../lib/generator');


describe('Generator', function() {
    var generator = new Generator();
    describe('#generate', function() {
        var entries;
        beforeEach(function() {
            entries = generator.generate('file.js', [{name: 'tapir', line: 5 }]);
        });
        it('generates one ctag entry', function() {
            expect(entries).to.have.length(1);
        });
        it('generates one ctag entry', function() {
            var expected = 'tapir\tfile.js\t/tapir/;"\tf\tlineno:5';
            expect(entries[0]).to.equal(expected);
        });
    });
});
