import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = theme === 'dark'
  const handleSwitch = () => setTheme(isDark ? 'light' : 'dark')

  if (!mounted) return null

  return (
    <div
      onClick={handleSwitch}
      className="border-1 border-default-300 rounded-xl p-1.5 cursor-pointer text-center"
    >
      {!isDark ? <Sun color="#0f0f0f" strokeWidth={1} /> : <Moon color="#ffffff" strokeWidth={1} />}
    </div>
  )
}
