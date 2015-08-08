import Ember from 'ember';
import RecognizersMixin from '../../../mixins/recognizers';
import { module, test } from 'qunit';

module('Unit | Mixin | recognizers');

// Replace this with your real tests.
test('it works', function(assert) {
  var RecognizersObject = Ember.Object.extend(RecognizersMixin);
  var subject = RecognizersObject.create();
  assert.ok(subject);
});
