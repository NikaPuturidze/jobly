'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'

type SectionTitleProps = {
  title: string
  showAllText: string
  route: string
}

export default function SectionTitle({ title, showAllText, route }: SectionTitleProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <Link href={route} className="flex items-center gap-1 text-primary">
        {showAllText}
        <Icon icon="lucide:arrow-right" color="primary" />
      </Link>
    </div>
  )
}
