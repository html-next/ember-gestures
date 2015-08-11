import Ember from 'ember';
import defaultHammerEvents from './hammer-events';
import dasherizedToCamel from 'ember-allpurpose/string/dasherized-to-camel';
import $eventer from './jquery-mock-object';

const eventEndings = {
  pan: ['Start','Move', 'End', 'Cancel', 'Left', 'Right', 'Up', 'Down'],
  pinch: ['Start','Move', 'End', 'Cancel', 'In', 'Out'],
  press: ['Up'],
  rotate: ['Start','Move', 'End', 'Cancel'],
  swipe: ['Left', 'Right', 'Up', 'Down'],
  tap: []
};

const {
  EventDispatcher,
  merge
  } = Ember;

export default EventDispatcher.extend({

  canDispatchToEventManager: false,
  useCapture: false,
  _gestures: null,
  _initializeGestures() {
    let list = getModuleList();

    // coalesce all the events
    let events = merge({}, defaultHammerEvents);
    list.forEach((name) => {
      let recognizer = this.container.lookup('ember-gestures:recognizer/' + name);
      addEvent(events, recognizer.recognizer, name);
    });

    // add them to the event dispatcher
    this.set('_gestures', events);

  },

  setup: function (addedEvents, rootElement) {

    this._initializeGestures();

    //remove undesirable events from Ember's Eventing
    let events = this.get('events');
    let event;
    merge(events, this.get('_gestures'));
    merge(events, addedEvents || {});

    if (!isNone(rootElement)) {
      set(this, 'rootElement', rootElement);
    }

    rootElement = jQuery(get(this, 'rootElement'));

    Ember.assert(fmt('You cannot use the same root element (%@) multiple times in an Ember.Application', [rootElement.selector || rootElement[0].tagName]), !rootElement.is('.ember-application'));
    Ember.assert('You cannot make a new Ember.Application using a root element that is a descendent of an existing Ember.Application', !rootElement.closest('.ember-application').length);
    Ember.assert('You cannot make a new Ember.Application using a root element that is an ancestor of an existing Ember.Application', !rootElement.find('.ember-application').length);

    rootElement.addClass('ember-application');

    Ember.assert('Unable to add "ember-application" class to rootElement. Make sure you set rootElement to the body or an element in the body.', rootElement.is('.ember-application'));

    if (this.get('useCapture')) {
      rootElement = $eventer(rootElement);
    }
    for (event in events) {
      if (events.hasOwnProperty(event)) {
        this.setupHandler(rootElement, event, events[event]);
      }
    }

  }

});




function addEvent(hash, gesture, name) {
  let eventName = dasherizedToCamel(name);
  let eventBase = eventName.toLowerCase();
  let endings = eventEndings[gesture];
  hash[eventBase] = eventName;
  endings.forEach((ending) => {
    let event = eventName + ending;
    hash[event.toLowerCase()] = event;
  });
}


// this function can be replaced in ember 1.13 with a private api
// and in ember 2.0 with a potentially public api matching 1.13's
// private api. This is a stop gap for pre-ember 1.13
function getModuleList() {
  /* global requirejs */
  let list = [];
  for(var moduleName in requirejs.entries) {
    if (requirejs.entries.hasOwnProperty(moduleName)) {
      let parts = moduleName.match(/ember-gestures\/recognizers\/(.*)/);
      if (parts) {
        list.push(parts[1]);
      }
    }
  }
  return list;

}
