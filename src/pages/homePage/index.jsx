import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')
  const navigate = useNavigate()

  const joinRoom = () => {
    console.log('Joining room', roomId, 'as', username);
    navigate(`/editor/${roomId}/${username}`)
  }

  return (
    <div>
      <h1>Home Page</h1>
      <input type="text" placeholder='Room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  )
}

export default HomePage