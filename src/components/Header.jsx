import React, { useState, useEffect } from 'react'
import { Coffee, ShoppingCart, Package, Truck, User } from 'lucide-react'

const Header = ({ onSignInClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (href === '#signin') {
      onSignInClick?.(e)
    } else {
      const pageName = href.replace('#', '')
      alert(`${pageName.charAt(0).toUpperCase() + page.slice(1)} page will be added soon!`)
    }
    
    setIsMenuOpen(false)
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          <Coffee size={36} className="logo-icon" />
          <span>BREW CRAFT</span>
        </a>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a 
            href="#home" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, '#home')}
          >
            <span>Home</span>
          </a>
          <a 
            href="#cart" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, '#cart')}
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
          </a>
          <a 
            href="#checkout" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, '#checkout')}
          >
            <Package size={20} />
            <span>Checkout</span>
          </a>
          <a 
            href="#tracking" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, '#tracking')}
          >
            <Truck size={20} />
            <span>Track Order</span>
          </a>
          <a 
            href="#signin" 
            className="nav-link"
            onClick={(e) => handleNavClick(e, '#signin')}
          >
            <User size={20} />
            <span>Sign In</span>
          </a>
        </nav>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header