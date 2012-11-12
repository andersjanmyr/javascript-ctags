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

function parseFunction(node) {
  if (node.id)
    return node.id.name;
  return null;
}

function parseAssignment(node) {
  console.log(node.right.type, node.left);
  if (node.right.type === 'FunctionExpression')
    return node.left.property.name;
  return null;
}


function functionVisitor(node) {
  var value;

  if (node.type === 'FunctionDeclaration')
    value = parseFunction(node);
  else if (node.type === 'AssignmentExpression')
    value = parseAssignment(node);

  if (value)
    list.push({name: value});
}


Parser.prototype.parse = function(code) {
  list = [];
  var tree = esprima.parse(code, { loc: true });
  console.log(JSON.stringify(tree, null, 4));
  traverse(tree, functionVisitor);
  console.log(list);
  return list;
};

module.exports = Parser;


