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


# Features

## Fastclick via touch-action CSS and the Hammer-time Polyfill

### Touch-action

All components available via `ember-gestures` have a `style` attribute set to `touch-action: manipulation; -ms-touch-action: manipulation`.
All `link-components` and elements with actions on them are modified to also have this style attribute.

### Components

Components available by default include `context-element`, `fast-action`, and `fast-async`.

### Polyfill

`ember-gestures` uses [hammer-time](https://github.com/hammerjs/hammer-time) as a polyfill for `touch-action` CSS
to enable cross-platform `fastclick`.  This polyfill works based on the presence of `style="touch-action: <foo>;"`
being present on an element.



## Gestures via HammerJS


When you run the default blueprint (runs by default when you do `ember install` or by `ember g ember-gestures`),
this addon will install [HammerJS 2.0.5](https://github.com/hammerjs/hammer.js).

The addon wires HammerJS into your app as a global (Hammer), and provides various means by which to use HammerJS
in your app.  All manager instances created by this addon will emit domEvents, which Ember has been configured to
utilize.  This means that using Hammer with Ember is just like using any other event with ember, you add event
handlers to your components.

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

## In the Box

In addition to the basic hammer functionality present in the box, ember-gestures comes with several blueprints for advanced usage which you can install separately.

### Custom Recognizers.

### Additional Recognizers.

### Using Hammer Globally

### Event Delegation

### Components to help you get started.


##Usage

##Configuration


##touchZone

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button
https://gist.github.com/runspired/506f39a4abb2be48d63f


## Writing Tests

### Ensuring a manager is configured correctly.

### Using the triggerGesture helper.

### Using the trigger helper.

**Important** The jQuery events you need to trigger are the Hammer variant, meaning it is entirely lowercase `swiperight`, `panup`.


## Tips and Tricks

Don't bind within `{{#each}}`, use a base recognizer instead.

## Contributing

Contributions are very welcome.

When making a PR try to use the following conventions:

**Commit Messages:**

`type(shortname): action based description`

Examples:

- chore(deps): bump deps in package.json and bower.json
- docs(component): document the `fast-action` component

**Branch Naming:**

`type/short-description`

Examples:

- chore/bump-deps
- docs/fast-action-component


