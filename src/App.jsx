import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import Footer from './components/Footer'
import UserAuth from './components/UserAuth'
import BusinessAuth from './components/BusinessAuth'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isBusinessLoggedIn, setIsBusinessLoggedIn] = useState(false)
  const [pendingDestination, setPendingDestination] = useState(null)
  const menuRef = useRef(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('brewCraftUser')
    if (savedUser) {
      setIsUserLoggedIn(true)
    }
    
    // Check if business is logged in from localStorage
    const savedBusiness = localStorage.getItem('brewCraftBusiness')
    if (savedBusiness) {
      setIsBusinessLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (currentPage === 'home') {
      const checkMenuVisibility = () => {
        if (menuRef.current) {
          const rect = menuRef.current.getBoundingClientRect()
          if (rect.top < window.innerHeight + 200) {
            setIsMenuVisible(true)
          }
        }
      }

      const handleScroll = () => {
        checkMenuVisibility()
      }

      window.addEventListener('scroll', handleScroll)
      checkMenuVisibility()

      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [currentPage])

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const handleNavigation = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAuthRequiredAction = (destination) => {
    if (isUserLoggedIn) {
      // User is logged in, proceed to destination
      alert(`Going to ${destination} page (will be added later)`)
    } else {
      // User not logged in, save destination and show auth
      setPendingDestination(destination)
      setCurrentPage('auth')
    }
  }

  const handleUserLogin = (userData) => {
    if (userData.type === 'business') {
      setIsBusinessLoggedIn(true)
      localStorage.setItem('brewCraftBusiness', JSON.stringify(userData))
      alert('Business login successful! Business dashboard will be added later.')
    } else {
      setIsUserLoggedIn(true)
      localStorage.setItem('brewCraftUser', JSON.stringify(userData))
      
      // If there's a pending destination, go there
      if (pendingDestination) {
        alert(`Login successful! Going to ${pendingDestination} page (will be added later)`)
        setPendingDestination(null)
      }
    }
    setCurrentPage('home')
  }

  const handleUserLogout = () => {
    setIsUserLoggedIn(false)
    localStorage.removeItem('brewCraftUser')
    setCurrentPage('home')
  }

  const handleBusinessAuth = () => {
    setCurrentPage('businessAuth')
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'auth':
        return (
          <UserAuth 
            onLogin={handleUserLogin}
            onCancel={() => {
              setPendingDestination(null)
              setCurrentPage('home')
            }}
          />
        )
      case 'businessAuth':
        return (
          <BusinessAuth 
            onLogin={handleUserLogin}
            onCancel={() => setCurrentPage('home')}
          />
        )
      case 'home':
      default:
        return (
          <>
            <Hero onExploreClick={scrollToMenu} />
            <div ref={menuRef} style={{height: '1px', position: 'relative'}}></div>
            {isMenuVisible && (
              <MenuGrid 
                onCoffeeClick={handleAuthRequiredAction}
                onAddToCart={handleAuthRequiredAction}
              />
            )}
            <Footer onBusinessAuth={handleBusinessAuth} />
          </>
        )
    }
  }

  return (
    <div className="App">
      <Header 
        onNavigate={handleNavigation}
        isUserLoggedIn={isUserLoggedIn}
        onLogout={handleUserLogout}
        onAuthRequired={handleAuthRequiredAction}
      />
      {renderPage()}
    </div>
  )
}

export default App