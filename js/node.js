define([
  'text!../shaders/node.vert'
, 'text!../shaders/node.frag'
, '/js/lib/three.js/build/three.js'
], function(
  vertexShader
, fragmentShader
, _THREE
){

const MIN_CHILD_DISTANCE = 50;

var sooper = THREE.Scene;
var _geometry = new THREE.PlaneGeometry(25, 25);

return function Node()
{
  var _mesh
    , _material
  

  function Node()
  {
    _material = new THREE.ShaderMaterial({
      fragmentShader : fragmentShader
    , vertexShader   : vertexShader
    });

    _mesh = new THREE.Mesh(_geometry, _material);
  }

  Node.prototype = new THREE.Scene

  Node.prototype.add = function add( node )
  {
    sooper.prototype.add.call(this, node);
  }

  function childPosition()
  {
    
  }

  return new Node

}

})
