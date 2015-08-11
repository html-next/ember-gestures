import EventDispatcher from 'ember-gestures/event-dispatcher';
import config from './config/environment';

export default EventDispatcher.extend({
  useCapture: config.useCapture
});
