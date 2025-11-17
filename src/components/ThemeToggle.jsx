import Switch from './ui/switch.jsx'
import { useTheme } from '../context/ThemeProvider.jsx'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs opacity-70">Theme</span>
      <Switch checked={isDark} onChange={() => toggle()} />
    </div>
  )
}