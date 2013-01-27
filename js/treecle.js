define([
  'nodering'
, '/js/lib/three.js/build/three.js'
, '/js/lib/three-extra/three.trackballcontrols.js'
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

    _camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    _camera.position.set(250, 250, -250);
    _camera.lookAt(new THREE.Vector3(0, 0, 0));

    _trackballControl = new THREE.TrackballControls(_camera);
    _trackballControl.rotateSpeed = 0.1;
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
