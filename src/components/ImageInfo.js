import { api } from '../api.js'

export default class ImageInfo {
    constructor({ $app, data, onClose }) {
      this.$target = document.createElement('div');
      this.$target.className = "ImageInfo";
      $app.appendChild(this.$target);
      
      this.data = data;
      this.onClose = onClose;

      this.$target.addEventListener("click", e => {
        const $closeBtn = e.target.closest('.close');
        
        if ($closeBtn) {
          onClose();
        }
      })
  
      this.render();
    }
  
    setState(nextData) {
      this.data = nextData;
      this.render();
    }
  
    render() {
      if (this.data.visible) {
        const { id, name, url, temperament, origin } = this.data.image;
  
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
        this.$target.style.display = "block";
      } else {
        this.$target.style.display = "none";
      }
    }
  }
  