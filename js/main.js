import {PHOTO_COUNT, generateDescription} from './data.js';
import {checkMaxLength} from './util.js';

const descriptions = Array.from({length: PHOTO_COUNT}, generateDescription);
checkMaxLength(descriptions, 6);
