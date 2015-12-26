/*global Hammer*/
import Ember from 'ember';
import camelize from 'ember-allpurpose/string/dasherized-to-camel';
import capitalize from 'ember-allpurpose/string/capitalize-word';

const {
  Service,
  set,
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

  makeRecognizer(name, details) {
    const eventName = details.eventName || camelize(name).toLowerCase();
    const gesture = capitalize(details.recognizer);

    const options = details.options || {};
    options.event = eventName;

    const Recognizer = new Hammer[gesture](options);
    this.registerRecognizer(name, Recognizer);

    if (details.include) {
      let included = details.include.map((name) => {
        return this.lookupRecognizer(name);
      });

      RSVP.all(included).then((recognizers) => {
        Recognizer.recognizeWith(recognizers);
      });

    }

    if (details.exclude) {
      let excluded = details.exclude.map((name) => {
        return this.lookupRecognizer(name);
      });

      RSVP.all(excluded).then((recognizers) => {
        Recognizer.requireFailure(recognizers);
      });

    }

    return Recognizer;

  },

  lookupRecognizer(name) {
    return new Promise((resolve, reject) => {
      let recognizer = this.get(`_recognizers.${name}`);
      if (recognizer) {
        resolve(recognizer);
        return;
      }

      let path = `ember-gesture:recognizers/${name}`;
      let details = this.container.lookupFactory(path);
      if (details) {
        resolve(this.makeRecognizer(name, details));
        return;
      }

      reject(`ember-gestures/recognizers/${name} was not found. You can scaffold this recognizer with 'ember g recognizer ${name}'`);

    });
  },

  registerRecognizer(name, Recognizer) {
    let registry = this.get('_recognizers');
    set(registry, name, Recognizer);
  },

  init() {
    this._super();
    this.set('_recognizers', {});
  }

});
