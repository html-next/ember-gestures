module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      { name: 'hammer.js', source: 'git@github.com:runspired/hammer.js.git', target: 'develop' },
      { name: 'hammer-time', source: 'git@github.com:hammerjs/hammer-time.git', target: 'master' }
    ];
    return this.addBowerPackagesToProject(bowerPackages);
  }

};
