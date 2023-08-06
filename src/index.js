// import PixabayApiService from "../js/api-service";
import PixabayApiService from "./js/api-servise";

console.log('hello')

const API_KEY = '38626503-0c946b31d6d08b2c506c34012';
const BASE_URL = 'https://pixabay.com/api/';
// let formSearchQuery = '';

const refs = {
    formEl: document.querySelector("form"),
    inputEl: document.querySelector("input"),
    searchBtnEl: document.querySelector('[type="submit"]'),
    loadMoreBtnEl: document.querySelector(".load-more"),
    gallaryContainerEl: document.querySelector(".gallery")
}

const pixabayApiService = new PixabayApiService();

console.log(refs.formEl);
console.log(refs.inputEl);
console.log(refs.searchBtnEl);
console.log(refs.loadMoreBtnEl);
console.log(refs.gallaryContainerEl);

refs.formEl.addEventListener('submit', handleSearchForm);
refs.loadMoreBtnEl.addEventListener('click', handleLoadMore);

function handleSearchForm(event) {
    event.preventDefault();
    clearGallaryContainer();
    // formSearchQuery = event.currentTarget.elements.searchQuery.value;
    pixabayApiService.query = event.currentTarget.elements.searchQuery.value;
    pixabayApiService.resetPage();
    // console.log(formSearchQuery)

    // fetch(${BASE_URL}/?key=${API_KEY}&q=${formSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1)
    //     .then((response) => response.json())
    //     .then(console.log)

    pixabayApiService.fetchCards().then((cards) => {
        console.log('це воно', cards)
        
        // const murkup = cards.map(({webformatURL, largeImageURL, tags, likes, comments, views, downloads}) => {
        // return `
        // <div class="photo-card">
        // <img src="${webformatURL}" alt="" loading="lazy" />
        // <div class="info">
        //     <p class="info-item">
        //     <b>Likes ${likes}</b>
        //     </p>
        //     <p class="info-item">
        //     <b>Views ${views}</b>
        //     </p>
        //     <p class="info-item">
        //     <b>Comments ${comments}</b>
        //     </p>
        //     <p class="info-item">
        //     <b>Downloads ${downloads}</b>
        //     </p>
        //     </div>
        //     </div>
        //     `
        // })
        // refs.gallaryContainerEl.insertAdjacentHTML('beforeend', murkup.join());
        
        addCardsMurkup(cards);
    });
}

function handleLoadMore() {
    // fetch(${BASE_URL}/?key=${API_KEY}&q=${formSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1)
    //     .then((response) => response.json())
    //     .then(console.log)

    pixabayApiService.fetchCards().then(cards => {
        // const murkup = cards.map(({webformatURL, largeImageURL, tags, likes, comments, views, downloads}) => {
        // return `
        // <div class="photo-card">
        // <img src="${webformatURL}" alt="" loading="lazy" />
        // <div class="info">
        //     <p class="info-item">
        //     <b>Likes ${likes}</b>
        //     </p>
        //     <p class="info-item">
        //     <b>Views ${views}</b>
        //     </p>
        //     <p class="info-item">
        //     <b>Comments ${comments}</b>
        //     </p>
        //     <p class="info-item">
        //     <b>Downloads ${downloads}</b>
        //     </p>
        //     </div>
        //     </div>
        //     `
        // })
        // refs.gallaryContainerEl.insertAdjacentHTML('beforeend', murkup.join());
        
        addCardsMurkup(cards);
    });
    

}

function addCardsMurkup(cards) {
    const murkup = cards.map(({webformatURL, largeImageURL, tags, likes, comments, views, downloads}) => {
        return `
       <div class="photo-card">
  <img src="${webformatURL}" alt="" loading="lazy" />
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