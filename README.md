Ember Gestures
----------------

[![Stories in Ready](https://badge.waffle.io/runspired/ember-gestures.png?label=ready&title=Ready)](https://waffle.io/runspired/ember-gestures)

[![npm version](https://badge.fury.io/js/ember-gestures.svg)](http://badge.fury.io/js/ember-gestures)
[![Build Status](https://travis-ci.org/runspired/ember-gestures.svg?branch=master)](https://travis-ci.org/runspired/ember-gestures)
[![Ember Observer Score](http://emberobserver.com/badges/ember-gestures.svg)](http://emberobserver.com/addons/ember-gestures)

Gesture and Mobile support for Ambitious Ember Applications.

###[Changelog](./CHANGELOG.md)

[![dependencies](https://david-dm.org/runspired/ember-gestures.svg)](https://david-dm.org/runspired/ember-gestures)
[![devDependency Status](https://david-dm.org/runspired/ember-gestures/dev-status.svg)](https://david-dm.org/runspired/ember-gestures#info=devDependencies)


##Installation

`ember install ember-gestures`


## Out of the Box

When you run the default blueprint (runs by default when you do `ember install` or by `ember g ember-gestures`), this addon will install [HammerJS 2.0.5](https://github.com/hammerjs/hammer.js).

The addon wires HammerJS into your app as a global (Hammer), and provides various means by which to use HammerJS in your app.  All manager instances created by this addon will emit domEvents, which Ember has been configured to utilize.  This means
that using Hammer with Ember is just like using any other event with ember, you add event handlers to your views or components.

For example
```
import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  panStart(e) {
     ... do something with the event ...
    }
});
```

But before you can do the above, you'll have to ensure your app knows what gestures to recognize. Don't fret, in even advanced cases, getting gestures available throughout your app will take only a few minutes of configuration, not a day of figuring things out.  See [Usage](#usage) for more details and examples of how to setup recognizers in your app.


## In the Box

In addition to the basic hammer functionality present in the box, ember-gestures comes with several blueprints for advanced usage which you can install separately.

### Custom Recognizers.

### Additional Recognizers.

### Global Installation.

### Components to help you get started.


##Usage

```
Ember.View.extend({
  
  gestureAllow : [],
  
  gestureExclude : [],
  
  tap : function (e) {
    ;//do something!
  }

})
```

##Configuration

The following settings can be configured in `config/environment.js`.  They are shown below with their defaults.
You can read more by reading the documentation comments in [addon/default-config.js](https://github.com/runspired/ember-mobiletouch/blob/master/addon/default-config.js)

The default configuration can be examined here: http://codepen.io/anon/pen/bNLJbN?editors=001

```
ENV.mobileTouch = {

    //which gesture families to allow, will create a recognizer for each
    //a minimum of tap must be present, turning off unused gestures can help performance
    use : ['tap', 'press', 'pan', 'swipe'],

    //whether to alias "press" to tap within Ember's eventing
    // very useful if you don't need to distinguish and don't want to lose
    // taps from people who tap longer
    alwaysTapOnPress : false,
    
    //whether links and actions should trigger tap behavior on press as well
    // if eventName or "on" has not been explicitly defined
    // currently does not work with actions
    defaultTapOnPress : true,

    //passed to new Hammer.Manager(element, options)
    options : {
       domEvents : true
    },
    
    //passed to the respective recognizer
    tune : {
      tap : { time : 250, threshold : 9 }, //Hammer default is 250 / 2
      press : { time : 251, threshold : 9 }, //Hammer default is 500 / 5
      swipe : { direction : 6, velocity : 0.3, threshold : 25 },
      pan : { direction : 6 },
      pinch : {},
      rotate : {}
    },
    
    //what default Ember events should be disabled
    events : [
      'touchstart',
      'touchmove',
      'touchend',
      'touchcancel',
      'mousedown',
      'mouseup',
      'click', //not removed, re-aliased to internalClick.  Use cautiously.
      'dblclick',
      'mousemove',
      'mouseenter',
      'mouseleave'
    ]

};
```

##touchZone

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button
https://gist.github.com/runspired/506f39a4abb2be48d63f



## Writing Tests

When using ember-mobiletouch, actions etc. are no longer triggered by clicks, but by taps.
This can break some of your apps existing tests.

In `test-helper.js` you will need to import the `Ember.EventDispatcher` changes.

In your tests on actions, you will need to use `triggerEvent('#some-selector', 'tap')` instead
of `click('#some-selector')`

**Important** The jQuery events you need to trigger are the Hammer variant, meaning it is entirely lowercase `swiperight`, `panup`.


## Tips and Tricks

Don't bind within `{{#each}}`, use a base recognizer instead.
