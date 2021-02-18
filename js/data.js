import {getRandomNumber, getRandomArrayElement, getRandomArrayList} from './utils.js';

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

const TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

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

const Prices = {
  MIN: 1000,
  MAX: 30000,
}

const Rooms = {
  MIN: 1,
  MAX: 4,
}

const Guests = {
  MIN: 0,
  MAX: 5,
}

const Coords = {
  MIN_X: 35.65,
  MAX_X: 35.70,
  MIN_Y: 139.70,
  MAX_Y: 139.80,
}

const OFFERS_COUNT = 10;
const DIGITS_COUNT = 2;
const AVATARS_MAX_INDEX = 8;

const fillAvatarImgUrl = function(number) {
  const numberPrefix = `${number}`.padStart(2, '0');

  return `img/avatars/user${numberPrefix}.png`;
}

const fillAvatars = function() {
  let avatars = [];

  for (let i = 1; i <= AVATARS_MAX_INDEX; i++) {
    avatars.push(fillAvatarImgUrl(i));
  }

  return avatars;
};

const AVATARS = fillAvatars();

const createAd = function() {
  const coordY = getRandomNumber(Coords.MIN_Y, Coords.MAX_Y, DIGITS_COUNT);
  const coordX = getRandomNumber(Coords.MIN_X, Coords.MAX_X, DIGITS_COUNT);

  return {
    author: {
      avatar: getRandomArrayElement(AVATARS),
    },
    offer: {
      titles: getRandomArrayElement(TITLES),
      address: {x: coordX, y: coordY},
      price: getRandomNumber(Prices.MIN, Prices.MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRandomNumber(Guests.MIN, Guests.MAX),
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
  const ads = [];

  for (let i = 0; i < OFFERS_COUNT; i++) {
    ads[i] = createAd();
  }

  return ads;
};

const ads = fillAds();

export {ads, TYPES};
