'use client'

import React, { useState } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
} from '@heroui/react'
import { Navigation } from '@jobly/db/src/schema'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeSwitcher } from '../theme-switcher'

export default function NavbarClient({ data }: { data: Navigation[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => pathname === path

  return (
    <Navbar isBordered maxWidth="lg" isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />
        <NavbarBrand>
          <p className="font-bold text-inherit">Jobly</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {data &&
          data.map((v) => (
            <NavbarItem key={v.id}>
              <Link
                onClick={() => handleNavigation(v.path)}
                color={isActive(v.path) ? 'primary' : 'foreground'}
                className="font-medium"
              >
                {v.label}
              </Link>
            </NavbarItem>
          ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitcher />
      </NavbarContent>

      <NavbarMenu>
        {data &&
          data.map((v) => (
            <NavbarMenuItem key={v.id}>
              <Link
                onClick={() => handleNavigation(v.path)}
                color={isActive(v.path) ? 'primary' : 'foreground'}
                className="font-medium"
              >
                {v.label}
              </Link>
            </NavbarMenuItem>
          ))}
      </NavbarMenu>
    </Navbar>
  )
}
