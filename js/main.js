const PHOTO_COUNT = 25;
const NAMES = ['Артем', 'Андрей', 'Илья', 'Сергей'];
const DESCRIPTIONS = Array.from({length: PHOTO_COUNT}, (_, i) => `Описание_${i+1}`);
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const COMMENTS_ID = [];

const getRandomInt = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const checkMaxLength = (str, maxLength) => str.length <= maxLength;

const getRandomLikes = () => getRandomInt(15, 200);

const getRandomElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

const getId = (() => {
  let id = 1;
  return () => id++;
})();

const getCommentId = () => {
  let id = getRandomInt(1, 1000);
  while (COMMENTS_ID.includes(id)){
    id = getRandomInt(1, 1000);
  }
  return id;
};

const generateComment = () => {
  const messageText = [];
  for(let i = 0; i < getRandomInt(1, 2); i++){
    messageText.push(getRandomElement(MESSAGES));
  }
  return {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: messageText.join(' '),
    name: getRandomElement(NAMES)
  };
};

const generateDescription = () => {
  const comments = Array.from({length: getRandomInt(0, 3)}, generateComment);
  const id = getId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: DESCRIPTIONS[id - 1],
    likes: getRandomLikes(),
    comments: comments
  };
};

const descriptions = Array.from({length: PHOTO_COUNT}, generateDescription);
