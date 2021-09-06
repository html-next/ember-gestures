
import Modifier from 'ember-modifier';
import { getOwner } from '@ember/application';

export default class RecognizeGestureModifier extends Modifier {

    constructor() {
        super(...arguments);
        this.recognizers = null;
        this.manager = null;
        this.gestures = getOwner(this).lookup('service:-gestures');
        this.gestureNames = this.args.positional;
        this.managerOptions = (this.args.named && (Object.keys(this.args.named).length > 0)) ? Object.assign({}, this.args.named) : { domEvents: true };
        this.managerOptions.useCapture = this.gestures.useCapture;
    }

    didInstall() {
        if (this.args.positional) {
            Promise.resolve().then( () => {
                this.recognizers = this.gestures.retrieve(this.gestureNames);
                if (this.recognizers) {
                    this.element.style['touch-action'] = 'manipulation';
                    this.element.style['-ms-touch-action'] = 'manipulation'; 
                    this.recognizers.then ( (recognizers) => {
                        if (this.isDestroyed) return;
                        this.sortRecognizers(recognizers);
                        this.manager = new Hammer.Manager(this.element, this.managerOptions);
                        recognizers.forEach((recognizer) => { this.manager.add(recognizer); });        
                    });    
                }
            });
        }
    }

    willRemove() {
        if (this.manager !== null) {
            this.manager.destroy();
            this.manager = null;    
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
