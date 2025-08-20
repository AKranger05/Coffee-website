import { useState, useEffect } from 'react';
import './index.css';

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">BrewCraft</div>
        <ul className="nav-links">
          <li><button onClick={() => scrollToSection('home')}>Home</button></li>
          <li><button onClick={() => scrollToSection('cart')}>Cart</button></li>
          <li><button onClick={() => scrollToSection('checkout')}>Checkout</button></li>
          <li><button onClick={() => scrollToSection('tracking')}>Order Tracking</button></li>
          <li><button onClick={() => window.location.href = '/signin'}>Sign In</button></li>
        </ul>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'Premium Coffee Experience';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1000);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className={showCursor ? 'typing-cursor' : ''}>
          {displayText}
        </h1>
        <p>Discover the finest crafted coffee drinks from around the world, made to perfection</p>
        <button onClick={scrollToMenu} className="cta-button">
          Explore Our Collection
        </button>
      </div>
      <div className="scroll-indicator">
        <p>Scroll to see our collection</p>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

// Coffee Menu Item Component
const CoffeeItem = ({ coffee, onLearnMore, onOrderNow }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`coffee-${coffee.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [coffee.id]);

  return (
    <div 
      id={`coffee-${coffee.id}`}
      className={`menu-item ${isVisible ? 'visible' : ''}`}
      data-coffee={coffee.id}
    >
      <span className="coffee-emoji">{coffee.emoji}</span>
      <h3>{coffee.name}</h3>
      <p>{coffee.description}</p>
      <div className="price">₹{coffee.price}</div>
      <div className="menu-buttons">
        <button 
          className="learn-more-btn" 
          onClick={() => onLearnMore(coffee)}
        >
          Learn More
        </button>
        <button 
          className="order-now-btn" 
          onClick={() => onOrderNow(coffee)}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

// Coffee Menu Section Component
const MenuSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const coffees = [
    {
      id: 'espresso',
      name: 'Classic Espresso',
      emoji: '☕',
      description: 'Rich, bold, and intense. Our signature espresso shot with notes of dark chocolate and caramel.',
      price: 250
    },
    {
      id: 'americano',
      name: 'Smooth Americano',
      emoji: '☕',
      description: 'A perfect balance of strength and smoothness. Espresso with hot water for all-day sipping.',
      price: 350
    },
    {
      id: 'latte',
      name: 'Creamy Latte',
      emoji: '🥛',
      description: 'Silky steamed milk meets our premium espresso for a luxurious coffee experience.',
      price: 500
    },
    {
      id: 'cappuccino',
      name: 'Frothy Cappuccino',
      emoji: '☕',
      description: 'Traditional Italian cappuccino with the perfect foam-to-coffee ratio and rich flavor.',
      price: 450
    },
    {
      id: 'mocha',
      name: 'Decadent Mocha',
      emoji: '🍫',
      description: 'Rich chocolate syrup meets premium coffee in this indulgent sweet treat.',
      price: 500
    },
    {
      id: 'macchiato',
      name: 'Elegant Macchiato',
      emoji: '⭐',
      description: 'Espresso marked with a dollop of foamed milk. Simple perfection in every sip.',
      price: 450
    },
    {
      id: 'coldbrew',
      name: 'Cold Brew',
      emoji: '🧊',
      description: 'Smooth, refreshing, and naturally sweet. Perfect iced coffee for hot summer days.',
      price: 350
    },
    {
      id: 'frappe',
      name: 'Iced Frappé',
      emoji: '🥤',
      description: 'Blended iced coffee with whipped cream and rich flavor. A cool refreshing treat.',
      price: 550
    },
    {
      id: 'flatwhite',
      name: 'Flat White',
      emoji: '☕',
      description: 'Smooth microfoam and double shot espresso. A modern coffee classic from down under.',
      price: 450
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const element = document.getElementById('menu');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleLearnMore = (coffee) => {
    alert(`Learn More about ${coffee.name}! Individual coffee pages will be added later.`);
    console.log(`Learn More clicked for: ${coffee.id}`);
  };

  const handleOrderNow = (coffee) => {
    alert(`${coffee.name} added to cart! Price: ₹${coffee.price}`);
    console.log(`Order Now clicked for: ${coffee.id}`);
  };

  return (
    <section className={`menu-section ${isVisible ? 'visible' : ''}`} id="menu">
      <div className="menu-title">
        <h2>Our Coffee Collection</h2>
        <p>Expertly crafted coffee drinks, made fresh daily with premium ingredients</p>
      </div>
      <div className="menu-grid">
        {coffees.map((coffee, index) => (
          <CoffeeItem
            key={coffee.id}
            coffee={coffee}
            onLearnMore={handleLearnMore}
            onOrderNow={handleOrderNow}
          />
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('footer');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (linkName, href) => {
    alert(`${linkName} page will be added later!`);
    console.log(`Footer link clicked: ${href}`);
  };

  return (
    <footer id="footer" className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className={`footer-column ${isVisible ? 'visible' : ''}`}>
            <h3>About Us</h3>
            <div className="footer-links">
              <button 
                className="footer-link" 
                onClick={() => handleLinkClick('Learn About the Team', '#team')}
              >
                Learn About the Team
              </button>
              <button 
                className="footer-link" 
                onClick={() => handleLinkClick('Contact Us', '#contact')}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className={`footer-column ${isVisible ? 'visible' : ''}`}>
            <h3>For Business Partners</h3>
            <div className="footer-links">
              <button 
                className="footer-link" 
                onClick={() => handleLinkClick('Dashboard', '#dashboard')}
              >
                Dashboard
              </button>
              <button 
                className="footer-link" 
                onClick={() => handleLinkClick('Menu Management', '#menu-management')}
              >
                Menu Management
              </button>
              <button 
                className="footer-link" 
                onClick={() => handleLinkClick('Order Management', '#order-management')}
              >
                Order Management
              </button>
              <button 
                className="footer-link" 
                onClick={() => handleLinkClick('Analytics', '#analytics')}
              >
                Analytics
              </button>
            </div>
          </div>

          <div className={`footer-column footer-logo-section ${isVisible ? 'visible' : ''}`}>
            <div className="footer-logo">BrewCraft</div>
            <p className="footer-description">Premium coffee experience crafted to perfection</p>
            <div className="footer-social">
              <span>Follow us for updates</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 BrewCraft Coffee. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Floating Particles Component
const FloatingParticles = () => {
  useEffect(() => {
    const createFloatingElement = () => {
      const element = document.createElement('div');
      element.style.position = 'fixed';
      element.style.width = Math.random() * 8 + 4 + 'px';
      element.style.height = element.style.width;
      element.style.background = `rgba(212, 175, 55, ${Math.random() * 0.4 + 0.1})`;
      element.style.borderRadius = '50%';
      element.style.left = Math.random() * 100 + 'vw';
      element.style.top = '100vh';
      element.style.pointerEvents = 'none';
      element.style.zIndex = '1';
      element.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.3)';
      
      document.body.appendChild(element);
      
      const duration = Math.random() * 8000 + 12000;
      const drift = (Math.random() - 0.5) * 150;
      
      element.animate([
        { 
          transform: `translateY(0) translateX(0) scale(0)`, 
          opacity: 0 
        },
        { 
          transform: `translateY(-50vh) translateX(${drift * 0.5}px) scale(1)`, 
          opacity: 1 
        },
        { 
          transform: `translateY(-110vh) translateX(${drift}px) scale(0.5)`, 
          opacity: 0 
        }
      ], {
        duration: duration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => element.remove();
    };

    const interval = setInterval(createFloatingElement, 4000);
    return () => clearInterval(interval);
  }, []);

  return null;
};

// Main App Component
const App = () => {
  useEffect(() => {
    // Parallax effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero');
      const heroContent = document.querySelector('.hero-content');
      
      if (hero && heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Navigation />
      <HeroSection />
      <MenuSection />
      <Footer />
      <FloatingParticles />
    </div>
  );
};

export default App;