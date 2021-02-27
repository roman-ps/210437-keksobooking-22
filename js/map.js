import {ads} from './ads.js';
import {addEventListeners, FORM, MAP_FILTERS, FIELD_ADDRESS, enableFormFields} from './form.js';

addEventListeners();

const DEFAULT_COORD = {
  x: 35.68951,
  y: 139.69171,
}
const VIEW_MAP = 11;
const MAIN_ICON_SIZE = [52, 52];
const ICON_SIZE = [40, 40];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_ANCHOR = [20, 20];

/*eslint-disable */
function initMap() {
  const map = L.map('map-canvas')
    .on('load', () => {
      enableFormFields(FORM, 'fieldset');
      enableFormFields(MAP_FILTERS, 'select');
    })
    .setView({
      lat: DEFAULT_COORD.x,
      lng: DEFAULT_COORD.y,
    }, VIEW_MAP);

  const layer = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainIcon = L.icon({
    iconUrl: '../img/main-pin.svg',
    iconSize: MAIN_ICON_SIZE,
    iconAnchor: MAIN_ICON_ANCHOR,
  })

  const mainMarker = L.marker(
    {
      lat: DEFAULT_COORD.x,
      lng: DEFAULT_COORD.y,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );
  mainMarker.addTo(map);

  const fillPoints = function(array) {
    let points = [];
    for (let i = 0; i < array.length; i++) {
      points.push({
        title: array[i].offer.titles,
        lat: array[i].location.x,
        lng: array[i].location.y,
      })
    }
    return points;
  }

  const points = fillPoints(ads);

  points.forEach(({lat, lng, title}) => {
    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker.addTo(map);
    marker.bindPopup(title);
  });

  mainMarker.on('moveend', (evt) => {
    let x = evt.target.getLatLng().lat
    let y = evt.target.getLatLng().lng
    FIELD_ADDRESS.value = `${x}, ${y}`;
  });
}

/*eslint-enable */

export {initMap}
