varying vec2 texCoord;

uniform sampler2D diffuse;

float PI = 3.14159265358979323846264;

void main() 
{
  vec2 coord = texCoord;
  gl_FragColor = texture2D(diffuse, coord);

  if( gl_FragColor.a < 0.15 ) 
    discard;

//gl_FragColor = vec4(texCoord.x, texCoord.y, 1.0, 1.0);
  float depth = gl_FragCoord.z / gl_FragCoord.w;
  const vec3 fogColor = vec3( 0.05, 0.09, 0.17 );

  float fogAmount = smoothstep( 50.0, 300.0, depth );
  gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogAmount );

}
