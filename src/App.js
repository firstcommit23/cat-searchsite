import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import ImageInfo from './components/ImageInfo.js'
import Loading from './components/Loading.js'

import { api } from './api.js'
import LocalStorage from './utils/LocalStorage.js'

export default class App {

  
  constructor($app) {
    this.$app = $app;
    this.searchInput = new SearchInput({
      $app,
      onSearch: async (keyword) => {

        const loading = new Loading();
        try {

          const res = await api.fetchCats(keyword);
          // this.LocalStorage.set('data', res.data);
          
          this.searchResult.setState(res.data);

          // 최근검색어 저장
          const recent = LocalStorage.get('keywords')
          // if (!recent.findIndex(word => word === keyword)) {
            // console.log(word)
            // this.LocalStorage.set('keywords', [...recent, keyword]);
          // }
        } catch (e) {
          console.log(e);
        } finally {
          loading && loading.$target.remove();
        }
      },
      onClick: e => {
        const { input } = e.target.dataset;

        if ( input === "text" ) {
          e.target.value = ""
        } else if ( input === "randomBtn" ) {
          this.fetchRandomCats();
        }
      }
    });

    this.searchResult = new SearchResult({
      $app,
      initialData: [],
      onClick: async (image) => {

        const loading = new Loading();
        try {
          const data = await api.fetchCat(image.id);
  
          if (data) {
            const { temperament, origin }  = data.data;
            image = {...image, 
                    temperament, 
                    origin}
          }
          
          loading && loading.$target.remove();
          new ImageInfo({
            $app,
            data: {
              visible: true,
              image
            },
      
          });
  
        } catch (e) {
          console.log(e);
        } finally {
          loading && loading.$target.remove();
        }
      }

    });



    this.fetchRandomCats();

  }

  

  async fetchRandomCats () {
    const loading = new Loading();
    try {

        const res = await api.fetchRandomCats();
        if (res) {
          this.searchResult.setState(res.data);
        }

    } catch (e) {
      console.log(e);
    } finally {
      loading && loading.$target.remove();
    }
  }
}
