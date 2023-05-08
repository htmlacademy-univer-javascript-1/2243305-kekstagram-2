import {showBigPicture} from './renderBigPicture.js';
import {debounce} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const firstChild = pictureContainer.children[0];
const secondChild = pictureContainer.children[1];

const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussBtn = document.querySelector('#filter-discussed');

const setRandomOrder = (cb) => {
  defaultBtn.addEventListener('click', () => {
    randomBtn.classList.add('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    discussBtn.classList.remove('img-filters__button--active');
    debounce(renderThumbnailsRandom(cb));
  });
};

const setDiscussOrder = (cb) => {
  defaultBtn.addEventListener('click', () => {
    discussBtn.classList.add('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    debounce(renderThumbnailsDiscuss(cb));
  });
};

const setDefaultOrder = (cb) => {
  defaultBtn.addEventListener('click', () => {
    defaultBtn.classList.add('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    discussBtn.classList.remove('img-filters__button--active');
    debounce(renderThumbnailsDefault(cb));
  });
};

const getPhotoRank = (photo) => photo.comments.length;

const comparePhotos = (photoA, photoB) => {
  const rankA = getPhotoRank(photoA);
  const rankB = getPhotoRank(photoB);
  return rankB - rankA;
};


function renderThumbnailsDefault(descriptions) {
  const fragment = document.createDocumentFragment();
  for (const description of descriptions) {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = description.url;
    picture.querySelector('.picture__img').addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(description);
    });
    picture.querySelector('.picture__likes').textContent = description.likes;
    picture.querySelector('.picture__comments').textContent = description.comments.length;
    fragment.appendChild(picture);
  }
  pictureContainer.innerHTML = '';
  pictureContainer.appendChild(firstChild);
  pictureContainer.appendChild(secondChild);
  pictureContainer.appendChild(fragment);
}

function renderThumbnailsDiscuss(descriptions) {
  const fragment = document.createDocumentFragment();

  descriptions
    .slice()
    .sort(comparePhotos)
    .forEach((description) => {
      const photo = pictureTemplate.cloneNode(true).content;
      photo.querySelector('.picture__img').src = description.url;
      photo.querySelector('.picture__img').addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPicture(description);
      });
      photo.querySelector('.picture__likes').textContent = description.likes;
      photo.querySelector('.picture__comments').textContent = description.comments.length;
      fragment.appendChild(photo);
    });
  pictureContainer.innerHTML = '';
  pictureContainer.appendChild(firstChild);
  pictureContainer.appendChild(secondChild);
  pictureContainer.appendChild(fragment);
}

function renderThumbnailsRandom(descriptions) {
  const fragment = document.createDocumentFragment();

  descriptions
    .slice()
    .sort(() => Math.random() - 0.5)
    .forEach((description) => {
      const photo = pictureTemplate.cloneNode(true).content;
      photo.querySelector('.picture__img').src = description.url;
      photo.querySelector('.picture__img').addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPicture(description);
      });
      photo.querySelector('.picture__likes').textContent = description.likes;
      photo.querySelector('.picture__comments').textContent = description.comments.length;
      fragment.appendChild(photo);
    });
  pictureContainer.innerHTML = '';
  pictureContainer.appendChild(firstChild);
  pictureContainer.appendChild(secondChild);
  pictureContainer.appendChild(fragment);
}

export {renderThumbnailsDefault, setRandomOrder, setDiscussOrder, setDefaultOrder};
