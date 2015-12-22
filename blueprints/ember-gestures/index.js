module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      { name: 'hammer.js', target: '2.0.5' },
      { name: 'hammer-time', target: '0.3.0'}
    ];
    return this.addBowerPackagesToProject(bowerPackages);
  }

};
