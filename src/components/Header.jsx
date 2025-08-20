import React, { useState } from 'react'
import { Coffee, ShoppingCart, Package, Truck, User } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Coffee size={32} color="#6A0DAD" />
          <span>Brew Haven</span>
        </div>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">
            <ShoppingCart size={18} color="#6A0DAD" />
            <span>Cart</span>
          </a>
          <a href="#" className="nav-link">
            <Package size={18} color="#6A0DAD" />
            <span>Checkout</span>
          </a>
          <a href="#" className="nav-link">
            <Truck size={18} color="#6A0DAD" />
            <span>Track Order</span>
          </a>
          <a href="#" className="nav-link">
            <User size={18} color="#6A0DAD" />
            <span>Sign In</span>
          </a>
        </nav>
        
        <button 
          className="menu-toggle"
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