import { numberFormat } from '@/src/utils/format'
import { useVacanciesProvider } from '../context/vacancies-provider'
import VacancyCard from '@/src/components/card-vacancy'
import Empty from '@/src/components/empty'
import { Pagination, Button } from '@heroui/react'
import { PopularVacancy } from '@jobly/trpc/src/router/main.router'
import { RotateCcw } from 'lucide-react'
import { useEffect } from 'react'

export default function ProductsList() {
  const { data, currentPage, isFetching, setCurrentPage, handleResetAll } = useVacanciesProvider()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className="w-3/4">
      {/* In Future, add skeleton loader */}
      {isFetching ? null : data.vacancies.length ? (
        <div className="flex flex-col gap-4">
          <span>{numberFormat(data.info.totalVacancy)} ვაკანსია</span>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit">
            {data.vacancies.map((v) => (
              <VacancyCard key={v.id} data={v as PopularVacancy} />
            ))}
          </div>
          <Pagination
            size="lg"
            classNames={{
              prev: 'cursor-pointer',
              next: 'cursor-pointer',
              base: 'flex justify-center overflow-hidden',
              item: 'cursor-pointer',
            }}
            initialPage={1}
            page={currentPage ?? 1}
            total={data.info.totalPages}
            variant="bordered"
            showControls
            onChange={setCurrentPage}
          />
        </div>
      ) : (
        <Empty
          children={
            <Button onPress={() => handleResetAll()} color="primary" startContent={<RotateCcw size={16} />}>
              ფილტრის გასუფთავება
            </Button>
          }
        />
      )}
    </div>
  )
}
