import Ember from 'ember';
import layout from '../templates/components/recognizes-single-and-double-tap';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  layout: layout,
  recognizers: 'tap double-tap',
  sawSingle: false,
  sawDouble: false,

  tap() {
    this.set('sawSingle', true);
    Ember.run.later, this, this.reset, 1000
  },

  doubleTap() {
    this.set('sawDouble', true);
    Ember.run.later, this, this.reset, 1000
  },

  reset() {
    if (!this.get('isDestroyed')) {
      this.set('sawSingle', false);
      this.set('sawDouble', false);
    }
  }
});
