// jshint node:true
/* global process */
'use strict';

module.exports = {

  name: 'ember-gestures',

  included: function (app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      if (app.env === "production") {
        app.import(app.bowerDirectory + '/hammer.js/hammer.min.js');
      } else {
        app.import(app.bowerDirectory + '/hammer.js/hammer.js');
      }
      app.import(app.bowerDirectory + '/hammer-time/hammer-time.js');
    }
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
