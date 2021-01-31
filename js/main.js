'use strict';

let getRandomInteger = function(min, max) {
  if (isNaN(min) || isNaN(max)) throw new Error('Аргумент не является числом!');
  return Math.round(Number(Math.min(min, max)) + Math.random() * Math.abs(min - max));
}
let getRandomFloat = function(min, max, signs) {
  if (isNaN(min) || isNaN(max)) throw new Error('Аргумент не является числом!');
  return (Number(Math.min(min, max)) + Math.random() * Math.abs(min - max)).toFixed(signs);
}

getRandomInteger(1, 7);
getRandomFloat(1.3, 3.6, 2);
