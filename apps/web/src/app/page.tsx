'use server'
import React from 'react'
import { Button } from '@heroui/react'
import { trpcClient } from '../lib/trpc'

export default async function Home() {
  const response = await trpcClient.hello.query()
  const data = response.item

  return (
    <>
      <Button color="primary">Fetch Data</Button>

      <div>{data && `Total rows in vacancy table: ${data}`}</div>
    </>
  )
}
