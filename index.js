/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-gestures',

  included : function (app) {
    app.import(app.bowerDirectory + '/hammerjs/hammer.min.js');
    app.import(app.bowerDirectory + '/hammer-time/hammer-time.js');
  },

  isDevelopingAddon: function() {
    return true;
  },

  setupPreprocessorRegistry: function(type, registry) {
    var TouchAction = require('./htmlbars-plugins/touch-action');

    registry.add('htmlbars-ast-plugin', {
      name: "touch-action",
      plugin: TouchAction
    });

  }

};
