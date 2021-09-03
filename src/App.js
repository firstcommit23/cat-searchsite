import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import ImageInfo from './components/ImageInfo.js'

import { api } from './api.js'

export default class App {

  constructor($app) {

    this.searchInput = new SearchInput({
      $app,
      onSearch: async (keyword) => {
        try {
          const res = await api.fetchCats(keyword);
          this.searchResult.setState(res.data);
        } catch (e) {
          console.log(e);
        }
      }
    });

    this.searchResult = new SearchResult({
      $app,
      initialData: [],
      onClick: async (image) => {
        const data = await api.fetchCat(image.id);

        if (data) {
          const { temperament, origin }  = data.data;
          image = {...image, 
                  temperament, 
                  origin}
        }
        
        this.imageInfo.setState({
          visible: true,
          image
        });
      }

    });

    this.imageInfo = new ImageInfo({
      $app,
      data: {
        visible: false,
        image: null
      },

      onClose: () => {
        this.imageInfo.setState({
          data: {
            visible: false,
            image: null
          }
        });
      }
    });

    this.init();

    document.addEventListener("keyup", e => {
      if (this.imageInfo.data.visible && e.key === "Escape") {
        this.imageInfo.onClose();
      }
    })
  }

  async init () {
    try {

      const data = await api.fetchRandomCats();
      if (data) {
        this.searchResult.setState(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
