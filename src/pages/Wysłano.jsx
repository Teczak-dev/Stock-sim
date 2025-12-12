import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Wysłano() {
  const navigate = useNavigate()
  const { theme } = useTheme()

  return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: theme === 'dark' ? 'white' : 'black' }}>
      <h1>✓ Wiadomość wysłana!</h1>
      <p style={{ opacity: 0.7, marginBottom: '30px' }}>Dziękujemy za kontakt.</p>
      <button onClick={() => navigate('/kontakt')} style={{ padding: '10px 20px', background: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Powrót
      </button>
    </div>
  )
}
