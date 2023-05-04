import {checkEscapePressed, isCheckModelOpen} from './util.js';

const uploadForm = document.querySelector('#upload-select-image');
const uploadPhotoInput = uploadForm.querySelector('#upload-file');
const imgUpload = uploadForm.querySelector('.img-upload__overlay');

const inputHashtags = uploadForm.querySelector('.text__hashtags');
const inputDescription = uploadForm.querySelector('.text__description');
const scaleControlValue = uploadForm.querySelector('.scale__control--value');
const scaleControlSmallerBtn = uploadForm.querySelector('.scale__control--smaller');
const scaleControlBiggerBtn = uploadForm.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const effectList = document.querySelectorAll('.effects__item input');

const slider = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level');

const filterUpdate = {
  none: [0, 100, 1, '', ''],
  chrome: [0, 1, 0.1, 'grayscale', ''],
  sepia: [0, 1, 0.1, 'sepia', ''],
  marvin: [0, 100, 1, 'invert', '%'],
  phobos: [0, 3, 0.1, 'blur', 'px'],
  heat: [0, 3, 0.1, 'brightness', '']
};

noUiSlider.create(slider, {
  range: {
    min: 1,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const selectedEffect = (value, update) => {
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add(`effects__preview--${value}`);

  slider.noUiSlider.updateOptions({
    range: {
      min: update[0],
      max: update[1],
    },
    start: 100,
    step: update[2],
    connect: 'lower',
  });

  slider.noUiSlider.on('update', () => {
    sliderValue.value = slider.noUiSlider.get();
    if (value === 'none') {
      imgUploadPreview.style.filter = '';
    }
    imgUploadPreview.style.filter = `${update[3]}(${sliderValue.value}${update[4]})`;
  });
};

effectList.forEach((effectElement) => {
  const effectClick = String(effectElement.value);
  sliderElement.classList.add('hidden');
  effectElement.addEventListener('change', () => {
    selectedEffect(effectClick, filterUpdate[effectClick]);
    if (effectClick !== 'none') {
      sliderElement.classList.remove('hidden');
    } else {
      sliderElement.classList.add('hidden');
    }
  },);
});


const currentInputValue = scaleControlValue.value;
let scaleValue = Number(currentInputValue.replace(/%/, ''));
imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;

scaleControlBiggerBtn.addEventListener('click', () => {
  scaleValue += 25;
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
});

scaleControlSmallerBtn.addEventListener('click', () => {
  scaleValue -= 25;
  scaleControlValue.value = `${scaleValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleValue / 100})`;
});

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
