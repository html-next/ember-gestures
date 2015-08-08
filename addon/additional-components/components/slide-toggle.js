import Ember from "ember";
import VelocityMixin from '../mixins/ember-velocity-mixin';

const {
  run,
  copy,
  computed
} = Ember;

const {
  throttle,
  debounce
} = run;

export default Ember.Component.extend(VelocityMixin, {

  tagName: 'slide-toggle',
  classNameBindings: ['_value:isOn:isOff'],

  layoutName: 'slide-toggle',

  unidirectional: false,
  value: false,
  _value: false,
  target: null,

  __updateCSS: function (value) {

    if (!value) {
      this.$('.slideToggleButton').removeAttr('style');
    } else {

      var element = this.$('.slideToggleButton').get(0);
      var maxMovement = element.clientWidth * 0.75;

      if (Math.abs(value) > maxMovement) {
        value = (value < 0) ? 0 : maxMovement;
      } else if (value < 0) {
        value = maxMovement + value;
      }

      Ember.Logger.debug('updating css', value);

      // TODO can this happen via this.css ?
      this.animate(element, {translateX: value + 'px'}, {duration: 1});
    }

  },

  'on-toggle': null,
  _defaultAction: 'slideToggleChange',
  _getParams: function(actionName) {
    var args = this.getWithDefault('_anonArgs', []);
    var argTypes = this.getWithDefault('_anonArgTypes', []);
    var value = this.get('_value');
    var actionArguments = [actionName, value];

    // Some of the arguments passed in might be bound values (ID type according to
    // the option types stored in _argTypes). If so, we get the stream and retrieve
    // the value when the button is clicked. Once the Stream API is public,
    // the helper will be converted to pass in a concatenated array of streams
    for (var index = 0, length = args.length; index < length; index++) {
      value = args[index];

      if (argTypes[index] === 'ID') {
        value = this._parentView.getStream(value).value();
      }

      actionArguments.push(value);

    }

    return actionArguments;

  },

  _notify: function() {
    var unidirectional = this.get('unidirectional');
    var action = this.get('on-toggle');
    var defaultAction = this.get('_defaultAction');
    var target = this.get('target');
    var context;

    if (unidirectional || action) {

      if (target && target.send) {
        context = this._getParams(action || defaultAction);
        target.send.apply(this, context);
      } else {
        action = action ? 'on-toggle' : 'defaultAction';
        context = this._getParams(action);
        this.sendAction.apply(this, context);
      }

    }

  },

  _trigger: function (dX) {

    this.__updateCSS();

    if ((dX && dX > 8) || (!dX && dX !== 0)) {
      this.toggleProperty('_value');
      this._notify();
    }
    return false;
  },

  pan: function (e) {

    var allowPanRight = !this.get('_value');
    var dX = e.originalEvent.gesture.deltaX;

    if (allowPanRight) {
      if (dX < 0) { dX = 0; }
    } else {
      if (dX > 0) { dX = 0; }
    }

    throttle(this, this.__updateCSS, dX, 2);
    //schedule the dismissal
    debounce(this, this._trigger, Math.abs(dX), 250);
    return false;
  },

  tap: function () {
    return this._trigger();
  },

  press: function () {
    return this._trigger();
  },

  init: function() {
    this._super();

    var value = this.get('value');

    // setup unidirection flow if desired
    if (!this.get('unidirectional')) {
      this.set('_value', computed.alias('value'));
    } else {
      this.set('_value', copy(value, true));
    }

  }

});
