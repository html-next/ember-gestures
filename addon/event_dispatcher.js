import { getOwner } from '@ember/application';
import { merge } from '@ember/polyfills';
import { get, set } from '@ember/object';
import Ember from 'ember';
import defaultHammerEvents from './hammer-events';
import dasherizedToCamel from './utils/string/dasherized-to-camel';
import mobileDetection from './utils/is-mobile';
import { isNone } from '@ember/utils';

const {
  EventDispatcher,
} = Ember;


const eventEndings = {
  pan: ['Start', 'Move', 'End', 'Cancel', 'Left', 'Right', 'Up', 'Down'],
  pinch: ['Start', 'Move', 'End', 'Cancel', 'In', 'Out'],
  press: ['Up'],
  rotate: ['Start', 'Move', 'End', 'Cancel'],
  swipe: ['Left', 'Right', 'Up', 'Down'],
  tap: []
};

const assign = Object.assign || merge;

const notFocusableTypes = ['submit', 'file', 'button', 'hidden', 'reset', 'range', 'radio', 'image', 'checkbox'];

const fastFocusEvents = ['click', 'touchend'];

export default EventDispatcher.extend({

  /**
   Whether or not to cache handler paths on the element
   when `useCapture` is also true.
   This needs to be replaced by a feature flag.
   @private
   @type {boolean}
   */
  useFastPaths: false,
  useCapture: false,

  _gestures: null,
  _initializeGestures() {
    const list = getModuleList();
    const events = assign({}, defaultHammerEvents);

    list.forEach((name) => {
      const recognizer = getOwner(this).factoryFor('ember-gesture:recognizers/' + name);

      if (recognizer) {
        addEvent(events, recognizer.class.recognizer, recognizer.class.eventName || name);
      }
    });

    // add them to the event dispatcher
    this.set('_gestures', events);

  },

  _fastFocus() {
    let rootElementSelector = get(this, 'rootElement');
    let rootElement;
    if (rootElementSelector.nodeType) {
      rootElement = rootElementSelector;
    } else {
      rootElement = document.querySelector(rootElementSelector);
    }

    fastFocusEvents.forEach((event) => {
      let listener = this._gestureEvents[event] = (e) => {
        if (mobileDetection.is()) {
          let element = e.currentTarget;
          let target = e.target;

          /*
           If the click was on an input element that needs to be able to focus, recast
           the click as a "focus" event.
           This fixes tap events on mobile where keyboardShrinksView or similar is true.
           Such devices depend on the ghost click to trigger focus, but the ghost click
           will never reach the element.
           */

          //fastfocus
          if (element.tagName === 'TEXTAREA' || (element.tagName === 'INPUT' && notFocusableTypes.indexOf(element.getAttribute('type')) === -1)) {
            element.focus();

          } else if (target.tagName === 'TEXTAREA' || (target.tagName === 'INPUT' && notFocusableTypes.indexOf(target.getAttribute('type')) === -1)) {
            target.focus();
          }
        }
      };
      rootElement.addEventListener(event, listener);
    });
  },

  willDestroy() {
    let rootElementSelector = get(this, 'rootElement');
    let rootElement;
    if (rootElementSelector.nodeType) {
      rootElement = rootElementSelector;
    } else {
      rootElement = document.querySelector(rootElementSelector);
    }

    if (rootElement) {
      for (let event in this._gestureEvents) {
        rootElement.removeEventListener(event, this._gestureEvents[event]);
        delete this._gestureEvents[event];
      }
    }
    this._super(...arguments);
  },

  _finalEvents: null,

  init() {
    this._gestureEvents = Object.create(null);
    this._super(...arguments);
  },

  setup(addedEvents, rootElement) {
    this._initializeGestures();
    let events = assign({}, get(this, 'events'));

    // remove undesirable events from Ember's Eventing
    if (this.get('removeTracking')) {
      events.touchstart = null;
      events.touchmove = null;
      events.touchcancel = null;
      events.touchend = null;

      events.mousedown = null;
      events.mouseenter = null;
      events.mousemove = null;
      events.mouseleave = null;
      events.mouseup = null;

      events.drag = null;
      events.dragend = null;
      events.dragenter = null;
      events.dragleave = null;
      events.dragover = null;
      events.dragstart = null;
      events.drop = null;

      events.dblclick = null;
    }

    // delete unwanted events
    for (let event in events) {
      if (events.hasOwnProperty(event) && !events[event]) {
        delete events[event];
      }
    }

    // override default events
    this.set('events', events);

    // add our events to addition events
    let additionalEvents = assign({}, addedEvents);
    additionalEvents = assign(additionalEvents, this.get('_gestures'));

    if (!isNone(rootElement)) {
      set(this, 'rootElement', rootElement);
    }

    this._fastFocus();

    return this._super(additionalEvents, rootElement);
  }

});

function addEvent(hash, gesture, name) {
  const eventName = dasherizedToCamel(name);
  const eventBase = eventName.toLowerCase();
  const endings = eventEndings[gesture];

  hash[eventBase] = eventName;
  endings.forEach((ending) => {
    const event = eventName + ending;

    hash[event.toLowerCase()] = event;
  });
}

// this function can be replaced in ember 1.13 with a private api
// and in ember 2.0 with a potentially public api matching 1.13's
// private api. This is a stop gap for pre-ember 1.13
function getModuleList() {
  /* global requirejs */
  const list = [];

  for (let moduleName in requirejs.entries) {
    if (Object.prototype.hasOwnProperty.call(requirejs.entries, moduleName)) {
      const parts = moduleName.match(/ember-gestures\/recognizers\/(.*)/);

      if (parts && parts[1].indexOf('jshint') === -1) {
        list.push(parts[1]);
      }
    }
  }
  return list;
}
