let rawData = null;
let preparedData = null;

const MAX_PIN_COUNT = 10;

/**
 * Возвращает первые MAX_PIN_COUNT элементы массива data
 * @param {*} data - массив
 */
const sliceMaxCount = (data) => data.slice(0, MAX_PIN_COUNT);

/**
 * Подготавливает сырые данные
 * Сохраняет результат в preparedData
 * @param {*} filterData - ф-ия которая умеет фильтровать данные, по умол sliceMaxCount
 */
const prepareData = (filterData = sliceMaxCount) => {
  if (!rawData) {
    throw new Error('Ошибка вызова данных!');
  }

  preparedData = filterData(rawData);
};

const getData = () => preparedData;

/**
 * Сохраняет в замыкание модуля сырые данные
 * Вызывает prepareData с дефолтными настройками
 * @param {*} data
 */
const storeData = (data) => {
  rawData = data;
  prepareData();
};

export {storeData, getData, prepareData}
