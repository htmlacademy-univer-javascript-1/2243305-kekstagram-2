import {getCommentId, getId, getRandomElement, getRandomInt, getRandomLikes} from './util.js';

const PHOTO_COUNT = 19;
const WIDTH_AVATAR_PHOTO = 35;
const HEIGHT_AVATAR_PHOTO = 35;
const NAMES = ['Артем', 'Андрей', 'Илья', 'Сергей'];
const COMMENTS_ID = [];
const DESCRIPTIONS = Array.from({length: PHOTO_COUNT}, (_, i) => `Описание_${i + 1}`);
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generateComment = () => {
  const messageText = [];
  for (let i = 0; i < getRandomInt(1, 2); i++) {
    messageText.push(getRandomElement(MESSAGES));
  }
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messageText.join(' '),
    name: getRandomElement(NAMES)
  };
};

const generateDescription = (index) => {
  const result = [];
  for(let i = 0; i < index; i++){
    const id = getId();
    const comments = Array.from({length: getRandomInt(0, 3)}, generateComment);
    result.push({
      id: id,
      url: `photos/${getRandomInt(1, PHOTO_COUNT)}.jpg`,
      description: DESCRIPTIONS[i],
      likes: getRandomLikes(),
      comments: comments
    });
  }
  return result;
};

export {PHOTO_COUNT, WIDTH_AVATAR_PHOTO, HEIGHT_AVATAR_PHOTO, NAMES, DESCRIPTIONS, MESSAGES, COMMENTS_ID, generateComment, generateDescription};
