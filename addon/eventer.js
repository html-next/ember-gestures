import jQuery from 'jquery';

function getEventName(event) {
  return event.indexOf('.') !== -1 ? event.substr(0, event.indexOf('.')) : event;
}

function FakeEvent(e, target) {
  this.preventDefault = e.preventDefault.bind(e);
  this.stopPropagation = e.stopPropagation.bind(e);
  this.stopImmediatePropagation = e.stopImmediatePropagation.bind(e);
  this.currentTarget = target;
}

function filterFunction(handlers, walker) {
  return function(e) {
    var node = walker.closest(e.target);
    if (node) {
      if (node[0] === 'id') {
        return handlers.id.call(node[1], e);
      } else {
        var event = new FakeEvent(e, node[1]);
        return handlers.action.call(node[1], event);
      }
    }
  };
}

function Eventer($element, walker) {

  var _listeners = [];
  var element = jQuery($element).get(0);
  element._listeners = _listeners;

  var _handlers = {};
  function addHandler(event, type, fn) {

    var hasHandler = !!_handlers[event];
    _handlers[event] = _handlers[event] || {};
    _handlers[event][type] = fn;

    if (!hasHandler) {
      var filterFn = filterFunction(_handlers[event], walker);
      _listeners.push([event, filterFn]);
      element.addEventListener(event, filterFn, true);
    }
    return filterFunction(event, walker);
  }

  this.on = function(eventName, selector, fn) {
    var event = getEventName(eventName);
    var type = selector === '.ember-view' ? 'id' : 'action';
    addHandler(event, type, fn);
  };

  this.off = function() {
    if (element._listeners) {
      element._listeners.forEach(function(item) {
        element.removeEventListener(item[0], item[1], true);
      });
    }
    _listeners = [];
    element._listeners = _listeners;
  };

}

export default function($element, walker) {
  return new Eventer($element, walker);
}
