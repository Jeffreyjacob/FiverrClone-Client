"use client"
import { useGetUserGigs } from '@/api/gigsApi'
import { UserGigsType } from '@/utils/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [gigs, setGigs] = useState<UserGigsType[]>([])
  const { getUserGigs, isLoading } = useGetUserGigs()

  useEffect(() => {
    if (getUserGigs) {
      setGigs(getUserGigs.message)
    }
  }, [getUserGigs, setGigs])

  
  return (
    <div className='mt-36 min-h-[80vh] my-10 px-32'>
      <h3 className='mt-5 text-2xl font-semibold mb-5'>All your Gigs</h3>

      {isLoading ?   <div className='h-full w-full justify-center items-center'>
        ...Loading
      </div>: <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              gigs.map(({ title, category, price, deliveryTime, id }) => (
                <tr className="bg-white border-b  hover:bg-gray-50" key={id}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {title}
                  </th>
                  <td className="px-6 py-4">
                    {category}
                  </td>
                  <td className="px-6 py-4">
                    {price}
                  </td>
                  <td className="px-6 py-4">
                    {deliveryTime}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link href={`/seller/gigs/${id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Edit
                    </Link>
                  </td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div> }
     

    </div>
  )
}

export default Page