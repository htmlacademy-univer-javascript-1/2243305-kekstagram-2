import {checkEscapePressed, isCheckModelOpen} from './util.js';

const MAX_COMMENT_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = document.querySelector('.social__comment-count');
const bigPictureCommentsList = document.querySelector('.social__comments');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
let countRenderComments = MAX_COMMENT_COUNT;
let actualComments = [];

const createComments = ({avatar, name, message}) => `<li class="social__comment">
<img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
<p class="social__text">${message}</p>
</li>`;

const getCounterCommentsTemplate = (commentsCount) => `${Math.min(countRenderComments, commentsCount)} из
<span class="comments-count">${commentsCount}</span> комментариев`;

const getCounterComments = () => {
  socialCommentCount.innerHTML = '';
  socialCommentCount.insertAdjacentHTML('afterbegin', getCounterCommentsTemplate(actualComments.length));
};

const createBigPicture = ({likes, url, description}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const renderComments = () => {
  getCounterComments();
  bigPictureCommentsList.innerHTML = '';
  const commentsTemplate = actualComments.slice(0, countRenderComments).map((comment) =>
    createComments(comment)).join('');
  bigPictureCommentsList.insertAdjacentHTML('afterbegin', commentsTemplate);

  if (countRenderComments >= actualComments.length) {
    commentsLoader.removeEventListener('click', onCommentsLoaderBtnClick);
    commentsLoader.classList.add('hidden');
  }
};

function onCommentsLoaderBtnClick() {
  countRenderComments += MAX_COMMENT_COUNT;
  renderComments();
}

const initComments = ({comments}) => {
  actualComments = comments.slice();
  bigPictureCommentsList.innerHTML = '';
  if (comments.length === 0) {
    socialCommentCount.innerHTML = 'Нет комментариев';
    commentsLoader.classList.add('hidden');
    return;
  }
  renderComments();
  commentsLoader.addEventListener('click', onCommentsLoaderBtnClick);
};

const closeBigPicture = () => {
  if (!isCheckModelOpen()) {
    return;
  }

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onWindowEscKeydown);
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', onCommentsLoaderBtnClick);
  countRenderComments = MAX_COMMENT_COUNT;
};

function onBigPictureCloseBtnClick() {
  closeBigPicture();
}

function onWindowEscKeydown(evt) {
  if (checkEscapePressed(evt) === true) {
    closeBigPicture();
  }
}

const showBigPicture = (picture) => {
  if (isCheckModelOpen()) {
    return;
  }

  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  createBigPicture(picture);
  initComments(picture);

  bigPictureCloseBtn.addEventListener('click', onBigPictureCloseBtnClick);
  window.addEventListener('keydown', onWindowEscKeydown);
};

export {showBigPicture};
