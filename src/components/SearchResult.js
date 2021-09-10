import {api} from '../api.js';

export default class SearchResult {
    $searchResult = null;
    data = null;
    onClick = null;
  
    constructor({ $app, initialData, onClick }) {

      this.$target = document.createElement("div");
      this.$target.className = "SearchResult";
      $app.appendChild(this.$target);
  
      this.data = initialData;
      this.onClick = onClick;

      this.$target.addEventListener("click", e => {
        const $item = e.target.closest('.item');
        if ($item) {
          const { index } = $item.dataset;
          onClick(this.data[index]);
        }
      });

    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();

      this.lazyLoadObserver();

      this.infiniteScroll();
    }

    // 추상화 필요
    // lazy 로드할 경우 클래스명에 1) lazy 추가 2)data-img 설정 3) 로딩이미지 설정
    lazyLoadObserver() {
      
      const images = document.querySelectorAll(".lazy");

      const imgOptions = {};
      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const $target = entry.target;
          const data = $target.dataset.img
          $target.classList.remove('lazy');
          $target.src = data

          imgObserver.unobserve($target);
        });
      }, imgOptions);

      images.forEach((img) => {
        imgObserver.observe(img);
      });
    }

    async loadMoreCats() {

      try {
          // 검색어 조회일때와 랜덤고양이일때와 구분하여 조회되어야 하지만 처리 안함.
          const res = await api.fetchRandomCats();

          if (res && res.data.length) {
           // setState를 부르게 되면 무한 루프에 빠진다..
           // this.setState([...this.data, ...res.data]);
           const $newCats = document.createElement('div');
           $newCats.innerHTML = res.data.map(
            (cat, index) => 
              `<div class="item" data-index="${index}">
                <img class="lazy" src="/assets/nyan-cat.gif" data-img="${cat.url}" alt="${cat.name}" />
                <div class="title">${cat.name}</div>
              </div>`
          )
          .join("");
           this.$target.append(...$newCats.childNodes);
          }

      } catch (e) {
        console.log(e);
        // 재실행
        this.loadMoreCats();
      }
    }
  
    infiniteScroll() {

      // 마지막 자식요소에 옵저버 붙이기
      const rootChildren = document.querySelector('.SearchResult').children;
      const lastChild = rootChildren[rootChildren.length-1];

      const io = new IntersectionObserver( async (entries, observer) => {
        // 마지막 요소가 다 보여진게 아니라면 return
        if (!entries[0].isIntersecting) return;
        
        // 한번 실행한 옵저버는 관측 종료한다 (스크롤을 반대로 했을 때 재실행 막기 위해)
        observer.disconnect();

        // 고양이를 더 조회해 온다
        await this.loadMoreCats();

        this.lazyLoadObserver();

        // 재조회한 결과에 옵저버를 다시 붙인다.
        this.infiniteScroll();
      });
      
      io.observe(lastChild);
    }

    render() {
      this.$target.innerHTML = this.data.length ? this.data
        .map(
          (cat, index) => 
            `<div class="item" data-index="${index}">
              <img class="lazy" src="/assets/nyan-cat.gif" data-img="${cat.url}" alt="${cat.name}" />
              <div class="title">${cat.name}</div>
            </div>`
        )
        .join("")
        :
        `<div>404! 고양이가 없습니다!</div>`
        ;

    }
  }