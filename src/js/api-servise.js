export default class PixabayApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchCards() {
        console.log(this);
        const API_KEY = '38626503-0c946b31d6d08b2c506c34012';
        const BASE_URL = 'https://pixabay.com/api/';

        return fetch(`${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        .then((response) => response.json())
            .then(data => {
                console.log(data)
                // if (data.totalHits <= this.page * 40) {
                //     const loadBtn = document.querySelector('.load-more');
                //     loadBtn.classList.add("is-hidden");
                //     alert("We're sorry, but you've reached the end of search results.")
                // }
                this.page += 1
                
                return data.hits;
            })

    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}