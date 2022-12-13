//console.log("hello node");

const http = require("http");
//require는 필요한 모듈을 들고온다. (npm 사용하는 건 내가 필요한걸 가져와서 꾸미는 것..)
//createServer서버 만드는.. (서버는 요청 받으면 응답하는 것!)
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  if (req.url === "/") {
    res.write("<h1>안녕하세요</h1>");
    res.write("<a href='/about'>about</a><a href='/portfolio'>portfolio</a>");

    res.end();
  } else if (req.url === "/about") {
    res.write("<h1>여기는 about 페이지 입니다</h1>");
    res.write("<a href='/about'>about</a><a href='/portfolio'>portfolio</a>");
    res.end();
  } else if (req.url === "/portfolio") {
    res.write("<h1>여기는 portfolio 페이지 입니다</h1>");
    res.write("<a href='/about'>about</a><a href='/portfolio'>portfolio</a>");
    res.end();
  }
});

server.listen(8080);
server.on("listening", () => {
  console.log("서버가 8080에서 대기 중입니다");
});
