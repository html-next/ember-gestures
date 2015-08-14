/**
 An HTMLBars AST transformation that makes all instances of

 ```handlebars
 <HTMLElement {{action "foo"}}>
 ```

 include

 ```handlebars
 <HTMLElement {{action "foo"}} style="touch-action: none;">
 ```
 */
var TOUCH_ACTION = 'touch-action: none;';

function TouchActionSupport() {
  this.syntax = null;
}


TouchActionSupport.prototype.transform = function TouchActionSupport_transform(ast) {
  var pluginContext = this;
  var walker = new pluginContext.syntax.Walker();

  walker.visit(ast, function(node) {
    if (pluginContext.validate(node)) {
      var style = elementAttribute(node, 'style');
      if (!style) {
        style = {
          type: 'AttrNode',
          name: 'style',
          value: { type: 'TextNode', chars: '' }
        };
        node.attributes.push(style);
      }
      style.value.chars += TOUCH_ACTION;
    }
  });

  return ast;


};

TouchActionSupport.prototype.validate = function TouchActionSupport_validate(node) {
  var modifier;
  var onValue;

  if (node.type === 'ElementNode') {
    modifier = elementModifierForPath(node, 'action');
    onValue = modifier ? hashPairForKey(modifier.hash, 'on') : false;

    return modifier && (!onValue || onValue === 'click');
  }

  return false;
};


function elementAttribute(node, path) {
  var attributes = node.attributes;
  for (var i = 0, l = attributes.length; i < l; i++) {
    if (attributes[i].name === 'style') {
      return attributes[i];
    }
  }
  return false;
}

function elementModifierForPath(node, path) {
  // 1.11+ uses node.modifiers, and 1.10 uses node.helpers
  var modifiers = node.modifiers || node.helpers;
  for (var i = 0, l = modifiers.length; i < l; i++) {
    var modifier = sexpr(modifiers[i]);

    if (modifier.path.original === path) {
      return modifier;
    }
  }

  return false;
}

function hashPairForKey(hash, key) {
  for (var i = 0, l = hash.pairs.length; i < l; i++) {
    var pair = hash.pairs[i];
    if (pair.key === key) {
      return pair;
    }
  }

  return false;
}

// For compatibility with pre- and post-glimmer
function sexpr(node) {
  if (node.sexpr) {
    return node.sexpr;
  } else {
    return node;
  }
}


module.exports = TouchActionSupport;
