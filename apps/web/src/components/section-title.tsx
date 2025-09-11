'use client'

import { Icon } from '@iconify/react'
import Link from 'next/link'
import SwiperButton from './swiper-button'

type SectionTitleProps = {
  title: string
  showAllText: string
  route: string
  className?: {
    left: string
    right: string
  }
}

export default function SectionTitle({ title, showAllText, route, className }: Readonly<SectionTitleProps>) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="flex flex-row gap-4">
        {className && (
          <div className="flex flex-row gap-3">
            <SwiperButton side={'left'} className={className?.left} />
            <SwiperButton side={'right'} className={className?.right} />
          </div>
        )}
        <Link
          href={route}
          className="flex items-center gap-1 text-primary hover:text-primary/80 transition:colors duration-300"
        >
          {showAllText}
          <Icon icon="lucide:arrow-right" color="primary" />
        </Link>
      </div>
    </div>
  )
}
