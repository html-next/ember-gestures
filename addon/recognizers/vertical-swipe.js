/*global Hammer*/
export default {
  include: [],
  exclude: [],
  eventName: 'swipe',
  options: { threshold: 25, direction: Hammer.DIRECTION_VERTICAL },
  recognizer: 'swipe'
};
