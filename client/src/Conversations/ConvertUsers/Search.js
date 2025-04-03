import React,{ useState } from 'react'
import '../../css/search.css'
import ConvertUsers from './ConvertUsers'

function Search({ contacts,changeChat,addUsers,changeActivate }) {
  const [ selected,setSelected ] = useState('')

    const handleCheck = (index,contact) => {
        setSelected(index);
        changeChat(contact)
        addUsers(contact);
      }

  return (
      <section className='searchSection' id='searchSection'>
        <button id='left-arrow-btn' className='leftBtn'
        onClick={() => changeActivate(false)}>
          <img src='./messageIcons/left-arrow.png'/>
        </button>

        <span className='resultsSpan'>Search results...</span>
        <div className='conversesDiv'>
        {   
            contacts.map((contact,index) => {

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
        </div>
    </section>
  )
}

export default Search