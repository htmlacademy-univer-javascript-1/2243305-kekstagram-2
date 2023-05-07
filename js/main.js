import {renderThumbnails} from './renderThumbnails.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './userForm.js';
import {closeBigPicture} from './renderBigPicture.js';

getData((descriptions) => {
  renderThumbnails(descriptions);
});

setUserFormSubmit(closeBigPicture);
