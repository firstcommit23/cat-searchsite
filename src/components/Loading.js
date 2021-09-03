// 참고 : https://github.com/ChangHyun2/programmers-dev-matching-2021

export default class Loading {

    constructor() {

        this.$target = document.createElement('div');
        this.$target.className = 'loading';
        this.$target.innerHTML = `
        <span class="loading">
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
          <span class="loading-dot"></span>
        </span>`

        document.body.appendChild(this.$target);
    }

}