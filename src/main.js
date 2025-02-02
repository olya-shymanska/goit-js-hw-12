import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { cardTemplate } from './js/render-functions';
import { fetchPhotos } from './js/pixabay-api';

const searchForm = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loading');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let searchedQuery = '';
const perPage = 15;
let lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 500,
});

const searchFormSubmit = async event => {
    try {
        event.preventDefault();
        gallery.innerHTML = '';
        loadMoreButton.style.display = 'none';
        searchedQuery = event.currentTarget.elements.query.value.trim();
        currentPage = 1;

        if (searchedQuery === '') {
            iziToast.show({
                title: '',
                backgroundColor: 'red',
                messageColor: 'white',
                position: 'topRight',
                message: 'Please enter a search term!'
            });
            return;
        }

        loading.style.display = 'block';

        const { data } = await fetchPhotos(searchedQuery, currentPage);

        if (data.total === 0) {
            iziToast.show({
                title: '',
                backgroundColor: 'red',
                messageColor: 'white',
                position: 'topRight',
                message: 'Sorry, there are no images matching your search query. Please try again!'
            });
            searchForm.reset();
            loading.style.display = 'none';
            return;
        }

        gallery.innerHTML = data.hits.map(el => cardTemplate(el)).join('');
        lightbox.refresh();

        loading.style.display = 'none';

        if (data.totalHits > perPage) {
            loadMoreButton.style.display = 'block';
        }

        searchForm.reset();

    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
    }
};

const loadMoreImages = async () => {
    
    try {
        currentPage += 1;

        loading.style.display = 'block'; 
        
        const { data } = await fetchPhotos(searchedQuery, currentPage);

        if (data.hits.length === 0) {
            loadMoreButton.style.display = 'none';
            return;
        }

        const newGalleryHTML = data.hits.map(el => cardTemplate(el)).join('');
        gallery.insertAdjacentHTML('beforeend', newGalleryHTML);

        lightbox.refresh();
         loading.style.display = 'none';

        const cardHeight = document.querySelector('.photo-card').getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
        });

        if (currentPage * perPage >= data.totalHits) {
            loadMoreButton.style.display = 'none';
            iziToast.show({
                title: '',
                backgroundColor: 'blue',
                messageColor: 'white',
                position: 'topRight',
                message: "We're sorry, but you've reached the end of search results."
            });
        }

    } catch (error) {
        console.log(error);
        loading.style.display = 'none';
    }
};




searchForm.addEventListener('submit', searchFormSubmit);
loadMoreButton.addEventListener('click', loadMoreImages);
