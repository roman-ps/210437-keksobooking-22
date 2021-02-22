import {renderAds} from './ads.js';
import {addEventListeners} from './form.js';

const MAP_CANVAS = document.querySelector('#map-canvas');
MAP_CANVAS.appendChild(renderAds.firstElementChild);

addEventListeners();

/* eslint-disable no-console*/
console.log(renderAds);
/* eslint-enable no-console*/
