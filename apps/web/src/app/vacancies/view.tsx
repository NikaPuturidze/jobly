'use client'

import ProductsList from './components/products-list'
import SideFilters from './components/side-filters'

export default function VacanciesView() {
  return (
    <div className="flex gap-4">
      <SideFilters />
      <ProductsList />
    </div>
  )
}
