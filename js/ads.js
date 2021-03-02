import {HOUSE_TYPES} from './data.js';
import {getNodes, pluralize} from './utils.js';

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
]

const GUESTS_OPTIONS = [
  'гостя',
  'гостей',
  'гостей',
]

const getHouseType = function(type) {
  return HOUSE_TYPES[type];
};

const renderFeatures = function(parent, features) {
  let children = parent.querySelectorAll(POPUP_SELECTORS.feature);
  let fragment = document.createDocumentFragment()

  children.forEach(function(child) {
    child.classList.add('hidden');
    features.forEach(function(feature) {
      if (child.className.includes(feature)) {
        child.classList.remove('hidden');
      }
      fragment.appendChild(child);
    })
  })

  return fragment;
};

const renderPhotos = function(parent, photos) {
  let img = parent.querySelector(POPUP_SELECTORS.photo);
  let fragment = document.createDocumentFragment()

  img.classList.add('hidden');
  photos.forEach(function(elem) {
    let newImg = img.cloneNode(true);
    newImg.setAttribute('src', elem);
    newImg.classList.remove('hidden');
    fragment.appendChild(newImg);
  })
  parent.removeChild(img);

  return fragment;
};

const getCapacityText = function(offer) {
  const rooms = pluralize(offer.rooms, ROOMS_OPTIONS);
  const guests = pluralize(offer.rooms, GUESTS_OPTIONS);
  return `${offer.rooms} ${rooms} для ${offer.guests} ${guests}`;
}

const fillCard = function(cardData) {
  const ad = CARD_TEMPLATE.content.cloneNode(true);
  const adNodes = getNodes(SELECTORS, ad);

  adNodes.title.textContent = cardData.offer.titles;
  adNodes.address.textContent = `${cardData.offer.address.x}, ${cardData.offer.address.y}`;
  adNodes.price.innerHTML = `${cardData.offer.price} <span>₽/ночь</span>`;
  adNodes.type.textContent = getHouseType(cardData.offer.type);
  adNodes.capacity.textContent = getCapacityText(cardData.offer);
  adNodes.time.textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  adNodes.features.appendChild(renderFeatures(adNodes.features, cardData.offer.features));
  adNodes.description.textContent = cardData.offer.description;
  adNodes.photos.appendChild(renderPhotos(adNodes.photos, cardData.offer.photos));
  adNodes.avatar.src = cardData.author.avatar;

  return ad;
}

export {fillCard};
