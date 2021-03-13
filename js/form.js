import {sendData} from './api.js';
import {openPopup} from './popup.js';
import {getRoundNumber} from './utils.js';
import {DEFAULT_COORD} from './map.js';

const FIELD_TYPE = document.querySelector('#type');
const FIELD_PRICE = document.querySelector('#price');
const FIELD_TIMEIN = document.querySelector('#timein');
const FIELD_TIMEOUT = document.querySelector('#timeout');
const AD_FORM = document.querySelector('.ad-form');
const AD_FORM_RESET = document.querySelector('.ad-form__reset');
const MAP_FILTERS = document.querySelector('.map__filters');
const FIELD_ADDRESS = AD_FORM.querySelector('#address');
const FIELD_ROOM_NUMBER = document.querySelector('#room_number');
const FIELD_CAPACITY = document.querySelector('#capacity');
const POPUP_SUCCESS_TEMPLATE = document.querySelector('#success');
// const POPUP_ERROR_TEMPLATE = document.querySelector('#error');
const MAIN_BLOCK = document.querySelector('main');

const HOUSE_PRICE = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

const ROOMS_VALUES = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};

const fieldRoomNumberChangeHandler = function(evt) {
  let value = evt.target.value;
  let options = FIELD_CAPACITY.querySelectorAll('option');
  options.forEach(function (elem) {
    changeAttribute(elem, 'selected', 'disabled');
    if (ROOMS_VALUES[value].includes(elem.value)) {
      changeAttribute(elem, 'disabled', 'selected');
    }
  })
};

const changeAttribute = function(elem, attr1, attr2) {
  elem.removeAttribute(attr1);
  elem.setAttribute(attr2, '');
};

const disableFormFields = function(node, childFields, classNode = 'ad-form--disabled') {
  node.classList.add(classNode);
  let children = node.querySelectorAll(childFields);
  children.forEach((elem) => elem.setAttribute('disabled', ''));
};

const enableFormFields = function(node, childFields, classNode = 'ad-form--disabled') {
  node.classList.remove(classNode);
  let children = node.querySelectorAll(childFields);
  children.forEach((elem) => elem.removeAttribute('disabled'));
};

const fieldTypeChangeHandler = function(evt) {
  let value = evt.target.value;
  FIELD_PRICE.setAttribute('placeholder', HOUSE_PRICE[value]);
  FIELD_PRICE.setAttribute('min', HOUSE_PRICE[value]);
};

const fieldTimeinChangeHandler = function(evt) {
  let currentValue = evt.target.value;
  FIELD_TIMEOUT.value = currentValue;
};

const fieldTimeoutChangeHandler = function(evt) {
  let currentValue = evt.target.value;
  FIELD_TIMEIN.value = currentValue;
};

const submitFormHandler = function(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData);
  openPopup(POPUP_SUCCESS_TEMPLATE, MAIN_BLOCK);
  // openPopup(POPUP_ERROR_TEMPLATE, MAIN_BLOCK);
  AD_FORM.reset();
  setAddress(DEFAULT_COORD);
};

const resetFormHandler = function(evt) {
  evt.preventDefault();
  AD_FORM.reset();
  setAddress(DEFAULT_COORD);
}

const addEventListeners = function() {
  FIELD_TYPE.addEventListener('change', fieldTypeChangeHandler);
  FIELD_TIMEIN.addEventListener('change', fieldTimeinChangeHandler);
  FIELD_TIMEOUT.addEventListener('change', fieldTimeoutChangeHandler);
  FIELD_ROOM_NUMBER.addEventListener('change', fieldRoomNumberChangeHandler);
  AD_FORM.addEventListener('submit', submitFormHandler);
  // AD_FORM.addEventListener('reset', resetFormHandler);
  AD_FORM_RESET.addEventListener('click', resetFormHandler);
};

const disableForms = function() {
  disableFormFields(AD_FORM, 'fieldset');
  disableFormFields(MAP_FILTERS, 'select');
};

const enableForms = function() {
  enableFormFields(AD_FORM, 'fieldset');
  enableFormFields(MAP_FILTERS, 'select');
};

const setAddress = function({lat, lng}) {
  FIELD_ADDRESS.value = `${getRoundNumber(lat)}, ${getRoundNumber(lng)}`;
};

export {addEventListeners, disableForms, setAddress, enableForms}
