Ember Gestures [![npm version](https://badge.fury.io/js/ember-gestures.svg)](http://badge.fury.io/js/ember-gestures)
==============

[![Build Status](https://travis-ci.org/html-next/ember-gestures.svg?branch=master)](https://travis-ci.org/html-next/ember-gestures)
[![Ember Observer Score](http://emberobserver.com/badges/ember-gestures.svg)](http://emberobserver.com/addons/ember-gestures)

Ember Gestures provides an easy way to use gestures by making it simple to define and use [HammerJS](https://github.com/hammerjs/hammer.js) managers
 and recognizers throughout your app.

When installed via `ember install ember-gestures`, it will additionally install [ember-hammertime](https://github.com/runspired/ember-hammertime)
to use for "fastclick" support.

## Support, Questions, Collaboration

Join the [Ember community on Discord](https://discord.gg/zT3asNS)

### Status

[Changelog](./CHANGELOG.md)

[![dependencies](https://david-dm.org/html-next/ember-gestures.svg)](https://david-dm.org/html-next/ember-gestures)
[![devDependency Status](https://david-dm.org/html-next/ember-gestures/dev-status.svg)](https://david-dm.org/runspired/ember-gestures#info=devDependencies)

## Usage

`ember install ember-gestures`

This will run the default blueprint which additionally installs `HammerJS`.


#### Recognizers and Managers

A `Recognizer` detects a gesture on a target element by listening to received touch, mouse, and pointer events
and passing through a series of rules to determine whether it's gesture is occurring.

`Recognizer`s are registered with a `Manager`, which emits the recognized gestures for consumption by your app.
This addon does the grunt work of creating Managers and wiring up Recognizers for you.  All you need to do
to use gestures is tell your app where you want a Manager to be created and what Recognizers it should have.

Example
```js
import RecognizerMixin from 'ember-gestures/mixins/recognizers';
import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend(RecognizerMixin, {
  recognizers: 'pan tap press'
});
```

The component would create a new Manager and add the recognizers for [pan](./addon/recognizers/pan.js),
[tap](./addon/recognizers/tap.js), and [press](./addon/recognizers/press.js).

The component would recognize gestures based on events originating on it or it's child elements.
The corresponding gesture would be capable of being handled anywhere in the DOM branch in which the component
exists.

Example Dom Tree
```
body
|_ div 1
    |_ component A
      |_ div 2
       |_ component B (with recognizers)
         |_ div 3
```

In the above example, input events originating on `component B` or `div 3` would be passed to the recognizers.
The emitted gestures are triggered on the element which began the gesture (also `component B` or `div 3` and
bubble up to `body`.  This means that component A would also be capable of handling gestures emitted by the
manager on component B.  If `div 3` had an action handler that utilized a gesture, it too would be able to use
gestures emitted by component B if they had begun on or within `div 3`.

This means you should be strategic about where you put your components with Managers.  You don't need a lot of
Managers, you just need them placed strategically.  You could even put one at the base of your app, but be
warned `pinch` `rotate` `pan` and `swipe` can break scrolling behavior if not placed correctly.

##### Note

`pan` and `swipe` are horizontal only (configured this way to avoid breaking vertical scroll).
`vertical-pan` and `vertical-swipe` are vertical only (configured this way to avoid breaking horizontal scroll).

##### Modifier
As an alternative to using the `RecognizerMixin`, you may use the `{{recognize-gesture}}` modifier. This is particularly useful when you are applying the recognizer to an element within the handlebars of your component, rather than to the root element of a component, and vital when your component _has_ no root element, as when you use Glimmer components or components with `tagName=""`.

Example
```hbs
<div {{recognize-gesture "pan" "tap" "press" }}>
```
Gestures to recognize are supplied using positional parameters on the modifier. Hammer manager options can be supplied using named parameters on the modifier.

When using `{{ember-on-modifier}}` with these events, you must use the real DOM event names, which are lowercase without hyphens. So your event for "double-tap" would be "doubletap". 

Also, if you are using objects derived from `EmberObject`, like Ember components, avoid using action names that are the camel-case form of the gesture names, like `doubleTap`, as these are also the names for the component's generated event listeners, and may get unexpectedly triggered when an event bubbles up to the component as well as when your `{{on}}` action fires on the element. (This is one more reason to migrate to Glimmer components, which don't automatically add event handlers to your namespace.) 

The modifier can only be used with Ember 2.18 or later.

#### Using Gestures

Using gestures emitted by Hammer recognizers with Ember is almost like using any other event with Ember.
Your recognizers will be configured to emit `Events`, so to consume a gesture, you just need to add an
event handler to your component.  The handler's name just needs to match the camelCase version of a gesture
event.

Example
```js
import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  panStart(e) {
     // do something with the event
  }
});
```

Gesture events bubble through the DOM, so you can use them with actions as well.

```hbs
<div {{action "foo" on="swipeRight"}}>
```

#### Create A Recognizer

`ember g recognizer <name>`

This will generate the file `ember-gestures/recognizers/name.js`.
Once you've filled out the recognizer (see [./addon/recognizers/](./addon/recognizers/) for examples),
it will be available to use in your app just like the default recognizers.

##### Note

Although we have provided an example for `double-tap` and `single-tap` in the `addon/recognizers` folder, they
are for demo purposes only and do not ship with the actual addon because they are non-standard. 
If you'd like to enable these recognizers for your own app; for instance `double-tap`; execute:

`ember g recognizer double-tap`

An `.app/ember-gestures/recognizers/double-tap.js` file will be created. Inspect its contents and replace
it with the example `double-tap.js` from this addon's codebase.

#### Increase the size of touchable areas to improve user experience on small controls

Sometimes smaller buttons or critical buttons need a larger capture area than their visible area.
You can increase the area that recognizes touch events for a specific button with a little bit of CSS.

[Example Gist](https://gist.github.com/runspired/506f39a4abb2be48d63f)


### Components

Components available by default include `context-element`, `fast-action`, and `fast-async`.


### Testing


The jQuery events you need to trigger are the Hammer variant, meaning it is entirely lowercase `swiperight`, `panup`.

jQuery events come with baggage, and using the `trigger` helper executes handlers in a different order than they
would otherwise execute, and in some situations will cause a handler to execute twice.  If you are experiencing
issues with testing gesture events, try creating your own `trigger` helper that uses native APIs instead of jQuery
to trigger the event.

## Tips and Tricks

Don't add recognizers to components created within an `{{#each}}` loop.  Use a recognizer at the base of the
`each` instead.


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


