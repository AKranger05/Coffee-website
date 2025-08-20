import React, { useState, useEffect } from 'react'
import { Coffee, ShoppingCart, Package, Truck, User } from 'lucide-react'

const Header = () => {
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

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <a href="#" className="logo">
          <Coffee size={32} className="logo-icon" />
          <span>BrewCraft</span>
        </a>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home" className="nav-link">
            <span>Home</span>
          </a>
          <a href="#cart" className="nav-link">
            <ShoppingCart size={18} />
            <span>Cart</span>
          </a>
          <a href="#checkout" className="nav-link">
            <Package size={18} />
            <span>Checkout</span>
          </a>
          <a href="#tracking" className="nav-link">
            <Truck size={18} />
            <span>Track Order</span>
          </a>
          <a href="#signin" className="nav-link">
            <User size={18} />
            <span>Sign In</span>
          </a>
        </nav>
        
        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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