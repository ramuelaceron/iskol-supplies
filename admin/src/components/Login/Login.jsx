import React from "react";
import './Login.css'

const Login = () => {
  return (
    <div>
      <div className="admin-panel-container">
        <div className="admin-panel-box">
          <h1 className="login-title">Admin Panel</h1>
          <form>
            <div className="form-group">
              <p className="form-label">Email Address</p>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <p className="form-label">Password</p>
              <input
                type="paswword"
                className="form-input"
                placeholder="Enter password"
                required
              />
            </div>
            <button className='form-button' type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
