requirejs.config({
  baseUrl : '/src/',
  paths : {
    "text"  : "lib/require.text"
  , "<lib/three>" : "lib/three.js/build/three"
  , "<lib/three-extra/trackballcontrols>" : "lib/three-extra/three.trackballcontrols"
  , "<lib/three-extra/effectcomposer>" : "lib/three-extra/three.effectcomposer"
  , "<lib/three-extra/copyshader>" : "lib/three-extra/three.copyshader"
  , "<lib/three-extra/shaderpass>" : "lib/three-extra/three.shaderpass"
  , "<lib/three-extra/renderpass>" : "lib/three-extra/three.renderpass"
  , "<lib/three-extra/maskpass>" : "lib/three-extra/three.maskpass"
  , "<lib/three-extra/domevent>" : "lib/three-extra/threex.domevent"
  , "<lib/tween>" : "lib/tween.js/build.tween.min"
  , "<lib/leapjs>" : "lib/leapjs/leap"
  },
  shim : {
    '<lib/three>': {
      exports: 'three'
    } 
  , '<lib/leapjs>': {
      exports: 'leapjs'
    } 
  , '<lib/tween>': {
      exports: 'tween'
    } 
  , '<lib/three-extra/trackballcontrols>' : {
      exports : 'threetrackballcontrols'
    , deps : ['<lib/three>']
    }
  , '<lib/three-extra/effectcomposer>' : {
      exports : 'effectcomposer'
    , deps : ['<lib/three>']
    }
  , '<lib/three-extra/copyshader>' : {
      exports : 'copyshader'
    , deps : ['<lib/three>']
    }
  , '<lib/three-extra/shaderpass>' : {
      exports : 'shaderpass'
    , deps : ['<lib/three>']
    }
  , '<lib/three-extra/renderpass>' : {
      exports : 'renderpass'
    , deps : ['<lib/three>']
    }
  , '<lib/three-extra/maskpass>' : {
      exports : 'maskpass'
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
  Math.HALF_PI = Math.PI / 2;

  var app = new Treecle(JSON.parse(testStructure));

})

})
