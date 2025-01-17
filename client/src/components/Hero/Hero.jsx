import React from 'react'
import hero_img from '../../assets/pupbc.png'
import { MdAccessTime } from 'react-icons/md'
import { MdStore  } from 'react-icons/md'
import {MdPayment} from 'react-icons/md'
import {MdBlock} from 'react-icons/md'
import './Hero.css'

const Hero = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero_top">
            <div className="hero_left">
                <h2>Make Your School Life Easier.</h2>
                <h1>'Cause We Had What You're Looking For</h1>
                <p>Shop and get all of fresh school supplies ready for a new school year!</p>
            </div>
            <div className="hero_right">
                <img src={hero_img} alt="" />
            </div>
        </div>
        <div className="hero_bottom">
            <div className="hero_content">
                <div className="info_icon"><MdAccessTime className='hero_icon' /></div>
                <div className="detail">
                    <h3>24/7 Online</h3>
                    <p>Website is 24/7 available</p>
                </div>
            </div>
            <div className="hero_content">
                <div className="info_icon"><MdBlock className='hero_icon' /></div>
                <div className="detail">
                    <h3>No Delivery Service</h3>
                    <p>Services are limited in PUPBC only</p>
                </div>
            </div>
            <div className="hero_content">
                <div className="info_icon"><MdStore className='hero_icon' /></div>
                <div className="detail">
                    <h3>Branch Support</h3>
                    <p>Full face-to-face support process</p>
                </div>
            </div>
            <div className="hero_content">
                <div className="info_icon"><MdPayment className='hero_icon' /></div>
                <div className="detail">
                    <h3>Secure Payment</h3>
                    <p>Your payment is secure</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
