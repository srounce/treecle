define(['/js/lib/three.js/build/three.js'], function(THREE){

return function TreecleApp()
{

  function TreecleApp()
  {
//  this.renderer =

    initUpdateLoop.call(this);
  }

  TreecleApp.prototype.tick = function tick()
  {
    requestAnimationFrame(this.render); 
  }

  TreecleApp.prototype.render = function render()
  {
    
  }

  function initUpdateLoop()
  {
    this.tick(); 
  }

  return new TreecleApp();

}

})
