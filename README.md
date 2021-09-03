## 프로그래머스 [고양이 사진첩] 테스트 과제 해설보면서 작성중입니다

['2021 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 기출 문제 해설](https://prgms.tistory.com/53)


## 디렉토리 구조

```bash
├── asset
├── src
│    ├── components
│    │    ├── ImageInfo.js
│    │    ├── SearchInput.js
│    │    ├── SearchResult.js
│    ├── styles
│    │    ├── style.css
│    ├── utils
│    │    ├── LazyLoad.js
│    │    ├── LocalStorage.js
│    │    ├── validator.js
│    ├── api.js
│    ├── App.js
│    └── main.js
└── index.html
```


#### 학습 포인트
- **class 문법**: class 문법을 사용하여 컴포넌트 생성
- **미디어 쿼리**
- **다크모드**
- **Lazy load**: 어플리케이션 성능 향상을 위해 필요한 시점에 리소스 가져올수있도록 Lazy Loading 기법 활용
- 이벤트 위임: 이벤트 위임을 통해 
- Web Storage API: 최근 검색어 저장, 새로고침 후에 화면유지를 위해 Web Storage API 활용. 장단점 확인