import {showBigPicture} from './renderBigPicture.js';
import {debounce} from './util.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture');

const firstChild = pictureContainer.children[0];
const secondChild = pictureContainer.children[1];

const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const discussBtn = document.querySelector('#filter-discussed');

const setDefaultPictures = (item) => {
  defaultBtn.addEventListener('click', () => {
    defaultBtn.classList.add('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    discussBtn.classList.remove('img-filters__button--active');
    debounce(renderThumbnailsDefault(item));
  });
};

const setRandomPictures = (item) => {
  randomBtn.addEventListener('click', () => {
    randomBtn.classList.add('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    discussBtn.classList.remove('img-filters__button--active');
    debounce(renderThumbnailsRandom(item));
  });
};

const setDiscussPictures = (item) => {
  discussBtn.addEventListener('click', () => {
    discussBtn.classList.add('img-filters__button--active');
    randomBtn.classList.remove('img-filters__button--active');
    defaultBtn.classList.remove('img-filters__button--active');
    debounce(renderThumbnailsDiscuss(item));
  });
};

const getPictureRank = (picture) => picture.comments.length;

const comparePictures = (picA, picB) => {
  const rankA = getPictureRank(picA);
  const rankB = getPictureRank(picB);
  return rankB - rankA;
};


function renderThumbnailsDefault(description) {
  const fragment = document.createDocumentFragment();
  for (const desc of description) {
    const picture = pictureTemplate.cloneNode(true).content;
    picture.querySelector('.picture__img').src = desc.url;
    picture.querySelector('.picture__img').addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(desc);
    });
    picture.querySelector('.picture__likes').textContent = desc.likes;
    picture.querySelector('.picture__comments').textContent = desc.comments.length;
    fragment.appendChild(picture);
  }
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
      const picture = pictureTemplate.cloneNode(true).content;
      picture.querySelector('.picture__img').src = description.url;
      picture.querySelector('.picture__img').addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPicture(description);
      });
      picture.querySelector('.picture__likes').textContent = description.likes;
      picture.querySelector('.picture__comments').textContent = description.comments.length;
      fragment.appendChild(picture);
    });
  pictureContainer.innerHTML = '';
  pictureContainer.appendChild(firstChild);
  pictureContainer.appendChild(secondChild);
  pictureContainer.appendChild(fragment);
}

function renderThumbnailsDiscuss(descriptions) {
  const fragment = document.createDocumentFragment();

  descriptions
    .slice()
    .sort(comparePictures)
    .forEach((description) => {
      const picture = pictureTemplate.cloneNode(true).content;
      picture.querySelector('.picture__img').src = description.url;
      picture.querySelector('.picture__img').addEventListener('click', (evt) => {
        evt.preventDefault();
        showBigPicture(description);
      });
      picture.querySelector('.picture__likes').textContent = description.likes;
      picture.querySelector('.picture__comments').textContent = description.comments.length;
      fragment.appendChild(picture);
    });
  pictureContainer.innerHTML = '';
  pictureContainer.appendChild(firstChild);
  pictureContainer.appendChild(secondChild);
  pictureContainer.appendChild(fragment);
}

export {renderThumbnailsDefault, setDiscussPictures, setRandomPictures, setDefaultPictures};
