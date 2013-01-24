requirejs.config({
  shim : {
    '/js/lib/three.js/build/three.js': {
      exports: 'three',
      init: function () {
        console.log("THREE, u thar brah? ", THREE);
        return THREE;
      }
    }
  }
});


define([ 'lib/domReady', 'treecle' ], function( domReady, Treecle ) {

domReady(function() {
  var app = new Treecle();
})

})
