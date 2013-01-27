({
  baseUrl : './src'
//, appDir  : './build'
, dir     : './build'
, paths : {
    "text"  : "lib/require.text"
  , "<lib/three>" : "lib/three.js/build/three"
  , "<lib/three-extra/trackballcontrols>" : "lib/three-extra/three.trackballcontrols"
  }
, shim : {
    '<lib/three>': {
      exports: 'three'
//  , init: function () {
//      console.log("THREE, u thar brah? ", THREE);
//      return THREE;
//    }
    }
  , '<lib/three-extra/trackballcontrols>' : {
      exports : 'threetrackballcontrols'
    , deps : ['<lib/three>']
    }
  }
, modules : [
    { name : "main" }
  ]
//, out : 'build/treecle.app.js'
})
