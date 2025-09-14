import Link from 'next/link'
import dayjs from 'dayjs'
import { Button, Card, CardBody } from '@heroui/react'
import { Briefcase, Building, Calendar, GeorgianLari, MapPin } from 'lucide-react'
import { PopularVacancy } from '@jobly/trpc/src/router/main.router'

export default function VacancyCard({ data }: Readonly<{ data: PopularVacancy }>) {
  return (
    <Card shadow="none" className="border-1 border-content5 h-fit">
      <CardBody className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-default-100 flex items-center justify-center">
                {data.companyHasLogo && data.companyLogo ? (
                  <img src={data.companyLogo} alt="" className="w-full h-full object-cover" />
                ) : (
                  <Building className="text-2xl text-default-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-medium line-clamp-1">{data.title}</h3>
                <h3 className="text-small line-clamp-1 text-default-700">{data.companyName}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center gap-1.5 text-small text-default-600">
              <MapPin size={16} className="text-default-400" />
              <span>{data.city}</span>
            </div>
            <div className="flex items-center gap-1.5 text-small text-default-600">
              <Briefcase size={16} className="text-default-400" />
              <span>{data.jobTypeTitle}</span>
            </div>
            <div className="flex items-center gap-1.5 text-small text-default-600">
              <GeorgianLari size={16} className="text-default-400" />
              <span>{data.salaryFrom}</span>
              {data.salaryTo && <span> - {data.salaryTo}</span>}
            </div>
            <div className="flex items-center gap-1.5 text-small text-default-600">
              <Calendar size={16} className="text-default-400" />
              <span>{`${dayjs(data.postedAt).format('DD-MM-YYYY')}`}</span>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <Button as={Link} href={`/vacancy/${data.id}`} color="primary" variant="flat" size="sm">
              დეტალები
            </Button>
            <Button color="primary" size="sm">
              გაგზავნა
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
