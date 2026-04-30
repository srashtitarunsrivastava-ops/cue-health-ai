import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Subscription from './pages/Subscription'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout({ children, hideNav }) {
  return (
    <>
      {!hideNav && <Navbar />}
      {children}
      {!hideNav && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"        element={<Layout><Home /></Layout>} />
        <Route path="/chat"    element={<Layout hideNav><Chat /></Layout>} />
        <Route path="/pricing" element={<Layout><Subscription /></Layout>} />
        <Route path="*"        element={<Layout><Home /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
