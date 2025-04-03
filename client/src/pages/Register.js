import React, { useState,useEffect } from 'react'
import '../css/register.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast,Toaster } from 'sonner'
import { registerHost } from './utils/apiRoute'

function Register() {
    const navigate = useNavigate();

    const [ show,setShow ] = useState(false)
    const [ showCorrect,setShowCorrect ] = useState(false)
    const [ username,setUsername ] = useState('')
    const [ email,setEmail ] = useState('')
    const [ password,setPassword ] = useState('')
    const [ correctPassword,setCorrectPassword ] = useState('')

        useEffect(() => {
            if(localStorage.getItem('chat-user-Item')) {
                navigate('/')
            }
        },[])

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 800,
        theme: 'light',
        ontouchmove: true,
        draggable: true
    };

    const handleSubmit = async(evt) => {
        evt.preventDefault();
        if(handleValidaton()) {
            const {data} = await axios.post( registerHost,
                {
                    username,
                    email,
                    password
                }
            );

            if(data.status === false) {
                toast.error(data.msg,
                    toastOptions);
            }
            if(data.status === true) {
                toast.success(data.msg,
                    toastOptions);
                    localStorage.setItem('chat-user-Item', JSON.stringify(data.user))
                    navigate('/api/loading')
            }
        };
    };

    const handleValidaton = () => {
        
        if (password !== correctPassword) {
            toast.error('Your password and correct password!',
                toastOptions);
            return false;
        }
        else if (username.length < 3) {
            toast.error('Your username will be must 3 characters!',
                toastOptions)
            return false;
        } else if (email.length < 11) {
            toast.error('Please write your real email!',
                toastOptions)
            return false;
        } else if (password.length < 8) {
            toast.error('Your password will be must 8 characters!',
                toastOptions)
            return false;
        }
        return true
    }

    
        useEffect(() => {
            if (show) {
                document.querySelector('#passInput').setAttribute('type','text');
            } else {
                document.querySelector('#passInput').setAttribute('type','password')
            }
        },[show]);
        useEffect(() => {
            if (showCorrect) {
                document.querySelector('#passCorrectInput').setAttribute('type','text');
            } else {
                document.querySelector('#passCorrectInput').setAttribute('type','password')
            }
        }, [showCorrect])

  return (
    <>
        <div className='allDiv'>
            <form className='formInput' onSubmit={handleSubmit}>
                <div className='titleInput'>
                    <img src='./messageIcons/chat-icon.webp'/>
                        <h1>Register</h1>
                </div>

                <input
                    type='text'
                    placeholder='Write username...'
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Write email...'
                    onChange={e => setEmail(e.target.value)}
                />
                <div className='passwordInput'>
                    <input
                        type='password'
                        placeholder='Write password...'
                        onChange={e => setPassword(e.target.value)}
                        id="passInput"
                    />
                    <div id='eyeDiv' 
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={(() => setShow(false))}>
                        <img src={show ? './messageIcons/hide.png' : './messageIcons/eye.png'}/>
                    </div>
                </div>
                <div className='passwordInput'>
                    <input
                        type='password'
                        placeholder='Write password...'
                        onChange={e => setCorrectPassword(e.target.value)}
                        id="passCorrectInput"
                    />
                    <div id='eyeDiv' 
                        onMouseEnter={() => setShowCorrect(true)}
                        onMouseLeave={(() => setShowCorrect(false))}>
                        <img src={showCorrect ? './messageIcons/hide.png' : './messageIcons/eye.png'}/>
                    </div>
                </div>

                <button
                 className='inputBtn'
                 type='submit'
                 onSubmit={handleSubmit}>
                    Register
                </button>

                <p className='bottomLink'>
                    Already have an account.
                     <Link
                     to='/login'
                     className='link'
                     >Login</Link>
                </p>
            </form>
            </div>

        <Toaster richColors/>
    </>
  )
}

export default Register