import {renderAds} from './similar-ads.js';
import {} from './form.js';

const MAP_CANVAS = document.querySelector('#map-canvas');
MAP_CANVAS.appendChild(renderAds.childNodes[0]);

/* eslint-disable no-console*/
console.log(renderAds)
/* eslint-enable no-console*/
