module.exports = {

  name: 'ember-mobiletouch',

  normalizeEntityName: function() {},

  afterInstall: function() {
    var bowerPackages = [
      { name: 'hammerjs', target: 'runspired/hammerjs#develop' }
    ];
    return this.addBowerPackagesToProject(bowerPackages);
  }

};
