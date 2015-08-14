import Ember from 'ember';
import layout from '../templates/components/fast-action';

const { SafeString } = Ember.Handlebars;
export default Ember.Component.extend({
  layout: layout,

  tagName: 'button',
  attributeBindings: ['style', 'type'],
  style: new SafeString('touch-action: manipulation; -ms-touch-action: manipulation;'),
  type: 'button',
  text: '',
  action: '',
  context: '',

  click: function() {
    this.sendAction('action', this.get('context'));
  }

});
