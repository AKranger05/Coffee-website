import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuTriggerRef = useRef(null)
  const menuSectionRef = useRef(null)

  const scrollToMenu = () => {
    if (menuSectionRef.current) {
      menuSectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (menuTriggerRef.current) {
        const triggerPosition = menuTriggerRef.current.getBoundingClientRect().top
        if (triggerPosition < window.innerHeight * 0.8) {
          setIsMenuVisible(true)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Check on initial load
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <Header />
      <Hero scrollToMenu={scrollToMenu} />
      
      {/* Invisible trigger element to detect when to show menu */}
      <div ref={menuTriggerRef} className="menu-trigger"></div>
      
      {/* Menu with animation */}
      <div ref={menuSectionRef} className={`menu-container ${isMenuVisible ? 'visible' : ''}`}>
        <MenuGrid />
      </div>
      
      <Footer />
    </div>
  )
}

export default App