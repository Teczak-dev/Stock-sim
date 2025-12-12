import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import './Navigation.css'

export default function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const isDark = theme === 'dark'
  const kolorTla = isDark ? '#0f172a' : '#ffffff'
  const kolorTekstu = isDark ? 'white' : 'black'
  const kolorAktywny = '#10b981'

  const stylLinku = ({ isActive }) => ({
    textDecoration: 'none',
    padding: '10px',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? kolorAktywny : kolorTekstu,
    borderBottom: isActive ? `2px solid ${kolorAktywny}` : 'none'
  })

  return (
    <nav className="navbar" style={{ backgroundColor: kolorTla, borderBottom: '1px solid gray' }}>
      
      <Link to="/" style={{ fontSize: '24px', textDecoration: 'none', fontWeight: 'bold', color: kolorTekstu }}>
        StockSim 📈
      </Link>

      <button 
        className="hamburger-toggle" 
        onClick={() => setIsOpen(!isOpen)} 
        style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: kolorTekstu }}
      >
        ☰
      </button>

      <div className={`hamburger-menu ${isOpen ? 'open' : ''}`} style={{ backgroundColor: isOpen ? kolorTla : 'transparent' }}>
        <NavLink to="/" style={stylLinku} onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/market" style={stylLinku} onClick={() => setIsOpen(false)}>Rynek</NavLink>
        <NavLink to="/obserwacje" style={stylLinku} onClick={() => setIsOpen(false)}>Obserwacje</NavLink>
        <NavLink to="/kontakt" style={stylLinku} onClick={() => setIsOpen(false)}>Kontakt</NavLink>
      </div>

      <div className="nav-actions">
        <button 
          onClick={toggleTheme} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', marginLeft: '15px' }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

    </nav>
  )
}