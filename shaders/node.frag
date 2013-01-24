void main()
{
  gl_Position = gl_ProjectionMatrix * (gl_ModelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0) + vec4(gl_Vertex.x, gl_Vertex.y, 0.0, 0.0));

  textureCoords = vec4(gl_Vertex.x + 0.5, gl_Vertex.y + 0.5, 0.0, 0.0);
}

