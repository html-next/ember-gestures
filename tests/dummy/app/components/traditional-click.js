import Ember from 'ember';
import layout from '../templates/components/traditional-click';

const {
  Component,
  run
  } = Ember;

export default Component.extend({
  layout,
  sawClick: false,

  click() {
    this.set('sawClick', true);
    run.debounce(this, this.reset, 1000);
  },
  reset() {
    if (!this.get('isDestroyed')) {
      this.set('sawClick', false);
    }
  }

});
