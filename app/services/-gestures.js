import Ember from 'ember';
import config from '../config/environment';
import Service from 'ember-gestures/services/-gestures';

const merge = Ember.assign || Ember.merge;

let gestures = merge({}, {
  useCapture: false
});
gestures = merge(gestures, config.gestures);

export default Service.extend({
  useCapture: gestures.useCapture
});
