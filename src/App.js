import SearchInput from './components/SearchInput.js'
import SearchResult from './components/SearchResult.js'
import ImageInfo from './components/ImageInfo.js'
import Loading from './components/Loading.js'

import { api } from './api.js'
import LocalStorage from './utils/LocalStorage.js'
import DarkMode from './components/DarkMode.js'

export default class App {

  
  constructor($app) {
    this.$app = $app;

    this.darkMode = new DarkMode({$app});

    this.searchInput = new SearchInput({
      $app,
      state: {
          keywords: LocalStorage.get('keywords') || [],
          keyword: ''
      },
      onSearch: async (keyword) => {

        const loading = new Loading();
        try {

          const res = await api.fetchCats(keyword);
          LocalStorage.set('data', res.data);
          
          this.searchResult.setState(res.data);

          // 최근검색어 저장
          const recent = LocalStorage.get('keywords') || []
          const findIndex = recent?.findIndex(word => word === keyword);

          if (!~findIndex) {
            if (recent.length === 5) recent.pop();
          } else {
            // 기존 동일 키워드 검색 결과가 있을 경우 삭제 후 재입력
            recent.splice(findIndex, 1);
          }

          recent.unshift(keyword)

          LocalStorage.set('keywords', recent);
          this.searchInput.setState({keyword, keywords: recent});
        } catch (e) {
          console.log(e);
        } finally {
          loading && loading.$target.remove();
        }
      },
      onClick: e => {
        const { input, keyword } = e.target.dataset;

        if (input === "text" ) {
          e.target.value = "";

        } else if ( input === "randomBtn" ) {
          this.fetchRandomCats();

        } else if (input === "keywordDelete") {
          const $item = e.target.closest(".keywordItem");
          
          if($item) {
            const keyword = $item.dataset.keyword;
            const recent = LocalStorage.get('keywords').filter(word => word !== keyword);

            LocalStorage.set('keywords', recent);
            this.searchInput.setState({...this.searchInput.state, keywords: recent});
          }

        } else if (input === "keywordSearch") {
          this.searchInput.setState({...this.searchInput.state, keyword: keyword});
          this.searchInput.onSearch(keyword);
        }
      }
    });

    this.searchResult = new SearchResult({
      $app,
      initialData: [],
      onClick: async (image) => {

        this.imageInfo = new ImageInfo({
          $app,
          data: {
            visible: false
          },
        });
        
        const loading = new Loading();
        try {
          const data = await api.fetchCat(image.id);
  
          if (data) {
            const { temperament, origin }  = data.data;
            image = {
              ...image, 
              temperament, 
              origin
            }
          }
          
          loading && loading.$target.remove();
          this.imageInfo.setState({
            ...this.imageInfo.data,
            image: image,
            visible: true
          })
  
        } catch (e) {
          console.log(e);
          this.imageInfo.closeModal();
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
