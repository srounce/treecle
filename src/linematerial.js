define([
  '<lib/three>'
], function(
  _THREE
){

var lineMat = new THREE.LineBasicMaterial({
  color   : 0xFFFFFF
, opacity : 0.6
, transparent : true
, linewidth : 2
});

return lineMat;

})
