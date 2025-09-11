import { Checkbox } from '@heroui/react'
import { Dispatch, SetStateAction, useMemo } from 'react'
import Empty from './empty'

type DataItem = {
  id: number
  name: string
}

type FilterAccordionProps<DataType, StateType> = {
  data: DataType[]
  sortBy?: keyof DataItem
  scrollable?: boolean
  selected: StateType[]
  setSelected: Dispatch<SetStateAction<StateType[]>>
}

const selectFilter = <T,>(item: T, select: Dispatch<SetStateAction<T[]>>): void => {
  select((prev) => (prev.includes(item) ? prev.filter((id) => id !== item) : [...prev, item]))
}

export default function FilterAccordion<DataType extends DataItem, StateType>({
  data,
  sortBy,
  scrollable = true,
  selected,
  setSelected,
}: Readonly<FilterAccordionProps<DataType, StateType>>) {
  const sortedData = useMemo(() => {
    return sortBy ? [...data].sort((a, b) => String(a[sortBy]).localeCompare(String(b[sortBy]))) : data
  }, [data, sortBy])

  const selectedSet = useMemo(() => new Set(selected), [selected])

  return (
    <div className="mb-4">
      <div className={`flex flex-col gap-2 ${scrollable ? 'overflow-y-scroll' : undefined}`}>
        {sortedData ? (
          sortedData.map((item) => (
            <Checkbox
              key={item.id}
              isSelected={selectedSet.has(item.id as StateType)}
              onValueChange={() => selectFilter(item.id as StateType, setSelected)}
              size="sm"
              classNames={{
                base: 'flex-row-reverse items-center max-w-none justify-between',
                wrapper: 'mr-0',
                label: 'text-small font-thin text-default-900',
              }}
            >
              <span className="text-small">{item.name}</span>
            </Checkbox>
          ))
        ) : (
          <Empty />
        )}
      </div>
    </div>
  )
}
