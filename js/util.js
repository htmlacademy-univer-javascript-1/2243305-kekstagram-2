import {COMMENTS_ID} from './data.js';

const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkMaxLength = (str, maxLength) => str.length <= maxLength;

const isCheckModelOpen = () => document.body.classList.contains('modal-open');

const checkEscapePressed = (ev) => ev.key === 'Escape';

const getRandomLikes = () => getRandomInt(15, 200);

const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const getId = (() => {
  let id = 1;
  return () => id++;
})();

const getCommentId = () => {
  let id = getRandomInt(1, 1000);
  while (COMMENTS_ID.includes(id)) {
    id = getRandomInt(1, 1000);
  }
  return id;
};


export {
  getRandomInt,
  checkMaxLength,
  getRandomLikes,
  getRandomElement,
  getId,
  getCommentId,
  checkEscapePressed,
  isCheckModelOpen
};
