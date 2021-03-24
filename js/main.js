import {initMap, addPins, removePins} from './map.js';
import {fillCard} from './ads.js';
import {storeData, getData, prepareData} from './store.js';
import {disableForms, enableForms, setAddress} from './form.js';
import {loadData} from './api.js';
import {setFieldValue, setCheckboxValue, checkData} from './filter.js';

/* global _:readonly */

const RENDER_TIMEOUT = 500;

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

const updatePins = () => {
  prepareData(checkData);
  removePins();
  renderPins(getData());
};

const updatePinsDebounced = _.debounce(updatePins, RENDER_TIMEOUT);

const handleDataSuccess = (rawData) => {
  storeData(rawData);
  enableForms(handleSelectChange, handleCheckboxChange);
  renderPins(getData());
};

const handleDataError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('alert');
  const message = 'Данные не загрузились';
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(alertContainer.remove, 3000);
};

const handleMapLoaded = () => {

  loadData()
    .then(handleDataSuccess)
    .catch(handleDataError)
};

const handleSelectChange = (...args) => {
  setFieldValue(...args);
  updatePinsDebounced();
};

const handleCheckboxChange = (...args) => {
  setCheckboxValue(...args);
  updatePinsDebounced();
};

disableForms();
initMap(handleMapLoaded, setAddress);
