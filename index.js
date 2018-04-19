'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;

module.exports = {

  name: 'ember-gestures',

  included(app) {
    this._super.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    if (typeof app.import !== 'function') {
      throw new Error('ember-gestures is being used within another addon or engine '
       + 'and is having trouble registering itself to the parent application.');
    }

    app.import('vendor/hammer.js');
    app.import('vendor/AnimationFrame.js');
    app.import('vendor/marked.js');
  },

  treeForVendor(vendorTree) {
    let trees = [];
    let hammerTree = new Funnel(path.dirname(require.resolve('hammerjs')), {
      files: ['hammer.js']
    });
    hammerTree = map(hammerTree, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    let animationFrameTree = new Funnel(path.dirname(require.resolve('animation-frame/AnimationFrame.js')), {
      files: ['AnimationFrame.js'],
    });

    let markedTree = new Funnel(path.dirname(require.resolve('marked')), {
      files: ['marked.js'],
    });

    if (vendorTree !== undefined) {
      trees.push(vendorTree);
    }

    trees.push(hammerTree, animationFrameTree, markedTree);

    return new MergeTrees(trees);
  },

  isDevelopingAddon() {
    return false;
  }

};
