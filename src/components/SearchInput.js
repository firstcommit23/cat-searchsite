
export default class SearchInput {

  constructor({ $app, onSearch, onClick }) {
    this.$target = document.createElement('section');
    this.$target.className = 'SearchSection';
    $app.appendChild(this.$target);

    this.$target.addEventListener("keyup", e => {
      if (e.key === 'Enter') {
        onSearch(e.target.value);
      }
    })

    this.onSearch = onSearch;
    this.onClick = onClick;
    this.render();

    this.focusOnSearchInput();

    this.$target.addEventListener("click", e => onClick(e));
  }

  focusOnSearchInput() {
    this.$target.focus();
  }

  render() {
    this.$target.innerHTML = `
      <input type="text" class="SearchInput" placeholder="고양이를 검색해보세요." data-input="text" />
      <button class="randomSearchButton" data-input="randomBtn">🐱 랜덤 고양이</button>
    `;
  }

  

}
