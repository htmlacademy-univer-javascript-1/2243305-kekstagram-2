import {HEIGHT_AVATAR_PHOTO, WIDTH_AVATAR_PHOTO} from './data.js';

const bigPicture = document.querySelector('.big-picture');

const createAvatar = (avatar, name) => {
  const imgAvatar = document.createElement('img');
  imgAvatar.classList.add('social__picture');
  imgAvatar.src = avatar;
  imgAvatar.alt = name;
  imgAvatar.width = WIDTH_AVATAR_PHOTO;
  imgAvatar.height = HEIGHT_AVATAR_PHOTO;
  return imgAvatar;
};

const createCommentText = (message) => {
  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = message;
  return textComment;
};

const createComments = ({avatar, name, message}) => {
  const listItem = document.createElement('li');
  listItem.classList.add('social__comment');
  listItem.appendChild(createAvatar(avatar, name));
  listItem.appendChild(createCommentText(message));
  return listItem;
};

const createBigPicture = ({likes, comments, url, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  const fragmentComments = document.createDocumentFragment();

  for (const comment of comments) {
    fragmentComments.appendChild(createComments(comment));
  }
  bigPicture.querySelector('.social__comments').replaceChildren(fragmentComments);
  bigPicture.querySelector('.social__caption').textContent = description;
};

const closeBigPicture = () => {
  if (document.body.classList.contains('modal-open') === false) {
    return;
  }

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  return true;
};

const escapePressed = (ev) => ev.key === 'Escape' && closeBigPicture();

const showBigPicture = (picture) => {
  if (document.body.classList.contains('modal-open')) {
    return;
  }

  createBigPicture(picture);
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.querySelector('.big-picture__cancel').addEventListener('click', (ev) => {
    ev.preventDefault();
    closeBigPicture();
  });
  document.addEventListener('keydown', (ev) => escapePressed(ev));
};

export {showBigPicture};
