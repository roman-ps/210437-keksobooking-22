import {hasObjKey} from './utils.js';

const DEFAULT_FEATURES_VALUES = {
  'filter-wifi': false,
  'filter-dishwasher': false,
  'filter-parking': false,
  'filter-washer': false,
  'filter-elevator': false,
  'filter-conditioner': false,
};

const SelectKeys = {
  TYPE: 'housing-type',
  PRICE: 'housing-price',
  ROOMS: 'housing-rooms',
  GUESTS: 'housing-guests',
}

const DEFAULT_VALUES = {
  [SelectKeys.TYPE]: '',
  [SelectKeys.PRICE]: '',
  [SelectKeys.ROOMS]: '',
  [SelectKeys.GUESTS]: '',
};

const Price = {
  LOW: 10000,
  HIGH: 50000,
};

const TYPE_PRICE = {
  'all': 'any',
  'budget': 'low',
  'average': 'middle',
  'rich': 'high',
}

const checkPrice = (type, price) => {
  switch (type) {
    case TYPE_PRICE.all:
      return true;
    case TYPE_PRICE.budget:
      return price < Price.LOW;
    case TYPE_PRICE.average:
      return price >= Price.LOW && price < Price.HIGH;
    case TYPE_PRICE.rich:
      return price >= Price.HIGH;
    default:
      return false;
  }
};

const getDefaultValues = () => ({
  ...DEFAULT_VALUES,
  ...DEFAULT_FEATURES_VALUES,
});

const actualValues = getDefaultValues();

const setFieldValue = (key, value) => {
  if (hasObjKey(DEFAULT_VALUES, key)) {
    actualValues[key] = value;
  } else {
    throw new Error(`Ошибка, отсутствует ключ ${key}`);
  }
};

const setCheckboxValue = (key, value) => {
  if (hasObjKey(DEFAULT_FEATURES_VALUES, key)) {
    actualValues[key] = value;
  } else {
    throw new Error(`Ошибка, отсутствует ключ ${key}`);
  }
};

const checkFeatures = (features) => {
  for (let key in DEFAULT_FEATURES_VALUES) {
    if (actualValues[key] && !features.includes(key.replace('filter-', ''))) {
      return false;
    }
  }

  return true;
};

const checkSelectKeys = (key, type) => {
  if (actualValues[key] && actualValues[key] !== 'any' && `${type}` !== actualValues[key]) {

    return false;
  }
};

const checkSelectPriceKeys = (key, type) => {
  if (actualValues[key] && actualValues[key] !== 'any' && !checkPrice(actualValues[key], type)) {

    return false;
  }
};

// const checkSelectAllKeys = (key, type, price = 'false') => {
//   if (price) {
//     if (actualValues[key] && actualValues[key] !== 'any' && !checkPrice(actualValues[key], type)) {

//       return false;
//     }
//   }
//   if (actualValues[key] && actualValues[key] !== 'any' && `${type}` !== actualValues[key]) {

//     return false;
//   }
// };

const checkData = (data) => {
  checkSelectKeys(SelectKeys.TYPE, data.offer.type);
  checkSelectPriceKeys(SelectKeys.PRICE, data.offer.price);
  checkSelectKeys(SelectKeys.ROOMS, data.offer.rooms);
  checkSelectKeys(SelectKeys.GUESTS, data.offer.guests);
  // if (actualValues[SelectKeys.TYPE] && actualValues[SelectKeys.TYPE] !== 'any' && `${data.offer.type}` !== actualValues[SelectKeys.TYPE]) {
  //   return false;
  // }

  // if (actualValues[SelectKeys.PRICE] && actualValues[SelectKeys.PRICE] !== 'any' && !checkPrice(actualValues[SelectKeys.PRICE], data.offer.price)) {
  //   return false;
  // }

  // if (actualValues[SelectKeys.ROOMS] && actualValues[SelectKeys.ROOMS] !== 'any' && `${data.offer.rooms}` !== actualValues[SelectKeys.ROOMS]) {
  //   return false;
  // }

  // if (actualValues[SelectKeys.GUESTS] && actualValues[SelectKeys.GUESTS] !== 'any' && `${data.offer.guests}` !== actualValues[SelectKeys.GUESTS]) {
  //   return false;
  // }

  return checkFeatures(data.offer.features);
};

export {setFieldValue, setCheckboxValue, checkData}
