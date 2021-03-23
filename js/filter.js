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
}

const DEFAULT_VALUES = {
  [SelectKeys.TYPE]: '',
  'housing-price': '',
  'housing-rooms': '',
  'housing-guests': '',
};

const Price = {
  LOW: 10000,
  HIGH: 50000,
};

const checkPrice = (type, price) => {
  switch (type) {
    case 'any': //----------------
      return true;
    case 'low':
      return price < Price.LOW;
    case 'middle':
      return price >= Price.LOW && price < Price.HIGH;
    case 'high':
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
  if (Object.prototype.hasOwnProperty.call(DEFAULT_VALUES, key)) { //-----------------
    actualValues[key] = value;
  } else {
    throw new Error(`Ошибка, отсутствует ключ ${key}`);
  }
};

const setCheckboxValue = (key, value) => {
  if (Object.prototype.hasOwnProperty.call(DEFAULT_FEATURES_VALUES, key)) {
    actualValues[key] = value;
  } else {
    throw new Error(`Ошибка, отсутствует ключ ${key}`);
  }
};

const checkFeatures = (features) => {
  for (let key in DEFAULT_FEATURES_VALUES) {
    if (actualValues[key] && !features.includes(key.replace('filter-', ''))) {  //-----------------
      return false;
    }
  }

  return true;
};

const checkData = (data) => {
  if (actualValues[SelectKeys.TYPE] && actualValues[SelectKeys.TYPE] !== 'any' && `${data.offer.type}` !== actualValues[SelectKeys.TYPE]) {
    return false; //---------------------------
  }

  if (actualValues['housing-price'] && actualValues['housing-price'] !== 'any' && !checkPrice(actualValues['housing-price'], data.offer.price)) {
    return false;
  }

  if (actualValues['housing-rooms'] && actualValues['housing-rooms'] !== 'any' && `${data.offer.rooms}` !== actualValues['housing-rooms']) {
    return false;
  }

  if (actualValues['housing-guests'] && actualValues['housing-guests'] !== 'any' && `${data.offer.guests}` !== actualValues['housing-guests']) {
    return false;
  }

  return checkFeatures(data.offer.features);
};

export {setFieldValue, setCheckboxValue, checkData}
