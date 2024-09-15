import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.Artlog01} alt=""/>
                <p>Follow us on Instagram, Facebook, and Twitter.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
                </div>

            </div>
            <div className="footer-content-center">
                <h2>Company</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
                
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@artgallery.com</li>
                </ul>


            </div>
            
        </div>
        <hr/>
        <p className='footer-copyright'>© 2024 ArtGallery. All rights reserved. </p>

      
    </div>
  )
}

export default Footer
