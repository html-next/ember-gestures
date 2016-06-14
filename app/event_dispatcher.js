import Ember from 'ember';
import EventDispatcher from 'ember-gestures/event_dispatcher';
import config from './config/environment';

const merge = Ember.assign || Ember.merge;

let gestures = merge({}, {
    emberUseCapture: false,
    removeTracking: false,
    useFastPaths: false
  });
gestures = merge(gestures, config.gestures);

export default EventDispatcher.extend({
  useCapture: gestures.emberUseCapture,
  removeTracking: gestures.removeTracking,
  useFastPaths: gestures.useFastPaths
});
