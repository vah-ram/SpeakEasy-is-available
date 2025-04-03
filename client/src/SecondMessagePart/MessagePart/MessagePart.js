import React, { useRef,useState,useEffect } from 'react'
import './MessagePart.css'
import MessageItem from './MessageItem'
import axios from 'axios'
import { addMessage,getMessage } from './utils/messageHost'


function MessagePart({ currentUser,contact,socket,pageMode }) {
  const MessageScrollRef = useRef(null);
  const [ messages,setMessages ] = useState([]);
  const [ message,setMessage ] = useState('');
  const [ arrivalMessage,setArrivalMessage ] = useState(null);

  const sendMessageSound = document.querySelector('#sendMessageSound');

  const sendMessage = () => {
    if(message !== '') {
      try {
          axios.post(addMessage, {
            from: currentUser._id,
            to: contact._id,
            message: message
          });

          socket.emit('send-message', {
            from: currentUser._id,
            to: contact._id,
            message: message
          });

          const items = [...messages];
          items.push({ fromSelf: true, message: message});
          setMessages(items);

          sendMessageSound.play()
      } catch(err) {
        console.log(err)
      }
    };
    setMessage('')
  };

  useEffect(() => {
    if(socket) {
      socket.on('receive-message', (message) => {
        setArrivalMessage({ fromSelf: false, message: message});
      });
    };
  },[]);

  useEffect(() => {
    if(arrivalMessage) {
      setMessages(prev => [...prev,arrivalMessage]);
    }
  },[arrivalMessage]);

  useEffect(() => {
    const callAsync = async() => {
      try {
        const result = await axios.post(getMessage, {
          sender: currentUser._id,
          receiver: contact._id
        });
        setMessages(result.data.messages)
      } catch(err) {
        console.log(err)
      }
    };
    callAsync();
  },[contact]);

  useEffect(() => {
    MessageScrollRef.current?.scrollIntoView();
  },[messages]);

  return (
        <section className='PartSection'>
          <section className='sectionMessage'>
              {
                messages.map((item) => {
                  return (
                    <MessageItem own={item.fromSelf ? true : false} text={item.message}/>
                  )
                })
              }
            <div ref={MessageScrollRef}/>
          </section>

          <footer className='typeMessageFooter'>
          <img src={`${pageMode ? './messageIcons/dark/dots.png' : './messageIcons/light/dots.png'}`}/>
          <img src={`${pageMode ? './messageIcons/dark/smile.png' : './messageIcons/light/smile.png'}`}/>
  
              <form className='inputForm'
                    onSubmit={e => {
                      e.preventDefault();
                      sendMessage()
                    }}>
                <input 
                  type="text" 
                  placeholder="Type your message..."
                  className='typeInput'
                  value={ message }
                  onChange={e => setMessage(e.target.value)}/>
              </form>

              <img src={`${pageMode ? './messageIcons/dark/microphone.png' : './messageIcons/light/microphone.png'}`}/>
                  <button type='button'
                          onClick={() => sendMessage()}
                          className='sendBtn'>
                      <img src="./messageIcons/send.png"/>
                      <audio src='./sounds/send-message.mp3' 
                             id='sendMessageSound' preload='auto'></audio>
                  </button>
          </footer>
      </section>
  ) 
}

export default MessagePart

