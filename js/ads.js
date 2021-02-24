import {getAdsData, OFFERS_COUNT, HOUSE_TYPES} from './data.js';
import {getNodes, pluralize} from './utils.js';

const ads = getAdsData(OFFERS_COUNT);

const CARD_TEMPLATE = document.querySelector('#card');

const Popup = {
  FEATURE: '.popup__feature',
  PHOTO: '.popup__photo',
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
  let children = parent.querySelectorAll(Popup.FEATURE);
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
  let img = parent.querySelector(Popup.PHOTO);
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



const fillAds = function(counter) {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < counter; i++) {
    const ad = CARD_TEMPLATE.content.cloneNode(true);
    const adNodes = getNodes(SELECTORS, ad);
    adNodes.title.textContent = ads[i].offer.titles;
    adNodes.address.textContent = `${ads[i].offer.address.x}, ${ads[i].offer.address.y}`;
    adNodes.price.innerHTML = `${ads[i].offer.price} <span>₽/ночь</span>`;
    adNodes.type.textContent = getHouseType(ads[i].offer.type);
    adNodes.capacity.textContent = getCapacityText(ads[i].offer);
    adNodes.time.textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
    adNodes.features.appendChild(renderFeatures(adNodes.features, ads[i].offer.features));
    adNodes.description.textContent = ads[i].offer.description;
    adNodes.photos.appendChild(renderPhotos(adNodes.photos, ads[i].offer.photos));
    adNodes.avatar.src = ads[i].author.avatar;
    fragment.appendChild(ad);
  }

  return fragment;
};

const renderAds = fillAds(OFFERS_COUNT);

export {renderAds};

/* eslint-disable no-console*/

/* eslint-enable no-console*/
