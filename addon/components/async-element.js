import Ember from 'ember';
import GestureArea from './gesture-element';

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
    get(this, 'promise')
      .then(() => {
        if (!this.isDestroyed) {
          this.set('actionState', 'fulfilled');
        }})
      .catch(() => {
        if (!this.isDestroyed) {
          this.set('actionState', 'rejected');
        }});
  })



});
