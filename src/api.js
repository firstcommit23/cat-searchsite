const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";
 
const request = async url => {
    try {
        const res = await fetch(url);
        if(!res.ok) {
            throw new Error(`서버와의 통신중에 오류가 발생 했습니다. ${res}`);
        }
        
        return res.json();
    } catch (e) {
        throw new Error(`알 수 없는 오류가 발생 했습니다. ${e.massage}`);
    }
}

export const api = {
  fetchCats: async (keyword) => {
      try {
        return await request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)

      } catch (e) {
        throw new Error(`알 수 없는 오류가 발생 했습니다. ${e.massage}`)
      }
  },
  fetchCat: async (catId) => {
      try {
        return await request(`${API_ENDPOINT}/api/cats/${catId}`)


      } catch (e) {
        throw new Error(`알 수 없는 오류가 발생 했습니다. ${e.massage}`)
      }
  },
  fetchRandomCats: async () => {
      try {
          return await request(`${API_ENDPOINT}/api/cats/random50`);
      } catch (e) {
        throw new Error(`알 수 없는 오류가 발생 했습니다. ${e.massage}`)
      }
  }
};
