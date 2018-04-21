import { merge, assign as _assign } from '@ember/polyfills';
import config from '../config/environment';
import Service from 'ember-gestures/services/-gestures';

const assign = _assign || merge;

let gestures = assign({}, {
  useCapture: false
});
gestures = assign(gestures, config.gestures);

export default Service.extend({
  useCapture: gestures.useCapture
});
