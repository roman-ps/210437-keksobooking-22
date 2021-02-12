const getRandomNumber = function(min, max, digits = 0, r = Math.random()) {
  if (isNaN(min) || isNaN(max) || isNaN(digits)) {
    throw new Error('Аргумент не является числом!');
  }
  let degree =  Math.pow(10, digits);
  let randomNumber = Math.min(min, max) + r * Math.abs(min - max);
  return Math.round(randomNumber * degree) / degree;
};

const getRandomArrayElement = function(array) {
  return array[getRandomNumber(0, array.length - 1)];
};

const getRandomArrayList = function(array) {
  let newArray = Array.from(array);
  return newArray.filter(function() {
    return (getRandomNumber(1, 100) > 50)
  });
};

export {getRandomNumber, getRandomArrayElement, getRandomArrayList};
