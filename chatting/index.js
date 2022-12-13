const path = require("path");
const http = require("http");

const moment = require("moment");

const socketIO = require("socket.io");
const express = require("express");
const app = express(); //express는 웹서버 만들때 쓴다.
const socketServer = http.createServer(app);
const io = socketIO(socketServer);

app.set("port", process.env.PORT || 8081);

app.use(express.static(path.join(__dirname, "/public")));
const PORT = app.get("port");

//client 접속 대기중

//console.log(moment(new Date()).format("A hh:mm"));
io.on("connection", (socket) => {
  console.log("클라이언트 연결 되었습니다.");
  //접속이 되면 data를 socket으로 받을 수 있다.
  socket.on("yaho", (clientData) => {
    //console.log(clientData.name, "===", clientData.msg);
    io.emit("serverYaho", { name: clientData.name, msg: clientData.msg, time: moment(new Date()).format("A hh:mm") });
  });
  socket.on("enter", (clientData) => {
    const { name } = clientData;
    //객체를 분해해서 할당할려면 이렇게 하면 된다.(구조분해할당)
    io.emit("enterName", { name: name });
  });
});

app.get("/chatting", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/html/chatting.html"));
});

app.get("/", (req, res) => {
  res.send("Hello Express");
});

socketServer.listen(PORT, () => {
  console.log(`${PORT}에서 서버 대기중`);
});
