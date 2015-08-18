//ensure singleton
function MobileDetection() {

  var IS_MOBILE;

  // Set our belief about whether the devise is mobile by inspecting ontouchstart
  this.detect = function() { IS_MOBILE = !!("ontouchstart" in window); };

  // Return the current belief about whether the browser is mobile.
  this.is = function() { return IS_MOBILE; };

  // This will generally only be done in tests.
  this.fake = function(value) { IS_MOBILE = value; };

  // Set the initial value of IS_MOBILE so that calls to isMobile will have
  // the correct value.
  this.detect();

}

export default new MobileDetection();
