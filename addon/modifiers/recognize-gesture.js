import Modifier from "ember-modifier";
import { registerDestructor } from "@ember/destroyable";

function cleanup(instance) {
  if (instance.manager !== null) {
    instance.manager.destroy();
    instance.manager = null;
  }
}

export default class RecognizeGestureModifier extends Modifier {
  constructor(owner) {
    super(...arguments);
    this.gestures = owner.lookup("service:-gestures");

    registerDestructor(this, cleanup);
  }

  modify(element, positional, named) {
    const gestureNames = [...positional];
    this.recognizers = this.gestures.retrieve(gestureNames);
    const managerOptions =
      named && Object.keys(named).length > 0
        ? Object.assign({}, named)
        : { domEvents: true };
    managerOptions.useCapture = this.gestures.useCapture;
    if (this.recognizers) {
      element.style["touch-action"] = "manipulation";
      element.style["-ms-touch-action"] = "manipulation";
      this.recognizers.then((recognizers) => {
        if (this.isDestroyed) return;
        this.sortRecognizers(recognizers);
        this.manager = new Hammer.Manager(element, managerOptions);
        recognizers.forEach((recognizer) => {
          this.manager.add(recognizer);
        });
      });
    }
  }

  // Move each recognizer after all recognizers it excludes in the list - why?
  sortRecognizers(recognizers) {
    for (let i = 0; i < recognizers.length; i++) {
      const r = recognizers[i];
      let currentIndex = i;
      if (r.exclude.length) {
        for (let j = 0; j < r.exclude.length; j++) {
          const newIndex = recognizers.indexOf(r.exclude[j]);
          if (newIndex > 0 && currentIndex < newIndex) {
            recognizers.splice(currentIndex, 1);
            recognizers.splice(newIndex, 0, r);
            currentIndex = newIndex;
          }
        }
      }
    }
  }
}
