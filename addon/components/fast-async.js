import Ember from 'ember';
import layout from '../templates/components/fast-async';
import asyncAction from './async-element';

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

export default asyncAction.extend({

  layout: layout,
  tagName: 'button',
  attributeBindings: ['style', 'disabled', 'type'],
  style: htmlSafeFn('touch-action: manipulation; -ms-touch-action: manipulation;'),
  type: 'button',
  text: '',
  context: null

});

