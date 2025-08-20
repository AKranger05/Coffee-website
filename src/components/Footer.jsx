import React, { useEffect, useRef, useState } from 'react'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current)
      }
    }
  }, [])

  return (
    <footer className={`footer ${isVisible ? 'visible' : ''}`} ref={footerRef}>
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
        <p>&copy; 2023 BrewCraft Coffee. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer