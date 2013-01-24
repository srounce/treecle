define([
  'node'
, '/js/lib/three.js/build/three.js'
, 'lib/detector'
], function(
  Node
, _THREE
, _Detector
){

return function TreecleApp( structDef )
{
  var _camera
    , _renderer
    , _rootScene

  function TreecleApp( structDef )
  {
    if( !structDef ) structDef = {};

    if ( !Detector.webgl ) Detector.addGetWebGLMessage();

    _camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    _camera.position.z = -50;

    _rootScene = new THREE.Scene();

    initRenderer.call(this);
    initEvents.call(this);
    initScene.call(this);
    initUpdateLoop.call(this);
  }

  TreecleApp.prototype.tick = function tick()
  {
    requestAnimationFrame(this.render.bind(this)); 
  }

  TreecleApp.prototype.render = function render()
  {
    _renderer.render(_rootScene, _camera);
    
    setTimeout(this.tick.bind(this), 0);
  }

  function initEvents()
  {
    window.addEventListener('resize', evt_winResize.bind(this));
    evt_winResize(null);
  }

  function initRenderer()
  {
    _renderer = new THREE.WebGLRenderer({
      antialias: true,
      clearAlpha : 0
    });
    
    document.body.appendChild(
      this.domElement = _renderer.domElement
    );
    this.domElement.style.position = 'absolute';
  }

  function initScene()
  {
    var n = new Node();
    n.add(new Node());
    _rootScene.add(n);
  }

  function initUpdateLoop()
  {
    this.tick(); 
  }

  function evt_winResize( ev )
  {
    _renderer.setSize( window.innerWidth, window.innerHeight );
  }

  return new TreecleApp( structDef )

}

})
