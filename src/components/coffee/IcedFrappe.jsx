import React from 'react'
import { ArrowLeft, Plus, Minus } from 'lucide-react'
import '../../styles/coffee/detail-shared.css'

const IcedFrappe = ({ onBack, onAddToCart, onUpdateQuantity, currentQuantity }) => {
  const item = {
    id: 8,
    name: 'Iced Frappe',
    description: 'A blended coffee drink with ice, milk, and sweetener, topped with whipped cream.',
    price: '₹320',
    emoji: '🥤',
    imageUrl: '/Iced Frappe.png'
  }

  return (
    <div className="coffee-detail-page">
      <div className="coffee-detail-container">
        <div className="coffee-detail-header">
          <button className="back-btn" onClick={onBack}><ArrowLeft size={20} /></button>
          <h1 className="coffee-detail-title">{item.name}</h1>
        </div>
        <div className="coffee-detail-content">
          <div className="coffee-visual">
            <div className="coffee-image-frame">
              <img className="coffee-image-placeholder" src={item.imageUrl} alt={`${item.name} image`} />
            </div>
          </div>
          <div className="coffee-info-card">
            <h2>About this coffee</h2>
            <p>A refreshing blended coffee drink perfect for hot days. Made with premium coffee, ice, milk, and a touch of sweetness, then topped with whipped cream for the ultimate indulgence.</p>
            
            <div className="coffee-details">
              <div className="detail-item">
                <span className="detail-label">Taste Profile:</span>
                <span className="detail-value">Sweet, Creamy, Refreshing</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Temperature:</span>
                <span className="detail-value">Iced</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Caffeine Level:</span>
                <span className="detail-value">Medium</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Best For:</span>
                <span className="detail-value">Hot summer days, Sweet cravings</span>
              </div>
            </div>

            <div className="coffee-actions">
              <div className="quantity-controls">
                <button 
                  className="quantity-btn" 
                  onClick={() => onUpdateQuantity(Math.max(0, currentQuantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-display">{currentQuantity}</span>
                <button 
                  className="quantity-btn" 
                  onClick={() => onUpdateQuantity(currentQuantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => onAddToCart(item)}
              >
                Add to Cart - {item.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IcedFrappe