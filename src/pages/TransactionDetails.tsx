import { useEffect } from 'react'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRepositories } from '../repositories'
import { useParams } from 'react-router-dom'

import { TxDetailTable } from '../components'
import { Transaction } from '../types'

dayjs.extend(relativeTime)

export const TransactionDetails = () => {
  const { hash } = useParams()
  const { useGetTransaction } = useRepositories()
  const { data: tx, refetch, isLoading } = useGetTransaction(String(hash))

  useEffect(() => {
    const hashExists = hash?.length
    if (hashExists) refetch()
  }, [])

  return (
    <>
      <section className="flex items-center justify-center pb-5 mx-5 md:mx-0">
        <div className="w-full relative block border border-gray-100 p-2 shadow-sm text-left">
          <div className="mt-1 mb-4 sm:items-center sm:justify-between text-left ">
            <h1 className="text-gray-600 text-2xl font-bold my-4">Transaction Details</h1>

            {!isLoading && <TxDetailTable label={tx ? Object.keys(tx) : []} data={tx as Transaction} />}
          </div>
        </div>
      </section>
    </>
  )
}
