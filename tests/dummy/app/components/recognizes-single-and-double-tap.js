import Ember from 'ember';
import layout from '../templates/components/recognizes-single-and-double-tap';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  layout: layout,
  recognizers: 'tap double-tap',
  sawSingle: false,
  sawDouble: false,

  tap() {
    this.reset();
    this.set('sawSingle', true);
  },

  doubleTap() {
    this.reset();
    this.set('sawDouble', true);
  },

  reset() {
    this.set('sawSingle', false);
    this.set('sawDouble', false);
  }
});
