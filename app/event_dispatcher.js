import { merge } from '@ember/polyfills';

import EventDispatcher from 'ember-gestures/event_dispatcher';
import config from './config/environment';

const assign = Object.assign || merge;

let gestures = assign({}, {
    emberUseCapture: false,
    removeTracking: false,
    useFastPaths: false
  });
gestures = assign(gestures, config.gestures);

export default EventDispatcher.extend({
  useCapture: gestures.emberUseCapture,
  removeTracking: gestures.removeTracking,
  useFastPaths: gestures.useFastPaths
});
