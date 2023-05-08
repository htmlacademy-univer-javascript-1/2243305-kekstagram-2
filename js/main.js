import {renderThumbnailsDefault, setDefaultOrder, setDiscussOrder, setRandomOrder} from './renderThumbnailsDefault.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './userForm.js';
import {closeBigPicture} from './renderBigPicture.js';

getData((descriptions) => {
  renderThumbnailsDefault(descriptions);
  setDiscussOrder(descriptions);
  setRandomOrder(descriptions);
  setDefaultOrder(descriptions);
});

setUserFormSubmit(closeBigPicture);
