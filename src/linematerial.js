define([
  '<lib/three>'
], function(
  _THREE
){

var lineMat = new THREE.LineBasicMaterial({
  color   : 0xFFFFFF
, opacity : 0.7
, transparent : true
});

return lineMat;

})
