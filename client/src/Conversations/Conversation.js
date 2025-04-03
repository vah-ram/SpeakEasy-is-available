import React,{ useState,useEffect } from 'react'
import './Conversation.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getUsers } from '../pages/utils/apiRoute'
import Search from './ConvertUsers/Search'
import ConvertUsers from './ConvertUsers/ConvertUsers'

function Conversation({ currentUser,changeChat,changeModePage }) {
  const navigate = useNavigate();
  
  const [ username,setUsername ] = useState('');
  const [ searchValue,setSearchValue ] = useState('');
  const [ contacts,setContacts ] = useState([]);
  const [ inputActivate,setInputActivate ] = useState(false)
  const [ users,setUsers ] = useState([]);
  const [ selected,setSelected ] = useState('')
  const [ pageMode,setPageMode ] = useState(false);
  
  const handleCheck = (index,contact) => {
          setSelected(index);
          changeChat(contact)
        }

  useEffect(() => {
    if(currentUser) {
      setUsername(currentUser.username.charAt(0).toUpperCase() + currentUser.username.slice(1))
    }
  });

  useEffect(() => {
    if(localStorage.getItem('loaded')) {
      navigate('/')
    } else {
      navigate('/login')
    }
  }, []);
  
  useEffect(() => {
    const menuBtn = document.querySelector('#menuBurgerDiv');
    const menuBar = document.querySelector('#sectionMenu');
    const inputSearch = document.querySelector('#inputSearch');
    const mainSection = document.querySelector('#mainSection');
    const body = document.querySelector('body');
    
    menuBtn.addEventListener('click', () => {
      body.classList.add('activeSection')
    });

    inputSearch.addEventListener('click', () => {
      setInputActivate(true)
    }); 

    document.addEventListener('click', (event) => {
      if (!menuBar.contains(event.target) && !menuBtn.contains(event.target)) {
        body.classList.remove('activeSection')
      }
      if(!inputSearch.contains(event.target) && !mainSection.contains(event.target)) {
        setInputActivate(false)
        setSearchValue('');
        setContacts([]);
      }
    })
  },[]);

  const sendSearch = async(value) => {

    if (value === '') {
      setContacts([]);
      return;
    }

    try {
      if(searchValue !== '') {
      const users = await axios.get(`${getUsers}?username=${value}`);
        setContacts((prevs) => {
          const prevItems = prevs.map(contact => contact.username.toLowerCase());
          const newItems = users.data.filter((user) => {
            if(user.username.toLowerCase() !== currentUser.username.toLowerCase()) {
              return !prevItems.includes(user.username.toLowerCase())
            }
          })

          return [...prevs,...newItems]
        });
      }
    } catch(err) {
      console.log(err)
    };
};

const changeSend = (evt) => {
  const value = evt.target.value
  setSearchValue(value);
  sendSearch(value)
}

const addUsers = (user) => {
  setUsers((prevs) => {
    const isExist = prevs.some(prev => prev.username.toLowerCase() === user.username.toLowerCase());

    const itsMe = user.username.toLowerCase() === currentUser.username.toLowerCase();

    if(!isExist && !itsMe) {
      return [...prevs,user];
    } else {
      return [...prevs];
    }
  });
  setInputActivate(false)
}

const logOut = (evt) => {
  evt.preventDefault();
  navigate('/logout')
}

const changeActivate = (value) => {
  setInputActivate(value)
}

const changeMode = () => {
  setPageMode(!pageMode);
  changeModePage(pageMode)
}

useEffect(() => {
  pageMode ? document.querySelector('body').classList.add('dark-mode') : document.querySelector('body').classList.remove('dark-mode')
},[pageMode]);

  return (
    <section className='mainConversationSection' id="mainSection">
        <section className='FirstSection'>
          <section className='sectionMenu' id='sectionMenu'>
              <button className='logoutBtn' onClick={logOut}>
                <img src='./messageIcons/logout.png'/>
              </button>
            <div className='userInfoDiv'>
              <img src='./messageIcons/user-icon.jpg'/>
              <h2>{ username }</h2>
            </div>
            <span className='menuSectionItem'>
              <div onClick={changeMode}>
                <div>
                  <img src={`${pageMode ? './messageIcons/sun.png' : './messageIcons/moon.png'}`} loading='lazy'/>
                </div>
                <h2>{pageMode ? 'Light mode' : 'Dark mode'}</h2>
              </div>
            </span>
          </section>
          <section className='sectionItems'>
            <div className={`TopMenuAndSearchUsers  ${inputActivate ? 'hideBars' : ''}`}>
              <div className='menuBurgerDiv' id='menuBurgerDiv'>
                    <span/>
                    <span/>
                    <span/>
                </div>
                
              <form className='SearchUsers' onSubmit={e => e.preventDefault()}>
                <input 
                placeholder="Search..." 
                className='SearchUsersInput'
                value={searchValue}
                onChange={changeSend}
                id='inputSearch'/>

              </form>
            </div>
          
              {
              inputActivate ? 
              <Search contacts={contacts}
                      changeChat={changeChat}
                      addUsers={addUsers}
                      changeActivate={changeActivate}/>
              :
                <section className="userItemsSection">
                  {   
                    users.map((contact,index) => {

                            return (
                              <ConvertUsers username={
                                contact.username
                              } 
                              handleCheck={handleCheck}
                              select={selected}
                              index={index}
                              contact={contact}
                              key={index}
                              />
                            )
                          })
                    }
                </section>
              }
          </section>
        </section>
    </section>
  )
}

export default Conversation