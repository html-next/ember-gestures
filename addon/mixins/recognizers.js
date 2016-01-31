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

    const opts = this.get('managerOptions') || { domEvents: true };

    opts.useCapture = this.get('-gestures.useCapture');
    instance = new Hammer.Manager(this.element, opts);
    this.set('__instance', instance);

    return instance;
  },

  __setupRecognizers: on('didInsertElement', function() {
    const promise = this.get('recognizers');
    if (promise) {
      promise.then((recognizers) => {
        if (this.get('isDestroyed')) {
          return;
        }
        const manager = this.__manager();
        // sort the recognizers
        for (let i = 0; i < recognizers.length; i++) {
          const r = recognizers[i];
          let currentIndex = i;
          if (r.exclude.length) {
            for (let j = 0; j < r.exclude.length; j++) {
              const newIndex = recognizers.indexOf(r.exclude[j]);
              if (newIndex > 0 && currentIndex < newIndex) {
                recognizers.splice(currentIndex, 1);
                recognizers.splice(newIndex, 0, r);
                currentIndex = newIndex;
              }
            }
          }
        }

        for (let i = 0; i < recognizers.length; i++) {
          manager.add(recognizers[i]);
        }
      });
    }
  }),

  __teardownRecognizers: on('willDestroyElement', function() {
    let instance = this.get('__instance');
    if (instance) {
      //instance.off();
      instance.destroy();
      this.set('__instance', null);
    }
  }),


  init() {
    this._super();

    // setup recognizers
    let recognizers = this.get('recognizers');
    if (recognizers) {
      this.set('recognizers', this.get('-gestures').retrieve(recognizers.split(' ')));
    }
  }

});
