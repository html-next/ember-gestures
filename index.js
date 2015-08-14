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
  }

};
