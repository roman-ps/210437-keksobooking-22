const DEFAULT_COORD = {
  lat: 35.68951,
  lng: 139.69171,
}

const VIEW_MAP = 10;
const LEAFLET_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LEAFLET_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_ICON = {
  iconSize: [52, 52],
  iconAnchor: [26, 52],
  iconUrl: 'img/main-pin.svg',
}

const ICON = {
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  iconUrl: 'img/pin.svg',
}

/*eslint-disable */
const LEAFLET = L;
/*eslint-enable */

function initMap(points, onLoad, onClick, onPinMove) {
  const map = LEAFLET.map('map-canvas')
    .on('load', () => {
      onLoad();
      onPinMove(DEFAULT_COORD);
    })
    .setView(DEFAULT_COORD, VIEW_MAP);

  const layer = LEAFLET.tileLayer(
    LEAFLET_TILE_URL,
    {
      attribution: LEAFLET_ATTR,
    },
  )
  const mainPinMoveHandler = function(evt) {
    return onPinMove(evt.target.getLatLng());
  };

  const addPin = function({lat, lng}, idx) {
    const icon = LEAFLET.icon(ICON);
    const marker = LEAFLET.marker({lat, lng}, {icon});

    marker.bindPopup(
      () => onClick(idx),
      {keepInView: true},
    );
    marker.addTo(map);
  };

  layer.addTo(map);

  const mainIcon = LEAFLET.icon(MAIN_ICON);
  const mainMarker = LEAFLET.marker(
    DEFAULT_COORD,
    {
      draggable: true,
      icon: mainIcon,
    },
  );

  points.forEach(addPin);
  mainMarker.addTo(map);
  mainMarker.on('move', mainPinMoveHandler);
}

export {initMap}
