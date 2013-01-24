define([
  '/js/lib/three.js/build/three.js'
, 'lib/detector'
], function(
  _THREE
, _Detector
){

return function TreecleApp()
{
  var _camera
    , _renderer
    , _rootScene

  function TreecleApp()
  {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    _camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );

    initRenderer.call(this);

    initEvents.call(this);
    initUpdateLoop.call(this);
  }

  TreecleApp.prototype.tick = function tick()
  {
    requestAnimationFrame(this.render); 
  }

  TreecleApp.prototype.render = function render()
  {
    
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

  function initUpdateLoop()
  {
    this.tick(); 
  }

  function evt_winResize( ev )
  {
    _renderer.setSize( window.innerWidth, window.innerHeight );
  }

  return new TreecleApp;

}

})
