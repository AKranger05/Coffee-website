import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsMenuVisible(true)
      } else {
        setIsMenuVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      <Header />
      <Hero />
      {isMenuVisible && <MenuGrid />}
      <Footer />
    </div>
  )
}

export default App