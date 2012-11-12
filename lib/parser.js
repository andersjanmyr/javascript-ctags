"use strict";

var esprima = require('esprima');
var _ = require('underscore');

function Parser() {
}

function traverse(object, visitor) {
  var key, child;

  visitor.call(null, object);
  _.each(object, function(child) {
    if (typeof child === 'object' && child !== null)
      traverse(child, visitor);
  });
}

var list = [];

Parser.prototype.parse = function(code) {
  list = [];
  var tree = esprima.parse(code, { loc: true });
  traverse(tree, functionVisitor);
  return list;
};

function functionVisitor(node) {
  switch(node.type) {
  case 'FunctionDeclaration':
    return parseFunction(node);
  case 'AssignmentExpression':
    return parseAssignment(node);
  case 'ObjectExpression':
    return parseObject(node);
  }
}

function parseFunction(node) {
  if (node.id)
    list.push({name: node.id.name, line: node.loc.start.line});
}

function parseAssignment(node) {
  if (node.right.type === 'FunctionExpression' && node.left.property && node.left.property.name) {
    list.push({name: node.left.property.name,
              line: node.left.property.loc.start.line});
  }
}

function parseObject(node) {
  _.each(node.properties, function(property) {
  if (property.value.type === 'FunctionExpression' && property.key.name)
    list.push({name: property.key.name, line: property.loc.start.line});
  });
}


module.exports = Parser;


