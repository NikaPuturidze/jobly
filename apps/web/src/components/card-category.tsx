import { Card, CardBody } from '@heroui/react'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import hexToRGB from '../utils/hexToRGB'
import { MainCategories } from '@jobly/trpc/src/router/main.router'

export default function CategoryCard({ data }: { data: MainCategories[number] }) {
  return (
    <Card
      isPressable
      as={Link}
      shadow="none"
      href={`/vacancies?categoryId=${data}`}
      className="w-full hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border-1 border-content5"
    >
      <CardBody className="p-5">
        <div className="flex flex-col items-center text-center gap-3">
          <div
            className={`w-16 h-16 rounded-md flex items-center justify-center`}
            style={{
              backgroundColor: hexToRGB(data.color, 0.1),
              color: data.color,
            }}
          >
            {data.icon ? <Icon icon={data.icon} className="text-3xl" /> : null}
          </div>
          <h3 className="font-semibold text-medium">{data.name}</h3>
          <p className="text-small text-default-500">{data.totalVacancies} ვაკანსია</p>
        </div>
      </CardBody>
    </Card>
  )
}
