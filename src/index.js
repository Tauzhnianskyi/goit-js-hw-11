import './css/style.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import debounce from 'lodash.debounce';
import ClassImg from './pixaby-api';
import markup from './markup';

const refs = {
  formEl: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  card: document.querySelector('.gallery'),
  infinity: document.querySelectorAll('.loader div'),
};

const fetchImg = new ClassImg();
let gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

refs.formEl.addEventListener('submit', onSearchImages);

async function onSearchImages(evt) {
  evt.preventDefault();

  fetchImg.inputText = evt.currentTarget.elements.searchQuery.value.trim();
  resetMarkup();
  fetchImg.resetPage();
  fetchImg.resetCurrentHits();

  if (fetchImg.inputText === '') {
    Notiflix.Notify.warning('Field must not be empty');
    refs.input.value = '';
    return;
  }

  refs.infinity.forEach(evt => {
    evt.style.display = 'block';
  });

  refs.input.value = '';

  try {
    const data = await fetchImg.fetchImg();
    if (data.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (fetchImg.currentHits >= data.totalHits) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else if (fetchImg.page === 2) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }

    refs.card.insertAdjacentHTML('beforeend', markup(data.hits));
    gallerySimpleLightbox.refresh();
    refs.infinity.forEach(evt => {
      evt.style.display = 'none';
    });
  } catch (err) {
    console.log(err);
    resetMarkup();
    refs.infinity.forEach(evt => {
      evt.style.display = 'none';
    });
  }
}

async function onLoadMore() {
  try {
    const data = await fetchImg.fetchImg();

    if (fetchImg.currentHits >= data.totalHits) {
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      refs.card.insertAdjacentHTML('beforeend', markup(data.hits));
      gallerySimpleLightbox.refresh();
      refs.infinity.forEach(evt => {
        evt.style.display = 'none';
      });
    }
  } catch (err) {
    console.log(err);
  }
  const { height: cardHeight } =
    refs.card.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

const onScrollListener = debounce(e => {
  const documentRect = document.documentElement.getBoundingClientRect();
  if (documentRect.bottom < document.documentElement.clientHeight + 1) {
    onLoadMore();
  }
}, 200);

window.addEventListener('scroll', onScrollListener);

function resetMarkup() {
  refs.card.innerHTML = '';
}
