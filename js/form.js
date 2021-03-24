import {sendData} from './api.js';
import {openPopup} from './popup.js';
import {getRoundNumber} from './utils.js';
import {DEFAULT_COORD} from './map.js';

const AD_FORM = document.querySelector('.ad-form');
const AD_FORM_RESET = document.querySelector('.ad-form__reset');
const MAP_FILTERS = document.querySelector('.map__filters');
const MAIN_BLOCK = document.querySelector('main');
const PHOTO_AVATAR_PREVIEW = AD_FORM.querySelector('.ad-form-header__preview img');
const PHOTO_HOUSE_PREVIEW = AD_FORM.querySelector('.ad-form__photo');
const CLONE_PHOTO = PHOTO_AVATAR_PREVIEW.cloneNode(true);
const POPUP_SUCCESS_TEMPLATE = document.querySelector('#success');
const POPUP_ERROR_TEMPLATE = document.querySelector('#error');

const FieldNodes = {
  TYPE: AD_FORM.querySelector('#type'),
  PRICE: AD_FORM.querySelector('#price'),
  TIMEIN: AD_FORM.querySelector('#timein'),
  TIMEOUT: AD_FORM.querySelector('#timeout'),
  ADDRESS: AD_FORM.querySelector('#address'),
  ROOM_NUMBER: AD_FORM.querySelector('#room_number'),
  CAPACITY: AD_FORM.querySelector('#capacity'),
  PHOTO_AVATAR: AD_FORM.querySelector('#avatar'),
  PHOTO_HOUSE: AD_FORM.querySelector('#images'),
};

const FILE_TYPES = [
  'gif',
  'jpg',
  'jpeg',
  'png',
];

const CloneSize = {
  width: '70',
  height: '70',
};

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

const fieldPhotoAvatarChange = (evt) => {
  const FILE = evt.target.files[0];
  const FILE_NAME = FILE.name.toLowerCase();

  const matches = FILE_TYPES.some((file) => {
    return FILE_NAME.endsWith(file)
  })

  if (matches) {
    const READER = new FileReader();

    READER.addEventListener('load', () => {
      PHOTO_AVATAR_PREVIEW.src = READER.result;
    })

    READER.readAsDataURL(FILE);
  }
};

const fieldPhotoHouseChange = (evt) => {
  const FILE = evt.target.files[0];
  const FILE_NAME = FILE.name.toLowerCase();

  const matches = FILE_TYPES.some((file) => {
    return FILE_NAME.endsWith(file)
  })

  if (matches) {
    const READER = new FileReader();

    READER.addEventListener('load', () => {
      const CLONE = CLONE_PHOTO;
      CLONE.src = READER.result;
      CLONE.width = CloneSize.width;
      CLONE.height = CloneSize.height;
      PHOTO_HOUSE_PREVIEW.appendChild(CLONE);
    })

    READER.readAsDataURL(FILE);
  }
};

const fieldRoomNumberChangeHandler = function(evt) {
  let value = evt.target.value;
  let options = FieldNodes.CAPACITY.querySelectorAll('option');
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
  FieldNodes.PRICE.setAttribute('placeholder', HOUSE_PRICE[value]);
  FieldNodes.PRICE.setAttribute('min', HOUSE_PRICE[value]);
};

const fieldTimeinChangeHandler = function(evt) {
  let currentValue = evt.target.value;
  FieldNodes.TIMEOUT.value = currentValue;
};

const fieldTimeoutChangeHandler = function(evt) {
  let currentValue = evt.target.value;
  FieldNodes.TIMEIN.value = currentValue;
};

const resetFormHandler = function(evt) {
  evt.preventDefault();
  AD_FORM.reset();
  setAddress(DEFAULT_COORD);
};

const submitFormHandler = function(evt) {
  evt.preventDefault();

  const formData = new FormData(evt.target);
  const dataPromise = sendData(formData);

  dataPromise
    .then(() => {
      openPopup(POPUP_SUCCESS_TEMPLATE, MAIN_BLOCK);
      resetFormHandler(evt);
    })
    .catch(() => {
      openPopup(POPUP_ERROR_TEMPLATE, MAIN_BLOCK, '.error');
    })
};

const getHandleFilterChange = (setSelect, setCheckbox) => (evt) => {
  const field = evt.target;
  if (field.tagName === 'SELECT') {
    setSelect(field.id, field.value);
    return;
  }
  if (field.tagName === 'INPUT') {
    setCheckbox(field.id, field.checked);
    return;
  }
};

let handleFilterChange;

const addEventListeners = function() {
  const {TYPE, TIMEIN, TIMEOUT, ROOM_NUMBER, PHOTO_AVATAR, PHOTO_HOUSE} = FieldNodes;

  TYPE.addEventListener('change', fieldTypeChangeHandler);
  TIMEIN.addEventListener('change', fieldTimeinChangeHandler);
  TIMEOUT.addEventListener('change', fieldTimeoutChangeHandler);
  ROOM_NUMBER.addEventListener('change', fieldRoomNumberChangeHandler);
  AD_FORM.addEventListener('submit', submitFormHandler);
  AD_FORM_RESET.addEventListener('click', resetFormHandler);
  PHOTO_AVATAR.addEventListener('change', fieldPhotoAvatarChange);
  PHOTO_HOUSE.addEventListener('change', fieldPhotoHouseChange);
};

const removeEventListeners = function() {
  const {TYPE, TIMEIN, TIMEOUT, ROOM_NUMBER, PHOTO_AVATAR, PHOTO_HOUSE} = FieldNodes;

  TYPE.removeEventListener('change', fieldTypeChangeHandler);
  TIMEIN.removeEventListener('change', fieldTimeinChangeHandler);
  TIMEOUT.removeEventListener('change', fieldTimeoutChangeHandler);
  ROOM_NUMBER.removeEventListener('change', fieldRoomNumberChangeHandler);
  AD_FORM.removeEventListener('submit', submitFormHandler);
  AD_FORM_RESET.removeEventListener('click', resetFormHandler);
  PHOTO_AVATAR.removeEventListener('change', fieldPhotoAvatarChange);
  PHOTO_HOUSE.removeEventListener('change', fieldPhotoHouseChange);
};

const disableForms = function() {
  disableFormFields(AD_FORM, 'fieldset');
  disableFormFields(MAP_FILTERS, 'select');
  removeEventListeners();
  MAP_FILTERS.removeEventListener('change', handleFilterChange);
  handleFilterChange = null;
};

const enableForms = function(setSelect, setCheckbox) {
  handleFilterChange = getHandleFilterChange(setSelect, setCheckbox);
  MAP_FILTERS.addEventListener('change', handleFilterChange);
  enableFormFields(AD_FORM, 'fieldset');
  enableFormFields(MAP_FILTERS, 'select');
  addEventListeners();
};

const setAddress = function({lat, lng}) {
  FieldNodes.ADDRESS.value = `${getRoundNumber(lat)}, ${getRoundNumber(lng)}`;
};

export {disableForms, setAddress, enableForms}
