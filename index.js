const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`connection`);
  socket.on("send name", (username) => {
    console.log(`received name in js` + username);
    io.emit("send name", username);
    console.log(`sent name in js` + username);
  });

  socket.on("send message", (chat) => {
    console.log(`received message js` + chat);
    io.emit("send message", chat);
    console.log(`sent name in js` + chat);
  });
});

server.listen(port, () => {
  console.log(`Server is listening at the port: ${port}`);
});
