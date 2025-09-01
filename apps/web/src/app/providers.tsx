'use client'

import type { ThemeProviderProps } from 'next-themes'

import * as React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { TrpcProvider } from '../lib/trpc'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
  }
}

function HeroProvider({ children }: ProvidersProps) {
  const router = useRouter()
  return <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <TrpcProvider>
      <HeroProvider>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </HeroProvider>
    </TrpcProvider>
  )
}
