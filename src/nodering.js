define([
  'node'
, 'linematerial'
, '<lib/three>'
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
    , _radius = 100;
     
  function NodeRing( structure, radius )
  {
    _radius = radius || _radius;
    this.load(structure);

    Object.defineProperty(NodeRing.prototype, 'radius', {
      get : function() {
        return _radius;
      }
    });
  }

  NodeRing.prototype = new sooper;

  NodeRing.prototype.load = function( structure )
  {
    _structure = structure || [];
//console.group('arc indexes');
    _structure.forEach(processNodeDef.bind(this));
//console.groupEnd('arc indexes');
  }

  function processNodeDef( nodeDef, index )
  {
    var node = new Node(nodeDef)
      , pos = calculateDistribution( index )
      , line
      , rot = pos.clone().normalize()

    node.position.set(pos.x, pos.y, pos.z);
    node.rotation.setY(Math.TAU / _structure.length * index);
    this.add(node);

//console.log(index-1 - _structure.length % _structure.length);

    line = createConnection(calculateDistribution(index-1 - _structure.length % _structure.length), pos);
    this.add(line);
  }

  function calculateDistribution( index )
  {
    var angle = Math.TAU / _structure.length * index;

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
