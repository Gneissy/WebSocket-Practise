const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// This is how we create an http server with socketio
const server = http.createServer(app);


// Lets run socketio
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
});

// The thing important for socket io is 
// We either listen for an event,
// or emit an event (spread, send)
//* In my opinion, it's like get and post requests, like get is listen and post is emit.


io.on("connection", function(socket){
    console.log("User is connected with this id: " + socket.id);

    socket.on("SEND_MESSAGE", function(data){
        // console.log(data); // Now instead logging the data, send the message to everyone but myself
        // I'll use "broadcast" to achieve "everyone but myself"
        socket.broadcast.emit("RECEIVE_MESSAGE", data);
    });
});





server.listen(3001, function(){
    console.log("Server is running on 3001");
});

