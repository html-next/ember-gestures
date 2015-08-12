import Ember from 'ember';

const { SafeString } = Ember.Handlebars;

let LinkComponent = Ember.LinkComponent || Ember.LinkView;

export default LinkComponent.reopen({

  attributeBindings: ['style', 'href', 'title'],
  style: new SafeString('touch-action: none;')

});
