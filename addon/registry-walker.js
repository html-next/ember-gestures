import Ember from 'ember';

const {
  run
  } = Ember;

export default function ViewWalker(registry) {

  function inRegistry(id) {
    return !!registry[id];
  }

  this.closest = function(closest) {
    do {
      if (closest.id && inRegistry(closest.id)) {
        return ['id', closest];
      }
      if (closest.hasAttribute('data-ember-action')) {
        return ['action', closest];
      }
    } while (closest = closest.parentNode);

    return null;
  };

}
