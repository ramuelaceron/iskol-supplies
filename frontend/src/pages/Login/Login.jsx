import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { ShopContext } from '../../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../../App'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate()

  const [currentState, setCurrentState] = useState('Login')

  const {token, setToken} = useContext(ShopContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async(event)=> {
    event.preventDefault();

    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          toast.success(response.data.message)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(response.data.success){
          setToken(response.data.token)
          toast.success(response.data.message)
          localStorage.setItem('token', response.data.token)
        }
        else{
          toast.error(response.data.message)
        }
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=> {
    if(token){
      navigate("/")
    }
  }, [token])

  

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="auth-form">
        <div className="form-header">
          <p className="form-title">{currentState}</p>
        </div>
        {
          currentState === 'Login' ? null : (
            <input onChange={(e)=> setName(e.target.value)} value={name} type="text" className='form-input' placeholder='Name' required />
          )
        }
        <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className='form-input' placeholder='Email' required />
        <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className='form-input' placeholder='Password' required />
        <div className="form_footer">
          <p className="forgot-pswd">Forgot password</p>
          {
            currentState === 'Login' ? (
              <p className='toggle-auth-state' onClick={() => setCurrentState('Sign Up')}>Create Account</p>
            ) : (
              <p className='toggle-auth-state' onClick={() => setCurrentState('Login')}>Login Here</p>
            )
          }
        </div>
        <button className="form-button">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <hr className='footer-divider'/>
    </div>
  )
}

export default Login
