import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { requestServer } from './pixabay-api';

import { markup } from "./render-functions";
import { loadMoreButton } from './loadMoreButton';

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
    searchButton: document.querySelector('#search-form button'),
};


loadMoreButton.buttonAdress = refs.loadMoreButton

let totalImagesUploaded = 20;

loadMoreButton.buttonState({});

refs.form.addEventListener('submit', onSumbitForm);
refs.loadMoreButton.addEventListener('click', onSumbitLoadMore);

async function onSumbitForm(event) {
    event.preventDefault();
    const { searchQuery } = event.currentTarget.elements;
    if (!searchQuery.value.trim()) {
        iziToast.info({
            message: 'Please, enter data to search!',
            position: "topRight"
        });
        return;
    }
    refs.searchButton.disabled = true;
    requestServer.params.page = 0;
    refs.gallery.innerHTML = '';
    loadMoreButton.buttonState({
        isHiden: false,
        loading: true,
    });

    try {
        const response = await requestServer.onRequestServer(searchQuery.value);

        const { hits, totalHits } = response.data;

        if (!totalHits) {
            iziToast.error({
                message: "Sorry, there are no images matching your search query. Please try again.",
                position: "topRight"
            });
            loadMoreButton.buttonState({ isHiden: true });
            refs.searchButton.disabled = false;
            return;
        }

        iziToast.success({
            message: `Hooray! We found ${totalHits} images.`,
            position: "topRight"
        });
        refs.gallery.insertAdjacentHTML("beforeend", markup(hits));
        refs.searchButton.disabled = false;

        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();

        if (totalHits <= 20) {
            loadMoreButton.buttonState({
                isHiden: true,
                disabled: true,
            })
        } else {
            loadMoreButton.buttonState({
                isHiden: false,
                disabled: false,
                loading: false,
            });
        }
    } catch (error) {
        console.log(error);
        loadMoreButton.buttonState({
            isHiden: true,
            disabled: true,
        })
    };
}

async function onSumbitLoadMore(event) {
    loadMoreButton.buttonState({
        disabled: true,
        loading: true,
        isHiden: false,
    });
    try {
        const response = await requestServer.onRequestServer();
        const { hits, totalHits } = response.data;

        refs.gallery.insertAdjacentHTML("beforeend", markup(hits));
        loadMoreButton.buttonState({
            isHiden: false,
            disabled: false,
            loading: false,
        });

        totalImagesUploaded += 20;
        if (totalImagesUploaded >= totalHits) {
            iziToast.warning({
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight"
            });
            loadMoreButton.buttonState({
                isHiden: true,
                disabled: true,
            });
        }
        const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();
        window.scrollBy({
            top: cardHeight * 2,
            // top: cardHeight * 2.55,
            behavior: "smooth",
        });
        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();

    } catch (error) {
        console.log(error);
    };
}