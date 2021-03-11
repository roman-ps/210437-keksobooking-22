import {getAdsData, OFFERS_COUNT} from './data.js';
import {initMap} from './map.js';
import {fillCard} from './ads.js';
import {addEventListeners, disableForms, enableForms, setAddress} from './form.js';
import {getData} from './api.js'

const ads = getAdsData(OFFERS_COUNT);
disableForms();

getData()
  .then((data) => {
    fillCard(data)
    console.log(data)
  })

const points = ads.map(ad => ({
  title: ad.offer.titles,
  lat: ad.location.x,
  lng: ad.location.y,
}));

const renderAd = function(idx) {
  return fillCard(ads[idx]);
};

addEventListeners();
initMap(points, enableForms, renderAd, setAddress);

