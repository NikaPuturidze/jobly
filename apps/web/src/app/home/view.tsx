'use client'

import React from 'react'
import CategoryCard from '@/src/components/card-category'
import VacancyCard from '@/src/components/card-vacancy'
import SectionTitle from '@/src/components/section-title'
import { MainGet } from '@jobly/trpc/src/router/main.router'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import CompanyCard from '@/src/components/card-company'

export default function HomeView({ data }: { data: MainGet }) {
  return (
    <>
      <section aria-label="popular-categories" className="pb-10">
        <SectionTitle title="პოპულარული კატეგორიები" showAllText="ყველა კატეგორია" route="/categories" />
        <div className="grid grid-cols-4 gap-4">
          {data.categories.map((card) => (
            <CategoryCard key={card.id} data={card} />
          ))}
        </div>
      </section>
      <section aria-label="new-vacancies" className="pb-10">
        <SectionTitle title="უახლესი ვაკანსიები" showAllText="ყველა ვაკანსია" route="/vacancies" />
        <div className="grid grid-cols-3 gap-4">
          {data.popularVacancies.map((vacancy) => (
            <VacancyCard key={vacancy.id} data={vacancy} />
          ))}
        </div>
      </section>
      <section aria-label="top-companies" className="pb-10">
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
