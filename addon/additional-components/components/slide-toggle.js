import Ember from 'ember';
import VelocityMixin from '../mixins/velocity-mixin';
import RecognizerMixin from '../../mixins/recognizers';
import layout from '../../templates/components/slide-toggle';

const {
  run,
  copy,
  computed,
  Component
} = Ember;

const {
  throttle,
  debounce
} = run;

export default Component.extend(RecognizerMixin, VelocityMixin, {

  tagName: 'slide-toggle',
  classNameBindings: ['_value:isOn:isOff'],

  layout: layout,

  recognizers: 'pan tap press',

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

      // TODO can this happen via this.css ?
      this.animate(element, {translateX: value + 'px'}, {duration: 1});
    }

  },

  'on-toggle': null,
  _defaultAction: 'slideToggleChange',

  _notify: function() {
    let unidirectional = this.get('unidirectional');
    let action = this.get('on-toggle');
    let defaultAction = this.get('_defaultAction');
    let target = this.get('target');
    let context = this.get('context');

    if (unidirectional || action) {

      if (target && target.send) {
        target.send(action, context);
      } else {
        action = action ? 'on-toggle' : defaultAction;
        this.sendAction(action, context);
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
