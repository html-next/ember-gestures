var RSVP = require('rsvp');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      { name: 'hammer.js', target: '2.0.6' }
    ];
    var addonPackages = [
      {name: 'ember-hammertime', target: '1.0.0'}
    ];

    var checker = new VersionChecker(this);
    if (checker.for('ember', 'bower').satisfies('>= 2.3')) {
      addonPackages.push({name: 'ember-getowner-polyfill', target: '^1.0.0'});
    }

    return RSVP.all([
      this.addBowerPackagesToProject(bowerPackages),
      this.addAddonsToProject({ packages: addonPackages })
    ]);
  }

};
