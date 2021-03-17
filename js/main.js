import {initMap, addPins} from './map.js';
import {fillCard} from './ads.js';
import {disableForms, enableForms, setAddress} from './form.js';
import {loadData} from './api.js'

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

const handleDataError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  const message = 'Данные не загрузились';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

disableForms();
initMap(enableForms, setAddress);
const dataPromise = loadData();

dataPromise
  .then(handleDataSuccess)
  .catch(handleDataError)
