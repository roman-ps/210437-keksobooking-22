import {ads} from './data.js';
/* eslint-disable no-console*/

/* eslint-enable no-console*/

const TMPL = document.querySelector('#card');
const POPUP = TMPL.content.querySelector('.popup');
const MAP_CANVAS = document.querySelector('#map-canvas');
const SIMILAR_FRAGMENT = document.createDocumentFragment();

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
  let childrens = parent.querySelectorAll('.popup__feature');
  childrens.forEach((elem) => elem.classList.add('hidden'));
  for (let i = 0; i < childrens.length; i++) {
    for (let j = 0; j < features.length; j++) {

      // console.log(`childrens[i]: ${childrens[i].className}`);
      // console.log(`features[j]: ${features[j]}`);

      if (childrens[i].className.includes(features[j])) {
        childrens[i].classList.remove('hidden');
      }
      /* console.log(...childrens[i].className)
      if (([...childrens[i].className]).some((features[j]))) {
        console.log('Урраааа')
      } */
    }
  }
}

const fillSimilarAds = function() {
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

    renderFeatures(features, ads[i].offer.features)
    description.textContent = ads[i].offer.description;
    avatar.src = ads[i].author.avatar;
    SIMILAR_FRAGMENT.appendChild(similarAd);
  }
};

fillSimilarAds()

MAP_CANVAS.appendChild(SIMILAR_FRAGMENT)

export {fillSimilarAds};
console.log(ads)
