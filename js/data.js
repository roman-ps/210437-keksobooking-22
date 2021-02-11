import {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayList} from './utils.js';

const AVATARS_MAX_INDEX = 8;

const fillAvatars = function() {
  let newArray = [];
  for (let i = 1; i <= AVATARS_MAX_INDEX; i++) {
    newArray.push(`img/avatars/user0${i}.png`);
  }
  return newArray;
};

const AVATARS = fillAvatars();

const TITLES = [
  'Уютная квартирка в центре города',
  'Просторные аппартаменты в спальном районе',
  'Большой и красивый дом с фонтаном',
  'Небольшая студия около центрального парка',
  'Маленькая комнатка у стадиона',
  'Просторная квартира с окнами на церковь',
  'Роскошные апартаменты с большими окнами',
  'Бунгало на диком пляже',
];

const DESCRIPTIONS = [
  'Отличное жилье в центре города',
  'Прекрасный вид на центральный парк',
  'Окна выходят на стадион',
  'Рукой подать до пляжа',
  'Вокруг прекрасный сад',
  'Из окна видны высокие горы',
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const OFFERS_COUNT = 10;
const MIN_PRICE = 1000;
const MAX_PRICE = 30000;
const DIGITS_COUNT = 2;
const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 4;
const MIN_GUEST_COUNT = 0;
const MAX_GUEST_COUNT = 5;
const MIN_LOCATION_X = 35.65;
const MAX_LOCATION_X = 35.70;
const MIN_LOCATION_Y = 139.70;
const MAX_LOCATION_Y = 139.80;

const createAd = function() {
  const coordY = getRandomFloat(MIN_LOCATION_Y, MAX_LOCATION_Y, DIGITS_COUNT);
  const coordX = getRandomFloat(MIN_LOCATION_X, MAX_LOCATION_X, DIGITS_COUNT);
  return {
    author: {
      avatar: getRandomArrayElement(AVATARS),
    },
    offer: {
      titles: getRandomArrayElement(TITLES),
      address: {x: coordX, y: coordY},
      price: getRandomInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomInteger(MIN_ROOM_COUNT, MAX_ROOM_COUNT),
      guests: getRandomInteger(MIN_GUEST_COUNT, MAX_GUEST_COUNT),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKINS),
      features: getRandomArrayList(FEATURES),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getRandomArrayList(PHOTOS),
    },
    location: {
      x: coordX,
      y: coordY,
    },
  };
};

const fillAds = function() {
  const newAds = new Array(OFFERS_COUNT);
  for (let i = 0; i < OFFERS_COUNT; i++) {
    newAds[i] = createAd();
  }
  return newAds;
};

let ads = fillAds();
/* eslint-disable no-console*/
console.log(ads)
/* eslint-enable no-console*/
