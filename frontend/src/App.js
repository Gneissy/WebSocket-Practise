import React from "react"
import { useState, useEffect } from "react";

// Connection to socket
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001");

function App() {


  const [message, setMessage] = useState("");
  const [messagesReceived, setMessagesReceived] = useState([]);
  const handleInputChange = function(event){ setMessage(event.target.value); }


  const sendMessage = function(){
    // It is like an api call to the socket
    socket.emit("SEND_MESSAGE", {message: message})
  }

  // console.log(message);

  useEffect(function(){
    socket.on("RECEIVE_MESSAGE", function(data){
      setMessagesReceived([...messagesReceived, data]);
    })
  }, [socket]);

  // To display data taken from socket
  const allMessages = messagesReceived.map((msg)=> <h2>{msg.message}</h2>)

  console.log(messagesReceived);
  return (
    <div className="App">
      <input placeholder = "message" onChange = {handleInputChange} value = {message} />
      <button onClick = {sendMessage} > Send </button>
      {allMessages}
      
    </div>
  );
}

export default App;
