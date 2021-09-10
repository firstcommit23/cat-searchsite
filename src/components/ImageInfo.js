export default class ImageInfo {

    constructor({ $app, data }) {
      this.$target = document.createElement('div');
      this.$target.className = "ImageInfo Modal";
      this.$target.style.transition = "opacity 300ms";
      this.$target.style.opacity = 0;
      $app.appendChild(this.$target);
      
      this.data = data;

      this.$target.addEventListener("click", e => {
        const $closeBtn = e.target.closest('.close');

        if ( $closeBtn || (!$closeBtn && !e.target.closest('.content-wrapper'))) {
          this.closeModal();
        }
      })
  
      // modal fade-out시 이벤트 리스너도 삭제
      document.addEventListener("keyup", e => this.onKeyDown(e));
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;

      this.render();
    }
    
    closeModal() {

      this.$target.classList.remove("fade-in");
      this.$target.classList.add("fade-out");
      this.$target.ontransitionend = () => this.$target.remove();

      document.removeEventListener("keyup", this.onKeyDown());
    }
  
    render() {
      if (this.data.visible) {
        const { name, url, temperament, origin } = this.data.image;
  
        this.$target.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close">x</div>
            </div>
            <img src="${url}" alt="${name}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`;
        this.$target.classList.add("fade-in");
      }
    }
    
    onKeyDown = (e) => {
      e && e.key === 'Escape' && this.closeModal();
    };

  }
  