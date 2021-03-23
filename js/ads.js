import {HOUSE_TYPES} from './data.js';
import {getRoundNumber, getNodes, pluralize} from './utils.js';

const CARD_TEMPLATE = document.querySelector('#card');

const POPUP_SELECTORS = {
  feature: '.popup__feature',
  photo: '.popup__photo',
};

const SELECTORS = {
  title: '.popup__title',
  address: '.popup__text--address',
  price: '.popup__text--price',
  type: '.popup__type',
  capacity: '.popup__text--capacity',
  time: '.popup__text--time',
  features: '.popup__features',
  description: '.popup__description',
  photos: '.popup__photos',
  avatar: '.popup__avatar',
};

const ROOMS_OPTIONS = [
  'комната',
  'комнаты',
  'комнат',
];

const GUESTS_OPTIONS = [
  'гостя',
  'гостей',
  'гостей',
];

const getHouseType = function(type) {
  return HOUSE_TYPES[type];
};

const prepareFeatures = function(parent, features) {
  let children = parent.querySelectorAll(POPUP_SELECTORS.feature);

  children.forEach(function(child) {
    child.classList.add('hidden');
    features.forEach(function(feature) {
      if (child.className.includes(feature)) {
        child.classList.remove('hidden');
      }
    })
  })

};

const renderPhotos = function(parent, photos) {
  const imgElement = parent.querySelector(POPUP_SELECTORS.photo);
  const img = imgElement.cloneNode(true);
  const fragment = document.createDocumentFragment();

  parent.removeChild(imgElement);

  photos.forEach(function(elem) {
    let newImg = img.cloneNode(true);
    newImg.setAttribute('src', elem);
    fragment.appendChild(newImg);
  })

  return fragment;
};

const getCapacityText = function(offer) {
  const rooms = pluralize(offer.rooms, ROOMS_OPTIONS);
  const guests = pluralize(offer.rooms, GUESTS_OPTIONS);

  return `${offer.rooms} ${rooms} для ${offer.guests} ${guests}`;
};

const getAddressCoords = function({lat, lng}) {
  return `${getRoundNumber(lat)}, ${getRoundNumber(lng)}`;
};

const fillCard = function(cardData) {
  const ad = CARD_TEMPLATE.content.cloneNode(true);
  const adNodes = getNodes(SELECTORS, ad);

  adNodes.title.textContent = cardData.offer.titles;
  adNodes.address.textContent = getAddressCoords(cardData.location);
  adNodes.price.innerHTML = `${cardData.offer.price} <span>₽/ночь</span>`;
  adNodes.type.textContent = getHouseType(cardData.offer.type);
  adNodes.capacity.textContent = getCapacityText(cardData.offer);
  adNodes.time.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  prepareFeatures(adNodes.features, cardData.offer.features);
  adNodes.description.textContent = cardData.offer.description;
  adNodes.photos.appendChild(renderPhotos(adNodes.photos, cardData.offer.photos));
  adNodes.avatar.src = cardData.author.avatar;

  return ad;
};

export {fillCard};
