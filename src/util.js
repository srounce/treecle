define([], function() {

  var Util = {}

  Util.map = function( value, inMin, inMax, outMin, outMax )
  {
    return Math.min(Math.max(((value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin), outMin), outMax );  
  }

  return Util

})
