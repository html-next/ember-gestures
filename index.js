/* jshint node: true */
'use strict';

module.exports = {

  name: 'ember-gestures',

  included : function (app) {
    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
  },

  isDevelopingAddon: function() {
    return true;
  }

};
