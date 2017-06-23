/* eslint-env node */
'use strict';

let path = require('path');
let Funnel = require('broccoli-funnel');
let MergeTrees = require('broccoli-merge-trees');

module.exports = {

  name: 'ember-gestures',

  included: function (app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import('vendor/hammer.js');
    }
  },

  treeForVendor(vendorTree) {
    let trees = [];
    let hammerTree = new Funnel(path.dirname(require.resolve('hammerjs')), {
      files: ['hammer.js']
    });

    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }

    trees.push(hammerTree);

    return new MergeTrees(trees);
  },

  isDevelopingAddon: function() {
    return false;
  }

};
