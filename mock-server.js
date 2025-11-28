// mock-server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// POST /login 요청을 가로채서 db.json의 login 데이터를 반환
server.post('/auth/login', (req, res) => {
    const db = router.db; // db.json 접근
    const loginData = db.get('login').value(); // login 객체 가져오기
    res.json(loginData);
});
server.get('/api/auth/users', (req, res) => {
    const db = router.db; // db.json 접근
    const loginData = db.get('users').value(); // login 객체 가져오기
    res.json(loginData);
});

server.get('/auth/users', (req, res) => {
    const db = router.db; // db.json 접근
    const loginData = db.get('users').value(); // login 객체 가져오기
    res.json(loginData);
});

server.use(router);
server.listen(4000, () => {
    console.log('JSON Server is running on port 4000');
});