import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat';

const socket = io.connect("http://localhost:3001");



function App() {

  const [login,setLogin] = useState(null)
  const [room,setRoom] = useState(null)
  const joinRoom = () => {
    if (login && room){
      socket.emit("join_room", room);
    }
  }
  return (
    <div className="App">
      <h4>Join!</h4>
      <input type="text" placeholder='Login' onChange={(e) => setLogin(e.target.value)}/>
      <input type="text" placeholder='Room id' onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join!</button>
      <Chat socket={socket} login={login} room={room}/>
    </div>
  );
}

export default App;
