import '../styles/globals.css'
import '../styles/vars.css'
import '@fontsource/firago'
import 'swiper/css'
import 'swiper/css/navigation'
import clsx from 'clsx'
import { Viewport } from 'next'
import { Providers } from './providers'
import NavbarView from '../components/navbar/navbar'
import Wrapper from '../components/wrapper'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('min-h-screen text-foreground bg-background font-sans antialiased')}>
        <Providers>
          <NavbarView />
          <Wrapper>
            <main className="flex-grow py-5">{children}</main>
          </Wrapper>
        </Providers>
      </body>
    </html>
  )
}
