'use client'

import FilterAccordion from '@/src/components/accordion-filter'
import VacancyCard from '@/src/components/card-vacancy'
import { trpcClient } from '@/src/lib/trpc'
import { Accordion, AccordionItem, Button, Card, CardBody, Input } from '@heroui/react'
import { PopularVacancy, Vacancies } from '@jobly/trpc/src/router/main.router'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'

export default function VacanciesView({ initialData }: Readonly<{ initialData: Vacancies }>) {
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([])
  const [selectedExperienceLevelsIds, setSelectedExperienceLevelsIds] = useState<number[]>([])
  const [selectedJobTypeIds, setSelectedJobTypeIds] = useState<number[]>([])
  const [query, setQuery] = useState<string | null>(null)

  const { refetch } = trpcClient.main.vacancies.useQuery(
    {
      query,
      selectedCategoriesIds,
      selectedExperienceLevelsIds,
      selectedJobTypeIds,
    },
    { enabled: false }
  )

  const [data, setData] = useState(initialData)

  const handleSetQuery = (el: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearch(el.target.value)
  const handleSearch = async () => {
    const result = await refetch()
    if (result.data) setData(result.data)
  }

  const debouncedSetSearch = useDebounceCallback((value: string) => setQuery(value), 200)

  const handleClear = () => {
    setSelectedCategoriesIds([])
    setSelectedExperienceLevelsIds([])
    setSelectedJobTypeIds([])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full flex gap-4">
        <Input
          radius="sm"
          placeholder="მოიძიე პროფესია ან კომპანია"
          startContent={<Search opacity={0.5} size={18} />}
          onChange={handleSetQuery}
        />
        <Button onPress={handleSearch} radius="sm" color="primary" type="button" className="px-8">
          ძიება
        </Button>
      </div>
      <div className="flex gap-4">
        <aside className="lg:w-3/10">
          <Card shadow="none" className="border border-content5">
            <CardBody className="p-4 overflow-y-hidden">
              <div className="flex justify-between items-center mb-3 pl-2">
                <h2 className="text-lg font-semibold">ფილტრი</h2>
                <Button size="sm" variant="light" onPress={handleClear} className="text-default-500 ml-4">
                  გასუფთავება
                </Button>
              </div>

              <Accordion
                defaultSelectedKeys={'all'}
                selectionMode="multiple"
                variant="light"
                isCompact
                motionProps={{
                  variants: {
                    enter: {
                      y: 0,
                      opacity: 1,
                      height: 'auto',
                      overflowY: 'unset',
                      transition: {
                        height: {
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          duration: 1,
                        },
                        opacity: {
                          easings: 'ease',
                          duration: 1,
                        },
                      },
                    },
                    exit: {
                      y: -10,
                      opacity: 0,
                      height: 0,
                      overflowY: 'hidden',
                      transition: {
                        height: {
                          easings: 'ease',
                          duration: 0.25,
                        },
                        opacity: {
                          easings: 'ease',
                          duration: 0.3,
                        },
                      },
                    },
                  },
                }}
              >
                <AccordionItem
                  key="1"
                  aria-label="Category Accordion"
                  title="კატეგორია"
                  classNames={{
                    base: 'scrollbar-none',
                    content: 'overflow-hidden',
                    title: 'cursor-pointer',
                  }}
                >
                  <FilterAccordion
                    data={data.filters.categories}
                    selected={selectedCategoriesIds}
                    setSelected={setSelectedCategoriesIds}
                    sortBy="name"
                    scrollable={false}
                  />
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Experience Accordion"
                  title="გამოცდილება"
                  classNames={{
                    base: 'scrollbar-none',
                    content: 'overflow-hidden',
                    title: 'cursor-pointer',
                  }}
                >
                  <FilterAccordion
                    data={data.filters.expereinceLevels}
                    selected={selectedExperienceLevelsIds}
                    setSelected={setSelectedExperienceLevelsIds}
                    scrollable={false}
                  />
                </AccordionItem>
                <AccordionItem
                  key="3"
                  aria-label="Job Type Accordion"
                  title="სამუშაო გრაფიკი"
                  classNames={{
                    base: 'scrollbar-none',
                    content: 'overflow-hidden',
                    title: 'cursor-pointer',
                  }}
                >
                  <FilterAccordion
                    data={data.filters.jobType}
                    selected={selectedJobTypeIds}
                    setSelected={setSelectedJobTypeIds}
                    scrollable={false}
                  />
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card>
        </aside>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 h-fit">
          {data.vacancies.map((v) => (
            <VacancyCard key={v.id} data={v as PopularVacancy} />
          ))}
        </div>
      </div>
    </div>
  )
}
