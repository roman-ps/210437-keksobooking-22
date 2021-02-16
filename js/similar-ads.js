import {ads} from './data.js';
/* eslint-disable no-console*/

/* eslint-enable no-console*/

const TMPL = document.querySelector('#card');
const POPUP = TMPL.content.querySelector('.popup');
const MAP_CANVAS = document.querySelector('#map-canvas');
// const SIMILAR_FRAGMENT = document.createDocumentFragment();
const NODES = {};

const Selectors = {
  TITLE: '.popup__title',
  ADDRESS: '.popup__text--address',
  PRICE: '.popup__text--price',
  TYPE: '.popup__type',
  CAPACITY: '.popup__text--capacity',
  TIME: '.popup__text--time',
  FEATURES: '.popup__features',
  DESCRIPTION: '.popup__description',
  PHOTOS: '.popup__photos',
  AVATAR: '.popup__avatar',
};

console.log(Selectors)

const transferToNodes = function() {
  let key = Object.keys(Selectors);
  // console.log(key);
  for (let i = 0; i < key.length; i++) {
    // console.log('Selectors[key[i]]: ', Selectors[key[i]])
    NODES[key[i]] = document.querySelector(Selectors[key[i]]);
    // console.log(NODES[key[i]]);
    // console.log(Selectors[key[i]]);
  }
}


// transferToNodes();
document.addEventListener('DOMContentLoaded', transferToNodes);
// console.log(NODES)

const chooseType = function(type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
  }
};

const renderFeatures = function(parent, features) {
  let childs = parent.querySelectorAll('.popup__feature');
  childs.forEach((elem) => elem.classList.add('hidden'));
  for (let i = 0; i < childs.length; i++) {
    for (let j = 0; j < features.length; j++) {

      // console.log(`childs[i]: ${childs[i].className}`);
      // console.log(`features[j]: ${features[j]}`);

      if (childs[i].className.includes(features[j])) {
        childs[i].classList.remove('hidden');
      }

      /* console.log(...childs[i].className)
      console.log(childs[i].className.split())
      if ([...childs[i].className].some((features[j]))) {
        console.log('Урраааа')
      } */
    }
  }
};

const renderPhotos = function(parent, photos) {
  const IMG = parent.querySelector('.popup__photo');
  IMG.classList.add('hidden');
  for (let i = 0; i < photos.length; i++) {
    let newImg = IMG.cloneNode(true);
    newImg.src = photos[i];
    newImg.classList.remove('hidden')
    parent.appendChild(newImg);
  }
  parent.removeChild(IMG);
};

const fillSimilarAds = function() {
  const SIMILAR_FRAGMENT = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    const similarAd = POPUP.cloneNode(true);
    let title = similarAd.querySelector('.popup__title');
    let address = similarAd.querySelector('.popup__text--address');
    let price = similarAd.querySelector('.popup__text--price');
    let type = similarAd.querySelector('.popup__type');
    let capacity = similarAd.querySelector('.popup__text--capacity');
    let time = similarAd.querySelector('.popup__text--time');
    let features = similarAd.querySelector('.popup__features');
    let description = similarAd.querySelector('.popup__description');
    let photos = similarAd.querySelector('.popup__photos');
    let avatar = similarAd.querySelector('.popup__avatar');
    title.textContent = ads[i].offer.titles;
    address.textContent = `${ads[i].offer.address.x}, ${ads[i].offer.address.y}`;
    price.innerHTML = `${ads[i].offer.price} <span>₽/ночь</span>`;
    type.textContent = chooseType(ads[i].offer.type);
    capacity.textContent = `${ads[i].offer.rooms} комнаты для ${ads[i].offer.guests} гостей`;
    time.textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
    renderPhotos(photos, ads[i].offer.photos)
    renderFeatures(features, ads[i].offer.features);
    description.textContent = ads[i].offer.description;
    avatar.src = ads[i].author.avatar;
    SIMILAR_FRAGMENT.appendChild(similarAd);
  }
  return SIMILAR_FRAGMENT;
};

const renderSimilarAds = fillSimilarAds();

MAP_CANVAS.appendChild(renderSimilarAds.childNodes[0]);

export {fillSimilarAds};
console.log(ads);
