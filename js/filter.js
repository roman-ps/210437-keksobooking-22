const MAP_FILTERS = document.querySelector('.map__filters');
const HouseFields = {
  TYPE: MAP_FILTERS.querySelector('#housing-type'),
  PRICE: MAP_FILTERS.querySelector('#housing-price'),
  ROOMS: MAP_FILTERS.querySelector('#housing-rooms'),
  GUESTS: MAP_FILTERS.querySelector('#housing-guests'),
};
// const HOUSE_FEATURES = MAP_FILTERS.querySelector('.map__features');


const changeHouseTypeHandle = function(evt) {
  return evt.target.value;
};

HouseFields.TYPE.addEventListener('change', changeHouseTypeHandle);

export {changeHouseTypeHandle}
