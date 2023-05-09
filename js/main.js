import {renderThumbnailsDefault, setDefaultPictures, setRandomPictures, setDiscussPictures} from './renderThumbnailsDefault.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './userForm.js';
import {closeBigPicture} from './renderBigPicture.js';

getData((descriptions) => {
  renderThumbnailsDefault(descriptions);
  setDefaultPictures(descriptions);
  setRandomPictures(descriptions);
  setDiscussPictures(descriptions);
});

setUserFormSubmit(closeBigPicture);
