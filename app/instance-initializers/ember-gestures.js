export default {
  name: 'ember-gestures',

  initialize: function (instance) {
    instance.container.lookup('service:-gestures');
  }

}
