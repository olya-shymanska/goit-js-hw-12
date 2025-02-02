export const cardTemplate = cardInfo => {
    return ` 
    <li class="photo-card">
        <a href="${cardInfo.largeImageURL}">
            <img src="${cardInfo.webformatURL}" alt="${cardInfo.tags}" />
        </a>
        <div class="info">
            <p>Likes: <span>${cardInfo.likes}</span></p>
            <p>Views: <span>${cardInfo.views}</span></p>
            <p>Comments: <span>${cardInfo.comments}</span></p>
            <p>Downloads: <span>${cardInfo.downloads}</span></p>
        </div>
    </li>`;
};
