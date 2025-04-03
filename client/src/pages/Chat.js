import React, { useState,useEffect,useRef } from 'react'
import Conversation from '../Conversations/Conversation.js'
import Message from '../SecondMessagePart/Messages/Message.js'
import '../css/chatStyle.css'
import { useNavigate } from 'react-router-dom'
import Welcome from './Welcome.jsx'
import { io } from 'socket.io-client'
import { host } from './utils/apiRoute.js'

const socket = io.connect(host);

function Chat() {
  const navigate = useNavigate();

  const [ currentUser,setCurrentUser ] = useState('');
  const [ currentChat,setCurrentChat ] = useState('')
  const [ pageMode,setPageMode ] = useState('');

  useEffect(() => {
    const callAsync = async() =>  {
      if(!localStorage.getItem('chat-user-Item')) {
        navigate('/login')
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-user-Item')))
      }
    };
    callAsync();
  }, []);

  useEffect(() => {
    socket.emit('add-user', currentUser._id)
  },[currentUser])

  const changeChat = (contact) => {
    setCurrentChat(contact);
    currentChat ? document.querySelector('body').classList.add('messageActive') : console.log('false')
  }

  const changeMode = (value) => {
    setPageMode(value)
  }

  return (
    <div id='container'>
        <Conversation currentUser={currentUser} 
                      changeChat={changeChat}
                      changeModePage={changeMode}/>
        {currentChat ? <Message contact={currentChat} 
                                currentUser={currentUser}
                                socket={socket}
                                pageMode={pageMode}/> : <Welcome/>}
    </div>
  )
}

export default Chat