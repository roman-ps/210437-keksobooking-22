const getRandomInteger = function(min, max) {
  if (isNaN(min) || isNaN(max)) throw new Error('Аргумент не является числом!');
  return Math.round(Math.min(min, max) + Math.random() * Math.abs(min - max));
};

const getRandomFloat = function(min, max, digits = 0) {
  if (isNaN(min) || isNaN(max) || isNaN(digits)) throw new Error('Аргумент не является числом!');
  return (Math.min(min, max) + Math.random() * Math.abs(min - max)).toFixed(digits);
};

const getRandomArrayElement = function(array) {
  return array[getRandomInteger(0, array.length - 1)];
};

const getRandomArrayList = function(array) {
  let newArray = Array.from(array);
  return newArray.filter(function(elem) {
    if (getRandomInteger(1, 100) > 50) {
      return elem;
    }
  });
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArrayList};
