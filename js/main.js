import {renderThumbnailsDefault, setDefaultPictures, setDiscussPictures, setRandomPictures} from './renderThumbnailsDefault.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './userForm.js';
import {closeBigPicture} from './renderBigPicture.js';

getData((descriptions) => {
  renderThumbnailsDefault(descriptions);
  setDiscussPictures(descriptions);
  setRandomPictures(descriptions);
  setDefaultPictures(descriptions);
});

setUserFormSubmit(closeBigPicture);
