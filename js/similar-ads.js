import {ads, TYPES} from './data.js';

const TMPL = document.querySelector('#card');
const POPUP = TMPL.content.querySelector('.popup');
const MAP_CANVAS = document.querySelector('#map-canvas');

const Popup = {
  FUTURE: '.popup__feature',
  PHOTO: '.popup__photo',
}

const Selectors = {
  Title: '.popup__title',
  Address: '.popup__text--address',
  Price: '.popup__text--price',
  Type: '.popup__type',
  Capacity: '.popup__text--capacity',
  Time: '.popup__text--time',
  Features: '.popup__features',
  Description: '.popup__description',
  Photos: '.popup__photos',
  Avatar: '.popup__avatar',
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
    adNodes.Title.textContent = ads[i].offer.titles;
    adNodes.Address.textContent = `${ads[i].offer.address.x}, ${ads[i].offer.address.y}`;
    adNodes.Price.innerHTML = `${ads[i].offer.price} <span>₽/ночь</span>`;
    adNodes.Type.textContent = chooseType(ads[i].offer.type);
    adNodes.Capacity.textContent = `${ads[i].offer.rooms} комнаты для ${ads[i].offer.guests} гостей`;
    adNodes.Time.textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
    renderFeatures(adNodes.Features, ads[i].offer.features);
    adNodes.Description.textContent = ads[i].offer.description;
    renderPhotos(adNodes.Photos, ads[i].offer.photos)
    adNodes.Avatar.src = ads[i].author.avatar;
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
