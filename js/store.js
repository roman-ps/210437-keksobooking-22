let rawData = null;
let preparedData = null;

const MAX_PIN = 10;

/**
 * Возвращает первые MAX_PIN_COUNT из массива data
 * @param {*} data
 */
const sliceCounts = (data) => data.slice(0, MAX_PIN);

/**
 * Подготавливает сырые данные
 * Сохраняет результат в preparedData
 * @param {*} filterData - ф-ия фильтр
 */
const prepareData = (filterData) => {
  if (!rawData) {
    throw new Error('Ошибка вызова данных!');
  }

  let data = rawData;

  if (typeof filterData === 'function') {
    data = data.filter(filterData);
  }
  if (data.length > MAX_PIN) {
    data = sliceCounts(data);
  }
  preparedData = data;
};

const getData = () => preparedData;

/**
 * Сохраняет сырые данные
 * Вызывает prepareData с дефолтными настройками
 * @param {*} data
 */
const storeData = (data) => {
  rawData = data;
  prepareData();
};

export {storeData, getData, prepareData}
