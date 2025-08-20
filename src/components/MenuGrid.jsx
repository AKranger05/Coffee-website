import React from 'react'

const MenuGrid = () => {
  const coffeeItems = [
    { id: 1, name: "Espresso", description: "Strong and bold", price: "$3.50", image: "espresso" },
    { id: 2, name: "Cappuccino", description: "Creamy and smooth", price: "$4.25", image: "cappuccino" },
    { id: 3, name: "Latte", description: "Milky and mild", price: "$4.50", image: "latte" },
    { id: 4, name: "Mocha", description: "Chocolatey delight", price: "$5.00", image: "mocha" },
    { id: 5, name: "Americano", description: "Rich and robust", price: "$3.75", image: "americano" },
    { id: 6, name: "Macchiato", description: "Bold with a hint of milk", price: "$4.00", image: "macchiato" },
    { id: 7, name: "Cold Brew", description: "Smooth and refreshing", price: "$4.75", image: "coldbrew" },
    { id: 8, name: "Flat White", description: "Velvety and strong", price: "$4.50", image: "flatwhite" },
    { id: 9, name: "Irish Coffee", description: "With a whiskey kick", price: "$6.50", image: "irish" },
  ]

  return (
    <section className="menu-section">
      <h2 className="section-title">Our Coffee Selection</h2>
      <p className="section-subtitle">Discover your new favorite brew</p>
      
      <div className="menu-grid">
        {coffeeItems.map((item) => (
          <div key={item.id} className="coffee-card">
            <div className="coffee-image">
              <div className={`image-placeholder ${item.image}`}></div>
            </div>
            <div className="coffee-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">{item.price}</span>
            </div>
            <div className="card-buttons">
              <button className="learn-more-btn">Learn More</button>
              <button className="order-now-btn">Order Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default MenuGrid