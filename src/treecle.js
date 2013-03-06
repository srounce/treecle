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

    var _sceneRotY = 90, _sceneRotX = 0, _sceneCurY = 0

  function TreecleApp( sceneDef )
  {
    if ( !structDef ) sceneDef = {};

    if ( !Detector.webgl ) Detector.addGetWebGLMessage();

    _camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
    _camera.position.set(100, 100, -120);
    _camera.lookAt( _camTarget );

    EventManager.setCamera( _camera );

    _rootScene = new THREE.Scene();

    initRenderer.call(this);
    initEvents.call(this);
    initScene.call(this, sceneDef);
    initUpdateLoop.call(this);
  }

  TreecleApp.prototype.update = function( frame )
  {
    if( frame.valid ) {
      if( Boolean(_diffFrame) === false ) {
        _diffFrame = frame
        console.log('new _diffFrame')
      }

      var _lmRotate = { 
        x : 0
      , y : 0
      , z : 0 
      }

      var frameTrans = _diffFrame.translation(frame);
      var camRadius = _camera.position.distanceTo(_camTarget);

      _sceneRotX = frameTrans[0] * radian;

      _sceneCurY = Util.map(frameTrans[1], -300, 300, 0, 180);
      _sceneRotY = -(_sceneCurY) * radian;

      _lmRotate.x = _camTarget.x * _lmVelocityScale + camRadius * Math.sin(_sceneRotY) * Math.cos(_sceneRotX);
      _lmRotate.z = _camTarget.y * _lmVelocityScale + camRadius * Math.sin(_sceneRotY) * Math.sin(_sceneRotX);
      _lmRotate.y = _camTarget.z * _lmVelocityScale + camRadius * Math.cos(_sceneRotY);

      _camera.position.set( _lmRotate.x, _lmRotate.y, _lmRotate.z );
    }

    //_camera.updateProjectionMatrix();
    _camera.lookAt(_camTarget);

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
