"use client"

import { useBuyerOrder, useSellerOrder } from '@/api/orderApi';
import { useStateContext } from '@/context/StateContext';
import { BuyerOrderType, SellerOrderType } from '@/utils/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [orders,setOrder] = useState<SellerOrderType[]>([]);
  const {userInfo} = useStateContext()
  const {sellerOrder,isLoading} = useSellerOrder();
  

  useEffect(()=>{
     if(sellerOrder){
      setOrder(sellerOrder?.message)
     }
  },[userInfo,sellerOrder])

  console.log(orders)
  return (
    <div className='mt-36 min-h-[80vh] my-10 px-32'>
    <h3 className='mt-5 text-2xl font-semibold mb-5'>All your Orders</h3>

    {isLoading ?   <div className='h-full w-full justify-center items-center'>
      ...Loading
    </div>: <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Id
            </th>
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
              Order Date
            </th>
            <th scope="col" className="px-6 py-3">
              Send Message
            </th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map((order) => (
              <tr className="bg-white border-b  hover:bg-gray-50" key={order.id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                   {order.id}
                </th>
                <td className="px-6 py-4">
                  {order.gig.title}
                </td>
                <td className="px-6 py-4">
                  {order.gig.category}
                </td>
                <td className="px-6 py-4">
                  {order.gig.price}
                </td>
                <td className="px-6 py-4">
                  {order.gig.deliveryTime}
                </td>
                <td className="px-6 py-4">
                  {order.createdAt.split("T")[0]}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/seller/orders/messages/${order.id}?recipentId=${order.buyerId}`}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Send
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