import React from 'react'
import { ChevronDown } from 'lucide-react'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title fade-in">
          Experience the <span className="text-highlight">Perfect Brew</span>
        </h1>
        <p className="hero-subtitle slide-up">
          Handcrafted coffee made with premium beans from around the world, 
          delivered right to your doorstep.
        </p>
        <button className="cta-button scale-in">
          Explore Our Blends
        </button>
      </div>
      
      <div className="scroll-indicator">
        <span>Scroll to see our collection</span>
        <ChevronDown className="bounce" size={24} color="#6A0DAD" />
      </div>
      
      <div className="hero-bg-pattern"></div>
    </section>
  )
}

export default Hero