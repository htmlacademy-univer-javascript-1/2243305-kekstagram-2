import {ErrorMessage} from './data.js';
import {checkMaxLength} from './util.js';

window.onload = function () {
  const form = document.getElementById('upload-select-image');
  const hashtags = document.getElementById('text__hashtags');
  const textDescriptions = document.getElementById('text__description');
  const submitButton = document.getElementById('upload-submit');
  const regEx = /^#[A-Za-zA-Яа-яЁё0-9]{1,19}$/;

  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__field-wrapper'
  });

  const isUnicHashtags = (hashtag) => {
    const uniq = new Set(hashtag);
    return hashtag.length === uniq.size;
  };

  let errorMessage = '';
  const error = () => errorMessage;

  const validateHashtag = (string) => {
    errorMessage = '';

    const inputText = string.toLowerCase().trim();
    if (!inputText) {
      return true;
    }

    const inputHashtag = inputText.split(/\s+/);

    const validateRules = [
      {
        check: inputHashtag.some((value) => value.indexOf('#', 1) >= 1),
        error: ErrorMessage.SPACE,
      },
      {
        check: inputHashtag.some((value) => value.length === 1),
        error: ErrorMessage.EMPTY,
      },
      {
        check: inputHashtag.length > 5,
        error: ErrorMessage.MAX_COUNT,
      },
      {
        check: inputHashtag.some((value) => value[0] !== '#'),
        error: ErrorMessage.START,
      },
      {
        check: inputHashtag.some((value) => !(regEx.test(value))),
        error: 'не валидные данные',
      },
      {
        check: inputHashtag.some((value) => value.length > 20),
        error: ErrorMessage.MAX_LENGTH,
      },
      {
        check: !isUnicHashtags(inputHashtag),
        error: ErrorMessage.REPEAT,
      },
    ];

    return validateRules.every((rule) => {
      const isValid = rule.check;
      if (isValid) {
        errorMessage = rule.error;
      }
      return !isValid;
    });
  };

  const validateDescriptions = (string) => {
    errorMessage = '';
    const inputText = string.trim();

    if(!inputText) {
      return true;
    }

    const validateRules = [
      {
        check: !checkMaxLength(inputText, 20),
        error: ErrorMessage.MAX_COM_LENGTH,
      },
    ];

    return validateRules.every((rule) => {
      const isValid = rule.check;
      if (isValid) {
        errorMessage = rule.error;
      }
      return !isValid;
    });
  };

  pristine.addValidator(hashtags, validateHashtag, error);
  pristine.addValidator(textDescriptions, validateDescriptions, error);

  const onInput = () => {
    submitButton.disabled = !pristine.validate();
  };

  hashtags.addEventListener('input', onInput);
  textDescriptions.addEventListener('input', onInput);

  form.addEventListener('submit', (e) => {
    const valid = pristine.validate();
    if (!valid) {
      e.preventDefault();
    }
  });
};
