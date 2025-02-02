import axios from "axios";

const perPage = 15;

export const fetchPhotos = (searchedQuery, page) => {
    const params = new URLSearchParams({
        key: '48576644-2047f7a262d439c7b8152f8c6',
        q: searchedQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: perPage,
    });

    return axios.get(`https://pixabay.com/api/?${params}`);
};
