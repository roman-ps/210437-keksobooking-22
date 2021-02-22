import {ads, HOUSE_TYPES} from './data.js';
import {getNodes} from './utils.js';

const TMPL = document.querySelector('#card');

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

const pluralize = function(n, variants) {
  return variants[[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]];
}

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

const fillAds = function() {
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < ads.length; i++) {
    const ad = TMPL.content.cloneNode(true);
    const adNodes = getNodes(SELECTORS, ad);
    const rooms = pluralize(ads[i].offer.rooms, ROOMS_OPTIONS);
    const guests = pluralize(ads[i].offer.rooms, GUESTS_OPTIONS);
    adNodes.title.textContent = ads[i].offer.titles;
    adNodes.address.textContent = `${ads[i].offer.address.x}, ${ads[i].offer.address.y}`;
    adNodes.price.innerHTML = `${ads[i].offer.price} <span>₽/ночь</span>`;
    adNodes.type.textContent = getHouseType(ads[i].offer.type);
    adNodes.capacity.textContent = `${ads[i].offer.rooms} ${rooms} для ${ads[i].offer.guests} ${guests}`;
    adNodes.time.textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
    adNodes.features.appendChild(renderFeatures(adNodes.features, ads[i].offer.features));
    adNodes.description.textContent = ads[i].offer.description;
    adNodes.photos.appendChild(renderPhotos(adNodes.photos, ads[i].offer.photos));
    adNodes.avatar.src = ads[i].author.avatar;
    fragment.appendChild(ad);
  }

  return fragment;
};

const renderAds = fillAds();

export {renderAds};

/* eslint-disable no-console*/
console.log(renderAds)
/* eslint-enable no-console*/
