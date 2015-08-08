import Ember from "ember";
import toCamel from "../utils/dasherized-to-camel";
import verticalPan from "../mixins/vertical-pan";
import verticalSwipe from "../mixins/vertical-swipe";
import rotate from "../mixins/rotate";
import pinch from "../mixins/pinch";

function makeActionHandler(event, action) {

  return function actionHandler() {

    var target = this.get('target');
    var context;

    if (target && target.send) {
      context = this._getParams(action);
      target.send.apply(this, context);
    } else {
      context = this._getParams(event + 'Action');
      this.sendAction.apply(this, context);
    }

  };

}

export default Ember.Component.extend(verticalPan, verticalSwipe, rotate, pinch, {

  classBindings: ['requestState'],

  alwaysCreateHammerInstance: false,

  _defaultParams: null,
  _getParams: function(actionName) {
    var args = this.getWithDefault('_anonArgs', []);
    var argTypes = this.getWithDefault('_anonArgTypes', []);
    var actionArguments = [actionName];
    var defaultParams = this.get('_defaultParams');

    if (defaultParams) {
      actionArguments = actionArguments.concat(defaultParams);
    }

    // Some of the arguments passed in might be bound values (ID type according to
    // the option types stored in _argTypes). If so, we get the stream and retrieve
    // the value when the button is clicked. Once the Stream API is public,
    // the helper will be converted to pass in a concatenated array of streams
    for (var index = 0, length = args.length; index < length; index++) {
      var value = args[index];

      if (argTypes[index] === 'ID') {
        value = this._parentView.getStream(value).value();
      }

      actionArguments.push(value);

    }

    return actionArguments;

  },

  init: function () {

    this._super();

    var v;
    var attrs = this.get('attrs') || this;

    for (var key in attrs) {

      if (attrs.hasOwnProperty(key)) {
        v = attrs[key];
        if (v === 'toString') {
          continue;
        } // ignore useless items
        if (Ember.typeOf(v) === 'function') {
          continue;
        }

        //setup listener for key
        if (key.indexOf('on-') === 0) {
          let event = toCamel(key.substr(3));
          let action = attrs[key];

          this.set(event + 'Action', action);

          this.set(event, makeActionHandler(event, action));
        }

      }
    }

  }

});
