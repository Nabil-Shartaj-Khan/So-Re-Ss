import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';


function App() {
  const [msg, setMsg] = useState(""); // Using useState hook to manage 'msg' state

  useEffect(() => {
    // connecting socket from backend when this component loads
    const socket = io.connect('/');
    socket.on('msg', (data) => {
      setMsg(data); // Update 'msg' state with received data
    });
    
    // Clean-up logic when the component unmounts
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <div>
      <h1>Hello from React</h1>
      <p className='text-primary'>See the message in 5 seconds: {msg}</p> 
    </div>
  );
}

export default App;
