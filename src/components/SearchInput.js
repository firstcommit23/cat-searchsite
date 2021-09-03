export default class SearchInput {

  constructor({ $app, onSearch, onClick }) {
    this.$target = document.createElement('input');
    this.$target.className = 'SearchInput';
    this.$target.placeholder = "고양이를 검색해보세요.";
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

    this.$target.addEventListener("click", e => onClick());
  }

  focusOnSearchInput() {
    this.$target.focus();
  }

  render() {}

  

}
