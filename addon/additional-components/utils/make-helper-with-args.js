import Ember from 'ember';

const {
  keys
} = Ember;

export default function makeHelperWithArgs(component) {

  return function argStreamHelper() {

    var args = [].slice.apply(arguments);
    var options = args.pop();
    var hash = options.hash;
    var hashKeys = keys(hash);

    hash._anonArgs = args;
    hash._anonArgTypes = options.types;

    //Ignore keys for `<attribute>Binding`s
    for (var i = 0, l = hashKeys.length; i < l; i++) {
      var key = hashKeys[i];

      if(/Binding$/.test(key)) {
        continue;
      }

      if (options.hashTypes[key] === 'ID') {
        hash[key + 'Binding'] = hash[key];
        delete hash[key];
      }

    }

    if (Ember.Handlebars.helpers.makeViewHelper) {
      return Ember.Handlebars.helpers.makeViewHelper.call(this, [component], hash, options, options);
    }
    return Ember.Handlebars.helpers.view.helperFunction.call(this, [component], hash, options, options);

  };

}
