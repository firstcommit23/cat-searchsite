## 프로그래머스 [고양이 검색사이트] 테스트 과제 작성중입니다.

['2021 Dev-Matching: 웹 프론트엔드 개발자(상반기)' 기출 문제 해설](https://programmers.co.kr/skill_check_assignments/4)


## 디렉토리 구조

```bash
├── asset
├── src
│    ├── components
│    │    ├── ImageInfo.js
│    │    ├── Loading.js
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


#### 목록 작업 (2021.9.4) (*진한글씨 필수구현사항)
- 시멘틱 태그 사용
- [완료] 반응형 적용(이미지 목록 갯수, 상세모달 너비)
- 다크모드
- [완료] **상세모달 닫기 기능**(x버튼 클릭, 모달 외 영역 클릭, Esc Keyup)
- [완료] 상세모달 고양이 성격, 태생정보 렌더링 (fetch 사용)
- [완료] 상세모달 fadein/out (Animation)
- [완료] 검색 input 초기 포커스 주기
- [완료] 검색 input 입력된 상태에서 Click시 내용 초기화
- [완료] **로딩 구현** (초기, 검색, 상세모달 클릭)
- [완료] **검색 결과 없을 때 처리** (TODO: css 보정여부 검토)
- 최근검색어 저장, 조회, 삭제 
- 새로고침 후 화면 유지
- [완료] **랜덤 조회 기능** (TODO: 랜덤조회 버튼 추가)
- Lazy Load
- 마우스오버 시 고양이 이름 보여주기
- 무한 스크롤
- 랜던 고양이 배너 섹션 추가 (5개 슬라이드)
- **status code에 따라 에러메세지 분리**  
- 리펙토링