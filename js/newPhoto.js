import {checkEscapePressed, isCheckModelOpen} from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadPhotoInput = uploadForm.querySelector('#upload-file');
const imgUpload = uploadForm.querySelector('.img-upload__overlay');

const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');

const closeUploadOverlay = () => {
  if (!isCheckModelOpen()) {
    return;
  }

  imgUpload.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPhotoInput.value = null;
  inputHashtags.value = null;
  inputDescription.value = null;
};

const escapePressed = (ev) => checkEscapePressed(ev) && closeUploadOverlay();

const showUploadOverlay = () => {
  if (isCheckModelOpen()) {
    return;
  }

  imgUpload.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.img-upload__cancel').addEventListener('click', (ev) => {
    ev.preventDefault();
    closeUploadOverlay();
  });
  document.addEventListener('keydown', (ev) => escapePressed(ev));
};

uploadPhotoInput.addEventListener('change', showUploadOverlay);
