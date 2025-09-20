import React, { useState, useEffect } from 'react'
import '../../styles/employee/employee-shared.css'

const defaultMenu = []

const MenuManagement = ({ onBack }) => {
  const [menu, setMenu] = useState([])
  const [form, setForm] = useState({ name: '', price: '', description: '', imageUrl: '' })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('brewCraftMenu') || 'null')
    if (stored && Array.isArray(stored)) setMenu(stored)
  }, [])

  useEffect(() => {
    localStorage.setItem('brewCraftMenu', JSON.stringify(menu))
  }, [menu])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setForm(prev => ({ ...prev, imageUrl: e.target.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addItem = (e) => {
    e.preventDefault()
    if (!form.name || !form.price) return
    const nextId = Date.now()
    setMenu(prev => [...prev, { id: nextId, name: form.name, price: `₹${form.price}`, description: form.description || '', imageUrl: form.imageUrl || '', emoji: '☕' }])
    setForm({ name: '', price: '', description: '', imageUrl: '' })
    setImageFile(null)
    setImagePreview('')
  }

  const removeItem = (id) => {
    setMenu(prev => prev.filter(i => i.id !== id))
  }

  const updatePrice = (id, price) => {
    setMenu(prev => prev.map(i => i.id === id ? { ...i, price: `₹${price}` } : i))
  }

  return (
    <div className="emp-page">
      <div className="emp-container">
        <div className="emp-header">
          <button className="back-btn" onClick={onBack}>Back</button>
          <h1 className="emp-title">Menu Management</h1>
        </div>

        <form className="emp-form" onSubmit={addItem}>
          <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
          <input placeholder="Image URL (public path)" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
          <label style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            padding: '0.6rem 1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}>
            📁 Upload Image
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }}
            />
          </label>
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <button type="submit">Add Item</button>
        </form>
        
        {imagePreview && (
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)' }} />
          </div>
        )}

        <div className="emp-list">
          {menu.map(item => (
            <div className="emp-row" key={item.id}>
              <div className="emp-row-main">
                <strong>{item.name}</strong>
                <span className="muted">{item.description}</span>
              </div>
              <div className="emp-row-actions">
                <input style={{width:'100px'}} type="number" defaultValue={parseInt(item.price.replace('₹',''))} onBlur={e => updatePrice(item.id, e.target.value)} />
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          {menu.length === 0 && <div className="muted">No custom items yet.</div>}
        </div>
      </div>
    </div>
  )
}

export default MenuManagement



