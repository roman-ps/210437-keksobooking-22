import {initMap, addPins} from './map.js';
import {fillCard} from './ads.js';
import {disableForms, enableForms, setAddress} from './form.js';
import {getData} from './api.js'

const adaptPoints = (ad) => ({
  title: ad.offer.title,
  lat: ad.location.lat,
  lng: ad.location.lng,
});

const handleDataSuccess = (data) => {
  const points = data.map(adaptPoints);
  const renderAd = (idx) => fillCard(data[idx]);

  addPins(points, renderAd);
};

const handleDataError = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '22px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

disableForms();
initMap(enableForms, setAddress);
const dataPromise = getData();

dataPromise
  .then(handleDataSuccess)
  .catch(handleDataError('Данные не загрузились'))
