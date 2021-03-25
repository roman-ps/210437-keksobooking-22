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

export {getNodes, pluralize, getRoundNumber, isEscEvent, hasObjKey};
