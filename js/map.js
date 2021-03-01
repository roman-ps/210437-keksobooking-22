import {getAdsData, OFFERS_COUNT} from './data.js';
import {AD_FORM, MAP_FILTERS, FIELD_ADDRESS, enableFormFields} from './form.js';

const ads = getAdsData(OFFERS_COUNT);

const DEFAULT_COORD = {
  lat: 35.68951,
  lng: 139.69171,
}
const VIEW_MAP = 11;
const MAIN_ICON_SIZE = [52, 52];
const ICON_SIZE = [40, 40];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_ANCHOR = [20, 20];
const ICON_URL = 'img/pin.svg';
const MAIN_ICON_URL = 'img/main-pin.svg';

/*eslint-disable */
const LEAFLET = L;
/*eslint-enable */

function initMap() {
  const map = LEAFLET.map('map-canvas')
    .on('load', () => {
      enableFormFields(AD_FORM, 'fieldset');
      enableFormFields(MAP_FILTERS, 'select');
    })
    .setView(DEFAULT_COORD, VIEW_MAP);

  const layer = LEAFLET.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  )

  layer.addTo(map);

  const mainIcon = LEAFLET.icon({
    iconUrl: MAIN_ICON_URL,
    iconSize: MAIN_ICON_SIZE,
    iconAnchor: MAIN_ICON_ANCHOR,
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
    const icon = LEAFLET.icon({
      iconUrl: ICON_URL,
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR,
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

  mainMarker.on('moveend', (evt) => {
    let x = evt.target.getLatLng().lat
    let y = evt.target.getLatLng().lng
    FIELD_ADDRESS.value = `${x}, ${y}`;
  });
}

export {initMap}
