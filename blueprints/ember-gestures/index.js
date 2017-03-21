var VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var addon = this;

    var addonPackages = [
      { name: 'ember-hammertime', target: '^1.1.2' }
    ];

    var checker = new VersionChecker(addon);

    if (checker.forEmber().satisfies('< 2.3')) {
      addonPackages.push({name: 'ember-getowner-polyfill', target: '^1.0.0'});
    }

    return addon.addAddonsToProject({ packages: addonPackages })
  }
};
