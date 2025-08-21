import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const checkMenuVisibility = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect()
        // Show menu when it's 200px before it comes into view
        if (rect.top < window.innerHeight + 200) {
          setIsMenuVisible(true)
        }
      }
    }

    const handleScroll = () => {
      checkMenuVisibility()
    }

    // Check on scroll and on initial load
    window.addEventListener('scroll', handleScroll)
    checkMenuVisibility() // Check immediately on load

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to scroll to menu section
  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="App">
      <Header />
      <Hero onExploreClick={scrollToMenu} />
      
      {/* This div will trigger the menu to appear */}
      <div ref={menuRef} style={{height: '1px', position: 'relative'}}></div>
      
      {isMenuVisible && <MenuGrid />}
      <Footer />
    </div>
  )
}

export default App