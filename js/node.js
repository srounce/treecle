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

var sooper = THREE.Mesh;
var _geometry = new THREE.PlaneGeometry(25, 25, 4, 4);
var _dummytex = THREE.ImageUtils.loadTexture('/assets/misc/dummy.png')

return function Node()
{
  var _mesh
    , _material
    , _childNodes
    , _childPositions
  
  function Node()
  {
    // Use a sprite for now
//  _material = new THREE.ShaderMaterial({
//    fragmentShader : fragmentShader
//  , vertexShader   : vertexShader
//  });

    sooper.call(this, _geometry, new THREE.MeshBasicMaterial({
      color : 0xffffff
    , map   : _dummytex
    , fog   : false
    , side  : THREE.DoubleSide
    }));
//  _mesh.position.set(100, 100, 1);
//  _mesh.scale.set(100, 100, 1);

    sooper.prototype.add.call(this, _mesh);
  }

  Node.prototype = new sooper;

  Node.prototype.add = function add( node )
  {
    sooper.prototype.add.call(this, node);
    node.position = childPosition();
  }

  function childPosition()
  {
    return new THREE.Vector3(
      Math.max(Math.random() * 400, MIN_CHILD_DISTANCE) - 200,
      Math.max(Math.random() * 400, MIN_CHILD_DISTANCE) - 200,
      Math.max(Math.random() * 400, MIN_CHILD_DISTANCE) - 200 
    );
  }

  return new Node

}

})
