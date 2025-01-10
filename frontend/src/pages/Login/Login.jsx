import React, { useState } from 'react'
import './Login.css'

const Login = () => {

  const [currentState, setCurrentState] = useState('Login')
  return (
    <div>
      <form action="" className="auth-form">
        <div className="form-header">
          <p className="form-title">{currentState}</p>
        </div>
        {
          currentState === 'Login' ? null : (
            <input type="text" className='form-input' placeholder='Name' required />
          )
        }
        <input type="email" className='form-input' placeholder='Email' required />
        <input type="password" className='form-input' placeholder='Password' required />
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
