import { typeOf } from '@ember/utils';
import Component from '@ember/component';
import layout from '../templates/components/gesture-element';
import RecognizerMixin from '../mixins/recognizers';
import toCamel from '../utils/string/dasherized-to-camel';


function makeActionHandler(event, action) {

  return function actionHandler() {

    var target = this.get('target');
    let args;

    if (target && target.send) {
      args = this._getParams(action);
      target.send.apply(this, args);
    } else {
      args = this._getParams(event + 'Action');
      this.sendAction.apply(this, args);
    }

  };

}

/**!
 *
 * Provides the ability to easily build a
 * gesture-ful async-button implementation
 *
 */
export default Component.extend(RecognizerMixin, {

  layout: layout,

  context: '',
  _getParams: function(actionName) {
    let context = this.get('context');
    return [actionName, context];
  },

  init() {

    this._super();

    var v;
    var attrs = this.get('attrs') || this;

    for (var key in attrs) {

      if (attrs.hasOwnProperty(key)) {
        v = attrs[key];
        if (v === 'toString') {
          continue;
        } // ignore useless items
        if (typeOf(v) === 'function') {
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
