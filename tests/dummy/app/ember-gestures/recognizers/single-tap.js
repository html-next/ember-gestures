export default {
  include: [], //an array of recognizers to recognize with.
  exclude: ['double-tap'], //an array of recognizers that must first fail
  options: {
    event: 'singletap',
    taps: 1  // the settings to pass to the recognizer, event will be added automatically
  },
  includeEvents: true,
  recognizer: 'tap' // `tap|press|pan|swipe|rotate|pinch` the base Hammer recognizer to use
};
