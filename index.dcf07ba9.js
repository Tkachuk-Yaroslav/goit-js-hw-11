console.log("hello");const e={formEl:document.querySelector("form"),inputEl:document.querySelector("input"),searchBtnEl:document.querySelector('[type="submit"]'),loadMoreBtnEl:document.querySelector(".load-more"),gallaryContainerEl:document.querySelector(".gallery")},n=new class{fetchCards(){console.log(this);return fetch(`https://pixabay.com/api//?key=38626503-0c946b31d6d08b2c506c34012&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`).then((e=>e.json())).then((e=>(console.log(e),this.page+=1,e.hits)))}resetPage(){this.page=1}get query(){return this.searchQuery}set query(e){this.searchQuery=e}constructor(){this.searchQuery="",this.page=1}};function o(n){const o=n.map((({webformatURL:e,largeImageURL:n,tags:o,likes:t,comments:l,views:r,downloads:s})=>`\n        <div class="photo-card">\n  <img src="${e}" alt="" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes ${t}</b>\n    </p>\n    <p class="info-item">\n      <b>Views ${r}</b>\n    </p>\n    <p class="info-item">\n      <b>Comments ${l}</b>\n    </p>\n    <p class="info-item">\n      <b>Downloads ${s}</b>\n    </p>\n  </div>\n</div>\n        `));e.gallaryContainerEl.insertAdjacentHTML("beforeend",o.join())}console.log(e.formEl),console.log(e.inputEl),console.log(e.searchBtnEl),console.log(e.loadMoreBtnEl),console.log(e.gallaryContainerEl),e.formEl.addEventListener("submit",(function(t){t.preventDefault(),e.gallaryContainerEl.innerHTML="",n.query=t.currentTarget.elements.searchQuery.value,n.resetPage(),n.fetchCards().then((e=>{console.log("це воно",e),o(e)}))})),e.loadMoreBtnEl.addEventListener("click",(function(){n.fetchCards().then((e=>{o(e)}))}));
//# sourceMappingURL=index.dcf07ba9.js.map
