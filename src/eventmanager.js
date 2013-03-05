define([
  '<lib/three-extra/domevent>'
], function(
  _THREEDOMEvent
) {

var _instance = null;

function getInstance( camera )
{
  if( _instance === null && camera ) {
    setCamera(camera);
  } else {
    return _instance;
  }
}

function getCamera( camera )
{
  return _instance._camera;
}

function setCamera( camera )
{
  _instance = new THREEx.DomEvent(camera, document.body);
  return getInstance();
}

return {
  getInstance : getInstance
, getCamera : getCamera
, setCamera : setCamera
}

})
