'use client'

import CategoryCard from '@/src/components/card-category'
import Empty from '@/src/components/empty'
import { Input } from '@heroui/react'
import { MainCategories } from '@jobly/trpc/src/router/main.router'
import { Search } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

export default function CategoriesView({ data }: { data: MainCategories }) {
  const [search, setSearch] = React.useState<string | null>(null)
  const [categories, setCategories] = React.useState<typeof data | null>()

  useEffect(() => {
    if (!search) setCategories(data)
    else {
      const filteredCategories = data.filter((v) => v.name?.includes(search))
      setCategories(filteredCategories)
    }
  }, [search])

  const handleSearch = (value: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearch(value.target.value)

  const debouncedSetSearch = useDebounceCallback((value: string) => setSearch(value), 250)

  return (
    <section aria-label="categories" className="flex flex-col gap-6">
      <Input
        labelPlacement="outside"
        placeholder="ძიება"
        startContent={<Search size={18} strokeWidth={2} />}
        className="max-w-120"
        onChange={handleSearch}
      />
      {categories && categories.length ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((card) => (
            <CategoryCard key={card.id} data={card} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </section>
  )
}
