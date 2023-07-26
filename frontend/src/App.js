import React from "react"
import { useState, useEffect } from "react";

// Connection to socket
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001");

function App() {

  // States
  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  const [room, setRoom] = useState("");


  // Event Handlers
  const handleInputChange = function(event){ setMessage(event.target.value); }
  const handleRoomChange = function(event){ setRoom(event.target.value); }


  // Socket related (They are like api calls to socket)
  const sendMessage = function(){
    socket.emit("SEND_MESSAGE", { message, room })
  }
  const joinRoom = function(){
    if (room) socket.emit("JOIN_ROOM", room)
  }


  // useEffects
  useEffect(function(){
    socket.on("RECEIVE_MESSAGE", function(data){
      setMessagesReceived([...messagesReceived, data]);
    })
  }, [socket]);


  //! Here is a bug causing rerender according to the number of sockets, when i set the code below 
  // setMessagesReceived(previousMessagesReceived => [...previousMessagesReceived, data]);


  // To display data taken from socket
  const allMessages = messagesReceived.map((msg)=> <h2>{msg.message}</h2>)


  return (
    <div className="App">
      <input placeholder = "room" onChange = {handleRoomChange} value = {room} />
      <button onClick = {joinRoom} > Join Room </button>

      <input placeholder = "message" onChange = {handleInputChange} value = {message} />
      <button onClick = {sendMessage} > Send Message </button>
      {allMessages}
      
    </div>
  );
}

export default App;
