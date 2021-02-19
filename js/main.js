import {renderAds} from './similar-ads.js'

/* eslint-disable no-console*/
console.log(renderAds)
/* eslint-enable no-console*/

let arr = [0, 2, 3, 5, 6, 4, 2, 0, 4, 9];
console.log('arr: ', arr);
let arr2 = new Set(arr);
console.log('arr.set: ', arr2)
console.log(Array.from(arr2))

let arr3 = new Map(arr);
console.log('arr.set: ', arr3)
console.log(Array.from(arr3))
