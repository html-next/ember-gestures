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


##touchZone

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button
https://gist.github.com/runspired/506f39a4abb2be48d63f



## Writing Tests

In your tests on actions, you will need to use `triggerEvent('#some-selector', 'tap')` instead
of `click('#some-selector')`

**Important** The jQuery events you need to trigger are the Hammer variant, meaning it is entirely lowercase `swiperight`, `panup`.


## Tips and Tricks

Don't bind within `{{#each}}`, use a base recognizer instead.
