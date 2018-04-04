import Ember from 'ember';
import layout from '../templates/components/fast-action';

const {
  String: {
    htmlSafe,
  },
  Handlebars: {
    SafeString
  }
} = Ember;

const htmlSafeFn = (typeof htmlSafe === 'function') ?
  (str) => htmlSafe(str) :
  (str) => new SafeString(str);

export default Ember.Component.extend({
  layout: layout,

  tagName: 'button',
  attributeBindings: ['style', 'type'],
  style: htmlSafeFn('touch-action: manipulation; -ms-touch-action: manipulation;'),
  type: 'button',
  text: '',
  action: '',
  context: '',

  click: function() {
    this.sendAction('action', this.get('context'));
  }

});
