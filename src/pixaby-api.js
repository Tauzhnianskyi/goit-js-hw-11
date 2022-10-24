import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '30737350-82f55820a31d3ae852bd21a9d';

export default class FetchImg {
  constructor() {
    this.searchInput = '';
    this.page = 1;
    this.currentHits = 0;
  }

  async fetchImg() {
    const params = new URLSearchParams({
      key: KEY,
      q: this.searchImg,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });
    try {
      const response = await axios.get(`${BASE_URL}?${params}`);
      const { data } = response;
      this.currentHits += data.hits.length;
      if (data.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else if (this.currentHits >= data.totalHits) {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      } else if (this.page === 1 && data.totalHits) {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }

      this.page += 1;
      return data.hits;
    } catch {
      error => console.log(error);
    }
  }
  resetPage() {
    this.page = 1;
  }

  resetCurrentHits() {
    this.currentHits = 0;
  }

  get inputTitle() {
    return this.searchImg;
  }

  set inputTitle(newTitle) {
    this.searchImg = newTitle;
  }
}
