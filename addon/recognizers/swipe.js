export default {
  include: [],
  exclude: [],
  options: { threshold: 25, direction: typeof Hammer === 'undefined' ? '' : Hammer.DIRECTION_HORIZONTAL },
  recognizer: 'swipe'
};
