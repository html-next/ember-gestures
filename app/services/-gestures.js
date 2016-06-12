import Ember from 'ember';
import config from '../config/environment';
import Service from 'ember-gestures/services/-gestures';

const {
	isEmpty
} = Ember;

let merge;
if (!isEmpty(Ember.assign)) {
	merge = Ember.assign;
} else {
	merge = Ember.merge;
}

let gestures = merge({}, {
  useCapture: false
});
gestures = merge(gestures, config.gestures);

export default Service.extend({
  useCapture: gestures.useCapture
});
