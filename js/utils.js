const getRandomNumber = function(min, max, digits = 0, r = Math.random()) {
  if (isNaN(min) || isNaN(max) || isNaN(digits)) {
    throw new Error('Аргумент не является числом!');
  }
  let degree =  Math.pow(10, digits);
  let randomNumber = Math.min(min, max) + r * Math.abs(min - max);

  return Math.round(randomNumber * degree) / degree;
};

const getRandomArrayElement = function(array) {
  if (typeof array !== 'object' || array === null) {
    throw new Error('Неправильный формат данных!');
  }
  let newArray = Array.isArray(array) ? array : Object.keys(array);

  return newArray[getRandomNumber(0, newArray.length - 1)];
};

const getRandomArrayList = function(array) {
  let newArray = Array.from(array);

  return newArray.filter(function() {
    return (getRandomNumber(1, 100) > 50)
  });
};

const getNodes = function(selectors, parent) {
  let nodes = {}
  const keys = Object.entries(selectors);

  for (let [key, value] of keys) {
    nodes[key] = parent.querySelector(value);
  }

  return nodes;
}

export {getRandomNumber, getRandomArrayElement, getRandomArrayList, getNodes};
