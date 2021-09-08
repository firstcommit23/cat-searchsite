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
  
      this.render();
      
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

    }
    
    lazyLoadObserver() {
      
      const images = document.querySelectorAll(".lazy");

      const imgOptions = {};
      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const img = entry.target;
          const data = img.dataset.img
          img.src = data
          imgObserver.unobserve(entry.target);
        });
      }, imgOptions);

      images.forEach((img) => {
        imgObserver.observe(img);
      });
    }
  
    render() {
      this.$target.innerHTML = this.data.length ? this.data
        .map(
          (cat, index) => `
            <div class="item" data-index="${index}">
              <img class="lazy" src="/assets/nyan-cat.gif" data-img="${cat.url}" alt="${cat.name}" />
              <div class="title">${cat.name}</div>
            </div>
          `
        )
        .join("")
        :
        `<div>404! 고양이가 없습니다!</div>`
        ;

    }
  }
  