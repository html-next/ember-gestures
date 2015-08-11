import jQuery from 'jquery';

/* global document*/
function getEventName(event) {
  return event.indexOf('.') !== -1 ? event.substr(0, event.indexOf('.')) : event;
}

function filterFunction(selector, fn) {
  return function(e) {
    var element = jQuery(e.target).closest(selector).get(0);
    if (element) {
      return fn.call(element, e);
    }
  };
}

function Eventer($element) {

  var _listeners = [];
  var element = jQuery($element).get(0);
  element._listeners = _listeners;

  this.on = function(eventName, selector, fn) {
    var event = getEventName(eventName);
    var filterFn = filterFunction(selector, fn);
    _listeners.push([event, filterFn]);
    element.addEventListener(event, filterFn, true);
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

export default function($element) {
  return new Eventer($element);
};
