import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30150514-c6c2592e7290a81c416aa6291';

export default class ClassImg {
  constructor() {
    this.searchInput = '';
    this.page = 1;
    this.currentHits = 0;
  }

  async fetchImg() {
    const params = new URLSearchParams({
      key: API_KEY,
      q: this.searchImg,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: this.page,
      per_page: 40,
    });

    const response = await axios.get(`${BASE_URL}?${params}`);
    const { data } = response;

    this.currentHits += data.hits.length;
    this.page += 1;

    return data;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  resetCurrentHits() {
    this.currentHits = 0;
  }

  get inputText() {
    return this.searchImg;
  }

  set inputText(newTitle) {
    this.searchImg = newTitle;
  }
}
