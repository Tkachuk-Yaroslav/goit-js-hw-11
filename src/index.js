import axios from "axios";
import PixabayApiService from "./js/api-servise";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

let gallery = new SimpleLightbox('.gallery a');

const API_KEY = '38626503-0c946b31d6d08b2c506c34012';
const BASE_URL = 'https://pixabay.com/api/';


const refs = {
    formEl: document.querySelector("form"),
    inputEl: document.querySelector("input"),
    searchBtnEl: document.querySelector('[type="submit"]'),
    loadMoreBtnEl: document.querySelector(".load-more"),
    gallaryContainerEl: document.querySelector(".gallery")
}

//початково кнопка скрита
refs.loadMoreBtnEl.classList.add("is-hidden");

const pixabayApiService = new PixabayApiService();

console.log(refs.formEl);
console.log(refs.inputEl);
console.log(refs.searchBtnEl);
console.log(refs.loadMoreBtnEl);
console.log(refs.gallaryContainerEl);

refs.formEl.addEventListener('submit', handleSearchForm);
refs.loadMoreBtnEl.addEventListener('click', handleLoadMore);

async function handleSearchForm(event) {
    event.preventDefault();
    clearGallaryContainer();
    // formSearchQuery = event.currentTarget.elements.searchQuery.value;
    pixabayApiService.query = event.currentTarget.elements.searchQuery.value.trim();

    if (pixabayApiService.query === '') {
        refs.loadMoreBtnEl.classList.add("is-hidden");
        return Notify.failure('Потрібно щось ввести!');
    }
    // refs.loadMoreBtnEl.classList.remove("is-hidden");
    // refs.loadMoreBtnEl.setAttribute('disabled', true);

    pixabayApiService.resetPage();
    // console.log(formSearchQuery)

    // fetch(${BASE_URL}/?key=${API_KEY}&q=${formSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1)
    //     .then((response) => response.json())
    //     .then(console.log)
    try {
        const result = await pixabayApiService.fetchCards();
        console.log('RESULT', result)
        if (!result.hits.length) {
            refs.loadMoreBtnEl.classList.add("is-hidden");
            return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else {
            Notify.success(`Hooray! We found ${result.totalHits} images.`);
            // alert(`Hooray! We found ${result.totalHits} images.`)
            // console.log(result)
        }
        refs.loadMoreBtnEl.removeAttribute('disabled');
        refs.loadMoreBtnEl.classList.remove("is-hidden");
        addCardsMurkup(result.hits);
        gallery.refresh();
        const { height: cardHeight } = document
        .querySelector(".gallery")
        .firstElementChild.getBoundingClientRect();

     window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
     });
    
        if (result.hits.length < 40) {
        // Notify.failure("We're sorry, but you've reached the end of search results.");
        refs.loadMoreBtnEl.classList.add("is-hidden");
        }
    } catch(err) {
        Notify.failure('Ooop something went wrong!')
        console.log(err)
    };
    



    // pixabayApiService.fetchCards().then((cards) => {
    //     console.log('це воно', cards)
    //     if (!cards.length) {
    //         refs.loadMoreBtnEl.classList.add("is-hidden");
    //         return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    //     }
        
    //     refs.loadMoreBtnEl.removeAttribute('disabled');
    //     refs.loadMoreBtnEl.classList.remove("is-hidden");
    //     // const murkup = cards.map(({webformatURL, largeImageURL, tags, likes, comments, views, downloads}) => {
    //     // return `
    //     // <div class="photo-card">
    //     // <img src="${webformatURL}" alt="" loading="lazy" />
    //     // <div class="info">
    //     //     <p class="info-item">
    //     //     <b>Likes ${likes}</b>
    //     //     </p>
    //     //     <p class="info-item">
    //     //     <b>Views ${views}</b>
    //     //     </p>
    //     //     <p class="info-item">
    //     //     <b>Comments ${comments}</b>
    //     //     </p>
    //     //     <p class="info-item">
    //     //     <b>Downloads ${downloads}</b>
    //     //     </p>
    //     //     </div>
    //     //     </div>
    //     //     `
    //     // })
    //     // refs.gallaryContainerEl.insertAdjacentHTML('beforeend', murkup.join());
        
    //     addCardsMurkup(cards);
    //     const { height: cardHeight } = document
    //         .querySelector(".gallery")
    //         .firstElementChild.getBoundingClientRect();

    //         window.scrollBy({
    //         top: cardHeight * 2,
    //         behavior: "smooth",
    //         });
    //     if (cards.length < 40) {
    //         Notify.failure("We're sorry, but you've reached the end of search results.");
    //         refs.loadMoreBtnEl.classList.add("is-hidden");
    //     }
    // }).catch(err => {
    //     Notify.failure('Ooop something went wrong!')
    //     console.log(err)
    // });
}

async function handleLoadMore() {
    // fetch(${BASE_URL}/?key=${API_KEY}&q=${formSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1)
    //     .then((response) => response.json())
    //     .then(console.log)
    refs.loadMoreBtnEl.setAttribute('disabled', true);

    try {
        const result = await pixabayApiService.fetchCards();
        refs.loadMoreBtnEl.removeAttribute('disabled');
        console.log('Це handleLoadMore резалт', result);
        const maxPage = Math.ceil(result.totalHits / 40);
        if (maxPage === pixabayApiService.page - 1) {
            refs.loadMoreBtnEl.setAttribute('disabled', true);
            refs.loadMoreBtnEl.classList.add("is-hidden");
            Notify.failure("We're sorry, but you've reached the end of search results.");
            
        }
        console.log(maxPage)
        addCardsMurkup(result.hits);
        gallery.refresh();

        const { height: cardHeight } = document
            .querySelector(".gallery")
            .firstElementChild.getBoundingClientRect();

        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth",
        });

        if (result.hits.length < 40) {
            Notify.failure("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtnEl.classList.add("is-hidden");
        }

    } catch(err){
        Notify.failure('Ooop something went wrong!')
        console.log(err)
     };



    // pixabayApiService.fetchCards().then(cards => {
    //     refs.loadMoreBtnEl.removeAttribute('disabled');
        
    //     addCardsMurkup(cards);
    //     const { height: cardHeight } = document
    //     .querySelector(".gallery")
    //     .firstElementChild.getBoundingClientRect();

    //     window.scrollBy({
    //     top: cardHeight * 2,
    //     behavior: "smooth",
    //     });
    //     console.log('те що я хочу', cards)
    //     if (cards.length < 40) {
    //         Notify.failure("We're sorry, but you've reached the end of search results.");
    //         refs.loadMoreBtnEl.classList.add("is-hidden");
    //     }
        
    // }).catch(err => {
    //     Notify.failure('Ooop something went wrong!')
    //     console.log(err)
    // });
    

}

function addCardsMurkup(cards) {
    const murkup = cards.map(({webformatURL, largeImageURL, tags, likes, comments, views, downloads}) => {
        return `
       <div class="photo-card">
       <a class="gallery-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div>
        `
    })
    refs.gallaryContainerEl.insertAdjacentHTML('beforeend', murkup.join(''));
    
}

function clearGallaryContainer() {
    refs.gallaryContainerEl.innerHTML = '';
}