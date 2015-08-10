import Ember from 'ember';
import defaultHammerEvents from './hammer-events';
import dasherizedToCamel from 'ember-allpurpose/string/dasherized-to-camel';

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
    var events = this.get('events');
    merge(events, this.get('_gestures'));

    //setup rootElement and  event listeners
    this._super(addedEvents, rootElement);

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
