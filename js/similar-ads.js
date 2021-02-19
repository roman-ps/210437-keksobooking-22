import {ads, TYPES} from './data.js';

const TMPL = document.querySelector('#card');
const POPUP = TMPL.content.querySelector('.popup');
const MAP_CANVAS = document.querySelector('#map-canvas');

const Popup = {
  FUTURE: '.popup__feature',
  PHOTO: '.popup__photo',
}

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
  let children = parent.querySelectorAll(Popup.FUTURE);

  for (let i = 0; i < children.length; i++) {
    children[i].classList.add('hidden')
    for (let j = 0; j < features.length; j++) {
      if (children[i].className.includes(features[j])) {
        children[i].classList.remove('hidden');
      }
    }
  }
};

const renderPhotos = function(parent, photos) {
  const IMG = parent.querySelector(Popup.PHOTO);     // ищем элемент img в родительском элементе popup__photos
  const FRAGMENT = document.createDocumentFragment()

  IMG.classList.add('hidden');                       // скрываем его
  for (let i = 0; i < photos.length; i++) {          // в цикле:
    let newImg = IMG.cloneNode(true);                // клонируем скрытый элемент
    newImg.src = photos[i];                          // меняем значение атрибута src
    newImg.classList.remove('hidden')                // показываем его
    FRAGMENT.appendChild(newImg);                    // вставляем в родительский элемент
  }
  parent.appendChild(FRAGMENT)
  parent.removeChild(IMG);                           // удаляем изначальный элемент
};

const fillAds = function() {
  const FRAGMENT = document.createDocumentFragment();
  for (let i = 0; i < ads.length; i++) {
    const ad = POPUP.cloneNode(true);
    const adNodes = getNodes(Selectors, ad);
    let title = adNodes.TITLE;
    let address = adNodes.ADDRESS;
    let price = adNodes.PRICE;
    let type = adNodes.TYPE;
    let capacity = adNodes.CAPACITY;
    let time = adNodes.TIME;
    let features = adNodes.FEATURES;
    let description = adNodes.DESCRIPTION;
    let photos = adNodes.PHOTOS;
    let avatar = adNodes.AVATAR;
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
    FRAGMENT.appendChild(ad);
  }

  return FRAGMENT;
};

const renderAds = fillAds();

MAP_CANVAS.appendChild(renderAds.childNodes[0]);

export {renderAds};

/* eslint-disable no-console*/
console.log(ads);
/* eslint-enable no-console*/
