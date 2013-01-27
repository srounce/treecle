define([
  'nodespritetexture'
, 'text!../shaders/node.vert'
, 'text!../shaders/node.frag'
, 'linematerial'
, '<lib/three>'
], function(
  NodeSpriteTexture
, vertexShader
, fragmentShader
, LineMaterial
, _THREE
){

const MAX_CHILD_DISTANCE = 75;
const MIN_CHILD_DISTANCE = 50;
const SIZE = 50;

var sooper = THREE.Mesh;
var _geometry = new THREE.PlaneGeometry(SIZE, SIZE, 4, 4)
  , _dummytex = THREE.ImageUtils.loadTexture('/assets/misc/coolface.png')

return function Node( structure )
{
  var _mesh
    , _material
    , _childNodes
    , _childPositions
    , _diffuse
  
  function Node( structure )
  {
    _diffuse = new NodeSpriteTexture(structure.name);
    _material = new THREE.ShaderMaterial({
      uniforms        : {
        diffuse : { type: "t", value : _diffuse.map }
      }
    , fragmentShader  : fragmentShader
    , vertexShader    : vertexShader
    , alphaTest       : true
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
      this.add(n);
    }.bind(this));
  }

  function childPosition()
  {
    return new THREE.Vector3(
      randomPosition(true),
      randomPosition(true),
      randomPosition(true)
    );
  }

  function randomPosition(canNeg)
  {
    var dist = Math.min(Math.random() * MAX_CHILD_DISTANCE / 2 + MIN_CHILD_DISTANCE, MAX_CHILD_DISTANCE) - MAX_CHILD_DISTANCE / 2; 
console.log(dist);
    if(canNeg) {
      return dist;
    } else {
      return Math.abs(dist);
    }
  }

  return new Node(structure);

}

})
