define([
  '<lib/three>'
], function(
  _THREE
) {

return function NodeSpriteTexture( title, imageURL )
{
  var _canvas
    , _ctx
    , _texture

    , _width = 512
    , _height = 512

    , _title = ""
    , _imageURL = "/assets/misc/coolface.png"

  function NodeSpriteTexture( title, imageURL )
  {
    _canvas = document.createElement('canvas');
    _canvas.width = _width;
    _canvas.height = _height;

    _title = title || _title;
    _imageURL = imageURL || _imageURL; 

    _ctx = _canvas.getContext('2d');
    initLayout.call(this);
    _texture = new THREE.Texture(_canvas);
    _texture.needsUpdate = true;
  }

  Object.defineProperty(NodeSpriteTexture.prototype, 'map', {
    get : function() {
      return _texture
    }
  })

  function initLayout()
  {
    var centerX = _width / 2
      , centerY = _height / 2
      , radius = 96
      , angle
      , gradient = _ctx.createLinearGradient(0, centerY/2, 0, _height);

    gradient.addColorStop(0, '#1e3048');
    gradient.addColorStop(1, '#122032');

    _ctx.strokeStyle = "#FFF200";

    _ctx.fillStyle = gradient;

//  _ctx.save();

    var img = new Image();
    img.onload = function(ev) {
      _ctx.beginPath();
      drawPolygon(_ctx, 6, radius, centerX, centerY);
      _ctx.clip();
      _ctx.fill();
      _ctx.drawImage(img, centerX/2, centerY/2, _width - centerX, _height - centerY);
      _ctx.closePath();
      _texture.needsUpdate = true;
    }
    img.src = _imageURL;

//  _ctx.moveTo(0+5, 0+5);
//  _ctx.lineTo(centerX, _height-5);
//  _ctx.lineTo(_width-5, 0+5);

//  _ctx.restore();

    _ctx.beginPath();
    drawPolygon(_ctx, 6, radius, centerX, centerY);
    _ctx.closePath();

    _ctx.lineWidth = 7;
    _ctx.stroke();

    _ctx.fillStyle = '#FFFFFF';
//  _ctx.textAlign = 'right';
    _ctx.font = 'bold 48px Helvetica Neue, Calibri, sans-serif';
    _ctx.fillText(_title, 32, 192);
  }

  function drawPolygon( _ctx, sides, radius, centerX, centerY )
  {
    _ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0));

    for(var i=1, MAX=sides; i <= MAX; i++) {
      angle = i * Math.TAU / MAX;
      _ctx.lineTo( centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle) );
    }
  }

  return new NodeSpriteTexture(title);

}

})
