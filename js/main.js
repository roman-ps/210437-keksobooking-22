import {initMap, addPins, removePins} from './map.js';
import {fillCard} from './ads.js';
import {storeData, getData} from './store.js';
import {disableForms, enableForms, setAddress} from './form.js';
import {loadData} from './api.js';
import {changeHouseTypeHandle} from './filter.js';

const adaptPoints = (ad) => ({
  title: ad.offer.title,
  lat: ad.location.lat,
  lng: ad.location.lng,
});

const renderPins = (data) => {
  const points = data.map(adaptPoints);
  const renderAd = (idx) => fillCard(data[idx]);

  removePins();
  addPins(points, renderAd);
};

const handleDataSuccess = (rawData) => {
  storeData(rawData);
  const data = getData();
  renderPins(data);
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

const handleMapLoadSuccess = () => {
  enableForms();

  loadData()
    .then(handleDataSuccess)
    .catch(handleDataError)
}

disableForms();
initMap(handleMapLoadSuccess, setAddress);
