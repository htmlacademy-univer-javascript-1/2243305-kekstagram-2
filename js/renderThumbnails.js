import {getRandomInt, getRandomLikes} from './util.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictures = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

for (let i = 0; i < 12; i++) {
  const picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = `photos/${getRandomInt(1, 25)}.jpg`;
  picture.querySelector('.picture__likes').innerHTML = `${getRandomLikes()}`;
  picture.querySelector('.picture__comments').innerHTML = `${getRandomInt(5, 50)}`;
  fragment.appendChild(picture);
}

pictures.appendChild(fragment);
