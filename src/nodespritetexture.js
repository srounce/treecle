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

    , _width = 1024
    , _height = 1024

    , _title = ""
    , _imageURL = "/assets/misc/coolface.png"

  var NodeSpriteTexture = function( title, imageURL )
  {
    _canvas = document.createElement('canvas');
    _canvas.width = _width;
    _canvas.height = _height;

//if(document.querySelectorAll('canvas').length === 1)
  //document.body.appendChild(_canvas)

    _title = title || _title;
    _imageURL = imageURL || _imageURL; 
//console.log(_imageURL)
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
      , radius = centerX / 1.5
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
      _ctx.closePath();
      _ctx.fill();

      _ctx.drawImage(img, centerX/2, centerY/2, _width - centerX, _height - centerY);
      _texture.needsUpdate = true;
    }
    img.src = _imageURL;

    _ctx.beginPath();
    drawPolygon(_ctx, 6, radius, centerX, centerY);
    _ctx.closePath();

    _ctx.lineWidth = 7;
    _ctx.stroke();

    _ctx.moveTo(centerX, 5)
    _ctx.fillStyle = '#FFFF2F';
    _ctx.textAlign = 'right';
    _ctx.font = 'bold 36px Helvetica Neue, Calibri, sans-serif';
    //_ctx.fillText(_title, centerX, 192)
    drawText(_ctx, _title, (centerX - (centerX/3) - 24), centerX - 116, 146);
    _ctx.fillStyle = 'transparent';
  }

  function drawText( ctx, text, maxWidth, x, y )
  {
    var _text = text || ""
      , _maxWidth = maxWidth || ctx.width + x
      , _x = x || 0
      , _y = y || 0
      , wordList = text.split(/[\s\r]/g)
      , _lineHeight = parseInt( parseInt(ctx.font) * 1.2 )
      , _align = ctx.textAlign
      , _isAlignRight = ['right', 'end'].indexOf(_align) > -1

    wordList.forEach(function( word, index ) {
      var doWrap
        , wordWidth = ctx.measureText(word).width;

      doWrap = (_x + wordWidth > _maxWidth)
            || ( (_x + wordWidth < x) && _isAlignRight );

      if( doWrap ) {
        switch( ctx.textAlign ) {
          case 'right' :
            _x = maxWidth;
            break;

          case 'end' :
            _x = maxWidth;
            break;

          default :
            _x = x;
            break;
        }

        _y += _lineHeight;
      } else {
        if( _isAlignRight )
          _x -= wordWidth
        else
          _x += wordWidth
      }

      ctx.fillText( word, _x, _y );
    });
  }

  function drawPolygon( ctx, sides, radius, centerX, centerY )
  {
    ctx.moveTo(centerX + radius * Math.cos(0), centerY + radius * Math.sin(0));

    for(var i=1, MAX=sides; i <= MAX; i++) {
      angle = i * Math.TAU / MAX;
      ctx.lineTo( centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle) );
    }
  }

  return new NodeSpriteTexture(title, imageURL);

}

})
