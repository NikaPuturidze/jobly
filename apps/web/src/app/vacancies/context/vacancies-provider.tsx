import { trpcClient } from '@/src/lib/trpc'
import { Vacancies } from '@jobly/trpc/src/router/main.router'
import { QueryObserverResult } from '@tanstack/react-query'
import { TRPCClientErrorLike } from '@trpc/react-query'
import {
  createContext,
  Dispatch,
  MutableRefObject,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from 'react'
import type { TrpcRouter } from '@jobly/trpc'

type AppliedFilters = {
  query: string | null
  selectedCategoriesIds: number[]
  selectedExperienceLevelsIds: number[]
  selectedJobTypeIds: number[]
  salaryFrom: number | undefined
  salaryTo: number | undefined
  selectedEmploymentTypeIds: number[]
}

type VacanciesProviderProps = Readonly<
  PropsWithChildren<{
    initialData: Vacancies
  }>
>

type AccordionItem = {
  key: string
  title: string
  aria: string
  data: {
    id: number
    name: string
    amount: number
  }[]
  selected: number[]
  setSelected: Dispatch<SetStateAction<number[]>>
}

type VacanciesContextT = {
  data: Vacancies
  isLoading: boolean
  isFetching: boolean
  refetch: () => Promise<QueryObserverResult<Vacancies, TRPCClientErrorLike<TrpcRouter>>>
  selectedCategoriesIds: number[]
  setSelectedCategoriesIds: Dispatch<SetStateAction<number[]>>
  selectedExperienceLevelsIds: number[]
  setSelectedExperienceLevelsIds: Dispatch<SetStateAction<number[]>>
  selectedJobTypeIds: number[]
  setSelectedJobTypeIds: Dispatch<SetStateAction<number[]>>
  salaryRange: number[]
  setSalaryRange: Dispatch<SetStateAction<number[]>>
  selectedEmploymentTypeIds: number[]
  setSelectedEmploymentTypeIds: Dispatch<SetStateAction<number[]>>
  clearKey: number
  setClearKey: Dispatch<SetStateAction<number>>
  queryRef: MutableRefObject<HTMLInputElement | null>
  currentPage: number | null
  setCurrentPage: Dispatch<number | null>
  handleClearAside: () => void
  handleResetAll: () => void
  applyFilters: () => void
  accordionItems: AccordionItem[]
}

export const VacanciesContext = createContext<VacanciesContextT | null>(null)

export const VacanciesProvider = ({ children, initialData }: VacanciesProviderProps) => {
  const queryRef = useRef<HTMLInputElement | null>(null)
  const [clearKey, setClearKey] = useState(0)
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>([])
  const [selectedExperienceLevelsIds, setSelectedExperienceLevelsIds] = useState<number[]>([])
  const [selectedJobTypeIds, setSelectedJobTypeIds] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number | null>(null)
  const [salaryRange, setSalaryRange] = useState<number[]>([0, initialData.info.maxSalary || 10000])
  const [selectedEmploymentTypeIds, setSelectedEmploymentTypeIds] = useState<number[]>([
    0,
    initialData.info.maxSalary || 10000,
  ])

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    query: null,
    selectedCategoriesIds: [],
    selectedExperienceLevelsIds: [],
    selectedJobTypeIds: [],
    salaryFrom: 0,
    salaryTo: undefined,
    selectedEmploymentTypeIds: [],
  })

  const { data, isFetching, isLoading, refetch } = trpcClient.main.vacancies.useQuery(
    {
      query: appliedFilters.query,
      selectedCategoriesIds: appliedFilters.selectedCategoriesIds,
      selectedExperienceLevelsIds: appliedFilters.selectedExperienceLevelsIds,
      selectedJobTypeIds: appliedFilters.selectedJobTypeIds,
      currentPage: currentPage ?? 1,
      salaryFrom: appliedFilters.salaryFrom,
      salaryTo: appliedFilters.salaryTo,
      selectedEmploymentTypeIds: appliedFilters.selectedEmploymentTypeIds,
    },
    {
      initialData,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      placeholderData: undefined,
    }
  )

  const accordionItems = [
    {
      key: '2',
      title: 'კატეგორია',
      aria: 'Category Accordion',
      data: data.filters.categories,
      selected: selectedCategoriesIds,
      setSelected: setSelectedCategoriesIds,
    },
    {
      key: '3',
      title: 'გამოცდილება',
      aria: 'Experience Accordion',
      data: data.filters.expereinceLevels,
      selected: selectedExperienceLevelsIds,
      setSelected: setSelectedExperienceLevelsIds,
    },
    {
      key: '4',
      title: 'მუშაობის ტიპი',
      aria: 'Job Type Accordion',
      data: data.filters.jobType,
      selected: selectedJobTypeIds,
      setSelected: setSelectedJobTypeIds,
    },
    {
      key: '5',
      title: 'სამუშაო განაკვეთი',
      aria: 'Employment Type Accordion',
      data: data.filters.employmentType,
      selected: selectedEmploymentTypeIds,
      setSelected: setSelectedEmploymentTypeIds,
    },
  ]

  const applyFilters = () => {
    setAppliedFilters({
      query: queryRef.current?.value ?? null,
      selectedCategoriesIds,
      selectedExperienceLevelsIds,
      selectedJobTypeIds,
      salaryFrom: salaryRange[0],
      salaryTo: salaryRange[1],
      selectedEmploymentTypeIds,
    })
    setCurrentPage(1)
    window.scrollTo(0, 0)
  }

  const setClearQuery = () => {
    if (queryRef.current) queryRef.current.value = ''
    setClearKey((k) => k + 1)
  }

  const handleClearAside = () => {
    setSelectedCategoriesIds([])
    setSelectedExperienceLevelsIds([])
    setSelectedJobTypeIds([])
    setCurrentPage(1)
    setClearQuery()
    setAppliedFilters({
      query: null,
      selectedCategoriesIds: [],
      selectedExperienceLevelsIds: [],
      selectedJobTypeIds: [],
      salaryFrom: 0,
      salaryTo: initialData.info.maxSalary || 10000,
      selectedEmploymentTypeIds,
    })
    setSalaryRange([0, initialData.info.maxSalary || 10000])
  }

  const handleResetAll = () => {
    handleClearAside()
    setCurrentPage(1)
    setClearQuery()
  }

  const value = {
    data,
    isLoading,
    isFetching,
    refetch,
    selectedCategoriesIds,
    setSelectedCategoriesIds,
    selectedExperienceLevelsIds,
    setSelectedExperienceLevelsIds,
    selectedJobTypeIds,
    setSelectedJobTypeIds,
    selectedEmploymentTypeIds,
    setSelectedEmploymentTypeIds,
    salaryRange,
    setSalaryRange,
    clearKey,
    setClearKey,
    queryRef,
    currentPage,
    setCurrentPage,
    handleClearAside,
    handleResetAll,
    applyFilters,
    accordionItems,
  }

  return <VacanciesContext.Provider value={value}>{children}</VacanciesContext.Provider>
}

export const useVacanciesProvider = () => {
  const context = useContext(VacanciesContext)

  if (!context) throw new Error('useVacanciesProvider must be used within VacanciesProvider')

  return context
}
