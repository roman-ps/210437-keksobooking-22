import {getRandomNumber, getRandomElement, getRandomArrayList} from './utils.js';

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

const HOUSE_TYPES = {
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

const fillAvatarImgUrl = (number) => {
  const id = `${number}`.padStart(2, '0');

  return `img/avatars/user${id}.png`;
}

const fillAvatars = (maxIndex) => {
  let avatars = [];

  for (let i = 1; i <= maxIndex; i++) {
    avatars.push(fillAvatarImgUrl(i));
  }

  return avatars;
};

const AVATARS = fillAvatars(AVATARS_MAX_INDEX);

const createAd = () => {
  const coordY = getRandomNumber(Coords.MIN_Y, Coords.MAX_Y, DIGITS_COUNT);
  const coordX = getRandomNumber(Coords.MIN_X, Coords.MAX_X, DIGITS_COUNT);
  const checks = getRandomElement(CHECKINS);

  return {
    author: {
      avatar: getRandomElement(AVATARS),
    },
    offer: {
      titles: getRandomElement(TITLES),
      address: {x: coordX, y: coordY},
      price: getRandomNumber(Prices.MIN, Prices.MAX),
      type: getRandomElement(HOUSE_TYPES),
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRandomNumber(Guests.MIN, Guests.MAX),
      checkin: checks,
      checkout: checks,
      features: getRandomArrayList(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArrayList(PHOTOS),
    },
    location: {
      x: coordX,
      y: coordY,
    },
  };
};

const getAdsData = (offersCount) => {
  const ads = [];

  for (let i = 0; i < offersCount; i++) {
    ads[i] = createAd();
  }

  return ads;
};

export {getAdsData, HOUSE_TYPES, OFFERS_COUNT};
