define([
  'text!../shaders/node.vert'
, 'text!../shaders/node.frag'
, 'linematerial'
, '/js/lib/three.js/build/three.js'
], function(
  vertexShader
, fragmentShader
, LineMaterial
, _THREE
){

const MAX_CHILD_DISTANCE = 200;
const MIN_CHILD_DISTANCE = 50;

var sooper = THREE.Mesh;
var _geometry = new THREE.PlaneGeometry(25, 25, 4, 4)
  , _dummytex = THREE.ImageUtils.loadTexture('/assets/misc/dummy.png')

return function Node( structure )
{
  var _mesh
    , _material
    , _childNodes
    , _childPositions
  
  function Node( structure )
  {
    _material = new THREE.ShaderMaterial({
      fragmentShader : fragmentShader
    , vertexShader   : vertexShader
    });
    sooper.call(this, _geometry, _material);

    processStructureDefinition.call(this, structure);

    sooper.prototype.add.call(this, _mesh);
  }

  Node.prototype = new sooper;

  Node.prototype.add = function( node )
  {
    var nodePos = childPosition();
    sooper.prototype.add.call(this, new THREE.Line((function() {
      var geom = new THREE.Geometry();
      geom.vertices.push(new THREE.Vector3());
      geom.vertices.push(nodePos);
      return geom;
    }()), LineMaterial));
    sooper.prototype.add.call(this, node);
    node.position = nodePos;
  }

  function processStructureDefinition( structureDefinition )
  {
    structureDefinition.children.forEach(function( struct ) {
      var n = new Node(struct);
      console.log(struct);
      this.add(n);
    }.bind(this));
  }

  function childPosition()
  {
    return new THREE.Vector3(
      randomPosition(),
      randomPosition(),
      randomPosition()
    );
  }

  function randomPosition()
  {
    return Math.max(Math.random() * MAX_CHILD_DISTANCE, MIN_CHILD_DISTANCE) - MAX_CHILD_DISTANCE / 2; 
  }

  return new Node(structure);

}

})
