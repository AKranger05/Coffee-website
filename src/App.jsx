// src/App.jsx
import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuGrid from './components/MenuGrid'
import Footer from './components/Footer'
import AuthPage from './components/AuthPage'
import './App.css'

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [user, setUser] = useState(null) // Simulate logged-in user
  const menuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const checkMenuVisibility = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight + 200) {
          setIsMenuVisible(true)
        }
      }
    }

    window.addEventListener('scroll', checkMenuVisibility)
    checkMenuVisibility()

    return () => window.removeEventListener('scroll', checkMenuVisibility)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    // Go back to previous page or home
    navigate(-1)
  }

  const requireAuth = (element, from) => {
    return user ? element : <Navigate to={`/auth?from=${from}`} />
  }

  const scrollToMenu = () => {
    if (menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="App">
      <Header onSignInClick={() => navigate('/auth?from=signin')} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero onExploreClick={scrollToMenu} />
              <div ref={menuRef} style={{ height: '1px' }}></div>
              {isMenuVisible && <MenuGrid onCardClick={(name) => navigate(`/coffee/${name}`)} onOrderNow={(name) => navigate(`/coffee/${name}`)} />}
              <Footer />
            </>
          }
        />

        <Route
          path="/auth"
          element={
            <AuthPage
              onLogin={handleLogin}
              from={new URLSearchParams(window.location.search).get('from')}
            />
          }
        />

        <Route
          path="/coffee/:name"
          element={requireAuth(<div style={{ padding: '8rem 2rem', textAlign: 'center', color: 'white' }}>Coffee page will be added soon!</div>, 'coffee')}
        />
      </Routes>
    </div>
  )
}

export default App