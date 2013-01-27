define([
  'node'
, 'linematerial'
, '/js/lib/three.js/build/three.js'
], function(
  Node
, LineMaterial
, _THREE
){

var sooper = THREE.Object3D;

return function NodeRing( structure )
{
  var _connectionLines = []
    , _structure = []
    , _radius = 275;
     
  function NodeRing( structure, radius )
  {
    _radius = radius || _radius;
    this.load(structure);
  }

  NodeRing.prototype = new sooper;

  NodeRing.prototype.load = function( structure )
  {
    _structure = structure || [];
    _structure.forEach(processNodeDef.bind(this));
  }

  function processNodeDef( nodeDef, index )
  {
    var node = new Node(nodeDef);
    var pos = calculateDistribution( index );

    node.position.set(pos.x, pos.y, pos.z);

    this.add(node);
  }

  function calculateDistribution( index )
  {
    var angle = (Math.TAU / _structure.length) * index;

    return new THREE.Vector3(
        _radius * Math.cos(angle)
      , 0
      , _radius * Math.sin(angle)
    );
  }

  function createConnection( start, finish )
  {
    return line = new THREE.Line((function() {
      var geom = new THREE.Geometry();
      geom.vertices.push(start);
      geom.vertices.push(finish);
      return geom;
    }()), LineMaterial);
  }

  return new NodeRing(structure);

};

})
