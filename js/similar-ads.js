import {ads, TYPES} from './data.js';

const TMPL = document.querySelector('#card');
const POPUP = TMPL.content.querySelector('.popup');
const MAP_CANVAS = document.querySelector('#map-canvas');

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

const getNodes = function(selectors, parent) {
  let nodes = {}
  const keys = Object.entries(selectors);

  for (let [key, value] of keys) {
    nodes[key] = parent.querySelector(value);
  }

  return nodes;
}

const chooseType = function(type) {
  return TYPES[type];
};

const renderFeatures = function(parent, features) {
  let childs = parent.querySelectorAll('.popup__feature');

  childs.forEach((elem) => elem.classList.add('hidden'));
  for (let i = 0; i < childs.length; i++) {
    for (let j = 0; j < features.length; j++) {
      if (childs[i].className.includes(features[j])) {
        childs[i].classList.remove('hidden');
      }
    }
  }
};

const renderPhotos = function(parent, photos) {
  const IMG = parent.querySelector('.popup__photo'); // ищем элемент img в родительском элементе popup__photos

  IMG.classList.add('hidden');                       // скрываем его
  for (let i = 0; i < photos.length; i++) {          // в цикле:
    let newImg = IMG.cloneNode(true);                // клонируем скрытый элемент
    newImg.src = photos[i];                          // меняем значение атрибута src
    newImg.classList.remove('hidden')                // показываем его
    parent.appendChild(newImg);                      // вставляем в родительский элемент
  }
  parent.removeChild(IMG);                           // удаляем изначальный элемент
};

const fillSimilarAds = function() {
  const SIMILAR_FRAGMENT = document.createDocumentFragment();

  for (let i = 0; i < ads.length; i++) {
    const similarAd = POPUP.cloneNode(true);
    const similarAdNodeS = getNodes(Selectors, similarAd);
    let title = similarAdNodeS.TITLE;
    let address = similarAdNodeS.ADDRESS;
    let price = similarAdNodeS.PRICE;
    let type = similarAdNodeS.TYPE;
    let capacity = similarAdNodeS.CAPACITY;
    let time = similarAdNodeS.TIME;
    let features = similarAdNodeS.FEATURES;
    let description = similarAdNodeS.DESCRIPTION;
    let photos = similarAdNodeS.PHOTOS;
    let avatar = similarAdNodeS.AVATAR;
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

export {renderSimilarAds};

/* eslint-disable no-console*/
console.log(ads);
/* eslint-enable no-console*/
