const checkMaxLength = (str, maxLength) => str.length <= maxLength;

const ErrorMessage = {
  SPACE: 'Разделение хеш-тегов пробелами',
  START: 'Хеш-тег начинается с символа #',
  REPEAT: 'Не должно быть повторения хеш-тегов',
  MAX_LENGTH: 'Максимальная длина хеш-тега не больше 20 символов',
  MAX_COUNT: 'Количество хеш-тегов не больше 5',
  MAX_COM_LENGTH: 'Максимальная длина комментария 20 символов',
  EMPTY: 'Хештег не должен быть пустым',
  EMPTY_DESCRIPTION: 'Описание не должно быть пустым',
};

const isCheckModelOpen = () => document.body.classList.contains('modal-open');

const checkEscapePressed = (ev) => ev.key === 'Escape';

const showError = (message, time) => {
  const container = document.createElement('div');
  container.style.zIndex = '100';
  container.style.padding = '10px';
  container.style.position = 'absolute';
  container.style.fontSize = '28px';
  container.style.backgroundColor = '#eed21e';
  container.style.position = 'absolute';
  container.style.textAlign = 'center';
  container.style.left = '0';
  container.style.top = '0';
  container.style.right = '0';
  container.style.color = 'rgba(82,71,71,0.63)';
  container.textContent = message;

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, time);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  checkMaxLength,
  checkEscapePressed,
  isCheckModelOpen,
  showError,
  debounce,
  ErrorMessage,
};
