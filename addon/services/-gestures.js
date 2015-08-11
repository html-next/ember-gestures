/*global Hammer*/
import Ember from 'ember';
import camelize from 'ember-allpurpose/string/dasherized-to-camel';
import capitalize from 'ember-allpurpose/string/capitalize-word';

const {
  Service,
  set: set,
  RSVP
  } = Ember;

const {
  Promise
  } = RSVP;

export default Service.extend({

  _registry: null,

  retreive(names) {
    Ember.Logger.debug('retreiving', names);
    return names.map(this.lookup);
  },

  makeRecognizer(name, details) {

    let eventName = camelize(name).toLowerCase();
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
    return new Promise((resolve, reject) => {
      let recognizer = this.get(`_registry.${name}`);
      if (recognizer) {
        resolve(recognizer);
        return;
      }

      let details = this.container.lookupFactory(`ember-gesture:recognizers/:${name}`);
      if (details) {
        resolve(this.makeRecognizer(name, details));
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
