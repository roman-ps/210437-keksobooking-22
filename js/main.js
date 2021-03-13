import {initMap} from './map.js';
import {fillCard} from './ads.js';
import {addEventListeners, disableForms, enableForms, setAddress} from './form.js';
import {getData} from './api.js'

disableForms();

getData()
  .then((data) => {
    const points = data.map(ad => ({
      title: ad.offer.title,
      lat: ad.location.lat,
      lng: ad.location.lng,
    }));

    const renderAd = function(idx) {
      return fillCard(data[idx]);
    };
    
    initMap(points, enableForms, renderAd, setAddress);
    addEventListeners();
  })
