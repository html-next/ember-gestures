module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      { name: 'hammer.js', source: 'git@github.com:runspired/hammer.js.git', target: 'develop' },
      { name: 'hammer-time', target: '0.2.2'}
    ];
    return this.addBowerPackagesToProject(bowerPackages);
  }

};
