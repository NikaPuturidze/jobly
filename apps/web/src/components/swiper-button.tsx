import { ChevronLeft, ChevronRight } from 'lucide-react'

type ButtonProps = {
  side: 'left' | 'right'
  className: string
}

export default function SwiperButton({ side, className }: Readonly<ButtonProps>) {
  return (
    <button
      className={`flex size-8 items-center justify-center cursor-pointer rounded-full bg-background text-foreground border-1 border-content5 hover:bg-foreground/5 transition:colors duration-300 ${className}`}
    >
      {side === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  )
}
