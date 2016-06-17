export default {
  include: [],
  exclude: [],
  eventName: 'pan',
  options: { direction: typeof Hammer === 'undefined' ? '' : Hammer.DIRECTION_VERTICAL },
  recognizer: 'pan'
};
