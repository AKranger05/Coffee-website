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
        // Show menu when it's in the viewport
        if (rect.top < window.innerHeight - 100) {
          setIsMenuVisible(true)
        }
      }
    }

    // Check on scroll and on initial load
    window.addEventListener('scroll', checkMenuVisibility)
    checkMenuVisibility() // Check immediately on load

    return () => window.removeEventListener('scroll', checkMenuVisibility)
  }, [])

  return (
    <div className="App">
      <Header />
      <Hero />
      
      {/* This div will trigger the menu to appear */}
      <div ref={menuRef} style={{height: '10px', position: 'absolute', top: '80vh'}}></div>
      
      {isMenuVisible && <MenuGrid />}
      <Footer />
    </div>
  )
}

export default App