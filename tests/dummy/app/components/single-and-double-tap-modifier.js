import Component from '@ember/component';
import { run } from '@ember/runloop';
import layout from '../templates/components/recognizes-single-and-double-tap';

export default Component.extend({
  layout,
  tagName: '',
  sawSingle: false,
  sawDouble: false,

  reset: function () {
    if (!this.get('isDestroyed')) {
      this.set('sawSingle', false);
      this.set('sawDouble', false);
    }
  },

  actions: {
    doTap: function() {
      this.set('sawSingle', true);
      run.debounce(this, this.reset, 1000);
    },
  
    doDoubleTap: function() {
      this.set('sawDouble', true);
      run.debounce(this, this.reset, 1000);
    } 
  
  }

});
