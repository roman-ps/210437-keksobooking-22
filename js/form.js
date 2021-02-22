const FIELD_TYPE = document.querySelector('#type');
const FIELD_PRICE = document.querySelector('#price');
const FIELD_TIMEIN = document.querySelector('#timein');
const FIELD_TIMEOUT = document.querySelector('#timeout');

const HOUSE_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

const fieldTypeChangeHandler = function(evt) {
  let value = evt.target.value;
  FIELD_PRICE.setAttribute('placeholder', HOUSE_PRICE[value]);
};

const fieldTimeinChangeHandler = function(evt) {
  let currentValue = evt.target.value;
  FIELD_TIMEOUT.value = currentValue;
};

const fieldTimeoutChangeHandler = function(evt) {
  let currentValue = evt.target.value;
  FIELD_TIMEIN.value = currentValue;
};

const addEventListeners = function() {
  FIELD_TYPE.addEventListener('change', fieldTypeChangeHandler);
  FIELD_TIMEIN.addEventListener('change', fieldTimeinChangeHandler);
  FIELD_TIMEOUT.addEventListener('change', fieldTimeoutChangeHandler);
};

export {addEventListeners}