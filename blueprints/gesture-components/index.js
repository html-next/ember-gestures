module.exports = {
  description: 'Install helpful components and the ember-velocity-mixin',

  normalizeEntityName: function() {},

  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }

  afterInstall: function() {
     this.addAddonToProject('ember-velocity-mixin');
  }

};
