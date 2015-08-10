/*global Hammer*/
import Ember from 'ember';
import camelize from '../../../ember-allpurpose/addon/string/dasherized-to-camel';
import capitalize from '../../../ember-allpurpose/addon/string/capitalize-word';

const {
  get: get,
  Service,
  set: set
  } = Ember;

export default Service.extend({

  _registry: null,

  isDispatching: false,
  activeManager: null,
  _managers: null,
  removeManager(manager) {

  },
  registerManager(manager) {

  },
  activateManager(manager) {

  },

  retreive(names) {
    return names.map(this.lookup);
  },

  makeRecognizer(name, details) {

    let eventName = name.toLowerCase();
    let gesture = capitalize(details.recognizer);

    let options = details.options || {};
    options.event = eventName;

    let Recognizer = new Hammer[gesture](options);

    if (details.include) {
      let included = details.include.map((name) => {
        return this.lookup(name);
      });

      RSVP.all(included).then((recognizers) => {
        Recognizer.recognizeWith(recognizers);
      });

    }

    if (details.exclude) {
      let excluded = details.exclude.map((name) => {
        return this.lookup(name);
      });

      RSVP.all(excluded).then((recognizers) => {
        Recognizer.requireFailure(recognizers);
      });

    }

    this.register(name, Recognizer);

  },

  lookup(name) {
    return Promise((resolve, reject) => {
      let recognizer = this.get(`_registry.${name}`);
      if (recognizer) {
        resolve(recognizer);
        return;
      }

      let details = this.container.lookupFactory(`recognizer:${name}`);
      if (details) {
        resolve(makeRecognizer(name, details));
      }

      reject(`ember-gestures/recognizers/${name} was not found. You can scaffold this recognizer with 'ember g recognizer ${name}'`);

    });
  },

  register(name, Recognizer) {
    let registry = this.get('_registry');
    set(registry, name, Recognizer);
  },

  init() {
    this._super();
    this.set('_registry', {});
  }

});
