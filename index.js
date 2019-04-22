'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const BroccoliMergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const resolve = require('resolve');

module.exports = {

  name: 'ember-gestures',

  included() {
    this._super.included.apply(this, arguments);
    let app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      let current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    app.import('vendor/hammerjs/hammer.js');
    app.import('vendor/animation-frame/AnimationFrame.js');
  },

  treeForVendor(tree) {
    let trees = [];

    let hammerJs = fastbootTransform(new Funnel(this.pathBase('hammerjs'), {
      files: ['hammer.js'],
      destDir: 'hammerjs'
    }));

    let animationFrame = fastbootTransform(new Funnel(this.pathBase('animation-frame'), {
      files: ['AnimationFrame.js'],
      destDir: 'animation-frame'
    }));

    trees = trees.concat([hammerJs, animationFrame]);

    if (tree) {
      trees.push(tree);
    }

    return new BroccoliMergeTrees(trees);
  },

  /*
    Rely on the `resolve` package to mimic node's resolve algorithm.
    It finds the modules in a manner that works for npm 2.x,
    3.x, and yarn in both the addon itself and projects that depend on this addon.
    This is an edge case b/c some modules do not have a main
    module we can require.resolve through node itself and similarily ember-cli
    does not have such a hack for the same reason.
  */
  pathBase(packageName) {
    return path.dirname(resolve.sync(`${packageName}/package.json`, { basedir: __dirname }));
  },

  isDevelopingAddon() {
    return false;
  }

};
