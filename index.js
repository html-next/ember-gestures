/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-gestures',

  included: function (app) {
    app.import('vendor/ember-gestures/dom-guard-begin.js');
    if (app.env === "production") {
      app.import(app.bowerDirectory + '/hammer.js/hammer.min.js');
    } else {
      app.import(app.bowerDirectory + '/hammer.js/hammer.js');
    }
    app.import(app.bowerDirectory + '/hammer-time/hammer-time.js');
    app.import('vendor/ember-gestures/dom-guard-end.js');
  },

  isDevelopingAddon: function() {
    return false;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var TouchAction = require('./htmlbars-plugins/touch-action');

    registry.add('htmlbars-ast-plugin', {
      name: "touch-action",
      plugin: TouchAction
    });

  }

};
