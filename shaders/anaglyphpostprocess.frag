varying vec2 vUv;

uniform float eyeDist;
uniform sampler2D tDiffuse;

void main(void)
{
  vec4 inputMap = texture2D(tDiffuse, vUv);
  gl_FragColor = inputMap;
}
