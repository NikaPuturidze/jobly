import Link from 'next/link'
import { Badge, Card, CardBody } from '@heroui/react'
import { Briefcase, Building } from 'lucide-react'
import { TopCompany } from '@jobly/trpc/src/router/main.router'

export default function CompanyCard({ data }: { data: TopCompany }) {
  return (
    <Card
      shadow="none"
      className="hover:shadow-card-hover transition-all duration-200 group border-1 border-content5"
    >
      <CardBody className="p-6">
        <Link href={`/companies/${data.companyId}`} className="block">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-card rounded-lg flex items-center justify-center flex-shrink-0">
              {data.logo && data.name ? (
                <img src={data.logo} alt={data.name} className="w-12 h-12 rounded object-cover" />
              ) : (
                <Building className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                {data.name}
              </h3>
              <Badge variant="solid" className="text-xs mb-2">
                {data.name}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{data.description}</p>

          <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-default-400" />
              <span className="font-medium text-primary">{data.totalVacancies} ვაკანსია</span>
            </div>
          </div>
        </Link>
      </CardBody>
    </Card>
  )
}
