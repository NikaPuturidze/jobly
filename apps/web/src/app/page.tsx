'use server'
import React from 'react'
import { Button } from '@heroui/react'
import { trpcServer } from '../lib/trpc'

export default async function Home() {
  const response = await trpcServer.hello.query()
  const data = response.item

  return (
    <>
      <Button color="secondary">Fetch Data</Button>

      <div>{data && `Total rows in vacancy table: ${data}`}</div>
    </>
  )
}
