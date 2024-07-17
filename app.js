const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");

const server = http.createServer(app)
const io = socketIo(server);

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

io.on("connection", function(socket){
    console.log("Connected to ws");
    socket.on("message", function(data){
        io.emit("message", data)
    })
})

app.get("/", (req, res) => {
    res.render("index")
})

server.listen(3000);