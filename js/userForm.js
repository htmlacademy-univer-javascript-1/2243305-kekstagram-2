import {checkEscapePressed, showError} from './util.js';
import {sendData} from './api.js';
import {selectedEffect} from './changePicture.js';

const form = document.querySelector('.img-upload__form');
const uploadedPicture = form.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const formOverlay = document.querySelector('.img-upload__overlay');

const changedValue = document.querySelector('.scale__control--value');
const redactedPictureContainer = document.querySelector('.img-upload__preview');
const redactedPicture = redactedPictureContainer.children[0];
const sliderElement = document.querySelector('.effect-level');

const onUploadPictureInChange = (evt) => {
  if (evt.target.value) {
    evt.preventDefault();
    openUploadOverlay();
  }
};

const onUploadPictureEscKeydown = (evt) => {
  if (checkEscapePressed(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
    evt.target.value = '';
    evt.target.blur();
  }
};

function openUploadOverlay() {
  selectedEffect('none', [0, 100, 1, '', '']);
  changedValue.value = '100%';
  sliderElement.classList.add('hidden');
  formOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPictureEscKeydown);
  uploadCancel.addEventListener('click', closeUploadOverlay);
}

function closeUploadOverlay() {
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPictureEscKeydown);
  uploadCancel.removeEventListener('click', closeUploadOverlay);

  formOverlay.classList.add('hidden');
  uploadedPicture.value = null;
  uploadedPicture.blur();
}

uploadedPicture.addEventListener('change', onUploadPictureInChange);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-text',
});

const blockButtonSubmit = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикуем..';
};

const unblockButtonSubmit = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const errorMessage = document.querySelector('#error');
const errorWindow = errorMessage.cloneNode(true).content;
const errorPlace = errorWindow.querySelector('.error');
const errorFragment = document.createDocumentFragment();
const errorButton = errorWindow.querySelector('.error__button');

const onErrorMessageEscKeydown = (evt) => {
  if (checkEscapePressed(evt)) {
    evt.preventDefault();
    closeErrorMessage();
    evt.target.value = '';
    evt.target.blur();
    changedValue.value = '100%';
  }
};


function closeErrorMessage() {
  document.body.classList.remove('modal-open');
  errorPlace.classList.add('hidden');

  document.addEventListener('keydown', onUploadPictureEscKeydown);
  uploadCancel.addEventListener('click', closeUploadOverlay);

  errorButton.removeEventListener('click', closeErrorMessage);
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', closeErrorMessage);

  formOverlay.classList.remove('hidden');
}


const onSendFail = () => {
  formOverlay.classList.add('hidden');
  errorFragment.appendChild(errorWindow);
  document.body.appendChild(errorFragment);

  document.body.classList.add('modal-open');
  errorPlace.classList.remove('hidden');

  errorButton.addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', closeErrorMessage);

  uploadCancel.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
};

const successMessage = document.querySelector('#success');
const successWindow = successMessage.cloneNode(true).content;
const successPlace = successWindow.querySelector('.success');
const successFragment = document.createDocumentFragment();

const successButton = successWindow.querySelector('.success__button');

const onSuccessMessageEscKeydown = (evt) => {
  if (checkEscapePressed(evt)) {
    evt.preventDefault();
    closeSuccessMessage();
    evt.target.value = '';
    evt.target.blur();
  }
};

function closeSuccessMessage() {
  document.body.classList.remove('modal-open');
  successPlace.classList.add('hidden');
  const tagPlacer = document.querySelector('.text__hashtags');
  const commentPlacer = document.querySelector('.text__description');

  document.addEventListener('keydown', onUploadPictureEscKeydown);
  uploadCancel.addEventListener('click', closeUploadOverlay);

  submitButton.removeEventListener('click', closeSuccessMessage);
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', closeSuccessMessage);

  uploadedPicture.value = null;
  uploadedPicture.blur();
  tagPlacer.value = null;
  commentPlacer.value = null;
}

const onSuccessMessage = () => {
  formOverlay.classList.add('hidden');
  successFragment.appendChild(successWindow);
  document.body.append(successFragment);

  document.body.classList.remove('modal-open');
  successPlace.classList.remove('hidden');

  successButton.addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  document.addEventListener('click', closeSuccessMessage);

  uploadCancel.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
};

let error = '';

function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    let isValid = pristine.validate();
    if (error === 'error') {
      isValid = true;
    }
    if (isValid) {
      blockButtonSubmit();
      sendData(
        () => {
          error = '';
          onSuccess();
          onSuccessMessage();
          unblockButtonSubmit();
        },
        () => {
          error = 'error';
          onSendFail();
          unblockButtonSubmit();
        },
        new FormData(evt.target),
      );
    }
  });
}

const FILE_TYPES = ['png', 'jpg', 'jpeg', 'gif'];

const fileChooser = document.querySelector('.img-upload__start input[type=file]');
fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    redactedPicture.src = URL.createObjectURL(file);
  } else {
    formOverlay.classList.add('hidden');
    showError('Неправильный тип файла', 1500);
    document.body.classList.remove('modal-open');
  }
});

const tagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

tagInput.addEventListener('click', (evt) => {
  evt.stopPropagation();
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
});

commentInput.addEventListener('click', (evt) => {
  evt.stopPropagation();
  document.removeEventListener('keydown', onUploadPictureEscKeydown);
});

document.body.addEventListener('click', () => {
  document.addEventListener('keydown', onUploadPictureEscKeydown);
});

export {setUserFormSubmit};
