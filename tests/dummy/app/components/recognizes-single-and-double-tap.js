import Ember from 'ember';
import layout from '../templates/components/recognizes-single-and-double-tap';
import RecognizerMixin from 'ember-gestures/mixins/recognizers';

export default Ember.Component.extend(RecognizerMixin, {
  layout: layout,
  recognizers: 'single-tap double-tap',
  sawSingle: false,
  sawDouble: false,
  singleTap: function() {
    this.reset();
    this.set('sawSingle', true);
  },
  doubleTap: function() {
    this.reset();
    this.set('sawDouble', true);
  },
  reset: function() {
    this.set('sawSingle', false);
    this.set('sawDouble', false);
  }
});
