import Ember from 'ember';
import EventDispatcher from 'ember-gestures/event_dispatcher';
import config from './config/environment';

let gestures = Ember.merge({}, {
    emberUseCapture: false,
    removeTracking: false,
    useFastPaths: false
  });
gestures = Ember.merge(gestures, config.gestures);

export default EventDispatcher.extend({
  useCapture: gestures.emberUseCapture,
  removeTracking: gestures.removeTracking,
  useFastPaths: gestures.useFastPaths
});
