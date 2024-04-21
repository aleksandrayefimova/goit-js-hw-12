import{a as m,i as d,S as f}from"./assets/vendor-eded45c0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const u={url:"https://pixabay.com/api/",params:{key:"35337679-b7947e609f482c58d47f4cd5a",q:"",image_type:"photo",orientation:"horizontal",safesearch:"true",page:1,per_page:20},onRequestServer(o=this.params.q){return this.params.q=o,this.params.page+=1,m.get(this.url,{params:this.params})}};function g(o){return o.map(({webformatURL:s,largeImageURL:r,tags:n,likes:e,views:t,comments:l,downloads:h})=>`
    <div class="gallery__item">
      <a class="gallery__link" href="${r}">
        <img class="gallery__image" src="${s}" alt="${n}"/>
      </a>
      <div class="gallery__info">
        <p class="gallery__info-item">
          <b>Likes ${e}</b>
        </p>
        <p class="gallery__info-item">
          <b>Views ${t}</b>
        </p>
        <p class="gallery__info-item">
          <b>Comments ${l}</b>
        </p>
        <p class="gallery__info-item">
          <b>Downloads ${h}</b>
        </p>
      </div>
    </div>`).join("")}const a={isHiden:!0,disabled:!0,loading:!1,buttonAdress:null,buttonState({isHiden:o=this.isHiden,disabled:s=this.disabled,loading:r=this.loading}){o?this.buttonAdress.classList.add("visually-hidden"):this.buttonAdress.classList.remove("visually-hidden"),s?this.buttonAdress.disabled=!0:this.buttonAdress.disabled=!1,r?this.buttonAdress.textContent="Loading...":this.buttonAdress.textContent="Load-more"}},i={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loadMoreButton:document.querySelector(".load-more"),searchButton:document.querySelector("#search-form button")};a.buttonAdress=i.loadMoreButton;let c=20;a.buttonState({});i.form.addEventListener("submit",b);i.loadMoreButton.addEventListener("click",p);async function b(o){o.preventDefault();const{searchQuery:s}=o.currentTarget.elements;if(!s.value.trim()){d.info({message:"Please, enter data to search!",position:"topRight"});return}i.searchButton.disabled=!0,u.params.page=0,i.gallery.innerHTML="",a.buttonState({isHiden:!1,loading:!0});try{const r=await u.onRequestServer(s.value),{hits:n,totalHits:e}=r.data;if(!e){d.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),a.buttonState({isHiden:!0}),i.searchButton.disabled=!1;return}d.success({message:`Hooray! We found ${e} images.`,position:"topRight"}),i.gallery.insertAdjacentHTML("beforeend",g(n)),i.searchButton.disabled=!1,new f(".gallery a").refresh(),e<=20?a.buttonState({isHiden:!0,disabled:!0}):a.buttonState({isHiden:!1,disabled:!1,loading:!1})}catch(r){console.log(r),a.buttonState({isHiden:!0,disabled:!0})}}async function p(o){a.buttonState({disabled:!0,loading:!0,isHiden:!1});try{const s=await u.onRequestServer(),{hits:r,totalHits:n}=s.data;i.gallery.insertAdjacentHTML("beforeend",g(r)),a.buttonState({isHiden:!1,disabled:!1,loading:!1}),c+=20,c>=n&&(d.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),a.buttonState({isHiden:!0,disabled:!0}));const{height:e}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"}),new f(".gallery a").refresh()}catch(s){console.log(s)}}
//# sourceMappingURL=commonHelpers.js.map
