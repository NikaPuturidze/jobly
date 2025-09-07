import { trpcServer } from '@/src/lib/trpc'
import CategoriesView from './view'

export default async function CategoriesData() {
  const data = await trpcServer.main.categories.query()
  return <CategoriesView data={data} />
}
