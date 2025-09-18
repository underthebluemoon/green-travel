npm i react-router-dom @reduxjs/toolkit react-redux redux-thunk axios

** PWA 적용 **

1. 설치 
    - npm i -D vite-plugin-pwa
    - 준비물 : https + 도메인 + 공인된 인증서
        - vercel로 도메인 + 공인된 인증서 해결

2. Manifest 설정
    - `vite.config.js`에 PWA Manifest 설정을 추가
        - vite.config.js
    - 아이콘 이미지는 아래의 사이즈 별로 필요
        - 180×180(IOS), 192×192(web|Android), 512×512(web|Android)

3. 서비스 워커 작성
    - 파일 생성 :
        - `src/sw.js` : 서비스 워커 파일
        - `src/seRegister.js` : 서비스 워커를 등록하기 위한 파일

4. `src/main.jsx`에 서비스 워커 레지스터 추가

5. `index.html`에 meta 데이터 설정 (IOS 대응 및 Manifest 기본 설정)

6. 위 설정 완료 후 빌드
    - npm run build

7. 빌드한 것으로 동작하는 내장 서버 실행
    - npm run preview