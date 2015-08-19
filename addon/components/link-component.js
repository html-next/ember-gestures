import Ember from 'ember';

const { SafeString } = Ember.Handlebars;

let LinkComponent = Ember.LinkComponent || Ember.LinkView;

export default LinkComponent.reopen({

  attributeBindings: ['style'],
  style: new SafeString('touch-action: manipulation; -ms-touch-action: manipulation;')

});
