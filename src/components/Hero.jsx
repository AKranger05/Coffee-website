import React from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title fade-in">
          Craft Your Perfect <span>Coffee Moment</span>
        </h1>
        <p className="hero-subtitle slide-up">
          Experience premium coffee crafted with passion, delivered with perfection. 
          Every cup tells a story of quality and dedication.
        </p>
        <button className="cta-button scale-in">
          Explore Our Blends
        </button>
      </div>
      
      <div className="scroll-indicator">
        <span className="scroll-text">Discover our collection</span>
        <ChevronDown className="bounce" size={28} />
      </div>
    </section>
  )
}

export default Hero