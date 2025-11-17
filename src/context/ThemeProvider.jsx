import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const ThemeCtx = createContext({ theme: 'system', isDark: false, toggle: () => {} })

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = theme === 'dark' || (theme === 'system' && prefers)
    setIsDark(dark)
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', theme)
  }, [theme])

  const value = useMemo(() => ({ theme, isDark, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }), [theme, isDark])

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>
}

export function useTheme() {
  return useContext(ThemeCtx)
}