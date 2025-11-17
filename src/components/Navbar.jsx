import { Link, NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'
import { cn } from '../lib/utils'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xs">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-brand" />
          <span className="font-semibold">IntelliRoute</span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => cn('text-sm opacity-80 hover:opacity-100', isActive && 'opacity-100')}>Home</NavLink>
          <NavLink to="/query" className={({ isActive }) => cn('text-sm opacity-80 hover:opacity-100', isActive && 'opacity-100')}>Query</NavLink>
          <NavLink to="/history" className={({ isActive }) => cn('text-sm opacity-80 hover:opacity-100', isActive && 'opacity-100')}>History</NavLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}