import GestureArea from './gesture-element';

export default GestureArea.extend({

  _getParams: function(actionName) {
    let actionArguments = this._super(actionName);
    actionArguments.splice(1, 0, this.element);
    return actionArguments;
  }

});
