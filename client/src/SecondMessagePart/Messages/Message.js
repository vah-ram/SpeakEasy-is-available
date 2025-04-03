import React from 'react'
import TopBar from '../TopBar/TopBar'
import './Message.css';
import MessagePart from '../MessagePart/MessagePart'

function Message({ contact,currentUser,socket,pageMode }) {

  return (
    <section className='mainSectionMessage'>
        <TopBar contact={contact} pageMode={pageMode}/>
        <MessagePart currentUser={currentUser}
                     contact={contact}
                     socket={socket}
                     pageMode={pageMode}/>
    </section>
  ) 
}

export default Message