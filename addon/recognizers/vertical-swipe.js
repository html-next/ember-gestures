export default {
  include: [],
  exclude: [],
  eventName: 'swipe',
  options: { threshold: 25, direction: typeof Hammer === 'undefined' ? '' : Hammer.DIRECTION_VERTICAL},
  recognizer: 'swipe'
};
