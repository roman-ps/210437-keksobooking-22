const GETDATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SETDATA_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = function() {
  return fetch(GETDATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })

    .catch((err) => {
      console.error(err);
    })
};

const sendData = function(form) {
  return fetch(
    SETDATA_URL,
    {
      method: 'POST',
      body: new FormData(form),
    },
  )
    .then((response) => {
      if (response.ok) {
        console.log('Data send');
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })

    .catch((err) => {
      console.error(err);
    })
};

export {getData, sendData}
