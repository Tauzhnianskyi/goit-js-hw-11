import './css/style.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import FetchImg from './pixaby-api';

import markup from './markup';

import pixaby from './pixaby-api';

const refs = {
  formEL: document.querySelector('.search-form'),
  inputEl: document.querySelector('input[name="searchQuery"]'),
  searchBtn: document.querySelector('.searchBtn'),
  imgCard: document.querySelector('.gallery'),
};

const fetchImg = new FetchImg();
let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionData: 'alt',
  captionDelay: 250,
});

console.log(fetchImg);

refs.formEL.addEventListener('submit', searchImg);

function searchImg(e) {
  e.preventDefault();
  fetchImg.inputTitle = e.currentTarget.elements.searchQuery.value.trim();
  resetMarkup();
  if (fetchImg.inputTitle === '') {
    Notiflix.Notify.warning('Field must not be empty');
    refs.inputEl.value = '';
    return;
  }
}
function resetMarkup() {
  refs.imgCard.innerHTML = '';
}

// function onSearchImages(evt) {
//   evt.preventDefault();

//   fetchImg.inputTitle = evt.currentTarget.elements.searchQuery.value.trim();
//   resetMarkup();

//   if (fetchImg.inputTitle === '') {
//     Notiflix.Notify.warning('Field must not be empty');
//     refs.formInputField.value = '';
//     return;
//   }

//   refs.preloader.forEach(e => {
//     e.style.display = 'block';
//   });

//   fetchImg.resetPage();
//   fetchImg.resetCurrentHits();
//   refs.formInputField.value = '';

//   fetchImg
//     .fetchImg()
//     .then(hits => {
//       resetMarkup();
//       refs.imgCard.insertAdjacentHTML('beforeend', markup(hits));
//       gallerySimpleLightbox.refresh();
//       refs.preloader.forEach(e => {
//         e.style.display = 'none';
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       refs.preloader.forEach(e => {
//         e.style.display = 'none';
//         resetMarkup();
//       });
//     });
// }

// function onLoadMore() {
//   fetchImg
//     .fetchImg()
//     .then(hits => {
//       refs.imgCard.insertAdjacentHTML('beforeend', markup(hits));
//       gallerySimpleLightbox.refresh();
//       refs.preloader.forEach(e => {
//         e.style.display = 'none';
//       });
//       const { height: cardHeight } =
//         refs.imgCard.firstElementChild.getBoundingClientRect();

//       window.scrollBy({
//         top: cardHeight * 2,
//         behavior: 'smooth',
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

// function resetMarkup() {
//   refs.imgCard.innerHTML = '';
// }
