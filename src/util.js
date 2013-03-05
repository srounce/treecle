define([], function() {

  var Util = {}

  Util.map = function( value, inMin, inMax, outMin, outMin )
  {
    return Math.min(Math.max(((value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin), outMin), outMax );  
  }

  return Util

})
