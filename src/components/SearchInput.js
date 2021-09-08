
export default class SearchInput {

  constructor({ $app, state={}, onSearch, onClick }) {
    this.$target = document.createElement('section');
    this.$target.className = 'SearchSection';
    $app.appendChild(this.$target);

    this.$target.addEventListener("keyup", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
      }
    })

    this.state = state;
    this.onSearch = onSearch;
    this.onClick = onClick;
    this.render();

    this.focusOnSearchInput();

    this.$target.addEventListener("click", e => onClick(e));
  }

  setState(nextState) {
    this.state = nextState;

    this.render();
  }

  focusOnSearchInput() {
    document.querySelector('.SearchInput').focus();
  }

  render() {
    this.$target.innerHTML = `
      <div class="searchInputArea">
        <input type="text" class="SearchInput" placeholder="고양이를 검색해보세요." data-input="text" value="${this.state.keyword}" />
        <button class="randomSearchButton" data-input="randomBtn">🐱 랜덤 고양이</button>
      </div>
      <div class="recentSearch">
        ${this.state.keywords?.map((keyword, index) => {
          return `<span class="keywordItem" data-input="keywordSearch" data-keyword="${keyword}">${keyword} <button data-input="keywordDelete">x</button></span>`
        }).join('')}
      </div>
    `;
  }

  

}
