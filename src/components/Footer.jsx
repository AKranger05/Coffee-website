import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li><a href="#">Learn about the team</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>For Business Partners</h3>
          <ul>
            <li><a href="#">Dashboard</a></li>
            <li><a href="#">Menu management</a></li>
            <li><a href="#">Order management</a></li>
            <li><a href="#">Analytics</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 Brew Haven Coffee. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer