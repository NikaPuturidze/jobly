import { TextSearch } from 'lucide-react'

type Props = {
  children?: React.ReactNode
}

export default function Empty({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <TextSearch size={60} />
      <p>ვერაფერი ვერ მოიძებნა</p>
      {children}
    </div>
  )
}
