import Ember from 'ember';
import GestureArea from './gesture-area';

const {
  Component,
  observer,
  get: get
} = Ember;


/**!
 *
 * Provides the ability to easily build a
 * gesture-ful async-button implementation
 *
 */
export default GestureArea.extend({

  classNameBindings: ['actionState'],
  actionState: 'default',

  _getParams: function(actionName) {
    let actionArguments = this._super(actionName);

    let callbackHandler = (promise) => {
      this.set('promise', promise);
      this.set('actionState', 'pending');
    };

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
