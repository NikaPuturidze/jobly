'use client'

import CategoryCard from '@/src/components/card-category'
import Empty from '@/src/components/empty'
import { Input } from '@heroui/react'
import { MainCategories } from '@jobly/trpc/src/router/main.router'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

export default function CategoriesView({ data }: Readonly<{ data: MainCategories }>) {
  const [query, setQuery] = useState<string | null>(null)
  const [categories, setCategories] = useState<typeof data | null>()

  useEffect(() => {
    if (!query) setCategories(data)
    else {
      const filteredCategories = data.filter((v) => v.name?.includes(query))
      setCategories(filteredCategories)
    }
  }, [query])

  const handleSetQuery = (el: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearch(el.target.value)

  const debouncedSetSearch = useDebounceCallback((value: string) => setQuery(value), 250)

  return (
    <section aria-label="categories" className="flex flex-col gap-6">
      <Input
        labelPlacement="outside"
        placeholder="ძიება"
        startContent={<Search size={18} strokeWidth={2} opacity={0.5} />}
        className="max-w-120"
        onChange={handleSetQuery}
      />
      {categories?.length ? (
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
