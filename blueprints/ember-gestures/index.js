module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      { name: 'hammer.js', target: '2.0.6' },
      { name: 'hammer-time', target: '1.0.0'}
    ];
    return this.addBowerPackagesToProject(bowerPackages);
  }

};
