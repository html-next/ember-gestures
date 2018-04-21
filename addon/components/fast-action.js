import Component from '@ember/component';
import layout from '../templates/components/fast-action';
import { htmlSafe } from "@ember/string";

export default Component.extend({
  layout: layout,
  tagName: 'button',
  attributeBindings: ['style', 'type'],
  style: htmlSafe('touch-action: manipulation; -ms-touch-action: manipulation;'),
  type: 'button',
  text: '',
  action: '',
  context: '',

  click: function() {
    this.sendAction('action', this.get('context')); // eslint-disable-line
  }

});
