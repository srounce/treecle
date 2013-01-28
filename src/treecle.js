define([
  'nodering'
, '<lib/three>'
, '<lib/three-extra/trackballcontrols>'
, 'lib/detector'
], function(
  NodeRing
, _THREE
, _THREETrackballControls
, _Detector
){

return function TreecleApp( structDef )
{
  var _camera
    , _renderer
    , _rootScene
    , _trackballControl

  function TreecleApp( sceneDef )
  {
    if( !structDef ) sceneDef = {};

    if ( !Detector.webgl ) Detector.addGetWebGLMessage();

    _camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 10000);
    _camera.position.set(100, 100, -100);
    _camera.lookAt(new THREE.Vector3(0, 0, 0));

    _trackballControl = new THREE.TrackballControls(_camera);
    _trackballControl.rotateSpeed = 0.01;
    _trackballControl.dynamicDampingFactor = 0.3;
    _trackballControl.noZoom = true;
    _trackballControl.noPan = true;

    _rootScene = new THREE.Scene();

    initRenderer.call(this);
    initEvents.call(this);
    initScene.call(this, sceneDef);
    initUpdateLoop.call(this);
  }

  TreecleApp.prototype.update = function()
  {
    requestAnimationFrame(this.render.bind(this)); 
    _trackballControl.update();
  }

  TreecleApp.prototype.render = function()
  {
    _renderer.render(_rootScene, _camera);
    
//  setTimeout(this.update.bind(this), 0);
    this.update();
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
    this.update(); 
  }

  function evt_winResize( ev )
  {
    _renderer.setSize( window.innerWidth, window.innerHeight );

    _trackballControl.handleResize();

    _camera.aspect = window.innerWidth / window.innerHeight;
    _camera.updateProjectionMatrix();
  }

  return new TreecleApp( structDef )

}

})
