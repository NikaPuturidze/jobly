'use server'

import { Suspense } from 'react'
import CategoriesData from './server'

export default async function Categories() {
  return (
    <Suspense fallback={<div>Loading categories...</div>}>
      <CategoriesData />
    </Suspense>
  )
}
