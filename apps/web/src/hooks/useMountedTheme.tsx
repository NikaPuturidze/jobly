'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function useMountedTheme() {
  const { theme, resolvedTheme, ...rest } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted ? { theme, resolvedTheme, ...rest } : { theme: 'light', resolvedTheme: 'light', ...rest }
}
