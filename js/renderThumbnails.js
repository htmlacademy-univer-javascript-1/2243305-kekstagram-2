import {showBigPicture} from './renderBigPicture.js';

const renderThumbnails = (descriptions) => {
  const pictures = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;
  const fragment = document.createDocumentFragment();
  for (const description of descriptions){
    const picture = pictureTemplate.cloneNode(true);
    const imgElement = picture.querySelector('.picture__img');
    imgElement.src = description.url;
    imgElement.alt = description.description;
    picture.querySelector('.picture__likes').textContent = description.likes;
    picture.querySelector('.picture__comments').textContent = description.comments.length;
    picture.querySelector('.picture__img').addEventListener('click', (ev) => {
      ev.preventDefault();
      showBigPicture(description);
    });
    fragment.appendChild(picture);
  }
  pictures.appendChild(fragment);
};

export {renderThumbnails};
