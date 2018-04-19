import layout from '../templates/components/fast-async';
import asyncAction from './async-element';
import { htmlSafe } from "@ember/string";

export default asyncAction.extend({
  layout: layout,
  tagName: 'button',
  attributeBindings: ['style', 'disabled', 'type'],
  style: htmlSafe('touch-action: manipulation; -ms-touch-action: manipulation;'),
  type: 'button',
  text: '',
  context: null
});

