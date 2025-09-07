'use client'

import * as React from 'react'
import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { TrpcProvider } from '../lib/trpc'

export interface ProvidersProps {
  children: React.ReactNode
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

export function Providers({ children }: ProvidersProps) {
  return (
    <TrpcProvider>
      <HeroProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen font-sans antialiased">{children}</div>
        </NextThemesProvider>
      </HeroProvider>
    </TrpcProvider>
  )
}
