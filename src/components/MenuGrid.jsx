import React, { useEffect, useRef, useState } from 'react'

const MenuGrid = () => {
  const [isVisible, setIsVisible] = useState(false)
  const menuRef = useRef(null)

  const coffeeItems = [
    { 
      id: 1, 
      name: "Classic Espresso", 
      description: "Rich, bold, and intense. Our signature espresso shot with notes of dark chocolate and caramel.", 
      price: "₹250", 
      emoji: "☕"
    },
    { 
      id: 2, 
      name: "Smooth Americano", 
      description: "A perfect balance of strength and smoothness. Espresso with hot water for all-day sipping.", 
      price: "₹350", 
      emoji: "☕"
    },
    { 
      id: 3, 
      name: "Creamy Latte", 
      description: "Silky steamed milk meets our premium espresso for a luxurious coffee experience.", 
      price: "₹500", 
      emoji: "🥛"
    },
    { 
      id: 4, 
      name: "Frothy Cappuccino", 
      description: "Traditional Italian cappuccino with the perfect foam-to-coffee ratio and rich flavor.", 
      price: "₹450", 
      emoji: "☕"
    },
    { 
      id: 5, 
      name: "Decadent Mocha", 
      description: "Rich chocolate syrup meets premium coffee in this indulgent sweet treat.", 
      price: "₹500", 
      emoji: "🍫"
    },
    { 
      id: 6, 
      name: "Elegant Macchiato", 
      description: "Espresso marked with a dollop of foamed milk. Simple perfection in every sip.", 
      price: "₹450", 
      emoji: "⭐"
    },
    { 
      id: 7, 
      name: "Cold Brew", 
      description: "Smooth, refreshing, and naturally sweet. Perfect iced coffee for hot summer days.", 
      price: "₹350", 
      emoji: "🧊"
    },
    { 
      id: 8, 
      name: "Iced Frappé", 
      description: "Blended iced coffee with whipped cream and rich flavor. A cool refreshing treat.", 
      price: "₹550", 
      emoji: "🥤"
    },
    { 
      id: 9, 
      name: "Flat White", 
      description: "Smooth microfoam and double shot espresso. A modern coffee classic from down under.", 
      price: "₹450", 
      emoji: "☕"
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (menuRef.current) {
      observer.observe(menuRef.current)
    }

    return () => {
      if (menuRef.current) {
        observer.unobserve(menuRef.current)
      }
    }
  }, [])

  const handleLearnMore = (coffeeName) => {
    alert(`Learn More about ${coffeeName}! Individual coffee pages will be added later.`)
  }

  const handleOrderNow = (coffeeName, price) => {
    alert(`${coffeeName} added to cart! Price: ${price}`)
  }

  return (
    <section 
      ref={menuRef} 
      className="menu-section"
      id="menu"
    >
      <h2 className="section-title">Our Coffee Collection</h2>
      <p className="section-subtitle">Expertly crafted coffee drinks, made fresh daily with premium ingredients</p>
      
      <div className="menu-grid">
        {coffeeItems.map((item, index) => (
          <div 
            key={item.id} 
            className="coffee-card"
            style={{ 
              animationDelay: isVisible ? `${index * 0.1}s` : '0s',
              animation: isVisible ? 'fadeIn 0.8s ease-out forwards' : 'none',
              opacity: isVisible ? 1 : 0
            }}
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
                onClick={() => handleLearnMore(item.name)}
              >
                Learn More
              </button>
              <button 
                className="order-now-btn" 
                onClick={() => handleOrderNow(item.name, item.price)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuGrid