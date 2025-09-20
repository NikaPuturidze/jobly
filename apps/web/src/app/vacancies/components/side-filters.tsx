import FilterAccordion from '@/src/components/accordion-filter'
import { Card, CardBody, Button, Accordion, AccordionItem, Input, Slider } from '@heroui/react'
import { useVacanciesProvider } from '../context/vacancies-provider'
import { Search } from 'lucide-react'

export default function SideFilters() {
  const {
    data,
    selectedCategoriesIds,
    setSelectedCategoriesIds,
    selectedExperienceLevelsIds,
    setSelectedExperienceLevelsIds,
    selectedJobTypeIds,
    setSelectedJobTypeIds,
    salaryRange,
    setSalaryRange,
    clearKey,
    queryRef,
    handleClearAside,
    applyFilters,
  } = useVacanciesProvider()

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (queryRef.current) queryRef.current.value = e.target.value
  }

  const handleSliderChange = (value: number | number[]) => setSalaryRange(value as number[])

  return (
    <aside className="w-1/4 sticky bottom-0">
      <div className="border border-content5 rounded-md">
        <Card shadow="none" radius="md">
          <CardBody className="p-4 flex-1">
            <div className="flex justify-between items-center mb-3 pl-2">
              <h2 className="text-lg font-semibold">ფილტრი</h2>
              <Button size="sm" variant="light" onPress={handleClearAside} className="text-default-500 ml-4">
                გასუფთავება
              </Button>
            </div>

            <div className="w-full flex gap-4 px-2">
              <Input
                key={clearKey}
                radius="sm"
                placeholder="ძიება"
                startContent={<Search opacity={0.5} size={18} />}
                ref={queryRef}
                onChange={handleQueryChange}
                className="mb-5"
              />
            </div>

            <div className="w-full flex gap-4 px-2 mb-4">
              <Slider
                key={clearKey}
                classNames={{
                  base: 'flex flex-col gap-2',
                  label: 'font-bold',
                }}
                className="max-w-md"
                defaultValue={salaryRange}
                formatOptions={{ style: 'currency', currency: 'GEL', maximumFractionDigits: 0 }}
                onChangeEnd={handleSliderChange}
                maxValue={data.info.maxSalary || 1000}
                minValue={0}
                step={1}
                label="ანაზღაურება"
              />
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
                key="2"
                aria-label="Category Accordion"
                title="კატეგორია"
                classNames={{
                  base: 'scrollbar-none',
                  content: 'overflow-hidden',
                  title: 'cursor-pointer font-bold',
                  indicator: 'cursor-pointer',
                }}
              >
                <FilterAccordion
                  data={data.filters.categories}
                  selected={selectedCategoriesIds}
                  setSelected={setSelectedCategoriesIds}
                  scrollable={false}
                />
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Experience Accordion"
                title="გამოცდილება"
                classNames={{
                  base: 'scrollbar-none',
                  content: 'overflow-hidden',
                  title: 'cursor-pointer font-bold',
                  indicator: 'cursor-pointer',
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
                key="4"
                aria-label="Job Type Accordion"
                title="მუშაობის ტიპი"
                classNames={{
                  base: 'scrollbar-none',
                  content: 'overflow-hidden',
                  title: 'cursor-pointer font-bold',
                  indicator: 'cursor-pointer',
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
        <div className="sticky bottom-0 z-10 border-t border-content5 bg-content1 rounded-b-md p-3">
          <Button radius="sm" fullWidth color="primary" onPress={() => applyFilters()}>
            ძიება
          </Button>
        </div>
      </div>
    </aside>
  )
}
