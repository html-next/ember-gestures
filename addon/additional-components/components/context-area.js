import ActionArea from "./action-area";
import Ember from "ember";

const {
  on
} = Ember;

export default ActionArea.extend({

  _contextualizeParams: on('didInsertElement', function() {
    var params = this.get('_defaultParams') || [];
    params.push(this.element);
    params.push(this);
    this.set('_defaultParams', params);
  })

});
