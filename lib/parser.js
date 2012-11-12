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
  console.log(JSON.stringify(tree, null, 4));
  traverse(tree, functionVisitor);
  console.log(list);
  return list;
};

function functionVisitor(node) {
  var value;

  if (node.type === 'FunctionDeclaration')
    parseFunction(node);
  else if (node.type === 'AssignmentExpression')
    parseAssignment(node);
  else if (node.type === 'ObjectExpression')
    parseObject(node);

}

function parseFunction(node) {
  if (node.id)
    list.push({name: node.id.name});
}

function parseAssignment(node) {
  if (node.right.type === 'FunctionExpression')
    list.push({name: node.left.property.name});
}

function parseObject(node) {
  _.each(node.properties, function(property) {
  if (property.value.type === 'FunctionExpression')
    list.push({name: property.key.name});
  });
}


module.exports = Parser;


