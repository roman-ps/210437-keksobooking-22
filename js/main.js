import {renderAds, ads} from './ads.js';
import {addEventListeners, FORM, MAP_FILTERS, FIELD_ADDRESS, enableFormFields} from './form.js';

addEventListeners();

/* eslint-disable no-console*/
console.log(ads);
/* eslint-enable no-console*/

const map = L.map('map-canvas')
  .on('load', () => {
    enableFormFields(FORM, 'fieldset');
    enableFormFields(MAP_FILTERS, 'select');
  })
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 10);

const layer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
)

const mainIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

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

points.forEach(({lat, lng}) => {
  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
  const marker = L.marker({
    lat,
    lng,
  });
  marker.addTo(map);
})

const addToMap = function() {
  mainMarker.addTo(map);
  layer.addTo(map);
  // points.addTo(map);
}

mainMarker.on('moveend', (evt) => {
  let x = evt.target.getLatLng().lat
  let y = evt.target.getLatLng().lng
  FIELD_ADDRESS.value = `${x}, ${y}`;
});

addToMap();
// mainMarker.remove();
