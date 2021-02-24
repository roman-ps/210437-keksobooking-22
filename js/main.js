import {renderAds} from './ads.js';
import {addEventListeners} from './form.js';

const MAP_CANVAS = document.querySelector('#map-canvas');
// MAP_CANVAS.appendChild(renderAds.firstElementChild);

addEventListeners();

/* eslint-disable no-console*/
console.log(renderAds);
/* eslint-enable no-console*/

const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

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

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  console.log(evt.target.getLatLng());
});
