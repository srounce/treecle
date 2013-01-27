({
  baseUrl : './src'
//, appDir  : './build'
, dir     : './build'
, paths : {
    "text"  : "lib/require.text"
  , "<lib/three>" : "lib/three.js/build/three"
  , "<lib/three-extra/trackballcontrols>" : "lib/three-extra/three.trackballcontrols"
  , "<lib/tween>" : "lib/tween.js/build.tween.min"
  }
, shim : {
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
  }
, modules : [
    { name : "main" }
  ]
//, out : 'build/treecle.app.js'
})
