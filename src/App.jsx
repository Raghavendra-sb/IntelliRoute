import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Query from './pages/Query.jsx'
import History from './pages/History.jsx'
import Navbar from './components/Navbar.jsx'
import { Navigate } from 'react-router-dom'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/query" element={<Query />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  )
}