module.exports = {

  name: 'ember-gestures',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      //{ name: 'hammer.js', target: '2.1.0' },
      { name: 'hammer-time', target: '0.3.0'}
    ];
    return this.addBowerPackagesToProject(bowerPackages);
  }

};
