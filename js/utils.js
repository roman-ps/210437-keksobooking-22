const getRandomNumber = (min, max, digits = 0, r = Math.random()) => {
  if (isNaN(min) || isNaN(max) || isNaN(digits)) {
    throw new Error('Аргумент не является числом!');
  }
  let degree =  Math.pow(10, digits);
  let randomNumber = Math.min(min, max) + r * Math.abs(min - max);

  return Math.round(randomNumber * degree) / degree;
};

const getRandomElement = (array) => {
  if (typeof array !== 'object' || array === null) {
    throw new Error('Неправильный формат данных!');
  }
  let newArray = Array.isArray(array) ? array : Object.keys(array);

  return newArray[getRandomNumber(0, newArray.length - 1)];
};

const getRandomArrayList = (array) => {
  let newArray = Array.from(array);

  return newArray.filter(function() {
    return (getRandomNumber(1, 100) > 50)
  });
};

const getNodes = (selectors, parent) => {
  let nodes = {}
  const keys = Object.entries(selectors);

  for (let [key, value] of keys) {
    nodes[key] = parent.querySelector(value);
  }

  return nodes;
};

const pluralize = (n, variants) => {
  return variants[[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]];
};

const getRoundNumber = (number, digits = 5) => {
  let degree =  Math.pow(10, digits);
  return Math.round(number * degree) / degree;
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const hasObjKey = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export {getRandomNumber, getRandomElement, getRandomArrayList, getNodes, pluralize, getRoundNumber, isEscEvent, hasObjKey};
