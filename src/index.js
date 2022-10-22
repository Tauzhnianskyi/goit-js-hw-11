import './css/style.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchImg from './pixaby-api';

import markup from './markup';

const refs = {
  formEl: document.querySelector('.search-form'),
  formInputField: document.querySelector('input[name="searchQuery"]'),
  formBtn: document.querySelector('.searchBtn'),
  imgCard: document.querySelector('.gallery'),
  preloader: document.querySelectorAll('.loader div'),
};

const fetchImg = new FetchImg();
let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formEl.addEventListener('submit', onSearchImages);

function onSearchImages(evt) {
  evt.preventDefault();

  fetchImg.inputTitle = evt.currentTarget.elements.searchQuery.value.trim();
  resetMarkup();

  if (fetchImg.inputTitle === '') {
    Notiflix.Notify.warning('Field must not be empty');
    refs.formInputField.value = '';
    return;
  }

  refs.preloader.forEach(e => {
    e.style.display = 'block';
  });

  fetchImg.resetPage();
  fetchImg.resetCurrentHits();
  refs.formInputField.value = '';

  fetchImg
    .fetchImg()
    .then(hits => {
      resetMarkup();
      refs.imgCard.insertAdjacentHTML('beforeend', markup(hits));
      gallerySimpleLightbox.refresh();
      refs.preloader.forEach(e => {
        e.style.display = 'none';
      });
    })
    .catch(err => {
      console.log(err);
      refs.preloader.forEach(e => {
        e.style.display = 'none';
        resetMarkup();
      });
    });
}

function onLoadMore() {
  fetchImg
    .fetchImg()
    .then(hits => {
      refs.imgCard.insertAdjacentHTML('beforeend', markup(hits));
      gallerySimpleLightbox.refresh();
      refs.preloader.forEach(e => {
        e.style.display = 'none';
      });
      const { height: cardHeight } =
        refs.imgCard.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(err => {
      console.log(err);
    });
}

window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom < document.documentElement.clientHeight + 50) {
    onLoadMore();
  }
});

function resetMarkup() {
  refs.imgCard.innerHTML = '';
}
