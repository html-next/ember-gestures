import ActionArea from "./action-area";
import Ember from "ember";

const {
  observer,
  get: get
} = Ember;

/**!
 *
 * Provides the ability to easily build a
 * gesture-ful async-button implementation
 *
 */
export default ActionArea.extend({

  classNameBindings: ['actionState'],
  actionState: 'default',

  _getParams: function(actionName) {

    var actionArguments = this._super(actionName);
    var Component = this;

    function callbackHandler(promise) {
      Component.set('promise', promise);
      Component.set('actionState', 'pending');
    }

    actionArguments.splice(1, 0, callbackHandler);

    return actionArguments;

  },

  __observePromiseState: observer('promise', function promiseTheComponentState() {
    var Component = this;
    get(this, 'promise').then(function() {
      if (!Component.isDestroyed) {
        Component.set('actionState', 'fulfilled');
      }
    }).catch(function() {
      if (!Component.isDestroyed) {
        Component.set('actionState', 'rejected');
      }
    });
  })



});
