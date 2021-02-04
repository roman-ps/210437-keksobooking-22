'use strict';

let getRandomInteger = function(min, max) {
  if (isNaN(min) || isNaN(max)) throw new Error('Аргумент не является числом!');
  return Math.round(Math.min(min, max) + Math.random() * Math.abs(min - max));
};

let getRandomFloat = function(min, max, digits = 0) {
  if (isNaN(min) || isNaN(max) || isNaN(digits)) throw new Error('Аргумент не является числом!');
  return (Math.min(min, max) + Math.random() * Math.abs(min - max)).toFixed(digits);
};

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

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
// const newAds = new Array(OFFERS_COUNT);

const getRandomArrayElement = function(array) {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArrayList = function(array) {
  let newArray = Array.from(array);
  return newArray.splice(getRandomInteger(0, newArray.length-1), getRandomInteger(0, newArray.length-1))
};

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
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      x: coordX,
      y: coordY,
    },
  };
};

const setAds = function() {
  const newAds = new Array(OFFERS_COUNT);
  for (let i = 0; i < OFFERS_COUNT; i++) {
    newAds[i] = createAd();
  }
  return newAds;
};

let renderAds = setAds();
console.log(renderAds)
