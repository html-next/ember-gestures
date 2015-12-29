/* global Hammer */
import Ember from 'ember';
import camelize from 'ember-allpurpose/string/dasherized-to-camel';
import capitalize from 'ember-allpurpose/string/capitalize-word';

const {
  Service,
  RSVP
} = Ember;

const {
  Promise  // jshint ignore:line
} = RSVP;

export default Service.extend({

  _recognizers: null,

  retrieve(names) {
    let promises = names.map((name) => { return this.lookupRecognizer(name); });
    return RSVP.all(promises);
  },

  createRecognizer(name, details) {
    const eventName = details.eventName || camelize(name).toLowerCase();
    const gesture = capitalize(details.recognizer);

    const options = details.options || {};
    options.event = eventName;
    options.name = name;

    const Recognizer = new Hammer[gesture](options);

    this.set(`_recognizers.${name}`, Recognizer);
    return Recognizer;
  },

  setupRecognizer(name, details) {
    return Promise.resolve(this.createRecognizer(name, details))

      // includes
      .then((Recognizer) => {
        if (details.include) {
          const included = details.include.map((name) => {
            return this.lookupRecognizer(name);
          });
          return RSVP.all(included).then((recognizers) => {
            Recognizer.recognizeWith(recognizers);
            return Recognizer;
          });
        }
        return Recognizer;
      })

      // excludes
      .then((Recognizer) => {
        if (details.exclude) {
          const excluded = details.exclude.map((name) => {
            return this.lookupRecognizer(name);
          });

          return RSVP.all(excluded).then((recognizers) => {
            Recognizer.requireFailure(recognizers);
            Recognizer.exclude = recognizers;
            return Recognizer;
          });
        } else {
          Recognizer.exclude = [];
          return Recognizer;
        }
      });
  },

  lookupRecognizer(name) {
    let recognizer = this.get(`_recognizers.${name}`);
    if (recognizer) {
      return Promise.resolve(recognizer);
    }

    const path = `ember-gesture:recognizers/${name}`;
    const details = this.container.lookupFactory(path);

    if (details) {
      return this.setupRecognizer(name, details);
    }

    return Promise.reject(`ember-gestures/recognizers/${name} was not found. You can scaffold this recognizer with 'ember g recognizer ${name}'`);
  },

  init() {
    this._super();
    this._recognizers = {};
  }

});
