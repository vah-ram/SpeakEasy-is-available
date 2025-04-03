import React from 'react'
import './MessageItem.css'

export default function MessageItem({own,text}) {
  return (
    <div className={own ? 'message own' : 'message'}>
        <div className='messageTop'>
            <img
                className='messageImg'
                src="./messageIcons/user-icon.jpg"
            />
            <p className='messageText'>{text}</p>
        </div>
        <div className='messageBottom'>
            1 hour ago
        </div>
    </div>
  )
}
