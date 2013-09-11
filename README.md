# javascript-ctags

A command line tool for generating extended ctags files for Javascript.
Currently it indexes all functions, both public and private.

[![Build Status](https://secure.travis-ci.org/andersjanmyr/javascript-ctags.png)](http://travis-ci.org/andersjanmyr/javascript-ctags)


## Installation

    $ npm install -g javascript-ctags


## Usage

    $ bin/javascript-ctags -?
    javascript-ctags [-?] [-t/-f tagfile] [fileglob]
    --help, -h, -?	 show this
    --tagfile, -t, -f	 The generated tagfile (default tags), use - for STDOUT
    fileglob	 A glob pattern (supports **/*.js), (default *.js)


## TODO

* Add properties to index?
* Handle Node exports
* Handle other export formats.


