import Ember from 'ember';
import layout from '../templates/components/fast-async';
import asyncAction from './async-element';

const { SafeString } = Ember.Handlebars;

export default asyncAction.extend({

  layout: layout,
  tagName: 'button',
  attributeBindings: ['style', 'disabled', 'type'],
  style: new SafeString('touch-action: none;'),
  type: 'button',
  text: '',
  context: null

});

