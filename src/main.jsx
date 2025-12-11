import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 1. KONTEKSTY (Stan globalny)
import { ThemeProvider } from './context/ThemeContext'
import { FavoritesProvider } from './context/FavoritesContext' // <--- TO JEST NOWE (SERDUSZKA)

// 2. STRONY
import Layout from './components/Layout'
import Home from './pages/Home'
import Market from './pages/Market'
import Obserwacje from './pages/Obserwacje' // <--- TO JEST TWOJA GRA


import NotFound from './pages/NotFound'


import AdminUsers from './pages/AdminUsers'
import AdminSettings from './pages/AdminSettings'
import Adminav from './pages/Adminnav'
import LoginForm from './pages/LoginForm'


import Navigation from './components/Navigation'
import Kontakt from './pages/Kontakt'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/market', // Zmieniłem na małą literę (standard)
        element: <Market />
      },
      {
        path: '/obserwacje', // <--- TU JEST TWOJA GRA
        element: <Obserwacje />
      },
      {
        path: '/kontakt',
        element: <Kontakt />
      },
      {
        path: '/Login',
        element: <LoginForm />
      },
      {
        path: '/NotFound',
        element: <><Navigation /></>
      },
      {
        path: '/Admin',
        element: <Adminav />,
        children: [
          {
            path: '/Admin/users',
            element: <AdminUsers />
          },
          {
            path: '/Admin/settings',
            element: <AdminSettings />
          },
        ]
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. OWIJAMY APLIKACJĘ W PROVIDERY */}
    <ThemeProvider>
      <FavoritesProvider> {/* <--- DZIĘKI TEMU DZIAŁAJĄ ULUBIONE */}
        <RouterProvider router={router} />
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>,
)