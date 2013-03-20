define([
  'text!../shaders/anaglyphpostprocess.vert'
, 'text!../shaders/anaglyphpostprocess.frag'
, '<lib/three>'
], function(
  vertexShader
, fragmentShader
, _THREE
) {

return {
  uniforms : {
    "eyeDist" : { t : "f", value : 5 }
  , "tDiffuse" : { t : "t", value : 0, texture : null }
  }
, vertexShader : vertexShader
, fragmentShader : fragmentShader
}

})
