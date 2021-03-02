import {getAdsData, OFFERS_COUNT} from './data.js';
import {FIELD_ADDRESS, enableForms} from './form.js';

const ads = getAdsData(OFFERS_COUNT);

const DEFAULT_COORD = {
  lat: 35.68951,
  lng: 139.69171,
}
const VIEW_MAP = 11;
const DIGITS_COUNT = 5;
const LEAFLET_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LEAFLET_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MainIcon = {
  SIZE: [52, 52],
  ANCHOR: [26, 52],
  URL: 'img/main-pin.svg',
}

const Icon = {
  SIZE: [40, 40],
  ANCHOR: [20, 20],
  URL: 'img/pin.svg',
}

/*eslint-disable */
const LEAFLET = L;
/*eslint-enable */

function initMap() {
  const map = LEAFLET.map('map-canvas')
    .on('load', () => {
      enableForms();
      FIELD_ADDRESS.value = `${DEFAULT_COORD.lat}, ${DEFAULT_COORD.lng}`;
    })
    .setView(DEFAULT_COORD, VIEW_MAP);

  const layer = LEAFLET.tileLayer(
    LEAFLET_TILE_URL,
    {
      attribution: LEAFLET_ATTR,
    },
  )

  layer.addTo(map);

  const mainIcon = LEAFLET.icon({
    iconUrl: MainIcon.URL,
    iconSize: MainIcon.SIZE,
    iconAnchor: MainIcon.ANCHOR,
  });

  const mainMarker = LEAFLET.marker(
    DEFAULT_COORD,
    {
      draggable: true,
      icon: mainIcon,
    },
  );

  mainMarker.addTo(map);

  const fillPoints = function(array) {
    // let points = [];
    // for (let i = 0; i < array.length; i++) {
    //   points.push({
    //     title: array[i].offer.titles,
    //     lat: array[i].location.x,
    //     lng: array[i].location.y,
    //   })
    // }
    // return points;
    console.log(array)
    let points = array.map(function () {
      e =
      console.log(i)

    })
  }

  const points = fillPoints(ads);
  // console.log(ads)
  points.forEach(({lat, lng, title}) => {
    const icon = LEAFLET.icon({
      iconUrl: Icon.URL,
      iconSize: Icon.SIZE,
      iconAnchor: Icon.ANCHOR,
    });

    const marker = LEAFLET.marker(
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

  mainMarker.on('move', (evt) => {
    let degree =  Math.pow(10, DIGITS_COUNT);
    let x = evt.target.getLatLng().lat;
    let y = evt.target.getLatLng().lng;
    FIELD_ADDRESS.value = `${Math.round(x * degree) / degree}, ${Math.round(y * degree) / degree}`;
  });
}

export {initMap}
