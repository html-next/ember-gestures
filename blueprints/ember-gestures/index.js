const VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {
  },

  afterInstall: function() {
    const packages = [
      { name: 'ember-hammertime', target: '^1.2.4' }
    ];

    const checker = new VersionChecker(this);

    if (checker.forEmber().satisfies('< 2.3')) {
      packages.push({ name: 'ember-getowner-polyfill', target: '^1.2.3' });
    }

    return this.addAddonsToProject({ packages });
  }
};
