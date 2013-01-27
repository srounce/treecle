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
var _geometry = new THREE.PlaneGeometry(25, 25, 4, 4)
  , _dummytex = THREE.ImageUtils.loadTexture('/assets/misc/dummy.png')
  , _lineMaterial = new THREE.LineBasicMaterial({
        color: 0xBBBBBB
    });

return function Node( structure )
{
  var _mesh
    , _material
    , _childNodes
    , _childPositions
  
  function Node( structure )
  {
    // Use a sprite for now
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
    }()), _lineMaterial));
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
      Math.max(Math.random() * 400, MIN_CHILD_DISTANCE) - 200,
      Math.max(Math.random() * 400, MIN_CHILD_DISTANCE) - 200,
      Math.max(Math.random() * 400, MIN_CHILD_DISTANCE) - 200 
    );
  }

  return new Node(structure);

}

})
