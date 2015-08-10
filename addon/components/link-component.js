import Ember from 'ember';

let LinkComponent = Ember.LinkComponent || Ember.LinkView;

const {
  computed
  } = Ember;

export default LinkComponent.reopen({

  attributeBindings: ['style', 'href', 'title'],
  style: 'touch-action: none;'

});
