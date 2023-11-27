import { merge } from '@ember/polyfills';
import config from '../config/environment';
import Service from 'ember-gestures/services/-gestures';

const assign = Object.assign || merge;

let gestures = assign({}, {
  useCapture: false
});
gestures = assign(gestures, config.gestures);

export default Service.extend({
  useCapture: gestures.useCapture
});
