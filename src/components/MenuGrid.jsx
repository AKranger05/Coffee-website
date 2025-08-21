import React, { useState, useEffect } from 'react'

const MenuGrid = () => {
  const [visibleCards, setVisibleCards] = useState([])

  const coffeeItems = [
    { 
      id: 1, 
      name: "Classic Espresso", 
      description: "Rich, bold, and intense. Our signature espresso shot with notes of dark chocolate and caramel that awakens your senses.", 
      price: "₹250", 
      emoji: "☕"
    },
    { 
      id: 2, 
      name: "Smooth Americano", 
      description: "A perfect balance of strength and smoothness. Espresso with hot water for all-day sipping pleasure.", 
      price: "₹350", 
      emoji: "☕"
    },
    { 
      id: 3, 
      name: "Creamy Latte", 
      description: "Silky steamed milk meets our premium espresso for a luxurious coffee experience that melts in your mouth.", 
      price: "₹500", 
      emoji: "🥛"
    },
    { 
      id: 4, 
      name: "Frothy Cappuccino", 
      description: "Traditional Italian cappuccino with the perfect foam-to-coffee ratio and rich, authentic flavor.", 
      price: "₹450", 
      emoji: "☕"
    },
    { 
      id: 5, 
      name: "Decadent Mocha", 
      description: "Rich chocolate syrup meets premium coffee in this indulgent sweet treat that satisfies every craving.", 
      price: "₹500", 
      emoji: "🍫"
    },
    { 
      id: 6, 
      name: "Elegant Macchiato", 
      description: "Espresso marked with a dollop of foamed milk. Simple perfection in every carefully crafted sip.", 
      price: "₹450", 
      emoji: "⭐"
    },
    { 
      id: 7, 
      name: "Cold Brew", 
      description: "Smooth, refreshing, and naturally sweet. Perfect iced coffee for hot summer days and chill moments.", 
      price: "₹350", 
      emoji: "🧊"
    },
    { 
      id: 8, 
      name: "Iced Frappé", 
      description: "Blended iced coffee with whipped cream and rich flavor. A cool refreshing treat for any time of day.", 
      price: "₹550", 
      emoji: "🥤"
    },
    { 
      id: 9, 
      name: "Flat White", 
      description: "Smooth microfoam and double shot espresso. A modern coffee classic from down under with perfect balance.", 
      price: "₹450", 
      emoji: "☕"
    }
  ]

  // Animation effect for cards appearing
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCards(prev => {
        if (prev.length < coffeeItems.length) {
          return [...prev, prev.length]
        }
        clearInterval(timer)
        return prev
      })
    }, 150) // Stagger animation by 150ms

    return () => clearInterval(timer)
  }, [])

  const handleCardClick = (coffeeName) => {
    alert(`${coffeeName} individual page will be added later! You clicked on the coffee card.`)
  }

  const handleLearnMore = (e, coffeeName) => {
    e.stopPropagation() // Prevent card click
    alert(`Learn More about ${coffeeName}! Individual coffee pages will be added later.`)
  }

  const handleOrderNow = (e, coffeeName, price) => {
    e.stopPropagation() // Prevent card click
    alert(`${coffeeName} added to cart! Price: ${price}`)
  }

  return (
    <section className="menu-section" id="menu">
      <h2 className="section-title fade-in-up">Our Coffee Collection</h2>
      <p className="section-subtitle fade-in-up" style={{animationDelay: '0.2s'}}>
        Expertly crafted coffee drinks, made fresh daily with premium ingredients 
        sourced from the world's finest coffee growing regions
      </p>
      
      <div className="menu-grid">
        {coffeeItems.map((item, index) => (
          <div 
            key={item.id} 
            className={`coffee-card ${visibleCards.includes(index) ? 'slide-in-bottom' : ''}`}
            style={{
              opacity: visibleCards.includes(index) ? 1 : 0,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => handleCardClick(item.name)}
          >
            <div className="coffee-image">
              <span className="coffee-emoji">{item.emoji}</span>
            </div>
            <div className="coffee-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>
            <div className="card-buttons">
              <button 
                className="learn-more-btn" 
                onClick={(e) => handleLearnMore(e, item.name)}
              >
                <span>Learn More</span>
              </button>
              <button 
                className="order-now-btn" 
                onClick={(e) => handleOrderNow(e, item.name, item.price)}
              >
                <span>Order Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuGrid