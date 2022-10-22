export default function markup(img) {
  return img
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="card">
        <div class="card__link"><a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width='370'/></a></div>
        <div class="card__info">
        <div class="card__link-item">
        <p>
        <b>Likes: </b><br>${likes}
        </p>
        </div>
        <div class="card__link-item">
        <p>
        <b>Views: </b><br>${views}
        </p>
        </div>
        <div class="card__link-item">
        <p>
        <b>Comments: </b><br>${comments}
        </p>
        </div>
        <div class="card__link-item">
        <p>
        <b>Downloads: </b><br>${downloads}
        </p>
        </div>
        </div>
        </div>`;
      }
    )
    .join('');
}
