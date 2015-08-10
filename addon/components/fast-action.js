import Ember from 'ember';
import layout from '../templates/components/fast-action';

export default Ember.Component.extend({
  layout: layout,

  tagName: 'button',
  attributeBindings: ['style'],
  style: 'touch-action: none;'

});
