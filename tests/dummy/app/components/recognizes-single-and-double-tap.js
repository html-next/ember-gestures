import Ember from 'ember';
import layout from '../templates/components/recognizes-single-and-double-tap';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

const {
  Component,
  run
  } = Ember;

export default Component.extend(RecognizerMixin, {
  layout,
  recognizers: 'tap double-tap',
  sawSingle: false,
  sawDouble: false,

  tap() {
    this.set('sawSingle', true);
    run.debounce(this, this.reset, 1000);
  },

  doubleTap() {
    this.set('sawDouble', true);
    run.debounce(this, this.reset, 1000);
  },

  reset() {
    if (!this.get('isDestroyed')) {
      this.set('sawSingle', false);
      this.set('sawDouble', false);
    }
  }

});
