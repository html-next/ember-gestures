/*global Hammer*/
import Ember from 'ember';

const {
  inject,
  Mixin,
  on
  } = Ember;

export default Mixin.create({

  '-gestures': inject.service('-gestures'),

  recognizers: null,
  managerOptions: null,
  __instance: null,
  __manager() {

    let instance = this.get('__instance');
    if (instance) {
      return instance;
    }

    let opts = this.getWithDefault('managerOptions', {});
    instance = new Hammer.Manager(this.element, opts);
    this.set('__instance', instance);

    return instance;
  },

  __setupRecognizers: on('didInsertElement', function() {
    let recognizers = this.get('recognizers');
    if (recognizers) {
      let manager = this.__manager();
      recognizers.forEach((recognizer) => {
        manager.add(recognizer);
      });
    }
  }),

  __teardownRecognizers: on('willDestroyElement', function() {
    let instance = this.get('__instance');
    if (instance) {
      instance.off();
      instance.destroy();
      this.set('__instance', null);
    }
  }),


  init() {
    this._super();

    // setup recognizers
    let recognizers = this.get('recognizers');
    if (recognizers) {
      recognizers = recognizers.split(' ');
      this.set('recognizers', this.get('-gestures').retreive(recognizers));
    }
  }

});
