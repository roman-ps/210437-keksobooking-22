import {renderAds} from './similar-ads.js';
import {events} from './form.js';

const MAP_CANVAS = document.querySelector('#map-canvas');
MAP_CANVAS.appendChild(renderAds.childNodes[0]);

/* eslint-disable no-console*/
console.log(renderAds)
console.log(events)
/* eslint-enable no-console*/
