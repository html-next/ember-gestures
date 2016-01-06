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
    // TODO: handle this similarily to how the touch-action htmlbars ast transformer
    // handles things - aka - sometimes we don't want to add this class, see
    // ember-gestures/htmlbars-plugins/touch-action.js for those caveats
    return new SafeString('touch-action: manipulation; -ms-touch-action: manipulation;');
  })
});
