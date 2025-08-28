import React, { useState } from 'react'
import { Eye, EyeOff, Briefcase, ArrowLeft } from 'lucide-react'

const BusinessAuth = ({ onLogin, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: 'cafe',
    businessCode: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Business email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid business email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Business password must be at least 8 characters'
    }

    if (!isLogin) {
      if (!formData.businessName) {
        newErrors.businessName = 'Business name is required'
      }
      if (!formData.businessCode) {
        newErrors.businessCode = 'Business registration code is required'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    // Frontend-only validation for business code
    if (!isLogin && formData.businessCode && !formData.businessCode.startsWith('BC-')) {
      newErrors.businessCode = 'Business code must start with "BC-" (e.g., BC-2024-CAFE-001)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Frontend-only business authentication
    // In real app, backend would verify business credentials
    setTimeout(() => {
      const businessData = {
        id: Date.now(),
        type: 'business',
        businessName: formData.businessName || 'Sample Business',
        email: formData.email,
        businessType: formData.businessType,
        businessCode: formData.businessCode,
        loginTime: new Date().toISOString()
      }
      
      onLogin(businessData)
    }, 1000)
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      businessType: 'cafe',
      businessCode: ''
    })
    setErrors({})
  }

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card business-auth-card">
          <div className="auth-header">
            <button className="back-btn" onClick={onCancel}>
              <ArrowLeft size={20} />
            </button>
            <div className="auth-logo">
              <Briefcase size={40} className="business-logo-icon" />
              <h2>BREW CRAFT BUSINESS</h2>
            </div>
          </div>

          <div className="auth-form-container">
            <h3 className="auth-title">
              {isLogin ? 'Business Partner Login' : 'Join Our Business Network'}
            </h3>
            <p className="auth-subtitle">
              {isLogin 
                ? 'Access your business dashboard and manage your coffee operations'
                : 'Register your business and start partnering with BREW CRAFT'
              }
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <>
                  <div className="input-group">
                    <label htmlFor="businessName">Business Name</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className={errors.businessName ? 'error' : ''}
                      placeholder="Enter your business name"
                    />
                    {errors.businessName && <span className="error-text">{errors.businessName}</span>}
                  </div>

                  <div className="input-group">
                    <label htmlFor="businessType">Business Type</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="business-select"
                    >
                      <option value="cafe">Café</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="hotel">Hotel</option>
                      <option value="office">Office Space</option>
                      <option value="retail">Retail Store</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="businessCode">Business Registration Code</label>
                    <input
                      type="text"
                      id="businessCode"
                      name="businessCode"
                      value={formData.businessCode}
                      onChange={handleInputChange}
                      className={errors.businessCode ? 'error' : ''}
                      placeholder="BC-2024-CAFE-001"
                    />
                    {errors.businessCode && <span className="error-text">{errors.businessCode}</span>}
                    <small className="input-hint">Format: BC-YYYY-TYPE-XXX</small>
                  </div>
                </>
              )}

              <div className="input-group">
                <label htmlFor="email">Business Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                  placeholder="business@company.com"
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>

              <div className="input-group">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter secure password"
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              )}

              <button type="submit" className="business-submit-btn">
                {isLogin ? 'Access Dashboard' : 'Register Business'}
              </button>
            </form>

            <div className="auth-switch">
              <p>
                {isLogin ? "New business partner? " : "Already registered? "}
                <button type="button" className="switch-btn" onClick={toggleMode}>
                  {isLogin ? 'Register Here' : 'Sign In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessAuth