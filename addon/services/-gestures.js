import { getOwner } from "@ember/application";
import Service from "@ember/service";
import RSVP from "rsvp";
import camelize from "../utils/string/dasherized-to-camel";
import capitalize from "../utils/string/capitalize-word";

const {
  Promise, // jshint ignore:line
  defer, // jshint ignore:line
} = RSVP;

export default class Gestures extends Service {
  _recognizers = {};

  get _fastboot() {
    let owner = getOwner(this);

    return owner.lookup("service:fastboot");
  }

  get isFastBoot() {
    return this._fastboot && this._fastboot.isFastBoot;
  }

  retrieve(names) {
    let promises = names.map((name) => {
      return this.lookupRecognizer(name);
    });
    return RSVP.all(promises);
  }

  createRecognizer(name, details) {
    const eventName = camelize(details.eventName || name).toLowerCase();
    const gesture = capitalize(details.recognizer);

    const options = details.options || {};
    options.event = eventName;
    options.name = name;

    const Recognizer = new Hammer[gesture](options);
    Recognizer.initialize = defer();

    this._recognizers[name] = Recognizer;
    return Recognizer;
  }

  setupRecognizer(name, details) {
    if (this.isFastBoot) {
      return;
    }
    return (
      Promise.resolve(this.createRecognizer(name, details))

        // includes
        .then((Recognizer) => {
          if (details.include) {
            const included = details.include.map((name) => {
              return this.__speedyLookupRecognizer(name);
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
              return this.__speedyLookupRecognizer(name);
            });

            return RSVP.all(excluded).then((recognizers) => {
              Recognizer.requireFailure(recognizers);
              Recognizer.exclude = recognizers;
              Recognizer.initialize.resolve(Recognizer);
              return Recognizer;
            });
          } else {
            Recognizer.exclude = [];
            Recognizer.initialize.resolve(Recognizer);
            return Recognizer;
          }
        })
    );
  }

  __speedyLookupRecognizer(name) {
    let recognizer = this._recognizers[name];
    if (recognizer) {
      return recognizer;
    }

    const path = `ember-gesture:recognizers/${name}`;
    const details = getOwner(this).factoryFor(path);

    if (details) {
      return this.setupRecognizer(name, details.class);
    }

    return Promise.reject(
      new Error(
        `ember-gestures/recognizers/${name} was not found. You can scaffold this recognizer with 'ember g recognizer ${name}'`
      )
    );
  }

  lookupRecognizer(name) {
    let recognizer = this._recognizers[name];
    if (recognizer) {
      return recognizer.initialize.promise.then(function (recognizer) {
        return recognizer;
      });
    }

    const path = `ember-gesture:recognizers/${name}`;
    const details = getOwner(this).factoryFor(path);

    if (details) {
      return this.setupRecognizer(name, details.class);
    }

    return Promise.reject(
      new Error(
        `ember-gestures/recognizers/${name} was not found. You can scaffold this recognizer with 'ember g recognizer ${name}'`
      )
    );
  }
}
