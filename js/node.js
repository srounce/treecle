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
    , _children
  
  function Node()
  {
    _children = new THREE.Scene();
    sooper.prototype.add.call(this, _children);

    // Use a sprite for now
//  _material = new THREE.ShaderMaterial({
//    fragmentShader : fragmentShader
//  , vertexShader   : vertexShader
//  });

    _mesh = new THREE.Sprite(new THREE.SpriteMaterial({
      color : 0xffffff
    }));
    sooper.prototype.add.call(this, _mesh);
  }

  Node.prototype = new THREE.Scene

  Node.prototype.add = function add( node )
  {
    sooper.prototype.add.call(_children, node)
    node.parent = this
  }

  function childPosition()
  {
    
  }

  return new Node

}

})
