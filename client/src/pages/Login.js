import React, { useEffect, useState } from 'react'
import '../css/register.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast,Toaster } from 'sonner'
import { loginHost } from './utils/apiRoute'

function Login() {
    const navigate = useNavigate();

    const [ show,setShow ] = useState(false)
    const [ username,setUsername ] = useState('')
    const [ password,setPassword ] = useState('')

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
            const {data} = await axios.post( loginHost,
                {
                    username,
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
        
        if (username === '') {
            toast.error('Please write your username!',
                toastOptions)
            return false;
        }else if (password === '') {
            toast.error('Please write your password!',
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

  return (
    <>
        <div className='allDiv'>
            <form className='formInput loginform' onSubmit={handleSubmit}>
                <div className='titleInput'>
                    <img src='./messageIcons/chat-icon.webp'/>
                        <h1>Login</h1>
                </div>

                <input
                    type='text'
                    placeholder='Write username...'
                    onChange={e => setUsername(e.target.value)}
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


                <button
                 className='inputBtn'
                 type='submit'
                 onSubmit={handleSubmit}>
                    Login
                </button>

                <p className='bottomLink'>
                    Already have an account.
                     <Link
                     to='/register'
                     className='link'
                     > Register</Link>
                </p>
            </form>
            </div>

        <Toaster richColors/>
    </>
  )
}

export default Login