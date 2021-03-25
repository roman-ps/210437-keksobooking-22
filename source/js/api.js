const GETDATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SETDATA_URL = 'https://22.javascript.pages.academy/keksobooking';

const loadData = () => {
  return fetch(GETDATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
};

const sendData = (form) => {
  return fetch(
    SETDATA_URL,
    {
      method: 'POST',
      body: form,
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
};

export {loadData, sendData}
