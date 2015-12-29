import Ember from 'ember';
import defaultHammerEvents from './hammer-events';
import dasherizedToCamel from 'ember-allpurpose/string/dasherized-to-camel';
import $eventer from './eventer';
import RegistryWalker from './registry-walker';
import jQuery from 'jquery';
import mobileDetection from './utils/is-mobile';
import getOwner from 'ember-getowner-polyfill';

const eventEndings = {
  pan: ['Start','Move', 'End', 'Cancel', 'Left', 'Right', 'Up', 'Down'],
  pinch: ['Start','Move', 'End', 'Cancel', 'In', 'Out'],
  press: ['Up'],
  rotate: ['Start','Move', 'End', 'Cancel'],
  swipe: ['Left', 'Right', 'Up', 'Down'],
  tap: []
};

const {
  assert,
  EventDispatcher,
  isNone,
  set,
  get
  } = Ember;

const assign = Ember.assign || Ember.merge;

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

  canDispatchToEventManager: false,

  _gestures: null,
  _initializeGestures() {
    const owner = this.container;
    const list = getModuleList();
    const events = assign({}, defaultHammerEvents);

    list.forEach((name) => {
      const recognizer = owner.lookupFactory('ember-gesture:recognizers/' + name);

      if (recognizer && !recognizer.ignoreEvents) {
        addEvent(events, recognizer.recognizer, name);
      }
    });

    // add them to the event dispatcher
    this.set('_gestures', events);

  },

  _fastFocus() {
    let $root = jQuery(this.get('rootElement'));
    $root.on('click.ember-gestures, touchend.ember-gestures', function (e) {

      /*
       Implements fastfocus mechanisms on mobile web/Cordova
       */
      if (mobileDetection.is()) {
        var $element = jQuery(e.currentTarget);
        var $target = jQuery(e.target);

        /*
         If the click was on an input element that needs to be able to focus, recast
         the click as a "focus" event.
         This fixes tap events on mobile where keyboardShrinksView or similar is true.
         Such devices depend on the ghost click to trigger focus, but the ghost click
         will never reach the element.
         */
        var notFocusableTypes = ['submit', 'file', 'button', 'hidden', 'reset', 'range', 'radio', 'image', 'checkbox'];

        //fastfocus
        if ($element.is('textarea') || ($element.is('input') && notFocusableTypes.indexOf($element.attr('type')) === -1)) {
          $element.focus();

        } else if ($target.is('textarea') || ($target.is('input') && notFocusableTypes.indexOf($target.attr('type')) === -1)) {
          $target.focus();
        }
      }

    });

  },

  willDestroy() {
    this._super();
    jQuery(this.get('rootElement')).off('.ember-gestures');
  },

  _finalEvents: null,

  setup(addedEvents, rootElement) {
    this._initializeGestures();
    this._fastFocus();
    const events = this._finalEvents = assign({}, get(this, 'events'));
    const owner = getOwner(this) || this.container;

    const viewRegistry = owner.lookup('-view-registry:main') || Ember.View.views;
    let event;

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

      events.dblclick = null;
    }

    // merge custom events into Ember's Eventing
    assign(events, addedEvents || {});

    // delete unwanted events
    for (event in events) {
      if (events.hasOwnProperty(event)) {
        if (!events[event]) {
          delete events[event];
        }
      }

      // merge our events into Ember's Eventing
      assign(events, this.get('_gestures'));

      if (!isNone(rootElement)) {
        set(this, 'rootElement', rootElement);
      }

      rootElement = jQuery(get(this, 'rootElement'));
      const selector = (rootElement.selector || rootElement[0].tagName);

      assert(`You cannot use the same root element (${selector}) multiple times in an Ember.Application`, !rootElement.is('.ember-application'));
      assert('You cannot make a new Ember.Application using a root element that is a descendent of an existing Ember.Application', !rootElement.closest('.ember-application').length);
      assert('You cannot make a new Ember.Application using a root element that is an ancestor of an existing Ember.Application', !rootElement.find('.ember-application').length);

      rootElement.addClass('ember-application');

      assert('Unable to add "ember-application" class to rootElement. Make sure you set rootElement to the body or an element in the body.', rootElement.is('.ember-application'));

      if (this.get('useCapture')) {
        let walker = new RegistryWalker(viewRegistry);
        rootElement = $eventer(rootElement, walker, this.get('useFastPaths'));
      }
      for (event in events) {
        if (events.hasOwnProperty(event)) {
          this.setupHandler(rootElement, event, events[event]);
        }
      }

    }
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

  for(var moduleName in requirejs.entries) {
    if (requirejs.entries.hasOwnProperty(moduleName)) {
      const parts = moduleName.match(/ember-gestures\/recognizers\/(.*)/);

      if (parts && parts[1].indexOf('jshint') === -1) {
        list.push(parts[1]);
      }
    }
  }
  return list;
}
