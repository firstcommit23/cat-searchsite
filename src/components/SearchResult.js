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
    }
  
    render() {
      console.log(this.data)
      this.$target.innerHTML = this.data.length ? this.data
        .map(
          (cat, index) => `
            <div class="item" data-index="${index}">
              <img src=${cat.url} alt=${cat.name} />
            </div>
          `
        )
        .join("")
        :
        `<div>404! 고양이가 없습니다!</div>`
        ;

    }
  }
  