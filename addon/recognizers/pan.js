export default {
  include: [],
  exclude: [],
  options: { direction: typeof Hammer === 'undefined' ? '' : Hammer.DIRECTION_HORIZONTAL },
  recognizer: 'pan'
};
