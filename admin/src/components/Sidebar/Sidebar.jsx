import React from 'react'
import pupLogo from '../../assets/pupbc.png'
import {FaCentos} from 'react-icons/fa'
import {IoIosLogOut, IoMdAddCircleOutline} from 'react-icons/io'
import {MdFormatListBulletedAdd, MdAddShoppingCart} from 'react-icons/md'
import {NavLink} from 'react-router-dom'
import './Sidebar.css'

const Sidebar = ({setToken}) => {
  
  return (
    <div className='sidebar-container'>
      <div className="sidebar-header">
      <img src={pupLogo} alt="PUP Logo" className='side-logo' />
        <h2>
            <span className="highlight">ISKO</span>L-Supplies
        </h2>
      </div>
      <div className="sidebar-links">
        <NavLink className='sidebar-link' to="/add">
          <IoMdAddCircleOutline className='sidebar-icon' />
          <p className="sidebar-text">Add Product</p>
        </NavLink>
        <NavLink className='sidebar-link' to="/list">
          <MdFormatListBulletedAdd className='sidebar-icon' />
          <p className="sidebar-text">List Products</p>
        </NavLink>
        <NavLink className='sidebar-link' to="/orders">
          <MdAddShoppingCart className='sidebar-icon' />
          <p className="sidebar-text">Orders</p>
        </NavLink>
        <button onClick={()=> setToken("")} className="sidebar-link">
          <IoIosLogOut className='sidebar-icon' />
          <p className="sidebar-text">Logout</p>
        </button>

      </div>
      
    </div>
  )
}

export default Sidebar
