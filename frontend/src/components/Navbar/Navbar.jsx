import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {BiUser, BiCart} from 'react-icons/bi'
import {FaCentos} from 'react-icons/fa'
import './Navbar.css'

const Navbar = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },2000)
    navigate(path)
  }

  return (
    <div>
      {
        loading && (
          <div className="loader-container">
            <div className="loader"><FaCentos className='loader-icon'/></div>
          </div>
        )
      }
      <nav className="navbar">
        <div className="nav-top">
          <Link to='/'>
            <h2>
              <span className="highlight">ISKO</span>L-Supplies
            </h2>
          </Link>
          <div className="search-bar">
            <input type="text" className='search-input' placeholder='Search for products....' />
            <button className="search-btn">Search</button>
          </div>
          <div className="icons">
            <div className="profile-group">
              <BiUser className='icon'/>
              <div className="dropdown-menu">
                <Link to='/login'>
                  <p className="dropdown-item">Account</p>
                </Link>
                  <p className="dropdown-item">Logout</p>
              </div>
            </div>
            <div className="cart-icon" onClick={()=>handleNavigation("/cart")}>
              <BiCart className='icon'/>
              <span className="cart-count">0</span>
            </div>
          </div>
        </div>
        <div className="nav-bottom">
          <div className="nav-container">
            <div onClick={()=>handleNavigation("/category/Paper")} className="navbar-link">Paper</div>
            <div onClick={()=>handleNavigation("/category/WritingMaterials")} className="navbar-link">Writing Materials</div>
            <div onClick={()=>handleNavigation("/category/ArtsandCrafts")} className="navbar-link">Arts and Crafts</div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar


