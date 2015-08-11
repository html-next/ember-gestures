/**!
 * Due to dependency issue with ember-cli-velocity, the ember-velocity-mixin
 * is currently broken and no released version can be used
 * with an addon.  The mixin is hard included here for now and
 * ember-cli-velocity is hardwired in.
 */
import Ember from 'ember';

/* global jQuery */
/*jshint unused:false */
var $ = jQuery;

Ember.assert("Velocity.js must be installed to use this mixin.", $.Velocity != null);

$.Velocity.Promise = Ember.RSVP.Promise;

export default Ember.Mixin.create({
  /**
   * Retrieve & set css properties to element's style element.
   *
   * Retrieve value with this.css('width')
   * Set value with this.css('width', '100px')
   *
   * @param {string} property
   * @param {string} value
   * @returns {*}
   */
  css: function(property, value) {
    var args = [].slice.call(arguments, 0);
    if (!this._checkElement(args[0])) {
      // the first argument is not an element, get current view's element
      args.unshift(this.$());
    }
    if (args.length > 2){
      // setting
      this.setCSSPropertyValue.apply(this, args);
    } else {
      // getting
      return this.getCSSPropertyValue.apply(this, args);
    }
  },
  /**
   * Animate style chance and return a promise
   * @param element
   * @returns {Promise}
   */
  animate: function(element) {
    var args;
    if (this._checkElement(element)) {
      args = [].slice.call(arguments, 1);
    } else {
      args = [].slice.call(arguments, 0);
      element = this.$();
    }
    args.unshift(this.getDOMElement(element));
    return $.Velocity.animate.apply(null, args);
  },
  /**
   * Get CSS value for a property
   * @param {Ember.View|jQuery) element
   * @param {string} property
   * @returns {*}
   */
  getCSSPropertyValue: function(element, property) {
    return $.Velocity.CSS.getPropertyValue(this.getDOMElement(element), property);
  },
  /**
   * Set CSS for a property
   * @param {Ember.View|jQuery) element
   * @param {string} property
   * @param {string} value
   * @returns {*}
   */
  setCSSPropertyValue: function(element, property, value) {
    return $.Velocity.CSS.setPropertyValue(this.getDOMElement(element), property, value);
  },
  /**
   * Ensures that passes element is a jQuery element. When a view is passes, the element is returned.
   * @param {undefined|Ember.View|JQuery} element
   * @returns {*}
   */
  getDOMElement: function(element) {
    Ember.assert('element must be an Ember.View or jQuery element', this._checkElement(element));
    if (element instanceof Ember.View) {
      element = element.$();
    }
    if (element instanceof $) {
      element = element[0];
    }
    return element;
  },
  /**
   * Check if element is an Ember View or jQuery Element
   * @param element
   * @returns {boolean}
   * @private
   */
  _checkElement: function(element) {
    return element instanceof Ember.View || element instanceof $ || element instanceof HTMLElement;
  }
});
