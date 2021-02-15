import {ads} from './data.js';
/* eslint-disable no-console*/

/* eslint-enable no-console*/

const TMPL = document.querySelector('#card');
const POPUP = TMPL.content.querySelector('.popup');
const MAP_CANVAS = document.querySelector('#map-canvas');

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
    default:
      throw new Error('Нет нужного значения');
  }
};

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
    address.textContent = ads[i].offer.address;
    price.innerHTML = `${ads[i].offer.price} <span>₽/ночь</span>`;
    type.textContent = chooseType(ads[i].offer.type);
    capacity.textContent = `${ads[i].offer.rooms} комнаты для ${ads[i].offer.guests} гостей`;
    time.textContent = `Заезд после ${ads[i].offer.checkin}, выезд до ${ads[i].offer.checkout}`;
    description.textContent = ads[i].offer.description;
    avatar.src = ads[i].author.avatar;
    MAP_CANVAS.appendChild(similarAd);
    console.log(features.children)
  }
};

fillSimilarAds()
console.log(ads[1].offer.features)
console.log(ads[1].offer.features.length)
for (let i = 0; i < ads[1].offer.features.length; i++) {
  console.log(ads[1].offer.features[i]);
}
export {fillSimilarAds};
console.log(ads)
