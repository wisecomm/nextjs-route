// node mock-server.js : 실행 명령어
// mock-server.js
const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

// 1. 여러 JSON 파일 읽기
const dbPath = path.join(__dirname, 'db.json');
//const usersPath = path.join(__dirname, 'users.json'); // 추가할 파일 예시

const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
//const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));

// 2. 데이터 병합 (키가 중복되지 않도록 주의)
const combinedData = {
    ...dbData,
    //...usersData
    // 필요한 만큼 추가 병합
};

// 3. 병합된 객체를 router에 전달
// 주의: 파일 경로 대신 객체를 전달하면, 데이터 변경 시 파일에 자동 저장되지 않습니다.
const router = jsonServer.router(combinedData);

server.use(middlewares);
server.use(jsonServer.bodyParser);

// ... 기존 커스텀 라우트 로직 ...
server.post('/auth/login', (req, res) => {
    const db = router.db;
    const loginData = db.get('login').value();
    res.json(loginData);
});

server.get('/auth/users', (req, res) => {
    const db = router.db;
    const loginData = db.get('users').value();
    res.json(loginData);
});

server.use(router);
server.listen(4000, () => {
    console.log('JSON Server is running on port 4000');
});