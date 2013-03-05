define([
  'nodering'
, 'eventmanager'
, 'util'
, '<lib/three>'
, 'lib/detector'
, '<lib/leapjs>'
], function(
  NodeRing
, EventManager
, Util
, _THREE
, _Detector
, _leapjs
){

return function TreecleApp( structDef )
{
  var _camera
    , _renderer
    , _rootScene

    , _lmVelocityScale = .01
    , _diffFrame = null
    , _camTarget = new THREE.Vector3()
    , radian = Math.PI / 180

  function TreecleApp( sceneDef )
  {
    if ( !structDef ) sceneDef = {};

    if ( !Detector.webgl ) Detector.addGetWebGLMessage();

    _camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
    _camera.position.set(100, 100, -100);
    _camera.lookAt(new THREE.Vector3(0, 0, 0));

    EventManager.setCamera( _camera );

    _rootScene = new THREE.Scene();

    initRenderer.call(this);
    initEvents.call(this);
    initScene.call(this, sceneDef);
    initUpdateLoop.call(this);
  }

  TreecleApp.prototype.update = function( frame )
  {
    var _lmRotate = { x : 0, y : 0, z :0 }

    if( frame.valid ) {
      if( _diffFrame ===  null ) {
        _diffFrame = frame
      }
      var frameTrans = _diffFrame.translation(frame)
      var camRadius = _camera.position.distanceTo(_camTarget)

      //console.log( frame.hands.palmVelocity );
//if(frameTrans[0] > 0) {
  //console.log(frameTrans[0]
             //,frameTrans[1]
             //,frameTrans[2])
//}
      var rotX = frameTrans[0]
      var rotY = -( Util.map(frameTrans[0], -300, 300, -179, 180) )

      _lmRotate.x = camRadius * Math.sin(rotY * radian) * Math.cos(rotX * radian)
      _lmRotate.z = camRadius * Math.sin(rotX * radian) * Math.cos(rotY * radian)
      _lmRotate.y = camRadius * Math.cos(rotY * radian)

      _camera.rotation.set( _lmRotate.x, _lmRotate.y, _lmRotate.z );
    }

    this.render.call(this, frame);
  }

  TreecleApp.prototype.render = function( frame )
  {
    _renderer.render(_rootScene, _camera);
  }

  function initEvents()
  {
    window.addEventListener('resize', evt_winResize.bind(this));
    evt_winResize(null);
  }

  function initRenderer()
  {
    _renderer = new THREE.WebGLRenderer({
      antialias: true
    , clearAlpha : 0
    });
    
    document.body.appendChild(
      this.domElement = _renderer.domElement
    );
    this.domElement.style.position = 'absolute';
  }

  function initScene( sceneDef )
  {
    _rootScene.fog = new THREE.Fog(0x0d1929, 50.0, 250);

    var n = new NodeRing(sceneDef);
    _rootScene.add(n);
  }

  function initUpdateLoop()
  {
    Leap.loop( this.update.bind(this) )
  }

  function evt_winResize( ev )
  {
    _renderer.setSize( window.innerWidth, window.innerHeight );

    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
  }

  return new TreecleApp( structDef )

}

})
