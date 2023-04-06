import {PHOTO_COUNT, generateDescription} from './data.js';
import {renderThumbnails} from './renderThumbnails.js';

const descriptions = generateDescription(PHOTO_COUNT);
renderThumbnails(descriptions);
