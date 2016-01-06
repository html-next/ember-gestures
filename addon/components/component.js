import Ember from 'ember';
import TouchActionMixin from '../mixins/touch-action';

const {
  Component
} = Ember;

export default Component.reopen(TouchActionMixin);
