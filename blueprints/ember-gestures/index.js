var VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var addon = this;
    var bowerPackages = [
      { name: 'hammer.js', target: '2.0.6' }
    ];
    var addonPackages = [
      { name: 'ember-hammertime', target: '1.0.0' }
    ];

    var checker = new VersionChecker(addon);

    if (checker.forEmber().satisfies('< 2.3')) {
      addonPackages.push({name: 'ember-getowner-polyfill', target: '^1.0.0'});
    }

    return addon.addBowerPackagesToProject(bowerPackages).then(function() {
      return addon.addAddonsToProject({ packages: addonPackages });
    });
  }
};
