requirejs.config({
  baseUrl : '/js',
  paths : {
    "text" : "/js/lib/require.text"
  },
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


define([
  'lib/domReady'
, 'treecle'
, 'text!../mock/structure.json'
], function( 
  domReady
, Treecle
, testStructure
) {

domReady(function() {

  var app = new Treecle(JSON.parse(testStructure));

})

})
