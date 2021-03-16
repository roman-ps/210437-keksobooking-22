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
};

const ICON = {
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  iconUrl: 'img/pin.svg',
};

// eslint-disable-next-line
const LEAFLET = L;
const MAP = LEAFLET.map('map-canvas');

/**
 * 1 рендер пинов
 * 2 привязка обработчика клика по пину
 * @param {*} points - {lat, lng, title}
 * @param {*} onClick - обработчик клика по пину
 */
const addPins = (points, onClick) => {
  const addPin = ({lat, lng}, idx) => {
    const icon = LEAFLET.icon(ICON);
    const marker = LEAFLET.marker({lat, lng}, {icon});

    marker.bindPopup(
      () => onClick(idx),
      {keepInView: true},
    );
    marker.addTo(MAP);
  };

  points.forEach(addPin);
}

/**
 * Инициализация карты
 * 1 рендер главного пина
 * 2 вызов обработчика завершения загрузки карты
 * 3 привязка обработчика перемещения главного пина
 * @param {*} onLoad - обработчик успешной загрузки карты
 * @param {*} onPinMove - обработчик перемещения главного пина
 */
function initMap(onLoad, onPinMove) {
  const mainPinMoveHandler = (evt) => {
    onPinMove(evt.target.getLatLng());
  };

  const handleLoad = () => {
    onLoad();
    onPinMove(DEFAULT_COORD);
  };

  MAP
    .on('load', handleLoad)
    .setView(DEFAULT_COORD, VIEW_MAP);

  LEAFLET.tileLayer(
    LEAFLET_TILE_URL,
    {
      attribution: LEAFLET_ATTR,
    },
  ).addTo(MAP);

  const mainIcon = LEAFLET.icon(MAIN_ICON);
  const mainMarker = LEAFLET.marker(
    DEFAULT_COORD,
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(MAP);
  mainMarker.on('move', mainPinMoveHandler);
}

export {initMap, DEFAULT_COORD, addPins}
