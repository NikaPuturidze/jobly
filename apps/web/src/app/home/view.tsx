'use client'

import React, { useState } from 'react'
import CategoryCard from '@/src/components/card-category'
import VacancyCard from '@/src/components/card-vacancy'
import SectionTitle from '@/src/components/section-title'
import CompanyCard from '@/src/components/card-company'
import { MainGet } from '@jobly/trpc/src/router/main.router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Input, Button, Select, SelectItem, SharedSelection } from '@heroui/react'
import { Search } from 'lucide-react'
import { Cat } from '../../../../../packages/api-worker/src/utils/shared/categories'
import { useRouter } from 'next/navigation'
import qs from 'qs'

export default function HomeView({ data }: { data: MainGet }) {
  const [selectedKeys, setSelectedKeys] = useState<SharedSelection | undefined>()
  const [query, setQuery] = useState<string | null>(null)
  const router = useRouter()

  const handleSetQuery = (el: React.ChangeEvent<HTMLInputElement>) => setQuery(el.target.value)

  const handleSearch = (query: string | null, selectedKeys: SharedSelection | undefined) => {
    const categories = Array.from(selectedKeys ?? []) as string[]
    const queryString = qs.stringify(
      { query: query?.toLowerCase() ?? undefined, categories },
      { arrayFormat: 'repeat', skipNulls: true }
    )

    router.push(`/vacancies?${queryString}`)
  }

  return (
    <>
      <section aria-label="Landing" className="pb-10">
        <div className="flex flex-col rounded-xl min-h-92 pt-18 bg-primary/20">
          <header className="max-w-xl mx-auto text-center pb-8">
            <h1 className="text-4xl font-bold text-foreground mb-6">
              გამოსცადე ახალი შესაძლებლობები
              <span className="block text-primary text-3xl font-light mt-2">საქართველოში</span>
            </h1>
          </header>
          <div className="flex self-center justify-center w-full mx-auto px-24 align-center ">
            <div className="flex gap-4 border border-content5 rounded-xl p-4 justify-center w-fit bg-content2/50">
              <Input
                aria-label="Search"
                className="w-116 border border-content5 rounded-[8px]"
                radius="sm"
                value={query ?? undefined}
                onChange={handleSetQuery}
                startContent={<Search size={18} strokeWidth={2} opacity={0.5} />}
                placeholder="მოიძიე პროფესია ან კომპანია"
              />
              <Select
                aria-label="Category"
                className="w-64 border border-content5 rounded-[8px] cursor-pointer"
                placeholder="კატეგორია"
                radius="sm"
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                onSelectionChange={setSelectedKeys}
              >
                {data.categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
              <Button
                onPress={() => handleSearch(query, selectedKeys)}
                aria-label="Search Button"
                radius="sm"
                color="primary"
                type="button"
                className="px-8"
              >
                ძიება
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Popular Categories" className="pb-10">
        <SectionTitle title="პოპულარული კატეგორიები" showAllText="ყველა კატეგორია" route="/categories" />
        <div className="grid grid-cols-4 gap-4">
          {data.categories
            .filter((card) =>
              [
                Cat.IT,
                Cat.Cleaning,
                Cat.Banking,
                Cat.AutoService,
                Cat.Horeca,
                Cat.Finance,
                Cat.Cashier,
                Cat.Security,
              ].includes(card.id)
            )
            .map((card) => (
              <CategoryCard key={card.id} data={card} />
            ))}
        </div>
      </section>
      <section aria-label="New Vacancies" className="mb-10">
        <SectionTitle title="უახლესი ვაკანსიები" showAllText="ყველა ვაკანსია" route="/vacancies" />
        <div className="grid grid-cols-3 gap-4">
          {data.popularVacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} data={vacancy} />
          ))}
        </div>
      </section>
      <section aria-label="Top Companies" className="mb-10">
        <SectionTitle
          title="ტოპ კომპანიები"
          showAllText="ყველა კომპანია"
          route="/companies"
          className={{
            left: 'company-prev',
            right: 'company-next',
          }}
        />
        <Swiper
          slidesPerView={'auto'}
          modules={[Navigation]}
          navigation={{
            prevEl: '.company-prev',
            nextEl: '.company-next',
          }}
          loop={true}
          onSwiper={(swiper) => swiper.navigation.init()}
        >
          {data.popularCompanies.map((company) => (
            <SwiperSlide className="max-w-100 mr-4" key={company.companyId}>
              <CompanyCard data={company} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  )
}
