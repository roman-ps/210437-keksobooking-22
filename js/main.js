import {renderAds} from './ads.js';
import {addEventListeners, FORM, MAP_FILTERS, enableFormFields} from './form.js';

addEventListeners();

/* eslint-disable no-console*/
console.log(renderAds);
/* eslint-enable no-console*/

const map = L.map('map-canvas')
  .on('load', () => {
    console.log('Карта загрузилась');
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

const addToMap = function() {
  mainMarker.addTo(map);
  layer.addTo(map);
}

addToMap();

mainMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});
