/*global Hammer*/
export default {
  include: [],
  exclude: [],
  ignoreEvents: true,
  options: { threshold: 25, direction: Hammer.DIRECTION_VERTICAL },
  recognizer: 'swipe'
};
