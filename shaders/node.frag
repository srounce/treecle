varying vec2 texCoord;

uniform sampler2D diffuse;

void main() 
{
  gl_FragColor = texture2D(diffuse, texCoord);

  if( gl_FragColor.a < 0.15 ) 
    discard;

//gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

}
