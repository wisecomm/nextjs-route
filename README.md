# 프로젝트 생성 : npx create-next-app@latest src 디렉토리 선택

# middleware.ts 추가 : src 디렉토리 아래 존재

# 라우트 그룹 사용

# globals.css 수정 : 메뉴 타이릍 색깔이 흐리게 보여서

확인 사항 : 로그인 시 로그아웃 시 레이아웃 잘되는지 확인함
http://localhost:3000/about -- 레이아웃 잘됨
http://localhost:3000/login -- 레이아웃 없음

참조 :
https://www.youtube.com/watch?v=zkGqeF3u-4E -- 메뉴
https://reactnext-central.xyz/blog/nextjs/route-group -- 라우트 그룹

- shadcn 전체 설정,
  npx shadcn@latest add --all
  index.ts 추가 (import 한번에 함)
  : datatable 사용 : 정식 버전 후 확인 필요 (19떄문에 안됨)
  npm install --legacy-peer-deps @tanstack/react-table

- sass 사용해서 ( --froce 붙임)
  npm i sass --froce

#################################################################

# 수정중

#################################################################

- 태이블 페이지 샘플 만들기
  : 유아이 정리
  : 싱글 선택을 디볼트 ( 싱글 선택일떄 되도록 상위 선택 채크박스 없애기 )

??? 다크모드 추가
??? 탭 바 추가 ㅎㅎㅎ
??? tail 추가
??? 차일드 화면들 잘붙는지 확인/Users/ojeong-il/XXX-NEXTJS/nextjs-route/.env.local
