import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type Theme = 'sakura' | 'indigo-night' | 'sunset' | 'forest' | 'ocean' | 'kanagawa' | 'gruvbox' | 'everforest'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: Theme[]
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEMES: Theme[] = ['sakura', 'indigo-night', 'sunset', 'forest', 'ocean', 'kanagawa', 'gruvbox', 'everforest']

const STORAGE_KEY = 'kaizen-theme'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (stored && THEMES.includes(stored)) return stored
    }
    return 'sakura'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (t: Theme) => setThemeState(t)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
