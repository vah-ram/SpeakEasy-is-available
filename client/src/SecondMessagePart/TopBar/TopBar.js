import React, { useState,useEffect } from 'react'
import './TopBar.css'

function TopBar({ contact,pageMode }) {

  const goBack = () => {
    document.querySelector('body').classList.remove('messageActive')
  }
 
  return (
    <>
        <header className='mainHeader'>
          <span className='userPartSpan'>
            <button id='toBackBtn'
                    onClick={goBack}>
              <img src='./messageIcons/left-arrow.png'/>
            </button>
            <img 
            className='userImg'
            src="./messageIcons/user-icon.jpg"/>

            <div className='textDiv'>
              <h2 className='userNameText'>
                {contact.username}
              </h2>

              <p className='onlineUser'>
                Online
              </p> 
            </div>
          </span>

          <span className='rightIconsSpan'>
            <img src={`${pageMode ? './topIcon/dark/call.png' : './topIcon/light/call.png'}`}/>
            <img src={`${pageMode ? './topIcon/dark/video.png' : './topIcon/light/video.png'}`}/>
            <img src={`${pageMode ? './topIcon/dark/save.png' : './topIcon/light/save.png'}`}/>
            <img src={`${pageMode ? './topIcon/dark/dots.png' : './topIcon/light/dots.png'}`}/>
            <img src={`${pageMode ? './topIcon/dark/setting.png' : './topIcon/light/setting.png'}`}/>
          </span>
        </header>
    </>
  )
}

export default TopBar;