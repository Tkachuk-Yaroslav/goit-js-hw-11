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

function handleSearchForm(event) {
    event.preventDefault();
    clearGallaryContainer();
    // formSearchQuery = event.currentTarget.elements.searchQuery.value;
    pixabayApiService.query = event.currentTarget.elements.searchQuery.value.trim();

    if (pixabayApiService.query === '') {
        return alert("Потрібно щось ввести!");
    }
    // refs.loadMoreBtnEl.classList.remove("is-hidden");
    // refs.loadMoreBtnEl.setAttribute('disabled', true);

    pixabayApiService.resetPage();
    // console.log(formSearchQuery)

    // fetch(${BASE_URL}/?key=${API_KEY}&q=${formSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1)
    //     .then((response) => response.json())
    //     .then(console.log)

    pixabayApiService.fetchCards().then((cards) => {
        console.log('це воно', cards)
        if (!cards.length) {
            refs.loadMoreBtnEl.classList.add("is-hidden");
            return alert("Sorry, there are no images matching your search query. Please try again.")
        }
        
        refs.loadMoreBtnEl.removeAttribute('disabled');
        refs.loadMoreBtnEl.classList.remove("is-hidden");
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
    }).catch(err => {
        alert('Ooop something went wrong!')
        console.log(err)
    });
}

function handleLoadMore() {
    // fetch(${BASE_URL}/?key=${API_KEY}&q=${formSearchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1)
    //     .then((response) => response.json())
    //     .then(console.log)
    refs.loadMoreBtnEl.setAttribute('disabled', true);

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
        refs.loadMoreBtnEl.removeAttribute('disabled');
        
        addCardsMurkup(cards);

        console.log('те що я хочу', cards)
        if (cards.length < 40) {
            alert("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtnEl.classList.add("is-hidden");
        }
        
    }).catch(err => {
        alert('Ooop something went wrong!')
        console.log(err)
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