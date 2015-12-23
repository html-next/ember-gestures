import Ember from 'ember';

const {
  computed,
  Mixin,
  Handlebars
} = Ember;

const {
  SafeString
} = Handlebars;

export default Mixin.create({
  attributeBindings: ['touchActionStyle:style'],
  touchActionStyle: computed(function () {
    return new SafeString(this.click ? 'touch-action: manipulation; -ms-touch-action: manipulation;' : '');
  })
});
