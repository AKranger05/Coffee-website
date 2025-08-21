import React from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = ({ onExploreClick }) => {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title fade-in-up">
          Craft Your Perfect <span>Coffee Moment</span>
        </h1>
        <p className="hero-subtitle fade-in-left" style={{animationDelay: '0.3s'}}>
          Experience premium coffee crafted with passion, delivered with perfection. 
          Every cup tells a story of quality and dedication to the art of coffee making.
        </p>
        <button 
          className="cta-button scale-in" 
          style={{animationDelay: '0.6s'}}
          onClick={onExploreClick}
        >
          Explore Our Blends
        </button>
      </div>
      
      <div 
        className="scroll-indicator" 
        onClick={onExploreClick}
        style={{animationDelay: '0.9s'}}
      >
        <span className="scroll-text fade-in-up">Scroll to discover our blends</span>
        <ChevronDown className="scroll-arrow bounce-animation" size={32} />
      </div>
    </section>
  )
}

export default Hero