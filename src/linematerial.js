define([
  '<lib/three>'
], function(
  _THREE
){

var lineMat = new THREE.LineBasicMaterial({
  color   : 0xFFFFFF
, opacity : 0.9
, transparent : true
, linewidth : 1
});

return lineMat;

})
