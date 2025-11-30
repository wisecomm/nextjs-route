
# 복사 사용모듈
1. axios 공통화 모듈 
  : 서버사이드 쿠키 사용
 - 처리 사항
  : rest 리턴값 공통 처리
  : 리프래시 토큰 처리 ( 서버에 맞추어 수정 필요 )
 - 복사 파일
  : src/app/api 

2. 로그인 액션
 : 로그인, 로그아웃 사용
- 복사 파일
  : src/app/actions/auth-actions.ts 

3. 로드인/로그아웃 페이지 제어
 : middleware.ts 사용
- 복사 파일
  : src/middleware.ts 


- JSON 서버 테스트 사용 (커스텀 서버)
# json-server 설치 (최초 1회)
npm install

# 서버 실행 (POST /login 커스텀 처리 포함)
node mock-server.js

# 그리드 라이브러리 

??? middleware.ts 새로 만들어 달라고 하고 


# 처리 사항
- npm install 에러시 npm install -legacy-peer-deps 
- 프로젝트 생성 : npx create-next-app@latest src 디렉토리 선택

- middleware.ts 추가 : src 디렉토리 아래 존재
 > 로그인, 로그인 페이지 제어

- 라우트 그룹 사용

- globals.css 수정 : 메뉴 타이릍 색깔이 흐리게 보여서


# 참조 사이트 
- 메뉴바   
 https://ui.shadcn.com/docs/components/sidebar
- 참조 샘플  
https://ui.shadcn.com/examples/forms/account

- 그리드  
https://ui.shadcn.com/examples/tasks

- 테마 설정 테스트 사이트
https://gradient.page/tools/shadcn-ui-theme-generator

