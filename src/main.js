requirejs.config({
  baseUrl : '/src/',
  paths : {
    "text"  : "lib/require.text"
  , "<lib/three>" : "lib/three.js/build/three"
  , "<lib/three-extra/trackballcontrols>" : "lib/three-extra/three.trackballcontrols"
  , "<lib/three-extra/domevent>" : "lib/three-extra/threex.domevent"
  , "<lib/tween>" : "lib/tween.js/build.tween.min"
  },
  shim : {
    '<lib/three>': {
      exports: 'three'
    } 
  , '<lib/tween>': {
      exports: 'tween'
    } 
  , '<lib/three-extra/trackballcontrols>' : {
      exports : 'threetrackballcontrols'
    , deps : ['<lib/three>']
    }
  , '<lib/three-extra/domevent>' : {
      exports : 'threedomevent'
    , deps : ['<lib/three>']
    }
  },
  out : '../build/treecle.app.js'
});


define('main', [
  'lib/domReady'
, 'treecle'
, 'text!../mock/structure.json'
], function( 
  domReady
, Treecle
, testStructure
) {

domReady(function() {

  Math.TAU = Math.PI * 2;

  var app = new Treecle(JSON.parse(testStructure));

})

})
