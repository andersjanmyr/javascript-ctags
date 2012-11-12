"use strict";

require('mocha');
var expect = require('chai').expect;

var generate = require('../lib/generator');


describe('Generator', function() {
    describe('#generateFile', function() {
        var entries;
        beforeEach(function() {
            entries = generate.generateFile('file.js', [{name: 'tapir', line: 5 }]);
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
