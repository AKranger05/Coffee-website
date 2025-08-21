import React from 'react'

const Footer = () => {
  const handleLinkClick = (e, pageName) => {
    e.preventDefault()
    alert(`${pageName} page will be added soon!`)
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <ul>
            <li>
              <a 
                href="#learn-team" 
                onClick={(e) => handleLinkClick(e, 'Learn about the team')}
              >
                Learn about the team
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleLinkClick(e, 'Contact us')}
              >
                Contact us
              </a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>For Business Partners</h3>
          <ul>
            <li>
              <a 
                href="#dashboard" 
                onClick={(e) => handleLinkClick(e, 'Business Dashboard')}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#menu-management" 
                onClick={(e) => handleLinkClick(e, 'Menu management')}
              >
                Menu management
              </a>
            </li>
            <li>
              <a 
                href="#order-management" 
                onClick={(e) => handleLinkClick(e, 'Order management')}
              >
                Order management
              </a>
            </li>
            <li>
              <a 
                href="#analytics" 
                onClick={(e) => handleLinkClick(e, 'Analytics')}
              >
                Analytics
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 BREW CRAFT Coffee. All rights reserved. Crafted with ❤️ for coffee lovers worldwide.</p>
      </div>
    </footer>
  )
}

export default Footer