import React from 'react';
import './ConvertUsers.css'

function ConvertUsers({ username,handleCheck,select,index,contact }) {
  return (
    <div className={`UserItem ${
        index === select ? 'selected' : ''
    }`}
    onClick={() => handleCheck(index,contact)}>
        <span className='styleSpan'>
            <img src="./messageIcons/user-icon.jpg" className='userImage'/>
            
            <span className='SecondSpan'>
                <h2 className='username'>
                    {username}
                </h2>

                <p className='lastMessage'>
                    Hello, can you help me?
                </p>
            </span>
        </span>
    </div>
  )
}

export default ConvertUsers