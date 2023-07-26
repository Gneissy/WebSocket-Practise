const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// This is how we create an http server for socketio
const server = http.createServer(app);

// Lets run socketio as our server
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

//* In my opinion, it's like get and post requests, like get is listen and post is emit.
// on -> for listening an event, and getting data
// emit -> for sending data for a particular event

io.on("connection", function(socket){
    console.log("User is connected with this id: " + socket.id);

    socket.on("JOIN_ROOM", function(data){
        socket.join(data);
    })

    socket.on("SEND_MESSAGE", function(data){
        socket.to(data.room).emit("RECEIVE_MESSAGE", data);
    });
});

server.listen(3001, function(){
    console.log("Server is running on 3001");
});

