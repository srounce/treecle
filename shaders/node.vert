varying vec2 texCoord;

void main()
{
  gl_Position = projectionMatrix * (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)
    + vec4(position.x, position.y, 0.0, 0.0));

  texCoord = uv;
}
